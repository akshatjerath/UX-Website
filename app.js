/* Page code: theme, tiles, widgets, case-study layout and routing. Content is in content.js. */

/* ----- personal details ----- */
document.querySelectorAll(".stText").forEach(e => e.textContent = ME.seeking || "UX/UI designer");
if (ME.cv) { $("navCv").href = ME.cv; $("navCv").hidden = false; }
/* ----- day / night toggle: follows the device until the visitor picks ----- */
const root = document.documentElement, darkMq = matchMedia("(prefers-color-scheme: dark)"), tBtn = $("themeBtn");
try { const saved = localStorage.getItem("aj-theme"); if (saved) root.dataset.theme = saved; } catch(e){}
const lightMq = matchMedia("(prefers-color-scheme: light)");
const mode = () => root.dataset.theme || (lightMq.matches ? "light" : "dark");
function paintToggle(){ const d = mode() === "dark"; tBtn.dataset.mode = mode(); tBtn.setAttribute("aria-label", d ? "Switch to day mode" : "Switch to night mode"); }
lightMq.addEventListener?.("change", paintToggle); paintToggle();
tBtn.onclick = () => {
  const next = mode() === "dark" ? "light" : "dark";
  const apply = () => { root.dataset.theme = next; paintToggle(); try { localStorage.setItem("aj-theme", next); } catch(e){} };
  if (reduce || !document.startViewTransition) return apply();
  const r = tBtn.getBoundingClientRect(), x = r.left + r.width/2, y = r.top + r.height/2;
  const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.classList.add("theming");
  const vt = document.startViewTransition(apply);
  vt.ready.then(() => root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${end}px at ${x}px ${y}px)`]},
    {duration:400, easing:"cubic-bezier(.65,.05,.25,1)", pseudoElement:"::view-transition-new(root)"}));
  vt.finished.finally(() => root.classList.remove("theming"));
};

/* ----- stages ----- */
let ringK = 0;
function stage(p, n){
  let inner = "";
  if (p.stage === "savvy") inner = MEDIA.savvyHero ? `<img class="photo" src="${esc(MEDIA.savvyHero)}" alt="">`
    : `<div class="fan"><img src="img/savvy-n-tonight.webp" alt="" width="402" height="874"><img src="img/savvy-n-answer.webp" alt="" width="402" height="874"><img src="img/savvy-n-island.webp" alt="" width="402" height="874"></div>`;
  else if (p.stage === "ankur") inner = MEDIA.ankurVideo ? `<video src="${esc(MEDIA.ankurVideo)}" autoplay muted loop playsinline></video>`
    : `<div class="ring" data-ring><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="50" cy="50" rx="50" ry="50"/></svg>
       <ul>${p.loop.map((s,k) => { const a = (-90 + k * 60) * Math.PI / 180; return `<li class="${s.ai ? "ai" : ""}${k === ringK ? " on" : ""}" style="left:${(50 + 36 * Math.cos(a)).toFixed(1)}%;top:${(50 + 40 * Math.sin(a)).toFixed(1)}%">${esc(s.t)}</li>`; }).join("")}</ul>
       <div class="ring-c"><span class="mono">The loop</span><b>${esc(p.loop[ringK].t)}</b><i>${esc(p.loop[ringK].who)}</i></div></div>`;
  else if (p.stage === "greggs") inner = `<div class="gst"><div><span class="gk">The future of brands · 2050</span><span class="big">${esc(p.big)}</span><span class="gs">A 17-page research and strategy report, plus a brand world made with AI.</span></div><img src="img/greggs-report-cover.webp" alt="" width="783" height="1111"></div>`;
  else inner = `<span class="big">${esc(p.big)}</span>`;
  return `<div class="stage ${p.stage}" aria-hidden="true">${n ? `<span class="k"><span class="key">${n}</span></span>` : ""}${inner}</div>`;
}
const teamTag = p => p.team ? `<span class="tag team">${esc(p.team)}</span>` : (DRAFT && p.teamTodo ? `<span class="tag todo">${esc(p.teamTodo)}</span>` : "");

/* ----- work tiles: four equal tiles, 2x2 ----- */
const tileHtml = (p,i) => `<a class="tile" href="#${p.id}" data-id="${p.id}">
  ${stage(p, i+1)}
  <div class="tile-body">
    <div class="tags"><span class="tag">${esc(p.kindLabel)}</span>${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}${teamTag(p)}</div>
    <h3>${esc(p.name)}</h3>
    <p>${esc(p.one)}</p>
    <span class="role"><span class="mono">Role</span>&nbsp; ${esc(p.role)}</span>
    <span class="go">Read the case study →</span>
  </div></a>`;
$("tiles").innerHTML = P.map(tileHtml).join("");
if (!DRAFT) document.querySelectorAll("[data-draft]").forEach(e => e.remove());

/* the opening-panels pattern (from the Hover Effect template), reused for SAVVY's diner types */
function panels(el){
  const ks = [...el.querySelectorAll(".pk")];
  const pick = k => ks.forEach((x,n) => { x.classList.toggle("on", n === k); x.querySelector(".pk-hit").setAttribute("aria-expanded", n === k); });
  ks.forEach((x,k) => {
    x.addEventListener("mouseenter", () => { if (matchMedia("(hover: hover)").matches) pick(k); });
    x.addEventListener("focusin", () => pick(k));
    x.querySelector(".pk-hit").addEventListener("click", () => pick(k));
  });
}

$("contact").innerHTML = contactHtml();

/* ----- island shrinks on scroll down, grows on scroll up ----- */
let lastY = scrollY;
addEventListener("scroll", () => {
  const y = scrollY;
  $("island").classList.toggle("compact", y > 160 && y > lastY);
  lastY = y;
  if (document.body.classList.contains("case")) progress();
}, {passive:true});

/* ----- lightbox ----- */
function openLb(src, cap){
  $("lbImg").src = "img/" + src + ".webp"; $("lbImg").alt = cap; $("lbCap").textContent = cap;
  const d = $("lb"); try { d.showModal(); } catch(e){ d.setAttribute("open",""); }
}
$("lbClose").onclick = () => { const d = $("lb"); try { d.close(); } catch(e){ d.removeAttribute("open"); } };
$("lb").addEventListener("click", e => { if (e.target === $("lb")) $("lbClose").click(); });
document.addEventListener("click", e => {
  const z = e.target.closest("[data-lb]");
  if (z) openLb(z.dataset.lb, z.dataset.cap);
});

/* ===== widgets ===== */
function protoWidget(el){
  const dur = s => Math.max(4500, Math.round(s.cap.split(/\s+/).length * 60000 / 238) + 1500);
  el.innerHTML = `<div class="proto">
    <div class="pt-top"><div class="seg" role="group" aria-label="Theme"><button type="button" data-set="night" aria-pressed="true">Night</button><button type="button" data-set="day" aria-pressed="false">Day</button></div>
      <button type="button" class="pt-btn" id="ptPlay"></button></div>
    <div class="pt-body">
      <div class="phone"><div class="bars"></div><div class="screens"></div><span class="tap"></span></div>
      <div class="pt-side"><ol class="pt-steps"></ol><p class="pt-cap" aria-live="polite"></p>
        <div class="pt-nav"><button type="button" class="pt-btn" data-d="-1">← Back</button><button type="button" class="pt-btn" data-d="1">Next →</button></div></div>
    </div></div>`;
  const box = el.querySelector(".proto"), bars = el.querySelector(".bars"), scr = el.querySelector(".screens"),
        steps = el.querySelector(".pt-steps"), cap = el.querySelector(".pt-cap"), tap = el.querySelector(".tap"), playBtn = el.querySelector("#ptPlay");
  let set = "night", i = 0, playing = !reduce, visible = false, timer = 0;
  function build(){
    const f = FLOWS[set];
    scr.innerHTML = f.map(s => `<img src="img/${s.img}.webp" alt="" width="332" height="720">`).join("");
    bars.innerHTML = f.map(() => "<i></i>").join("");
    steps.innerHTML = f.map((s,k) => `<li><button type="button" data-k="${k}"><span class="mono">${String(k+1).padStart(2,"0")}</span>${s.t}</button></li>`).join("");
    box.classList.toggle("day", set === "day");
    el.querySelectorAll(".seg button").forEach(b => b.setAttribute("aria-pressed", b.dataset.set === set));
  }
  function show(k){
    const f = FLOWS[set]; i = (k + f.length) % f.length;
    [...scr.children].forEach((im,n) => { im.classList.toggle("on", n === i); im.classList.toggle("out", n < i); });
    scr.children[i].alt = f[i].t + ": " + f[i].cap;
    [...bars.children].forEach((b,n) => { b.classList.remove("run"); b.style.setProperty("--f", n < i ? 1 : 0); });
    steps.querySelectorAll("button").forEach((b,n) => b.classList.toggle("on", n === i));
    cap.textContent = f[i].cap;
    schedule();
  }
  function schedule(){
    clearTimeout(timer);
    const bar = bars.children[i];
    if (playing && visible){
      const d = dur(FLOWS[set][i]);
      bar.style.setProperty("--dur", d + "ms"); void bar.offsetWidth; bar.classList.add("run");
      timer = setTimeout(advance, d);
    } else if (bar) bar.style.setProperty("--f", playing ? 0 : 1);
  }
  function advance(){
    const s = FLOWS[set][i];
    if (s.tap){
      tap.style.left = s.tap[0] + "%"; tap.style.top = s.tap[1] + "%";
      tap.classList.remove("go"); void tap.offsetWidth; tap.classList.add("go");
      timer = setTimeout(() => show(i + 1), 520);
    } else show(i + 1);
  }
  function setPlay(v){ playing = v; playBtn.textContent = v ? "Pause" : "Play"; playBtn.setAttribute("aria-label", v ? "Pause the prototype" : "Play the prototype"); schedule(); }
  playBtn.onclick = () => setPlay(!playing);
  el.querySelectorAll(".seg button").forEach(b => b.onclick = () => { set = b.dataset.set; build(); show(0); });
  steps.addEventListener("click", e => { const b = e.target.closest("button"); if (b){ setPlay(false); show(+b.dataset.k); } });
  el.querySelectorAll(".pt-nav button").forEach(b => b.onclick = () => { setPlay(false); show(i + +b.dataset.d); });
  new IntersectionObserver(es => { visible = es[0].isIntersecting; schedule(); }, {threshold:.35}).observe(box);
  build(); setPlay(playing); show(0);
}
function baWidget(el){
  el.innerHTML = `<div class="ba"><div class="ba-frame" style="--p:50%">
    <img class="a" src="img/savvy-compare.webp" alt="v4: a list of apps and prices to read through" loading="lazy">
    <img class="b" src="img/savvy-d-answer.webp" alt="Final: one answer first, ₹1,450 on EazyDiner, you keep ₹550" loading="lazy">
    <span class="ba-line" aria-hidden="true"></span><span class="ba-lab l">v4 · teal</span><span class="ba-lab r">Final · day</span>
    <label class="sr" for="baRange">Compare the v4 screen with the final screen</label>
    <input type="range" id="baRange" min="0" max="100" value="50"></div>
    <p class="sw-out">v4 asks you to read a list. The final screen leads with one price and what you keep.</p></div>`;
  const fr = el.querySelector(".ba-frame"), r = el.querySelector("input");
  r.addEventListener("input", () => fr.style.setProperty("--p", r.value + "%"));
}
/* ----- evidence charts ----- */
function statHtml(s){
  let viz = "";
  if (s.k === "donut"){
    const r = 34, c = 2 * Math.PI * r, f = Math.min(1, s.v / s.of);
    viz = `<svg viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="42" r="${r}" fill="none" stroke="var(--hair)" stroke-width="10"/><circle cx="42" cy="42" r="${r}" fill="none" stroke="var(--accent)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(c*f).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 42 42)"/></svg>`;
  } else if (s.k === "bar"){
    viz = `<div class="statbar" aria-hidden="true"><small>JUST PAYING · ₹${s.a.toLocaleString("en-IN")}</small><span><i style="width:100%;background:var(--muted)"></i></span><small>WITH SAVVY · ₹${s.b.toLocaleString("en-IN")}</small><span><i style="width:${(s.b/s.a*100).toFixed(1)}%"></i></span></div>`;
  }
  return `<div class="stat">${viz}<span class="n">${esc(s.n)}</span><p>${esc(s.label)}</p><span class="mono">${esc(s.src)}</span></div>`;
}

/* ===== v8: live research artefacts, panels, spotlight, swipe flow, context blocks ===== */

/* ----- SAVVY empathy maps (FigJam, from 13 interviews; R-codes only, no names) ----- */
/* ----- SAVVY site map, from the v5 iOS set (01 to 14 plus states). flag: 1 state, 2 SAVVY+, 3 menu link ----- */
/* ----- SAVVY access rules (RBAC table + ABAC rules) ----- */
/* ===== v9: static flow diagrams (Pencil & Paper conventions), visual artefacts, iteration journey ===== */

/* ----- flow diagrams: titled, start/end pills, yellow decisions, happy path left to right, branches drop below ----- */
function flowHtml(f){
  const node = (x, last) => `<li class="fn k-${x.k}${last ? " last" : ""}">
    <div class="fn-box">${x.k === "dec" ? `<i class="dia" aria-hidden="true"></i>` : x.i ? `<i aria-hidden="true">${x.i}</i>` : ""}<span>${esc(x.t)}</span>${!last && x.e ? `<em class="fn-e">${esc(x.e)}</em>` : ""}</div>
    ${x.br ? `<div class="fn-br b-${x.br.k}"><em>${esc(x.br.e)}</em>${x.br.k === "loop" ? "↺ " : ""}${esc(x.br.t)}</div>` : ""}</li>`;
  return `<figure class="fl" style="--cols:${f.cols}"><figcaption><b>${esc(f.title)}</b><span>${esc(f.sub)}</span></figcaption>
    ${f.rows.map((r,ri) => `<div class="fl-row">${r.lab ? `<span class="fl-lab">${esc(r.lab)}</span>` : ""}<ol class="fl-track">${r.n.map((x,k) => node(x, k === r.n.length - 1)).join("")}</ol>${ri < f.rows.length - 1 ? `<span class="fl-cont" aria-hidden="true">↓</span>` : ""}</div>`).join("")}
    ${f.nolg ? "" : `<div class="lgd"><span><i class="lg-term"></i>Start / end</span><span><i class="lg-step"></i>Screen or step</span><span><i class="lg-dec"></i>Decision</span>${f.ai ? `<span><i class="lg-ai"></i>Ankur's AI</span>` : `<span><i class="lg-plus"></i>SAVVY+</span>`}<span><i class="lg-out"></i>Outside the app</span><span><i class="lg-dead"></i>Dead end or downgrade</span><span><i class="lg-loop"></i>Loops back</span></div>`}</figure>`;
}
function flowWidget(el){ el.innerHTML = flowHtml(FL[el.dataset.f]); }

/* ----- empathy maps, made visual: where each type sits, then their strongest notes ----- */
function dinerMap(){
  return `<div class="dmap" role="img" aria-label="Diner types placed by credit card and effort. Reluctant Comparer: no card, high effort. Passive Card Holder: has cards, uses them late. Just-Pay Pragmatist: no card, low effort.">
    <span class="dm-y">Has a credit card ↑</span><span class="dm-x">Effort to find a deal →</span>
    <div class="dm-plot">
      <span class="dm-dot" style="--x:80%;--y:74%"><b>Reluctant Comparer</b><small>No card, puts in the effort</small></span>
      <span class="dm-dot" style="--x:38%;--y:24%"><b>Passive Card Holder</b><small>Has cards, uses them late</small></span>
      <span class="dm-dot" style="--x:16%;--y:74%"><b>Just-Pay Pragmatist</b><small>Low effort, someone else picks</small></span>
    </div></div>`;
}
function empHtml(k){
  const e = EMP[k], Q = {Says:"💬", Thinks:"💭", Does:"✋", Feels:"♥"};
  return `<div class="emp-head"><p><b>${esc(e.name)}</b> <span class="dim">· ${esc(e.who)}</span></p><span class="mono dim">From ${e.src}</span></div>
    <div class="emp">${Object.entries(e.q).map(([h,list]) => `<div><h4><span aria-hidden="true">${Q[h]}</span> ${h}</h4>
      <ul>${list.slice(0,2).map(([t,r]) => `<li>${esc(t)}<small>${r}</small></li>`).join("")}</ul>
      ${list.length > 2 ? `<details><summary>${list.length - 2} more</summary><ul>${list.slice(2).map(([t,r]) => `<li>${esc(t)}<small>${r}</small></li>`).join("")}</ul></details>` : ""}</div>`).join("")}</div>`;
}

/* ----- site map as a tree ----- */
const smapHtml = () => `<div class="tree"><span class="tree-root">SAVVY app</span><span class="tree-note mono dim">Bottom tabs: Home · Deals · Saving · Profile</span>
  <div class="smap">${SITEMAP.map(([t,sub,items]) => `<div><b>${esc(t)}</b>${sub ? `<span class="mono dim">${esc(sub)}</span>` : ""}
    <ul>${items.map(([c,l,f]) => `<li class="${["","st","plus","menu"][f||0]}">${c ? `<code>${c}</code>` : ""}<span>${esc(l)}</span></li>`).join("")}</ul></div>`).join("")}</div></div>
  <div class="lgd"><span><i class="lg-step"></i>Screen</span><span><i class="lg-dead"></i>State or edge case</span><span><i class="lg-plus"></i>SAVVY+ content</span></div>`;

/* ----- access rules, grouped instead of a 13-row table ----- */
const accessHtml = () => `<div class="acc">${ACCESS.map(g => `<div class="acc-g ${g.c}"><b>${g.t}</b><span class="mono dim">${g.sub}</span><ul>${g.items.map(([t,s]) => `<li>${esc(t)}<code>${s}</code></li>`).join("")}</ul></div>`).join("")}</div>
  <div class="acc-diff"><span class="mono dim">Same feature, different precision</span>
    <div><b>Card-by-card figures</b><span class="pill">Free: honest estimate (~)</span><span class="pill on">SAVVY+: exact ₹</span></div>
    <div><b>Free week of SAVVY+</b><span class="pill">Free: unlocked by the monthly saving goal</span><span class="pill on">SAVVY+: included</span></div></div>
  <div class="rules"><span class="mono dim">Attribute rules</span>${ABAC.map(a => `<p>${esc(a)}</p>`).join("")}</div>`;

/* ----- the research artefacts, as tabs (no images, no interactive charts) ----- */
function docsWidget(el){
  const tabs = ["Empathy maps","User flow","Task flows","Site map","Access rules"];
  el.innerHTML = `<div class="docs"><div class="seg tabs" role="tablist" aria-label="Research artefacts">${tabs.map((t,k) => `<button type="button" role="tab" data-k="${k}">${t}</button>`).join("")}</div><div class="doc-pane" role="tabpanel"></div></div>`;
  const pane = el.querySelector(".doc-pane"), bs = [...el.querySelectorAll('[role="tab"]')];
  const open = k => {
    bs.forEach((b,n) => { b.setAttribute("aria-selected", n === k); b.setAttribute("aria-pressed", n === k); });
    if (k === 0){
      pane.innerHTML = `${dinerMap()}<div class="emp-pick">${EMP.map((e,j) => `<button type="button" data-j="${j}">${esc(e.name)}</button>`).join("")}</div><div class="sub"></div>`;
      const bb = [...pane.querySelectorAll(".emp-pick button")], box = pane.querySelector(".sub");
      const go = j => { bb.forEach((b,n) => b.setAttribute("aria-pressed", n === j)); box.innerHTML = empHtml(j); };
      bb.forEach((b,j) => b.onclick = () => go(j)); go(0);
    }
    else if (k === 1) pane.innerHTML = flowHtml(FL.savvyUser);
    else if (k === 2) pane.innerHTML = ["task1","task2","task3"].map(t => flowHtml(FL[t])).join("");
    else if (k === 3) pane.innerHTML = smapHtml();
    else pane.innerHTML = accessHtml();
  };
  bs.forEach((b,k) => b.onclick = () => open(k)); open(0);
}

/* ----- iteration journey: one screen per version, what changed, and its colours and type ----- */
function journeyWidget(el){
  el.innerHTML = `<ol class="jny">${ITER.map((s,k) => `<li>
    <span class="jn-v">${s.v}</span>
    <figure><img src="img/${s.img}.webp" alt="SAVVY ${s.v}: ${esc(s.t)}" width="640" height="1385" loading="lazy"></figure>
    <b>${esc(s.t)}</b><p>${esc(s.d)}</p>
    ${s.sw ? `<div class="jn-sw" aria-label="Colours">${s.sw.map(c => `<i style="background:${c}" title="${c}"></i>`).join("")}</div><span class="mono dim">${esc(s.f)}</span>` : `<span class="mono dim jn-na">${esc(s.na || "")}</span>`}
  </li>`).join("")}</ol>`;
}

/* ----- the final design system, built in HTML ----- */
function systemWidget(el){
  const sw = (n, h, ink) => `<div class="ds-sw"><i style="background:${h}${ink ? ";box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)" : ""}"></i><b>${n}</b><code>${h}</code></div>`;
  el.innerHTML = `<div class="ds">
    <div class="ds-theme night">
      <span class="mono">Night</span>
      <div class="ds-row">${sw("Background","#0B0B0A")}${sw("Text","#F5F2EA")}${sw("Keep (cash saved)","#D4FF3F")}${sw("Coins (later)","#FFB547")}${sw("Text 2","#B3AEA2")}</div>
      <div class="ds-spec"><span class="ds-num">₹1,450</span><span class="ds-lab">YOUR BEST PRICE TONIGHT</span></div>
      <div class="ds-comp"><span class="ds-keep">✦ You keep ₹550</span><span class="ds-cta">Pay on EazyDiner <span aria-hidden="true">→</span></span>
        <div class="ds-bar"><span class="ds-cash" style="width:56%"></span><span class="ds-coin" style="width:18%"></span></div><small>Cash now, then coins later on their own dashed line</small></div>
    </div>
    <div class="ds-theme day">
      <span class="mono">Day</span>
      <div class="ds-row">${sw("Brand","#0B7A63")}${sw("Text","#16211E")}${sw("Coins","#9A5A00")}${sw("Surface","#FFFFFF", 1)}${sw("Muted","#56605C")}</div>
      <div class="ds-spec"><span class="ds-num">₹1,450</span><span class="ds-lab mono-plex">ALL CASH, TONIGHT</span></div>
      <div class="ds-comp"><span class="ds-keep">✦ You keep ₹550</span><span class="ds-cta">Pay on EazyDiner <span aria-hidden="true">→</span></span>
        <div class="ds-bar"><span class="ds-cash" style="width:56%"></span><span class="ds-coin" style="width:18%"></span></div><small>Same order, built for bright light</small></div>
    </div>
    <div class="ds-type"><span class="mono dim">Type</span>
      <p><span style="font:900 34px/1 'Inter',sans-serif">Inter Black</span><small>The price. One number, biggest on the screen.</small></p>
      <p><span style="font:600 18px/1.2 'Inter',sans-serif">Inter Semi Bold and Regular</span><small>Names, labels and body text.</small></p>
      <p><span style="font:600 16px/1.2 'IBM Plex Mono',monospace">IBM PLEX MONO · ₹120 LATER</span><small>Money details and small caps labels, in the day theme and v5.</small></p></div>
  </div>`;
}

/* ----- contact: a band with the three ways to reach AJ ----- */
function contactHtml(){
  const row = (label, val, href, ext) => `<a class="ct-row" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ""}><span class="mono">${label}</span><b>${esc(val)}</b><i aria-hidden="true">→</i></a>`;
  const rows = [
    ME.email ? row("Email", ME.email, "mailto:" + ME.email) : (DRAFT ? `<div class="ct-row todo-row"><span class="mono">Email</span><b class="todo">Add ME.email</b></div>` : ""),
    ME.linkedin ? row("LinkedIn", "Akshat Jerath", ME.linkedin, 1) : (DRAFT ? `<div class="ct-row todo-row"><span class="mono">LinkedIn</span><b class="todo">Add ME.linkedin</b></div>` : ""),
    ME.cv ? row("CV", "Download my CV", ME.cv, 1) : (DRAFT ? `<div class="ct-row todo-row"><span class="mono">CV</span><b class="todo">Add ME.cv</b></div>` : "")].join("");
  return `<div class="ct-band">
      <div class="ct-left"><p class="mono">(Contact)</p><h2>Let's talk.</h2><p class="ct-sub"><i class="dotlive"></i>${esc(ME.seeking || "Open to UX/UI roles")} · Based in Mumbai, India</p></div>
      <div class="ct-rows">${rows}</div>
    </div>
    <div class="ct-facts">
      <div><span class="mono dim">Live</span><b>Ankur runs at <a class="lnk" href="https://ankurs.online" target="_blank" rel="noopener">ankurs.online</a></b></div>
      <div><span class="mono dim">Next</span><b>Usability tests for SAVVY and a classroom pilot for Ankur</b></div>
      <div><span class="mono dim">Also</span><b>Faculty at École Intuit Lab</b></div>
    </div>`;
}
const cell = v => v === "Y" ? `<td class="c y" aria-label="Yes">✓</td>` : v === "N" ? `<td class="c n" aria-label="No">✕</td>` : v === "" ? `<td class="c n" aria-label="Not applicable">·</td>` : `<td>${esc(v)}</td>`;

/* ----- iteration rounds as opening panels ----- */
function phpWidget(el){
  const list = PH[el.dataset.set];
  el.innerHTML = `<div class="php">${list.map(([src,t,d,w,h],k) => `<article class="pk${k === 0 ? " on" : ""}">
    <img class="scr" src="img/${src}.webp" alt="${esc(t)}: ${esc(d)}" loading="lazy" width="${w}" height="${h}">
    <span class="v" aria-hidden="true">${esc(t)}</span>
    <button type="button" class="pk-hit" aria-expanded="${k === 0}" aria-label="Show ${esc(t)}"></button>
    <div class="info"><h3>${esc(t)}</h3><p>${esc(d)}</p></div></article>`).join("")}</div>`;
  panels(el.querySelector(".php"));
}

/* ----- final design: a spotlight that glides over the answer screen (no numbers) ----- */
function spotWidget(el){
  const it = SPOT.items, D = 3800;
  el.innerHTML = `<div class="spotw"><div class="an-phone"><img src="img/${SPOT.img}.webp" alt="${SPOT.alt}" width="402" height="874" loading="lazy"><span class="hl" aria-hidden="true"></span></div>
    <div class="sp-side"><p class="mono" style="opacity:.7">The answer screen</p><ul class="sp-list">${it.map((a,k) => `<li><button type="button" data-k="${k}">${esc(a.t)}</button></li>`).join("")}</ul></div></div>`;
  const hl = el.querySelector(".hl"), bs = [...el.querySelectorAll(".sp-list button")];
  let i = 0, t = 0, vis = false, hold = false;
  const loop = () => { clearTimeout(t); bs.forEach(b => b.classList.remove("run")); if (vis && !hold && !reduce){ void bs[i].offsetWidth; bs[i].classList.add("run"); t = setTimeout(() => show(i + 1), D); } };
  function show(k){
    i = (k + it.length) % it.length; const [x,y,w,h] = it[i].r;
    Object.assign(hl.style, {left:x + "%", top:y + "%", width:w + "%", height:h + "%"});
    bs.forEach((b,n) => { b.classList.toggle("on", n === i); b.setAttribute("aria-pressed", n === i); });
    loop();
  }
  bs.forEach((b,k) => { const pin = () => { hold = true; show(k); }; b.addEventListener("mouseenter", pin); b.addEventListener("focus", pin); b.addEventListener("click", pin); });
  el.querySelector(".sp-list").addEventListener("mouseleave", () => { hold = false; loop(); });
  new IntersectionObserver(es => { vis = es[0].isIntersecting; loop(); }, {threshold:.4}).observe(el);
  el.style.setProperty("--dur", D + "ms"); show(0);
}

/* ----- swipe experiment: a working mini flow with the real screens ----- */
function swipeWidget(el){
  el.innerHTML = `<div class="swipe"><div class="sw-phone" tabindex="0" role="img" aria-label="Swipe prototype. Use the arrow keys or the buttons below."><img class="cur" alt="" width="402" height="874"></div>
    <div class="sw-ctl"></div><p class="sw-out" aria-live="polite"></p>
    <ol class="sw-trail" aria-label="Screens visited">${Object.keys(SW).map(k => `<li data-s="${k}">${{discover:"Discover",book:"Book",skip:"Skip",end:"End of deck",detail:"Profile"}[k]}</li>`).join("")}</ol></div>`;
  const ph = el.querySelector(".sw-phone"), ctl = el.querySelector(".sw-ctl"), out = el.querySelector(".sw-out");
  let state = "discover", cur = ph.querySelector(".cur"), down = false, sx = 0, sy = 0, dx = 0, dy = 0, timer = 0;
  const btn = (label, fn) => { const b = document.createElement("button"); b.type = "button"; b.className = "btn ghost"; b.textContent = label; b.onclick = fn; return b; };
  function controls(){
    ctl.replaceChildren(...(state === "discover"
      ? [btn("← Skip", () => go("skip", -1)), btn("↑ Profile", () => go("detail", 0, -1)), btn("Book →", () => go("book", 1))]
      : state === "detail" ? [btn("← Back to the card", () => go("discover"))]
      : state === "skip" ? [] : [btn("Start again", () => go("discover"))]));
  }
  function go(next, fx = 0, fy = 0){
    clearTimeout(timer);
    const old = cur, im = document.createElement("img");
    im.className = "cur"; im.alt = ""; im.src = `img/${SW[next].img}.webp`; im.style.opacity = 0;
    ph.appendChild(im); cur = im;
    requestAnimationFrame(() => {
      old.style.transition = "transform .45s cubic-bezier(.22,1,.36,1), opacity .35s";
      if (fx || fy) old.style.transform = `translate(${fx * 70}%, ${fy * 40}%) rotate(${fx * 14}deg)`;
      old.style.opacity = 0; im.style.transition = "opacity .35s"; im.style.opacity = 1;
      setTimeout(() => old.remove(), 460);
    });
    state = next; out.textContent = SW[next].say; controls();
    el.querySelector(`[data-s="${next}"]`).classList.add("seen");
    el.querySelectorAll(".sw-trail li").forEach(li => li.classList.toggle("now", li.dataset.s === next));
    if (next === "skip") timer = setTimeout(() => go("end"), 1600);
  }
  ph.addEventListener("pointerdown", e => { if (state !== "discover") return; down = true; sx = e.clientX; sy = e.clientY; dx = dy = 0; ph.setPointerCapture(e.pointerId); cur.style.transition = "none"; ph.classList.add("drag"); });
  ph.addEventListener("pointermove", e => { if (!down) return; dx = e.clientX - sx; dy = Math.min(0, e.clientY - sy); cur.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx / 18}deg)`; });
  const up = () => {
    if (!down) return; down = false; ph.classList.remove("drag");
    if (dx > 70) go("book", 1); else if (dx < -70) go("skip", -1); else if (dy < -70) go("detail", 0, -1);
    else { cur.style.transition = "transform .35s cubic-bezier(.22,1,.36,1)"; cur.style.transform = ""; }
  };
  ph.addEventListener("pointerup", up); ph.addEventListener("pointercancel", up);
  ph.addEventListener("keydown", e => {
    if (state === "discover" && e.key === "ArrowRight") go("book", 1);
    else if (state === "discover" && e.key === "ArrowLeft") go("skip", -1);
    else if (state === "discover" && e.key === "ArrowUp"){ e.preventDefault(); go("detail", 0, -1); }
    else if (state !== "discover" && state !== "skip" && (e.key === "Enter" || e.key === "Backspace")) go("discover");
  });
  cur.src = `img/${SW.discover.img}.webp`; out.textContent = SW.discover.say; controls();
  el.querySelector('[data-s="discover"]').classList.add("seen", "now");
}

/* ----- stakeholders and market: one block per project, only from AJ's files ----- */
/* ----- Ankur's loop, cycling on its stage until the 10-second video is ready ----- */
function paintRings(){
  const s = P.find(p => p.id === "ankur").loop[ringK];
  document.querySelectorAll("[data-ring]").forEach(r => {
    r.querySelectorAll("li").forEach((li,n) => li.classList.toggle("on", n === ringK));
    r.querySelector(".ring-c b").textContent = s.t; r.querySelector(".ring-c i").textContent = s.who;
  });
}
if (!reduce) setInterval(() => { if (document.hidden) return; ringK = (ringK + 1) % 6; paintRings(); }, 1800);

/* ===== routing with view transitions: the panel's stage morphs into the case hero ===== */
let lastHomeY = 0, io = null;
function transition(update){
  if (!reduce && document.startViewTransition) return document.startViewTransition(update);
  update(); return null;
}
function renderCase(p, i){
  const next = P[(i + 1) % P.length];
  const secs = p.sections.filter(s => s.html.trim());
  const specDl = `<dl>${p.spec.filter(m => m[1] || DRAFT).map(([k,v,todo]) => `<div><dt>${k}</dt><dd>${v ? esc(v) : `<span class="todo">${esc(todo)}</span>`}</dd></div>`).join("")}</dl>`;
  const links = (p.links || []).map(([t,u]) => `<a class="lnk" href="${u}" target="_blank" rel="noopener">${esc(t)} ↗</a>`).join("");
  const tags = `<div class="tags"><span class="tag">${esc(p.kindLabel)}</span>${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}${teamTag(p)}</div>`;
  const blk = (id, title, sub, inner) => `<div class="panel" id="${id}" style="scroll-margin-top:96px"><div class="panel-head"><h2>${title}</h2>${sub ? `<span class="mono dim">${sub}</span>` : ""}</div>${inner}</div>`;
  const toc = [["Overview","cs0"]];
  const add = (label, id, html) => { toc.push([label, id]); return html; };

  /* hero differs by project type */
  let hero;
  if (p.kind === "app") hero = `<div class="cs-top">${stage(p)}<aside class="spec" aria-label="Project file"><p class="mono"><span>Project file</span><span>${esc(p.type)} · ${p.year}</span></p>${tags}${specDl}${links}</aside></div>`;
  else if (p.kind === "ongoing") hero = `<div class="text-hero"><span class="status-pill">In progress</span><span class="big">${esc(p.big)}</span></div>
      <div class="spec-row"><div class="top"><span class="mono dim">Project file · ${esc(p.type)} · ${p.year}</span>${tags}</div>${specDl}</div>`;
  else hero = `<div class="wide-stage">${stage(p)}</div>
      <div class="spec-row"><div class="top"><span class="mono dim">Project file · ${esc(p.type)} · ${p.year}</span>${tags}</div>${specDl}${links ? `<div>${links}</div>` : ""}</div>`;
  const pill = p.kind === "service" ? `<span class="status-pill live">Live web app</span>` : p.kind === "ongoing" ? `<span class="status-pill">Ongoing</span>` : p.kind === "brand" ? `<span class="status-pill">Screens in progress</span>` : "";

  /* shared blocks */
  const statement = () => add("Problem statement","csS",`<div class="band" id="csS" style="scroll-margin-top:96px"><span class="mono">Problem statement</span><p class="st">${esc(p.statement)}</p></div>`);
  const evidence = () => add("Evidence","csE",blk("csE","Evidence","From my research",`<div class="stats">${p.stats.map(statHtml).join("")}</div>`));
  const timeline = () => add("How the work ran","csT",blk("csT","How the work ran",`In order${DRAFT ? " · add durations" : ""}`,
    `<div class="tl" style="--n:${p.timeline.length}">${p.timeline.map(([a,b],k) => `<div class="tl-row" style="--i:${k}"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>`));
  const story = () => secs.map((s,k) => add(s.label, "cs" + (k+1), `<section id="cs${k+1}"><p class="mono">${s.label}</p><h2>${s.h}</h2>${s.html}${s.take ? `<p class="take">${s.take}</p>` : ""}</section>`)).join("");

  /* blocks only some project types have */
  const users = () => add("Who it's for","csU",blk("csU","Who it's for","Three diner types from 13 interviews",
    `<div class="users" id="usersDeck">${p.users.map((u,k) => `<article class="pk${k === 0 ? " on" : ""}"><span class="v" aria-hidden="true">${esc(u.name)}</span>
      <button type="button" class="pk-hit" aria-expanded="${k === 0}" aria-label="Show ${esc(u.name)}"></button>
      <div class="info"><span class="mono dim">Diner type ${k+1}</span><h3>${esc(u.name)}</h3><p>${esc(u.who)}</p><q>${esc(u.q)}</q></div></article>`).join("")}</div>`));
  const loop = () => add("How the service works","csL",blk("csL","How the service works","Six steps in the live app",
    `<ol class="loop">${p.loop.map(s => `<li class="${s.ai ? "ai" : ""}"><b>${esc(s.t)}</b><span>${esc(s.d)}</span><em>${esc(s.who)}</em></li>`).join("")}</ol>
     <p class="loop-back">↺ Then it starts again, child by child. The teacher always has the last word.</p>`));
  const screensWip = () => add("Screens in progress","csW",blk("csW","Brand world and app screens","What this case study will show",
    `<div class="screens-wip"><span class="status-pill">Designing in Figma</span><p>The Greggs+ membership app and the order flow are being designed now. They will sit here, beside the strategy that shaped them.</p>${slot("Greggs+ app screens from Figma","Your new Figma file")}</div>
     <div class="gal">${p.gallery.map(([t,src]) => `<div><b>${esc(t)}</b><span>${esc(src)}</span></div>`).join("")}</div>`));
  const status = () => add("Where it stands","csN",blk("csN","Where it stands","Updated as the project moves",
    `<ol class="status">${p.status.map(([t,done]) => done ? `<li><i>✓</i>${esc(t)}</li>` : `<li class="next"><i>→</i>${t ? esc(t) : `<span class="todo">Next step: what the team is doing now</span>`}</li>`).join("")}</ol>`));
  const eras = () => add("The futures timeline","csF",blk("csF","The futures timeline","Four eras we mapped",
    `<div class="eras">${p.eras.map(([a,b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>`));
  const context = () => add(p.ctxTitle, "csC", blk("csC", p.ctxTitle, p.ctxSub, CONTEXT[p.id]()));
  const report = () => add("The report", "csR", blk("csR", "The report", "Research and strategy document", `<div class="report">
    <a class="rep-cover" href="${REPORT_URL}" target="_blank" rel="noopener" aria-label="Open the full Greggs 2050 report in Canva"><img src="img/greggs-report-cover.webp" alt="Cover of the Greggs 2050 research and strategy document" width="783" height="1111" loading="lazy"></a>
    <div class="rep-side"><span class="mono dim">The Future of Brands · 17 pages</span><h3>Greggs 2050</h3>
      <p>A brand-futures study of Britain's largest bakery. Present-day claims are backed by evidence; every 2050 claim is marked as a projection.</p>
      <a class="btn" href="${REPORT_URL}" target="_blank" rel="noopener">Read the full report ↗</a>
      ${slot("The report pages as images, so visitors can flip through them here","Canva: Share, Download, PNG, all pages")}</div></div>`));
  const questions = () => add("Open questions","csQ",blk("csQ","Open questions","What we are still asking",`<div class="qs">${p.questions.map(q => `<p>${esc(q)}</p>`).join("")}</div>`));

  const order = {
    app:     [statement, users, context, evidence, timeline, story],
    service: [statement, loop, evidence, context, story, timeline],
    brand:   [statement, report, screensWip, evidence, context, story, timeline],
    ongoing: [status, statement, eras, evidence, story, questions]
  }[p.kind];
  const body = order.map(f => f()).join("");

  $("case").innerHTML = `<div class="cs-wrap">
    <aside class="route" aria-label="Case study navigation">
      <a class="back" href="#work">← All work</a>
      <p class="r-name">${esc(p.name)}</p>
      <ol class="r-toc">${toc.map(([l,id]) => `<li><button type="button" data-to="${id}">${l}</button></li>`).join("")}</ol>
      <a class="r-next" href="#${next.id}"><span class="mono dim">Next case study</span><b>${esc(next.name)} →</b></a>
    </aside>
    <article class="cs cs-${p.kind}">
      <header id="cs0" style="display:grid;gap:clamp(14px,2vw,20px);scroll-margin-top:96px">
        ${hero}
        <div class="cs-title">${pill ? `<div>${pill}</div>` : ""}<h1 tabindex="-1" id="csTitle">${esc(p.name)}</h1><p class="outcome">${esc(p.outcome)}</p></div>
        <div class="tldr">${p.tldr.map(([k,v]) => `<div><span class="mono">${k}</span><p>${esc(v)}</p></div>`).join("")}</div>
      </header>
      ${body}
      <div class="cs-end"><a class="btn" href="#${next.id}">Next: ${esc(next.name)} →</a>${ME.cv ? `<a class="btn ghost" href="${esc(ME.cv)}" target="_blank" rel="noopener">CV</a>` : ""}<a class="btn ghost" href="#contact">Contact</a></div>
    </article></div>`;
  const c = $("case");
  c.querySelectorAll("[data-widget]").forEach(w => ({proto:protoWidget, ba:baWidget, swipe:swipeWidget, spot:spotWidget, docs:docsWidget, php:phpWidget, flow:flowWidget, journey:journeyWidget, system:systemWidget})[w.dataset.widget](w));
  if ($("usersDeck")) panels($("usersDeck"));
  c.querySelectorAll(".r-toc button").forEach(b => b.onclick = () => $(b.dataset.to).scrollIntoView({behavior: reduce ? "auto" : "smooth"}));
  if (io) io.disconnect();
  io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) {
    c.querySelectorAll(".r-toc button").forEach(b => b.classList.toggle("on", b.dataset.to === e.target.id));
    const on = c.querySelector(".r-toc button.on"); if (on && innerWidth <= 980) on.scrollIntoView({block:"nearest", inline:"center"});
  }}), {rootMargin:"-35% 0px -60% 0px"});
  toc.forEach(([,id]) => { const el = $(id); if (el) io.observe(el); });
}

