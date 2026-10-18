# Validation record

Executed October 18, 2026 on Windows with Node 24.14, Google Chrome, Playwright and the built Vite application.

## Checks actually run

- `npm run build`: passed (TypeScript strict checking and production bundling).
- `npm run lint`: passed, no warnings or errors.
- `npm test`: **9 / 9 scenarios passed** on the development server.
- `PIP_TEST_URL=http://127.0.0.1:4173 npm test`: **9 / 9 scenarios passed** on the production preview (PowerShell environment-variable syntax is in the README).
- `npm install`: reported zero dependency vulnerabilities at installation.
- Screenshots inspected at desktop and phone sizes. The desktop hero, phone hero, workshop/map and nursery were visually reviewed. This review found and corrected a desktop grid-placement error and secret-star positioning/stacking defects.

## Verified behavior

Pip pointer movement and touch reaction; all four project interactions; actual Web Audio context/oscillator starts, oscillator cleanup and no new melody notes after stop or mute; nursery objects; guestbook empty validation, safe text rendering, reload persistence and storage failure; correct and incorrect secret-star order; dialog Escape/close; chaos on/off; dawn mood; keyboard entry and story navigation; swipe handler; reduced-motion styles; no uncaught page errors during the main journey.

Layout assertions checked page overflow and major element bounds at **1440×900, 1280×720, 768×1024, 390×844, 360×800**, including chaos mode and map interaction.

## Lighthouse

Final local production-preview run, **Lighthouse 13.5.0**, default mobile simulation, October 18 at 14:05:55 UTC / 19:35:55 IST:

| Category / metric | Measured result |
| --- | ---: |
| Performance | 91 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| First contentful paint | 1.8 s |
| Largest contentful paint | 2.0 s |
| Total blocking time | 320 ms |
| Cumulative layout shift | 0.002 |

The preceding optimized run measured performance 94. These are local lab measurements, not deployed-site field data or a guarantee. Font compression, local hosting, preload, caption contrast and a valid robots.txt were added in response to measured findings. Automated accessibility scoring is not a substitute for a complete human accessibility audit.

## Limits

- No physical iPhone, Android device or Safari/Firefox validation.
- Touch actions use Chromium emulation; the swipe handler is tested through synthetic TouchEvents.
- Audio generation and cleanup are instrumented in a real browser, but speaker output was not manually auditioned.
- Local guestbook only; no shared-storage claim or live-guestbook bonus.
- GitHub publication and hackathon submission have not been performed.
