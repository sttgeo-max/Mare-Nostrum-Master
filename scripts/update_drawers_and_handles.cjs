const fs = require("fs");
const path = require("path");

const builderPath = path.join(__dirname, "build_clean_v34.cjs");
let script = fs.readFileSync(builderPath, "utf8");

// =========================================================================
// 1. MappaImperiiFrame: Pure classical gilded vignette and column borders.
// NO yellow architraves or text labels hiding behind the notification bar!
// =========================================================================
const newMappaImperiiFrame = `MappaImperiiFrame = lt.memo(() => {
    return e.jsxs("div", {
      className: "pointer-events-none fixed inset-0 z-40 overflow-hidden select-none",
      children: [
        // Classical Roman Atmospheric Vignette & Screen Depth
        e.jsx("div", {
          className: "absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(2,12,24,0.8),inset_0_0_40px_rgba(0,0,0,0.95)]"
        }),
        // Top Roman Cornice Trim (Clean, subtle gilded line, NO obstructive tabs behind top bar)
        e.jsxs("div", {
          className: "absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-950 via-amber-400 to-amber-950 border-b border-amber-500/40 shadow-[0_2px_8px_rgba(0,0,0,0.9)] z-40 flex items-center justify-between px-4",
          children: [
            e.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_4px_rgba(245,158,11,0.8)]" }),
            e.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_4px_rgba(245,158,11,0.8)]" })
          ]
        }),
        // Left Fluted Roman Column Pilaster (flush border frame)
        e.jsx("div", {
          className: "absolute top-0 bottom-0 left-0 w-1.5 sm:w-2 bg-gradient-to-r from-amber-950 via-amber-600/70 to-amber-950 border-r border-amber-500/40 shadow-[2px_0_8px_rgba(0,0,0,0.8)] z-40 pointer-events-none"
        }),
        // Right Fluted Roman Column Pilaster (flush border frame)
        e.jsx("div", {
          className: "absolute top-0 bottom-0 right-0 w-1.5 sm:w-2 bg-gradient-to-l from-amber-950 via-amber-600/70 to-amber-950 border-l border-amber-500/40 shadow-[-2px_0_8px_rgba(0,0,0,0.8)] z-40 pointer-events-none"
        })
      ]
    })
  })`;

// =========================================================================
// 2. fp (Roman Solidus Currency Button):
// Gorgeous Roman Aureus Gold Coin with embossed wreath, laurel and emperor profile.
// Directly opens full Fiscus / Provincial Trade screen!
// =========================================================================
const newFp = `fp=({player:t,onClick:s,isOpen:a=!1,onOpenTrade:oTrade})=>{
  const [isHover, setIsHover] = b.useState(false);
  const solidiVal = (t && t.solidi !== undefined) ? t.solidi : 0;
  const formattedVal = solidiVal.toLocaleString();
  const handleOpenFull = () => {
    try { if (typeof v !== "undefined" && (v.playCoin || v.playCoinClink)) (v.playCoin ? v.playCoin() : v.playCoinClink()); } catch(e){}
    if (oTrade) oTrade();
    else window.dispatchEvent(new CustomEvent("open-codex-tab", { detail: "PORT TRIBUTES" }));
  };
  return e.jsxs("div", {
    className: "relative shrink-0 flex items-center select-none",
    children: [
      e.jsxs("button", {
        id: "top-hud-fiscus-solidus-btn",
        type: "button",
        onClick: handleOpenFull,
        onMouseEnter: () => setIsHover(true),
        onMouseLeave: () => setIsHover(false),
        className: "flex items-center gap-2 pl-1.5 pr-3.5 py-1 bg-gradient-to-b from-[#261508]/95 via-[#180c04]/98 to-[#0a0502]/98 border-[1.5px] border-amber-400/90 hover:border-amber-300 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.9),0_0_12px_rgba(245,158,11,0.35),inset_0_1px_2px_rgba(255,255,255,0.25)] h-9 sm:h-10 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer",
        title: "Fiscus Imperialis: " + formattedVal + " Solidi (Click to open Provincial Trade Ledger)",
        "aria-label": "Imperial Treasury",
        children: [
          // High-Relief Roman Aureus Solidus Gold Medallion
          e.jsx("div", {
            className: "w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-amber-700 via-amber-400 to-yellow-200 border border-amber-300 flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.7)] shrink-0",
            children: e.jsxs("svg", {
              viewBox: "0 0 24 24",
              width: "18",
              height: "18",
              className: "w-4.5 h-4.5 text-stone-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]",
              fill: "currentColor",
              children: [
                e.jsx("circle", { cx: "12", cy: "12", r: "10", fill: "none", stroke: "#78350f", strokeWidth: "1.2", strokeDasharray: "1.5 1.5" }),
                e.jsx("path", { d: "M 8 16 C 8 13 10 11 12 11 C 14 11 16 13 16 16 Z", fill: "#78350f" }),
                e.jsx("circle", { cx: "12", cy: "8", r: "3", fill: "#78350f" }),
                e.jsx("path", { d: "M 6 8 C 6 5 9 4 12 4 C 15 4 18 5 18 8", fill: "none", stroke: "#92400e", strokeWidth: "1", strokeLinecap: "round" })
              ]
            })
          }),
          e.jsxs("div", {
            className: "flex items-baseline gap-1 font-mono",
            children: [
              e.jsx("span", { className: "font-black text-xs sm:text-sm text-amber-200 tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]", children: formattedVal }),
              e.jsx("span", { className: "text-[10px] font-bold text-amber-400/90 font-cinzel", children: "S" })
            ]
          })
        ]
      })
    ]
  });
}`;

