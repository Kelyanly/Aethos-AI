# Aethos AI Platform Website

## Project Overview

Aethos AI is a demo-ready AI consulting platform website for showcasing practical AI assistants and automation systems to prospects.

The project combines:
- AI consulting positioning for SMEs
- ChatHive-powered agent messaging
- Service pages and use-case pages
- Interactive AI demos
- AI ROI calculator for conversion
- Booking workflow backed by SQLite persistence

## Tech Stack

- Frontend: React, Vite, JavaScript, CSS
- Backend: Node.js, Express
- Database: SQLite

## Architecture

### Frontend (`client/`)
- Routing with `react-router-dom`
- Shared layout in `src/components/RootLayout.jsx`
- SEO helper in `src/components/Seo.jsx`
- API client in `src/lib/api.js`
- Main pages:
  - `/` Home
  - `/book` Booking
  - `/agents` AI Agents
  - `/use-cases` AI Use Cases
  - `/lab` AI Playground
  - `/ai-roi-calculator` AI ROI Calculator
  - `/insights` Insights

### Backend (`server/`)
- `POST /api/contact` for consultation requests
- `POST /api/lab/lead-qualification`
- `POST /api/lab/knowledge-assistant`
- `POST /api/lab/automation-potential`
- `POST /api/lab/roi-calculator`
- `GET /health`

### Storage
- SQLite database in `server/data/consultations.db`
- Contact form submissions stored in `consultations`

## Homepage Features

- Hero with clear consulting positioning
- "AI Agents powered by ChatHive" section
- "AI Systems We Build" section
- "Example AI Implementations" credibility section
- "Chat Assistant Demo Prompts" section
- Clear CTA hierarchy:
  - Primary: Book a Consultation
  - Secondary: Explore AI Solutions

## Booking System

Route: `/book`

Features:
- Structured consultation form
- Validation feedback
- Success/error states
- "What happens next" trust panel
- SQLite-backed persistence via backend API

## AI Playground

Route: `/lab`

Includes interactive demos:
1. AI Lead Qualification Bot
2. AI Knowledge Assistant Demo
3. Automation Potential Calculator

Also includes:
- Suggested demo inputs
- Expected system behavior for each scenario
- Quick-fill automation demo preset

## AI ROI Calculator

Route: `/ai-roi-calculator`

Inputs:
- Number of employees
- Monthly support tickets
- Monthly leads
- Average time per support request
- Average hourly cost

Outputs:
- Estimated hours saved per month
- Estimated automation potential
- Estimated monthly savings
- Estimated annual savings
- Estimated annual ROI

Includes:
- "Use Demo Values" button
- CTA: "Discuss Your AI Opportunities" linking to `/book`

## ChatHive Integration

ChatHive SDK is loaded in `client/index.html` and initialized in-page.

Suggested demo prompts are documented in:
- Homepage section "Chat Assistant Demo Prompts"
- `docs/demo-scenarios.md`

## Demo Scenarios

See `docs/demo-scenarios.md` for guided demos covering:
- AI Lead Qualification
- AI Knowledge Assistant
- Automation Calculator
- ROI Calculator
- ChatHive assistant demos

## Test Cases

See `docs/test-cases.md` for functional checks including:
- Homepage load checks
- Route navigation checks
- Booking form validation and persistence
- AI Playground responses
- ROI calculator outputs
- Responsive behavior
- ChatHive prompt behavior

## Live Demo Examples

Use these prompts during demos:

1. "We are a 20-person accounting firm serving SMEs in Belgium and want to automate lead capture."
2. "How can AI assistants improve lead conversion?"
3. "I run a real estate agency and want to filter serious buyers automatically."
4. "What services does Aethos AI offer?"
5. "I want to book a consultation."

## Local Development Setup

Install dependencies:

```bash
cd client
npm install
cd ../server
npm install
```

Run backend:

```bash
cd server
npm run dev
```

Run frontend:

```bash
cd client
npm run dev
```

Default URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

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

### Frontend Hosting
Deploy `client/` to static hosting (Vercel, Netlify, Cloudflare Pages).

### Backend Hosting
Deploy `server/` to a Node host (Render, Railway, Fly.io).

### Important
- Static hosting serves frontend assets only.
- Express + SQLite backend must be hosted separately.
- GitHub Pages cannot run the backend.

