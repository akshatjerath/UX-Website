/* Phone menu for every page, after React Bits' Staggered Menu (MIT + Commons Clause), rebuilt without GSAP.
   Below 720px the island's links fold into a Menu button; two colour layers sweep in, then the links rise one by one.
   Edit the links here. Styles: base.css ("staggered menu"). */
(() => {
  const PAGES = [["Home", "index.html"], ["SAVVY", "savvy.html"], ["Ankur", "ankur.html"], ["Greggs 2050", "greggs.html"], ["Critical Design", "critical-design.html"], ["About", "index.html#about"], ["Contact", "index.html#contact"]];
  const SOCIAL = [["LinkedIn", "https://www.linkedin.com/in/akshat-jerath/"], ["Email", "mailto:akshatjeratth@gmail.com"]];
  const island = document.getElementById("island");
  if (!island) return;
  const here = location.pathname.split("/").pop() || "index.html";
  const onHome = here === "index.html";
  const href = h => onHome && h.startsWith("index.html#") ? h.slice(10) : h;

  const tog = document.createElement("button");
  tog.type = "button"; tog.className = "sm-tog"; tog.setAttribute("aria-expanded", "false"); tog.setAttribute("aria-controls", "smenu");
  tog.innerHTML = `<span class="sm-tw" aria-hidden="true"><span>Menu</span><span>Close</span></span><span class="sr">Open the menu</span><i class="sm-plus" aria-hidden="true"></i>`;
  island.appendChild(tog);

  const m = document.createElement("div");
  m.className = "smenu"; m.id = "smenu"; m.inert = true;
  m.innerHTML = `<div class="sm-scrim"></div><div class="sm-layer l1"></div><div class="sm-layer l2"></div>
    <nav class="sm-layer sm-panel" aria-label="Menu"><ol>${PAGES.map(([t, h], i) => `<li class="sm-it" style="--i:${i}"><a href="${href(h)}"${h === here ? ' aria-current="page"' : ""}><span><small>${String(i + 1).padStart(2, "0")}</small>${t}</span></a></li>`).join("")}</ol>
    <div class="sm-soc"><p>Say hello</p>${SOCIAL.map(([t, h]) => `<a href="${h}"${h.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${t}</a>`).join("")}</div></nav>`;
  document.body.appendChild(m);

  const set = open => {
    m.classList.toggle("open", open); m.inert = !open;
    island.classList.toggle("sm-on", open);
    tog.setAttribute("aria-expanded", String(open));
    tog.querySelector(".sr").textContent = open ? "Close the menu" : "Open the menu";
    document.documentElement.style.overflow = open ? "hidden" : "";
    window.lenis && (open ? lenis.stop() : lenis.start());
    if (open) setTimeout(() => m.querySelector("a").focus({preventScroll: true}), 350); else tog.focus({preventScroll: true});
  };
  tog.onclick = () => set(!m.classList.contains("open"));
  m.querySelector(".sm-scrim").onclick = () => set(false);
  m.querySelectorAll("a").forEach(a => a.addEventListener("click", () => set(false)));
  addEventListener("keydown", e => { if (e.key === "Escape" && m.classList.contains("open")) set(false); });
  matchMedia("(min-width:721px)").addEventListener("change", e => { if (e.matches && m.classList.contains("open")) set(false); });
})();