// =========================================================================
// 3. Left Frame Drawer Button (hp) & Right Frame Drawer Button (bp)
// Attached seamlessly to the left and right Roman border columns!
// =========================================================================
const newHpSideDrawer = `hp=({player:t,onClick:s,isOpen:a=!1})=>{
  const hpVal = Math.max(t.legionHp ?? 0, t.fleetHp ?? 0);
  const maxHpVal = Math.max(t.maxLegionHp || 100, t.maxFleetHp || 100);
  const hpPct = Math.min(100, Math.max(0, Math.round(hpVal / Math.max(1, maxHpVal) * 100)));
  const isCritical = hpPct <= 35;
  return e.jsxs("div", {
    className: "relative shrink-0 flex items-center select-none",
    children: [
      e.jsxs("button", {
        id: "hud-vials-container",
        type: "button",
        onClick: s,
        className: "relative flex items-center justify-center pl-1 pr-2.5 py-2.5 rounded-r-2xl bg-gradient-to-r from-amber-950 via-[#180c06] to-amber-900 border-y-2 border-r-2 border-amber-400/90 hover:border-amber-300 shadow-[4px_0_16px_rgba(0,0,0,0.9),0_0_12px_rgba(245,158,11,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group " + (a ? "ring-2 ring-amber-400" : ""),
        title: "Exercitus & Vitality Drawer (Tap to inspect cohort integrity & tactical stances)",
        children: [
          // Gilded Intaglio Shield / Heart Medallion
          e.jsx("div", {
            className: "w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-[#3a0808] via-[#200404] to-[#0a0101] border-[1.5px] border-amber-400/80 flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)] " + (isCritical ? "animate-pulse border-red-500" : ""),
            children: e.jsx(rt, {
              variant: isCritical ? "crimson" : "gold",
              emblem: t.playerMode === "land" ? "shield" : "ship",
              size: 20
            })
          }),
          // Minimalist Vertical Health Meter
          e.jsxs("div", {
            className: "ml-1.5 flex flex-col items-center gap-0.5",
            children: [
              e.jsx("div", {
                className: "w-1.5 h-6 bg-stone-900 rounded-full overflow-hidden border border-amber-500/40 p-px flex flex-col justify-end",
                children: e.jsx("div", {
                  className: "w-full rounded-full transition-all duration-300 " + (isCritical ? "bg-red-500" : hpPct <= 60 ? "bg-amber-400" : "bg-emerald-400"),
                  style: { height: hpPct + "%" }
                })
              }),
              e.jsx("div", { className: "w-1 h-1 rounded-full bg-amber-400/80" })
            ]
          })
        ]
      })
    ]
  });
}`;

const newBpSideDrawer = `bp=({player:t,mapArtifacts:s=[],trackedArtifactId:a,onClick:r,isOpen:o=!1})=>{
  const windDir = t.windDirection || "N";
  return e.jsxs("div", {
    className: "relative shrink-0 flex items-center select-none",
    children: [
      e.jsxs("button", {
        id: "btn-hud-compass-coin",
        type: "button",
        onClick: r,
        className: "relative flex items-center justify-center pr-1 pl-2.5 py-2.5 rounded-l-2xl bg-gradient-to-l from-amber-950 via-[#180c06] to-amber-900 border-y-2 border-l-2 border-amber-400/90 hover:border-amber-300 shadow-[-4px_0_16px_rgba(0,0,0,0.9),0_0_12px_rgba(245,158,11,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group " + (o ? "ring-2 ring-amber-400" : ""),
        title: "Navigatio & Celestial Compass (Tap to inspect winds, weather & sea lanes)",
        children: [
          // Minimalist Wind Needle Indicator
          e.jsxs("div", {
            className: "mr-1.5 flex flex-col items-center gap-0.5",
            children: [
              e.jsx("span", { className: "text-[8px] font-mono font-black text-amber-300", children: windDir }),
              e.jsx("div", { className: "w-1 h-1 rounded-full bg-amber-400/80" })
            ]
          }),
          // Gilded Intaglio Compass Rose Medallion
          e.jsx("div", {
            className: "w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-[#1c140c] via-[#0f0904] to-[#050301] border-[1.5px] border-amber-400/80 flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.9)]",
            children: e.jsxs("svg", {
              viewBox: "0 0 24 24",
              width: "20",
              height: "20",
              className: "w-5 h-5 text-amber-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]",
              fill: "none",
              children: [
                e.jsx("circle", { cx: "12", cy: "12", r: "9.5", stroke: "#d97706", strokeWidth: "1.2" }),
                e.jsx("polygon", { points: "12,3 14,10 12,12 10,10", fill: "#ef4444" }),
                e.jsx("polygon", { points: "12,21 14,14 12,12 10,14", fill: "#cbd5e1" }),
                e.jsx("polygon", { points: "3,12 10,10 12,12 10,14", fill: "#fbbf24" }),
                e.jsx("polygon", { points: "21,12 14,10 12,12 14,14", fill: "#fbbf24" }),
                e.jsx("circle", { cx: "12", cy: "12", r: "2", fill: "#fde047" })
              ]
            })
          })
        ]
      })
    ]
  });
}`;

