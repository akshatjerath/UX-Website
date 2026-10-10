/* =====================================================================
   CONTENT. Everything you'd want to edit lives in this file:
   your details, media, the four projects, and the data behind every
   diagram. The page code is in app.js and the styles in styles.css.

   Edit text between the quotes or backticks. Keep the commas.
   Tip: after editing, open index.html; if the page goes blank, a comma
   or quote is missing on the line you changed (the browser console
   names the line).
   ===================================================================== */

/* helpers the content below uses (leave these) */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== YOUR DETAILS. Empty fields stay hidden. ===== */
const ME = {
  cv: "",        // CV link (PDF or Drive)
  email: "",
  linkedin: "",
  seeking: "Open to UX/UI roles"   // e.g. "Open to UX/UI internships from May 2027"
};
/* Media you make (Mockuuups, Rotato). Leave "" until the file is in img/. */
const MEDIA = {
  savvyHero: "img/mock-tilt.webp",   // SAVVY tile and hero image (a Figma mockup)
  ankurVideo: ""    // e.g. "img/ankur-10s.mp4": 10-second Rotato loop of ankurs.online, muted
};
const REPORT_URL = "https://www.canva.com/design/DAHVo0XFTSs/uHPKiQ5l57EsHj-nLss7hA/view";
/* While DRAFT is true, dashed boxes mark what still needs your input. Set to false before publishing. */
const DRAFT = !/github\.io$|akshatjerath\.com$/.test(location.hostname) || /[?&]draft\b/.test(location.search);

const slot = (what, where) => DRAFT ? `<div class="slot"><b>Add: ${what}.</b>${where ? "<br>From: " + where : ""}</div>` : "";
const fig = (src, alt, cap, w, h) => `<figure><button type="button" class="zoomable" data-lb="${src}" data-cap="${cap}"><img src="img/${src}.webp" alt="${alt}" loading="lazy" width="${w}" height="${h}"></button><figcaption>${cap}</figcaption></figure>`;

