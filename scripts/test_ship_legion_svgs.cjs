const esbuild = require("esbuild");

const testCode = `
const e = {
  jsx: (type, props, key) => ({ type, props, key }),
  jsxs: (type, props, key) => ({ type, props, key })
};

const shipAndLegionSVGs = {
  // 1. Liburnian Skiff (Tier 1 - Light Scout)
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

  // 2. Liburnian Galley (Tier 2 - Swift Interceptor)
  ship_liburna_bellica: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,66 Q 46,74 84,65 L 96,60 L 86,56 L 18,56 Z", fill: "#451a03" }),
    e.jsx("path", { d: "M 14,56 C 10,42 16,32 24,26 C 26,34 20,44 16,56 Z", fill: "#b45309" }),
    e.jsx("path", { d: "M 84,65 L 98,60 L 92,56 L 84,56 Z", fill: "#f59e0b" }),
    e.jsx("rect", { x: "72", y: "48", width: "12", height: "8", rx: "1.5", fill: "#78350f", stroke: "#d97706", strokeWidth: "1" }),
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

  // 3. Classical Trireme (Tier 3 - Line Warship)
  ship_trireme_imperialis: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 8,68 Q 48,76 86,66 L 98,61 L 88,54 L 16,54 Z", fill: "#3b1d0e" }),
    e.jsx("path", { d: "M 14,54 C 8,40 14,28 22,22 C 24,30 18,42 16,54 Z", fill: "#b45309" }),
    e.jsx("path", { d: "M 86,66 L 100,61 L 94,54 L 84,54 Z", fill: "#d97706" }),
    e.jsx("polygon", { points: "98,61 103,59 97,55 92,57", fill: "#fde047" }),
    e.jsx("rect", { x: "20", y: "52", width: "64", height: "4", rx: "1", fill: "#92400e", stroke: "#d97706", strokeWidth: "0.8" }),
    e.jsx("line", { x1: "50", y1: "18", x2: "50", y2: "54", stroke: "#78350f", strokeWidth: "2.8" }),
    e.jsx("line", { x1: "26", y1: "23", x2: "74", y2: "23", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("path", { d: "M 28,24 Q 50,30 72,24 L 70,47 Q 50,53 30,47 Z", fill: "#b91c1c", stroke: "#991b1b", strokeWidth: "1" }),
    e.jsx("circle", { cx: "50", cy: "36", r: "6", fill: "none", stroke: "#facc15", strokeWidth: "1.2" }),
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
  ]})
};

console.log("Syntax valid for sample ships!");
`;

esbuild.transformSync(testCode, { loader: "jsx" });
console.log("Compiled testCode clean!");
