import { DilemmaScenario } from '../types/game';

export const DILEMMA_SCENARIOS: DilemmaScenario[] = [
  {
    id: 'dilemma_dompet_sungai',
    title: 'Dilema Sungai Hati Nurani: Dompet Berisi Uang SPP',
    norma: 'KESUSILAAN',
    contextText: 'Saat melompat ke batu apung di tengah sungai, kamu melihat sebuah dompet kulit tebal terjatuh basah di celah batu. Di dalamnya terselip kartu pelajar dan uang tunai SPP Rp 500.000 milik teman sekelasmu. Tidak ada siapa pun yang melihat.',
    locationName: 'Arus Sungai Nurani (Lajur 5)',
    timeLimitSec: 5,
    choices: [
      {
        id: 'c1_kembalikan',
        text: 'Amankan dompet & segera serahkan ke Pos Guru/Satpam',
        isMoral: true,
        moralDelta: 30,
        sanctionDelta: -10,
        narrativeFeedback: 'Batu sungai berpijak kokoh memancarkan sinar emas! Hatimu merasa tenteram dan damai karena menjaga amanah orang lain. Poin Integritas melesat tinggi.',
        normaRef: 'Norma Kesusilaan: Bersumber dari hati nurani manusia. Sanksi batin berupa penyesalan atau rasa damai.'
      },
      {
        id: 'c2_ambil_uang',
        text: 'Ambil uangnya diam-diam untuk jajan dan buang dompetnya',
        isMoral: false,
        moralDelta: -35,
        sanctionDelta: 45,
        narrativeFeedback: 'KRAK! Batu pijakan langsung retak dan ambles! Karakter tergelincir masuk ke air karena dihantui "Sanksi Batin & Rasa Bersalah". Sanksi Meter melonjak tajam!',
        normaRef: 'Pelanggaran Kesusilaan: Menghasilkan rasa gelisah, malu mendalam, dan penolakan nurani.'
      }
    ]
  },
  {
    id: 'dilemma_zebra_hukum',
    title: 'Dilema Jalan Protokol: Ajakan Menerobos Zebra Cross',
    norma: 'HUKUM',
    contextText: 'Lampu penyeberangan pejalan kaki masih menyala MERAH (tersisa 4 detik). Jalanan tampak agak lengang sesaat, lalu seorang pejalan kaki di sebelahmu menarik tanganmu sambil berkata: "Ayo buruan lari nyebrang sekarang mumpung sepi!"',
    locationName: 'Jalan Raya Sudirman-Kartini (Lajur 3)',
    timeLimitSec: 5,
    choices: [
      {
        id: 'c1_tunggu_hijau',
        text: 'Tolak ajakan, tetap tertib menunggu lampu hijau menyala',
        isMoral: true,
        moralDelta: 25,
        sanctionDelta: -5,
        narrativeFeedback: 'Tindakan terpuji! 2 detik kemudian sebuah sepeda motor melesat kencang menyalip. Ketertibanmu menyelamatkan nyawa dan memberi teladan hukum bagi orang lain.',
        normaRef: 'Norma Hukum (UU No. 22 Tahun 2009): Menyeberang wajib menggunakan fasilitas penyeberangan dan mematuhi lampu isyarat.'
      },
      {
        id: 'c2_terobos_lari',
        text: 'Ikut berlari menerobos jalan raya mumpung tidak ada mobil dekat',
        isMoral: false,
        moralDelta: -30,
        sanctionDelta: 50,
        narrativeFeedback: 'NII-NOO-NII-NOO! Mobil patroli polisi membunyikan sirine dan sebuah angkot mengerem mendadak! Karakter ditegur keras dan terkena Sanksi Tilang & Pelanggaran Ketertiban Umum.',
        normaRef: 'Pelanggaran Norma Hukum: Sanksi tegas, mengikat, dan dapat berupa denda atau kurungan negara.'
      }
    ]
  },
  {
    id: 'dilemma_tempat_ibadah',
    title: 'Dilema Zona Ibadah: Dering Telepon di Pekarangan Suci',
    norma: 'AGAMA',
    contextText: 'Kamu sedang melintasi pekarangan yang diapit Masjid dan Gereja saat doa bersama sedang berlangsung khidmat. Tiba-tiba ponselmu berdering sangat kencang dengan nada musik dance yang heboh.',
    locationName: 'Koridor Harmoni Nusantara (Lajur 7)',
    timeLimitSec: 5,
    choices: [
      {
        id: 'c1_senyapkan_khidmat',
        text: 'Segera tekan tombol senyap/mute dan melangkah pelan tanpa suara',
        isMoral: true,
        moralDelta: 30,
        sanctionDelta: -10,
        narrativeFeedback: 'Ketenangan suasana ibadah tetap terjaga. Jamaah yang melihat tersenyum penuh respek. Kamu mendapatkan limpahan "Poin Berkah & Harmoni".',
        normaRef: 'Norma Agama & Toleransi: Menghormati peribadatan sesama umat manusia demi terciptanya kedamaian lahir dan batin.'
      },
      {
        id: 'c2_angkat_ngobrol',
        text: 'Langsung angkat telepon dan berbicara teriak sambil terus berlari',
        isMoral: false,
        moralDelta: -25,
        sanctionDelta: 40,
        narrativeFeedback: 'Suasana khidmat terganggu. Warga menatap penuh kekecewaan. Sanksi Sosial dan pengurangan Poin Berkah terjadi seketika.',
        normaRef: 'Pelanggaran Adab Ibadah: Merusak kekhidmatan ritual keagamaan dan mencederai nilai toleransi.'
      }
    ]
  },
  {
    id: 'dilemma_sopan_antre',
    title: 'Dilema Halte Angkot: Nenek Membawa Belanjaan Berat',
    norma: 'KESOPANAN',
    contextText: 'Di trotoar sempit depan halte, seorang nenek sepuh membawa dua tas anyaman sayur yang berat hendak melangkah ke trotoar. Antrean pejalan kaki sedang padat dan kamu terburu-buru.',
    locationName: 'Trotoar Pasar Tradisional (Lajur 2)',
    timeLimitSec: 5,
    choices: [
      {
        id: 'c1_bantu_nenek',
        text: 'Bungkukkan badan, tawarkan bantuan membawakan belanjaan',
        isMoral: true,
        moralDelta: 35,
        sanctionDelta: -15,
        narrativeFeedback: 'Nenek tersebut mendoakanmu dengan tulus: "Semoga panjang umur dan sukses ya nak!". Warga kampung bertepuk tangan bangga.',
        normaRef: 'Norma Kesopanan: Mengatur tata krama, penghormatan kepada orang yang lebih tua, dan budaya "andhap asor".'
      },
      {
        id: 'c2_selip_buru',
        text: 'Menyelip cepat di samping nenek sampai tasnya hampir tersenggol',
        isMoral: false,
        moralDelta: -20,
        sanctionDelta: 30,
        narrativeFeedback: '"Hush, anak muda zaman sekarang kok tidak ada unggah-ungguh!" gerutu warga. Karakter terhenti sesaat karena rasa malu tersindir.',
        normaRef: 'Pelanggaran Norma Kesopanan: Sanksi berupa gunjingan, celaan sosial, dan dikucilkan dari pergaulan.'
      }
    ]
  }
];
