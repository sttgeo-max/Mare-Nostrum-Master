/**
 * Apply Masterwork Icon System (All 50 Museum-Grade Illustrated SVGs)
 */
const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

const p1Text = fs.readFileSync(path.join(__dirname, "mw_icons_part1.cjs"), "utf8");
const p2Text = fs.readFileSync(path.join(__dirname, "mw_icons_part2.cjs"), "utf8");

const body1 = p1Text.replace("module.exports = {", "").replace(/};\s*$/, "").trim();
const body2 = p2Text.replace("module.exports = {", "").replace(/};\s*$/, "").trim();
const allMasterworkDefs = body1 + ",\n" + body2;

function applyMasterwork() {
  console.log("=== APPLYING COMPLETE MASTERWORK ICON SYSTEM UPGRADE ===");
  const targetPath = path.join(__dirname, "../public/assets/index-V33.js");
  let bundle = fs.readFileSync(targetPath, "utf8");

  const mwStartMarker = "// === MASTERWORK 50-ARTIFACT ILLUSTRATED SVG SYSTEM ===";
  const hdMarker = "for (const [k, v] of Object.entries(__hdSVGs)) {";

  let idx = bundle.indexOf(hdMarker);
  if (idx === -1) {
    throw new Error("Could not find __hdSVGs loop in bundle!");
  }

  // Find where the block ends (either after previous __masterworkSVGs loop or after hdSVGs loop)
  let endIdx;
  const existingMwIdx = bundle.indexOf(mwStartMarker, idx);
  if (existingMwIdx !== -1) {
    // Find the end of the second for loop after mwStartMarker
    const loop2 = bundle.indexOf("je[\"custom_\" + k.replace(/^art_/, \"\")] = v;\n}", existingMwIdx);
    if (loop2 !== -1) {
      endIdx = loop2 + "je[\"custom_\" + k.replace(/^art_/, \"\")] = v;\n}".length;
    } else {
      const loop2Alt = bundle.indexOf("je[\"custom_\" + k.replace(/^art_/, \"\")] = v;}", existingMwIdx);
      if (loop2Alt !== -1) {
        endIdx = loop2Alt + "je[\"custom_\" + k.replace(/^art_/, \"\")] = v;}".length;
      } else {
        const endBrace = bundle.indexOf("}", existingMwIdx);
        endIdx = bundle.indexOf("}", endBrace + 1) + 1;
      }
    }
  } else {
    // First time injection: replace just the hdSVGs loop
    const endBrace = bundle.indexOf("}", idx + hdMarker.length);
    endIdx = endBrace + 1;
  }

  const injection = `for (const [k, v] of Object.entries(__hdSVGs)) {
  je[k] = v;
  je[k.replace(/^custom_/, "")] = v;
}
// === MASTERWORK 50-ARTIFACT ILLUSTRATED SVG SYSTEM ===
const __masterworkSVGs = {
${allMasterworkDefs}
};
for (const [k, v] of Object.entries(__masterworkSVGs)) {
  je[k] = v;
  je[k.replace(/^art_/, "")] = v;
  je["custom_" + k] = v;
  je["custom_" + k.replace(/^art_/, "")] = v;
}`;

  bundle = bundle.slice(0, idx) + injection + bundle.slice(endIdx);

  // === MEDALLION REFINEMENT & LIBRARY CONSISTENCY PASS ===
  console.log("Applying Medallion Refinement & Library Consistency Pass...");

  // 1. Remove Sci-Fi Grid from Medallion Enamel Field in rt
  const sciFiGridPattern = /E&&e\.jsxs\("g",\{stroke:T\.highlight,strokeWidth:"0\.5",opacity:"0\.1",fill:"none",children:\[Array\.from\(\{length:12\}\)\.map\(\([^)]*\)=>[^\]]*\]\}\)/;
  const refinedPhysicalEnamel = `E&&e.jsxs("g",{opacity:"0.18",children:[e.jsx("circle",{cx:"100",cy:"100",r:"88",fill:T.enamelCore,opacity:"0.3"}),e.jsx("circle",{cx:"100",cy:"100",r:"86",fill:"none",stroke:T.highlight,strokeWidth:"0.8",opacity:"0.2"}),e.jsx("circle",{cx:"100",cy:"100",r:"84",fill:"none",stroke:T.shadow,strokeWidth:"1",opacity:"0.35"})]})`;

  if (sciFiGridPattern.test(bundle)) {
    bundle = bundle.replace(sciFiGridPattern, refinedPhysicalEnamel);
    
  }

  // 2. Refine Medallion Metal Colors in Ao (replace pure white chrome highlights with aged metals)
  bundle = bundle.replace(/highlight:"#ffffff",bezel:"#cbd5e1",shadow:"#0f172a",reliefHighlight:"#ffffff"/g, 'highlight:"#e2e8f0",bezel:"#cbd5e1",shadow:"#0f172a",reliefHighlight:"#f8fafc"');

  console.log("Validating updated bundle with esbuild...");
  esbuild.transformSync(bundle, { loader: "js" });
  

  fs.writeFileSync(targetPath, bundle, "utf8");
  console.log("SUCCESS: Written Masterwork bundle to " + targetPath);

  const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, "utf8");
    console.log("SUCCESS: Synced Masterwork bundle to " + distPath);
  }
}

if (require.main === module) {
  applyMasterwork();
}

module.exports = { applyMasterwork };
