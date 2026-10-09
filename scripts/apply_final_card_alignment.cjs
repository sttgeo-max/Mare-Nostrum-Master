const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING FINAL CARD ALIGNMENT PASS ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// Target: The supplies/forces summary in Codex/Arma
const oldCardSummary = 'e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3 pt-2 relative z-10",children:[e.jsxs("div",{className:"flex items-center gap-2 text-xs font-serif-body text-[#F3E7C8]",children:[e.jsxs("span",{children:["Current Supplies: ",e.jsx("strong",{className:"font-mono text-amber-300",children:t.supplies})]}),e.jsx("span",{children:"·"}),e.jsxs("span",{children:["Forces Status: ",e.jsxs("strong",{className:"font-mono text-[#d4af37]",children:[t.legionHp,"/",t.maxLegionHp]})]})]})';

const newCardSummary = 'e.jsxs("div",{className:"grid grid-cols-2 gap-3 sm:gap-4 pt-3 relative z-10",children:[e.jsxs("div",{className:"flex flex-col items-center justify-center p-2 sm:p-3 bg-[#0B1424]/60 rounded-xl border border-[#C9A351]/30",children:[e.jsx("span",{className:"text-[8px] sm:text-[10px] font-cinzel text-[#C9A351] uppercase tracking-widest mb-1",children:"Supplies"}),e.jsx("strong",{className:"text-xl sm:text-2xl font-mono text-[#F6C75A] tabular-nums",children:t.supplies})]}),e.jsxs("div",{className:"flex flex-col items-center justify-center p-2 sm:p-3 bg-[#0B1424]/60 rounded-xl border border-[#C9A351]/30",children:[e.jsx("span",{className:"text-[8px] sm:text-[10px] font-cinzel text-[#C9A351] uppercase tracking-widest mb-1",children:"Legion Forces"}),e.jsxs("strong",{className:"text-xl sm:text-2xl font-mono text-[#F6C75A] tabular-nums",children:[t.legionHp,"/",t.maxLegionHp]})]})]}),e.jsxs("div",{className:"flex items-center justify-center pt-2",children:[';

// Note: I'm wrapping the button in a centered container too.

if (js.includes(oldCardSummary)) {
    js = js.replace(oldCardSummary, newCardSummary);
    
}

console.log("Validating updated bundle with esbuild...");
esbuild.transformSync(js, { loader: "jsx" });


fs.writeFileSync(bundlePath, js, "utf8");

// Sync to dist
const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
}

console.log("=== FINAL CARD ALIGNMENT PASS COMPLETE ===");
