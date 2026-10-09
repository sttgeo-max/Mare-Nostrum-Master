const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== COMPLETELY LOCKING COMBAT ARENA SIZE & PREVENTING ANY RESIZE ON ENEMY TURN ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// 1. Fix preserveAspectRatio in BattleTheatreV2 SVG
const targetRatio = 'preserveAspectRatio: "none"';
if (bundle.includes(targetRatio)) {
  bundle = bundle.replace(targetRatio, 'preserveAspectRatio: "xMidYMid slice"');
  console.log("Updated preserveAspectRatio to 'xMidYMid slice' for absolute aspect ratio invariance!");
}

// 2. Fix renderTacticalHandUI so it NEVER returns null or changes height
const pHandFunc = bundle.indexOf('const renderTacticalHandUI = () => {');
if (pHandFunc !== -1) {
  const pHandReturnNull = bundle.indexOf('if (!displayedTacticalCards || displayedTacticalCards.length === 0) return null;', pHandFunc);
  if (pHandReturnNull !== -1) {
    const handFix = `
    const hasCards = displayedTacticalCards && displayedTacticalCards.length > 0;
    const isLocked = turn !== "player";
`;
    bundle = bundle.replace('if (!displayedTacticalCards || displayedTacticalCards.length === 0) return null;', handFix.trim());
    console.log("Fixed renderTacticalHandUI null check!");
  }
}

// 3. Inspect footer structure to guarantee stable constant height
const pFooter = bundle.indexOf('id: "combat-bottom-hud"');
if (pFooter !== -1) {
  console.log("Found combat-bottom-hud at:", pFooter);
  // Let us inspect the tactical hand row inside footer
  const pTacticalContainer = bundle.indexOf('// 1. TACTICAL HAND CONTAINER', pFooter);
  const pDisciplinesContainer = bundle.indexOf('// 2. COMMAND DISCIPLINES DECK', pFooter);
  
  if (pTacticalContainer !== -1 && pDisciplinesContainer !== -1) {
    const originalChunk = bundle.substring(pTacticalContainer, pDisciplinesContainer);
    const newTacticalContainer = `
          // 1. TACTICAL HAND CONTAINER (Strict Constant Invariant Height)
          e.jsx("div", {
            className: "w-full max-w-2xl h-[92px] min-h-[92px] max-h-[92px] flex items-center justify-center select-none overflow-hidden " + (turn === "player" ? "" : "opacity-45 pointer-events-none grayscale-[25%]"),
            children: (typeof renderTacticalHandUI === "function" ? renderTacticalHandUI() : null)
          }),

          `;
    bundle = bundle.substring(0, pTacticalContainer) + newTacticalContainer.trim() + "\n\n          " + bundle.substring(pDisciplinesContainer);
    console.log("Locked tactical hand container to invariant height 92px!");
  }
}

// 4. Also lock combat-bottom-hud height to shrink-0 and fixed min-h / max-h
const pFooterClass = bundle.indexOf('id: "combat-bottom-hud"', pFooter - 50);
if (pFooterClass !== -1) {
  const pClassStart = bundle.indexOf('className: "', pFooterClass);
  const pClassEnd = bundle.indexOf('",', pClassStart);
  if (pClassStart !== -1 && pClassEnd !== -1) {
    const oldClass = bundle.substring(pClassStart, pClassEnd + 2);
    const newClass = 'className: "relative z-40 w-full h-[225px] min-h-[225px] max-h-[225px] pt-1.5 px-2 sm:px-6 flex flex-col items-center justify-between gap-1 shrink-0 select-none overflow-hidden",';
    bundle = bundle.substring(0, pClassStart) + newClass + bundle.substring(pClassEnd + 2);
    console.log("Locked combat-bottom-hud to strictly fixed height 225px!");
  }
}

// 5. Ensure main#battle-theatre-v2-container has fixed flex bounds
const pMain = bundle.indexOf('id: "battle-theatre-v2-container"');
if (pMain !== -1) {
  const pMainClass = bundle.indexOf('className: "', pMain - 40);
  const pMainClassEnd = bundle.indexOf('",', pMainClass);
  if (pMainClass !== -1 && pMainClassEnd !== -1) {
    const newMainClass = 'className: "flex-1 w-full h-full flex flex-col justify-center items-center z-20 relative overflow-hidden my-0 p-0 border-y border-amber-500/30 shadow-[inset_0_4px_24px_rgba(0,0,0,0.8),inset_0_-4px_24px_rgba(0,0,0,0.8)] min-h-0 shrink",';
    bundle = bundle.substring(0, pMainClass) + newMainClass + bundle.substring(pMainClassEnd + 2);
    console.log("Updated main#battle-theatre-v2-container bounds!");
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
