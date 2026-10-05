# Task 6c: work at a glance, the rest of the room story, and an all-projects deck

Written by Chat. Only Chat edits this file; Claude Code reads it. Do this after 6b (or merge into it if 6b is still open).
It comes from Chat's impeccable critique (score 22/32) and ponytail review of the room home page, plus Akshat's answers.

## Akshat's decisions
- **First priority:** make the work visible at a glance.
- **Scope:** the top 3 critique issues plus the ponytail fixes.
- **Projects:** keep all four boards **equal**, with no lead project.
- **Below the room:** don't cut it down. Build the missing sections **as part of the room story**: Skills, Work experience, Education, About and contact. Then add a **deck of cards with ALL projects**: the best ones are a quick glance on the boards at the top, and the full set lives in the deck. Today the projects can only be reached from one place; the deck fixes that.

## 1. Work visible at a glance (P1, do first)
- The posters must be visible **on load** at full opacity. Today `label-in` keeps them at opacity 0 until about 0.45 of the stage has scrolled, so the first desktop screen shows empty cork boards. Keep, at most, a subtle entrance that starts at range 0.
- Until the real poster images exist, the poster face shows **name plus project type** (e.g. "Ankur · Early-years teaching app", "SAVVY · Dine-out deal app", "Greggs · UX case study", "Critical Design · Speculative design"). Give each poster its **own muted colour** from the room palette (teal, terracotta, mustard, sage), all equal in size and weight.
- Add a small scroll cue on the Hello card (e.g. "Scroll to look around ↓"). It must be static under reduced motion.
- **Focus ring:** the thin red outline on terracotta and cork is weak. Use a two-tone ring (light inner, dark outer) that shows on `:focus-visible`, the same as the hover ring.

## 2. Ponytail fixes
- Phones and the list layout never show the pointing poses, yet about 204 KB of them still downloads. Give the hidden pose `<img>`s `display: none` in the list layout. `loading="lazy"` images with `display: none` aren't fetched.
- Don't request files that don't exist: drop the `onerror="this.remove()"` pattern on the posters, and only add a poster `src` once its file is in `assets/img/room/`. Same for the template media slots: no 404s in the console on any page.
- "Back to top" is 72x22. Make it at least 24px tall.

## 3. The rest of the room story (replaces the old template sections)
Keep the pinned room and continue the scroll story with a pose per section, crossfading like the boards, all driven from one commented CSS block so Akshat can edit it:

| Section | Pose | Content |
|---|---|---|
| Skills | `pose-cross-hands` | The current Research / Design lists and tools, as a card |
| Work experience | `pose-right-down`, pointing at the lower-right **wireframe board**, which becomes the "experience" board | Card with role entries. **Placeholders only**: `Replace: role, organisation, dates, one line`. UX/UI-relevant work only (Akshat said no game or level design on this site). |
| Education | `pose-book-pen` (graduation cap) | "MDes Design Futures, ATLAS SkillTech University, Mumbai" (current) plus `Replace:` lines for earlier education |
| About and contact | `pose-chair` | The About text and facts, contact. **No dead links**: show a social link or "Download resume" only once it has a real URL. Hide `mailto:you@example.com` until the real email is set, using a visible `Replace: your email` placeholder instead. |

- Cards use the same solid card style as Hello/Work, never text over busy art.
- Reduced motion: no crossfade, the poses simply switch; all content stays readable.
- Phones and the list layout: the sections stack as normal blocks under the cropped room (one pose image per section at most, or none), nothing pinned.

## 4. All-projects deck (below the room)
- A section titled e.g. "All projects": a **deck of stacked cards**. As you scroll, each card slides up and stacks on the previous one with a slight scale-down and offset, giving depth. It's inspired by Framer University's "Stacked Cards With Depth" / "3D Stacked Scroll Animation" ideas, rebuilt in plain CSS (`position: sticky` plus a scroll-driven scale/translate inside `@supports`). No library.
- Each card: poster (or the coloured fallback), name, type, 1-2 line blurb, and a clear "Open project" link. The whole card is one link.
- Start with the same 4 projects, in the same order as the boards. The markup must make adding a 5th or 6th card a copy-paste of one `<li>`.
- Use the blurbs from REVIEW-6B (Greggs stays a `Replace:` placeholder).
- Reduced motion, Firefox (no scroll timelines) and phones: a plain vertical stack or grid of the same cards, fully readable.
- Keyboard: each card is one Tab stop, in order, with a visible focus ring.

## 5. Remove
- The **Critical Design statement band** (the board and the deck now cover it).
- The old "Skills and tools", "About" and "Contact" template sections, once their room versions exist.
- **Keep "How I work"** for now (accordion as it is), placed after the deck. Akshat hasn't decided on it.

## Checks when done
- axe clean and no overflow on all 5 pages, light and dark, at 1440x900 and 390x844.
- No console 404s on the home page.
- Screenshots of: first load at 1440 (posters visible), each room section, the deck mid-scroll, and the phone layout.
- Re-read HANDOFF.md from disk right before adding the Done line. Then stop.
