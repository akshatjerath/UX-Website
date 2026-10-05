# Handoff: Claude Code <-> Claude (chat)

Two Claude sessions work on this repo. They can't message each other, so this file is how they talk.
Akshat commits and pushes. Neither Claude commits, pushes or merges.

## Roles
- **Claude Code** builds: edits HTML/CSS/JS, runs the site locally, runs checks.
- **Claude (chat)** reviews: reads the files, checks layout and accessibility, writes tasks and findings here.
  It can make small fixes too, but only ones listed under "Chat is editing", to avoid clashes.

## Rules
1. Read this file before starting work, and update it when you finish.
2. Only edit a file listed under "Claude Code is editing" if you are Claude Code, or under "Chat is editing" if you are Claude (chat). Never both at once.
3. When a task is done, move it to Done with one line saying what changed.
4. Don't invent project facts. Unknown content stays as a `Replace:` placeholder.
5. **Re-read this file from disk immediately before every write, and edit it in place.** Never write a copy you remember, and never restore it from git. The other session writes here too. It has been overwritten twice already (2026-10-05) and notes were lost both times.

## Claude Code is editing
- (nothing)

## Chat is editing
- (nothing)

## To do (for Claude Code)

### 6. NEW HOME PAGE: "the designer's room" (top priority, replaces task 3 and the old parallax task)
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

### 4. After each task
Serve locally and run axe on all 5 pages, dark and light, at 1440 and 390 wide. There must be no horizontal overflow. Write the results under Done.

## On hold
- Old task 3 (thesis titles / artefact cards) is superseded by task 6 for the home page. The SAVVY thesis line, if needed anywhere: "Turns coins, cashback and card offers into what you actually pay."

## Questions for Akshat
- Greggs: what was the project, your role, and the year?
- Which other UX/UI projects should be added?
- Room boards: the art has 5 cork boards (left outer, left inner, right inner, right outer top, right outer bottom with wireframes) but there are 4 projects. Claude Code linked Ankur = left outer, SAVVY = left inner, Greggs = right inner, Critical Design = right outer top, and left the wireframe board as plain art. Want a different mapping, or a fifth project for that board?

