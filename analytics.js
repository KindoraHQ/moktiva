'use strict';
(() => {
  // Explicit owner opt-out stays on this browser, independent of its IP.
  const key = 'mokita-analytics-excluded';
  let excluded = false;
  try { excluded = localStorage.getItem(key) === '1'; } catch (_) {}
  const host = location.hostname;
  if (excluded || (host !== 'mokitavpn.com' && host !== 'www.mokitavpn.com')) {
    document.documentElement.dataset.mokitaAnalytics = 'excluded';
    return;
  }
  const beacon = document.createElement('script');
  beacon.type = 'module';
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.dataset.cfBeacon = JSON.stringify({token: '514b7836456943aa92fa4400f21bf377'});
  document.head.appendChild(beacon);
  document.documentElement.dataset.mokitaAnalytics = 'enabled';
})();
