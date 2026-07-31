/* ==========================================================================
   NITRAM PORTFOLIO — SCRIPT.JS
   --------------------------------------------------------------------------
   Enthält: Parallax-Scrolling für die Wolken/Glow-Elemente, mobiles
   Hamburger-Menü, Smooth Scroll, aktive Nav-Links, Scroll-Reveal-
   Animationen für Karten sowie ein paar kleine Komfort-Funktionen.
   Reines Vanilla JavaScript — keine externen Bibliotheken nötig.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     0. Einstellungen
     -------------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     1. AKTUELLES JAHR IM FOOTER automatisch einsetzen
     -------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     2. HEADER: Hintergrund wird beim Scrollen etwas deutlicher
     -------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const updateHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };

  /* ------------------------------------------------------------------------
     3. MOBILE NAVIGATION (Hamburger-Menü)
     -------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  const closeMobileNav = () => {
    if (!navToggle || !navLinks) return;
    navToggle.classList.remove('is-active');
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMobileNav = () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', toggleMobileNav);
    // Menü automatisch schließen, sobald ein Link angeklickt wird
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  /* ------------------------------------------------------------------------
     4. SMOOTH SCROLL zu den Abschnitten
     (CSS "scroll-behavior: smooth" greift zusätzlich als Fallback)
     -------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     5. AKTIVER NAV-LINK je nach Scroll-Position hervorheben
     -------------------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id], footer[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const setActiveLink = () => {
    if (!sections.length) return;
    let currentId = '';
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(anchor => {
      anchor.classList.toggle('is-active', anchor.getAttribute('href') === `#${currentId}`);
    });
  };

  /* ------------------------------------------------------------------------
     6. PARALLAX-EFFEKT für die schwebenden Wolken & Glow-Elemente
     Jede Ebene (.cloud-layer) hat ein eigenes "data-speed" im HTML und
     bewegt sich dadurch unterschiedlich schnell -> Tiefeneffekt beim Scrollen.
     Anpassen: data-speed-Werte im HTML (kleiner = langsamer/weiter weg).
     -------------------------------------------------------------------- */
  const parallaxLayers = document.querySelectorAll('.cloud-layer[data-speed]');

  const updateParallax = () => {
    if (prefersReducedMotion || parallaxLayers.length === 0) return;
    const scrollY = window.scrollY;
    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed) || 0.1;
      layer.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    });
  };

  /* ------------------------------------------------------------------------
     7. Scroll-Events gebündelt & performant über requestAnimationFrame
     -------------------------------------------------------------------- */
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeaderState();
        setActiveLink();
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Einmal beim Laden ausführen (falls die Seite mit Scroll-Position startet)
  updateHeaderState();
  setActiveLink();
  updateParallax();

  /* ------------------------------------------------------------------------
     8. SCROLL-REVEAL: Karten & Section-Header blenden sich sanft ein,
     sobald sie in den sichtbaren Bereich scrollen (IntersectionObserver).
     -------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback ohne Animation (ältere Browser oder "reduzierte Bewegung")
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

});
