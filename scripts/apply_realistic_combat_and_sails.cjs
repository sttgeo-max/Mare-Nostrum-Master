const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING HIGH-FIDELITY ROMAN EMPIRE REALISTIC COMBAT AND CUSTOM SAILS ===");

const masterPath = path.join(__dirname, '../public/assets/index-V33.js');
let code = fs.readFileSync(masterPath, 'utf8');

// 1. Correct Player Medallion Faction Mappings
console.log("1. Mapping player medallions correctly so they don't map to Greece/Usurper...");

const anchorTarget = 'const isAnchor = fRawCheck.includes("anchor") || fRawCheck.includes("marinus") || fRawCheck.includes("classis");';
const anchorReplace = 'const isAnchor = fRawCheck.includes("anchor") || fRawCheck.includes("marinus") || fRawCheck.includes("classis") || fRawCheck.includes("lapis_blue") || fRawCheck.includes("navis");';

const aquilaTarget = 'const isAquila = fRawCheck.includes("eagle") || fRawCheck.includes("aquila");';
const aquilaReplace = 'const isAquila = fRawCheck.includes("eagle") || fRawCheck.includes("aquila") || fRawCheck.includes("crimson_blood") || fRawCheck.includes("legio");';

const solTarget = 'const isSol = fRawCheck.includes("sol") || fRawCheck.includes("sun");';
const solReplace = 'const isSol = fRawCheck.includes("sol") || fRawCheck.includes("sun") || fRawCheck.includes("gold") || fRawCheck.includes("civitas");';

if (code.includes(anchorTarget)) {
  code = code.replace(anchorTarget, anchorReplace);
  console.log("-> Anchor mapped successfully.");
}
if (code.includes(aquilaTarget)) {
  code = code.replace(aquilaTarget, aquilaReplace);
  console.log("-> Aquila mapped successfully.");
}
if (code.includes(solTarget)) {
  code = code.replace(solTarget, solReplace);
  console.log("-> Sol mapped successfully.");
}

// Remove crimson_blood from isUsurper
const usurperTarget = 'const isUsurper = fRaw.includes("usurper") || fRaw.includes("licinius") || fRaw.includes("sanguine") || fRaw.includes("crimson") || fRaw.includes("hostis") || fRaw.includes("rubrum") || fRaw.includes("crimson_blood") || fRaw.includes("porphyry_red");';
const usurperReplace = 'const isUsurper = fRaw.includes("usurper") || fRaw.includes("licinius") || fRaw.includes("sanguine") || fRaw.includes("crimson") || fRaw.includes("hostis") || fRaw.includes("rubrum") || fRaw.includes("porphyry_red");';
if (code.includes(usurperTarget)) {
  code = code.replace(usurperTarget, usurperReplace);
  console.log("-> Removed crimson_blood from isUsurper.");
}

// Remove lapis_blue from isGreek
const greekTarget = 'const isGreek = fRaw.includes("greek") || fRaw.includes("hellas") || fRaw.includes("achaea") || fRaw.includes("athen") || fRaw.includes("sparta") || fRaw.includes("macedon") || fRaw.includes("lapis") || fRaw.includes("aegean") || fRaw.includes("sapphire") || fRaw.includes("blue") || fRaw.includes("navis") || fRaw.includes("lapis_blue") || fRaw.includes("teal_sea");';
const greekReplace = 'const isGreek = fRaw.includes("greek") || fRaw.includes("hellas") || fRaw.includes("achaea") || fRaw.includes("athen") || fRaw.includes("sparta") || fRaw.includes("macedon") || fRaw.includes("lapis") || fRaw.includes("aegean") || fRaw.includes("sapphire");';
if (code.includes(greekTarget)) {
  code = code.replace(greekTarget, greekReplace);
  console.log("-> Removed lapis_blue from isGreek.");
}

// 2. Enhance Sail Custom SVG Insignia Block
console.log("2. Injecting comprehensive custom SVG sail emblems for all 13 medallions/factions...");

