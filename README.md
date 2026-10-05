# UX Website

Akshat Jerath's UX/UI portfolio: a home page plus one page per project (Ankur, SAVVY, Greggs, Critical Design). No build step and no dependencies.

## Run it

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Host it

Upload this whole repository to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages). Keep the folder structure as it is.

On GitHub Pages the site lives in a subfolder (`akshatjerath.github.io/UX-Website/`), so every path in the code is relative (`assets/...`, `index.html`), never starting with `/`. Keep it that way in anything you add. Two files at the top of the repository are for Pages:

- `.nojekyll` (an empty file) makes Pages serve the files exactly as they are. Leave it.
- `404.html` is shown for any address that does not exist, in the same style as the site, with a button back to `index.html`. Pages shows it at the address that was typed, which can be several folders deep, so a small script at the top of that file points its relative paths at the site's root first (on `github.io` that is the repository name). On a deep mistyped address the browser may log two failed requests for `styles.css` and `main.js` before the page recovers; that is expected.

## Fill it in

Most copy is still placeholder. Ankur and SAVVY each carry the intro you wrote. Anything marked `Replace:` or in [square brackets] is yours to write.

1. **Text.** Search the HTML for `Replace:` (the `ph` class) and for `[square brackets]`. On the home page that covers the About text and facts, work experience, earlier education, your email, and the Greggs year and blurb. The other three project blurbs are real, and live in `index.html` inside each project's `board-blurb` and `deck-blurb` if you want to reword them.
   - **Links.** There are no dead links: your email, LinkedIn, Behance, Dribbble and resume only appear once they have a real address. The commented examples are in the About card of `index.html` (look for "Get in touch"): put the real address or URL in, and uncomment it. The "Open prototype" button on the Ankur and Greggs pages works the same way: in each page's Prototype section there is a commented button, so put the real address in and remove the comment markers around it.
2. **Images.** Case-study pictures are slots. Drop a file with the exact name from the checklist below into `assets/img/`, then add its path to the `AVAILABLE` list at the top of the media-slot section in `main.js` (for example `"assets/img/ankur-cover.jpg"`). A browser can only find out whether a file exists by asking for it, and every miss is a 404 in the console, so a slot only asks for files on that list. An empty slot shows its label and file name on your own computer and stays a blank box on the live site.
   - **Posters** (the four project posters on the home page) work differently. Until a poster file exists, each board and deck card shows a plain coloured card with the project name and type. When you have the file, put it in `assets/img/room/` and uncomment the `<img>` line inside that project's `.poster` in `index.html` (it appears twice per project: on the board and in the deck). Nothing is requested until you do.
3. **Motion.** Slots whose file ends in `.mp4` or `.webm` play as muted looping video. Put your motion files in `assets/motion/` using the names below, add the path to the `AVAILABLE` list too, or change the `data-file` in the HTML to match your own file names. Under reduced-motion settings they show the first frame and do not autoplay.
4. **Tools, skills and process.** The lists on the home page are generic. Edit them to match what you actually use and do. Skills and tools are in the Skills card, and "How I work" is the accordion near the bottom.

## Add another project

1. Copy `greggs.html` for the case-study layout, or `savvy.html` for the iOS and Android layout, and name the copy after the project.
2. In the copy, rename the image prefix (for example `greggs-` to `newproject-`) so no two pages share a file. Do the same for its motion file.
3. On the home page a project lives in two places in `index.html`, and both are one `<li>` you copy. The **deck** (`<ul class="deck-list">`, under "All projects") holds every project: copy one `<li class="deck-card">`, change its link, ids, name, year, kind and blurb, and raise its `--i` number by one (it sets how far the card sits down the stack; the deck stacks on its own). The **boards** (`<ul class="boards">`, on the room walls) are the quick glance: add a project there only if it deserves a board. Copy one, then change:
   - the link (`href`), the `aria-labelledby` and `aria-describedby` ids (use a new prefix, for example `p-newproject-n`, `-k`, `-b`), the name, kind and blurb (the year is shown only on the deck card);
   - the poster colours (`--pbg` for the card, `--pfg` for its text, keep the contrast readable), the name and type shown on the plain card, and, once the file exists, the poster image (`assets/img/room/poster-newproject.webp`, about 600 x 800, portrait) by uncommenting the `<img>`;
   - `data-pose` (which pointing pose the character uses) and `data-side` (which way the hover card opens: `left`, `right` or `below`, whichever does not cover the character). Three poses are in the page now: `left-middle`, `right-up` and `right-middle`. The others (`left-up`, `left-down`, `right-down`) are already converted in `assets/img/room/`, but to use one you also add an `<img class="pose pose-NAME">` next to the other poses in `index.html` and a matching line in the pose rules in `styles.css`.
