import React from 'react';
import { MAP_NODES } from '../data/map';
import { MovementLogic } from '../logic/movement';
import { UnitType } from '../types/game';

interface MapOverlayProps {
  selectedUnitType: UnitType;
}

const MapOverlay: React.FC<MapOverlayProps> = ({ selectedUnitType }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-30">
      <svg className="w-full h-full" viewBox="0 0 2400 1000">
        {MAP_NODES.map(node => {
          const canEnter = MovementLogic.canEnter(selectedUnitType, node.terrain);
          return (
            <g key={node.id} transform={`translate(${node.position.x}, ${node.position.y})`}>
              <circle 
                r="8" 
                fill={canEnter ? 'rgba(52, 211, 153, 0.4)' : 'rgba(239, 68, 68, 0.4)'}
                stroke={canEnter ? '#10b981' : '#ef4444'}
                strokeWidth="1"
              />
              <text 
                y="-15" 
                textAnchor="middle" 
                className="text-[10px] fill-amber-200 font-cinzel"
              >
                {node.latinName || node.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default MapOverlay;
