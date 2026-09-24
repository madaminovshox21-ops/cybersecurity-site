/* SVG ikonkalar — app.js tomonidan ishlatiladi (global funksiyalar). */
(function () {
  function svg(inner) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>";
  }
  window.iconBook = function () { return svg('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>'); };
  window.iconTerminal = function () { return svg('<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>'); };
  window.iconTools = function () { return svg('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2 2.6-2.6Z"/>'); };
  window.iconChip = function () { return svg('<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2"/>'); };
  window.iconNews = function () { return svg('<path d="M4 4h13a1 1 0 0 1 1 1v14a2 2 0 0 0 2-2V8"/><path d="M4 4a1 1 0 0 0-1 1v13a2 2 0 0 0 2 2h13"/><path d="M8 8h6M8 12h6M8 16h4"/>'); };
  window.iconQuiz = function () { return svg('<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4"/><path d="M12 17h.01"/>'); };
  window.iconCheck = function () { return svg('<path d="m5 12 5 5L20 7"/>'); };
  window.iconSearch = function () { return svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'); };
  window.iconCopy = function () { return svg('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>'); };
})();
