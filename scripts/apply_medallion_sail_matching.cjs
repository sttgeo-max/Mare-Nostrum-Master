const fs = require('fs');
const path = require('path');

console.log("=== APPLYING MEDALLION SAIL EMBLEM & COLOR MATCHING TO WARSHIPS ===");

const masterPath = path.join(__dirname, '../public/assets/index-V33.js');
let code = fs.readFileSync(masterPath, 'utf8');

// 1. Target render2DShip sailGrad setup
let oldSailGrad = `let sailGrad = isPraetorian ? "#581c87" : (isUsurper ? "#991b1b" : (isPunic ? "#701a75" : (isGreek ? "#1e40af" : (isEgyptian ? "#0d9488" : (isBarbarian ? "#14532d" : (isPirate ? "#0f172a" : (shipTier >= 4 ? "url(#sl_prp_rom)" : "#7e22ce")))))));`;

let newSailGrad = `const isAnchor = fRaw.includes("anchor") || fRaw.includes("marinus") || fRaw.includes("classis");
  const isSol = fRaw.includes("sol") || fRaw.includes("sun");
  const isChiRho = fRaw.includes("chi_rho") || fRaw.includes("labarum") || fRaw.includes("constantine");
  const isAquila = fRaw.includes("eagle") || fRaw.includes("aquila");
  const isTriton = fRaw.includes("triton") || fRaw.includes("neptune") || fRaw.includes("poseidon");
  const isBull = fRaw.includes("bull") || fRaw.includes("dacia");

  let sailGrad = isAnchor ? "#1e3a8a" : (isSol ? "#9a3412" : (isChiRho ? "#581c87" : (isAquila ? "#991b1b" : (isTriton ? "#0369a1" : (isBull ? "#78350f" : (isPraetorian ? "#581c87" : (isUsurper ? "#991b1b" : (isPunic ? "#701a75" : (isGreek ? "#1e40af" : (isEgyptian ? "#0d9488" : (isBarbarian ? "#14532d" : (isPirate ? "#0f172a" : (shipTier >= 4 ? "url(#sl_prp_rom)" : "#991b1b")))))))))))));`;

if (code.includes(oldSailGrad)) {
  code = code.replace(oldSailGrad, newSailGrad);
  console.log("SUCCESS: Updated sailGrad color matching in render2DShip");
} else {
  console.warn("oldSailGrad pattern not found directly, searching alternative...");
}

// 2. Target Sail Emblem Rendering in render2DShip
let oldEmblemSnippet = `// Embossed Masterwork Medallion Emblem on Sail
          isRoman ? e.jsxs("g", {
            transform: "translate(0, -22)",
            children: [
              // Golden Laurel Wreath Crown
              e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "none", stroke: goldTrim, strokeWidth: "1.8", strokeDasharray: "5 2.5" }),
              // Gilded S.P.Q.R. Roman Monogram
              e.jsx("text", {
                x: "0",
                y: "3",
                textAnchor: "middle",
                fill: goldTrim,
                fontSize: "7.5",
                fontFamily: "Cinzel, serif",
                fontWeight: "900",
                letterSpacing: "0.8",
                children: "SPQR"
              })
            ]
          }) : (isPunic ? e.jsxs("g", {
            transform: "translate(0, -22)",
            children: [
              e.jsx("circle", { cx: "0", cy: "-2", r: "5", fill: "#fbbf24" }),
              e.jsx("path", { d: "M -7 3 Q 0 8 7 3 Q 0 5 -7 3 Z", fill: "#fbbf24" })
            ]
          }) : e.jsxs("g", {
            transform: "translate(0, -22)",
            children: [
              e.jsx("circle", { cx: "0", cy: "0", r: "7", fill: "none", stroke: "#ffffff", strokeWidth: "1.5" }),
              e.jsx("line", { x1: "0", y1: "-8", x2: "0", y2: "8", stroke: "#ffffff", strokeWidth: "1.8" })
            ]
          })),`;

let newEmblemSnippet = `// Embossed Masterwork Medallion Emblem on Sail
          e.jsxs("g", {
            transform: "translate(0, -22)",
            children: [
              e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "rgba(0,0,0,0.25)", stroke: goldTrim, strokeWidth: "1.8", strokeDasharray: "5 2" }),
              isAnchor ? e.jsxs("g", {
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
              }))))))))
            ]
          }),`;

if (code.includes(oldEmblemSnippet)) {
  code = code.replace(oldEmblemSnippet, newEmblemSnippet);
  fs.writeFileSync(masterPath, code, 'utf8');
  console.log("SUCCESS: Replaced sail emblem renderer in master bundle public/assets/index-V33.js");
} else {
  console.warn("Could not match oldEmblemSnippet directly, searching pattern...");
}

// Sync across all version files
const syncScript = path.join(__dirname, 'sync_all_bundle_versions.cjs');
if (fs.existsSync(syncScript)) {
  require(syncScript);
}

console.log("=== COMPLETED MEDALLION SAIL MATCHING APPLICATION ===");
