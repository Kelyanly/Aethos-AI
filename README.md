# Aethos AI Platform Website

## Project Overview

Aethos AI is a React + Express platform website for an AI consulting firm focused on:
- AI consulting for SMEs
- AI automation for businesses
- AI lead generation automation
- AI assistants for websites
- AI workflow automation

The site includes service positioning, credibility content, consultation booking, interactive AI demos, and an ROI calculator to convert visitors into qualified leads.

## Tech Stack

- Frontend: React, Vite, JavaScript, CSS
- Backend: Node.js, Express
- Database: SQLite

## Architecture

### Frontend (`client/`)
- Routing via `react-router-dom`
- Shared layout in `src/components/RootLayout.jsx`
- SEO helper in `src/components/Seo.jsx`
- Main pages:
  - Home (`/`)
  - Booking (`/book`)
  - AI Agents (`/agents`)
  - AI Use Cases (`/use-cases`)
  - AI Playground (`/lab`)
  - AI ROI Calculator (`/ai-roi-calculator`)
  - Insights (`/insights`)

### Backend (`server/`)
- `POST /api/contact`: stores consultation requests in SQLite
- `POST /api/lab/lead-qualification`: AI Lead Qualification Bot demo
- `POST /api/lab/knowledge-assistant`: AI Knowledge Assistant demo
- `POST /api/lab/automation-potential`: automation potential demo
- `POST /api/lab/roi-calculator`: AI ROI calculator logic
- `GET /health`: health endpoint

## Homepage Features

The homepage includes:
- Positioning for AI consulting for SMEs
- "AI Agents powered by ChatHive" section
- "AI Systems We Build" section
- "Example AI Implementations" trust section
- Primary and secondary CTA hierarchy
  - Primary: Book a Consultation
  - Secondary: Explore AI Solutions

## Booking System

Route: `/book`

Features:
- Structured consultation request form
- Validation and UX feedback states
- "What happens next" panel
- Data stored in SQLite through `/api/contact`

## AI Playground

Route: `/lab`

Interactive demos:
1. AI Lead Qualification Bot
2. AI Knowledge Assistant Demo
3. Automation Potential Calculator

Purpose:
- Educational product demos
- Demonstrates practical consulting workflows

## AI ROI Calculator

Route: `/ai-roi-calculator`

Inputs:
- Number of employees
- Monthly support tickets
- Monthly leads
- Time per support request
- Hourly employee cost

Outputs:
- Estimated hours saved per month
- Estimated automation potential (%)
- Estimated annual savings
- Estimated annual ROI

Includes CTA to `/book`: "Discuss Your AI Opportunities".

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

## Deployment Instructions

### Frontend
Deploy `client/` to static hosting (Vercel / Netlify / Cloudflare Pages).
Set `VITE_API_URL` to your deployed backend URL.

### Backend
Deploy `server/` to a Node hosting provider (Render / Railway / Fly.io).
SQLite requires persistent disk for production data retention.

## Static Hosting vs Backend Hosting

Important:
- Static hosting platforms serve frontend assets only.
- Express API routes and SQLite storage must run on a separate backend host.
- GitHub Pages can host frontend files but cannot run the Node/Express backend.

## ChatHive Integration

ChatHive SDK is loaded in `client/index.html` and initialized in the body.

Aethos AI uses ChatHive as a core conversational layer for:
- lead qualification agents
- customer support agents
- scheduling agents
- internal knowledge assistants

These agent patterns are explained across the homepage and `/agents` page.
