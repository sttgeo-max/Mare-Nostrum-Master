const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

// Define masterwork monster SVGs
const masterMonsterSVGs = {
  // 1. Cetus Oceanus / Atlantic Leviathan
  cetus_atlantic_leviathan: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 8,78 Q 30,70 52,74 T 92,72 L 92,86 L 8,86 Z", fill: "#0369a1", opacity: "0.6" }),
    e.jsx("path", { d: "M 14,64 C 18,38 38,22 62,20 C 80,18 90,32 86,52 C 80,68 62,72 42,68 C 28,65 18,68 14,64 Z", fill: "#0e7490", stroke: "#164e63", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 22,58 C 26,42 42,28 60,26 C 74,24 82,34 80,48 C 74,60 58,64 42,60 Z", fill: "#06b6d4", opacity: "0.85" }),
    e.jsx("path", { d: "M 46,20 L 52,6 L 56,22 M 62,18 L 68,4 L 72,20 M 76,24 L 84,12 L 84,28", stroke: "#facc15", strokeWidth: "2", fill: "#ca8a04", strokeLinejoin: "round" }),
    e.jsx("path", { d: "M 12,52 C 24,56 36,46 44,52 C 34,56 22,64 12,52 Z", fill: "#155e75" }),
    e.jsx("path", { d: "M 18,52 L 24,46 L 22,56 L 30,48 L 28,58 L 36,50", stroke: "#fef08a", strokeWidth: "1.8", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "32", cy: "38", r: "4.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "33", cy: "37", r: "1.8", fill: "#fef08a" }),
    e.jsx("path", { d: "M 10,72 Q 28,62 48,70 Q 68,78 90,68", fill: "none", stroke: "#bae6fd", strokeWidth: "2", strokeLinecap: "round", opacity: "0.85" })
  ]})`,

  // 2. Abyssal Kraken
  abyssal_kraken_submerged: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 32,44 C 32,22 40,12 50,12 C 60,12 68,22 68,44 C 68,54 60,60 50,60 C 40,60 32,54 32,44 Z", fill: "#0f766e", stroke: "#134e4a", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 36,42 C 36,26 42,16 50,16 C 58,16 64,26 64,42 C 64,50 58,56 50,56 C 42,56 36,50 36,42 Z", fill: "#14b8a6", opacity: "0.9" }),
    e.jsx("path", { d: "M 42,14 L 50,6 L 58,14", fill: "#f59e0b", stroke: "#78350f", strokeWidth: "1" }),
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

  // 3. Great Leviathan Deep
  great_leviathan_deep: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 8,78 Q 30,70 52,74 T 92,72 L 92,86 L 8,86 Z", fill: "#0369a1", opacity: "0.6" }),
    e.jsx("path", { d: "M 14,64 C 18,38 38,22 62,20 C 80,18 90,32 86,52 C 80,68 62,72 42,68 C 28,65 18,68 14,64 Z", fill: "#0e7490", stroke: "#164e63", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 22,58 C 26,42 42,28 60,26 C 74,24 82,34 80,48 C 74,60 58,64 42,60 Z", fill: "#06b6d4", opacity: "0.85" }),
    e.jsx("path", { d: "M 46,20 L 52,6 L 56,22 M 62,18 L 68,4 L 72,20 M 76,24 L 84,12 L 84,28", stroke: "#facc15", strokeWidth: "2", fill: "#ca8a04", strokeLinejoin: "round" }),
    e.jsx("path", { d: "M 12,52 C 24,56 36,46 44,52 C 34,56 22,64 12,52 Z", fill: "#155e75" }),
    e.jsx("path", { d: "M 18,52 L 24,46 L 22,56 L 30,48 L 28,58 L 36,50", stroke: "#fef08a", strokeWidth: "1.8", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "32", cy: "38", r: "4.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "33", cy: "37", r: "1.8", fill: "#fef08a" }),
    e.jsx("path", { d: "M 10,72 Q 28,62 48,70 Q 68,78 90,68", fill: "none", stroke: "#bae6fd", strokeWidth: "2", strokeLinecap: "round", opacity: "0.85" })
  ]})`,

  // 4. Atlantic Sea Serpent
  atlantic_sea_serpent: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 20,82 C 16,60 30,42 46,30 C 56,22 66,16 76,22 C 84,28 82,42 70,50 C 54,60 52,72 68,82 C 78,88 88,82 92,76", fill: "none", stroke: "#065f46", strokeWidth: "7", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 20,82 C 16,60 30,42 46,30 C 56,22 66,16 76,22 C 84,28 82,42 70,50 C 54,60 52,72 68,82 C 78,88 88,82 92,76", fill: "none", stroke: "#10b981", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 68,18 L 74,8 L 78,18 M 56,24 L 60,14 L 64,26", stroke: "#facc15", strokeWidth: "2", fill: "#eab308", strokeLinejoin: "round" }),
    e.jsx("path", { d: "M 16,80 C 14,72 20,66 28,68 C 34,70 38,76 36,84 C 32,88 20,90 16,80 Z", fill: "#047857", stroke: "#064e3b", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 12,78 L 6,80 L 2,74 M 6,80 L 2,84", stroke: "#ef4444", strokeWidth: "1.8", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "24", cy: "72", r: "2.5", fill: "#fef08a", stroke: "#78350f", strokeWidth: "0.8" }),
    e.jsx("circle", { cx: "24", cy: "72", r: "1.2", fill: "#7f1d1d" }),
    e.jsx("path", { d: "M 8,86 Q 30,76 52,84 T 94,84", fill: "none", stroke: "#6ee7b7", strokeWidth: "2", strokeLinecap: "round", opacity: "0.8" })
  ]})`,

  // 5. Charybdis Whirlpool Beast
  charybdis_whirlpool_beast: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("circle", { cx: "50", cy: "50", r: "42", fill: "#0c4a6e", stroke: "#0369a1", strokeWidth: "2" }),
    e.jsx("path", { d: "M 50,12 C 72,12 88,28 88,50 C 88,68 74,84 56,88 C 36,92 18,78 14,60 C 10,40 24,22 42,18 C 58,14 72,26 74,42 C 76,56 66,68 52,68 C 40,68 32,58 34,48 C 36,40 44,34 50,38 C 54,40 54,46 50,48", fill: "none", stroke: "#38bdf8", strokeWidth: "3.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 50,22 L 53,30 L 47,30 Z M 78,50 L 70,53 L 70,47 Z M 50,78 L 47,70 L 53,70 Z M 22,50 L 30,47 L 30,53 Z M 68,32 L 62,38 L 66,41 Z M 32,68 L 38,62 L 34,59 Z", fill: "#f8fafc", stroke: "#cbd5e1", strokeWidth: "0.8" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "7", fill: "#020617", stroke: "#ef4444", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "2.5", fill: "#facc15" })
  ]})`,

  // 6. Scylla Multi-Headed Monster
  sirens_scylla_monster: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 32,84 C 28,62 36,44 48,26 C 54,18 64,14 72,20 C 78,26 74,38 64,46 C 54,54 56,66 64,84", fill: "none", stroke: "#047857", strokeWidth: "5.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 20,84 C 18,66 22,50 30,36 C 34,30 42,26 48,32 C 52,38 48,48 40,56 C 32,64 30,74 34,84", fill: "none", stroke: "#059669", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 68,84 C 72,66 76,50 82,38 C 86,32 94,30 96,38 C 98,46 90,54 82,62 C 76,70 74,78 76,84", fill: "none", stroke: "#10b981", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 68,18 L 78,14 L 74,26 Z", fill: "#10b981", stroke: "#047857", strokeWidth: "1" }),
    e.jsx("path", { d: "M 44,28 L 52,26 L 48,36 Z", fill: "#10b981", stroke: "#047857", strokeWidth: "1" }),
    e.jsx("path", { d: "M 90,34 L 98,34 L 94,44 Z", fill: "#10b981", stroke: "#047857", strokeWidth: "1" }),
    e.jsx("circle", { cx: "72", cy: "18", r: "1.8", fill: "#ef4444" }),
    e.jsx("circle", { cx: "47", cy: "29", r: "1.8", fill: "#ef4444" }),
    e.jsx("circle", { cx: "93", cy: "36", r: "1.8", fill: "#ef4444" }),
    e.jsx("path", { d: "M 10,84 Q 30,76 50,82 T 90,82", fill: "none", stroke: "#6ee7b7", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 7. Siren Enchantress
  siren_enchantress: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 28,42 C 22,24 34,14 50,14 C 66,14 78,24 72,42 C 68,54 58,62 50,62 C 42,62 32,54 28,42 Z", fill: "#f59e0b", stroke: "#b45309", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "36", r: "15", fill: "#fed7aa", stroke: "#ea580c", strokeWidth: "1" }),
    e.jsx("path", { d: "M 32,32 C 34,16 66,16 68,32 C 60,26 40,26 32,32 Z", fill: "#d97706" }),
    e.jsx("circle", { cx: "44", cy: "36", r: "2.2", fill: "#0284c7" }),
    e.jsx("circle", { cx: "56", cy: "36", r: "2.2", fill: "#0284c7" }),
    e.jsx("path", { d: "M 46,44 Q 50,48 54,44", fill: "none", stroke: "#e11d48", strokeWidth: "1.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 40,62 C 36,74 44,86 50,94 C 56,86 64,74 60,62 Z", fill: "#0d9488", stroke: "#042f2e", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 34,84 L 50,96 L 66,84 C 58,88 42,88 34,84 Z", fill: "#14b8a6", stroke: "#0f766e", strokeWidth: "1" }),
    e.jsx("path", { d: "M 42,16 L 50,8 L 58,16", stroke: "#facc15", strokeWidth: "2", fill: "#eab308" })
  ]})`,

  // 8. Cyclops Brute
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

  // 9. Minotaur Beast
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

  // 10. Medusa Gorgon
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

  // 11. Cerberus Hound
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

  // 12. African Lion
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

  // 13. Appennine Wolf Pack
  appennine_wolf_pack: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 22,72 Q 28,36 48,22 Q 54,12 58,24 Q 68,14 74,28 Q 86,36 82,58 Q 74,74 54,78 Q 32,80 22,72 Z", fill: "#57534e", stroke: "#292524", strokeWidth: "2" }),
    e.jsx("path", { d: "M 26,68 Q 32,40 48,28 Q 53,20 56,28 Q 64,20 70,32 Q 78,40 76,56 Q 70,68 53,72 Q 34,74 26,68 Z", fill: "#78716c", opacity: "0.9" }),
    e.jsx("polygon", { points: "52,24 56,12 60,26", fill: "#292524" }),
    e.jsx("polygon", { points: "66,26 72,14 76,28", fill: "#292524" }),
    e.jsx("ellipse", { cx: "62", cy: "42", rx: "4", ry: "2.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("circle", { cx: "62", cy: "42", r: "1.5", fill: "#000" }),
    e.jsx("polygon", { points: "78,54 84,54 80,60", fill: "#1c1917" }),
    e.jsx("path", { d: "M 64,62 Q 74,58 82,62 L 78,66 L 74,62 L 70,66 Z", fill: "#fff", stroke: "#292524", strokeWidth: "1" }),
    e.jsx("path", { d: "M 32,68 C 24,78 20,86 16,92", stroke: "#d6d3d1", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 14. Hercynian Boar
  hercynian_boar: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 20,68 Q 24,32 50,22 Q 76,22 84,46 Q 88,62 76,72 Q 48,80 20,68 Z", fill: "#451a03", stroke: "#1c1917", strokeWidth: "2" }),
    e.jsx("path", { d: "M 24,64 Q 28,36 50,26 Q 72,26 80,48 Q 84,62 72,68 Q 48,74 24,64 Z", fill: "#78350f", opacity: "0.9" }),
    e.jsx("path", { d: "M 30,22 L 34,12 L 38,22 M 42,20 L 46,10 L 50,20 M 54,18 L 58,8 L 62,18 M 66,20 L 70,12 L 74,22", stroke: "#ca8a04", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "68", cy: "44", r: "3.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1" }),
    e.jsx("circle", { cx: "68", cy: "44", r: "1.5", fill: "#000" }),
    e.jsx("ellipse", { cx: "80", cy: "54", rx: "6", ry: "8", fill: "#1c1917" }),
    e.jsx("path", { d: "M 74,58 C 74,50 82,42 86,40", stroke: "#fef08a", strokeWidth: "3.5", strokeLinecap: "round", fill: "none" }),
    e.jsx("path", { d: "M 66,62 C 66,54 74,48 78,46", stroke: "#fef08a", strokeWidth: "2.5", strokeLinecap: "round", fill: "none" })
  ]})`,

  // 15. Alpine Brown Bear
  alpine_brown_bear: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("circle", { cx: "30", cy: "28", r: "10", fill: "#451a03", stroke: "#1c1917", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "70", cy: "28", r: "10", fill: "#451a03", stroke: "#1c1917", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "30", fill: "#451a03", stroke: "#1c1917", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "26", fill: "#78350f", opacity: "0.95" }),
    e.jsx("circle", { cx: "38", cy: "44", r: "3.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("circle", { cx: "62", cy: "44", r: "3.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("circle", { cx: "38", cy: "44", r: "1.8", fill: "#000" }),
    e.jsx("circle", { cx: "62", cy: "44", r: "1.8", fill: "#000" }),
    e.jsx("ellipse", { cx: "50", cy: "62", rx: "16", ry: "12", fill: "#d97706" }),
    e.jsx("polygon", { points: "46,58 54,58 50,64", fill: "#1c1917" }),
    e.jsx("path", { d: "M 42,68 Q 50,64 58,68 L 56,72 L 50,68 L 44,72 Z", fill: "#fff", stroke: "#451a03", strokeWidth: "1" })
  ]})`,

  // 16. Saharan Scorpion
  saharan_scorpion: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("ellipse", { cx: "50", cy: "58", rx: "16", ry: "22", fill: "#78350f", stroke: "#451a03", strokeWidth: "2" }),
    e.jsx("ellipse", { cx: "50", cy: "58", rx: "13", ry: "18", fill: "#b45309", opacity: "0.9" }),
    e.jsx("path", { d: "M 50,38 C 50,24 64,12 76,14 C 84,16 88,26 82,34 C 76,40 70,34 76,28", fill: "none", stroke: "#d97706", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 76,28 L 86,26 L 82,34 Z", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1" }),
    e.jsx("circle", { cx: "88", cy: "24", r: "2.5", fill: "#84cc16" }),
    e.jsx("path", { d: "M 40,46 C 26,40 18,30 22,20 C 26,12 36,18 34,28", fill: "none", stroke: "#92400e", strokeWidth: "4", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 60,46 C 74,40 82,30 78,20 C 74,12 64,18 66,28", fill: "none", stroke: "#92400e", strokeWidth: "4", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 18,20 L 26,14 L 28,24 Z M 82,20 L 74,14 L 72,24 Z", fill: "#f59e0b", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("path", { d: "M 36,60 L 22,64 M 36,68 L 20,74 M 38,76 L 24,84 M 64,60 L 78,64 M 64,68 L 80,74 M 62,76 L 76,84", stroke: "#78350f", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "46", cy: "42", r: "1.8", fill: "#fef08a" }),
    e.jsx("circle", { cx: "54", cy: "42", r: "1.8", fill: "#fef08a" })
  ]})`,

  // 17. Poseidon Avatar
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

  // 18. Triton Wrath
  triton_wrath: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 28,52 C 28,34 38,20 50,20 C 62,20 72,34 72,52 C 72,70 60,82 50,82 C 40,82 28,70 28,52 Z", fill: "#0d9488", stroke: "#115e59", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "34", r: "14", fill: "#fde68a" }),
    e.jsx("path", { d: "M 34,34 Q 50,56 66,34 Q 68,48 50,56 Q 32,48 34,34 Z", fill: "#2dd4bf" }),
    e.jsx("line", { x1: "70", y1: "86", x2: "30", y2: "14", stroke: "#facc15", strokeWidth: "3.5", strokeLinecap: "round" }),
    e.jsx("polygon", { points: "30,10 26,20 34,18", fill: "#fef08a" }),
    e.jsx("path", { d: "M 20,24 Q 24,14 30,14 Q 36,14 40,24", fill: "none", stroke: "#facc15", strokeWidth: "2.5" }),
    e.jsx("path", { d: "M 10,76 Q 30,68 50,74 T 90,72", fill: "none", stroke: "#5eead4", strokeWidth: "2.5", strokeLinecap: "round" })
  ]})`,

  // 19. Atlantic Ghost Ship
  atlantic_ghost_ship: `t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsx("path", { d: "M 8,66 C 24,66 50,54 74,42 L 92,36 L 96,50 L 78,66 L 8,70 Z", fill: "#064e3b", stroke: "#34d399", strokeWidth: "1.5", opacity: "0.85" }),
    e.jsx("line", { x1: "50", y1: "12", x2: "50", y2: "68", stroke: "#10b981", strokeWidth: "3" }),
    e.jsx("line", { x1: "26", y1: "26", x2: "26", y2: "66", stroke: "#10b981", strokeWidth: "2.5" }),
    e.jsx("line", { x1: "74", y1: "26", x2: "74", y2: "66", stroke: "#10b981", strokeWidth: "2.5" }),
    e.jsx("path", { d: "M 50,14 C 74,22 80,36 50,40 C 76,44 68,56 50,54 Z", fill: "#6ee7b7", opacity: "0.7" }),
    e.jsx("path", { d: "M 26,28 C 42,34 46,44 26,48 Z", fill: "#6ee7b7", opacity: "0.6" }),
    e.jsx("circle", { cx: "90", cy: "38", r: "4", fill: "#34d399", filter: "drop-shadow(0 0 4px #34d399)" }),
    e.jsx("path", { d: "M 18,68 L 14,84 M 28,68 L 24,84 M 38,68 L 34,84 M 48,68 L 44,84 M 58,68 L 54,84 M 68,68 L 64,84", stroke: "#a7f3d0", strokeWidth: "1.8", opacity: "0.75" })
  ]})`
};

console.log("Master monster SVGs defined. Total:", Object.keys(masterMonsterSVGs).length);

// Test syntax with esbuild
let codeToTest = "const e = {}; const monsters = {\n" +
  Object.entries(masterMonsterSVGs).map(([k, v]) => `  ${k}: ${v}`).join(",\n") +
  "\n};";

try {
  esbuild.transformSync(codeToTest, { loader: "jsx" });
  console.log("ALL MASTER MONSTER SVGs TRANSFORM CLEANLY VIA ESBUILD!");
} catch (e) {
  console.error("Transform error:", e);
}
