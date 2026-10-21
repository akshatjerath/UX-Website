/* Home page code. Data (ME, P) comes from content.js; the phone menu from nav.js.
   The animated pieces are hand-written, vanilla versions of React Bits components (MIT + Commons Clause):
   the name (static), the hero background is my own Agent mesh (not a React Bits piece),
   Profile Card, Logo Loop, Folder Float and Star Border (CSS only, in home.css). */
(() => {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- role line: typed out letter by letter (React Bits "Text Type") ---------- */
  const roleEl = document.querySelector(".role");
  if (roleEl) {
    const full = roleEl.textContent.trim();
    const typed = document.createElement("span");
    const caret = document.createElement("span");
    caret.className = "caret"; caret.setAttribute("aria-hidden", "true");
    roleEl.textContent = "";
    roleEl.append(typed, caret);
    if (RM) typed.textContent = full;
    else {
      let i = 0;
      const step = () => {
        typed.textContent = full.slice(0, ++i);
        if (i < full.length) setTimeout(step, 70 + Math.random() * 60);
      };
      setTimeout(step, 600);
    }
  }

  /* ---------- your details: links and the CV buttons appear once they're filled in content.js ---------- */
  document.querySelectorAll("[data-me]").forEach(a => {
    const k = a.dataset.me, v = ME[k];
    if (!v) { a.hidden = true; return; }
    a.href = k === "email" ? "mailto:" + v : v; a.hidden = false;
  });
  if (!DRAFT) document.querySelectorAll("[data-draft]").forEach(e => e.remove());
  else document.documentElement.classList.add("draft");

  /* ---------- smooth scroll ---------- */
  if (!RM && window.Lenis) window.lenis = new Lenis({autoRaf: true, lerp: .085, anchors: {offset: -20}});

  /* ---------- Tech Text: one letter at a time turns into a dashed outline inside a selection box, in a loop.
     Point at the name to inspect a letter yourself; the loop picks up again when you leave. ---------- */
  document.querySelectorAll("[data-tech-text]").forEach(svg => {
    const NS = "http://www.w3.org/2000/svg", word = svg.dataset.techText, FS = 200;
    const t = document.createElementNS(NS, "text");
    t.setAttribute("font-size", FS); t.setAttribute("letter-spacing", -0.02 * FS); t.setAttribute("y", FS);
    const spans = [...word].map(ch => { const s = document.createElementNS(NS, "tspan"); s.textContent = ch; t.appendChild(s); return s; });
    const sel = document.createElementNS(NS, "g"); sel.setAttribute("class", "sel"); sel.style.opacity = 0;
    sel.innerHTML = `<rect class="box"/><rect class="h"/><rect class="h"/><rect class="h"/><rect class="h"/><text></text>`;
    svg.append(t, sel);
    const [box, ...rest] = sel.children, hs = rest.slice(0, 4), lab = rest[4];
    const role = svg.parentNode.querySelector(".role");
    let ext = [], cur = spans.map(() => 0), tgt = spans.map(() => 0), p = null, auto = -1, raf = 0, sb = {x: 0, y: 0, w: 0, h: 0}, first = true;

    const layout = () => {
      const b = t.getBBox();
      svg.setAttribute("viewBox", `${b.x - 6} ${b.y - 30} ${b.width + 12} ${b.height + 40}`);
      // the name is drawn at the same size as "UX/UI Designer" below it
      const k = parseFloat(getComputedStyle(role).fontSize) / FS;
      svg.style.width = Math.min((b.width + 12) * k, svg.parentNode.clientWidth) + "px";
      ext = spans.map((_, i) => { try { return t.getExtentOfChar(i); } catch (e) { return null; } });
    };
    const frame = () => {
      raf = 0; let best = -1, bv = 0;
      ext.forEach((e, i) => {
        if (!e || !e.width) { tgt[i] = 0; return; }
        if (p) { const dx = p.x - (e.x + e.width / 2), dy = (p.y - (e.y + e.height / 2)) * .6; tgt[i] = clamp(1 - Math.hypot(dx, dy) / 150, 0, 1); }
        else tgt[i] = i === auto ? 1 : 0;
        cur[i] += (tgt[i] - cur[i]) * .22;
        spans[i].style.fillOpacity = (1 - cur[i]).toFixed(3);
        spans[i].style.strokeOpacity = cur[i].toFixed(3);
        if (cur[i] > bv) { bv = cur[i]; best = i; }
      });
      if (best > -1 && bv > .45) {
        // the glyph's ink sits roughly between the cap height and the baseline (font-size FS, baseline at y = FS)
        const e = ext[best], to = {x: e.x - 6, y: FS * .2, w: e.width + 12, h: FS * .84};
        const f = first ? 1 : .3; first = false;
        for (const k in sb) sb[k] += (to[k] - sb[k]) * f;
        box.setAttribute("x", sb.x); box.setAttribute("y", sb.y); box.setAttribute("width", sb.w); box.setAttribute("height", sb.h);
        [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([a, c], k) => { const h = hs[k]; h.setAttribute("x", sb.x + a * sb.w - 5); h.setAttribute("y", sb.y + c * sb.h - 5); h.setAttribute("width", 10); h.setAttribute("height", 10); });
        lab.setAttribute("x", sb.x); lab.setAttribute("y", sb.y - 12);
        lab.textContent = `${spans[best].textContent.trim() || "space"}  ${Math.round(e.width)} × ${Math.round(FS * .84)}`;
        sel.style.opacity = 1;
      } else { sel.style.opacity = 0; first = true; }
      if (cur.some((c, i) => Math.abs(c - tgt[i]) > .005)) raf = requestAnimationFrame(frame);
    };
    const ready = () => layout(); // static name: no loop, no pointer effect
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(ready);
    new ResizeObserver(() => requestAnimationFrame(layout)).observe(svg.parentNode);
  });


  /* ---------- Agent mesh: the hero background. A wide network of neurons. A task is handed from stage to stage of how I work
     (interview, synthesis, flow, prototype, test), reaches DECIDE (me, the human in the loop), then is handed back the same way.
     Every hand-off fires the neuron it lands on, which fires its neighbours in a cascade that fades.
     The pointer stimulates the neurons it passes; a click sets off a burst. Reduced motion gets one still frame. ---------- */
  document.querySelectorAll("[data-agent-mesh]").forEach(cv => {
    const hero = cv.parentElement, ctx = cv.getContext("2d");
    const HUBS = { // positions as a share of the hero, kept clear of the name, the lede and the buttons
      wide: [["INTERVIEW", .61, .11], ["SYNTHESIS", .74, .31], ["FLOW", .9, .13], ["PROTOTYPE", .93, .56], ["TEST", .88, .87], ["DECIDE", .75, .84]],
      narrow: [["INTERVIEW", .08, .1], ["SYNTHESIS", .42, .16], ["FLOW", .84, .08], ["PROTOTYPE", .88, .22], ["TEST", .56, .27], ["DECIDE", .14, .25]]
    };
    const SEQ = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1]; // forward through the process, then handed back
    let W = 0, H = 0, dpr = 1, lay = "", nodes = [], edges = [], hubs = [], pulses = [], tok = null, seqI = 0, ambient = 0;
    let raf = 0, last = 0, vis = true, ptr = null, col = {}, font = "";
    const rng = s => () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296; // seeded, so a resize rebuilds the same network
    const rgba = a => `rgba(${col.rgb},${a})`;
    const ink = () => {
      const c = getComputedStyle(root), hex = c.getPropertyValue("--accent").trim().slice(1);
      col = {rgb: [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16)).join(","), a: c.getPropertyValue("--accent").trim(), m: c.getPropertyValue("--muted").trim()};
      font = `500 ${W < 700 ? 9 : 10}px ${c.getPropertyValue("--mono")}`;
    };
    const build = () => { // layout in shares of the hero (0..1), so a height-only resize just rescales it
      const nar = W < 700, r = rng(nar ? 7 : 11), N = nar ? 34 : 96, box = nar ? [.03, .05, .97, .29] : [.02, .06, .985, .96];
      const ar = W / H, minD = Math.sqrt((box[2] - box[0]) * (box[3] - box[1]) * ar / N) * .74;
      nodes = HUBS[nar ? "narrow" : "wide"].map(h => ({u: h[1], v: h[2], hub: h[0]}));
      for (let k = 0; k < 5000 && nodes.length < N + 6; k++) {
        const u = box[0] + r() * (box[2] - box[0]), v = box[1] + r() * (box[3] - box[1]);
        if (nodes.every(o => Math.hypot((o.u - u) * ar, o.v - v) > minD)) nodes.push({u, v, hub: null});
      }
      nodes.forEach(o => Object.assign(o, {adj: [], fire: 0, ref: 0, ring: 0}));
      edges = []; const seen = new Set(), d = (a, b) => Math.hypot((a.u - b.u) * ar, a.v - b.v);
      const link = (i, j) => { const k = i < j ? i + "-" + j : j + "-" + i; if (i === j || seen.has(k)) return; seen.add(k); const e = {a: i, b: j, glow: 0}; edges.push(e); nodes[i].adj.push({n: j, e}); nodes[j].adj.push({n: i, e}); };
      nodes.forEach((o, i) => nodes.map((p, j) => [d(o, p), j]).sort((x, y) => x[0] - y[0]).slice(1, 4).forEach(v => link(i, v[1])));
      for (;;) { // join any island to its nearest reached neuron, so every hand-off has a path
        const got = new Set([0]), q = [0]; while (q.length) nodes[q.pop()].adj.forEach(o => { if (!got.has(o.n)) { got.add(o.n); q.push(o.n); } });
        if (got.size === nodes.length) break;
        const out = nodes.findIndex((_, i) => !got.has(i)); let b = 0, bd = 1e9; got.forEach(i => { const v = d(nodes[i], nodes[out]); if (v < bd) { bd = v; b = i; } }); link(out, b);
      }
      hubs = [0, 1, 2, 3, 4, 5]; pulses = []; seqI = 0; next();
    };
    const place = () => nodes.forEach(o => { o.x = o.u * W; o.y = o.v * H; });
    const path = (a, b) => { const prev = new Map([[a, -1]]), q = [a]; while (q.length) { const u = q.shift(); if (u === b) break; for (const o of nodes[u].adj) if (!prev.has(o.n)) { prev.set(o.n, u); q.push(o.n); } } const p = []; for (let u = b; u !== -1; u = prev.get(u)) p.unshift(u); return p; };
    const next = () => { tok = {path: path(hubs[SEQ[seqI % SEQ.length]], hubs[SEQ[(seqI + 1) % SEQ.length]]), pi: 0, t: 0, dwell: 0}; };
    const fire = (n, en, from) => {
      const o = nodes[n]; if (o.ref > 0) return; o.fire = 1; o.ref = .38;
      if (en > .14) for (const nb of o.adj) if (nb.n !== from && pulses.length < 220 && Math.random() < Math.min(.9, .4 + en * .35)) pulses.push({a: n, b: nb.n, e: nb.e, t: 0, sp: 170 + Math.random() * 80, en: en * .62});
    };
    const len = e => Math.hypot(nodes[e.a].x - nodes[e.b].x, nodes[e.a].y - nodes[e.b].y) || 1;
    const step = dt => {
      ambient -= dt; if (ambient <= 0) { ambient = .3 + Math.random() * .5; fire(Math.floor(Math.random() * nodes.length), .75); }
      if (tok.dwell > 0) { if ((tok.dwell -= dt) <= 0) { seqI++; next(); } }
      else {
        const a = tok.path[tok.pi], b = tok.path[tok.pi + 1], e = nodes[a].adj.find(o => o.n === b).e;
        tok.t += dt * 300 / len(e); e.glow = 1;
        if (tok.t >= 1) { tok.pi++; tok.t = 0; fire(b, 1.3, a); if (tok.pi >= tok.path.length - 1) { nodes[b].ring = 1; tok.dwell = .55; } }
      }
      for (const p of pulses) { p.t += dt * p.sp / len(p.e); if (p.en > p.e.glow) p.e.glow = p.en; if (p.t >= 1) { p.done = 1; fire(p.b, p.en, p.a); } }
      pulses = pulses.filter(p => !p.done);
      if (ptr) nodes.forEach((o, i) => { if (Math.abs(o.x - ptr.x) < 60 && Math.hypot(o.x - ptr.x, o.y - ptr.y) < 60) fire(i, .95); });
      for (const o of nodes) { o.fire = Math.max(0, o.fire - dt * 1.7); o.ref -= dt; o.ring = Math.max(0, o.ring - dt * .8); }
      for (const e of edges) e.glow = Math.max(0, e.glow - dt * 1.4);
    };
    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 1; ctx.strokeStyle = rgba(.14); ctx.beginPath(); // every resting synapse in one stroke
      for (const e of edges) { const A = nodes[e.a], B = nodes[e.b]; ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); }
      ctx.stroke();
      for (const e of edges) if (e.glow > .03) { const A = nodes[e.a], B = nodes[e.b]; ctx.strokeStyle = rgba(e.glow * .7); ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke(); }
      ctx.lineWidth = 2; ctx.lineCap = "round";
      for (const p of pulses) { const A = nodes[p.a], B = nodes[p.b], t0 = Math.max(0, p.t - .14); ctx.strokeStyle = rgba(Math.min(1, .35 + p.en)); ctx.beginPath(); ctx.moveTo(A.x + (B.x - A.x) * t0, A.y + (B.y - A.y) * t0); ctx.lineTo(A.x + (B.x - A.x) * p.t, A.y + (B.y - A.y) * p.t); ctx.stroke(); }
      ctx.fillStyle = rgba(.42); ctx.beginPath(); // every resting neuron in one fill
      for (const o of nodes) if (!o.hub && o.fire < .04) { ctx.moveTo(o.x + 2.2, o.y); ctx.arc(o.x, o.y, 2.2, 0, 7); }
      ctx.fill();
      ctx.font = font; ctx.textBaseline = "middle"; if ("letterSpacing" in ctx) ctx.letterSpacing = ".06em";
      for (const o of nodes) {
        if (o.fire >= .04) { ctx.fillStyle = rgba(o.fire * .2); ctx.beginPath(); ctx.arc(o.x, o.y, 8 + o.fire * 16, 0, 7); ctx.fill(); ctx.fillStyle = rgba(.4 + o.fire * .6); ctx.beginPath(); ctx.arc(o.x, o.y, (o.hub ? 5.5 : 2.2) + o.fire * 3, 0, 7); ctx.fill(); }
        if (!o.hub) continue;
        if (o.fire < .04) { ctx.fillStyle = rgba(.55); ctx.beginPath(); ctx.arc(o.x, o.y, 5.5, 0, 7); ctx.fill(); }
        ctx.strokeStyle = rgba(.5 + o.fire * .5); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(o.x, o.y, 11 + o.ring * 16, 0, 7); ctx.stroke();
        ctx.fillStyle = o.fire > .25 || o.hub === "DECIDE" ? col.a : col.m; const lw = ctx.measureText(o.hub).width; ctx.fillText(o.hub, o.x + 18 + lw > W - 8 ? o.x - 18 - lw : o.x + 18, o.y); // flip the label left at the right edge
      }
      if (tok.dwell <= 0) { const A = nodes[tok.path[tok.pi]], B = nodes[tok.path[tok.pi + 1]], x = A.x + (B.x - A.x) * tok.t, y = A.y + (B.y - A.y) * tok.t; ctx.fillStyle = rgba(.25); ctx.beginPath(); ctx.arc(x, y, 12, 0, 7); ctx.fill(); ctx.fillStyle = col.a; ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill(); }
    };
    const size = () => {
      const w = cv.clientWidth, h = cv.clientHeight; if (!w || !h || (w === W && h === H)) return;
      const nl = w < 700 ? "narrow" : "wide"; W = w; H = h; dpr = Math.min(2, devicePixelRatio || 1); cv.width = W * dpr; cv.height = H * dpr;
      ink(); if (nl !== lay) { lay = nl; build(); } place(); draw();
    };
    const loop = now => { raf = 0; if (tok) { step(Math.min(.05, (now - last) / 1000 || 0)); draw(); } last = now; if (vis) raf = requestAnimationFrame(loop); };
    const go = () => { if (vis && !raf && !RM) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    const at = e => { const r = cv.getBoundingClientRect(); return {x: e.clientX - r.left, y: e.clientY - r.top}; };
    hero.addEventListener("pointermove", e => { if (vis && !RM) ptr = at(e); }, {passive: true});
    hero.addEventListener("pointerleave", () => ptr = null);
    hero.addEventListener("pointerdown", e => {
      if (RM || e.target.closest("a,button")) return;
      const p = at(e); let b = 0, bd = 1e9; nodes.forEach((o, i) => { const v = Math.hypot(o.x - p.x, o.y - p.y); if (v < bd) { bd = v; b = i; } });
      nodes[b].ref = 0; fire(b, 2);
    });
    new IntersectionObserver(es => { vis = es[0].isIntersecting && !document.hidden; go(); }).observe(cv);
    document.addEventListener("visibilitychange", () => { vis = !document.hidden; go(); });
    const re = () => { ink(); draw(); };
    new MutationObserver(re).observe(root, {attributes: true, attributeFilter: ["data-theme"]}); // only the theme toggle, not scroll classes
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", re);
    let rt; new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(size, 120); }).observe(cv);
    size(); go();
  });

  /* ---------- project panels stack as you scroll: the one being covered shrinks back and dims ---------- */
  const pjs = [...document.querySelectorAll(".pj")];
  // Scroll work is split in two: stackRead/tlRead only measure, stackWrite/tlWrite only change styles,
  // and onScroll runs every read before any write, so the browser lays the page out once per frame.
  const stackRead = () => RM ? [] : pjs.map((p, i) => {
    const next = pjs[i + 1]; if (!next) return null;
    const a = p.getBoundingClientRect(), b = next.getBoundingClientRect();
    return clamp(1 - (b.top - a.top) / a.height, 0, 1); // 0 = next panel still below, 1 = fully on top
  });
  const stackWrite = ks => ks.forEach((k, i) => {
    if (k === null) return;
    const inner = pjs[i].firstElementChild;
    inner.style.setProperty("--s", (1 - k * .06).toFixed(4));
    inner.style.setProperty("--b", (1 - k * .35).toFixed(3));
  });

  /* ---------- timeline: a snake road, oldest first. Left to right, then back, two stops a row (after SAVVY's iteration road).
     The line draws as you scroll and each stop lights up when the line reaches it. Narrow screens keep a straight line down. ---------- */
  const tl = document.querySelector("[data-timeline]"), tli = tl ? [...tl.children] : [];
  let snake = false, tlLen = 1, tlDraw = null;
  const tlLayout = () => {
    if (!tl) return;
    snake = tl.clientWidth >= 520;
    tl.classList.toggle("snake", snake);
    tl.querySelector(".tl-svg")?.remove();
    if (!snake) return;
    tl.insertAdjacentHTML("afterbegin", '<svg class="tl-svg" aria-hidden="true"><path class="tl-base"/><path class="tl-draw"/></svg>');
    const svg = tl.firstChild, box = tl.getBoundingClientRect();
    const pts = tli.map(li => { const r = li.querySelector(".tl-dot").getBoundingClientRect(); return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2]; });
    svg.setAttribute("width", box.width); svg.setAttribute("height", box.height); // measured first, written after
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let k = 1; k < pts.length; k++){
      const [x0, y0] = pts[k - 1], [x1, y1] = pts[k];
      if (Math.abs(y1 - y0) < 4){ d += ` L${x1} ${y1}`; continue; }
      const right = x0 > box.width / 2, xr = right ? box.width + 14 : -14, R = Math.min(36, (y1 - y0) / 2), sg = right ? 1 : -1; // U-turn just outside the grid
      d += ` L${xr - sg * R} ${y0} Q${xr} ${y0} ${xr} ${y0 + R} L${xr} ${y1 - R} Q${xr} ${y1} ${xr - sg * R} ${y1} L${x1} ${y1}`;
    }
    svg.querySelector(".tl-base").setAttribute("d", d);
    tlDraw = svg.querySelector(".tl-draw"); tlDraw.setAttribute("d", d);
    tlLen = tlDraw.getTotalLength(); tlDraw.style.strokeDasharray = tlLen;
    tlFx();
  };
  const tlRead = () => {
    if (!tl) return null;
    const r = tl.getBoundingClientRect(), mark = innerHeight * .7;
    const k = RM ? 1 : clamp((mark - r.top) / r.height, 0, 1);
    const on = snake && tlDraw ? tli.map((_, i) => RM || k >= i / tli.length) : tli.map(li => RM || li.getBoundingClientRect().top + 10 < mark);
    return {k, on};
  };
  const tlWrite = st => {
    if (!st) return;
    if (snake && tlDraw) tlDraw.style.strokeDashoffset = tlLen * (1 - st.k);
    else tl.style.setProperty("--tp", st.k.toFixed(4));
    tli.forEach((li, i) => li.classList.toggle("on", st.on[i]));
  };
  const tlFx = () => tlWrite(tlRead());
  if (tl){ tli.forEach(li => li.insertAdjacentHTML("afterbegin", '<span class="tl-dot" aria-hidden="true"></span>')); new ResizeObserver(() => requestAnimationFrame(tlLayout)).observe(tl); }
  let sq = 0; const onScroll = () => { if (!sq) sq = requestAnimationFrame(() => { sq = 0; const sr = stackRead(), tr = tlRead(); stackWrite(sr); tlWrite(tr); }); };
  addEventListener("scroll", onScroll, {passive: true}); addEventListener("resize", onScroll); onScroll();


  /* ---------- Profile Card: tilts toward the pointer ---------- */
  document.querySelectorAll("[data-profile-card]").forEach(c => {
    if (RM) return;
    c.addEventListener("pointermove", e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.classList.add("live");
      c.style.cssText = `--rx:${((.5 - y) * 14).toFixed(2)}deg;--ry:${((x - .5) * 16).toFixed(2)}deg;--mx:${(x * 100).toFixed(1)}%;--my:${(y * 100).toFixed(1)}%;--on:1`;
    });
    c.addEventListener("pointerleave", () => { c.classList.remove("live"); c.style.cssText = ""; });
  });

  /* ---------- Logo Loop: a second copy of the list makes the scroll seamless ---------- */
  document.querySelectorAll("[data-logo-loop] .loop-track").forEach(ul => {
    if (RM) return;
    [...ul.children].forEach(li => { const c = li.cloneNode(true); c.setAttribute("aria-hidden", "true"); ul.appendChild(c); });
  });

  /* ---------- Folder Float: notes fan out above each folder; tap to open on touch ---------- */
  document.querySelectorAll(".fold").forEach(f => {
    const notes = [...f.querySelectorAll(".f-notes li")], b = f.querySelector(".f-btn");
    notes.forEach((li, i) => {
      const side = i % 2 ? 1 : -1; // one note per row, nudged left and right like loose paper
      li.style.setProperty("--x", side * (10 + (i % 3) * 6) + "px");
      li.style.setProperty("--y", -(notes.length - 1 - i) * 44 + "px");
      li.style.setProperty("--r", side * (1.5 + (i % 3)) + "deg");
    });
    if (RM) { f.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
    b.onclick = () => { const o = !f.classList.contains("open"); f.classList.toggle("open", o); b.setAttribute("aria-expanded", String(o)); };
  });
  // the folders open one after another the first time they come into view, so the skills are readable without hovering
  const fo = new IntersectionObserver(es => { if (!es[0].isIntersecting) return; fo.disconnect();
    document.querySelectorAll(".fold").forEach((f, k) => setTimeout(() => { f.classList.add("open"); f.querySelector(".f-btn").setAttribute("aria-expanded", "true"); }, k * 220)); }, {threshold: .5});
  const fs = document.querySelector(".folders"); if (fs) fo.observe(fs);
})();
