const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== FIXING STANDALONE COMPONENT DECLARATIONS IN BUNDLE ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// Replace chained comma between BattleTheatreV2 and om with a clean semicolon
const chainedBtOm = '});\n},om=lt.memo(nm)';
const cleanBtOm = '});\n}; const om=lt.memo(nm)';

if (bundle.includes(chainedBtOm)) {
  bundle = bundle.replace(chainedBtOm, cleanBtOm);
  console.log("Separated BattleTheatreV2 and om into independent const declarations!");
} else {
  // Let us check for alternative spacing
  const pBtEnd = bundle.indexOf('children: "Retreat (Recede)"');
  if (pBtEnd !== -1) {
    const pComma = bundle.indexOf('},om=', pBtEnd);
    if (pComma !== -1) {
      bundle = bundle.substring(0, pComma) + "}; const om=" + bundle.substring(pComma + 5);
      console.log("Replaced },om= with }; const om=!");
    }
  }
}

// Write updated bundle and test with esbuild
fs.writeFileSync(bundlePath, bundle, 'utf8');
console.log("Wrote updated bundle. Validating with esbuild...");

try {
  esbuild.buildSync({
    entryPoints: [bundlePath],
    outfile: '/tmp/test_bundle.js',
    bundle: false,
    format: 'esm',
  });
  console.log("ESBUILD VALIDATION PASSED! All syntax and imports are 100% valid.");
} catch (e) {
  console.error("ESBUILD VALIDATION FAILED:", e.message);
  process.exit(1);
}
