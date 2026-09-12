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

Oddiy statik hostingga repozitoriy fayllarini joylash kifoya. Tashqi paketlar talab qilinmaydi. Har bir variant papkasini alohida hostingga ko‘chirish ham mumkin.

Vercel `vercel.json` orqali Brotli qo‘llaydigan brauzerga oldindan siqilgan `.html.br` nusxasini beradi. Asl HTML boshqa brauzer va statik hostinglar uchun saqlangan. HTML tahrirlangach `node compress.cjs` buyrug‘ini lokal bajaring va yangilangan `.html.br` fayllarni HTML bilan birga commit/yuklang; tashqi `js/config.js` ni sozlash HTMLni qayta siqishni talab qilmaydi.

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
- Tezlik ochiq Vercel saytda rasmiy Google PageSpeed Insights (Lighthouse 13.4.1, Moto G Power, Slow 4G) orqali o‘lchandi. Quyidagi qiymatlar mobil Speed Index; FCP yoki localhost natijasi emas.
- Birinchi ekran rasmlari, lokal shrift va sahifa uslublari HTML bilan birga keladi. Ariza oynasi birinchi CTA bosilganda yaratiladi va shu bosishda ochiladi; uning ishlatilmagan uslublari dastlabki sahifani qayta chizdirmaydi. Pastdagi suratlar ko‘rinishiga yaqin yuklanadi. `/` ikkinchi hujjat so‘rovisiz asosiy saytni ochadi.
- Oxirgi forma o‘zgarishidan keyin 57 ta lokal/mock tekshiruv qayta o‘tdi. 412×823 ekran va DPR1/2/1.75 sinovlarida gorizontal chiqish aniqlanmadi.
- Rasmlar lokal AVIF, shriftlar WOFF2. Yetkazilgan shrift haqidagi qayd har bir variantning `fonts/launch-font-notice.txt` faylida.

## Ochiq hosting tezligi — 2026-09-13

| Manzil | Mobil Speed Index | O‘lchov |
| --- | ---: | --- |
| `/` | 0.779s | Bitta test |
| `/a/` | 0.783s | Uchta test mediani |
| `/b/` | 0.788s | Bitta test |
| `/c/` | 0.767s | Bitta test |
| `/d/` | 0.770s | Uchta test mediani |
| `/e/` | 0.774s | Bitta test |

Barcha o‘lchovlarda Performance100, CLS0 va TBT0ms. A testlari: 0.879/0.773/0.783s; D: 2.258/0.763/0.770s. Har bir alohida test ≤0.8s bo‘lmagan. Kod o‘zgarmagan holda ham Google laboratoriya natijalari tebrandi; bitta qulay natija tanlanmadi. Bu barcha tarmoq va keyingi testlar uchun tezlik kafolati emas.

[To‘liq o‘lchovlar va rasmiy Google hisobot havolalari](PERFORMANCE.txt). O‘lchangan HTML `3a64ae8` versiyasiniki; keyingi siqish yordamchisi va hujjatlar uning baytlarini o‘zgartirmaydi.