/* ===== PROJECTS. Every fact comes from AJ's own files (see the working doc). ===== */
const P = [
{ id:"savvy", name:"SAVVY", stage:"savvy", year:"2026", type:"Coursework concept",
  tags:["Consumer app","iOS + Android","Research-led"],
  one:"Shows what a meal will really cost across Swiggy Dineout, District and EazyDiner, then hands you to the cheapest app.",
  role:"End-to-end product and UX",
  outcome:"One answer to “where is it cheapest to eat tonight?”, across every dine-out app.",
  meta:[["Role","End-to-end product and UX"],["Team",null,"Solo, or with Aastha?"],["Timeline",null,"Jul to Aug 2026? (from your file dates)"],["Platform","iOS and Android"],["Tools","Figma, FigJam, Miro, Google Forms, Excel"]],
  tldr:[["Problem","The same Mumbai restaurant runs different deals on Swiggy Dineout, District, EazyDiner and Zomato. The real price hides behind coins, card rules and cover charges."],
        ["What I did","13 interviews, two surveys and a 10-restaurant audit. Then an app that ranks options by the cash you pay tonight and hands you to the cheapest app."],
        ["Result","A prototype in night and day themes for iOS and Android. Not tested with users yet; that's the next step."]],
  sections:[
   {label:"Problem", h:"The discount you see isn't the price you pay.", html:`
     <p>All ten Mumbai restaurants I audited were on two or more dine-out apps, each with its own deal. Four things hide the real price:</p>
     <div class="ptiles">
      <div><i aria-hidden="true">₵</i><b>Coins come later</b><span>Cashback isn't cash tonight.</span></div>
      <div><i aria-hidden="true">▭</i><b>One card unlocks it</b><span>The best deals need one specific bank card.</span></div>
      <div><i aria-hidden="true">↑</i><b>Menus marked up</b><span>Some apps raise in-app prices to cover their cut.</span></div>
      <div><i aria-hidden="true">+</i><b>Cover charge, late</b><span>About ₹25 a person, shown late in the flow.</span></div>
     </div>
     <div class="vs" role="img" aria-label="An illustrative scenario from my research board: a 50% deal loses to a quieter 20% deal">
      <div class="lose"><span class="mono dim">Looks like the winner</span><span class="big2">50% off</span><ul><li>Menu raised 30% first</li><li>Needs a card she doesn't own</li></ul></div>
      <span class="vsx">vs</span>
      <div class="win"><span class="mono">Actually cheapest</span><span class="big2">20% off</span><ul><li>A quieter deal on another app</li><li>Only found by comparing</li></ul></div>
     </div>
     <p class="dim" style="font-size:14px">Illustrative scenario from my research board.</p>`,
    take:"A bigger discount can still cost you more."},
   {label:"Research", h:"Four things diners told me, four product rules.", html:`
     <p>I ran 13 semi-structured interviews with diners, two surveys and the ten-restaurant audit. The interviews split on two things: whether someone carries a credit card, and how much effort they put into finding a deal. That gave the three diner types above.</p>
     <div class="pairs">
      <div class="pair"><div><span class="mono">Heard</span><b>Coins aren't cash.</b><p>8 of the 13 distrusted coins. “I find it very stupid and a scam.”</p></div><div class="arrow" aria-hidden="true">→</div><div class="dec"><span class="mono">So I</span><b>Rank by the cash you pay tonight.</b><p>Coins get their own amber line and never decide the order.</p></div></div>
      <div class="pair"><div><span class="mono">Heard</span><b>The place comes first.</b><p>A craving, family, friends or a reel picks the restaurant. Deals come after.</p></div><div class="arrow" aria-hidden="true">→</div><div class="dec"><span class="mono">So I</span><b>Start from the restaurant.</b><p>Home is a restaurant search. Deals is a second tab.</p></div></div>
      <div class="pair"><div><span class="mono">Heard</span><b>It falls apart at the bill.</b><p>In a rush, people just pay. “If I have no option, I will pay the bill.”</p></div><div class="arrow" aria-hidden="true">→</div><div class="dec"><span class="mono">So I</span><b>Put Book and Pay on one toggle.</b><p>At the table: one bill amount in, one answer out.</p></div></div>
      <div class="pair"><div><span class="mono">Heard</span><b>Cards don't fit everyone.</b><p>Several people pay by UPI, cash or a parent's card.</p></div><div class="arrow" aria-hidden="true">→</div><div class="dec"><span class="mono">So I</span><b>Let cards inform, never gate.</b><p>The picker also shows cards someone else at the table may have.</p></div></div>
     </div>
     `},
   {label:"Research artefacts", h:"The research, written out.", html:`
     <p>Rebuilt from my FigJam board as diagrams you can read here. Every empathy-map note names its interview, R01 to R13.</p>
     <div data-widget="docs"></div>`},
   {label:"Constraints and goals", h:"SAVVY can't book, can't pay, and the big apps won't help.", html:`
     <div class="cg">
      <div><span class="mono dim">Constraints</span><ul><li>No offer-data API from any of the apps.</li><li>Hand-offs into partner apps can be restricted.</li><li>Big apps have no reason to help a comparison tool.</li><li>Restaurants may push back.</li></ul></div>
      <div><span class="mono dim">Goals</span><ul><li>Show the real cash price before someone commits.</li><li>Get them to the cheapest app in one tap.</li><li>Count only savings that actually happened.</li></ul></div>
     </div>`,
    take:"SAVVY never books or pays. It hands you off, then asks if the deal held."},
   {label:"Options I dropped", h:"What I tried first, and why it lost.", html:`
     <div class="opts">
      <div class="opt"><div class="no"><span class="v">✕ Dropped</span><b>Rank restaurants by biggest discount</b><p>It pushes people to the loudest offer, and people choose the place first anyway.</p></div><div class="yes"><span class="v">✓ Kept</span><b>Start from the restaurant</b><p>Search a place, then see its real price on every app.</p></div></div>
      <div class="opt"><div class="no"><span class="v">✕ Dropped</span><b>Book and Pay as two tabs</b><p>The unplanned walk-in “pay” moment is where people lost money. A tab buries it.</p></div><div class="yes"><span class="v">✓ Kept</span><b>One toggle on the restaurant screen</b><p>Paying at the table is one tap away.</p></div></div>
      <div class="opt"><div class="no"><span class="v">✕ Dropped</span><b>Blend coins into the price</b><p>It hides the thing interviewees distrusted most.</p></div><div class="yes"><span class="v">✓ Kept</span><b>Coins on their own amber line</b><p>Always visible, never used for ranking.</p></div></div>
      <div class="opt"><div class="no"><span class="v">✕ Dropped</span><b>Earn mainly from diners</b><p>The big apps won't help a comparison tool, so it needed a partner who gains from it.</p></div><div class="yes"><span class="v">✓ Kept</span><b>Earn from restaurants</b><p>Bookings and a no-show tool, with “book a table” as a main feature.</p></div></div>
     </div>`},
   {label:"Iterations", h:"Eight versions, from a list to read to one answer.", html:`
     <p>The same moment in every version where I had it: comparing the apps. What changed, and the colours and type each version used.</p>
     <div data-widget="journey"></div>
     <h3>The final design system</h3>
     <div data-widget="system"></div>`,
    take:"The answer moved to the top. The maths moved underneath it."},
   {label:"Final design", h:"Pick the place, type the bill, get one answer.", html:`
     <figure class="mock"><img src="img/mock-grid.webp" alt="The final SAVVY night screens: book or pay, what's the bill, the answer, the hand-off and the lock-screen check" width="1600" height="1200" loading="lazy"></figure>
     <div data-widget="spot"></div>
     <p>This is the night flow on iOS, playing by itself. Tap a step to jump, or switch to the day theme.</p>
     <div data-widget="proto"></div>
     <div class="mock2">
      <figure><img src="img/mock-fan.webp" alt="SAVVY day theme on iOS: Tonight, the answer and the hand-off" width="1600" height="1200" loading="lazy"><figcaption>Day theme, iOS</figcaption></figure>
      <figure><img src="img/mock-android.webp" alt="SAVVY night theme on Android: Tonight, the answer and the Live Update hand-off" width="1600" height="1200" loading="lazy"><figcaption>Night theme, Android</figcaption></figure>
     </div>
     <h3>Motion, made in Jitter</h3>
     <div class="motion3">
      <figure><img src="img/jitter-bill.gif" alt="Animation: typing the bill amount on a keypad, then Find my best price" width="206" height="459" loading="lazy"><figcaption>Type the bill</figcaption></figure>
      <figure><img src="img/jitter-checking.gif" alt="Animation: checking 3 apps, each one ticking off as its offer is found" width="206" height="459" loading="lazy"><figcaption>Checking 3 apps</figcaption></figure>
      <figure><img src="img/jitter-answer.gif" alt="Animation: the answer screen building up, with cash kept per app" width="206" height="459" loading="lazy"><figcaption>The answer arrives</figcaption></figure>
     </div>
     <h3>An experiment: swipe to discover</h3>
     <p>Swipe right to book, left to skip, up for the full profile. It stays out of the main flow until it's tested. Drag the screen, or use the buttons.</p>
     <div data-widget="swipe"></div>
`},
   {label:"Outcome", h:"Not tested yet. The test has to answer these.", html:`
     <p>Next is a usability test of the night theme against the day theme. Real use also has to answer what research couldn't:</p>
     <ul class="ticks"><li>How often do people not show up for a booking?</li><li>Does anyone want a membership?</li><li>What does an average bill look like?</li></ul>
     <p>After that: refine the unit economics, map the late-notification flows, and check India's rules on price transparency.</p>`},
   {label:"Reflection", h:"What I'd do differently", html: slot("Your reflection in 2 or 3 lines: what you learned and what you'd change","Not in your files yet")}
  ]},
{ id:"ankur", name:"Ankur", stage:"ankur", year:"2026", type:"Coursework",
  tags:["EdTech","AI","Live app"],
  one:"A smart notebook for early-years teachers in India. The teacher notices, Ankur suggests one small next step, the teacher decides.",
  role:"Research, structure and live prototype",
  outcome:"A notebook for early-years teachers where the AI only suggests.",
  meta:[["Role","Research, structure and live prototype"],["Team",null,"Solo or team? The long poster says “add teammates”"],["Course","Experiential Design"],["Tools","FigJam, Lovable"],["Live app","ankurs.online"]],
  tldr:[["Problem","Early-years teachers notice every child, but nothing turns those notes into a plan, and India's Holistic Progress Card has no software to run it."],
        ["What I did","Desk research on six tools and India's policy, then a notebook app where Ankur suggests one small target and the teacher decides."],
        ["Result","A live app at ankurs.online. A classroom pilot is next; nothing is tested with teachers yet."]],
  sections:[
   {label:"Problem", h:"Teachers notice everything. Nothing turns it into a plan.", html:`
     <p>Teachers of children aged 3 to 8 notice what each child does, but the notes sit in paper registers, get typed up twice, and children slip through. It's for pre-primary and Std 1 to 2 teachers and Anganwadi workers, including rural, low-internet areas.</p>
     <ul class="ticks"><li>ASER 2024: only 23.4% of Grade 3 children read at a Grade 2 level.</li><li>Only about 19% of a teacher's day goes to teaching.</li><li>The PARAKH Holistic Progress Card is compulsory, but no software runs it.</li></ul>`},
   {label:"Research", h:"Foreign tools have the right shape. Indian tools have the right curriculum.", html:`
     <p>Competitor analysis of six tools (Toddle Play, Illumine, Rocket Learning, Nipun Lakshya, Ei Mindspark, and DIKSHA with Jaadui Pitara), a SWOT, 5W1H, a stakeholder grid, card sorting with MoSCoW, and an OOUX matrix.</p>
     <ul class="ticks"><li><b>The gap:</b> no tool in India combines teacher observation of each child, India's NCF-FS curriculum, a pre-primary focus, a non-diagnostic stance and AI drafts the teacher approves.</li><li><b>Connectivity is patchy</b>, so the app had to work offline first.</li><li><b>India's child-data rules (DPDP) apply from May 2027</b>, so privacy became a feature.</li></ul>`,
    take:"This is desk research. Interviews with teachers are planned but not done yet."},
   {label:"Decisions", h:"The AI suggests. The teacher has the last word.", html:`
     <div class="rows">
      <div><b>Approve, edit, redo or skip.</b><span>A child is never labelled or scored.</span></div>
      <div><b>Nicknames only, no photos, data kept on the device.</b><span>It follows India's child-data law and lowers the bar for schools to trust it.</span></div>
      <div><b>Test scores and leaderboards left out on purpose.</b><span>They would break the non-diagnostic rule.</span></div>
      <div><b>Positioned as the tool that runs the Holistic Progress Card.</b><span>Not another content or testing app, with DIKSHA and Jaadui Pitara as partners.</span></div>
     </div>
     <div data-widget="flow" data-f="ankur"></div>`,
    take:"“You are the sensor; Ankur is the scaffold.”"},
   {label:"Iterations", h:"From a six-step loop to one small target.", html:`
     <ol class="steps"><li>First concept: a six-step loop for ages 3 to 6, with the AI simulated by hand.</li><li>Course decks: a four-step loop for ages 3 to 8 (observe, AI drafts two to four targets, teacher decides, track), with printable aids pushed to “could have”.</li><li>Live app: one small target per child instead of several, the printable activity sheet back as a core step, and a new feature that reads a photo of a child's work and, over months, points out skills that keep coming back.</li></ol>
     ${slot("Why you made each change","Not in your files yet")}`},
   {label:"Final design", h:"Notice, target, print, check.", html:`
     <p>The live app: <a href="https://ankurs.online" target="_blank" rel="noopener">ankurs.online</a>. Six steps: notice, add a photo of the work, set one small target from India's NCF-FS competencies, print the activity, check at month end (“needs more time” is a normal answer), and see the class grow.</p>
     ${slot("Screens of My class, Class at a glance and Progress","ankurs.online. Check first that the child names are demo data; if not, blur them")}
     ${slot("A 10-second Rotato video of ankurs.online for the home tile and the top of this page. Then set MEDIA.ankurVideo","Rotato, recorded from the live app with demo data only")}`},
   {label:"Outcome", h:"One number decides if it scales.", html:`
     <p>Not tested in a classroom yet. The pilot is the honest next step, and the number that matters is how often teachers approve the AI's drafts. The aim is 70 to 80% before it scales.</p>`}
  ]},
{ id:"greggs", name:"Greggs 2050", stage:"greggs", big:"Fresh. Fair. Forever.", year:"2026", type:"Coursework",
  tags:["Brand futures","AI pipeline"],
  one:"A 2050 strategy to keep Britain's favourite bakery fast, fresh and cheap, with a brand world made using AI.",
  role:"Strategy and AI-made brand world",
  outcome:"Keeping Britain's favourite bakery cheap, all the way to 2050.",
  meta:[["Role","Strategy and AI-made brand world"],["Team",null,"Solo? Your Greggs files credit only you"],["Course","Designing with AI"],["Tools","Gemini, Ideogram, Flow, Suno, Canva"]],
  tldr:[["Problem","Greggs is nearing its ceiling in the UK, and weight-loss drugs are changing what people eat."],
        ["What I did","A 2050 strategy that keeps the sausage roll cheap by structure, plus a future brand world of images, film and sound made with AI."],
        ["Result","A strategy deck and more than 60 AI-made assets, kept consistent by one written spec."]],
  sections:[
   {label:"Problem", h:"How does a cheap bakery stay cheap for 25 more years?", html:`<p>Greggs' UK estate is maturing and growth is slowing, while weight-loss drugs are changing what people eat. Every claim in the research is tagged as fact or projection.</p>`},
   {label:"Decisions", h:"Keep the sausage roll cheap forever. Let other formats pay for it.", html:`
     <div class="rows">
      <div><b>Affordability built in, not a discount.</b><span>Higher-margin formats pay for the cheap hero, so it can't be withdrawn.</span></div>
      <div><b>Four formats: Classic, Fresh, Go and Outlets.</b><span>Each one has its own job and margin.</span></div>
      <div><b>Greggs+ membership as the profit engine.</b><span>The lesson from Costco: the real secret was the membership, not the hot dog.</span></div>
      <div><b>Abroad: one fixed hero product plus a local range.</b><span>So it doesn't repeat Belgium.</span></div>
      <div><b>Warm Functional Futurism.</b><span>Keep the blue and yellow, use restraint rather than chrome, and never overclaim.</span></div>
     </div>`},
   {label:"How I used AI", h:"Dozens of directions, one locked spec.", html:`
     <p>I explored dozens of 2050 directions with AI, then locked a written spec so more than 60 images, films and sounds stayed consistent. I checked every output and fixed what the AI got wrong, such as a broken logo.</p>
     ${slot("Hero render and two or three key images","Canva: Greggs Go, page 1; Copy of Greggs Go, pages 14 and 20")}
     ${slot("One short film clip","Drive: Greggs Delivery Pod.mp4")}`}
  ]},
{ id:"critical-design", name:"Critical Design", stage:"cd", big:"Grow below, keep above.", year:"2026", type:"Team project",
  tags:["Speculative","Food"],
  one:"A speculative food hub that grows produce and keeps it fresh inside empty city buildings.",
  role:"Team project",
  outcome:"What if empty buildings grew our food, right where we live?",
  meta:[["Type","Team project"],["Team",null,"With Akhil and Sayee? Say who did what"],["Studio","Critical Design"],["Format","Research poster and design brief"]],
  tldr:[["Problem","India loses about ₹31,000 crore of fruit and vegetables a year (ICAR-CIPHET, 2015), and most of that loss comes from distance."],
        ["What we did","A futures timeline to 2045, 100 ideas each, ten clusters, then a speculative brief."],
        ["Result","“The Hub”: empty buildings that grow food below and keep it fresh above."]],
  sections:[
   {label:"Problem", h:"Most food loss comes from distance.", html:`<p>India processes only about 2% of its fruit and vegetables. Our brief asks what happens if empty urban buildings grow produce and keep it fresh with natural methods like drying, earthen cool storage and controlled air, right next to the people who eat it.</p>`,
    take:"Is food grown in a climate-controlled building still “natural”?"},
   {label:"Research", h:"Who controls food when food becomes technology?", html:`<p>A futures timeline from the past (1920 to 1945) to the present and on to 2045, with analytical, natural and industrial pathways. Then 100 ideas each, clustered into ten.</p>`},
   {label:"The design", h:"Grow below, keep above.", html:`<p>“The Hub”: a local building that grows produce and stores it naturally, so food barely travels.</p>
     ${slot("Poster and brief","Drive: CIA1W7_Akshat_CT.pdf and Design Brief Food Hub.pdf; images in Critical Design > Pictures")}`}
  ]}
];