// =========================================================================
// 4. Update Top Bar in yp: All 3 buttons open full screens directly!
// =========================================================================
// Replace fp button:
const oldFpDef = script.indexOf("fp=({player:t,onClick:s");
if (oldFpDef !== -1) {
  const fpEnd = script.indexOf(",bp=({player:t,mapArtifacts:", oldFpDef);
  if (fpEnd !== -1) {
    script = script.substring(0, oldFpDef) + newFp + script.substring(fpEnd);
  }
}

// Replace MappaImperiiFrame:
const mfDefIdx = script.indexOf("const mappaImperiiFrameDef = `MappaImperiiFrame = lt.memo(() => {");
if (mfDefIdx !== -1) {
  const mfEndIdx = script.indexOf("if (cleanJs.includes(ppAnchor)) {", mfDefIdx);
  if (mfEndIdx !== -1) {
    script = script.substring(0, mfDefIdx) + `const mappaImperiiFrameDef = \`${newMappaImperiiFrame}\`;\n  ` + script.substring(mfEndIdx);
  }
}

// Connect Top Bar notification pill to full campaign journal / Senate directly:
script = script.replace(
  'onClick:()=>{v.playClick(),window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu",{detail:"DISPATCHES"}))}',
  'onClick:()=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}window.dispatchEvent(new CustomEvent("open-campaign-journal"));}'
);

// Connect Top Bar Codex button to full Codex directly:
script = script.replace(
  'onClick:()=>{v.playClick(),window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu",{detail:"CODEX"}))}',
  'onClick:()=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}window.dispatchEvent(new CustomEvent("open-codex-tab",{detail:"PRINCIPIA"}));}'
);

// =========================================================================
// 5. Update hp and bp implementations:
// =========================================================================
const hpDefInJs = script.indexOf("hp=({player:t,onClick:s,isOpen:a=!1})=>{");
if (hpDefInJs !== -1) {
  const hpEndInJs = script.indexOf(",bp=({player:t,mapArtifacts:", hpDefInJs);
  if (hpEndInJs !== -1) {
    const bpEndInJs = script.indexOf(",up=({isOpen:", hpEndInJs);
    if (bpEndInJs !== -1) {
      script = script.substring(0, hpDefInJs) + newHpSideDrawer + ",\n" + newBpSideDrawer + script.substring(bpEndInJs);
      
    }
  }
}

// =========================================================================
// 6. Unified HUD Frame Attachment in d0 (Bottom HUD):
// Left & Right button wings attached directly to the bottom frame!
// =========================================================================
const oldLeftPedestal = 'className:"pointer-events-auto p-1.5 sm:p-2 rounded-2xl bg-gradient-to-b from-[#1c0c07]/90 via-[#0d0603]/95 to-[#1c0c07]/90 border-2 border-amber-500/75 shadow-[0_8px_20px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.15)] flex flex-col gap-1.5 sm:gap-2 items-center"';
const newLeftPedestal = 'className:"pointer-events-auto p-2 rounded-t-3xl sm:rounded-t-3xl bg-gradient-to-b from-[#261408]/98 via-[#140a04]/98 to-[#0a0502]/98 border-t-2 border-x-2 border-amber-400/90 shadow-[0_-8px_24px_rgba(0,0,0,0.95),0_0_14px_rgba(245,158,11,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)] flex flex-col gap-2 items-center"';
if (script.includes(oldLeftPedestal)) {
  script = script.replace(oldLeftPedestal, newLeftPedestal);
}

const oldRightPedestal = 'className:"pointer-events-auto p-1.5 sm:p-2 rounded-2xl bg-gradient-to-b from-[#1c0c07]/90 via-[#0d0603]/95 to-[#1c0c07]/90 border-2 border-amber-500/75 shadow-[0_8px_20px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.15)] flex flex-col gap-2.5 sm:gap-3 items-center"';
const newRightPedestal = 'className:"pointer-events-auto p-2 rounded-t-3xl sm:rounded-t-3xl bg-gradient-to-b from-[#261408]/98 via-[#140a04]/98 to-[#0a0502]/98 border-t-2 border-x-2 border-amber-400/90 shadow-[0_-8px_24px_rgba(0,0,0,0.95),0_0_14px_rgba(245,158,11,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)] flex flex-col gap-2.5 items-center"';
if (script.includes(oldRightPedestal)) {
  script = script.replace(oldRightPedestal, newRightPedestal);
}

fs.writeFileSync(builderPath, script, "utf8");