function progress(){
  const h = document.documentElement.scrollHeight - innerHeight;
  const t = document.querySelector(".r-toc"); if (t) t.style.setProperty("--prog", Math.min(100, scrollY / Math.max(1,h) * 100) + "%");
}
function route(){
  const i = P.findIndex(p => "#" + p.id === location.hash);
  const inCase = document.body.classList.contains("case");
  if (i < 0){
    if (!inCase) return;
    const back = document.querySelector("#case .stage"), id = document.querySelector("#case .r-name")?.textContent;
    const p = P.find(q => q.name === id), tile = p && document.querySelector(`.tile[data-id="${p.id}"] .stage`);
    if (back) back.style.viewTransitionName = "stage";
    const vt = transition(() => {
      if (back) back.style.viewTransitionName = "";
      document.body.classList.remove("case"); document.title = "Akshat Jerath Portfolio";
      if (["#work","#about","#contact","#top"].includes(location.hash)) $(location.hash.slice(1)).scrollIntoView({behavior:"instant"}); else scrollTo(0, lastHomeY);
      if (tile) tile.style.viewTransitionName = "stage";
    });
    const clear = () => { if (tile) tile.style.viewTransitionName = ""; };
    vt ? vt.finished.then(clear, clear) : clear();
    return;
  }
  if (!inCase) lastHomeY = scrollY;
  const p = P[i], tile = !inCase && document.querySelector(`.tile[data-id="${p.id}"] .stage`);
  if (tile) tile.style.viewTransitionName = "stage";
  transition(() => {
    if (tile) tile.style.viewTransitionName = "";
    renderCase(p, i);
    const cst = document.querySelector("#case .stage"); if (tile && cst) cst.style.viewTransitionName = "stage";
    document.body.classList.add("case"); document.title = p.name + " · Akshat Jerath";
    scrollTo({top:0, behavior:"instant"}); progress();
  })?.finished.then(() => { const s = document.querySelector("#case .stage"); if (s) s.style.viewTransitionName = ""; $("csTitle")?.focus({preventScroll:true}); });
  if (reduce || !document.startViewTransition) $("csTitle")?.focus({preventScroll:true});
}
addEventListener("hashchange", route); route();

/* keys 1-4 open projects, Esc goes back */
addEventListener("keydown", e => {
  if (e.metaKey || e.ctrlKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  if (!document.body.classList.contains("case") && /^[1-9]$/.test(e.key) && P[+e.key - 1]) location.hash = P[+e.key - 1].id;
  if (e.key === "Escape" && document.body.classList.contains("case") && !$("lb").open) location.hash = "work";
});