## Done
- 2026-10-06: **Task 6b, pinned project posters (Claude Code). All of REVIEW-6B.md done: items 1 to 3 plus the closing check (the file has three numbered items). Skills, Education and About are still not built.**
  1. Posters and hover cards. Each board is now a poster (portrait 3:4, tilted a few degrees by `--rot`, red pin on top) and the whole poster is the `<a>`. The old text labels are gone. Until `assets/img/room/poster-NAME.webp` exists it shows a plain accent-coloured card with the project name; if the file is missing, `onerror` removes the `<img>` and the card stays. I tested with a temporary 600x800 file (removed again; no poster files are in the repo): it covers the card, pinned and tilted. Posters load eagerly, not lazily: lazy images stayed unfetched in my browser even when in view, and the files are small.
     - The card (name with arrow, kind, blurb) is part of the link. The link is named by the project name (`aria-labelledby`) and described by the kind and blurb (`aria-describedby`); no `title`. Chat's blurbs are used as written; Greggs shows a visible `Replace: one or two lines on the project.` placeholder.
     - It shows on `:focus-visible` everywhere, and on `:hover` only under `(hover: hover)`, so a tap on a touch screen just opens the page. The pose swap follows the same rule. Reduced motion: the card appears without sliding.
     - Side: Ankur and SAVVY open to the right, Critical Design opens to the left, and Greggs opens below its poster (`data-side="below"`) because opening it beside the poster covered the character's head and pointing arm.
     - Inside the viewport: checked 4 window shapes (1440x900, 1280x720, 1920x1080, 1100x620), each at scroll 0, 800 and the end of the pinned range, on all 4 posters (48 cases). Every card and poster is on screen and focusing never scrolls the page. With real Tab presses and a stable scroll position, tabbing through all four moved the page 0px.
     - Phones and narrow or portrait windows (list layout): a 72px poster thumbnail, then name, year, kind and the blurb in each row.
     - Posters fade in as the Work step arrives, like the labels did, and always show on hover or focus.
  2. Ankur's pose: compared `pose-left-up` and `pose-left-middle` with posters in place. `left-up` leaves the hand beside the head; `left-middle` points across the desk toward the left wall. Ankur now uses `left-middle`, same as SAVVY. `pose-left-up` is no longer in the page (image tag and CSS rules removed); its WebP is still converted if you want it back.
  3. README updated: the blurb note under "Fill it in", the poster exception to the empty-slot rule, a rewritten "Add another project" (new `<li>`, ids, poster file, `data-pose`, `data-side`, `--x --y --w --h --rot`, how to use the free wireframe board and what a sixth project needs), the "What is in it" list (room, parallax, posters; old hero drift and cursor preview removed), and the `index.html` asset checklist (the four posters added; hero and work-cover entries removed; a note that the room art is already in `assets/img/room/` and the PNGs are git-ignored). The starting numbers I give for a fifth poster on the wireframe board are an estimate from the art, not measured on screen.
  - Checks: axe (wcag2a, 2aa, 21a, 21aa, 22aa, best-practice) clean and no horizontal overflow, 28 of 28: all 5 pages, dark and light, at 1440x900 and 390x844, plus the home page at 1280x720 and 1920x1080 (room) and 1024x768 and 768x1024 (list), with a board focused so its card is checked too. After the last small change (poster images eager) I re-ran 8 of 8 (home and two other pages), clean. I could not toggle `prefers-reduced-motion` in my browser, so that part is checked by reading the CSS only. The impeccable detector was not re-run on this diff.
  - Heads up: this file had been rolled back to an older copy before this session, which dropped my 6a entry and the removal of the "6a, do these next" line. I did not restore it from git. I removed the stale 6a line again and re-added a condensed 6a entry below, copied from my own staged text. If Chat wrote a 6b note into this file in the meantime, it is not here.
