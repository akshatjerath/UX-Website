# UX Website

A static portfolio site: UX case study, app presentation (iOS and Android) and critical design pages, plus a home page. No build step and no dependencies.

## Run it

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

## Host it

Upload this whole repository to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages). Keep the folder structure as it is.

## Fill it in

Everything is placeholder content. Nothing on the pages is a claim about you.

1. **Text.** Search the HTML files for `Replace:` prompts (the `ph` class) and for `[square brackets]`. Replace them with your own words. Also replace `Your Name`, `you@example.com` and the `#` links (LinkedIn, Behance, Dribbble, resume, prototype).
2. **Images.** Every picture is a slot. Drop a file with the exact name from the checklist below into `assets/img/` and the slot fills itself on reload. Until then the slot shows its label and filename.
3. **Motion.** Slots whose file ends in `.mp4` or `.webm` play as muted looping video. Put your motion files in `assets/motion/` using the names below, or change the `data-file` in the HTML to match your own file names. Under reduced-motion settings they show the first frame and do not autoplay.
4. **Tools, skills and process.** The lists on the home page are generic. Edit them to match what you actually use and do.

The browser console shows a 404 for every slot that has no file yet. That is expected and goes away as you add files.

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
| `assets/img/work-1.jpg` | Case study cover |
| `assets/img/work-2.jpg` | App presentation cover |
| `assets/img/work-3.jpg` | Critical design cover |
| `assets/motion/critical-loop.mp4` | Motion or image: the artefact in use |
| `assets/motion/hero-loop.mp4` | Motion loop (mp4 or webm) |

### case-study.html

| File to add | What goes there |
| --- | --- |
| `assets/img/cs-after.jpg` | After: the improved screen |
| `assets/img/cs-before.jpg` | Before: the original screen |
| `assets/img/cs-cover.jpg` | Cover: the final design, large |
| `assets/img/cs-flow.jpg` | User flow or site map |
| `assets/img/cs-journey.jpg` | Journey map |
| `assets/img/cs-persona.jpg` | Persona |
| `assets/img/cs-problem.jpg` | Problem: a diagram, photo or quote board |
| `assets/img/cs-research-1.jpg` | Interview notes or affinity map |
| `assets/img/cs-research-2.jpg` | Survey results or competitor audit |
| `assets/img/cs-screen-1.jpg` | Key screen 1 |
| `assets/img/cs-screen-2.jpg` | Key screen 2 |
| `assets/img/cs-screen-3.jpg` | Key screen 3 |
| `assets/img/cs-sketches.jpg` | Sketches |
| `assets/img/cs-wireframes.jpg` | Wireframes |
| `assets/motion/cs-prototype.mp4` | Screen recording of the prototype (mp4 or webm) |

### ui-presentation.html

| File to add | What goes there |
| --- | --- |
| `assets/img/android-1.jpg` | Android screen 1 |
| `assets/img/android-2.jpg` | Android screen 2 |
| `assets/img/android-3.jpg` | Android screen 3 |
| `assets/img/android-4.jpg` | Android screen 4 |
| `assets/img/android-5.jpg` | Android screen 5 |
| `assets/img/android-6.jpg` | Android screen 6 |
| `assets/img/android-hero.jpg` | Android hero screen |
| `assets/img/ios-1.jpg` | iOS screen 1 |
| `assets/img/ios-2.jpg` | iOS screen 2 |
| `assets/img/ios-3.jpg` | iOS screen 3 |
| `assets/img/ios-4.jpg` | iOS screen 4 |
| `assets/img/ios-5.jpg` | iOS screen 5 |
| `assets/img/ios-6.jpg` | iOS screen 6 |
| `assets/img/ios-hero.jpg` | iOS hero screen |
| `assets/img/token-1.png` | Primary |
| `assets/img/token-2.png` | Secondary |
| `assets/img/token-3.png` | Surface |
| `assets/img/token-4.png` | Text |
| `assets/img/token-5.png` | Accent |
| `assets/img/type-specimen.jpg` | Type specimen and components |

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

