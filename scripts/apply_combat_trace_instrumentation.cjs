const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== APPLYING HIGH-PRECISION COMBAT CONCLUSION & RETURN-TO-MAP TRACING ENGINE ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. MASTER TRACE ENGINE INJECTION
const traceEngineCode = fs.readFileSync(path.join(__dirname, "combat_trace_engine.js"), "utf8");

if (!js.includes("MARE NOSTRUM II: COMBAT TRACE & RETURN-TO-MAP DIAGNOSTIC ENGINE")) {
  js = traceEngineCode + "\n" + js;
  
}

// 2. FIX ANIMATEPRESENCE & ERRORBOUNDARY NESTING FOR COMBAT & PORT MODALS
// ErrorBoundary (Mr) must wrap AnimatePresence (Nt) so that when f or P is null,
// AnimatePresence correctly unmounts the motion.div combat/port modal instead of hanging forever.

const oldCombatModalBoundary = 'e.jsx(Nt,{children:f&&e.jsx(Mr,{fallbackTitle:"COMBAT ACTION RECOVERED",onReset:()=>Re(!1),children:e.jsx(om,{enemy:f,player:o,setPlayer:l,onClose:Re,isDetachment:!!(k||he||D?.startsWith("garrison_")||D?.startsWith("city_")),locationName:k?Bt.find(S=>S.id===k)?.name||k:he?Bt.find(S=>S.id===he)?.name:void 0},f.id)},"combat_modal_boundary")})';
const newCombatModalBoundary = 'e.jsx(Mr,{fallbackTitle:"COMBAT ACTION RECOVERED",onReset:()=>Re(!1),children:e.jsx(Nt,{children:f&&e.jsx(om,{enemy:f,player:o,setPlayer:l,onClose:Re,isDetachment:!!(k||he||D?.startsWith("garrison_")||D?.startsWith("city_")),locationName:k?Bt.find(S=>S.id===k)?.name||k:he?Bt.find(S=>S.id===he)?.name:void 0},f.id)})},"combat_modal_boundary")';

if (js.includes(oldCombatModalBoundary)) {
  js = js.replace(oldCombatModalBoundary, newCombatModalBoundary);
  
}

const oldPortModalBoundary = 'e.jsx(Nt,{children:P&&e.jsx(Mr,{fallbackTitle:"PORT DOCKING RECOVERED",onReset:()=>M(null),children:e.jsx(dm,{port:P,player:o,setPlayer:l,fleets:x,onClose:()=>M(null),onRefit:Pe,onHireCrew:Me})},"port_modal_boundary")})';
const newPortModalBoundary = 'e.jsx(Mr,{fallbackTitle:"PORT DOCKING RECOVERED",onReset:()=>M(null),children:e.jsx(Nt,{children:P&&e.jsx(dm,{port:P,player:o,setPlayer:l,fleets:x,onClose:()=>M(null),onRefit:Pe,onHireCrew:Me})})},"port_modal_boundary")';

if (js.includes(oldPortModalBoundary)) {
  js = js.replace(oldPortModalBoundary, newPortModalBoundary);
  
}

// 3. INSTRUMENT COMBAT MODAL (nm) MOUNT & UNMOUNT
const oldNmStart = "nm=({enemy:t,player:s,setPlayer:a,onClose:r,isDetachment:o=!1,locationName:l})=>{";
const newNmStart = "nm=({enemy:t,player:s,setPlayer:a,onClose:r,isDetachment:o=!1,locationName:l})=>{\n  b.useEffect(()=>{\n    try {\n      window.__CombatTraceEngine?.startCombat(t);\n      window.__CombatTraceEngine?.setScreen(\"BATTLE\");\n      window.__CombatTraceEngine?.setCombatPhase(\"player\");\n      window.__CombatTraceEngine?.setTransitionPhase(\"COMBAT_ACTIVE\");\n    } catch(e){}\n    return () => {\n      try {\n        window.__CombatTraceEngine?.record(\"COMBAT_MODAL_COMPONENT_UNMOUNTED\", { enemyId: t?.id });\n      } catch(e){}\n    };\n  }, [t]);";

