import { describe, it, expect } from 'vitest';
import { calculateDistance, clamp, lerp, manhattanDistance } from '../utils/game_math';

describe('Game Mathematics Utilities', () => {
  it('calculates Euclidean distance correctly', () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 3, y: 4 };
    expect(calculateDistance(p1, p2)).toBe(5);

    const samePoint = { x: 10, y: 20 };
    expect(calculateDistance(samePoint, samePoint)).toBe(0);
  });

  it('clamps values within min and max bounds', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(3, 3, 3)).toBe(3);
  });

  it('performs linear interpolation correctly', () => {
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(0, 100, 1)).toBe(100);
    expect(lerp(0, 100, 1.5)).toBe(100);
  });

  it('calculates Manhattan distance correctly', () => {
    const p1 = { x: 1, y: 2 };
    const p2 = { x: 4, y: 6 };
    expect(manhattanDistance(p1, p2)).toBe(7);
  });
});
