import { CharacterProfile, PowerUpItem } from '../types/game';

export const PLAYABLE_CHARACTERS: CharacterProfile[] = [
  {
    id: 'budi_andi',
    name: 'Andi Pratama',
    role: 'Siswa SMP Berkarakter (Pancasila Learner)',
    age: '14 Tahun',
    avatarUrl: '/src/assets/images/character_trio_portrait_1793954669757.jpg',
    passiveSkillName: 'Sikap Tawadhu & Salam Santun',
    passiveSkillDesc: 'Radius menyapa tetua lebih luas (+1 tile). Mendapat bonus skor moral +25% setiap kali mengucapkan "Permisi / Tabe\'" saat melintas dekat orang tua.',
    moralBonusMultiplier: 1.25,
    speedMultiplier: 1.0,
    penaltyResistance: 0.1,
    bio: 'Andi adalah pelajar yang santun, aktif di OSIS, dan selalu mengedepankan etika sopan santun ketimuran. Ia dipercaya membawa piagam kejujuran ke balai kota.'
  },
  {
    id: 'siti_rahma',
    name: 'Siti Rahmawati',
    role: 'Ketua Paskibra & Duta Tertib Hukum',
    age: '16 Tahun',
    avatarUrl: '/src/assets/images/character_trio_portrait_1793954669757.jpg',
    passiveSkillName: 'Disiplin Langkah & Ketahanan Tilang',
    passiveSkillDesc: 'Kecepatan gerak di zebra cross meningkat +20%. Mendapat perisai kekebalan 1x dari tilang polisi jika tanpa sengaja menyenggol tepi lajur.',
    moralBonusMultiplier: 1.1,
    speedMultiplier: 1.2,
    penaltyResistance: 0.2,
    bio: 'Siti memiliki ketangkasan fisik tinggi dan pemahaman hukum yang kuat. Ia teliti membaca rambu lalu lintas dan sigap membantu penyeberang jalan lainnya.'
  },
  {
    id: 'pak_budi_joko',
    name: 'Pak Budi Santoso',
    role: 'Tokoh Adat & Sesepuh Warga',
    age: '58 Tahun',
    avatarUrl: '/src/assets/images/character_trio_portrait_1793954669757.jpg',
    passiveSkillName: 'Wibawa Kebajikan & Penyejuk Hati',
    passiveSkillDesc: 'Sanksi meter mengisi 35% lebih lambat. Efek Power-Up (Payung Toleransi & Booster) bertahan 3 detik lebih lama.',
    moralBonusMultiplier: 1.35,
    speedMultiplier: 0.9,
    penaltyResistance: 0.35,
    bio: 'Sesepuh masyarakat yang ramah berpeci dan berbaju batik. Teladan hidup bagi warga dalam merawat kerukunan antarumat beragama dan ketenteraman kampung.'
  }
];

export const POWER_UPS: PowerUpItem[] = [
  {
    id: 'PAYUNG_TOLERANSI',
    name: 'Payung Toleransi',
    norma: 'AGAMA',
    description: 'Menciptakan aura pelindung kedamaian selama 6 detik. Mengabaikan penalti kebisingan di zona tempat ibadah dan melipatgandakan Poin Berkah.',
    durationSeconds: 6,
    icon: 'ShieldCheck'
  },
  {
    id: 'KARTU_TAAT_HUKUM',
    name: 'Kartu Taat Hukum',
    norma: 'HUKUM',
    description: 'Mengaktifkan mode Slow-Motion pada kendaraan lalu lintas selama 5 detik, memberi kesempatan berpikir kritis dan menyeberang di Zebra Cross dengan aman.',
    durationSeconds: 5,
    icon: 'Scale'
  },
  {
    id: 'SANTUN_BOOSTER',
    name: 'Sikap Santun Booster',
    norma: 'KESOPANAN',
    description: 'Otomatis memberikan salam "Nyuwun Sewu / Permisi" ke semua warga di sekitar tanpa perlu menekan tombol manual selama 8 detik.',
    durationSeconds: 8,
    icon: 'HeartHandshake'
  }
];
