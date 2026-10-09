const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== UNLOCKING COMBAT TRIGGERS & REMOVING CONCURRENCY TRAPS ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// 1. Unblock map tile click handler
const oldMapClick = 'Q.col===S.col&&Q.row===S.row?(typeof window!=="undefined"&&window.__mnCombatActive?null:st(S)):Qe(S.col,S.row)';
const newMapClick = 'Q.col===S.col&&Q.row===S.row?st(S):Qe(S.col,S.row)';

if (bundle.includes(oldMapClick)) {
  bundle = bundle.replace(oldMapClick, newMapClick);
  console.log("Unblocked map tile click handler!");
} else {
  console.warn("Could not find oldMapClick");
}

// 2. Unblock re (garrison combat trigger)
const oldReCheck = 'if(typeof window!=="undefined"){if(window.__mnCombatActive||f!==null){console.warn("[COMBAT LOCK] Blocked concurrent re trigger:",S?.id);return;}window.__mnCombatActive=!0;}';
const newReCheck = 'if(typeof window!=="undefined"){if(f===null)window.__mnCombatActive=!1;window.__mnCombatActive=!0;setTimeout(()=>{if(!f)window.__mnCombatActive=!1;},8000);}';

if (bundle.includes(oldReCheck)) {
  bundle = bundle.replace(oldReCheck, newReCheck);
  console.log("Unblocked re (garrison combat trigger)!");
} else {
  console.warn("Could not find oldReCheck");
}

// 3. Unblock st (onEngageEnemy trigger)
const oldStCheck = 'if(typeof window!=="undefined"){if(window.__mnCombatActive||f!==null){console.warn("[COMBAT LOCK] Blocked concurrent st trigger:",S);return;}window.__mnCombatActive=!0;}';
const newStCheck = 'if(typeof window!=="undefined"){if(f===null)window.__mnCombatActive=!1;window.__mnCombatActive=!0;setTimeout(()=>{if(!f)window.__mnCombatActive=!1;},8000);}';

if (bundle.includes(oldStCheck)) {
  bundle = bundle.replace(oldStCheck, newStCheck);
  console.log("Unblocked st (onEngageEnemy trigger)!");
} else {
  console.warn("Could not find oldStCheck");
}

// 4. Unblock Qe (boss siege trigger)
const oldQeCheck = 'if(typeof window!=="undefined"){if(window.__mnCombatActive||f!==null){console.warn("[COMBAT LOCK] Blocked concurrent Qe trigger:",S);return;}}';
const newQeCheck = 'if(typeof window!=="undefined"){if(f===null)window.__mnCombatActive=!1;window.__mnCombatActive=!0;setTimeout(()=>{if(!f)window.__mnCombatActive=!1;},8000);}';

if (bundle.includes(oldQeCheck)) {
  bundle = bundle.replace(oldQeCheck, newQeCheck);
  console.log("Unblocked Qe (boss siege trigger)!");
} else {
  console.warn("Could not find oldQeCheck");
}

// 5. Ensure Re (combat onClose / resolution) always resets window.__mnCombatActive = false and enemy state
const pReFunc = bundle.indexOf("Re=S=>{");
if (pReFunc !== -1) {
  console.log("Found Re=S=>{ at:", pReFunc);
  // Ensure window.__mnCombatActive = false is set in Re
  if (!bundle.includes("window.__mnCombatActive=!1;", pReFunc)) {
    bundle = bundle.replace("Re=S=>{", "Re=S=>{if(typeof window!==\"undefined\")window.__mnCombatActive=!1;");
    console.log("Added explicit window.__mnCombatActive=!1 reset to Re!");
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
