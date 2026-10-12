/* Greggs page only. [data-ring]: image cards on a 3D ring that turns on its own.
   "circular": cards on the outside of a drum (after React Bits' Circular Carousel).
   "concave": cards on the inside of the drum, so the sides lean towards you (after React Bits Pro's Concave Carousel).
   It steps to the next card every 3.5 s while on screen. Mouse, clicks and text selection don't move it (by choice).
   Phones, narrow windows and reduced motion get a plain swipeable row. Styles: case.css, "Greggs · rings". */
(() => {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wide = matchMedia("(min-width: 721px)");

  document.querySelectorAll("[data-ring]").forEach(root => {
    const inside = root.dataset.ring === "concave", items = [...root.children], n = items.length, step = 360 / n;
    root.setAttribute("role", "region"); root.setAttribute("aria-roledescription", "carousel");
    root.innerHTML = '<div class="ring-stage"><div class="ring-track"></div></div>';
    const stage = root.firstChild, track = stage.firstChild;
    items.forEach(it => { it.classList.add("ring-item"); track.appendChild(it); });
    root.insertAdjacentHTML("beforeend", '<p class="sr" aria-live="polite"></p>');
    const live = root.querySelector("p.sr");
    let cur = 0, playing = !RM, held = false, seen = false, timer = 0, three = false, R = 0;

    const layout = () => {
      three = wide.matches && !RM;
      root.classList.toggle("ring-3d", three);
      if (!three){ track.style.transform = ""; items.forEach(it => it.style.transform = ""); return; }
      const w = items[0].offsetWidth;
      R = Math.round(w / (2 * Math.tan(Math.PI / n)) + 36);
      items.forEach((it, i) => it.style.transform = `rotateY(${i * step}deg) translateZ(${inside ? -R : R}px)`);
      stage.style.height = Math.max(...items.map(it => it.offsetHeight)) + 40 + "px";
      turn(cur, true);
    };
    const turn = (i, quiet) => {
      cur = i;
      const k = ((cur % n) + n) % n;
      if (three) track.style.transform = `translateZ(${inside ? R * .55 : -R}px) rotateY(${-cur * step}deg)`;
      else if (!quiet) items[k].scrollIntoView({behavior: RM ? "auto" : "smooth", block: "nearest", inline: "center"});
      items.forEach((it, j) => it.classList.toggle("front", j === k));
      if (!quiet) live.textContent = `${k + 1} of ${n}: ${(items[k].querySelector("h3,b") || {}).textContent || ""}`;
    };
    const tick = () => { clearTimeout(timer); if (three && playing && !held && seen) timer = setTimeout(() => { turn(cur + 1, true); tick(); }, 3500); };

    // only turn while it's on screen
    new IntersectionObserver(es => { seen = es[0].isIntersecting; tick(); }, {threshold: .35}).observe(root);
    wide.addEventListener("change", layout);
    addEventListener("resize", () => { if (three) layout(); });
    track.tabIndex = 0; // the row scrolls on phones, so it takes keyboard focus
    layout();
  });
})();
