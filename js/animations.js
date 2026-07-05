/* ════════════════════════════════════════════
   11 حريف — shared motion (vanilla JS)
════════════════════════════════════════════ */

let motionInitialized = false;

const REVEAL_SELECTOR = [
  '.reveal',
  '.reveal-right',
  '.reveal-left',
  '.reveal-scale',
  '.bento__card',
  '.reveal-scale-child',
  '.motion-bar',
].join(',');

const STAGGER_SELECTOR = '.stagger-children';

const observerOpts = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
};

function animateNumber(el, target) {
  const duration = 1600;
  const start = performance.now();
  const suffix = el.dataset.suffix || '';

  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString('en-US') + (t < 1 ? '' : suffix);
    if (t < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function initNavbarScroll() {
  const navbars = document.querySelectorAll('.navbar, .nav');
  if (!navbars.length) return;

  const onScroll = () => {
    const scrolled = window.scrollY > 20;
    navbars.forEach(nav => {
      nav.classList.toggle('is-scrolled', scrolled);
      nav.classList.toggle('scrolled', scrolled);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initRevealObserver() {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible', 'is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, observerOpts);

  document.querySelectorAll(REVEAL_SELECTOR).forEach(el => {
    revealObserver.observe(el);
  });
}

function initStaggerObserver() {
  const staggerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      staggerObserver.unobserve(entry.target);
    });
  }, observerOpts);

  document.querySelectorAll(STAGGER_SELECTOR).forEach(el => {
    staggerObserver.observe(el);
  });
}

function initCountUp() {
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.dataset.target || el.textContent.replace(/[^0-9.]/g, '');
      const num = parseFloat(raw);
      if (!isNaN(num)) animateNumber(el, num);
      statsObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.count-up, .stats-bar__number').forEach(el => {
    if (el.classList.contains('stats-bar__number') && !el.dataset.target) {
      const text = el.textContent;
      const num = parseFloat(text.replace(/[^0-9.]/g, ''));
      const suffix = text.replace(/[0-9,.]/g, '');
      if (isNaN(num)) return;
      el.dataset.target = num;
      el.dataset.suffix = suffix;
      el.textContent = '0' + suffix;
    }
    statsObserver.observe(el);
  });
}


function initStoryCards() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, observerOpts);

  document.querySelectorAll('.story-card').forEach(el => observer.observe(el));
}

export function initMotion() {
  if (motionInitialized) return;
  motionInitialized = true;

  initNavbarScroll();
  initRevealObserver();
  initStaggerObserver();
  initCountUp();
  initStoryCards();
}

/* Standalone pages load this module directly */
initMotion();
