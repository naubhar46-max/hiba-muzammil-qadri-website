# Deployment Guide

## Current deployment status

Not yet deployed anywhere through this project's Git history. You may already have this file hosted elsewhere (e.g. wherever you've been uploading `index.html`); once you tell me where, this document should be updated to reflect the real, live setup.

## Build command

None at this baseline — it's a static file, deployed as-is.

## Development command

None — open `index.html` directly or serve it (`python3 -m http.server 8000`).

## Output directory

The project root itself (just `index.html`) — there is no separate build output yet.

## Runtime requirements

None — no Node.js/server runtime needed for the current static site. This will change once Sanity's build tooling or any server-side rendering is introduced.

## Hosting independence

This project is **not locked to any specific host**. A static file like this can be deployed to any of the following without code changes:

- **Netlify** or **Vercel** (recommended — free tier, automatic deploys from GitHub, easy custom domain connection)
- **GitHub Pages** (free, directly from this same repository)
- **Any traditional web host** (upload `index.html` via FTP/cPanel)

## Domain configuration

The domain (whatever it is/will be) is a **separate asset** from GitHub, from hosting, and from Sanity. It is registered with a domain registrar (e.g. GoDaddy, Namecheap, Google Domains) under your own account — not through this project or through Claude. Connecting a domain to hosting is done through DNS records (typically an A record or CNAME) configured at your registrar, pointing to whichever host you choose above.

**Nothing in this codebase hard-codes a domain name**, so switching hosts or domains later does not require rewriting the site.

## Required services once Sanity is connected

- A Sanity.io project (see `SANITY.md`)
- Environment variables from `.env.example`, set in your hosting provider's dashboard (never committed to Git)

## Summary of independent systems

| System | Who owns/controls it |
|---|---|
| Domain | You, via your domain registrar account |
| Hosting | You, via whichever host you choose (Netlify/Vercel/etc.) |
| Source code | This GitHub repository |
| CMS content | Your Sanity.io account, once connected |

None of these four replace or depend on each other — each can be changed independently.