4. Give the new project a spot on the wall. The `--x`, `--y`, `--w` and `--h` values on the `<li>` are fractions of the room picture (0 to 1 across and down) that mark where the board is, `--rot` tilts the poster a few degrees, and `--py` (optional, default 50%) is how far down the board the poster is pinned: SAVVY and Greggs use 30%, because their boards are tall and a poster pinned higher keeps clear of the cards at the bottom left. On phones and in narrow or portrait windows the boards are not shown at all; the Work step there links to the deck, which is the one full list. The room has five cork boards and four projects, so the board with the wireframes (right wall, lower) is free for a fifth: roughly `--x:0.877; --y:0.45; --w:0.135; --h:0.3`. Look at the result in the browser and nudge the numbers until the poster sits on the board.
5. A sixth project needs more wall. Either reuse a board or ask for a new picture of the room.
6. Point the previous project's "Next project" link at the new page, and the new page's link at the project after it (or back to All work).

## What is in it

- Light and dark themes (follows the system, with a toggle that remembers the choice).
- Fonts from the faculty typeface list, self-hosted: Bodoni Moda for display, Instrument Sans for text.
- Home page: one illustrated room (your studio). The camera pushes in as you scroll, with the city, the room, and the desk and character moving at different speeds (CSS scroll-driven animation, so it only runs in browsers that support it). The story runs Hello, Work, Skills, Work experience, Education, About and contact, and the character changes pose for each. Which pose goes with which section is set in one commented block in `styles.css` ("Room story"). Each project is a poster pinned to a cork board; hovering or tabbing to one opens a small card (name, kind, blurb) and the character points at it. Below the room, "All projects" is a deck of cards that stack as you scroll (plain CSS, no library), then "How I work". On a phone, in a narrow or portrait window, with reduced motion, or in a browser without scroll-driven animation, the room becomes stacked sections and the deck a plain grid, all still readable.
- Micro-interactions: magnetic buttons, animated accordion, scroll progress bar, scroll-spy contents list, iOS/Android tabs, before/after compare slider, image lightbox, page transitions in Chromium browsers.
- Respects `prefers-reduced-motion`. The room does not move or crossfade, pointer effects are skipped, and everything is visible without animation.
- Icons are Phosphor (MIT), stored in `assets/icons/`.

## Asset checklist

### index.html

| File to add | What goes there |
| --- | --- |
| `assets/img/room/poster-ankur.webp` | Ankur poster, portrait about 600 x 800 (on its board in the room, and on its card in the deck) |
| `assets/img/room/poster-savvy.webp` | SAVVY poster, same size |
| `assets/img/room/poster-greggs.webp` | Greggs poster, same size |
| `assets/img/room/poster-critical-design.webp` | Critical Design poster, same size |

The home page has no other picture slots. The room itself is already in `assets/img/room/` as `.webp` files (`room-day`, `room-night`, `city-day`, `city-night`, `desk` and the `pose-*` files). The original PNGs are not used by the site and are listed in `.gitignore`, so they stay out of the repository. Save posters as WebP under those exact names, uncomment each poster's `<img>` in `index.html` once its file is in the folder, and keep each one small, well under 200 KB. A portrait photo of you is not on the page now (the old About section had a slot for one, and it was removed with that section).

### ankur.html

