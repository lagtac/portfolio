/* Site behaviour: theme, navigation, reveal, contents rail, lightbox. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ----------------------------------------------------------------------
     Theme: light -> dark -> system
     ---------------------------------------------------------------------- */

  var toggle = document.querySelector(".theme-toggle");

  function resolvedTheme(pref) {
    return pref === "dark" || (pref === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light";
  }

  function nextPref(pref) {
    if (pref === "system") return resolvedTheme("system") === "dark" ? "light" : "dark";
    return pref === "dark" ? "light" : "system";
  }

  function applyTheme(pref) {
    root.dataset.themePref = pref;
    root.dataset.theme = resolvedTheme(pref);
    if (toggle) {
      toggle.setAttribute("aria-label", "Theme: " + pref + ". Switch to " + nextPref(pref) + ".");
      toggle.setAttribute("title", "Theme: " + pref);
    }
  }

  if (toggle) {
    var current = root.dataset.themePref || "system";
    applyTheme(current);
    toggle.addEventListener("click", function () {
      var pref = root.dataset.themePref || "system";
      var next = nextPref(pref);
      try {
        localStorage.setItem("dc-theme", next);
      } catch (e) {}
      applyTheme(next);
    });
  }

  var media = window.matchMedia("(prefers-color-scheme: dark)");
  var onSchemeChange = function () {
    if ((root.dataset.themePref || "system") === "system") applyTheme("system");
  };
  if (media.addEventListener) media.addEventListener("change", onSchemeChange);
  else if (media.addListener) media.addListener(onSchemeChange);

  /* ----------------------------------------------------------------------
     Mobile navigation
     ---------------------------------------------------------------------- */

  var masthead = document.querySelector(".masthead");
  var navToggle = document.querySelector(".nav-toggle");

  function setMenu(open) {
    if (!masthead || !navToggle) return;
    masthead.dataset.open = open ? "true" : "false";
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setMenu(masthead.dataset.open !== "true");
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });

    document.addEventListener("click", function (event) {
      if (masthead.dataset.open !== "true") return;
      if (!masthead.contains(event.target)) setMenu(false);
    });

    document.querySelectorAll("#site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) setMenu(false);
    });
  }

  /* ----------------------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------------------- */

  var revealItems = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  if (revealItems.length) {
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (el) {
        el.classList.add("is-in");
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );
      revealItems.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ----------------------------------------------------------------------
     Contents rail
     ---------------------------------------------------------------------- */

  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));

  if (tocLinks.length && "IntersectionObserver" in window) {
    var sections = tocLinks
      .map(function (link) {
        return document.getElementById(link.getAttribute("href").slice(1));
      })
      .filter(Boolean);

    var tocObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          tocLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-12% 0px -72% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      tocObserver.observe(section);
    });
  }

  /* ----------------------------------------------------------------------
     Lightbox
     ---------------------------------------------------------------------- */

  var dialog = document.getElementById("lightbox");

  if (dialog && typeof dialog.showModal === "function") {
    var dialogImg = dialog.querySelector("[data-lightbox-img]");
    var dialogCap = dialog.querySelector("[data-lightbox-cap]");
    var lastTrigger = null;

    document.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-zoom]");
      if (!trigger) return;
      event.preventDefault();
      lastTrigger = trigger;
      dialogImg.src = trigger.getAttribute("data-zoom");
      dialogImg.alt = trigger.getAttribute("data-alt") || "";
      dialogCap.textContent = trigger.getAttribute("data-cap") || "";
      dialog.showModal();
    });

    var closeButton = dialog.querySelector(".lightbox__close");
    if (closeButton) {
      closeButton.addEventListener("click", function () {
        dialog.close();
      });
    }

    dialog.addEventListener("close", function () {
      if (lastTrigger) lastTrigger.focus();
      dialogImg.removeAttribute("src");
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  }

  /* ----------------------------------------------------------------------
     Footer year
     ---------------------------------------------------------------------- */

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
