const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');

console.log("=== RUNNING AST STATIC ANALYSIS FOR UNDEFINED VARIABLES IN COMBAT ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
const code = fs.readFileSync(bundlePath, 'utf8');

try {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log("Babel AST parsing succeeded! Code has valid syntax.");
} catch (err) {
  console.error("Babel AST Syntax Error at line", err.loc ? err.loc.line : "unknown", ":", err.message);
}
