# IEDC Idea Sprint 2026

A responsive, single-page microsite for **IEDC Idea Sprint 2026**, a 24-hour student ideathon hosted by IEDC BOOTCAMP CEC (College of Engineering Chengannur). Developed as part of the IEDC Web Manager selection task.

**Live Website:** https://ideasprint-dusky.vercel.app/

## Tech Stack

- **React 19** – Component-based frontend.
- **TypeScript** – Type safety.
- **Vite** – Development server and production build.
- **CSS** – Custom styling, responsive layouts and animations.
- **Fontsource** – Self-hosted Archivo and IBM Plex Sans fonts.

No backend, UI component library or animation library is required.

## Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Create production build
npm run build

# Preview production build
npm run preview
```

The development server runs at `http://localhost:5173`.

## Event Configuration

Event details can be updated in `src/config.ts`.

| Field | Purpose |
| --- | --- |
| `startsAt` | Event start date and time, including timezone offset. |
| `venue` | Event venue displayed in the hero section. |
| `registrationUrl` | Registration-related link configuration. |
| `contact` | Contact information. |
| `socials` | Instagram and LinkedIn links. |
| `schedule` | Day 1 and Day 2 event schedule. |

The countdown uses the configured event start time and transitions between upcoming, live and ended states.

## Features

- **Hero section:** Event introduction, countdown, event details and 24 individual visual timeline segments.
- **Announcement marquee:** Continuously scrolling event highlights.
- **Event schedule:** Day 1 and Day 2 timeline.
- **Idea Spark:** Interactive, offline idea generator that produces problem statements based on the selected domain. No external API required.
- **Registration form:** Responsive form with validation, team registration options and conditional team-member fields. Frontend demonstration only; submissions are not stored or sent to a backend.
- **Responsive design:** Layouts adapted for desktop, tablet and mobile screens.
- **Animations:** Scroll-based reveals, interactive button states and subtle hover effects.
- **Footer:** IEDC branding, institutional logos and Instagram and LinkedIn links.

## Deployment

The project is hosted on Vercel and its source code is maintained on GitHub.

- **Live:** https://ideasprint-dusky.vercel.app/
- **Repository:** https://github.com/Jo-ohan/IdeaSprint
