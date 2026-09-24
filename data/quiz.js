/* Bilim testi */
window.QUIZ = [
  { q: "CIA uchligiga qaysi uchta tamoyil kiradi?", opts: [
    "Maxfiylik, Butunlik, Mavjudlik",
    "Nazorat, Aniqlash, Javob",
    "Autentifikatsiya, Avtorizatsiya, Audit",
    "Shifrlash, Xeshlash, Imzolash"], a: 0,
    ex: "CIA — Confidentiality (maxfiylik), Integrity (butunlik) va Availability (mavjudlik)." },
  { q: "Quyidagilardan qaysi biri parollarni saqlash uchun eng yaxshi tanlov?", opts: [
    "MD5", "SHA-256 (tuzsiz)", "Argon2id", "Base64"], a: 2,
    ex: "Argon2id — sekin va xotira talab qiluvchi zamonaviy algoritm, OWASP tavsiyasi. Base64 umuman shifrlash emas." },
  { q: "TCP ulanishi qaysi ketma-ketlik bilan boshlanadi?", opts: [
    "ACK → SYN → FIN", "SYN → SYN-ACK → ACK", "GET → POST → PUT", "PING → PONG → ACK"], a: 1,
    ex: "Uch bosqichli qo‘l siqish: SYN, SYN-ACK, ACK." },
  { q: "Base64 nima qiladi?", opts: [
    "Maʼlumotni kalit bilan shifrlaydi",
    "Maʼlumotni kalitsiz kodlaydi — istalgan odam qaytara oladi",
    "Parolni xeshlaydi",
    "Faylni siqadi"], a: 1,
    ex: "Base64 — kodlash, shifrlash emas. U maxfiylik bermaydi." },
  { q: "SQL Injection ga qarshi eng ishonchli himoya qaysi?", opts: [
    "Kiritishdagi bo‘shliqlarni olib tashlash",
    "Maʼlumotlar bazasini yashirish",
    "Parametrlangan (prepared) so‘rovlar",
    "Kuchli admin paroli"], a: 2,
    ex: "Parametrlangan so‘rovlarda foydalanuvchi kiritgani buyruq emas, faqat maʼlumot sifatida qabul qilinadi." },
  { q: "Qaysi MFA usuli eng zaif hisoblanadi?", opts: [
    "FIDO2 kalit", "SMS kod", "TOTP ilova", "Passkey"], a: 1,
    ex: "SMS SIM-swap va SS7 hujumlariga zaif. FIDO2/passkey esa fishingga chidamli." },
  { q: "Ruxsatsiz tizimni skanerlash yoki sinash...", opts: [
    "Agar zarar yetkazilmasa ruxsat etiladi",
    "Portfolio uchun foydali",
    "Qonunga zid va jinoiy javobgarlikka olib keladi",
    "Faqat kechqurun ruxsat etiladi"], a: 2,
    ex: "Ruxsatsiz kirish va skanerlash jinoyat. Faqat o‘z laboratoriyangiz yoki ruxsat berilgan platformalarda mashq qiling." },
  { q: "chmod 777 fayl.sh nimani anglatadi?", opts: [
    "Faqat egasi to‘liq huquqqa ega",
    "Hamma o‘qiy, yoza va ishga tushira oladi",
    "Fayl shifrlanadi",
    "Fayl faqat root uchun"], a: 1,
    ex: "777 — egasi, guruh va boshqalar uchun rwx. Bu xavfli, ishlatmaslik kerak." },
  { q: "Ransomware’ga qarshi eng muhim himoya nima?", opts: [
    "Kuchli antivirus",
    "Sinab ko‘rilgan, ajratilgan zaxira nusxalar",
    "Tez internet",
    "Ko‘p monitor"], a: 1,
    ex: "3-2-1 qoidasiga muvofiq, tiklanishi tekshirilgan va asosiy tarmoqdan ajratilgan zaxira — asosiy himoya." },
  { q: "Windows Event ID 4625 nimani bildiradi?", opts: [
    "Muvaffaqiyatli kirish", "Muvaffaqiyatsiz kirish urinishi",
    "Yangi foydalanuvchi yaratildi", "Xizmat o‘rnatildi"], a: 1,
    ex: "4625 — muvaffaqiyatsiz kirish. Ko‘p takrorlansa, parol tanlash urinishi bo‘lishi mumkin." },
  { q: "Fishing xatining eng keng tarqalgan belgisi qaysi?", opts: [
    "Rasmiy logotip borligi",
    "Shoshiltirish va qo‘rqitish (masalan: “24 soatda tasdiqlang”)",
    "Uzun matn",
    "Rasm borligi"], a: 1,
    ex: "Shoshilish hissi — ijtimoiy muhandislikning asosiy quroli. To‘xtab, rasmiy kanal orqali tekshiring." },
  { q: "API kalitini qayerda saqlamaslik kerak?", opts: [
    "Muhit o‘zgaruvchisida (.env)",
    "Secret manager’da",
    "To‘g‘ridan-to‘g‘ri kod ichida va Git’da",
    "Parol menejerida"], a: 2,
    ex: "Kod ichidagi kalit Git tarixiga tushadi va botlar tomonidan topiladi. .env yoki secret manager ishlating." },
  { q: "Zero Trust modeli nimaga asoslangan?", opts: [
    "Ichki tarmoqqa to‘liq ishonish",
    "Hech kimga oldindan ishonmaslik, har bir so‘rovni tekshirish",
    "Faqat firewall’ga tayanish",
    "Parollarni butunlay bekor qilish"], a: 1,
    ex: "Zero Trust: “hech qachon ishonma, doim tekshir”. Joylashuvdan qat’i nazar har bir so‘rov autentifikatsiya qilinadi." },
  { q: "TLS 1.3 ning forward secrecy xususiyati nimani taʼminlaydi?", opts: [
    "Trafik tezroq ishlaydi",
    "Server kaliti keyin o‘g‘irlansa ham, eski trafik ochilmaydi",
    "Parol talab qilinmaydi",
    "Sertifikat bepul bo‘ladi"], a: 1,
    ex: "Forward secrecy: har bir seans uchun alohida kalit hosil qilinadi, shuning uchun kelajakdagi kalit o‘g‘irligi o‘tmish trafikni ochmaydi." },
  { q: "Qaysi port internetga ochiq bo‘lmasligi kerak?", opts: [
    "443 (HTTPS)", "80 (HTTP)", "3389 (RDP)", "53 (DNS)"], a: 2,
    ex: "RDP (3389) — ransomware guruhlarining asosiy kirish yo‘li. Uni faqat VPN orqali ishlating." }
];
