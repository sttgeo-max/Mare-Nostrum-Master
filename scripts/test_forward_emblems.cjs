const fs = require("fs");
const esbuild = require("esbuild");

const forwardFacingEmblems = {
  // 1. FORWARD-FACING ROMAN SHIP (Frontal perspective Imperial Galley)
  emblem_ship_roman: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#3b1d0e", opacity: "0.5" }),
    e.jsx("path", { d: "M 24,72 L 50,88 L 76,72 L 70,50 L 30,50 Z", fill: "#582a13", stroke: "#3b1d0e", strokeWidth: "2" }),
    e.jsx("polygon", { points: "50,88 44,98 56,98", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "50", y1: "6", x2: "50", y2: "74", stroke: "#facc15", strokeWidth: "3.5" }),
    e.jsx("path", { d: "M 14,16 Q 50,8 86,16 L 80,44 Q 50,36 20,44 Z", fill: "#b91c1c", stroke: "#7f1d1d", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "28", r: "6", fill: "none", stroke: "#facc15", strokeWidth: "1.8" }),
    e.jsx("polygon", { points: "50,23 48,29 52,29", fill: "#facc15" }),
    e.jsx("polygon", { points: "50,4 42,10 58,10", fill: "#facc15" }),
    e.jsx("path", { d: "M 10,56 L 26,52 M 8,64 L 24,60 M 90,56 L 74,52 M 92,64 L 76,60", stroke: "#facc15", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 8,78 Q 28,70 50,76 Q 72,70 92,78", fill: "none", stroke: "#38bdf8", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 2. FORWARD-FACING PIRATE / CORSAIR SHIP (Frontal perspective Corsair Raider)
  emblem_ship_pirate: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#0f172a", opacity: "0.6" }),
    e.jsx("path", { d: "M 24,72 L 50,86 L 76,72 L 70,50 L 30,50 Z", fill: "#1e293b", stroke: "#0f172a", strokeWidth: "2" }),
    e.jsx("polygon", { points: "50,86 44,96 56,96", fill: "#dc2626", stroke: "#991b1b", strokeWidth: "1" }),
    e.jsx("line", { x1: "50", y1: "8", x2: "50", y2: "74", stroke: "#e2e8f0", strokeWidth: "3" }),
    e.jsx("path", { d: "M 16,18 Q 50,10 84,18 L 78,44 Q 50,38 22,44 Z", fill: "#7f1d1d", stroke: "#991b1b", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "30", r: "5.5", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("path", { d: "M 44,38 L 56,26 M 44,26 L 56,38", stroke: "#fef08a", strokeWidth: "1.5", strokeLinecap: "round" }),
    e.jsx("polygon", { points: "50,6 42,12 58,12", fill: "#facc15" }),
    e.jsx("path", { d: "M 12,56 L 28,52 M 10,64 L 26,60 M 88,56 L 72,52 M 90,64 L 74,60", stroke: "#f8fafc", strokeWidth: "2.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 8,78 Q 28,70 50,76 Q 72,70 92,78", fill: "none", stroke: "#67e8f9", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 3. FORWARD-FACING REBEL SHIP
  emblem_ship_rebel: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#1c1917", opacity: "0.6" }),
    e.jsx("path", { d: "M 24,72 L 50,86 L 76,72 L 70,50 L 30,50 Z", fill: "#292524", stroke: "#1c1917", strokeWidth: "2" }),
    e.jsx("polygon", { points: "50,86 44,96 56,96", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1" }),
    e.jsx("line", { x1: "50", y1: "8", x2: "50", y2: "74", stroke: "#d97706", strokeWidth: "3" }),
    e.jsx("path", { d: "M 16,18 Q 50,10 84,18 L 78,44 Q 50,38 22,44 Z", fill: "#991b1b", stroke: "#7f1d1d", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 50,22 L 54,30 L 62,30 L 56,36 L 58,44 L 50,38 L 42,44 L 44,36 L 38,30 L 46,30 Z", fill: "#facc15" }),
    e.jsx("polygon", { points: "50,6 42,12 58,12", fill: "#dc2626" }),
    e.jsx("path", { d: "M 12,56 L 28,52 M 10,64 L 26,60 M 88,56 L 72,52 M 90,64 L 74,60", stroke: "#facc15", strokeWidth: "2.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 8,78 Q 28,70 50,76 Q 72,70 92,78", fill: "none", stroke: "#fca5a5", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 4. FORWARD-FACING PUNIC SHIP
  emblem_ship_punic: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#3b0764", opacity: "0.6" }),
    e.jsx("path", { d: "M 24,72 L 50,86 L 76,72 L 70,50 L 30,50 Z", fill: "#451a03", stroke: "#3b0764", strokeWidth: "2" }),
    e.jsx("polygon", { points: "50,86 44,96 56,96", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1" }),
    e.jsx("line", { x1: "50", y1: "8", x2: "50", y2: "74", stroke: "#facc15", strokeWidth: "3" }),
    e.jsx("path", { d: "M 16,18 Q 50,10 84,18 L 78,44 Q 50,38 22,44 Z", fill: "#581c87", stroke: "#3b0764", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "26", r: "4", fill: "#facc15" }),
    e.jsx("line", { x1: "42", y1: "34", x2: "58", y2: "34", stroke: "#facc15", strokeWidth: "2" }),
    e.jsx("polygon", { points: "50,34 44,42 56,42", fill: "#facc15" }),
    e.jsx("polygon", { points: "50,6 42,12 58,12", fill: "#facc15" }),
    e.jsx("path", { d: "M 12,56 L 28,52 M 10,64 L 26,60 M 88,56 L 72,52 M 90,64 L 74,60", stroke: "#facc15", strokeWidth: "2.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 8,78 Q 28,70 50,76 Q 72,70 92,78", fill: "none", stroke: "#e9d5ff", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 5. FORWARD-FACING DROMON FIRE SHIP
  emblem_ship_dromon: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#450a0a", opacity: "0.6" }),
    e.jsx("path", { d: "M 24,72 L 50,86 L 76,72 L 70,50 L 30,50 Z", fill: "#7f1d1d", stroke: "#450a0a", strokeWidth: "2" }),
    e.jsx("polygon", { points: "50,86 44,96 56,96", fill: "#ea580c", stroke: "#c2410c", strokeWidth: "1" }),
    e.jsx("line", { x1: "50", y1: "8", x2: "50", y2: "74", stroke: "#facc15", strokeWidth: "3" }),
    e.jsx("path", { d: "M 16,18 Q 50,10 84,18 L 78,44 Q 50,38 22,44 Z", fill: "#0284c7", stroke: "#0369a1", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 48,22 C 48,26 44,28 44,32 C 44,36 48,38 50,42 C 52,38 56,36 56,32 C 56,28 52,26 52,22 Z", fill: "#f97316" }),
    e.jsx("polygon", { points: "50,6 42,12 58,12", fill: "#f97316" }),
    e.jsx("path", { d: "M 12,56 L 28,52 M 10,64 L 26,60 M 88,56 L 72,52 M 90,64 L 74,60", stroke: "#facc15", strokeWidth: "2.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 8,78 Q 28,70 50,76 Q 72,70 92,78", fill: "none", stroke: "#fed7aa", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 6. FORWARD-FACING ROMAN LEGION
  emblem_legion_roman: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 14,20 Q 50,2 86,20 L 82,30 Q 50,12 18,30 Z", fill: "#dc2626", stroke: "#991b1b", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 28,42 C 28,24 36,16 50,16 C 64,16 72,24 72,42 C 72,62 66,72 50,72 C 34,72 28,62 28,42 Z", fill: "#94a3b8", stroke: "#334155", strokeWidth: "2" }),
    e.jsx("rect", { x: "26", y: "32", width: "48", height: "8", rx: "2", fill: "#facc15", stroke: "#b45309", strokeWidth: "1" }),
    e.jsx("rect", { x: "47", y: "32", width: "6", height: "24", fill: "#facc15" }),
    e.jsx("circle", { cx: "38", cy: "50", r: "2.5", fill: "#000" }),
    e.jsx("circle", { cx: "62", cy: "50", r: "2.5", fill: "#000" }),
    e.jsx("line", { x1: "12", y1: "88", x2: "88", y2: "12", stroke: "#facc15", strokeWidth: "3", strokeLinecap: "round" }),
    e.jsx("line", { x1: "88", y1: "88", x2: "12", y2: "12", stroke: "#facc15", strokeWidth: "3", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 22,46 L 78,46 L 74,86 C 50,96 50,96 26,86 Z", fill: "#dc2626", stroke: "#991b1b", strokeWidth: "1.5", opacity: "0.85" }),
    e.jsx("path", { d: "M 42,62 L 58,62 M 50,54 L 50,70", stroke: "#facc15", strokeWidth: "2" })
  ]})`,

  // 7. FORWARD-FACING REBEL LEGION
  emblem_legion_rebel: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 14,20 Q 50,2 86,20 L 82,30 Q 50,12 18,30 Z", fill: "#991b1b", stroke: "#7f1d1d", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 28,42 C 28,24 36,16 50,16 C 64,16 72,24 72,42 C 72,62 66,72 50,72 C 34,72 28,62 28,42 Z", fill: "#64748b", stroke: "#1e293b", strokeWidth: "2" }),
    e.jsx("rect", { x: "26", y: "32", width: "48", height: "8", rx: "2", fill: "#ca8a04", stroke: "#713f12", strokeWidth: "1" }),
    e.jsx("rect", { x: "47", y: "32", width: "6", height: "24", fill: "#ca8a04" }),
    e.jsx("circle", { cx: "38", cy: "50", r: "2.5", fill: "#000" }),
    e.jsx("circle", { cx: "62", cy: "50", r: "2.5", fill: "#000" }),
    e.jsx("line", { x1: "12", y1: "88", x2: "88", y2: "12", stroke: "#e2e8f0", strokeWidth: "3", strokeLinecap: "round" }),
    e.jsx("line", { x1: "88", y1: "88", x2: "12", y2: "12", stroke: "#e2e8f0", strokeWidth: "3", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 22,46 L 78,46 L 74,86 C 50,96 50,96 26,86 Z", fill: "#7f1d1d", stroke: "#450a0a", strokeWidth: "1.5", opacity: "0.85" }),
    e.jsx("path", { d: "M 42,62 L 58,62 M 50,54 L 50,70", stroke: "#e2e8f0", strokeWidth: "2" })
  ]})`,

  // 8. FORWARD-FACING PUNIC / MERCENARY LEGION
  emblem_legion_punic: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 14,20 Q 50,2 86,20 L 82,30 Q 50,12 18,30 Z", fill: "#581c87", stroke: "#3b0764", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 28,42 C 28,24 36,16 50,16 C 64,16 72,24 72,42 C 72,62 66,72 50,72 C 34,72 28,62 28,42 Z", fill: "#d97706", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("rect", { x: "26", y: "32", width: "48", height: "8", rx: "2", fill: "#facc15", stroke: "#713f12", strokeWidth: "1" }),
    e.jsx("rect", { x: "47", y: "32", width: "6", height: "24", fill: "#facc15" }),
    e.jsx("circle", { cx: "38", cy: "50", r: "2.5", fill: "#000" }),
    e.jsx("circle", { cx: "62", cy: "50", r: "2.5", fill: "#000" }),
    e.jsx("line", { x1: "12", y1: "88", x2: "88", y2: "12", stroke: "#facc15", strokeWidth: "3", strokeLinecap: "round" }),
    e.jsx("line", { x1: "88", y1: "88", x2: "12", y2: "12", stroke: "#facc15", strokeWidth: "3", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "50", cy: "68", r: "22", fill: "#78350f", stroke: "#facc15", strokeWidth: "2", opacity: "0.9" }),
    e.jsx("circle", { cx: "50", cy: "68", r: "8", fill: "#facc15" })
  ]})`
};

let codeToTest = "const e = {}; const emblems = {\n" +
  Object.entries(forwardFacingEmblems).map(([k, v]) => `  ${k}: ${v}`).join(",\n") +
  "\n};";

try {
  esbuild.transformSync(codeToTest, { loader: "jsx" });
  console.log("FORWARD-FACING EMBLEMS TRANSFORM CLEANLY!");
} catch (e) {
  console.error("Transform error:", e);
}
