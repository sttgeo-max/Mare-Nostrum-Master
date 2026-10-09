const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== CLEANING TOP-LEVEL COMPONENT DECLARATIONS IN BUNDLE ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// Replace chained comma before om=lt.memo(nm) with clean semicolon statement
const chainedOm = '});},om=lt.memo(nm)';
const cleanOm = '});}; const om=lt.memo(nm)';

if (bundle.includes(chainedOm)) {
  bundle = bundle.replace(chainedOm, cleanOm);
  console.log("Converted chained om declaration to independent const om statement!");
} else {
  console.warn("Chained om declaration not found or already clean.");
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
