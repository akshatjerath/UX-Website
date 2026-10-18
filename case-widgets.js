/* Case-study widgets, built from the data in content.js (FL, EMP, SITEMAP, ACCESS, ABAC, ITER, SPOT, ANKUR_CM; Ankur's stakeholders and SWOT live below).
   Load order on a case page: content.js, vendor/lenis.min.js, case-widgets.js, case.js.
   Every widget works with motion switched off; motion only adds the build-up. */
(() => {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const E = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  // Play a widget's build-up when it scrolls into view (and again each time a tab swaps its content).
  const whenSeen = (el, fn) => new IntersectionObserver((es, o) => { if (es[0].isIntersecting){ o.disconnect(); fn(); } }, {threshold: .25}).observe(el);
  const build = el => { el.classList.remove("built"); void el.offsetWidth; requestAnimationFrame(() => el.classList.add("built")); };

  /* ---------- system diagram: nodes pop in, connectors draw, a green pulse runs the happy path ---------- */
  const KIND = {start:"Start", end:"End", step:"Step", dec:"Decision", out:"Outside the app", plus:"SAVVY+", ai:"Ankur's AI"};
  function diagram(f){
    let i = 0;
    const node = (x, last) => {
      const n = i++;
      return `<li class="sd-n k-${x.k}" style="--i:${n}">
        <div class="sd-box"><small>${KIND[x.k] || ""}</small><span>${E(x.t)}</span></div>
        ${!last ? `<span class="sd-c" aria-hidden="true">${x.e ? `<em>${E(x.e)}</em>` : ""}</span>` : ""}
        ${x.br ? `<div class="sd-br b-${x.br.k}"><em>${E(x.br.e)}</em>${E(x.br.t)}</div>` : ""}</li>`;
    };
    return `<figure class="sd">
      <figcaption><b>${E(f.title)}</b><span>${E(f.sub)}</span></figcaption>
      ${f.rows.map((r, ri) => `<div class="sd-row">${r.lab ? `<span class="sd-lab">${E(r.lab)}</span>` : ""}
        <ol class="sd-track" style="--cols:${f.cols}">${r.n.map((x, k) => node(x, k === r.n.length - 1)).join("")}</ol>
        ${ri < f.rows.length - 1 ? `<span class="sd-down" aria-hidden="true" style="--i:${i}"></span>` : ""}</div>`).join("")}
      <div class="sd-key"><span><i class="kk-term"></i>Start / end</span><span><i class="kk-step"></i>Screen or step</span><span><i class="kk-dec"></i>Decision</span>${f.ai ? `<span><i class="kk-ai"></i>Ankur's AI</span>` : `<span><i class="kk-plus"></i>SAVVY+</span>`}<span><i class="kk-out"></i>Outside the app</span><span><i class="kk-dead"></i>Branch or dead end</span></div>
    </figure>`;
  }

  /* ---------- site map: each section opens into a trunk with a branch per screen ---------- */
  const sitemap = () => `<div class="smap2">${SITEMAP.map(([t, sub, items], g) => `<div class="sm-g" style="--i:${g}"><b>${E(t)}</b>${sub ? `<span>${E(sub)}</span>` : ""}
    <ul>${items.map(([c, l, f]) => `<li class="${["", "st", "plus", "menu"][f || 0]}">${c ? `<code>${c}</code>` : ""}${E(l)}</li>`).join("")}</ul></div>`).join("")}</div>
    <div class="sd-key"><span><i class="kk-step"></i>Screen</span><span><i class="kk-dead"></i>State or edge case</span><span><i class="kk-plus"></i>SAVVY+ content</span></div>`;

  /* ---------- empathy maps: pick a diner type, four quadrants of their notes ---------- */
  function empathy(pane){
    pane.innerHTML = `<div class="emp2-pick" role="group" aria-label="Diner type">${EMP.map((e, j) => `<button type="button" data-j="${j}">${E(e.name)}</button>`).join("")}</div><div class="emp2"></div>`;
    const bs = [...pane.querySelectorAll(".emp2-pick button")], box = pane.querySelector(".emp2");
    const go = j => {
      const e = EMP[j];
      bs.forEach((b, n) => b.setAttribute("aria-pressed", String(n === j)));
      box.innerHTML = `<p class="emp2-who"><b>${E(e.name)}</b> ${E(e.who)}. <span>From ${e.src}</span></p>
        <div class="emp2-q">${Object.entries(e.q).map(([h, list], q) => `<div style="--i:${q}"><h4>${h}</h4><ul>${list.map(([t, r]) => `<li>${E(t)} <small>${r}</small></li>`).join("")}</ul></div>`).join("")}</div>`;
      build(box);
    };
    bs.forEach((b, j) => b.onclick = () => go(j)); go(0);
  }

  const access = () => `<div class="acc2">${ACCESS.map((g, n) => `<div class="acc2-g ${g.c}" style="--i:${n}"><b>${E(g.t)}</b><span>${E(g.sub)}</span><ul>${g.items.map(([t, s]) => `<li>${E(t)}<code>${s}</code></li>`).join("")}</ul></div>`).join("")}</div>
    <ul class="acc2-rules">${ABAC.map(a => `<li>${E(a)}</li>`).join("")}</ul>`;

  /* ---------- Ankur: competitor table, stakeholder grid and SWOT (text from CONTEXT.ankur in content.js) ---------- */
  function mx(){
    const cellH = v => v === "Y" ? `<td><i class="y"></i><span class="sr">Yes</span></td>` : `<td><i></i><span class="sr">No</span></td>`;
    return `<table class="mx"><caption class="sr">Six tools and Ankur compared on five features</caption><thead><tr><th scope="col">Tool</th>${ANKUR_CM.cols.map(c => `<th scope="col">${E(c)}</th>`).join("")}<th scope="col">The gap</th></tr></thead>
      <tbody>${ANKUR_CM.rows.map(([n, v, g]) => `<tr${n === "Ankur" ? ' class="us"' : ""}><th scope="row">${E(n)}</th>${[...v].map(cellH).join("")}<td>${E(g)}</td></tr>`).join("")}</tbody></table>`;
  }
  const STAKE = [
    ["Keep satisfied", ["PARAKH / NCERT, who set the Holistic Progress Card standard", "DPDP Data Protection Board, the regulator"]],
    ["Manage closely", ["State Education Dept / SCERT, the mandating buyer", "Head teacher or coordinator, who reads the totals"]],
    ["Monitor", ["Device and connectivity providers", "The general public"]],
    ["Design for and engage", ["<b>Teachers, the users</b>", "Parents and guardians", "Mentors / CRC", "CSR and NGO funders"]]];
  const stake = () => `<p class="rs-note">Power against interest. The teacher is the main user and decides whether Ankur gets used. The child is who the data is about.</p>
    <div class="pig"><span class="ay">Power</span>${STAKE.map(([h, l], q) => `<div class="q" style="--i:${q}"><h3>${h}</h3><ul>${l.map(x => `<li>${x}</li>`).join("")}</ul></div>`).join("")}<span class="ax">Interest in Ankur</span></div>`;
  const SWOT = [
    ["S", "Strengths", ["The only tool combining observation, AI targets and a portfolio, all non-diagnostic", "Native to NEP, NCF-FS and NIPUN", "Covers the full 3 to 8 band", "Privacy first, in line with DPDP", "The teacher decides; the app scaffolds"]],
    ["W", "Weaknesses", ["Needs teachers who are ready for tech, and devices", "Single purpose", "No distribution yet", "Hard to charge for next to free government tools", "AI drafts need trust and quality checks"]],
    ["O", "Opportunities", ["NIPUN 2026-27 and the PARAKH progress-card mandate", "About 1.4 million Anganwadis", "Vernacular and offline first", "Government, CSR and school channels", "Be the software that runs PARAKH"]],
    ["T", "Threats", ["Free government platforms", "Infrastructure gaps: about 64% of schools online", "Incumbents like LEAD, BYJU'S and Ei", "Teacher change management and uncertain funding", "DPDP compliance from 2027"]]];
  const swot = () => `<div class="swot2">${SWOT.map(([l, h, items], q) => `<div class="sw-${l}" style="--i:${q}"><span class="sw-l" aria-hidden="true">${l}</span><h3>${h}</h3><ul>${items.map(x => `<li>${E(x)}</li>`).join("")}</ul></div>`).join("")}</div>`;

  /* ---------- the research switch: one filter bar, many artefacts ---------- */
  const VIEWS = {
    "savvy-user": ["User flow", p => p.innerHTML = diagram(FL.savvyUser)],
    "savvy-task1": ["Task: book ahead", p => p.innerHTML = diagram(FL.task1)],
    "savvy-task2": ["Task: pay at the table", p => p.innerHTML = diagram(FL.task2)],
    "savvy-task3": ["Task: pick the card", p => p.innerHTML = diagram(FL.task3)],
    "savvy-map": ["Site map", p => p.innerHTML = sitemap()],
    "savvy-emp": ["Empathy maps", empathy],
    "savvy-access": ["Access rules", p => p.innerHTML = access()],
    "ankur-task": ["Task flow", p => p.innerHTML = diagram(FL.ankur)],
    "ankur-comp": ["Competitors", p => p.innerHTML = `<div class="mx-wrap">${mx()}</div>`],
    "ankur-stake": ["Stakeholders", p => p.innerHTML = stake()],
    "ankur-swot": ["SWOT", p => p.innerHTML = swot()]
  };
  document.querySelectorAll("[data-research]").forEach(el => {
    const keys = el.dataset.research.split(" ");
    el.innerHTML = `<div class="rs-bar" role="tablist" aria-label="Research artefacts">${keys.map((k, n) => `<button type="button" role="tab" id="rs-${k}" aria-controls="rs-pane" aria-selected="${n === 0}">${VIEWS[k][0]}</button>`).join("")}<span class="rs-ink" aria-hidden="true"></span></div>
      <div class="rs-pane" id="rs-pane" role="tabpanel" tabindex="0"></div>`;
    const pane = el.querySelector(".rs-pane"), tabs = [...el.querySelectorAll('[role="tab"]')], ink = el.querySelector(".rs-ink");
    const open = n => {
      tabs.forEach((t, k) => { t.setAttribute("aria-selected", String(k === n)); t.tabIndex = k === n ? 0 : -1; });
      const tw = tabs[n].offsetWidth, tl = tabs[n].offsetLeft; // read first, then write
      ink.style.width = tw + "px"; ink.style.transform = `translateX(${tl}px)`;
      tabs[n].parentNode.scrollTo({left: tl - 24, behavior: RM ? "auto" : "smooth"}); // keep the open tab in view on phones
      pane.setAttribute("aria-labelledby", tabs[n].id);
      VIEWS[keys[n]][1](pane); build(pane);
    };
    tabs.forEach((t, n) => {
      t.onclick = () => open(n);
      t.onkeydown = e => { const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (d){ e.preventDefault(); const m = (n + d + tabs.length) % tabs.length; tabs[m].focus(); open(m); } };
    });
    open(0); pane.classList.remove("built"); whenSeen(pane, () => build(pane));
    addEventListener("resize", () => { const n = tabs.findIndex(t => t.getAttribute("aria-selected") === "true"); ink.style.width = tabs[n].offsetWidth + "px"; ink.style.transform = `translateX(${tabs[n].offsetLeft}px)`; });
  });

  /* ---------- iterations: a snake roadmap, left to right then back, drawn as you scroll ---------- */
  document.querySelectorAll("[data-snake]").forEach(el => {
    el.innerHTML = `<svg class="sn-path" aria-hidden="true"><path class="sn-base"/><path class="sn-draw"/></svg>
      <ol class="sn-list">${ITER.map((s, k) => `<li class="sn-i${s.imgs ? " wide" : ""}" style="--i:${k}">
        <span class="sn-dot" aria-hidden="true">${k + 1}</span>
        ${s.imgs ? `<div class="sn-multi">${s.imgs.map((n, j) => `<div class="sn-ph"><span class="phone"><img src="img/${n}.webp" alt="SAVVY ${E(s.v)}, screen ${j + 1} of ${s.imgs.length}: ${E(s.alts[j])}" width="402" height="874" loading="lazy"></span></div>`).join("")}</div>` :
        `<div class="sn-ph"><span class="phone"><img src="img/${s.img}.webp" alt="SAVVY ${E(s.v)}: ${E(s.t)}" width="640" height="1390" loading="lazy"></span></div>`}
        <div class="sn-cap"><span class="v">${E(s.v)}</span><b>${E(s.t)}</b><p>${E(s.d)}</p>
        ${s.sw ? `<div class="sw">${s.sw.map(c => `<i style="background:${c}" title="${c}"></i>`).join("")}</div><small>${E(s.f)}</small>` : `<small>${E(s.na || "")}</small>`}</div></li>`).join("")}</ol>`;
    const svg = el.querySelector("svg"), base = el.querySelector(".sn-base"), draw = el.querySelector(".sn-draw"), dots = [...el.querySelectorAll(".sn-dot")], items = [...el.querySelectorAll(".sn-i")];
    let len = 1;
    const layout = () => {
      const box = el.getBoundingClientRect();
      const pts = dots.map(d => { const r = d.getBoundingClientRect(); return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2]; });
      svg.setAttribute("width", box.width); svg.setAttribute("height", box.height); svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      let d = `M${pts[0][0]} ${pts[0][1]}`;
      for (let k = 1; k < pts.length; k++){
        const [x0, y0] = pts[k - 1], [x1, y1] = pts[k];
        if (Math.abs(y1 - y0) < 4) d += ` L${x1} ${y1}`;
        else { // turn outside the grid so the line never crosses a card
          const right = x0 > box.width / 2, gut = right ? innerWidth - box.right : box.left;
          const xr = right ? box.width + Math.max(6, Math.min(32, gut - 8)) : -Math.max(6, Math.min(32, gut - 8));
          const R = Math.min(40, Math.abs(y1 - y0) / 2), s = right ? 1 : -1;
          d += ` L${xr - s * R} ${y0} Q${xr} ${y0} ${xr} ${y0 + R} L${xr} ${y1 - R} Q${xr} ${y1} ${xr - s * R} ${y1} L${x1} ${y1}`; }
      }
      base.setAttribute("d", d); draw.setAttribute("d", d);
      len = draw.getTotalLength(); draw.style.strokeDasharray = len; progress();
    };
    const progress = () => {
      const r = el.getBoundingClientRect(), vh = innerHeight;
      const p = RM ? 1 : Math.min(1, Math.max(0, (vh * .75 - r.top) / (r.height * .9)));
      draw.style.strokeDashoffset = len * (1 - p);
      items.forEach((it, k) => it.classList.toggle("lit", p >= k / items.length - .02));
    };
    new ResizeObserver(layout).observe(el);
    addEventListener("scroll", progress, {passive: true});
  });

  /* ---------- the answer screen: a spotlight glides over each part, the list says why ---------- */
  document.querySelectorAll("[data-spot]").forEach(el => {
    const it = SPOT.items, D = 3800;
    el.innerHTML = `<div class="spot2"><div class="sp-ph"><div class="phone"><div class="scr"><img src="img/${SPOT.img}.webp" alt="${E(SPOT.alt)}" width="402" height="874" loading="lazy"><span class="hl" aria-hidden="true"></span></div></div></div>
      <div class="sp-side"><p class="eyebrow">The answer screen</p><ol class="sp-list">${it.map((a, k) => `<li><button type="button" data-k="${k}"><span>${E(a.t)}</span><i aria-hidden="true"></i></button></li>`).join("")}</ol></div></div>`;
    el.style.setProperty("--dur", D + "ms");
    const hl = el.querySelector(".hl"), bs = [...el.querySelectorAll(".sp-list button")];
    let i = 0, t = 0, vis = false, hold = false;
    const loop = () => { clearTimeout(t); bs.forEach(b => b.classList.remove("run")); if (vis && !hold && !RM){ void bs[i].offsetWidth; bs[i].classList.add("run"); t = setTimeout(() => show(i + 1), D); } };
    function show(k){
      i = (k + it.length) % it.length; const [x, y, w, h] = it[i].r;
      Object.assign(hl.style, {left: x + "%", top: y + "%", width: w + "%", height: h + "%"});
      bs.forEach((b, n) => { b.classList.toggle("on", n === i); b.setAttribute("aria-pressed", String(n === i)); });
      loop();
    }
    bs.forEach((b, k) => { const pin = () => { hold = true; show(k); }; b.addEventListener("mouseenter", pin); b.addEventListener("focus", pin); b.addEventListener("click", pin); });
    el.querySelector(".sp-list").addEventListener("mouseleave", () => { hold = false; loop(); });
    new IntersectionObserver(es => { vis = es[0].isIntersecting; loop(); }, {threshold: .4}).observe(el);
    show(0);
  });

  /* ---------- the final design system, side by side ---------- */
  document.querySelectorAll("[data-system]").forEach(el => {
    const sw = (n, h) => `<div class="ds2-sw"><i style="background:${h}"></i><b>${n}</b><code>${h}</code></div>`;
    el.innerHTML = `<div class="ds2">
      <div class="ds2-t night"><span class="ds2-lab">Night</span><div class="ds2-row">${sw("Background", "#0B0B0A")}${sw("Text", "#F5F2EA")}${sw("Keep", "#D4FF3F")}${sw("Coins", "#FFB547")}</div>
        <span class="ds2-num" data-count="1450" data-prefix="₹">₹1,450</span><span class="ds2-cap">Your best price tonight</span>
        <div class="ds2-cmp"><span class="ds2-keep">✦ You keep ₹550</span><span class="ds2-cta">Pay on EazyDiner →</span></div>
        <div class="ds2-bar"><i class="c"></i><i class="k"></i></div><small>Cash now, coins later on their own dashed line</small></div>
      <div class="ds2-t day"><span class="ds2-lab">Day</span><div class="ds2-row">${sw("Brand", "#0B7A63")}${sw("Text", "#16211E")}${sw("Coins", "#9A5A00")}${sw("Surface", "#F3EFE6")}</div>
        <span class="ds2-num serif" data-count="1450" data-prefix="₹">₹1,450</span><span class="ds2-cap">All cash, tonight</span>
        <div class="ds2-cmp"><span class="ds2-keep">✦ You keep ₹550</span><span class="ds2-cta">Pay on EazyDiner →</span></div>
        <div class="ds2-bar"><i class="c"></i><i class="k"></i></div><small>Same order, built for bright light</small></div>
      <div class="ds2-type"><p><b class="t1">Inter Black</b><span>The price. One number, biggest on the screen.</span></p><p><b class="t2">Inter Semi Bold and Regular</b><span>Names, labels and body text.</span></p><p><b class="t3">IBM PLEX MONO · ₹120 LATER</b><span>Money details and small labels in the day theme.</span></p></div>
    </div>`;
  });

  document.querySelectorAll("[data-ankur-mx]").forEach(el => el.innerHTML = mx());
})();
