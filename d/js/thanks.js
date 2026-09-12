(() => {
  'use strict';

  const title = document.querySelector('#thanks-title');
  const content = document.querySelector('#thanks-content');
  const message = document.querySelector('#thanks-message');
  const status = document.querySelector('#status');
  const telegram = document.querySelector('#telegram');
  const back = document.querySelector('#back-to-webinar');
  if (!title || !content || !message || !status || !telegram || !back) return;

  const key = 'webinar.confirmed:' + new URL('.', location.href).pathname;
  let confirmation = null;
  try { confirmation = JSON.parse(sessionStorage.getItem(key) || 'null'); } catch {}
  const confirmed = confirmation?.confirmed === true &&
    typeof confirmation.confirmedAt === 'number' && Number.isFinite(confirmation.confirmedAt);

  if (!confirmed) {
    title.textContent = 'Ro‘yxatdan o‘tish';
    content.hidden = true;
    message.textContent = 'Ro‘yxatdan o‘tish tasdiqlanmagan. Asosiy sahifaga qaytib, ariza yuboring.';
    message.hidden = false;
    back.hidden = false;
    return;
  }

  title.textContent = 'Oxirgi qadam qoldi!';
  content.hidden = false;
  message.textContent = 'Arizangiz qabul qilindi!';
  message.hidden = false;
  back.hidden = true;

  let channel = null;
  try {
    const raw = window.SKETCH_CONFIG?.telegramUrl;
    if (typeof raw === 'string' && raw.trim()) {
      const url = new URL(raw.trim());
      if (url.protocol === 'https:' && ['t.me', 'telegram.me'].includes(url.hostname) && url.pathname !== '/') channel = url;
    }
  } catch {}
  if (channel) {
    telegram.href = channel.href;
    telegram.removeAttribute('aria-disabled');
    telegram.removeAttribute('tabindex');
  } else {
    telegram.removeAttribute('href');
    telegram.setAttribute('aria-disabled', 'true');
    telegram.setAttribute('tabindex', '-1');
    status.textContent = 'Telegram kanali havolasi hali qo‘shilmagan.';
    status.hidden = false;
  }
  // This page never submits lead data; the main form already received acknowledgment.
})();
