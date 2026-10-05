# UX Website

Akshat Jerath's UX/UI portfolio: a home page plus one page per project (Ankur, SAVVY, Greggs, Critical Design). No build step and no dependencies.

## Run it

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Host it

Upload this whole repository to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages). Keep the folder structure as it is.

## Fill it in

Most copy is still placeholder. Ankur and SAVVY each carry the intro you wrote. Anything marked `Replace:` or in [square brackets] is yours to write.

1. **Text.** Search the HTML for `Replace:` (the `ph` class) and for `[square brackets]`. Also swap `you@example.com` and the `#` links (LinkedIn, Behance, Dribbble, resume, and "Open prototype" on Ankur and Greggs). Greggs has no year yet.
2. **Images.** Every picture is a slot. Drop a file with the exact name from the checklist below into `assets/img/` and the slot fills itself on reload. Until then, an empty slot shows its label and file name on your own computer and stays a blank box on the live site.
3. **Motion.** Slots whose file ends in `.mp4` or `.webm` play as muted looping video. Put your motion files in `assets/motion/` using the names below, or change the `data-file` in the HTML to match your own file names. Under reduced-motion settings they show the first frame and do not autoplay.
4. **Tools, skills and process.** The lists on the home page are generic. Edit them to match what you actually use and do.

The browser console shows a 404 for every slot that has no file yet. That is expected and goes away as you add files.

## Add another project

1. Copy `greggs.html` for the case-study layout, or `savvy.html` for the iOS and Android layout, and name the copy after the project.
2. In the copy, rename the image prefix (for example `greggs-` to `newproject-`) so no two pages share a file. Do the same for its motion file.
3. In `index.html`, copy one `<a class="work-row">` block in the work list and edit its link, year, title, kind and thumbnail file. That is the only change the list needs. The spacing, the stagger and the hover preview pick it up on their own.
4. Point the previous project's "Next project" link at the new page, and the new page's link at the project after it (or back to All work).

## What is in it

- Light and dark themes (follows the system, with a toggle that remembers the choice).
- Fonts from the faculty typeface list, self-hosted: Bodoni Moda for display, Instrument Sans for text.
- Micro-interactions: magnetic buttons, layered hero that drifts with the pointer, work list with a cursor-following preview, animated accordion, scroll progress bar, scroll-spy contents list, iOS/Android tabs, before/after compare slider, image lightbox, page transitions in Chromium browsers.
- Respects `prefers-reduced-motion`. Pointer effects are skipped and everything is visible without animation.
- Icons are Phosphor (MIT), stored in `assets/icons/`.

## Asset checklist

### index.html

| File to add | What goes there |
| --- | --- |
| `assets/img/critical-1.jpg` | Portrait detail of the artefact |
| `assets/img/hero-main.jpg` | Hero image: your best project, wide |
| `assets/img/hero-phone.jpg` | Phone screen |
| `assets/img/portrait.jpg` | Your portrait |
| `assets/img/work-ankur.jpg` | Ankur cover |
| `assets/img/work-critical-design.jpg` | Critical Design cover |
| `assets/img/work-greggs.jpg` | Greggs cover |
| `assets/img/work-savvy.jpg` | SAVVY cover |
| `assets/motion/critical-loop.mp4` | Motion or image: the artefact in use |
| `assets/motion/hero-loop.mp4` | Motion loop (mp4 or webm) |

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
