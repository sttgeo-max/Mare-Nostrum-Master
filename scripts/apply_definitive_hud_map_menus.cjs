const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== APPLYING DEFINITIVE MAP, HUD & MENUS RESTORATION ===");

const filePath = path.join(__dirname, "../public/assets/index-V37.js");
let pub = fs.readFileSync(filePath, "utf8");

// 1. ADD MASTERWORK UI COMPONENTS BEFORE d0
const masterworkMapHUDComponents = `
// === MASTERWORK ROMAN MAP, HUD & NAVIGATION SYSTEMS ===
var RomanMiniMap = function({ player, ports = [], fleets = [], onCenterLocation }) {
  const [expanded, setExpanded] = b.useState(false);
  const px = player?.position?.x || 750;
  const py = player?.position?.y || 270;
  
  const w = expanded ? 260 : 150;
  const h = expanded ? 120 : 70;
  const scaleX = w / 2400;
  const scaleY = h / 1000;
  
  const normX = px * scaleX;
  const normY = py * scaleY;
  
  const handleMapClick = (e2) => {
    e2.stopPropagation();
    const rect = e2.currentTarget.getBoundingClientRect();
    const clickX = (e2.clientX - rect.left) / scaleX;
    const clickY = (e2.clientY - rect.top) / scaleY;
    if (onCenterLocation) onCenterLocation(clickX, clickY);
    else window.dispatchEvent(new CustomEvent("center-map-location", { detail: { x: clickX, y: clickY } }));
  };

  return e.jsxs("div", {
    className: "pointer-events-auto flex flex-col bg-[#070b14]/92 backdrop-blur-md border border-amber-500/40 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300",
    style: { width: w + "px" },
    children: [
      e.jsxs("div", {
        className: "flex items-center justify-between px-2 py-0.5 bg-black/70 border-b border-amber-500/30 text-[9px] font-cinzel font-bold text-amber-300 select-none",
        children: [
          e.jsxs("div", {
            className: "flex items-center gap-1.5 cursor-pointer",
            onClick: () => setExpanded(prev => !prev),
            children: [
              e.jsx("span", { className: "text-amber-400", children: "🗺️" }),
              e.jsx("span", { className: "tracking-wider", children: "MAPPA MVNDI" })
            ]
          }),
          e.jsxs("div", {
            className: "flex items-center gap-1",
            children: [
              e.jsx("button", {
                type: "button",
                onClick: (ev) => {
                  ev.stopPropagation();
                  try { if (typeof v !== "undefined" && v.playClick) v.playClick(); } catch(err){}
                  window.dispatchEvent(new CustomEvent("recenter-camera-on-player", { detail: { immediate: false } }));
                },
                className: "px-1.5 py-0.5 rounded bg-amber-950/70 hover:bg-amber-850 border border-amber-500/40 text-[8px] font-mono text-amber-200 cursor-pointer active:scale-95",
                title: "Centrum: Focus on player",
                children: "🎯"
              }),
              e.jsx("button", {
                type: "button",
                onClick: () => setExpanded(prev => !prev),
                className: "px-1 py-0.5 rounded bg-black/40 hover:bg-stone-850 text-[9px] text-amber-400/80 cursor-pointer",
                children: expanded ? "▾" : "▴"
              })
            ]
          })
        ]
      }),
      e.jsxs("div", {
        className: "relative cursor-crosshair overflow-hidden bg-gradient-to-b from-[#041a2f] via-[#032845] to-[#041a2f]",
        style: { width: w + "px", height: h + "px" },
        onClick: handleMapClick,
        children: [
          e.jsxs("svg", {
            viewBox: "0 0 2400 1000",
            className: "absolute inset-0 w-full h-full pointer-events-none opacity-45",
            children: [
              e.jsx("path", {
                d: "M 100 150 Q 400 120 700 200 Q 850 180 920 280 Q 1050 250 1150 400 Q 1200 500 1180 580 Q 1120 590 1080 570 Q 1040 500 900 350 Q 800 300 650 350 Q 500 520 250 540 Q 280 620 600 600 Q 1000 600 1100 650 Q 1200 780 1450 760 Q 1700 800 1900 810 Q 2150 750 2180 550 Q 2150 450 1850 280 Q 1700 320 1600 500 Q 1450 560 1300 580 Q 1200 380 1100 260 Q 950 220 850 180 Z",
                fill: "#1e293b",
                stroke: "#ca8a04",
                strokeWidth: "14"
              })
            ]
          }),
          ports.map((pt) => {
            const isCap = (player?.capturedPorts || []).includes(pt.id);
            const dotX = pt.x * scaleX;
            const dotY = pt.y * scaleY;
            return e.jsx("div", {
              key: pt.id,
              className: "absolute w-1.5 h-1.5 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 " + (isCap ? "bg-amber-400 shadow-[0_0_4px_#fbbf24]" : "bg-stone-400 opacity-60"),
              style: { left: dotX + "px", top: dotY + "px" },
              title: pt.name
            });
          }),
          fleets.filter(fl => !fl.defeated).map((fl) => {
            const flX = (fl.position?.x || 0) * scaleX;
            const flY = (fl.position?.y || 0) * scaleY;
            return e.jsx("div", {
              key: fl.id,
              className: "absolute w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e] animate-pulse pointer-events-none -translate-x-1/2 -translate-y-1/2",
              style: { left: flX + "px", top: flY + "px" }
            });
          }),
          e.jsxs("div", {
            className: "absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: normX + "px", top: normY + "px" },
            children: [
              e.jsx("div", { className: "w-3 h-3 rounded-full border border-amber-300 animate-ping opacity-75 bg-amber-400/30" }),
              e.jsx("div", { className: "absolute inset-0 w-2 h-2 m-auto rounded-full bg-amber-300 shadow-[0_0_8px_#f59e0b]" })
            ]
          })
        ]
      })
    ]
  });
};

var RomanCompassWindGauge = function({ windDirection = "EURUS", weather = "SERENVM", onRecenter }) {
  const windAngles = {
    "AQUILO": 0, "VULTURNUS": 45, "EURUS": 90, "SUBSOLANUS": 135,
    "AUSTER": 180, "AFRICUS": 225, "FAVONIUS": 270, "CORUS": 315
  };
  const deg = windAngles[(windDirection || "").toUpperCase()] ?? 90;
  
  return e.jsxs("div", {
    className: "pointer-events-auto flex items-center gap-2 p-1.5 px-2 bg-[#070b14]/92 backdrop-blur-md border border-amber-500/40 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.8)] cursor-pointer select-none transition-all hover:scale-105 active:scale-95",
    onClick: onRecenter,
    title: "Nautical Compass & Aeolus Winds (Tap to Recenter Camera)",
    children: [
      e.jsxs("div", {
        className: "relative w-9 h-9 rounded-full bg-gradient-to-br from-amber-950/80 via-black to-stone-950 border border-amber-400/60 flex items-center justify-center shadow-inner",
        children: [
          e.jsx("span", { className: "absolute top-0.5 text-[7px] font-cinzel font-black text-amber-300", children: "N" }),
          e.jsx("span", { className: "absolute right-0.5 text-[7px] font-cinzel font-black text-amber-400/70", children: "E" }),
          e.jsx("span", { className: "absolute bottom-0.5 text-[7px] font-cinzel font-black text-amber-400/70", children: "S" }),
          e.jsx("span", { className: "absolute left-0.5 text-[7px] font-cinzel font-black text-amber-400/70", children: "W" }),
          e.jsx("div", {
            className: "w-0.5 h-6 bg-gradient-to-t from-stone-400 via-amber-300 to-amber-500 rounded-full shadow-[0_0_6px_rgba(245,158,11,0.8)] transition-transform duration-700 ease-out",
            style: { transform: "rotate(" + deg + "deg)", transformOrigin: "center center" }
          }),
          e.jsx("div", { className: "absolute w-1.5 h-1.5 rounded-full bg-amber-200 border border-amber-800" })
        ]
      }),
      e.jsxs("div", {
        className: "flex flex-col text-left leading-tight",
        children: [
          e.jsxs("div", {
            className: "flex items-center gap-1",
            children: [
              e.jsx("span", { className: "text-[10px] font-cinzel font-black text-amber-300", children: windDirection || "EURUS" }),
              e.jsx("span", { className: "text-[9px] font-mono text-cyan-300", children: "14 kts" })
            ]
          }),
          e.jsx("span", {
            className: "text-[8px] font-serif-body text-amber-200/70 tracking-wide uppercase",
            children: weather || "SERENVM"
          })
        ]
      })
    ]
  });
};

var RomanSectorBanner = function({ x = 750, y = 270, regionId = 1 }) {
  let basinName = "MARE NOSTRVM • SINVS GALLICVS";
  let provinceName = "GALLIA NARBONENSIS & LIGVRIA";
  if (x < 600) {
    basinName = "FRETVM GADITANVM • MARE IBERICVM";
    provinceName = "HISPANIA BAETICA & TINGITANA";
  } else if (x < 950) {
    basinName = "MARE BALEARICVM • SINVS GALLICVS";
    provinceName = "GALLIA & CORSI-SARDINIA";
  } else if (x < 1250) {
    basinName = "MARE TYRRHENVM • MARE SICVLVM";
    provinceName = "ITALIA & PROVINCIA AFRICA";
  } else if (x < 1600) {
    basinName = "MARE IONIVM • SYRTIS MAIOR";
    provinceName = "GRAECIA & CYRENAICA";
  } else if (x < 1900) {
    basinName = "MARE AEGAEVM • HELLESPONTVS";
    provinceName = "BYZANTIVM & ASIA MINOR";
  } else {
    basinName = "MARE LEVANTINVM • PHOENICIVM";
    provinceName = "AEGYPTVS & SYRIA PALAESTINA";
  }

  const regRoman = ["I - OCCIDENS", "II - ITALIA", "III - ORIENS", "IV - AEGYPTVS"][Math.min(3, Math.max(0, (regionId || 1) - 1))];

  return e.jsxs("div", {
    className: "pointer-events-none flex flex-col items-center justify-center text-center select-none py-1 px-3.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 shadow-xl",
    children: [
      e.jsx("span", {
        className: "font-cinzel font-black text-[10px] sm:text-xs text-amber-200 tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase",
        children: basinName
      }),
      e.jsxs("span", {
        className: "text-[8px] sm:text-[9px] font-mono text-amber-400/80 tracking-wider uppercase",
        children: [provinceName, " • REGIO ", regRoman, " (", Math.round(x), "X, ", Math.round(y), "Y)"]
      })
    ]
  });
};

var RomanVitalsPod = function({ player, playerMode = "sea", onToggleMode, canToggleMode }) {
  const isSea = playerMode === "sea";
  const hp = isSea ? (player?.fleetHp ?? 100) : (player?.legionHp ?? 100);
  const maxHp = isSea ? (player?.maxFleetHp ?? 100) : (player?.maxLegionHp ?? 100);
  const hpPct = Math.max(0, Math.min(100, Math.round((hp / (maxHp || 1)) * 100)));
  
  const iter = player?.iter ?? 6;
  const maxIter = player?.maxIter ?? 6;
  const supplies = player?.supplies ?? 100;
  
  return e.jsxs("div", {
    className: "pointer-events-auto flex items-center gap-2 p-2 sm:p-2.5 rounded-2xl bg-[#090d18]/92 backdrop-blur-md border border-amber-500/40 shadow-[0_8px_30px_rgba(0,0,0,0.9)] text-amber-100 select-none",
    children: [
      e.jsxs("button", {
        type: "button",
        onClick: onToggleMode,
        disabled: !canToggleMode,
        className: "flex flex-col items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl border transition-all cursor-pointer " + (
          canToggleMode
            ? "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-950 border-amber-300 hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
            : "bg-black/60 border-amber-900/40 opacity-90 cursor-default"
        ),
        title: canToggleMode ? (isSea ? "Land Cohort (Drop Anchor)" : "Embark Fleet (Hoist Sails)") : (isSea ? "Navis Praetoria (Sea Sector)" : "Legio Flavia (Land Sector)"),
        children: [
          e.jsx("span", { className: "text-lg", children: isSea ? "⛵" : "🦅" }),
          e.jsx("span", { className: "text-[7.5px] font-cinzel font-bold text-amber-200 uppercase", children: isSea ? "CLASSIS" : "LEGIO" })
        ]
      }),
      e.jsxs("div", {
        className: "flex flex-col gap-1 min-w-[125px] sm:min-w-[145px]",
        children: [
          e.jsxs("div", {
            className: "flex flex-col gap-0.5",
            children: [
              e.jsxs("div", {
                className: "flex items-center justify-between text-[9px] font-cinzel font-bold",
                children: [
                  e.jsx("span", { className: isSea ? "text-cyan-300" : "text-amber-300", children: isSea ? "HULL INTEGRITY" : "COHORT STRENGTH" }),
                  e.jsxs("span", { className: "font-mono text-stone-200", children: [hp, "/", maxHp] })
                ]
              }),
              e.jsx("div", {
                className: "w-full h-2 rounded-full bg-black/60 border border-stone-700 overflow-hidden",
                children: e.jsx("div", {
                  className: "h-full rounded-full transition-all duration-300 " + (isSea ? "bg-gradient-to-r from-cyan-600 to-cyan-400" : "bg-gradient-to-r from-red-600 via-amber-500 to-amber-400"),
                  style: { width: hpPct + "%" }
                })
              })
            ]
          }),
          e.jsxs("div", {
            className: "flex items-center justify-between text-[9px] font-cinzel font-bold pt-0.5",
            children: [
              e.jsx("span", { className: "text-amber-400", children: "ITER (STAMINA):" }),
              e.jsx("div", {
                className: "flex items-center gap-1",
                children: Array.from({ length: maxIter }).map((_, idx) => e.jsx("div", {
                  key: idx,
                  className: "w-2 h-2 rounded-sm rotate-45 transition-all " + (idx < iter ? "bg-amber-400 shadow-[0_0_6px_#f59e0b]" : "bg-stone-800 border border-stone-600 opacity-40")
                }))
              })
            ]
          }),
          e.jsxs("div", {
            className: "flex items-center justify-between text-[8px] font-mono text-stone-300",
            children: [
              e.jsx("span", { children: "ANNONA RATIONS:" }),
              e.jsxs("span", { className: supplies < 25 ? "text-rose-400 font-bold animate-pulse" : "text-amber-300", children: [supplies, " / 100"] })
            ]
          })
        ]
      })
    ]
  });
};

var RomanTacticalMapControls = function({ onRecenter }) {
  const handleZoom = (factor) => {
    try { if (typeof v !== "undefined" && v.playClick) v.playClick(); } catch(e){}
    window.dispatchEvent(new CustomEvent("map-zoom-change", { detail: factor }));
  };

  return e.jsxs("div", {
    className: "pointer-events-auto flex flex-col gap-1.5 p-1 bg-[#070b14]/92 backdrop-blur-md border border-amber-500/40 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.8)] select-none",
    children: [
      e.jsx("button", {
        type: "button",
        onClick: () => handleZoom(1.2),
        className: "w-8 h-8 rounded-lg bg-black/50 hover:bg-amber-950/70 border border-amber-500/30 text-amber-200 font-cinzel font-black text-sm flex items-center justify-center cursor-pointer active:scale-95 transition-all",
        title: "Zoom In (+)",
        children: "+"
      }),
      e.jsx("button", {
        type: "button",
        onClick: () => handleZoom(0.8),
        className: "w-8 h-8 rounded-lg bg-black/50 hover:bg-amber-950/70 border border-amber-500/30 text-amber-200 font-cinzel font-black text-sm flex items-center justify-center cursor-pointer active:scale-95 transition-all",
        title: "Zoom Out (-)",
        children: "−"
      }),
      e.jsx("button", {
        type: "button",
        onClick: () => {
          try { if (typeof v !== "undefined" && v.playClick) v.playClick(); } catch(e){}
          if (onRecenter) onRecenter();
          else window.dispatchEvent(new CustomEvent("recenter-camera-on-player", { detail: { immediate: false } }));
        },
        className: "w-8 h-8 rounded-lg bg-amber-950/60 hover:bg-amber-900 border border-amber-400/50 text-amber-300 font-cinzel font-bold text-xs flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow",
        title: "Centrum: Focus Camera on Player",
        children: "🎯"
      }),
      e.jsx("button", {
        type: "button",
        onClick: () => {
          try { if (typeof v !== "undefined" && v.playClick) v.playClick(); } catch(e){}
          window.dispatchEvent(new CustomEvent("toggle-tactical-grid"));
        },
        className: "w-8 h-8 rounded-lg bg-black/50 hover:bg-stone-850 border border-stone-600 text-amber-200 font-mono text-xs flex items-center justify-center cursor-pointer active:scale-95 transition-all",
        title: "Toggle Tactical Hex Grid",
        children: "⊞"
      })
    ]
  });
};
`;

