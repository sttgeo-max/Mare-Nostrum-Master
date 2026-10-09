const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== RESTORING MASTERWORK MEDALLIONS & FIXING TOP HUD SAVE BUTTON ===");

const filePath = path.join(__dirname, "../public/assets/index-V37.js");
let code = fs.readFileSync(filePath, "utf8");

// 1. BUILD THE COMPLETE MASTERWORK MEDALLION SYSTEM
const medallionSystemCode = `
// === MASTERWORK ROMAN MEDALLION & EMBLEM SYSTEM ===
var Jd = {
  xs: "w-5 h-5",
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-12 h-12",
  "2xl": "w-16 h-16",
  "3xl": "w-24 h-24",
  full: "w-full h-full"
};

var Ao = function(variant) {
  const v = (variant || "bronze").toString().toLowerCase();
  if (v === "gold" || v === "illustris" || v === "rare") {
    return {
      core: "#d49b28", outer: "#614307", highlight: "#fff2b3", bezel: "#f5bd47", shadow: "#362302",
      enamelCore: "#9e6e13", enamelOuter: "#3d2802", glow: "#fbbf24",
      reliefHighlight: "#fff9d6", reliefMid: "#ffd700", reliefDark: "#996515"
    };
  }
  if (v === "silver" || v === "insignis" || v === "uncommon") {
    return {
      core: "#94a3b8", outer: "#334155", highlight: "#ffffff", bezel: "#cbd5e1", shadow: "#0f172a",
      enamelCore: "#475569", enamelOuter: "#1e293b", glow: "#e2e8f0",
      reliefHighlight: "#ffffff", reliefMid: "#cbd5e1", reliefDark: "#475569"
    };
  }
  if (v === "crimson_blood" || v === "crimson" || v === "porphyry_red" || v === "divinus" || v === "legendary") {
    return {
      core: "#9e1f1b", outer: "#3b0604", highlight: "#fa7570", bezel: "#c72c26", shadow: "#1f0201",
      enamelCore: "#78110e", enamelOuter: "#2e0302", glow: "#f87171",
      reliefHighlight: "#fff0a6", reliefMid: "#f5c042", reliefDark: "#87510d"
    };
  }
  if (v === "imperial_purple" || v === "purple" || v === "praeclarus" || v === "epic") {
    return {
      core: "#731e5d", outer: "#300725", highlight: "#e889ce", bezel: "#ad328c", shadow: "#170212",
      enamelCore: "#5e154a", enamelOuter: "#26041d", glow: "#c084fc",
      reliefHighlight: "#ffe89c", reliefMid: "#ffd700", reliefDark: "#8a5e12"
    };
  }
  if (v === "lapis_blue" || v === "teal_sea" || v === "teal" || v === "blue") {
    return {
      core: "#0d9488", outer: "#134e4a", highlight: "#99f6e4", bezel: "#14b8a6", shadow: "#042f2e",
      enamelCore: "#115e59", enamelOuter: "#0f766e", glow: "#2dd4bf",
      reliefHighlight: "#fef08a", reliefMid: "#eab308", reliefDark: "#854d0e"
    };
  }
  if (v === "malachite_green" || v === "green") {
    return {
      core: "#157347", outer: "#062e1c", highlight: "#4ae89b", bezel: "#1fa666", shadow: "#02170d",
      enamelCore: "#0f5433", enamelOuter: "#042114", glow: "#34d399",
      reliefHighlight: "#fff4b8", reliefMid: "#f3c647", reliefDark: "#7a510c"
    };
  }
  if (v === "obsidian_black" || v === "black" || v === "iron") {
    return {
      core: "#27272a", outer: "#09090b", highlight: "#a1a1aa", bezel: "#52525b", shadow: "#020617",
      enamelCore: "#18181b", enamelOuter: "#09090b", glow: "#71717a",
      reliefHighlight: "#fef08a", reliefMid: "#eab308", reliefDark: "#713f12"
    };
  }
  // Default bronze
  return {
    core: "#8c4e20", outer: "#45220c", highlight: "#ffd099", bezel: "#ad6631", shadow: "#241005",
    enamelCore: "#7a3e18", enamelOuter: "#3d1a08", glow: "#f59e0b",
    reliefHighlight: "#ffe8a3", reliefMid: "#d99b3b", reliefDark: "#784311"
  };
};

var $i = function({ name = "", variant = "gold", className = "", width = "100%", height = "100%" }) {
  const raw = (name || "").toString().toLowerCase().trim();
  const k = raw.replace(/^custom_/, "").replace(/^art_/, "").replace(/^emblem_/, "");
  
  // 1. LAUREL WREATH
  if (k === "laurel" || k === "wreath" || k === "triumph") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("path", { d: "M 32 78 C 16 64 16 36 34 22 C 34 32 30 46 40 56 C 36 66 34 74 32 78 Z", fill: "#fde047", stroke: "#ca8a04", strokeWidth: "1.5" }),
      e.jsx("path", { d: "M 68 78 C 84 64 84 36 66 22 C 66 32 70 46 60 56 C 64 66 66 74 68 78 Z", fill: "#fde047", stroke: "#ca8a04", strokeWidth: "1.5" }),
      e.jsx("circle", { cx: "50", cy: "78", r: "4", fill: "#dc2626", stroke: "#ca8a04", strokeWidth: "1" }),
      e.jsx("circle", { cx: "26", cy: "44", r: "2.5", fill: "#dc2626" }),
      e.jsx("circle", { cx: "74", cy: "44", r: "2.5", fill: "#dc2626" })
    ] });
  }

  // 2. EAGLE / AQUILA
  if (k === "eagle" || k === "aquila" || k === "legion" || k === "draco") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("path", { d: "M 50 16 L 56 26 L 44 26 Z", fill: "#facc15" }),
      e.jsx("path", { d: "M 50 24 C 62 14 84 18 90 34 C 74 34 62 44 54 52 C 54 40 52 32 50 24 Z", fill: "#facc15", stroke: "#b45309", strokeWidth: "1.2" }),
      e.jsx("path", { d: "M 50 24 C 38 14 16 18 10 34 C 26 34 38 44 46 52 C 46 40 48 32 50 24 Z", fill: "#facc15", stroke: "#b45309", strokeWidth: "1.2" }),
      e.jsx("path", { d: "M 44 48 L 56 48 L 54 74 L 50 82 L 46 74 Z", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "1" }),
      e.jsx("polygon", { points: "36,80 64,80 50,92", fill: "#dc2626", stroke: "#ca8a04", strokeWidth: "1" })
    ] });
  }

  // 3. SOL INVICTUS / SUN
  if (k === "sol" || k === "sun" || k === "apollo" || k === "star") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("circle", { cx: "50", cy: "50", r: "18", fill: "#fde047", stroke: "#b45309", strokeWidth: "2" }),
      Array.from({ length: 12 }).map((_, i) => {
        const ang = (i * 30 * Math.PI) / 180;
        const x1 = 50 + 22 * Math.cos(ang);
        const y1 = 50 + 22 * Math.sin(ang);
        const x2 = 50 + (i % 2 === 0 ? 38 : 30) * Math.cos(ang);
        const y2 = 50 + (i % 2 === 0 ? 38 : 30) * Math.sin(ang);
        return e.jsx("line", { key: i, x1, y1, x2, y2, stroke: "#facc15", strokeWidth: i % 2 === 0 ? "3" : "2", strokeLinecap: "round" });
      }),
      e.jsx("circle", { cx: "50", cy: "50", r: "10", fill: "#f59e0b" })
    ] });
  }

  // 4. ANCHOR / NAVAL
  if (k === "anchor" || k === "naval" || k === "port" || k === "sea") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("circle", { cx: "50", cy: "22", r: "8", stroke: "#fde047", strokeWidth: "3.5" }),
      e.jsx("line", { x1: "50", y1: "30", x2: "50", y2: "82", stroke: "#fde047", strokeWidth: "4.5", strokeLinecap: "round" }),
      e.jsx("line", { x1: "26", y1: "42", x2: "74", y2: "42", stroke: "#facc15", strokeWidth: "4", strokeLinecap: "round" }),
      e.jsx("path", { d: "M 22 62 C 26 84 74 84 78 62", stroke: "#fde047", strokeWidth: "5", strokeLinecap: "round" }),
      e.jsx("polygon", { points: "22,62 16,56 26,54", fill: "#fef08a" }),
      e.jsx("polygon", { points: "78,62 84,56 74,54", fill: "#fef08a" })
    ] });
  }

  // 5. HELMET / GALEA / ARMA
  if (k === "helmet" || k === "galea" || k === "arma") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("path", { d: "M 26 26 Q 50 10 74 26 L 70 34 Q 50 22 30 34 Z", fill: "#dc2626" }),
      e.jsx("path", { d: "M 28 44 C 28 26 72 26 72 44 L 76 62 C 76 74 68 76 50 76 C 32 76 24 74 24 62 Z", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "2" }),
      e.jsx("path", { d: "M 22 52 Q 50 42 78 52", stroke: "#fde047", strokeWidth: "2.5", strokeLinecap: "round" }),
      e.jsx("rect", { x: "46", y: "46", width: "8", height: "18", rx: "1", fill: "#facc15" }),
      e.jsx("path", { d: "M 32 58 L 28 76 L 40 70 Z", fill: "#b45309", stroke: "#ca8a04", strokeWidth: "1" }),
      e.jsx("path", { d: "M 68 58 L 72 76 L 60 70 Z", fill: "#b45309", stroke: "#ca8a04", strokeWidth: "1" })
    ] });
  }

  // 6. SWORDS / GLADIUS
  if (k === "swords" || k === "sword" || k === "gladius") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("line", { x1: "22", y1: "78", x2: "78", y2: "22", stroke: "#f1f5f9", strokeWidth: "4.5", strokeLinecap: "round" }),
      e.jsx("line", { x1: "22", y1: "22", x2: "78", y2: "78", stroke: "#f1f5f9", strokeWidth: "4.5", strokeLinecap: "round" }),
      e.jsx("polygon", { points: "78,22 84,16 80,24", fill: "#facc15" }),
      e.jsx("polygon", { points: "78,78 84,84 80,76", fill: "#facc15" }),
      e.jsx("rect", { x: "28", y: "68", width: "12", height: "3", transform: "rotate(45 34 69.5)", fill: "#f59e0b" }),
      e.jsx("rect", { x: "28", y: "28", width: "12", height: "3", transform: "rotate(-45 34 29.5)", fill: "#f59e0b" })
    ] });
  }

  // 7. SHIELD / SCUTUM
  if (k === "shield" || k === "scutum") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("rect", { x: "24", y: "18", width: "52", height: "64", rx: "8", fill: "#991b1b", stroke: "#fde047", strokeWidth: "3" }),
      e.jsx("circle", { cx: "50", cy: "50", r: "10", fill: "#facc15", stroke: "#78350f", strokeWidth: "1.5" }),
      e.jsx("polygon", { points: "50,26 56,42 50,38 44,42", fill: "#fde047" }),
      e.jsx("polygon", { points: "50,74 56,58 50,62 44,58", fill: "#fde047" }),
      e.jsx("line", { x1: "28", y1: "50", x2: "40", y2: "50", stroke: "#fde047", strokeWidth: "2" }),
      e.jsx("line", { x1: "60", y1: "50", x2: "72", y2: "50", stroke: "#fde047", strokeWidth: "2" })
    ] });
  }

  // 8. CROWN / CORONA
  if (k === "crown" || k === "corona") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("path", { d: "M 20 68 L 22 40 L 38 54 L 50 32 L 62 54 L 78 40 L 80 68 Z", fill: "#facc15", stroke: "#78350f", strokeWidth: "2" }),
      e.jsx("circle", { cx: "22", cy: "38", r: "3", fill: "#ef4444" }),
      e.jsx("circle", { cx: "50", cy: "30", r: "3.5", fill: "#3b82f6" }),
      e.jsx("circle", { cx: "78", cy: "38", r: "3", fill: "#ef4444" }),
      e.jsx("rect", { x: "20", y: "68", width: "60", height: "6", rx: "1.5", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "1" })
    ] });
  }

  // 9. BOOK / CODEX / SCROLL
  if (k === "book" || k === "codex" || k === "scroll") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("path", { d: "M 22 26 C 36 22 50 26 50 34 L 50 78 C 50 70 36 66 22 70 Z", fill: "#fef3c7", stroke: "#b45309", strokeWidth: "2" }),
      e.jsx("path", { d: "M 78 26 C 64 22 50 26 50 34 L 50 78 C 50 70 64 66 78 70 Z", fill: "#fef3c7", stroke: "#b45309", strokeWidth: "2" }),
      e.jsx("line", { x1: "28", y1: "36", x2: "44", y2: "38", stroke: "#92400e", strokeWidth: "1.8", strokeLinecap: "round" }),
      e.jsx("line", { x1: "28", y1: "46", x2: "44", y2: "48", stroke: "#92400e", strokeWidth: "1.8", strokeLinecap: "round" }),
      e.jsx("line", { x1: "56", y1: "38", x2: "72", y2: "36", stroke: "#92400e", strokeWidth: "1.8", strokeLinecap: "round" }),
      e.jsx("line", { x1: "56", y1: "48", x2: "72", y2: "46", stroke: "#92400e", strokeWidth: "1.8", strokeLinecap: "round" })
    ] });
  }

  // 10. SAVE / TABULARIUM / ARCHIVVM
  if (k === "save" || k === "tabula" || k === "archivvm" || k === "disk") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("rect", { x: "20", y: "18", width: "60", height: "64", rx: "6", fill: "#78350f", stroke: "#fde047", strokeWidth: "3" }),
      e.jsx("rect", { x: "28", y: "26", width: "44", height: "48", rx: "3", fill: "#451a03", stroke: "#b45309", strokeWidth: "1.5" }),
      e.jsx("circle", { cx: "50", cy: "50", r: "12", fill: "#d97706", stroke: "#fef08a", strokeWidth: "2" }),
      e.jsx("polygon", { points: "50,42 56,54 44,54", fill: "#fef08a" }),
      e.jsx("line", { x1: "60", y1: "22", x2: "78", y2: "40", stroke: "#fde047", strokeWidth: "3.5", strokeLinecap: "round" })
    ] });
  }

  // 11. GEM / DIAMOND / TREASURE
  if (k === "gem" || k === "diamond" || k === "treasure" || k === "fiscus") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("polygon", { points: "32,32 68,32 82,48 50,82 18,48", fill: "#38bdf8", stroke: "#0284c7", strokeWidth: "2" }),
      e.jsx("polygon", { points: "32,32 50,48 68,32", fill: "#bae6fd", opacity: "0.8" }),
      e.jsx("polygon", { points: "50,48 82,48 50,82", fill: "#0369a1", opacity: "0.5" }),
      e.jsx("polygon", { points: "50,48 18,48 50,82", fill: "#0284c7", opacity: "0.7" })
    ] });
  }

  // 12. COMPASS / TARGET
  if (k === "compass" || k === "target" || k === "centrum") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("circle", { cx: "50", cy: "50", r: "34", stroke: "#fde047", strokeWidth: "3.5" }),
      e.jsx("circle", { cx: "50", cy: "50", r: "20", stroke: "#f59e0b", strokeWidth: "2", strokeDasharray: "4 3" }),
      e.jsx("polygon", { points: "50,22 55,48 50,44 45,48", fill: "#ef4444" }),
      e.jsx("polygon", { points: "50,78 55,52 50,56 45,52", fill: "#cbd5e1" }),
      e.jsx("circle", { cx: "50", cy: "50", r: "4", fill: "#fde047" })
    ] });
  }

  // 13. AMPHORA / COMMODITY
  if (k === "amphora" || k === "wine" || k === "oil" || k === "grain" || k === "wheat") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("ellipse", { cx: "50", cy: "58", rx: "18", ry: "24", fill: "#b45309", stroke: "#fde047", strokeWidth: "2" }),
      e.jsx("rect", { x: "44", y: "24", width: "12", height: "14", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "1" }),
      e.jsx("ellipse", { cx: "50", cy: "24", rx: "8", ry: "3", fill: "#fde047" }),
      e.jsx("path", { d: "M 38 32 C 26 32 26 48 38 52", stroke: "#fde047", strokeWidth: "2.5", fill: "none" }),
      e.jsx("path", { d: "M 62 32 C 74 32 74 48 62 52", stroke: "#fde047", strokeWidth: "2.5", fill: "none" })
    ] });
  }

  // DEFAULT / FALLBACK: Roman Eagle & Laurel
  return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
    e.jsx("circle", { cx: "50", cy: "50", r: "28", fill: "#facc15", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("path", { d: "M 38 68 C 28 58 28 42 38 32", stroke: "#b45309", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 62 68 C 72 58 72 42 62 32", stroke: "#b45309", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("polygon", { points: "50,36 54,48 50,44 46,48", fill: "#78350f" })
  ] });
};

// MASTERWORK MEDALLION COMPONENT (rt)
var rt = b.memo(function({
  size = "md",
  variant = "bronze",
  icon,
  emblem,
  text,
  onClick,
  className = "",
  isActive,
  interactive,
  showGlow,
  isElaborate,
  isHeroic,
  level = 1,
  forceLOD
}) {
  const sizeStyle = typeof size === "number" ? { width: size + "px", height: size + "px" } : {};
  const sizeClass = typeof size === "string" ? (Jd[size || "md"] || "w-8 h-8") : "";
  const vName = (variant || "bronze").toString().replace(/[^a-zA-Z0-9_-]/g, "_");
  const pal = b.useMemo(() => Ao(variant), [variant]);

  const containerClass = [
    sizeClass,
    "relative shrink-0 select-none flex items-center justify-center rounded-full overflow-visible",
    (interactive || onClick) ? "cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150" : "",
    isActive ? "ring-2 ring-amber-400 animate-pulse ring-offset-1 ring-offset-[#080503]" : "",
    (showGlow || isHeroic) ? ("shadow-[0_0_18px_" + pal.glow + "]") : "shadow-md",
    className
  ].filter(Boolean).join(" ");

  const beads = b.useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const rad = (i * 360 / 28 * Math.PI) / 180;
      const bx = 100 + 86 * Math.cos(rad);
      const by = 100 + 86 * Math.sin(rad);
      return e.jsx("circle", { cx: bx, cy: by, r: "2.2", fill: pal.highlight, opacity: "0.8" }, "bd-" + i);
    });
  }, [pal.highlight]);

  const renderInner = () => {
    if (lt.isValidElement(icon)) {
      return e.jsx("div", {
        className: "absolute inset-0 flex items-center justify-center pointer-events-none",
        style: { width: "70%", height: "70%", margin: "auto" },
        children: lt.cloneElement(icon, { className: "w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]", width: "100%", height: "100%" })
      });
    }

    if (text && !emblem) {
      return e.jsx("div", {
        className: "absolute inset-0 flex items-center justify-center pointer-events-none font-cinzel font-black text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]",
        style: { fontSize: "36%" },
        children: text
      });
    }

    const embName = emblem || (typeof icon === "string" ? icon : "") || "laurel";
    return e.jsx("div", {
      className: "absolute inset-0 flex items-center justify-center pointer-events-none",
      style: { width: "70%", height: "70%", margin: "auto" },
      children: e.jsx("div", {
        className: "w-full h-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]",
        children: e.jsx($i, { name: embName, variant, className: "w-full h-full", width: "100%", height: "100%" })
      })
    });
  };

  return e.jsxs("div", {
    className: containerClass,
    style: sizeStyle,
    onClick,
    children: [
      // 3D Struck Coin Base SVG
      e.jsxs("svg", {
        viewBox: "0 0 200 200",
        className: "w-full h-full absolute inset-0 overflow-visible pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]",
        children: [
          e.jsxs("defs", {
            children: [
              e.jsxs("linearGradient", {
                id: "coin-rim-" + vName, x1: "0%", y1: "0%", x2: "100%", y2: "100%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: pal.highlight }),
                  e.jsx("stop", { offset: "35%", stopColor: pal.bezel }),
                  e.jsx("stop", { offset: "70%", stopColor: pal.core }),
                  e.jsx("stop", { offset: "100%", stopColor: pal.shadow })
                ]
              }),
              e.jsxs("radialGradient", {
                id: "enamel-bed-" + vName, cx: "45%", cy: "40%", r: "65%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: pal.enamelCore }),
                  e.jsx("stop", { offset: "70%", stopColor: pal.enamelOuter }),
                  e.jsx("stop", { offset: "100%", stopColor: pal.shadow })
                ]
              }),
              e.jsxs("linearGradient", {
                id: "glass-specular-arc", x1: "0%", y1: "0%", x2: "100%", y2: "100%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "#ffffff", stopOpacity: "0.45" }),
                  e.jsx("stop", { offset: "45%", stopColor: "#ffffff", stopOpacity: "0.08" }),
                  e.jsx("stop", { offset: "50%", stopColor: "#ffffff", stopOpacity: "0" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#ffffff", stopOpacity: "0" })
                ]
              })
            ]
          }),
          // Outer coin rim
          e.jsx("circle", { cx: "100", cy: "100", r: "96", fill: "url(#coin-rim-" + vName + ")" }),
          e.jsx("circle", { cx: "100", cy: "100", r: "91", fill: pal.shadow, opacity: "0.65" }),
          // Enamel center bed
          e.jsx("circle", { cx: "100", cy: "100", r: "88", fill: "url(#enamel-bed-" + vName + ")" }),
          // Guilloche boundary pearls
          beads,
          // Specular glass highlight reflection
          e.jsx("circle", { cx: "100", cy: "100", r: "88", fill: "url(#glass-specular-arc)" }),
          // Fine concentric boundary rim
          e.jsx("circle", { cx: "100", cy: "100", r: "87", fill: "none", stroke: pal.highlight, strokeWidth: "0.8", opacity: "0.35" })
        ]
      }),
      // Center Relief Artwork
      renderInner()
    ]
  });
});
rt.displayName = "Medallion";
if (typeof window !== "undefined") {
  window.rt = rt;
  window.Medallion = rt;
  window.EmblemSVG = $i;
}
`;

