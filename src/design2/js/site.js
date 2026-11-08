(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var canAnimate = !reduceMotion.matches;
  var lenis = null;
  var ticker = null;

  function initNav() {
    var head = document.querySelector(".site-head");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!head || !toggle || !nav) return;

    function setOpen(open) {
      head.dataset.open = open ? "true" : "false";
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", function () {
      setOpen(head.dataset.open !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && head.dataset.open === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (head.dataset.open === "true" && !head.contains(event.target)) {
        setOpen(false);
      }
    });

    window.matchMedia("(min-width: 901px)").addEventListener("change", function (event) {
      if (event.matches) setOpen(false);
    });
  }

  function splitHeading(el) {
    if (el.dataset.splitReady === "true") return [];
    var text = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (!text) return [];

    el.setAttribute("aria-label", text);
    var frag = document.createDocumentFragment();
    var words = text.split(" ");

    words.forEach(function (word, index) {
      var outer = document.createElement("span");
      var inner = document.createElement("span");
      outer.className = "word";
      outer.setAttribute("aria-hidden", "true");
      inner.className = "word__in";
      inner.textContent = word;
      outer.appendChild(inner);
      frag.appendChild(outer);
      if (index < words.length - 1) frag.appendChild(document.createTextNode(" "));
    });

    el.textContent = "";
    el.appendChild(frag);
    el.dataset.splitReady = "true";
    return Array.prototype.slice.call(el.querySelectorAll(".word__in"));
  }

  function startScroll() {
    if (!window.Lenis) return;
    lenis = new window.Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.4
    });

    lenis.on("scroll", window.ScrollTrigger.update);

    ticker = function (time) {
      lenis.raf(time * 1000);
    };

    window.gsap.ticker.add(ticker);
    window.gsap.ticker.lagSmoothing(0);
  }

  function playIntro() {
    var tl = window.gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    tl.from(".hero__eyebrow", { y: 10, duration: 0.55 })
      .from(
        ".hero .line .line__inner",
        { yPercent: 112, duration: 0.95, stagger: 0.075 },
        "-=0.25"
      )
      .from(".hero__lead", { y: 16, duration: 0.6 }, "-=0.45")
      .from(
        ".hero__actions .btn",
        { y: 10, duration: 0.5, stagger: 0.07 },
        "-=0.35"
      )
      .from(".specimen", { y: 24, duration: 0.85 }, "-=0.75")
      .from(
        ".tick",
        { scale: 0.45, duration: 0.4, stagger: 0.05 },
        "-=0.45"
      )
      .from(
        ".callout",
        { y: 5, duration: 0.4, stagger: 0.1 },
        "-=0.25"
      )
      .from(
        ".data-strip > div",
        { y: 12, duration: 0.5, stagger: 0.055 },
        "-=0.35"
      );
  }

  function initMotion() {
    if (!canAnimate || !window.gsap || !window.ScrollTrigger) return;

    window.gsap.registerPlugin(window.ScrollTrigger);

    if (document.querySelector(".hero")) {
      playIntro();
    }

    window.gsap.utils.toArray("[data-split]").forEach(function (heading) {
      var words = splitHeading(heading);
      if (!words.length) return;
      window.gsap.from(words, {
        yPercent: 112,
        duration: 0.85,
        stagger: 0.035,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 86%",
          once: true
        }
      });
    });

    window.gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      window.gsap.from(el, {
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true
        }
      });
    });

    var chart = document.querySelector(".confidence");
    if (chart) {
      window.gsap.from(".conf__bar", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.8,
        stagger: 0.045,
        ease: "power2.out",
        scrollTrigger: {
          trigger: chart,
          start: "top 88%",
          once: true
        }
      });
    }

    startScroll();

    window.addEventListener("load", function () {
      window.ScrollTrigger.refresh();
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        window.ScrollTrigger.refresh();
      });
    }

    reduceMotion.addEventListener("change", function (event) {
      if (event.matches) {
        window.ScrollTrigger.getAll().forEach(function (trigger) {
          trigger.kill();
        });
        window.gsap.set(
          "[data-reveal], .hero .line .line__inner, .specimen, .tick, .callout, .data-strip > div, .conf__bar, [data-split] .word__in",
          { clearProps: "all" }
        );
        if (lenis) {
          lenis.destroy();
          lenis = null;
        }
        if (ticker) {
          window.gsap.ticker.remove(ticker);
          ticker = null;
        }
      }
    });
  }

  window.addEventListener("pagehide", function () {
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
    if (ticker && window.gsap) {
      window.gsap.ticker.remove(ticker);
      ticker = null;
    }
    if (window.ScrollTrigger) {
      window.ScrollTrigger.getAll().forEach(function (trigger) {
        trigger.kill();
      });
    }
  });

  function boot() {
    window.__siteReady = true;
    initNav();
    initMotion();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
