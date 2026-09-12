(()=>{let ready=false;document.addEventListener("click",event=>{if(ready||!event.target.closest("[data-register]"))return;ready=true;const s=document.createElement("style");s.textContent="dialog{color:#191919;background:#fff;border:0;border-radius:18px;width:calc(100% - 30px);max-width:340px;padding:26px;box-shadow:0 10px 80px #0005}dialog::backdrop{background:#000a}dialog h2{margin:0 0 15px;font:700 28px/1.1 Launch,sans-serif}dialog p{font-size:16px;line-height:1.4}dialog button{color:#fff;cursor:pointer;background:#191919;border:0;border-radius:8px;width:100%;min-height:50px;font-weight:700}.registration{background:var(--bg);color:var(--ink);border:1px solid var(--border);border-radius:18px;width:calc(100% - 32px);max-width:360px;max-height:calc(100dvh - 32px);padding:30px 24px 24px;position:fixed;overflow:auto;box-shadow:0 20px 90px #0006}.registration::backdrop{backdrop-filter:blur(4px);background:#080808bb}.registration h2{text-transform:uppercase;color:var(--ink);margin:12px 28px 12px 0;font:700 28px/1.1 Launch,Arial Narrow,sans-serif}.registration p{margin:0 0 18px;font-size:14px;line-height:1.5}.registration .registration-close{border:1px solid var(--border);width:36px;min-height:36px;color:var(--ink);cursor:pointer;background:0 0;border-radius:50%;place-items:center;font:26px/1 Arial,sans-serif;display:grid;position:absolute;top:10px;right:10px}.registration label{margin:22px 0 8px;font-size:14px;font-weight:700;display:block}.phone-field{border:1px solid var(--border);background:var(--card);border-radius:9px;align-items:center;gap:12px;height:54px;padding:0 14px;display:flex}.phone-prefix{flex-shrink:0;font-size:17px;font-weight:700}.phone-field:focus-within{outline:2px solid var(--accent);outline-offset:2px}.phone-field input{width:100%;min-width:0;color:var(--ink);background:0 0;border:0;outline:0;height:100%;padding:0;font:17px/1.2 Arial,sans-serif}.phone-field input::placeholder{color:var(--muted)}.phone-field input:disabled{opacity:.55}.registration #phone-hint{color:var(--muted);margin:8px 0 18px;font-size:12px}.registration #form-error{border-left:3px solid var(--accent);margin:0 0 14px;padding:8px 10px;font-size:13px}.registration #form-status{border:1px solid var(--border);background:var(--card);border-radius:8px;margin:0 0 18px;padding:12px;font-size:13px}.registration .cta{color:var(--buttontext);background:var(--button);border:1px solid var(--btnborder);min-height:56px;box-shadow:inset 0 1px 4px #fff7,0 3px 0 var(--btnshadow);border-radius:9px;font-size:15px}.registration .cta:disabled{opacity:.5;cursor:not-allowed;filter:none;transform:none}";document.head.append(s);document.body.insertAdjacentHTML("beforeend","<dialog aria-describedby=\"form-description\" aria-labelledby=\"form-title\" class=\"registration\" id=\"registration\">\n<button aria-label=\"Yopish\" class=\"registration-close\" id=\"registration-close\" type=\"button\">×</button>\n<p class=\"registration-eyebrow\">ESKIZ VEBINARI</p>\n<h2 id=\"form-title\">Vebinarda qatnashish</h2>\n<p id=\"form-description\">Telefon raqamingizni qoldiring. Vebinar: 3–4–5 sentabr, 20:00.</p>\n<form id=\"registration-form\" method=\"post\" novalidate=\"\">\n<label for=\"phone\">Telefon raqamingiz</label>\n<div class=\"phone-field\">\n<span aria-hidden=\"true\" class=\"phone-prefix\">+998</span>\n<input aria-describedby=\"phone-hint form-error\" autocomplete=\"tel-national\" disabled=\"\" id=\"phone\" inputmode=\"tel\" name=\"phone\" placeholder=\"90 123 45 67\" required=\"\" type=\"tel\"/>\n</div>\n<p id=\"phone-hint\">+998 dan keyin 9 ta raqam kiriting.</p>\n<p hidden=\"\" id=\"form-error\" role=\"alert\"></p>\n<p hidden=\"\" id=\"form-status\" role=\"status\"></p>\n<button class=\"cta\" disabled=\"\" id=\"registration-submit\" type=\"submit\">QATNASHISH <span aria-hidden=\"true\">→</span></button>\n</form>\n</dialog>");
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

},true);})();
