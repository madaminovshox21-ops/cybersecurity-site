/* Buyruqlar maʼlumotnomasi — xavfsizlik va tarmoq buyruqlari.
   Faqat o‘zingizning yoki ruxsat berilgan tizimlarda ishlating. */
window.COMMANDS = [
  { cat: "Tarmoq va aniqlash", items: [
    { cmd: "ip a", desc: "Barcha tarmoq interfeyslari va IP manzillarni ko‘rsatadi (Linux)." },
    { cmd: "ipconfig /all", desc: "Tarmoq sozlamalari, MAC va DNS (Windows)." },
    { cmd: "ping -c 4 example.com", desc: "Xost ishlayaptimi va javob vaqtini tekshiradi." },
    { cmd: "traceroute example.com", desc: "Paket qaysi marshrut orqali o‘tishini ko‘rsatadi (Windowsda tracert)." },
    { cmd: "ss -tulpn", desc: "Tinglayotgan TCP/UDP portlar va ularni ochgan jarayonlar." },
    { cmd: "netstat -ano", desc: "Faol ulanishlar va portlar, PID bilan (Windows)." },
    { cmd: "arp -a", desc: "ARP jadvali: lokal tarmoqdagi IP–MAC moslik." },
    { cmd: "curl -I https://example.com", desc: "Faqat HTTP javob sarlavhalarini oladi." },
    { cmd: "whois example.com", desc: "Domen egasi va ro‘yxatdan o‘tish maʼlumotlari." }
  ]},
  { cat: "DNS", items: [
    { cmd: "dig example.com A +short", desc: "Domenning IPv4 manzilini qisqa ko‘rsatadi." },
    { cmd: "dig example.com MX", desc: "Pochta serverlari yozuvlari." },
    { cmd: "dig example.com TXT", desc: "SPF, DKIM, DMARC yozuvlarini ko‘rish." },
    { cmd: "dig -x 8.8.8.8", desc: "Teskari DNS: IP dan domen nomini topish (PTR)." },
    { cmd: "nslookup example.com 1.1.1.1", desc: "Belgilangan DNS server orqali so‘rov." },
    { cmd: "host example.com", desc: "Domen haqida qisqa DNS maʼlumot." }
  ]},
  { cat: "Nmap (skanerlash)", note: "Faqat o‘zingizga tegishli yoki ruxsat berilgan xostlarda.", items: [
    { cmd: "nmap 192.168.1.0/24", desc: "Tarmoqdagi faol xostlarni va ochiq portlarni topadi." },
    { cmd: "nmap -sV -p- 192.168.1.10", desc: "Barcha portlarni skanerlab, xizmat versiyalarini aniqlaydi." },
    { cmd: "nmap -sС -sV 192.168.1.10", desc: "Standart skriptlar + versiya aniqlash (tez umumiy ko‘rik)." },
    { cmd: "nmap -sn 192.168.1.0/24", desc: "Faqat qaysi xostlar tirikligini aniqlaydi (ping scan)." },
    { cmd: "nmap -A scanme.nmap.org", desc: "Agressiv: OS, versiya, skript va trace. scanme.nmap.org — mashq uchun rasmiy ruxsat berilgan xost." },
    { cmd: "nmap --script vuln 192.168.1.10", desc: "Maʼlum zaifliklarni tekshiruvchi skriptlar." }
  ]},
  { cat: "SSH va masofaviy ish", items: [
    { cmd: "ssh-keygen -t ed25519 -C \"email@misol.uz\"", desc: "Zamonaviy Ed25519 kalit juftligini yaratadi." },
    { cmd: "ssh-copy-id admin@SERVER_IP", desc: "Ochiq kalitni serverga qo‘shadi (parolsiz kirish uchun)." },
    { cmd: "ssh -i kalit.pem admin@SERVER_IP", desc: "Belgilangan kalit bilan ulanish." },
    { cmd: "ssh -L 3306:localhost:3306 admin@SERVER_IP", desc: "Lokal port tunnel: bazaga xavfsiz ulanish." },
    { cmd: "scp fayl.txt admin@SERVER_IP:/tmp/", desc: "Faylni SSH orqali xavfsiz ko‘chiradi." },
    { cmd: "sshpass", desc: "Undan qoching — parolni buyruq qatoriga qo‘yish xavfli. Kalit ishlating." }
  ]},
  { cat: "Fayllar, xesh va butunlik", items: [
    { cmd: "sha256sum fayl.iso", desc: "Fayl SHA-256 yig‘indisini hisoblaydi (rasmiy qiymat bilan solishtiring)." },
    { cmd: "certutil -hashfile fayl.iso SHA256", desc: "Windowsda fayl xeshini olish." },
    { cmd: "md5sum -c SHA256SUMS", desc: "Fayllar ro‘yxatini nazorat yig‘indisi bilan tekshiradi." },
    { cmd: "find / -perm -4000 -type f 2>/dev/null", desc: "SUID fayllarni topadi (imtiyoz oshirishni tekshirish)." },
    { cmd: "chmod 600 ~/.ssh/id_ed25519", desc: "Maxfiy kalitni faqat egasiga o‘qishga ochadi." },
    { cmd: "stat fayl.txt", desc: "Fayl vaqtlari va ruxsatlari — tergovda foydali." }
  ]},
  { cat: "Shifrlash (OpenSSL, GPG)", items: [
    { cmd: "openssl rand -base64 32", desc: "Kuchli tasodifiy kalit yoki parol yaratadi." },
    { cmd: "openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt -in a.txt -out a.enc", desc: "Faylni AES-256 bilan parol orqali shifrlaydi." },
    { cmd: "openssl s_client -connect example.com:443 -servername example.com", desc: "TLS ulanishi va sertifikatni tekshiradi." },
    { cmd: "openssl x509 -in cert.pem -noout -dates -subject -issuer", desc: "Sertifikat muddati va egasini ko‘rsatadi." },
    { cmd: "gpg --detach-sign hujjat.pdf", desc: "Faylga raqamli imzo qo‘yadi." },
    { cmd: "gpg --verify hujjat.pdf.sig hujjat.pdf", desc: "Imzoni tekshiradi." }
  ]},
  { cat: "Log tahlili", items: [
    { cmd: "grep \"Failed password\" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn", desc: "SSH parol tanlash urinishlarini IP bo‘yicha sanaydi." },
    { cmd: "journalctl -u ssh --since today", desc: "Bugungi SSH xizmat loglari." },
    { cmd: "last -n 20", desc: "Oxirgi muvaffaqiyatli kirishlar." },
    { cmd: "lastb | head", desc: "Muvaffaqiyatsiz kirish urinishlari." },
    { cmd: "awk '$9==404 {print $1}' access.log | sort | uniq -c | sort -rn", desc: "Ko‘p 404 olgan IP lar — katalog skanerlash belgisi." },
    { cmd: "tail -f /var/log/nginx/access.log", desc: "Veb-server so‘rovlarini jonli kuzatadi." }
  ]},
  { cat: "Windows PowerShell (himoya)", items: [
    { cmd: "Get-MpComputerStatus", desc: "Microsoft Defender himoya holati." },
    { cmd: "Get-LocalGroupMember Administrators", desc: "Lokal administratorlar ro‘yxati." },
    { cmd: "Get-NetTCPConnection -State Listen", desc: "Tinglayotgan TCP portlar." },
    { cmd: "Get-WinEvent -FilterHashtable @{LogName='Security';Id=4625}", desc: "Muvaffaqiyatsiz kirish hodisalari." },
    { cmd: "Set-SmbServerConfiguration -EnableSMB1Protocol $false", desc: "Xavfli SMBv1 protokolini o‘chiradi." },
    { cmd: "Get-BitLockerVolume", desc: "Disk shifrlash holati." }
  ]},
  { cat: "Server mustahkamlash", items: [
    { cmd: "sudo apt update && sudo apt full-upgrade -y", desc: "Tizimni to‘liq yangilaydi (Debian/Ubuntu)." },
    { cmd: "sudo ufw default deny incoming; sudo ufw allow OpenSSH; sudo ufw enable", desc: "Firewall: faqat SSH ochiq, qolgani yopiq." },
    { cmd: "sudo systemctl disable --now telnet.socket", desc: "Keraksiz xizmatni o‘chiradi." },
    { cmd: "sudo lynis audit system", desc: "Bepul xavfsizlik auditi va tavsiyalar." },
    { cmd: "sudo fail2ban-client status sshd", desc: "fail2ban qaysi IP larni bloklaganini ko‘rsatadi." },
    { cmd: "sudo dpkg-reconfigure unattended-upgrades", desc: "Avtomatik xavfsizlik yangilanishlarini yoqadi." }
  ]},
  { cat: "Git (xavfsizlik bilan)", items: [
    { cmd: "git status && git diff", desc: "Commit qilishdan oldin o‘zgarishlarni ko‘rib chiqing." },
    { cmd: "git log --oneline --graph --all", desc: "Tarixni qisqa va vizual ko‘rish." },
    { cmd: "git checkout -b yangi-branch", desc: "Yangi ish branchi yaratish." },
    { cmd: "git commit -m \"aniq xabar\"", desc: "Commit — sirlar tushmaganini tekshirib." },
    { cmd: "git rm --cached .env && echo .env >> .gitignore", desc: "Xato qo‘shilgan sirni kuzatuvdan olib tashlash." },
    { cmd: "gitleaks detect --source . -v", desc: "Tarixdan sizib chiqqan kalitlarni qidirish." },
    { cmd: "git revert HEAD", desc: "Oxirgi commitni xavfsiz bekor qilish (tarixni buzmasdan)." }
  ]},
  { cat: "Docker (asosiy va xavfsizlik)", items: [
    { cmd: "docker ps -a", desc: "Barcha konteynerlar (ishlayotgan va to‘xtaganlar)." },
    { cmd: "docker images", desc: "Yuklab olingan obrazlar ro‘yxati." },
    { cmd: "docker run --rm -it ubuntu bash", desc: "Vaqtinchalik konteynerda ishlash (chiqqach o‘chadi)." },
    { cmd: "docker run --read-only --cap-drop ALL nginx", desc: "Cheklangan huquqli, o‘qishga-mo‘ljallangan konteyner." },
    { cmd: "docker logs -f mening-konteyner", desc: "Konteyner loglarini jonli kuzatish." },
    { cmd: "docker exec -it mening-konteyner sh", desc: "Ishlab turgan konteyner ichiga kirish." },
    { cmd: "trivy image nginx:latest", desc: "Obrazdagi zaifliklarni skanerlash." },
    { cmd: "docker scout cves mening-obraz", desc: "Obrazdagi maʼlum CVE lar hisoboti." }
  ]},
  { cat: "Kod va konteyner xavfsizligi", items: [
    { cmd: "npm audit", desc: "Node.js loyihasidagi zaif paketlarni topadi." },
    { cmd: "pip-audit", desc: "Python bog‘liqliklaridagi zaifliklar." },
    { cmd: "gitleaks detect --source . -v", desc: "Git tarixidan sizib chiqqan kalit va parollarni qidiradi." },
    { cmd: "trivy image nginx:latest", desc: "Docker obrazidagi zaifliklarni skanerlaydi." },
    { cmd: "docker scout cves mening-obraz", desc: "Konteyner obrazidagi maʼlum CVE lar." },
    { cmd: "semgrep --config auto .", desc: "Statik kod tahlili orqali xavfsizlik kamchiliklari." }
  ]}
];
