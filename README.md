# Aethos AI

Aethos AI is a React + Express portfolio and lead-generation site for AI consulting. The project combines a premium consulting website, interactive diagnostic tools, a custom Din_0 concierge widget, and a small set of product-style demos that help qualify leads before a consultation.

## What is in the project

### Website layer
- Conversion-focused homepage for Aethos AI
- Service, use-case, insights, architecture, roadmap, and industry pages
- Consultation booking flow backed by Express + SQLite

### Interactive product layer
- `AI Playground` for guided demo scenarios
- `AI Opportunity Studio` for browser-side structured AI opportunity generation
- `AI ROI Calculator`, `Automation Score`, `AI Roadmap`, `Prompt Library`, and `Case Study Generator`
- `Snake Lab` as a feedback-loop / routing exercise framed for operations and automation discussions

### Din_0 system
- Homepage Din_0 companion block
- Sticky Din_0 assistant surfaces across the site
- Custom embeddable Din_0 widget loaded from `client/din0.js`
- Context-aware greeting prompts and page-specific suggestions
- Custom theme overrides matching the Aethos AI visual system

## Stack

### Frontend
- React
- Vite
- JavaScript
- Custom CSS
- Framer Motion
- `@huggingface/transformers` for browser-side inference in Opportunity Studio

### Backend
- Node.js
- Express
- SQLite

### External local companion backend
The custom Din_0 widget currently talks to the local Din_0 backend stored outside this repo:
- `/Users/kellianmpiryswenko/Documents/Robot GenAI/backend`

That backend can run with Ollama for real responses.

## Main frontend routes

### Core pages
- `/`
- `/about`
- `/book`
- `/agents`
- `/use-cases`
- `/lab`
- `/ai-roi-calculator`
- `/insights`

### Tools and supporting pages
- `/tools/opportunity-studio`
- `/tools/snake-lab`
- `/automation-score`
- `/ai-roadmap`
- `/ai-use-case-generator`
- `/prompt-library`
- `/case-study-generator`
- `/ai-stack`
- `/architecture`
- `/implementation-roadmap`
- `/industries`
- `/roi-cases`

## Repo structure

```text
client/
  index.html                 # Vite entry + Din_0 widget bootstrap
  din0.js                    # Custom widget bundle used by the site
  src/
    App.jsx                  # Router
    pages/                   # Route-level pages
    components/              # Shared UI, Din_0, widgets, sections
    lib/                     # API clients, browser model helpers, analytics
server/
  index.js                   # Express server
  lib/database.js            # SQLite setup
  data/consultations.db      # Consultation storage
  data/analytics_events      # Analytics data (SQLite table)
docs/
  demo-scenarios.md
  test-cases.md
```

## Din_0 widget

The site no longer uses ChatHive.

The active widget is the custom Din_0 widget injected from `client/index.html`:
- script path: `/din0.js`
- widget init: `window.Din0.init(...)`
- greeting prompts: randomized and page-aware in `client/index.html`
- theme overrides: applied inside the widget shadow root from `client/index.html`

### Current widget behavior
- Floating launcher in the lower corner
- Random context-aware greeting bubble while closed
- Conversation reset on page refresh
- Custom Din_0 sprite injected into the widget avatar surface
- Local API target can be switched with `window.__DIN0_API_BASE_URL__`

### Custom widget local integration
The site expects:
- frontend at `http://localhost:5173`
- main Express API at `http://localhost:8080`
- Din_0 widget API at `http://localhost:8787`

## Local development

Open separate terminals.

### 1. Frontend
```bash
cd "/Users/kellianmpiryswenko/Documents/New project/client"
npm install
npm run dev
```

### 2. Main website backend
```bash
cd "/Users/kellianmpiryswenko/Documents/New project/server"
npm install
npm run dev
```

### 3. Ollama (for real Din_0 responses)
```bash
ollama serve
```

If the model is not installed yet:
```bash
ollama pull llama3.1:8b
```

### 4. Din_0 backend
```bash
cd "/Users/kellianmpiryswenko/Documents/Robot GenAI"
PORT=8787 MOCK_LLM=false OLLAMA_BASE_URL=http://127.0.0.1:11434 OLLAMA_MODEL=llama3.1:8b node backend/api.js
```

## Environment

### Frontend
Create `client/.env.local` if needed:
```env
VITE_API_URL=http://localhost:8080
```

### Main backend
Create `server/.env` if needed:
```env
PORT=8080
CORS_ORIGIN=http://localhost:5173
```

## Booking flow

The booking form posts to the Express backend and stores consultation requests in SQLite.

Captured fields include:
- full name
- email
- company
- website
- business type
- project goal
- budget range
- desired timeline
- message
- created at

## Interactive tools

### AI Opportunity Studio
- Browser-side structured generation
- Multiple modes: opportunity mapping, workflow analysis, roadmap, readiness snapshot
- CTA path into ROI and consultation booking

### Snake Lab
- Accessible from `/tools/snake-lab`
- Framed as an AI operations routing exercise
- Autopilot vs manual control states
- Apples, score, high score, pause, reset, and keyboard controls
- Homepage preview links into the full page

## Manual test cases

### Navigation
- Open all main routes and verify they render without runtime errors.
- Check the `Tools` menu links, including `Snake Lab` and `Opportunity Studio`.

### Booking
- Submit invalid and valid form states.
- Verify a successful submission is persisted in SQLite.

### Din_0 homepage surfaces
- Verify the companion block renders.
- Verify Din_0 sprite and Snake Lab preview cards align visually.
- Verify Din_0 greeting text rotates.

### Interactive Widgets
- Verify the homepage widget grid renders below the hero.
- Test category filtering and search.
- Open a few widgets and verify charts, counters, and actions render without runtime errors.

### Din_0 widget
- Verify the launcher appears.
- Verify greeting bubble changes over time.
- Open the widget and send a prompt.
- Refresh the page and confirm history resets.

### AI Playground / Opportunity Studio / ROI
- Run each tool once and verify outputs render.
- Confirm CTA buttons route to valid pages.

### Snake Lab
- Load `/tools/snake-lab`
- Verify the board is visible above the explanatory copy.
- Hover the board and control the snake with arrow keys or WASD.
- Confirm the snake is slower and more manageable.
- Confirm apples increase score and the manual snake turns gold.

## Deployment notes

### Frontend
Can be deployed to static hosting such as:
- Vercel
- Netlify
- Cloudflare Pages

### Backend
The Express + SQLite backend must be deployed separately.
GitHub Pages cannot host the backend.

### Din_0 widget backend
The custom widget backend is also separate from static hosting. If you want the widget to answer publicly, the Din_0 API must be deployed and reachable from the site.

## Notes
- The Vite build warns that `/din0.js` in `index.html` is a non-module script. This is expected because it is intentionally injected as a standalone widget script.
- Browser-side model features can download large assets on first use.
- The repo contains a `.playwright-cli/` local workspace artifact and it is ignored.
