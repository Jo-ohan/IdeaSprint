# IEDC Idea Sprint 2026

Single-page microsite for **IEDC Idea Sprint 2026**, a 24-hour student ideathon hosted by IEDC BOOTCAMP CEC (College of Engineering Chengannur). Built for the IEDC Web Manager selection task.

## Stack
React 19, Vite, TypeScript, one hand-written CSS file. Fonts via Fontsource (Archivo variable, IBM Plex Sans), self-hosted. No backend, no UI library, no animation library.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Confirm event details (one file)
Edit `src/config.ts`. Every `null` value is shown on the page as "to be confirmed".

| Field | Effect |
| --- | --- |
| `startsAt` | ISO string with offset, e.g. `2026-12-05T09:00:00+05:30`. Enables the real countdown, then "live", then "ended" states. |
| `venue` | Shown in the hero. |
| `registrationUrl` | Shown as a real link after the demo form. |
| `contact`, `socials` | Footer links. Only real URLs become links. |
| `schedule` | Replace draft sessions/times, then set `confirmed: true` to remove the draft notice. |

## Features
- Hero with live countdown (or "date to be announced"), CTA, and 24 hour-bars that fill as the sprint runs.
- Day 1 / Day 2 timeline rail.
- Idea Spark generator: offline, no API, pick a domain and get a problem statement.
- Registration form with inline validation. **Frontend demo only: nothing is sent or stored.**
- Footer with contact and social placeholders.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. On vercel.com choose **Add New > Project**, import the repo.
3. Framework preset: **Vite** (build `npm run build`, output `dist`). Deploy.

## Publish to GitHub
```bash
git init
git add .
git commit -m "IEDC Idea Sprint 2026 microsite"
git branch -M main
git remote add origin https://github.com/<your-username>/idea-sprint-2026.git
git push -u origin main
```

## Lighthouse
Open the deployed URL in Chrome, DevTools > Lighthouse, choose Mobile, run all categories, and screenshot the score summary.
