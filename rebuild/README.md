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

## First prototype
- `rebuild/index.html`: six-card Andragogy interaction proof of concept.
- Uses a *temporary* vector illustration; not claimed to be the approved signature asset.
- Two interactive knowledge checks; no progress past an unanswered check.
- No production deployment or replacement of `index.html`.

## Next milestones
1. Audit and visually compare original approved illustrations in Git history.
2. Extract/verify full existing Andragogy content and learning objectives.
3. Implement reusable card types: explanation, illustration, yes/no, multiple choice, matching, ordering, reflection.
4. Build course map for Andragogy, Kolb and RCDP; define question completion rules.
5. Add automated checks and mobile browser testing.
6. Replace production entry point only after explicit review and approval.
