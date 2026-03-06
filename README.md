# Aethos AI Portfolio (React + API)

## Apercu
Ce projet contient:
- `client/` Front-end React + Vite
- `server/` API Express pour le formulaire de contact

## Architecture (simple et claire)
- **Front-end** (`client/`)
  - Vite + React
  - `src/App.jsx` contient tout le contenu et les sections
  - `src/styles.css` definit l'identite visuelle
  - `index.html` charge le SDK ChatHive et initialise le widget
- **Back-end** (`server/`)
  - Express en mode simple
  - Endpoint `POST /api/contact` (contact)
  - Endpoint `GET /health` (healthcheck)
  - CORS configurable par variable d'environnement

## Lancer en local

1) Installer les dependances

```bash
cd client
npm install
cd ../server
npm install
```

2) Lancer l'API

```bash
cd server
npm run dev
```

3) Lancer le client

```bash
cd client
npm run dev
```

Le site sera accessible sur l'URL Vite (souvent `http://localhost:5173`).

## Variables d'environnement

Client (creer `client/.env.local` si besoin):

```
VITE_API_URL=http://localhost:8080
```

Server (optionnel `server/.env`):

```
PORT=8080
CORS_ORIGIN=http://localhost:5173
```

## Deploiement rapide (simple)

### Front-end sur Vercel
1) Push le repo sur GitHub.
2) Creer un projet Vercel et choisir `client/` comme root.
3) Build: `npm run build`
4) Output: `dist`
5) Env var: `VITE_API_URL` = URL de votre API.
6) Deploy.

### API sur Render
1) Creer un Web Service Render depuis ce repo.
2) Root directory: `server/`
3) Build: `npm install`
4) Start: `node index.js`
5) Env var `CORS_ORIGIN` = domaine Vercel.
6) Deploy.

## ChatHive widget

ChatHive est deja configure dans `client/index.html`:
- SDK charge dans le `<head>`
- Init dans le `<body>` avec votre `apiKey`

Pour changer la langue:
```html
<script>
  Chathive.widget.init({
    apiKey: "KzSxI0a_YvDPHQlLRWLe8xX7",
    language: "fr"
  });
</script>
```

## Publier sur GitHub (pas a pas)

1) Verifier les fichiers:
```bash
git status -sb
```

2) Ajouter et committer:
```bash
git add .
git commit -m "Initial portfolio site"
```

3) Creer le repo GitHub (site web), puis lier et pousser:
```bash
git remote add origin https://github.com/<TON_USER>/<TON_REPO>.git
git push -u origin main
```

## Personnalisation rapide
- Nom/branding: `client/src/App.jsx`
- Styles: `client/src/styles.css`
- ChatHive: `client/index.html`
