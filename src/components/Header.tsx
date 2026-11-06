import React from 'react';
import { Gamepad2, Volume2, VolumeX } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface HeaderProps {
  activeTab: 'gdd' | 'game' | 'dilemma' | 'code';
  setActiveTab: (tab: 'gdd' | 'game' | 'dilemma' | 'code') => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
}) => {
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEffects.setMuted(next);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('gdd')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-emerald-700 transition-colors cursor-pointer text-left"
        >
          Langkah Beretika
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('gdd')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'gdd'
                ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Dokumen GDD
          </button>
          <button
            onClick={() => setActiveTab('game')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'game'
                ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Mainkan Game
          </button>
          <button
            onClick={() => setActiveTab('dilemma')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'dilemma'
                ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Sandbox Dilema
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'code'
                ? 'text-emerald-700 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-600'
                : 'hover:text-slate-900'
            }`}
          >
            Blueprint Kode
          </button>
        </nav>

        {/* Zone 3: 1 primary action (+ optional sound toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title={isMuted ? 'Nyalakan Efek Suara' : 'Bisukan Suara'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          <button
            onClick={() => {
              setActiveTab('game');
              soundEffects.playHop();
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-95 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Mulai Main Arcade</span>
          </button>
        </div>
      </div>
    </header>
  );
};