// FIRST BLOCK: inside render2DShip (using goldTrim and isPirate/isPunic checks)
const firstBlockTarget = `isAnchor ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-6", r: "2", fill: "none", stroke: goldTrim, strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "0", y1: "-4", x2: "0", y2: "7", stroke: goldTrim, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-5", y1: "-2", x2: "5", y2: "-2", stroke: goldTrim, strokeWidth: "1.8", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -6,2 Q 0,10 6,2", fill: "none", stroke: goldTrim, strokeWidth: "1.8", strokeLinecap: "round" })
                    ]
                  }) : (isSol ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "4", fill: goldTrim }),
                      [-45, 0, 45, 90, 135, 180, 225, 270].map((deg, ri) => e.jsx("line", {
                        key: "sunray_" + ri,
                        x1: "0", y1: "0",
                        x2: Math.cos(deg * Math.PI / 180) * 8,
                        y2: Math.sin(deg * Math.PI / 180) * 8,
                        stroke: goldTrim, strokeWidth: "1.5", strokeLinecap: "round"
                      }))
                    ]
                  }) : (isChiRho ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -0.5,7 L -0.5,-8 C 3.5,-8 3.5,-3 -0.5,-3", fill: "none", stroke: goldTrim, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-6", y1: "4", x2: "6", y2: "-4", stroke: goldTrim, strokeWidth: "1.8", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-6", y1: "-4", x2: "6", y2: "4", stroke: goldTrim, strokeWidth: "1.8", strokeLinecap: "round" })
                    ]
                  }) : (isAquila ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M 0,-7 L -3,-2 L -9,-6 L -7,1 L -3,3 L 0,8 L 3,3 L 7,1 L 9,-6 L 3,-2 Z", fill: goldTrim }),
                      e.jsx("circle", { cx: "0", cy: "-7", r: "2.5", fill: goldTrim })
                    ]
                  }) : (isTriton ? e.jsxs("g", {
                    children: [
                      e.jsx("line", { x1: "0", y1: "-8", x2: "0", y2: "8", stroke: goldTrim, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -5,-3 L -5,-8 L -2,-8 L -2,-4 M 5,-3 L 5,-8 L 2,-8 L 2,-4 M -6,-3 Q 0,2 6,-3", fill: "none", stroke: goldTrim, strokeWidth: "1.5", strokeLinecap: "round" })
                    ]
                  }) : (isBull ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -6,-5 Q -9,-11 -4,-9 Q 0,-5 0,-1 Q 0,-5 4,-9 Q 9,-11 6,-5 L 4,3 Q 0,7 -4,3 Z", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" })
                    ]
                  }) : (isPirate ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-2", r: "4", fill: "#ffffff" }),
                      e.jsx("circle", { cx: "-1.5", cy: "-2", r: "1", fill: "#000000" }),
                      e.jsx("circle", { cx: "1.5", cy: "-2", r: "1", fill: "#000000" }),
                      e.jsx("line", { x1: "-5", y1: "5", x2: "5", y2: "-5", stroke: "#ffffff", strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "-5", y1: "-5", x2: "5", y2: "5", stroke: "#ffffff", strokeWidth: "1.5" })
                    ]
                  }) : (isPunic ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-3", r: "3.5", fill: goldTrim }),
                      e.jsx("path", { d: "M -6,2 Q 0,7 6,2 Q 0,4 -6,2 Z", fill: goldTrim })
                    ]
                  }) : e.jsx("text", {
                    x: "0", y: "3", textAnchor: "middle", fill: goldTrim, fontSize: "7.5", fontFamily: "Cinzel, serif", fontWeight: "900", letterSpacing: "0.8", children: "SPQR"
                  }))))))))`;

