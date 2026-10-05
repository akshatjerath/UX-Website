# Task 6a: Chat's review fixes for the room home page (Hello + Work)

Written by Chat. Only Chat edits this file; Claude Code reads it. Do these before Skills, Education and About.

Chat tested it independently at 1440x900 (day and night), 390x844, hover on all 4 boards, keyboard and reduced motion.
Pose swaps are correct for all 4 boards, axe is clean day and night, there's no horizontal overflow at 390, and only the active day/night set loads.

## 1. Composition: the desk and character are drawn at full canvas size (main fix)
`.l-actor img` fills the whole room box, so the desk top sits halfway up the wall, the monitors cover the window, and the character's head sits on the lamp shade. Akshat approved "option B": scale both down onto the floor, and move the character to the right of the desk. Chat tested these exact values, and they look right in day and night at 1440x900:

```css
.l-actor .desk { transform-origin: 50% 95%; transform: scale(.58); }
.l-actor .pose { transform-origin: 50% 97%; transform: translateX(17%) scale(.72); }
```

Result: the full window and Mumbai view are visible, the lamp hangs clearly above everything (the night cone lands on the floor and rug), the desk stands on the floor, and the character stands right of the desk.
- Combine these with any existing parallax transforms on these elements. Don't let one override the other (wrap in an element if needed).
- **Phone and portrait crop:** the crop currently centres on the old character position. Re-centre it on the character's new position (right of centre). Keep the desk partly in view if it fits.
- Re-check that the pointing poses still read correctly from the new position (left poses now point across the desk).

## 2. Stray line, top-left
A thin grey horizontal line near the Ankur board (about x 45-157, y 155 at 1440x900 on load; it moves with the room). It shows in day and night with no hover. Probably an outline or border on a board element. Remove it.

## 3. Phone: big empty gap
At 390x844 there's roughly 1000px of blank space after the Work list, before the old sections. Probably the pinned stage's height. Remove it on narrow and portrait layouts.

## 4. Phone copy
"Point at a board, or tab to one, and open it." makes no sense on phones, which show a list. Use e.g. "Four projects. Pick one to open it." in the list layout, and keep the board line for the room layout only.

## 5. Small
The "Critical Design" label wraps to two lines and nearly touches the right edge at 1440. Make it single-line or nudge it in.

## 6. Git hygiene
Add `assets/img/room/*.png` to `.gitignore` (the PNG originals, about 30 MB). Only the `.webp` files are used.

## Decisions from Akshat
- Board mapping is approved. Keep the wireframe board as plain art (it's room for a 5th project later).
- Yes, delete the unused old hero and work-list CSS/JS.

When done: run the usual axe and overflow check (task 4), add a line to Done in HANDOFF.md (re-read it from disk right before writing), then stop.
