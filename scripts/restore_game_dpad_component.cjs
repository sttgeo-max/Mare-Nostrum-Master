const fs = require('fs');
const path = require('path');

console.log("=== RESTORING GAMEDPAD COMPONENT TO BUNDLES ===");

const c0Path = path.join(__dirname, '../c0_dump.js');
if (!fs.existsSync(c0Path)) {
  console.error("Missing c0_dump.js!");
  process.exit(1);
}

const c0Code = fs.readFileSync(c0Path, 'utf8');

// Extract GameDPad component code from c0_dump.js
let pStart = c0Code.indexOf('const GameDPad =');
let pEnd = c0Code.indexOf('window.GameDPad = GameDPad;', pStart);

if (pStart === -1 || pEnd === -1) {
  console.error("Failed to locate GameDPad in c0_dump.js");
  process.exit(1);
}

const dpadCode = c0Code.substring(pStart, pEnd + 'window.GameDPad = GameDPad;'.length);
console.log("Extracted GameDPad code length:", dpadCode.length);

// Read current master bundle public/assets/index-V33.js
const masterPath = path.join(__dirname, '../public/assets/index-V33.js');
let bundleCode = fs.readFileSync(masterPath, 'utf8');

// Inject dpadCode right after import { j as _e_raw ... } line or before main components
if (!bundleCode.includes('window.GameDPad = GameDPad')) {
  let importIdx = bundleCode.indexOf('import{j as _e_raw');
  if (importIdx === -1) importIdx = bundleCode.indexOf('import{j as e');

  if (importIdx !== -1) {
    let beforeImport = bundleCode.substring(0, importIdx);
    let afterImport = bundleCode.substring(importIdx);
    bundleCode = beforeImport + "\n" + dpadCode + "\n" + afterImport;
    fs.writeFileSync(masterPath, bundleCode, 'utf8');
    console.log("SUCCESS: Re-injected GameDPad component into public/assets/index-V33.js!");
  } else {
    bundleCode = dpadCode + "\n" + bundleCode;
    fs.writeFileSync(masterPath, bundleCode, 'utf8');
    console.log("SUCCESS: Prepended GameDPad component to public/assets/index-V33.js!");
  }
} else {
  console.log("GameDPad is already present in public/assets/index-V33.js");
}

// Now sync master bundle across all index-V*.js files in public/assets and dist/assets
const syncScriptPath = path.join(__dirname, 'sync_all_bundle_versions.cjs');
if (fs.existsSync(syncScriptPath)) {
  require(syncScriptPath);
}

console.log("=== COMPLETED GAMEDPAD RESTORATION ===");
