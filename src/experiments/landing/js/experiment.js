/* Landing experiment — chrome + motion.
   Content is complete without this file; every animation starts from
   an element's existing rendered state, set here at runtime. */

(() => {
	var doc = document;
	var root = doc.documentElement;
	var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	/* ------------------------------------------------------------ theme -- */

	var themeToggle = doc.querySelector(".theme-toggle");
	if (themeToggle) {
		themeToggle.setAttribute(
			"aria-label",
			root.dataset.theme === "dark"
				? "Switch to light theme"
				: "Switch to dark theme",
		);
		themeToggle.addEventListener("click", () => {
			var next = root.dataset.theme === "dark" ? "light" : "dark";
			root.dataset.theme = next;
			root.dataset.themePref = next;
			try {
				localStorage.setItem("dc-theme", next);
			} catch (_e) {}
			var dark = next === "dark";
			themeToggle.setAttribute(
				"aria-label",
				dark ? "Switch to light theme" : "Switch to dark theme",
			);
			if (window.ScrollTrigger) window.ScrollTrigger.refresh();
		});
	}

	/* --------------------------------------------------------------- nav -- */

	var navToggle = doc.querySelector(".nav-toggle");
	var nav = doc.getElementById("site-nav");

	function setNav(open) {
		if (!navToggle || !nav) return;
		navToggle.setAttribute("aria-expanded", String(open));
		navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
		nav.dataset.open = String(open);
	}

	if (navToggle && nav) {
		navToggle.addEventListener("click", () => {
			setNav(navToggle.getAttribute("aria-expanded") !== "true");
		});
		nav.addEventListener("click", (event) => {
			if (event.target.closest("a")) setNav(false);
		});
		doc.addEventListener("keydown", (event) => {
			if (
				event.key !== "Escape" ||
				navToggle.getAttribute("aria-expanded") !== "true"
			)
				return;
			/* Closing sets visibility:hidden on the drawer. If focus is inside it,
         the browser drops focus to <body> and the next Tab restarts at the top
         of the page, so hand it back to the toggle. */
			var restore = nav.contains(doc.activeElement);
			setNav(false);
			if (restore) navToggle.focus();
		});
		window.addEventListener("resize", () => {
			if (window.innerWidth > 760) setNav(false);
		});
	}

	/* -------------------------------------------------------------- year -- */

	var year = doc.getElementById("year");
	if (year) year.textContent = String(new Date().getFullYear());

	/* ------------------------------------------------------ scroll regions -- */

	/* A horizontally scrollable box is only a keyboard stop when it actually
     overflows; otherwise it is a tab stop that does nothing. The markup ships
     tabindex="0" so the no-JS page stays scrollable. */
	var scrollers = doc.querySelectorAll(".schematic__scroll, .table-scroll");

	function syncScrollers() {
		Array.prototype.forEach.call(scrollers, (el) => {
			if (el.scrollWidth > el.clientWidth + 1) el.setAttribute("tabindex", "0");
			else el.removeAttribute("tabindex");
		});
	}

	if (scrollers.length) {
		syncScrollers();
		window.addEventListener("resize", syncScrollers);
		if (doc.fonts?.ready) doc.fonts.ready.then(syncScrollers);
	}

	/* ---------------------------------------------------- motion system -- */

	var hasGsap = typeof window.gsap !== "undefined";
	var hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
	var motionOK = hasGsap && !reduceMotion.matches;

	if (!motionOK) return;

	var gsap = window.gsap;
	if (hasScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

	/* Entrances use a strong ease-out: expo.out is the GSAP curve that matches
     cubic-bezier(0.23, 1, 0.32, 1). Things that travel across the schematic
     use power2.inOut, because they move on screen rather than arrive. */
	var EASE_ENTER = "expo.out";
	var EASE_MOVE = "power2.inOut";
	var REVEAL_START = "top 88%";

	var introTl = null;
	var drawTl = null;
	var flowTl = null;
	var schematicIO = null;
	var signalInView = false;
	var signalDrawn = false;

	/* Split headings into words, each in a clipping mask, keeping one
     unsplit accessible name on the heading itself. */
	function splitWords(el) {
		var text = el.textContent.trim().replace(/\s+/g, " ");
		el.setAttribute("aria-label", text);
		var frag = doc.createDocumentFragment();
		text.split(" ").forEach((word, i, all) => {
			var mask = doc.createElement("span");
			mask.className = "w-mask";
			mask.setAttribute("aria-hidden", "true");
			var span = doc.createElement("span");
			span.className = "w";
			span.textContent = word;
			mask.appendChild(span);
			frag.appendChild(mask);
			if (i < all.length - 1) frag.appendChild(doc.createTextNode(" "));
		});
		el.textContent = "";
		el.appendChild(frag);
		return el.querySelectorAll(".w");
	}

	/* ------------------------------------------------------- intro scene -- */

	var heroTitle = doc.querySelector(".hero__title[data-split]");
	var heroWords = heroTitle ? splitWords(heroTitle) : [];

	introTl = gsap
		.timeline({ defaults: { ease: EASE_ENTER } })
		.from(".hero .eyebrow", { y: 12, opacity: 0, duration: 0.45 })
		.from(heroWords, { yPercent: 120, duration: 0.7, stagger: 0.03 }, "-=0.22")
		.from(".hero__lead", { y: 14, opacity: 0, duration: 0.5 }, "-=0.4")
		.from(
			".hero__actions .btn",
			{ y: 14, opacity: 0, duration: 0.4, stagger: 0.06 },
			"-=0.32",
		);

	/* ------------------------------------------------------- schematic -- */

	/* The schematic is below the fold on every common viewport, so the drafting
     sequence is its own scroll-gated scene: marks, parts, contracts, rail. */
	var schematic = doc.querySelector(".schematic");

	if (schematic && hasScrollTrigger) {
		const pipes = gsap.utils.toArray(".sch-pipe__base, .sch-pipe__head");
		pipes.forEach((line) => {
			var length = 0;
			try {
				length = line.getTotalLength();
			} catch (_e) {
				length = 0;
			}
			if (length)
				gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
		});

		/* GSAP parses the group's transform attribute, so `y` is absolute here.
       Read the base value and lift by 10 so the boxes rise into place. */
		const nodes = gsap.utils.toArray(".sch-node");
		const nodeFrom = nodes.map((node) => {
			var base = parseFloat(gsap.getProperty(node, "y"));
			return Number.isNaN(base) ? 0 : base - 10;
		});

		drawTl = gsap.timeline({
			defaults: { ease: EASE_ENTER },
			scrollTrigger: { trigger: schematic, start: "top 78%", once: true },
			onComplete: () => {
				signalDrawn = true;
				maybePlaySignal();
			},
		});

		drawTl
			.from(".sch-reg path", { opacity: 0, duration: 0.35, stagger: 0.04 }, 0)
			.from(
				nodes,
				{
					opacity: 0,
					y: (i) => nodeFrom[i],
					duration: 0.5,
					stagger: 0.1,
				},
				0.1,
			)
			.to(
				pipes,
				{ strokeDashoffset: 0, duration: 0.45, stagger: 0.1, ease: EASE_MOVE },
				0.55,
			)
			.from(
				".sch-pipe__label",
				{ opacity: 0, duration: 0.3, stagger: 0.08 },
				0.8,
			)
			.from(
				".sch-tick",
				{
					attr: { y2: 220 },
					duration: 0.35,
					stagger: 0.08,
					ease: "power2.out",
				},
				1,
			)
			.from(
				".sch-rail__box",
				{ attr: { width: 0 }, duration: 0.5, ease: EASE_MOVE },
				1.05,
			)
			.from(
				".sch-rail__index, .sch-rail__name, .sch-rail__role",
				{ opacity: 0, y: 6, duration: 0.35, stagger: 0.06 },
				1.35,
			)
			.from(".schematic__cap", { opacity: 0, y: 8, duration: 0.35 }, 1.5);

		/* The signal: dashes travel along both pipes while dots run down to Meta.
       One timeline owns both properties, one loop, so nothing stalls or jumps.
       Two passes, not an endless loop: auto-starting movement that never stops
       needs a pause control (2.2.2), and four seconds stays under the limit. */
		const dots = gsap.utils.toArray(".sch-flow-dot");
		gsap.set(dots, { opacity: 0 });

		flowTl = gsap.timeline({ paused: true, repeat: 1 });
		flowTl
			.fromTo(
				dots,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.18, stagger: 0.3, ease: "power2.out" },
				0,
			)
			.to(
				dots,
				{ attr: { cy: 330 }, duration: 1.4, ease: "none", stagger: 0.3 },
				0,
			)
			.to(
				dots,
				{ opacity: 0, duration: 0.3, ease: "power2.in", stagger: 0.3 },
				1.1,
			)
			.to(
				".sch-pipe__flow",
				{ strokeDashoffset: -72, duration: 2, ease: "none" },
				0,
			);

		/* Pause offscreen and when the tab is hidden; resume only when both allow. */
		schematicIO = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					signalInView = entry.isIntersecting;
					if (signalInView) maybePlaySignal();
					else if (flowTl) flowTl.pause();
				});
			},
			{ threshold: 0.15 },
		);
		schematicIO.observe(schematic);

		doc.addEventListener("visibilitychange", () => {
			if (doc.hidden) {
				if (flowTl) flowTl.pause();
			} else {
				maybePlaySignal();
			}
		});
	}

	function maybePlaySignal() {
		if (!flowTl || doc.hidden || !signalInView || !signalDrawn) return;
		flowTl.play();
	}

	/* --------------------------------------------------- scroll reveals -- */

	if (hasScrollTrigger) {
		const _ScrollTrigger = window.ScrollTrigger;

		function reveal(targets, opts) {
			opts = opts || {};
			/* Opacity, never autoAlpha: autoAlpha adds visibility:hidden, which
         removes the target and every link inside it from the tab order and
         the accessibility tree until it scrolls into view. */
			gsap.from(targets, {
				y: opts.y === undefined ? 16 : opts.y,
				opacity: 0,
				duration: opts.duration || 0.5,
				stagger: opts.stagger || 0,
				ease: EASE_ENTER,
				scrollTrigger: {
					trigger: opts.trigger,
					start: opts.start || REVEAL_START,
					once: true,
				},
			});
		}

		/* Headings: masked word entrance, same treatment as the hero. */
		gsap.utils.toArray("[data-split]").forEach((el) => {
			if (el === heroTitle) return;
			gsap.from(splitWords(el), {
				yPercent: 120,
				duration: 0.65,
				stagger: 0.035,
				ease: EASE_ENTER,
				scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
			});
		});

		gsap.utils
			.toArray(".section-head__note, .section-head .eyebrow")
			.forEach((el) => {
				reveal(el, { trigger: el, y: 12, duration: 0.45 });
			});

		/* Rows and grids enter as one group with a short stagger, so a row of
       cards reads as one movement instead of four simultaneous pops. */
		const groups = [
			{
				target: "#work .work-card",
				trigger: ".work-card",
				y: 18,
				duration: 0.55,
			},
			{
				target: "#method .method__item",
				trigger: ".method",
				stagger: 0.07,
				y: 18,
				duration: 0.55,
			},
			{ target: ".verdicts .verdict", trigger: ".verdicts", stagger: 0.06 },
			{ target: ".metrics .metric", trigger: ".metrics", stagger: 0.06 },
			{
				target: ".table-scroll",
				trigger: ".table-scroll",
				y: 18,
				duration: 0.55,
			},
			{
				target: ".figure--wide",
				trigger: ".figure--wide",
				y: 18,
				duration: 0.55,
			},
		];
		groups.forEach((g) => {
			reveal(g.target, g);
		});

		/* Contact: the heading is already handled by the word split above, so the
       eyebrow and the right column carry the rest. One system per element. */
		reveal(".contact .eyebrow", {
			trigger: ".contact",
			start: "top 80%",
			y: 12,
			duration: 0.45,
		});
		reveal(".contact__right", {
			trigger: ".contact",
			start: "top 80%",
			y: 18,
			duration: 0.55,
		});

		/* Counters tick up, but the final number is already in the HTML and a
       number the visitor can already read is never replaced with 0. */
		gsap.utils.toArray("[data-count]").forEach((el) => {
			var target = parseInt(el.getAttribute("data-count"), 10);
			if (Number.isNaN(target)) return;
			if (el.getBoundingClientRect().top < window.innerHeight) return;
			var state = { value: 0 };
			el.textContent = "0";
			gsap.to(state, {
				value: target,
				duration: String(target).length > 2 ? 1.1 : 0.6,
				ease: "power2.out",
				snap: { value: 1 },
				scrollTrigger: { trigger: el, start: "top 92%", once: true },
				onUpdate: () => {
					el.textContent = Math.round(state.value).toLocaleString("en-US");
				},
				onComplete: () => {
					el.textContent = target.toLocaleString("en-US");
				},
			});
		});
	}

	/* ------------------------------------------------ smooth scroll -- */

	var lenis = null;
	var tickLenis = null;

	if (typeof window.Lenis !== "undefined" && hasScrollTrigger) {
		lenis = new window.Lenis({
			duration: 1.1,
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 1.6,
		});

		lenis.on("scroll", window.ScrollTrigger.update);

		tickLenis = (time) => {
			lenis.raf(time * 1000);
		};
		gsap.ticker.add(tickLenis);
		gsap.ticker.lagSmoothing(0);

		doc.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			/* The skip link must move focus, not just scroll. Leave it native. */
			if (anchor.classList.contains("skip")) return;
			anchor.addEventListener("click", (event) => {
				var id = anchor.getAttribute("href");
				if (!id || id === "#") return;
				var target = doc.querySelector(id);
				if (!target) return;
				event.preventDefault();
				lenis.scrollTo(target, { offset: -72 });
				/* Cancelling the native jump also cancels its focus handover: without
           this, Tab restarts from the top of the page after the scroll. Move
           focus to the section heading and keep the hash in the URL. */
				var heading = target.querySelector("h1, h2") || target;
				if (!heading.hasAttribute("tabindex"))
					heading.setAttribute("tabindex", "-1");
				heading.focus({ preventScroll: true });
				if (window.history && history.pushState)
					history.pushState(null, "", id);
			});
		});
	}

	window.addEventListener("pagehide", (event) => {
		/* A bfcache store keeps the page alive; tearing it down would leave a
       restored page with killed triggers and no smooth scroll. */
		if (event.persisted) return;
		if (lenis) lenis.destroy();
		if (tickLenis) gsap.ticker.remove(tickLenis);
		if (hasScrollTrigger) {
			window.ScrollTrigger.getAll().forEach((st) => {
				st.kill();
			});
		}
		if (introTl) introTl.kill();
		if (drawTl) drawTl.kill();
		if (flowTl) flowTl.kill();
		if (schematicIO) schematicIO.disconnect();
	});

	if (hasScrollTrigger) {
		window.addEventListener("load", () => {
			window.ScrollTrigger.refresh();
		});
		if (doc.fonts?.ready) {
			doc.fonts.ready.then(() => {
				window.ScrollTrigger.refresh();
			});
		}
	}
})();
