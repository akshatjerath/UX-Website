/* Vanilla port of the React Bits PixelCard (JS + CSS variant). No dependencies.
   Usage: PixelCard(el, { gap: 6, pixelSize: 2, ... }) turns el into a pixel card.
   el must be position: relative (or absolute), overflow hidden. A canvas is inserted behind its content.
   Colours come from CSS custom properties on el so they follow the theme:
   --pc-c1, --pc-c2, --pc-c3 (pixel tones) and --pc-glow (cursor light). */
(function () {
  'use strict';

  var SHAPES = { square: 0, circle: 1, diamond: 2 };
  var APPEAR = 0.26;
  var EXIT = 0.22;

  function clamp(v, a, b) { return Math.min(Math.max(v, a), b); }
  function smoothstep(e0, e1, v) { var t = clamp((v - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); }
  function easeOutBack(t) { var c = 1.9, u = t - 1; return 1 + (c + 1) * u * u * u + c * u * u; }

  var rgbCtx = null;
  function toRgb(color) {
    if (!rgbCtx) {
      var c = document.createElement('canvas');
      c.width = 1; c.height = 1;
      rgbCtx = c.getContext('2d', { willReadFrequently: true });
    }
    rgbCtx.clearRect(0, 0, 1, 1);
    rgbCtx.fillStyle = '#fff';
    rgbCtx.fillStyle = color;
    rgbCtx.fillRect(0, 0, 1, 1);
    var d = rgbCtx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  }

  function PixelCard(container, options) {
    var o = Object.assign({
      gap: 5, pixelSize: 2, speed: 35, shape: 'square', origin: 'center',
      revealDuration: 600, spotlight: 0.5, glow: 0.5, opacity: 1, fade: 0,
      trigger: 'hover', clickPulse: true, intro: true, introDelay: 0, noFocus: false
    }, options || {});

    var canvas = document.createElement('canvas');
    canvas.className = 'pixel-card-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    container.insertBefore(canvas, container.firstChild);
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var shape = SHAPES[o.shape] || 0;
    var gapPx = Math.max(2, o.gap);
    var sizePx = Math.max(0.5, o.pixelSize);
    var span0 = Math.max(50, o.revealDuration) / 1000;
    var spotlight = clamp(o.spotlight, 0, 1);
    var glow = clamp(o.glow, 0, 1);
    var opacity = clamp(o.opacity, 0, 1);
    var fade = clamp(o.fade, 0, 1);
    var speed = clamp(o.speed, 0, 100);

    var colors = ['#ffffff', '#e5e5e5', '#a3a3a3'];
    var glowRgb = [255, 255, 255];
    function readColors() {
      var cs = getComputedStyle(container);
      var list = ['--pc-c1', '--pc-c2', '--pc-c3'].map(function (n) { return cs.getPropertyValue(n).trim(); }).filter(Boolean);
      if (list.length) colors = list;
      var g = cs.getPropertyValue('--pc-glow').trim();
      if (g) glowRgb = toRgb(g);
    }

    var s = {
      alive: true, raf: 0, last: 0, time: 0, visible: true, width: 0, height: 0, ratio: 1, key: '', count: 0,
      x: new Float32Array(0), y: new Float32Array(0), tint: new Uint8Array(0), size: new Float32Array(0),
      phase: new Float32Array(0), rate: new Float32Array(0), jitter: new Float32Array(0),
      presence: new Float32Array(0), delay: new Float32Array(0), mask: new Float32Array(0), maskKey: '',
      active: false, changedAt: 0, originX: 0, originY: 0, maxDistance: 1,
      pointerX: 0, pointerY: 0, spotX: 0, spotY: 0, spotVX: 0, spotVY: 0, spotPower: 0,
      hovering: false, pulses: [], dt: 1 / 60, releaseAt: -1, introAt: -1
    };

    function build() {
      var rect = container.getBoundingClientRect();
      var width = Math.max(1, Math.round(rect.width));
      var height = Math.max(1, Math.round(rect.height));
      var ratio = Math.min(window.devicePixelRatio || 1, 2);
      var key = [width, height, ratio, gapPx, sizePx, colors.join(',')].join('|');
      if (key === s.key) return;
      s.key = key; s.width = width; s.height = height; s.ratio = ratio;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      var columns = Math.floor((width - 1) / gapPx) + 1;
      var rows = Math.floor((height - 1) / gapPx) + 1;
      var offX = (width - (columns - 1) * gapPx) / 2;
      var offY = (height - (rows - 1) * gapPx) / 2;
      var count = columns * rows;
      var prev = s.presence;
      s.count = count;
      s.x = new Float32Array(count); s.y = new Float32Array(count); s.tint = new Uint8Array(count);
      s.size = new Float32Array(count); s.phase = new Float32Array(count); s.rate = new Float32Array(count);
      s.jitter = new Float32Array(count); s.presence = new Float32Array(count); s.delay = new Float32Array(count);
      var i = 0;
      for (var c = 0; c < columns; c++) {
        for (var r = 0; r < rows; r++) {
          s.x[i] = offX + c * gapPx; s.y[i] = offY + r * gapPx;
          s.tint[i] = Math.floor(Math.random() * colors.length);
          s.size[i] = sizePx * (0.25 + Math.random() * 0.75);
          s.phase[i] = Math.random() * Math.PI * 2;
          s.rate[i] = 0.55 + Math.random() * 0.9;
          s.jitter[i] = Math.random();
          if (prev.length) s.presence[i] = prev[Math.min(i, prev.length - 1)];
          i++;
        }
      }
      s.maxDistance = Math.hypot(width, height);
      schedule();
    }

    function schedule() {
      var far = 1, i, d;
      for (i = 0; i < s.count; i++) far = Math.max(far, Math.hypot(s.x[i] - s.originX, s.y[i] - s.originY));
      s.maxDistance = far;
      for (i = 0; i < s.count; i++) {
        d = Math.hypot(s.x[i] - s.originX, s.y[i] - s.originY) / far;
        s.delay[i] = s.active ? d * span0 * 0.82 + s.jitter[i] * span0 * 0.18
                              : (1 - d) * span0 * 0.45 + s.jitter[i] * span0 * 0.1;
      }
    }

    function setActive(value, x, y) {
      if (s.active === value) return;
      s.active = value;
      s.changedAt = s.time;
      if (value) {
        readColors();
        var usePointer = o.origin === 'pointer' && x !== undefined && y !== undefined;
        s.originX = usePointer ? x : s.width / 2;
        s.originY = usePointer ? y : s.height / 2;
      }
      schedule();
      if (value) container.setAttribute('data-active', ''); else container.removeAttribute('data-active');
      wake();
    }

    function draw() {
      var w = s.width, h = s.height;
      ctx.setTransform(s.ratio, 0, 0, s.ratio, 0, 0);
      ctx.clearRect(0, 0, w, h);
      var i, k;
      var maskKey = s.count + '|' + w + '|' + h + '|' + fade;
      if (s.maskKey !== maskKey) {
        s.maskKey = maskKey;
        s.mask = new Float32Array(s.count);
        var near0 = Math.min(w, h) * 0.05, far0 = Math.min(w, h) * 0.42;
        for (i = 0; i < s.count; i++) {
          var edge = Math.min(s.x[i], w - s.x[i], s.y[i], h - s.y[i]);
          var t = clamp((edge - near0) / (far0 - near0), 0, 1);
          s.mask[i] = 1 - fade * t * t * t * (t * (t * 6 - 15) + 10);
        }
      }
      var presenceSum = 0;
      var elapsed = s.time - s.changedAt;
      var appearStep = s.dt / APPEAR, exitStep = s.dt / EXIT;
      for (i = 0; i < s.count; i++) {
        var cur = s.presence[i];
        var ready = elapsed >= s.delay[i] || reduce;
        var target = s.active ? (ready ? 1 : 0) : (ready ? 0 : cur);
        if (reduce) s.presence[i] = target;
        else if (target > cur) s.presence[i] = Math.min(1, cur + appearStep);
        else if (target < cur) s.presence[i] = Math.max(0, cur - exitStep);
        presenceSum += s.presence[i];
      }
      var presenceAvg = s.count ? presenceSum / s.count : 0;

      if (glow > 0 && presenceAvg > 0.001) {
        var cx = s.spotPower > 0.01 ? s.spotX : s.originX;
        var cy = s.spotPower > 0.01 ? s.spotY : s.originY;
        var reach = Math.max(w, h) * 0.85;
        var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, reach);
        var st = glow * opacity * 0.32 * Math.min(1, presenceAvg * 1.4);
        var rgb = glowRgb[0] + ', ' + glowRgb[1] + ', ' + glowRgb[2];
        grad.addColorStop(0, 'rgba(' + rgb + ', ' + st + ')');
        grad.addColorStop(0.45, 'rgba(' + rgb + ', ' + st * 0.35 + ')');
        grad.addColorStop(1, 'rgba(' + rgb + ', 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      var spotRadius = Math.min(w, h) * 0.38 + 30;
      var spotStrength = spotlight * s.spotPower;
      var pulses = s.pulses;
      var twinkle = reduce ? 0 : (speed > 0 ? 1 : 0);
      var frequency = (speed / 35) * 1.35;

      for (var c = 0; c < colors.length; c++) {
        ctx.fillStyle = colors[c];
        for (i = 0; i < s.count; i++) {
          if (s.tint[i] !== c) continue;
          var presence = s.presence[i];
          if (presence <= 0.002) continue;
          var x = s.x[i], y = s.y[i];
          var size = s.size[i];
          var alpha = 0.5 + presence * 0.38;
          if (twinkle) {
            var wave = Math.sin(s.phase[i] + s.time * frequency * s.rate[i]);
            size *= 0.62 + 0.38 * wave;
            alpha += 0.12 * wave + (s.jitter[i] > 0.92 ? 0.35 * Math.max(0, wave) : 0);
          }
          size *= easeOutBack(presence);
          var flash = presence < 1 && s.active ? Math.sin(presence * Math.PI) : 0;
          size *= 1 + flash * 0.9;
          alpha += flash * 0.6;
          if (spotStrength > 0.001) {
            var nr = smoothstep(spotRadius, 0, Math.hypot(x - s.spotX, y - s.spotY));
            size *= 1 + spotStrength * nr * nr * 2.4;
            alpha += spotStrength * nr * 0.45;
          }
          alpha = Math.min(1, alpha) * s.mask[i] * opacity;
          if (alpha <= 0.004) continue;
          for (k = 0; k < pulses.length; k++) {
            var p = pulses[k];
            var band = (Math.hypot(x - p.x, y - p.y) - p.radius) / 26;
            var pw = Math.exp(-band * band) * p.power;
            size *= 1 + pw * 1.4;
            alpha = Math.min(1, alpha + pw * 0.5);
          }
          if (size <= 0.05) continue;
          ctx.globalAlpha = alpha;
          if (shape === 1) { ctx.beginPath(); ctx.arc(x, y, size * 0.5, 0, Math.PI * 2); ctx.fill(); }
          else if (shape === 2) {
            var half = size * 0.62;
            ctx.beginPath(); ctx.moveTo(x, y - half); ctx.lineTo(x + half, y); ctx.lineTo(x, y + half); ctx.lineTo(x - half, y);
            ctx.closePath(); ctx.fill();
          } else ctx.fillRect(x - size * 0.5, y - size * 0.5, size, size);
        }
      }
      ctx.globalAlpha = 1;
      return presenceSum;
    }

    function frame(now) {
      s.raf = 0;
      if (!s.alive) return;
      var dt = s.last ? Math.min(0.05, (now - s.last) / 1000) : 1 / 60;
      s.last = now; s.dt = dt; s.time += dt;
      build();

      if (s.introAt >= 0 && s.time >= s.introAt) {
        s.introAt = -1;
        if (!s.active) {
          setActive(true);
          if (o.trigger !== 'always') s.releaseAt = s.time + span0 + 0.7;
        }
      }
      if (s.releaseAt >= 0 && s.time >= s.releaseAt && !s.hovering && o.trigger !== 'always') {
        s.releaseAt = -1;
        setActive(false);
      }

      var want = s.hovering && !reduce ? 1 : 0;
      s.spotPower += (want - s.spotPower) * (1 - Math.exp(-(want ? 6 : 3) * dt));
      var stiffness = 120, damping = 2 * Math.sqrt(stiffness) * 0.9;
      s.spotVX += (stiffness * (s.pointerX - s.spotX) - damping * s.spotVX) * dt;
      s.spotVY += (stiffness * (s.pointerY - s.spotY) - damping * s.spotVY) * dt;
      s.spotX += s.spotVX * dt;
      s.spotY += s.spotVY * dt;

      var pulseSpeed = s.maxDistance / Math.max(0.35, span0 * 0.9);
      s.pulses = s.pulses.filter(function (p) {
        p.radius += pulseSpeed * dt;
        p.power = Math.max(0, 1 - p.radius / (s.maxDistance + 40));
        return p.power > 0;
      });

      var presence = draw();
      var settling = s.active || s.introAt >= 0 || presence > 0 || s.pulses.length > 0 ||
        s.spotPower > 0.002 || Math.abs(s.spotVX) + Math.abs(s.spotVY) > 0.5;
      if (settling && s.visible) s.raf = requestAnimationFrame(frame);
      else s.last = 0;
    }

    function wake() { if (!s.raf && s.alive && s.visible) s.raf = requestAnimationFrame(frame); }

    function local(e) { var r = container.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }

    function onEnter(e) {
      var p = local(e);
      s.hovering = e.pointerType !== 'touch';
      s.pointerX = p[0]; s.pointerY = p[1];
      if (s.spotPower < 0.01) { s.spotX = p[0]; s.spotY = p[1]; s.spotVX = 0; s.spotVY = 0; }
      if (o.trigger === 'hover') { s.releaseAt = -1; s.introAt = -1; setActive(true, p[0], p[1]); }
      wake();
    }
    function onMove(e) { var p = local(e); s.pointerX = p[0]; s.pointerY = p[1]; wake(); }
    function onLeave(e) {
      s.hovering = false;
      if (o.trigger === 'hover') {
        if (e.pointerType === 'touch') s.releaseAt = s.time + 1.2; else setActive(false);
      }
      wake();
    }
    function onDown(e) {
      var p = local(e);
      if (o.trigger === 'click') { s.introAt = -1; s.releaseAt = -1; setActive(!s.active, p[0], p[1]); }
      else if (!s.active) setActive(true, p[0], p[1]);
      if (o.clickPulse && !reduce && s.active) s.pulses.push({ x: p[0], y: p[1], radius: 0, power: 1 });
      wake();
    }
    function onFocusIn(e) { if (container.contains(e.relatedTarget)) return; if (o.trigger === 'hover') setActive(true); }
    function onFocusOut(e) { if (container.contains(e.relatedTarget)) return; if (o.trigger === 'hover' && !s.hovering) setActive(false); }

    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerleave', onLeave);
    container.addEventListener('pointerdown', onDown);
    if (!o.noFocus) {
      container.addEventListener('focusin', onFocusIn);
      container.addEventListener('focusout', onFocusOut);
    }

    var ro = new ResizeObserver(function () { build(); wake(); });
    ro.observe(container);

    var introStarted = false;
    var io = new IntersectionObserver(function (entries) {
      s.visible = entries.some(function (en) { return en.isIntersecting; });
      if (s.visible && !introStarted && (o.trigger === 'always' || (o.intro && !reduce))) {
        introStarted = true;
        build();
        s.introAt = s.time + o.introDelay / 1000;
      }
      if (s.visible) wake();
    });
    io.observe(container);

    readColors();
    build();
    s.pointerX = s.spotX = s.originX = s.width / 2;
    s.pointerY = s.spotY = s.originY = s.height / 2;

    return {
      destroy: function () {
        s.alive = false;
        cancelAnimationFrame(s.raf);
        ro.disconnect(); io.disconnect();
        container.removeEventListener('pointerenter', onEnter);
        container.removeEventListener('pointermove', onMove);
        container.removeEventListener('pointerleave', onLeave);
        container.removeEventListener('pointerdown', onDown);
        container.removeEventListener('focusin', onFocusIn);
        container.removeEventListener('focusout', onFocusOut);
        canvas.remove();
      }
    };
  }

  window.PixelCard = PixelCard;
})();