/* ===== Project file (spec panel), statement, evidence and work order. All from AJ's files. ===== */
const EXTRA = {
  savvy:{ team:null, teamTodo:"Solo or group?",
    spec:[["Role","End-to-end product and UX"],["Team",null,"Solo, or with Aastha?"],["Timeline",null,"Jul to Aug 2026? (from your file dates)"],["Platform","iOS and Android, night and day themes"],["Methods","Interviews, surveys, field audit, competitor audit, user and task flows, site map, access rules"],["Tools","Figma, FigJam, Miro, Google Forms, Excel"],["Status","Concept. Not tested with users yet"]],
    statement:"Mumbai diners need one honest answer to what a meal will really cost, across every dine-out app.",
    stats:[
      {k:"donut", v:8, of:13, n:"8 of 13", label:"interviewees distrusted coins as a saving", src:"Interviews"},
      {k:"donut", v:10, of:10, n:"10 of 10", label:"audited restaurants were listed on two or more apps, 2.9 on average", src:"Field audit"},
      {k:"big", n:"₹25", label:"cover charge a person, where there was one, shown late in the flow", src:"Field audit"},
      {k:"bar", a:2000, b:1450, n:"₹550 kept", label:"on a ₹2,000 bill by paying ₹1,450 on EazyDiner. An example from the prototype", src:"Final screen"}],
    timeline:[["Research","13 interviews · 2 surveys · audit"],["Synthesis","3 diner types"],["Structure","flows · site map · access rules"],["v1 to v3","idea test · audit wireframes"],["v4 hi-fi","17 screens · critique"],["v5 to v6","system · Android M3"],["Final","night and day"]]},
  ankur:{ team:null, teamTodo:"Solo or group?",
    spec:[["Role","Research, structure and live prototype"],["Team",null,"Solo or team? The long poster says “add teammates”"],["Course","Experiential Design"],["Platform","Teacher app, offline first"],["Methods","Desk research, competitor analysis, SWOT, 5W1H, card sorting, MoSCoW, OOUX"],["Tools","FigJam, Lovable"],["Status","Live at ankurs.online. Not piloted in a classroom yet"]],
    links:[["ankurs.online","https://ankurs.online"]],
    statement:"Early-years teachers need their daily notes to turn into a plan, without software judging a child.",
    stats:[
      {k:"donut", v:23.4, of:100, n:"23.4%", label:"of Grade 3 children read at a Grade 2 level", src:"ASER 2024"},
      {k:"donut", v:19, of:100, n:"About 19%", label:"of a teacher's day goes to teaching", src:"Desk research"},
      {k:"big", n:"6 tools", label:"compared. None combined teacher notes, India's NCF-FS, pre-primary and teacher-approved AI", src:"Competitor analysis"},
      {k:"big", n:"70–80%", label:"of AI drafts approved by teachers: the target before it scales", src:"Red Dot brief"}],
    timeline:[["Desk research","policy · 6 tools"],["Synthesis","SWOT · 5W1H · stakeholders"],["Structure","card sort · MoSCoW · OOUX"],["Concept","six-step loop"],["Course decks","four-step loop"],["Live app","one target per child"]]},
  greggs:{ team:null, teamTodo:"Solo?", links:[["Read the full report in Canva",REPORT_URL]],
    spec:[["Role","Strategy and AI-made brand world"],["Team",null,"Solo? Your Greggs files credit only you"],["Course","Designing with AI"],["Format","Strategy, images, film and sound"],["Methods","Desk research, competitor study"],["Tools","Gemini, Ideogram, Flow, Suno, Canva"]],
    statement:"Greggs has to stay cheap and loved for 25 more years, while its UK estate stops growing.",
    stats:[
      {k:"big", n:"£20 → £30 → £10", label:"Pret's subscription price changes. A lesson in what not to do", src:"R&D report"},
      {k:"big", n:"60+", label:"AI-made images, films and sounds kept consistent by one written spec", src:"Final deck"},
      {k:"big", n:"2008", label:"Greggs left Belgium after exporting a British menu as-is", src:"R&D report"}],
    timeline:[["Initial pitch","15 slides"],["R&D report","17 pages"],["Final deck","28 pages"],["Film decks","Greggs Go"]]},
  "critical-design":{ team:"Group",
    spec:[["Role",null,"Your part in the team"],["Team",null,"With Akhil and Sayee?"],["Type","Group project"],["Studio","Critical Design"],["Methods","Futures timeline, 100 ideas each, clustering"],["Format","Research poster and design brief"]],
    statement:"Food spoils on the way to us. What if it barely had to travel?",
    stats:[
      {k:"big", n:"₹31,000 cr", label:"of fruit and vegetables lost in India every year", src:"ICAR-CIPHET, 2015"},
      {k:"donut", v:2, of:100, n:"About 2%", label:"of India's fruit and vegetables get processed", src:"Design brief"},
      {k:"big", n:"1920 → 2045", label:"the span of the futures timeline we mapped", src:"Research poster"}],
    timeline:[["Desk research","food · travel · F1"],["Futures timeline","1920 to 2045"],["100 ideas each","10 clusters"],["Brief","The Hub"]]}
};
P.forEach(p => Object.assign(p, EXTRA[p.id]));

