/* Home page code. Data (ME, P) comes from content.js; the phone menu from nav.js.
   The animated pieces are hand-written, vanilla versions of React Bits components (MIT + Commons Clause):
   the name (static), Grid Motion (hero background),
   Profile Card, Logo Loop, Folder Float and Star Border (CSS only, in home.css). */
(() => {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

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
    t.setAttribute("font-size", FS); t.setAttribute("letter-spacing", -0.045 * FS); t.setAttribute("y", FS);
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


  /* ---------- Grid Motion: tilted rows of project screens drift sideways; a soft spotlight follows the pointer ---------- */
  document.querySelectorAll("[data-grid-motion]").forEach(el => {
    const W = (c, t) => ({w: t, c});
    const ITEMS = ["savvy-n-answer", "g50-sausage-roll-720", "savvy-n-tonight", "ankur-live-observe", W("sv", "SAVVY"), "g50-flagship-720", "savvy-n-kept", W("cd", "Who holds the clock?"),
      "greggs-merch-real", "savvy-n-checking", "ankur-live-target", W("cd", "Grow below, keep above."), "g50-packaging-720", "savvy-and-n-answer", "ankur-live-class", "savvy-d-answer",
      "g50-drone-720", "savvy-n-bill", W("ank", "Ankur"), "greggs-report-cover", "savvy-n-lock", "ankur-live-aid", W("sv", "You keep ₹550"), "g50-store-shrunk-720"];
    const tile = (x, k) => typeof x === "string" ? `<div class="gm-t"><img src="img/${x}.webp" alt="" width="402" height="560" loading="lazy" decoding="async"></div>` : `<div class="gm-t w ${x.c}">${x.w}</div>`;
    const ROWS = 4, ANG = -12, GAP = 16, SPEED = 22;
    let rows = [], off = [], period = 0, raf = 0, last = 0, vis = true, ptr = {x: 0, y: 0}, par = {x: 0, y: 0};
    const build = () => {
      const w = el.clientWidth, h = el.clientHeight, a = Math.abs(ANG * Math.PI / 180);
      const ph = (w * Math.sin(a) + h * Math.cos(a)) * 1.15, pw = (w * Math.cos(a) + h * Math.sin(a)) * 1.15;
      const th = (ph - GAP * (ROWS - 1)) / ROWS, tw = th * .72, per = Math.ceil(pw / (tw + GAP)) + 1;
      period = per * (tw + GAP);
      el.innerHTML = `<div class="gm-plane" style="width:${pw}px;height:${ph}px;margin:${-ph / 2}px 0 0 ${-pw / 2}px;transform:rotate(${ANG}deg);--gap:${GAP}px;--tw:${tw}px;--th:${th}px">${
        Array.from({length: ROWS}, (_, r) => { const row = Array.from({length: per}, (_, k) => ITEMS[(r * 5 + k) % ITEMS.length]); return `<div class="gm-row" style="top:${r * (th + GAP)}px">${row.concat(row, row).map(tile).join("")}</div>`; }).join("")}</div>`;
      rows = [...el.querySelectorAll(".gm-row")]; off = rows.map((_, r) => -period * (.3 + r * .17));
      paint(); requestAnimationFrame(() => el.classList.add("on"));
    };
    const paint = () => rows.forEach((row, r) => { const x = ((off[r] % period) - period) % period + par.x * (1 + r * .3); row.style.transform = `translate3d(${x}px,${par.y}px,0)`; });
    const loop = now => {
      raf = 0; const dt = Math.min(.05, (now - last) / 1000 || 0); last = now;
      rows.forEach((_, r) => off[r] += SPEED * (r % 2 ? -1 : 1) * (1 + r * .12) * dt);
      par.x += (ptr.x * -30 - par.x) * .06; par.y += (ptr.y * -14 - par.y) * .06;
      paint(); if (vis && !RM) raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect(); ptr.x = (e.clientX - r.left) / r.width - .5; ptr.y = (e.clientY - r.top) / r.height - .5;
      el.style.setProperty("--px", e.clientX - r.left + "px"); el.style.setProperty("--py", e.clientY - r.top + "px");
    }, {passive: true});
    new IntersectionObserver(es => { vis = es[0].isIntersecting && !document.hidden; if (vis && !raf && !RM) { last = performance.now(); raf = requestAnimationFrame(loop); } }).observe(el);
    document.addEventListener("visibilitychange", () => { vis = !document.hidden; if (vis && !raf && !RM) { last = performance.now(); raf = requestAnimationFrame(loop); } });
    let rt; new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(build, 120); }).observe(el);
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
