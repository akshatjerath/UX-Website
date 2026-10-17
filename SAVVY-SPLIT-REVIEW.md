# SAVVY split review

Branch: `savvy-split`. Stopped after Step 4; no push or merge.

## Files

Created: `savvy-ios.html`, `savvy-android.html`, `SAVVY-SPLIT-REVIEW.md`.

Changed: `savvy.html` (shorter shared case), `case.css` (SAVVY-only navigation/layout rules), `case.js` (platform pages share SAVVY project navigation), `case-widgets.js` (M3 iteration rendered on Android; honest iteration captions), `README.md`, `MOTION.md`, `HANDOFF.md`.

No edits to Ankur, Greggs, Critical Design, home, base.css, content.js or media files. No dependency added.

## Before → after section map (CASE-004)

| Original order | Heading | Anchor | Destination |
| --- | --- | --- | --- |
| 1 | SAVVY: What will dinner really cost? One honest answer, across every dine-out app. | `t-hero` | STAYS text; preview phones → iOS / Android |
| 2 | Project overview | `t-ov` | STAYS |
| 3 | Who pays least when the bill lands? | `t-vid` | STAYS |
| 4 | A single answer instead of a list. | `t-concept` | STAYS shared idea and fragments; decorative phone → iOS |
| 5 | The discount you see hides the price you pay. | `t-ps` | STAYS |
| 6 | Nine versions over five months. | `t-proc` | STAYS |
| 7 | What I found. | `t-res` | STAYS |
| 8 | What diners told me, and the rules I took from it. | `t-ins` | STAYS |
| 9 | Three diner types. | `t-types` | STAYS |
| 10 | From craving to cheapest app. | `t-flow` | STAYS |
| 11 | What I tried first, and why it lost. | `t-dk` | STAYS |
| 12 | It started in a notebook. | `t-paper` | STAYS |
| 13 | Nine versions, from a list to read to one answer. | `t-it` | STAYS historical v1–v7 and final iteration; M3 detail → Android; shared system → final section |
| 14 | How the colours work. | `t-sg` | STAYS common colours/type and shared design system, moved to end |
| 15 | Choosing a place and typing the bill. | `t-ios` | iOS |
| 16 | The answer screen | `t-ans` | STAYS shared answer logic; interactive spotlight → iOS |
| 17 | Handing off, then checking the price. | `t-after` | iOS |
| 18 | The same answer in daylight. | `t-day` | iOS |
| 19 | The same answer in Material 3. | `t-and` | Android (screens and chip separated) |
| 20 | What the app shows while it works. | `t-fb` | STAYS calculation/fine-print reasoning; mockups and Dynamic Island loading → iOS |
| 21 | Motion while you wait. | `t-mo` | iOS |
| 22 | Swiping through restaurants. | `t-ex` | iOS |
| 23 | I haven't tested it yet, so here is my plan. | `t-next` | STAYS |
| 24 | Next case study: Ankur | `next-project` | STAYS |

## Final page order

### savvy.html

1. SAVVY: What will dinner really cost? One honest answer, across every dine-out app. (`t-hero`)
2. Project overview (`t-ov`)
3. Who pays least when the bill lands? (`t-vid`)
4. A single answer instead of a list. (`t-concept`)
5. The discount you see hides the price you pay. (`t-ps`)
6. Nine versions over five months. (`t-proc`)
7. What I found. (`t-res`)
8. What diners told me, and the rules I took from it. (`t-ins`)
9. Three diner types. (`t-types`)
10. From craving to cheapest app. (`t-flow`)
11. What I tried first, and why it lost. (`t-dk`)
12. It started in a notebook. (`t-paper`)
13. Nine versions, from a list to read to one answer. (`t-it`)
14. The answer screen (`t-ans`)
15. What the app shows while it works. (`t-fb`)
16. I haven't tested it yet, so here is my plan. (`t-next`)
17. How the colours work. (`t-sg`)
18. See it on each platform (`t-platforms`)
19. Next case study: Ankur (`next-project`)

### savvy-ios.html

1. SAVVY on iOS (`t-hero`)
2. Platform principles (`t-principles`)
3. Key decisions and reasons (`t-decisions`)
4. iOS night previews (`t-preview`)
5. Choosing a place and typing the bill. (`t-ios`)
6. The answer screen (`t-ans`)
7. The same answer in daylight. (`t-day`)
8. Handing off, then checking the price. (`t-after`)
9. What the app shows while it works. (`t-fb`)
10. Motion while you wait. (`t-mo`)
11. Swiping through restaurants. (`t-ex`)
12. Platform limits (`t-limits`)
13. Explore SAVVY (`t-links`)
14. Next case study: Ankur (`next-project`)