/* ===== What makes each case study different (project type and its own blocks) ===== */
Object.assign(P.find(p => p.id === "savvy"), { kind:"app", kindLabel:"App case study", ctxTitle:"Stakeholders and market", ctxSub:"Who SAVVY depends on",
  users:[
    {name:"Reluctant Comparer", who:"No credit card, but puts in the effort to find a deal.", q:"I find it very stupid and a scam… it feels like I've been misdirected."},
    {name:"Passive Card Holder", who:"Has cards, but thinks about them late.", q:"All the money still leaves my own pocket, so what was the benefit of the discount?"},
    {name:"Just-Pay Pragmatist", who:"Low effort. Someone else usually picks the place.", q:"If I have no option, I will pay the bill."}]});
Object.assign(P.find(p => p.id === "ankur"), { kind:"service", kindLabel:"Service and web app", ctxTitle:"Stakeholders and competitors", ctxSub:"From my FigJam research",
  loop:[
    {t:"Notice", d:"Tap what you saw: reading, writing, speaking, behaviour", who:"Teacher"},
    {t:"Add the work", d:"A photo of what the child made", who:"Teacher"},
    {t:"One small target", d:"Drafted from India's NCF-FS competencies", who:"Ankur drafts", ai:true},
    {t:"Decide", d:"Approve, edit, redo or skip. Nothing is automatic", who:"Teacher"},
    {t:"Print the activity", d:"Low-cost play: stones, bottle caps, chalk", who:"Teacher"},
    {t:"Check and see growth", d:"Month-end check. “Needs more time” is a normal answer", who:"Ankur tracks", ai:true}]});
Object.assign(P.find(p => p.id === "greggs"), { kind:"brand", kindLabel:"Brand strategy, screens in progress", ctxTitle:"Rivals and lessons", ctxSub:"From the R&D report",
  gallery:[["Hero render","Future store with vertical farm and drone · Canva “Greggs Go”, p.1"],["Packaging","Compostable sleeve, self-heating wrap · “Copy of Greggs Go”, p.14"],["Drone drop","“Copy of Greggs Go”, pp.20–21"],["Delivery pod","Drive: Greggs Delivery Pod.mp4"]]});
Object.assign(P.find(p => p.id === "critical-design"), { kind:"ongoing", kindLabel:"Ongoing case study",
  eras:[["Past","1920 to 1945"],["Present","2024 to 2026"],["Near future","2027 to 2031"],["Waterfall","2033 to 2045 · analytical, natural and industrial pathways"]],
  status:[["Desk research on food, travel and F1",1],["Futures timeline, 1920 to 2045",1],["100 ideas each, clustered into ten",1],["Design brief: The Hub",1],[null,0]],
  questions:["Is food grown in a climate-controlled building still “natural”?","Who controls food when food becomes technology?"]});

