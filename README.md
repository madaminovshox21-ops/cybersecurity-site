# CyberShield Akademiya

O‘zbek tilidagi amaliy kiberxavfsizlik o‘quv platformasi. Statik sayt — hech qanday
backend yoki build talab qilmaydi, to‘g‘ridan-to‘g‘ri brauzerda ishlaydi.

## Nimalar bor

- **Darsliklar** (`#/darsliklar`) — 5 yo‘nalishda 14 ta to‘liq dars: asoslar, tizimlarni
  himoyalash, monitoring va insidentlar, xavfsiz dasturlash, shaxsiy xavfsizlik.
  Har bir dars amaliy topshiriq bilan. O‘qilgan darslar brauzer xotirasida belgilanadi.
- **Buyruqlar bazasi** (`#/buyruqlar`) — 60+ o‘quv buyrug‘i (tarmoq, DNS, log tahlili,
  server mustahkamlash, shifrlash) qidiruv va bir bosishda nusxa olish bilan.
- **Vositalar** (`#/vositalar`) — parol kuchini tekshirish, SHA xesh generatori,
  subnet kalkulyatori, portlar maʼlumotnomasi va shaxsiy xavfsizlik tekshiruvi.
  Hammasi brauzerda, oflayn hisoblanadi; maʼlumot hech qayerga yuborilmaydi.
- **AI xavfsizligi** (`#/ai`) — AI himoyada va hujumda, OWASP LLM Top 10 asosidagi xavflar.
- **Yangiliklar** (`#/yangiliklar`) — muhim hodisalar tarixi, mashhur CVE lar va saboqlar.
- **Lug‘at** (`#/lugat`) — 40 ta asosiy atama o‘zbekcha izohi bilan.
- **Test** (`#/test`) — 15 savollik bilim testi, har javobga izoh bilan.
- Global qidiruv (`/` tugmasi), yorug‘/qorong‘i mavzu, to‘liq moslashuvchan dizayn.

## Ishga tushirish

Oddiy statik server yetarli:

```bash
python3 -m http.server 8099
# so‘ng brauzerda: http://localhost:8099
```

Yoki GitHub Pages, Netlify, Vercel kabi statik hostinglarga to‘g‘ridan-to‘g‘ri joylash mumkin.

## Tuzilishi

```
index.html            — sahifa qobig‘i (header, footer, qidiruv)
assets/css/main.css   — barcha uslublar (yorug‘ va qorong‘i mavzu)
assets/js/icons.js    — SVG ikonkalar
assets/js/app.js      — SPA router va sahifalar
assets/js/ui.js       — mavzu, menyu, qidiruv, fon animatsiyasi
data/*.js             — kontent (darslar, buyruqlar, lug‘at, test, yangiliklar, AI)
```

Yangi dars qo‘shish uchun `data/lessons-*.js` dagi `window.LESSONS.push({...})` namunasiga
amal qiling — sayt uni avtomatik ko‘rsatadi.

## Etika

Bu materiallar taʼlim va himoya uchun. Ruxsatsiz tizimlarni skanerlash yoki sinash qonunga
zid. Mashq uchun o‘z virtual laboratoriyangiz yoki TryHackMe, HackTheBox, rasmiy bug bounty
dasturlaridan foydalaning.
