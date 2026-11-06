import React, { useState } from 'react';
import { Header } from './components/Header';
import { GddDocumentView } from './components/GddDocumentView';
import { ArcadeGame } from './components/ArcadeGame';
import { DilemmaSandbox } from './components/DilemmaSandbox';
import { LogicBlueprintView } from './components/LogicBlueprintView';

export default function App() {
  const [activeTab, setActiveTab] = useState<'gdd' | 'game' | 'dilemma' | 'code'>('gdd');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Bar adhering to strict 3-zone Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {activeTab === 'gdd' && (
          <GddDocumentView
            onStartGame={() => setActiveTab('game')}
            onExploreSandbox={() => setActiveTab('dilemma')}
          />
        )}

        {activeTab === 'game' && <ArcadeGame />}

        {activeTab === 'dilemma' && <DilemmaSandbox />}

        {activeTab === 'code' && <LogicBlueprintView />}
      </div>

      {/* Clean Footer adhering to anti-slop guidelines */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Langkah Beretika: Menyeberang dengan Norma</span>
            <span aria-hidden="true">·</span>
            <span>Game Design Document & Arcade Simulator</span>
          </div>
          <div className="text-slate-500">
            Pendidikan Pancasila & Kewarganegaraan (PPKn) Kurikulum Merdeka
          </div>
        </div>
      </footer>
    </div>
  );
}