/* ----- SAVVY self-playing prototype: screens and captions for night and day. tap = where the finger taps, in % of the screen. ----- */
const FLOWS = {
  night:[
    {img:"savvy-n-tonight", t:"Tonight", cap:"Places near you. “Last time you kept ₹400” brings back what you saved before.", tap:[86,59]},
    {img:"savvy-n-bill", t:"Type the bill", cap:"Type the bill once. People and your card are set on the same screen.", tap:[50,71]},
    {img:"savvy-n-answer", t:"One answer", cap:"₹1,450 on EazyDiner with your HSBC card. You keep ₹550. Coins sit on their own line and never change the order.", tap:[50,89]},
    {img:"savvy-n-island", t:"Hand-off", cap:"SAVVY never pays. Your slip rides along in the Dynamic Island while you pay in the partner app."},
    {img:"savvy-n-lock", t:"Did it hold?", cap:"One tap after the meal. Offers that fail drop in rank for everyone.", tap:[31,80]}
  ],
  day:[
    {img:"savvy-d-home", t:"Home", cap:"The same flow in the day theme, built for reading in bright light."},
    {img:"savvy-d-answer", t:"One answer", cap:"The answer screen keeps the same order: price, what you keep, then the maths.", tap:[50,89]},
    {img:"savvy-d-savings", t:"Savings", cap:"Only verified savings count, so the number can be trusted."}
  ]
};

/* ----- SAVVY final design: the spotlight. r = [left, top, width, height] of each highlight, in % of the screen. ----- */
const SPOT = {img:"savvy-n-answer", alt:"SAVVY answer screen, night theme: best price tonight ₹1,450 on EazyDiner, you keep ₹550", items:[
  {r:[4,16.5,92,19], t:"One price first: the cash you pay tonight."},
  {r:[8,36,46,7], t:"What you keep, compared with just paying the bill."},
  {r:[4,59.5,92,20.5], t:"Coins sit on their own line and never change the order."},
  {r:[3.5,85.5,93,8], t:"One tap hands you to the cheapest app. SAVVY never pays."}]};

/* ----- SAVVY swipe experiment: one screen and one line per state. ----- */
const SW = {
  discover:{img:"savvy-swipe", say:"Drag the card: right books, left skips, up opens the full profile."},
  book:{img:"savvy-sw-book", say:"Booking Doolally. SAVVY hands you to the cheapest app to finish, then asks later if the deal held."},
  skip:{img:"savvy-sw-skip", say:"Skipped. Undo sits in the Dynamic Island for a moment."},
  end:{img:"savvy-sw-end", say:"That's everyone nearby. Widen the radius, review the places you skipped, or change filters."},
  detail:{img:"savvy-sw-detail", say:"The full profile: best price tonight, then popular dishes. Compare all three apps from here."}};

/* ----- SAVVY empathy maps: three diner types. Each note is [text, interview code]. ----- */
const EMP = [
 {name:"Reluctant Comparer", who:"No credit card, puts in the effort", src:"R01 · R03 · R10 · R13", q:{
  Says:[["“I do not like going through multiple apps, it feels very tedious… I'd rather stick to one app.”","R01"],["“I find it very stupid and a scam… it feels like I've been misdirected.” On coins.","R01"],["“Cashcoins are always like a scam or a betrayal for me when I pay my current bill.”","R03"],["“I refuse to download an app.”","R01"],["“It feels like a scam.” On coins.","R13"]],
  Thinks:[["Deal hunting is smart “as long as it does not consume you.”","R01"],["Ten steps to save, then “again go to another app to actually make the payment”: he wouldn't enjoy that.","R01"],["Checking for a discount at the table is “somewhere embarrassing, I would rather pay whatever the amount is.” Her survey answer says otherwise.","R03"],["Coin offers feel like a gimmick, time and energy wasted on finding the best deal. (Notes)","R10"]],
  Does:[["Opens Maps for the route, then logs into Swiggy to check for offers.","R01"],["“I compare or ask my sister to compare side-by-side as to which app is giving me more discount.”","R03"],["Checks Swiggy Dineout against Zomato and goes with whichever offers more. (Notes)","R10"],["At the bill: scans for extra charges, then picks the payment with the best saving, “all this a little fast.”","R10"],["No card of their own. Pays by UPI, cash or a parent's card.","R01 · R03 · R13"],["Finds deals through Instagram reels, food influencers and app notifications.","R01 · R03"]],
  Feels:[["“Disappointed, not frustrated” when the card that gives the deal isn't on hand.","R01"],["A missed offer is “very regretful and annoying that keeps jumping in my head.”","R03"],["A bit irritated switching apps, but does it to save money. (Notes)","R10"],["Frustrated and annoyed answering the cashback question. (Notes)","R10"],["Cover charges that can't be redeemed make the deal “very unsweet”: “paying money just to enter the restaurant.”","R01"]]}},
 {name:"Passive Card Holder", who:"Has cards, uses them late", src:"R02 · R04 · R09 · R11 · R12", q:{
  Says:[["“All the money still leaves my own pocket, so what was the benefit of the discount?” Translated.","R11"],["“I'd rather prefer it being in my own wallet rather than in the app's wallet.”","R02"],["“It feels like a scam as validity gets discarded before use.”","R04"],["“HDFC always gives best discounts rather than other.”","R04"],["Would pay a yearly fee for a tool that does this maths “if the numbers are accurate & trustworthy.” (Notes)","R11"]],
  Thinks:[["“If I don't check all, I'll end up paying more than someone else.” (Notes)","R11"],["Coins are “just companies' tactics” to bring you back, with your money locked in the app. (Notes, translated)","R12"],["Doesn't see the point of a subscription: “it's a competitive market so companies are giving bunch of the discounts.”","R04"],["Notices “how the prices differs” between apps.","R04"]],
  Does:[["Uses whichever card pops up at the app's checkout. (Notes)","R11"],["“The apps generally show the options of the card offers.”","R02"],["Checks which card has an offer only when it's time to pay. (Notes, translated)","R12"],["Opens Zomato, then District for a better offer, then looks for bank discounts. (Notes)","R12"],["Checks whether the restaurant has “any offer on cards / Zomato / Swiggy.”","R09"],["“In a rush I will pay the bill.”","R04"]],
  Feels:[["Tense hurrying to book, then keeps switching apps in case another is better. (Notes, translated)","R12"],["A missed card discount “did hurt my wallet”, so now checks offers regularly.","R02"],["Slightly angry at a convenience fee not shown before booking: “discount benefit feels nothing.” (Notes)","R11"],["“I usually feel very frustrating.” On switching apps.","R09"],["Feels cheated by cashback; sad when missing a discount. (Notes)","R12"]]}},
 {name:"Just-Pay Pragmatist", who:"Low effort, someone else picks the place", src:"R05 · R06 · R08", q:{
  Says:[["“I just see menu card and order the food.”","R06"],["“If I have no option, I will pay the bill.”","R08"],["“I feels like scam happen with me.” On coins.","R08"],["Coins are “a little bit annoying & frustrated, some sort of scam.”","R05"]],
  Thinks:[["“I don't mind whatever I get, I will [be] happy.”","R06"],["“After applying all discount whatever I will get I will be happy.” No saving target.","R08"],["Notices “how the prices are diversed and low and high on the delivery apps.”","R05"]],
  Does:[["“One of the family members picks” the restaurant.","R05"],["Checks Google for which restaurant has the best food or deals.","R05"],["“I'll just pay the bill”, in a rush.","R06"],["Prefers ordering online to going out.","R08"],["Doesn't use credit cards.","R05 · R08"]],
  Feels:[["“Frustrating”: switching between apps.","R08"],["Annoyed and frustrated by coins instead of money off.","R05"]]}}
];

