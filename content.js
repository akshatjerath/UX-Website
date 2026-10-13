/* =====================================================================
   CONTENT. Everything you'd want to edit lives in this file:
   your details, media, the four projects, and the data behind every
   diagram. Page code: home.js (home), case.js and case-widgets.js (case
   studies), nav.js (phone menu). Styles: base.css, home.css, case.css.

   Edit text between the quotes or backticks. Keep the commas.
   Tip: after editing, open index.html; if the page goes blank, a comma
   or quote is missing on the line you changed (the browser console
   names the line).
   ===================================================================== */

/* helpers the content below uses (leave these) */
const $ = id => document.getElementById(id);

/* ===== YOUR DETAILS. Empty fields stay hidden. ===== */
const ME = {
  cv: "assets/Akshat_Jerath_CV.pdf",   // your UX CV; empty hides every CV button
  email: "akshatjeratth@gmail.com",     // as listed on akshatjerath.com
  linkedin: "https://www.linkedin.com/in/akshat-jerath/",
  seeking: ""   // left empty on purpose: the home page no longer shows an "open to roles" line
};
/* While DRAFT is true, dashed boxes mark what still needs your input. Set to false before publishing. */
const DRAFT = !/github\.io$|akshatjerath\.com$/.test(location.hostname) || /[?&]draft\b/.test(location.search);

/* ----- SAVVY final design: the spotlight. r = [left, top, width, height] of each highlight, in % of the screen. ----- */
const SPOT = {img:"savvy-n-answer", alt:"SAVVY answer screen, night theme: best price tonight ₹1,450 on EazyDiner, you keep ₹550", items:[
  {r:[4,16.5,92,19], t:"One price first: the cash you pay tonight."},
  {r:[8,36,46,7], t:"What you keep, compared with just paying the bill."},
  {r:[4,59.5,92,20.5], t:"Coins sit on their own line and never change the order."},
  {r:[3.5,85.5,93,8], t:"One tap hands you to the cheapest app. SAVVY never pays."}]};

