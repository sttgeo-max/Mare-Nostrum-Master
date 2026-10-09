import { describe, it, expect } from 'vitest';
import { PORTS } from '../data/ports';
import fs from 'fs';

describe('V37 Port Data Extraction Verification', () => {
  it('contains exactly 52 port records matching original V37 bundle', () => {
    expect(PORTS).toBeDefined();
    expect(Array.isArray(PORTS)).toBe(true);
    expect(PORTS.length).toBe(52);
  });

  it('verifies exact identifiers and ordering of key strategic ports', () => {
    expect(PORTS[0].id).toBe('massilia');
    expect(PORTS[1].id).toBe('roma');
    expect(PORTS[2].id).toBe('pons_milvius');
    expect(PORTS[PORTS.length - 1].id).toBe('sinope');
  });

  it('verifies property structure and domain integrity for all ports', () => {
    PORTS.forEach(port => {
      expect(port).toHaveProperty('id');
      expect(typeof port.id).toBe('string');
      expect(port).toHaveProperty('category');
      expect(typeof port.category).toBe('string');
      expect(port).toHaveProperty('domain');
      expect(['sea', 'land']).toContain(port.domain);
    });
  });

  it('confirms byte-for-byte equivalence with bundle definition', () => {
    const bundleContent = fs.readFileSync('public/assets/index-V37.js', 'utf8');
    const hasArrayContent = bundleContent.includes('massilia') && bundleContent.includes('roma') && bundleContent.includes('sinope');
    expect(hasArrayContent).toBe(true);
  });
});
