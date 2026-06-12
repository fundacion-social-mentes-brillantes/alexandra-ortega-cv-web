/* ═══════════════════════════════════════════════════
   ALEXANDRA ORTEGA · Interacciones
   1. Navegación (estado al hacer scroll + menú móvil)
   2. Animaciones de aparición (IntersectionObserver)
   3. Contadores animados
   4. Año dinámico en el footer
   ═══════════════════════════════════════════════════ */

(function () {
  "use strict";

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── 1. Navegación ─────────────────────────────── */
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  const onScroll = () => {
    nav.classList.toggle("nav--solid", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  // Cerrar el menú móvil al elegir un enlace
  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ── 2. Aparición al hacer scroll ──────────────── */
  const reveals = document.querySelectorAll(".reveal");

  // Pequeño escalonado entre elementos hermanos
  reveals.forEach((el) => {
    const siblings = el.parentElement
      ? [...el.parentElement.children].filter((c) => c.classList.contains("reveal"))
      : [el];
    const index = siblings.indexOf(el);
    el.style.setProperty("--d", `${Math.min(index * 0.1, 0.5)}s`);
  });

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  }

  /* ── 3. Contadores animados ────────────────────── */
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = el.dataset.target));
  }

  /* ── 4. Año dinámico ───────────────────────────── */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
