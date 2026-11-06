export interface CodeSnippet {
  language: 'pseudocode' | 'scratch' | 'unity_csharp' | 'javascript';
  title: string;
  description: string;
  code: string;
}

export const CODE_BLUEPRINTS: CodeSnippet[] = [
  {
    language: 'pseudocode',
    title: 'Pseudocode: Mesin Keputusan & Sistem Norma',
    description: 'Algoritma utama pemrosesan langkah pemain, deteksi benturan norma, perhitungan moral meter, dan sanksi akumulatif.',
    code: `// =========================================================================
// ALGORITMA UTAMA: LANGKAH BERETIKA (CROSSY NORMA ENGINE)
// =========================================================================

INISIALISASI_PERMAINAN:
    MoralMeter = 50                 // Rentang: 0 s/d 100
    SanksiMeter = 0                 // Rentang: 0 s/d 100 (100 = Game Over)
    PoinBerkah = 0
    StatusGame = "SEDANG_BERMAIN"

FUNGSI SaatPemainMelangkah(arah, tombolSantunDitekan, tombolModeTenangDitekan):
    LajurTarget = HitungPosisiLajur(Pemain.Y + arah.Y)
    
    // -------------------------------------------------------------
    // 1. EVALUASI NORMA KESOPANAN (Trotoar & Perkampungan)
    // -------------------------------------------------------------
    JIKA LajurTarget.Tipe == "TROTOAR" MAKA:
        JIKA JarakKeTetua(Pemain, LajurTarget.NPC_Tetua) < 1.5 MAKA:
            JIKA tombolSantunDitekan == TRUE ATAU PowerUpSantunAktif == TRUE MAKA:
                MoralMeter += 15 * Karakter.BonusPengali
                MainkanSuara("CHIME_SOPAN_TABE")
                TampilkanBalonTeks(Pemain, "Nyuwun Sewu / Permisi Pak...")
                TampilkanBalonTeks(NPC_Tetua, "Iya le/nduk, hati-hati ya!")
            LAINNYA:
                // Pelanggaran Kesopanan: Menyenggol tanpa permisi
                SanksiMeter += 25 * (1 - Karakter.ResistensiSanksi)
                Pemain.StunDurasi = 1.5 // detik (Terhenti karena teguran lisan)
                MainkanSuara("TEGURAN_LISAN")
                TampilkanTeguran("Teguran Sosial: Harap membungkuk/permisi saat lewat!")
    
    // -------------------------------------------------------------
    // 2. EVALUASI NORMA KESUSILAAN (Sungai & Dilema Kejujuran)
    // -------------------------------------------------------------
    JIKA LajurTarget.Tipe == "SUNGAI" MAKA:
        BatuPijakan = DeteksiObjekDiTitik(Pemain.X, LajurTarget.Y)
        JIKA BatuPijakan == NULL MAKA:
            PemainTenggelamKeAir()
            SanksiMeter += 30
        LAINNYA JIKA BatuPijakan.MemuatDilema == TRUE MAKA:
            PilihanPemain = BukaModalQTE(BatuPijakan.Dilema, BatasWaktu = 5 detik)
            JIKA PilihanPemain == "JUJUR_KEMBALIKAN" MAKA:
                MoralMeter += 30
                SanksiMeter = MAX(0, SanksiMeter - 10)
                BatuPijakan.Warna = EMAS
                MainkanSuara("SUARA_BERKAH")
            LAINNYA: // Mengambil hak orang lain
                SanksiMeter += 45
                BatuPijakan.RetakDanTenggelam()
                MainkanSuara("BATU_PECAH_BERSALAH")
                TampilkanEfekPenyesalan("Hati nurani bergejolak bersalah!")

    // -------------------------------------------------------------
    // 3. EVALUASI NORMA HUKUM (Jalan Raya Protokol & Zebra Cross)
    // -------------------------------------------------------------
    JIKA LajurTarget.Tipe == "JALAN_RAYA" MAKA:
        JIKA LajurTarget.LampuPenyeberangan == "MERAH" MAKA:
            JIKA PowerUpTaatHukumAktif == FALSE MAKA:
                // Menerobos lampu merah penyeberangan
                SanksiMeter += 50
                MobilPolisi.AktifkanSirine()
                MainkanSuara("SIRINE_TILANG")
                TampilkanPeringatanHukum("TILANG: Melanggar UU LLAJ No. 22 Tahun 2009!")
                JIKA TabrakanDenganKendaraan(Pemain) MAKA:
                    StatusGame = "GAME_OVER_ACCIDENT"
        LAINNYA: // Menyeberang saat lampu HIJAU di Zebra Cross
            MoralMeter += 20
            MainkanSuara("LANGKAH_AMAN")

    // -------------------------------------------------------------
    // 4. EVALUASI NORMA AGAMA (Kawasan Pekarangan Tempat Ibadah)
    // -------------------------------------------------------------
    JIKA LajurTarget.Tipe == "TEMPAT_IBADAH" MAKA:
        JIKA tombolModeTenangDitekan == TRUE ATAU PowerUpToleransiAktif == TRUE MAKA:
            PoinBerkah += 10
            MoralMeter += 10
            MainkanSuara("LONCENG_DAMAI")
        LAINNYA JIKA Pemain.BerlariCepat == TRUE MAKA:
            // Pelanggaran ketenangan tempat ibadah
            PoinBerkah = MAX(0, PoinBerkah - 15)
            SanksiMeter += 20
            TampilkanTeguran("Harap menjaga keheningan & rasa hormat di pekarangan ibadah!")

    // -------------------------------------------------------------
    // CEK KONDISI AKHIR
    // -------------------------------------------------------------
    JIKA SanksiMeter >= 100 MAKA:
        StatusGame = "GAME_OVER_SANKSI_PENUH"
        TampilkanLayarKalah("Tersingkir dari Masyarakat: Akumulasi Sanksi Mencapai Batas!")
    LAINNYA JIKA Pemain.Y >= GarisFinish.Y MAKA:
        StatusGame = "MENANG"
        KalkulasiSkorAkhir(MoralMeter, SanksiMeter, PoinBerkah)`
  },
  {
    language: 'scratch',
    title: 'Panduan Blok Scratch 3.0: Alur Logika Visual',
    description: 'Petunjuk penyusunan blok visual di Scratch untuk siswa & guru SMP/SMA.',
    code: `// =========================================================================
// STRUKTUR BLOK SCRATCH 3.0 (Kategori & Skrip Karakter Utama)
// =========================================================================

// [1. VARIABEL YANG HARUS DIBUAT]:
// (v) Moral_Meter (Untuk Semua Sprite)
// (v) Sanksi_Meter (Untuk Semua Sprite)
// (v) Poin_Berkah (Untuk Semua Sprite)
// (v) Is_Menunduk (Untuk Sprite Pemain)
// (v) Lampu_Zebra (Untuk Sprite Lampu Lalu Lintas: "HIJAU" / "MERAH")

// -------------------------------------------------------------------------
// [2. SKRIP GERAK & KESOPANAN (Sprite: Pemain)]:
// -------------------------------------------------------------------------
[ketika bendera hijau diklik]
atur [Moral_Meter v] ke (50)
atur [Sanksi_Meter v] ke (0)
pergi ke x: (0) y: (-160)
selamanya:
    // Deteksi Tombol Panah Atas (Melompat Maju)
    jika <tombol [panah atas v] ditekan?> maka
        ubah y sebesar (40)
        mulai suara [pop v]
        tunggu (0.15) detik
    
    // Deteksi Tombol Santun (Tombol E atau Spasi)
    jika <tombol [e v] ditekan?> maka
        ganti kostum ke [menunduk_sopan v]
        atur [Is_Menunduk v] ke [1]
        katakan [Nyuwun Sewu / Permisi Pak!] selama (1) detik
        ganti kostum ke [berdiri_normal v]
        atur [Is_Menunduk v] ke [0]

// -------------------------------------------------------------------------
// [3. SKRIP TABRAKAN DENGAN TETUA (Sprite: Pemain)]:
// -------------------------------------------------------------------------
[ketika bendera hijau diklik]
selamanya:
    jika <menyentuh [Sprite_Kakek v]?> maka
        jika <(Is_Menunduk) = [1]> maka
            ubah [Moral_Meter v] sebesar (15)
            mulai suara [chime_success v]
            tunggu (1) detik
        lainnya
            ubah [Sanksi_Meter v] sebesar (25)
            mulai suara [reprimand_buzz v]
            katakan [Aduh, maaf saya buru-buru!] selama (1.5) detik
            tunggu (1.5) detik

// -------------------------------------------------------------------------
// [4. SKRIP ZEBRA CROSS & NORMA HUKUM (Sprite: Pemain)]:
// -------------------------------------------------------------------------
[ketika bendera hijau diklik]
selamanya:
    jika <menyentuh [Sprite_Jalan_Raya v]?> maka
        jika <(Lampu_Zebra) = [MERAH]> maka
            ubah [Sanksi_Meter v] sebesar (40)
            siarkan pesan [Polisi_Datang v]
            mulai suara [siren v]
            tunggu (1) detik

// -------------------------------------------------------------------------
// [5. CEK GAME OVER (Sprite: Panggung)]:
// -------------------------------------------------------------------------
[ketika bendera hijau diklik]
selamanya:
    jika <(Sanksi_Meter) > [99]> maka
        ganti latar ke [Kalah_Sanksi_Sosial v]
        hentikan [semua v]`
  },
  {
    language: 'unity_csharp',
    title: 'Unity C#: PlayerNormaController.cs',
    description: 'Implementasi script controller di Unity Engine menggunakan C# dan Event System.',
    code: `using System.Collections;
using UnityEngine;
using UnityEngine.Events;

public enum NormaType { Kesopanan, Kesusilaan, Hukum, Agama }

public class PlayerNormaController : MonoBehaviour
{
    [Header("Norma Status Metrics")]
    [Range(0, 100)] public float moralScore = 50f;
    [Range(0, 100)] public float sanctionMeter = 0f;
    public int blessingPoints = 0;

    [Header("Movement Settings")]
    public float gridStepSize = 1.5f;
    public float hopDuration = 0.15f;
    private bool isHopping = false;
    private bool isPoliteGestureActive = false;
    private bool isQuietModeActive = false;

    [Header("Events")]
    public UnityEvent<float, float> onStatusChanged;
    public UnityEvent<string> onReprimandTriggered;
    public UnityEvent onGameOver;

    void Update()
    {
        if (isHopping) return;

        // Input Gerak Lompat Grid
        if (Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow))
            StartCoroutine(GridHop(Vector3.forward));
        else if (Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.DownArrow))
            StartCoroutine(GridHop(Vector3.back));
        else if (Input.GetKeyDown(KeyCode.A) || Input.GetKeyDown(KeyCode.LeftArrow))
            StartCoroutine(GridHop(Vector3.left));
        else if (Input.GetKeyDown(KeyCode.D) || Input.GetKeyDown(KeyCode.RightArrow))
            StartCoroutine(GridHop(Vector3.right));

        // Input Norma Kesopanan (Tombol E: Sikap Santun / Membungkuk)
        if (Input.GetKeyDown(KeyCode.E))
        {
            StartCoroutine(TriggerPoliteGesture());
        }

        // Input Norma Agama (Tahan Shift: Mode Langkah Tenang / Khidmat)
        isQuietModeActive = Input.GetKey(KeyCode.LeftShift);
    }

    private IEnumerator GridHop(Vector3 direction)
    {
        isHopping = true;
        Vector3 startPos = transform.position;
        Vector3 targetPos = startPos + (direction * gridStepSize);
        float elapsed = 0f;

        while (elapsed < hopDuration)
        {
            elapsed += Time.deltaTime;
            float t = elapsed / hopDuration;
            // Parabola jump arch
            Vector3 currentPos = Vector3.Lerp(startPos, targetPos, t);
            currentPos.y += Mathf.Sin(t * Mathf.PI) * 0.4f;
            transform.position = currentPos;
            yield return null;
        }

        transform.position = targetPos;
        isHopping = false;
        EvaluateCurrentTile();
    }

    private IEnumerator TriggerPoliteGesture()
    {
        isPoliteGestureActive = true;
        // Animasi menunduk santun (membungkuk 30 derajat)
        transform.rotation = Quaternion.Euler(20f, 0, 0);
        yield return new WaitForSeconds(0.8f);
        transform.rotation = Quaternion.identity;
        isPoliteGestureActive = false;
    }

    private void OnTriggerEnter(Collider other)
    {
        // 1. Norma Kesopanan: Tetua di Trotoar
        if (other.CompareTag("ElderNPC"))
        {
            if (isPoliteGestureActive)
            {
                ApplyMoralDelta(15f, "Menyapa tetua dengan santun (+15 Moral)");
            }
            else
            {
                ApplySanctionDelta(25f, "Menabrak tetua tanpa permisi (Teguran Lisan)");
                StartCoroutine(StunPlayer(1.5f));
            }
        }
        // 2. Norma Hukum: Menyeberang Jalan Raya
        else if (other.CompareTag("ZebraCross"))
        {
            TrafficLight light = other.GetComponent<TrafficLight>();
            if (light != null && light.isRedForPedestrians)
            {
                ApplySanctionDelta(40f, "Menerobos lampu merah penyeberangan (Sanksi Tilang)");
            }
            else
            {
                ApplyMoralDelta(20f, "Tertib hukum di penyeberangan jalan");
            }
        }
    }

    private void EvaluateCurrentTile()
    {
        // Evaluasi zona damai agama
        Collider[] hits = Physics.OverlapSphere(transform.position, 0.5f);
        foreach (var hit in hits)
        {
            if (hit.CompareTag("SanctuaryZone"))
            {
                if (isQuietModeActive)
                {
                    blessingPoints += 10;
                    ApplyMoralDelta(5f, "Menjaga keheningan di tempat ibadah");
                }
                else
                {
                    ApplySanctionDelta(15f, "Membuat kegaduhan di area ibadah");
                }
            }
        }
    }

    public void ApplyMoralDelta(float delta, string reason)
    {
        moralScore = Mathf.Clamp(moralScore + delta, 0f, 100f);
        onStatusChanged?.Invoke(moralScore, sanctionMeter);
    }

    public void ApplySanctionDelta(float delta, string reason)
    {
        sanctionMeter = Mathf.Clamp(sanctionMeter + delta, 0f, 100f);
        onReprimandTriggered?.Invoke(reason);
        onStatusChanged?.Invoke(moralScore, sanctionMeter);

        if (sanctionMeter >= 100f)
        {
            onGameOver?.Invoke();
        }
    }

    private IEnumerator StunPlayer(float seconds)
    {
        isHopping = true;
        yield return new WaitForSeconds(seconds);
        isHopping = false;
    }
}`
  },
  {
    language: 'javascript',
    title: 'JavaScript / TypeScript: NormaDecisionEngine.js',
    description: 'Modul logika murni untuk evaluasi tabrakan, time-limited dilemma, dan kalkulasi skor moral.',
    code: `// =========================================================================
// NORMA DECISION ENGINE (Vanilla JS / Web Frameworks)
// =========================================================================

export class NormaEngine {
  constructor(characterConfig) {
    this.char = characterConfig;
    this.moralScore = 50;
    this.sanctionMeter = 0;
    this.blessingPoints = 0;
    this.isPoliteActive = false;
    this.activePowerUp = null;
  }

  // Dipanggil saat tombol 'E' / Aksi Santun ditekan
  activatePoliteGesture() {
    this.isPoliteActive = true;
    setTimeout(() => {
      this.isPoliteActive = false;
    }, 1000); // Masa aktif gestur santun 1 detik
  }

  // Evaluasi papasan dengan Tetua (Norma Kesopanan)
  handleElderEncounter(elderNPC) {
    if (this.isPoliteActive || this.activePowerUp === 'SANTUN_BOOSTER') {
      const bonus = 20 * (this.char.moralBonusMultiplier || 1.0);
      this.moralScore = Math.min(100, this.moralScore + bonus);
      return {
        success: true,
        message: 'Bagus nak! Kamu membungkuk dan menyapa dengan hormat.',
        moralDelta: bonus,
        sanctionDelta: 0
      };
    } else {
      const penalty = 25 * (1 - (this.char.penaltyResistance || 0));
      this.sanctionMeter = Math.min(100, this.sanctionMeter + penalty);
      return {
        success: false,
        message: 'Teguran Sosial: Harap bersikap santun saat melintasi orang tua!',
        moralDelta: -10,
        sanctionDelta: penalty,
        stunTimeMs: 1500
      };
    }
  }

  // Evaluasi Jalan Raya & Lampu Penyeberangan (Norma Hukum)
  handleRoadCrossing(isLightGreen, isZebraCross) {
    if (isLightGreen && isZebraCross) {
      this.moralScore = Math.min(100, this.moralScore + 25);
      return {
        status: 'TAAT_HUKUM',
        message: 'Teladan! Menyeberang tertib pada lampu hijau di Zebra Cross.'
      };
    }

    if (!isLightGreen) {
      if (this.activePowerUp === 'KARTU_TAAT_HUKUM') {
        return { status: 'DILINDUNGI', message: 'Kartu Taat Hukum melindungimu dari bahaya.' };
      }
      const penalty = 45 * (1 - (this.char.penaltyResistance || 0));
      this.sanctionMeter = Math.min(100, this.sanctionMeter + penalty);
      return {
        status: 'TILANG_POLISI',
        message: 'Sanksi Tilang: Menerobos lampu merah penyeberangan!',
        sanctionDelta: penalty
      };
    }
  }

  // Evaluasi Keputusan Dilema Kesusilaan (Batu Sungai)
  resolveDilemma(choice) {
    if (choice.isMoral) {
      this.moralScore = Math.min(100, this.moralScore + choice.moralDelta);
      this.sanctionMeter = Math.max(0, this.sanctionMeter + choice.sanctionDelta);
      return { outcome: 'DAMAI_HATI', feedback: choice.narrativeFeedback };
    } else {
      this.moralScore = Math.max(0, this.moralScore + choice.moralDelta);
      this.sanctionMeter = Math.min(100, this.sanctionMeter + choice.sanctionDelta);
      return { outcome: 'RASA_BERSALAH', feedback: choice.narrativeFeedback };
    }
  }

  isGameOver() {
    return this.sanctionMeter >= 100;
  }
}`
  }
];