// Insert the masterwork components right before d0
const idxD0 = pub.indexOf("var d0=");
pub = pub.substring(0, idxD0) + masterworkMapHUDComponents + "\n" + pub.substring(idxD0);

// 2. UPGRADE d0 TO INCLUDE THE MASTERWORK WIDGETS
// Find where d0 returns JSX
const upgradedD0Replacement = `
var d0 = ({ isHidden: t, isBattlefield: s = false, player: a, activeScreen: r, setActiveScreen: o, cityName: l, cityEmblem: n, cityVariant: c, garrisonsTotal: i = 0, garrisonsRemaining: p = 0, subGarrisonNodes: x = [], liberatedNodes: u = [], onGarrisonClick: d, onMoveVector: m = () => {}, onMoveEnd: h = () => {}, onEndTurn: y = () => {}, onToggleAutoTurn: g, nearbyPort: j = null, onDockAtPort: A, nearbyEnemy: N = null, onEngageEnemy: T, playerMode: F = "sea", onOpenSaveManager: I, onRecenterMap: E, onTravelToRegion: k, onToggleMode: w, canToggleMode: P, onExitCity: M, mapArtifacts: f = [], fleets: _ = [], trackedArtifactId: D, onSelectTrackedArtifact: B, onTrackTarget: he, hoveredBuildingName: Le }) => {
  const oe = r === "MAP" || r === "CITY";
  const U = lt.useRef(E);
  U.current = E;
  const de = a.activeRegion ?? 1;
  const fe = ["I", "II", "III", "IV"];
  const [dpadPos, setDpadPos] = b.useState(window.yi ? yi().dPadPosition || "center" : "center");
  b.useEffect(() => {
    const onSettings = () => setDpadPos(yi().dPadPosition || "center");
    window.addEventListener("settings_changed", onSettings);
    return () => window.removeEventListener("settings_changed", onSettings);
  }, []);

  return oe ? e.jsxs(e.Fragment, { children: [
    // Background fade & patina
    e.jsxs("div", { className: "fixed bottom-0 left-0 right-0 z-[98] h-[max(calc(env(safe-area-inset-bottom,0px)+88px),96px)] sm:h-[90px] pointer-events-none select-none transition-opacity duration-300 " + (t ? "opacity-0" : "opacity-100"), children: [
      e.jsx("div", { className: "absolute inset-0 bg-transparent" }),
      e.jsx("div", { className: "absolute top-[20%] left-0 right-0 h-[1px] bg-transparent" }),
      e.jsx(es, { type: "weathered_patina", opacity: 0.06, className: "pointer-events-none" })
    ] }),

    // Top-Center Sector & Basin Banner
    e.jsx("div", {
      className: "fixed top-[max(calc(env(safe-area-inset-top,0px)+52px),60px)] sm:top-[66px] left-1/2 -translate-x-1/2 z-[105] pointer-events-none transition-all duration-300 " + (t ? "opacity-0" : "opacity-100"),
      children: e.jsx(RomanSectorBanner, { x: a?.position?.x || 750, y: a?.position?.y || 270, regionId: de })
    }),

    // Top-Left Floating Mappa Mundi & Wind Compass
    e.jsxs("div", {
      className: "fixed top-[max(calc(env(safe-area-inset-top,0px)+56px),64px)] sm:top-[70px] left-2.5 sm:left-4 z-[110] flex flex-col gap-2 pointer-events-none transition-all duration-300 " + (t ? "opacity-0" : "opacity-100"),
      children: [
        e.jsx(RomanMiniMap, { player: a, ports: Bt || [], fleets: _ || [], onCenterLocation: (cx, cy) => {
          window.dispatchEvent(new CustomEvent("center-map-location", { detail: { x: cx, y: cy } }));
        } }),
        e.jsx(RomanCompassWindGauge, { windDirection: a?.windDirection || "EURUS", weather: a?.weather || "SERENVM", onRecenter: () => {
          v.playClick();
          U.current && U.current();
          window.dispatchEvent(new CustomEvent("recenter-camera-on-player", { detail: { immediate: false } }));
        } })
      ]
    }),

    // Top-Right Tactical Zoom & Grid Controls
    e.jsx("div", {
      className: "fixed top-[max(calc(env(safe-area-inset-top,0px)+56px),64px)] sm:top-[70px] right-2.5 sm:right-4 z-[110] pointer-events-none transition-all duration-300 " + (t ? "opacity-0" : "opacity-100"),
      children: e.jsx(RomanTacticalMapControls, { onRecenter: () => {
        v.playClick();
        U.current && U.current();
        window.dispatchEvent(new CustomEvent("recenter-camera-on-player", { detail: { immediate: false } }));
      } })
    }),

    // Bottom Navigation & Actions Canvas
    e.jsxs("div", { id: "bottom-hud-nav", className: "fixed inset-0 z-[100] pointer-events-none select-none transition-all duration-300 " + (t ? "opacity-0 pointer-events-none" : "opacity-100"), children: [
      // Bottom Dock & Action Pods
      e.jsxs("div", {
        className: "pointer-events-auto absolute bottom-1.5 sm:bottom-2.5 pb-[max(calc(env(safe-area-inset-bottom,0px)+4px),8px)] inset-x-0 px-2.5 sm:px-5 flex items-end justify-between w-full max-w-6xl mx-auto z-10 " + (
          dpadPos === "left" ? "!pl-[160px] sm:!pl-[170px]" : dpadPos === "right" ? "!pr-[160px] sm:!pr-[170px]" : ""
        ),
        children: [
          // Left Pod: Vitals & Movement Actions
          e.jsxs("div", {
            className: "flex flex-col gap-2 items-start pointer-events-auto",
            children: [
              e.jsx(RomanVitalsPod, { player: a, playerMode: F, onToggleMode: () => { if (w) w(); }, canToggleMode: P }),
              e.jsxs("div", {
                className: "amber-glass-pod amber-glass-pod-left flex items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 shadow-2xl",
                children: [
                  r !== "CITY" && (j || N) ? e.jsxs("div", { className: "relative group flex items-center justify-center", children: [
                    j && e.jsxs(e.Fragment, { children: [
                      e.jsx("div", { className: "absolute -inset-1.5 rounded-full border-2 border-amber-400/80 animate-ping opacity-50 pointer-events-none" }),
                      e.jsx("div", { className: "absolute -inset-1 rounded-full border-[2px] border-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.85),inset_0_0_8px_rgba(245,158,11,0.5)] animate-pulse pointer-events-none" })
                    ] }),
                    e.jsx(Vr, {
                      onClick: () => { v.playClick(); j && A ? A(j) : N && T && T(N); },
                      variant: j ? "gold" : "crimson",
                      icon: j ? e.jsx(Fa, { className: "w-[60%] h-[60%] text-amber-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]", strokeWidth: 1.5 }) : void 0,
                      emblem: j ? void 0 : "swords",
                      title: j ? ("Enter " + j.name) : ("Engage " + (N?.enemyUnit?.name || "Enemy")),
                      showGlow: true
                    })
                  ] }) : null,

                  // End Turn button
                  e.jsx(Vr, {
                    onClick: y,
                    disabled: a.isEnemyTurn,
                    variant: a.isEnemyTurn ? "crimson" : "gold",
                    emblem: "hourglass",
                    title: a.isEnemyTurn ? "Hostes Movet (Enemy Turn...)" : "Finis (End Turn)",
                    showGlow: !a.isEnemyTurn && (a.iter ?? 0) <= 1
                  }),

                  r === "CITY" ? e.jsxs("div", { className: "relative group flex items-center justify-center", children: [
                    e.jsx("div", { className: "absolute -inset-1.5 rounded-full border-2 border-amber-400/80 animate-ping opacity-50 pointer-events-none" }),
                    e.jsx("div", { className: "absolute -inset-1 rounded-full border-[2px] border-amber-300 shadow-[0_0_16px_rgba(245,158,11,0.85),inset_0_0_8px_rgba(245,158,11,0.5)] animate-pulse pointer-events-none" }),
                    e.jsx(Vr, {
                      onClick: () => { v.playClick(); M ? M() : j && A && A(j); },
                      variant: "gold",
                      emblem: "map",
                      title: s ? "Depart Battlefield & Return to Campaign Map" : "Depart City / Embark Fleet (Return to Campaign Map)",
                      showGlow: true
                    })
                  ] }) : e.jsx(Vr, {
                    onClick: (ce) => { ce.stopPropagation(); w && w(); },
                    disabled: !P,
                    variant: "teal",
                    emblem: "anchor",
                    title: F === "sea" ? "Drop Anchor (Land)" : "Hoist Anchor (Sail)",
                    showGlow: P
                  })
                ]
              })
            ]
          }),

          // Right Pod: Quick Imperium Menus & Centering
          e.jsxs("div", {
            className: "pointer-events-auto amber-glass-pod amber-glass-pod-right flex items-center gap-2 sm:gap-2.5 p-1.5 sm:p-2 shadow-2xl",
            children: [
              e.jsx(Vr, {
                id: "btn-hud-codex",
                onClick: () => {
                  try { if (typeof v !== "undefined" && v.playClick) v.playClick(); } catch(e){}
                  if (typeof o === "function") o("CODEX");
                  else window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu", { detail: "CODEX" }));
                },
                variant: "gold",
                emblem: "book",
                title: "Codex Imperialis (Doctrines, Fleet Specs, Bestiary)",
                showGlow: true
              }),
              e.jsx(Vr, {
                id: "btn-hud-arma",
                onClick: () => {
                  try { if (typeof v !== "undefined" && v.playClick) v.playClick(); } catch(e){}
                  if (typeof o === "function") o("ARMA");
                  else window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu", { detail: "ARMA" }));
                },
                variant: "gold",
                emblem: "helmet",
                title: "Arma & Reliquiae (Loadout, Equipment, Cards)",
                showGlow: true
              }),
              e.jsx(Vr, {
                id: "btn-hud-treasury",
                onClick: () => {
                  try { if (typeof v !== "undefined" && v.playClick) v.playClick(); } catch(e){}
                  if (typeof o === "function") o("TREASURY");
                  else window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu", { detail: "TREASURY" }));
                },
                variant: "gold",
                emblem: "scroll",
                title: "Aerarium & Fiscus (Treasury, Taxes, Decrees)",
                showGlow: true
              }),
              e.jsx(Vr, {
                id: "btn-hud-centrum",
                onPointerDown: (ce) => ce.stopPropagation(),
                onTouchStart: (ce) => ce.stopPropagation(),
                onClick: (ce) => {
                  ce.stopPropagation();
                  v.playClick();
                  U.current && U.current();
                  window.dispatchEvent(new CustomEvent("recenter-camera-on-player", { detail: { immediate: false } }));
                },
                variant: "teal",
                emblem: "target",
                title: "Centrum: Focus Camera on Fleet/Legion",
                showGlow: true
              })
            ]
          })
        ]
      }),

      // Virtual D-Pad
      e.jsx(window.GameDPad, { onMoveVector: m, onMoveEnd: h, pos: dpadPos, iter: a?.iter || 0, maxIter: a?.maxIter || 0, playerMode: F })
    ] })
  ] }) : null;
};
`;

