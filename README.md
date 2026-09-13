# Eskiz vebinari — 5 ta sayt

3–4–5 sentabr, soat20:00 bo‘ladigan eskiz vebinari uchun yuborilgan beshta dizayn. Asosiy sayt: https://ai5-sayt.vercel.app

| Manzil | Dizayn |
| --- | --- |
| `/`, `/a/` | Oq-qizil — asosiy sayt |
| `/b/` | Qora-oltin |
| `/c/` | Bordo-oltin |
| `/d/` | Eskiz-daftar |
| `/e/` | Qizil-qora |

Har bir variant mustaqil statik sayt va o‘z `thankYou.html` sahifasiga ega. `/` asosiy sahifani ikkinchi HTML so‘rovisiz ochadi, `/a/` manziliga o‘tishda URL parametrlari va fragment saqlanadi. Konteyner425px gacha moslashadi.

## Ro‘yxatdan o‘tish

Foydalanuvchi yuborgan yangi modal barcha variantlarda ishlatiladi: ism, davlat kodi bilan telefon va qizil **DAVOM ETISH** tugmasi. Mobil oynasi oq fon va qora yopish paneli bilan ekran bo‘ylab ochiladi; kompyuterda markaziy dialog ko‘rinadi.

Yangi Apps Script manzili har bir variantning `js/config.js` faylida sozlangan. Varaq: **Lead**. FormData kalitlari: `Ism`, `Telefon raqam`, `Royhatdan o'tgan vaqti`, `sheetName`. Vaqt `Asia/Tashkent` bo‘yicha. Davlatlar ro‘yxatida92 tanlov bor; standart `+998`. Ismda harflar bo‘lishi shart; faqat raqamlar yoki harf/raqam aralash qiymat yuborilmaydi. Telefon tanlangan davlatning eng uzun oddiy raqami bilan cheklangan (+998 uchun9). Ortiqcha yozish yoki uzun raqamni nusxalab qo‘yish butun tahrirni rad etadi; oldingi qiymat yashirincha yuborilmasligi uchun raqam tuzatilmaguncha yuborish to‘xtaydi. Formatlash uzun raqamni kesib boshqa raqamga aylantirmaydi; telefon uzunligi tanlangan davlatning oddiy mobil/shahar raqamlariga ko‘ra tekshiriladi. Mamlakatga tegishli mahalliy prefiks olib tashlanadi; Italiya raqamidagi muhim boshlang‘ich nol saqlanadi.

Server HTTP2xx bilan `ok:true`, `success:true`, `status:"success"` yoki `result:"success"` JSON tasdig‘ini qaytargach shu variantning thank-you sahifasi ochiladi. Xatoda ism/telefon saqlanadi va qayta yuborish mumkin. Ism va telefon URL yoki browser storage’iga yozilmaydi; faqat shaxsiy ma’lumotsiz, variantga bog‘langan tasdiq belgisi saqlanadi.

Telegram kanali va Pixel ID hali berilmagan. Ularni tegishli `telegramUrl` va `pixelId` maydonlariga kiritish mumkin. Ulanishsiz Telegram tugmasi faollashmaydi, Pixel so‘rovi yuborilmaydi.

## Ko‘rinish va yuklash

Tasdiqlangan850px portretlar, shriftlar, ranglar va tuzatilgan soyalar saqlangan. B/E va C/D hero rasmlarining ekranda ko‘rinmaydigan qismlari qisqartirilgan; rasm tiniqligi pasaytirilmagan. A/B izohlari tartibli qatorlarga moslangan. B/C/D/E sarlavhalari ortidagi takroriy xira portretlar olib tashlangan; CTA va sovg‘a rasmlarining chetlari tuzatilgan.

To‘liq sahifa uslubi va lokal shrift HTML bilan keladi. Hero oldindan yuklanadi, pastdagi rasmlar kerak bo‘lganda ochiladi. Forma HTML/CSSi birinchi CTA bosilganda yaratiladi va shu bosishda ochiladi. Tashqi telefon kutubxonasi yoki yangi font so‘rovi qo‘shilmagan.

Quyidagi Google PSI natijalari d4148c5 versiyasiga tegishli (mobil, Lighthouse13.4.1). Keyingi ism/telefon cheklovi JSni o‘zgartirdi; bu tuzatishdan keyin tezlik qayta o‘lchanmagan. Sahifa HTMLi va rasmlar o‘zgarmagan:

| Manzil | Speed Index |
| --- | ---: |
| / → /a/ | 1.212s |
| /b/ | 0.762s |
| /c/ | 1.119s |
| /d/ | 0.771s |
| /e/ | 0.766s |

Barcha besh o‘lchovda Performance100, CLS0, TBT0ms. **B/D/E aniq0.8s chegarasiga yetdi; asosiy A va C hali yuqori.** Har bir manzil bir marta tekshirildi. Bu d4148c5 sahifa/runtime versiyasining o‘lchovi; keyingi hujjat tahrirlari shu fayllarni o‘zgartirmaydi. [Rasmiy hisobotlar va oldingi natijalar](PERFORMANCE.txt).

## Joylash

Oddiy statik hostingga fayllarni joylash kifoya. Lokal ko‘rish uchun `python3 -m http.server 8000`.

Vercel konfiguratsiyasi Brotli qo‘llaydigan brauzerga oldindan siqilgan `.html.br` faylni beradi. HTMLni tahrirlagandan so‘ng `node compress.cjs` ni ishga tushiring va HTML hamda yangilangan `.html.br` fayllarni birga yuklang. `config.js` ni o‘zgartirish HTMLni qayta siqishni talab qilmaydi.

Oldingi integratsiyada316 ta brauzer tekshiruvi o‘tdi (252 asosiy,33 dropdown va31 xalqaro format holati). Yangi ism/telefon cheklovi87 ta alohida tekshiruvdan o‘tdi:5 variantdagi raqam limiti, paste, qayta tahrirlash, kursor, davlat almashtirish, ism va tasdiqlangan thank-you o‘tishi. Haqiqiy tashqi test arizasi yuborilmagan; javoblar brauzer ichida mock qilingan.
