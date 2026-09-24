/* Muhim kiberxavfsizlik hodisalari va ulardan saboqlar (o‘quv maqsadida tanlangan).
   Jonli yangiliklar uchun quyidagi rasmiy manbalarni kuzating. */
window.NEWS_SOURCES = [
  { name: "The Hacker News", url: "https://thehackernews.com" },
  { name: "BleepingComputer", url: "https://www.bleepingcomputer.com" },
  { name: "Krebs on Security", url: "https://krebsonsecurity.com" },
  { name: "CISA Alerts", url: "https://www.cisa.gov/news-events/cybersecurity-advisories" },
  { name: "NVD (zaifliklar bazasi)", url: "https://nvd.nist.gov" },
  { name: "OWASP", url: "https://owasp.org" },
  { name: "O‘zbekiston Kiberxavfsizlik markazi", url: "https://csec.uz" }
];

/* Diqqatga sazovor CVE lar — o‘rganish uchun. */
window.NOTABLE_CVE = [
  { id: "CVE-2021-44228", name: "Log4Shell", sev: "Kritik (10.0)", note: "Apache Log4j kutubxonasidagi masofaviy kod bajarish. Millionlab Java ilovasiga taʼsir qildi." },
  { id: "CVE-2017-0144", name: "EternalBlue", sev: "Kritik", note: "Windows SMBv1 zaifligi. WannaCry va NotPetya shu orqali tarqalgan." },
  { id: "CVE-2014-0160", name: "Heartbleed", sev: "Yuqori", note: "OpenSSL da xotira sizishi — serverdan maxfiy kalitlarni o‘qish mumkin edi." },
  { id: "CVE-2019-0708", name: "BlueKeep", sev: "Kritik", note: "Windows RDP da autentifikatsiyasiz masofaviy kod bajarish." },
  { id: "CVE-2023-4863", name: "WebP (libwebp)", sev: "Kritik", note: "Rasm ochish orqali kod bajarish — brauzer va ko‘plab ilovalarga taʼsir qildi." }
];

/* Hodisalar tarixi va ulardan asosiy saboq. */
window.TIMELINE = [
  { date: "2010", title: "Stuxnet", text: "Sanoat boshqaruv tizimlarini (SCADA) nishonga olgan murakkab qurt. Kiberqurol davrini boshladi.",
    lesson: "Saboq: fizik izolyatsiya (air gap) ham to‘liq himoya emas — USB orqali ham yuqadi." },
  { date: "2013–2014", title: "Yirik chakana savdo buzilishlari", text: "To‘lov terminallaridagi zararli dastur orqali millionlab karta maʼlumoti o‘g‘irlandi.",
    lesson: "Saboq: tarmoqni segmentlash va uchinchi tomon (hamkor) kirishini cheklash muhim." },
  { date: "2017", title: "WannaCry va NotPetya", text: "EternalBlue zaifligidan foydalangan ransomware butun dunyo bo‘ylab yuz minglab kompyuterni ishdan chiqardi.",
    lesson: "Saboq: yangilanishlarni o‘z vaqtida o‘rnatish va SMBv1 kabi eski protokollarni o‘chirish hayotiy zarur." },
  { date: "2020", title: "Taʼminot zanjiri orqali hujum", text: "Keng ishlatiladigan boshqaruv dasturining yangilanishiga backdoor qo‘shildi va u minglab tashkilotga tarqaldi.",
    lesson: "Saboq: taʼminot zanjiri xavfsizligi va yangilanishlar butunligini tekshirish (imzo) zarur." },
  { date: "2021", title: "Log4Shell (CVE-2021-44228)", text: "Oddiy log yozuvi orqali masofadan kod bajarish. Deyarli har bir Java infratuzilmasiga taʼsir qildi.",
    lesson: "Saboq: qaysi kutubxonalardan foydalanayotganingizni biling (SBOM) va tez patch qila oling." },
  { date: "2023–2024", title: "MOVEit va fayl uzatish tizimlari", text: "Fayl almashish platformalaridagi zaifliklar orqali ommaviy maʼlumot o‘g‘irlash va tovlamachilik.",
    lesson: "Saboq: internetga qaragan qurilmalarni birinchi navbatda yangilang va monitoring qiling." },
  { date: "2024–2025", title: "AI bilan kuchaytirilgan fishing va deepfake", text: "Sun’iy intellekt yordamida ishonarli fishing xatlari va soxta ovoz/video orqali firibgarlik ko‘paydi.",
    lesson: "Saboq: shaxsni faqat ovoz yoki video bilan tasdiqlamang. Kod so‘z va rasmiy kanaldan qayta tekshiruv qo‘llang." }
];
