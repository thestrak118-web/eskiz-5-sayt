ESKIZ — FOYDALANUVCHI YUBORGAN 5 TA SAYT

Paket ichidagi fayllarni hostingning asosiy papkasiga joylang.
Asosiy / manzil /a/ ga o‘tadi; URL parametrlari va fragment saqlanadi.
/a/ — oq-qizil; /b/ — qora-oltin; /c/ — bordo-oltin;
/d/ — eskiz-daftar; /e/ — qizil-qora.
Har bir variant papkasini mustaqil hostingga ko‘chirish ham mumkin.

Ulanishlar: har bir variantning js/config.js faylini to‘ldiring.
endpointUrl — shu eskiz vebinari uchun Google Apps Script /exec manzili.
telegramUrl — shu vebinar Telegram kanali.
pixelId — Meta Pixel ID, kerak bo‘lsa. sheetName — jadval varag‘i, kerak bo‘lsa.
Hozir bu qiymatlar bo‘sh. Foydalanuvchi ularni oxirida beradi.

Forma faqat telefon so‘raydi: +998 va 9 ta raqam.
Endpoint ulanmaguncha yuborish o‘chirilgan, soxta muvaffaqiyat yo‘q.
POST FormData kalitlari: Telefon raqam, Royhatdan o'tgan vaqti,
va sheetName (faqat sozlangan bo‘lsa). Vaqt: Asia/Tashkent.
Server HTTP 2xx va {"ok":true}, {"success":true} yoki {"status":"success"}
JSON tasdig‘ini qaytargach, shu variantning thankYou.html sahifasi ochiladi.
Endpoint brauzer so‘rovlarini qabul qilishi kerak (CORS).
Telefon raqami URL yoki browser storage ichiga yozilmaydi.
Telegram ulanmaguncha thank you sahifasidagi kanal tugmasi o‘chirilgan.

Dizayn, matnlar, sanalar va Launch shrifti yuborilgan ZIPdan saqlangan.
Rasmlar AVIF va shrift WOFF2 formatida yengillashtirilgan.
Vercel konfiguratsiyasi br qo‘llaydigan brauzerga oldindan siqilgan HTMLni beradi.
Oddiy HTML ham saqlangan. HTMLni o‘zgartirganda uning .html.br nusxasini ham
qayta yarating; aks holda brauzerlarda turli versiyalar ochiladi.
Ushbu paket Figma fayli emas; yangi Figma maketi talab qilinmagan.