/* ----- SAVVY site map. [screen code, label, flag]: flag 1 = state or edge case, 2 = SAVVY+, 3 = menu link with no screen. ----- */
const SITEMAP = [
 ["Onboarding","First run only",[["01","Splash"],["02","Sign up: name, mobile number, OTP"],["03","Preferences: apps, memberships, cards (optional)"]]],
 ["Home tab","",[["04","List: search and filters (Near me · On 2+ apps · Cover-free)"],["04b","Map with price pins"],["04c","No results",1]]],
 ["Deals tab","",[["05","Sort by biggest saving, nearest, no cover"]]],
 ["Restaurant screen","Opened from Home or Deals",[["06","Book side: pick app and slot, % off per app"],["07","Pay side: enter the bill"],["08a","Fetching offers",1],["08","Comparison, ranked by cash paid now"],["08b","Offer trust decayed",1],["09","Deep dive: all your cards, exact ₹ with SAVVY+",2],["10","Hand-off: amount and code (10b, table-card variant)"],["06b","Not on any deal app",1]]],
 ["Saving tab","",[["12","Verified savings and a monthly goal"],["12b","SAVVY+ return on membership",2]]],
 ["Profile tab","",[["13","Your cards, apps and memberships"],["14","SAVVY+: what it unlocks, free week",2],["","Neutrality and disclosure · Privacy and data · Help · Sign out",3]]],
 ["After the visit","Push prompt",[["11","Verify: did the deal hold? Feeds Saving"]]]
];

/* ----- SAVVY access rules, grouped. Each item is [what, screen codes]. ----- */
const ACCESS = [
 {t:"Every diner", sub:"Free and SAVVY+", c:"all", items:[["Create an account; add apps, memberships, cards (optional)","02 · 03"],["Search, list, map; browse Deals","04 · 05"],["Compare apps: Book (% per app) or Pay (ranked by cash now)","06 · 07 · 08"],["Hand-off to the partner app with a code","10"],["Verify the deal; savings ledger","11 · 12"]]},
 {t:"SAVVY+ only", sub:"Or during a free week", c:"plus", items:[["AI savings assistant: which card wins any bill","14"],["Offers remaining on each card","14"],["Is my Swiggy One or Prime paying off?","12b"],["Leave-by and traffic reminder","14"]]},
 {t:"Restaurant host", sub:"Early v2 screens only, then dropped", c:"host", items:[["See tonight's SAVVY guests; seat them; hold or release a table","v2"]]}];

/* ----- SAVVY access table (kept for reference; the page shows ACCESS above). ----- */
const RBAC = {cols:["Permission","Diner, Free","Diner, SAVVY+","Restaurant host (v2 only)","Where it shows"], rows:[
 ["Create account; set apps, memberships, cards (optional)","Y","Y","","02 · 03"],
 ["Search, list, map; browse Deals","Y","Y","","04 · 04b · 05"],
 ["Compare apps: Book (% per app) or Pay (ranked by cash now)","Y","Y","","06 · 07 · 08"],
 ["Card-by-card figures in Deep dive","Honest estimate (~)","Exact ₹","","09 · 14"],
 ["AI savings assistant: which card wins any bill","N","Y","","14"],
 ["Offers remaining on each card","N","Y","","14"],
 ["Is my Swiggy One or Prime paying off?","N","Y","","12b · 14"],
 ["Leave-by and traffic reminder","N","Y","","14"],
 ["Hand-off to the partner app with a code","Y","Y","","10 · 10b"],
 ["Verify the deal, savings ledger","Y","Y","","11 · 12"],
 ["Free week of SAVVY+","Unlocked by the monthly goal","Included","","12 · 14"],
 ["Booking status: on my way, running late, can't make it","✓ in v2","✓ in v2","","v2 screens"],
 ["See tonight's SAVVY guests; seat them; hold or release a table","N","N","Y","v2 screens"]]};

/* ----- SAVVY attribute rules, one sentence each. ----- */
const ABAC = [
 "Exact card figures: allowed if membership is SAVVY+. Otherwise show the honest estimate (~).",
 "SAVVY+ extras (assistant, offers remaining, return tracker, leave-by reminder): allowed if membership is SAVVY+ or a free week is active.",
 "Free week: granted when savings this month reach the monthly goal (shown on 12, Saving).",
 "Card offers: shown only for cards the diner added. With no cards, the “No card” price is the answer. Cards never gate the comparison.",
 "Restaurant host actions (v2 only): allowed if the user is a host and the booking is at their venue."];

/* ----- Flow diagrams. Each row is a line of nodes, read left to right.
   k: start | end | step | dec (decision) | out (outside the app) | plus (SAVVY+) | ai (Ankur's AI)
   t: the label. e: label on the arrow to the next node. i: a small icon.
   br: a branch below the node: {k: dead | loop | plus | risk | alt, e: arrow label, t: text} ----- */
