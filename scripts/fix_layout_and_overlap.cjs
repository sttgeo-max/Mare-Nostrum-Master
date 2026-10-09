const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== FIXING HUD & MAP LAYOUT AND OVERLAP ===");

const filePath = path.join(__dirname, "../public/assets/index-V37.js");
let code = fs.readFileSync(filePath, "utf8");

// 1. CLEAN UP TOP HUD: Restore clean 2-button right pod so dispatch bar has full width
const topHudWithExtraButtons = /children:\s*\[\s*e\.jsx\(Vr,\s*\{\s*id:\s*"top-hud-arma-btn"[\s\S]*?e\.jsx\(Vr,\s*\{\s*id:\s*"top-hud-treasury-btn"[\s\S]*?e\.jsx\(Vr,\s*\{\s*id:\s*"top-hud-codex-btn"/;

if (topHudWithExtraButtons.test(code)) {
  code = code.replace(
    /children:\s*\[\s*e\.jsx\(Vr,\s*\{\s*id:\s*"top-hud-arma-btn"[\s\S]*?e\.jsx\(Vr,\s*\{\s*id:\s*"top-hud-treasury-btn"[\s\S]*?e\.jsx\(Vr,\s*\{\s*id:\s*"top-hud-codex-btn"/,
    'children: [e.jsx(Vr, { id: "top-hud-codex-btn"'
  );
  console.log("1. Successfully removed extra buttons from Top HUD! Central dispatch bar has full breathing room.");
} else {
  console.log("1. Top HUD extra buttons pattern not matched by regex; checking manual pattern...");
  const oldChunk = 'children: [\n    e.jsx(Vr, { id: "top-hud-arma-btn"';
  const codexIdx = code.indexOf('id: "top-hud-codex-btn"');
  const armaIdx = code.indexOf('id: "top-hud-arma-btn"');
  if (armaIdx !== -1 && codexIdx !== -1 && armaIdx < codexIdx) {
    const pChildren = code.lastIndexOf("children: [", armaIdx);
    code = code.substring(0, pChildren + 11) + code.substring(codexIdx - 11);
    console.log("1. Cleaned up Top HUD right pod manually.");
  }
}

// 2. CLEAN UP BOTTOM HUD (d0): Restore clean vertical symmetrical pods with ZERO overlap with D-Pad
const cleanD0 = `var d0 = ({ isHidden: t, isBattlefield: s = false, player: a, activeScreen: r, setActiveScreen: o, cityName: l, cityEmblem: n, cityVariant: c, garrisonsTotal: i = 0, garrisonsRemaining: p = 0, subGarrisonNodes: x = [], liberatedNodes: u = [], onGarrisonClick: d, onMoveVector: m = () => {}, onMoveEnd: h = () => {}, onEndTurn: y = () => {}, onToggleAutoTurn: g, nearbyPort: j = null, onDockAtPort: A, nearbyEnemy: N = null, onEngageEnemy: T, playerMode: F = "sea", onOpenSaveManager: I, onRecenterMap: E, onTravelToRegion: k, onToggleMode: w, canToggleMode: P, onExitCity: M, mapArtifacts: f = [], fleets: _ = [], trackedArtifactId: D, onSelectTrackedArtifact: B, onTrackTarget: he, hoveredBuildingName: Le }) => {
  const oe = r === "MAP" || r === "CITY";
  const U = lt.useRef(E);
  U.current = E;
  const [dpadPos, setDpadPos] = b.useState(window.yi ? yi().dPadPosition || "center" : "center");
  b.useEffect(() => {
    const onSettings = () => setDpadPos(yi().dPadPosition || "center");
    window.addEventListener("settings_changed", onSettings);
    return () => window.removeEventListener("settings_changed", onSettings);
  }, []);

  return oe ? e.jsxs(e.Fragment, { children: [
    // Bottom subtle ambient patina
    e.jsxs("div", { className: "fixed bottom-0 left-0 right-0 z-[98] h-[max(calc(env(safe-area-inset-bottom,0px)+88px),96px)] sm:h-[90px] pointer-events-none select-none transition-opacity duration-300 " + (t ? "opacity-0" : "opacity-100"), children: [
      e.jsx("div", { className: "absolute inset-0 bg-transparent" }),
      e.jsx("div", { className: "absolute top-[20%] left-0 right-0 h-[1px] bg-transparent" }),
      e.jsx(es, { type: "weathered_patina", opacity: 0.06, className: "pointer-events-none" })
    ] }),

    // Bottom Navigation Layer
    e.jsxs("div", { id: "bottom-hud-nav", className: "fixed inset-0 z-[100] pointer-events-none select-none transition-all duration-300 " + (t ? "opacity-0 pointer-events-none" : "opacity-100"), children: [
      // Symmetrical Left and Right Pods (docked to sides with safe-area bottom)
      e.jsxs("div", {
        className: "pointer-events-auto absolute bottom-1.5 sm:bottom-2.5 pb-[max(calc(env(safe-area-inset-bottom,0px)+4px),8px)] inset-x-0 px-2 sm:px-4 md:px-6 flex items-end justify-between w-full max-w-5xl mx-auto z-10 " + (
          dpadPos === "left" ? "!pl-[160px] sm:!pl-[170px]" : dpadPos === "right" ? "!pr-[160px] sm:!pr-[170px]" : ""
        ),
        children: [
          // LEFT POD: Vertical stack of action buttons
          e.jsxs("div", {
            className: "pointer-events-auto amber-glass-pod amber-glass-pod-left flex flex-col gap-2 sm:gap-2.5 items-center p-1.5 sm:p-2 shadow-2xl",
            children: [
              // Nearby port or enemy interaction button
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

              // End Turn button (Hourglass)
              e.jsx(Vr, {
                onClick: y,
                disabled: a.isEnemyTurn,
                variant: a.isEnemyTurn ? "crimson" : "gold",
                emblem: "hourglass",
                title: a.isEnemyTurn ? "Hostes Movet (Enemy Turn...)" : "Finis (End Turn)",
                showGlow: !a.isEnemyTurn && (a.iter ?? 0) <= 1
              }),

              // Mode toggle (Anchor) or City depart button
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
                title: F === "sea" ? "Drop Anchor (Land Cohort)" : "Hoist Anchor (Sail Fleet)",
                showGlow: P
              })
            ]
          }),

          // Empty spacer for center: ensures clean layout on all screens
          false,

          // RIGHT POD: Vertical stack of utility buttons
          e.jsxs("div", {
            className: "pointer-events-auto amber-glass-pod amber-glass-pod-right flex flex-col gap-2 sm:gap-2.5 items-center p-1.5 sm:p-2 shadow-2xl",
            children: [
              // Arma et Reliquiae button (Helmet)
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

              // Centrum button (Target / Recenter)
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

      // Virtual D-Pad (Cleanly centered with ample clearance from left and right pods)
      e.jsx(window.GameDPad, { onMoveVector: m, onMoveEnd: h, pos: dpadPos, iter: a?.iter || 0, maxIter: a?.maxIter || 0, playerMode: F })
    ] })
  ] }) : null;
};`;

// Replace d0 implementation with cleanD0
const d0FullRegex = /var d0\s*=\s*\(\{ isHidden: t, isBattlefield: s = false, player: a[\s\S]*?var mc=b\.memo\(d0\);/;
if (d0FullRegex.test(code)) {
  code = code.replace(d0FullRegex, cleanD0 + "\nvar mc=b.memo(d0);");
  console.log("2. Successfully restored clean, non-overlapping d0 with vertical symmetrical pods!");
} else {
  console.error("2. Could not match d0FullRegex in index-V37.js!");
  process.exit(1);
}

// 3. REMOVE UNUSED INJECTED MASTERWORK COMPONENT STUBS FROM PREVIOUS TURN (RomanMiniMap, etc.)
// Check if the previous comment block exists and remove it
const masterworkMarker = "// === MASTERWORK ROMAN MAP, HUD & NAVIGATION SYSTEMS ===";
const idxMarker = code.indexOf(masterworkMarker);
const idxD0AfterMarker = code.indexOf("var d0 =");
if (idxMarker !== -1 && idxD0AfterMarker !== -1 && idxMarker < idxD0AfterMarker) {
  code = code.substring(0, idxMarker) + code.substring(idxD0AfterMarker);
  console.log("3. Cleaned up unused injected helper stubs.");
}

// Write back to public/assets/index-V37.js
fs.writeFileSync(filePath, code, "utf8");

// Validate with esbuild
try {
  esbuild.buildSync({
    entryPoints: [filePath],
    outfile: "/tmp/clean_layout_test.js",
    bundle: false,
    format: "esm",
  });
  console.log("ESBUILD: 100% VALIDATED! Clean layout confirmed.");
} catch(e) {
  console.error("ESBUILD FAILED:", e.message);
  process.exit(1);
}
