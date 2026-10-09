export type Faction = 'roman' | 'punic' | 'gallic' | 'germanic' | 'sarmatian' | 'egyptian' | 'rebel' | 'player';

export type UnitType = 'legion' | 'ship' | 'monster' | 'relic';

export type TerrainType = 'sea' | 'land' | 'coastal_port' | 'mountain' | 'desert' | 'forest';

export interface Position {
  x: number;
  y: number;
}

export interface GameEntity {
  id: string;
  name: string;
  latinName?: string;
  faction: Faction;
  type: UnitType;
  level: number;
  hp: number;
  maxHp: number;
  position: Position;
}

export interface Player extends GameEntity {
  type: 'legion' | 'ship';
  solidi: number;
  fama: number;
  iter: number;
  maxIter: number;
  inventory: Artifact[];
  equipped: Record<string, Artifact | null>;
  unlockedCards: string[];
  flagshipModel?: string;
  capturedPorts: string[];
}

export interface Artifact {
  id: string;
  name: string;
  type: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'radiant' | 'cursed';
  level: number;
  xp: number;
}

export interface MapNode {
  id: string;
  name: string;
  latinName?: string;
  position: Position;
  terrain: TerrainType;
  connections: string[]; // IDs of connected nodes
  cost?: number;
}

export interface Sector {
  id: number;
  name: string;
  latinName: string;
  bounds: {
    minX: number;
    maxX: number;
  };
  ports: string[];
  center: number;
}
