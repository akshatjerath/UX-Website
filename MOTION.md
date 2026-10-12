# Motion spec for the case-study pages

The rules behind every animated visual on the four case-study pages (`savvy.html`, `ankur.html`, `greggs.html`, `critical-design.html`), in `case.css` / `case.js`. Change a value here, then change it in `case.css` (`--t1`, `--t2`, `--t3`, `--ease-out`, `--stag`).

## Principles

| Token | Value | Used for |
|---|---|---|
| `--t1` | 150 ms | Hover, button press, play/pause |
| `--t2` | 250 ms | Pins, dots, small pieces appearing |
| `--t3` | 400 ms | Lines drawing, cards rising, the longest single move |
| `--ease-out` | cubic-bezier(.22,1,.36,1) | Everything entering |
| `--stag` | 80 ms | Gap between items in a sequence. Capped at 5 items; the rest arrive together |

Every animation plays **once**, when the visual scrolls into view (`.rv` → `.in`), or on page load for a hero. Nothing loops by itself, and text never fades in: only the visuals move. Only `transform` and `opacity` move (plus SVG line drawing), so it stays at 60 fps.

## What each visual does, and why

| Visual | Motion | What it explains |
|---|---|---|
| SAVVY · process | Line draws June → October, then the 7 steps rise in order | Time passing, in order |
| SAVVY · iceberg | The 4 hidden costs drop in under the waterline, one by one | What sits below the discount |
| SAVVY · 8 of 13 | Person icons light up in sequence | A count, not a percentage |
| SAVVY · heard → rule | Line draws, each "So I" card arrives just after its "Heard" card | Each rule comes from a quote |
| SAVVY · diner types | Axes draw from the centre, then the 3 pins drop | Where each type sits |
| SAVVY · user flow | The 4 lanes arrive left to right | The order of the journey |
| Ankur · hero | A sprout grows on page load (the name means sprout) | Sets the subject in one moment |
| Ankur · loop | The six arcs of the ring draw once; any step can be picked to read it | Who acts at each step: ink arcs are the teacher's, green arcs are Ankur's |
| Ankur · problem | Two bars fill to 23.4% and about 19% | The size of the gap, from cited sources |
| Ankur · competitors | Dots fill row by row; Ankur's row fills last | The gap no tool covers |
| Ankur · outcome | The 70–80% target band rises on the scale | What the pilot has to prove |
| Greggs · strategy | Two pillars rise, then the sausage-roll price line draws flat from 2026 to 2050 | The price is held up by structure, not discount |
| Greggs · Pret | The £20 → £30 → £10 line draws | A lesson in what not to do (from the R&D report) |
| Greggs · AI | Dozens of lines converge on one spec, then fan out to 60+ assets | One locked spec kept the AI output consistent |
| Critical Design · hero | Crops grow floor by floor, storage appears above, then an arrow leads out to the neighbourhood | Grow below, keep above |
| Critical Design · timeline | The line draws from 1920, then splits into three pathways after 2033 | The futures "waterfall" |
| Critical Design · ideation | 100 → 10 → 1, left to right | How the brief was chosen |

## Reduced motion

With "reduce motion" switched on, every visual shows its finished state straight away: no drawing, no stagger, no growing or drawing. All text is always in the page, so nothing depends on the animation to be read.

## Navigation and scrolling (added 11 Oct 2026)

| Piece | Behaviour | Source |
|---|---|---|
| Smooth scroll | Lenis eases wheel and anchor scrolling. Off with reduced motion. | `vendor/lenis.min.js` (Lenis 1.3.11, MIT) |
| Side nav (from 1200 px wide) | Built from each `<section data-nav="Group\|Label">`. The current group opens into a trunk with a curved branch per section; a lime line travels to the section you're reading, and a marker glides to the open group. Items near the cursor slide and brighten. | Ported by hand from React Bits' Branched Menu and Line Sidebar (MIT + Commons Clause; fine for a personal portfolio, not for reselling the code) |
| Top nav | A pill flows to the link you hover, with small goo drops trailing it; they burst on click. | After React Bits' Gooey Nav, done with an SVG goo filter instead of WebGL |
| SAVVY · iceberg | Tied to the scroll position: the iceberg rises, the waterline drifts, the "50% off" chip pops, then the four hidden costs drop in and their icons spin into place. Scroll back up and it reverses. | CSS scroll-driven animation (Chrome, Edge; other browsers show the finished state) |
| SAVVY · iterations | A snake road: left to right, then back. The lime line draws along it as you scroll and each version lights up as the line reaches it. | `case-widgets.js` (scroll listener + SVG stroke) |
| SAVVY · flows and maps | A tab bar switches between user flow, three task flows, site map, empathy maps and access rules. Each flow builds block by block, then its end block pulses. | After Swishy's "System" template; `case-widgets.js` |
| SAVVY · answer screen | A spotlight moves over each part of the answer screen every 3.8 s while the list on the right says why. Hover or tab to a line to hold it. | `case-widgets.js` |
| Screen grids | Phones (with their captions) drift at two speeds as you scroll. | CSS scroll-driven animation |
| Prev / next | Pills in the bottom corners go to the previous and next case study, with a 01 / 04 counter. | `case.js` |

## Round 4 (12 Oct 2026)

| Piece | Behaviour | Source |
|---|---|---|
| Home · name | One letter at a time turns into a dashed outline inside a selection box, then the next, in a loop. Pointing at the name takes over; the loop resumes when you leave. Pauses off screen. | After React Bits' Tech Text, in `home.js` |
| Home · line under the name | Types an ending, waits, deletes it, types the next. | After Text Type, `home.js` |
| Home · project panels | Each project is a full-height panel that sticks; the next one slides over it while the one underneath shrinks back 6% and dims. | `home.js` (scroll), `home.css` |
| Home · timeline | The line draws down as you scroll; each entry's dot pops when the line reaches it. | `home.js` |
| Buttons (See the work, Email, LinkedIn, CV) | A light with a short tail runs round the edge. | After Star Border; CSS `offset-path`, sparks added by `home.js` |
| Top nav, every page | The pill flows to the link you point at; drops burst on click. On the home page it rests on the section you're reading. | After Gooey Nav, `nav.js` |
| SAVVY · title | Each letter's outline draws in, one after another, then the fill wipes across. Plays on load and when you point at it. | After Stroke Text, `case.js` |
| Greggs · the report | Scrolling turns a wheel of chapter names; the matching page swaps in beside it. Phones and reduced motion get the chapters stacked. | After Option Wheel, `greggs.js` |
| Greggs · 2050 menu | Concept cards recede into depth; arrows, dots, drag or arrow keys move them. | After Depth Carousel, `greggs.js` |
