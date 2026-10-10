# UX Website

Akshat Jerath's UX/UI portfolio. One static page with the four case studies inside it: SAVVY, Ankur, Greggs 2050 and Critical Design. No build step and no dependencies.

| File | What's in it | Edit it when |
| --- | --- | --- |
| `content.js` | Your details, media, every project's text and facts, and the data behind each diagram (flows, empathy maps, site map, iteration journey, competitors) | You want to change words, numbers, images or a diagram |
| `styles.css` | Colours, fonts, spacing, layout | You want to change how it looks |
| `app.js` | The page code: theme toggle, tiles, widgets, case-study layout | Rarely |
| `index.html` | The page frame: hero, About, footer | You want to change the hero or About text |
| `img/` | Every image the page uses | You add or swap an image |

## Run it

Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

Case studies open at `index.html#savvy`, `#ankur`, `#greggs` and `#critical-design`. Keys 1 to 4 open them from the home page; Esc goes back.

## Host it

GitHub Pages serves the repository as it is (`akshatjerath.github.io/UX-Website/`). Every path is relative (`img/...`), never starting with `/`, so it also works in that subfolder. Keep it that way.

- `.nojekyll` makes Pages serve the files exactly as they are. Leave it.
- `404.html` is a small self-contained page with a link back to the work.
- `savvy.html`, `ankur.html`, `greggs.html` and `critical-design.html` are one-line redirects, so links to the old project pages still land on the right case study.
- The social preview image is `img/og.jpg`. Its address in `index.html` (`og:image`) is absolute and points at the github.io address. Change it if the site moves to a custom domain.

## Fill it in

Everything you still need to add is marked as a draft. Drafts show on your own computer and in a preview, and stay hidden on the live site (github.io or akshatjerath.com). To see them on the live site, add `?draft` to the address.

1. **Your details.** At the top of `content.js`, fill in `ME`: `email`, `linkedin`, `cv`. Empty fields stay hidden.
2. **Project facts.** Search `content.js` for `teamTodo` and for `null,"` in the `spec` lists (team, timeline, your role in Critical Design). Put the real value in place of `null`.
3. **Media.** Put files in `img/` and point at them in `MEDIA` at the top of `content.js`:
   - `MEDIA.ankurVideo`: a muted 10-second MP4 of ankurs.online for Ankur's tile and hero.
   - `MEDIA.savvyHero`: the SAVVY tile and hero image (now the Figma mockup `img/mock-tilt.webp`).
4. **Images.** Phone screens are WebP at about 2x. Export new ones from Figma at 2x and save as WebP.

## Editing tips

- Every section of `content.js` starts with a comment saying what it is and how its fields work.
- The case-study text lives in `P` (one entry per project): `sections` are the story blocks, `tldr` the three summary cards, `tags` and `one` show on the home tile. `EXTRA` holds the project file (spec), statement, evidence charts and timeline.
- Change text between the quotes or backticks and keep the commas. If the page goes blank after an edit, open the browser console: it names the line with the missing comma or quote.
- Colours are CSS variables at the top of `styles.css` (`--accent` is the green). The light theme has its own values just below.

## What is in it

- Dark first, with a light theme. The toggle remembers the choice.
- Fonts from Google Fonts: Bricolage Grotesque (display), Hanken Grotesk (text), JetBrains Mono (labels). Inter and IBM Plex Mono only render SAVVY's design system specimens.
- Each case study is shaped by its project type: an app (SAVVY), a service and web app (Ankur), a brand strategy (Greggs), an ongoing project (Critical Design).
- Flow diagrams, empathy maps, the site map and access rules are HTML, not images.
- Widgets: a self-playing prototype, a spotlight over the answer screen, a working swipe experiment, an iteration journey, and a lightbox.
- Respects `prefers-reduced-motion`.
