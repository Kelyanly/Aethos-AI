# Aethos AI Website & Product Studio

## Project Overview
Aethos AI is now built as a hybrid experience:
- A premium AI consulting website
- A guided Din_0 assistant layer
- Interactive AI diagnostic tools (playground, ROI, automation scoring, opportunity studio)
- Lead-generation flows connected to consultation booking

The platform is designed to feel product-like while staying practical and conversion-oriented.

## Tech Stack
- Frontend: React, Vite, JavaScript, CSS, Framer Motion
- Browser AI: `@huggingface/transformers` (local inference in browser, WebGPU/WASM)
- Backend: Node.js, Express
- Database: SQLite
- Widget: ChatHive SDK

## Architecture

### Frontend (`client/`)
- App routes: `client/src/App.jsx`
- Shared shell + nav: `client/src/components/RootLayout.jsx`
- Main API client: `client/src/lib/api.js`
- Din_0 API client: `client/src/lib/din0Api.js`
- Browser model layer:
  - `client/src/lib/browserModelService.js`
  - `client/src/lib/opportunityPromptBuilder.js`
  - `client/src/lib/resultParser.js`
- Analytics client: `client/src/lib/analytics.js`

### Backend (`server/`)
- Main API: `server/index.js`
- Din_0 bounded LLM route:
  - `server/src/routes/din0.js`
  - `server/src/services/din0LlmService.js`
  - `server/src/services/siteContextService.js`
  - `server/data/site-context.json`
- SQLite init:
  - `server/lib/database.js`

### Data storage
- SQLite database: `server/data/consultations.db`
- Tables:
  - `consultations`
  - `analytics_events`

## Main Routes

### Core
- `/` Home
- `/book` Consultation booking
- `/agents` AI agents
- `/use-cases` AI use cases
- `/lab` AI playground
- `/ai-roi-calculator` ROI calculator
- `/insights` Insights index

### Product / credibility pages
- `/architecture`
- `/implementation-roadmap`
- `/industries`
- `/industries/:industryId`
- `/roi-cases`
- `/ai-roadmap`
- `/ai-use-case-generator`
- `/automation-score`
- `/prompt-library`
- `/ai-stack`
- `/case-study-generator`
- `/insights/:slug`
- `/ai-opportunity-studio`

## Din_0 System
- Stateful sprite behavior (idle/sleep/wake/talk/jump/ctaReact)
- Context-aware responses via backend endpoint `POST /api/din0/respond`
- Fallback deterministic responses if Ollama is unavailable
- Home companion block + sticky assistant + playground guide

Key files:
- `client/src/components/Din0Sprite.jsx`
- `client/src/components/Din0Sprite.css`
- `client/src/hooks/useDin0StateMachine.js`
- `client/src/components/Din0Companion.jsx`

## AI Opportunity Studio (Flagship)
Route: `/ai-opportunity-studio`

Modes:
1. Use Case Generator
2. Workflow Analyzer
3. AI Roadmap Builder
4. Readiness Snapshot

Features:
- Browser-side model lazy load
- WebGPU availability badge + WASM fallback
- Structured outputs rendered in cards
- Preset scenarios
- Din_0 contextual insight panel
- CTA flow to ROI / booking / use cases
- Copy result action

## Backend API Endpoints

### Contact & diagnostics
- `GET /health`
- `POST /api/contact`
- `POST /api/lab/lead-qualification`
- `POST /api/lab/knowledge-assistant`
- `POST /api/lab/automation-potential`
- `POST /api/lab/roi-calculator`
- `POST /api/generate-use-cases`
- `POST /api/automation-score`

### Din_0 LLM
- `POST /api/din0/respond`

### Analytics
- `POST /api/analytics/event`

## Local Setup

### 1) Install dependencies
```bash
cd client
npm install
cd ../server
npm install
```

### 2) Run backend
```bash
cd server
npm run dev
```

### 3) Run frontend
```bash
cd client
npm run dev
```

Default URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`

## Environment Variables

### Frontend (`client/.env.local`)
```env
VITE_API_URL=http://localhost:8080
```

### Backend (`server/.env`)
```env
PORT=8080
CORS_ORIGIN=http://localhost:5173
OLLAMA_URL=http://localhost:11434/api/chat
OLLAMA_MODEL=qwen2.5:3b
```

## Optional: local Ollama for Din_0
```bash
ollama pull qwen2.5:3b
ollama run qwen2.5:3b
```

If Ollama is not running, Din_0 still works with bounded fallback suggestions.

## Test Cases (Manual QA)

### A) Core navigation
1. Open `/`, `/agents`, `/use-cases`, `/lab`, `/ai-roi-calculator`, `/insights`, `/book`
2. Open new pages: `/architecture`, `/implementation-roadmap`, `/industries`, `/roi-cases`, `/ai-roadmap`, `/ai-use-case-generator`, `/automation-score`, `/prompt-library`, `/ai-stack`, `/case-study-generator`, `/ai-opportunity-studio`
Expected: all pages render with correct headings and no runtime crash.

### B) Din_0 behavior
1. On homepage, verify Din_0 appears in companion block
2. Wait idle period (~6s) and verify sleep behavior
3. Hover/click main CTA and verify reaction states
4. Verify suggestions refresh and actions remain bounded to site routes
Expected: state transitions work; no long free-form drift.

### C) AI Playground
1. Run lead qualification demo
2. Run knowledge assistant demo
3. Run automation potential demo
Expected: valid results and no frontend/backend errors.

### D) ROI Calculator
1. Submit numeric values
2. Verify outputs + visual bars
3. Use demo values
Expected: hours/automation/savings/ROI outputs displayed correctly.

### E) AI Opportunity Studio
1. Test all 4 modes
2. Apply preset chips
3. Generate results with browser model
4. Check fallback behavior if model fails
5. Test copy result + ROI deep link
Expected: structured result cards, concise outputs, stable UI states.

### F) Booking + persistence
1. Submit valid consultation form
2. Validate row insertion in `consultations` table
Expected: success feedback + stored record with timestamp.

### G) Analytics events
1. Navigate pages and click key CTAs
2. Run demos + ROI submit
3. Check `analytics_events` table entries
Expected: events are inserted with `eventType`, `path`, and metadata JSON.

### H) Responsive & accessibility
1. Test desktop/tablet/mobile layouts
2. Validate keyboard tab navigation on interactive blocks
3. Check reduced-motion behavior
Expected: readable layout, usable controls, reduced animation when enabled.

## Deployment Notes
- Frontend can be deployed on static hosting (Vercel/Netlify/Cloudflare Pages)
- Backend (Express + SQLite) must be deployed separately (Render/Railway/Fly)
- GitHub Pages cannot host the Express backend
- Browser-side model assets can increase client bundle/runtime downloads; monitor performance

## Known Notes
- `@huggingface/transformers` introduces large assets (expected for browser inference)
- First run in `/ai-opportunity-studio` may warm up the model before response
- Ollama is optional for Din_0 (fallback exists)
