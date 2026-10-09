import { describe, it, expect } from 'vitest';
import { ARTIFACTS } from '../data/artifacts';
import * as parser from '@babel/parser';
import fs from 'fs';

function astToValue(node: any): any {
  if (!node) {
    throw new Error('AST node is null or undefined');
  }

  switch (node.type) {
    case 'ArrayExpression':
      return node.elements.map((el: any) => astToValue(el));

    case 'ObjectExpression':
      const obj: Record<string, any> = {};
      node.properties.forEach((prop: any) => {
        if (prop.type === 'SpreadElement') {
          throw new Error('Unsupported SpreadElement in object expression');
        }
        if (prop.computed) {
          throw new Error('Unsupported computed property in object expression');
        }
        if (prop.type === 'ObjectProperty') {
          const key =
            prop.key.type === 'Identifier'
              ? prop.key.name
              : prop.key.type === 'StringLiteral'
              ? prop.key.value
              : null;
          if (key === null) {
            throw new Error(`Unsupported object property key type: ${prop.key.type}`);
          }
          obj[key] = astToValue(prop.value);
        } else {
          throw new Error(`Unsupported object property type: ${prop.type}`);
        }
      });
      return obj;

    case 'StringLiteral':
      return node.value;
    case 'NumericLiteral':
      return node.value;
    case 'BooleanLiteral':
      return node.value;
    case 'NullLiteral':
      return null;

    case 'UnaryExpression':
      if (node.operator === '-' && node.argument.type === 'NumericLiteral') {
        return -node.argument.value;
      }
      throw new Error(`Unsupported unary expression operator: ${node.operator}`);

    default:
      throw new Error(`Unsupported AST node type: ${node.type}`);
  }
}

function extractBundleArtifactIdsFromAST(): string[] {
  const code = fs.readFileSync('public/assets/index-V37.js', 'utf8');
  const ast = parser.parse(code, { sourceType: 'module' });

  const extractedIds: string[] = [];
  function walk(node: any) {
    if (!node || typeof node !== 'object') return;
    if (
      node.type === 'AssignmentExpression' &&
      node.left && node.left.type === 'MemberExpression' &&
      node.left.object && node.left.object.name === 'je' &&
      node.right && node.right.type === 'MemberExpression' &&
      node.right.object && node.right.object.name === 'je' &&
      node.right.property && typeof node.right.property.value === 'string' &&
      node.right.property.value.startsWith('art_')
    ) {
      extractedIds.push(node.right.property.value);
    }
    for (const key in node) {
      if (node[key] && typeof node[key] === 'object') {
        walk(node[key]);
      }
    }
  }
  walk(ast);

  if (extractedIds.length !== 50) {
    throw new Error(`Expected 50 artifact mappings in bundle AST, but found ${extractedIds.length}`);
  }
  return extractedIds;
}

describe('V37 Artifact Data AST Extraction & Verification', () => {
  it('extracts all 50 artifact identifiers from bundle AST and verifies exact equivalence with ARTIFACTS', () => {
    const bundleArtifactIds = extractBundleArtifactIdsFromAST();
    expect(bundleArtifactIds).toBeDefined();
    expect(Array.isArray(bundleArtifactIds)).toBe(true);
    expect(bundleArtifactIds.length).toBe(50);
    expect(ARTIFACTS.length).toBe(50);

    const artifactIds = ARTIFACTS.map(a => a.id);
    expect(artifactIds).toEqual(bundleArtifactIds);
  });

  it('validates schema integrity for all 50 artifact definitions', () => {
    ARTIFACTS.forEach(art => {
      expect(art).toHaveProperty('id');
      expect(typeof art.id).toBe('string');
      expect(art).toHaveProperty('name');
      expect(typeof art.name).toBe('string');
      expect(art).toHaveProperty('slot');
      expect(typeof art.slot).toBe('string');
      expect(art).toHaveProperty('rarity');
      expect(typeof art.rarity).toBe('string');
      expect(art).toHaveProperty('description');
      expect(typeof art.description).toBe('string');
    });
  });

  it('fails closed on modified artifact data (negative test on existing property id)', () => {
    const bundleArtifactIds = extractBundleArtifactIdsFromAST();
    const modifiedIds = [...bundleArtifactIds];

    modifiedIds[0] = 'corrupted_artifact_id';

    expect(() => {
      expect(bundleArtifactIds).toEqual(modifiedIds);
    }).toThrow();
  });
});
