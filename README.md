# Hubble

Hubble is a product showcase for Cavli cellular IoT modules. It includes product detail pages with an interactive 3D model, exhibitor listings, and a consultation booking flow that creates a Google Calendar event with a Meet link.

## Requirements

- Node.js 20 or newer
- A Neon PostgreSQL database with the `exhibitors` and `consultations` tables used by the application
- Google Calendar API OAuth credentials and a refresh token for consultation bookings
- Gmail credentials for sending booking confirmation email

## Getting Started

Install dependencies and copy the environment template:

```bash
npm install
```

Copy `.env.example` to `.env.local` and set the values described below. Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GOOGLE_REDIRECT_URI` | Authorized OAuth callback URL, for example `http://localhost:3000/api/google/callback` |
| `GOOGLE_REFRESH_TOKEN` | Refresh token authorized for Google Calendar events |
| `MAIL_USER` | Gmail account used to send booking confirmations |
| `MAIL_PASS` | Gmail app password or configured mail credential |

Keep real credentials in `.env.local` or your deployment's secret manager. Do not commit them.

The `/api/google/auth` endpoint starts Google authorization. The callback endpoint reports whether Google returned a refresh token, but does not store it; configure the resulting token as `GOOGLE_REFRESH_TOKEN` yourself.

## Features

- Responsive product catalogue and product detail pages at `/products/[slug]`
- Interactive model viewer using the GLB asset in `public/models/`
- Neon-backed exhibitor listings and a scraper endpoint that imports exhibitor data
- Consultation form with Google Calendar/Meet booking and email confirmation
- Inline loading and error states, with toast notifications for booking results

## API Routes

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/consult` | Creates a consultation, Calendar event, Meet link, and confirmation email |
| `GET` | `/api/google/auth` | Starts Google OAuth authorization |
| `GET` | `/api/google/callback` | Completes the OAuth callback and reports refresh-token availability |
| `POST` | `/api/scrape/exhibitors` | Fetches exhibitor data and upserts it into Neon |

## Scripts

- `npm run dev` starts the development server.
- `npm run lint` runs ESLint.
- `npm run build` creates a production build.
- `npm run start` serves a production build.