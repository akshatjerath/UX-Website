/* The top nav on every page. Styles: base.css ("top nav" and "staggered menu").
   1. Gooey pill, after React Bits' Gooey Nav: a pill flows to the link you point at, with drops that burst on click.
   2. Phone menu, after React Bits' Staggered Menu: below 720px the links fold into a Menu button;
      two colour layers sweep in, then the links rise one by one. Edit its links here.
   Both rebuilt by hand without GSAP (React Bits is MIT + Commons Clause). */
(() => {
  /* PDFs and links to other sites open in a new tab, with a hidden note for screen readers. Page and #anchor links stay in the same tab.
     Runs on load, and again whenever a script adds or changes a link (the CV link gets its address from home.js). */
  const newTab = () => document.querySelectorAll("a[href]").forEach(a => {
    let u; try { u = new URL(a.getAttribute("href"), location.href); } catch (e) { return; }
    const web = u.protocol === "http:" || u.protocol === "https:";
    if (!(a.target === "_blank" || /\.pdf$/i.test(u.pathname) || (web && u.origin !== location.origin))) return; /* anything that opens a new tab gets the note */
    if (a.target !== "_blank") a.target = "_blank";
    const rel = new Set((a.rel || "").split(/\s+/).filter(Boolean)); rel.add("noopener"); a.rel = [...rel].join(" ");
    if (!a.querySelector(".nt")) a.insertAdjacentHTML("beforeend", '<span class="sr nt"> (opens in new tab)</span>');
  });
  let nq = 0; const queue = () => { if (!nq) nq = requestAnimationFrame(() => { nq = 0; newTab(); }); };
  newTab();
  new MutationObserver(queue).observe(document.body, {childList: true, subtree: true, attributes: true, attributeFilter: ["href"]});

  const root = document.documentElement;
  /* day / night: follows the device until the visitor picks. Same button on every page. */
  const tBtn = document.getElementById("themeBtn"), lightMq = matchMedia("(prefers-color-scheme: light)");
  const mode = () => root.dataset.theme || (lightMq.matches ? "light" : "dark");
  const paint = () => { tBtn.dataset.mode = mode(); tBtn.setAttribute("aria-label", mode() === "dark" ? "Switch to day mode" : "Switch to night mode"); };
  lightMq.addEventListener?.("change", paint); paint();
  tBtn.onclick = () => {
    root.dataset.theme = mode() === "dark" ? "light" : "dark"; paint();
    try { localStorage.setItem("aj-theme", root.dataset.theme); } catch (e) {}
  };

  const tnav = document.querySelector(".island nav");
  if (tnav){
    document.body.insertAdjacentHTML("beforeend", '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b"/><feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="g"/><feComposite in="SourceGraphic" in2="g" operator="atop"/></filter></svg>');
    tnav.insertAdjacentHTML("afterbegin", '<span class="goo" aria-hidden="true"><i></i><i class="d"></i><i class="d"></i><i class="d"></i><i class="d"></i></span>');
    const [pill, ...drops] = tnav.querySelectorAll(".goo i"), links = () => [...tnav.querySelectorAll("a:not([hidden])")];
    let rest = null; // no link is "active" until a section of this page is in view
    const moveTo = (a, burst) => {
      tnav.querySelector(".goo").style.opacity = a ? 1 : 0;
      if (!a) { links().forEach(x => x.classList.remove(here)); return; }
      const aw = a.offsetWidth, al = a.offsetLeft; // read first, then write
      links().forEach(x => x.classList.toggle("here", x === a));
      pill.style.width = aw + "px"; pill.style.transform = `translateX(${al}px)`;
      const cx = al + aw / 2 - 7;
      drops.forEach((d, i) => {
        d.style.transitionDelay = (burst ? 0 : 40 + i * 45) + "ms";
        const dx = burst ? (i % 2 ? 1 : -1) * (18 + i * 9) : (i - 1.5) * 6, dy = burst ? (i < 2 ? -1 : 1) * (14 + i * 3) : 0;
        d.style.transform = `translate(${cx + dx}px, ${dy}px)`;
      });
      if (burst) setTimeout(() => moveTo(a, false), 260);
    };
    // On the home page the pill rests on the section you're reading.
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      rest = links().find(a => a.getAttribute("href") === "#" + e.target.id) || rest;
      if (!tnav.matches(":hover")) moveTo(rest, false);
    }), {rootMargin: "-45% 0px -50% 0px"});
    links().forEach(a => { const h = a.getAttribute("href"); if (h.startsWith("#") && h.length > 1) { const s = document.querySelector(h); if (s) io.observe(s); } });
    requestAnimationFrame(() => moveTo(rest, false));
    links().forEach(a => { a.addEventListener("pointerenter", () => moveTo(a, false)); a.addEventListener("focus", () => moveTo(a, false)); a.addEventListener("click", () => moveTo(a, true)); });
    tnav.addEventListener("pointerleave", () => moveTo(rest, false));
    addEventListener("resize", () => moveTo(rest, false));
  }

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
