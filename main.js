/*
 * Portfolio behaviour. Vanilla JS, no dependencies.
 * Motion rules: transform and opacity only, no scroll listeners
 * (IntersectionObserver and CSS scroll timelines instead), and every
 * pointer effect is skipped under prefers-reduced-motion.
 */
(() => {
  const root = document.documentElement;
  // Local preview shows each empty image slot's label and file name.
  if (location.protocol === "file:" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) root.classList.add("dev");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Theme ---------- */
  const themeBtn = $(".theme-toggle");
  const effectiveTheme = () =>
    root.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = effectiveTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (_) { /* storage can be blocked */ }
      themeBtn.setAttribute("aria-label", next === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
    themeBtn.setAttribute(
      "aria-label",
      effectiveTheme() === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = $(".menu-btn");
  const links = $(".nav-links");
  if (menuBtn && links) {
    const setMenu = (open) => {
      links.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      document.documentElement.classList.toggle("menu-open", open);
    };
    menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
    links.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !links.classList.contains("open")) return;
      setMenu(false);
      menuBtn.focus();
    });
    /* Resizing past the phone breakpoint with the menu open must not leave the page locked. */
    matchMedia("(min-width: 761px)").addEventListener("change", (e) => e.matches && setMenu(false));
  }

  /* ---------- Media slots: load the file if it exists ---------- */
  const zoomable = (el) => el.closest("[data-zoomable]");
  function initMedia(el) {
    const file = el.dataset.file;
    if (!file || el.dataset.ready) return;
    el.dataset.ready = "1";
    const isVideo = /\.(mp4|webm|mov)$/i.test(file);
    const node = document.createElement(isVideo ? "video" : "img");
    const done = () => {
      el.classList.add("ok");
      if (!isVideo && zoomable(el)) {
        el.tabIndex = 0;
        el.setAttribute("role", "button");
        el.setAttribute("aria-label", "Enlarge image: " + (el.dataset.label || "image"));
      }
    };
    if (isVideo) {
      node.muted = true;
      node.playsInline = true;
      node.preload = "metadata";
      node.setAttribute("aria-hidden", "true");
      if (!reduce) {
        node.loop = true;
        node.autoplay = true;
      }
      node.addEventListener("loadeddata", done, { once: true });
    } else {
      node.alt = el.dataset.alt || el.dataset.label || "";
      node.loading = "lazy";
      node.decoding = "async";
      node.addEventListener("load", done, { once: true });
    }
    node.addEventListener("error", () => node.remove(), { once: true });
    node.src = file;
    el.append(node);
  }
  $$(".media[data-file]").forEach(initMedia);

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$("[data-reveal]");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Magnetic buttons (pointer pull, feedback on hover) ---------- */
  if (fine && !reduce) {
    $$("[data-magnetic]").forEach((el) => {
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, active = false;
      const loop = () => {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
        if (active || Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
          raf = requestAnimationFrame(loop);
        } else {
          el.style.transform = "";
          raf = 0;
        }
      };
      const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        tx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        ty = (e.clientY - (r.top + r.height / 2)) * 0.32;
        active = true;
        kick();
      });
      el.addEventListener("pointerleave", () => {
        tx = 0; ty = 0; active = false;
        kick();
      });
    });
  }

  /* ---------- Case study: contents list follows the reader ---------- */
  const toc = $(".toc");
  if (toc && "IntersectionObserver" in window) {
    const anchors = $$("a", toc);
    const byId = new Map(anchors.map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          anchors.forEach((a) => a.removeAttribute("aria-current"));
          const a = byId.get(e.target.id);
          if (a) a.setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    byId.forEach((_, id) => {
      const s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  /* ---------- Before / after compare ---------- */
  $$(".compare").forEach((c) => {
    const input = $("input", c);
    const set = () => c.style.setProperty("--pos", input.value + "%");
    input.addEventListener("input", set);
    set();
  });

  /* ---------- Tabs (iOS / Android) ---------- */
  $$('[role="tablist"]').forEach((tablist) => {
    const tabs = $$('[role="tab"]', tablist);
    const pill = $(".pill", tablist);
    const place = () => {
      const t = tabs.find((x) => x.getAttribute("aria-selected") === "true");
      if (!t || !pill) return;
      pill.style.width = t.offsetWidth + "px";
      pill.style.transform = `translateX(${t.offsetLeft}px)`;
    };
    const select = (t, focus, updateHash = true) => {
      tabs.forEach((x) => {
        const on = x === t;
        x.setAttribute("aria-selected", String(on));
        x.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(x.getAttribute("aria-controls"));
        if (panel) panel.hidden = !on;
      });
      place();
      if (focus) t.focus();
      if (updateHash && t.dataset.hash) history.replaceState(null, "", "#" + t.dataset.hash);
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", (e) => {
        const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        select(tabs[(i + d + tabs.length) % tabs.length], true);
      });
    });
    const fromHash = tabs.find((t) => "#" + t.dataset.hash === location.hash);
    select(fromHash || tabs[0], false, false);
    if ("ResizeObserver" in window) new ResizeObserver(place).observe(tablist);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  });

  /* ---------- Lightbox for loaded images ---------- */
  let dlg;
  const openBox = (src, alt) => {
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.className = "lightbox";
      dlg.setAttribute("aria-label", "Image preview");
      dlg.innerHTML =
        '<div class="inner"><button class="icon-btn" aria-label="Close preview"><span class="ic i-x"></span></button><img alt=""></div>';
      document.body.append(dlg);
      dlg.addEventListener("click", (e) => {
        if (e.target !== $("img", dlg)) dlg.close();
      });
    }
    const img = $("img", dlg);
    img.src = src;
    img.alt = alt;
    dlg.showModal();
  };
  const tryOpen = (target) => {
    const m = target.closest("[data-zoomable] .media");
    if (!m || !m.classList.contains("ok")) return false;
    const img = $("img", m);
    if (!img) return false;
    openBox(img.currentSrc || img.src, img.alt);
    return true;
  };
  document.addEventListener("click", (e) => tryOpen(e.target));
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("media")) {
      if (tryOpen(e.target)) e.preventDefault();
    }
  });
})();
