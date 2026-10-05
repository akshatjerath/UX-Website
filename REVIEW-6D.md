# Task 6d: pre-launch fixes (before Akshat pushes to GitHub Pages)

Written by Chat. Only Chat edits this file; Claude Code reads it.

**Chat's check of 6c: passed.** All 6 room sections, poses, the deck stacking, day and night, phone layout. axe is clean and the console is empty on all 5 pages, there are no 4xx responses, and the phone fetches only 4 WebPs. Good work. These are the last fixes before the site goes live at https://akshatjerath.github.io/UX-Website/ (served from a subfolder, so keep every path relative).

## 1. Skills card covers the SAVVY poster
At 1440x900 in the Skills section, the card sits over the left wall and hides the SAVVY poster. Every poster must stay visible in every section. Make the Skills card more compact (e.g. Research and Design as two short columns, Tools as one row of chips) and position it so it clears all four posters. Check at 1280x720, 1440x900 and 1920x1080.

## 2. Projects listed twice on phones
In the list layout (phones and portrait), the 4 projects appear as the Work list and again in the All projects deck, one after the other. Keep the deck as the single full list there: in the list layout, the Work step shows just its line plus a "See all projects ↓" link to the deck (`#all-projects` or whatever the deck's id is). The room layout keeps the posters plus the deck as now.

## 3. Page length
The home page is about 9,400px tall at 1440x900. Lower `--step` (screens per room section) so each section gets about 1 screen instead of 1.3, as long as the pose fades still read cleanly. Report the new height.

## 4. No dead links anywhere on the live site
- "Open prototype" on ankur.html and greggs.html points at `#`. Hide it until it has a real URL (same pattern as the About links: commented example in the HTML).
- Search all 5 pages for any remaining `href="#"` (other than real in-page anchors) and handle it the same way.

## 5. GitHub Pages readiness
- `.nojekyll` now exists at the repo root (added by Chat). Leave it; it makes Pages serve the files as-is.
- Confirm no root-relative paths (`/assets/...`, `href="/"`). Chat found none, so just keep it that way in new code.
- Add a `404.html` in the same style with a link back to `index.html` (relative link), so mistyped URLs on the live site don't show GitHub's default page.

## Checks when done
The usual: axe and overflow on all 5 pages (plus 404.html), light and dark, 1440 and 390, and an empty console. Re-read HANDOFF.md from disk before adding the Done line. Then stop. Akshat commits and pushes.
