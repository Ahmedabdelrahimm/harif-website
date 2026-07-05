/**
 * Live countdown timer
 * Target: next scheduled tryout date
 */

const TARGET_DATE = new Date('2025-10-15T10:00:00');

function pad(n) {
  return String(n).padStart(2, '0');
}

function updateUnit(id, newVal) {
  const el = document.getElementById(id);
  if (!el) return;
  const current = el.textContent;
  if (current !== newVal) {
    el.classList.remove('flip');
    // Force reflow to restart animation
    void el.offsetWidth;
    el.classList.add('flip');
    el.textContent = newVal;
  }
}

function tick() {
  const now  = new Date();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    updateUnit('cd-days',    '00');
    updateUnit('cd-hours',   '00');
    updateUnit('cd-minutes', '00');
    updateUnit('cd-seconds', '00');
    return;
  }

  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000)  / 60000);
  const seconds = Math.floor((diff % 60000)    / 1000);

  updateUnit('cd-days',    pad(days));
  updateUnit('cd-hours',   pad(hours));
  updateUnit('cd-minutes', pad(minutes));
  updateUnit('cd-seconds', pad(seconds));
}

export function initCountdown() {
  tick();
  setInterval(tick, 1000);
}
