# Task 6: "The designer's room" home page

Written by Chat. Only Chat edits this file; Claude Code reads it. Questions go under "Questions for Akshat" in HANDOFF.md.

Akshat's concept: the home page is one illustrated room (his studio in Mumbai) that the camera moves through as you scroll, with parallax depth. The project pages (ankur, savvy, greggs, critical-design) stay as they are.

**Assets** (in `assets/img/room/`, all 2752x1536 PNG except desk.png at 2816x1536; poses share one canvas with the feet on the same line):
- `Room Light.png` / `Room Dark.png`: room shell, day and night (night has the lamp on). **Window glass is not cut yet; Akshat is cutting it to transparent.** Build so the city layer sits behind the room shell and shows through once the glass is gone.
- `City Day.png` / `City night.png`: the view through the window.
- `Desk.png`: desk, monitors, laptop, chair.
- Poses: `Wave`, `Left up`, `Left Middle`, `Left Down`, `Right Up`, `Right Middle`, `Right Down`, `Cross hands`, `Book and pen` (graduation cap), `Chair` (sitting).
- **Before using them:** convert to WebP (keep the alpha channel) and rename to lowercase-hyphen names (e.g. `room-day.webp`, `pose-left-up.webp`). The room and city images are 4-5 MB each as PNG. Keep the PNG originals out of the page.
- `Chair.png` has leftover green in the mesh back, and `Left Middle` / `Right Middle` are 2750px wide. Akshat is fixing both; don't work around them in code.

**Layers, back to front:** city → room shell → desk → character → (optional foreground plants later). Each layer moves at a different rate on scroll.

**Scroll story (one sticky stage, sections scroll past):**
1. **Hello:** wave pose. Name, plus the line "UX and UI designer studying Design Futures in Mumbai." on a solid card (not over busy art).
2. **Work:** the four cork boards on the side walls are the projects: Ankur, SAVVY, Greggs, Critical Design. Each board is a real `<a>` link to its page, with a visible text label on the board. Hovering or focusing a board swaps the character to the pose pointing at it (left/right × up/middle/down; choose the nearest), crossfading about 150ms. Leaving it returns to the wave pose.
3. **Skills:** cross-hands pose. Keep the skills/tools content from the current page.
4. **Education:** book-and-pen (graduation) pose. Placeholder content.
5. **About and contact:** sitting pose. Keep the about facts and contact links from the current page.

**Day/night:** the existing theme toggle switches `room-day` ↔ `room-night` and `city-day` ↔ `city-night`. At night, give the desk and character a slight warm/dim tint in CSS. Optionally, add a soft lamp-glow overlay that pulses very gently.

**Parallax:** use CSS scroll-driven animations (`animation-timeline`) inside `@supports`, moving only `transform` and `opacity`. No JS scroll listeners. Keep the existing pointer drift subtle and don't stack the two transforms on the same element. Text never moves.

**Must hold:**
- `prefers-reduced-motion`: no parallax and no crossfade, but all content still reachable.
- Phones (390 wide): crop the stage to the character. Below it, the projects become a plain list of links (the same links, also visible to screen readers on desktop).
- Every board link is keyboard-focusable with a visible focus ring. Pose images get `alt=""` (decorative); the links carry the meaning.
- First paint: load only the day or night set needed; lazy-load the poses.
- **Build the Hello and Work sections first, then stop** so Akshat and Chat can review before the rest.