const firstBlockReplace = `isAnchor ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-6", r: "2", fill: "none", stroke: goldTrim, strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "0", y1: "-4", x2: "0", y2: "7", stroke: goldTrim, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-5", y1: "-2", x2: "5", y2: "-2", stroke: goldTrim, strokeWidth: "1.8", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -6,2 Q 0,10 6,2", fill: "none", stroke: goldTrim, strokeWidth: "1.8", strokeLinecap: "round" })
                    ]
                  }) : (isSol ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "4", fill: goldTrim }),
                      [-45, 0, 45, 90, 135, 180, 225, 270].map((deg, ri) => e.jsx("line", {
                        key: "sunray_" + ri,
                        x1: "0", y1: "0",
                        x2: Math.cos(deg * Math.PI / 180) * 8,
                        y2: Math.sin(deg * Math.PI / 180) * 8,
                        stroke: goldTrim, strokeWidth: "1.5", strokeLinecap: "round"
                      }))
                    ]
                  }) : (isChiRho ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -0.5,7 L -0.5,-8 C 3.5,-8 3.5,-3 -0.5,-3", fill: "none", stroke: goldTrim, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-6", y1: "4", x2: "6", y2: "-4", stroke: goldTrim, strokeWidth: "1.8", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-6", y1: "-4", x2: "6", y2: "4", stroke: goldTrim, strokeWidth: "1.8", strokeLinecap: "round" })
                    ]
                  }) : (isAquila ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M 0,-7 L -3,-2 L -9,-6 L -7,1 L -3,3 L 0,8 L 3,3 L 7,1 L 9,-6 L 3,-2 Z", fill: goldTrim }),
                      e.jsx("circle", { cx: "0", cy: "-7", r: "2.5", fill: goldTrim })
                    ]
                  }) : (isTriton ? e.jsxs("g", {
                    children: [
                      e.jsx("line", { x1: "0", y1: "-8", x2: "0", y2: "8", stroke: goldTrim, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -5,-3 L -5,-8 L -2,-8 L -2,-4 M 5,-3 L 5,-8 L 2,-8 L 2,-4 M -6,-3 Q 0,2 6,-3", fill: "none", stroke: goldTrim, strokeWidth: "1.5", strokeLinecap: "round" })
                    ]
                  }) : (isBull ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -6,-5 Q -9,-11 -4,-9 Q 0,-5 0,-1 Q 0,-5 4,-9 Q 9,-11 6,-5 L 4,3 Q 0,7 -4,3 Z", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" })
                    ]
                  }) : (isPirate ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-2", r: "4", fill: "#ffffff" }),
                      e.jsx("circle", { cx: "-1.5", cy: "-2", r: "1", fill: "#000000" }),
                      e.jsx("circle", { cx: "1.5", cy: "-2", r: "1", fill: "#000000" }),
                      e.jsx("line", { x1: "-5", y1: "5", x2: "5", y2: "-5", stroke: "#ffffff", strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "-5", y1: "-5", x2: "5", y2: "5", stroke: "#ffffff", strokeWidth: "1.5" })
                    ]
                  }) : (isPunic ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-3", r: "3.5", fill: goldTrim }),
                      e.jsx("path", { d: "M -6,2 Q 0,7 6,2 Q 0,4 -6,2 Z", fill: goldTrim })
                    ]
                  }) : (isPraetorian ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M 0,-6 Q 0,6 0,8 Q 2,11 4,11 M -2,2 Q -5,1 -8,-2 M 2,2 Q 5,1 8,-2", fill: "none", stroke: goldTrim, strokeWidth: "1.2", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M 0,-8 C -3,-12 -7,-8 -6,-4 Q -3,-4 0,-4 C 3,-4 6,-4 6,-8 C 7,-12 3,-12 0,-8", fill: "none", stroke: goldTrim, strokeWidth: "1.2" }),
                      e.jsx("circle", { cx: "0", cy: "-2", r: "2", fill: goldTrim })
                    ]
                  }) : (isUsurper ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -3,-8 L -7,0 L -2,0 L -6,8 M 5,-8 L 1,0 L 6,0 L 2,8", fill: "none", stroke: goldTrim, strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })
                    ]
                  }) : (isGreek ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -4,-4 L -2,-7 L 0,-5 L 2,-7 L 4,-4 L 3,4 L -3,4 Z", fill: goldTrim }),
                      e.jsx("circle", { cx: "-1.8", cy: "-1.5", r: "1.5", fill: "#ffffff" }),
                      e.jsx("circle", { cx: "1.8", cy: "-1.5", r: "1.5", fill: "#ffffff" }),
                      e.jsx("polygon", { points: "-0.8,-0.5 0,1 0.8,-0.5", fill: "#000000" })
                    ]
                  }) : (isEgyptian ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -7,-2 Q -1.5,-6.5 5.5,-2 Q 0,3.5 -7,-2 Z", fill: "none", stroke: goldTrim, strokeWidth: "1.4" }),
                      e.jsx("circle", { cx: "-0.8", cy: "-1.8", r: "1.8", fill: goldTrim }),
                      e.jsx("path", { d: "M -2.5,0.8 Q -4,5 -5,2.5 M 1,0.8 L 1,4.2 Q 3.5,5 3.5,2.5", fill: "none", stroke: goldTrim, strokeWidth: "1" })
                    ]
                  }) : (isBarbarian ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -7,2 Q 0,-7 7,2 L 4.5,4.5 Q 0,1 -4.5,4.5 Z", fill: goldTrim }),
                      e.jsx("path", { d: "M -7,2 Q -10,-3 -6,-1.5 M 7,2 Q 10,-3 6,-1.5", fill: "none", stroke: goldTrim, strokeWidth: "1.3", strokeLinecap: "round" })
                    ]
                  }) : (isMerchant ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-6", r: "1.8", fill: goldTrim }),
                      e.jsx("line", { x1: "0", y1: "-4", x2: "0", y2: "7", stroke: goldTrim, strokeWidth: "1.5" }),
                      e.jsx("path", { d: "M -4,-2 C -4,1 0,2 0,-0.8 C 0,2 4,1 4,-2 M -3,3 C -3,6 0,7 0,4.5 C 0,7 3,3 3,3", fill: "none", stroke: goldTrim, strokeWidth: "1" })
                    ]
                  }) : e.jsx("text", {
                    x: "0", y: "3", textAnchor: "middle", fill: goldTrim, fontSize: "7.5", fontFamily: "Cinzel, serif", fontWeight: "900", letterSpacing: "0.8", children: "SPQR"
                  }))))))))))))))`;

