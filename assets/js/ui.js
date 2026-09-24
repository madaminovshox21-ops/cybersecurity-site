/* Interfeys: mavzu, mobil menyu, qidiruv oynasi, yil. */
(function () {
  "use strict";

  /* ---------- Yil ---------- */
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();

  /* ---------- Mavzu (theme) ---------- */
  var KEY = "cs_theme";
  var root = document.documentElement;
  function apply(t) {
    if (t === "dark" || t === "light") root.setAttribute("data-theme", t);
    else root.removeAttribute("data-theme");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark() ? "#0f1729" : "#eef2f7");
  }
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  try { apply(localStorage.getItem(KEY) || "system"); } catch (e) { apply("system"); }

  var tt = document.getElementById("themeToggle");
  if (tt) tt.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply(next);
  });

  /* ---------- Mobil menyu ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("mainNav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
    });
  }

  /* ---------- Qidiruv oynasi ---------- */
  var modal = document.getElementById("searchModal");
  var input = document.getElementById("searchInput");
  var results = document.getElementById("searchResults");
  var openBtn = document.getElementById("searchOpen");
  var sel = -1, current = [];

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  function openSearch() {
    if (!modal) return;
    modal.hidden = false;
    input.value = ""; renderResults("");
    setTimeout(function () { input.focus(); }, 30);
  }
  function closeSearch() { if (modal) modal.hidden = true; sel = -1; }

  function renderResults(q) {
    var idx = window.SEARCH_INDEX || [];
    q = q.trim().toLowerCase();
    if (!q) { results.innerHTML = '<div class="search-hint">Yozing va Enter bosing. Yopish uchun Esc.</div>'; current = []; return; }
    current = idx.filter(function (r) {
      return r.title.toLowerCase().indexOf(q) >= 0 || (r.sub && r.sub.toLowerCase().indexOf(q) >= 0) || r.kind.toLowerCase().indexOf(q) >= 0;
    }).slice(0, 40);
    if (!current.length) { results.innerHTML = '<div class="search-hint">Hech narsa topilmadi.</div>'; return; }
    sel = 0;
    results.innerHTML = current.map(function (r, i) {
      return '<a href="' + esc(r.href) + '" data-i="' + i + '" class="' + (i === 0 ? "sel" : "") + '"><span class="kind">' + esc(r.kind) + '</span><span>' + esc(r.title) + "</span>" + (r.sub ? "<small>" + esc(r.sub.slice(0, 90)) + "</small>" : "") + "</a>";
    }).join("");
    results.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { closeSearch(); });
    });
  }

  function move(d) {
    if (!current.length) return;
    sel = (sel + d + current.length) % current.length;
    results.querySelectorAll("a").forEach(function (a, i) { a.classList.toggle("sel", i === sel); if (i === sel) a.scrollIntoView({ block: "nearest" }); });
  }

  if (openBtn) openBtn.addEventListener("click", openSearch);
  if (modal) modal.addEventListener("click", function (e) { if (e.target === modal) closeSearch(); });
  if (input) {
    input.addEventListener("input", function () { renderResults(input.value); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") { e.preventDefault(); if (current[sel]) { location.hash = current[sel].href; closeSearch(); } }
      else if (e.key === "Escape") { closeSearch(); }
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && !/input|textarea|select/i.test((e.target.tagName || "")) && (!modal || modal.hidden)) {
      e.preventDefault(); openSearch();
    } else if (e.key === "Escape" && modal && !modal.hidden) { closeSearch(); }
  });

  /* ---------- Zarrachalar foni (yengil, faqat bosh sahifada his qilinadi) ---------- */
  (function particles() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.5";
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d"), pts = [], raf, w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
    function color() { return isDark() ? "94,232,255" : "0,119,168"; }
    function resize() {
      w = canvas.width = innerWidth * dpr; h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px"; canvas.style.height = innerHeight + "px";
      var n = Math.min(60, Math.floor(innerWidth / 22));
      pts = Array.from({ length: n }, function () {
        return { x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .25 * dpr, vy: (Math.random() - .5) * .25 * dpr, r: (Math.random() * 1.4 + .5) * dpr };
      });
    }
    function draw() {
      ctx.clearRect(0, 0, w, h); var c = color();
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.fillStyle = "rgba(" + c + ",.55)"; ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.hypot(dx, dy);
          if (d < 130 * dpr) { ctx.strokeStyle = "rgba(" + c + "," + (.12 * (1 - d / (130 * dpr))) + ")"; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    var t;
    addEventListener("resize", function () { clearTimeout(t); t = setTimeout(resize, 200); });
    resize(); draw();
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) cancelAnimationFrame(raf); else draw();
    });
  })();
})();
