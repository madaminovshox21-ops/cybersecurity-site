/* CyberShield Akademiya — bir sahifali ilova (SPA) dvigateli.
   Hash-router: #/darsliklar, #/darsliklar/<id>, #/buyruqlar, #/yangiliklar,
   #/ai, #/vositalar, #/lugat, #/test */
(function () {
  "use strict";

  var app = document.getElementById("app");
  var TRACKS = window.TRACKS || [];
  var LESSONS = window.LESSONS || [];

  /* ---------- Yordamchilar ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function lvlName(n) { return ["", "Boshlang‘ich", "O‘rta", "Ilg‘or"][n] || "Boshlang‘ich"; }
  function trackTitle(id) { for (var i = 0; i < TRACKS.length; i++) if (TRACKS[i].id === id) return TRACKS[i].title; return id; }

  /* ---------- Progress (localStorage) ---------- */
  var PROGRESS = (function () {
    var key = "cs_progress_v1", done = {};
    try { done = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { done = {}; }
    return {
      isDone: function (id) { return !!done[id]; },
      toggle: function (id) { done[id] ? delete done[id] : (done[id] = 1); this.save(); },
      set: function (id, v) { v ? (done[id] = 1) : delete done[id]; this.save(); },
      count: function () { return Object.keys(done).length; },
      save: function () { try { localStorage.setItem(key, JSON.stringify(done)); } catch (e) {} }
    };
  })();

  function copyText(text, btn, okLabel) {
    function ok() { if (!btn) return; var o = btn.innerHTML; btn.classList.add("ok"); if (okLabel) btn.textContent = okLabel; setTimeout(function () { btn.classList.remove("ok"); btn.innerHTML = o; }, 1400); }
    try {
      navigator.clipboard.writeText(text).then(ok, function () { fallback(); });
    } catch (e) { fallback(); }
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e2) {} document.body.removeChild(ta);
    }
  }
  function toast(msg) {
    var t = el('<div class="toast">' + esc(msg) + "</div>"); document.body.appendChild(t);
    setTimeout(function () { t.style.opacity = "0"; t.style.transition = "opacity .3s"; }, 1600);
    setTimeout(function () { t.remove(); }, 2000);
  }

  /* Kod bloklariga nusxa tugmasini qo‘shish */
  function wireCopyBlocks(scope) {
    (scope || document).querySelectorAll(".prose pre, .terminal-body").forEach(function (pre) {
      if (pre.dataset.copy) return; pre.dataset.copy = "1";
      if (pre.parentElement.classList.contains("codeblock")) return;
      if (pre.tagName === "PRE") {
        var wrap = el('<div class="codeblock"></div>');
        pre.parentNode.insertBefore(wrap, pre); wrap.appendChild(pre);
        var b = el('<button class="copy-btn" type="button" aria-label="Nusxa olish">Nusxa</button>');
        b.addEventListener("click", function () { copyText(pre.innerText, b, "✓ Olindi"); });
        wrap.appendChild(b);
      }
    });
  }

  /* ---------- Sahifa: Bosh ---------- */
  function pageHome() {
    var totalLessons = LESSONS.length;
    var termLines = [
      '<span class="d"># CyberShield Akademiya — amaliy kiberxavfsizlik</span>',
      '<span class="p">akademiya@cybershield</span>:<span class="c">~</span>$ whoami',
      'kelajakdagi xavfsizlik mutaxassisi',
      '<span class="p">akademiya@cybershield</span>:<span class="c">~</span>$ ls kurslar/',
      '<span class="c">asoslar/  himoya/  monitoring/  dasturlash/  shaxsiy/</span>',
      '<span class="p">akademiya@cybershield</span>:<span class="c">~</span>$ cat missiya.txt',
      'Nazariyani amaliyot bilan bog‘lab, real foyda beradigan',
      'ko‘nikmalarni o‘zbek tilida o‘rgatish.',
      '<span class="p">akademiya@cybershield</span>:<span class="c">~</span>$ ./boshlash --dars=1',
      '<span class="w">[+]</span> Kirish darsi tayyor. Marhamat! <span class="caret"></span>'
    ];
    var features = [
      { ic: iconBook(), h: "O‘quv darsliklar", p: "Asoslardan ilg‘or himoyagacha — o‘zbek tilida, amaliy misollar bilan.", href: "#/darsliklar", more: "Darslarni ko‘rish" },
      { ic: iconTerminal(), h: "Buyruqlar bazasi", p: "Tarmoq, log tahlili va mustahkamlash uchun tayyor buyruqlar, nusxa olish bilan.", href: "#/buyruqlar", more: "Buyruqlar" },
      { ic: iconTools(), h: "Amaliy vositalar", p: "Parol kuchi, xesh generatori, subnet kalkulyatori va portlar maʼlumotnomasi.", href: "#/vositalar", more: "Vositalar" },
      { ic: iconCode(), h: "Dasturlash tillari", p: "Python, JavaScript, Bash, SQL va Go’da xavfsiz kod: xato va to‘g‘ri namuna yonma-yon.", href: "#/tillar", more: "Kod namunalari" },
      { ic: iconArticle(), h: "Maqolalar", p: "Kiberxavfsizlik, AI va dasturchilar uchun chuqurroq tahliliy maqolalar.", href: "#/maqolalar", more: "O‘qish" },
      { ic: iconChip(), h: "AI va xavfsizlik", p: "Sun’iy intellekt himoyada va hujumda: prompt injection, deepfake, LLM xavflari.", href: "#/ai", more: "Batafsil" },
      { ic: iconNews(), h: "Yangiliklar va saboqlar", p: "Muhim hodisalar tarixi, mashhur CVE lar va ulardan olingan saboqlar.", href: "#/yangiliklar", more: "O‘qish" },
      { ic: iconQuiz(), h: "Bilim testi", p: "O‘rganganingizni 15 savollik test bilan sinab ko‘ring va tahlil oling.", href: "#/test", more: "Testni boshlash" }
    ];
    var roadmap = [
      { h: "Poydevor", p: "Tushunchalar, Linux, tarmoq, kriptografiya.", li: ["CIA uchligi", "Terminal", "TCP/IP, DNS"] },
      { h: "Himoya", p: "Server va tizimlarni mustahkamlash.", li: ["SSH hardening", "Firewall", "Zaxira nusxa"] },
      { h: "Monitoring", p: "Loglar, SIEM va insidentlar.", li: ["Log tahlili", "SOC", "Incident response"] },
      { h: "Ixtisoslashuv", p: "Xavfsiz kod yoki bulut yo‘nalishi.", li: ["OWASP Top 10", "DevSecOps", "Sertifikatlar"] }
    ];

    var wrap = el('<div></div>');
    wrap.appendChild(el(
      '<section class="hero"><div class="wrap"><div class="hero-grid">' +
        '<div><span class="eyebrow">O‘zbek tilidagi kiberxavfsizlik akademiyasi</span>' +
        '<h1>Kiberxavfsizlikni <em>amaliy</em> o‘rganing</h1>' +
        '<p class="hero-lead">Nazariya, buyruqlar, real vositalar va yangiliklar — bir joyda. Boshlang‘ichdan ilg‘or darajagacha, har bir dars amaliy topshiriq bilan.</p>' +
        '<div class="hero-actions"><a class="btn btn-primary" href="#/darsliklar">Darsni boshlash</a>' +
        '<a class="btn" href="#/buyruqlar">Buyruqlar bazasi</a></div>' +
        '<div class="hero-stats">' +
          '<div><b>' + totalLessons + '</b><span>ta to‘liq dars</span></div>' +
          '<div><b>' + (window.COMMANDS ? window.COMMANDS.reduce(function (a, c) { return a + c.items.length; }, 0) : 0) + '</b><span>ta buyruq</span></div>' +
          '<div><b>' + (window.ARTICLES ? window.ARTICLES.length : 0) + '</b><span>ta maqola</span></div>' +
          '<div><b>' + (window.LANGUAGES ? window.LANGUAGES.length : 0) + '</b><span>ta til</span></div>' +
        '</div></div>' +
        '<div><div class="terminal"><div class="terminal-bar"><i></i><i></i><i></i><span>akademiya — bash</span></div>' +
        '<div class="terminal-body">' + termLines.join("\n") + '</div></div></div>' +
      '</div></div></section>'
    ));

    var feat = el('<section class="section"><div class="wrap"><div class="section-head"><div><span class="eyebrow">Nimalar bor</span><h2>Bir platformada hamma narsa</h2><p>O‘rganish, mashq qilish va kundalik ishda foydalanish uchun.</p></div></div><div class="feature-grid"></div></div></section>');
    var fg = feat.querySelector(".feature-grid");
    features.forEach(function (f) {
      fg.appendChild(el('<a class="feature" href="' + f.href + '"><span class="feature-icon">' + f.ic + '</span><h3>' + esc(f.h) + '</h3><p>' + esc(f.p) + '</p><span class="more">' + esc(f.more) + ' →</span></a>'));
    });
    wrap.appendChild(feat);

    var road = el('<section class="section"><div class="wrap"><div class="section-head"><div><span class="eyebrow">Yo‘l xaritasi</span><h2>Qayerdan boshlash kerak</h2><p>Bosqichma-bosqich, poydevordan ixtisoslashuvgacha.</p></div></div><div class="roadmap"></div></div></section>');
    var rm = road.querySelector(".roadmap");
    roadmap.forEach(function (s, i) {
      rm.appendChild(el('<div class="road-step"><span class="step-no">' + (i + 1) + '-BOSQICH</span><h3>' + esc(s.h) + '</h3><p>' + esc(s.p) + '</p><ul>' + s.li.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div>'));
    });
    wrap.appendChild(road);

    wrap.appendChild(el(
      '<section class="section"><div class="wrap"><div class="panel" style="padding:28px;display:grid;gap:12px">' +
      '<span class="eyebrow">Etika va qonun</span>' +
      '<h2 style="font-size:24px">Faqat ruxsat berilgan muhitda mashq qiling</h2>' +
      '<p class="muted" style="max-width:70ch">Bu yerdagi bilim himoya qurish va o‘z tizimlaringizni tekshirish uchun. Ruxsatsiz tizimni skanerlash yoki sinash qonunga zid. Xavfsiz mashq uchun o‘z virtual laboratoriyangiz, TryHackMe, HackTheBox yoki rasmiy bug bounty dasturlaridan foydalaning.</p>' +
      '</div></div></section>'
    ));
    return wrap;
  }

  /* ---------- Sahifa: Darsliklar ro‘yxati ---------- */
  function pageLessons() {
    var wrap = el('<div class="page"><div class="wrap"></div></div>');
    var c = wrap.querySelector(".wrap");
    c.appendChild(el('<div class="page-head"><span class="eyebrow">O‘quv markaz</span><h1>Darsliklar</h1><p>' + LESSONS.length + ' ta to‘liq dars, 5 ta yo‘nalish. Har bir dars amaliy topshiriq bilan yakunlanadi. O‘qilgan darslar avtomatik belgilanadi.</p></div>'));

    var pct = LESSONS.length ? Math.round(PROGRESS.count() / LESSONS.length * 100) : 0;
    c.appendChild(el('<div class="panel progress"><b>' + PROGRESS.count() + " / " + LESSONS.length + '</b><div class="progress-bar"><i style="width:' + pct + '%"></i></div><b>' + pct + '%</b></div>'));

    TRACKS.forEach(function (t) {
      var list = LESSONS.filter(function (l) { return l.track === t.id; });
      if (!list.length) return;
      var sec = el('<div class="track"><div class="track-head"><h2>' + esc(t.title) + '</h2><span>' + list.length + ' ta dars</span></div><p class="muted" style="margin:-6px 0 14px;max-width:70ch">' + esc(t.desc) + '</p><div class="lesson-grid"></div></div>');
      var grid = sec.querySelector(".lesson-grid");
      list.forEach(function (l) {
        var done = PROGRESS.isDone(l.id);
        grid.appendChild(el(
          '<a class="lesson-card" href="#/darsliklar/' + l.id + '">' +
          (done ? '<span class="done-mark">' + iconCheck() + "</span>" : "") +
          '<div class="meta"><span class="chip lvl-' + l.level + '">' + lvlName(l.level) + '</span><span>· ' + l.minutes + ' daq</span></div>' +
          '<h3>' + esc(l.title) + '</h3><p>' + esc(l.summary) + '</p></a>'
        ));
      });
      c.appendChild(sec);
    });
    return wrap;
  }

  /* ---------- Sahifa: Bitta dars ---------- */
  function pageLesson(id) {
    var idx = -1;
    for (var i = 0; i < LESSONS.length; i++) if (LESSONS[i].id === id) { idx = i; break; }
    if (idx < 0) return pageNotFound();
    var l = LESSONS[idx];
    var prev = LESSONS[idx - 1], next = LESSONS[idx + 1];

    var toc = l.sections.map(function (s) { return '<a href="#' + s.id + '" data-sec="' + s.id + '">' + esc(s.h) + "</a>"; }).join("");
    var body = l.sections.map(function (s) {
      return '<h2 id="' + s.id + '">' + esc(s.h) + "</h2>" + s.html;
    }).join("");

    var kp = (l.keypoints || []).map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("");
    var doneNow = PROGRESS.isDone(l.id);

    var wrap = el('<div class="page"><div class="wrap"><div class="lesson-layout"></div></div></div>');
    var layout = wrap.querySelector(".lesson-layout");
    layout.appendChild(el(
      '<aside class="lesson-toc"><a class="back" href="#/darsliklar">← Barcha darslar</a><div class="toc-title">Ushbu darsda</div>' + toc + "</aside>"
    ));

    var art = el(
      '<article class="article">' +
      '<div class="article-head"><div class="meta"><span class="chip accent">' + esc(trackTitle(l.track)) + '</span><span class="chip lvl-' + l.level + '">' + lvlName(l.level) + '</span><span class="chip">' + l.minutes + ' daqiqa</span></div>' +
      '<h1>' + esc(l.title) + '</h1><p class="lead">' + esc(l.summary) + '</p></div>' +
      '<div class="prose">' + body +
      '<div class="panel keypoints"><h2>Asosiy xulosalar</h2><ul>' + kp + '</ul></div>' +
      (l.practice ? '<div class="panel practice"><h2>Amaliy topshiriq</h2>' + l.practice + '</div>' : "") +
      '</div>' +
      '<div style="margin-top:24px"><button class="btn ' + (doneNow ? "" : "btn-primary") + '" id="doneBtn" type="button">' + (doneNow ? "✓ O‘qildi (bekor qilish)" : "Darsni tugallandi deb belgilash") + '</button></div>' +
      '<div class="lesson-foot"></div>' +
      "</article>"
    );
    var foot = art.querySelector(".lesson-foot");
    if (prev) foot.appendChild(el('<a class="nav-link prev" href="#/darsliklar/' + prev.id + '"><small>← Oldingi</small>' + esc(prev.title) + "</a>"));
    if (next) foot.appendChild(el('<a class="nav-link next" href="#/darsliklar/' + next.id + '"><small>Keyingi →</small>' + esc(next.title) + "</a>"));
    layout.appendChild(art);

    setTimeout(function () {
      wireCopyBlocks(art);
      var db = art.querySelector("#doneBtn");
      db.addEventListener("click", function () {
        PROGRESS.toggle(l.id);
        var now = PROGRESS.isDone(l.id);
        db.textContent = now ? "✓ O‘qildi (bekor qilish)" : "Darsni tugallandi deb belgilash";
        db.classList.toggle("btn-primary", !now);
        toast(now ? "Dars o‘qilgan deb belgilandi" : "Belgi olib tashlandi");
      });
    }, 0);
    return wrap;
  }

  /* ---------- Sahifa: Buyruqlar ---------- */
  function pageCommands() {
    var CMD = window.COMMANDS || [];
    var wrap = el('<div class="page"><div class="wrap"><div class="page-head"><span class="eyebrow">Maʼlumotnoma</span><h1>Buyruqlar bazasi</h1><p>O‘quv va kundalik ish uchun tez-tez kerak bo‘ladigan buyruqlar. Har birini bir bosishda nusxa oling. Faqat o‘zingizning yoki ruxsat berilgan tizimlarda ishlating.</p></div>' +
      '<div class="search-box" style="margin-bottom:16px">' + iconSearch() + '<input class="input" id="cmdSearch" type="search" placeholder="Buyruq yoki tavsif bo‘yicha qidiring..." autocomplete="off"></div>' +
      '<div class="cmd-layout"><nav class="cmd-cats" id="cmdCats"></nav><div id="cmdMain"></div></div></div></div>');
    var cats = wrap.querySelector("#cmdCats");
    var main = wrap.querySelector("#cmdMain");
    var active = "all";
    var query = "";

    cats.appendChild(el('<button class="active" data-cat="all">Barchasi <span>' + CMD.reduce(function (a, c) { return a + c.items.length; }, 0) + '</span></button>'));
    CMD.forEach(function (g, i) { cats.appendChild(el('<button data-cat="' + i + '">' + esc(g.cat) + ' <span>' + g.items.length + '</span></button>')); });

    function render() {
      main.innerHTML = "";
      var q = query.toLowerCase();
      var shown = 0;
      CMD.forEach(function (g, i) {
        if (active !== "all" && String(active) !== String(i)) return;
        var items = g.items.filter(function (it) { return !q || it.cmd.toLowerCase().indexOf(q) >= 0 || it.desc.toLowerCase().indexOf(q) >= 0; });
        if (!items.length) return;
        var grp = el('<div class="cmd-group"><h2>' + esc(g.cat) + (g.note ? ' <small>' + esc(g.note) + '</small>' : "") + '</h2><div class="cmd-list"></div></div>');
        var list = grp.querySelector(".cmd-list");
        items.forEach(function (it) {
          shown++;
          var row = el('<div class="cmd-row"><code>' + hi(esc(it.cmd), q) + '</code><p>' + hi(esc(it.desc), q) + '</p><button class="copy-mini" type="button" title="Nusxa olish" aria-label="Nusxa olish">' + iconCopy() + '</button></div>');
          row.querySelector(".copy-mini").addEventListener("click", function (e) { copyText(it.cmd, e.currentTarget); });
          list.appendChild(row);
        });
        main.appendChild(grp);
      });
      if (!shown) main.appendChild(el('<div class="empty">Hech narsa topilmadi. Boshqa so‘z bilan urinib ko‘ring.</div>'));
    }
    function hi(text, q) { if (!q) return text; try { return text.replace(new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig"), "<mark>$1</mark>"); } catch (e) { return text; } }

    cats.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      active = b.dataset.cat;
      cats.querySelectorAll("button").forEach(function (x) { x.classList.toggle("active", x === b); });
      render();
    });
    wrap.querySelector("#cmdSearch").addEventListener("input", function (e) { query = e.target.value.trim(); render(); });
    render();
    return wrap;
  }

  /* ---------- Sahifa: Yangiliklar / saboqlar ---------- */
  function pageNews() {
    var CVE = window.NOTABLE_CVE || [], TL = window.TIMELINE || [], SRC = window.NEWS_SOURCES || [];
    var wrap = el('<div class="page"><div class="wrap"><div class="page-head"><span class="eyebrow">Yangiliklar va tahlil</span><h1>Hodisalar va saboqlar</h1><p>Kiberxavfsizlik tarixidagi muhim hodisalar va ulardan olinadigan amaliy saboqlar. Jonli yangiliklarni o‘ng tomondagi rasmiy manbalardan kuzating.</p></div>' +
      '<div class="news-layout"><div id="newsMain"></div><aside id="newsSide"></aside></div></div></div>');
    var mainCol = wrap.querySelector("#newsMain");
    var side = wrap.querySelector("#newsSide");

    var tl = el('<div><h2 style="font-size:22px;margin-bottom:18px">Muhim hodisalar tarixi</h2><div class="timeline"></div></div>');
    var line = tl.querySelector(".timeline");
    TL.forEach(function (t) {
      line.appendChild(el('<div class="tl-item"><time>' + esc(t.date) + '</time><h3>' + esc(t.title) + '</h3><p>' + esc(t.text) + '</p><p class="lesson-line">💡 ' + esc(t.lesson) + '</p></div>'));
    });
    mainCol.appendChild(tl);

    var cveBlock = el('<div class="panel side-block"><h3>Mashhur CVE lar</h3></div>');
    CVE.forEach(function (c) {
      cveBlock.appendChild(el('<div class="kev-item"><b>' + esc(c.id) + ' · ' + esc(c.name) + '</b><span>' + esc(c.sev) + ' — ' + esc(c.note) + '</span></div>'));
    });
    side.appendChild(cveBlock);

    var srcBlock = el('<div class="panel side-block"><h3>Jonli manbalar</h3><div class="source-list"></div></div>');
    var sl = srcBlock.querySelector(".source-list");
    SRC.forEach(function (s) { sl.appendChild(el('<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + ' ↗</a>')); });
    side.appendChild(srcBlock);
    return wrap;
  }

  /* ---------- Sahifa: AI ---------- */
  function pageAI() {
    var D = window.AI_DEFENCE || [], T = window.AI_THREATS || [], R = window.AI_LLM_RISKS || [], PR = window.AI_PROMPT_DEMO || [], P = window.AI_PRINCIPLES || [];
    var wrap = el('<div class="page"><div class="wrap"></div></div>');
    var c = wrap.querySelector(".wrap");
    c.appendChild(el('<div class="ai-hero"><div><span class="eyebrow">Sun’iy intellekt</span><h1 class="page-head" style="margin:8px 0 12px">AI va kiberxavfsizlik</h1><p class="muted" style="font-size:17px;max-width:60ch">' + esc(window.AI_INTRO || "") + '</p></div>' +
      '<div class="panel" style="padding:22px"><div class="prompt-demo">' + PR.map(function (p) {
        return '<div style="margin-bottom:10px"><span class="role">' + esc(p.role) + '</span> ' + esc(p.text) + (p.evil ? ' <span class="evil">' + esc(p.evil) + '</span>' : "") + "</div>";
      }).join("") + '</div></div></div>'));

    var def = el('<section class="section" style="padding-top:24px"><h2 style="font-size:24px;margin-bottom:16px">Himoyada AI</h2><div class="ai-card-grid"></div></section>');
    var dg = def.querySelector(".ai-card-grid");
    D.forEach(function (x) { dg.appendChild(el('<div class="panel ai-card"><h3>' + esc(x.h) + '</h3><p>' + esc(x.p) + '</p></div>')); });
    c.appendChild(def);

    var thr = el('<section class="section" style="padding-top:8px"><h2 style="font-size:24px;margin-bottom:16px">Yangi tahdidlar</h2><div class="ai-card-grid"></div></section>');
    var tg = thr.querySelector(".ai-card-grid");
    T.forEach(function (x) { tg.appendChild(el('<div class="panel ai-card"><h3>' + esc(x.h) + '</h3><p>' + esc(x.p) + '</p></div>')); });
    c.appendChild(thr);

    var risk = el('<section class="section" style="padding-top:8px"><h2 style="font-size:24px;margin-bottom:6px">LLM ilovalari xavflari</h2><p class="muted" style="margin-bottom:16px">OWASP Top 10 for LLM asosida — chatbot yoki AI agent quruvchilar uchun.</p><div class="llm-top"></div></section>');
    var rg = risk.querySelector(".llm-top");
    R.forEach(function (x) {
      rg.appendChild(el('<div class="panel llm-item"><span class="id">' + esc(x.id) + '</span><div><h3>' + esc(x.h) + '</h3><p>' + esc(x.p) + '</p><p><strong>Himoya:</strong> ' + esc(x.fix) + '</p></div></div>'));
    });
    c.appendChild(risk);

    var pr = el('<section class="section" style="padding-top:8px"><div class="panel" style="padding:24px"><h2 style="font-size:22px;margin-bottom:14px">Amaliy tamoyillar</h2><ul class="prose" style="padding-left:20px;display:grid;gap:8px"></ul></div></section>');
    var ul = pr.querySelector("ul");
    P.forEach(function (x) { ul.appendChild(el("<li>" + esc(x) + "</li>")); });
    c.appendChild(pr);
    return wrap;
  }

  /* ---------- Sahifa: Vositalar ---------- */
  function pageTools(sub) {
    var wrap = el('<div class="page"><div class="wrap"><div class="page-head"><span class="eyebrow">Amaliy vositalar</span><h1>Xavfsizlik vositalari</h1><p>Brauzerda, oflayn ishlaydigan o‘quv vositalari. Hech qanday maʼlumot serverga yuborilmaydi — hammasi shu qurilmada hisoblanadi.</p></div>' +
      '<div class="tool-tabs" id="toolTabs"></div><div id="toolBody"></div></div></div>');
    var tabsEl = wrap.querySelector("#toolTabs");
    var bodyEl = wrap.querySelector("#toolBody");
    var tabs = [
      { id: "parol", name: "Parol kuchi", fn: toolPassword },
      { id: "hash", name: "Xesh generatori", fn: toolHash },
      { id: "subnet", name: "Subnet kalkulyatori", fn: toolSubnet },
      { id: "portlar", name: "Portlar maʼlumotnomasi", fn: toolPorts },
      { id: "tekshiruv", name: "Xavfsizlik tekshiruvi", fn: toolChecklist }
    ];
    var cur = tabs.some(function (t) { return t.id === sub; }) ? sub : "parol";
    tabs.forEach(function (t) {
      var b = el('<button class="filter-btn' + (t.id === cur ? " active" : "") + '" data-id="' + t.id + '">' + esc(t.name) + "</button>");
      b.addEventListener("click", function () { location.hash = "#/vositalar/" + t.id; });
      tabsEl.appendChild(b);
    });
    var def = tabs.filter(function (t) { return t.id === cur; })[0];
    bodyEl.appendChild(def.fn());
    return wrap;
  }

  function toolPassword() {
    var panel = el('<div class="panel tool-panel"><h2>Parol kuchini tekshirish</h2><p class="desc">Parol shu qurilmada tahlil qilinadi va hech qayerga yuborilmaydi. Baholash uzunlik va belgilar xilma-xilligiga asoslanadi.</p>' +
      '<div class="field"><label for="pw">Parolni kiriting</label><input class="input" id="pw" type="text" placeholder="masalan: daryo-chiroq-olma-7" autocomplete="off"></div>' +
      '<div class="meter"><i id="pwMeter"></i></div><div id="pwLabel" style="font-weight:600"></div>' +
      '<div class="result-grid"><div class="result"><small>Uzunlik</small><b id="pwLen">0</b></div><div class="result"><small>Belgilar to‘plami</small><b id="pwSpace">0</b></div><div class="result"><small>Kombinatsiyalar</small><b id="pwCombo">0</b></div><div class="result"><small>Taxminiy buzish vaqti</small><b id="pwTime">—</b></div></div>' +
      '<ul class="checklist" id="pwChecks"></ul></div>');
    var inp = panel.querySelector("#pw");
    function calc() {
      var p = inp.value;
      var sets = [[/[a-z]/, 26], [/[A-Z]/, 26], [/[0-9]/, 10], [/[^A-Za-z0-9]/, 33]];
      var space = 0, used = 0;
      sets.forEach(function (s) { if (s[0].test(p)) { space += s[1]; used++; } });
      var len = p.length;
      var bits = len ? len * Math.log2(space || 1) : 0;
      var combos = len ? Math.pow(space || 1, len) : 0;
      var guessesPerSec = 1e10; // zamonaviy GPU, tez xesh taxmini
      var secs = combos / 2 / guessesPerSec;
      panel.querySelector("#pwLen").textContent = len;
      panel.querySelector("#pwSpace").textContent = space;
      panel.querySelector("#pwCombo").textContent = len ? "~" + combos.toExponential(1) : "0";
      panel.querySelector("#pwTime").textContent = len ? humanTime(secs) : "—";
      var score = Math.min(100, Math.round(bits / 90 * 100));
      var m = panel.querySelector("#pwMeter");
      m.style.width = score + "%";
      var label, color;
      if (!len) { label = ""; color = "var(--line)"; }
      else if (bits < 40) { label = "Juda zaif"; color = "var(--bad)"; }
      else if (bits < 60) { label = "Zaif"; color = "var(--warn)"; }
      else if (bits < 80) { label = "O‘rtacha"; color = "#c9a227"; }
      else if (bits < 100) { label = "Kuchli"; color = "var(--ok)"; }
      else { label = "Juda kuchli"; color = "var(--ok)"; }
      m.style.background = color;
      var lab = panel.querySelector("#pwLabel"); lab.textContent = label ? label + " (~" + Math.round(bits) + " bit entropiya)" : ""; lab.style.color = color;
      var checks = [
        { ok: len >= 12, t: "Kamida 12 belgi (16+ tavsiya etiladi)" },
        { ok: used >= 3, t: "Kamida 3 xil belgi turi" },
        { ok: !/(.)\1\1/.test(p), t: "Ketma-ket takrorlanuvchi belgilar yo‘q" },
        { ok: !/^(123456|password|qwerty|admin|parol)/i.test(p), t: "Mashhur paroldan boshlanmaydi" },
        { ok: len >= 16, t: "16+ belgi — passphrase darajasi" }
      ];
      panel.querySelector("#pwChecks").innerHTML = checks.map(function (c) { return '<li class="' + (c.ok ? "ok" : "") + '">' + esc(c.t) + "</li>"; }).join("");
    }
    inp.addEventListener("input", calc);
    setTimeout(function () { inp.value = "daryo-chiroq-olma-7"; calc(); }, 0);
    return panel;
  }

  function toolHash() {
    var panel = el('<div class="panel tool-panel"><h2>Xesh generatori (SHA)</h2><p class="desc">Matndan SHA-256, SHA-1 va SHA-512 xeshini hisoblaydi (brauzerning Web Crypto API orqali). Bitta harf o‘zgarishi butun xeshni o‘zgartirishini kuzating (avalanche effekti).</p>' +
      '<div class="field"><label for="hin">Matn</label><textarea class="textarea" id="hin" placeholder="Matn kiriting...">salom</textarea></div>' +
      '<div class="hash-out"><div class="result"><small>SHA-256</small><b id="h256">—</b></div><div class="result"><small>SHA-1 (parol uchun ishlatmang)</small><b id="h1">—</b></div><div class="result"><small>SHA-512</small><b id="h512">—</b></div></div></div>');
    var inp = panel.querySelector("#hin");
    function toHex(buf) { return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join(""); }
    function run() {
      var txt = inp.value; var enc = new TextEncoder().encode(txt);
      if (!(window.crypto && crypto.subtle)) { panel.querySelector("#h256").textContent = "Web Crypto mavjud emas"; return; }
      [["SHA-256", "#h256"], ["SHA-1", "#h1"], ["SHA-512", "#h512"]].forEach(function (a) {
        crypto.subtle.digest(a[0], enc).then(function (d) { panel.querySelector(a[1]).textContent = toHex(d); });
      });
    }
    inp.addEventListener("input", run); setTimeout(run, 0);
    return panel;
  }

  function toolSubnet() {
    var panel = el('<div class="panel tool-panel"><h2>Subnet kalkulyatori (IPv4)</h2><p class="desc">IP va CIDR prefiksini kiriting — tarmoq manzili, broadcast, xostlar diapazoni va soni hisoblanadi.</p>' +
      '<div class="tool-row"><div class="field"><label for="ip">IP manzil</label><input class="input" id="ip" value="192.168.1.10"></div>' +
      '<div class="field"><label for="cidr">Prefiks (/CIDR)</label><input class="input" id="cidr" type="number" min="0" max="32" value="24"></div></div>' +
      '<div class="result-grid" id="subOut"></div></div>');
    var ipI = panel.querySelector("#ip"), cI = panel.querySelector("#cidr"), out = panel.querySelector("#subOut");
    function calc() {
      var parts = ipI.value.trim().split(".").map(Number);
      var cidr = parseInt(cI.value, 10);
      if (parts.length !== 4 || parts.some(function (n) { return isNaN(n) || n < 0 || n > 255; }) || isNaN(cidr) || cidr < 0 || cidr > 32) {
        out.innerHTML = '<div class="result"><small>Xato</small><b>IP yoki prefiks noto‘g‘ri</b></div>'; return;
      }
      var ipn = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
      var mask = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;
      var net = (ipn & mask) >>> 0, bc = (net | (~mask >>> 0)) >>> 0;
      var hosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : (bc - net - 1);
      function s(x) { return [(x >>> 24) & 255, (x >>> 16) & 255, (x >>> 8) & 255, x & 255].join("."); }
      var rows = [
        ["Tarmoq manzili", s(net)], ["Broadcast", s(bc)],
        ["Maska", s(mask)], ["Wildcard", s(~mask >>> 0)],
        ["Birinchi xost", cidr >= 31 ? s(net) : s(net + 1)],
        ["Oxirgi xost", cidr >= 31 ? s(bc) : s(bc - 1)],
        ["Xostlar soni", hosts.toLocaleString()],
        ["Sinf/turi", (parts[0] === 10 || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) || (parts[0] === 192 && parts[1] === 168)) ? "Xususiy" : "Ommaviy"]
      ];
      out.innerHTML = rows.map(function (r) { return '<div class="result"><small>' + esc(r[0]) + '</small><b>' + esc(r[1]) + "</b></div>"; }).join("");
    }
    ipI.addEventListener("input", calc); cI.addEventListener("input", calc); setTimeout(calc, 0);
    return panel;
  }

  function toolPorts() {
    var ports = [
      ["20-21", "FTP", "Fayl uzatish — shifrlanmagan", 3], ["22", "SSH", "Xavfsiz masofaviy boshqaruv", 1],
      ["23", "Telnet", "Shifrlanmagan — o‘chiring", 3], ["25", "SMTP", "Pochta yuborish", 2],
      ["53", "DNS", "Nom yechish", 2], ["67-68", "DHCP", "IP taqsimlash", 1],
      ["80", "HTTP", "Shifrlanmagan veb", 2], ["110", "POP3", "Pochta olish (eski)", 2],
      ["135-139", "NetBIOS", "Windows tarmoq — internetga ochmang", 3], ["143", "IMAP", "Pochta olish", 2],
      ["443", "HTTPS", "Shifrlangan veb", 1], ["445", "SMB", "Windows fayl almashish — xavfli", 3],
      ["993", "IMAPS", "Shifrlangan IMAP", 1], ["995", "POP3S", "Shifrlangan POP3", 1],
      ["1433", "MSSQL", "Maʼlumotlar bazasi — ichki", 3], ["3306", "MySQL", "Maʼlumotlar bazasi — ichki", 3],
      ["3389", "RDP", "Masofaviy ish stoli — ransomware nishoni", 3], ["5432", "PostgreSQL", "Maʼlumotlar bazasi — ichki", 3],
      ["5900", "VNC", "Masofaviy ekran — parolsiz xavfli", 3], ["6379", "Redis", "Kesh — autentifikatsiyasiz xavfli", 3],
      ["8080", "HTTP-alt", "Proksi / dev server", 2], ["27017", "MongoDB", "Maʼlumotlar bazasi — ichki", 3]
    ];
    var panel = el('<div class="panel tool-panel"><h2>Muhim portlar maʼlumotnomasi</h2><p class="desc">Xavf ustuni: yashil — xavfsiz, sariq — ehtiyot bo‘ling, qizil — internetga ochmang. Qidirish uchun yozing.</p>' +
      '<div class="search-box" style="max-width:100%"><input class="input" id="portQ" type="search" placeholder="Port yoki xizmat nomi..." style="padding-left:12px"></div>' +
      '<div class="table-wrap"><table class="port-table"><thead><tr><th>Port</th><th>Xizmat</th><th>Tavsif</th><th>Xavf</th></tr></thead><tbody id="portBody"></tbody></table></div></div>');
    var body = panel.querySelector("#portBody"), q = panel.querySelector("#portQ");
    function render() {
      var s = q.value.toLowerCase();
      body.innerHTML = ports.filter(function (p) { return !s || p[0].indexOf(s) >= 0 || p[1].toLowerCase().indexOf(s) >= 0 || p[2].toLowerCase().indexOf(s) >= 0; })
        .map(function (p) { return "<tr><td>" + esc(p[0]) + "</td><td>" + esc(p[1]) + "</td><td>" + esc(p[2]) + '</td><td><span class="chip lvl-' + p[3] + '">' + ["", "Xavfsiz", "Ehtiyot", "Yuqori"][p[3]] + "</span></td></tr>"; }).join("") ||
        '<tr><td colspan="4" style="text-align:center;color:var(--muted)">Topilmadi</td></tr>';
    }
    q.addEventListener("input", render); render();
    return panel;
  }

  function toolChecklist() {
    var items = [
      "Barcha akkauntlarda kuchli, noyob parol (parol menejeri)",
      "Muhim akkauntlarda ikki faktorli autentifikatsiya (2FA/MFA) yoqilgan",
      "Operatsion tizim va ilovalar avtomatik yangilanadi",
      "Muhim maʼlumotlarning zaxira nusxasi bor (3-2-1 qoidasi)",
      "Antivirus / Defender yoqilgan va yangilangan",
      "Diskda shifrlash yoqilgan (BitLocker / FileVault / LUKS)",
      "Telefonda ekran qulfi va ilova ruxsatlari tekshirilgan",
      "Fishing belgilarini bilaman va shubhali havolalarni bosmayman",
      "Uy routeri: admin paroli almashtirilgan, WPA2/WPA3 yoqilgan",
      "Jamoat Wi-Fi da VPN yoki faqat HTTPS ishlataman",
      "Email haveibeenpwned.com da tekshirilgan",
      "Muhim akkauntlar uchun tiklash usullari sozlangan"
    ];
    var KEY = "cs_checklist_v1", saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
    var panel = el('<div class="panel tool-panel"><h2>Shaxsiy xavfsizlik tekshiruvi</h2><p class="desc">O‘zingizni tekshiring. Belgilar shu qurilmada saqlanadi.</p><div id="clScore" style="font-weight:700;font-size:20px"></div><div class="meter"><i id="clMeter"></i></div><ul class="checklist" id="clList" style="margin-top:8px"></ul></div>');
    var list = panel.querySelector("#clList");
    function upd() {
      var done = items.filter(function (_, i) { return saved[i]; }).length;
      var pct = Math.round(done / items.length * 100);
      panel.querySelector("#clScore").textContent = done + " / " + items.length + " bajarildi (" + pct + "%)";
      var m = panel.querySelector("#clMeter"); m.style.width = pct + "%"; m.style.background = pct < 40 ? "var(--bad)" : pct < 75 ? "var(--warn)" : "var(--ok)";
    }
    items.forEach(function (t, i) {
      var li = el('<li class="' + (saved[i] ? "ok" : "") + '" style="cursor:pointer">' + esc(t) + "</li>");
      li.addEventListener("click", function () {
        saved[i] = !saved[i]; li.classList.toggle("ok", !!saved[i]);
        try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {} upd();
      });
      list.appendChild(li);
    });
    upd();
    return panel;
  }

  /* ---------- Sahifa: Lug‘at ---------- */
  function pageGlossary() {
    var G = (window.GLOSSARY || []).slice().sort(function (a, b) { return a.term.localeCompare(b.term, "en"); });
    var wrap = el('<div class="page"><div class="wrap"><div class="page-head"><span class="eyebrow">Atamalar</span><h1>Kiberxavfsizlik lug‘ati</h1><p>' + G.length + ' ta asosiy atama — o‘zbekcha izohi va inglizcha atamasi bilan.</p></div>' +
      '<div class="search-box" style="margin-bottom:14px">' + iconSearch() + '<input class="input" id="gq" type="search" placeholder="Atama qidirish..." autocomplete="off"></div>' +
      '<div class="az" id="az"></div><div class="gloss-grid" id="gg"></div></div></div>');
    var letters = {}; G.forEach(function (g) { letters[g.term[0].toUpperCase()] = 1; });
    var azEl = wrap.querySelector("#az"), gg = wrap.querySelector("#gg"), gq = wrap.querySelector("#gq");
    var curL = "all";
    azEl.appendChild(el('<button class="active" data-l="all">Hammasi</button>'));
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function (L) {
      azEl.appendChild(el('<button data-l="' + L + '"' + (letters[L] ? "" : " disabled") + ">" + L + "</button>"));
    });
    function render() {
      var q = gq.value.toLowerCase();
      var items = G.filter(function (g) {
        if (curL !== "all" && g.term[0].toUpperCase() !== curL) return false;
        return !q || g.term.toLowerCase().indexOf(q) >= 0 || (g.en || "").toLowerCase().indexOf(q) >= 0 || g.def.toLowerCase().indexOf(q) >= 0;
      });
      gg.innerHTML = items.map(function (g) { return '<div class="panel gloss"><h3>' + esc(g.term) + (g.en ? " <small>" + esc(g.en) + "</small>" : "") + "</h3><p>" + esc(g.def) + "</p></div>"; }).join("") || '<div class="empty">Topilmadi.</div>';
    }
    azEl.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b || b.disabled) return; curL = b.dataset.l; azEl.querySelectorAll("button").forEach(function (x) { x.classList.toggle("active", x === b); }); render(); });
    gq.addEventListener("input", render); render();
    return wrap;
  }

  /* ---------- Sahifa: Test ---------- */
  function pageQuiz() {
    var Q = window.QUIZ || [];
    var wrap = el('<div class="page"><div class="wrap"><div class="page-head"><span class="eyebrow">O‘zini sinash</span><h1>Bilim testi</h1><p>' + Q.length + ' ta savol. Har javobdan keyin izoh chiqadi. Oxirida natijangizni ko‘rasiz.</p></div><div class="quiz" id="quizBox"></div></div></div>');
    var box = wrap.querySelector("#quizBox");
    var i = 0, score = 0, answered = false, order = Q.map(function (_, k) { return k; });

    function show() {
      answered = false;
      var q = Q[order[i]];
      var card = el('<div class="panel quiz-card"><div class="quiz-top"><span>Savol ' + (i + 1) + " / " + Q.length + '</span><span>Ball: ' + score + '</span></div><h2>' + esc(q.q) + '</h2><div class="options"></div><div id="exp"></div></div>');
      var opts = card.querySelector(".options");
      q.opts.forEach(function (o, k) {
        var b = el('<button class="option" type="button"><span class="letter">' + "ABCD"[k] + '</span><span>' + esc(o) + "</span></button>");
        b.addEventListener("click", function () {
          if (answered) return; answered = true;
          var correct = k === q.a;
          if (correct) score++;
          opts.querySelectorAll(".option").forEach(function (x, xi) {
            x.disabled = true;
            if (xi === q.a) x.classList.add("correct");
            else if (xi === k) x.classList.add("wrong");
          });
          card.querySelector("#exp").appendChild(el('<div class="explain">' + (correct ? "✅ To‘g‘ri! " : "❌ Noto‘g‘ri. ") + esc(q.ex) + '</div>'));
          card.querySelector(".quiz-top").children[1].textContent = "Ball: " + score;
          var nb = el('<button class="btn btn-primary" type="button" style="margin-top:16px">' + (i + 1 < Q.length ? "Keyingi savol →" : "Natijani ko‘rish") + '</button>');
          nb.addEventListener("click", function () { i++; i < Q.length ? show() : result(); });
          card.appendChild(nb);
        });
        opts.appendChild(b);
      });
      box.innerHTML = ""; box.appendChild(card);
    }
    function result() {
      var pct = Math.round(score / Q.length * 100);
      var msg = pct >= 80 ? "Ajoyib! Asoslarni yaxshi o‘zlashtirgansiz." : pct >= 50 ? "Yaxshi boshlanish. Darsliklarni takrorlab, yana urinib ko‘ring." : "Darsliklardan boshlashni tavsiya qilamiz.";
      var color = pct >= 80 ? "var(--ok)" : pct >= 50 ? "var(--warn)" : "var(--bad)";
      var card = el('<div class="panel quiz-card" style="text-align:center"><span class="eyebrow" style="justify-content:center">Natija</span><div class="score-big" style="color:' + color + '">' + pct + '%</div><p style="font-size:18px">' + score + " / " + Q.length + ' to‘g‘ri javob</p><p class="muted">' + esc(msg) + '</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px"><button class="btn btn-primary" id="again" type="button">Qayta boshlash</button><a class="btn" href="#/darsliklar">Darsliklarga o‘tish</a></div></div>');
      card.querySelector("#again").addEventListener("click", function () { i = 0; score = 0; show(); });
      box.innerHTML = ""; box.appendChild(card);
    }
    show();
    return wrap;
  }

  /* ---------- Sahifa: Maqolalar ro‘yxati ---------- */
  function pageArticles() {
    var A = window.ARTICLES || [];
    var wrap = el('<div class="page"><div class="wrap"><div class="page-head"><span class="eyebrow">Bilim bazasi</span><h1>Maqolalar</h1><p>Kiberxavfsizlik, sun’iy intellekt va dasturchilar uchun chuqurroq mavzular. Har biri amaliy misollar bilan.</p></div><div class="lesson-grid" id="artGrid"></div></div></div>');
    var grid = wrap.querySelector("#artGrid");
    A.forEach(function (a) {
      grid.appendChild(el(
        '<a class="lesson-card" href="#/maqolalar/' + a.id + '">' +
        '<div class="meta"><span class="chip accent">' + esc(a.cat) + '</span><span>· ' + a.minutes + ' daq</span></div>' +
        '<h3>' + esc(a.title) + '</h3><p>' + esc(a.summary) + '</p></a>'
      ));
    });
    return wrap;
  }
  function pageArticle(id) {
    var A = window.ARTICLES || [], i = -1;
    for (var k = 0; k < A.length; k++) if (A[k].id === id) { i = k; break; }
    if (i < 0) return pageNotFound();
    var a = A[i];
    var wrap = el('<div class="page"><div class="wrap"><article class="article" style="margin-inline:auto">' +
      '<a class="back" style="display:inline-block;margin-bottom:16px;color:var(--muted);text-decoration:none" href="#/maqolalar">← Barcha maqolalar</a>' +
      '<div class="article-head"><div class="meta"><span class="chip accent">' + esc(a.cat) + '</span><span class="chip">' + a.minutes + ' daqiqa</span><span class="chip">' + esc(a.date) + '</span></div>' +
      '<h1>' + esc(a.title) + '</h1><p class="lead">' + esc(a.summary) + '</p></div>' +
      '<div class="prose">' + a.html + '</div></article></div></div>');
    setTimeout(function () { wireCopyBlocks(wrap); }, 0);
    return wrap;
  }

  /* ---------- Sahifa: Dasturlash tillari ---------- */
  function pageLanguages(sub) {
    var L = window.LANGUAGES || [];
    var wrap = el('<div class="page"><div class="wrap"><div class="page-head"><span class="eyebrow">Dasturchilar uchun</span><h1>Xavfsiz kod: tillar bo‘yicha</h1><p>Har bir tilda eng ko‘p uchraydigan xatolar va ularning xavfsiz muqobili. Xavfli va to‘g‘ri kod yonma-yon.</p></div><div class="tool-tabs" id="langTabs"></div><div id="langBody"></div></div></div>');
    var tabs = wrap.querySelector("#langTabs"), body = wrap.querySelector("#langBody");
    var cur = L.some(function (x) { return x.id === sub; }) ? sub : (L[0] && L[0].id);
    L.forEach(function (x) {
      var b = el('<button class="filter-btn' + (x.id === cur ? " active" : "") + '" data-id="' + x.id + '">' + esc(x.name) + "</button>");
      b.addEventListener("click", function () { location.hash = "#/tillar/" + x.id; });
      tabs.appendChild(b);
    });
    var lang = L.filter(function (x) { return x.id === cur; })[0];
    if (lang) {
      var panel = el('<div></div>');
      panel.appendChild(el('<div class="panel" style="padding:22px;margin-bottom:16px"><h2 style="font-size:22px;margin-bottom:6px">' + esc(lang.name) + ' <small style="font:500 13px/1 var(--f-mono);color:var(--muted)">' + esc(lang.tag) + '</small></h2><p class="muted" style="max-width:75ch">' + esc(lang.intro) + '</p></div>'));
      lang.blocks.forEach(function (bl) {
        var card = el('<div class="panel" style="padding:20px;margin-bottom:14px"><h3 style="font-size:17px;margin-bottom:12px">' + esc(bl.h) + '</h3>' +
          '<div style="display:grid;gap:10px">' +
          '<div><div class="lbl" style="color:var(--bad);font-size:12px;font-weight:700;margin-bottom:4px">✕ XAVFLI</div><div class="codeblock"><pre><code>' + esc(bl.bad) + '</code></pre></div></div>' +
          '<div><div class="lbl" style="color:var(--ok);font-size:12px;font-weight:700;margin-bottom:4px">✓ TO‘G‘RI</div><div class="codeblock"><pre><code>' + esc(bl.good) + '</code></pre></div></div>' +
          '</div>' + (bl.note ? '<p class="muted" style="font-size:14px;margin-top:10px">💡 ' + esc(bl.note) + '</p>' : "") + '</div>');
        panel.appendChild(card);
      });
      if (lang.tools) {
        panel.appendChild(el('<div class="panel" style="padding:20px"><h3 style="font-size:16px;margin-bottom:10px">Foydali vositalar</h3><ul class="checklist">' +
          lang.tools.map(function (t) { return '<li class="ok">' + esc(t) + "</li>"; }).join("") + '</ul></div>'));
      }
      body.appendChild(panel);
    }
    setTimeout(function () { wireCopyBlocks(body); }, 0);
    return wrap;
  }

  function pageNotFound() {
    return el('<div class="page"><div class="wrap"><div class="page-head"><h1>Sahifa topilmadi</h1><p>Bunday sahifa yo‘q. <a href="#/">Bosh sahifaga qaytish</a>.</p></div></div></div>');
  }

  /* ---------- Router ---------- */
  var ROUTES = [
    ["darsliklar", "Darsliklar"], ["buyruqlar", "Buyruqlar"], ["ai", "AI"],
    ["yangiliklar", "Yangiliklar"], ["vositalar", "Vositalar"], ["lugat", "Lug‘at"], ["test", "Test"]
  ];

  function humanTime(secs) {
    if (secs < 1) return "bir zumda";
    var units = [["yil", 31557600], ["kun", 86400], ["soat", 3600], ["daqiqa", 60], ["soniya", 1]];
    if (secs > 31557600 * 1000) {
      var yrs = secs / 31557600;
      if (yrs > 1e12) return "amalda buzib bo‘lmaydi";
      return "~" + yrs.toExponential(1) + " yil";
    }
    for (var k = 0; k < units.length; k++) { if (secs >= units[k][1]) { return "~" + Math.round(secs / units[k][1]) + " " + units[k][0]; } }
    return "bir zumda";
  }

  function setActiveNav(route) {
    document.querySelectorAll(".main-nav a").forEach(function (a) {
      var r = a.getAttribute("href").replace("#/", "").split("/")[0];
      a.setAttribute("aria-current", r === route ? "page" : "false");
    });
  }

  function render() {
    var hash = location.hash.replace(/^#\//, "");
    var seg = hash.split("/").filter(Boolean);
    var route = seg[0] || "";
    var node, title = "CyberShield Akademiya";

    if (!route) { node = pageHome(); }
    else if (route === "darsliklar") { node = seg[1] ? pageLesson(seg[1]) : pageLessons(); title = "Darsliklar — CyberShield"; }
    else if (route === "buyruqlar") { node = pageCommands(); title = "Buyruqlar — CyberShield"; }
    else if (route === "maqolalar") { node = seg[1] ? pageArticle(seg[1]) : pageArticles(); title = "Maqolalar — CyberShield"; }
    else if (route === "tillar") { node = pageLanguages(seg[1]); title = "Dasturlash tillari — CyberShield"; }
    else if (route === "yangiliklar") { node = pageNews(); title = "Yangiliklar — CyberShield"; }
    else if (route === "ai") { node = pageAI(); title = "AI va xavfsizlik — CyberShield"; }
    else if (route === "vositalar") { node = pageTools(seg[1]); title = "Vositalar — CyberShield"; }
    else if (route === "lugat") { node = pageGlossary(); title = "Lug‘at — CyberShield"; }
    else if (route === "test") { node = pageQuiz(); title = "Test — CyberShield"; }
    else { node = pageNotFound(); }

    document.title = title;
    app.innerHTML = ""; app.appendChild(node);
    setActiveNav(route);
    setTimeout(function () { wireCopyBlocks(app); }, 0);

    // Ichki bo‘lim havolasiga o‘tish yoki tepaga
    if (seg[0] === "darsliklar" && seg[1] && location.hash.indexOf("#", 1) === -1) window.scrollTo(0, 0);
    else if (!/^#[a-z]/i.test(location.hash) || location.hash.indexOf("/") >= 0) window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", function (e) {
    // Dars ichidagi ankryut (#bo‘lim) uchun sahifani qayta chizmaslik
    var oldP = (e.oldURL || "").split("#/")[1] || "";
    var newP = location.hash.replace(/^#\//, "");
    render();
  });

  /* Global qidiruv indeksi */
  window.SEARCH_INDEX = buildSearchIndex();
  function buildSearchIndex() {
    var idx = [];
    LESSONS.forEach(function (l) { idx.push({ kind: "Dars", title: l.title, sub: l.summary, href: "#/darsliklar/" + l.id }); });
    (window.ARTICLES || []).forEach(function (a) { idx.push({ kind: "Maqola", title: a.title, sub: a.summary, href: "#/maqolalar/" + a.id }); });
    (window.LANGUAGES || []).forEach(function (x) { idx.push({ kind: "Til", title: x.name + " — xavfsiz kod", sub: x.tag, href: "#/tillar/" + x.id }); });
    (window.GLOSSARY || []).forEach(function (g) { idx.push({ kind: "Atama", title: g.term, sub: g.def, href: "#/lugat" }); });
    (window.COMMANDS || []).forEach(function (g) { g.items.forEach(function (it) { idx.push({ kind: "Buyruq", title: it.cmd, sub: it.desc, href: "#/buyruqlar" }); }); });
    [["Buyruqlar bazasi", "#/buyruqlar"], ["Parol kuchi", "#/vositalar/parol"], ["Xesh generatori", "#/vositalar/hash"], ["Subnet kalkulyatori", "#/vositalar/subnet"], ["Portlar maʼlumotnomasi", "#/vositalar/portlar"], ["Xavfsizlik tekshiruvi", "#/vositalar/tekshiruv"], ["AI va xavfsizlik", "#/ai"], ["Yangiliklar", "#/yangiliklar"], ["Bilim testi", "#/test"]].forEach(function (p) { idx.push({ kind: "Sahifa", title: p[0], sub: "", href: p[1] }); });
    return idx;
  }
  window.CS_render = render;
  render();
})();
