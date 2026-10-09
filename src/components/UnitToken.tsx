import React from 'react';
import { GameEntity } from '../types/game';

interface UnitTokenProps {
  entity: GameEntity;
  onClick?: (entity: GameEntity) => void;
}

const UnitToken: React.FC<UnitTokenProps> = ({ entity, onClick }) => {
  // Use the PhysicalTokenGrounding (Ha) component from the engine
  const PhysicalTokenGrounding = (window as any).Ha;
  const MedallionModel = (window as any).dc;

  if (!PhysicalTokenGrounding || !MedallionModel) return null;

  return (
    <div 
      className="absolute transition-all duration-500 ease-out cursor-pointer hover:scale-110 active:scale-95"
      style={{ 
        left: `${entity.position.x}px`, 
        top: `${entity.position.y}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: 40
      }}
      onClick={() => onClick?.(entity)}
    >
      <PhysicalTokenGrounding 
        size={40} 
        medium={entity.type === 'ship' ? 'water' : 'land'}
        isElaborate={true}
      >
        <MedallionModel 
          type={entity.type === 'ship' ? 'ship' : 'legion'}
          faction={entity.faction}
          level={entity.level}
          size={40}
        />
      </PhysicalTokenGrounding>
      
      {/* Floating UI Popup (Simplified label) */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="px-2 py-0.5 rounded bg-black/80 border border-amber-500/40 text-[8px] font-cinzel text-amber-200">
          {entity.name}
        </div>
      </div>
    </div>
  );
};

export default UnitToken;
