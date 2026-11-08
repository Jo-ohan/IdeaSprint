# PROJECT_STATUS

## Done
- Vite + React + TS project, builds cleanly (`npm run build`).
- Hero with countdown states (tba / upcoming / live / ended) plus labelled demo preview; 24 hour-bars.
- Day 1 / Day 2 schedule (draft, timings TBC), Idea Spark generator, validated demo registration form, footer.
- All unconfirmed info centralised in `src/config.ts`.

## Remaining (manual)
- Get confirmed date, venue, schedule, contacts, socials, registration URL from IEDC; fill `src/config.ts`.
- Push to GitHub, deploy on Vercel, run Lighthouse on the live URL, screenshot it.
- Write the 100-word note in the Google Form with the real stack/host.

## Structure
src/config.ts (event data), src/ideas.ts (generator data), src/hooks.ts, src/styles.css, src/components/{Header,Hero,Schedule,IdeaSpark,Registration,Footer}.tsx

## Known issues
- Tested in headless Chromium at 360, 820 and 1366 px: no horizontal overflow, no console errors, generator and form validation work. Lighthouse NOT run yet: run it on the deployed URL.
- Logo PNG is 43 KB; could be converted to SVG/WebP.

## Next steps
`npm install && npm run dev`, then edit `src/config.ts`.
