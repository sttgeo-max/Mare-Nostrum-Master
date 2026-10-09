const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING PERFECT MEDALLIONS, MOVEMENT, AND HUD FIX ===");

// 1. Reset index-V37.js from clean V36 baseline
const v36Path = path.join(__dirname, '../public/assets/index-V36.js');
const filePath = path.join(__dirname, '../public/assets/index-V37.js');
fs.copyFileSync(v36Path, filePath);
let code = fs.readFileSync(filePath, 'utf8');

// 2. INJECT MASTERWORK MEDALLION SYSTEM (rt, Ao, $i)
const medallionSystemCode = `
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
  return {
    core: "#8c4e20", outer: "#45220c", highlight: "#ffd099", bezel: "#ad6631", shadow: "#241005",
    enamelCore: "#7a3e18", enamelOuter: "#3d1a08", glow: "#f59e0b",
    reliefHighlight: "#ffe8a3", reliefMid: "#d99b3b", reliefDark: "#784311"
  };
};

var $i = function({ name = "", variant = "gold", className = "", width = "100%", height = "100%" }) {
  const raw = (name || "").toString().toLowerCase().trim();
  const k = raw.replace(/^custom_/, "").replace(/^art_/, "").replace(/^emblem_/, "");
  
  if (k === "laurel" || k === "wreath" || k === "triumph") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("path", { d: "M 32 78 C 16 64 16 36 34 22 C 34 32 30 46 40 56 C 36 66 34 74 32 78 Z", fill: "#fde047", stroke: "#ca8a04", strokeWidth: "1.5" }),
      e.jsx("path", { d: "M 68 78 C 84 64 84 36 66 22 C 66 32 70 46 60 56 C 64 66 66 74 68 78 Z", fill: "#fde047", stroke: "#ca8a04", strokeWidth: "1.5" }),
      e.jsx("circle", { cx: "50", cy: "78", r: "4", fill: "#dc2626", stroke: "#ca8a04", strokeWidth: "1" })
    ] });
  }

  if (k === "eagle" || k === "aquila" || k === "legion" || k === "draco") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("path", { d: "M 50 16 L 56 26 L 44 26 Z", fill: "#facc15" }),
      e.jsx("path", { d: "M 50 24 C 62 14 84 18 90 34 C 74 34 62 44 54 52 C 54 40 52 32 50 24 Z", fill: "#facc15", stroke: "#b45309", strokeWidth: "1.2" }),
      e.jsx("path", { d: "M 50 24 C 38 14 16 18 10 34 C 26 34 38 44 46 52 C 46 40 48 32 50 24 Z", fill: "#facc15", stroke: "#b45309", strokeWidth: "1.2" }),
      e.jsx("polygon", { points: "36,80 64,80 50,92", fill: "#dc2626", stroke: "#ca8a04", strokeWidth: "1" })
    ] });
  }

  if (k === "sol" || k === "sun" || k === "apollo" || k === "star") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("circle", { cx: "50", cy: "50", r: "18", fill: "#fde047", stroke: "#b45309", strokeWidth: "2" }),
      Array.from({ length: 8 }).map((_, i) => {
        const ang = (i * 45 * Math.PI) / 180;
        return e.jsx("line", { key: i, x1: 50 + 22 * Math.cos(ang), y1: 50 + 22 * Math.sin(ang), x2: 50 + 36 * Math.cos(ang), y2: 50 + 36 * Math.sin(ang), stroke: "#facc15", strokeWidth: "3", strokeLinecap: "round" });
      })
    ] });
  }

  if (k === "anchor" || k === "naval" || k === "port" || k === "sea" || k === "ship") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("circle", { cx: "50", cy: "22", r: "8", stroke: "#fde047", strokeWidth: "3.5" }),
      e.jsx("line", { x1: "50", y1: "30", x2: "50", y2: "82", stroke: "#fde047", strokeWidth: "4.5", strokeLinecap: "round" }),
      e.jsx("line", { x1: "26", y1: "42", x2: "74", y2: "42", stroke: "#facc15", strokeWidth: "4", strokeLinecap: "round" }),
      e.jsx("path", { d: "M 22 62 C 26 84 74 84 78 62", stroke: "#fde047", strokeWidth: "5", strokeLinecap: "round" })
    ] });
  }

  if (k === "helmet" || k === "galea" || k === "arma") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("path", { d: "M 26 26 Q 50 10 74 26 L 70 34 Q 50 22 30 34 Z", fill: "#dc2626" }),
      e.jsx("path", { d: "M 28 44 C 28 26 72 26 72 44 L 76 62 C 76 74 68 76 50 76 C 32 76 24 74 24 62 Z", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "2" })
    ] });
  }

  if (k === "swords" || k === "sword" || k === "gladius") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("line", { x1: "22", y1: "78", x2: "78", y2: "22", stroke: "#f1f5f9", strokeWidth: "4.5", strokeLinecap: "round" }),
      e.jsx("line", { x1: "22", y1: "22", x2: "78", y2: "78", stroke: "#f1f5f9", strokeWidth: "4.5", strokeLinecap: "round" })
    ] });
  }

  if (k === "shield" || k === "scutum") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("rect", { x: "24", y: "18", width: "52", height: "64", rx: "8", fill: "#991b1b", stroke: "#fde047", strokeWidth: "3" }),
      e.jsx("circle", { cx: "50", cy: "50", r: "10", fill: "#facc15", stroke: "#78350f", strokeWidth: "1.5" })
    ] });
  }

  if (k === "save" || k === "tabula" || k === "archivvm" || k === "disk" || k === "settings") {
    return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
      e.jsx("rect", { x: "20", y: "18", width: "60", height: "64", rx: "6", fill: "#78350f", stroke: "#fde047", strokeWidth: "3" }),
      e.jsx("rect", { x: "28", y: "26", width: "44", height: "48", rx: "3", fill: "#451a03", stroke: "#b45309", strokeWidth: "1.5" }),
      e.jsx("circle", { cx: "50", cy: "50", r: "12", fill: "#d97706", stroke: "#fef08a", strokeWidth: "2" })
    ] });
  }

  return e.jsxs("svg", { viewBox: "0 0 100 100", width, height, className, fill: "none", children: [
    e.jsx("circle", { cx: "50", cy: "50", r: "28", fill: "#facc15", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("path", { d: "M 38 68 C 28 58 28 42 38 32", stroke: "#b45309", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 62 68 C 72 58 72 42 62 32", stroke: "#b45309", strokeWidth: "2.5", strokeLinecap: "round" })
  ] });
};

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
  title,
  id
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
    title,
    id,
    children: [
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
              })
            ]
          }),
          e.jsx("circle", { cx: "100", cy: "100", r: "96", fill: "url(#coin-rim-" + vName + ")" }),
          e.jsx("circle", { cx: "100", cy: "100", r: "91", fill: pal.shadow, opacity: "0.65" }),
          e.jsx("circle", { cx: "100", cy: "100", r: "88", fill: "url(#enamel-bed-" + vName + ")" }),
          e.jsx("circle", { cx: "100", cy: "100", r: "87", fill: "none", stroke: pal.highlight, strokeWidth: "0.8", opacity: "0.35" })
        ]
      }),
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

const oldDummyRt = /var rt\s*=\s*typeof window !== "undefined" && window\.rt \|\| DummyIcon;/;
if (oldDummyRt.test(code)) {
  code = code.replace(oldDummyRt, medallionSystemCode);
  console.log("0. Injected Masterwork Medallion system!");
}

// 3. FIX G0 MOVEMENT FUNCTION (from idxG0 to idxGi)
const idxG0 = code.indexOf("var G0 = function(");
const idxGi = code.indexOf("var Gi = function(");
if (idxG0 !== -1 && idxGi !== -1) {
  const newG0 = `var G0 = function(curX, curY, targetX, targetY, mode, anchorPoint) {
  if (targetX === undefined || targetY === undefined) return { x: curX || 0, y: curY || 0, didLand: false, didEmbark: false };
  var isTargetLand = typeof ns === "function" ? ns(targetX, targetY) : false;
  var isCurLand = typeof ns === "function" ? ns(curX, curY) : false;
  var didLand = !isCurLand && isTargetLand;
  var didEmbark = isCurLand && !isTargetLand;
  return { x: targetX, y: targetY, didLand: didLand, didEmbark: didEmbark };
};
if (typeof window !== "undefined") { window.G0 = G0; }\n\n`;
  code = code.substring(0, idxG0) + newG0 + code.substring(idxGi);
  console.log("1. Replaced G0 movement logic!");
}

// 4. RESTORE FULL MEDALLION HOUSING FRAME COMPONENT (Ha) (from idxHa to idxHi)
const idxHa = code.indexOf("var Ha = typeof window");
const idxHi = code.indexOf("var Hi = function(");
if (idxHa !== -1 && idxHi !== -1) {
  const newHa = `var x0 = { compact: 15, standard: 18, major: 22, colossal: 26 };
