import { initCountdown } from './countdown.js';
import { initMotion } from './animations.js';

/* ── Navbar scroll behaviour ── */
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.navbar__hamburger');
const mobileMenu = document.querySelector('.navbar__mobile');

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
initMotion();
initCountdown();
setActiveLink();
