/* ============================================================================
   신민근 포트폴리오 — 동작
   ----------------------------------------------------------------------------
   1. 상단 앱 바의 스크롤 경계선
   2. 현재 읽고 있는 섹션 표시
   3. 밝은 화면 / 어두운 화면 전환
   자바스크립트가 꺼져 있어도 페이지 내용은 모두 보인다.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------ 1. 앱 바 경계선 */

  var appbar = document.getElementById("appbar");

  function syncAppbar() {
    if (!appbar) return;
    appbar.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
  }

  /* --------------------------------------- 2. 현재 섹션 표시 (스크롤 스파이) */

  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".appbar__link")
  );

  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function setCurrent(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === "#" + id) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var visible = new Map();

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        var best = null;
        var bestRatio = 0;
        visible.forEach(function (ratio, id) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });

        if (best) setCurrent(best);
      },
      {
        // 앱 바 높이만큼 위를 잘라내고, 화면 아래쪽 절반은 판정에서 제외한다
        rootMargin: "-72px 0px -45% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 1]
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------------- 3. 화면 밝기 전환 */

  var STORAGE_KEY = "portfolio-theme";
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function currentTheme() {
    return root.getAttribute("data-theme") || (systemPrefersDark() ? "dark" : "light");
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "밝은 화면으로 전환" : "어두운 화면으로 전환"
      );
    }
  }

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") applyTheme(saved);
  } catch (err) {
    /* 저장소를 못 쓰는 환경에서는 시스템 설정을 그대로 따른다 */
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (err) {
        /* 저장 실패는 무시한다 */
      }
    });
  }

  /* ------------------------------------------------------- 스크롤 연결 */

  var ticking = false;

  window.addEventListener(
    "scroll",
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        syncAppbar();
        ticking = false;
      });
    },
    { passive: true }
  );

  syncAppbar();
})();
