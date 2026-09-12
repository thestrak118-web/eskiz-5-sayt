# Eskiz vebinari — 5 ta sayt

3–4–5 sentabr, soat 20:00 bo‘ladigan eskiz vebinari uchun foydalanuvchi yuborgan besh dizayn asosidagi saytlar.

| Manzil | Dizayn |
| --- | --- |
| `/` | `/a/` ga o‘tadi |
| `/a/` | Oq-qizil — asosiy sayt |
| `/b/` | Qora-oltin |
| `/c/` | Bordo-oltin |
| `/d/` | Eskiz-daftar |
| `/e/` | Qizil-qora |

## Ishga tushirish

Oddiy statik hostingga repozitoriy fayllarini joylash kifoya. Build yoki tashqi paketlar talab qilinmaydi. Har bir variant papkasini alohida hostingga ko‘chirish ham mumkin.

Lokal ko‘rish:

```sh
python3 -m http.server 8000
```

Brauzerda `http://localhost:8000/` manzilini oching.

## Ariza va Telegram

Har bir variantdagi `js/config.js` fayliga aynan shu vebinar uchun qiymatlarni yozing:

- `endpointUrl` — Google Apps Script `/exec` manzili.
- `telegramUrl` — Telegram kanali havolasi.
- `pixelId` — Meta Pixel ID, kerak bo‘lsa.
- `sheetName` — jadval varag‘i, kerak bo‘lsa.

Bu qiymatlar hozircha bo‘sh. Endpoint ulanmaguncha forma ariza yubormaydi. Server muvaffaqiyatni tasdiqlagach, shu variantning `thankYou.html` sahifasi ochiladi. Telegram kanali berilmaguncha kanal tugmasi o‘chirilgan.

Forma faqat +998 va 9 raqamli telefonni qabul qiladi. Telefon URL yoki brauzer storage’iga yozilmaydi. HTTP 2xx bilan `{"ok":true}`, `{"success":true}` yoki `{"status":"success"}` JSON tasdig‘i talab qilinadi. FormData maydonlari va hosting tafsilotlari [README.txt](README.txt) ichida.

## Tekshiruv

- 320, 375, 390, 425 va 1440px ekranlarda beshala dizayn tekshirildi.
- ZIPdagi asosiy matn va joylashuv saqlangan.
- 57 ta lokal/mock forma tekshiruvi o‘tdi; haqiqiy tashqi ariza yuborilmadi.
- Lokal Lighthouse: barcha 10 o‘lchovda Performance 100; mobil Speed Index 791–805ms, desktop 173–214ms. Bu hosting tezligi kafolati emas.
- Rasmlar lokal AVIF, shriftlar WOFF2. Yetkazilgan shrift haqidagi qayd har bir variantning `fonts/launch-font-notice.txt` faylida.
