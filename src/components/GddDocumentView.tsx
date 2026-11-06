import React, { useState } from 'react';
import { GDD_SECTIONS } from '../data/gddContent';
import { PLAYABLE_CHARACTERS } from '../data/characters';
import { DILEMMA_SCENARIOS } from '../data/dilemmas';
import { BookOpen, Award, Shield, Heart, Scale, Flame, Printer, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

interface GddDocumentViewProps {
  onStartGame: () => void;
  onExploreSandbox: () => void;
}

export const GddDocumentView: React.FC<GddDocumentViewProps> = ({
  onStartGame,
  onExploreSandbox,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('ringkasan-eksekutif');
  const [selectedCharIndex, setSelectedCharIndex] = useState<number>(0);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);

  const activeSection = GDD_SECTIONS.find((s) => s.id === activeSectionId) || GDD_SECTIONS[0];
  const currentChar = PLAYABLE_CHARACTERS[selectedCharIndex];

  const handleExportMarkdown = () => {
    const fullMarkdown = `# Game Design Document (GDD)\n# LANGKAH BERETIKA: MENYEBERANG DENGAN NORMA\n\n` +
      GDD_SECTIONS.map((sec) => `## ${sec.kicker} — ${sec.title}\n\n${sec.contentMarkdown}\n\n---\n`).join('\n');

    navigator.clipboard.writeText(fullMarkdown);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Hero Banner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-3">
              <span>Game Design Document</span>
              <span aria-hidden="true">·</span>
              <span>Spesialis Gamifikasi Edukasi PPKn</span>
              <span aria-hidden="true">·</span>
              <span>Versi 1.0</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 text-balance">
              Langkah Beretika: Menyeberang dengan Norma
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
              Konsep game arcade edukatif yang mengintegrasikan mekanika lompat grid ala <em>Crossy Road</em> dengan refleks pengambilan keputusan etis berdasarkan 4 Norma Masyarakat Indonesia: <strong>Kesopanan, Kesusilaan, Hukum, dan Agama</strong>.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartGame}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-95 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Uji Mainkan Game Langsung</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleExportMarkdown}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-lg transition-all cursor-pointer whitespace-nowrap"
            >
              {copiedMarkdown ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  <span>Salin Dokumen Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
              title="Cetak / Simpan PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-slate-900">
          <img
            src="/src/assets/images/game_cover_poster_1793954670505.jpg"
            alt="Poster Game Langkah Beretika Menyeberang dengan Norma"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-6">
            <div className="text-white text-xs font-medium">
              <span className="font-semibold text-amber-300">Konsep Visual Key Art:</span> Penyeberangan beradab di tengah dinamika kota dan sungai nurani nusantara.
            </div>
          </div>
        </div>
      </div>

      {/* 4 Norma Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-amber-700">Norma 1</span>
            <Heart className="w-4 h-4 text-amber-600" />
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">Norma Kesopanan</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Trotoar & kampung: Menyapa tetua dengan tombol "Permisi / Tabe'". Tanpa permisi berujung teguran lisan & stun.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-rose-700">Norma 2</span>
            <Flame className="w-4 h-4 text-rose-600" />
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">Norma Kesusilaan</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sungai nurani: Memilih batu moral jujur. Batu tindakan culas retak dan tenggelam karena sanksi rasa bersalah.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-blue-700">Norma 3</span>
            <Scale className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">Norma Hukum</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Jalan raya protokol: Tertib di Zebra Cross saat lampu hijau. Menerobos memicu sirine polisi & sanksi tilang.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-emerald-700">Norma 4</span>
            <Shield className="w-4 h-4 text-emerald-600" />
          </div>
          <h2 className="text-base font-bold text-slate-900 mb-1">Norma Agama</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Zona damai rumah ibadah: Mode langkah tenang tanpa kebisingan demi kerukunan dan limpahan Poin Berkah.
          </p>
        </div>
      </div>

      {/* Main GDD Body: Sidebar Navigation & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 sticky top-20">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-3 py-2">
            Daftar Bab Dokumen (GDD)
          </div>
          <div className="space-y-1">
            {GDD_SECTIONS.map((sec, index) => {
              const isActive = sec.id === activeSectionId;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex flex-col gap-0.5 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold">{sec.kicker}</span>
                  <span className="font-semibold text-slate-900">{sec.title}</span>
                  <span className="text-[11px] text-slate-500 line-clamp-1">{sec.summary}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-700 mb-2">Aksi Cepat:</div>
            <div className="flex flex-col gap-2">
              <button
                onClick={onStartGame}
                className="w-full text-left px-3 py-2 text-xs font-medium text-emerald-800 bg-emerald-100/60 hover:bg-emerald-100 rounded-md transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>Mainkan Demo Arcade</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onExploreSandbox}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>Coba 3 Skenario QTE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Content Viewer */}
        <main className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <div className="pb-6 mb-6 border-b border-slate-100">
            <span className="text-xs font-mono font-semibold text-emerald-700">{activeSection.kicker}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-2">
              {activeSection.title}
            </h2>
            <p className="text-sm text-slate-600">{activeSection.summary}</p>
          </div>

          {/* Special Interactive Section if viewing Characters */}
          {activeSection.id === 'cerita-karakter' && (
            <div className="mb-8 p-5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Pilih Karakter untuk Melihat Statistik
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {PLAYABLE_CHARACTERS.map((char, idx) => (
                  <button
                    key={char.id}
                    onClick={() => setSelectedCharIndex(idx)}
                    className={`p-2.5 rounded-lg text-left transition-all cursor-pointer border ${
                      selectedCharIndex === idx
                        ? 'bg-white border-emerald-600 shadow-xs'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{char.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{char.role.split('(')[0]}</div>
                  </button>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-40 shrink-0">
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 aspect-square">
                    <img
                      src={currentChar.avatarUrl}
                      alt={currentChar.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="mt-2 text-center text-xs text-slate-500 font-mono">
                    Usia: {currentChar.age}
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">{currentChar.name}</h3>
                    <span className="text-xs text-emerald-700 font-medium">{currentChar.role}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{currentChar.bio}</p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="text-xs font-semibold text-slate-800">
                      Skill Pasif: <span className="text-emerald-700">{currentChar.passiveSkillName}</span>
                    </div>
                    <p className="text-xs text-slate-500">{currentChar.passiveSkillDesc}</p>

                    <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <div className="text-[10px] text-slate-500">Bonus Moral</div>
                        <div className="text-sm font-bold text-emerald-700">+{Math.round((currentChar.moralBonusMultiplier - 1) * 100)}%</div>
                      </div>
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <div className="text-[10px] text-slate-500">Kecepatan</div>
                        <div className="text-sm font-bold text-blue-700">{currentChar.speedMultiplier}x</div>
                      </div>
                      <div className="p-2 bg-slate-50 rounded border border-slate-100">
                        <div className="text-[10px] text-slate-500">Tahan Sanksi</div>
                        <div className="text-sm font-bold text-amber-700">+{Math.round(currentChar.penaltyResistance * 100)}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Standard Markdown Content Rendering */}
          <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
            {activeSection.contentMarkdown.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="text-lg font-bold text-slate-900 mt-6 mb-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('#### ')) {
                return (
                  <h4 key={pIdx} className="text-base font-semibold text-slate-800 mt-4 mb-1">
                    {paragraph.replace('#### ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('```')) {
                const codeBody = paragraph.replace(/```[a-z]*\n?/g, '').trim();
                return (
                  <pre key={pIdx} className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs overflow-x-auto my-3 leading-relaxed">
                    <code>{codeBody}</code>
                  </pre>
                );
              }
              if (paragraph.startsWith('| ')) {
                const rows = paragraph.split('\n').filter(r => !r.includes(':---') && !r.includes('| :'));
                const headers = rows[0]?.split('|').map(c => c.trim()).filter(Boolean);
                const dataRows = rows.slice(1).map(r => r.split('|').map(c => c.trim()).filter(Boolean));
                return (
                  <div key={pIdx} className="overflow-x-auto my-4 border border-slate-200 rounded-lg">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <tr>
                          {headers?.map((h, i) => (
                            <th key={i} className="py-2.5 px-3 font-semibold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {dataRows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-2.5 px-3">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                const items = paragraph.split('\n').filter(Boolean);
                return (
                  <ul key={pIdx} className="list-disc list-inside space-y-1 text-slate-700 pl-2">
                    {items.map((it, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {it.replace(/^[-*]\s+|\d+\.\s+/, '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={pIdx} className="text-slate-700">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Quick Scene Illustration */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video max-h-72">
              <img
                src="/src/assets/images/game_banner_art_1793954669514.jpg"
                alt="Level 3 Kota Harmoni Illustration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 sm:p-6">
                <div>
                  <div className="text-xs font-semibold text-emerald-400">Level 3: Simfoni Empat Norma</div>
                  <div className="text-xs text-slate-200">
                    Gabungan lajur trotoar santun, arus sungai nurani, zebra cross lalu lintas, dan pekarangan damai rumah ibadah.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
