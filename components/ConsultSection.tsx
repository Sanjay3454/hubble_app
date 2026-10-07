"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";

const timeSlots = [
  { value: "2026-10-07T09:00:00", label: "09:00 AM" },
  { value: "2026-10-07T10:00:00", label: "10:00 AM" },
  { value: "2026-10-07T11:00:00", label: "11:00 AM" },
  { value: "2026-10-07T14:00:00", label: "02:00 PM" },
  { value: "2026-10-07T15:00:00", label: "03:00 PM" },
  { value: "2026-10-07T16:00:00", label: "04:00 PM" },
];

export default function ConsultSection() {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageKind, setMessageKind] = useState<"error" | "success">("error");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      message: formData.get("message"),
      selectedSlot,
    };

    if (!selectedSlot) {
      const message = "Please select a time slot.";
      setMessageKind("error");
      setMessageText(message);
      toast.error(message);
      return;
    }

    try {
      setLoading(true);
      setMessageText("");

      const response = await fetch("/api/consult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const message = "Unable to complete the booking. Please try again.";
        setMessageKind("error");
        setMessageText(message);
        toast.error(message);
        return;
      }

      const message = "Consultation booked successfully. Check your email for the Meet link.";
      setMessageKind("success");
      setMessageText(message);
      toast.success(message);
      form.reset();
      setSelectedSlot("");
    } catch {
      const message = "Unable to complete the booking. Please try again.";
      setMessageKind("error");
      setMessageText(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="consult" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Consult Now
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
              Talk to our connectivity team.
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Tell us about your project and choose a convenient time slot.
            </p>
          </div>

          <div className="min-w-0 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="name"
                required
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400"
              />

              <input
                name="email"
                required
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400"
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400"
              />

              <input
                name="company"
                type="text"
                placeholder="Company"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400"
              />

              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400"
              />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.value}
                    type="button"
                    aria-pressed={selectedSlot === slot.value}
                    onClick={() => setSelectedSlot(slot.value)}
                    className={`rounded-xl border px-2 py-3 text-xs sm:px-3 sm:text-sm ${
                      selectedSlot === slot.value
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-950 px-6 py-3.5 font-semibold text-white disabled:opacity-50"
              >
                {loading ? "Creating consultation..." : "Confirm Consultation"}
              </button>

              {messageText && (
                <p
                  className={`text-center text-sm ${messageKind === "error" ? "text-red-700" : "text-emerald-700"}`}
                  role={messageKind === "error" ? "alert" : "status"}
                  aria-live="polite"
                >
                  {messageText}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}