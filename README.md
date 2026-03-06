<<<<<<< HEAD
# Aethos AI Portfolio (React + API)

Aethos AI is a portfolio site for an AI consultant focused on regulated, high-impact deployments across Europe. The site ships with a clean React front‑end, an Express API for the contact form, and ChatHive embedded for instant conversations.

## Architecture

**Front‑end** (`client/`)
- Vite + React
- `src/App.jsx` contains all sections and content
- `src/styles.css` defines the editorial UI system
- `index.html` loads the ChatHive SDK and initializes the widget

**Back‑end** (`server/`)
- Express API
- `POST /api/contact` for inbound requests
- `GET /health` for uptime checks
- CORS configured via environment variables

## Local setup

1) Install dependencies
```bash
cd client
npm install
cd ../server
npm install
```

2) Run the API
```bash
cd server
npm run dev
```

3) Run the client
```bash
cd client
npm run dev
```

The site will be available at the Vite URL (usually `http://localhost:5173`).

## Environment variables

Client (create `client/.env.local` if needed):
```
VITE_API_URL=http://localhost:8080
```

Server (optional `server/.env`):
```
PORT=8080
CORS_ORIGIN=http://localhost:5173
```

## Deployment (fast path)

### Front‑end on Vercel
1) Push the repo to GitHub  
2) Create a Vercel project and set the root to `client/`  
3) Build command: `npm run build`  
4) Output directory: `dist`  
5) Set env var `VITE_API_URL` to your API URL  
6) Deploy  

### API on Render
1) Create a Render Web Service from this repo  
2) Root directory: `server/`  
3) Build command: `npm install`  
4) Start command: `node index.js`  
5) Set env var `CORS_ORIGIN` to your Vercel domain  
6) Deploy  

## ChatHive integration

ChatHive is wired in `client/index.html`:
- SDK loaded in the `<head>`
- Widget initialized in the `<body>` with your `apiKey`

To set the language:
```html
<script>
  Chathive.widget.init({
    apiKey: "KzSxI0a_YvDPHQlLRWLe8xX7",
    language: "fr"
  });
</script>
```

## Quick customization
- Branding & copy: `client/src/App.jsx`
- Visual system: `client/src/styles.css`
- ChatHive embed: `client/index.html`
=======
# Aethos-AI
>>>>>>> 81a2e99f815bc976578bf4af6e2679da019b740b