- 2026-10-06: **Task 6a, Chat's review fixes (Claude Code). Re-added after the file was rolled back; condensed. Chat's check of 6a passed (see REVIEW-6B.md).** (1) Composition: `.l-actor .desk` `scale(.58)` and `.l-actor .pose` `translateX(17%) scale(.72)`, on the images inside the parallax layer so they never override it; phone crop re-centred at 60% across the art. (2) Stray line was the first board link's `border-top` winning on specificity; fixed. (3) Phone gap not reproduced: 144px measured, and the stage adds no height there; Chat later confirmed it was a screenshot artifact. (4) Phone copy: two spans, `copy-room` and `copy-list`, only the matching one displays. (5) Critical Design label single line (superseded by 6b: labels are now posters). (6) `.gitignore` with `assets/img/room/*.png`. (7) Deleted the old hero and work-list CSS and the pointer drift and cursor-preview JS (`.section-head` and `.btn-row` kept). Checks: axe and overflow clean, 28 of 28. Important for committing: the 15 `.webp` files and the room markup were not in any commit at that time; commit `index.html`, `styles.css`, `main.js` and the `.webp` files together.
- 2026-10-05: **Task 6, Hello and Work sections (Claude Code). Stopped here for review; Skills, Education, About and contact are not built.** Hello (wave pose, name and line on a solid card) and Work (4 cork boards as real links, label chip on each, hover or focus swaps to the nearest pointing pose with a 150ms crossfade) sit on one sticky stage with layers city, room shell, desk, character. Changed: `index.html` (hero and work list replaced by the room; `#process` got its normal top padding back), `styles.css` (new "Room home" block, theme tokens for the day/night images, tint and glow), 15 new WebP files in `assets/img/room/` (29.8 MB of PNG became 1.43 MB, alpha kept; PNG originals untouched and not referenced anywhere). No JS was added or changed. Details:
  - Theme: the existing toggle drives the images through CSS tokens, so only the day or night set is ever requested. Night gets a warm dim tint on desk and character, and a gently pulsing lamp glow. Window glass is already transparent in both room images, so the city shows through.
  - Parallax: CSS `animation-timeline: scroll(root)` inside `@supports`, `transform` only, no scroll listeners. City, room shell and the desk-plus-character group scale at 1.03, 1.055 and 1.09. The boards share the room shell's exact transform so they stay on their art. The pointer drift was not added to the room. Labels fade in as Work arrives, and always show on hover or focus.
  - Reduced motion: no parallax, no label fade, no crossfade; everything reachable.
  - Narrow or portrait windows (under 761px wide, or wider than tall below about 1.55:1) get the cropped-to-character stage, then Hello, then Work with the same four links as a plain list (year, title, kind). Reason for the aspect rule: below about 1.55:1 the outer boards would be cropped off the screen. The Greggs year stays a visible `Replace: [Year]` placeholder in the list.
  - Fixed on the way: board links are clamped to stay fully on screen, and the stage uses `overflow: clip`; otherwise focusing an edge board made the browser scroll the page.
  - Checks: axe (wcag2a, 2aa, 21a, 21aa, 22aa, best-practice) clean and no horizontal overflow on all 5 pages, dark and light, at 1440x900 and 390x844 (20 of 20), plus home page at 1280x720, 1920x1080 (room) and 1024x768, 768x1024 (list), 8 of 8. After the last CSS tidy the home page was re-run at 1440 and 390, 4 of 4. Keyboard: Tab reaches the four boards in order, each shows a focus ring and the right pose, and focusing causes no page scroll at scroll 0, 700, 1000 and 1240. Impeccable detector run on this diff: one fair finding fixed (card had a 1px border and a wide shadow; border removed). The rest are intentional or older: opacity-0 poses are the hover states, the stage clips the art on purpose, and the Instrument Sans and 3 layout-transition warnings are not from this work. Humanize pass on the two new lines: no changes. Axe was not re-run after that last border removal (no colour or layout change).
  - Left for you to decide or do: (1) the old hero and work-list CSS (`.hero`, `.stage`, `.layer`, `.work-row`, `.preview`) and their JS (pointer drift, cursor preview) are now dead code on the home page. Not removed, so nothing you may still want is lost; say the word and Claude Code deletes it. (2) `#process`, the Critical Design band, skills, about and contact still use the old styling below the room until the later steps. (3) Between about 1.55:1 and 1.9:1 the stage crops the art by up to a few percent at the sides; ultrawide screens crop top and bottom. (4) Only the 5 pose images used so far are in the page; the other 5 WebP files (left-down, right-down, cross-hands, book-pen, chair) are converted and ready.
- 2026-10-05: **Chat check of the room assets.** All 10 poses are consistent (same face, scale and feet line), transparent, with no green fringe. Outstanding (Akshat): cut the window glass in both room images, remove the green from the chair mesh, and set the 2 middle poses' canvas to 2752.
- 2026-10-05: **Chat review of tasks 1 and 2: passed.** Re-ran independently: axe clean and no overflow on all 5 pages (dark and light, 1440 and 390), plus a live-host check. Menu lock, Escape and resize behaviour all correct. "Selected work" heading at y=780 on 1440x900.
- 2026-10-05: Task 1, hero spacing (Claude Code). Removed the forced min-height and trimmed the work section's top padding. Heading moved from y=996 to y=780 on 1440x900. Axe and overflow clean, 20 of 20.
- 2026-10-05: Task 2, mobile menu (Claude Code). Full-screen panel, scroll lock via `html.menu-open`, Escape returns focus, link click closes it, resizing past 760px closes it. Axe and overflow clean, 20 of 20.
- 2026-10-05: The 4 project pages, name, intro lines and Work/About nav merged to main (PR #1).
