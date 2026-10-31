'use strict';
(() => {
 const status = document.getElementById('analytics-status');
 const key = 'mokita-analytics-excluded';
 try { localStorage.setItem(key, '1'); status.textContent = 'فعال شد: بازدیدهای بعدی این مرورگر در آمار شمرده نمی‌شوند.'; }
 catch (_) { status.textContent = 'ذخیرهٔ تنظیم انجام نشد؛ مرورگر اجازهٔ ذخیره‌سازی نمی‌دهد. حذف بازدیدهای شما تأیید نشده است.'; }
 document.getElementById('analytics-enable').addEventListener('click', () => {
  try { localStorage.removeItem(key); status.textContent = 'بازدیدهای بعدی این مرورگر شمرده خواهند شد.'; }
  catch (_) { status.textContent = 'تغییر تنظیم انجام نشد.'; }
 });
})();
