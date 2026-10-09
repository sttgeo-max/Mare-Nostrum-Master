import { describe, it, expect } from 'vitest';
import { ENEMIES } from '../data/enemies';
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
      if (node.operator === '!') {
        const argVal = astToValue(node.argument);
        return !argVal;
      }
      throw new Error(`Unsupported unary expression operator: ${node.operator}`);

    default:
      throw new Error(`Unsupported AST node type: ${node.type}`);
  }
}

function extractBundleEnemiesFromAST() {
  const code = fs.readFileSync('public/assets/index-V37.js', 'utf8');
  const ast = parser.parse(code, { sourceType: 'module' });

  let tsInit: any = null;
  function walk(node: any) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'VariableDeclarator' && node.id && node.id.name === 'Ts') {
      tsInit = node.init;
      return;
    }
    for (const key in node) {
      if (tsInit) return;
      if (node[key] && typeof node[key] === 'object') {
        walk(node[key]);
      }
    }
  }
  walk(ast);

  if (!tsInit) {
    throw new Error('Variable Ts (enemies) not found in V37 bundle AST');
  }
  return astToValue(tsInit);
}

describe('V37 Enemy Data AST Extraction & Verification', () => {
  it('extracts Ts from bundle AST and verifies exact deep structural equality with ENEMIES', () => {
    const bundleEnemies = extractBundleEnemiesFromAST();
    expect(bundleEnemies).toBeDefined();
    expect(Array.isArray(bundleEnemies)).toBe(true);
    expect(bundleEnemies.length).toBe(68);
    expect(ENEMIES.length).toBe(68);

    expect(bundleEnemies).toEqual(ENEMIES);
  });

  it('fails closed on modified enemy data (negative test on existing property maxHp)', () => {
    const bundleEnemies = extractBundleEnemiesFromAST();
    const modifiedEnemies = JSON.parse(JSON.stringify(bundleEnemies));

    modifiedEnemies[0].maxHp = modifiedEnemies[0].maxHp + 999;

    expect(() => {
      expect(bundleEnemies).toEqual(modifiedEnemies);
    }).toThrow();
  });
});