if (code.includes(firstBlockTarget)) {
  code = code.replace(firstBlockTarget, firstBlockReplace);
  console.log("-> First sail block successfully enhanced.");
} else {
  console.log("-> Note: firstBlockTarget exact match failed (already matched or layout changed).");
}


// SECOND BLOCK: inside renderMasterwork2DMedallionUnit (using sailBorder and factionInsignia fallback)
const secondBlockTarget = `isAnchor ? e.jsxs("g", {
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
                  }))))))`;

const secondBlockReplace = `isAnchor ? e.jsxs("g", {
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
                  }) : (isPirate ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-2", r: "4", fill: "#ffffff" }),
                      e.jsx("circle", { cx: "-1.5", cy: "-2", r: "1", fill: "#000000" }),
                      e.jsx("circle", { cx: "1.5", cy: "-2", r: "1", fill: "#000000" }),
                      e.jsx("line", { x1: "-5", y1: "5", x2: "5", y2: "-5", stroke: "#ffffff", strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "-5", y1: "-5", x2: "5", y2: "5", stroke: "#ffffff", strokeWidth: "1.5" })
                    ]
                  }) : (isPunic ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-3", r: "3.5", fill: sailBorder }),
                      e.jsx("path", { d: "M -6,2 Q 0,7 6,2 Q 0,4 -6,2 Z", fill: sailBorder })
                    ]
                  }) : (isPraetorian ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M 0,-6 Q 0,6 0,8 Q 2,11 4,11 M -2,2 Q -5,1 -8,-2 M 2,2 Q 5,1 8,-2", fill: "none", stroke: sailBorder, strokeWidth: "1.2", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M 0,-8 C -3,-12 -7,-8 -6,-4 Q -3,-4 0,-4 C 3,-4 6,-4 6,-8 C 7,-12 3,-12 0,-8", fill: "none", stroke: sailBorder, strokeWidth: "1.2" }),
                      e.jsx("circle", { cx: "0", cy: "-2", r: "2", fill: sailBorder })
                    ]
                  }) : (isUsurper ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -3,-8 L -7,0 L -2,0 L -6,8 M 5,-8 L 1,0 L 6,0 L 2,8", fill: "none", stroke: sailBorder, strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })
                    ]
                  }) : (isGreek ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -4,-4 L -2,-7 L 0,-5 L 2,-7 L 4,-4 L 3,4 L -3,4 Z", fill: sailBorder }),
                      e.jsx("circle", { cx: "-1.8", cy: "-1.5", r: "1.5", fill: "#ffffff" }),
                      e.jsx("circle", { cx: "1.8", cy: "-1.5", r: "1.5", fill: "#ffffff" }),
                      e.jsx("polygon", { points: "-0.8,-0.5 0,1 0.8,-0.5", fill: "#000000" })
                    ]
                  }) : (isEgyptian ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -7,-2 Q -1.5,-6.5 5.5,-2 Q 0,3.5 -7,-2 Z", fill: "none", stroke: sailBorder, strokeWidth: "1.4" }),
                      e.jsx("circle", { cx: "-0.8", cy: "-1.8", r: "1.8", fill: sailBorder }),
                      e.jsx("path", { d: "M -2.5,0.8 Q -4,5 -5,2.5 M 1,0.8 L 1,4.2 Q 3.5,5 3.5,2.5", fill: "none", stroke: sailBorder, strokeWidth: "1" })
                    ]
                  }) : (isBarbarian ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -7,2 Q 0,-7 7,2 L 4.5,4.5 Q 0,1 -4.5,4.5 Z", fill: sailBorder }),
                      e.jsx("path", { d: "M -7,2 Q -10,-3 -6,-1.5 M 7,2 Q 10,-3 6,-1.5", fill: "none", stroke: sailBorder, strokeWidth: "1.3", strokeLinecap: "round" })
                    ]
                  }) : (isMerchant ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-6", r: "1.8", fill: sailBorder }),
                      e.jsx("line", { x1: "0", y1: "-4", x2: "0", y2: "7", stroke: sailBorder, strokeWidth: "1.5" }),
                      e.jsx("path", { d: "M -4,-2 C -4,1 0,2 0,-0.8 C 0,2 4,1 4,-2 M -3,3 C -3,6 0,7 0,4.5 C 0,7 3,3 3,3", fill: "none", stroke: sailBorder, strokeWidth: "1" })
                    ]
                  }) : e.jsx("text", {
                    x: "0", y: "3.2", textAnchor: "middle", fill: sailBorder, fontSize: "7", fontFamily: "Cinzel, serif", fontWeight: "900", letterSpacing: "0.6", children: factionInsignia
                  }))))))))))))))`;