/* ----- SAVVY empathy maps: three diner types. Each note is [text, interview code]. ----- */
const EMP = [
 {name:"Reluctant Comparer", who:"No credit card, puts in the effort", src:"R01 · R03 · R10 · R13", q:{
  Says:[["\"I do not like going through multiple apps, it feels very tedious… I'd rather stick to one app.\"","R01"],["\"I find it very stupid and a scam… it feels like I've been misdirected.\" On coins.","R01"],["\"Cashcoins are always like a scam or a betrayal for me when I pay my current bill.\"","R03"],["\"I refuse to download an app.\"","R01"],["\"It feels like a scam.\" On coins.","R13"]],
  Thinks:[["Deal hunting is smart \"as long as it does not consume you.\"","R01"],["Ten steps to save, then \"again go to another app to actually make the payment\": he wouldn't enjoy that.","R01"],["Checking for a discount at the table is \"somewhere embarrassing, I would rather pay whatever the amount is.\" Her survey answer says otherwise.","R03"],["Coin offers feel like a gimmick, time and energy wasted on finding the best deal. (Notes)","R10"]],
  Does:[["Opens Maps for the route, then logs into Swiggy to check for offers.","R01"],["\"I compare or ask my sister to compare side-by-side as to which app is giving me more discount.\"","R03"],["Checks Swiggy Dineout against Zomato and goes with whichever offers more. (Notes)","R10"],["At the bill: scans for extra charges, then picks the payment with the best saving, \"all this a little fast.\"","R10"],["No card of their own. Pays by UPI, cash or a parent's card.","R01 · R03 · R13"],["Finds deals through Instagram reels, food influencers and app notifications.","R01 · R03"]],
  Feels:[["\"Disappointed, not frustrated\" when the card that gives the deal isn't on hand.","R01"],["A missed offer is \"very regretful and annoying that keeps jumping in my head.\"","R03"],["A bit irritated switching apps, but does it to save money. (Notes)","R10"],["Frustrated and annoyed answering the cashback question. (Notes)","R10"],["Cover charges that can't be redeemed make the deal \"very unsweet\": \"paying money just to enter the restaurant.\"","R01"]]}},
 {name:"Passive Card Holder", who:"Has cards, uses them late", src:"R02 · R04 · R09 · R11 · R12", q:{
  Says:[["\"All the money still leaves my own pocket, so what was the benefit of the discount?\" Translated.","R11"],["\"I'd rather prefer it being in my own wallet rather than in the app's wallet.\"","R02"],["\"It feels like a scam as validity gets discarded before use.\"","R04"],["\"HDFC always gives best discounts rather than other.\"","R04"],["Would pay a yearly fee for a tool that does this maths \"if the numbers are accurate & trustworthy.\" (Notes)","R11"]],
  Thinks:[["\"If I don't check all, I'll end up paying more than someone else.\" (Notes)","R11"],["Coins are \"just companies' tactics\" to bring you back, with your money locked in the app. (Notes, translated)","R12"],["Doesn't see the point of a subscription: \"it's a competitive market so companies are giving bunch of the discounts.\"","R04"],["Notices \"how the prices differs\" between apps.","R04"]],
  Does:[["Uses whichever card pops up at the app's checkout. (Notes)","R11"],["\"The apps generally show the options of the card offers.\"","R02"],["Checks which card has an offer only when it's time to pay. (Notes, translated)","R12"],["Opens Zomato, then District for a better offer, then looks for bank discounts. (Notes)","R12"],["Checks whether the restaurant has \"any offer on cards / Zomato / Swiggy.\"","R09"],["\"In a rush I will pay the bill.\"","R04"]],
  Feels:[["Tense hurrying to book, then keeps switching apps in case another is better. (Notes, translated)","R12"],["A missed card discount \"did hurt my wallet\", so now checks offers regularly.","R02"],["Slightly angry at a convenience fee not shown before booking: \"discount benefit feels nothing.\" (Notes)","R11"],["\"I usually feel very frustrating.\" On switching apps.","R09"],["Feels cheated by cashback; sad when missing a discount. (Notes)","R12"]]}},
 {name:"Just-Pay Pragmatist", who:"Low effort, someone else picks the place", src:"R05 · R06 · R08", q:{
  Says:[["\"I just see menu card and order the food.\"","R06"],["\"If I have no option, I will pay the bill.\"","R08"],["\"I feels like scam happen with me.\" On coins.","R08"],["Coins are \"a little bit annoying & frustrated, some sort of scam.\"","R05"]],
  Thinks:[["\"I don't mind whatever I get, I will [be] happy.\"","R06"],["\"After applying all discount whatever I will get I will be happy.\" No saving target.","R08"],["Notices \"how the prices are diversed and low and high on the delivery apps.\"","R05"]],
  Does:[["\"One of the family members picks\" the restaurant.","R05"],["Checks Google for which restaurant has the best food or deals.","R05"],["\"I'll just pay the bill\", in a rush.","R06"],["Prefers ordering online to going out.","R08"],["Doesn't use credit cards.","R05 · R08"]],
  Feels:[["\"Frustrating\": switching between apps.","R08"],["Annoyed and frustrated by coins instead of money off.","R05"]]}}
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

/* ----- SAVVY attribute rules, one sentence each. ----- */
const ABAC = [
 "Exact card figures: allowed if membership is SAVVY+. Otherwise show the honest estimate (~).",
 "SAVVY+ extras (assistant, offers remaining, return tracker, leave-by reminder): allowed if membership is SAVVY+ or a free week is active.",
 "Free week: granted when savings this month reach the monthly goal (shown on 12, Saving).",
 "Card offers: shown only for cards the diner added. With no cards, the \"No card\" price is the answer. Cards never gate the comparison.",
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
  {n:[{k:"step", t:"Hand-off: code ready to copy"},{k:"out", t:"Book the slot inside that app"},{k:"step", t:"\"Did the deal hold?\" prompt"},{k:"end", t:"Saving logged"}]}]},
 task2:{nolg:1, title:"Task 2 · Pay at the table", sub:"At the bill people scan for extra charges and pay fast (R10, R12). In a rush they just pay (R04, R06, R08). Coins and cover charges wipe out the \"discount\" (R01, R03, R11, R12).", cols:5, rows:[
  {n:[{k:"start", t:"The bill arrives"},{k:"step", t:"Open the restaurant, flip to Pay"},{k:"step", t:"Enter the bill amount"},{k:"step", t:"Compare 3 apps: live offers"},{k:"step", t:"Ranked by cash paid now, coins on their own line"}]},
  {n:[{k:"dec", t:"Top offer still holding?", e:"Yes", br:{k:"dead", e:"No", t:"Trust decayed: next best moves up"}},{k:"step", t:"Hand-off: you'll pay ₹X, plus a code"},{k:"out", t:"Pay inside that app"},{k:"step", t:"\"Did the deal hold?\" a few hours later"},{k:"end", t:"Saving logged"}]}]},
 task3:{title:"Task 3 · Pick the right card", sub:"People use whichever card the app shows at checkout (R02, R11), or think about cards only at the bill (R12). Missing the right card stings (R01, R02).", cols:5, rows:[
  {n:[{k:"start", t:"On Book or Comparison"},{k:"step", t:"See all cards and the full maths"},{k:"step", t:"Deep dive: live dining offers by real saving, \"No card\" as the baseline"},
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
 {v:"v1", imgs:["savvy-it1-1","savvy-it1-2","savvy-it1-3","savvy-it1-4","savvy-it1-5"], alts:["a list of restaurants, each with an image block and a data block","a Book or Pay switch above one large restaurant data block","a Book or Pay switch with time slots for Swiggy, District, Eazy Diner and Zomato","a Book or Pay switch above an Enter Amt button","a Book or Pay switch, Rs.2000 entered, and time slots for each app"], t:"Grey boxes in Figma", d:"Version 1: grey boxes in Figma to test the order of screens: list, Book or Pay, time slots per app, amount.", na:"Grey boxes, no colour"},
 {v:"v2", img:"it-v1", t:"Test the idea", d:"Eight screens. Book or pay, and every app's price in one list.", sw:["#6C5CE7","#12B76A","#1A1526","#ECE9FF"], f:"Inter"},
 {v:"v3", img:"it-v2", t:"Intent first", d:"Starts from your plan: today, 4 PM, 2 guests, and who has your table. A restaurant-host side too, dropped later.", na:"Same purple look as v2"},
 {v:"v4", img:"it-v3", t:"Rebuilt on audit data", d:"Greyscale wireframes with real offers from the 10-restaurant audit. Walk-in offers are small, shown honestly.", na:"Greyscale wireframe"},
 {v:"v5", img:"it-v4", t:"Hi-fi in teal", d:"17 screens. Critique found a confusing card boost, a Book button with no redirect, no way to use a friend's card, and coins marked differently. Amber became the coin colour.", sw:["#0C7C6D","#13211E","#A85B00","#EEF1EF"], f:"Inter"},
 {v:"v6", img:"it-v5", t:"One design system", d:"Teal for structure, coral for the one main action, amber only for coins. Money set in a mono font.", sw:["#0C7C6D","#FF6B5A","#C98A2B","#F5F4F2"], f:"Inter + IBM Plex Mono"},
 {v:"v7", img:"it-v6", t:"Image-forward", d:"Food photography leads the home screen, so you pick the place first.", na:"Photo-led pass on the v6 system"},
 {v:"M3", img:"it-and", t:"Android in Material 3", d:"Each app as a card: what you pay now, the instant part, coins later, cover. Ranked by real cash saving.", sw:["#0C7C6D","#C98A2B","#1A1622","#E1F0EC"], f:"Inter + IBM Plex Mono + Archivo"},
 {v:"Final", img:"it-final-n", t:"One answer, night and day", d:"₹1,450 on EazyDiner, you keep ₹550. The maths sits underneath. Night and day, on iOS and Android.", sw:["#0B0B0A","#D4FF3F","#FFB547","#F5F2EA"], f:"Inter"}];

/* ----- Ankur competitor table. Five letters per tool, Y or N, in the order of cols. ----- */
const ANKUR_CM = {cols:["Teacher observation","Non-diagnostic","NCF-FS native","Pre-primary, 3 to 6","AI targets the teacher approves"], rows:[
 ["Toddle Play","YYNYN","Built for IB and Cambridge curricula, not NEP"],
 ["Illumine","YYNYN","Curriculum-agnostic, centre management first"],
 ["Rocket Learning","NYYYN","Pushes content, not per-child observation"],
 ["Nipun Lakshya","NNYNN","Diagnostic, Classes 1 to 3 only"],
 ["Ei Mindspark","NNNNN","Student-facing and diagnostic"],
 ["DIKSHA + Jaadui Pitara","NYYYN","Content libraries: complement them, don't fight them"],
 ["Ankur","YYYYY","Yes on all five: the white space"]]};