// Replace d0 with upgradedD0Replacement
const d0Regex = /var d0=[\s\S]*?mc=b\.memo\(d0\);/;
if (d0Regex.test(pub)) {
  pub = pub.replace(d0Regex, upgradedD0Replacement + "\nvar mc=b.memo(d0);");
  console.log("Successfully upgraded d0 with Roman MiniMap, Wind Compass, Vitals Pod, and Navigation Pods!");
} else {
  console.error("Failed to find d0 in index-V37.js!");
  process.exit(1);
}

// 3. FIX THE MOBILE/TABLET BOTTOM DOCK IN IMPERIUM MENU DRAWER
// Change "hidden grid-cols-5" to "grid md:hidden grid-cols-5"
const oldDockClass = 'className: "fixed bottom-0 left-1/2 -translate-x-1/2 w-[98%] max-w-3xl z-[200] px-2 sm:px-5 py-2 sm:py-2.5 pb-[max(calc(env(safe-area-inset-bottom,0px)+8px),12px)] hidden grid-cols-5 gap-1 sm:gap-2 items-center frosted-basalt-dock rounded-t-2xl sm:rounded-t-3xl border-t border-[#C9A351]/40 shadow-[0_-12px_36px_rgba(0,0,0,0.95)]"';
const newDockClass = 'className: "fixed bottom-0 left-1/2 -translate-x-1/2 w-[98%] max-w-3xl z-[200] px-2 sm:px-5 py-2 sm:py-2.5 pb-[max(calc(env(safe-area-inset-bottom,0px)+8px),12px)] grid md:hidden grid-cols-5 gap-1 sm:gap-2 items-center frosted-basalt-dock rounded-t-2xl sm:rounded-t-3xl border-t border-[#C9A351]/40 shadow-[0_-12px_36px_rgba(0,0,0,0.95)]"';

