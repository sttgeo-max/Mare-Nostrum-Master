import { TerrainType, UnitType, MapNode } from '../types/game';

export const TERRAIN_MOVEMENT_COSTS: Record<TerrainType, number> = {
  sea: 1,
  land: 1.5,
  coastal_port: 1,
  mountain: 3,
  desert: 2,
  forest: 2
};

export class MovementLogic {
  /**
   * Calculates the movement cost from one node to another.
   */
  static calculateCost(from: MapNode, to: MapNode, unitType: UnitType): number | null {
    // 1. Terrain Restrictions
    if (unitType === 'ship' && to.terrain !== 'sea' && to.terrain !== 'coastal_port') {
      return null; // Ships can't move on land
    }
    
    if (unitType === 'legion' && to.terrain === 'sea') {
      return null; // Legions can't move on deep sea (need port for transport)
    }

    // 2. Base Cost from Terrain
    const baseCost = TERRAIN_MOVEMENT_COSTS[to.terrain] || 1;
    
    // 3. Distance multiplier (optional, if using coordinate-based distance)
    const dx = to.position.x - from.position.x;
    const dy = to.position.y - from.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Normalize distance (e.g., 50px = 1 unit)
    const distanceMultiplier = distance / 50;

    return baseCost * distanceMultiplier;
  }

  /**
   * Checks if a unit can enter a specific terrain type.
   */
  static canEnter(unitType: UnitType, terrain: TerrainType): boolean {
    switch (unitType) {
      case 'ship':
        return terrain === 'sea' || terrain === 'coastal_port';
      case 'legion':
        return terrain !== 'sea'; // Legions can enter ports and all land
      default:
        return true;
    }
  }

  /**
   * Determines if a move is valid based on unit current capacity (iter).
   */
  static isValidMove(cost: number, currentIter: number): boolean {
    return currentIter >= cost;
  }
}