if (code.includes(secondBlockTarget)) {
  code = code.replace(secondBlockTarget, secondBlockReplace);
  console.log("-> Second sail block successfully enhanced.");
} else {
  console.log("-> WARNING: secondBlockTarget exact match failed! Trying fallback match...");
  const firstPart = 'isAnchor ? e.jsxs("g", {';
  const lastPart = 'children: factionInsignia\n                  }))))))';
  const posStart = code.indexOf(firstPart, 2480000);
  const posEnd = code.indexOf(lastPart, 2480000);
  if (posStart !== -1 && posEnd !== -1 && posEnd > posStart) {
    const originalPart = code.substring(posStart, posEnd + lastPart.length);
    code = code.replace(originalPart, secondBlockReplace);
    console.log("-> Fallback second sail block replaced successfully!");
  } else {
    console.error("-> CRITICAL ERROR: Could not locate second sail block!");
    process.exit(1);
  }
}

// 3. Scale down the Giant Gladius in @keyframes swordSweep
console.log("3. Adjusting swordSweep keyframe scales for a realistic Gladius...");
const keyframeTarget = `@keyframes swordSweep {
                0% { transform: rotate(-85deg) translate(0, 40px) scale(0.65); opacity: 0; }
                15% { opacity: 1; }
                50% { transform: rotate(15deg) translate(0, 0px) scale(0.85); opacity: 1; }
                85% { opacity: 0.8; }
                100% { transform: rotate(55deg) translate(0, -10px) scale(0.65); opacity: 0; }
              }`;