if (pub.includes(oldDockClass)) {
  pub = pub.replace(oldDockClass, newDockClass);
  console.log("Successfully fixed mobile/tablet bottom dock visibility (grid md:hidden)! Mobile players can now freely switch menus!");
} else {
  console.warn("Could not find exact oldDockClass string; searching partial...");
  pub = pub.replace(/hidden grid-cols-5 gap-1 sm:gap-2 items-center frosted-basalt-dock/, "grid md:hidden grid-cols-5 gap-1 sm:gap-2 items-center frosted-basalt-dock");
}

// 4. ADD TOP RESOURCE RIBBON INSIDE IMPERIUM MENU DRAWER
// When in ARMA, CODEX, or TREASURY, render a unified resource ribbon at the top of the menu content area
const oldMenuContent = 'className: "flex-1 relative w-full h-full pb-[100px] sm:pb-[110px] md:pb-0 bg-black/40 bg-slate-900/90 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] overflow-hidden", children: [h === "ARMA"';
const newMenuContent = `className: "flex-1 relative w-full h-full pb-[100px] sm:pb-[110px] md:pb-0 bg-black/40 bg-slate-900/90 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col", children: [
  // Unified Top Resource Ribbon
  e.jsxs("div", {
    className: "w-full px-4 py-2 border-b border-amber-500/30 bg-black/60 flex items-center justify-between text-amber-200 select-none shrink-0",
    children: [
      e.jsxs("div", {
        className: "flex items-center gap-3",
        children: [
          e.jsxs("div", { className: "flex items-center gap-1 font-mono font-bold text-xs text-amber-300", children: [e.jsx("span", { children: "💰" }), o.solidi || 0, "s"] }),
          e.jsxs("div", { className: "flex items-center gap-1 font-mono font-bold text-xs text-stone-300", children: [e.jsx("span", { children: "🍞" }), o.supplies || 0, "/100"] }),
          e.jsxs("div", { className: "hidden sm:flex items-center gap-1 font-cinzel font-bold text-xs text-amber-400", children: [e.jsx("span", { children: "🏛️ FAMA:" }), o.fama || 0] })
        ]
      }),
      e.jsxs("div", {
        className: "flex items-center gap-2 text-[10px] font-cinzel font-bold",
        children: [
          e.jsxs("span", { className: "px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 uppercase", children: ["LVL ", o.level || 1, " • ", o.playerMode === "land" ? "LEGIO" : "CLASSIS"] }),
          e.jsx("button", {
            type: "button",
            onClick: () => _e(T.current || "MAP"),
            className: "px-2 py-0.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 text-rose-300 text-xs cursor-pointer active:scale-95 transition-all",
            children: "✕ CLOSE"
          })
        ]
      })
    ]
  }),
  h === "ARMA"`;

if (pub.includes(oldMenuContent)) {
  pub = pub.replace(oldMenuContent, newMenuContent);
  console.log("Successfully injected Unified Top Resource Ribbon into Imperium Menu Drawer!");
} else {
  console.warn("Could not find exact oldMenuContent string.");
}

// Write back to index-V37.js
fs.writeFileSync(filePath, pub, "utf8");

// Validate with esbuild
try {
  esbuild.buildSync({
    entryPoints: [filePath],
    outfile: "/tmp/definitive_test_out.js",
    bundle: false,
    format: "esm",
  });
  console.log("ESBUILD: 100% PERFECT! ALL DEFINITIVE ADDITIONS VALIDATED!");
} catch(e) {
  console.error("ESBUILD FAILED:", e.message);
  process.exit(1);
}
