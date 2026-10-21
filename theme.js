(() => {
 'use strict';
 const key = 'mokita-theme';
 const system = window.matchMedia('(prefers-color-scheme: dark)');
 let choice = null;
 try { const saved = localStorage.getItem(key); if (saved === 'light' || saved === 'dark') choice = saved; } catch (_) {}
 function apply() {
  const dark = choice ? choice === 'dark' : system.matches;
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelectorAll('[data-theme-toggle]').forEach(button => {
   button.hidden = false;
   button.setAttribute('aria-label', dark ? 'فعال کردن حالت روز' : 'فعال کردن حالت شب');
   button.setAttribute('aria-pressed', String(dark));
   button.querySelector('[data-theme-icon]').textContent = dark ? '☀' : '☾';
   button.querySelector('[data-theme-label]').textContent = dark ? 'روز' : 'شب';
  });
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = dark ? '#141b29' : '#faf7ef';
 }
 apply();
 document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => {
   choice = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
   try { localStorage.setItem(key, choice); } catch (_) {}
   apply();
  }));
  apply();
 });
 system.addEventListener('change', () => { if (!choice) apply(); });
 window.addEventListener('storage', event => {
  if (event.key === key) { choice = ['light','dark'].includes(event.newValue) ? event.newValue : null; apply(); }
 });
})();
