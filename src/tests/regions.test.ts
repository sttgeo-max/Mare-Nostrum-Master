import { describe, it, expect } from 'vitest';
import { REGIONS } from '../data/regions';
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

function extractBundleRegionsFromAST() {
  const code = fs.readFileSync('public/assets/index-V37.js', 'utf8');
  const ast = parser.parse(code, { sourceType: 'module' });

  let pnInit: any = null;
  function walk(node: any) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'VariableDeclarator' && node.id && node.id.name === 'Pn') {
      pnInit = node.init;
      return;
    }
    for (const key in node) {
      if (pnInit) return;
      if (node[key] && typeof node[key] === 'object') {
        walk(node[key]);
      }
    }
  }
  walk(ast);

  if (!pnInit) {
    throw new Error('Variable Pn not found in V37 bundle AST');
  }
  return astToValue(pnInit);
}

describe('V37 Map Region Data AST Extraction & Verification', () => {
  it('extracts Pn from bundle AST and verifies exact deep structural equality with REGIONS', () => {
    const bundleRegions = extractBundleRegionsFromAST();
    expect(bundleRegions).toBeDefined();
    expect(Array.isArray(bundleRegions)).toBe(true);
    expect(bundleRegions.length).toBe(4);
    expect(REGIONS.length).toBe(4);

    expect(bundleRegions).toEqual(REGIONS);
  });

  it('fails closed on modified region data (negative test on existing property name)', () => {
    const bundleRegions = extractBundleRegionsFromAST();
    const modifiedRegions = JSON.parse(JSON.stringify(bundleRegions));

    modifiedRegions[0].name = 'Corrupted Western Basin';

    expect(() => {
      expect(bundleRegions).toEqual(modifiedRegions);
    }).toThrow();
  });
});
