# UX Website

Akshat Jerath's UX/UI portfolio: a home page and one page per case study (SAVVY, Ankur, Greggs 2050, Critical Design). Static HTML, CSS and JS. No build step, no npm, nothing to install.

| File | What's in it | Edit it when |
| --- | --- | --- |
| `index.html` | Home: hero, the four project panels, About (profile card, timeline, tools, skills), Contact | You change home text, the timeline, tools or skills |
| `savvy.html`, `ankur.html`, `greggs.html`, `critical-design.html` | One case study each. Each `<section data-nav="Group\|Label">` becomes an entry in the side nav | You change a case study |
| `content.js` | Your details (`ME`), and the data behind the diagrams: flows (`FL`), empathy maps, site map, access rules, iterations (`ITER`), the answer spotlight (`SPOT`), Ankur's competitors (`ANKUR_CM`) | You change your email/LinkedIn/CV, or a diagram |
| `base.css` | Shared: colours, fonts, island nav, phone menu, footer | You change the site-wide look |
| `home.css` / `home.js` | Home page styles and motion | Rarely |
| `case.css` / `case.js` / `case-widgets.js` | Case-study styles, motion, side nav, prev/next, and the widgets built from `content.js` | Rarely |
| `nav.js` | The top nav on every page: the gooey pill and the phone menu (its links are at the top of the file) | You add a page |
| `greggs.js` | The Greggs report wheel and the 2050 menu carousel | Rarely |
| `MOTION.md` | What moves, how fast, and why | You change an animation |
| `img/`, `assets/fonts/`, `vendor/` | Images and video; self-hosted fonts (OFL); Lenis smooth scroll (MIT) | You add or swap an image |

## Run it

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Opening `index.html` straight from the folder mostly works too, but fonts and video behave better with a server.

## Host it

GitHub Pages serves the repository as it is (`akshatjerath.github.io/UX-Website/`). Every path is relative (`img/...`), never starting with `/`, so it also works in that subfolder. Keep it that way.

- `.nojekyll` makes Pages serve the files exactly as they are. Leave it.
- `404.html` is a small self-contained page with a link home.
- The social preview image is `img/og.jpg`. Its address in `index.html` (`og:image`) is absolute and points at the github.io address. Change it if the site moves to a custom domain.

## Fill it in

Anything still missing shows as a dashed "Add:" note on your own computer and in previews, and is hidden on the live site (github.io or akshatjerath.com). Add `?draft` to a live address to see them.

1. **Your CV.** Put your UX CV in `assets/` and set `ME.cv` at the top of `content.js` (for example `"assets/Akshat_Jerath_CV.pdf"`). The CV buttons stay hidden until then.
2. **Email and LinkedIn** are in `ME` too (taken from akshatjerath.com). The phone menu has its own copy at the top of `nav.js`.
3. **Ankur screens.** The Final design section of `ankur.html` still asks for screens of the live app (demo login only).
4. **Phone screens** are WebP exports from Figma.

## What is in it

- Dark first, with a light theme on the home page. The toggle remembers the choice. Each case study has its own colours (Ankur uses the live app's cream and green).
- One typeface everywhere, self-hosted: Bricolage Grotesque. A second small file only carries the rupee sign.
- Home: letters of your name turn into dashed outlines one by one, the line under it types, project screens drift behind the hero, project panels stack as you scroll, the profile card tilts, the timeline draws itself, tools scroll past in their own colours, skills float out of folders, and the main buttons have a light running round the edge. All written by hand after React Bits components (MIT + Commons Clause: fine for a portfolio, not for reselling the code). Tool logos come from Iconify/simple-icons, svg-logos and Lobe Icons.
- Case studies: side nav from 1200px wide, prev/next in the corners, a phone menu below 720px, diagrams built from data, scroll-linked motion. Details in `MOTION.md`.
- Respects `prefers-reduced-motion`: everything shows its finished state.