### savvy-android.html

1. SAVVY on Android (`t-hero`)
2. Platform principles (`t-principles`)
3. Key decisions and reasons (`t-decisions`)
4. Android night preview (`t-preview`)
5. The same answer in Material 3. (`t-and`)
6. Live Update chip (`t-mo`)
7. Platform limits (`t-limits`)
8. Explore SAVVY (`t-links`)
9. Next case study: Ankur (`next-project`)

Both platform pages have a top and bottom **Back to SAVVY case study** link, a link to the other platform, and the Ankur next-project link. The case overview has small iOS/Android pills; larger descriptive platform buttons sit below the final shared design system and above Ankur (UX-001, UX-002).

## Test results

Evidence directory: [screenshots and raw results](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/results.json). Browser: installed Chrome through Playwright, plain local HTTP server on port 8123.

| Check | Result | Evidence |
| --- | --- | --- |
| Whole-site local hrefs and anchors | PASS | 209 link occurrences across all 8 HTML pages; includes runtime menus, side navigation and previous/next links; zero broken links |
| Images, fonts, video and posters | PASS | 53 per-page asset URLs explicitly fetched, all HTTP 200; loaded CSS/font resources also monitored |
| Console and network | PASS | Zero browser errors, zero HTTP errors or failed requests during the complete check |
| Responsive layout | PASS | All three pages at 375, 768, 1440px in dark, light and reduced-motion modes: 27 checks, zero horizontal overflow |
| Navigation target sizes | PASS | All 12 new platform links measured at every width; minimum 44×44 CSS px |
| Keyboard and focus | PASS | All 12 new links reached by real Tab presses; solid 2px focus outlines; order recorded in results.json |
| Navigation clicks | PASS | From each platform, click Back to case study, then click matching overview pill to return |
| Light/dark controls | PASS | Button changes html theme and accessible label in both directions on all three pages; existing case palette retained |
| Saved theme restoration | FAIL, pre-existing | nav.js saves aj-theme but does not read it; choice resets on navigation/reload. Kept shared toggle behavior; not a split regression |
| Reduced-motion playback | PASS | No video playing on any of the three pages under reduced-motion; all sections remain available |
| Page metadata | PASS | One H1 per page; three unique titles and descriptions |
| Content preservation | PASS | Compared original body text nodes with combined output; only old status wording replaced by exact requested status. Both original data-draft notes preserved verbatim |
| Source syntax and whitespace | PASS | node --check for modified JS; git diff --check |

The original sketch carousel also caused mobile document overflow with reduced motion (577px at a 375px viewport). A SAVVY-only section clipping rule fixes it while keeping the carousel scrollable.

## Screenshot evidence

Viewport screenshots use a 900px height. Content captures may be taller because they capture the complete section; fixed header/corner navigation can appear over content in these section captures.

| Width | Case study | iOS | Android |
| --- | --- | --- | --- |
| 375 | [Top](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-375-dark.png), [bottom CTAs](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-375-bottom-dark.png), [overview pills](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-375-content.png) | [Top/back](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-ios-375-dark.png), [bottom/back](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-ios-375-bottom-dark.png), [screens](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-ios-375-content.png) | [Top/back](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-android-375-dark.png), [bottom/back](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-android-375-bottom-dark.png), [screens](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-android-375-content.png) |
| 768 | [Top](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-768-dark.png), [bottom CTAs](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-768-bottom-dark.png), [overview pills](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-768-content.png) | [Top/back](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-ios-768-dark.png), [bottom/back](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-ios-768-bottom-dark.png), [screens](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-ios-768-content.png) | [Top/back](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-android-768-dark.png), [bottom/back](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-android-768-bottom-dark.png), [screens](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-android-768-content.png) |
| 1440 | [Top](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-1440-dark.png), [bottom CTAs](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-1440-bottom-dark.png), [overview pills](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-1440-content.png) | [Top/back](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-ios-1440-dark.png), [bottom/back](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-ios-1440-bottom-dark.png), [screens](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-ios-1440-content.png) | [Top/back](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-android-1440-dark.png), [bottom/back](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-android-1440-bottom-dark.png), [screens](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-android-1440-content.png) |

Light mode captures at 1440px: [case](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-1440-light.png), [iOS](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-ios-1440-light.png), [Android](C:/Users/skull/.codex/visualizations/2026/10/17/01a14afa-d4cf-7791-b8b7-a5decd58cbff/savvy-review/savvy-android-1440-light.png).

