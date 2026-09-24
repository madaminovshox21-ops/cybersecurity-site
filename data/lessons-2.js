/* Darsliklar: 2-qism — Himoya, monitoring, xavfsiz dasturlash, shaxsiy xavfsizlik */
window.LESSONS = window.LESSONS || [];

window.LESSONS.push(
{
  id: "linux-server-himoyasi",
  track: "himoya",
  level: 2,
  minutes: 30,
  title: "Linux serverni mustahkamlash",
  summary: "Yangi serverni internetga chiqarishdan oldin bajariladigan choralar: SSH, firewall, fail2ban, yangilanishlar va audit.",
  sections: [
    { id: "reja", h: "Birinchi 30 daqiqa rejasi", html: `
<ol>
  <li>Tizimni yangilang va avtomatik xavfsizlik yangilanishlarini yoqing.</li>
  <li>root o‘rniga ishlash uchun sudo huquqli oddiy foydalanuvchi yarating.</li>
  <li>SSH ga faqat kalit orqali kirishni sozlang, parol va root kirishini o‘chiring.</li>
  <li>Firewall yoqing: faqat kerakli portlar ochiq bo‘lsin.</li>
  <li>fail2ban o‘rnating.</li>
  <li>Keraksiz xizmatlarni o‘chiring.</li>
  <li>Zaxira nusxa va monitoringni sozlang.</li>
</ol>` },
    { id: "yangilash", h: "Yangilanishlar va foydalanuvchi", html: `
<pre><code>sudo apt update &amp;&amp; sudo apt full-upgrade -y
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure --priority=low unattended-upgrades

sudo adduser admin
sudo usermod -aG sudo admin</code></pre>` },
    { id: "ssh", h: "SSH ni xavfsiz sozlash", html: `
<p>Avval o‘z kompyuteringizda kalit yarating va serverga nusxalang:</p>
<pre><code>ssh-keygen -t ed25519 -C "admin@kompaniya.uz"
ssh-copy-id admin@SERVER_IP</code></pre>
<p>Keyin <code>/etc/ssh/sshd_config</code> faylida (yoki <code>/etc/ssh/sshd_config.d/10-hardening.conf</code>):</p>
<pre><code>PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
AllowUsers admin
X11Forwarding no</code></pre>
<pre><code>sudo sshd -t                 <span class="cmt"># sintaksisni tekshirish</span>
sudo systemctl reload ssh</code></pre>
<div class="callout warn"><b>Ehtiyot bo‘ling</b><p>Joriy SSH seansini yopmang. Yangi terminalda kalit bilan kira olishingizni tekshirib ko‘rganingizdan keyingina chiqing. Aks holda serverga kirish yo‘lini yo‘qotishingiz mumkin.</p></div>` },
    { id: "firewall", h: "Firewall (UFW)", html: `
<pre><code>sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80,443/tcp        <span class="cmt"># faqat veb-server bo‘lsa</span>
sudo ufw enable
sudo ufw status verbose</code></pre>
<p>Maʼlumotlar bazasi portlari (3306, 5432, 6379, 27017) hech qachon internetga ochilmasligi kerak. Ularga faqat ichki tarmoqdan yoki SSH tunnel orqali ulaning.</p>` },
    { id: "fail2ban", h: "fail2ban", html: `
<p>fail2ban loglarni kuzatadi va ko‘p marta noto‘g‘ri kirishga uringan IP manzillarni vaqtincha bloklaydi.</p>
<pre><code>sudo apt install fail2ban -y
sudo tee /etc/fail2ban/jail.local &gt;/dev/null &lt;&lt;'EOF'
[sshd]
enabled  = true
maxretry = 5
findtime = 10m
bantime  = 1h
EOF
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd</code></pre>` },
    { id: "audit", h: "Holatni tekshirish", html: `
<pre><code>ss -tulpn                                  <span class="cmt"># tinglayotgan portlar</span>
systemctl list-units --type=service --state=running
sudo lynis audit system                    <span class="cmt"># bepul xavfsizlik auditi, tavsiyalar beradi</span>
sudo journalctl -u ssh --since "1 hour ago"
last -n 20                                 <span class="cmt"># oxirgi kirishlar</span></code></pre>
<p>Chuqurroq mustahkamlash uchun <strong>CIS Benchmarks</strong> hujjatlaridan foydalaning. Ular har bir OS uchun bepul va batafsil tavsiyalar beradi.</p>` }
  ],
  keypoints: [
    "SSH: faqat kalit, root kirishi o‘chirilgan, AllowUsers bilan cheklangan.",
    "Firewall standart holatda kiruvchi ulanishlarni rad etsin.",
    "Maʼlumotlar bazasi portlari internetga ochiq bo‘lmasin.",
    "Lynis va CIS Benchmarks bilan muntazam audit qiling."
  ],
  practice: `<p>Virtual mashinada yoki arzon VPS da yuqoridagi rejani to‘liq bajaring. Oxirida <code>sudo lynis audit system</code> ishga tushiring va “Hardening index” ko‘rsatkichini yozib oling. Keyin 3 ta tavsiyani bajarib, ko‘rsatkich qanday o‘zgarganini solishtiring.</p>`
},

{
  id: "windows-xavfsizligi",
  track: "himoya",
  level: 2,
  minutes: 25,
  title: "Windows xavfsizligi asoslari",
  summary: "Microsoft Defender, BitLocker, yangilanishlar, UAC, lokal administrator huquqlari va muhim hodisa jurnallari.",
  sections: [
    { id: "asosiy", h: "Asosiy sozlamalar", html: `
<ul>
  <li><strong>Windows Update</strong> — avtomatik yangilanishlar yoqilgan bo‘lsin.</li>
  <li><strong>Microsoft Defender</strong> — real vaqt himoyasi, <em>Tamper Protection</em> va <em>Controlled folder access</em> (ransomware’dan himoya).</li>
  <li><strong>BitLocker</strong> — diskni shifrlash. Noutbuk o‘g‘irlansa maʼlumotlar himoyalangan bo‘ladi. Tiklash kalitini xavfsiz joyda saqlang.</li>
  <li><strong>UAC</strong> — hech qachon o‘chirmang.</li>
  <li>Kundalik ish uchun <strong>administrator bo‘lmagan</strong> akkaunt ishlating.</li>
  <li>Keraksiz bo‘lsa <strong>RDP</strong> ni o‘chiring. Kerak bo‘lsa faqat VPN orqali va NLA bilan ishlating.</li>
  <li><strong>SMBv1</strong> ni o‘chiring. U eski va xavfli protokol.</li>
</ul>` },
    { id: "ps", h: "PowerShell bilan tekshirish", html: `
<pre><code><span class="cmt"># Defender holati</span>
Get-MpComputerStatus | Select AntivirusEnabled, RealTimeProtectionEnabled, AntivirusSignatureLastUpdated
Update-MpSignature
Start-MpScan -ScanType QuickScan

<span class="cmt"># BitLocker holati</span>
Get-BitLockerVolume

<span class="cmt"># SMBv1 ni tekshirish va o‘chirish</span>
Get-SmbServerConfiguration | Select EnableSMB1Protocol
Set-SmbServerConfiguration -EnableSMB1Protocol $false

<span class="cmt"># Lokal administratorlar</span>
Get-LocalGroupMember -Group "Administrators"

<span class="cmt"># Firewall profillari</span>
Get-NetFirewallProfile | Select Name, Enabled

<span class="cmt"># O‘rnatilgan yangilanishlar</span>
Get-HotFix | Sort-Object InstalledOn -Descending | Select -First 10</code></pre>` },
    { id: "event", h: "Muhim hodisa ID lari", html: `
<p>Windows Event Log — tergov va monitoringning asosiy manbai. <strong>Security</strong> jurnalidagi eng muhim ID lar:</p>
<div class="table-wrap"><table>
<tr><th>ID</th><th>Hodisa</th><th>Nimaga qarash kerak</th></tr>
<tr><td>4624</td><td>Muvaffaqiyatli kirish</td><td>Logon Type: 2 — interaktiv, 3 — tarmoq, 10 — RDP</td></tr>
<tr><td>4625</td><td>Muvaffaqiyatsiz kirish</td><td>Qisqa vaqtda ko‘p urinish — parol tanlash urinishi</td></tr>
<tr><td>4672</td><td>Maxsus imtiyozlar berildi</td><td>Admin kirishi</td></tr>
<tr><td>4688</td><td>Yangi jarayon yaratildi</td><td>Shubhali dasturlar (buyruq qatorini loglash yoqilgan bo‘lsa)</td></tr>
<tr><td>4720</td><td>Foydalanuvchi yaratildi</td><td>Kutilmagan yangi akkaunt</td></tr>
<tr><td>4732</td><td>Lokal guruhga qo‘shildi</td><td>Administrators guruhiga qo‘shilish</td></tr>
<tr><td>1102</td><td>Audit jurnali tozalandi</td><td>Izlarni yashirish belgisi bo‘lishi mumkin</td></tr>
<tr><td>7045</td><td>Yangi xizmat o‘rnatildi (System jurnali)</td><td>Noaniq xizmatlar</td></tr>
</table></div>
<pre><code><span class="cmt"># Oxirgi 24 soatdagi muvaffaqiyatsiz kirishlar</span>
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625; StartTime=(Get-Date).AddDays(-1)} |
  Select TimeCreated, @{n='User';e={$_.Properties[5].Value}}, @{n='IP';e={$_.Properties[19].Value}}</code></pre>
<div class="callout tip"><b>Maslahat</b><p>Monitoring sifatini oshirish uchun Microsoft’ning bepul <strong>Sysmon</strong> vositasini o‘rnating. U jarayonlar, tarmoq ulanishlari va fayl o‘zgarishlari haqida ancha batafsil loglar yozadi.</p></div>` }
  ],
  keypoints: [
    "Defender, BitLocker va avtomatik yangilanishlar — minimal talab.",
    "Kundalik ish admin bo‘lmagan akkauntda bajarilsin.",
    "4625 (muvaffaqiyatsiz kirish), 4720 (yangi foydalanuvchi) va 1102 (log tozalandi) hodisalarini kuzating.",
    "SMBv1 ni o‘chiring, RDP ni internetga ochmang."
  ],
  practice: `<p>O‘z kompyuteringizda: 1) <code>Get-MpComputerStatus</code> bilan Defender holatini tekshiring. 2) <code>Get-LocalGroupMember Administrators</code> bilan adminlar ro‘yxatini ko‘ring. 3) Event Viewer da Security jurnalini ochib, oxirgi 4624 hodisasining Logon Type qiymatini toping.</p>`
},

{
  id: "zaxira-ransomware",
  track: "himoya",
  level: 1,
  minutes: 20,
  title: "Zaxira nusxalar va ransomware’dan himoya",
  summary: "3-2-1 qoidasi, o‘zgarmas (immutable) zaxiralar, tiklashni sinash va ransomware’ga qarshi amaliy choralar.",
  sections: [
    { id: "ransom", h: "Ransomware qanday zarar yetkazadi", html: `
<p>Ransomware fayllarni shifrlaydi va kalit uchun to‘lov talab qiladi. Zamonaviy guruhlar <strong>ikki tomonlama tovlamachilik</strong> qiladi: avval maʼlumotlarni o‘g‘irlaydi, keyin shifrlaydi va “to‘lamasangiz e’lon qilamiz” deb tahdid qiladi. Ular zaxira nusxalarni ham topib o‘chirishga harakat qiladi.</p>
<p>Keng tarqalgan kirish yo‘llari: internetga ochiq RDP va VPN qurilmalaridagi zaifliklar, fishing xatlari, o‘g‘irlangan parollar.</p>` },
    { id: "321", h: "3-2-1 qoidasi", html: `
<ul>
  <li><strong>3</strong> nusxa: asl maʼlumot va 2 ta zaxira.</li>
  <li><strong>2</strong> xil tashuvchida: masalan, NAS va bulut.</li>
  <li><strong>1</strong> nusxa boshqa joyda (offsite).</li>
</ul>
<p>Zamonaviy variant — <strong>3-2-1-1-0</strong>: yana bitta nusxa <strong>oflayn yoki o‘zgarmas</strong> (immutable, WORM) bo‘lsin, tiklash testida esa <strong>0</strong> xato bo‘lsin.</p>
<div class="callout warn"><b>Eng ko‘p uchraydigan xato</b><p>Zaxira nusxa bor, lekin undan tiklab ko‘rilmagan. Tiklanmagan zaxira — zaxira emas. Har chorakda tiklash mashqini o‘tkazing.</p></div>` },
    { id: "linux", h: "Linuxda oddiy zaxira", html: `
<pre><code><span class="cmt"># restic — shifrlangan, deduplikatsiyali zaxira</span>
sudo apt install restic
restic init --repo /mnt/backup/repo
restic -r /mnt/backup/repo backup /etc /home /var/www
restic -r /mnt/backup/repo snapshots
restic -r /mnt/backup/repo restore latest --target /tmp/tiklash
restic -r /mnt/backup/repo forget --keep-daily 7 --keep-weekly 4 --keep-monthly 6 --prune</code></pre>` },
    { id: "chora", h: "Ransomware’ga qarshi choralar ro‘yxati", html: `
<ul>
  <li>Zaxira serverlari alohida akkaunt va alohida tarmoq segmentida bo‘lsin. Domen admin paroli bilan kira olmasin.</li>
  <li>Barcha masofaviy kirishlarda (VPN, email, bulut paneli) MFA.</li>
  <li>RDP internetga ochiq bo‘lmasin.</li>
  <li>VPN, firewall va pochta serverlari kabi chegaraviy qurilmalarni birinchi navbatda yangilang.</li>
  <li>EDR yoki kamida Defender + Controlled folder access.</li>
  <li>Tarmoqni segmentlash: buxgalteriya, serverlar va mehmon Wi-Fi alohida bo‘lsin.</li>
  <li>Xodimlarni fishingni tanishga o‘rgating.</li>
  <li>Insidentga javob rejasi tayyor bo‘lsin: kim kimga qo‘ng‘iroq qiladi, qaysi tizim birinchi o‘chiriladi.</li>
</ul>
<p>Ayrim ransomware turlari uchun bepul shifr ochuvchi vositalar <a href="https://www.nomoreransom.org" target="_blank" rel="noopener">nomoreransom.org</a> saytida bor.</p>` }
  ],
  keypoints: [
    "3-2-1-1-0: 3 nusxa, 2 tashuvchi, 1 tashqarida, 1 oflayn yoki o‘zgarmas, 0 tiklash xatosi.",
    "Tiklash sinab ko‘rilmagan zaxiraga ishonib bo‘lmaydi.",
    "Zaxira tizimlari asosiy domendan ajratilgan bo‘lishi kerak.",
    "MFA, yangilanishlar va yopiq RDP asosiy kirish yo‘llarini to‘sadi."
  ],
  practice: `<p>O‘zingiz uchun zaxira rejasini yozing: qaysi maʼlumotlar muhim, qayerda saqlanadi, qancha tez-tez nusxalanadi va 3-2-1 qoidasi qanday bajariladi. Keyin bitta papkani zaxiradan boshqa joyga tiklab ko‘ring va vaqtini o‘lchang.</p>`
},

{
  id: "log-tahlili",
  track: "monitoring",
  level: 2,
  minutes: 30,
  title: "Loglarni tahlil qilish va SIEM",
  summary: "Linux va veb-server loglarini o‘qish, grep va awk bilan shubhali faollikni topish, SIEM va SOC ishining asoslari.",
  sections: [
    { id: "nega", h: "Nega loglar muhim?", html: `
<p>Log — tizimda nima bo‘lganining yozuvi. Loglarsiz hujumni aniqlab ham, tergov qilib ham bo‘lmaydi. Hujumchi tizimga kirgandan keyin uni aniqlashga ketadigan o‘rtacha vaqt hali ham haftalar bilan o‘lchanadi. Yaxshi monitoring bu vaqtni soatlarga qisqartiradi.</p>
<div class="table-wrap"><table>
<tr><th>Manba</th><th>Joylashuvi</th><th>Nima bor</th></tr>
<tr><td>Autentifikatsiya</td><td><code>/var/log/auth.log</code> (Debian), <code>/var/log/secure</code> (RHEL)</td><td>SSH kirishlari, sudo</td></tr>
<tr><td>Tizim</td><td><code>journalctl</code>, <code>/var/log/syslog</code></td><td>Xizmatlar, yadro</td></tr>
<tr><td>Veb-server</td><td><code>/var/log/nginx/access.log</code></td><td>HTTP so‘rovlar</td></tr>
<tr><td>Windows</td><td>Event Viewer → Security</td><td>4624, 4625, 4688...</td></tr>
<tr><td>Firewall, DNS, proxy</td><td>Qurilmaning o‘zi yoki syslog</td><td>Tarmoq faolligi</td></tr>
</table></div>` },
    { id: "ssh", h: "SSH kirish urinishlarini tahlil qilish", html: `
<pre><code><span class="cmt"># Muvaffaqiyatsiz kirishlar soni, IP bo‘yicha</span>
grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head

<span class="cmt"># Qaysi foydalanuvchi nomlari sinalgan</span>
grep "Invalid user" /var/log/auth.log | awk '{print $8}' | sort | uniq -c | sort -rn | head

<span class="cmt"># Muvaffaqiyatli kirishlar — eng muhimi!</span>
grep "Accepted" /var/log/auth.log

<span class="cmt"># systemd tizimlarida</span>
journalctl -u ssh --since today | grep -E "Failed|Accepted"</code></pre>
<div class="callout info"><b>Nimaga eʼtibor berish kerak</b><p>Bir IP dan yuzlab “Failed” yozuvlari, keyin shu IP dan “Accepted” — bu parol tanlab topilganini bildirishi mumkin. Darhol tekshiring.</p></div>` },
    { id: "web", h: "Veb-server loglari", html: `
<pre><code><span class="cmt"># Eng ko‘p so‘rov yuborgan IP lar</span>
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head

<span class="cmt"># HTTP holat kodlari taqsimoti</span>
awk '{print $9}' /var/log/nginx/access.log | sort | uniq -c | sort -rn

<span class="cmt"># Ko‘p 404 olgan IP lar — katalog skanerlash belgisi</span>
awk '$9==404 {print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head

<span class="cmt"># Maxfiy fayllarga urinishlar</span>
grep -Ei "\\.env|\\.git/|wp-config|/etc/passwd" /var/log/nginx/access.log | head</code></pre>` },
    { id: "siem", h: "SIEM va SOC", html: `
<p><strong>SIEM</strong> (Security Information and Event Management) barcha manbalardan loglarni bir joyga yig‘adi, qidiradi, korrelyatsiya qiladi va qoidalar asosida ogohlantirish beradi.</p>
<ul>
  <li><strong>Bepul va ochiq:</strong> Wazuh, Elastic Security, Graylog, Security Onion.</li>
  <li><strong>Tijoriy:</strong> Splunk, Microsoft Sentinel, IBM QRadar.</li>
</ul>
<p><strong>SOC</strong> (Security Operations Center) — shu ogohlantirishlar bilan ishlaydigan jamoa. L1 tahlilchi ogohlantirishni saralaydi, L2 chuqur tekshiradi, L3 esa tahdid ovi (threat hunting) va murakkab tergov bilan shug‘ullanadi.</p>
<p>Hujumchi xatti-harakatlarini tasniflash uchun <strong>MITRE ATT&amp;CK</strong> matritsasi ishlatiladi. U taktikalar (maqsad) va texnikalar (usul) bazasi bo‘lib, qaysi texnikani aniqlay olishingiz va qaysilarini aniqlay olmasligingizni ko‘rishga yordam beradi.</p>
<div class="callout tip"><b>O‘rganish uchun</b><p>Wazuh ni bitta virtual mashinaga o‘rnating va 2 ta agentni ulang. Bu SIEM bilan ishlashni o‘rganishning eng arzon yo‘li.</p></div>` }
  ],
  keypoints: [
    "auth.log, journalctl va veb-server loglari — Linux monitoringining asosi.",
    "grep, awk, sort va uniq -c birgalikda eng ko‘p ishlatiladigan tahlil zanjiri.",
    "Ko‘p muvaffaqiyatsiz urinishdan keyingi muvaffaqiyatli kirish — jiddiy signal.",
    "Wazuh va Elastic Security — bepul SIEM variantlari."
  ],
  practice: `<p>O‘z serveringiz yoki virtual mashinangizda: 1) oxirgi haftadagi muvaffaqiyatsiz SSH urinishlarining eng faol 10 ta IP manzilini toping. 2) Veb-server logidan holat kodlari taqsimotini chiqaring. 3) Topilganlarni qisqa hisobot sifatida yozing: nima ko‘rildi, xavf darajasi va qanday chora ko‘rish kerak.</p>`
},

{
  id: "insidentga-javob",
  track: "monitoring",
  level: 2,
  minutes: 25,
  title: "Insidentga javob berish (Incident Response)",
  summary: "NIST SP 800-61 bosqichlari: tayyorgarlik, aniqlash, cheklash, yo‘q qilish, tiklash va xulosalar.",
  sections: [
    { id: "bosqich", h: "Bosqichlar", html: `
<p>NIST SP 800-61 insidentga javob berishni to‘rt bosqichli sikl sifatida taʼriflaydi:</p>
<ol>
  <li><strong>Tayyorgarlik</strong> — reja, jamoa, aloqa ro‘yxati, vositalar, loglar va zaxira nusxalar oldindan tayyor.</li>
  <li><strong>Aniqlash va tahlil</strong> — ogohlantirish haqiqiy insidentmi? Taʼsir doirasi qanday?</li>
  <li><strong>Cheklash, yo‘q qilish va tiklash</strong> — tarqalishni to‘xtatish, sababni olib tashlash, xizmatlarni xavfsiz qayta ishga tushirish.</li>
  <li><strong>Insidentdan keyingi faoliyat</strong> — xulosalar (lessons learned), jarayon va himoyani yaxshilash.</li>
</ol>
<p>2025 yilda chiqqan SP 800-61 Rev. 3 ushbu jarayonni NIST CSF 2.0 funksiyalari (Govern, Identify, Protect, Detect, Respond, Recover) bilan bog‘ladi. Asosiy mantiq o‘zgarmadi.</p>` },
    { id: "birinchi", h: "Birinchi soatda nima qilish kerak", html: `
<ul>
  <li><strong>Vahima qilmang va hamma narsani yozib boring:</strong> vaqt, kim, nima qildi.</li>
  <li>Zararlangan kompyuterni <strong>tarmoqdan uzing</strong>, lekin <strong>o‘chirmang</strong>. Xotiradagi dalillar yo‘qolmasin.</li>
  <li>Insident rahbarini va rejadagi aloqa shaxslarini xabardor qiling.</li>
  <li>Buzilgan bo‘lishi mumkin bo‘lgan akkauntlarning parollarini <strong>boshqa, toza qurilmadan</strong> almashtiring va faol seanslarni yoping.</li>
  <li>Loglarni saqlab qo‘ying, ular avtomatik o‘chib ketishi mumkin.</li>
  <li>Ransomware bo‘lsa, zaxira tizimlarini darhol izolyatsiya qiling.</li>
</ul>
<div class="callout warn"><b>Qilmaslik kerak</b><p>Dalillarni o‘chirmang va kompyuterni qayta o‘rnatishga shoshilmang. Avval nusxa oling. Hujumchi bilan mustaqil muzokara qilmang va buzilgan email orqali insident haqida yozishmang.</p></div>` },
    { id: "dalil", h: "Dalillarni to‘plash", html: `
<p>Dalillar o‘zgaruvchanlik tartibida yig‘iladi (RFC 3227): avval eng tez yo‘qoladiganlari.</p>
<ol>
  <li>Operativ xotira (RAM), jarayonlar, tarmoq ulanishlari</li>
  <li>Vaqtinchalik fayllar</li>
  <li>Disk</li>
  <li>Masofaviy loglar, zaxira nusxalar</li>
</ol>
<pre><code><span class="cmt"># Linux: tezkor holat surati (natijani tashqi diskka yozing)</span>
date -u; hostname; uptime
ps auxf
ss -tupan
last -F | head -50
ls -la /tmp /var/tmp /dev/shm
crontab -l; ls -la /etc/cron.*
sha256sum shubhali_fayl</code></pre>
<p>Har bir dalil uchun <strong>chain of custody</strong> (kim, qachon, qayerdan olgani va xeshi) yozib boriladi. Bu dalil keyinchalik sudda ishlatilishi mumkin bo‘lsa ayniqsa muhim.</p>` },
    { id: "xabar", h: "Kimga xabar berish kerak", html: `
<ul>
  <li>Tashkilot rahbariyati va yuridik bo‘lim.</li>
  <li>Shaxsiy maʼlumotlar sizib chiqqan bo‘lsa — qonunchilikda belgilangan vakolatli organ va zarar ko‘rgan shaxslar.</li>
  <li>O‘zbekistonda kiberxavfsizlik insidentlari bo‘yicha <strong>O‘zbekiston Respublikasi Kiberxavfsizlik markazi</strong> (csec.uz) bilan bog‘lanish mumkin.</li>
  <li>Moliyaviy firibgarlik bo‘lsa — bankingiz va huquqni muhofaza qilish organlari.</li>
</ul>` },
    { id: "xulosa", h: "Xulosalar yig‘ilishi", html: `
<p>Insident yopilgandan keyin 1–2 hafta ichida ayblovsiz (blameless) yig‘ilish o‘tkazing. Asosiy savollar:</p>
<ul>
  <li>Hujumchi qanday kirdi? Qaysi himoya ishlamadi?</li>
  <li>Qancha vaqtda aniqladik? Nega avvalroq emas?</li>
  <li>Qaysi qadamlar yaxshi ishladi va qaysilari sekinlashtirdi?</li>
  <li>Aniq vazifalar: nima, kim, qachongacha.</li>
</ul>` }
  ],
  keypoints: [
    "Tayyorgarlik insidentdan oldin qilinadi: reja, aloqa ro‘yxati, loglar, zaxira.",
    "Zararlangan qurilmani tarmoqdan uzing, lekin o‘chirmang.",
    "Parollarni toza qurilmadan almashtiring.",
    "Har bir insidentdan keyin ayblovsiz xulosa yig‘ilishi o‘tkazing."
  ],
  practice: `<p>Kichik tashkilot (masalan, 20 xodimli ofis) uchun bir sahifalik insidentga javob rejasini yozing: kim insident rahbari, aloqa telefonlari, ransomware aniqlanganda birinchi 5 qadam va zaxiradan tiklash tartibi. Keyin “buxgalterning kompyuterida fayllar shifrlandi” ssenariysi bo‘yicha rejani qog‘ozda sinab ko‘ring (tabletop mashqi).</p>`
},

{
  id: "xavfsiz-veb",
  track: "dasturlash",
  level: 2,
  minutes: 35,
  title: "Xavfsiz veb-dasturlash: OWASP Top 10",
  summary: "OWASP Top 10 xavflari dasturchi nuqtai nazaridan: har bir xavf nima va kodda qanday oldi olinadi.",
  sections: [
    { id: "owasp", h: "OWASP Top 10 (2021)", html: `
<p>OWASP Top 10 — veb-ilovalardagi eng muhim xavflar ro‘yxati. Quyida har biri va asosiy himoya usuli keltirilgan:</p>
<div class="table-wrap"><table>
<tr><th>#</th><th>Xavf</th><th>Asosiy himoya</th></tr>
<tr><td>A01</td><td>Broken Access Control</td><td>Har bir so‘rovda serverda huquqni tekshirish, standart holatda rad etish</td></tr>
<tr><td>A02</td><td>Cryptographic Failures</td><td>HTTPS hamma joyda, parollar uchun Argon2id yoki bcrypt</td></tr>
<tr><td>A03</td><td>Injection</td><td>Parametrlangan so‘rovlar, ORM, kiritishni tekshirish</td></tr>
<tr><td>A04</td><td>Insecure Design</td><td>Loyihalash bosqichida tahdid modellashtirish</td></tr>
<tr><td>A05</td><td>Security Misconfiguration</td><td>Debug rejimi o‘chiq, standart parollar almashtirilgan</td></tr>
<tr><td>A06</td><td>Vulnerable Components</td><td>Kutubxonalarni yangilab turish, <code>npm audit</code>, Dependabot</td></tr>
<tr><td>A07</td><td>Identification &amp; Authentication Failures</td><td>MFA, urinishlarni cheklash, xavfsiz seanslar</td></tr>
<tr><td>A08</td><td>Software &amp; Data Integrity Failures</td><td>Imzolangan yangilanishlar, CI/CD himoyasi</td></tr>
<tr><td>A09</td><td>Logging &amp; Monitoring Failures</td><td>Muhim hodisalarni loglash va ogohlantirish</td></tr>
<tr><td>A10</td><td>SSRF</td><td>Tashqi URL larni ruxsat ro‘yxati bilan cheklash</td></tr>
</table></div>
<p>OWASP ro‘yxatni vaqti-vaqti bilan yangilaydi. Eng so‘nggi versiyani <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener">owasp.org</a> saytida kuzating.</p>` },
    { id: "sql", h: "Maʼlumotlar bazasi so‘rovlari", html: `
<p>Foydalanuvchi kiritgan maʼlumotni hech qachon so‘rov matniga to‘g‘ridan to‘g‘ri qo‘shmang. Har doim <strong>parametrlangan so‘rovlar</strong> ishlating: maʼlumotlar bazasi qiymatni buyruq sifatida emas, faqat maʼlumot sifatida qabul qiladi.</p>
<pre><code><span class="cmt"># Python (psycopg) — TO‘G‘RI</span>
cur.execute("SELECT id, name FROM users WHERE email = %s", (email,))

<span class="cmt"># Node.js (pg) — TO‘G‘RI</span>
await pool.query("SELECT id, name FROM users WHERE email = $1", [email]);

<span class="cmt"># PHP (PDO) — TO‘G‘RI</span>
$stmt = $pdo-&gt;prepare("SELECT id, name FROM users WHERE email = ?");
$stmt-&gt;execute([$email]);</code></pre>
<p>Qo‘shimcha himoya: ilova maʼlumotlar bazasiga faqat kerakli huquqlarga ega foydalanuvchi bilan ulansin (masalan, jadvallarni o‘chirish huquqisiz).</p>` },
    { id: "html", h: "Sahifaga maʼlumot chiqarish", html: `
<p>Foydalanuvchi kiritgan matnni sahifaga chiqarganda uni doim <strong>kodlang (escape)</strong>. Zamonaviy shablon tizimlari (React, Vue, Jinja2, Blade) buni avtomatik bajaradi. Xavf ular chetlab o‘tilganda paydo bo‘ladi.</p>
<pre><code><span class="cmt">// JavaScript — TO‘G‘RI: matn sifatida qo‘yish</span>
el.textContent = userComment;

<span class="cmt">// XAVFLI: HTML sifatida qo‘yish</span>
<span class="cmt">// el.innerHTML = userComment;</span>
<span class="cmt">// React: dangerouslySetInnerHTML dan qoching</span>

<span class="cmt">// HTML ruxsat berish shart bo‘lsa — DOMPurify bilan tozalang</span>
el.innerHTML = DOMPurify.sanitize(userHtml);</code></pre>
<p>Ikkinchi himoya qatlami — <strong>Content Security Policy</strong> sarlavhasi. U brauzerga qaysi manbalardan skript yuklash mumkinligini aytadi.</p>` },
    { id: "headers", h: "Xavfsizlik sarlavhalari", html: `
<pre><code><span class="cmt"># Nginx misoli</span>
add_header Content-Security-Policy "default-src 'self'; object-src 'none'; frame-ancestors 'none'" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
server_tokens off;</code></pre>
<p>Sarlavhalaringizni <a href="https://securityheaders.com" target="_blank" rel="noopener">securityheaders.com</a> da, TLS sozlamalarini esa <a href="https://www.ssllabs.com/ssltest/" target="_blank" rel="noopener">SSL Labs</a> da tekshiring.</p>` },
    { id: "auth", h: "Autentifikatsiya va seanslar", html: `
<ul>
  <li>Parollarni Argon2id yoki bcrypt bilan xeshlang.</li>
  <li>Kirish urinishlarini cheklang (rate limiting) va MFA qo‘shing.</li>
  <li>Seans cookie: <code>HttpOnly; Secure; SameSite=Lax</code>.</li>
  <li>Kirgandan keyin seans ID sini yangilang, chiqishda serverda bekor qiling.</li>
  <li>Xato xabarlari umumiy bo‘lsin: “Login yoki parol noto‘g‘ri”. Qaysi biri xato ekanini aytmang.</li>
  <li>Parolni tiklash havolalari bir martalik va qisqa muddatli bo‘lsin.</li>
  <li>Har bir API endpointda obyekt egasini tekshiring. <code>/api/orders/1043</code> ni so‘ragan foydalanuvchi aynan shu buyurtma egasimi?</li>
</ul>` },
    { id: "deps", h: "Kutubxonalar va CI/CD", html: `
<pre><code>npm audit                 <span class="cmt"># Node.js zaif paketlar</span>
pip-audit                 <span class="cmt"># Python</span>
composer audit            <span class="cmt"># PHP</span>
trivy fs .                <span class="cmt"># loyiha va konteynerlar uchun universal skaner</span></code></pre>
<p>GitHub da <strong>Dependabot</strong> va <strong>secret scanning</strong> ni yoqing. Statik tahlil uchun <strong>Semgrep</strong> yoki <strong>CodeQL</strong> dan foydalaning.</p>` }
  ],
  keypoints: [
    "Maʼlumotlar bazasi so‘rovlari faqat parametrlangan bo‘lsin.",
    "Foydalanuvchi matnini textContent yoki avtomatik escape qiluvchi shablon orqali chiqaring.",
    "Kirish huquqini har bir so‘rovda serverda tekshiring.",
    "CSP, HSTS va boshqa xavfsizlik sarlavhalari qo‘shimcha himoya qatlamini beradi."
  ],
  practice: `<p>O‘zingizning biror loyihangizni oling: 1) barcha SQL so‘rovlar parametrlanganini tekshiring. 2) <code>npm audit</code> yoki <code>pip-audit</code> ishga tushiring. 3) Saytingizni securityheaders.com da tekshiring va kamida 3 ta sarlavha qo‘shing.</p>`
},

{
  id: "maxfiy-kalitlar",
  track: "dasturlash",
  level: 1,
  minutes: 15,
  title: "Maxfiy kalitlar va .env xavfsizligi",
  summary: "API kalitlar, parollar va tokenlarni kodda saqlamaslik, .gitignore, secret manager va sizib chiqqan kalitni bekor qilish.",
  sections: [
    { id: "muammo", h: "Muammo", html: `
<p>Eng ko‘p uchraydigan xatolardan biri — API kalit, maʼlumotlar bazasi paroli yoki bulut tokenini kod ichida yozib, GitHub ga yuklash. Ochiq repozitoriylar avtomatik botlar tomonidan doimiy skanerlanadi va sizib chiqqan bulut kalitlari juda qisqa vaqt ichida suiisteʼmol qilinishi mumkin.</p>` },
    { id: "togri", h: "To‘g‘ri usul", html: `
<pre><code><span class="cmt"># .env — faqat lokal, repozitoriyga tushmaydi</span>
DATABASE_URL=postgres://app:kuchli_parol@localhost/app
API_KEY=...

<span class="cmt"># .gitignore</span>
.env
.env.*
!.env.example
*.pem
*.key</code></pre>
<pre><code><span class="cmt"># Python</span>
import os
api_key = os.environ["API_KEY"]

<span class="cmt">// Node.js</span>
const apiKey = process.env.API_KEY;</code></pre>
<p>Ishlab chiqarish muhitida esa <strong>secret manager</strong> ishlating: AWS Secrets Manager, Azure Key Vault, Google Secret Manager, HashiCorp Vault yoki GitHub Actions Secrets.</p>` },
    { id: "sizdi", h: "Kalit sizib chiqsa", html: `
<ol>
  <li><strong>Darhol bekor qiling</strong> (revoke/rotate) va yangisini yarating. Birinchi qadam — kalitni o‘chirish, git tarixini tozalash emas.</li>
  <li>Kalit bilan qilingan harakatlarni provayder loglaridan tekshiring.</li>
  <li>Shundan keyin git tarixidan olib tashlang (<code>git filter-repo</code>). Lekin kalit allaqachon nusxalangan deb hisoblang.</li>
</ol>
<pre><code><span class="cmt"># Repozitoriyda sizib chiqqan kalitlarni qidirish</span>
gitleaks detect --source . -v
trufflehog git file://. --only-verified</code></pre>
<div class="callout tip"><b>Oldini olish</b><p><code>pre-commit</code> hook sifatida gitleaks o‘rnating. U kalitli commitni yuklashdan oldin to‘xtatadi.</p></div>` }
  ],
  keypoints: [
    "Maxfiy maʼlumotlar kodda emas, muhit o‘zgaruvchilari yoki secret manager’da saqlanadi.",
    ".env fayli .gitignore da bo‘lsin, repozitoriyga .env.example qo‘yiladi.",
    "Kalit sizib chiqsa, birinchi qadam uni bekor qilish.",
    "gitleaks va GitHub secret scanning kalitlarni avtomatik topadi."
  ],
  practice: `<p>O‘z repozitoriylaringizda <code>gitleaks detect</code> ishga tushiring. Topilgan har bir kalitni bekor qiling va kodni muhit o‘zgaruvchisidan o‘qiydigan qilib o‘zgartiring.</p>`
},

{
  id: "fishing",
  track: "shaxsiy",
  level: 1,
  minutes: 15,
  title: "Fishing va ijtimoiy muhandislikni tanish",
  summary: "Soxta xatlar, SMS va Telegram xabarlarini qanday aniqlash, keng tarqalgan firibgarlik sxemalari va nima qilish kerakligi.",
  sections: [
    { id: "nima", h: "Ijtimoiy muhandislik nima?", html: `
<p>Ijtimoiy muhandislik texnologiyani emas, inson psixologiyasini nishonga oladi: shoshilish, qo‘rquv, qiziquvchanlik, hokimiyatga ishonish, foyda istagi. Ko‘plab jiddiy buzilishlar aynan bitta ishonuvchan xodimdan boshlangan.</p>
<div class="table-wrap"><table>
<tr><th>Turi</th><th>Kanal</th></tr>
<tr><td>Fishing</td><td>Email</td></tr>
<tr><td>Smishing</td><td>SMS</td></tr>
<tr><td>Vishing</td><td>Telefon qo‘ng‘irog‘i (endi AI bilan soxtalashtirilgan ovoz ham)</td></tr>
<tr><td>Spear phishing</td><td>Aniq bir shaxsga moslashtirilgan xat</td></tr>
<tr><td>BEC</td><td>Rahbar yoki hamkor nomidan pul o‘tkazishni so‘rash</td></tr>
<tr><td>Quishing</td><td>QR kod orqali soxta saytga yo‘naltirish</td></tr>
</table></div>` },
    { id: "belgi", h: "Shubhali xabar belgilari", html: `
<ul>
  <li><strong>Shoshiltirish:</strong> “24 soat ichida tasdiqlang, aks holda karta bloklanadi”.</li>
  <li><strong>Jo‘natuvchi manzili:</strong> <code>support@click-uz.help</code>, <code>payme-bonus.top</code> kabi o‘xshash, lekin rasmiy bo‘lmagan domenlar.</li>
  <li><strong>Havola:</strong> ustiga bosmasdan olib boring yoki uzoq bosing va haqiqiy manzilni ko‘ring.</li>
  <li><strong>SMS kod, karta raqami, CVV yoki parol so‘ralishi.</strong> Bank hech qachon bularni so‘ramaydi.</li>
  <li><strong>Kutilmagan ilova:</strong> <code>.apk</code>, <code>.exe</code>, <code>.scr</code> yoki makrosli <code>.docm</code>/<code>.xlsm</code> fayllar.</li>
  <li><strong>Juda yaxshi taklif:</strong> sovrin, bepul bonus, tanlovda g‘alaba.</li>
</ul>` },
    { id: "sxema", h: "Keng tarqalgan sxemalar", html: `
<ul>
  <li><strong>“Bankdan qo‘ng‘iroq”:</strong> “Kartangizdan shubhali to‘lov. Tasdiqlash uchun SMS kodni ayting.” Kod — sizning pulingiz kaliti.</li>
  <li><strong>Telegram’da “ovoz bering”</strong> yoki “sovg‘a oling” havolasi. Kirilganda akkaunt o‘g‘irlanadi va sizning nomingizdan do‘stlarga xabar ketadi.</li>
  <li><strong>Soxta APK:</strong> “Pochta jo‘natmasi”, “fotosurat” yoki “davlat xizmati” nomi bilan yuborilgan ilova. U SMS larni o‘qib, bank kodlarini hujumchiga yuboradi.</li>
  <li><strong>Onlayn savdo:</strong> “Pulni qabul qilish uchun karta maʼlumotlarini shu havolaga kiriting.”</li>
  <li><strong>Yaqin odam nomidan:</strong> “Telefonim buzildi, shu raqamga pul tashlab tur.” Endi AI bilan soxtalashtirilgan ovoz bilan ham uchraydi.</li>
</ul>` },
    { id: "qilish", h: "Nima qilish kerak", html: `
<ul>
  <li>Xabardagi raqam yoki havola orqali emas, <strong>rasmiy kanal orqali</strong> o‘zingiz qayta bog‘laning: kartadagi bank raqami, rasmiy ilova.</li>
  <li>Oila aʼzolari bilan <strong>kod so‘z</strong> kelishib oling. Shoshilinch pul so‘ralganda uni so‘rang.</li>
  <li>Telegram: Sozlamalar → Maxfiylik va xavfsizlik → <strong>Ikki bosqichli tekshiruv</strong> parolini yoqing, “Faol seanslar” ro‘yxatini tekshiring.</li>
  <li>Ilovalarni faqat Google Play yoki App Store dan o‘rnating.</li>
  <li>Aldanib qolsangiz: darhol bankka qo‘ng‘iroq qilib kartani bloklang, parollarni almashtiring, begona seanslarni yoping va tanishlaringizni ogohlantiring.</li>
</ul>` }
  ],
  keypoints: [
    "Shoshiltirish va qo‘rqitish — fishingning asosiy belgisi.",
    "Bank hech qachon SMS kod, CVV yoki parolni so‘ramaydi.",
    "Tekshirish uchun rasmiy kanal orqali o‘zingiz qayta bog‘laning.",
    "Telegram’da ikki bosqichli tekshiruv parolini yoqing."
  ],
  practice: `<p>Oxirgi oyda olgan shubhali xat yoki SMS larni toping (spam papkasida bo‘lishi mumkin). Har biri uchun yuqoridagi belgilardan qaysilari borligini yozing. Keyin oila aʼzolaringizga “bankdan qo‘ng‘iroq” sxemasini tushuntiring va kod so‘z kelishib oling.</p>`
},

{
  id: "telefon-xavfsizligi",
  track: "shaxsiy",
  level: 1,
  minutes: 12,
  title: "Smartfon va akkauntlar xavfsizligi",
  summary: "Android va iPhone sozlamalari, ilova ruxsatlari, Wi-Fi xavfsizligi va yo‘qolgan telefonda nima qilish kerak.",
  sections: [
    { id: "sozlama", h: "Asosiy sozlamalar", html: `
<ul>
  <li>Kuchli ekran qulfi: kamida 6 raqamli PIN yoki parol. Oddiy chizma (pattern) zaif.</li>
  <li>Tizim va ilovalarni avtomatik yangilash.</li>
  <li>Android: <strong>Google Play Protect</strong> yoqilgan bo‘lsin, “Nomaʼlum manbalardan o‘rnatish” o‘chiq bo‘lsin.</li>
  <li>“Qurilmani topish” (Find My Device yoki Find My iPhone) yoqilgan bo‘lsin.</li>
  <li>SIM kartaga PIN kod qo‘ying.</li>
  <li>Google yoki Apple akkauntingizda ikki bosqichli tekshiruvni yoqing.</li>
</ul>` },
    { id: "ruxsat", h: "Ilova ruxsatlari", html: `
<p>Ilova vazifasiga kerak bo‘lmagan ruxsatni bermang. Fonar ilovasiga kontaktlar, kalkulyatorga SMS ruxsati kerak emas.</p>
<div class="callout warn"><b>Eng xavfli ruxsatlar</b><p><strong>Accessibility (Maxsus imkoniyatlar)</strong> — ekrandagi hamma narsani o‘qish va bosish imkonini beradi. <strong>SMS o‘qish</strong> — bank kodlariga kirish. <strong>Qurilma administratori</strong> — ilovani o‘chirishni qiyinlashtiradi. Bu ruxsatlarni so‘ragan nomaʼlum ilova deyarli har doim zararli.</p></div>` },
    { id: "wifi", h: "Wi-Fi va jamoat tarmoqlari", html: `
<ul>
  <li>Uy routeri: standart admin parolini almashtiring, WPA2-AES yoki WPA3 yoqing, WPS ni o‘chiring, proshivkani yangilang.</li>
  <li>Jamoat Wi-Fi da faqat HTTPS saytlardan foydalaning. Bank operatsiyalari uchun mobil internet xavfsizroq.</li>
  <li>Ishonchli VPN jamoat tarmog‘ida trafikni shifrlaydi. Bepul, nomaʼlum VPN ilovalarining o‘zi maʼlumot yig‘ishi mumkin.</li>
</ul>` },
    { id: "yoqoldi", h: "Telefon yo‘qolsa", html: `
<ol>
  <li>Operatorga qo‘ng‘iroq qilib SIM kartani bloklang.</li>
  <li>Bankka xabar bering.</li>
  <li>“Qurilmani topish” orqali qulflang yoki masofadan tozalang.</li>
  <li>Boshqa qurilmadan Google/Apple, Telegram va email parollarini almashtiring, faol seanslarni yoping.</li>
</ol>` }
  ],
  keypoints: [
    "Ilovalarni faqat rasmiy do‘kondan o‘rnating.",
    "Accessibility va SMS ruxsatini so‘ragan nomaʼlum ilova — xavf belgisi.",
    "SIM PIN va akkauntlarda ikki bosqichli tekshiruv yoqilgan bo‘lsin.",
    "Telefon yo‘qolsa: SIM, bank, qurilmani qulflash, parollar."
  ],
  practice: `<p>Telefoningizda Sozlamalar → Ilovalar → Ruxsatlar bo‘limiga kiring. SMS, Accessibility va joylashuv ruxsati bor barcha ilovalarni ko‘rib chiqing va keraksiz ruxsatlarni o‘chiring. “Qurilmani topish” yoqilganini tekshiring.</p>`
}
);
