
import React, { useState } from 'react';
import { View } from './types';
import { useMainViewModel } from './hooks/useMainViewModel';
import Dashboard from './components/Dashboard';
import Journal from './components/Journal';
import DecisionWorkbench from './components/DecisionWorkbench';
import InsightCenter from './components/InsightCenter';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const { state, actions } = useMainViewModel();

  const renderView = () => {
    if (state.isLoading && state.decisions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
          <div className="w-16 h-16 border-[3px] border-[#E9E0D2] border-t-[#8DA399] rounded-full animate-spin"></div>
          <p className="font-serif italic text-slate-400 text-lg">Finding a quiet space for you...</p>
        </div>
      );
    }

    switch (activeView) {
      case 'dashboard':
        return (
          <div className="max-w-6xl mx-auto space-y-24 px-4">
            <DecisionWorkbench 
              onSave={(title, desc, mood, conf, factors) => {
                actions.addDecision(title, desc, mood, conf, factors);
              }}
              onFetchAISuggestions={actions.fetchAISuggestions}
            />
            <div className="border-t border-[#F0EDE4] pt-24">
              <Dashboard 
                decisions={state.decisions} 
                checkins={state.checkins} 
                insights={state.insights} 
                onNavigate={setActiveView} 
              />
            </div>
          </div>
        );
      case 'journal':
        return <Journal 
          decisions={state.decisions} 
          onAdd={() => setActiveView('dashboard')} 
          onUpdate={(id, updates) => actions.updateDecision(id, updates)} 
        />;
      case 'insights':
        return <InsightCenter 
          decisions={state.decisions} 
          checkins={state.checkins} 
          existingInsights={state.insights} 
          onSetInsights={actions.generateInsights} 
          onRunWeeklyReview={actions.generateWeeklyReview}
        />;
      default:
        return <Dashboard decisions={state.decisions} checkins={state.checkins} insights={state.insights} onNavigate={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen relative pb-32">
      <header className="p-10 sticky top-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-[1.25rem] bg-[#333] flex items-center justify-center shadow-lg shadow-slate-200">
              <span className="text-[#FAF9F6] font-serif text-xl italic leading-none pt-1">L</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-serif italic text-[#333]">LifeOS</h1>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] leading-none mt-1">A private space for growth</p>
            </div>
          </div>
          
          <nav className="flex gap-10 items-center">
            {['dashboard', 'journal', 'insights'].map(v => (
              <button 
                key={v}
                onClick={() => setActiveView(v as View)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group ${activeView === v ? 'text-[#333]' : 'text-slate-300'}`}
              >
                {v === 'dashboard' ? 'Workspace' : v === 'journal' ? 'Archives' : 'Mirror'}
                <div className={`absolute -bottom-2 left-0 w-full h-[2px] bg-[#8DA399] transition-transform duration-500 scale-x-0 group-hover:scale-x-100 ${activeView === v ? 'scale-x-100' : ''}`}></div>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {state.error && (
          <div className="mx-6 mb-12 p-5 bg-[#F4E1D2] text-[#B08968] text-[10px] font-bold uppercase tracking-widest rounded-3xl flex justify-between items-center animate-fade-in">
            <span>{state.error}</span>
            <button onClick={() => actions.refresh()} className="underline opacity-50 hover:opacity-100">Try again</button>
          </div>
        )}
        {renderView()}
      </main>

      <div className="md:hidden">
        <Navigation current={activeView} onNavigate={setActiveView} />
      </div>
    </div>
  );
};

export default App;
