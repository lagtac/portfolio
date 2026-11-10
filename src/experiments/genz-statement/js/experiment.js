/* Gen Z personal statement — probe
   Motion: GSAP + ScrollTrigger, Lenis as the single smooth-scroll engine.
   Content is complete without JS; motion is opt-in. */
(() => {
	var reduceMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;
	var yearEl = document.getElementById("year");
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());

	/* ---------- keep jump targets clear of the sticky header (2.4.11) ---------- */
	var masthead = document.querySelector(".masthead");
	function setStickyOffset() {
		if (!masthead) return;
		document.documentElement.style.setProperty(
			"--sticky-offset",
			`${masthead.offsetHeight + 12}px`,
		);
	}
	setStickyOffset();
	window.addEventListener("resize", setStickyOffset);
	window.addEventListener("load", setStickyOffset);
	if (document.fonts?.ready) document.fonts.ready.then(setStickyOffset);

	/* ---------- ticker: motion is opt-in, with a pause control (2.2.2) ---------- */
	var ticker = document.querySelector(".ticker");
	var tickerToggle = document.querySelector(".ticker__toggle");
	if (ticker && tickerToggle && !reduceMotion) {
		ticker.classList.add("ticker--live");
		tickerToggle.hidden = false;
		tickerToggle.addEventListener("click", () => {
			var paused = ticker.classList.toggle("ticker--paused");
			tickerToggle.textContent = paused ? "Play" : "Pause";
			tickerToggle.setAttribute(
				"aria-label",
				paused ? "Play the scrolling banner" : "Pause the scrolling banner",
			);
		});
	}

	/* ---------- split text, keeping the real text in the accessibility tree ---------- */
	function splitWords(el) {
		var text = (el.textContent || "").replace(/\s+/g, " ").trim();
		if (!text) return [];
		var words = text.split(" ");

		var sr = document.createElement("span");
		sr.className = "visually-hidden";
		sr.textContent = text;

		var wrap = document.createElement("span");
		wrap.setAttribute("aria-hidden", "true");

		var inners = [];
		words.forEach((word, i) => {
			var outer = document.createElement("span");
			outer.className = "word";
			var inner = document.createElement("span");
			inner.className = "word__in";
			inner.textContent = word;
			outer.appendChild(inner);
			wrap.appendChild(outer);
			if (i < words.length - 1) wrap.appendChild(document.createTextNode(" "));
			inners.push(inner);
		});

		el.textContent = "";
		el.appendChild(sr);
		el.appendChild(wrap);
		return inners;
	}

	var heroTitle = document.getElementById("hero-title");

	var splits = [];
	Array.prototype.forEach.call(
		document.querySelectorAll("[data-split]"),
		(el) => {
			var inners = splitWords(el);
			if (inners.length) splits.push({ el: el, inners: inners });
		},
	);

	var gsap = window.gsap;
	var ScrollTrigger = window.ScrollTrigger;
	if (!gsap || !ScrollTrigger) return; /* static page still complete */

	gsap.registerPlugin(ScrollTrigger);

	/* ---------- exact curves, not approximations ----------
     Same control points as the CSS tokens; GSAP accepts a function as an ease. */
	function cubicBezier(x1, y1, x2, y2) {
		function a(v1, v2) {
			return 1 - 3 * v2 + 3 * v1;
		}
		function b(v1, v2) {
			return 3 * v2 - 6 * v1;
		}
		function c(v1) {
			return 3 * v1;
		}
		function calc(t, v1, v2) {
			return ((a(v1, v2) * t + b(v1, v2)) * t + c(v1)) * t;
		}
		function slope(t, v1, v2) {
			return 3 * a(v1, v2) * t * t + 2 * b(v1, v2) * t + c(v1);
		}
		function solveX(x) {
			var t = x;
			for (let i = 0; i < 6; i++) {
				const d = slope(t, x1, x2);
				if (d === 0) break;
				t -= (calc(t, x1, x2) - x) / d;
			}
			return t;
		}
		return (p) => {
			if (p <= 0) return 0;
			if (p >= 1) return 1;
			return calc(solveX(p), y1, y2);
		};
	}
	var EASE_OUT = cubicBezier(0.23, 1, 0.32, 1);

	/* ---------- smooth scroll: exactly one engine ---------- */
	var lenis = null;
	if (!reduceMotion && window.Lenis) {
		lenis = new window.Lenis({
			duration: 1.1,
			smoothWheel: true,
			autoRaf: false,
		});
		lenis.on("scroll", ScrollTrigger.update);
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});
		gsap.ticker.lagSmoothing(0);
	}

	/* ---------- in-page anchors ---------- */
	Array.prototype.forEach.call(
		document.querySelectorAll('a[href^="#"]'),
		(a) => {
			a.addEventListener("click", (event) => {
				var id = a.getAttribute("href");
				if (!id || id.length < 2) return;
				var target = document.querySelector(id);
				if (!target) return;
				event.preventDefault();
				if (lenis)
					lenis.scrollTo(target, {
						offset: -((masthead ? masthead.offsetHeight : 66) + 12),
					});
				else
					target.scrollIntoView({
						behavior: reduceMotion ? "auto" : "smooth",
						block: "start",
					});
				target.setAttribute("tabindex", "-1");
				target.focus({ preventScroll: true });
			});
		},
	);

	/* ---------- reduced motion: gentler, never zero ----------
     No travel, no smooth scroll, no marquee. Opacity still fades so arrivals
     stay legible instead of teleporting. */
	if (reduceMotion) {
		const heroCopy = document.querySelector(".hero__copy");
		if (heroCopy) {
			gsap.from(heroCopy, {
				opacity: 0,
				duration: 0.25,
				ease: EASE_OUT,
				clearProps: "opacity",
			});
		}

		const gentle = gsap.utils
			.toArray("[data-reveal], [data-split]")
			.filter((el) => el !== heroTitle);
		if (gentle.length) {
			gsap.set(gentle, { opacity: 0 });
			ScrollTrigger.batch(gentle, {
				start: "top 92%",
				once: true,
				onEnter: (batch) => {
					gsap.to(batch, {
						opacity: 1,
						duration: 0.25,
						stagger: 0.05,
						ease: EASE_OUT,
						overwrite: true,
					});
				},
			});
		}

		window.addEventListener("load", () => {
			ScrollTrigger.refresh();
		});
		return;
	}

	/* ---------- hero intro: things get stuck on ---------- */
	var heroSplit = null;
	splits.forEach((s) => {
		if (s.el === heroTitle) heroSplit = s;
	});

	var intro = gsap.timeline({ defaults: { ease: EASE_OUT } });

	if (heroSplit) {
		intro.from(
			heroSplit.inners,
			{
				yPercent: 115,
				duration: 0.8,
				stagger: 0.04,
			},
			0.1,
		);
	}

	/* overshoot comes from a 3% settle, not a bounce curve */
	var unicorn = document.querySelector(".hero__unicorn");
	if (unicorn) {
		intro.fromTo(
			unicorn,
			{ scale: 0.92, rotation: -14, opacity: 0 },
			{ scale: 1.03, rotation: -4, opacity: 1, duration: 0.6 },
			0.06,
		);
		intro.to(unicorn, { scale: 1, rotation: -6, duration: 0.3 }, "-=0.12");
	}

	var stickers = gsap.utils.toArray(".hero__art .sticker");
	if (stickers.length) {
		intro.from(
			stickers,
			{
				scale: 0.9,
				opacity: 0,
				rotation: -18,
				duration: 0.42,
				stagger: 0.07,
			},
			0.5,
		);
	}

	intro.from(
		[".eyebrow", ".hero__lead", ".hero__actions"],
		{
			y: 20,
			opacity: 0,
			duration: 0.5,
			stagger: 0.07,
			clearProps: "all",
		},
		0.26,
	);

	/* ---------- scroll reveals: batched, so a row never lands all at once ---------- */
	var revealEls = gsap.utils.toArray("[data-reveal]");
	if (revealEls.length) {
		gsap.set(revealEls, { y: 28, opacity: 0 });
		ScrollTrigger.batch(revealEls, {
			start: "top 90%",
			once: true,
			onEnter: (batch) => {
				gsap.to(batch, {
					y: 0,
					opacity: 1,
					duration: 0.5,
					stagger: 0.06,
					ease: EASE_OUT,
					overwrite: true,
				});
			},
		});
	}

	/* section headings and the pull quote rise word by word */
	splits.forEach((s) => {
		if (s.el === heroTitle) return;
		gsap.from(s.inners, {
			yPercent: 115,
			duration: 0.6,
			stagger: 0.03,
			ease: EASE_OUT,
			scrollTrigger: { trigger: s.el, start: "top 86%", once: true },
		});
	});

	/* ---------- housekeeping ---------- */
	window.addEventListener("load", () => {
		ScrollTrigger.refresh();
		if (lenis) lenis.resize();
	});

	document.addEventListener("visibilitychange", () => {
		if (!lenis) return;
		if (document.hidden) lenis.stop();
		else lenis.start();
	});
})();
