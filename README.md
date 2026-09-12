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
- Tezlik hozir ochiq Vercel manzilida rasmiy Google PageSpeed Insights orqali tekshiriladi. Maqsad: mobil Speed Index ≤800ms. Performance 100 yoki FCP 0.8s bu maqsad bajarilganini anglatmaydi; oldingi localhost natijalari ochiq hosting natijasi emas.
- Birinchi ekran rasmlari, lokal shrift va sahifa uslublari HTML bilan birga keladi. Ariza oynasi birinchi CTA bosilganda yaratiladi va shu bosishda ochiladi; uning ishlatilmagan uslublari dastlabki sahifani qayta chizdirmaydi. Pastdagi suratlar ko‘rinishiga yaqin yuklanadi. `/` ikkinchi hujjat so‘rovisiz asosiy saytni ochadi.
- Oxirgi forma o‘zgarishidan keyin 57 ta lokal/mock tekshiruv qayta o‘tdi. 412×823 ekran va DPR1/2 sinovlarida gorizontal chiqish aniqlanmadi. Google PSI’da oxirgi tasdiqlangan natija hali ≤800ms talabiga yetmagan; natijani faqat joriy deploy bilan solishtiring.
- Rasmlar lokal AVIF, shriftlar WOFF2. Yetkazilgan shrift haqidagi qayd har bir variantning `fonts/launch-font-notice.txt` faylida.
