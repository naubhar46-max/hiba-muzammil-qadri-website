# Setup Guide

## Requirements

- Any modern web browser (for viewing)
- Python 3 or Node.js (optional, only if you want a local server instead of opening the file directly)
- Git (for version control)
- A GitHub account (for remote backup/collaboration — see `DEPLOYMENT.md`)
- A Sanity.io account (only once CMS integration begins — see `SANITY.md`)

## Getting the project running locally

1. Clone the repository:
   ```bash
   git clone <your-github-repo-url>
   cd hiba-website-project
   ```
2. Open `index.html` directly in a browser, **or** serve it locally to avoid any browser file:// restrictions:
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

## Environment variables

None are required to run the current static baseline. Copy `.env.example` to `.env` only once Sanity integration begins, and fill in the real values from your Sanity project dashboard. Never commit `.env`.

## Making a change safely

1. Create a branch: `git checkout -b fix/short-description`
2. Make the change.
3. Test it locally (open the file, click through the affected section).
4. Commit with a clear message (see `CHANGELOG.md` for the style used in this project).
5. Merge back to `main` only after verifying nothing else broke.
