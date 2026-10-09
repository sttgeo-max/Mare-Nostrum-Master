const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== DEFINITIVE ISANCHOR & COMBAT SAILS SCOPE FIX ===");

const masterPath = path.join(__dirname, '../public/assets/index-V33.js');
let code = fs.readFileSync(masterPath, 'utf8');

// 1. Declare isAnchor, isSol, isChiRho, isAquila, isTriton, isBull at the very top of renderMasterwork2DMedallionUnit
const targetFunc = 'const renderMasterwork2DMedallionUnit = (x, y, isPlayer, role = "flagship", faction = "constantine", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1, unitCategory = "ship", customEmblem = "") => {';

const replacementFunc = 'const renderMasterwork2DMedallionUnit = (x, y, isPlayer, role = "flagship", faction = "constantine", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1, unitCategory = "ship", customEmblem = "") => {  const fRawCheck = String(faction || "").toLowerCase();  const isAnchor = fRawCheck.includes("anchor") || fRawCheck.includes("marinus") || fRawCheck.includes("classis");  const isSol = fRawCheck.includes("sol") || fRawCheck.includes("sun");  const isChiRho = fRawCheck.includes("chi_rho") || fRawCheck.includes("labarum") || fRawCheck.includes("constantine");  const isAquila = fRawCheck.includes("eagle") || fRawCheck.includes("aquila");  const isTriton = fRawCheck.includes("triton") || fRawCheck.includes("neptune") || fRawCheck.includes("poseidon");  const isBull = fRawCheck.includes("bull") || fRawCheck.includes("dacia");';

if (code.includes(targetFunc)) {
  code = code.replace(targetFunc, replacementFunc);
  console.log("SUCCESS: Injected variable declarations at the start of renderMasterwork2DMedallionUnit.");
} else if (code.includes('const renderMasterwork2DMedallionUnit =') && code.includes('isAnchor = fRawCheck.includes')) {
  console.log("INFO: Medallion variables are already declared in the function scope.");
} else {
  console.error("ERROR: Could not locate renderMasterwork2DMedallionUnit function declaration target!");
  process.exit(1);
}

// 2. Make sure palette variables overrides are fully active
const paletteTarget = `  // Palette Derivations (Matching Medallion Jewels & Emblems)
  let sailGrad = "url(#sl_prp_rom)";
  let sailBorder = "#fef08a";
  let scutumGrad = "url(#shd_carm_rom)";
  let scutumBorder = "#fbbf24";
  let scutumEmblemColor = "#fef08a";
  let plumeColor = "#dc2626";
  let hullWoodL = "url(#hl_wd_l_rom)";
  let hullWoodR = "url(#hl_wd_r_rom)";
  let goldTrim = unitTier >= 4 ? "#fef08a" : "#fbbf24";
  let bronzeBase = "#a17e4d";
  let factionInsignia = "SPQR";`;

const paletteReplacement = `  // Palette Derivations (Matching Medallion Jewels & Emblems)
  let sailGrad = "url(#sl_prp_rom)";
  let sailBorder = "#fef08a";
  let scutumGrad = "url(#shd_carm_rom)";
  let scutumBorder = "#fbbf24";
  let scutumEmblemColor = "#fef08a";
  let plumeColor = "#dc2626";
  let hullWoodL = "url(#hl_wd_l_rom)";
  let hullWoodR = "url(#hl_wd_r_rom)";
  let goldTrim = unitTier >= 4 ? "#fef08a" : "#fbbf24";
  let bronzeBase = "#a17e4d";
  let factionInsignia = "SPQR";

  if (isAnchor) {
    sailGrad = "#1e3a8a";
    sailBorder = "#bae6fd";
    scutumGrad = "#1d4ed8";
    scutumBorder = "#60a5fa";
    scutumEmblemColor = "#ffffff";
    plumeColor = "#2563eb";
    hullWoodL = "#1e293b";
    hullWoodR = "#334155";
    factionInsignia = "CLASS";
  } else if (isSol) {
    sailGrad = "#ea580c";
    sailBorder = "#fef08a";
    scutumGrad = "#ea580c";
    scutumBorder = "#fbbf24";
    scutumEmblemColor = "#fef08a";
    plumeColor = "#ea580c";
    hullWoodL = "#451a03";
    hullWoodR = "#78350f";
    factionInsignia = "SOL";
  } else if (isChiRho) {
    sailGrad = "#581c87";
    sailBorder = "#fde047";
    scutumGrad = "#4a044e";
    scutumBorder = "#fbbf24";
    scutumEmblemColor = "#fde047";
    plumeColor = "#9333ea";
    hullWoodL = "#3b0764";
    hullWoodR = "#581c87";
    factionInsignia = "CHRXP";
  } else if (isAquila) {
    sailGrad = "#991b1b";
    sailBorder = "#fca5a5";
    scutumGrad = "#7f1d1d";
    scutumBorder = "#ea580c";
    scutumEmblemColor = "#fecaca";
    plumeColor = "#b91c1c";
    hullWoodL = "#450a0a";
    hullWoodR = "#7f1d1d";
    factionInsignia = "AQVLA";
  } else if (isTriton) {
    sailGrad = "#0369a1";
    sailBorder = "#bae6fd";
    scutumGrad = "#0284c7";
    scutumBorder = "#38bdf8";
    scutumEmblemColor = "#bae6fd";
    plumeColor = "#0284c7";
    hullWoodL = "#0c4a6e";
    hullWoodR = "#075985";
    factionInsignia = "TRITN";
  } else if (isBull) {
    sailGrad = "#78350f";
    sailBorder = "#fed7aa";
    scutumGrad = "#92400e";
    scutumBorder = "#fbbf24";
    scutumEmblemColor = "#fed7aa";
    plumeColor = "#b45309";
    hullWoodL = "#292524";
    hullWoodR = "#44403c";
    factionInsignia = "TAVRS";
  }`;

if (code.includes(paletteTarget)) {
  code = code.replace(paletteTarget, paletteReplacement);
  console.log("SUCCESS: Replaced palette derivations with medallion overrides.");

  const praetorianTarget = `if (isPraetorian) {`;
  const praetorianReplacement = `else if (isPraetorian) {`;
  if (code.includes(praetorianTarget)) {
    code = code.replace(praetorianTarget, praetorianReplacement);
    console.log("SUCCESS: Chained isPraetorian with else if.");
  }
} else if (code.includes('if (isAnchor) {')) {
  console.log("INFO: Palette overrides are already active.");
} else {
  console.error("ERROR: Could not locate palette target block!");
  process.exit(1);
}

// Write back and validate syntax with esbuild
fs.writeFileSync(masterPath, code, 'utf8');

try {
  esbuild.transformSync(code, { loader: 'jsx' });
  console.log("SUCCESS: esbuild verified master bundle syntax is 100% valid.");
} catch (e) {
  console.error("ERROR: esbuild syntax validation failed:", e.message);
  process.exit(1);
}

console.log("=== COMPLETED SCOPE AND DECLARATION FIX SUCCESSFULLY ===");