if (js.includes(oldNmStart)) {
  js = js.replace(oldNmStart, newNmStart);
  
}

// 4. INSTRUMENT FATAL DAMAGE & VICTORY / DEFEAT IN COMBAT
const oldSetTurnDeclaration = "const [turn, setTurn] = b.useState('player');";
const newSetTurnDeclaration = "const [turn, rawSetTurn] = b.useState('player');\n  const setTurn = b.useCallback((nextTurn) => {\n    try {\n      window.__CombatTraceEngine?.record(\"COMBAT_TURN_PHASE_CHANGED\", { from: turn, to: nextTurn });\n      if (nextTurn === 'victory') {\n        window.__CombatTraceEngine?.setCombatPhase(\"victory\");\n        window.__CombatTraceEngine?.setTransitionPhase(\"VICTORY_PENDING\");\n      } else if (nextTurn === 'defeat') {\n        window.__CombatTraceEngine?.setCombatPhase(\"defeat\");\n        window.__CombatTraceEngine?.setTransitionPhase(\"DEFEAT_PENDING\");\n      } else {\n        window.__CombatTraceEngine?.setCombatPhase(nextTurn);\n      }\n    } catch(e){}\n    rawSetTurn(nextTurn);\n  }, [turn]);";

if (js.includes(oldSetTurnDeclaration)) {
  js = js.replace(oldSetTurnDeclaration, newSetTurnDeclaration);
  
}

// 5. INSTRUMENT handleVictory & REWARDS COMMIT
const oldHandleVictory = "const handleVictory = () => {";
const newHandleVictory = "const handleVictory = () => {\n    try {\n      window.__CombatTraceEngine?.record(\"CLAIM_VICTORY_SPOILS_CLICKED\", {\n        solidi: victorySpoils.solidi,\n        fama: victorySpoils.fama,\n        supplies: victorySpoils.supplies,\n        hasArtifact: !!victorySpoils.droppedArtifact,\n        hasCard: !!victorySpoils.droppedCard\n      });\n      window.__CombatTraceEngine?.setTransitionPhase(\"CLOSING_COMBAT\");\n      window.__CombatTraceEngine?.armWatchdog(\"handleVictory\", 3000);\n    } catch(e){}";

if (js.includes(oldHandleVictory)) {
  js = js.replace(oldHandleVictory, newHandleVictory);
  
}

const oldHandleVictoryClose = 'try { r(!0); } catch(e) { console.error("Combat victory close error:", e); }';
const newHandleVictoryClose = 'try {\n      window.__CombatTraceEngine?.record("INVOKING_ONCLOSE_CALLBACK", { victory: true });\n      window.__CombatTraceEngine?.setResultCommitted(true);\n      r(!0);\n      window.__CombatTraceEngine?.record("ONCLOSE_CALLBACK_RETURNED", { victory: true });\n    } catch(e) {\n      window.__CombatTraceEngine?.record("ONCLOSE_CALLBACK_ERROR", { victory: true }, e);\n      console.error("Combat victory close error:", e);\n    }';

if (js.includes(oldHandleVictoryClose)) {
  js = js.replace(oldHandleVictoryClose, newHandleVictoryClose);
  
}

// 6. INSTRUMENT ROOT COMBAT EXIT (Re)
const posRe = js.indexOf("Re=S=>{");
if (posRe !== -1) {
  const oldReHeader = "Re=S=>{";
  const newReHeader = "Re=S=>{\n  try { window.__CombatTraceEngine?.record(\"ROOT_RE_ENTERED\", { victory: S, targetEnemyId: D||f?.id||(he?(\"port_\"+he):null), enemyId: f?.id, isDetachment: !!(k||he||D?.startsWith(\"garrison_\")||D?.startsWith(\"city_\")) }); window.__CombatTraceEngine?.setTransitionPhase(\"COMMITTING_ROOT_STATE\"); window.__CombatTraceEngine?.armWatchdog(\"Root_Re_Exit\", 3000); } catch(e){}";
  js = js.replace(oldReHeader, newReHeader);
  
}