## UNSURE items and limitations

No unresolved destination questions: the Step 0 proposals were approved. Historical mockups stay with the shared iteration story; M3-specific material moves to Android. Common system rules stay in the case study. Both existing draft notes still request the author's missing research details/reflection; no facts were invented to fill them.

Dynamic Island, lock-screen prompts and Live Update chips are explicitly labeled UI concepts beside their sections and in platform limits (CASE-007). Captions retain original rationale and add the exact concept/sample-data/not-tested and illustrative-price labels (CASE-006). Original prototype statements such as verified savings remain sample UI text, not new research findings.

Not tested: Safari/Firefox, physical iPhone/Android devices, assistive technology, live GitHub Pages deployment, external-link availability, or real native-system behavior. No usability testing performed. The existing theme-restoration issue is recorded above.

## Every added or changed website text block

This is a complete text-node comparison against the original page. It includes new headings/link labels and complete modified captions (so unchanged caption wording may appear alongside newly appended labels). Existing prose copied without changes is omitted. Repeated identical blocks are listed once. No research, quote or result was added.

- iOS
- Android
- Interactive concept, sample data, not usability tested
- Illustrative prototype calculation, not a live verified price
- One price first: the cash you pay tonight.
- What you keep, compared with just paying the bill.
- Coins sit on their own line and never change the order.
- One tap hands you to the cheapest app. SAVVY never pays.
- See it on each platform
- SAVVY on iOS
- SAVVY on Android
- SAVVY on iOS | Akshat Jerath
- ← Back to SAVVY case study
- iOS · Platform design
- This page covers the iOS design choices, night and day screens, feedback states and motion concepts.
- Platform principles
- The iOS screens use night and day themes while keeping the price first, then what you keep, then the maths.
- Key decisions and reasons
- iOS night previews
- The iOS night preview puts the restaurant and the answer first. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- The answer replaces a list of competing discounts. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Places near you first, and what you kept here last time. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- One question splits the two moments people lose money in. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- People and your card on the same screen. No forms. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- The wait shows its work, one app at a time. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Places near you first. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- The price first, then what you keep, then the maths. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Only verified savings count, week by week. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Dynamic Island and lock-screen prompts are UI concepts, not working system features.
- Your slip rides in the Dynamic Island while you pay in the partner app. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- One tap after the meal. Offers that fail drop in rank for everyone. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Every time slot shows its best deal before you pick it. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Type the bill. People and your card on the same screen. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Checking 3 apps. The wait shows its work, one app at a time. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- The answer arrives. The price first, then what you keep, then the maths. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- One place at a time, best price on the card. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Book through the cheapest app. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Skipped. Undo sits in the Dynamic Island. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Best price tonight, then popular dishes. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Widen the radius, review skipped places, or change filters. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Platform limits
- Read the shared test plan and data constraints.
- Explore SAVVY
- SAVVY on Android | Akshat Jerath
- Android · Platform design
- This page covers the Android Material 3 choices, night and day screens and Live Update chip concept.
- The Live Update chip is a UI concept, not a working system feature.
- Android night preview
- The Android preview presents the same answer in Material 3. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Search first, then tonight's places. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- The price, then a sticker for what you keep. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- The same order in daylight. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.
- Live Update chip
- The slip stays in the status bar while you pay. Interactive concept, sample data, not usability tested. Illustrative prototype calculation, not a live verified price.

### Metadata text

- /savvy.html: title “SAVVY, a UX case study by Akshat Jerath”; description “SAVVY UX case study: Mumbai diner research, comparison flows, shared design system and illustrative price logic, with separate iOS and Android concepts.”. The platform Open Graph title/description use the same text.
- /savvy-ios.html: title “SAVVY on iOS | Akshat Jerath”; description “SAVVY on iOS: night and day design choices, screens, micro-interactions and Dynamic Island UI concepts using sample data; not usability tested.”. The platform Open Graph title/description use the same text.
- /savvy-android.html: title “SAVVY on Android | Akshat Jerath”; description “SAVVY on Android: Material 3 design choices, night and day screens and a Live Update chip UI concept using sample data; not usability tested.”. The platform Open Graph title/description use the same text.

### Documentation text

README now describes the two extra SAVVY platform pages. MOTION lists their filenames. HANDOFF records this split, user-authorized commits and review status. This report describes the work and measured checks; none of this documentation appears as portfolio content.