const FL = {
 savvyUser:{title:"User flow", sub:"From opening SAVVY to paying in the cheapest app. SAVVY never books or pays; it hands off.", cols:4, rows:[
  {lab:"Find the place", n:[
    {k:"start", t:"Open SAVVY"},
    {k:"dec", t:"First time?", e:"No", br:{k:"alt", e:"Yes", t:"Onboarding: sign up, then apps, memberships, cards (optional)"}},
    {k:"step", t:"Home: search, list or map", i:"⌕"},
    {k:"dec", t:"Restaurant found?", e:"Yes", br:{k:"loop", e:"No", t:"No places match: clear filters, try again"}}]},
  {lab:"Compare", n:[
    {k:"step", t:"Restaurant screen with a Book / Pay toggle", i:"▤"},
    {k:"dec", t:"On any deal app?", e:"Yes", br:{k:"dead", e:"No", t:"Book direct, or get told when a deal appears"}},
    {k:"dec", t:"Book ahead or pay at the table?", e:"Pay", br:{k:"alt", e:"Book", t:"Pick app and slot, % off per app"}},
    {k:"step", t:"Enter the bill. Live offers from 3 apps, ranked by cash paid now", i:"₹"}]},
  {lab:"Choose", n:[
    {k:"dec", t:"Has the offer held for recent diners?", e:"Yes", br:{k:"dead", e:"No", t:"Trust decayed: it drops, a safer offer moves up"}},
    {k:"dec", t:"See every card?", e:"No", br:{k:"plus", e:"Yes", t:"Deep dive: your cards by real saving"}},
    {k:"step", t:"Hand-off: the amount and a code, then open the app", i:"↗", br:{k:"risk", e:"Risk", t:"R01 won't use a flow that sends him to a second app to pay"}},
    {k:"dec", t:"Deep link opens with the deal?", e:"Yes", br:{k:"alt", e:"No", t:"Copy the code by hand, or log it yourself"}}]},
  {lab:"After SAVVY", n:[
    {k:"out", t:"Book or pay inside the cheapest app"},
    {k:"step", t:"Later: did the deal hold?", i:"✓"},
    {k:"end", t:"Saving logged"}]}]},
 task1:{nolg:1, title:"Task 1 · Book ahead", sub:"People pick the place first, then hunt for the deal (R04, R05, R10, R11, R13). Comparing apps by hand is tedious (R01, R03, R10, R12).", cols:5, rows:[
  {n:[{k:"start", t:"Restaurant already chosen"},{k:"step", t:"Open it: Book is the default side"},{k:"step", t:"% off per app, slots, apps not on this venue"},
      {k:"dec", t:"Want card detail?", e:"No", br:{k:"plus", e:"Yes", t:"Some cards save more: deep dive, then back"}},{k:"step", t:"Tap Book on the cheapest app"}]},
  {n:[{k:"step", t:"Hand-off: code ready to copy"},{k:"out", t:"Book the slot inside that app"},{k:"step", t:"“Did the deal hold?” prompt"},{k:"end", t:"Saving logged"}]}]},
 task2:{nolg:1, title:"Task 2 · Pay at the table", sub:"At the bill people scan for extra charges and pay fast (R10, R12). In a rush they just pay (R04, R06, R08). Coins and cover charges wipe out the “discount” (R01, R03, R11, R12).", cols:5, rows:[
  {n:[{k:"start", t:"The bill arrives"},{k:"step", t:"Open the restaurant, flip to Pay"},{k:"step", t:"Enter the bill amount"},{k:"step", t:"Compare 3 apps: live offers"},{k:"step", t:"Ranked by cash paid now, coins on their own line"}]},
  {n:[{k:"dec", t:"Top offer still holding?", e:"Yes", br:{k:"dead", e:"No", t:"Trust decayed: next best moves up"}},{k:"step", t:"Hand-off: you'll pay ₹X, plus a code"},{k:"out", t:"Pay inside that app"},{k:"step", t:"“Did the deal hold?” a few hours later"},{k:"end", t:"Saving logged"}]}]},
 task3:{title:"Task 3 · Pick the right card", sub:"People use whichever card the app shows at checkout (R02, R11), or think about cards only at the bill (R12). Missing the right card stings (R01, R02).", cols:5, rows:[
  {n:[{k:"start", t:"On Book or Comparison"},{k:"step", t:"See all cards and the full maths"},{k:"step", t:"Deep dive: live dining offers by real saving, “No card” as the baseline"},
      {k:"dec", t:"SAVVY+ member?", e:"Yes", br:{k:"alt", e:"No", t:"Honest estimates (~), with a Go SAVVY+ option"}},{k:"plus", t:"Exact rupee figure per card"}]},
  {n:[{k:"step", t:"Pick the winning card"},{k:"step", t:"Hand-off with that card named, plus code"},{k:"out", t:"Pay or book inside the app"},{k:"end", t:"Saving logged"}]}]},
 ankur:{title:"User task flow", sub:"Every diamond is a teacher decision. The AI never auto-approves, and a child is never labelled.", cols:4, ai:true, rows:[
  {lab:"Set up", n:[
    {k:"start", t:"Teacher opens Ankur"},{k:"step", t:"Teacher logs in"},
    {k:"dec", t:"Child registered?", e:"Yes", br:{k:"alt", e:"No", t:"Register the child: nickname, age, language"}},
    {k:"step", t:"Log a quick observation: a domain and a chip, or a note", i:"✎"}]},
  {lab:"Draft", n:[
    {k:"dec", t:"Ready to draft targets?", e:"Yes", br:{k:"loop", e:"No", t:"Log more first"}},
    {k:"ai", t:"AI drafts 2 to 4 targets, with activities"},
    {k:"dec", t:"Approve the draft?", e:"Approve", br:{k:"loop", e:"Redo / edit", t:"Ask the AI to redo, or edit it and then approve"}},
    {k:"step", t:"Add to plan, teach, add weekly work samples", i:"▦"}]},
  {lab:"Track", n:[
    {k:"dec", t:"Enough samples for a pattern?", e:"Yes", br:{k:"loop", e:"No", t:"Keep adding samples"}},
    {k:"step", t:"Confirm the pattern (non-diagnostic), update target status"},
    {k:"ai", t:"Monthly summary assembles itself"},
    {k:"dec", t:"Month end, progress card needed?", e:"Yes", br:{k:"loop", e:"No", t:"Next month: back to logging"}}]},
  {lab:"Report", n:[{k:"out", t:"Export a summary ready for the Holistic Progress Card (roadmap)"},{k:"end", t:"The cycle continues"}]}]}
};

/* ----- SAVVY iteration journey: one stop per version. img is a file in img/ (without .webp). sw = colours, f = fonts, na = note when there are no colours. ----- */
const ITER = [
 {v:"v1", img:"it-v1", t:"Test the idea", d:"Eight screens. Book or pay, and every app's price in one list.", sw:["#6C5CE7","#12B76A","#1A1526","#ECE9FF"], f:"Inter"},
 {v:"v2", img:"it-v2", t:"Intent first", d:"Starts from your plan: today, 4 PM, 2 guests, and who has your table. A restaurant-host side too, dropped later.", na:"Same purple look as v1"},
 {v:"v3", img:"it-v3", t:"Rebuilt on audit data", d:"Greyscale wireframes with real offers from the 10-restaurant audit. Walk-in offers are small, shown honestly.", na:"Greyscale wireframe"},
 {v:"v4", img:"it-v4", t:"Hi-fi in teal", d:"17 screens. Critique found a confusing card boost, a Book button with no redirect, no way to use a friend's card, and coins marked differently. Amber became the coin colour.", sw:["#0C7C6D","#13211E","#A85B00","#EEF1EF"], f:"Inter"},
 {v:"v5", img:"it-v5", t:"One design system", d:"Teal for structure, coral for the one main action, amber only for coins. Money set in a mono font.", sw:["#0C7C6D","#FF6B5A","#C98A2B","#F5F4F2"], f:"Inter + IBM Plex Mono"},
 {v:"v6", img:"it-v6", t:"Image-forward", d:"Food photography leads the home screen, so you pick the place first.", na:"Photo-led pass on the v5 system"},
 {v:"M3", img:"it-and", t:"Android in Material 3", d:"Each app as a card: what you pay now, the instant part, coins later, cover. Ranked by real cash saving.", sw:["#0C7C6D","#C98A2B","#1A1622","#E1F0EC"], f:"Inter + IBM Plex Mono + Archivo"},
 {v:"Final", img:"it-final-n", t:"One answer, night and day", d:"₹1,450 on EazyDiner, you keep ₹550. The maths sits underneath. Night and day, on iOS and Android.", sw:["#0B0B0A","#D4FF3F","#FFB547","#F5F2EA"], f:"Inter"}];

