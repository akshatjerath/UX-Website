/* Greggs page only. [data-ring]: image cards on a flat wheel (after React Bits' Circular Carousel, rebuilt without React).
   Each card sits on a big circle and is rotated to follow it. Cards are never scaled or tilted in 3D, so the text stays sharp.
   It loops by itself, one card every 3.5 s, while on screen. Hover or focus holds it. No buttons.
   Phones, narrow windows and reduced motion get a plain swipeable row. Styles: case.css, "Greggs · carousel". */
(() => {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wide = matchMedia("(min-width: 721px)");
  const CW = 390, STEP = 20, GAP = 24; // card width in px, degrees between cards, space between cards

  document.querySelectorAll("[data-ring]").forEach(root => {
    const items = [...root.children], n = items.length;
    root.setAttribute("role", "region"); root.setAttribute("aria-roledescription", "carousel");
    root.innerHTML = '<div class="ring-stage"><div class="ring-track"></div></div>';
    const stage = root.firstChild, track = stage.firstChild;
    items.forEach(it => { it.classList.add("ring-item"); track.appendChild(it); });
    let cur = 0, wheel = false, held = false, seen = false, timer = 0;
    const was = items.map(() => 0);

    const rel = i => { const d = (((i - cur) % n) + n) % n; return d > n / 2 ? d - n : d; }; // -2..3 for six cards
    const place = quiet => items.forEach((it, i) => {
      const d = rel(i), a = Math.abs(d);
      it.classList.toggle("jump", quiet || Math.abs(d - was[i]) > n / 2); // a card wrapping round the back snaps, it doesn't swing across
      it.style.transform = `rotate(${d * STEP}deg)`;
      it.style.opacity = a === 0 ? 1 : a === 1 ? .95 : a === 2 ? .4 : 0;
      it.style.visibility = a > 2 ? "hidden" : "visible";
      it.style.zIndex = 10 - a;
      it.classList.toggle("front", d === 0);
      it.toggleAttribute("inert", d !== 0);
      was[i] = d;
    });
    const layout = () => {
      wheel = wide.matches && !RM;
      root.classList.toggle("ring-3d", wheel);
      if (!wheel) { items.forEach(it => { it.style.cssText = ""; it.classList.remove("jump", "front"); it.removeAttribute("inert"); }); stage.style.height = ""; return; }
      root.style.setProperty("--cw", CW + "px"); items.forEach(it => it.style.height = "");
      const tallest = Math.max(...items.map(it => it.offsetHeight)); // every card takes the tallest card's height
      const R = Math.round((CW + GAP) / Math.sin(STEP * Math.PI / 180));
      root.style.setProperty("--ch", tallest + "px"); root.style.setProperty("--R", R + "px");
      stage.style.height = tallest + 230 + "px";
      place(true);
    };
    const tick = () => { clearTimeout(timer); if (wheel && !held && seen) timer = setTimeout(() => { cur = (cur + 1) % n; place(false); tick(); }, 3500); };

    root.addEventListener("mouseenter", () => { held = true; tick(); }); root.addEventListener("mouseleave", () => { held = false; tick(); });
    root.addEventListener("focusin", () => { held = true; tick(); }); root.addEventListener("focusout", () => { held = false; tick(); });
    new IntersectionObserver(es => { seen = es[0].isIntersecting; tick(); }, {threshold: .35}).observe(root); // only turn while it's on screen
    wide.addEventListener("change", layout);
    let rt = 0; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (wheel) layout(); }, 120); });
    track.tabIndex = 0; // the row scrolls on phones, so it takes keyboard focus
    layout();
  });
})();
