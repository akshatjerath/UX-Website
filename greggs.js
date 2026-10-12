/* Greggs page only. [data-depth]: the 2050 menu as cards that recede into depth,
   hand-written after the React Bits Depth Carousel (MIT + Commons Clause). Styles: case.css, "Greggs · the 2050 menu". */
(() => {
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- the 2050 menu, in depth ---------- */
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
