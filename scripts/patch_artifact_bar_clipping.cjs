const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== PATCHING ARTIFACTS BAR CLIPPING & MOBILE RESPONSIVENESS ===");

const masterPath = path.join(__dirname, '../public/assets/index-V33.js');
let code = fs.readFileSync(masterPath, 'utf8');

// 1. First Replacement: "INVENTORY" Category Bar inside ArmamentModal
const target1 = `armaTab==="INVENTORY"&&e.jsxs("div",{className:"space-y-4 animate-fade-in",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-1.5 pt-1",children:[e.jsxs("span",{className:"text-[10px] font-bold text-[#d4af37] flex items-center gap-1 mr-1"`;
const replacement1 = `armaTab==="INVENTORY"&&e.jsxs("div",{className:"space-y-4 animate-fade-in",children:[e.jsxs("div",{className:"flex items-center gap-1.5 pt-1 overflow-x-auto whitespace-nowrap no-scrollbar scrollbar-none max-w-full pb-1",children:[e.jsxs("span",{className:"text-[10px] font-bold text-[#d4af37] flex items-center gap-1 mr-1 shrink-0"`;

// Wait, let's also patch the buttons mapping for the first bar to add shrink-0
const buttonTarget1 = `].map(C=>e.jsx("button",{type:"button",onClick:()=>{m(C.id),y(null)},className:\`text-[10px] sm:text-[11px] font-bold font-cinzel px-3 py-1.5 rounded-xl border transition-all cursor-pointer`;
const buttonReplacement1 = `].map(C=>e.jsx("button",{type:"button",onClick:()=>{m(C.id),y(null)},className:\`shrink-0 text-[10px] sm:text-[11px] font-bold font-cinzel px-3 py-1.5 rounded-xl border transition-all cursor-pointer`;

if (code.includes(target1)) {
  code = code.replace(target1, replacement1);
  console.log("SUCCESS: Patched ArmamentModal category bar layout to scroll horizontally.");
} else {
  console.log("Error: Target 1 not found!");
}

if (code.includes(buttonTarget1)) {
  code = code.replace(buttonTarget1, buttonReplacement1);
  console.log("SUCCESS: Injected shrink-0 into ArmamentModal category bar buttons.");
} else {
  console.log("Error: Button Target 1 not found!");
}

// 2. Second Replacement: Relics Codex list category bar
const target2 = `e.jsx(\"div\",{className:\"flex flex-wrap items-center gap-1.5\",children:[{id:\"ALL\",label:\"ALL RELICS\"}`;
const replacement2 = `e.jsx(\"div\",{className:\"flex items-center gap-1.5 overflow-x-auto whitespace-nowrap no-scrollbar scrollbar-none max-w-full pb-1\",children:[{id:\"ALL\",label:\"ALL RELICS\"}`;

const buttonTarget2 = `className:\`px-2.5 py-1.5 rounded-lg font-cinzel text-[9.5px] font-bold tracking-wider transition-all cursor-pointer`;
const buttonReplacement2 = `className:\`shrink-0 px-2.5 py-1.5 rounded-lg font-cinzel text-[9.5px] font-bold tracking-wider transition-all cursor-pointer`;

if (code.includes(target2)) {
  code = code.replace(target2, replacement2);
  console.log("SUCCESS: Patched Codex relics list category bar to scroll horizontally.");
} else {
  console.log("Error: Target 2 not found!");
}

if (code.includes(buttonTarget2)) {
  code = code.replace(buttonTarget2, buttonReplacement2);
  console.log("SUCCESS: Injected shrink-0 into Codex category bar buttons.");
} else {
  console.log("Error: Button Target 2 not found!");
}

// Write master file back
fs.writeFileSync(masterPath, code, 'utf8');

// Validate with esbuild
try {
  esbuild.transformSync(code, { loader: 'jsx' });
  console.log("OK: master index-V33.js is 100% syntactically valid.");
} catch (e) {
  console.error("ESBUILD SYNTAX ERROR ON MASTER FILE:", e.message);
  process.exit(1);
}

console.log("=== COMPLETED ALL NOTIFICATIONS & HUD CLIPPING REFINEMENTS ===");
