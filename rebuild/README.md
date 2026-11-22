# SIMple Academy — Clean Rebuild
This branch preserves the existing main-branch application untouched. The new preview is at `rebuild/index.html` and is intentionally independent of the legacy CSS and JavaScript.

## Current diagnosis
- Legacy application is a large monolithic HTML document with multiple generations of CSS and forced overrides.
- No root package.json or README was found.
- Version 5.91/5.92 illustration rollouts were followed by a return to 5.90.
- The original educational content and approved illustration assets must be retained and audited before replacing the live site.

## Rebuild principles
1. Single visual system: white, large Segoe UI text, accessible contrast, one card per page.
2. Mobile-first swipe and desktop arrows.
3. Question gating: incorrect answers cannot advance; going back remains available.
4. Respect reduced-motion preference and keyboard navigation.
5. Separate course content, rendering components, styles, and assets as the project grows.
6. Preserve original main and deploy only after browser/device verification.

## Foundations milestone — 19 November 2026

- **Recovered the original 14-card Foundations sequence** from the previous main-branch course, including six mandatory Yes/No question cards and their original correct-answer rationale.
- Separated curriculum content (`course.js`) and visual scenes (`art.js`) from the app shell (`index.html`).
- Added **14 distinct concept-specific SVG illustrations**, with question-card artwork visually separate from explanation cards.
- Improved Card 1's faceless collaboration illustration after manually rendering the exact SVG and identifying a detached right arm. The updated artwork places characters more consistently and keeps hidden lower bodies behind the shared board; this is not certification of the full illustration set.
- Expanded the pre-course route map to 14 one-word markers in a winding 4-column desktop / 2-column mobile layout.
- Preserved bottom card-type markers, backward navigation, saved correct answers, and forward gating at mandatory questions.
- Added a local test server, Playwright browser checks, and GitHub Actions workflow. Automated test status must be verified from the workflow run; source syntax checks alone do not establish browser correctness.

### Visual quality gate

Before declaring any course art ready, **render and review the image** at desktop and phone card sizes. Check head/neck, shoulder/arm connection, elbow/wrist direction, hands/object contact, pelvis/legs if exposed, occlusion, physical balance, and consistent stroke/colour/shadow style. Avoid hidden or ambiguous joints that imply extra or detached limbs. Do not ship distorted anatomy.

### Still outstanding

- Confirm GitHub Actions Chromium tests have passed and inspect browser screenshots.
- Manually inspect the remaining 13 artworks at actual card size (source-level SVG validation is not visual inspection).
- Review all restored educational wording and implications before release; no live deployment has been made.
- Add broader learning modules (Assumptions, Kolb, RCDP) and further exercise types after Foundations is validated.
- Keep production `main` intact until user approval and successful quality checks.

## Map-alignment and artwork reset — 19 November 2026

- **Replaced static mismatched route SVGs and CSS grid positioning.** `map.js` now computes one ordered set of coordinates per breakpoint and uses those exact numbers for SVG route vertices and button centres. The route detours around labels between rows rather than crossing the label text.
- Added a Playwright assertion that every marker centre is within 1.5 CSS pixels of the corresponding route anchor at 1320px desktop and 390px mobile widths. This checks DOM geometry rather than only a screenshot.
- **Discarded the anatomically distorted, hand-coded Card 1 puzzle figures** from `art.js`; they are no longer part of the course.
- Card 1 now uses an embedded **small, static image derived from the earlier flat faceless educational illustration the user preferred**, with vibrant warm/cool colours and soft matte texture. The original user-supplied group/puzzle reference remains the broader style benchmark. This is **a visual-direction sample, not a final production-quality custom illustration**.
- A restrained entry fade preserves static character anatomy. No simulated body-part movement or false "interactive puzzle" control.
- The 13 remaining cards use individual SVG illustrations; each still requires case-by-case human visual QA, especially any human anatomy.
- Production remains untouched. Do not merge until the user has reviewed Card 1's actual appearance and the complete illustration set is checked.

