/* Case-study pages: reveal on scroll, people-icon charts, hero tilt, play/pause clips, image viewer.
   Motion timings live in case.css (--t1 150ms, --t2 250ms, --t3 400ms). Everything still works with motion off. */
(() => {
  const root = document.documentElement;
  root.classList.remove("no-js");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Draft notes show only off the live site, or with ?draft in the URL (same rule as content.js).
  const draft = !/github\.io$|akshatjerath\.com$/.test(location.hostname) || /[?&]draft\b/.test(location.search);
  if (!draft) document.querySelectorAll("[data-draft]").forEach(e => e.remove());

  // People-icon charts: <div class="dots" data-on="8"> draws 13 people, 8 lit.
  document.querySelectorAll(".dots").forEach(el => {
    const on = +el.dataset.on, total = +(el.dataset.of || 13);
    el.innerHTML = Array.from({length: total}, (_, i) =>
      `<svg viewBox="0 0 24 24" class="${i < on ? "on" : ""}" style="transition-delay:${i * 40}ms"><use href="#i-person"/></svg>`).join("");
  });

  // Staggered blocks: tag the children that rise in order (rules in MOTION.md).
  document.querySelectorAll("[data-stagger]").forEach(el =>
    el.querySelectorAll(el.dataset.stagger || ":scope > *").forEach((c, i) => { c.classList.add("s"); c.style.setProperty("--i", i); }));

  // Reveal once, as each block enters the screen.
  const items = document.querySelectorAll(".rv");
  if (reduce || !("IntersectionObserver" in window)) items.forEach(e => e.classList.add("in"));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }),
      {rootMargin: "0px 0px -10% 0px"});
    items.forEach(e => io.observe(e));
  }

  // Ankur loop: the ring draws itself once (CSS); visitors pick any step to read it.
  document.querySelectorAll("[data-lp]").forEach(lp => {
    const ring = lp.querySelector(".lp-ring"), arcs = lp.querySelectorAll(".arc"), btns = [...lp.querySelectorAll("[data-step]")];
    const n = lp.querySelector(".lp-c .n"), who = lp.querySelector(".lp-c .who"), title = lp.querySelector(".lp-side h3"), desc = lp.querySelector(".lp-side .desc");
    const pick = i => {
      const b = btns[i];
      ring.classList.add("focus");
      arcs.forEach((a, k) => a.classList.toggle("on", k === i));
      btns.forEach((x, k) => x.setAttribute("aria-pressed", String(k === i)));
      n.textContent = i + 1; title.textContent = b.dataset.t; desc.textContent = b.dataset.d;
      who.textContent = b.dataset.who; who.classList.toggle("a", b.dataset.who.startsWith("Ankur"));
    };
    btns.forEach((b, i) => b.addEventListener("click", () => pick(i)));
    // No auto-tour (it would run past 5 s): the ring draws once in CSS, then step 1 is selected and the visitor explores.
    pick(0); ring.classList.remove("focus");
  });


  // Critical Design · expiry clock (rules in MOTION.md). The clock sticks beside the timeline: its ring fills through each era,
  // the year flips like a split-flap board and the line under it names who holds the timer. Scroll back and it runs backwards.
  const flap = (el, text) => {
    const old = el.textContent; if (old === text) return;
    if (el.children.length !== text.length) el.innerHTML = [...text].map(ch => `<i>${ch}</i>`).join("");
    [...text].forEach((ch, k) => { const c = el.children[k]; if (c.textContent !== ch || old === ""){ c.textContent = ch; if (!reduce){ c.classList.remove("f"); void c.offsetWidth; c.classList.add("f"); } } });
  };
  document.querySelectorAll("[data-flap]").forEach(el => { const t = el.textContent; el.textContent = ""; flap(el, t); });
  const xc = document.querySelector("[data-xclock]");
  if (xc){
    const spine = document.querySelector(".xt-spine"), eras = [...spine.querySelectorAll(".xt-era")];
    const yr = xc.querySelector("[data-flap]"), unit = xc.querySelector("[data-unit]"), holder = xc.querySelector("[data-holder]");
    const WHO = {past: "Physics", present: "Distance", near: "The lab", seq: "The data"};
    const ticks = xc.querySelector(".xt-ticks"); // one tick per near-future signal, 15 in all
    ticks.innerHTML = Array.from({length: 15}, (_, i) => { const a = i / 15 * 2 * Math.PI - Math.PI / 2, c = Math.cos(a), s = Math.sin(a);
      return `<line x1="${100 + c * 91}" y1="${100 + s * 91}" x2="${100 + c * 98}" y2="${100 + s * 98}" style="transition-delay:${Math.min(i, 5) * 80}ms"/>`; }).join("");
    let queued = false;
    const draw = () => {
      queued = false;
      const mid = innerHeight * .45, r = spine.getBoundingClientRect();
      spine.style.setProperty("--p", reduce ? 1 : Math.max(0, Math.min(1, (mid - r.top) / r.height)));
      let cur = eras[0], t = 0;
      eras.forEach(e => { const b = e.getBoundingClientRect(); if (b.top <= mid){ cur = e; t = Math.max(0, Math.min(1, (mid - b.top) / b.height)); } });
      const k = cur.dataset.era, from = +cur.dataset.from, to = +cur.dataset.to;
      if (xc.dataset.era !== k){ xc.dataset.era = k; holder.textContent = WHO[k]; }
      if (k === "seq"){ flap(yr, "D-" + String(Math.max(1, Math.round(30 - t * 29))).padStart(2, "0")); unit.textContent = "days left"; xc.style.setProperty("--fillp", 1 - t); }
      else { flap(yr, String(Math.round(from + (to - from) * t))); unit.textContent = "year"; xc.style.setProperty("--fillp", t); }
    };
    addEventListener("scroll", () => { if (!queued){ queued = true; requestAnimationFrame(draw); } }, {passive: true});
    addEventListener("resize", draw); draw();
  }
  // Scenario dial: once in view, the crate counts down from 30 days while its ring drains (CSS).
  const xd = document.querySelector("[data-xs-days]");
  if (xd){
    const run = () => { if (reduce) return flap(xd, "D-01"); let d = 30; const iv = setInterval(() => { d--; flap(xd, "D-" + String(d).padStart(2, "0")); if (d <= 1) clearInterval(iv); }, 80); };
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting){ o.disconnect(); run(); } }, {threshold: .4}).observe(xd);
  }

  // Smooth scrolling (Lenis). Off for anyone who asks for less motion.
  let lenis = null;
  if (!reduce && window.Lenis) window.lenis = lenis = new Lenis({autoRaf: true, anchors: {offset: -90}});
  const goTo = el => lenis ? lenis.scrollTo(el, {offset: -90}) : el.scrollIntoView({behavior: reduce ? "auto" : "smooth", block: "start"});

  // Side nav: React Bits' Branched Menu (sections open into a trunk with a curved branch per item)
  // plus Line Sidebar's proximity effect (items near the cursor slide and brighten). Built from <section data-nav="Group|Label">.
  const secs = [...document.querySelectorAll("section[data-nav]")];
  if (secs.length){
    const groups = [];
    secs.forEach(s => {
      const [g, label] = s.dataset.nav.split("|"), target = s.querySelector("[id]") || s;
      let grp = groups.find(x => x.g === g); if (!grp) groups.push(grp = {g, items: []});
      grp.items.push({label, target, sec: s});
    });
    const T = 6, R = 9, EX = 26, ROW = 36, PAD = 4, y = k => PAD + k * ROW + ROW / 2;
    const nav = document.createElement("nav");
    nav.className = "bm"; nav.setAttribute("aria-label", "On this page");
    nav.innerHTML = '<span class="bm-mark" aria-hidden="true"></span>' + groups.map((grp, gi) => {
      const n = grp.items.length, h = PAD * 2 + n * ROW;
      const base = `M${T} 0 V${y(n - 1) - R}` + grp.items.map((_, k) => ` M${T} ${y(k) - R} A${R} ${R} 0 0 0 ${T + R} ${y(k)} H${EX}`).join("");
      const reach = grp.items.map((_, k) => `<path class="bm-reach" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1" d="M${T} 0 V${y(k) - R} A${R} ${R} 0 0 0 ${T + R} ${y(k)} H${EX}"/>`).join("");
      return `<div class="bm-sec"><button type="button" class="bm-head" aria-expanded="false">${grp.g}</button><div class="bm-body"><div class="bm-fold"><div class="bm-tree">
        <svg width="${EX}" height="${h}" aria-hidden="true"><path class="bm-base" d="${base}"/>${reach}</svg>
        ${grp.items.map((it, k) => `<a class="bm-item" href="#${it.target.id || ""}" data-g="${gi}" data-k="${k}"><span>${it.label}</span></a>`).join("")}</div></div></div></div>`;
    }).join("");
    document.body.appendChild(nav);
    const mark = nav.querySelector(".bm-mark"), secEls = [...nav.querySelectorAll(".bm-sec")], links = [...nav.querySelectorAll(".bm-item")];
    const open = gi => secEls.forEach((s, i) => { s.classList.toggle("open", i === gi); s.querySelector(".bm-head").setAttribute("aria-expanded", String(i === gi)); });
    const setActive = (gi, k) => {
      open(gi);
      links.forEach(a => { const on = +a.dataset.g === gi && +a.dataset.k === k; a.classList.toggle("on", on); on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current"); });
      secEls.forEach((s, i) => s.querySelectorAll(".bm-reach").forEach((p, pk) => p.setAttribute("stroke-dashoffset", i === gi && pk === k ? "0" : "1")));
      const head = secEls[gi].querySelector(".bm-head");
      const place = () => { mark.style.top = head.offsetTop + (head.offsetHeight - 16) / 2 + "px"; mark.classList.add("on"); };
      place(); setTimeout(place, 320);  // again once the other groups have folded (300 ms)
    };
    secEls.forEach((s, gi) => s.querySelector(".bm-head").addEventListener("click", () => goTo(groups[gi].items[0].target)));
    links.forEach(a => a.addEventListener("click", e => { e.preventDefault(); goTo(groups[+a.dataset.g].items[+a.dataset.k].target); }));
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      groups.forEach((grp, gi) => grp.items.forEach((it, k) => { if (it.sec === e.target) setActive(gi, k); }));
    }), {rootMargin: "-40% 0px -55% 0px"});
    secs.forEach(s => spy.observe(s));
    setActive(0, 0);
    // proximity: one rAF loop eases each item's --fx toward how close the pointer is
    if (!reduce){
      const tgt = links.map(() => 0), cur = links.map(() => 0); let raf = 0;
      const tick = () => {
        let moving = false;
        links.forEach((a, i) => { cur[i] += (tgt[i] - cur[i]) * .2; if (Math.abs(tgt[i] - cur[i]) > .002) moving = true; else cur[i] = tgt[i]; a.style.setProperty("--fx", cur[i].toFixed(3)); });
        raf = moving ? requestAnimationFrame(tick) : 0;
      };
      nav.addEventListener("pointermove", e => {
        links.forEach((a, i) => { const r = a.getBoundingClientRect(), d = Math.abs(e.clientY - (r.top + r.height / 2)); const p = Math.max(0, 1 - d / 70); tgt[i] = p * p * (3 - 2 * p); });
        if (!raf) raf = requestAnimationFrame(tick);
      });
      nav.addEventListener("pointerleave", () => { tgt.fill(0); if (!raf) raf = requestAnimationFrame(tick); });
    }
  }

  // No autoplaying video for people who asked for less motion.
  if (reduce) document.querySelectorAll("video[autoplay]").forEach(v => { v.removeAttribute("autoplay"); v.pause(); });

  // Stroke Text (after React Bits' Stroke Text): each letter's outline draws in, one after another, then the fill wipes across.
  // Point at it to play it again.
  document.querySelectorAll("[data-stroke-text]").forEach(svg => {
    const NS = "http://www.w3.org/2000/svg", word = svg.dataset.strokeText, FS = 200, id = "st-" + Math.random().toString(36).slice(2, 7);
    const probe = document.createElementNS(NS, "text");
    probe.setAttribute("font-size", FS); probe.setAttribute("letter-spacing", -0.01 * FS); probe.setAttribute("y", FS); probe.textContent = word;
    svg.appendChild(probe);
    const build = () => {
      const b = probe.getBBox(); if (!b.width) return;
      const xs = [...word].map((_, i) => probe.getStartPositionOfChar(i).x);
      svg.setAttribute("viewBox", `${b.x - 8} ${b.y + FS * .12} ${b.width + 16} ${b.height * .82}`);
      svg.innerHTML = `<defs><clipPath id="${id}"><rect class="st-wipe" x="${b.x - 8}" y="${b.y}" width="${b.width + 16}" height="${b.height + 20}"/></clipPath></defs>
        <g class="st-fill" clip-path="url(#${id})">${[...word].map((ch, i) => `<text x="${xs[i]}" y="${FS}" font-size="${FS}">${ch}</text>`).join("")}</g>
        <g class="st-stroke">${[...word].map((ch, i) => `<text x="${xs[i]}" y="${FS}" font-size="${FS}" style="--i:${i}">${ch}</text>`).join("")}</g>`;
      if (reduce) return svg.classList.add("st-done");
      const play = () => { svg.classList.remove("st-go"); void svg.getBoundingClientRect(); svg.classList.add("st-go"); };
      play(); svg.addEventListener("pointerenter", play);
    };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(build);
  });

  // Hero: the three phones lean a little toward the pointer. Desktop pointers only.
  const stage = document.querySelector("[data-tilt]");
  if (stage && !reduce && matchMedia("(hover: hover) and (pointer: fine)").matches){
    const hero = stage.closest("section"), ph = stage.querySelectorAll(".phone");
    const base = [...ph].map(p => getComputedStyle(p).transform === "none" ? "" : getComputedStyle(p).transform);
    let raf = 0;
    hero.addEventListener("pointermove", e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        ph.forEach((p, i) => p.style.transform = `${base[i]} translate3d(${x * (12 + i * 6)}px, ${y * 10}px, 0) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`);
      });
    });
    hero.addEventListener("pointerleave", () => ph.forEach(p => p.style.transform = ""));
  }

  // Clips: muted loops that play only while on screen. The button pauses them (WCAG 2.2.2).
  document.querySelectorAll("[data-play]").forEach(btn => {
    const v = btn.closest("figure").querySelector("video");
    let userPaused = reduce;
    const paint = () => { btn.textContent = v.paused ? "▶ Play" : "❚❚ Pause"; btn.setAttribute("aria-pressed", String(!v.paused)); };
    btn.addEventListener("click", () => { if (v.paused){ userPaused = false; v.play(); } else { userPaused = true; v.pause(); } });
    v.addEventListener("play", paint); v.addEventListener("pause", paint); paint();
    new IntersectionObserver(es => { if (es[0].isIntersecting && !userPaused) v.play().catch(() => {}); else if (!es[0].isIntersecting) v.pause(); }, {threshold: .3}).observe(v);
  });

  // Numbers count up once they're on screen: <b data-count="13">13</b>. The final value is already in the HTML.
  document.querySelectorAll("[data-count]").forEach(el => {
    if (reduce) return;
    const to = +el.dataset.count, pre = el.dataset.prefix || "", suf = el.dataset.suffix || "", dec = +(el.dataset.dec || 0), loc = el.closest(".grg") ? "en-GB" : "en-IN";
    const fmt = n => pre + n.toLocaleString(loc, {minimumFractionDigits: dec, maximumFractionDigits: dec}) + suf;
    new IntersectionObserver((es, o) => {
      if (!es[0].isIntersecting) return; o.disconnect();
      const t0 = performance.now(), D = 900;
      const step = now => { const p = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(to * e); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }, {threshold: .6}).observe(el);
  });

  // Section headings rise word by word as they enter (the words stay real text for screen readers).
  if (!reduce) document.querySelectorAll(".csp h2").forEach(h => {
    if (h.closest("[data-research]") || h.classList.contains("sr")) return;
    let n = 0;
    const wrap = node => [...node.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(w => { if (!w) return; if (/^\s+$/.test(w)) frag.append(w); else { const s = document.createElement("span"); s.className = "w"; s.style.setProperty("--w", n++); s.textContent = w; frag.append(s); } });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && c.tagName !== "BR") wrap(c);
    });
    wrap(h); h.classList.add("words");
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting){ o.disconnect(); h.classList.add("in"); } }, {rootMargin: "0px 0px -12% 0px"}).observe(h);
  });

  // Corners: previous and next project, always one click away.
  const ORDER = [["savvy.html", "SAVVY"], ["ankur.html", "Ankur"], ["greggs.html", "Greggs 2050"], ["critical-design.html", "Critical Design"]];
  const here = ORDER.findIndex(([f]) => location.pathname.endsWith("/" + f) || location.pathname.endsWith(f));
  if (here >= 0){
    const HOME = ["index.html", "Home"], prev = ORDER[here - 1] || HOME, next = ORDER[here + 1] || HOME; // the ends lead home, no wrap-around
    document.body.insertAdjacentHTML("beforeend", `<nav class="pn" aria-label="Other projects">
      <a class="pn-a prev" href="${prev[0]}"><span aria-hidden="true">←</span><span><small>Previous</small>${prev[1]}</span></a>
      <span class="pn-count" aria-hidden="true">${String(here + 1).padStart(2, "0")} / 04</span>
      <a class="pn-a next" href="${next[0]}"><span><small>Next</small>${next[1]}</span><span aria-hidden="true">→</span></a></nav>`);
  }

  // Image viewer for the iteration strip.
  const lb = document.getElementById("lb");
  if (lb){
    const img = document.getElementById("lbImg"), cap = document.getElementById("lbCap");
    document.querySelectorAll("[data-lb]").forEach(b => b.addEventListener("click", () => {
      img.src = b.dataset.lb; img.alt = b.querySelector("img")?.alt || ""; cap.textContent = b.dataset.cap || "";
      lb.showModal();
    }));
    document.getElementById("lbClose").addEventListener("click", () => lb.close());
    lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
  }
})();
