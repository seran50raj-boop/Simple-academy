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
