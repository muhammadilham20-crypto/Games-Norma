import React, { useState } from 'react';
import { CODE_BLUEPRINTS } from '../data/codeBlueprints';
import { soundEffects } from '../utils/audio';
import { Copy, CheckCircle2, Code2, Play, Terminal, Cpu } from 'lucide-react';

export const LogicBlueprintView: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'pseudocode' | 'scratch' | 'unity_csharp' | 'javascript'>('pseudocode');
  const [copied, setCopied] = useState<boolean>(false);

  // Live Condition Tester states
  const [testLane, setTestLane] = useState<'TROTOAR' | 'SUNGAI' | 'JALAN_RAYA' | 'TEMPAT_IBADAH'>('TROTOAR');
  const [testSantunPressed, setTestSantunPressed] = useState<boolean>(true);
  const [testTrafficLight, setTestTrafficLight] = useState<'HIJAU' | 'MERAH'>('HIJAU');
  const [testQuietMode, setTestQuietMode] = useState<boolean>(true);
  const [testResult, setTestResult] = useState<{ moralDelta: number; sanctionDelta: number; message: string; sound: string } | null>(null);

  const activeSnippet = CODE_BLUEPRINTS.find((c) => c.language === activeLang) || CODE_BLUEPRINTS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runLiveTest = () => {
    if (testLane === 'TROTOAR') {
      if (testSantunPressed) {
        soundEffects.playGreetingChime();
        setTestResult({
          moralDelta: 15,
          sanctionDelta: 0,
          message: 'Lolos Norma Kesopanan: Membungkuk dan menyapa tetua dengan hormat. Warga tersenyum ramah.',
          sound: 'Chime Santun (523Hz)'
        });
      } else {
        soundEffects.playReprimand();
        setTestResult({
          moralDelta: -10,
          sanctionDelta: 25,
          message: 'Pelanggaran Norma Kesopanan: Menyenggol tetua tanpa permisi! Terkena Teguran Lisan & Stun 1.5 detik.',
          sound: 'Buzz Teguran (Sawtooth 150Hz)'
        });
      }
    } else if (testLane === 'SUNGAI') {
      soundEffects.playMoralSuccess();
      setTestResult({
        moralDelta: 30,
        sanctionDelta: -10,
        message: 'Lolos Norma Kesusilaan: Mengembalikan dompet SPP ke pihak sekolah. Batu sungai bersinar kokoh.',
        sound: 'Harmoni Sukses (Sine Ramp)'
      });
    } else if (testLane === 'JALAN_RAYA') {
      if (testTrafficLight === 'HIJAU') {
        soundEffects.playMoralSuccess();
        setTestResult({
          moralDelta: 20,
          sanctionDelta: 0,
          message: 'Lolos Norma Hukum: Menyeberang di Zebra Cross saat lampu penyeberangan hijau (UU No. 22 Tahun 2009).',
          sound: 'Chime Tertib'
        });
      } else {
        soundEffects.playPoliceSiren();
        setTestResult({
          moralDelta: -25,
          sanctionDelta: 50,
          message: 'Pelanggaran Norma Hukum: Menerobos lampu merah! Kamera ETLE dan sirine patroli polisi aktif.',
          sound: 'Sirine Polisi (Dual Triangle 650-950Hz)'
        });
      }
    } else if (testLane === 'TEMPAT_IBADAH') {
      if (testQuietMode) {
        soundEffects.playMoralSuccess();
        setTestResult({
          moralDelta: 10,
          sanctionDelta: 0,
          message: 'Lolos Norma Agama: Menjaga keheningan dan toleransi antarumat beragama di pekarangan ibadah.',
          sound: 'Lonceng Berkah'
        });
      } else {
        soundEffects.playReprimand();
        setTestResult({
          moralDelta: -15,
          sanctionDelta: 20,
          message: 'Pelanggaran Norma Agama: Berlari dan menimbulkan kegaduhan di kawasan suci. Poin Berkah berkurang.',
          sound: 'Peringatan Adab'
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
          <span>Arsitektur Mesin & Algoritma</span>
          <span aria-hidden="true">·</span>
          <span>Multi-Platform Code Blueprint</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Blueprint Logika Kondisional & Pseudocode Game
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Rancangan logika If-Else terstruktur untuk deteksi penalti norma, reward moral, dan state management siap pakai di Scratch 3.0, Unity C#, dan JavaScript.
        </p>
      </div>

      {/* Language Selector & Code Viewer */}
      <div className="bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 overflow-hidden shadow-xl mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveLang('pseudocode')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeLang === 'pseudocode'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Pseudocode Algoritma
            </button>
            <button
              onClick={() => setActiveLang('scratch')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeLang === 'scratch'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Scratch 3.0 Blocks
            </button>
            <button
              onClick={() => setActiveLang('unity_csharp')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeLang === 'unity_csharp'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Unity C# Script
            </button>
            <button
              onClick={() => setActiveLang('javascript')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeLang === 'javascript'
                  ? 'bg-yellow-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              JavaScript / TS Engine
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Kode</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-slate-900/50 border-b border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
          <span className="font-semibold text-slate-200">{activeSnippet.title}</span>
          <span className="text-[11px] text-slate-400">{activeSnippet.description}</span>
        </div>

        <pre className="p-6 font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto max-h-[500px]">
          <code>{activeSnippet.code}</code>
        </pre>
      </div>

      {/* Interactive Condition Engine Tester */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-5 h-5 text-emerald-700" />
          <h2 className="text-xl font-bold text-slate-900">
            Interactive Logic & Condition Evaluator
          </h2>
        </div>
        <p className="text-xs text-slate-600 mb-6">
          Uji langsung logika kondisional (If-Else) di bawah ini untuk melihat kalkulasi Moral Meter, Sanksi Meter, dan efek suara secara real-time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Lajur Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tipe Lajur Ujian:
            </label>
            <select
              value={testLane}
              onChange={(e) => setTestLane(e.target.value as any)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="TROTOAR">Trotoar (Norma Kesopanan)</option>
              <option value="SUNGAI">Sungai Hati (Norma Kesusilaan)</option>
              <option value="JALAN_RAYA">Jalan Raya (Norma Hukum)</option>
              <option value="TEMPAT_IBADAH">Pekarangan Ibadah (Norma Agama)</option>
            </select>
          </div>

          {/* Conditional Input 1 */}
          {testLane === 'TROTOAR' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tombol Santun 'E' Ditekan?
              </label>
              <select
                value={testSantunPressed ? 'true' : 'false'}
                onChange={(e) => setTestSantunPressed(e.target.value === 'true')}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="true">YA (Membungkuk & Sapa)</option>
                <option value="false">TIDAK (Menyenggol Tergesa)</option>
              </select>
            </div>
          )}

          {/* Conditional Input 2 */}
          {testLane === 'JALAN_RAYA' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Lampu Penyeberangan Zebra:
              </label>
              <select
                value={testTrafficLight}
                onChange={(e) => setTestTrafficLight(e.target.value as any)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="HIJAU">HIJAU (Waktunya Menyeberang)</option>
                <option value="MERAH">MERAH (Kendaraan Masih Jalan)</option>
              </select>
            </div>
          )}

          {/* Conditional Input 3 */}
          {testLane === 'TEMPAT_IBADAH' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Mode Langkah Tenang Aktif?
              </label>
              <select
                value={testQuietMode ? 'true' : 'false'}
                onChange={(e) => setTestQuietMode(e.target.value === 'true')}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                <option value="true">YA (Melangkah Khidmat & Senyap)</option>
                <option value="false">TIDAK (Berlari & Membuat Gaduh)</option>
              </select>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-end">
            <button
              onClick={runLiveTest}
              className="w-full flex items-center justify-center gap-2 p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Eksekusi Logika If-Else</span>
            </button>
          </div>
        </div>

        {/* Live Output Display */}
        {testResult && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl animate-in fade-in duration-150">
            <div className="text-xs font-mono font-bold text-slate-500 mb-1">HASIL EKSEKUSI ENGINE:</div>
            <p className="text-sm font-semibold text-slate-900 mb-3">{testResult.message}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className={testResult.moralDelta >= 0 ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                Δ Moral: {testResult.moralDelta >= 0 ? `+${testResult.moralDelta}` : testResult.moralDelta}
              </span>
              <span className={testResult.sanctionDelta > 0 ? 'text-rose-700 font-bold' : 'text-slate-600'}>
                Δ Sanksi: +{testResult.sanctionDelta}%
              </span>
              <span className="text-slate-500">
                Audio Output: <strong className="text-slate-700">{testResult.sound}</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
