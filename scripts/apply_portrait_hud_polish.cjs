const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING FINAL COMBAT HUD & PORTRAIT POLISH ===");

const filePath = path.join(__dirname, '../public/assets/index-V37.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Fix Sub-Header Truncation & Spacing
const targetSubHeader = `e.jsxs("div", {            className: "w-full flex items-center justify-between px-1 text-[8.5px] sm:text-[10px] max-w-4xl mx-auto border-t border-amber-500/25 pt-1",            children: [              e.jsx("div", {                className: "font-cinzel text-amber-300 font-bold tracking-widest uppercase truncate max-w-[95px] xs:max-w-[130px] sm:max-w-[200px]",                children: l ? \`SECTOR: \${l}\` : (isSea ? "MARE NOSTRUM" : "PROVINCIA ROMANA")              }),`;

const replacementSubHeader = `e.jsxs("div", {            className: "w-full flex items-center justify-between px-1 text-[8px] xs:text-[8.5px] sm:text-[10px] max-w-4xl mx-auto border-t border-amber-500/25 pt-1 gap-1",            children: [              e.jsx("div", {                className: "font-cinzel text-amber-300 font-black tracking-wider uppercase text-[8px] xs:text-[9px] sm:text-[10px] shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",                children: l ? (l.length > 20 ? l.substring(0, 18) + "…" : l) : (isSea ? "MARE NOSTRUM" : "PROVINCIA ROMANA")              }),`;

if (code.includes(targetSubHeader)) {
  code = code.replace(targetSubHeader, replacementSubHeader);
  console.log("✓ Successfully polished Sub-Header and removed unwanted location text truncation.");
} else {
  console.log("Searching alternative pattern for sub-header...");
  const pSub = code.indexOf('children: l ? `SECTOR: ${l}` : (isSea ? "MARE NOSTRUM" : "PROVINCIA ROMANA")');
  console.log("Found pSub at:", pSub);
  if (pSub !== -1) {
    const pContainer = code.lastIndexOf('e.jsxs("div", {', pSub);
    const pContainerEnd = code.indexOf('}),', pSub) + 3;
    console.log("Sub-header bounds:", pContainer, pContainerEnd);
  }
}

// 2. Polish the footer safe-area padding for iOS portrait
const targetFooterStyle = `paddingBottom: "max(calc(env(safe-area-inset-bottom, 0px) + 20px), 28px)",`;
const replacementFooterStyle = `paddingBottom: "max(calc(env(safe-area-inset-bottom, 0px) + 12px), 22px)",`;

if (code.includes(targetFooterStyle)) {
  code = code.replace(targetFooterStyle, replacementFooterStyle);
  console.log("✓ Refined bottom safe-area margin for iPhone portrait thumb ergonomics.");
}

// 3. Ensure Opposing Commander HP Gauge symmetry
const targetTopHudDiv = `className: "w-full flex items-center justify-between gap-1 sm:gap-4 max-w-4xl mx-auto"`;
const replacementTopHudDiv = `className: "w-full flex items-center justify-between gap-1.5 sm:gap-4 max-w-4xl mx-auto px-0.5"`;

if (code.includes(targetTopHudDiv)) {
  code = code.replace(targetTopHudDiv, replacementTopHudDiv);
  console.log("✓ Polished Commander vs Hostis header balance and symmetry.");
}

fs.writeFileSync(filePath, code, 'utf8');

// Validate syntax with esbuild
try {
  esbuild.buildSync({
    entryPoints: [filePath],
    outfile: '/tmp/test_bundle_polished.js',
    bundle: false,
    format: 'esm',
  });
  console.log("✓ ESBUILD VALIDATION PASSED: index-V37.js is completely clean and valid!");
} catch (err) {
  console.error("ESBUILD ERROR:", err.message);
  process.exit(1);
}
