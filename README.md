# AI Consultant Portfolio (React + API)

This project includes:
- `client/` React + Vite front-end
- `server/` Express API for the contact form

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

## Deploy quickly (simple approach)

### Front-end on Vercel
1) Push this repo to GitHub.
2) Create a new Vercel project and select `client/` as the root directory.
3) Build command: `npm run build`
4) Output directory: `dist`
5) Set environment variable: `VITE_API_URL` to your API URL.
6) Deploy.

### API on Render
1) Create a new Web Service on Render from this repo.
2) Set the root directory to `server/`.
3) Build command: `npm install`
4) Start command: `node index.js`
5) Add environment variable `CORS_ORIGIN` with your Vercel domain.
6) Deploy.

## ChatHive widget
Add the ChatHive script in `client/index.html` and the mount point in `client/src/App.jsx`.

