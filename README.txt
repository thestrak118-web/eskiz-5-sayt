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
Endpoint foydalanuvchi bergan yangi manzilga ulangan. Varaq: Lead.
Telegram kanali va Pixel ID hali berilmagan.

Forma ism va davlat kodi bilan telefon so‘raydi. Standart: +998 va 9 raqam.
92 davlat tanlovi bor; raqam uzunligi davlatga ko‘ra tekshiriladi.
+998 uchun 9 tadan ortiq raqam yozilmaydi. Uzun paste to‘liq rad etiladi;
oldingi qiymat yuborilmasligi uchun raqamni tuzatish talab qilinadi.
Ism harflar, bo‘shliq, apostrof, chiziqcha yoki nuqtadan iborat bo‘ladi.
Endpoint ulanmaguncha yuborish o‘chirilgan, soxta muvaffaqiyat yo‘q.
POST FormData kalitlari: Ism, Telefon raqam, Royhatdan o'tgan vaqti,
va sheetName (faqat sozlangan bo‘lsa). Vaqt: Asia/Tashkent.
To‘g‘ri ism/telefon kiritilgach shu variantning thankYou.html sahifasi darhol ochiladi.
Ariza shu tabning sessionStorage xotirasida vaqtincha saqlanadi va thank you
sahifasida fonda yuboriladi. Kalit: webinar.pending:<variant-path>.
Server HTTP 2xx va {"ok":true}, {"success":true}, {"status":"success"} yoki {"result":"success"}
JSON tasdig‘ini qaytargach vaqtinchalik ariza o‘chiriladi.
Xatoda ariza saqlanadi va Qayta yuborish tugmasi ko‘rinadi; sahifa yangilansa
tasdiqlanmagan ariza yana yuboriladi. Bu serverdagi takroriy yozuvlarni kafolatli
bartaraf etmaydi; tasdiqlangan ariza shu tabda qayta yuborilmaydi.
Endpoint brauzer so‘rovlarini qabul qilishi kerak (CORS).
Ism va telefon URL yoki localStorage ichiga yozilmaydi.
Telegram ulanmaguncha thank you sahifasidagi kanal tugmasi o‘chirilgan.

Dizayn, matnlar, sanalar va Launch shrifti yuborilgan ZIPdan saqlangan.
Rasmlar AVIF va shrift WOFF2 formatida yengillashtirilgan.
Vercel konfiguratsiyasi br qo‘llaydigan brauzerga oldindan siqilgan HTMLni beradi.
Oddiy HTML ham saqlangan. HTMLni o‘zgartirganda uning .html.br nusxasini ham
qayta yarating; aks holda brauzerlarda turli versiyalar ochiladi.
HTML tahriridan keyin: node compress.cjs — tashqi paketsiz qayta siqadi.
Tayyor .html.br nusxalarni HTML bilan birga commit yoki hostingga yuklang.
Ushbu paket Figma fayli emas; yangi Figma maketi talab qilinmagan.