const keyframeReplace = `@keyframes swordSweep {
                0% { transform: rotate(-85deg) translate(0, 30px) scale(0.35); opacity: 0; }
                15% { opacity: 1; }
                50% { transform: rotate(15deg) translate(0, 0px) scale(0.48); opacity: 1; }
                85% { opacity: 0.8; }
                100% { transform: rotate(55deg) translate(0, -8px) scale(0.35); opacity: 0; }
              }`;

if (code.includes(keyframeTarget)) {
  code = code.replace(keyframeTarget, keyframeReplace);
  console.log("-> Scaled down swordSweep keyframes successfully.");
} else {
  console.log("-> Note: keyframeTarget not found or already modified.");
}

// 4. Thinner, Crisp, Razor-Elegant Slasher Lines (Scale down massive/fireworks stroke widths)
console.log("4. Refining massive firework slashes into elegant razor-sharp sword lines...");
// Main slash paths
code = code.replace(/strokeWidth:\s*["']26["']/g, 'strokeWidth: "12"');
code = code.replace(/strokeWidth:\s*["']16["']/g, 'strokeWidth: "7"');
code = code.replace(/strokeWidth:\s*["']5["'],\s*strokeLinecap:\s*["']round["'],\s*className:\s*["']animate-slash-sweep["']/g, 'strokeWidth: "2.5", strokeLinecap: "round", className: "animate-slash-sweep"');
// Secondary slash paths
code = code.replace(/strokeWidth:\s*["']12["'],\s*strokeLinecap:\s*["']round["'],\s*style:\s*\{\s*animation:\s*["']slashSweepAnim 0\.42s/g, 'strokeWidth: "5", strokeLinecap: "round", style: { animation: "slashSweepAnim 0.42s');
code = code.replace(/strokeWidth:\s*["']4["'],\s*strokeLinecap:\s*["']round["'],\s*style:\s*\{\s*animation:\s*["']slashSweepAnim 0\.42s/g, 'strokeWidth: "2", strokeLinecap: "round", style: { animation: "slashSweepAnim 0.42s');

// Particles / Sparks radius
code = code.replace(/r:\s*i\s*%\s*2\s*===\s*0\s*\?\s*["']3["']\s*:\s*["']2["']/g, 'r: i % 2 === 0 ? "1.5" : "0.9"');
// Blood spray droplets radius
code = code.replace(/r:\s*2\.5\s*\+\s*\(\s*i\s*%\s*3\s*\)/g, 'r: 1.2 + (i % 3) * 0.5');

// 5. Snappy, Organic travel projectile speeds
console.log("5. Tuning projectile flight durations for realistic yet trackable travel...");
code = code.replace(/dur:\s*["']0\.58s["']/g, 'dur: "0.44s"');
code = code.replace(/dur:\s*["']0\.55s["']/g, 'dur: "0.42s"');
code = code.replace(/dur:\s*["']0\.52s["']/g, 'dur: "0.40s"');

// 6. Tone down launch muzzle circular flare pings to look realistic, not arcadey
console.log("6. Toning down muzzle flash ring flare sizes...");
code = code.replace(/r:\s*["']32["'],\s*fill:\s*["']none["']/g, 'r: "15", fill: "none"');
code = code.replace(/r:\s*["']18["'],\s*fill:\s*["']#fbbf24["']/g, 'r: "8", fill: "#fbbf24"');

// Save changes back to index-V33.js
fs.writeFileSync(masterPath, code, 'utf8');
console.log("-> Master bundle file index-V33.js saved successfully.");

// Validate build
try {
  esbuild.buildSync({
    entryPoints: [masterPath],
    outfile: '/tmp/test_combat_sails_built.js',
    bundle: false,
    format: 'esm',
  });
  console.log("=== ESBUILD SYNTAX VALIDATION SUCCEEDED ===");
} catch (e) {
  console.error("=== ESBUILD SYNTAX VALIDATION FAILED ===", e.message);
  process.exit(1);
}
