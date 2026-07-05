import { initCountdown } from './countdown.js';

/* ── Navbar scroll behaviour ── */
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.navbar__hamburger');
const mobileMenu = document.querySelector('.navbar__mobile');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar__link[href^="#"]');

function setActiveLink() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });


/* ── Intersection Observer for reveal animations ── */
const observerOpts = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOpts);

document.querySelectorAll('.reveal, .bento__card').forEach(el => {
  revealObserver.observe(el);
});


/* ── Stats counter animation ── */
function animateNumber(el, target) {
  const duration = 1600;
  const start = performance.now();
  const isFloat = String(target).includes('.');
  const suffix = el.dataset.suffix || '';

  function frame(now) {
    const t = Math.min((now - start) / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString('en-US') + (t < 1 ? '' : suffix);
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.dataset.target || el.textContent.replace(/[^0-9.]/g, '');
      const num = parseFloat(raw);
      if (!isNaN(num)) animateNumber(el, num);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-bar__number').forEach(el => {
  const text = el.textContent;
  const num = parseFloat(text.replace(/[^0-9.]/g, ''));
  const suffix = text.replace(/[0-9,.]/g, '');
  el.dataset.target = num;
  el.dataset.suffix = suffix;
  el.textContent = '0' + suffix;
  statsObserver.observe(el);
});


/* ── Newsletter form ── */
const form = document.querySelector('.footer__form');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const input = form.querySelector('.footer__input');
  const btn   = form.querySelector('.footer__subscribe');
  if (!input.value.includes('@')) {
    input.style.borderColor = '#f64740';
    input.focus();
    return;
  }
  btn.textContent = '✓ تم الاشتراك';
  btn.style.background = '#22c55e';
  btn.style.color = '#fff';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'اشترك';
    btn.style.background = '';
    btn.style.color = '';
  }, 3000);
});


/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ── Init ── */
initCountdown();
setActiveLink();
