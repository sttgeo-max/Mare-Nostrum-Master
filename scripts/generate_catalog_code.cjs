const fs = require("fs");
const esbuild = require("esbuild");

const code = `
// Master SVG and Catalog Definitions for Mare Nostrum II: Empire
// 11 Unique Ships & 10 Unique Legions

const masterShipAndLegionDefs = {
  // === 11 WARSHIPS ===
  // 1. Liburnian Skiff (Tier 1) - Light Scout
  ship_liburna_minor: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 12,65 Q 46,72 82,64 L 92,60 L 84,58 L 22,58 Z", fill: "#582a13" }),
    e.jsx("path", { d: "M 16,58 C 12,46 16,36 22,30 C 24,36 20,46 18,58 Z", fill: "#d97706" }),
    e.jsx("path", { d: "M 82,64 L 95,61 L 88,58 L 82,58 Z", fill: "#ca8a04" }),
    e.jsx("line", { x1: "50", y1: "26", x2: "50", y2: "58", stroke: "#78350f", strokeWidth: "2.5" }),
    e.jsx("line", { x1: "34", y1: "30", x2: "66", y2: "30", stroke: "#78350f", strokeWidth: "1.8" }),
    e.jsx("path", { d: "M 36,31 Q 50,36 64,31 L 62,48 Q 50,53 38,48 Z", fill: "#0d9488", stroke: "#0f766e", strokeWidth: "1" }),
    e.jsx("g", { stroke: "#ca8a04", strokeWidth: "1.2", strokeLinecap: "round", children: [
      e.jsx("line", { x1: "26", y1: "63", x2: "22", y2: "74" }),
      e.jsx("line", { x1: "34", y1: "64", x2: "30", y2: "75" }),
      e.jsx("line", { x1: "42", y1: "65", x2: "38", y2: "76" }),
      e.jsx("line", { x1: "50", y1: "65", x2: "46", y2: "76" }),
      e.jsx("line", { x1: "58", y1: "64", x2: "54", y2: "75" }),
      e.jsx("line", { x1: "66", y1: "63", x2: "62", y2: "74" }),
      e.jsx("line", { x1: "74", y1: "62", x2: "70", y2: "73" })
    ]})
  ]}),

  // 2. Liburnian Galley (Tier 2) - Swift Interceptor
  ship_liburna_bellica: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,66 Q 46,74 84,65 L 96,60 L 86,56 L 18,56 Z", fill: "#451a03" }),
    e.jsx("path", { d: "M 14,56 C 10,42 16,32 24,26 C 26,34 20,44 16,56 Z", fill: "#b45309" }),
    e.jsx("path", { d: "M 84,65 L 98,60 L 92,56 L 84,56 Z", fill: "#f59e0b" }),
    e.jsx("rect", { x: "70", y: "48", width: "14", height: "8", rx: "1.5", fill: "#78350f", stroke: "#d97706", strokeWidth: "1" }),
    e.jsx("line", { x1: "50", y1: "22", x2: "50", y2: "56", stroke: "#78350f", strokeWidth: "2.5" }),
    e.jsx("line", { x1: "30", y1: "26", x2: "70", y2: "26", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("path", { d: "M 32,27 Q 50,33 68,27 L 66,48 Q 50,54 34,48 Z", fill: "#d97706", stroke: "#92400e", strokeWidth: "1" }),
    e.jsx("g", { stroke: "#fbbf24", strokeWidth: "1.2", strokeLinecap: "round", children: [
      e.jsx("line", { x1: "24", y1: "62", x2: "18", y2: "74" }),
      e.jsx("line", { x1: "32", y1: "63", x2: "26", y2: "75" }),
      e.jsx("line", { x1: "40", y1: "64", x2: "34", y2: "76" }),
      e.jsx("line", { x1: "48", y1: "64", x2: "42", y2: "76" }),
      e.jsx("line", { x1: "56", y1: "63", x2: "50", y2: "75" }),
      e.jsx("line", { x1: "64", y1: "62", x2: "58", y2: "74" }),
      e.jsx("line", { x1: "72", y1: "61", x2: "66", y2: "73" }),
      e.jsx("line", { x1: "28", y1: "66", x2: "24", y2: "79" }),
      e.jsx("line", { x1: "36", y1: "67", x2: "32", y2: "80" }),
      e.jsx("line", { x1: "44", y1: "67", x2: "40", y2: "80" }),
      e.jsx("line", { x1: "52", y1: "66", x2: "48", y2: "79" }),
      e.jsx("line", { x1: "60", y1: "65", x2: "56", y2: "78" })
    ]})
  ]}),

  // 3. Classical Trireme (Tier 3) - Line Warship
  ship_trireme_imperialis: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 8,68 Q 48,76 86,66 L 98,61 L 88,54 L 16,54 Z", fill: "#3b1d0e" }),
    e.jsx("path", { d: "M 14,54 C 8,40 14,28 22,22 C 24,30 18,42 16,54 Z", fill: "#b45309" }),
    e.jsx("path", { d: "M 86,66 L 100,61 L 94,54 L 84,54 Z", fill: "#d97706" }),
    e.jsx("polygon", { points: "98,61 103,59 97,55 92,57", fill: "#fde047" }),
    e.jsx("rect", { x: "20", y: "52", width: "64", height: "4", rx: "1", fill: "#92400e", stroke: "#d97706", strokeWidth: "0.8" }),
    e.jsx("line", { x1: "50", y1: "18", x2: "50", y2: "54", stroke: "#78350f", strokeWidth: "2.8" }),
    e.jsx("line", { x1: "26", y1: "23", x2: "74", y2: "23", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("path", { d: "M 28,24 Q 50,30 72,24 L 70,47 Q 50,53 30,47 Z", fill: "#b91c1c", stroke: "#991b1b", strokeWidth: "1" }),
    e.jsx("circle", { cx: "50", cy: "35", r: "6", fill: "none", stroke: "#facc15", strokeWidth: "1.2" }),
    e.jsx("g", { stroke: "#d97706", strokeWidth: "1", strokeLinecap: "round", children: [
      e.jsx("line", { x1: "22", y1: "62", x2: "16", y2: "73" }),
      e.jsx("line", { x1: "30", y1: "63", x2: "24", y2: "74" }),
      e.jsx("line", { x1: "38", y1: "64", x2: "32", y2: "75" }),
      e.jsx("line", { x1: "46", y1: "64", x2: "40", y2: "75" }),
      e.jsx("line", { x1: "54", y1: "63", x2: "48", y2: "74" }),
      e.jsx("line", { x1: "62", y1: "62", x2: "56", y2: "73" }),
      e.jsx("line", { x1: "70", y1: "61", x2: "64", y2: "72" }),
      e.jsx("line", { x1: "25", y1: "66", x2: "20", y2: "78" }),
      e.jsx("line", { x1: "33", y1: "67", x2: "28", y2: "79" }),
      e.jsx("line", { x1: "41", y1: "68", x2: "36", y2: "80" }),
      e.jsx("line", { x1: "49", y1: "68", x2: "44", y2: "80" }),
      e.jsx("line", { x1: "57", y1: "67", x2: "52", y2: "79" }),
      e.jsx("line", { x1: "65", y1: "66", x2: "60", y2: "78" }),
      e.jsx("line", { x1: "28", y1: "70", x2: "24", y2: "83" }),
      e.jsx("line", { x1: "36", y1: "71", x2: "32", y2: "84" }),
      e.jsx("line", { x1: "44", y1: "72", x2: "40", y2: "85" }),
      e.jsx("line", { x1: "52", y1: "71", x2: "48", y2: "84" }),
      e.jsx("line", { x1: "60", y1: "70", x2: "56", y2: "83" })
    ]})
  ]}),

  // 4. Heavy Armored Trireme (Tier 4) - Cataphract Cruiser
  ship_trireme_cataphracta: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 8,68 Q 48,78 88,67 L 98,62 L 88,52 L 16,52 Z", fill: "#27272a" }),
    e.jsx("path", { d: "M 14,52 C 8,38 12,26 22,20 C 24,28 18,40 16,52 Z", fill: "#71717a" }),
    e.jsx("path", { d: "M 88,67 L 102,62 L 96,52 L 86,52 Z", fill: "#a1a1aa" }),
    e.jsx("rect", { x: "72", y: "42", width: "16", height: "12", rx: "1.5", fill: "#3f3f46", stroke: "#e4e4e7", strokeWidth: "1" }),
    e.jsx("line", { x1: "76", y1: "42", x2: "76", y2: "38", stroke: "#e4e4e7", strokeWidth: "1.5" }),
    e.jsx("line", { x1: "84", y1: "42", x2: "84", y2: "38", stroke: "#e4e4e7", strokeWidth: "1.5" }),
    e.jsx("line", { x1: "50", y1: "16", x2: "50", y2: "52", stroke: "#52525b", strokeWidth: "3" }),
    e.jsx("line", { x1: "24", y1: "21", x2: "76", y2: "21", stroke: "#52525b", strokeWidth: "2" }),
    e.jsx("path", { d: "M 26,22 Q 50,28 74,22 L 72,45 Q 50,51 28,45 Z", fill: "#475569", stroke: "#334155", strokeWidth: "1" }),
    e.jsx("g", { stroke: "#e4e4e7", strokeWidth: "1.2", strokeLinecap: "round", children: [
      e.jsx("line", { x1: "24", y1: "63", x2: "18", y2: "75" }),
      e.jsx("line", { x1: "34", y1: "64", x2: "28", y2: "76" }),
      e.jsx("line", { x1: "44", y1: "65", x2: "38", y2: "77" }),
      e.jsx("line", { x1: "54", y1: "65", x2: "48", y2: "77" }),
      e.jsx("line", { x1: "64", y1: "64", x2: "58", y2: "76" }),
      e.jsx("line", { x1: "74", y1: "63", x2: "68", y2: "75" }),
      e.jsx("line", { x1: "28", y1: "68", x2: "24", y2: "81" }),
      e.jsx("line", { x1: "38", y1: "69", x2: "34", y2: "82" }),
      e.jsx("line", { x1: "48", y1: "70", x2: "44", y2: "83" }),
      e.jsx("line", { x1: "58", y1: "69", x2: "54", y2: "82" }),
      e.jsx("line", { x1: "68", y1: "68", x2: "64", y2: "81" })
    ]}),
    e.jsx("circle", { cx: "34", cy: "52", r: "2.5", fill: "#991b1b", stroke: "#e4e4e7", strokeWidth: "0.8" }),
    e.jsx("circle", { cx: "44", cy: "52", r: "2.5", fill: "#991b1b", stroke: "#e4e4e7", strokeWidth: "0.8" }),
    e.jsx("circle", { cx: "54", cy: "52", r: "2.5", fill: "#991b1b", stroke: "#e4e4e7", strokeWidth: "0.8" }),
    e.jsx("circle", { cx: "64", cy: "52", r: "2.5", fill: "#991b1b", stroke: "#e4e4e7", strokeWidth: "0.8" })
  ]}),

  // 5. Quadrireme (Tier 5) - Heavy Line Cruiser
  ship_quadrireme_augusta: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 6,70 Q 48,80 90,68 L 100,62 L 90,52 L 14,52 Z", fill: "#1c1917" }),
    e.jsx("path", { d: "M 12,52 C 6,36 12,24 22,18 C 24,26 18,38 14,52 Z", fill: "#d97706" }),
    e.jsx("path", { d: "M 90,68 L 104,62 L 96,52 L 88,52 Z", fill: "#f59e0b" }),
    e.jsx("rect", { x: "74", y: "38", width: "16", height: "16", rx: "2", fill: "#78350f", stroke: "#facc15", strokeWidth: "1.2" }),
    e.jsx("polygon", { points: "76,38 82,30 88,38", fill: "#ca8a04" }),
    e.jsx("line", { x1: "48", y1: "14", x2: "48", y2: "52", stroke: "#78350f", strokeWidth: "3.2" }),
    e.jsx("line", { x1: "22", y1: "19", x2: "74", y2: "19", stroke: "#78350f", strokeWidth: "2.2" }),
    e.jsx("path", { d: "M 24,20 Q 48,26 72,20 L 70,44 Q 48,50 26,44 Z", fill: "#b91c1c", stroke: "#7f1d1d", strokeWidth: "1.2" }),
    e.jsx("text", { x: "48", y: "35", fill: "#fde047", fontSize: "7", fontWeight: "900", fontFamily: "Cinzel, serif", textAnchor: "middle", children: "SPQR" }),
    e.jsx("g", { stroke: "#facc15", strokeWidth: "1.2", strokeLinecap: "round", children: [
      e.jsx("line", { x1: "20", y1: "63", x2: "14", y2: "76" }),
      e.jsx("line", { x1: "28", y1: "64", x2: "22", y2: "77" }),
      e.jsx("line", { x1: "36", y1: "65", x2: "30", y2: "78" }),
      e.jsx("line", { x1: "44", y1: "66", x2: "38", y2: "79" }),
      e.jsx("line", { x1: "52", y1: "66", x2: "46", y2: "79" }),
      e.jsx("line", { x1: "60", y1: "65", x2: "54", y2: "78" }),
      e.jsx("line", { x1: "68", y1: "64", x2: "62", y2: "77" }),
      e.jsx("line", { x1: "24", y1: "68", x2: "18", y2: "82" }),
      e.jsx("line", { x1: "32", y1: "69", x2: "26", y2: "83" }),
      e.jsx("line", { x1: "40", y1: "70", x2: "34", y2: "84" }),
      e.jsx("line", { x1: "48", y1: "70", x2: "42", y2: "84" }),
      e.jsx("line", { x1: "56", y1: "69", x2: "50", y2: "83" }),
      e.jsx("line", { x1: "64", y1: "68", x2: "58", y2: "82" })
    ]})
  ]}),

  // 6. Heavy Quadrireme (Tier 6) - Praetorian Cruiser
  ship_quadrireme_praetoriana: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 6,70 Q 48,80 90,68 L 102,62 L 92,50 L 14,50 Z", fill: "#2e1065" }),
    e.jsx("path", { d: "M 12,50 C 6,34 12,22 22,16 C 24,24 18,36 14,50 Z", fill: "#eab308" }),
    e.jsx("path", { d: "M 90,68 L 104,62 L 96,50 L 88,50 Z", fill: "#facc15" }),
    e.jsx("rect", { x: "74", y: "34", width: "16", height: "18", rx: "2", fill: "#4c1d95", stroke: "#facc15", strokeWidth: "1.2" }),
    e.jsx("rect", { x: "20", y: "38", width: "14", height: "14", rx: "2", fill: "#4c1d95", stroke: "#facc15", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "50", y1: "12", x2: "50", y2: "50", stroke: "#78350f", strokeWidth: "3.2" }),
    e.jsx("line", { x1: "24", y1: "17", x2: "76", y2: "17", stroke: "#78350f", strokeWidth: "2.2" }),
    e.jsx("path", { d: "M 26,18 Q 50,25 74,18 L 72,42 Q 50,49 28,42 Z", fill: "#581c87", stroke: "#eab308", strokeWidth: "1.2" }),
    e.jsx("polygon", { points: "50,22 53,28 60,29 55,34 56,40 50,37 44,40 45,34 40,29 47,28", fill: "#facc15" }),
    e.jsx("g", { stroke: "#eab308", strokeWidth: "1.2", strokeLinecap: "round", children: [
      e.jsx("line", { x1: "22", y1: "62", x2: "16", y2: "75" }),
      e.jsx("line", { x1: "30", y1: "63", x2: "24", y2: "76" }),
      e.jsx("line", { x1: "38", y1: "64", x2: "32", y2: "77" }),
      e.jsx("line", { x1: "46", y1: "65", x2: "40", y2: "78" }),
      e.jsx("line", { x1: "54", y1: "65", x2: "48", y2: "78" }),
      e.jsx("line", { x1: "62", y1: "64", x2: "56", y2: "77" }),
      e.jsx("line", { x1: "70", y1: "63", x2: "64", y2: "76" }),
      e.jsx("line", { x1: "26", y1: "67", x2: "20", y2: "81" }),
      e.jsx("line", { x1: "34", y1: "68", x2: "28", y2: "82" }),
      e.jsx("line", { x1: "42", y1: "69", x2: "36", y2: "83" }),
      e.jsx("line", { x1: "50", y1: "69", x2: "44", y2: "83" }),
      e.jsx("line", { x1: "58", y1: "68", x2: "52", y2: "82" }),
      e.jsx("line", { x1: "66", y1: "67", x2: "60", y2: "81" })
    ]})
  ]}),

  // 7. Quinquereme (Tier 7) - Classical Dreadnought with Corvus
  ship_quinquereme_victoria: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 4,72 Q 48,82 92,68 L 102,62 L 90,48 L 12,48 Z", fill: "#451a03" }),
    e.jsx("path", { d: "M 10,48 C 4,32 10,18 20,12 C 22,22 16,34 12,48 Z", fill: "#f59e0b" }),
    e.jsx("path", { d: "M 92,68 L 105,62 L 96,48 L 86,48 Z", fill: "#d97706" }),
    // Corvus Boarding Bridge
    e.jsx("line", { x1: "82", y1: "50", x2: "92", y2: "22", stroke: "#78350f", strokeWidth: "3.5" }),
    e.jsx("line", { x1: "92", y1: "22", x2: "94", y2: "18", stroke: "#facc15", strokeWidth: "2" }),
    e.jsx("polygon", { points: "93,18 97,18 94,14", fill: "#facc15" }),
    e.jsx("line", { x1: "48", y1: "12", x2: "48", y2: "48", stroke: "#78350f", strokeWidth: "3.5" }),
    e.jsx("line", { x1: "20", y1: "17", x2: "76", y2: "17", stroke: "#78350f", strokeWidth: "2.5" }),
    e.jsx("path", { d: "M 22,18 Q 48,25 74,18 L 72,42 Q 48,49 24,42 Z", fill: "#b45309", stroke: "#facc15", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "48", cy: "30", r: "7", fill: "#78350f", stroke: "#fde047", strokeWidth: "1.2" }),
    e.jsx("g", { stroke: "#f59e0b", strokeWidth: "1.2", strokeLinecap: "round", children: [
      e.jsx("line", { x1: "18", y1: "62", x2: "12", y2: "76" }),
      e.jsx("line", { x1: "26", y1: "63", x2: "20", y2: "77" }),
      e.jsx("line", { x1: "34", y1: "64", x2: "28", y2: "78" }),
      e.jsx("line", { x1: "42", y1: "65", x2: "36", y2: "79" }),
      e.jsx("line", { x1: "50", y1: "66", x2: "44", y2: "80" }),
      e.jsx("line", { x1: "58", y1: "65", x2: "52", y2: "79" }),
      e.jsx("line", { x1: "66", y1: "64", x2: "60", y2: "78" }),
      e.jsx("line", { x1: "74", y1: "63", x2: "68", y2: "77" }),
      e.jsx("line", { x1: "22", y1: "67", x2: "16", y2: "82" }),
      e.jsx("line", { x1: "30", y1: "68", x2: "24", y2: "83" }),
      e.jsx("line", { x1: "38", y1: "69", x2: "32", y2: "84" }),
      e.jsx("line", { x1: "46", y1: "70", x2: "40", y2: "85" }),
      e.jsx("line", { x1: "54", y1: "70", x2: "48", y2: "85" }),
      e.jsx("line", { x1: "62", y1: "69", x2: "56", y2: "84" }),
      e.jsx("line", { x1: "70", y1: "68", x2: "64", y2: "83" })
    ]})
  ]}),

  // 8. Imperial Quinquereme (Tier 8) - Constantinian Flagship
  ship_quinquereme_constantinia: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 4,72 Q 48,82 92,68 L 102,62 L 90,48 L 12,48 Z", fill: "#581c87" }),
    e.jsx("path", { d: "M 10,48 C 4,30 10,16 22,10 C 24,20 18,32 14,48 Z", fill: "#fde047" }),
    e.jsx("path", { d: "M 92,68 L 106,62 L 96,48 L 86,48 Z", fill: "#facc15" }),
    // Golden Chi-Rho & Forecastle
    e.jsx("rect", { x: "76", y: "30", width: "16", height: "20", rx: "2", fill: "#3b0764", stroke: "#fde047", strokeWidth: "1.5" }),
    e.jsx("rect", { x: "18", y: "34", width: "16", height: "16", rx: "2", fill: "#3b0764", stroke: "#fde047", strokeWidth: "1.5" }),
    e.jsx("line", { x1: "50", y1: "10", x2: "50", y2: "48", stroke: "#ca8a04", strokeWidth: "3.5" }),
    e.jsx("line", { x1: "20", y1: "15", x2: "80", y2: "15", stroke: "#ca8a04", strokeWidth: "2.5" }),
    e.jsx("path", { d: "M 22,16 Q 50,23 78,16 L 76,42 Q 50,49 24,42 Z", fill: "#6b21a8", stroke: "#fde047", strokeWidth: "1.5" }),
    // Chi-Rho Symbol on Sail
    e.jsx("path", { d: "M 50,22 L 50,38 M 46,24 L 54,24 M 50,24 C 55,24 55,30 50,30", stroke: "#fde047", strokeWidth: "1.8", strokeLinecap: "round" }),
    e.jsx("line", { x1: "45", y1: "28", x2: "55", y2: "34", stroke: "#fde047", strokeWidth: "1.5" }),
    e.jsx("line", { x1: "55", y1: "28", x2: "45", y2: "34", stroke: "#fde047", strokeWidth: "1.5" }),
    e.jsx("g", { stroke: "#fde047", strokeWidth: "1.3", strokeLinecap: "round", children: [
      e.jsx("line", { x1: "20", y1: "62", x2: "14", y2: "77" }),
      e.jsx("line", { x1: "28", y1: "63", x2: "22", y2: "78" }),
      e.jsx("line", { x1: "36", y1: "64", x2: "30", y2: "79" }),
      e.jsx("line", { x1: "44", y1: "65", x2: "38", y2: "80" }),
      e.jsx("line", { x1: "52", y1: "66", x2: "46", y2: "81" }),
      e.jsx("line", { x1: "60", y1: "65", x2: "54", y2: "80" }),
      e.jsx("line", { x1: "68", y1: "64", x2: "62", y2: "79" }),
      e.jsx("line", { x1: "76", y1: "63", x2: "70", y2: "78" }),
      e.jsx("line", { x1: "24", y1: "68", x2: "18", y2: "84" }),
      e.jsx("line", { x1: "32", y1: "69", x2: "26", y2: "85" }),
      e.jsx("line", { x1: "40", y1: "70", x2: "34", y2: "86" }),
      e.jsx("line", { x1: "48", y1: "71", x2: "42", y2: "87" }),
      e.jsx("line", { x1: "56", y1: "70", x2: "50", y2: "86" }),
      e.jsx("line", { x1: "64", y1: "69", x2: "58", y2: "85" }),
      e.jsx("line", { x1: "72", y1: "68", x2: "66", y2: "84" })
    ]})
  ]}),

  // 9. Bosphoran Fire Dromon (Tier 8) - Greek Fire Syphon
  ship_dromon_ignifer: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 8,68 Q 48,78 86,66 L 96,60 L 88,52 L 16,52 Z", fill: "#831843" }),
    e.jsx("path", { d: "M 14,52 C 10,38 14,26 22,20 C 24,28 18,40 16,52 Z", fill: "#f43f5e" }),
    e.jsx("path", { d: "M 86,66 L 98,60 L 92,52 L 84,52 Z", fill: "#fbbf24" }),
    // Bronze Lion Siphon Prow
    e.jsx("rect", { x: "92", y: "56", width: "8", height: "6", rx: "1", fill: "#d97706" }),
    // Greek Fire Jet
    e.jsx("path", { d: "M 100,59 Q 106,53 112,56 Q 118,52 124,58 Q 116,66 108,62 Z", fill: "#f97316", opacity: "0.9" }),
    e.jsx("path", { d: "M 100,59 Q 105,56 110,58 Q 106,62 100,60 Z", fill: "#fde047" }),
    // Lateen Triangular Sail
    e.jsx("line", { x1: "48", y1: "14", x2: "48", y2: "52", stroke: "#78350f", strokeWidth: "3" }),
    e.jsx("line", { x1: "24", y1: "44", x2: "72", y2: "18", stroke: "#78350f", strokeWidth: "2.5" }),
    e.jsx("polygon", { points: "26,44 72,18 56,48", fill: "#9f1239", stroke: "#fbbf24", strokeWidth: "1.2" }),
    e.jsx("g", { stroke: "#fb7185", strokeWidth: "1.2", strokeLinecap: "round", children: [
      e.jsx("line", { x1: "22", y1: "63", x2: "16", y2: "76" }),
      e.jsx("line", { x1: "30", y1: "64", x2: "24", y2: "77" }),
      e.jsx("line", { x1: "38", y1: "65", x2: "32", y2: "78" }),
      e.jsx("line", { x1: "46", y1: "65", x2: "40", y2: "78" }),
      e.jsx("line", { x1: "54", y1: "64", x2: "48", y2: "77" }),
      e.jsx("line", { x1: "62", y1: "63", x2: "56", y2: "76" }),
      e.jsx("line", { x1: "70", y1: "62", x2: "64", y2: "75" }),
      e.jsx("line", { x1: "26", y1: "68", x2: "22", y2: "82" }),
      e.jsx("line", { x1: "34", y1: "69", x2: "30", y2: "83" }),
      e.jsx("line", { x1: "42", y1: "70", x2: "38", y2: "84" }),
      e.jsx("line", { x1: "50", y1: "69", x2: "46", y2: "83" }),
      e.jsx("line", { x1: "58", y1: "68", x2: "54", y2: "82" })
    ]})
  ]}),

  // 10. Hexareme Flagship (Tier 9) - Hexeres Imperatoris
  ship_hexareme_imperatoris: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 2,74 Q 48,84 94,68 L 105,60 L 92,44 L 10,44 Z", fill: "#1e1b4b" }),
    e.jsx("path", { d: "M 8,44 C 2,24 8,12 22,6 C 24,18 16,30 12,44 Z", fill: "#fde047" }),
    e.jsx("path", { d: "M 94,68 L 108,60 L 98,44 L 88,44 Z", fill: "#facc15" }),
    // Twin Heavy Catapult Towers
    e.jsx("rect", { x: "74", y: "24", width: "18", height: "24", rx: "2", fill: "#312e81", stroke: "#fde047", strokeWidth: "1.5" }),
    e.jsx("rect", { x: "16", y: "28", width: "16", height: "20", rx: "2", fill: "#312e81", stroke: "#fde047", strokeWidth: "1.5" }),
    e.jsx("line", { x1: "48", y1: "8", x2: "48", y2: "44", stroke: "#ca8a04", strokeWidth: "4" }),
    e.jsx("line", { x1: "18", y1: "14", x2: "80", y2: "14", stroke: "#ca8a04", strokeWidth: "2.8" }),
    e.jsx("path", { d: "M 20,15 Q 48,22 78,15 L 75,38 Q 48,45 22,38 Z", fill: "#4338ca", stroke: "#fde047", strokeWidth: "1.5" }),
    // Golden Imperial Eagle Figurehead
    e.jsx("polygon", { points: "48,18 51,24 57,25 53,29 54,35 48,32 42,35 43,29 39,25 45,24", fill: "#fde047" }),
    e.jsx("g", { stroke: "#fde047", strokeWidth: "1.3", strokeLinecap: "round", children: [
      e.jsx("line", { x1: "16", y1: "60", x2: "10", y2: "76" }),
      e.jsx("line", { x1: "24", y1: "61", x2: "18", y2: "77" }),
      e.jsx("line", { x1: "32", y1: "62", x2: "26", y2: "78" }),
      e.jsx("line", { x1: "40", y1: "63", x2: "34", y2: "79" }),
      e.jsx("line", { x1: "48", y1: "64", x2: "42", y2: "80" }),
      e.jsx("line", { x1: "56", y1: "64", x2: "50", y2: "80" }),
      e.jsx("line", { x1: "64", y1: "63", x2: "58", y2: "79" }),
      e.jsx("line", { x1: "72", y1: "62", x2: "66", y2: "78" }),
      e.jsx("line", { x1: "80", y1: "61", x2: "74", y2: "77" }),
      e.jsx("line", { x1: "20", y1: "66", x2: "14", y2: "83" }),
      e.jsx("line", { x1: "28", y1: "67", x2: "22", y2: "84" }),
      e.jsx("line", { x1: "36", y1: "68", x2: "30", y2: "85" }),
      e.jsx("line", { x1: "44", y1: "69", x2: "38", y2: "86" }),
      e.jsx("line", { x1: "52", y1: "70", x2: "46", y2: "87" }),
      e.jsx("line", { x1: "60", y1: "69", x2: "54", y2: "86" }),
      e.jsx("line", { x1: "68", y1: "68", x2: "62", y2: "85" }),
      e.jsx("line", { x1: "76", y1: "67", x2: "70", y2: "84" })
    ]})
  ]}),

  // 11. Alexandrian Deceres (Tier 10) - Deceres Ptolemaica
  ship_deceres_ptolemaica: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 2,75 Q 48,86 96,68 L 108,60 L 94,42 L 8,42 Z", fill: "#0f172a" }),
    e.jsx("path", { d: "M 6,42 C 0,20 6,8 20,2 C 24,14 14,28 10,42 Z", fill: "#38bdf8" }),
    e.jsx("path", { d: "M 96,68 L 112,60 L 100,42 L 88,42 Z", fill: "#38bdf8" }),
    // Dual Giant Multi-Deck Fortress Towers
    e.jsx("rect", { x: "74", y: "18", width: "20", height: "30", rx: "3", fill: "#1e293b", stroke: "#38bdf8", strokeWidth: "1.8" }),
    e.jsx("rect", { x: "12", y: "22", width: "18", height: "26", rx: "3", fill: "#1e293b", stroke: "#38bdf8", strokeWidth: "1.8" }),
    // Glowing Pharos Lighthouse Beacon
    e.jsx("circle", { cx: "84", cy: "14", r: "5", fill: "#fde047", filter: "drop-shadow(0 0 8px rgba(56,189,248,0.8))" }),
    e.jsx("line", { x1: "48", y1: "6", x2: "48", y2: "42", stroke: "#ca8a04", strokeWidth: "4.5" }),
    e.jsx("line", { x1: "16", y1: "12", x2: "84", y2: "12", stroke: "#ca8a04", strokeWidth: "3" }),
    e.jsx("path", { d: "M 18,13 Q 48,20 80,13 L 78,38 Q 48,46 20,38 Z", fill: "#0369a1", stroke: "#38bdf8", strokeWidth: "1.8" }),
    e.jsx("circle", { cx: "48", cy: "25", r: "8", fill: "#fde047", stroke: "#0284c7", strokeWidth: "1.5" }),
    e.jsx("g", { stroke: "#38bdf8", strokeWidth: "1.4", strokeLinecap: "round", children: [
      e.jsx("line", { x1: "14", y1: "60", x2: "8", y2: "77" }),
      e.jsx("line", { x1: "22", y1: "61", x2: "16", y2: "78" }),
      e.jsx("line", { x1: "30", y1: "62", x2: "24", y2: "79" }),
      e.jsx("line", { x1: "38", y1: "63", x2: "32", y2: "80" }),
      e.jsx("line", { x1: "46", y1: "64", x2: "40", y2: "81" }),
      e.jsx("line", { x1: "54", y1: "65", x2: "48", y2: "82" }),
      e.jsx("line", { x1: "62", y1: "64", x2: "56", y2: "81" }),
      e.jsx("line", { x1: "70", y1: "63", x2: "64", y2: "80" }),
      e.jsx("line", { x1: "78", y1: "62", x2: "72", y2: "79" }),
      e.jsx("line", { x1: "86", y1: "61", x2: "80", y2: "78" }),
      e.jsx("line", { x1: "18", y1: "66", x2: "12", y2: "84" }),
      e.jsx("line", { x1: "26", y1: "67", x2: "20", y2: "85" }),
      e.jsx("line", { x1: "34", y1: "68", x2: "28", y2: "86" }),
      e.jsx("line", { x1: "42", y1: "69", x2: "36", y2: "87" }),
      e.jsx("line", { x1: "50", y1: "70", x2: "44", y2: "88" }),
      e.jsx("line", { x1: "58", y1: "70", x2: "52", y2: "88" }),
      e.jsx("line", { x1: "66", y1: "69", x2: "60", y2: "87" }),
      e.jsx("line", { x1: "74", y1: "68", x2: "68", y2: "86" }),
      e.jsx("line", { x1: "82", y1: "67", x2: "76", y2: "85" })
    ]})
  ]}),

  // === 10 LEGIONS & COHORTS ===
  // 1. Border Velites Skirmishers (Tier 1) - Wolf pelt & javelins
  legion_velites: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    // Wolfskin pelt head
    e.jsx("path", { d: "M 32,24 C 32,12 40,8 50,8 C 60,8 68,12 68,24 C 68,34 60,38 50,38 C 40,38 32,34 32,24 Z", fill: "#78716c", stroke: "#44403c", strokeWidth: "1.5" }),
    e.jsx("polygon", { points: "34,14 38,4 42,12", fill: "#57534e" }),
    e.jsx("polygon", { points: "66,14 62,4 58,12", fill: "#57534e" }),
    e.jsx("circle", { cx: "44", cy: "22", r: "2.5", fill: "#facc15" }),
    e.jsx("circle", { cx: "56", cy: "22", r: "2.5", fill: "#facc15" }),
    // Crossed Verutum Javelins
    e.jsx("line", { x1: "20", y1: "85", x2: "80", y2: "25", stroke: "#78350f", strokeWidth: "2.5" }),
    e.jsx("line", { x1: "80", y1: "85", x2: "20", y2: "25", stroke: "#78350f", strokeWidth: "2.5" }),
    e.jsx("polygon", { points: "80,25 84,20 86,26", fill: "#d97706" }),
    e.jsx("polygon", { points: "20,25 16,20 14,26", fill: "#d97706" }),
    // Light Oval Parma Shield
    e.jsx("ellipse", { cx: "50", cy: "62", rx: "22", ry: "26", fill: "#a16207", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "62", r: "6", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "1.2" })
  ]}),

  // 2. Frontier Hastati Cohort (Tier 2) - Bronze Pectoral & Pilum
  legion_hastati: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    // Montefortino Helmet
    e.jsx("path", { d: "M 32,32 C 32,16 42,10 50,10 C 58,10 68,16 68,32 L 68,38 L 32,38 Z", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "8", r: "3", fill: "#b45309" }),
    // Pilum Spear
    e.jsx("line", { x1: "76", y1: "88", x2: "76", y2: "14", stroke: "#78350f", strokeWidth: "2.5" }),
    e.jsx("line", { x1: "76", y1: "14", x2: "76", y2: "6", stroke: "#a1a1aa", strokeWidth: "1.8" }),
    e.jsx("polygon", { points: "76,6 74,9 78,9", fill: "#71717a" }),
    // Square Bronze Heart Guard (Pectorale)
    e.jsx("rect", { x: "24", y: "44", width: "42", height: "46", rx: "3", fill: "#991b1b", stroke: "#ca8a04", strokeWidth: "2" }),
    e.jsx("circle", { cx: "45", cy: "67", r: "10", fill: "#d97706", stroke: "#78350f", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "45", cy: "67", r: "4", fill: "#fef08a" })
  ]}),

  // 3. Veteran Principes Line (Tier 3) - Chainmail & Red Scutum
  legion_principes: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    // Gallic Helmet with Red Crest
    e.jsx("path", { d: "M 32,34 C 32,18 42,12 50,12 C 58,12 68,18 68,34 L 72,40 L 28,40 Z", fill: "#a1a1aa", stroke: "#52525b", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 48,4 Q 50,0 52,4 L 52,12 L 48,12 Z", fill: "#dc2626" }),
    // Heavy Pilum
    e.jsx("line", { x1: "80", y1: "90", x2: "80", y2: "10", stroke: "#78350f", strokeWidth: "2.8" }),
    e.jsx("line", { x1: "80", y1: "10", x2: "80", y2: "4", stroke: "#e4e4e7", strokeWidth: "1.8" }),
    // Classical Red Rectangular Scutum
    e.jsx("rect", { x: "20", y: "38", width: "52", height: "54", rx: "4", fill: "#b91c1c", stroke: "#facc15", strokeWidth: "2" }),
    // Winged Golden Thunderbolt Boss
    e.jsx("circle", { cx: "46", cy: "65", r: "9", fill: "#eab308", stroke: "#78350f", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "30", y1: "65", x2: "62", y2: "65", stroke: "#fef08a", strokeWidth: "2" }),
    e.jsx("line", { x1: "46", y1: "48", x2: "46", y2: "82", stroke: "#fef08a", strokeWidth: "2" })
  ]}),

  // 4. Triarii Vanguard Phalanx (Tier 4) - Heavy Hasta Spear & Bronze Cuirass
  legion_triarii: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    // Transverse Crest Helmet
    e.jsx("path", { d: "M 30,34 C 30,16 42,12 50,12 C 58,12 70,16 70,34 L 72,40 L 28,40 Z", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "1.8" }),
    e.jsx("path", { d: "M 22,12 Q 50,6 78,12 L 76,17 Q 50,11 24,17 Z", fill: "#b91c1c" }),
    // Massive Hasta Thrusting Spear
    e.jsx("line", { x1: "84", y1: "94", x2: "84", y2: "8", stroke: "#78350f", strokeWidth: "3.2" }),
    e.jsx("polygon", { points: "84,8 81,18 87,18", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
    // Muscled Bronze Cuirass & Shield
    e.jsx("path", { d: "M 26,44 C 26,40 34,40 38,44 C 42,42 48,42 50,44 C 52,42 58,42 62,44 C 66,40 74,40 74,44 L 72,82 C 64,88 36,88 28,82 Z", fill: "#d97706", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("circle", { cx: "42", cy: "56", r: "5", fill: "#b45309" }),
    e.jsx("circle", { cx: "58", cy: "56", r: "5", fill: "#b45309" })
  ]}),

  // 5. Imperial Legionary Cohort (Tier 5) - Full Lorica Segmentata & Jupiter Fulmen
  legion_cohort: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    // Imperial Italic Helmet
    e.jsx("path", { d: "M 30,32 C 30,16 42,10 50,10 C 58,10 70,16 70,32 L 74,38 L 26,38 Z", fill: "#e4e4e7", stroke: "#52525b", strokeWidth: "1.8" }),
    e.jsx("path", { d: "M 48,4 L 52,4 L 52,10 L 48,10 Z", fill: "#ca8a04" }),
    // Full Lorica Segmentata Iron Bands
    e.jsx("rect", { x: "24", y: "40", width: "52", height: "7", rx: "1.5", fill: "#d4d4d8", stroke: "#71717a", strokeWidth: "1" }),
    e.jsx("rect", { x: "24", y: "48", width: "52", height: "7", rx: "1.5", fill: "#a1a1aa", stroke: "#71717a", strokeWidth: "1" }),
    e.jsx("rect", { x: "24", y: "56", width: "52", height: "7", rx: "1.5", fill: "#d4d4d8", stroke: "#71717a", strokeWidth: "1" }),
    e.jsx("rect", { x: "24", y: "64", width: "52", height: "7", rx: "1.5", fill: "#a1a1aa", stroke: "#71717a", strokeWidth: "1" }),
    // Imperial Red Scutum with Golden Winged Lightning
    e.jsx("rect", { x: "16", y: "40", width: "32", height: "54", rx: "3", fill: "#991b1b", stroke: "#facc15", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "32", cy: "67", r: "5.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("polygon", { points: "32,54 36,63 32,60 28,63", fill: "#fde047" }),
    e.jsx("polygon", { points: "32,80 36,71 32,74 28,71", fill: "#fde047" })
  ]}),

  // 6. Imperial Shock Equites (Tier 6) - Draco Standard & Cavalry
  legion_equites: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    // Draco Standard Head & Windsock
    e.jsx("line", { x1: "76", y1: "92", x2: "76", y2: "12", stroke: "#78350f", strokeWidth: "3" }),
    e.jsx("path", { d: "M 76,14 C 82,10 88,12 88,18 C 88,24 80,26 76,22 Z", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 76,22 Q 62,28 52,22 Q 42,28 32,24", stroke: "#dc2626", strokeWidth: "5", strokeLinecap: "round", fill: "none" }),
    // Cavalry Round Parma Equestris
    e.jsx("circle", { cx: "42", cy: "62", r: "24", fill: "#1e3a8a", stroke: "#facc15", strokeWidth: "2" }),
    e.jsx("circle", { cx: "42", cy: "62", r: "7", fill: "#facc15", stroke: "#1e3a8a", strokeWidth: "1.2" }),
    // Long Spatha Sword
    e.jsx("line", { x1: "20", y1: "84", x2: "56", y2: "42", stroke: "#e4e4e7", strokeWidth: "2.8" }),
    e.jsx("polygon", { points: "56,42 59,40 57,45", fill: "#facc15" })
  ]}),

  // 7. Iron Clibanarii Heavy Lancers (Tier 7) - Super-Heavy Cataphract
  legion_cataphract: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    // Barred Iron Face Mask & Helmet
    e.jsx("path", { d: "M 32,32 C 32,16 42,10 50,10 C 58,10 68,16 68,32 L 68,44 L 32,44 Z", fill: "#3f3f46", stroke: "#a1a1aa", strokeWidth: "1.8" }),
    e.jsx("line", { x1: "40", y1: "26", x2: "60", y2: "26", stroke: "#facc15", strokeWidth: "1.5" }),
    e.jsx("line", { x1: "42", y1: "34", x2: "58", y2: "34", stroke: "#e4e4e7", strokeWidth: "1" }),
    e.jsx("line", { x1: "44", y1: "38", x2: "56", y2: "38", stroke: "#e4e4e7", strokeWidth: "1" }),
    // Two-Handed Kontos Heavy Lance
    e.jsx("line", { x1: "12", y1: "92", x2: "88", y2: "12", stroke: "#52525b", strokeWidth: "3.5" }),
    e.jsx("polygon", { points: "88,12 94,8 90,16", fill: "#e4e4e7" }),
    // Iron Armored Scale Cuirass
    e.jsx("path", { d: "M 26,46 L 74,46 L 70,86 L 30,86 Z", fill: "#27272a", stroke: "#a1a1aa", strokeWidth: "2" }),
    e.jsx("line", { x1: "30", y1: "54", x2: "70", y2: "54", stroke: "#71717a", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "32", y1: "64", x2: "68", y2: "64", stroke: "#71717a", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "34", y1: "74", x2: "66", y2: "74", stroke: "#71717a", strokeWidth: "1.2" })
  ]}),

  // 8. Praetorian Imperial Guard (Tier 8) - Royal Purple & Scorpion Scutum
  legion_praetorian: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    // Attic Crested Helmet with Royal Crest
    e.jsx("path", { d: "M 32,32 C 32,16 42,10 50,10 C 58,10 68,16 68,32 L 72,40 L 28,40 Z", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("path", { d: "M 28,10 Q 50,2 72,10 L 70,16 Q 50,8 30,16 Z", fill: "#4c1d95" }),
    // Royal Purple Scutum with Golden Scorpion Insignia
    e.jsx("rect", { x: "22", y: "36", width: "56", height: "58", rx: "4", fill: "#3b0764", stroke: "#fde047", strokeWidth: "2.2" }),
    // Golden Scorpion Centerpiece
    e.jsx("ellipse", { cx: "50", cy: "64", rx: "6", ry: "9", fill: "#facc15" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "4", fill: "#facc15" }),
    e.jsx("path", { d: "M 48,73 Q 50,80 54,82 Q 58,80 56,76", stroke: "#facc15", strokeWidth: "2.2", fill: "none" }),
    e.jsx("circle", { cx: "36", cy: "48", r: "2.5", fill: "#fde047" }),
    e.jsx("circle", { cx: "64", cy: "48", r: "2.5", fill: "#fde047" }),
    e.jsx("circle", { cx: "36", cy: "80", r: "2.5", fill: "#fde047" }),
    e.jsx("circle", { cx: "64", cy: "80", r: "2.5", fill: "#fde047" })
  ]}),

  // 9. Scholae Palatinae Constantinia (Tier 9) - Chi-Rho Labarum Standard & Gilded Armor
  legion_palatinae: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    // Imperial Labarum Standard
    e.jsx("line", { x1: "78", y1: "94", x2: "78", y2: "8", stroke: "#ca8a04", strokeWidth: "3.5" }),
    e.jsx("rect", { x: "64", y: "12", width: "28", height: "24", rx: "2", fill: "#581c87", stroke: "#fde047", strokeWidth: "1.5" }),
    // Golden Chi-Rho on Labarum
    e.jsx("path", { d: "M 78,16 L 78,30 M 74,18 L 82,18 M 78,18 C 82,18 82,23 78,23", stroke: "#fde047", strokeWidth: "1.5", strokeLinecap: "round" }),
    // Constantinian Gilded Muscle Cuirass & Purple Mantle
    e.jsx("path", { d: "M 16,36 C 16,28 28,26 44,26 C 60,26 72,28 72,36 L 68,84 C 58,90 32,90 20,84 Z", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("path", { d: "M 14,36 C 8,46 10,70 18,84 L 24,84 L 22,38 Z", fill: "#581c87" }),
    e.jsx("circle", { cx: "34", cy: "50", r: "6", fill: "#fde047" }),
    e.jsx("circle", { cx: "54", cy: "50", r: "6", fill: "#fde047" })
  ]}),

  // 10. Sacrum Imperium Cohors Invicta (Tier 10) - Radiate Crown & Divine Aegis
  legion_invicta: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    // Divine Golden Radiant Crown
    e.jsx("polygon", { points: "50,2 46,14 54,14", fill: "#fde047" }),
    e.jsx("polygon", { points: "34,6 36,16 42,14", fill: "#fde047" }),
    e.jsx("polygon", { points: "66,6 58,14 64,16", fill: "#fde047" }),
    e.jsx("polygon", { points: "22,14 28,20 32,16", fill: "#fde047" }),
    e.jsx("polygon", { points: "78,14 68,16 72,20", fill: "#fde047" }),
    // Golden Radiate Head of Apollo / Sol Invictus
    e.jsx("circle", { cx: "50", cy: "28", r: "14", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "2" }),
    // Celestial Chi-Rho Aegis Shield
    e.jsx("circle", { cx: "50", cy: "66", r: "28", fill: "#0284c7", stroke: "#fde047", strokeWidth: "3", filter: "drop-shadow(0 0 10px rgba(253,224,71,0.8))" }),
    e.jsx("circle", { cx: "50", cy: "66", r: "22", fill: "#0369a1", stroke: "#fde047", strokeWidth: "1.5" }),
    // Golden Chi-Rho Symbol
    e.jsx("path", { d: "M 50,50 L 50,82 M 42,56 L 58,56 M 50,56 C 58,56 58,66 50,66", stroke: "#fde047", strokeWidth: "3.2", strokeLinecap: "round" }),
    e.jsx("line", { x1: "42", y1: "60", x2: "58", y2: "74", stroke: "#fde047", strokeWidth: "2.5" }),
    e.jsx("line", { x1: "58", y1: "60", x2: "42", y2: "74", stroke: "#fde047", strokeWidth: "2.5" })
  ]})
};

console.log("Master SVGs defined successfully!");
`;

try {
  esbuild.transformSync(code, { loader: "jsx" });
  console.log("[SUCCESS] All 21 master SVGs compiled cleanly via esbuild!");
  fs.writeFileSync("scripts/master_svg_catalog.cjs", code, "utf8");
} catch(err) {
  console.error("Compilation error in master SVGs:", err);
  process.exit(1);
}
