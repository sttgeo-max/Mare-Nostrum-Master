import React, { useState, useEffect } from 'react';
import { Player, GameEntity, Artifact, UnitType } from './types/game';
import MapOverlay from './components/MapOverlay';
import UnitToken from './components/UnitToken';

// These components and objects are provided by the patched bundle or the dump
declare global {
  interface Window {
    Medallion: any;
    rt: any;
    EmblemSVG: any;
    PhysicalTokenGrounding: any;
    dc: any;
    Ha: any;
    HUDButton: any;
    Ze: any;
    je: any;
    oo: any;
  }
}

const App: React.FC = () => {
  const [selectedUnitType, setSelectedUnitType] = useState<UnitType>('ship');
  const [isLoaded, setIsLoaded] = useState(false);
  const [entities, setEntities] = useState<GameEntity[]>([
    {
      id: 'fleet_1',
      name: 'Legio I Adiutrix',
      faction: 'player',
      type: 'ship',
      level: 3,
      hp: 100,
      maxHp: 100,
      position: { x: 1080, y: 350 }
    },
    {
      id: 'enemy_1',
      name: 'Punic Raiders',
      faction: 'punic',
      type: 'ship',
      level: 2,
      hp: 80,
      maxHp: 80,
      position: { x: 1040, y: 640 }
    }
  ]);

  useEffect(() => {
    // Wait for the bundle/dump to initialize the window objects
    const checkLoaded = setInterval(() => {
      if (window.Ze && window.rt && window.Ha && window.dc) {
        setIsLoaded(true);
        clearInterval(checkLoaded);
      }
    }, 100);
    return () => clearInterval(checkLoaded);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#06080e] text-amber-500 font-cinzel">
        <div className="animate-pulse">Loading Imperial Assets...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-[#06080e] overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-slate-900 border-2 border-amber-900/20" />
      </div>

      {/* Map Entities Layer */}
      <div className="absolute inset-0 z-20">
        {entities.map(entity => (
          <UnitToken 
            key={entity.id} 
            entity={entity} 
            onClick={(e) => console.log('Selected entity:', e.name)}
          />
        ))}
      </div>

      {/* Modular Map Overlay */}
      <MapOverlay selectedUnitType={selectedUnitType} />

      {/* UI Overlays */}
      <div className="absolute top-4 left-4 z-50 p-4 amber-glass-pod max-w-[240px]">
        <h1 className="text-xl font-cinzel font-black text-amber-300">MARE NOSTRUM II</h1>
        <p className="text-xs text-amber-200/70 italic mb-4 uppercase tracking-tighter">Tactical Command Center</p>
        
        <div className="space-y-2">
          <p className="text-[10px] font-cinzel text-amber-400 font-bold">SELECT UNIT TYPE</p>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setSelectedUnitType('ship')}
              className={`px-3 py-1.5 rounded-lg border text-[10px] font-cinzel transition-all ${selectedUnitType === 'ship' ? 'bg-amber-500/20 border-amber-400 text-amber-100' : 'bg-black/40 border-amber-900/40 text-amber-500/60 hover:border-amber-700'}`}
            >
              CLASSIS
            </button>
            <button 
              onClick={() => setSelectedUnitType('legion')}
              className={`px-3 py-1.5 rounded-lg border text-[10px] font-cinzel transition-all ${selectedUnitType === 'legion' ? 'bg-amber-500/20 border-amber-400 text-amber-100' : 'bg-black/40 border-amber-900/40 text-amber-500/60 hover:border-amber-700'}`}
            >
              LEGIO
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-50 flex gap-4 items-center">
         <div className="amber-glass-pod px-4 py-2 flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-cinzel text-amber-400 font-bold">COMMANDER</p>
              <p className="text-xs font-serif-body text-amber-100">Constantine I</p>
            </div>
            {window.rt && <window.rt size={40} variant="gold_sun" emblem="eagle" showGlow={true} />}
         </div>
      </div>
    </div>
  );
};

export default App;
