/* Greggs page only. Two widgets, hand-written after React Bits components (MIT + Commons Clause):
   1. [data-story]: the report told chapter by chapter. Scrolling turns a wheel of chapter names
      (after Option Wheel) and the matching page swaps in beside it. On phones, or with reduced motion,
      the chapters simply stack.
   2. [data-depth]: the 2050 menu as cards that recede into depth (after Depth Carousel).
   Styles: case.css, "Greggs · story" and "Greggs · menu". */
(() => {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- 1. the report as a story ---------- */
  document.querySelectorAll("[data-story]").forEach(story => {
    const pages = [...story.querySelectorAll(".ch")], n = pages.length, wheel = story.querySelector(".wheel");
    pages.forEach((p, i) => p.dataset.n = String(i + 1).padStart(2, "0"));
    wheel.innerHTML = `<span class="wh-count"><b>01</b> / ${String(n).padStart(2, "0")}</span>` +
      pages.map((p, i) => `<button type="button" tabindex="-1" class="wh-i"><small>${p.dataset.n}</small>${p.dataset.t}</button>`).join("");
    const items = [...wheel.querySelectorAll(".wh-i")], count = wheel.querySelector(".wh-count b");
    const wide = matchMedia("(min-width:901px)");
    let pos = 0, target = 0, raf = 0, on = -1;

    const flat = () => RM || !wide.matches;
    const setup = () => {
      story.classList.toggle("flat", flat());
      story.style.height = flat() ? "" : `calc(100vh + ${(n - 1) * 62}vh)`;
      onScroll();
    };
    const lay = () => {
      raf = 0;
      pos += (target - pos) * .14;
      if (Math.abs(target - pos) < .001) pos = target;
      const rowH = Math.max(46, wheel.clientHeight / 9), tilt = 9 * Math.PI / 180, R = rowH / tilt;
      items.forEach((el, i) => {
        const d = i - pos, ang = clamp(d * tilt, -Math.PI / 2, Math.PI / 2), dist = Math.abs(d);
        el.style.transform = `translate(${(-R * (1 - Math.cos(ang))).toFixed(1)}px, calc(${(R * Math.sin(ang)).toFixed(1)}px - 50%)) rotate(${(ang * 180 / Math.PI).toFixed(2)}deg)`;
        el.style.opacity = Math.max(.06, 1 - dist * .22).toFixed(3);
        el.style.filter = `blur(${Math.min(4, dist * 1.4).toFixed(2)}px)`;
        el.style.setProperty("--p", Math.max(0, 1 - Math.min(dist, 1)).toFixed(3));
      });
      const k = Math.round(pos);
      if (k !== on) {
        on = k; count.textContent = String(k + 1).padStart(2, "0");
        pages.forEach((p, i) => p.classList.toggle("on", i === k));
        items.forEach((b, i) => b.classList.toggle("sel", i === k));
      }
      if (pos !== target) raf = requestAnimationFrame(lay);
    };
    const onScroll = () => {
      if (flat()) return;
      const r = story.getBoundingClientRect(), span = story.offsetHeight - innerHeight;
      target = clamp(-r.top / span, 0, 1) * (n - 1);
      if (!raf) raf = requestAnimationFrame(lay);
    };
    items.forEach((b, i) => b.addEventListener("click", () => {
      const y = story.getBoundingClientRect().top + scrollY + (story.offsetHeight - innerHeight) * i / (n - 1) + 2;
      window.lenis ? lenis.scrollTo(y) : scrollTo({top: y, behavior: "smooth"});
    }));
    addEventListener("scroll", onScroll, {passive: true});
    addEventListener("resize", setup);
    setup();
  });

  /* ---------- 2. the 2050 menu, in depth ---------- */
  document.querySelectorAll("[data-depth]").forEach(root => {
    const cards = [...root.querySelectorAll(".dc-card")], n = cards.length;
    root.setAttribute("role", "region"); root.setAttribute("aria-roledescription", "carousel"); root.setAttribute("aria-label", "The 2050 menu"); root.tabIndex = 0;
    root.insertAdjacentHTML("beforeend", `<button type="button" class="dc-arrow prev" aria-label="Previous concept">←</button><button type="button" class="dc-arrow next" aria-label="Next concept">→</button><div class="dc-dots">${cards.map((_, i) => `<button type="button" aria-label="Concept ${i + 1}"></button>`).join("")}</div><p class="sr" aria-live="polite"></p>`);
    const dots = [...root.querySelectorAll(".dc-dots button")], live = root.querySelector("p.sr");
    let cur = 0;
    const show = i => {
      cur = (i + n) % n;
      cards.forEach((c, k) => {
        let d = ((k - cur) % n + n) % n; if (d > n / 2) d -= n;
        const back = Math.max(0, d), shown = Math.abs(d) <= 3;
        c.style.transform = `translate(-50%,-50%) translateX(${d * 96}px) translateZ(${-d * 210}px) rotateY(${clamp(d, 0, 1) * 20}deg)`;
        c.style.opacity = !shown ? 0 : d < 0 ? Math.max(0, 1 + d) : 1;
        c.style.filter = `brightness(${Math.max(.3, 1 - back * .2)}) blur(${Math.min(5, back * 1.6)}px)`;
        c.style.zIndex = 100 - Math.round(d * 5);
        c.style.pointerEvents = d === 0 ? "auto" : "none";
        c.setAttribute("aria-hidden", String(d !== 0));
      });
      dots.forEach((b, k) => b.classList.toggle("on", k === cur));
      live.textContent = `${cur + 1} of ${n}: ${cards[cur].querySelector("h3").textContent}`;
    };
    root.querySelector(".prev").onclick = () => show(cur - 1);
    root.querySelector(".next").onclick = () => show(cur + 1);
    dots.forEach((b, k) => b.onclick = () => show(k));
    root.addEventListener("keydown", e => { if (e.key === "ArrowRight") show(cur + 1); if (e.key === "ArrowLeft") show(cur - 1); });
    let x0 = null;
    root.addEventListener("pointerdown", e => { if (!e.target.closest("button")) x0 = e.clientX; });
    addEventListener("pointerup", e => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1)); });
    if (RM) root.classList.add("still");
    show(0);
  });
})();
