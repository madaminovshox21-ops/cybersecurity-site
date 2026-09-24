/* Dasturlash tillari — xavfsizlik nuqtai nazaridan cheat-sheet.
   Har til: xavfli va xavfsiz kod juftliklari + amaliy maslahatlar. */
window.LANGUAGES = [
{
  id: "python",
  name: "Python",
  tag: "Skript, avtomatlashtirish, backend",
  intro: "Python — kiberxavfsizlikda eng ko‘p ishlatiladigan til: avtomatlashtirish, log tahlili, veb va vositalar yozish uchun. Quyida eng muhim xavfsizlik naqshlari.",
  blocks: [
    { h: "SQL so‘rovlari — parametrlang", bad:
`# XAVFLI — SQL injection
cur.execute(f"SELECT * FROM users WHERE email = '{email}'")`,
      good:
`# TO‘G‘RI — parametrlangan
cur.execute("SELECT * FROM users WHERE email = %s", (email,))`,
      note: "Foydalanuvchi kiritganini hech qachon so‘rov matniga qo‘shmang." },
    { h: "Shell buyruqlari — shell=True dan qoching", bad:
`import os
os.system(f"ping {host}")          # buyruq inyeksiyasi`,
      good:
`import subprocess
subprocess.run(["ping", "-c", "1", host], check=True)  # ro‘yxat, shellsiz`,
      note: "Argumentlarni ro‘yxat sifatida bering, shell=True ishlatmang." },
    { h: "Parollarni xeshlang", bad:
`import hashlib
h = hashlib.md5(password.encode()).hexdigest()   # zaif`,
      good:
`# pip install argon2-cffi
from argon2 import PasswordHasher
ph = PasswordHasher()
h = ph.hash(password)
ph.verify(h, password)`,
      note: "Argon2id yoki bcrypt. MD5/SHA-1 parol uchun yaroqsiz." },
    { h: "Tasodifiy sonlar — secrets ishlating", bad:
`import random
token = random.randint(0, 999999)   # bashorat qilinadi`,
      good:
`import secrets
token = secrets.token_urlsafe(32)   # kriptografik jihatdan xavfsiz`,
      note: "random moduli xavfsizlik uchun emas. Tokenlar uchun secrets." },
    { h: "Sirlar — muhit o‘zgaruvchisidan", bad:
`API_KEY = "sk-abc123..."           # kodda saqlamang`,
      good:
`import os
API_KEY = os.environ["API_KEY"]    # .env / secret manager`,
      note: ".env faylini .gitignore ga qo‘shing." },
    { h: "Fayl yo‘llari — path traversal’dan himoya", bad:
`open(os.path.join(BASE, user_filename))   # ../../etc/passwd`,
      good:
`import os
p = os.path.realpath(os.path.join(BASE, user_filename))
if not p.startswith(os.path.realpath(BASE) + os.sep):
    raise ValueError("Ruxsatsiz yo‘l")`,
      note: "Yakuniy yo‘l ruxsat etilgan katalog ichida ekanini tekshiring." }
  ],
  tools: ["bandit — statik xavfsizlik tahlili", "pip-audit — zaif paketlar", "safety — bog‘liqliklar", "ruff / mypy — sifat va turlar"]
},
{
  id: "javascript",
  name: "JavaScript / Node.js",
  tag: "Frontend va backend",
  intro: "JavaScript brauzerda ham, serverda ham (Node.js) ishlaydi. Asosiy xavflar: XSS, injection va noxavfsiz bog‘liqliklar.",
  blocks: [
    { h: "DOM — innerHTML dan qoching", bad:
`el.innerHTML = userInput;          // XSS`,
      good:
`el.textContent = userInput;        // matn sifatida
// HTML kerak bo‘lsa:
el.innerHTML = DOMPurify.sanitize(userHtml);`,
      note: "Foydalanuvchi matnini textContent bilan qo‘ying." },
    { h: "SQL — parametrlang (Node/pg)", bad:
"db.query(`SELECT * FROM u WHERE id = ${id}`)   // injection",
      good:
`db.query("SELECT * FROM u WHERE id = $1", [id])`,
      note: "Har doim placeholder va massiv orqali." },
    { h: "Shell — exec dan qoching", bad:
`const { exec } = require("child_process");
exec(\`convert \${file} out.png\`);   // injection`,
      good:
`const { execFile } = require("child_process");
execFile("convert", [file, "out.png"]);`,
      note: "execFile argumentlarni ro‘yxat sifatida oladi." },
    { h: "Parollar — bcrypt", bad:
`const crypto = require("crypto");
const h = crypto.createHash("sha256").update(pw).digest("hex");`,
      good:
`const bcrypt = require("bcrypt");
const h = await bcrypt.hash(pw, 12);
const ok = await bcrypt.compare(pw, h);`,
      note: "bcrypt yoki argon2 paketi. Tuzsiz SHA emas." },
    { h: "Seans cookie bayroqlari", bad:
`res.cookie("sid", id);             // himoyasiz`,
      good:
`res.cookie("sid", id, {
  httpOnly: true, secure: true, sameSite: "lax"
});`,
      note: "HttpOnly XSS dan, SameSite CSRF dan himoya qiladi." },
    { h: "Prototype pollution", bad:
`Object.assign(target, JSON.parse(userInput));  // __proto__ xavfi`,
      good:
`const obj = JSON.parse(userInput);
if (obj && (obj.__proto__ || obj.constructor)) throw new Error("bad");
// yoki Map / Object.create(null) ishlating`,
      note: "Ishonchsiz obyektlarni to‘g‘ridan-to‘g‘ri birlashtirmang." }
  ],
  tools: ["npm audit — zaif paketlar", "eslint-plugin-security", "helmet — xavfsizlik sarlavhalari", "DOMPurify — HTML tozalash"]
},
{
  id: "bash",
  name: "Bash",
  tag: "Skript va avtomatlashtirish",
  intro: "Bash serverlarni boshqarishda ajralmas. Kichik xatolar katta xavf tug‘diradi — quyida eng muhim qoidalar.",
  blocks: [
    { h: "Qat’iy rejim bilan boshlang", bad:
`#!/bin/bash
rm -rf $DIR/*            # DIR bo‘sh bo‘lsa — falokat`,
      good:
`#!/usr/bin/env bash
set -euo pipefail       # xatoda to‘xta, e’lonsiz o‘zgaruvchi — xato
: "\${DIR:?DIR belgilanishi shart}"
rm -rf -- "\${DIR:?}"/*`,
      note: "set -euo pipefail va o‘zgaruvchini tekshirish falokatlarni oldini oladi." },
    { h: "O‘zgaruvchilarni qo‘shtirnoqqa oling", bad:
`cp $file $dest          # bo‘shliqli nom — buziladi`,
      good:
`cp -- "$file" "$dest"`,
      note: "Har doim \"$var\" — so‘z bo‘linishi va globbing’dan himoya." },
    { h: "Foydalanuvchi kiritishini eval qilmang", bad:
`eval "$user_input"      # to‘liq nazoratni beradi`,
      good:
`case "$user_input" in
  start) systemctl start app ;;
  stop)  systemctl stop app ;;
  *) echo "Nomaʼlum buyruq"; exit 1 ;;
esac`,
      note: "eval o‘rniga aniq ruxsat etilgan variantlar (allowlist)." },
    { h: "Vaqtinchalik fayllar", bad:
`tmp=/tmp/mydata         # bashorat qilinadi, race condition`,
      good:
`tmp="$(mktemp)"
trap 'rm -f "$tmp"' EXIT`,
      note: "mktemp xavfsiz nom yaratadi, trap tozalaydi." },
    { h: "Maxfiy maʼlumot buyruq qatorida emas", bad:
`curl -H "Authorization: Bearer $TOKEN" ...   # ps da ko‘rinadi`,
      good:
`curl -H "@auth-header.txt" ...   # yoki --netrc / muhit o‘zgaruvchisi`,
      note: "ps aux barcha foydalanuvchilarga buyruq qatorini ko‘rsatadi." }
  ],
  tools: ["shellcheck — bash linter (majburiy)", "set -euo pipefail", "shfmt — formatlash"]
},
{
  id: "sql",
  name: "SQL",
  tag: "Maʼlumotlar bazasi",
  intro: "SQL injection o‘n yillar davomida eng keng tarqalgan veb-xavflardan biri. Yechim oddiy va bir xil: parametrlangan so‘rovlar va eng kam imtiyoz.",
  blocks: [
    { h: "Parametrlangan so‘rovlar (asosiy qoida)", bad:
`-- ilova kodida qatorni birlashtirish
"SELECT * FROM users WHERE name = '" + name + "'"`,
      good:
`-- placeholder + qiymatlar alohida uzatiladi
SELECT * FROM users WHERE name = ?;`,
      note: "Baza qiymatni buyruq emas, faqat maʼlumot deb qabul qiladi." },
    { h: "Eng kam imtiyozli foydalanuvchi", bad:
`-- ilova root/admin bilan ulanadi`,
      good:
`CREATE USER app WITH PASSWORD '...';
GRANT SELECT, INSERT, UPDATE ON app_db.* TO app;
-- DROP, GRANT, FILE huquqlari yo‘q`,
      note: "Ilova akkaunti faqat kerakli jadval va amallarga ega bo‘lsin." },
    { h: "Ommaviy amallarda WHERE ni unutmang", bad:
`UPDATE users SET active = 0;      -- hammasini o‘chirdi!`,
      good:
`UPDATE users SET active = 0 WHERE id = ?;
-- test: avval SELECT bilan tekshiring`,
      note: "Ishlab chiqarishda avval SELECT bilan qatorlar sonini tekshiring." },
    { h: "Maxfiy ustunlarni ochib qo‘ymang", bad:
`SELECT * FROM users;              -- password_hash ham keladi`,
      good:
`SELECT id, name, email FROM users;`,
      note: "Faqat kerakli ustunlarni tanlang, * dan qoching." }
  ],
  tools: ["Parametrlangan API (ORM)", "sqlmap — faqat o‘z bazangizda test uchun", "Baza audit loglari", "Eng kam imtiyoz"]
},
{
  id: "go",
  name: "Go",
  tag: "Backend, servislar, vositalar",
  intro: "Go tez, xavfsiz servislar va vositalar yozish uchun mashhur. Standart kutubxonaning o‘zi ko‘p xavfsizlik ehtiyojlarini qoplaydi.",
  blocks: [
    { h: "SQL — database/sql parametrlari", bad:
`db.Query("SELECT * FROM u WHERE id = " + id)  // injection`,
      good:
`db.Query("SELECT * FROM u WHERE id = $1", id)`,
      note: "Placeholder ($1, ?) va argumentlar alohida." },
    { h: "Buyruqlar — exec.Command", bad:
`exec.Command("sh", "-c", "ping "+host)   // injection`,
      good:
`exec.Command("ping", "-c", "1", host)    // argumentlar alohida`,
      note: "sh -c orqali qatorni uzatmang." },
    { h: "Xatolarni tekshiring", bad:
`data, _ := os.ReadFile(path)             // xatoni yutib yubordi`,
      good:
`data, err := os.ReadFile(path)
if err != nil {
    return fmt.Errorf("faylni o‘qishда: %w", err)
}`,
      note: "Go da xatoni e’tiborsiz qoldirish — xavfsizlik kamchiligi manbai." },
    { h: "Tasodifiy — crypto/rand", bad:
`import "math/rand"
token := rand.Int()                      // bashorat qilinadi`,
      good:
`import "crypto/rand"
b := make([]byte, 32)
rand.Read(b)                             // xavfsiz`,
      note: "math/rand xavfsizlik uchun emas. crypto/rand ishlating." },
    { h: "Parollar — bcrypt", bad:
`sum := sha256.Sum256([]byte(pw))         // tuzsiz, tez`,
      good:
`import "golang.org/x/crypto/bcrypt"
h, _ := bcrypt.GenerateFromPassword([]byte(pw), 12)
err := bcrypt.CompareHashAndPassword(h, []byte(pw))`,
      note: "golang.org/x/crypto/bcrypt yoki argon2." }
  ],
  tools: ["govulncheck — rasmiy zaiflik skaneri", "gosec — statik tahlil", "go vet — xatolar", "staticcheck — sifat"]
}
];