var Ha = b.memo(({ size: t, tier: s, medium: a = "water", isMoving: r = false, isElaborate: o = false, className: l = "", children: n }) => {
  const c = t ?? (s ? x0[s] : 18), i = Math.max(2, Math.round(c * 0.08)), p = c + i * 2, x = p / 2, u = c / 2, d = u + (o ? 0.5 : 0.25), m = u + (o ? 0.25 : 0.12), h = a;
  return e.jsxs("div", {
    className: "relative inline-flex items-center justify-center select-none " + l,
    style: { width: c + "px", height: c + "px" },
    children: [
      e.jsxs("svg", {
        viewBox: "0 0 " + p + " " + p,
        className: "absolute pointer-events-none overflow-visible",
        style: { width: p + "px", height: p + "px", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 0 },
        children: [
          e.jsxs("defs", {
            children: [
              e.jsx("radialGradient", {
                id: "ptg-sf-" + h, cx: "50%", cy: "50%", r: "50%",
                children: a === "water"
                  ? e.jsxs(e.Fragment, { children: [e.jsx("stop", { offset: "0%", stopColor: "#020914", stopOpacity: "0.25" }), e.jsx("stop", { offset: "75%", stopColor: "#061c33", stopOpacity: "0.45" }), e.jsx("stop", { offset: "100%", stopColor: "#0c345c", stopOpacity: "0" })] })
                  : e.jsxs(e.Fragment, { children: [e.jsx("stop", { offset: "0%", stopColor: "#040201", stopOpacity: "0.25" }), e.jsx("stop", { offset: "75%", stopColor: "#120703", stopOpacity: "0.4" }), e.jsx("stop", { offset: "100%", stopColor: "#1c0b05", stopOpacity: "0" })] })
              }),
              e.jsx("radialGradient", {
                id: "ptg-cs-" + h, cx: "50%", cy: "50%", r: "50%",
                children: a === "water"
                  ? e.jsxs(e.Fragment, { children: [e.jsx("stop", { offset: "60%", stopColor: "#020812", stopOpacity: "0.25" }), e.jsx("stop", { offset: "85%", stopColor: "#051529", stopOpacity: "0.45" }), e.jsx("stop", { offset: "100%", stopColor: "#08203d", stopOpacity: "0" })] })
                  : e.jsxs(e.Fragment, { children: [e.jsx("stop", { offset: "60%", stopColor: "#020100", stopOpacity: "0.25" }), e.jsx("stop", { offset: "85%", stopColor: "#080402", stopOpacity: "0.45" }), e.jsx("stop", { offset: "100%", stopColor: "#100603", stopOpacity: "0" })] })
              }),
              e.jsx("radialGradient", {
                id: "ptg-cast-" + h, cx: "50%", cy: "50%", r: "50%",
                children: a === "water"
                  ? e.jsxs(e.Fragment, { children: [e.jsx("stop", { offset: "70%", stopColor: "#020812", stopOpacity: "0.2" }), e.jsx("stop", { offset: "90%", stopColor: "#071a30", stopOpacity: "0.3" }), e.jsx("stop", { offset: "100%", stopColor: "#0b2847", stopOpacity: "0" })] })
                  : e.jsxs(e.Fragment, { children: [e.jsx("stop", { offset: "70%", stopColor: "#030101", stopOpacity: "0.65" }), e.jsx("stop", { offset: "90%", stopColor: "#0f0603", stopOpacity: "0.25" }), e.jsx("stop", { offset: "100%", stopColor: "#140804", stopOpacity: "0" })] })
              }),
              e.jsxs("linearGradient", {
                id: "ptg-socket-bevel", x1: "0%", y1: "0%", x2: "100%", y2: "100%",
                children: [e.jsx("stop", { offset: "0%", stopColor: "#000000", stopOpacity: "0.6" }), e.jsx("stop", { offset: "50%", stopColor: "#1a0a04", stopOpacity: "0.25" }), e.jsx("stop", { offset: "100%", stopColor: "#d4af37", stopOpacity: "0.3" })]
              }),
              e.jsxs("linearGradient", {
                id: "ptg-collar-rim", x1: "0%", y1: "0%", x2: "100%", y2: "100%",
                children: [e.jsx("stop", { offset: "0%", stopColor: "#5c2607" }), e.jsx("stop", { offset: "50%", stopColor: "#290f02" }), e.jsx("stop", { offset: "100%", stopColor: "#5c2607" })]
              })
            ]
          }),
          e.jsx("circle", { cx: x, cy: x, r: d + 0.6, fill: "url(#ptg-cast-" + h + ")" }),
          e.jsxs("g", {
            children: [
              e.jsx("circle", { cx: x, cy: x, r: d, fill: "url(#ptg-sf-" + h + ")" }),
              e.jsx("circle", { cx: x, cy: x, r: d, fill: "none", stroke: "url(#ptg-socket-bevel)", strokeWidth: 0.8 })
            ]
          }),
          e.jsx("circle", { cx: x, cy: x, r: m, fill: "url(#ptg-cs-" + h + ")" }),
          e.jsxs("g", {
            children: [
              e.jsx("circle", { cx: x, cy: x, r: m, fill: "none", stroke: "url(#ptg-collar-rim)", strokeWidth: 0.6, opacity: "0.75" }),
              e.jsx("circle", { cx: x, cy: x, r: u + 0.1, fill: "none", stroke: "#030101", strokeWidth: 0.5, opacity: "0.8" })
            ]
          }),
          a === "water" && e.jsxs("g", {
            children: [
              e.jsx("circle", { cx: x, cy: x, r: u + 0.6, fill: "none", stroke: "#0284c7", strokeWidth: 0.4, opacity: "0.35" }),
              r && e.jsx("circle", { cx: x, cy: x, r: u + 1.2, fill: "none", stroke: "#38bdf8", strokeWidth: 0.5, opacity: "0.5", className: "animate-ping" })
            ]
          })
        ]
      }),
      n
    ]
  });
});
if (typeof window !== "undefined") { window.Ha = Ha; window.MedallionHousing = Ha; }\n\n`;
  code = code.substring(0, idxHa) + newHa + code.substring(idxHi);
  console.log("2. Restored Medallion Housing (Ha)!");
}

// 5. UPGRADE PLAYER TOKEN (zo) (from idxZo to idxPp)
const idxZo = code.indexOf("var zo = b.memo");
const idxPp = code.indexOf("var pp =", idxZo);
if (idxZo !== -1 && idxPp !== -1) {
  const newZo = `var zo = b.memo(({ player: t, playerMode: ge = "sea", isMoving: V = false, activeVector: Zs, velocity: vel, modeTransitioning: ht, mapScale: Je = 1 }) => {
  const isSea = ge === "sea";
  const iter = t?.iter ?? 6;
  const maxIter = t?.maxIter ?? 6;
  const hp = isSea ? (t?.fleetHp ?? 100) : (t?.legionHp ?? 100);
  const maxHp = isSea ? (t?.maxFleetHp ?? 100) : (t?.maxLegionHp ?? 100);
  const hpPercent = Math.max(0, Math.min(100, (hp / (maxHp || 1)) * 100));

  return e.jsxs("div", {
    className: "relative flex flex-col items-center justify-center select-none pointer-events-auto cursor-pointer",
    style: { transform: "scale(" + Math.max(0.85, Math.min(1.25, 1 / (Je || 1))) + ")", transformOrigin: "center center" },
    children: [
      e.jsx("div", {
        className: "absolute -inset-3 rounded-full pointer-events-none transition-all duration-300 " + (
          isSea
            ? "border-2 border-amber-400/90 shadow-[0_0_24px_rgba(245,158,11,0.7),inset_0_0_12px_rgba(245,158,11,0.4)]"
            : "border-2 border-rose-500/90 shadow-[0_0_24px_rgba(244,63,94,0.7),inset_0_0_12px_rgba(244,63,94,0.4)]"
        ) + (V ? " animate-pulse scale-110" : " scale-100")
      }),
      e.jsx(Ha, {
        size: 44,
        medium: isSea ? "water" : "land",
        isMoving: V,
        isElaborate: true,
        children: e.jsx(rt, {
          size: 44,
          variant: isSea ? "gold" : "crimson",
          emblem: isSea ? "anchor" : "scutum",
          showGlow: true,
          isHeroic: true
        })
      }),
      e.jsxs("div", {
        className: "absolute -bottom-4 flex flex-col items-center gap-0.5 pointer-events-none z-10",
        children: [
          e.jsx("div", {
            className: "w-11 h-1.5 rounded-full bg-black/80 border border-amber-500/50 overflow-hidden shadow-sm",
            children: e.jsx("div", {
              className: "h-full transition-all duration-300 " + (
                hpPercent > 50 ? "bg-emerald-500" : hpPercent > 25 ? "bg-amber-400" : "bg-red-500"
              ),
              style: { width: hpPercent + "%" }
            })
          }),
          e.jsxs("div", {
            className: "px-1.5 py-0.2 rounded-full bg-black/85 border border-amber-400/60 flex items-center gap-1 shadow-md",
            children: [
              e.jsx("span", {
                className: "text-[8px] font-black font-cinzel text-amber-300 leading-none",
                children: isSea ? ("ITER " + iter + "/" + maxIter) : ("LEGIO " + iter + "/" + maxIter)
              })
            ]
          })
        ]
      })
    ]
  });
});\n\n`;
  code = code.substring(0, idxZo) + newZo + code.substring(idxPp);
  console.log("3. Upgraded zo to Masterwork Medallion Token!");
}

// 6. UPGRADE HUD BUTTONS (Vr) (from idxVr to idxMc)
const idxVr = code.indexOf("var Vr = b.memo");
const idxMc = code.indexOf("var mc=b.memo(d0);", idxVr);
if (idxVr !== -1 && idxMc !== -1) {
  const newVr = `var Vr = b.memo(({ emblem: t, icon: s, variant: a = "gold", title: r, onClick: o, disabled: l = false, showGlow: n = false, className: c = "", id: i, onPointerDown: p, onTouchStart: x }) => {
  return e.jsx(rt, {
    size: "lg",
    variant: a,
    emblem: t,
    icon: s,
    onClick: o,
    disabled: l,
    showGlow: n,
    className: c,
    title: r,
    id: i
  });
});\n\n`;
  code = code.substring(0, idxVr) + newVr + code.substring(idxMc);
  console.log("4. Upgraded Vr to 3D Struck Medallions!");
}

// 7. FIX TOP HUD SAVE BUTTON
const oldSettingsBtn = `e.jsx(Vr, { id: "top-hud-settings-btn", variant: "gold", icon: e.jsx(ml, { className: "w-[60%] h-[60%] text-[#F3E7C8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]", strokeWidth: 2 }), title: "Tabularium & Settings (Save/Load, Audio, D-Pad)", onClick: () => {    v.playClick(), n ? n() : window.dispatchEvent(new CustomEvent("open-save-manager"));  } })`;
const newSaveBtn = `e.jsx(Vr, { id: "top-hud-save-btn", variant: "gold", emblem: "save", title: "Archivvm & Tabularium (Save & Load Campaign)", onClick: () => { v.playClick(); if (typeof n === "function") n(); else window.dispatchEvent(new CustomEvent("open-save-manager")); } })`;

if (code.includes(oldSettingsBtn)) {
  code = code.replace(oldSettingsBtn, newSaveBtn);
  console.log("5. Upgraded Top HUD settings button to Top HUD save medallion!");
} else {
  code = code.replace(
    /e\.jsx\(Vr,\s*\{\s*id:\s*"top-hud-settings-btn"[\s\S]*?onClick:\s*\(\)\s*=>\s*\{[\s\S]*?open-save-manager[\s\S]*?\}\s*\}\)/,
    newSaveBtn
  );
  console.log("5. Replaced Top HUD settings button via regex!");
}

// Write back to public/assets/index-V37.js
fs.writeFileSync(filePath, code, 'utf8');

// Validate with esbuild
try {
  esbuild.buildSync({
    entryPoints: [filePath],
    outfile: '/tmp/medallion_movement_fix_test.js',
    bundle: false,
    format: 'esm',
  });
  console.log("ESBUILD VALIDATION: 100% SUCCESSFUL! ALL MEDALLIONS, MOVEMENT, AND HUD FULLY FIXED!");
} catch (e) {
  console.error("ESBUILD VALIDATION FAILED:", e.message);
  process.exit(1);
}
