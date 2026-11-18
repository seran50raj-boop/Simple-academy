# SIMple Academy — Illustration Style Specification (approved direction)

## Source of truth
The reference is the illustration uploaded in the chat on **2026-11-18**: four adult collaborators around an oversized, diagonally oriented jigsaw/puzzle document on a clean white background. The uploaded image itself is **not stored in the repository**. Do not call unrelated, previously generated cartoon/3D images the approved style.

This file records the user's explicit choice: **"I want this style."** Treat it as the acceptance criterion for all new illustration work in the clean rebuild.

## Visual DNA
- **Flat editorial vector illustration**, modern educational/corporate rather than storybook, anime, glossy 3D, photorealistic, or childish clip art.
- **Human figures are simplified, mature, and minimally expressive**. A few understated eye/nose marks are acceptable when matching the source reference, but avoid prominent eyes, large smiles, detailed expressions, eyelashes, blush, exaggerated anatomy or character acting. Prefer near-faceless faces wherever the learning idea does not require expression.
- **Minimal/no black outline**: build forms with contiguous vector fills, hair and garment silhouettes; sparse fine lines only for folds, objects and boundaries.
- **Match the reference's actual vibrant saturation and colour contrasts**: vivid burnt orange and terracotta, bright mustard/apricot, clear light sky blue, warm cream, and deep chestnut/aubergine brown. Colours should feel fresh and expressive rather than washed-out, dusty, or uniformly pastel. Preserve the reference's crisp contrasts, while avoiding neon.
- **Composition**: white or warm-white open background, generous negative space, 2–4 figures participating in a collaborative task, oversized central metaphor/prop. Angled/isometric-like planes are welcome but not technical isometric projection.
- **Textures are essential, not optional**: reproduce the reference's tactile matte/paper-like finish, subtle grain in colour areas, delicate tonal variation and slightly hand-crafted fabric/paper treatment. Texture must remain visible at card size, without becoming photographic, fuzzy or noisy.
- **Depth**: visible but soft contact shadows under bodies, hands, and the large paper/puzzle surface; gentle overlapping layers and slight shaded shape edges. Never flatten the entire scene into unshaded clip art. No hard glossy highlights, dramatic lighting, heavy 3D, glassmorphism or UI-like floating holograms unless a specific concept needs them.
- **Shapes**: rounded organic silhouettes with clean geometric objects, simple hands and facial profiles, limited garment creases.
- **Typography**: illustration is generally text-free. Render slide text as accessible HTML, not as text baked into artwork.

## Animation treatment (for actual SVG or layered art)
- Keep figure and prop proportions stable from frame to frame.
- Animate one purposeful change at a time (hand placing puzzle piece, pointer following a line, a puzzle part sliding into position, a group looking toward the shared object).
- Use small translations/rotations, 200–750ms for actions; ease-in-out. No bouncing, blinking lights, unrelated motion loops, parallax-heavy zooms or expressive lip/eye animation.
- Respect prefers-reduced-motion. Ensure the key teaching state is visible without animation.
- Favor real independent SVG groups or separately layered assets. A static bitmap with ornamental motion overlays is not a replacement for animated figures.

## Course application examples
- **Andragogy / experience**: 3–4 adult learners assembling pieces of a large experience puzzle. One piece arrives when relevant previous experience is selected.
- **Relevance**: adults arrange situation → learning need → action along an oversized paper pathway.
- **Autonomy**: participants choose paths, place markers, and determine direction.
- **Kolb**: four simple scenes connected through a circular experience/reflection/concept/experiment motion.
- **RCDP**: repeated mini-practice with a pause/feedback/retry visual sequence.

## Rebuild rules
1. Do not repeat the same illustration on every card.
2. Information/illustration cards and question cards remain independent.
3. The bottom progress bar differentiates card types; forward navigation is gated by unanswered required questions while backward navigation is unrestricted.
4. The one-word-label course journey map appears before the cards.
5. Style approval is **not** visual QA: verify output against the uploaded source and show a true rendered preview before merging.
6. The current rebuild placeholder vector **does not satisfy this specification** and must be replaced.

## Explicit confirmation
The user reaffirmed: **keep the SAME vibrant colours AND the visible textures as the uploaded puzzle-collaboration reference**. Do not interpret “faceless vector” as desaturated monochrome icons or simplistic flat untextured clip art.

## Iteration chosen after the original reference
The newest approved *directional improvement* is the **flatter, more minimal, entirely faceless** six-frame study illustration. The user responded **"even better"** (not yet final sign-off).
- Reduce object count and busy background elements; one readable central teaching metaphor per card.
- Use larger, clean, almost solid colour blocks and fewer internal fold/detail lines.
- **No drawn eyes, brows, noses, mouths, or facial expressions** in standard people illustrations.
- Keep the original reference's vivid coral/orange, sky blue/teal, warm cream and complementary accent colours. Avoid faded pastel and glossy gradient rendering.
- Preserve fine matte paper/fabric texture **subtly**; it should be visible but not gritty or painterly.
- Use only soft, localized contact shadows, not complex lighting or 3D shading.
- Animate individual vector elements with restrained gestures, never a highly expressive character performance.
- The six-frame demonstration is a useful style study, but **is not a final card design or reusable animation file**. Build and review a real course card with purpose-specific art next.
