/* ==========================================================================
   Forgutti — site behavior
   Vanilla port of the prototype's DCLogic component:
   nav blur-on-scroll, scroll-progress bar, reveal-on-scroll, and the
   ambient node-network canvas in the hero.
   ========================================================================== */
(function () {
  'use strict';

  // Theme knobs (were the design "Tweaks": accent / ambient / nodeDensity)
  var AMBIENT = 'nodes';   // 'nodes' | 'grid' | 'off'
  var NODE_DENSITY = 48;   // 18–90

  var reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function accentHex() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--accent');
    v = (v || '').trim();
    return v || '#4F8EF7';
  }

  function hexToRgb(hex) {
    hex = (hex || '#4F8EF7').replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  /* --- Nav + scroll progress ---------------------------------------------- */
  function initScroll() {
    var nav = document.getElementById('site-nav');
    var bar = document.getElementById('progress-bar');
    var doc = document.documentElement;

    function onScroll() {
      var y = window.scrollY || window.pageYOffset || 0;
      if (nav) nav.classList.toggle('is-scrolled', y > 20);
      if (bar) {
        var max = (doc.scrollHeight - doc.clientHeight) || 1;
        bar.style.width = Math.max(0, Math.min(100, (y / max) * 100)) + '%';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Reveal on scroll ---------------------------------------------------- */
  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'none'; });
      return;
    }

    els.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)';
      var d = el.getAttribute('data-delay');
      if (d) el.style.transitionDelay = d + 'ms';
    });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    els.forEach(function (el) { obs.observe(el); });
  }

  /* --- Ambient hero canvas ------------------------------------------------- */
  function initCanvas() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var rgb = hexToRgb(accentHex());
    var r = rgb[0], g = rgb[1], b = rgb[2];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 1, h = 1;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    if (AMBIENT === 'off') { ctx.clearRect(0, 0, w, h); return; }

    if (AMBIENT === 'grid') {
      function drawGrid() {
        ctx.clearRect(0, 0, w, h);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',0.06)';
        var gap = Math.max(46, Math.min(86, w / 16));
        for (var x = 0; x <= w; x += gap) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        for (var y = 0; y <= h; y += gap) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      }
      drawGrid();
      window.addEventListener('resize', drawGrid);
      return;
    }

    // nodes
    var density = Math.max(18, Math.min(90, NODE_DENSITY));
    var count = Math.round(Math.min(density, Math.max(16, (w * h) / 24000)));
    var nodes = [];
    for (var i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16
      });
    }
    var D = Math.max(110, Math.min(200, Math.sqrt(w * w + h * h) / 9));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        for (var j = i + 1; j < nodes.length; j++) {
          var bn = nodes[j];
          var dx = a.x - bn.x, dy = a.y - bn.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < D) {
            var al = (1 - dist / D) * 0.2;
            ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + al + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(bn.x, bn.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',0.5)';
      for (var k = 0; k < nodes.length; k++) {
        var p = nodes[k];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    draw();
    if (reduced) return;

    function step() {
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < -24) a.x = w + 24;
        if (a.x > w + 24) a.x = -24;
        if (a.y < -24) a.y = h + 24;
        if (a.y > h + 24) a.y = -24;
      }
      draw();
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* --- Boot ---------------------------------------------------------------- */
  function init() {
    if (!reduced && document.documentElement) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
    initScroll();
    initReveal();
    initCanvas();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