/* ----- Opening panels of screens (not on the page right now; kept in case you want them back). ----- */
const PH = {
 r1:[["savvy-compare","Compare","Best for ₹2,000: every app and its price, in a list you have to read.",386,841],
     ["savvy-handoff","Hand-off","You're saving ₹200. Then you finish in the partner app.",386,841],
     ["savvy-trust","Offer trust","“This deal's been shaky”: offers that failed for other diners are flagged.",386,841],
     ["savvy-verify","Verify","Did the deal hold? One question after the meal.",386,841],
     ["savvy-saving","Saving map","₹6,400 saved this month, on a map.",386,841]],
 r2:[["savvy-compare","v4, before","Teal, and a list of apps and prices to read through.",386,841],
     ["savvy-n-answer","Final, night","One price first: ₹1,450 on EazyDiner. You keep ₹550.",402,874],
     ["savvy-d-answer","Final, day","Same order in the day theme: the price, what you keep, then the maths.",402,874],
     ["savvy-and-n-answer","Android, night","Material 3, with the same answer-first screen.",412,917],
     ["savvy-and-d-answer","Android, day","Material 3 in the day theme.",412,917]]};

/* ----- Ankur competitor table. Five letters per tool, Y or N, in the order of cols. ----- */
const ANKUR_CM = {cols:["Teacher observation","Non-diagnostic","NCF-FS native","Pre-primary, 3 to 6","AI targets the teacher approves"], rows:[
 ["Toddle Play","YYNYN","Built for IB and Cambridge curricula, not NEP"],
 ["Illumine","YYNYN","Curriculum-agnostic, centre management first"],
 ["Rocket Learning","NYYYN","Pushes content, not per-child observation"],
 ["Nipun Lakshya","NNYNN","Diagnostic, Classes 1 to 3 only"],
 ["Ei Mindspark","NNNNN","Student-facing and diagnostic"],
 ["DIKSHA + Jaadui Pitara","NYYYN","Content libraries: complement them, don't fight them"],
 ["Ankur","YYYYY","Yes on all five: the white space"]]};

/* ----- Stakeholders and market blocks, one per project (HTML). ----- */
const CONTEXT = {
 savvy: () => `<div class="ctx">
   <p>Who SAVVY touches, from my research and the business model. SAVVY sits on top of the dine-out apps, so it needs a partner who gains from it.</p>
   <div class="who4">
    <div><em>The users</em><b>Diners</b><p>Three types from 13 interviews. Most pick the place first and look for a deal after.</p><span class="mono">Interviews</span></div>
    <div><em>Pays SAVVY</em><b>Restaurants</b><p>Bookings and a no-show tool, with “book a table” as a main feature. They may push back on price comparison.</p><span class="mono">Business model</span></div>
    <div><em>Hand-off partners</em><b>Dine-out apps</b><p>Swiggy Dineout, District, EazyDiner and Zomato. No offer-data API, and no reason to help a comparison tool.</p><span class="mono">Constraints</span></div>
    <div><em>Set the best deals</em><b>Banks and card issuers</b><p>The biggest discounts need one specific bank card, so cards inform the answer but never gate it.</p><span class="mono">Field audit</span></div>
   </div>
   ${slot("Your competitor audit as a table: which apps or tools already compare dine-out deals, and what each misses","Your SAVVY research files (the project file lists a competitor audit)")}</div>`,
 ankur: () => `<div class="ctx">
   <h3>Stakeholders</h3>
   <p class="dim">Power and interest. The child is the subject of the data, not a user; the teacher is the primary user and decides adoption.</p>
   <div class="pi">
    <span class="ax y">Power ↑</span>
    <div class="q"><span class="mono dim">Keep satisfied</span><ul><li>PARAKH / NCERT, who set the Holistic Progress Card standard</li><li>DPDP Data Protection Board, the regulator</li></ul></div>
    <div class="q"><span class="mono dim">Manage closely</span><ul><li>State Education Dept / SCERT, the mandating buyer</li><li>Head teacher or coordinator, who reads the totals</li></ul></div>
    <div class="q"><span class="mono dim">Monitor</span><ul><li>Device and connectivity providers</li><li>The general public</li></ul></div>
    <div class="q hot"><span class="mono">Design for and engage</span><ul><li><b>Teachers, the users</b></li><li>Parents and guardians</li><li>Mentors / CRC</li><li>CSR and NGO funders</li></ul></div>
    <span class="ax x">Interest in Ankur →</span>
   </div>
   <h3>Competitors</h3>
   <div class="cm-wrap"><table class="cm"><thead><tr><th scope="col">Tool</th>${ANKUR_CM.cols.map(c => `<th scope="col">${c}</th>`).join("")}<th scope="col">The gap</th></tr></thead>
    <tbody>${ANKUR_CM.rows.map(([n,v,g]) => `<tr${n === "Ankur" ? ' class="us"' : ""}><th scope="row">${n}</th>${[...v].map(cell).join("")}<td class="gap">${esc(g)}</td></tr>`).join("")}</tbody></table></div>
   <h3>SWOT</h3>
   <div class="swot">
    <div><b data-l="S">Strengths</b><ul><li>The only tool combining observation, AI targets and a portfolio, all non-diagnostic</li><li>Native to NEP, NCF-FS and NIPUN</li><li>Covers the full 3 to 8 band</li><li>Privacy first, in line with DPDP</li><li>The teacher decides; the app scaffolds</li></ul></div>
    <div><b data-l="W">Weaknesses</b><ul><li>Needs teachers who are ready for tech, and devices</li><li>Single purpose</li><li>No distribution yet</li><li>Hard to charge for next to free government tools</li><li>AI drafts need trust and quality checks</li></ul></div>
    <div><b data-l="O">Opportunities</b><ul><li>NIPUN 2026-27 and the PARAKH progress-card mandate</li><li>About 1.4 million Anganwadis</li><li>Vernacular and offline first</li><li>Government, CSR and school channels</li><li>Be the software that runs PARAKH</li></ul></div>
    <div><b data-l="T">Threats</b><ul><li>Free government platforms</li><li>Infrastructure gaps: about 64% of schools online</li><li>Incumbents like LEAD, BYJU'S and Ei</li><li>Teacher change management and uncertain funding</li><li>DPDP compliance from 2027</li></ul></div>
   </div></div>`,
 greggs: () => `<div class="ctx">
   <p>What the research took from rivals and from Greggs' own past.</p>
   <div class="who4">
    <div><em>Competitor</em><b>Pret</b><p>Relied on city-centre offices, and changed its subscription price three times: £20, £30, then £10.</p><span class="mono">R&amp;D report</span></div>
    <div><em>Analogy</em><b>Costco</b><p>Keeps its hot dog price fixed and pays for it elsewhere. The real secret was the membership.</p><span class="mono">R&amp;D report</span></div>
    <div><em>Greggs' own past</em><b>Belgium, 2008</b><p>Greggs left after exporting a British menu as-is.</p><span class="mono">R&amp;D report</span></div>
    <div><em>Market split</em><b>Greggs North, Pret South</b><p>A machine-learning study split England this way, matching the income divide.</p><span class="mono">R&amp;D report</span></div>
   </div>
   ${slot("A stakeholder map for Greggs 2050, if you made one","Not in your files yet")}</div>`
};
