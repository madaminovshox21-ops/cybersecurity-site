/* Darsliklar: 1-qism — Asoslar */
window.TRACKS = [
  { id: "asoslar", title: "Asoslar", desc: "Har bir mutaxassis bilishi shart bo‘lgan poydevor: tushunchalar, Linux, tarmoq, kriptografiya." },
  { id: "himoya", title: "Tizimlarni himoyalash", desc: "Linux va Windows serverlarni mustahkamlash, zaxira nusxalar va ransomware’dan himoya." },
  { id: "monitoring", title: "Monitoring va insidentlar", desc: "Loglarni tahlil qilish, SOC ishi va insidentga to‘g‘ri javob berish." },
  { id: "dasturlash", title: "Xavfsiz dasturlash", desc: "Veb ilovalarni xavfsiz yozish: OWASP tavsiyalari, maxfiy kalitlar, xavfsiz sozlamalar." },
  { id: "shaxsiy", title: "Shaxsiy xavfsizlik", desc: "Fishingni tanish, telefon va akkauntlarni himoyalash." }
];

window.LESSONS = window.LESSONS || [];

window.LESSONS.push(
{
  id: "kiberxavfsizlikka-kirish",
  track: "asoslar",
  level: 1,
  minutes: 15,
  title: "Kiberxavfsizlikka kirish",
  summary: "CIA uchligi, tahdid, zaiflik va risk tushunchalari, hujumchilar turlari va kasb yo‘nalishlari.",
  sections: [
    { id: "nima", h: "Kiberxavfsizlik nima?", html: `
<p><strong>Kiberxavfsizlik</strong> — kompyuterlar, tarmoqlar, dasturlar va maʼlumotlarni ruxsatsiz kirish, o‘zgartirish, o‘g‘irlash yoki ishdan chiqarishdan himoya qilish amaliyoti. U faqat texnologiya emas: jarayonlar va odamlar ham himoyaning bir qismi.</p>
<p>Yaxshi himoya har doim uch qatlamda quriladi:</p>
<ul>
  <li><strong>Odamlar</strong> — xodimlarni o‘qitish, fishingni taniy olish, xavfsiz odatlar.</li>
  <li><strong>Jarayonlar</strong> — siyosatlar, kirish huquqlarini boshqarish, insidentga javob rejasi.</li>
  <li><strong>Texnologiya</strong> — firewall, EDR, shifrlash, zaxira nusxalar, monitoring.</li>
</ul>` },
    { id: "cia", h: "CIA uchligi", html: `
<p>Xavfsizlikning uchta asosiy maqsadi bor. Har bir hujum ulardan kamida bittasiga zarar yetkazadi:</p>
<div class="table-wrap"><table>
<tr><th>Tamoyil</th><th>Maʼnosi</th><th>Buzilish misoli</th><th>Himoya</th></tr>
<tr><td><strong>Confidentiality</strong> (Maxfiylik)</td><td>Maʼlumotni faqat ruxsati borlar ko‘radi</td><td>Mijozlar bazasining sizib chiqishi</td><td>Shifrlash, kirish nazorati, MFA</td></tr>
<tr><td><strong>Integrity</strong> (Butunlik)</td><td>Maʼlumot ruxsatsiz o‘zgartirilmaydi</td><td>Bank o‘tkazmasidagi summaning almashtirilishi</td><td>Xesh, raqamli imzo, audit loglari</td></tr>
<tr><td><strong>Availability</strong> (Mavjudlik)</td><td>Tizim kerak bo‘lganda ishlaydi</td><td>DDoS yoki ransomware tufayli to‘xtash</td><td>Zaxira nusxa, klaster, DDoS himoyasi</td></tr>
</table></div>
<p>Bunga ko‘pincha yana ikkitasi qo‘shiladi: <strong>Authenticity</strong> (haqiqiylik — kim ekanini isbotlash) va <strong>Non-repudiation</strong> (inkor etib bo‘lmaslik — harakatni qilgan odam keyin tona olmaydi).</p>` },
    { id: "risk", h: "Tahdid, zaiflik va risk", html: `
<p>Bu uch atama ko‘p aralashtiriladi, lekin ular turli narsalar:</p>
<ul>
  <li><strong>Aktiv (asset)</strong> — himoya qilinayotgan qimmatli narsa: server, maʼlumotlar bazasi, obro‘.</li>
  <li><strong>Zaiflik (vulnerability)</strong> — tizimdagi kamchilik. Masalan, yangilanmagan dastur yoki zaif parol.</li>
  <li><strong>Tahdid (threat)</strong> — zaiflikdan foydalanishi mumkin bo‘lgan manba yoki hodisa: hujumchi, zararli dastur, hatto yong‘in.</li>
  <li><strong>Eksployt (exploit)</strong> — zaiflikdan foydalanish usuli yoki kodi.</li>
  <li><strong>Risk</strong> — tahdid zaiflikdan foydalanib zarar yetkazish ehtimoli va oqibati.</li>
</ul>
<div class="callout info"><b>Formula</b><p>Risk = Ehtimollik × Taʼsir. Riskni kamaytirish uchun zaiflikni yopasiz (patch), ehtimollikni pasaytirasiz (himoya choralari) yoki taʼsirni kamaytirasiz (zaxira nusxa, segmentatsiya).</p></div>
<p>Riskka to‘rt xil javob bor: <strong>kamaytirish</strong> (himoya qo‘yish), <strong>o‘tkazish</strong> (sug‘urta), <strong>qabul qilish</strong> (zarar kichik bo‘lsa) va <strong>undan qochish</strong> (xavfli xizmatni butunlay o‘chirish).</p>` },
    { id: "hujumchilar", h: "Hujumchilar kimlar?", html: `
<div class="table-wrap"><table>
<tr><th>Turi</th><th>Maqsadi</th><th>Imkoniyati</th></tr>
<tr><td>Kiberjinoyatchilar</td><td>Pul: ransomware, karta o‘g‘irlash, firibgarlik</td><td>O‘rtadan yuqorigacha, tayyor xizmatlar (RaaS) ishlatadi</td></tr>
<tr><td>Davlat guruhlari (APT)</td><td>Josuslik, sabotaj</td><td>Juda yuqori, uzoq muddatli yashirin hujumlar</td></tr>
<tr><td>Haktivistlar</td><td>Siyosiy yoki g‘oyaviy xabar</td><td>DDoS, sayt ko‘rinishini buzish (defacement)</td></tr>
<tr><td>Ichki tahdid (insider)</td><td>Qasos, pul yoki ehtiyotsizlik</td><td>Tizimga allaqachon kirish huquqi bor</td></tr>
<tr><td>Script kiddie</td><td>Qiziqish, maqtanish</td><td>Past, tayyor vositalardan foydalanadi</td></tr>
</table></div>` },
    { id: "hat", h: "Etik xakerlik va qonun", html: `
<p><strong>White hat</strong> (etik xaker) tizim egasining yozma ruxsati bilan zaifliklarni topadi va hisobot beradi. <strong>Black hat</strong> ruxsatsiz, zarar yetkazish yoki foyda uchun ishlaydi. <strong>Grey hat</strong> ruxsatsiz kiradi, lekin yomon niyati bo‘lmasligi mumkin. Bu ham qonunga zid.</p>
<div class="callout warn"><b>Muhim</b><p>O‘zbekiston Jinoyat kodeksida kompyuter axborotiga ruxsatsiz kirish, zararli dastur yaratish va tarqatish uchun javobgarlik belgilangan (XX¹ bob, 278¹–278⁷-moddalar). Hech qachon ruxsatsiz tizimni skanerlamang yoki sinamang. Mashq uchun o‘z laboratoriyangiz, TryHackMe, HackTheBox yoki bug bounty dasturlarini ishlating.</p></div>` },
    { id: "kasb", h: "Kasb yo‘nalishlari", html: `
<ul>
  <li><strong>SOC tahlilchisi</strong> — monitoring, ogohlantirishlarni tahlil qilish. Ko‘pchilik kasbni shu yerdan boshlaydi.</li>
  <li><strong>Pentester / Red Team</strong> — ruxsat bilan hujumni simulyatsiya qilish.</li>
  <li><strong>Incident Responder / DFIR</strong> — hujumdan keyin tergov va tiklash.</li>
  <li><strong>Security Engineer</strong> — himoya tizimlarini qurish va avtomatlashtirish.</li>
  <li><strong>AppSec / DevSecOps</strong> — xavfsiz kod, kod tahlili, CI/CD xavfsizligi.</li>
  <li><strong>GRC</strong> — siyosatlar, audit, standartlar (ISO 27001, NIST CSF).</li>
  <li><strong>Cloud Security</strong> — AWS, Azure, GCP muhitlarini himoyalash.</li>
</ul>
<p>Boshlang‘ich sertifikatlar: <strong>CompTIA Security+</strong>, <strong>ISC2 CC</strong> (bepul imtihon dasturi mavjud), <strong>Google Cybersecurity Certificate</strong>. Amaliy yo‘nalish uchun keyingi bosqichda <strong>OSCP</strong>, <strong>eJPT</strong>, <strong>BTL1</strong>.</p>` }
  ],
  keypoints: [
    "CIA — maxfiylik, butunlik va mavjudlik. Har bir hujum ulardan kamida bittasini buzadi.",
    "Zaiflik — kamchilik, tahdid — uni ishlatishi mumkin bo‘lgan manba, risk — ehtimollik × taʼsir.",
    "Himoya odamlar, jarayonlar va texnologiya qatlamlaridan iborat.",
    "Ruxsatsiz sinov jinoyat. Faqat o‘zingizning yoki ruxsat berilgan muhitda mashq qiling."
  ],
  practice: `<p>O‘zingiz ishlatadigan 3 ta xizmatni oling (masalan, email, Telegram, bank ilovasi). Har biri uchun yozing: qaysi maʼlumot aktiv hisoblanadi, CIA ning qaysi qismi eng muhim va qanday tahdid bo‘lishi mumkin. Keyin har biriga bittadan himoya chorasini yozing (masalan, MFA yoqish).</p>`
},

{
  id: "linux-asoslari",
  track: "asoslar",
  level: 1,
  minutes: 30,
  title: "Linux asoslari: terminal, fayllar va ruxsatlar",
  summary: "Serverlar va xavfsizlik vositalarining aksariyati Linuxda ishlaydi. Terminal, fayl tizimi, ruxsatlar va jarayonlar bilan ishlashni o‘rganing.",
  sections: [
    { id: "nega", h: "Nega aynan Linux?", html: `
<p>Internet serverlarining katta qismi, bulut infratuzilmasi, konteynerlar va deyarli barcha xavfsizlik vositalari (Nmap, Wireshark, Metasploit, Burp Suite) Linuxda ishlaydi. Kali Linux va Parrot OS — pentest uchun tayyorlangan distributivlar. Himoya tomonida esa Ubuntu, Debian, RHEL serverlarini boshqarish kerak bo‘ladi.</p>
<div class="callout tip"><b>Boshlash</b><p>Kompyuteringizga VirtualBox yoki VMware o‘rnating va unga Ubuntu hamda Kali Linux virtual mashinalarini qo‘ying. Windows 10/11 da <code>wsl --install</code> buyrug‘i bilan WSL orqali ham Linux ishlatish mumkin.</p></div>` },
    { id: "fs", h: "Fayl tizimi tuzilishi", html: `
<div class="table-wrap"><table>
<tr><th>Katalog</th><th>Nima saqlanadi</th><th>Xavfsizlik uchun ahamiyati</th></tr>
<tr><td><code>/etc</code></td><td>Sozlamalar</td><td><code>/etc/passwd</code>, <code>/etc/shadow</code>, <code>/etc/ssh/sshd_config</code></td></tr>
<tr><td><code>/var/log</code></td><td>Loglar</td><td><code>auth.log</code> yoki <code>secure</code> — kirish urinishlari</td></tr>
<tr><td><code>/home</code></td><td>Foydalanuvchi kataloglari</td><td><code>.ssh/</code>, <code>.bash_history</code></td></tr>
<tr><td><code>/root</code></td><td>root foydalanuvchi katalogi</td><td>Faqat root kira oladi</td></tr>
<tr><td><code>/tmp</code></td><td>Vaqtinchalik fayllar</td><td>Hamma yoza oladi, hujumchilar ko‘p ishlatadi</td></tr>
<tr><td><code>/bin</code>, <code>/usr/bin</code></td><td>Dasturlar</td><td>SUID fayllarni tekshirish</td></tr>
</table></div>` },
    { id: "buyruqlar", h: "Asosiy buyruqlar", html: `
<pre><code><span class="cmt"># Qayerdaman va nima bor?</span>
pwd                      <span class="cmt"># joriy katalog</span>
ls -la                   <span class="cmt"># barcha fayllar, yashirinlari ham, ruxsatlari bilan</span>
cd /var/log              <span class="cmt"># katalogga o‘tish</span>

<span class="cmt"># Fayllar bilan ishlash</span>
cat fayl.txt             <span class="cmt"># faylni ko‘rsatish</span>
less katta.log           <span class="cmt"># sahifalab o‘qish (q — chiqish)</span>
head -n 20 fayl.txt      <span class="cmt"># birinchi 20 qator</span>
tail -f /var/log/syslog  <span class="cmt"># logni jonli kuzatish</span>
cp a.txt b.txt ; mv a.txt yangi/ ; rm fayl.txt

<span class="cmt"># Qidirish</span>
grep -i "failed" /var/log/auth.log
find / -name "*.conf" 2&gt;/dev/null
find / -perm -4000 -type f 2&gt;/dev/null   <span class="cmt"># SUID fayllar</span></code></pre>` },
    { id: "ruxsat", h: "Ruxsatlar (permissions)", html: `
<p><code>ls -l</code> natijasida quyidagi ko‘rinishni uchratasiz:</p>
<pre><code>-rwxr-x---  1 ali  dev  4096 Mar 10 12:00 skript.sh</code></pre>
<p>Birinchi belgi fayl turini ko‘rsatadi (<code>-</code> oddiy fayl, <code>d</code> katalog, <code>l</code> havola). Keyin 3 tadan uch guruh keladi: <strong>egasi</strong> (rwx), <strong>guruh</strong> (r-x) va <strong>boshqalar</strong> (---).</p>
<div class="table-wrap"><table>
<tr><th>Belgi</th><th>Raqam</th><th>Faylda</th><th>Katalogda</th></tr>
<tr><td><code>r</code></td><td>4</td><td>o‘qish</td><td>ro‘yxatni ko‘rish</td></tr>
<tr><td><code>w</code></td><td>2</td><td>yozish</td><td>fayl yaratish va o‘chirish</td></tr>
<tr><td><code>x</code></td><td>1</td><td>ishga tushirish</td><td>ichiga kirish</td></tr>
</table></div>
<pre><code>chmod 750 skript.sh      <span class="cmt"># egasi: rwx(7), guruh: r-x(5), boshqalar: ---(0)</span>
chmod 600 ~/.ssh/id_ed25519   <span class="cmt"># maxfiy kalit faqat egasiga</span>
chown ali:dev fayl.txt   <span class="cmt"># egasini o‘zgartirish</span></code></pre>
<div class="callout warn"><b>Xavfli sozlamalar</b><p><code>chmod 777</code> — hamma o‘qiydi, yozadi va ishga tushiradi. Hech qachon ishlatmang. <strong>SUID</strong> biti (<code>-rwsr-xr-x</code>) faylni egasi nomidan ishga tushiradi. Egasi root bo‘lgan noto‘g‘ri SUID fayllar huquqlarni oshirish (privilege escalation) uchun klassik yo‘l.</p></div>` },
    { id: "users", h: "Foydalanuvchilar va sudo", html: `
<pre><code>whoami ; id              <span class="cmt"># kimman va qaysi guruhlardaman</span>
sudo -l                  <span class="cmt"># sudo orqali nima qila olaman</span>
cat /etc/passwd          <span class="cmt"># foydalanuvchilar ro‘yxati</span>
sudo cat /etc/shadow     <span class="cmt"># parol xeshlari (faqat root)</span>
sudo adduser yangi       <span class="cmt"># foydalanuvchi qo‘shish</span>
sudo usermod -aG sudo yangi
last ; lastb             <span class="cmt"># muvaffaqiyatli va muvaffaqiyatsiz kirishlar</span></code></pre>
<p><strong>Eng kam imtiyoz tamoyili</strong> (least privilege): har bir foydalanuvchi va xizmatga faqat ishiga kerakli huquqni bering. Kundalik ishni root sifatida bajarmang.</p>` },
    { id: "jarayon", h: "Jarayonlar va xizmatlar", html: `
<pre><code>ps aux                   <span class="cmt"># barcha jarayonlar</span>
top   yoki   htop        <span class="cmt"># jonli monitoring</span>
kill -9 1234             <span class="cmt"># PID bo‘yicha jarayonni to‘xtatish</span>
systemctl status ssh     <span class="cmt"># xizmat holati</span>
sudo systemctl disable --now telnet.socket
ss -tulpn                <span class="cmt"># qaysi portlar tinglanmoqda va qaysi dastur</span>
crontab -l ; ls /etc/cron*   <span class="cmt"># rejalashtirilgan vazifalar (persistence uchun tekshiring)</span></code></pre>` },
    { id: "paket", h: "Dasturlarni yangilash", html: `
<pre><code>sudo apt update &amp;&amp; sudo apt upgrade -y     <span class="cmt"># Debian/Ubuntu/Kali</span>
sudo dnf upgrade                          <span class="cmt"># Fedora/RHEL</span>
sudo apt install unattended-upgrades      <span class="cmt"># avtomatik xavfsizlik yangilanishlari</span></code></pre>
<p>Buzilishlarning katta qismi eski, yangilanmagan dasturlar orqali sodir bo‘ladi. Muntazam yangilash eng arzon va eng samarali himoya.</p>` }
  ],
  keypoints: [
    "Loglar /var/log da, sozlamalar /etc da saqlanadi.",
    "Ruxsatlar egasi, guruh va boshqalar uchun r=4, w=2, x=1 qiymatlari bilan beriladi.",
    "chmod 777 va noto‘g‘ri SUID fayllar jiddiy xavf tug‘diradi.",
    "ss -tulpn ochiq portlarni, sudo -l esa imtiyozlaringizni ko‘rsatadi."
  ],
  practice: `<p>Virtual mashinada: 1) <code>ss -tulpn</code> bilan ochiq portlarni aniqlang. 2) <code>find / -perm -4000 -type f 2&gt;/dev/null</code> bilan SUID fayllar ro‘yxatini oling. 3) Yangi foydalanuvchi yarating, unga faqat o‘z katalogiga kirish huquqini bering va boshqa foydalanuvchi uning fayllarini o‘qiy olmasligini tekshiring.</p>`
},

{
  id: "tarmoq-asoslari",
  track: "asoslar",
  level: 1,
  minutes: 35,
  title: "Tarmoq asoslari: IP, portlar, TCP/IP va DNS",
  summary: "OSI modeli, IP manzillar va subnetlar, TCP va UDP, portlar, DNS va HTTP qanday ishlashi.",
  sections: [
    { id: "osi", h: "OSI va TCP/IP modellari", html: `
<div class="table-wrap"><table>
<tr><th>#</th><th>OSI qatlami</th><th>Misollar</th><th>Hujum misollari</th></tr>
<tr><td>7</td><td>Application (Ilova)</td><td>HTTP, DNS, SMTP, SSH</td><td>SQLi, XSS, fishing</td></tr>
<tr><td>6</td><td>Presentation (Taqdimot)</td><td>TLS, kodlash</td><td>SSL stripping</td></tr>
<tr><td>5</td><td>Session (Seans)</td><td>Seanslar</td><td>Session hijacking</td></tr>
<tr><td>4</td><td>Transport</td><td>TCP, UDP</td><td>SYN flood, port skanerlash</td></tr>
<tr><td>3</td><td>Network (Tarmoq)</td><td>IP, ICMP</td><td>IP spoofing, ICMP flood</td></tr>
<tr><td>2</td><td>Data Link (Kanal)</td><td>Ethernet, MAC, ARP</td><td>ARP spoofing, MAC flooding</td></tr>
<tr><td>1</td><td>Physical (Fizik)</td><td>Kabel, Wi-Fi radio</td><td>Jamming, ulanishni tinglash</td></tr>
</table></div>
<p>Amalda TCP/IP modelining 4 qatlami ishlatiladi: Link, Internet, Transport va Application.</p>` },
    { id: "ip", h: "IP manzillar va subnetlar", html: `
<p><strong>IPv4</strong> manzil 32 bitdan iborat, masalan <code>192.168.1.10</code>. <strong>CIDR</strong> yozuvi tarmoq qismini ko‘rsatadi: <code>192.168.1.0/24</code> — birinchi 24 bit tarmoqqa, qolgan 8 bit xostlarga tegishli, yaʼni 254 ta foydalaniladigan manzil.</p>
<div class="table-wrap"><table>
<tr><th>Diapazon</th><th>Turi</th></tr>
<tr><td><code>10.0.0.0/8</code></td><td>Xususiy (private)</td></tr>
<tr><td><code>172.16.0.0/12</code></td><td>Xususiy</td></tr>
<tr><td><code>192.168.0.0/16</code></td><td>Xususiy (uy routerlari)</td></tr>
<tr><td><code>127.0.0.0/8</code></td><td>Loopback (o‘z kompyuteringiz)</td></tr>
<tr><td><code>169.254.0.0/16</code></td><td>APIPA — DHCP ishlamaganda. Bulutda <code>169.254.169.254</code> metadata xizmati, SSRF hujumlarining nishoni</td></tr>
</table></div>
<p>Subnetlarni tez hisoblash uchun saytdagi <a href="#/vositalar/subnet">Subnet kalkulyatori</a>dan foydalaning.</p>` },
    { id: "tcp", h: "TCP va UDP", html: `
<p><strong>TCP</strong> ulanishni o‘rnatadi va yetkazib berishni kafolatlaydi. Ulanish <strong>uch bosqichli qo‘l siqish</strong> (3-way handshake) bilan boshlanadi:</p>
<pre><code>Mijoz  ── SYN ──────▶  Server
Mijoz  ◀── SYN-ACK ──  Server
Mijoz  ── ACK ──────▶  Server     <span class="cmt"># ulanish o‘rnatildi</span></code></pre>
<p><strong>UDP</strong> ulanishsiz ishlaydi: tez, lekin kafolatsiz. DNS, VoIP, video striming va o‘yinlar UDP ishlatadi.</p>
<p>TCP bayroqlari: <code>SYN</code>, <code>ACK</code>, <code>FIN</code>, <code>RST</code>, <code>PSH</code>, <code>URG</code>. Nmap aynan shu bayroqlarga qarab port ochiq yoki yopiq ekanini aniqlaydi.</p>` },
    { id: "port", h: "Muhim portlar", html: `
<div class="table-wrap"><table>
<tr><th>Port</th><th>Xizmat</th><th>Izoh</th></tr>
<tr><td>21</td><td>FTP</td><td>Shifrlanmagan, parol ochiq uzatiladi</td></tr>
<tr><td>22</td><td>SSH</td><td>Masofaviy boshqaruv, brute-force nishoni</td></tr>
<tr><td>23</td><td>Telnet</td><td>Shifrlanmagan, o‘chirib qo‘yish kerak</td></tr>
<tr><td>25</td><td>SMTP</td><td>Pochta yuborish</td></tr>
<tr><td>53</td><td>DNS</td><td>UDP/TCP</td></tr>
<tr><td>80 / 443</td><td>HTTP / HTTPS</td><td>Veb</td></tr>
<tr><td>445</td><td>SMB</td><td>Windows fayl almashish. WannaCry shu port orqali tarqalgan</td></tr>
<tr><td>3306</td><td>MySQL</td><td>Internetga ochiq bo‘lmasligi kerak</td></tr>
<tr><td>3389</td><td>RDP</td><td>Ransomware guruhlarining asosiy kirish yo‘li</td></tr>
</table></div>
<p>To‘liq ro‘yxat: <a href="#/vositalar/portlar">Portlar maʼlumotnomasi</a>.</p>` },
    { id: "dns", h: "DNS qanday ishlaydi", html: `
<p>DNS domen nomini IP manzilga aylantiradi. Brauzeringiz <code>example.com</code> ni so‘raganda: 1) avval lokal keshni tekshiradi, 2) so‘ng rekursiv resolverga murojaat qiladi (provayder, 1.1.1.1 yoki 8.8.8.8), 3) resolver ildiz serveri, keyin <code>.com</code> TLD serveri va nihoyat domenning authoritative serveridan javob oladi.</p>
<div class="table-wrap"><table>
<tr><th>Yozuv</th><th>Vazifasi</th></tr>
<tr><td>A / AAAA</td><td>IPv4 / IPv6 manzil</td></tr>
<tr><td>CNAME</td><td>Boshqa nomga taxallus</td></tr>
<tr><td>MX</td><td>Pochta serveri</td></tr>
<tr><td>TXT</td><td>SPF, DKIM, DMARC — email soxtalashtirishdan himoya</td></tr>
<tr><td>NS</td><td>Domenning DNS serverlari</td></tr>
</table></div>
<pre><code>dig example.com A +short
dig example.com MX
nslookup example.com
dig -x 8.8.8.8            <span class="cmt"># teskari so‘rov (PTR)</span></code></pre>` },
    { id: "http", h: "HTTP so‘rov va javob", html: `
<pre><code>GET /login HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0
Cookie: session=abc123

HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: session=xyz; HttpOnly; Secure; SameSite=Lax</code></pre>
<p>Metodlar: <code>GET</code> (olish), <code>POST</code> (yuborish), <code>PUT</code>/<code>PATCH</code> (yangilash), <code>DELETE</code>. Holat kodlari: 2xx muvaffaqiyat, 3xx yo‘naltirish, 4xx mijoz xatosi (401 autentifikatsiya kerak, 403 taqiqlangan, 404 topilmadi), 5xx server xatosi.</p>
<p>Cookie bayroqlari xavfsizlik uchun muhim: <code>HttpOnly</code> JavaScript o‘qishini taqiqlaydi (XSS dan himoya), <code>Secure</code> faqat HTTPS orqali yuboradi, <code>SameSite</code> esa CSRF dan himoya qiladi.</p>` }
  ],
  keypoints: [
    "TCP 3 bosqichli qo‘l siqish bilan ulanadi: SYN, SYN-ACK, ACK.",
    "Xususiy diapazonlar: 10/8, 172.16/12, 192.168/16.",
    "RDP (3389), SMB (445) va maʼlumotlar bazasi portlari internetga ochiq bo‘lmasligi kerak.",
    "DNS TXT yozuvlaridagi SPF, DKIM va DMARC emailni soxtalashtirishdan himoya qiladi."
  ],
  practice: `<p>1) <code>ip a</code> (Windowsda <code>ipconfig</code>) bilan o‘z IP va subnetingizni toping. 2) <code>dig</code> bilan biror domenning A, MX va TXT yozuvlarini oling va SPF yozuvi borligini tekshiring. 3) Wireshark ochib, brauzerda sayt oching va TCP 3-way handshake paketlarini toping (filtr: <code>tcp.flags.syn==1</code>).</p>`
},

{
  id: "parollar-autentifikatsiya",
  track: "asoslar",
  level: 1,
  minutes: 20,
  title: "Parollar, xeshlash va MFA",
  summary: "Parollar qanday saqlanadi, qanday buziladi va qanday himoya qilinadi: xesh, tuz (salt), MFA va passkey.",
  sections: [
    { id: "saqlash", h: "Parollar qanday saqlanishi kerak", html: `
<p>To‘g‘ri tizim parolni hech qachon ochiq holda saqlamaydi. Uning o‘rniga <strong>xesh</strong> saqlanadi: bir tomonlama funksiya natijasi, undan asl parolni qaytarib bo‘lmaydi. Kirishda kiritilgan parol ham xeshlanadi va natijalar solishtiriladi.</p>
<div class="table-wrap"><table>
<tr><th>Algoritm</th><th>Parol uchun</th><th>Izoh</th></tr>
<tr><td>MD5, SHA-1</td><td>✕ Yaroqsiz</td><td>Juda tez va kolliziyalar topilgan</td></tr>
<tr><td>SHA-256 (tuzsiz)</td><td>✕ Yaroqsiz</td><td>Tez, GPU soniyasiga milliardlab variantni sinaydi</td></tr>
<tr><td>bcrypt</td><td>✓ Yaxshi</td><td>Sekin, sozlanadigan narx (cost)</td></tr>
<tr><td>scrypt</td><td>✓ Yaxshi</td><td>Ko‘p xotira talab qiladi</td></tr>
<tr><td>Argon2id</td><td>✓ Eng yaxshi</td><td>OWASP tavsiyasi, 2015 yilgi Password Hashing Competition g‘olibi</td></tr>
</table></div>
<p><strong>Tuz (salt)</strong> — har bir parolga qo‘shiladigan tasodifiy qiymat. U bir xil parollarning xeshini har xil qiladi va oldindan hisoblangan jadvallar (rainbow tables) ishini bekor qiladi.</p>` },
    { id: "hujumlar", h: "Parolga hujum turlari", html: `
<ul>
  <li><strong>Brute-force</strong> — barcha kombinatsiyalarni sinash.</li>
  <li><strong>Lug‘at hujumi</strong> — mashhur parollar ro‘yxati bo‘yicha (masalan, <code>rockyou.txt</code>).</li>
  <li><strong>Credential stuffing</strong> — boshqa saytdan sizib chiqqan login va parollarni sinash. Bitta parolni ko‘p joyda ishlatish aynan shuning uchun xavfli.</li>
  <li><strong>Password spraying</strong> — bitta keng tarqalgan parolni ko‘p akkauntlarda sinash (bloklanishdan qochish uchun).</li>
  <li><strong>Fishing</strong> — parolni to‘g‘ridan to‘g‘ri aldab olish.</li>
</ul>
<div class="callout info"><b>Hisob-kitob</b><p>8 belgili, faqat kichik harflardan iborat parolda 26⁸ ≈ 2·10¹¹ variant bor. Tez xeshni soniyasiga 10¹⁰ marta sinaydigan GPU uni 21 soniyada buzadi. 16 belgili passphrase esa amalda buzib bo‘lmaydi. <a href="#/vositalar/parol">Parol kuchini tekshirib ko‘ring</a>.</p></div>` },
    { id: "mfa", h: "Ko‘p faktorli autentifikatsiya (MFA)", html: `
<p>Faktor turlari: <strong>bilgan narsangiz</strong> (parol, PIN), <strong>egalik qilgan narsangiz</strong> (telefon, kalit) va <strong>o‘zingiz</strong> (barmoq izi, yuz).</p>
<div class="table-wrap"><table>
<tr><th>Usul</th><th>Xavfsizlik</th><th>Zaif tomoni</th></tr>
<tr><td>SMS kod</td><td>Past</td><td>SIM-swap, SS7 hujumlari</td></tr>
<tr><td>TOTP ilova (Google Authenticator, Aegis)</td><td>Yaxshi</td><td>Fishing saytiga kiritib qo‘yish mumkin</td></tr>
<tr><td>Push xabarnoma</td><td>Yaxshi</td><td>“MFA fatigue” — ketma-ket so‘rovlar yuborib charchatish</td></tr>
<tr><td>FIDO2 / Passkey / YubiKey</td><td>Eng yuqori</td><td>Fishingga chidamli, domenga bog‘langan</td></tr>
</table></div>` },
    { id: "tavsiya", h: "Amaliy tavsiyalar", html: `
<ul>
  <li><strong>Parol menejeri</strong> ishlating (Bitwarden, KeePassXC, 1Password). Har bir sayt uchun alohida tasodifiy parol.</li>
  <li>Esda saqlanadigan parollar uchun <strong>passphrase</strong>: 4–5 ta tasodifiy so‘z, masalan <code>daryo-chiroq-olma-yulduz-7</code>.</li>
  <li>Muhim akkauntlarda (email, bank, Telegram) MFA ni albatta yoqing. Telegramda “Ikki bosqichli tekshiruv” (Two-Step Verification) parolini qo‘ying.</li>
  <li>Emailingiz sizib chiqqanini <a href="https://haveibeenpwned.com" target="_blank" rel="noopener">haveibeenpwned.com</a> da tekshiring.</li>
  <li>NIST SP 800-63B tavsiyasi: parolni majburiy davriy almashtirish shart emas, faqat sizib chiqqanda almashtiring. Uzunlik murakkablikdan muhimroq.</li>
</ul>` }
  ],
  keypoints: [
    "Parollar Argon2id, bcrypt yoki scrypt bilan, tuz qo‘shilgan holda xeshlanishi kerak.",
    "MD5, SHA-1 va tuzsiz SHA-256 parollar uchun yaroqsiz.",
    "Credential stuffing tufayli bir parolni ko‘p joyda ishlatish xavfli.",
    "Eng kuchli MFA — FIDO2 yoki passkey. SMS eng zaifi."
  ],
  practice: `<p>1) Parol menejeri o‘rnating va eng muhim 5 ta akkauntingiz parolini tasodifiy parolga almashtiring. 2) Email, Telegram va bank ilovangizda MFA ni yoqing. 3) Saytdagi <a href="#/vositalar/hash">Xesh generatori</a>da “salom” so‘zining SHA-256 xeshini oling, keyin “Salom” so‘zinikini oling va bitta harf natijani butunlay o‘zgartirishini kuzating (avalanche effekti).</p>`
},

{
  id: "kriptografiya",
  track: "asoslar",
  level: 2,
  minutes: 30,
  title: "Kriptografiya: shifrlash, xesh, TLS",
  summary: "Simmetrik va asimmetrik shifrlash, xesh funksiyalar, raqamli imzo, sertifikatlar va HTTPS qanday ishlashi.",
  sections: [
    { id: "turlari", h: "Uch asosiy vosita", html: `
<div class="table-wrap"><table>
<tr><th>Vosita</th><th>Maqsad</th><th>Algoritmlar</th></tr>
<tr><td>Simmetrik shifrlash</td><td>Bitta kalit bilan shifrlash va ochish. Tez</td><td>AES-256-GCM, ChaCha20-Poly1305</td></tr>
<tr><td>Asimmetrik shifrlash</td><td>Ochiq kalit va yopiq kalit juftligi</td><td>RSA (3072+ bit), ECC (X25519, P-256)</td></tr>
<tr><td>Xesh</td><td>Butunlikni tekshirish, bir tomonlama</td><td>SHA-256, SHA-3, BLAKE2</td></tr>
</table></div>
<div class="callout warn"><b>Kodlash shifrlash emas</b><p>Base64, Hex va URL encoding kalitsiz, istalgan odam qaytara oladi. Ular maʼlumotni yashirmaydi, faqat formatni o‘zgartiradi.</p></div>` },
    { id: "asim", h: "Ochiq kalit kriptografiyasi", html: `
<p>Har bir tomonning ikki kaliti bor: <strong>ochiq kalit</strong> (hammaga beriladi) va <strong>yopiq kalit</strong> (hech kimga berilmaydi).</p>
<ul>
  <li><strong>Shifrlash:</strong> Alisa Bobning <em>ochiq</em> kaliti bilan shifrlaydi. Uni faqat Bob o‘zining <em>yopiq</em> kaliti bilan ochadi.</li>
  <li><strong>Raqamli imzo:</strong> Bob xabar xeshini o‘zining <em>yopiq</em> kaliti bilan imzolaydi. Istalgan odam uni Bobning <em>ochiq</em> kaliti bilan tekshiradi. Imzo haqiqiylik, butunlik va inkor etib bo‘lmaslikni taʼminlaydi.</li>
</ul>
<p>Asimmetrik shifrlash sekin. Shuning uchun amalda <strong>gibrid</strong> sxema ishlatiladi: asimmetrik usul bilan simmetrik seans kaliti kelishiladi, qolgan trafik esa AES yoki ChaCha20 bilan shifrlanadi.</p>` },
    { id: "tls", h: "HTTPS va TLS 1.3", html: `
<pre><code>1. ClientHello   — mijoz qo‘llaydigan shifrlar va kalit almashish maʼlumoti
2. ServerHello   — server tanlovi + sertifikat + imzo
3. Mijoz sertifikatni tekshiradi: CA imzosi, muddati, domen nomi
4. ECDHE orqali umumiy seans kaliti hosil qilinadi (forward secrecy)
5. Qolgan trafik AES-GCM yoki ChaCha20 bilan shifrlanadi</code></pre>
<p><strong>Sertifikat</strong> domen va ochiq kalitni bog‘laydi. Unga ishonchli Sertifikat markazi (CA) imzo qo‘yadi. Let’s Encrypt bepul sertifikat beradi. <strong>Forward secrecy</strong> degani: server yopiq kaliti keyin o‘g‘irlansa ham, oldin yozib olingan trafikni ochib bo‘lmaydi.</p>
<pre><code><span class="cmt"># Sayt sertifikatini tekshirish</span>
openssl s_client -connect example.com:443 -servername example.com &lt;/dev/null 2&gt;/dev/null | openssl x509 -noout -subject -issuer -dates

<span class="cmt"># Fayl butunligini tekshirish</span>
sha256sum ubuntu.iso
<span class="cmt"># natijani rasmiy saytdagi SHA256SUMS bilan solishtiring</span></code></pre>` },
    { id: "amaliy", h: "OpenSSL va GPG bilan amaliyot", html: `
<pre><code><span class="cmt"># Faylni AES-256 bilan parol orqali shifrlash va ochish</span>
openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt -in maxfiy.txt -out maxfiy.enc
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -in maxfiy.enc -out ochiq.txt

<span class="cmt"># SSH kalit juftligi yaratish (zamonaviy tavsiya — Ed25519)</span>
ssh-keygen -t ed25519 -C "email@misol.uz"

<span class="cmt"># GPG bilan faylni imzolash va tekshirish</span>
gpg --full-generate-key
gpg --detach-sign hujjat.pdf
gpg --verify hujjat.pdf.sig hujjat.pdf

<span class="cmt"># Tasodifiy kuchli kalit yaratish</span>
openssl rand -base64 32</code></pre>` },
    { id: "xato", h: "Keng tarqalgan xatolar", html: `
<ul>
  <li>O‘zingiz yozgan “maxfiy” algoritmdan foydalanish. Faqat tekshirilgan kutubxonalarni ishlating (libsodium, Tink, standart kutubxonalar).</li>
  <li>AES ni <strong>ECB</strong> rejimida ishlatish. Bir xil bloklar bir xil shifrmatn beradi va naqsh ko‘rinib qoladi. GCM ishlating.</li>
  <li>Kalitlarni kod ichida yoki GitHub da saqlash. Secret manager yoki muhit o‘zgaruvchilarini ishlating.</li>
  <li><code>Math.random()</code> kabi kriptografik bo‘lmagan tasodifiy sonlar. <code>crypto.getRandomValues()</code> yoki <code>secrets</code> modulini ishlating.</li>
  <li>Eski protokollar: SSLv3, TLS 1.0 va 1.1. Faqat TLS 1.2 va 1.3 ni yoqing.</li>
</ul>` }
  ],
  keypoints: [
    "Simmetrik usul tez, asimmetrik usul kalit almashish va imzo uchun ishlatiladi. Amalda ikkalasi birga qo‘llanadi.",
    "Base64 shifrlash emas.",
    "TLS 1.3 forward secrecy ni majburiy qiladi.",
    "Kriptografiyani o‘zingiz yozmang, tekshirilgan kutubxonalardan foydalaning."
  ],
  practice: `<p>1) <code>ssh-keygen -t ed25519</code> bilan kalit yarating va uni test serveringizga qo‘shib, parolsiz kirishni sozlang. 2) <code>openssl s_client</code> bilan 3 ta saytning sertifikati kim tomonidan berilganini va muddatini aniqlang. 3) Biror Linux ISO faylini yuklab oling va SHA-256 yig‘indisini rasmiy qiymat bilan solishtiring.</p>`
}
);
