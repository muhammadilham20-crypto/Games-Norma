export interface GddSection {
  id: string;
  title: string;
  kicker: string;
  summary: string;
  contentMarkdown: string;
}

export const GDD_SECTIONS: GddSection[] = [
  {
    id: 'ringkasan-eksekutif',
    title: 'Ringkasan Eksekutif & Identitas Proyek',
    kicker: '01. Vision & Foundation',
    summary: 'Konsep dasar, target audiens, dan proposisi nilai unik game edukasi arcade "Langkah Beretika".',
    contentMarkdown: `### 1.1 Identitas Game
- **Judul Resmi**: Langkah Beretika: Menyeberang dengan Norma
- **Genre**: Arcade Grid Crosser (Frogger/Crossy Road inspired) + Dynamic Moral Decision-Making (QTE Ethical Dilemma)
- **Platform Sasaran**: Web Desktop (Chromebook/PC Sekolah) & Mobile Web Touch (Smartphone Guru & Siswa)
- **Target Audiens**: Siswa SMP & SMA (Usia 12–18 tahun / Fase D & E Kurikulum Merdeka), Guru Mata Pelajaran PPKn/Pendidikan Pancasila, serta Masyarakat Umum.
- **Pendekatan Gamifikasi**: *Mechanics-Dynamics-Aesthetics (MDA) Framework* dipadukan dengan *Self-Determination Theory (Autonomy, Competence, Relatedness)* untuk menanamkan pemahaman norma secara kinestetik dan reflektif.

### 1.2 Latar Belakang & Filosofi Edukasi
Pembelajaran norma sosial di sekolah sering kali terjebak dalam hafalan teoritis tanpa internalisasi emosional. Siswa hafal definisi norma kesopanan, kesusilaan, hukum, dan agama, namun kesulitan menerapkannya di ruang publik sehari-hari ketika dihadapkan pada tekanan waktu (*time pressure*) dan situasi nyata.

"Langkah Beretika" menerjemahkan konsep abstrak norma ke dalam **mekanik refleks fisik dan konsekuensi sebab-akibat langsung**. Menyeberang jalan bukan sekadar menghindari rintangan kendaraan, melainkan metafora perjalanan hidup seorang warga negara yang harus menavigasi etika bermasyarakat di setiap langkahnya.

### 1.3 Pilar Nilai Karakter (Profil Pelajar Pancasila)
1. **Beriman, Bertakwa kepada Tuhan YME, dan Berakhlak Mulia**: Direpresentasikan melalui kepatuhan adab di Zona Rumah Ibadah (Norma Agama).
2. **Berkebinekaan Global & Toleransi**: Saling menghormati antarrumah ibadah dan ragam warga perkampungan.
3. **Mandiri & Bernalar Kritis**: Mengambil keputusan moral tepat dalam hitungan detik saat menghadapi dilema kejujuran (Norma Kesusilaan).
4. **Gotong Royong & Santun**: Membudayakan tradisi "tabe'/nyuwun sewu" dan mendahulukan sesama (Norma Kesopanan & Hukum).`
  },
  {
    id: 'cerita-karakter',
    title: 'Narasi Cerita & Profil Karakter',
    kicker: '02. Narrative & Characters',
    summary: 'Latar belakang dunia Desa Harmoni menuju Kota Madani, serta 3 karakter pilihan dengan kemampuan unik.',
    contentMarkdown: `### 2.1 Sinopsis Cerita (Lore)
Di sebuah kota kepulauan bernama **Kota Madani**, sedang terjadi fenomena "Erosi Norma": pengendara motor sering menerobos lampu merah, warga acuh tak acuh saling menyenggol di trotoar, dan suara bising mengganggu ketenteraman rumah ibadah.

Hari ini adalah *Hari Deklarasi Integritas Kota*. Tiga orang perwakilan terpilih diberi amanah membawa **"Piagam Kebajikan Nusantara"** dari gapura Desa Harmoni menuju Balai Kota Madani. Untuk sampai ke tujuan, mereka harus melintasi 4 distrik tantangan yang merefleksikan 4 norma masyarakat Indonesia. Jika mereka melompat secara sembrono, sanksi sosial dan hukum akan menghentikan langkah mereka!

### 2.2 Tiga Karakter Pilihan (Roster Karakter)

#### 1. Andi Pratama (Siswa SMP Berkarakter)
- **Arketipe**: Siswa Pembelajar Pancasila (Agile & Courteous)
- **Kemampuan Pasif**: *Sikap Tawadhu* — Radius deteksi tetua/guru bertambah 1 tile. Mendapat pengali bonus Moral +25% setiap kali mengucapkan salam saat melintas.
- **Statistik**: Kecepatan: 3/5 | Resistensi Sanksi: 2/5 | Bonus Moral: 5/5
- **Representasi Edukasi**: Mengajarkan bahwa generasi muda tetap dapat berprestasi tinggi tanpa kehilangan tata krama ketimuran.

#### 2. Siti Rahmawati (Ketua Paskibra & Duta Tertib)
- **Arketipe**: Pelajar Penegak Disiplin (Fast & Law-Abiding)
- **Kemampuan Pasif**: *Disiplin Langkah* — Gerak melompat di lajur Zebra Cross 20% lebih cepat. Memiliki perisai pasif yang membatalkan tilang polisi pertama akibat keterlambatan menyeberang.
- **Statistik**: Kecepatan: 5/5 | Resistensi Sanksi: 3/5 | Bonus Moral: 3/5
- **Representasi Edukasi**: Mengajarkan ketegasan, kepatuhan rambu formal, dan kesiapan mengambil inisiatif di ruang publik.

#### 3. Pak Budi Santoso (Sesepuh & Tokoh Warga)
- **Arketipe**: Tetua Berwibawa (Resilient & Serene)
- **Kemampuan Pasif**: *Wibawa Kebajikan* — Mengurangi laju pengisian Sanksi Meter sebesar 35%. Durasi seluruh item Power-Up bertambah +3 detik.
- **Statistik**: Kecepatan: 2/5 | Resistensi Sanksi: 5/5 | Bonus Moral: 4/5
- **Representasi Edukasi**: Mengajarkan kematangan emosional, ketenangan hati, dan pentingnya keteladanan orang tua bagi ketenteraman sosial.`
  },
  {
    id: 'integrasi-4-norma',
    title: 'Mekanik Terinci 4 Norma Masyarakat Indonesia',
    kicker: '03. Four Social Norms',
    summary: 'Spesifikasi visual, rintangan, interaksi kritis, dan jenis sanksi untuk setiap norma.',
    contentMarkdown: `### 3.1 Norma Kesopanan (Trotoar & Perkampungan)
- **Sumber Norma**: Kebiasaan, kepatutan, dan adat istiadat pergaulan masyarakat lokal Indonesia.
- **Visual Lingkungan**: Trotoar berpaving motif batik kawung, pos ronda kampung, gerobak pedagang, warung kopi, dan tanaman pot asri.
- **Mekanisme Permainan**:
  * Pejalan kaki lain melintas secara horizontal dengan kecepatan bervariasi: kakek membawa tongkat, ibu guru berseragam, warga membawa belanjaan.
  * **Interaksi Kritis**: Pemain harus menekan tombol **"Permisi / Tabe'" (Tombol E / Spasi / Tombol Sentuh)** saat berada dalam radius 1 tile dari tetua atau guru.
  * **Umpan Balik Positif**: Karakter membungkuk 30 derajat, terdengar salam *"Nyuwun Sewu / Permisi Pak/Bu"*, tetua membalas senyuman, Moral Meter +15.
  * **Konsekuensi Pelanggaran**: Jika pemain melompat kencang dan menyenggol tetua tanpa permisi, karakter akan mengalami efek **"Stun Sosial"** selama 1,5 detik (tertegun malu) dan Sanksi Meter bertambah +25 (Sanksi: Teguran Lisan & Dicap Tidak Sopan).

---

### 3.2 Norma Kesusilaan (Arus Sungai Dilema Hati Nurani)
- **Sumber Norma**: Suara hati nurani manusia (*conscience*) yang membedakan baik dan buruk.
- **Visual Lingkungan**: Arus sungai beriak jernih dengan batu-batu kali alami dan kayu gelondongan yang hanyut mengapung.
- **Mekanisme Permainan**:
  * Pemain harus melompati batu/kayu untuk menyeberangi sungai.
  * Beberapa batu loncatan memuat **"Objek Dilema Kejujuran"** (misal: dompet jatuh berisi uang SPP, kertas contekan ujian bertebaran, ponsel tertinggal).
  * **Interaksi Kritis (QTE)**: Menginjak batu dilema memicu jeda waktu cepat (5 detik) untuk memilih dua aksi nurani:
    1. *Opsi Bermoral (Jujur)*: Mengamankan barang untuk dikembalikan ke pemiliknya. Batu mengeras bercahaya emas, Moral Meter +30, Sanksi Meter berkurang -10.
    2. *Opsi Culas (Curang)*: Mengambil keuntungan pribadi atau membiarkan kecurangan. Batu langsung retak (KRAK!) dan tenggelam ke air. Karakter jatuh basah kuyup karena dihantui **"Rasa Bersalah Mendalam"** (Sanksi Kesusilaan: Penyesalan batin, Sanksi Meter +45).

---

### 3.3 Norma Hukum (Jalan Raya Protokol & Penyeberangan)
- **Sumber Norma**: Aturan tertulis resmi negara (Undang-Undang No. 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan).
- **Visual Lingkungan**: Aspal hitam 4 lajur protokol dengan garis marka putih, Zebra Cross, tiang lampu penyeberangan (Pelican Crossing), halte bus Trans, dan pos polisi lalu lintas.
- **Mekanisme Permainan**:
  * Arus kendaraan cepat melintas: sepeda motor bebek, mobil sedan, angkutan umum (angkot), bus kota, dan mobil patroli polisi.
  * Lampu penyeberangan berganti siklus secara berkala (Merah = Kendaraan jalan pejalan kaki berhenti, Hijau = Kendaraan berhenti pejalan kaki menyeberang).
  * **Interaksi Kritis**: Pemain hanya aman menyeberang saat lampu pejalan kaki HIJAU di dalam batas garis Zebra Cross.
  * **Konsekuensi Pelanggaran**: Menerobos saat lampu merah atau melompat di luar zebra cross memicu sirine polisi (*Nii-Noo-Nii-Noo*), kamera tilang elektronik (ETLE) menyala, dan Sanksi Meter bertambah +50 (Sanksi: Tilang & Denda Negara). Jika tertabrak langsung oleh kendaraan berkecepatan tinggi, terjadi kecelakaan fatal (*Instant Game Over*).

---

### 3.4 Norma Agama (Zona Harmoni & Kawasan Rumah Ibadah)
- **Sumber Norma**: Wahyu dan ajaran Tuhan Yang Maha Esa yang mengatur hubungan manusia dengan Tuhan dan sesama makhluk.
- **Visual Lingkungan**: Pekarangan hijau rindang di mana Masjid, Gereja, Pura, Vihara, dan Kelenteng berdiri berdampingan secara damai (*Kawasan Harmoni Bhinneka Tunggal Ika*).
- **Mekanisme Permainan**:
  * Area pekarangan memancarkan aura ketenteraman dan sayup-sayup terdengar suara genta damai.
  * **Interaksi Kritis**: Karakter harus memasuki **"Mode Langkah Tenang" (Tahan Tombol Shift / Ikon Berjalan Khidmat)**. Tidak boleh melompat tergesa-gesa atau menimbulkan kegaduhan suara.
  * **Umpan Balik Positif**: Setiap langkah tenang di zona ibadah memberikan **"Poin Berkah & Harmoni"** (+10 Berkah, +5 Moral) serta efek pemulihan Sanksi Meter.
  * **Konsekuensi Pelanggaran**: Berlari cepat atau membunyikan klakson/suara keras di pekarangan ibadah mengurangi Poin Berkah secara drastis (-15) dan menambah Sanksi Meter +20 (Sanksi Agama: Hilangnya ketenangan batin & dosa sosial).`
  },
  {
    id: 'alur-level-progresi',
    title: 'Desain Level & Tangga Progresi (Level Flow)',
    kicker: '04. Level Design',
    summary: 'Struktur bertahap dari Level 1 (Dasar Adab & Nurani) hingga Level 3 (Simfoni Gabungan 4 Norma).',
    contentMarkdown: `### 4.1 Prinsip Desain Tangga Tantangan (Scaffolding Pedagogy)
Game dirancang dengan sistem tangga belajar (*learning curve*) bertahap agar pemain menguasai satu per satu norma sebelum diuji dalam situasi kota yang kompleks:

\`\`\`
[Level 1: Tepian Nurani]      --> Fokus: Norma Kesopanan & Kesusilaan
          ↓
[Level 2: Koridor Madani]     --> Fokus: Norma Hukum & Norma Agama
          ↓
[Level 3: Simfoni 4 Norma]    --> Ujian Komprehensif: Seluruh 4 Norma Simultan
\`\`\`

---

### 4.2 Rincian Level 1: "Tepian Nurani" (Desa Harmoni)
- **Tujuan Pembelajaran**: Memahami etika interpersonal dan mendengarkan suara hati nurani.
- **Jumlah Lajur**: 7 Lajur (Lebar 9 Grid).
  * *Lajur 0*: Area Aman Titik Awal (Taman Desa).
  * *Lajur 1-3*: Trotoar Perkampungan Asri (NPC Kakek bertongkat, Ibu Guru berselendang, Anak-anak bermain). Pemain melatih koordinasi tombol "Permisi" saat berpapasan.
  * *Lajur 4-6*: Sungai Nurani Berarus Sedang (Batu kali dan kayu hanyut). Memuat 1 Dilema QTE Kejujuran (Dompet Berisi Uang SPP).
  * *Lajur 7*: Garis Finish Level 1 (Gapura Masuk Kota).
- **Tingkat Kesulitan**: Mudah–Menengah. Batas waktu santai.

---

### 4.3 Rincian Level 2: "Koridor Madani" (Jalan Protokol & Tempat Ibadah)
- **Tujuan Pembelajaran**: Memahami kepatuhan aturan formal tertulis negara dan toleransi keberagamaan.
- **Jumlah Lajur**: 8 Lajur.
  * *Lajur 0*: Halte Penyeberangan Aman.
  * *Lajur 1-4*: Jalan Raya Protokol 4 Jalur (2 lajur arah barat, 2 lajur arah timur). Dilengkapi Zebra Cross & Lampu Pelican. Kendaraan melaju dengan kecepatan 1,5–2,5 grid/detik.
  * *Lajur 5-7*: Pelataran Damai Enam Rumah Ibadah. Pemain harus mengaktifkan Mode Tenang dan menghormati para peziarah yang beribadah.
  * *Lajur 8*: Titik Kumpul Aman Depan Balai Warga.
- **Tingkat Kesulitan**: Menengah–Tinggi. Membutuhkan refleks timing lampu lalu lintas.

---

### 4.4 Rincian Level 3: "Simfoni Empat Norma" (Pusat Kota Harmoni)
- **Tujuan Pembelajaran**: Pengambilan keputusan etis simultan di bawah tekanan situasi dinamis.
- **Jumlah Lajur**: 11 Lajur Komprehensif.
  * *Lajur 0*: Pos Keberangkatan Final.
  * *Lajur 1-2*: Trotoar Pasar Tradisional Padat (Banyak tetua & pedagang gerobak).
  * *Lajur 3-5*: Sungai Arus Deras dengan 2 Batu Dilema Berantai (Dilema Contek Ujian & Sampah Plastik).
  * *Lajur 6-8*: Jalan Protokol Bebas Hambatan (Motor bebek lincah, angkot ngetem, mobil patroli polisi berpatroli aktif).
  * *Lajur 9-10*: Koridor Kerukunan Ibadah Nusantara (Mode hening wajib + aura damai).
  * *Lajur 11*: Panggung Kehormatan Balai Kota Madani (Penyerahan Piagam Kebajikan).
- **Tingkat Kesulitan**: Master Arcade. Skor moral tertinggi membuka predikat *"Warga Teladan Berintegritas Emas"*!`
  },
  {
    id: 'sistem-status-skor',
    title: 'Indikator Status, Sistem Sanksi, & Power-Ups',
    kicker: '05. Economy & Balances',
    summary: 'Kalkulasi matematis Moral Meter, Sanksi Meter, Poin Berkah, serta fungsi 3 item Power-Ups.',
    contentMarkdown: `### 5.1 Formula & Metrik Status Karakter

| Indikator | Rentang Nilai | Kondisi Awal | Dampak Gameplay |
| :--- | :--- | :--- | :--- |
| **Moral Meter (Skor Integritas)** | 0 – 100+ | 50 Poin | Mengukur kemuliaan budi pekerti pemain. Menjadi penentu predikat bintang akhir (1–3 Bintang) dan sertifikat digital. |
| **Sanksi Meter (Tingkat Pelanggaran)** | 0 – 100% | 0% | Akumulasi teguran lisan, tilang polisi, dan rasa bersalah. **Jika mencapai 100%, Game Over seketika ("Tersingkir dari Masyarakat").** |
| **Poin Berkah (Norma Agama)** | 0 – 50+ | 0 Poin | Poin kemurnian niat dan toleransi. Berfungsi mengurangi Sanksi Meter secara pasif (-5% setiap 10 Berkah). |

### 5.2 Rumus Matematika Perhitungan Sanksi & Moral
\`\`\`
MoralAkhir = (MoralDasar + Σ BonusAksiSantun + Σ DilemaJujur) × PengaliKarakter
SanksiMeter = Σ (SanksiPelanggaran × (1 - ResistensiKarakter))
\`\`\`

- **Pelanggaran Kesopanan**: +25% Sanksi, Stun 1.5 detik
- **Pelanggaran Kesusilaan (Curang)**: +45% Sanksi, Batu Pijakan Ambles
- **Pelanggaran Hukum (Terobos Zebra/Merah)**: +50% Sanksi, Sirine Polisi
- **Pelanggaran Ketenangan Agama**: +20% Sanksi, Poin Berkah Berkurang -15

---

### 5.3 Sistem Item & Power-Ups (Alat Bantu Berpikir Kritis)
Power-ups tidak menghilangkan tantangan, melainkan memberikan ruang napas kognitif (*cognitive breathing room*) bagi pemain:

1. **Payung Toleransi (Norma Agama)**:
   - *Visual*: Payung emas berornamen sulur daun dengan aura pendar lembut.
   - *Efek*: Durasi 6 detik. Memberi kekebalan dari penalti kebisingan di zona tempat ibadah dan melipatgandakan perolehan Poin Berkah menjadi 2x lipat.

2. **Kartu Taat Hukum (Norma Hukum)**:
   - *Visual*: Kartu lencana timbang keadilan dengan garis holografik biru.
   - *Efek*: Durasi 5 detik. Memperlambat laju seluruh kendaraan jalan raya sebesar 50% (*Slow-Motion Matrix*), memberi pemain waktu kalkulasi jarak menyeberang di Zebra Cross secara presisi.

3. **Sikap Santun Booster (Norma Kesopanan)**:
   - *Visual*: Simpul selendang batik pusaka dengan kilau merah hangat.
   - *Efek*: Durasi 8 detik. Karakter secara otomatis mengucapkan salam *"Nyuwun Sewu"* dan membungkuk kepada setiap warga yang berada dalam radius 2 tile tanpa perlu input manual.`
  },
  {
    id: 'rubrik-pedagogis',
    title: 'Rubrik Evaluasi Pedagogis untuk Guru PPKn',
    kicker: '06. Pedagogical Rubric',
    summary: 'Panduan asesmen formatif dan refleksi pembelajaran berbasis Kurikulum Merdeka Fase D & E.',
    contentMarkdown: `### 6.1 Matriks Capaian Pembelajaran (CP) PPKn
Game ini secara khusus dirancang mendukung Elemen **UUD NRI Tahun 1945 & Norma Sosial**:
- *Peserta didik mampu menganalisis macam-macam norma yang berlaku dalam masyarakat beserta sumber dan sanksinya.*
- *Peserta didik mampu menampilkan perilaku taat norma dalam kehidupan sehari-hari secara konsisten.*

### 6.2 Rubrik Penilaian Gamifikasi (Tingkat Ketercapaian)

| Tingkat (Grade) | Skor Moral | Sanksi Meter | Deskripsi Kinerja Karakter |
| :--- | :--- | :--- | :--- |
| **Bintang 3 (Teladan Utama)** | $\ge 85$ | $\le 15\%$ | Selalu membungkuk santun kepada tetua, konsisten memilih opsi jujur di sungai dilema, tertib menyeberang zebra cross saat hijau, dan menjaga ketenangan pekarangan ibadah. |
| **Bintang 2 (Warga Tertib)** | $65 – 84$ | $16 – 40\%$ | Melaksanakan norma hukum dan kesopanan dengan baik, sesekali terlambat menyapa warga, namun berhasil menyelesaikan seluruh lajur penyeberangan dengan selamat. |
| **Bintang 1 (Perlu Bimbingan)** | $< 65$ | $> 40\%$ | Beberapa kali terkena teguran lisan atau peringatan tilang. Memerlukan refleksi mendalam mengenai pentingnya kesadaran hukum dan etika publik. |

### 6.3 Pertanyaan Refleksi Pasca-Permainan (Debriefing Guru di Kelas):
1. *"Bagaimana perasaanmu saat batu sungai tiba-tiba retak ketika memilih mengambil uang dompet orang lain? Apakah rasa bersalah di game mirip dengan rasa bersalah di dunia nyata?"*
2. *"Mengapa menyeberang jalan saat lampu penyeberangan merah membahayakan bukan hanya dirimu, tapi juga pengendara lain?"*
3. *"Apa perbedaan sanksi saat kamu tidak menyapa kakek di trotoar (sanksi sosial) dibandingkan saat kamu diterobos mobil polisi (sanksi hukum)?"*`
  }
];
