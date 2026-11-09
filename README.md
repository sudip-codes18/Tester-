# HealthLens AI (React + Express)

## Run it
1. Install Node.js 18+.
2. In this folder: `npm install`
3. Copy `.env.example` to `.env` and paste your Anthropic API key (console.anthropic.com).
4. `npm run dev`, then open http://localhost:5173

## How it works
React (`src/App.jsx`) -> POST /api/analyze -> Express (`server/index.js`) -> Claude API -> JSON back to React.
The API key lives only on the server.

## Real Google login (next step)
Use `@react-oauth/google` in `Login`, send the token to the server, verify it with `google-auth-library`.
