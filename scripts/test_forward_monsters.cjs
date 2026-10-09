const fs = require("fs");
const esbuild = require("esbuild");

// Masterwork FORWARD-FACING Monster SVGs (Frontal / Symmetrical Perspective)
const forwardFacingMonsterSVGs = {
  // 1. Cetus Oceanus / Atlantic Leviathan (Forward-Facing Sea Dragon / Leviathan Maw)
  cetus_atlantic_leviathan: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#0369a1", opacity: "0.6" }),
    e.jsx("path", { d: "M 22,65 C 22,35 34,18 50,18 C 66,18 78,35 78,65 C 78,78 64,84 50,84 C 36,84 22,78 22,65 Z", fill: "#0e7490", stroke: "#164e63", strokeWidth: "2" }),
    e.jsx("path", { d: "M 28,62 C 28,38 38,24 50,24 C 62,24 72,38 72,62 C 72,74 62,78 50,78 C 38,78 28,74 28,62 Z", fill: "#06b6d4", opacity: "0.9" }),
    e.jsx("path", { d: "M 50,6 L 46,18 L 54,18 Z M 36,14 L 38,24 L 32,22 Z M 64,14 L 62,24 L 68,22 Z M 24,28 L 28,36 L 22,36 Z M 76,28 L 72,36 L 78,36 Z", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1" }),
    e.jsx("circle", { cx: "36", cy: "42", r: "4.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "64", cy: "42", r: "4.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1.2" }),
    e.jsx("ellipse", { cx: "36", cy: "42", rx: "1.5", ry: "3.5", fill: "#fef08a" }),
    e.jsx("ellipse", { cx: "64", cy: "42", rx: "1.5", ry: "3.5", fill: "#fef08a" }),
    e.jsx("path", { d: "M 44,48 L 50,52 L 56,48", stroke: "#164e63", strokeWidth: "2", fill: "none" }),
    e.jsx("path", { d: "M 32,58 Q 50,52 68,58 Q 62,74 50,74 Q 38,74 32,58 Z", fill: "#155e75", stroke: "#083344", strokeWidth: "1.5" }),
    e.jsx("polygon", { points: "36,58 39,66 42,58", fill: "#fef08a" }),
    e.jsx("polygon", { points: "44,57 47,67 50,57", fill: "#fef08a" }),
    e.jsx("polygon", { points: "50,57 53,67 56,57", fill: "#fef08a" }),
    e.jsx("polygon", { points: "58,58 61,66 64,58", fill: "#fef08a" }),
    e.jsx("polygon", { points: "40,72 43,65 46,72", fill: "#fef08a" }),
    e.jsx("polygon", { points: "54,72 57,65 60,72", fill: "#fef08a" }),
    e.jsx("path", { d: "M 8,78 Q 28,68 50,74 Q 72,68 92,78", fill: "none", stroke: "#bae6fd", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 2. Abyssal Kraken (Forward-Facing Symmetrical Giant Kraken)
  abyssal_kraken_submerged: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 32,44 C 32,20 40,10 50,10 C 60,10 68,20 68,44 C 68,54 60,60 50,60 C 40,60 32,54 32,44 Z", fill: "#0f766e", stroke: "#134e4a", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 36,42 C 36,24 42,14 50,14 C 58,14 64,24 64,42 C 64,50 58,56 50,56 C 42,56 36,50 36,42 Z", fill: "#14b8a6", opacity: "0.9" }),
    e.jsx("path", { d: "M 42,12 L 50,4 L 58,12", fill: "#f59e0b", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("circle", { cx: "42", cy: "44", r: "4.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("circle", { cx: "58", cy: "44", r: "4.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("ellipse", { cx: "42", cy: "44", rx: "1.5", ry: "3", fill: "#042f2e" }),
    e.jsx("ellipse", { cx: "58", cy: "44", rx: "1.5", ry: "3", fill: "#042f2e" }),
    e.jsx("path", { d: "M 34,54 C 18,58 8,72 16,88 C 22,82 24,70 38,62", fill: "none", stroke: "#0d9488", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 66,54 C 82,58 92,72 84,88 C 78,82 76,70 62,62", fill: "none", stroke: "#0d9488", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 40,58 C 28,68 22,82 32,94 C 36,86 38,76 46,64", fill: "none", stroke: "#14b8a6", strokeWidth: "4", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 60,58 C 72,68 78,82 68,94 C 64,86 62,76 54,64", fill: "none", stroke: "#14b8a6", strokeWidth: "4", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 46,60 C 42,74 44,84 48,96", fill: "none", stroke: "#2dd4bf", strokeWidth: "3.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 54,60 C 58,74 56,84 52,96", fill: "none", stroke: "#2dd4bf", strokeWidth: "3.5", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "14", cy: "76", r: "1.8", fill: "#fef08a" }),
    e.jsx("circle", { cx: "86", cy: "76", r: "1.8", fill: "#fef08a" }),
    e.jsx("circle", { cx: "26", cy: "84", r: "1.8", fill: "#fef08a" }),
    e.jsx("circle", { cx: "74", cy: "84", r: "1.8", fill: "#fef08a" })
  ]})`,

  // 3. Great Leviathan Deep (Forward-Facing Abyssal Dragon)
  great_leviathan_deep: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#0369a1", opacity: "0.6" }),
    e.jsx("path", { d: "M 22,65 C 22,35 34,18 50,18 C 66,18 78,35 78,65 C 78,78 64,84 50,84 C 36,84 22,78 22,65 Z", fill: "#0e7490", stroke: "#164e63", strokeWidth: "2" }),
    e.jsx("path", { d: "M 28,62 C 28,38 38,24 50,24 C 62,24 72,38 72,62 C 72,74 62,78 50,78 C 38,78 28,74 28,62 Z", fill: "#06b6d4", opacity: "0.9" }),
    e.jsx("path", { d: "M 50,6 L 46,18 L 54,18 Z M 36,14 L 38,24 L 32,22 Z M 64,14 L 62,24 L 68,22 Z M 24,28 L 28,36 L 22,36 Z M 76,28 L 72,36 L 78,36 Z", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1" }),
    e.jsx("circle", { cx: "36", cy: "42", r: "4.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "64", cy: "42", r: "4.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1.2" }),
    e.jsx("ellipse", { cx: "36", cy: "42", rx: "1.5", ry: "3.5", fill: "#fef08a" }),
    e.jsx("ellipse", { cx: "64", cy: "42", rx: "1.5", ry: "3.5", fill: "#fef08a" }),
    e.jsx("path", { d: "M 44,48 L 50,52 L 56,48", stroke: "#164e63", strokeWidth: "2", fill: "none" }),
    e.jsx("path", { d: "M 32,58 Q 50,52 68,58 Q 62,74 50,74 Q 38,74 32,58 Z", fill: "#155e75", stroke: "#083344", strokeWidth: "1.5" }),
    e.jsx("polygon", { points: "36,58 39,66 42,58", fill: "#fef08a" }),
    e.jsx("polygon", { points: "44,57 47,67 50,57", fill: "#fef08a" }),
    e.jsx("polygon", { points: "50,57 53,67 56,57", fill: "#fef08a" }),
    e.jsx("polygon", { points: "58,58 61,66 64,58", fill: "#fef08a" }),
    e.jsx("polygon", { points: "40,72 43,65 46,72", fill: "#fef08a" }),
    e.jsx("polygon", { points: "54,72 57,65 60,72", fill: "#fef08a" }),
    e.jsx("path", { d: "M 8,78 Q 28,68 50,74 Q 72,68 92,78", fill: "none", stroke: "#bae6fd", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 4. Atlantic Sea Serpent (Forward-Facing Horned Sea Dragon)
  atlantic_sea_serpent: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 12,80 Q 50,70 88,80 L 88,88 L 12,88 Z", fill: "#064e3b", opacity: "0.6" }),
    e.jsx("path", { d: "M 26,62 C 26,36 36,22 50,22 C 64,22 74,36 74,62 C 74,76 62,82 50,82 C 38,82 26,76 26,62 Z", fill: "#047857", stroke: "#064e3b", strokeWidth: "2" }),
    e.jsx("path", { d: "M 32,58 C 32,40 40,28 50,28 C 60,28 68,40 68,58 C 68,70 60,76 50,76 C 40,76 32,70 32,58 Z", fill: "#10b981", opacity: "0.9" }),
    e.jsx("path", { d: "M 50,8 L 47,20 L 53,20 Z M 38,16 L 40,24 L 34,24 Z M 62,16 L 60,24 L 66,24 Z", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1" }),
    e.jsx("circle", { cx: "38", cy: "44", r: "4", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("circle", { cx: "62", cy: "44", r: "4", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("ellipse", { cx: "38", cy: "44", rx: "1.5", ry: "3", fill: "#7f1d1d" }),
    e.jsx("ellipse", { cx: "62", cy: "44", rx: "1.5", ry: "3", fill: "#7f1d1d" }),
    e.jsx("path", { d: "M 36,60 Q 50,56 64,60 Q 58,72 50,72 Q 42,72 36,60 Z", fill: "#065f46" }),
    e.jsx("polygon", { points: "40,60 43,66 46,60", fill: "#fff" }),
    e.jsx("polygon", { points: "54,60 57,66 60,60", fill: "#fff" }),
    e.jsx("path", { d: "M 50,66 L 50,76 L 46,80 M 50,76 L 54,80", stroke: "#ef4444", strokeWidth: "1.8", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 10,80 Q 30,72 50,78 Q 70,72 90,80", fill: "none", stroke: "#6ee7b7", strokeWidth: "2", strokeLinecap: "round" })
  ]})`,

  // 5. Charybdis Whirlpool Beast (Forward-Facing Oceanic Vortex)
  charybdis_whirlpool_beast: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("circle", { cx: "50", cy: "50", r: "42", fill: "#0c4a6e", stroke: "#0369a1", strokeWidth: "2" }),
    e.jsx("path", { d: "M 50,12 C 72,12 88,28 88,50 C 88,68 74,84 56,88 C 36,92 18,78 14,60 C 10,40 24,22 42,18 C 58,14 72,26 74,42 C 76,56 66,68 52,68 C 40,68 32,58 34,48 C 36,40 44,34 50,38 C 54,40 54,46 50,48", fill: "none", stroke: "#38bdf8", strokeWidth: "3.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 50,22 L 53,30 L 47,30 Z M 78,50 L 70,53 L 70,47 Z M 50,78 L 47,70 L 53,70 Z M 22,50 L 30,47 L 30,53 Z M 68,32 L 62,38 L 66,41 Z M 32,68 L 38,62 L 34,59 Z", fill: "#f8fafc", stroke: "#cbd5e1", strokeWidth: "0.8" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "7", fill: "#020617", stroke: "#ef4444", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "2.5", fill: "#facc15" })
  ]})`,

  // 6. Scylla Multi-Headed Monster (Forward-Facing Triple Hydra)
  sirens_scylla_monster: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 42,80 C 42,50 44,30 50,18 C 56,30 58,50 58,80", fill: "none", stroke: "#047857", strokeWidth: "6", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 42,80 C 34,60 26,44 18,30", fill: "none", stroke: "#059669", strokeWidth: "5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 58,80 C 66,60 74,44 82,30", fill: "none", stroke: "#059669", strokeWidth: "5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 44,18 L 50,10 L 56,18 L 50,24 Z", fill: "#10b981", stroke: "#047857", strokeWidth: "1" }),
    e.jsx("path", { d: "M 12,30 L 18,22 L 24,30 L 18,36 Z", fill: "#10b981", stroke: "#047857", strokeWidth: "1" }),
    e.jsx("path", { d: "M 76,30 L 82,22 L 88,30 L 82,36 Z", fill: "#10b981", stroke: "#047857", strokeWidth: "1" }),
    e.jsx("circle", { cx: "48", cy: "16", r: "1.5", fill: "#ef4444" }),
    e.jsx("circle", { cx: "52", cy: "16", r: "1.5", fill: "#ef4444" }),
    e.jsx("circle", { cx: "16", cy: "28", r: "1.5", fill: "#ef4444" }),
    e.jsx("circle", { cx: "20", cy: "28", r: "1.5", fill: "#ef4444" }),
    e.jsx("circle", { cx: "80", cy: "28", r: "1.5", fill: "#ef4444" }),
    e.jsx("circle", { cx: "84", cy: "28", r: "1.5", fill: "#ef4444" }),
    e.jsx("path", { d: "M 10,82 Q 30,74 50,80 Q 70,74 90,82", fill: "none", stroke: "#6ee7b7", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 7. Siren Enchantress (Forward-Facing Symmetrical Visage)
  siren_enchantress: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 24,42 C 22,20 34,12 50,12 C 66,12 78,20 76,42 C 74,60 62,70 50,70 C 38,70 26,60 24,42 Z", fill: "#f59e0b", stroke: "#b45309", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "38", r: "16", fill: "#fed7aa", stroke: "#ea580c", strokeWidth: "1" }),
    e.jsx("path", { d: "M 32,32 C 36,18 64,18 68,32 C 60,26 40,26 32,32 Z", fill: "#d97706" }),
    e.jsx("circle", { cx: "43", cy: "36", r: "2.5", fill: "#0284c7" }),
    e.jsx("circle", { cx: "57", cy: "36", r: "2.5", fill: "#0284c7" }),
    e.jsx("circle", { cx: "43", cy: "36", r: "1", fill: "#fff" }),
    e.jsx("circle", { cx: "57", cy: "36", r: "1", fill: "#fff" }),
    e.jsx("path", { d: "M 46,44 Q 50,48 54,44", fill: "none", stroke: "#e11d48", strokeWidth: "1.8", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 38,62 C 34,74 42,86 50,94 C 58,86 66,74 62,62 Z", fill: "#0d9488", stroke: "#042f2e", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 32,84 L 50,96 L 68,84 C 60,88 40,88 32,84 Z", fill: "#14b8a6", stroke: "#0f766e", strokeWidth: "1" }),
    e.jsx("path", { d: "M 42,14 L 50,6 L 58,14", stroke: "#facc15", strokeWidth: "2", fill: "#eab308" })
  ]})`,

  // 8. Cyclops Brute (Forward-Facing Symmetrical Titan Face)
  cyclops_brute: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 24,52 C 24,28 34,18 50,18 C 66,18 76,28 76,52 C 76,74 66,86 50,86 C 34,86 24,74 24,52 Z", fill: "#9a3412", stroke: "#431407", strokeWidth: "2" }),
    e.jsx("path", { d: "M 28,48 C 28,32 36,22 50,22 C 64,22 72,32 72,48 C 72,68 64,78 50,78 C 36,78 28,68 28,48 Z", fill: "#c2410c", opacity: "0.9" }),
    e.jsx("path", { d: "M 30,22 Q 50,12 70,22 L 68,28 Q 50,20 32,28 Z", fill: "#d97706", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("path", { d: "M 32,36 Q 50,28 68,36 Q 66,42 50,38 Q 34,42 32,36 Z", fill: "#431407" }),
    e.jsx("circle", { cx: "50", cy: "44", r: "10", fill: "#fef08a", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "44", r: "5.5", fill: "#dc2626" }),
    e.jsx("circle", { cx: "50", cy: "44", r: "2.5", fill: "#000" }),
    e.jsx("path", { d: "M 44,58 L 50,62 L 56,58", stroke: "#431407", strokeWidth: "2", fill: "none" }),
    e.jsx("path", { d: "M 36,68 Q 50,62 64,68", stroke: "#431407", strokeWidth: "3", strokeLinecap: "round" }),
    e.jsx("polygon", { points: "40,68 43,62 46,68", fill: "#f8fafc" }),
    e.jsx("polygon", { points: "54,68 57,62 60,68", fill: "#f8fafc" }),
    e.jsx("path", { d: "M 30,74 Q 50,88 70,74 Q 58,94 42,94 Z", fill: "#7c2d12" })
  ]})`,

  // 9. Minotaur Beast (Forward-Facing Symmetrical Cretan Bull)
  minotaur_beast: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 28,32 C 12,20 8,6 16,4 C 24,2 32,16 36,26", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 72,32 C 88,20 92,6 84,4 C 76,2 68,16 64,26", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 26,48 C 26,28 36,20 50,20 C 64,20 74,28 74,48 C 74,72 64,84 50,84 C 36,84 26,72 26,48 Z", fill: "#78350f", stroke: "#451a03", strokeWidth: "2" }),
    e.jsx("path", { d: "M 30,46 C 30,32 38,24 50,24 C 62,24 70,32 70,46 C 70,66 62,78 50,78 C 38,78 30,66 30,46 Z", fill: "#92400e", opacity: "0.95" }),
    e.jsx("circle", { cx: "38", cy: "42", r: "4", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1" }),
    e.jsx("circle", { cx: "62", cy: "42", r: "4", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1" }),
    e.jsx("ellipse", { cx: "50", cy: "64", rx: "16", ry: "12", fill: "#451a03" }),
    e.jsx("circle", { cx: "44", cy: "62", r: "3", fill: "#000" }),
    e.jsx("circle", { cx: "56", cy: "62", r: "3", fill: "#000" }),
    e.jsx("circle", { cx: "50", cy: "74", r: "6", fill: "none", stroke: "#facc15", strokeWidth: "2.5" })
  ]})`,

  // 10. Medusa Gorgon (Forward-Facing Symmetrical Cameo)
  medusa_gorgon: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 20,38 C 10,24 16,10 28,14 C 36,18 32,30 40,32 M 80,38 C 90,24 84,10 72,14 C 64,18 68,30 60,32 M 30,22 C 26,8 44,4 48,16 M 70,22 C 74,8 56,4 52,16 M 16,52 C 6,42 12,32 24,36 M 84,52 C 94,42 88,32 76,36", fill: "none", stroke: "#10b981", strokeWidth: "3.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 26,14 L 30,12 L 28,18 Z M 74,14 L 70,12 L 72,18 Z M 48,14 L 52,10 L 50,18 Z", fill: "#ef4444" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "24", fill: "#15803d", stroke: "#14532d", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "20", fill: "#22c55e", opacity: "0.9" }),
    e.jsx("ellipse", { cx: "42", cy: "48", rx: "4.5", ry: "3", fill: "#fef08a", stroke: "#713f12", strokeWidth: "1" }),
    e.jsx("ellipse", { cx: "58", cy: "48", rx: "4.5", ry: "3", fill: "#fef08a", stroke: "#713f12", strokeWidth: "1" }),
    e.jsx("ellipse", { cx: "42", cy: "48", rx: "1.5", ry: "3", fill: "#7f1d1d" }),
    e.jsx("ellipse", { cx: "58", cy: "48", rx: "1.5", ry: "3", fill: "#7f1d1d" }),
    e.jsx("path", { d: "M 48,52 L 50,58 L 52,52", stroke: "#14532d", strokeWidth: "1.5", fill: "none" }),
    e.jsx("path", { d: "M 42,64 Q 50,70 58,64", stroke: "#7f1d1d", strokeWidth: "2", fill: "none", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 50,66 L 50,74 L 46,78 M 50,74 L 54,78", stroke: "#ef4444", strokeWidth: "1.5", strokeLinecap: "round" })
  ]})`,

  // 11. Cerberus Hound (Forward-Facing Triple Hellhound)
  cerberus_hound: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("circle", { cx: "50", cy: "44", r: "18", fill: "#1c1917", stroke: "#44403c", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "44", r: "15", fill: "#292524" }),
    e.jsx("circle", { cx: "28", cy: "50", r: "15", fill: "#1c1917", stroke: "#44403c", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "28", cy: "50", r: "12", fill: "#292524" }),
    e.jsx("circle", { cx: "72", cy: "50", r: "15", fill: "#1c1917", stroke: "#44403c", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "72", cy: "50", r: "12", fill: "#292524" }),
    e.jsx("polygon", { points: "42,30 46,20 50,30", fill: "#44403c" }),
    e.jsx("polygon", { points: "50,30 54,20 58,30", fill: "#44403c" }),
    e.jsx("polygon", { points: "20,40 22,28 28,38", fill: "#44403c" }),
    e.jsx("polygon", { points: "72,38 78,28 80,40", fill: "#44403c" }),
    e.jsx("circle", { cx: "45", cy: "42", r: "2.5", fill: "#ef4444" }),
    e.jsx("circle", { cx: "55", cy: "42", r: "2.5", fill: "#ef4444" }),
    e.jsx("circle", { cx: "24", cy: "48", r: "2.2", fill: "#ef4444" }),
    e.jsx("circle", { cx: "32", cy: "48", r: "2.2", fill: "#ef4444" }),
    e.jsx("circle", { cx: "68", cy: "48", r: "2.2", fill: "#ef4444" }),
    e.jsx("circle", { cx: "76", cy: "48", r: "2.2", fill: "#ef4444" }),
    e.jsx("path", { d: "M 44,52 Q 50,56 56,52 L 54,58 L 50,54 L 46,58 Z", fill: "#f8fafc", stroke: "#7f1d1d", strokeWidth: "1" }),
    e.jsx("path", { d: "M 22,58 Q 28,62 34,58", stroke: "#f8fafc", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 66,58 Q 72,62 78,58", stroke: "#f8fafc", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 20,74 C 36,84 64,84 80,74", stroke: "#dc2626", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 30,76 L 30,84 M 50,78 L 50,86 M 70,76 L 70,84", stroke: "#facc15", strokeWidth: "2" })
  ]})`,

  // 12. African Lion (Forward-Facing Roaring Nemean Lion)
  african_lion: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 50,12 Q 68,16 78,30 Q 90,48 82,68 Q 68,88 50,88 Q 32,88 18,68 Q 10,48 22,30 Q 32,16 50,12 Z", fill: "#b45309", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "22", fill: "#f59e0b", stroke: "#d97706", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "32", cy: "36", r: "6", fill: "#d97706" }),
    e.jsx("circle", { cx: "68", cy: "36", r: "6", fill: "#d97706" }),
    e.jsx("ellipse", { cx: "42", cy: "48", rx: "3.5", ry: "2.5", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("ellipse", { cx: "58", cy: "48", rx: "3.5", ry: "2.5", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("circle", { cx: "42", cy: "48", r: "1.5", fill: "#000" }),
    e.jsx("circle", { cx: "58", cy: "48", r: "1.5", fill: "#000" }),
    e.jsx("polygon", { points: "46,56 54,56 50,62", fill: "#78350f" }),
    e.jsx("path", { d: "M 42,66 Q 50,62 58,66 Q 50,74 42,66 Z", fill: "#451a03" }),
    e.jsx("polygon", { points: "44,65 46,69 48,65", fill: "#fff" }),
    e.jsx("polygon", { points: "52,65 54,69 56,65", fill: "#fff" })
  ]})`,

  // 13. Appennine Wolf Pack (Forward-Facing Symmetrical Capitoline Wolf)
  appennine_wolf_pack: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 22,50 C 22,28 34,16 50,16 C 66,16 78,28 78,50 C 78,74 66,86 50,86 C 34,86 22,74 22,50 Z", fill: "#44403c", stroke: "#1c1917", strokeWidth: "2" }),
    e.jsx("path", { d: "M 26,48 C 26,30 36,20 50,20 C 64,20 74,30 74,48 C 74,70 64,80 50,80 C 36,80 26,70 26,48 Z", fill: "#78716c", opacity: "0.95" }),
    e.jsx("polygon", { points: "24,34 28,12 40,24", fill: "#292524", stroke: "#1c1917", strokeWidth: "1" }),
    e.jsx("polygon", { points: "76,34 72,12 60,24", fill: "#292524", stroke: "#1c1917", strokeWidth: "1" }),
    e.jsx("polygon", { points: "28,32 31,16 38,24", fill: "#a8a29e" }),
    e.jsx("polygon", { points: "72,32 69,16 62,24", fill: "#a8a29e" }),
    e.jsx("ellipse", { cx: "38", cy: "44", rx: "4", ry: "2.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("ellipse", { cx: "62", cy: "44", rx: "4", ry: "2.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("circle", { cx: "38", cy: "44", r: "1.5", fill: "#000" }),
    e.jsx("circle", { cx: "62", cy: "44", r: "1.5", fill: "#000" }),
    e.jsx("ellipse", { cx: "50", cy: "60", rx: "10", ry: "8", fill: "#1c1917" }),
    e.jsx("polygon", { points: "46,56 54,56 50,62", fill: "#292524" }),
    e.jsx("path", { d: "M 40,68 Q 50,62 60,68 Q 50,76 40,68 Z", fill: "#1c1917" }),
    e.jsx("polygon", { points: "42,67 44,72 46,67", fill: "#fff" }),
    e.jsx("polygon", { points: "54,67 56,72 58,67", fill: "#fff" }),
    e.jsx("path", { d: "M 32,74 C 42,84 58,84 68,74", stroke: "#d6d3d1", strokeWidth: "2", strokeLinecap: "round" })
  ]})`,

  // 14. Hercynian Boar (Forward-Facing Symmetrical Wild Boar with Huge Tusks)
  hercynian_boar: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 24,50 C 24,26 34,16 50,16 C 66,16 76,26 76,50 C 76,74 66,86 50,86 C 34,86 24,74 24,50 Z", fill: "#451a03", stroke: "#1c1917", strokeWidth: "2" }),
    e.jsx("path", { d: "M 28,48 C 28,30 36,20 50,20 C 64,20 72,30 72,48 C 72,70 64,80 50,80 C 36,80 28,70 28,48 Z", fill: "#78350f", opacity: "0.95" }),
    e.jsx("path", { d: "M 42,8 L 46,18 L 54,18 L 58,8 Z", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("polygon", { points: "22,34 26,16 36,26", fill: "#292524" }),
    e.jsx("polygon", { points: "78,34 74,16 64,26", fill: "#292524" }),
    e.jsx("circle", { cx: "36", cy: "42", r: "3.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1" }),
    e.jsx("circle", { cx: "64", cy: "42", r: "3.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1" }),
    e.jsx("circle", { cx: "36", cy: "42", r: "1.5", fill: "#000" }),
    e.jsx("circle", { cx: "64", cy: "42", r: "1.5", fill: "#000" }),
    e.jsx("ellipse", { cx: "50", cy: "58", rx: "14", ry: "10", fill: "#1c1917" }),
    e.jsx("circle", { cx: "44", cy: "58", r: "3.5", fill: "#000" }),
    e.jsx("circle", { cx: "56", cy: "58", r: "3.5", fill: "#000" }),
    e.jsx("path", { d: "M 32,68 C 22,60 22,46 26,38 C 28,46 34,54 36,60 Z", fill: "#fef08a", stroke: "#ca8a04", strokeWidth: "1" }),
    e.jsx("path", { d: "M 68,68 C 78,60 78,46 74,38 C 72,46 66,54 64,60 Z", fill: "#fef08a", stroke: "#ca8a04", strokeWidth: "1" }),
    e.jsx("path", { d: "M 38,72 Q 50,68 62,72", stroke: "#451a03", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 15. Alpine Brown Bear (Forward-Facing Symmetrical Roaring Bear)
  alpine_brown_bear: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("circle", { cx: "26", cy: "28", r: "10", fill: "#451a03", stroke: "#1c1917", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "74", cy: "28", r: "10", fill: "#451a03", stroke: "#1c1917", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "26", cy: "28", r: "6", fill: "#78350f" }),
    e.jsx("circle", { cx: "74", cy: "28", r: "6", fill: "#78350f" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "32", fill: "#451a03", stroke: "#1c1917", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "28", fill: "#78350f", opacity: "0.95" }),
    e.jsx("circle", { cx: "38", cy: "44", r: "3.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("circle", { cx: "62", cy: "44", r: "3.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("circle", { cx: "38", cy: "44", r: "1.8", fill: "#000" }),
    e.jsx("circle", { cx: "62", cy: "44", r: "1.8", fill: "#000" }),
    e.jsx("ellipse", { cx: "50", cy: "62", rx: "16", ry: "12", fill: "#d97706" }),
    e.jsx("polygon", { points: "46,58 54,58 50,64", fill: "#1c1917" }),
    e.jsx("path", { d: "M 42,68 Q 50,64 58,68 L 56,72 L 50,68 L 44,72 Z", fill: "#fff", stroke: "#451a03", strokeWidth: "1" })
  ]})`,

  // 16. Saharan Scorpion (Forward-Facing Symmetrical Emperor Scorpion)
  saharan_scorpion: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("ellipse", { cx: "50", cy: "58", rx: "16", ry: "22", fill: "#78350f", stroke: "#451a03", strokeWidth: "2" }),
    e.jsx("ellipse", { cx: "50", cy: "58", rx: "13", ry: "18", fill: "#b45309", opacity: "0.9" }),
    e.jsx("path", { d: "M 50,40 C 50,22 46,14 50,8 C 54,14 50,22 50,40", fill: "none", stroke: "#d97706", strokeWidth: "5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 46,8 L 50,2 L 54,8 Z", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1" }),
    e.jsx("circle", { cx: "50", cy: "3", r: "2.5", fill: "#84cc16" }),
    e.jsx("path", { d: "M 38,50 C 22,44 14,32 18,20 C 22,12 32,18 30,28", fill: "none", stroke: "#92400e", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 62,50 C 78,44 86,32 82,20 C 78,12 68,18 70,28", fill: "none", stroke: "#92400e", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 14,20 L 22,14 L 24,24 Z M 86,20 L 78,14 L 76,24 Z", fill: "#f59e0b", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("path", { d: "M 36,60 L 20,64 M 36,68 L 18,74 M 38,76 L 22,84 M 64,60 L 80,64 M 64,68 L 82,74 M 62,76 L 78,84", stroke: "#78350f", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "44", cy: "44", r: "2", fill: "#fef08a" }),
    e.jsx("circle", { cx: "56", cy: "44", r: "2", fill: "#fef08a" })
  ]})`,

  // 17. Poseidon Avatar (Forward-Facing Symmetrical God of the Seas)
  poseidon_avatar: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("circle", { cx: "50", cy: "38", r: "18", fill: "#0369a1", stroke: "#075985", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 32,38 C 34,60 42,74 50,82 C 58,74 66,60 68,38 Z", fill: "#f8fafc", stroke: "#cbd5e1", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 30,32 C 34,16 66,16 70,32 Z", fill: "#e2e8f0" }),
    e.jsx("path", { d: "M 36,22 L 50,10 L 64,22 L 58,16 L 50,8 L 42,16 Z", fill: "#facc15", stroke: "#a16207", strokeWidth: "1" }),
    e.jsx("circle", { cx: "44", cy: "36", r: "2.5", fill: "#38bdf8" }),
    e.jsx("circle", { cx: "56", cy: "36", r: "2.5", fill: "#38bdf8" }),
    e.jsx("line", { x1: "50", y1: "92", x2: "50", y2: "20", stroke: "#facc15", strokeWidth: "3.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 38,32 Q 42,20 50,20 Q 58,20 62,32", fill: "none", stroke: "#facc15", strokeWidth: "3", strokeLinecap: "round" }),
    e.jsx("polygon", { points: "50,12 46,24 54,24", fill: "#fef08a" }),
    e.jsx("polygon", { points: "38,22 34,32 42,30", fill: "#fef08a" }),
    e.jsx("polygon", { points: "62,22 58,30 66,32", fill: "#fef08a" })
  ]})`,

  // 18. Triton Wrath (Forward-Facing Symmetrical Triton)
  triton_wrath: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 28,52 C 28,34 38,20 50,20 C 62,20 72,34 72,52 C 72,70 60,82 50,82 C 40,82 28,70 28,52 Z", fill: "#0d9488", stroke: "#115e59", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "34", r: "14", fill: "#fde68a" }),
    e.jsx("path", { d: "M 34,34 Q 50,56 66,34 Q 68,48 50,56 Q 32,48 34,34 Z", fill: "#2dd4bf" }),
    e.jsx("circle", { cx: "44", cy: "34", r: "2.5", fill: "#0f766e" }),
    e.jsx("circle", { cx: "56", cy: "34", r: "2.5", fill: "#0f766e" }),
    e.jsx("path", { d: "M 42,44 C 42,36 58,36 58,44 L 54,62 L 46,62 Z", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 10,76 Q 30,68 50,74 T 90,72", fill: "none", stroke: "#5eead4", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 19. Atlantic Ghost Ship (Forward-Facing Bow-on Phantom Dreadnought)
  atlantic_ghost_ship: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 8,78 Q 50,68 92,78 L 92,88 L 8,88 Z", fill: "#064e3b", opacity: "0.6" }),
    e.jsx("path", { d: "M 28,72 L 50,84 L 72,72 L 66,48 L 34,48 Z", fill: "#064e3b", stroke: "#34d399", strokeWidth: "2" }),
    e.jsx("line", { x1: "50", y1: "12", x2: "50", y2: "74", stroke: "#10b981", strokeWidth: "3" }),
    e.jsx("path", { d: "M 20,24 Q 50,16 80,24 L 74,44 Q 50,38 26,44 Z", fill: "#6ee7b7", stroke: "#34d399", strokeWidth: "1.5", opacity: "0.8" }),
    e.jsx("polygon", { points: "50,84 46,92 54,92", fill: "#10b981", stroke: "#34d399", strokeWidth: "1" }),
    e.jsx("path", { d: "M 16,56 L 30,52 M 14,64 L 28,60 M 84,56 L 70,52 M 86,64 L 72,60", stroke: "#a7f3d0", strokeWidth: "2", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "50", cy: "32", r: "4", fill: "#34d399", filter: "drop-shadow(0 0 5px #34d399)" }),
    e.jsx("path", { d: "M 10,78 Q 30,70 50,76 Q 70,70 90,78", fill: "none", stroke: "#a7f3d0", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`
};

// Validate with esbuild
let codeToTest = "const e = {}; const monsters = {\n" +
  Object.entries(forwardFacingMonsterSVGs).map(([k, v]) => `  ${k}: ${v}`).join(",\n") +
  "\n};";

try {
  esbuild.transformSync(codeToTest, { loader: "jsx" });
  console.log("ALL 19 FORWARD-FACING MONSTER SVGs TRANSFORM CLEANLY!");
} catch (e) {
  console.error("Transform error:", e);
}
