(() => {
  'use strict';

  const dialog = document.querySelector('#registration');
  const form = document.querySelector('#registration-form');
  const phone = document.querySelector('#phone');
  const error = document.querySelector('#form-error');
  const status = document.querySelector('#form-status');
  const submit = document.querySelector('#registration-submit');
  const close = document.querySelector('#registration-close');
  if (!dialog || !form || !phone || !error || !status || !submit || !close) return;

  const variantPath = new URL('.', location.href).pathname;
  const confirmationKey = 'webinar.confirmed:' + variantPath;
  const unavailable = 'Ro‘yxatdan o‘tish hozircha ochilmagan. Keyinroq qayta urinib ko‘ring.';
  let opener = null;
  let previousOverflow = '';
  let busy = false;
  let acknowledged = false;
  let backdropPointer = false;

  function endpoint() {
    const raw = window.SKETCH_CONFIG?.endpointUrl;
    if (typeof raw !== 'string' || !raw.trim()) return null;
    try {
      const url = new URL(raw.trim(), location.href);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  function setStatus(message) {
    status.textContent = message;
    status.hidden = !message;
  }

  function clearError() {
    error.textContent = '';
    error.hidden = true;
    phone.removeAttribute('aria-invalid');
  }

  function setError(message, invalidPhone = false) {
    error.textContent = message;
    error.hidden = false;
    if (invalidPhone) {
      phone.setAttribute('aria-invalid', 'true');
      phone.focus();
    }
  }

  function syncControls() {
    const disabled = !endpoint() || busy || acknowledged;
    phone.disabled = disabled;
    submit.disabled = disabled;
    form.setAttribute('aria-busy', String(busy));
    if (!endpoint()) setStatus(unavailable);
  }

  function normalizedPhone() {
    let value = phone.value.replace(/\D/g, '');
    if (value.length === 12 && value.startsWith('998')) value = value.slice(3);
    return /^\d{9}$/.test(value) ? '+998' + value : null;
  }

  function isBackdrop(event) {
    if (event.target !== dialog) return false;
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
  }

  document.querySelectorAll('[data-register]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      clearError();
      if (!busy && !acknowledged) setStatus('');
      syncControls();
      if (!dialog.open) {
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialog.showModal();
      }
      (phone.disabled ? close : phone).focus();
    });
  });

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('pointerdown', event => { backdropPointer = isBackdrop(event); });
  dialog.addEventListener('click', event => {
    if (backdropPointer && isBackdrop(event)) dialog.close();
    backdropPointer = false;
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    if (opener?.isConnected) opener.focus();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button:not([disabled]),input:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])')]
      .filter(control => control.getClientRects().length && control.tabIndex >= 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  // Native <dialog> supplies Escape handling and an inert background; the explicit
  // Tab wrap also keeps Shift+Tab from moving into browser chrome in Chromium.

  phone.addEventListener('input', () => {
    let value = phone.value.replace(/\D/g, '');
    if (value.length === 12 && value.startsWith('998')) value = value.slice(3);
    // Preserve extra digits so an invalid international number is rejected,
    // rather than silently submitting a truncated phone number.
    phone.value = [value.slice(0, 2), value.slice(2, 5), value.slice(5, 7), value.slice(7)]
      .filter(Boolean).join(' ');
    clearError();
    if (!busy && endpoint()) setStatus('');
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || acknowledged) return;
    clearError();
    const url = endpoint();
    if (!url) {
      syncControls();
      return;
    }
    const canonicalPhone = normalizedPhone();
    if (!canonicalPhone) {
      setError('Iltimos, +998 dan keyin 9 ta raqam kiriting.', true);
      return;
    }

    busy = true;
    setStatus('Arizangiz yuborilmoqda...');
    syncControls();
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const payload = new FormData();
      const sheetName = window.SKETCH_CONFIG?.sheetName;
      if (typeof sheetName === 'string' && sheetName.trim()) payload.set('sheetName', sheetName.trim());
      payload.set('Telefon raqam', canonicalPhone);
      payload.set("Royhatdan o'tgan vaqti", new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Tashkent' }));
      const response = await fetch(url, {
        method: 'POST',
        body: payload,
        credentials: 'omit',
        cache: 'no-store',
        signal: controller.signal
      });
      if (!response.ok) throw new Error('HTTP response rejected');
      const result = await response.json();
      if (!result || !(result.ok === true || result.success === true || result.status === 'success')) {
        throw new Error('Submission was not acknowledged');
      }

      acknowledged = true;
      setStatus('Arizangiz qabul qilindi!');
      // This session marker contains no phone number or other submitted data.
      // The phone remains only in the input and the POST body.
      try {
        sessionStorage.setItem(confirmationKey, JSON.stringify({ confirmed: true, confirmedAt: Date.now() }));
      } catch {
        setStatus('Arizangiz qabul qilindi!');
        return;
      }
      location.assign('./thankYou.html');
    } catch {
      setStatus('');
      setError('Ariza tasdiqlanmadi. Internet aloqasini tekshirib, qayta urinib ko‘ring.');
    } finally {
      window.clearTimeout(timeout);
      busy = false;
      syncControls();
    }
  });

  // An unconfigured form is unavailable before users can enter any personal data.
  syncControls();
})();
