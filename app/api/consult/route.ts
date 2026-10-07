import { NextResponse } from "next/server";
import { google } from "googleapis";
import sql from "@/lib/db";
import nodemailer from "nodemailer";


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      message,
      selectedSlot,
    } = body;

    if (!name || !email || !message || !selectedSlot) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const calendar = google.calendar({
      version: "v3",
      auth: oauth2Client,
    });

    const start = new Date(selectedSlot);

    const end = new Date(
      start.getTime() + 30 * 60 * 1000
    );

    const event = await calendar.events.insert({
      calendarId: "primary",

      conferenceDataVersion: 1,

      sendUpdates: "all",

      requestBody: {
        summary: `Hubble Consultation - ${name}`,

        description: `
Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Company: ${company || "-"}
Message: ${message}
        `,

        start: {
          dateTime: start.toISOString(),
          timeZone: "Asia/Kolkata",
        },

        end: {
          dateTime: end.toISOString(),
          timeZone: "Asia/Kolkata",
        },

        attendees: [
          {
            email,
          },
        ],

        conferenceData: {
          createRequest: {
            requestId: `consult-${Date.now()}`,

            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
          },
        },
      },
    });

    const meetLink =
      event.data.conferenceData?.entryPoints?.find(
        (entry) => entry.entryPointType === "video"
      )?.uri || null;

    const calendarId = event.data.id || null;

    const result = await sql`
      INSERT INTO consultations (
        name,
        email,
        phone,
        company,
        message,
        selected_slot,
        meet_link,
        calendar_id,
        status
      )
      VALUES (
        ${name},
        ${email},
        ${phone || null},
        ${company || null},
        ${message},
        ${selectedSlot},
        ${meetLink},
        ${calendarId},
        'confirmed'
      )
      RETURNING *
    `;

    // 5. ADD EMAIL CODE HERE
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Your Hubble Consultation is Confirmed",
      html: `
        <h2>Consultation Confirmed</h2>
        <p>Hi ${name},</p>
        <p>Your consultation has been successfully scheduled.</p>

        <p>
          <strong>Google Meet:</strong>
          <a href="${meetLink}">${meetLink}</a>
        </p>

        <p>We look forward to speaking with you.</p>
        <p>Hubble Team</p>
      `,
    });

    // 6. Final response
    return NextResponse.json({
      success: true,
      meetLink,
      consultation: result[0],
    });

  } catch (error) {
    console.error("Consultation error:", error);

    return NextResponse.json(
      { error: "Failed to create consultation" },
      { status: 500 }
    );
  }
}