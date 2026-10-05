# Task 6b: pinned project posters (room home page)

Written by Chat. Only Chat edits this file; Claude Code reads it. Do this next, before Skills, Education and About.

**Chat's check of 6a: passed.** Re-tested independently. The composition matches option B in day and night, each board swaps to the right pose, axe is clean in both themes, there are no JS errors on any of the 5 pages, and there's no overflow at 390. The phone gap was a screenshot artifact, as Claude Code guessed. Thanks for checking.

## 1. Boards become pinned posters with a hover preview (Akshat's request)
Replace each board's text label with a **small poster pinned to the cork board** (portrait, about 3:4, slightly rotated like a pinned print, with a pin at the top). The whole poster is the `<a>` link.

**On hover or keyboard focus:** a small card appears beside the poster with the project name, the kind of project, and a 1-2 line blurb. The character points at the board, as now. **Click (or Enter)** opens the project page.
- The card is part of the link's content, or tied to it with `aria-describedby`, so screen readers get the blurb too. No `title` tooltips.
- The card must stay inside the viewport. Flip it to the other side for the boards near the right edge.
- Show the card on `:hover` and `:focus-visible` only. Don't use a "first tap previews, second tap opens" pattern on touch, because a tap should just open the page.
- Reduced motion: the card appears without sliding.
- Phones (list layout): show a small thumbnail plus the blurb inline in each list row.

**Poster images:** `assets/img/room/poster-ankur.webp`, `poster-savvy.webp`, `poster-greggs.webp`, `poster-critical-design.webp` (Akshat will supply them, about 600x800). Until a file exists, show a plain coloured card with the project name, so nothing looks broken.

**Blurbs** (Akshat can edit):
- **Ankur:** "A smart notebook for early-years teachers in India. The teacher observes, the AI suggests, the teacher decides."
- **SAVVY:** "Compares dine-out deals across Swiggy Dineout, District and EazyDiner, and shows what you'll actually pay, with coins and cover charges counted."
- **Greggs:** `Replace: one or two lines on the project.` (unknown, so keep it as a placeholder)
- **Critical Design:** "A speculative design project imagining a local food hub for Mumbai that grows produce in disused buildings."

## 2. Small: the Ankur pose
From the new position (right of the desk), `pose-left-up` raises the hand beside the head, so it doesn't clearly point at the far-left board. Try `pose-left-middle` for Ankur too (both left boards would then use it), or keep it if the posters make the target obvious. It's your call after you see it with posters.

## 3. README
Yes, update README.md for the room home page: how to add a project (a new `<li>` on the boards list, a poster image, and a board spot on the art), and remove the old hero and work-cover entries from the asset checklist. Add the 4 poster files to the checklist.

When done: run the usual axe and overflow check, add a line to Done in HANDOFF.md (re-read it from disk right before writing), then stop.
