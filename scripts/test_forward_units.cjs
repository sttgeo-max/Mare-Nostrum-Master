const fs = require("fs");
const esbuild = require("esbuild");

// Masterwork FORWARD-FACING Unit & Fleet SVGs (Frontal / Symmetrical Perspective matching Roman Medallions)
const forwardFacingUnits = {
  // === 1. FORWARD-FACING CORSAIR / PIRATE FLEETS ===
  pirate_king: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#0f172a", opacity: "0.6" }),
    e.jsx("path", { d: "M 26,72 L 50,86 L 74,72 L 68,52 L 32,52 Z", fill: "#334155", stroke: "#0f172a", strokeWidth: "2" }),
    e.jsx("polygon", { points: "50,86 45,96 55,96", fill: "#dc2626", stroke: "#991b1b", strokeWidth: "1" }),
    e.jsx("line", { x1: "50", y1: "10", x2: "50", y2: "74", stroke: "#e2e8f0", strokeWidth: "3" }),
    e.jsx("path", { d: "M 18,22 Q 50,14 82,22 L 76,46 Q 50,40 24,46 Z", fill: "#b91c1c", stroke: "#7f1d1d", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "32", r: "5.5", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("path", { d: "M 44,40 L 56,28 M 44,28 L 56,40", stroke: "#fef08a", strokeWidth: "1.5", strokeLinecap: "round" }),
    e.jsx("polygon", { points: "50,8 44,14 56,14", fill: "#facc15" }),
    e.jsx("path", { d: "M 14,58 L 28,54 M 12,66 L 26,62 M 86,58 L 72,54 M 88,66 L 74,62", stroke: "#f8fafc", strokeWidth: "2.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 10,78 Q 30,70 50,76 Q 70,70 90,78", fill: "none", stroke: "#67e8f9", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  corsair_admiral_flagship: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#0f172a", opacity: "0.6" }),
    e.jsx("path", { d: "M 24,72 L 50,86 L 76,72 L 70,50 L 30,50 Z", fill: "#1e293b", stroke: "#0f172a", strokeWidth: "2" }),
    e.jsx("polygon", { points: "50,86 44,96 56,96", fill: "#f59e0b", stroke: "#b45309", strokeWidth: "1" }),
    e.jsx("line", { x1: "50", y1: "8", x2: "50", y2: "74", stroke: "#facc15", strokeWidth: "3" }),
    e.jsx("path", { d: "M 16,18 Q 50,10 84,18 L 78,44 Q 50,38 22,44 Z", fill: "#7f1d1d", stroke: "#991b1b", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 50,22 L 54,30 L 62,30 L 56,36 L 58,44 L 50,38 L 42,44 L 44,36 L 38,30 L 46,30 Z", fill: "#facc15" }),
    e.jsx("polygon", { points: "50,6 42,12 58,12", fill: "#dc2626" }),
    e.jsx("path", { d: "M 12,56 L 28,52 M 10,64 L 26,60 M 88,56 L 72,52 M 90,64 L 74,60", stroke: "#facc15", strokeWidth: "2.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 8,78 Q 28,70 50,76 Q 72,70 92,78", fill: "none", stroke: "#bae6fd", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // === 2. FORWARD-FACING PRAETORIAN & IMPERIAL DREADNOUGHT WARSHIPS ===
  infernus: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#450a0a", opacity: "0.6" }),
    e.jsx("path", { d: "M 22,72 L 50,88 L 78,72 L 72,48 L 28,48 Z", fill: "#7f1d1d", stroke: "#450a0a", strokeWidth: "2" }),
    e.jsx("polygon", { points: "50,88 44,98 56,98", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "50", y1: "6", x2: "50", y2: "74", stroke: "#facc15", strokeWidth: "3.5" }),
    e.jsx("path", { d: "M 14,16 Q 50,8 86,16 L 80,42 Q 50,34 20,42 Z", fill: "#581c87", stroke: "#3b0764", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 40,24 L 60,24 L 56,32 L 44,32 Z", fill: "#facc15" }),
    e.jsx("polygon", { points: "50,22 46,38 54,38", fill: "#dc2626" }),
    e.jsx("polygon", { points: "50,4 42,10 58,10", fill: "#facc15" }),
    e.jsx("path", { d: "M 10,54 L 26,50 M 8,62 L 24,58 M 90,54 L 74,50 M 92,62 L 76,58", stroke: "#facc15", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 8,78 Q 28,70 50,76 Q 72,70 92,78", fill: "none", stroke: "#fbcfe8", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  mythic_dreadnought_galley: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#450a0a", opacity: "0.6" }),
    e.jsx("path", { d: "M 22,72 L 50,88 L 78,72 L 72,48 L 28,48 Z", fill: "#7f1d1d", stroke: "#450a0a", strokeWidth: "2" }),
    e.jsx("polygon", { points: "50,88 44,98 56,98", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "50", y1: "6", x2: "50", y2: "74", stroke: "#facc15", strokeWidth: "3.5" }),
    e.jsx("path", { d: "M 14,16 Q 50,8 86,16 L 80,42 Q 50,34 20,42 Z", fill: "#581c87", stroke: "#3b0764", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 40,24 L 60,24 L 56,32 L 44,32 Z", fill: "#facc15" }),
    e.jsx("polygon", { points: "50,22 46,38 54,38", fill: "#dc2626" }),
    e.jsx("polygon", { points: "50,4 42,10 58,10", fill: "#facc15" }),
    e.jsx("path", { d: "M 10,54 L 26,50 M 8,62 L 24,58 M 90,54 L 74,50 M 92,62 L 76,58", stroke: "#facc15", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 8,78 Q 28,70 50,76 Q 72,70 92,78", fill: "none", stroke: "#fbcfe8", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // === 3. FORWARD-FACING REGIONAL CORSAIRS & WARSHIPS ===
  liburnian_raiders: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 12,78 Q 50,70 88,78 L 88,88 L 12,88 Z", fill: "#1e293b", opacity: "0.5" }),
    e.jsx("path", { d: "M 28,72 L 50,84 L 72,72 L 66,54 L 34,54 Z", fill: "#475569", stroke: "#1e293b", strokeWidth: "1.8" }),
    e.jsx("polygon", { points: "50,84 46,92 54,92", fill: "#f59e0b" }),
    e.jsx("line", { x1: "50", y1: "14", x2: "50", y2: "74", stroke: "#cbd5e1", strokeWidth: "2.5" }),
    e.jsx("path", { d: "M 22,24 Q 50,18 78,24 L 72,46 Q 50,40 28,46 Z", fill: "#0369a1", stroke: "#075985", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 16,60 L 30,56 M 14,68 L 28,64 M 84,60 L 70,56 M 86,68 L 72,64", stroke: "#f8fafc", strokeWidth: "2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 10,78 Q 30,72 50,76 Q 70,72 90,78", fill: "none", stroke: "#38bdf8", strokeWidth: "2", strokeLinecap: "round" })
  ]})`,

  // === 4. FORWARD-FACING ROMAN LEGIONARY & CENTURION VISAGES ===
  veteran_centurion_guard: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 16,24 Q 50,6 84,24 L 80,32 Q 50,14 20,32 Z", fill: "#dc2626", stroke: "#991b1b", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 28,44 C 28,26 36,18 50,18 C 64,18 72,26 72,44 C 72,64 66,74 50,74 C 34,74 28,64 28,44 Z", fill: "#d97706", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("rect", { x: "26", y: "34", width: "48", height: "8", rx: "2", fill: "#facc15", stroke: "#b45309", strokeWidth: "1" }),
    e.jsx("rect", { x: "47", y: "34", width: "6", height: "24", fill: "#facc15" }),
    e.jsx("path", { d: "M 32,46 L 44,46 L 42,60 L 34,58 Z", fill: "#b45309" }),
    e.jsx("path", { d: "M 68,46 L 56,46 L 58,60 L 66,58 Z", fill: "#b45309" }),
    e.jsx("circle", { cx: "38", cy: "52", r: "2.5", fill: "#000" }),
    e.jsx("circle", { cx: "62", cy: "52", r: "2.5", fill: "#000" }),
    e.jsx("line", { x1: "14", y1: "86", x2: "86", y2: "14", stroke: "#e2e8f0", strokeWidth: "3", strokeLinecap: "round" }),
    e.jsx("line", { x1: "86", y1: "86", x2: "14", y2: "14", stroke: "#e2e8f0", strokeWidth: "3", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 34,78 C 44,88 56,88 66,78 L 50,94 Z", fill: "#b91c1c", stroke: "#7f1d1d", strokeWidth: "1.5" })
  ]})`,

  roman_patrol_legionary: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 46,8 L 54,8 L 52,24 L 48,24 Z", fill: "#dc2626" }),
    e.jsx("path", { d: "M 28,44 C 28,26 36,18 50,18 C 64,18 72,26 72,44 C 72,64 66,74 50,74 C 34,74 28,64 28,44 Z", fill: "#94a3b8", stroke: "#334155", strokeWidth: "2" }),
    e.jsx("rect", { x: "26", y: "34", width: "48", height: "8", rx: "2", fill: "#facc15", stroke: "#b45309", strokeWidth: "1" }),
    e.jsx("rect", { x: "47", y: "34", width: "6", height: "24", fill: "#facc15" }),
    e.jsx("circle", { cx: "38", cy: "52", r: "2.5", fill: "#000" }),
    e.jsx("circle", { cx: "62", cy: "52", r: "2.5", fill: "#000" }),
    e.jsx("path", { d: "M 20,40 L 80,40 L 76,86 C 50,96 50,96 24,86 Z", fill: "#dc2626", stroke: "#991b1b", strokeWidth: "1.5", opacity: "0.85" }),
    e.jsx("path", { d: "M 42,56 L 58,56 M 50,48 L 50,64", stroke: "#facc15", strokeWidth: "2" })
  ]})`,

  usurper_maxentius: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 14,22 Q 50,4 86,22 L 82,32 Q 50,14 18,32 Z", fill: "#581c87", stroke: "#3b0764", strokeWidth: "2" }),
    e.jsx("path", { d: "M 28,44 C 28,26 36,18 50,18 C 64,18 72,26 72,44 C 72,64 66,74 50,74 C 34,74 28,64 28,44 Z", fill: "#eab308", stroke: "#854d0e", strokeWidth: "2" }),
    e.jsx("rect", { x: "26", y: "34", width: "48", height: "8", rx: "2", fill: "#facc15", stroke: "#713f12", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "50", cy: "38", r: "3", fill: "#dc2626" }),
    e.jsx("rect", { x: "47", y: "34", width: "6", height: "24", fill: "#facc15" }),
    e.jsx("circle", { cx: "38", cy: "52", r: "2.5", fill: "#000" }),
    e.jsx("circle", { cx: "62", cy: "52", r: "2.5", fill: "#000" }),
    e.jsx("path", { d: "M 26,78 C 38,90 62,90 74,78 L 50,96 Z", fill: "#581c87", stroke: "#facc15", strokeWidth: "1.5" })
  ]})`
};

let codeToTest = "const e = {}; const units = {\n" +
  Object.entries(forwardFacingUnits).map(([k, v]) => `  ${k}: ${v}`).join(",\n") +
  "\n};";

try {
  esbuild.transformSync(codeToTest, { loader: "jsx" });
  console.log("FORWARD-FACING UNITS TRANSFORM CLEANLY!");
} catch (e) {
  console.error("Transform error:", e);
}
