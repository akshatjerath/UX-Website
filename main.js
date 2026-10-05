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
    };
    menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
    links.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
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

  /* ---------- Hero depth: layers drift with the pointer ---------- */
  const stage = $(".stage");
  if (stage && fine && !reduce) {
    const hero = stage.closest(".hero") || stage;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      stage.style.setProperty("--px", cx.toFixed(3));
      stage.style.setProperty("--py", cy.toFixed(3));
      raf = Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    });
    hero.addEventListener("pointerleave", () => { tx = 0; ty = 0; kick(); });
  }

  /* ---------- Work list: stagger, plus a cursor preview on desktop ----------
   * Each row is one self-contained block in index.html. The row's thumbnail
   * (.work-thumb) is the only place its image is named, and the stagger delay
   * is set here, so adding a project means adding one row and nothing else. */
  const list = $(".work-list");
  if (list) $$(".work-row", list).forEach((row, i) => row.style.setProperty("--d", Math.min(i, 5) * 80 + "ms"));
  if (list && fine && !reduce && matchMedia("(min-width: 821px)").matches) {
    const prev = document.createElement("div");
    prev.className = "preview";
    prev.setAttribute("aria-hidden", "true");
    const box = document.createElement("div");
    box.className = "preview-box";
    prev.append(box);
    document.body.append(prev);

    const rows = $$(".work-row", list);
    // Preview images are built on hover (the row and the next one), so a long list
    // loads nothing up front. The preview only shows once its cover has loaded,
    // so a missing image never leaves an empty box floating by the cursor.
    const items = [];
    let cur = -1, shown = false;
    const sync = () => prev.classList.toggle("show", shown && cur >= 0 && !!items[cur] && items[cur].classList.contains("ok"));
    const itemFor = (i) => {
      if (i < 0 || i >= rows.length) return null;
      if (!items[i]) {
        const t = $(".work-thumb", rows[i]);
        const m = document.createElement("figure");
        m.className = "media";
        m.dataset.file = t ? t.dataset.file || "" : "";
        m.dataset.label = t ? t.dataset.label || "Project image" : "Project image";
        m.style.setProperty("--ar", "4 / 3");
        box.append(m);
        initMedia(m);
        new MutationObserver(sync).observe(m, { attributes: true, attributeFilter: ["class"] });
        items[i] = m;
      }
      return items[i];
    };

    // The preview sits in a clear zone to the right of the titles and follows
    // the cursor vertically, so it never covers the title being read.
    let y = 0, cy = 0, zoneX = 0, raf = 0;
    const zone = () => {
      const r = list.getBoundingClientRect();
      const w = prev.offsetWidth;
      zoneX = Math.min(r.left + r.width * 0.62, r.right - 56 - w);
    };
    const targetY = () => {
      const h = box.offsetHeight;
      return Math.min(Math.max(y - h / 2, 84), innerHeight - h - 16);
    };
    const loop = () => {
      const ty = targetY();
      const vel = ty - cy;
      cy += vel * 0.12;
      const tilt = Math.max(-5, Math.min(5, vel * 0.06));
      prev.style.transform = `translate3d(${zoneX.toFixed(1)}px, ${cy.toFixed(1)}px, 0) rotate(${tilt.toFixed(2)}deg)`;
      raf = shown ? requestAnimationFrame(loop) : 0;
    };
    rows.forEach((row, i) => {
      row.addEventListener("pointerenter", (e) => {
        cur = i;
        itemFor(i);
        itemFor(i + 1);
        items.forEach((m, j) => m.classList.toggle("on", j === i));
        y = e.clientY;
        zone();
        if (!shown) cy = targetY();
        shown = true;
        sync();
        if (!raf) raf = requestAnimationFrame(loop);
      });
      row.addEventListener("pointermove", (e) => { y = e.clientY; });
      row.addEventListener("pointerleave", () => {
        shown = false;
        sync();
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
