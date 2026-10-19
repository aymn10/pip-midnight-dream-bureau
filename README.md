# Pip’s Midnight Dream Bureau

“I build the dreams you fall asleep inside.”

A small, illustrated world for **Pip**, the canonical skull baby and Junior Dream Engineer at the Midnight Nursery. Built for **haX.baby — Baby’s First Website**, Track 1, during October 18, 2026.

**[Play the public website](https://pips-midnight-dream-bureau-1018.basicauk12.chatgpt.site)** · [GitHub repository](https://github.com/aymn10/pip-midnight-dream-bureau)

Finalist polish on October 19 preserves the original artwork and adds immediate star clues, collected-star states, complete mobile navigation, readable inactive story chapters, and protection against overlapping audio-start requests.

## The experience

An early-web personal site imagined as a handmade celestial bureau: sleepy ink-blue skies, cream stationery, lavender pajamas, tiny lit windows, and a lantern that always has room for one more dream.

- Original reusable SVG Pip: round skull face, glowing eyes, starry nightcap, pink bow, cursor-following pupils and tap reactions.
- Five illustrated origin chapters. Desktop artwork follows the active scroll chapter; mobile gets its own illustrations inline.
- **Lullaby Lab:** original Web Audio melody, play/stop, global sound toggle, no autoplay. Audio stops when the tab is hidden.
- **Nightlight Collection:** three selectable lights, adjustable brightness, changing environmental glow.
- **Dream Delivery Map:** animated SVG route and four accessible destination buttons with original dream descriptions.
- **Bedtime Storybook:** four original illustrated pages with button, arrow-key and swipe navigation.
- **Nursery:** six functional objects, including mood lighting, a music box, meteor window and sleepy cloud.
- **Wish jar:** validated, safely rendered browser-local guestbook; latest 30 wishes, 180 characters each, storage failure recovery.
- **The Secret Dream:** collect stars 01 → 02 → 03 to open an illustrated moon-boat room. Native dialog provides keyboard focus containment and Escape support.
- Bounded sparkle trail (18 particles maximum), browser-local visit odometer, global click sounds, dawn mood, reversible responsive chaos mode.
- Reduced-motion support, semantic landmarks, visible keyboard focus, skip link, self-hosted fonts, no runtime external asset requests.

## Run locally

Requires Node.js 22.12+ (tested with Node 24.14) and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. For a production build:

```sh
npm run build
npm run preview
```

The deployable output is `dist/`. This is a static app with no server credentials or backend configuration.

## Checks

```sh
npm run lint
npm run build
npm test
```

The Playwright configuration uses installed Google Chrome. If Chrome is unavailable, run `npx playwright install chromium` and remove `channel: 'chrome'` from `playwright.config.ts`.

To exercise a separately running production preview in PowerShell:

```powershell
npm run preview -- --port 4173
# In another terminal:
$env:PIP_TEST_URL = 'http://127.0.0.1:4173'
npm test
```

Eleven Playwright scenarios cover the full visitor journey, actual AudioContext oscillator lifecycle, overlapping audio-start requests, immediate star clues, mobile navigation targets, guestbook validation/persistence/XSS-safe text rendering, blocked storage, reduced motion, keyboard access, touch interaction, swipe navigation, secret unlock and layouts at 1440×900, 1280×720, 768×1024, 390×844 and 360×800. See `VALIDATION.md` for executed results and limits.

## Source map

| File | Responsibility |
| --- | --- |
| `src/Art.tsx` | Original reusable Pip, nursery objects, town and sky |
| `src/App.tsx` | World scenes, navigation, origin, nursery, Easter egg, sound state |
| `src/Projects.tsx` | Four interactive portfolio projects |
| `src/Guestbook.tsx` | Local wish persistence, validation and safe rendering |
| `src/audio.ts` | Shared Web Audio engine, oscillator and timer cleanup |
| `src/styles.css` | Art direction, responsive compositions and motion preferences |
| `tests/bureau.spec.ts` | Browser interaction and layout checks |

## Credits

- **Pip character concept and canon:** [haX.baby official brief](https://hax.baby/baby-problem). Artwork here is an original SVG interpretation, **not official asset-pack artwork**.
- Original SVG illustrations, story, layout, and synthesized melody created for this project with OpenAI Codex. No stock images, sampled music, or AI image-generation assets.
- DM Sans: DM Sans Project Authors. DM Serif Display: Adobe and Google; distributed through Google Fonts. Both fonts are self-hosted under the SIL Open Font License. Complete licenses are in `public/fonts/`.
- React / React DOM (MIT), Vite (MIT), TypeScript (Apache-2.0), ESLint (MIT), Playwright (Apache-2.0), and their dependencies retain their upstream licenses.

## Honest limitations

- Wishes stay in the current browser. **There is no shared backend and the live guestbook bonus is not claimed.**
- The odometer counts page loads in this browser, not people or global visits. Browser storage may be cleared or disabled.
- Audio has been verified programmatically in Chromium, not auditioned on physical speakers or tested on every mobile browser.
- Touch checks use Chromium mobile emulation; physical iOS Safari / Android testing remains advisable.
- The Sites hosting repository is not a public GitHub repository. The owner must publish the genuine local history to GitHub before submission.
- No hackathon entry has been submitted. No submission ID or private form fields are fabricated.

## Deploy to Netlify

1. Create a **public GitHub repository** in your account; preserve the local Git history when pushing it. Do not backdate commits.
2. From this folder, add that repository as the Git remote and push the current branch. If you choose `main`, rename the local branch using `git branch -M main` first. Use the actual repository URL from GitHub.
3. In Netlify, choose **Add new site → Import an existing project**, connect that repository, and select its branch.
4. Set build command to `npm run build` and publish directory to `dist`. Use Node 22.12+ or Node 24. No environment variables are needed.
5. Deploy, open the returned URL in an incognito window, and test the sound toggle, wishes and secret room on a phone.

Alternatively, upload the built `dist` directory using Netlify’s manual deploy interface. You still need a public GitHub repository for the competition.

## Deploy to Vercel

1. Import the public GitHub repository into Vercel.
2. Choose the **Vite** preset, install command `npm ci`, build command `npm run build`, output `dist`.
3. Deploy without environment variables. Verify the returned public URL and mobile behavior before submitting.

Sites hosting metadata, when used, is tracked in `.openai/hosting.json`; it is not required for Netlify or Vercel.

## Submission

Use `SUBMISSION.md` for the description and honest core/bonus checklists. The official brief specifies a deadline of **October 19, 2026, 17:17 IST**. The submission portal requires a registered account. Confirm actual required fields after signing in; never invent a hax-sub ID.
