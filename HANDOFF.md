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

## Claude Code is editing
- (nothing)

## Chat is editing
- (nothing)

## To do (for Claude Code)
1. **Hero spacing.** On desktop (1440x900) there's a big gap under the hero. Bring "Selected work" closer to the fold.
2. **Mobile menu.** Add a dimmed backdrop (or make the open menu cover the full screen), and lock page scroll while it's open. Escape and clicking a link must still close it.
3. **Bring back the newer ideas, if Akshat wants them.** Thesis-style titles in the work list, "How I work" artefact cards, single hero image. These were in an earlier Claude Code session and never committed.
   - If you build the artefact cards, don't let the third card get clipped. Either let the row bleed to the screen edge with scroll-snap and keyboard scrolling, or wrap it into a grid.
   - SAVVY's thesis line: "Turns coins, cashback and card offers into what you actually pay." Don't start it with "It".
4. **After each task:** serve locally and run axe on all 5 pages, dark and light, at 1440 and 390 wide. There must be no horizontal overflow. Write the results under Done.

## Questions for Akshat
- Greggs: what was the project, your role, and the year?
- Which other UX/UI projects should be added?

## Done
- 2026-10-05: The 4 project pages, name, intro lines and Work/About nav merged to main (PR #1).