## Illustrated course map — 19 November 2026

- Added `map-icons.js` with **14 hand-built, concept-specific SVG symbols**, one per one-word card marker (Andragogy, Experience, Learner, Guidance, Assumptions, Safety, Meaning, History, Knowles, Spectrum, Structure, Simulation, Pathways, Remember).
- Icons use the warm flat-vector colour system and deliberately simple, anatomy-free metaphors (no complex faces, hands or limbs in tiny markers).
- Small question accent badges differentiate the six question stops without sacrificing their subject icons. A separate check badge marks completed stops.
- Locked destinations remain visibly muted and non-interactive, while their imagery remains recognisable.
- **Marker centres and dotted-path anchors continue to share exact coordinates** on desktop and mobile, and the forward answer gate and unrestricted backward navigation remain unchanged.
- Added Playwright checks for icon count, 14 distinct SVGs, six question accents, saved completion states, responsive no-overflow and 1.5px path alignment.
- Before approval: inspect the final browser-rendered illustrated map and verify contrast, icon recognition, visual consistency and mobile labels. The design should not be considered approved solely because tests pass.

## Learning-card visual pass — 22 November 2026

- Kept the previously approved fourteen-stop course map, distinct miniature vector markers, one-word labels, question accents and precise SVG route alignment.
- Added `lesson.css` to **visually separate information and mandatory Yes/No question cards**, with a large two-answer interaction and smaller supporting question artwork.
- Added `lesson-interactions.js` for seven optional concept replays: learner route, assumptions, book, timeline, autonomy spectrum, simulated ECG, and three-part recap. They do **not** unlock mandatory questions. All effects respect `prefers-reduced-motion`.
- Replaced the overly schematic learner slide illustration with a **flat layered-paper learning route**: vibrant coral, mustard, teal, sky blue, cream paper, gentle shadows, and fine grain. It contains **no human figures**, avoiding the earlier distorted anatomy entirely.
- Replaced the ambiguous patient/manikin silhouette on the simulation slide with a clean empty clinical bed and monitor graphic; improved the visible matte grain and scale without distorting the SVG aspect ratio.
- Conducted an **actual rendered browser screenshot review** of information, question, learner, assumptions, history and simulation cards on desktop/mobile. This is different from the earlier text-only syntax inspections.
- The eight Chromium automated tests passed at that milestone; newer integration tests extend this coverage. tests cover all 14 cards, all six mandatory questions, progress persistence, map alignment, non-overflow on mobile, question/information separation, concept replay and reduced-motion behaviour.
- **Still provisional:** text, concept art and visual quality beyond this 14-card Foundations module. Do not merge or deploy without user reviewing actual new screens. No new full-body SVG artwork should be added until anatomy and visual approval requirements are met.

## Card 1 moving-puzzle implementation — 22 November 2026

- Integrated **the real four-second moving-centre-puzzle animation** into the Andragogy intro card. It is an H.264 MP4, shipped as a small repo-owned binary at `rebuild/assets/andragogy-card1-motion.mp4` (400×224 compressed preview).
- `hero-motion.js` renders the real video with muted, inline, looped autoplay where allowed, plus explicit **Replay** and **Pause/Play** controls. A native video URL is available if decoding fails.
- For learners requesting reduced motion, the video **does not autoplay**; it remains paused until the learner chooses Play. A separate replay starts at the beginning, whereas Play resumes from pause.
- New browser tests decode and compare **actual presented video frames** at different playback times; a moving video clock alone does not count as animation. The test also covers replay, pause, mobile sizing and reduced-motion behaviour.
- Kept the visually approved map, 14-card sequence, progress indicators, question gating and saved answers unchanged.
- Removed the previous generic, static clinician image from the Card 1 implementation and from the rebuild codebase. The original full-resolution illustration and layered SVG are not yet included: this MP4 is an **actual moving and deliberately compressed preview**, not a final independently editable vector animation.
- This remains an **unmerged draft PR**, with no live website changes.
