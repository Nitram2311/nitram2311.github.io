// ============================================
//   YouTube Parallax Website - main.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- CUSTOM CURSOR ---
  const cursor     = document.querySelector('.cursor');
  const cursorRing = document.querySelector('.cursor-ring');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth ring follow
  function animateCursor() {
    const ease = 0.12;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor scale on hover
  document.querySelectorAll('a, button, .video-card, .creator-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '20px';
      cursor.style.height = '20px';
      cursorRing.style.width   = '56px';
      cursorRing.style.height  = '56px';
      cursorRing.style.opacity = '0.4';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '12px';
      cursor.style.height = '12px';
      cursorRing.style.width   = '36px';
      cursorRing.style.height  = '36px';
      cursorRing.style.opacity = '0.6';
    });
  });


  // --- NAV SCROLL STATE ---
  const nav = document.querySelector('nav');
  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();


  // --- PARALLAX ENGINE ---
  // Each parallax element gets a data-parallax-speed attribute.
  // Positive = moves up slower than scroll (depth), negative = faster.
  const parallaxEls = document.querySelectorAll('[data-parallax]');

  function applyParallax() {
    const scrollY = window.scrollY;

    parallaxEls.forEach(el => {
      const speed  = parseFloat(el.dataset.parallax) || 0.3;
      const rect   = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', applyParallax, { passive: true });
  applyParallax();


  // --- SCROLL REVEAL ---
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));


  // --- ANIMATED COUNTERS ---
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString('en');
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const counterEls = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));


  // --- HERO TITLE WORDS REVEAL ---
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.opacity = '1';
  }


  // --- TILT EFFECT ON CARDS ---
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `
        translateY(-6px)
        rotateX(${-y * 7}deg)
        rotateY(${x * 7}deg)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // --- SMOOTH ANCHOR SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // --- HERO PLAY BUTTON CLICK RIPPLE ---
  const heroCTA = document.querySelector('.hero-play-cta');
  if (heroCTA) {
    heroCTA.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; width:10px; height:10px; border-radius:50%;
        background:rgba(255,255,255,0.4); pointer-events:none;
        transform:translate(-50%,-50%) scale(0);
        animation:ripple 0.6s ease-out forwards;
        left:${e.offsetX}px; top:${e.offsetY}px;
      `;
      heroCTA.style.position = 'relative';
      heroCTA.appendChild(ripple);
      setTimeout(() => ripple.remove(), 620);
    });
  }

  // Inject ripple keyframe
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple { to { transform: translate(-50%,-50%) scale(20); opacity: 0; } }`;
  document.head.appendChild(style);


  // --- MARQUEE PAUSE ON HOVER ---
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

});
