/* ============================================================================
   신민근 포트폴리오 — 동작
   ----------------------------------------------------------------------------
   1. 스크롤에 따라 내용이 한 번씩 드러남
   2. 헤더에서 지금 보고 있는 섹션 표시
   자바스크립트가 꺼져 있으면 모든 내용이 처음부터 그대로 보인다.
   (숨김 상태는 <html class="js"> 가 붙었을 때만 적용된다)
   ========================================================================== */

(function () {
  "use strict";

  // 이 파일이 실제로 로드됐다는 표시. head 의 안전장치가 이 값을 확인한다.
  window.__revealReady = true;

  var reduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --------------------------------------------- 1. 스크롤 등장 */

  var targets = Array.prototype.slice.call(
    document.querySelectorAll("[data-reveal]")
  );

  function showAll() {
    targets.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  if (reduced || !("IntersectionObserver" in window) || !targets.length) {
    showAll();
  } else {
    var revealer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          // 같은 줄에 있는 항목들이 차례로 들어오도록 아주 짧은 시차만 준다
          var delay = Number(entry.target.getAttribute("data-reveal-delay")) || 0;
          if (delay) {
            entry.target.style.transitionDelay = delay + "ms";
          }
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    targets.forEach(function (el) {
      revealer.observe(el);
    });

    // 스크롤 없이 접속을 끝내는 경우를 대비한 안전장치
    window.setTimeout(showAll, 4000);
  }

  /* ------------------------------------- 2. 지금 보고 있는 섹션 표시 */

  var links = Array.prototype.slice.call(
    document.querySelectorAll(".header__link")
  );

  var sections = links
    .map(function (link) {
      var href = link.getAttribute("href");
      return href && href.charAt(0) === "#" ? document.querySelector(href) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var ratios = {};

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          ratios[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        var best = null;
        var bestRatio = 0;
        Object.keys(ratios).forEach(function (id) {
          if (ratios[id] > bestRatio) {
            bestRatio = ratios[id];
            best = id;
          }
        });

        links.forEach(function (link) {
          if (best && link.getAttribute("href") === "#" + best) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      },
      {
        rootMargin: "-56px 0px -50% 0px",
        threshold: [0, 0.12, 0.3, 0.6, 1]
      }
    );

    sections.forEach(function (section) {
      spy.observe(section);
    });
  }
})();
