/**
 * Mare Nostrum II - Game Mathematics Utilities
 * Pure mathematical helper functions for coordinates, distance, and bounding.
 */

export interface Point2D {
  x: number;
  y: number;
}

export function calculateDistance(p1: Point2D, p2: Point2D): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp(t, 0, 1);
}

export function manhattanDistance(p1: Point2D, p2: Point2D): number {
  return Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);
}
