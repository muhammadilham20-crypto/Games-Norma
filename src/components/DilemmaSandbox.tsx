import React, { useState } from 'react';
import { DILEMMA_SCENARIOS } from '../data/dilemmas';
import { DilemmaScenario, DilemmaChoice } from '../types/game';
import { soundEffects } from '../utils/audio';
import { Scale, HeartHandshake, ShieldAlert, Award, BookOpen, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export const DilemmaSandbox: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [currentScenario, setCurrentScenario] = useState<DilemmaScenario>(DILEMMA_SCENARIOS[0]);
  const [selectedChoice, setSelectedChoice] = useState<DilemmaChoice | null>(null);
  const [simulatedMoral, setSimulatedMoral] = useState<number>(50);
  const [simulatedSanction, setSimulatedSanction] = useState<number>(0);

  const handleSelectScenario = (index: number) => {
    setSelectedScenarioIndex(index);
    setCurrentScenario(DILEMMA_SCENARIOS[index]);
    setSelectedChoice(null);
  };

  const handleChoose = (choice: DilemmaChoice) => {
    setSelectedChoice(choice);
    if (choice.isMoral) {
      soundEffects.playMoralSuccess();
      setSimulatedMoral((m) => Math.min(100, m + choice.moralDelta));
      setSimulatedSanction((s) => Math.max(0, s + choice.sanctionDelta));
    } else {
      soundEffects.playWaterSplash();
      soundEffects.playReprimand();
      setSimulatedMoral((m) => Math.max(0, m + choice.moralDelta));
      setSimulatedSanction((s) => Math.min(100, s + choice.sanctionDelta));
    }
  };

  const resetSimulation = () => {
    setSimulatedMoral(50);
    setSimulatedSanction(0);
    setSelectedChoice(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
          <span>Sandbox Dilema & Asesmen PPKn</span>
          <span aria-hidden="true">·</span>
          <span>Quick Time Event (QTE) Lab</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Laboratorium Skenario Dilema Batin & Konsekuensi Norma
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Uji coba 3+ skenario dilema kritis saat melompat di tengah jalan raya, arus sungai nurani, dan pekarangan ibadah. Teliti dampak psikologis, sanksi hukum/sosial, dan dasar regulasi Pancasila.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Scenario Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Pilih Skenario Kasus:
          </div>
          {DILEMMA_SCENARIOS.map((sc, idx) => {
            const isSelected = selectedScenarioIndex === idx;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-semibold text-emerald-800 mb-1">
                  <span>Kasus #{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700">
                    Norma {sc.norma}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{sc.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{sc.contextText}</p>
              </button>
            );
          })}

          {/* Cumulative Meter Monitor */}
          <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Simulator Metrik Akumulatif
              </span>
              <button
                onClick={resetSimulation}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Moral Meter
                  </span>
                  <span className="font-mono font-bold">{simulatedMoral}/100</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, simulatedMoral)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-rose-400 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Sanksi Meter
                  </span>
                  <span className="font-mono font-bold">{simulatedSanction}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-rose-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(100, simulatedSanction)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Active Scenario Sandbox */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">
                Lokasi: {currentScenario.locationName}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {currentScenario.title}
              </h2>
            </div>
            <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md font-semibold">
              Batas Waktu QTE: {currentScenario.timeLimitSec}s
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
            <div className="text-xs font-semibold text-slate-500 mb-1">Narasi Skenario (Dalam Game):</div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              "{currentScenario.contextText}"
            </p>
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Pilihan Keputusan Cepat Pemain:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {currentScenario.choices.map((choice) => {
              const isSelected = selectedChoice?.id === choice.id;
              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoose(choice)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? choice.isMoral
                        ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300'
                        : 'bg-rose-50 border-rose-400 ring-2 ring-rose-300'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold ${choice.isMoral ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {choice.isMoral ? 'Opsi Bermoral (Jujur / Taat)' : 'Opsi Godaan (Culas / Pelanggaran)'}
                      </span>
                      {choice.isMoral ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600" />
                      )}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 mb-2">
                      {choice.text}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                    <span className={choice.isMoral ? 'text-emerald-700' : 'text-rose-700'}>
                      Moral {choice.moralDelta > 0 ? `+${choice.moralDelta}` : choice.moralDelta}
                    </span>
                    <span className={choice.sanctionDelta > 0 ? 'text-rose-700' : 'text-emerald-700'}>
                      Sanksi {choice.sanctionDelta > 0 ? `+${choice.sanctionDelta}%` : `${choice.sanctionDelta}%`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Outcome & Legal / Social Reference */}
          {selectedChoice ? (
            <div
              className={`p-5 rounded-xl border animate-in fade-in duration-200 ${
                selectedChoice.isMoral
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/70 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Analisis Konsekuensi & Rujukan Yuridis/Sosial:</span>
              </div>
              <p className="text-xs leading-relaxed mb-3">
                <strong>Umpan Balik Game:</strong> {selectedChoice.narrativeFeedback}
              </p>
              <div className="p-3 bg-white/80 rounded-lg border border-slate-200/60 text-xs">
                <strong>Landasan Hukum & Norma:</strong> {selectedChoice.normaRef}
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center text-xs text-slate-500">
              Pilih salah satu tombol di atas untuk mensimulasikan reaksi mesin game dan membaca analisis norma.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
