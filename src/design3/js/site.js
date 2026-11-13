/* design3 — theme, navigation, smooth scroll, and restrained reveals.
   Everything here is progressive: the page is complete without JS. */

(() => {
	const root = document.documentElement;
	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

	/* ------------------------------------------------------------- theme */

	function storedTheme() {
		try {
			return localStorage.getItem("dc-theme");
		} catch {
			return null;
		}
	}

	function applyTheme(theme) {
		root.dataset.theme = theme;
		const button = document.querySelector(".theme-toggle");
		if (button) {
			button.setAttribute(
				"aria-label",
				theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
			);
		}
	}

	applyTheme(
		root.dataset.theme || (storedTheme() === "dark" ? "dark" : "light"),
	);

	document.querySelectorAll(".theme-toggle").forEach((button) => {
		button.addEventListener("click", () => {
			const next = root.dataset.theme === "dark" ? "light" : "dark";
			applyTheme(next);
			try {
				localStorage.setItem("dc-theme", next);
			} catch {}
		});
	});

	// Follow the OS only while the visitor has not chosen a theme.
	if (typeof reduceMotion.addEventListener === "function") {
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (event) => {
				if (!storedTheme()) applyTheme(event.matches ? "dark" : "light");
			});
	}

	/* ------------------------------------------------------------- nav */

	const nav = document.getElementById("site-nav");
	const navToggle = document.querySelector(".nav-toggle");

	function closeNav() {
		if (!nav || !navToggle) return;
		nav.classList.remove("is-open");
		document.body.classList.remove("nav-open");
		navToggle.setAttribute("aria-expanded", "false");
		navToggle.setAttribute("aria-label", "Open menu");
	}

	if (nav && navToggle) {
		navToggle.addEventListener("click", () => {
			const open = nav.classList.toggle("is-open");
			document.body.classList.toggle("nav-open", open);
			navToggle.setAttribute("aria-expanded", String(open));
			navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
		});

		nav.addEventListener("click", (event) => {
			if (event.target.closest("a")) closeNav();
		});

		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape") closeNav();
		});

		document.addEventListener("click", (event) => {
			if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
				closeNav();
			}
		});
	}

	const year = document.getElementById("year");
	if (year) year.textContent = String(new Date().getFullYear());

	/* ----------------------------------------------------- copy email */
	/* The address stays visible as text without JS; a client that blocks the
	   clipboard simply keeps the button out of the way. */

	document.querySelectorAll("[data-copy]").forEach((button) => {
		const value = button.getAttribute("data-copy");
		if (!value || !navigator.clipboard?.writeText) return;

		const label = button.querySelector(".about-actions__copy-label") || button;
		const status =
			button.parentElement?.querySelector("[data-copy-status]") ||
			document.querySelector("[data-copy-status]");
		const initial = label.textContent;
		let timer = 0;

		button.hidden = false;

		button.addEventListener("click", async () => {
			try {
				await navigator.clipboard.writeText(value);
			} catch {
				return;
			}
			label.textContent = "Copied";
			if (status) status.textContent = "Email address copied";
			window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				label.textContent = initial;
				if (status) status.textContent = "";
			}, 1600);
		});
	});

	/* ----------------------------------------------------- case rail */

	const railLinks = Array.prototype.slice.call(
		document.querySelectorAll(".case-rail a[href^='#']"),
	);
	const sections = railLinks
		.map((link) => document.getElementById(link.getAttribute("href").slice(1)))
		.filter(Boolean);

	if (railLinks.length && sections.length && "IntersectionObserver" in window) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) return;
					const currentId = `#${entry.target.id}`;
					railLinks.forEach((link) => {
						const current = link.getAttribute("href") === currentId;
						link.classList.toggle("is-current", current);
						if (current) link.setAttribute("aria-current", "true");
						else link.removeAttribute("aria-current");
					});
				});
			},
			{ rootMargin: "-18% 0px -68% 0px", threshold: 0 },
		);
		sections.forEach((section) => {
			observer.observe(section);
		});
	}

	/* ---------------------------------------------------------- motion */

	const canAnimate =
		!reduceMotion.matches &&
		typeof window.gsap !== "undefined" &&
		typeof window.ScrollTrigger !== "undefined";

	if (!canAnimate) return;

	const gsap = window.gsap;
	const ScrollTrigger = window.ScrollTrigger;
	gsap.registerPlugin(ScrollTrigger);

	root.classList.add("motion-ready");

	// The case rail is sticky below the header on small screens, so an
	// anchor jump needs more clearance there than on desktop.
	const anchorOffset = () =>
		window.matchMedia("(max-width: 960px)").matches ? -168 : -72;

	/* Smooth scroll: Lenis is the only engine on the page. */
	let lenis = null;
	if (typeof window.Lenis !== "undefined") {
		lenis = new window.Lenis({
			duration: 1.05,
			smoothWheel: true,
			wheelMultiplier: 0.9,
		});
		lenis.on("scroll", ScrollTrigger.update);
		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});
		gsap.ticker.lagSmoothing(0);

		// Lenis measures its scroll limit when it is constructed, before the
		// case images and fonts have settled. Re-measure before every jump or
		// the first rail click is clamped short of its section.
		document.querySelectorAll('a[href^="#"]').forEach((link) => {
			link.addEventListener("click", (event) => {
				const target = document.getElementById(
					link.getAttribute("href").slice(1),
				);
				if (!target) return;
				event.preventDefault();
				lenis.resize();
				lenis.scrollTo(target, { offset: anchorOffset(), duration: 1.1 });
				history.pushState(null, "", link.getAttribute("href"));
			});
		});

		if (window.location.hash.length > 1) {
			const hashTarget = document.getElementById(window.location.hash.slice(1));
			if (hashTarget) {
				lenis.resize();
				lenis.scrollTo(hashTarget, {
					immediate: true,
					offset: anchorOffset(),
				});
				ScrollTrigger.refresh();
			}
		}
	}

	/* Hero: one composed introduction, not scattered effects. */
	const hero = document.querySelector(".hero__copy");
	if (hero) {
		const heroParts = hero.querySelectorAll(
			".eyebrow, .hero__title span, .hero__lede, .hero__actions, .hero__status",
		);
		const heroArt = document.querySelector(".hero__artifact");
		const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
		timeline.from(heroParts, {
			opacity: 0,
			y: 16,
			duration: 0.6,
			stagger: 0.08,
		});
		if (heroArt) {
			timeline.from(heroArt, { opacity: 0, y: 20, duration: 0.7 }, "-=0.45");
		}
	}

	/* Section reveals: one batch, short distance, final state preserved. */
	const revealSelector = [
		".proof__item",
		".work-item",
		".method__item",
		".timeline__phase",
		".arch",
		".surface",
		".failure",
		".metrics",
		".strip",
		".next-list li",
		".ledger__row",
	].join(",");

	const revealItems = gsap.utils.toArray(revealSelector);
	revealItems.forEach((item) => {
		item.setAttribute("data-reveal", "");
	});
	if (revealItems.length) {
		gsap.set(revealItems, { opacity: 0, y: 14 });
		ScrollTrigger.batch(revealItems, {
			start: "top 90%",
			once: true,
			onEnter: (batch) => {
				gsap.to(batch, {
					opacity: 1,
					y: 0,
					duration: 0.55,
					stagger: 0.07,
					ease: "power2.out",
					overwrite: true,
				});
			},
		});
	}

	// Measurement can shift after fonts and the case images land. Refresh the
	// Lenis limit too, and re-place a deep link once the page has its full height.
	const initialHash = window.location.hash;
	const settleScroll = () => {
		if (lenis) lenis.resize();
		ScrollTrigger.refresh();
		if (
			lenis &&
			initialHash.length > 1 &&
			window.location.hash === initialHash
		) {
			const hashTarget = document.getElementById(initialHash.slice(1));
			if (hashTarget) {
				lenis.scrollTo(hashTarget, {
					immediate: true,
					offset: anchorOffset(),
				});
			}
		}
	};
	if (document.fonts?.ready) {
		document.fonts.ready.then(settleScroll);
	}
	window.addEventListener("load", settleScroll);
})();
