const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== APPLYING NOTIFICATIONS TRAY SIMPLIFICATION & HUD TEST BUTTON RELOCATION ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. REMOVE BTN-HUD-TRACE FROM LOWER RIGHT HUD POD IF PRESENT
const oldTraceHudBtn = 'e.jsx(Vr,{id:"btn-hud-trace",onClick:()=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}window.__CombatTraceEngine?.copyTrace();},variant:"stone",emblem:"scroll",title:"Debug Trace: Copy Combat & Map Diagnostic Log",showGlow:!1}),';
if (js.includes(oldTraceHudBtn)) {
  js = js.replace(oldTraceHudBtn, "");
  console.log("-> Removed btn-hud-trace from lower right HUD pod.");
}

// 2. DEFAULT NOTIFICATION TRAY TO COMPACT VIEW MODE
const oldNotifState = '[F,I]=b.useState(!1),[E,k]=b.useState("detailed")';
const newNotifState = '[F,I]=b.useState(!1),[E,k]=b.useState("compact")';
if (js.includes(oldNotifState)) {
  js = js.replace(oldNotifState, newNotifState);
  console.log("-> Set notification tray default view mode to COMPACT.");
}

// 3. REDUCE NOTIFICATION TRAY CONTAINER DIMENSIONS & PADDING
const oldTrayContainer = 'w-[min(640px,calc(100vw-12px))] ${w?"drawer-expanded max-h-[min(90vh,680px)]":"max-h-[min(78vh,480px)]"} flex flex-col pointer-events-auto select-none overflow-hidden transition-all duration-300`';
const newTrayContainer = 'w-[min(420px,calc(100vw-16px))] sm:w-[440px] ${w?"drawer-expanded max-h-[min(50vh,350px)]":"max-h-[min(35vh,250px)]"} flex flex-col pointer-events-auto select-none overflow-hidden transition-all duration-300 shadow-[0_16px_36px_rgba(0,0,0,0.95)]`';

if (js.includes(oldTrayContainer)) {
  js = js.replace(oldTrayContainer, newTrayContainer);
  console.log("-> Reduced notification tray size footprint (compact height & width).");
}

// 4. SAFELY REPLACE HEAVY REPETITIVE "LATEST COMMUNIQUÉ" BANNER WITH NULL TO PRESERVE JSX ARRAY SYNTAX
const pTopPanel = js.indexOf('key:"top-notif-panel"');
if (pTopPanel !== -1) {
  const communiquéStartMarker = 'j&&e.jsxs("div",{className:"p-2.5 sm:p-3 mx-3 mt-2.5';
  const communiquéPos = js.indexOf(communiquéStartMarker, pTopPanel);
  if (communiquéPos !== -1) {
    const communiquéEndMarker = ' flex flex-1 overflow-y-auto';
    const communiquéEnd = js.indexOf(',e.jsx("div",{className:"flex-1 overflow-y-auto', communiquéPos);
    if (communiquéEnd !== -1) {
      const targetBlock = js.substring(communiquéPos, communiquéEnd);
      js = js.replace(targetBlock, 'false');
      console.log("-> Safely removed repetitive Latest Communiqué banner inside open drawer body.");
    }
  }
}

// 5. SIMPLIFY PADDING & LIST SPACING IN NOTIFICATION TRAY
js = js.replace('className:"flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar min-h-[140px]"', 'className:"flex-1 overflow-y-auto p-2 sm:p-2.5 space-y-1 custom-scrollbar min-h-[90px]"');
js = js.replace('className:"p-3 sm:p-3.5 border-b border-[#8b6508]/30 bg-[#07090e]/70 shrink-0"', 'className:"p-2 sm:p-2.5 border-b border-amber-900/40 bg-[#07090e]/80 shrink-0"');

// Validate syntax
console.log("Validating updated bundle with esbuild...");
try {
  esbuild.transformSync(js, { loader: "jsx" });
  console.log("OK: Syntax check clean. Final bundle size: " + js.length + " bytes.");
} catch (err) {
  console.error("[ERROR] ESBuild transform failed:", err);
  throw err;
}

fs.writeFileSync(bundlePath, js, "utf8");
console.log("SUCCESS: Written notification & HUD refinements to " + bundlePath);

const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
  console.log("SUCCESS: Synced notification & HUD refinements to " + distPath);
}
