# Environment Variables Reference

See `.env.example` for the copy-pasteable template. This document explains each one.

| Variable | Required when | Purpose |
|---|---|---|
| `SANITY_PROJECT_ID` | Once Sanity is connected | Identifies which Sanity project to read/write content from. Not secret — safe to share. |
| `SANITY_DATASET` | Once Sanity is connected | Which dataset within the project (typically `production`). Not secret. |
| `SANITY_READ_TOKEN` | Only if fetching draft/unpublished content | Secret. Keep out of Git and out of chat. |
| `SANITY_WRITE_TOKEN` | Only for scripts that create/edit content programmatically | Secret — this token can modify your content. Highest sensitivity of all variables here. |
| `SITE_URL` | Recommended from the start | Centralizes the domain so it's never hard-coded in the code (supports domain changes later, per the architecture rule). |
| `CONTACT_FORM_RECIPIENT_EMAIL` | If/when a real contact form is built | Where form submissions are delivered. |
| `ANALYTICS_ID` | If/when analytics is added | Not yet in use. |

## Where real values live

- **Locally:** in a `.env` file (never committed — already in `.gitignore`).
- **In production:** entered directly into your hosting provider's dashboard (Netlify/Vercel/etc. all have an "Environment Variables" settings page) — never inside the repository.

## Rule

If a value is secret (tokens, keys, passwords), it is **never** pasted into chat, never committed to Git, and never hard-coded into `index.html` or any script.