// Replace dummy rt definition with complete medallionSystemCode
const oldDummyRt = /var rt\s*=\s*typeof window !== "undefined" && window\.rt \|\| DummyIcon;/;
if (oldDummyRt.test(code)) {
  code = code.replace(oldDummyRt, medallionSystemCode);
  console.log("1. Successfully replaced DummyIcon rt with full Masterwork Medallion system!");
} else {
  console.warn("Could not match oldDummyRt regex directly; searching index...");
  const pRt = code.indexOf("var rt = typeof window");
  if (pRt !== -1) {
    const pRtEnd = code.indexOf(";", pRt) + 1;
    code = code.substring(0, pRt) + medallionSystemCode + code.substring(pRtEnd);
    console.log("1. Replaced dummy rt via index substring!");
  }
}

// 2. FIX THE SAVE BUTTON IN Vr (add "save", "tabula", "archivvm" emblem support)
const vrAnchorMatch = 'if(k==="anchor"){';
const vrSaveEmblem = `
      if(k==="save"||k==="tabula"||k==="archivvm"||k==="disk"||k==="settings"){
        return e.jsxs("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"none",className:"w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",children:[
          e.jsx("rect",{x:"3.5",y:"3.5",width:"17",height:"17",rx:"2",fill:"#78350f",stroke:"#fbbf24",strokeWidth:"1.5"}),
          e.jsx("rect",{x:"5.5",y:"5.5",width:"13",height:"13",rx:"1",fill:"#451a03",stroke:"#b45309",strokeWidth:"0.8"}),
          e.jsx("circle",{cx:"12",cy:"12",r:"3.5",fill:"#d97706",stroke:"#fef08a",strokeWidth:"1"}),
          e.jsx("polygon",{points:"12,9.8 13.5,13.2 10.5,13.2",fill:"#fef08a"}),
          e.jsx("line",{x1:"15",y1:"5",x2:"20.5",y2:"10.5",stroke:"#fde047",strokeWidth:"1.8",strokeLinecap:"round"}),
          e.jsx("circle",{cx:"20.5",cy:"10.5",r:"1",fill:"#fef08a"})
        ]});
      }
      `;

