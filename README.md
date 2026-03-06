# Aethos AI Website

Aethos AI is a premium AI consulting portfolio and lead-generation website.
It is designed to explain the offer clearly, build trust quickly, and convert visitors into qualified consultation requests.

## Project Overview

This project contains:
- A conversion-focused homepage with clear positioning and service framing
- A dedicated booking page (`/book`) with a structured consultation form
- An Express API that validates, sanitizes, and stores submissions in SQLite
- ChatHive widget integration in the frontend HTML shell

## Stack

- Frontend: React, Vite, JavaScript, CSS
- Routing: `react-router-dom`
- Backend: Node.js, Express
- Persistence: SQLite (`sqlite` + `sqlite3`)

## Architecture

### Frontend (`client/`)
- `src/App.jsx`: Router setup (`/` and `/book`)
- `src/components/RootLayout.jsx`: shared header and footer
- `src/components/SectionHeader.jsx`: reusable section heading component
- `src/pages/Home.jsx`: premium homepage sections
- `src/pages/Book.jsx`: consultation request page with form states
- `src/lib/api.js`: API client using `VITE_API_URL`
- `src/styles.css`: shared design system and responsive styles

### Backend (`server/`)
- `index.js`: API routes and server startup
- `lib/database.js`: SQLite init and connection management
- `lib/validation.js`: input sanitization + validation rules
- `data/consultations.db`: SQLite database file (generated at runtime)

## Homepage Structure

The homepage includes:
- Hero with primary and secondary CTAs
- Services (4 cards)
- Target clients / industries
- Use cases
- Process (`How it works`)
- Why Aethos AI
- Final CTA linked to `/book`

## Booking Flow

`/book` includes:
- Intro explaining what happens after submission
- Consultation form with all required business fields
- Loading state (`Submitting...`)
- Success state (request acknowledged)
- Error state (validation/API failures)

Submitted fields:
- `fullName`
- `email`
- `company`
- `website`
- `businessType`
- `projectGoal`
- `budgetRange`
- `desiredTimeline`
- `message`

Stored record fields:
- `id`
- `fullName`
- `email`
- `company`
- `website`
- `businessType`
- `projectGoal`
- `budgetRange`
- `desiredTimeline`
- `message`
- `createdAt`

## Local Setup

Install dependencies:

```bash
cd client
npm install
cd ../server
npm install
```

## Run Frontend

```bash
cd client
npm run dev
```

Default local URL: `http://localhost:5173`

## Run Backend

```bash
cd server
npm run dev
```

Default API URL: `http://localhost:8080`

## Environment Variables

Frontend (`client/.env.local`):

```env
VITE_API_URL=http://localhost:8080
```

Backend (`server/.env`):

```env
PORT=8080
CORS_ORIGIN=http://localhost:5173
```

## Deployment Notes

### Frontend
- Deploy `client/` to a static host (Vercel, Netlify, Cloudflare Pages).
- Set `VITE_API_URL` to your deployed backend URL.

### Backend
- Deploy `server/` to a Node host (Render, Railway, Fly.io, etc.).
- Ensure persistent disk support for SQLite, or replace SQLite with managed DB in production.

### Important GitHub Pages Note
GitHub Pages supports static hosting only.
- You can host the React frontend there.
- You cannot run the Express backend on GitHub Pages.
- The backend must be deployed separately and exposed via URL.

## ChatHive Integration

`client/index.html` contains:
- ChatHive SDK import in `<head>`
- `Chathive.widget.init(...)` in `<body>`

You can add language configuration directly in the init object, for example:

```html
<script>
  Chathive.widget.init({ apiKey: "YOUR_KEY", language: "fr" });
</script>
```
