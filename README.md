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
- Lokal shrift va sahifa uslublari HTML bilan birga keladi; tiniq hero rasmi head ichida preload qilinadi va asinxron dekodlanadi. Ariza oynasi birinchi CTA bosilganda yaratiladi va shu bosishda ochiladi; uning ishlatilmagan uslublari dastlabki sahifani qayta chizdirmaydi. Pastdagi suratlar ko‘rinishiga yaqin yuklanadi. `/` ikkinchi hujjat so‘rovisiz asosiy saytni ochadi.
- Oxirgi forma o‘zgarishidan keyin 57 ta lokal/mock tekshiruv qayta o‘tdi. 412×823 ekran va DPR1/2/1.75 sinovlarida gorizontal chiqish aniqlanmadi.
- Rasmlar lokal AVIF, shriftlar WOFF2. Yetkazilgan shrift haqidagi qayd har bir variantning `fonts/launch-font-notice.txt` faylida.

## Rasm va matn sifati — joriy tuzatish

Foydalanuvchi tezlik uchun kichraytirilgan rasmlarning xiraligini rad etdi. Portretlar haqiqiy original fotosuratlardan 850px/q65 AVIF bilan qayta tayyorlandi; pastdagi eskiz kartochkasi 600px/q60, kichik bonus uchun alohida 340px/q65 nusxa ishlatiladi. A va B izohlari 16px Arial, 270px matn eni, 1.45 qator oralig‘i va muvozanatli ikki qator bilan o‘qiladi. B’dagi raqamli kartochkalar bir xil balandlikda. Matnlar va shrift oilasi saqlangan.

Yangi yuklash tartibi rasmiy Google PSI bilan tekshirildi. Katta fotosuratlar endi HTMLga base64 qilib qo‘shilmaydi; 850px fayl o‘zgarmagan holda preload/async bilan yuklanadi. Hujjat hajmi Brotli bilan 5.2–5.6KB. Quyidagi tezlik qiymatlari past sifatli oldingi rasmlarga tegishli; ularni yangi build natijasi deb ko‘rsatmang.

## Joriy mobil tezlik — tiniq rasmlar bilan

| Manzil | Speed Index |
| --- | ---: |
| `/ → /a/` | 1.499s |
| `/b/` | 1.009s |
| `/c/` | 0.894s |
| `/d/` | 0.833s |
| `/e/` | 0.772s |

Barcha besh o‘lchovda Performance **100**, CLS **0** va TBT **0 ms**. Mobil ≤0.8s talabi barcha variantlarda **hali bajarilmagan**; bu to‘plamda faqat E aniq 800ms dan past. Har bir manzil bir marta tekshirildi, qulay natija olish uchun qayta o‘lchanmadi. Asosiy manzil ochilgach `/a/` ko‘rinadi; to‘g‘ridan-to‘g‘ri `/a/` alohida o‘lchanmagan.

[To‘liq joriy natijalar, rasmiy Google hisobotlari va avvalgi o‘lchovlar](PERFORMANCE.txt). Avvalgi 0.767–0.788s qiymatlar kichik/xira suratlar bilan olingan; ular yangi sifatli versiyaga tegishli emas. Tiniqlikni tiklashdan keyingi katta inline suratlar ham alohida oraliq o‘lchov sifatida saqlangan. Jadval `84630cc` versiyasining o‘lchovidir. Keyin B kartochkalarining matn eni va qator oralig‘i tuzatildi; aynan shu kichik CSS o‘zgarishidan keyin B tezligi qayta o‘lchanmagan. Boshqa sahifalar va rasm fayllari o‘zgarmagan.
