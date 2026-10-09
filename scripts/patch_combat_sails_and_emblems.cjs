const fs = require('fs');
const path = require('path');

console.log("=== PATCHING COMBAT SAILS AND EMBLEMS IN BUNDLE ===");

const masterPath = path.join(__dirname, '../public/assets/index-V33.js');
let code = fs.readFileSync(masterPath, 'utf8');

// 1. Inject isAnchor, isSol, etc. under fRaw
const fRawTarget = `const fRaw = String(faction || "").toLowerCase();`;
const fRawReplacement = `const fRaw = String(faction || "").toLowerCase();
  const isAnchor = fRaw.includes("anchor") || fRaw.includes("marinus") || fRaw.includes("classis");
  const isSol = fRaw.includes("sol") || fRaw.includes("sun");
  const isChiRho = fRaw.includes("chi_rho") || fRaw.includes("labarum") || fRaw.includes("constantine");
  const isAquila = fRaw.includes("eagle") || fRaw.includes("aquila");
  const isTriton = fRaw.includes("triton") || fRaw.includes("neptune") || fRaw.includes("poseidon");
  const isBull = fRaw.includes("bull") || fRaw.includes("dacia");`;

if (code.includes(fRawTarget) && !code.includes("isAnchor = fRaw.includes")) {
  code = code.replace(fRawTarget, fRawReplacement);
  console.log("SUCCESS: Injected isAnchor, isSol, etc. definitions under fRaw.");
} else {
  console.log("Skipping step 1 (already injected or target not found).");
}

// 2. Override sailGrad and palette variables based on medallion type
const paletteTarget = `// Palette Derivations (Matching Medallion Jewels & Emblems)  let sailGrad = "url(#sl_prp_rom)";  let sailBorder = "#fef08a";  let scutumGrad = "url(#shd_carm_rom)";  let scutumBorder = "#fbbf24";  let scutumEmblemColor = "#fef08a";  let plumeColor = "#dc2626";  let hullWoodL = "url(#hl_wd_l_rom)";  let hullWoodR = "url(#hl_wd_r_rom)";  let goldTrim = unitTier >= 4 ? "#fef08a" : "#fbbf24";  let bronzeBase = "#a17e4d";  let factionInsignia = "SPQR";`;

const paletteReplacement = `// Palette Derivations (Matching Medallion Jewels & Emblems)  let sailGrad = "url(#sl_prp_rom)";  let sailBorder = "#fef08a";  let scutumGrad = "url(#shd_carm_rom)";  let scutumBorder = "#fbbf24";  let scutumEmblemColor = "#fef08a";  let plumeColor = "#dc2626";  let hullWoodL = "url(#hl_wd_l_rom)";  let hullWoodR = "url(#hl_wd_r_rom)";  let goldTrim = unitTier >= 4 ? "#fef08a" : "#fbbf24";  let bronzeBase = "#a17e4d";  let factionInsignia = "SPQR";

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
  console.log("SUCCESS: Patched palette variables with medallion overrides.");

  // Also chain existing isPraetorian with else if
  const praetorianTarget = `if (isPraetorian) {`;
  const praetorianReplacement = `else if (isPraetorian) {`;
  if (code.includes(praetorianTarget)) {
    code = code.replace(praetorianTarget, praetorianReplacement);
    console.log("SUCCESS: Chained isPraetorian with else if.");
  }
} else {
  console.log("Skipping step 2 (already overridden or target not found).");
}

// 3. Replace the actual sail emblem rendering block with the SVG designs
const emblemTarget = `              // Faction Specific Insignia & Crest Wreath on Sail
              e.jsxs("g", {
                transform: "translate(0, -22)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "none", stroke: sailBorder, strokeWidth: "1.6", strokeDasharray: "4 2" }),
                  e.jsx("text", {
                    x: "0",
                    y: "3.2",
                    textAnchor: "middle",
                    fill: sailBorder,
                    fontSize: "7",
                    fontFamily: "Cinzel, serif",
                    fontWeight: "900",
                    letterSpacing: "0.6",
                    children: factionInsignia
                  })
                ]
              }),`;

const emblemReplacement = `              // Faction Specific Insignia & Crest Wreath on Sail
              e.jsxs("g", {
                transform: "translate(0, -22)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "rgba(0,0,0,0.25)", stroke: sailBorder, strokeWidth: "1.6", strokeDasharray: "4 2" }),
                  isAnchor ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-6", r: "2", fill: "none", stroke: sailBorder, strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "0", y1: "-4", x2: "0", y2: "7", stroke: sailBorder, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-5", y1: "-2", x2: "5", y2: "-2", stroke: sailBorder, strokeWidth: "1.8", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -6,2 Q 0,10 6,2", fill: "none", stroke: sailBorder, strokeWidth: "1.8", strokeLinecap: "round" })
                    ]
                  }) : (isSol ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "4", fill: sailBorder }),
                      [-45, 0, 45, 90, 135, 180, 225, 270].map((deg, ri) => e.jsx("line", {
                        key: "sunray_" + ri,
                        x1: "0", y1: "0",
                        x2: Math.cos(deg * Math.PI / 180) * 8,
                        y2: Math.sin(deg * Math.PI / 180) * 8,
                        stroke: sailBorder, strokeWidth: "1.5", strokeLinecap: "round"
                      }))
                    ]
                  }) : (isChiRho ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -0.5,7 L -0.5,-8 C 3.5,-8 3.5,-3 -0.5,-3", fill: "none", stroke: sailBorder, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-6", y1: "4", x2: "6", y2: "-4", stroke: sailBorder, strokeWidth: "1.8", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-6", y1: "-4", x2: "6", y2: "4", stroke: sailBorder, strokeWidth: "1.8", strokeLinecap: "round" })
                    ]
                  }) : (isAquila ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M 0,-7 L -3,-2 L -9,-6 L -7,1 L -3,3 L 0,8 L 3,3 L 7,1 L 9,-6 L 3,-2 Z", fill: sailBorder }),
                      e.jsx("circle", { cx: "0", cy: "-7", r: "2.5", fill: sailBorder })
                    ]
                  }) : (isTriton ? e.jsxs("g", {
                    children: [
                      e.jsx("line", { x1: "0", y1: "-8", x2: "0", y2: "8", stroke: sailBorder, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -5,-3 L -5,-8 L -2,-8 L -2,-4 M 5,-3 L 5,-8 L 2,-8 L 2,-4 M -6,-3 Q 0,2 6,-3", fill: "none", stroke: sailBorder, strokeWidth: "1.5", strokeLinecap: "round" })
                    ]
                  }) : (isBull ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -6,-5 Q -9,-11 -4,-9 Q 0,-5 0,-1 Q 0,-5 4,-9 Q 9,-11 6,-5 L 4,3 Q 0,7 -4,3 Z", fill: sailBorder, stroke: "#78350f", strokeWidth: "0.8" })
                    ]
                  }) : e.jsx("text", {
                    x: "0",
                    y: "3.2",
                    textAnchor: "middle",
                    fill: sailBorder,
                    fontSize: "7",
                    fontFamily: "Cinzel, serif",
                    fontWeight: "900",
                    letterSpacing: "0.6",
                    children: factionInsignia
                  }))))))
                ]
              }),`;

if (code.includes(emblemTarget)) {
  code = code.replace(emblemTarget, emblemReplacement);
  console.log("SUCCESS: Replaced custom sail emblem rendering with 2.5D designs.");
} else {
  console.log("Skipping step 3 (already replaced or target emblem rendering block not found).");
}

fs.writeFileSync(masterPath, code, 'utf8');
console.log("=== COMPLETED ALL PATCHES ===");