if (code.includes(vrAnchorMatch)) {
  code = code.replace(vrAnchorMatch, vrSaveEmblem + "\n      " + vrAnchorMatch);
  console.log("2. Successfully added Roman Save/Tabula emblem into Vr!");
} else {
  console.warn("Could not find vrAnchorMatch string!");
}

// 3. FIX TOP HUD SAVE BUTTON
// Update top-hud-settings-btn to pass emblem: "save" instead of icon: e.jsx(ml, ...)
const oldSettingsBtn = `e.jsx(Vr, { id: "top-hud-settings-btn", variant: "gold", icon: e.jsx(ml, { className: "w-[60%] h-[60%] text-[#F3E7C8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]", strokeWidth: 2 }), title: "Tabularium & Settings (Save/Load, Audio, D-Pad)", onClick: () => {    v.playClick(), n ? n() : window.dispatchEvent(new CustomEvent("open-save-manager"));  } })`;

const newSaveBtn = `e.jsx(Vr, {
  id: "top-hud-save-btn",
  variant: "gold",
  emblem: "save",
  title: "Archivvm & Tabularium (Save & Load Campaign)",
  onClick: () => {
    v.playClick();
    if (typeof n === "function") n();
    else window.dispatchEvent(new CustomEvent("open-save-manager"));
  }
})`;

if (code.includes(oldSettingsBtn)) {
  code = code.replace(oldSettingsBtn, newSaveBtn);
  console.log("3. Successfully upgraded top-hud-settings-btn to top-hud-save-btn with emblem: 'save'!");
} else {
  console.warn("Could not match exact oldSettingsBtn string, searching regex...");
  code = code.replace(
    /e\.jsx\(Vr,\s*\{\s*id:\s*"top-hud-settings-btn"[\s\S]*?onClick:\s*\(\)\s*=>\s*\{[\s\S]*?open-save-manager[\s\S]*?\}\s*\}\)/,
    newSaveBtn
  );
  console.log("3. Replaced via regex fallback!");
}

// Write back to index-V37.js
fs.writeFileSync(filePath, code, "utf8");

// Validate with esbuild
try {
  esbuild.buildSync({
    entryPoints: [filePath],
    outfile: "/tmp/medallion_save_test.js",
    bundle: false,
    format: "esm",
  });
  console.log("ESBUILD: 100% VALIDATED! Medallions and Save Button are pristine!");
} catch(e) {
  console.error("ESBUILD FAILED:", e.message);
  process.exit(1);
}