| File to add | What goes there |
| --- | --- |
| `assets/img/ankur-after.jpg` | After: the improved screen |
| `assets/img/ankur-before.jpg` | Before: the original screen |
| `assets/img/ankur-cover.jpg` | Cover: the final design, large |
| `assets/img/ankur-flow.jpg` | User flow or site map |
| `assets/img/ankur-journey.jpg` | Journey map |
| `assets/img/ankur-persona.jpg` | Persona |
| `assets/img/ankur-problem.jpg` | Problem: a diagram, photo or quote board |
| `assets/img/ankur-research-1.jpg` | Interview notes or affinity map |
| `assets/img/ankur-research-2.jpg` | Survey results or competitor audit |
| `assets/img/ankur-screen-1.jpg` | Key screen 1 |
| `assets/img/ankur-screen-2.jpg` | Key screen 2 |
| `assets/img/ankur-screen-3.jpg` | Key screen 3 |
| `assets/img/ankur-sketches.jpg` | Sketches |
| `assets/img/ankur-wireframes.jpg` | Wireframes |
| `assets/motion/ankur-prototype.mp4` | Screen recording of the prototype (mp4 or webm) |

### savvy.html

| File to add | What goes there |
| --- | --- |
| `assets/img/savvy-android-1.jpg` | Android screen 1 |
| `assets/img/savvy-android-2.jpg` | Android screen 2 |
| `assets/img/savvy-android-3.jpg` | Android screen 3 |
| `assets/img/savvy-android-4.jpg` | Android screen 4 |
| `assets/img/savvy-android-5.jpg` | Android screen 5 |
| `assets/img/savvy-android-6.jpg` | Android screen 6 |
| `assets/img/savvy-android-hero.jpg` | Android hero screen |
| `assets/img/savvy-ios-1.jpg` | iOS screen 1 |
| `assets/img/savvy-ios-2.jpg` | iOS screen 2 |
| `assets/img/savvy-ios-3.jpg` | iOS screen 3 |
| `assets/img/savvy-ios-4.jpg` | iOS screen 4 |
| `assets/img/savvy-ios-5.jpg` | iOS screen 5 |
| `assets/img/savvy-ios-6.jpg` | iOS screen 6 |
| `assets/img/savvy-ios-hero.jpg` | iOS hero screen |
| `assets/img/savvy-token-1.png` | Primary |
| `assets/img/savvy-token-2.png` | Secondary |
| `assets/img/savvy-token-3.png` | Surface |
| `assets/img/savvy-token-4.png` | Text |
| `assets/img/savvy-token-5.png` | Accent |
| `assets/img/savvy-type-specimen.jpg` | Type specimen and components |

### greggs.html

| File to add | What goes there |
| --- | --- |
| `assets/img/greggs-after.jpg` | After: the improved screen |
| `assets/img/greggs-before.jpg` | Before: the original screen |
| `assets/img/greggs-cover.jpg` | Cover: the final design, large |
| `assets/img/greggs-flow.jpg` | User flow or site map |
| `assets/img/greggs-journey.jpg` | Journey map |
| `assets/img/greggs-persona.jpg` | Persona |
| `assets/img/greggs-problem.jpg` | Problem: a diagram, photo or quote board |
| `assets/img/greggs-research-1.jpg` | Interview notes or affinity map |
| `assets/img/greggs-research-2.jpg` | Survey results or competitor audit |
| `assets/img/greggs-screen-1.jpg` | Key screen 1 |
| `assets/img/greggs-screen-2.jpg` | Key screen 2 |
| `assets/img/greggs-screen-3.jpg` | Key screen 3 |
| `assets/img/greggs-sketches.jpg` | Sketches |
| `assets/img/greggs-wireframes.jpg` | Wireframes |
| `assets/motion/greggs-prototype.mp4` | Screen recording of the prototype (mp4 or webm) |

### critical-design.html

| File to add | What goes there |
| --- | --- |
| `assets/img/cd-artefact-1.jpg` | Artefact, main view |
| `assets/img/cd-artefact-2.jpg` | Artefact, detail |
| `assets/img/cd-research-1.jpg` | Reference board or field notes |
| `assets/img/cd-research-2.jpg` | Diagram of the system you studied |
| `assets/img/cd-scenario-1.jpg` | Scenario 1 image |
| `assets/img/cd-scenario-2.jpg` | Scenario 2 image |
| `assets/img/cd-scenario-3.jpg` | Scenario 3 image |
| `assets/motion/cd-hero.mp4` | Hero: the artefact in use (mp4, webm or image) |