const posFinally = js.indexOf("finally{\n    _(null);\n    B(null);\n    Le(null);");
if (posFinally !== -1) {
  const oldFin = "finally{\n    _(null);\n    B(null);\n    Le(null);";
  const newFin = "finally{\n    try { window.__CombatTraceEngine?.record(\"ROOT_RE_TEARDOWN_START\"); window.__CombatTraceEngine?.setTransitionPhase(\"TEARING_DOWN_COMBAT_MODAL\"); } catch(e){}\n    _(null);\n    B(null);\n    Le(null);\n    try { window.__CombatTraceEngine?.record(\"ROOT_RE_MODAL_STATE_NULLIFIED\"); } catch(e){}";
  js = js.replace(oldFin, newFin);
  
}

// 7. INSTRUMENT MAP CONTROLLER COMBAT-EXIT LISTENER & CAMERA RECENTER
const posMapExit = js.indexOf("const onCombatExit=()=>{");
if (posMapExit !== -1) {
  js = js.replace("const onCombatExit=()=>{", "const onCombatExit=()=>{\n    try {\n      window.__CombatTraceEngine?.record(\"MAP_CONTROLLER_COMBAT_EXIT_RECEIVED\", { playerPos: it.current?.position, isEnemyTurn: it.current?.isEnemyTurn });\n      window.__CombatTraceEngine?.setTransitionPhase(\"RESTORING_MAP\");\n      window.__CombatTraceEngine?.setScreen(\"MAP\");\n      window.__CombatTraceEngine?.setMapLoopActive(true);\n      requestAnimationFrame(()=>{\n        try {\n          window.__CombatTraceEngine?.record(\"FIRST_POST_COMBAT_MAP_FRAME_PAINTED\", { windowDim: { w: window.innerWidth, h: window.innerHeight } });\n          window.__CombatTraceEngine?.setTransitionPhase(\"MAP_READY\");\n          window.__CombatTraceEngine?.setCombatPhase(\"IDLE\");\n          window.__CombatTraceEngine?.record(\"MAP_INTERACTIONS_UNBLOCKED\");\n        } catch(e){}\n      });\n    } catch(e){}");
  
}

// 8. INSTRUMENT CITY CONTROLLER COMBAT-EXIT LISTENER (ax)
const oldCityOnCe = "b.useEffect(()=>{\n  const onCe=()=>{\n    le.current=!1;";
const newCityOnCe = "b.useEffect(()=>{\n  const onCe=()=>{\n    try {\n      window.__CombatTraceEngine?.record(\"CITY_CONTROLLER_COMBAT_EXIT_RECEIVED\", { cityId: t });\n      window.__CombatTraceEngine?.setTransitionPhase(\"MAP_READY\");\n      window.__CombatTraceEngine?.setCombatPhase(\"IDLE\");\n    } catch(e){}\n    le.current=!1;";

if (js.includes(oldCityOnCe)) {
  js = js.replace(oldCityOnCe, newCityOnCe);
  
}

// 9. INJECT ACCESSIBLE "TRACE" BUTTON INTO FLOATING MENU
const oldSaveBtnMarker = 'children: btnContent("gem", "Tabularium (Saves)", "")\n                })';
const newSaveBtnWithTrace = 'children: btnContent("gem", "Tabularium (Saves)", "")\n                }),\n                e.jsx("button", {\n                  type: "button",\n                  onClick: () => { try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){} a(); window.__CombatTraceEngine?.copyTrace(); },\n                  className: btnStyle + " hover:border-amber-400",\n                  children: btnContent("scroll", "Debug Trace Log", "Copy Diagnostic Log")\n                })';

if (js.includes(oldSaveBtnMarker)) {
  js = js.replace(oldSaveBtnMarker, newSaveBtnWithTrace);
}

console.log("Validating updated bundle with esbuild...");
try {
  esbuild.transformSync(js, { loader: "jsx" });
  console.log("OK: Syntax check clean. Final bundle size: " + js.length + " bytes.");
} catch (err) {
  console.error("[ERROR] ESBuild transform failed:", err);
  throw err;
}

fs.writeFileSync(bundlePath, js, "utf8");
console.log("SUCCESS: Written combat trace instrumentation to " + bundlePath);

const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
  console.log("SUCCESS: Synced combat trace instrumentation to " + distPath);
}
