const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING MARE NOSTRUM II ENHANCEMENTS ===");

const filePath = path.join(__dirname, '../public/assets/index-V33.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Fix the double-comma in nm spoils header
if (code.includes('lootedDieData ?') || code.includes('lootedDieData?')) {
  const doubleCommaTarget = ' : null,,';
  if (code.includes(doubleCommaTarget)) {
    code = code.replace(doubleCommaTarget, ' : null,');
    console.log("Fixed double comma syntax in war spoils section.");
  }
}

// 2. Fix pure state updater side effects in CombatModal (nm)
// Replace setEnemyHp updaters that call setTurn/setEnemyAnim inside updater
const oldPattern1 = `setEnemyHp(prev => {          const next = Math.max(0, prev - val);          if (next <= 0) {            setEnemyAnim('death');            setTurn('victory');            spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24');          }          return next;        });`;

const newPattern1 = `setEnemyHp(prev => {          const next = Math.max(0, prev - val);          if (next <= 0) {            setTimeout(() => {              try { setEnemyAnim('death'); } catch(e){}              try { setTurn('victory'); } catch(e){}              try { spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24'); } catch(e){}            }, 0);          }          return next;        });`;

if (code.includes(oldPattern1)) {
  let count = 0;
  while (code.includes(oldPattern1)) {
    code = code.replace(oldPattern1, newPattern1);
    count++;
  }
  console.log(`Replaced ${count} occurrences of setEnemyHp direct victory triggers with deferred safe transitions.`);
}

// Also check variant with tickDmg
const oldPatternTick = `const next = Math.max(0, prev - tickDmg);          if (next <= 0) {            setEnemyAnim('death');            setTurn('victory');            spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24');`;
const newPatternTick = `const next = Math.max(0, prev - tickDmg);          if (next <= 0) {            setTimeout(() => {              try { setEnemyAnim('death'); } catch(e){}              try { setTurn('victory'); } catch(e){}              try { spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24'); } catch(e){}            }, 0);`;

if (code.includes(oldPatternTick)) {
  code = code.replace(oldPatternTick, newPatternTick);
  console.log("Replaced tickDmg setEnemyHp victory trigger.");
}

// Also check variant with finalDmg
const oldPatternFinalDmg = `setEnemyHp(prev => {            const next = Math.max(0, prev - finalDmg);            if (next <= 0) setTurn('victory');            return next;          });`;
const newPatternFinalDmg = `setEnemyHp(prev => {            const next = Math.max(0, prev - finalDmg);            if (next <= 0) { setTimeout(() => { try { setTurn('victory'); } catch(e){} }, 0); }            return next;          });`;

if (code.includes(oldPatternFinalDmg)) {
  code = code.replace(oldPatternFinalDmg, newPatternFinalDmg);
  console.log("Replaced finalDmg setEnemyHp victory trigger.");
}

// Also check variant with plain dmg
const oldPatternPlainDmg = `setEnemyHp(prev => {            const next = Math.max(0, prev - dmg);            if (next <= 0) setTurn('victory');            return next;          });`;
const newPatternPlainDmg = `setEnemyHp(prev => {            const next = Math.max(0, prev - dmg);            if (next <= 0) { setTimeout(() => { try { setTurn('victory'); } catch(e){} }, 0); }            return next;          });`;

if (code.includes(oldPatternPlainDmg)) {
  code = code.replace(oldPatternPlainDmg, newPatternPlainDmg);
  console.log("Replaced plain dmg setEnemyHp victory trigger.");
}

// Replace setPlayerHp defeat in updater
const oldPatternDefeat = `setPlayerHp(prev => {              const next = Math.max(0, prev - dmg);              if (next <= 0) setTurn('defeat');              return next;            });`;
const newPatternDefeat = `setPlayerHp(prev => {              const next = Math.max(0, prev - dmg);              if (next <= 0) { setTimeout(() => { try { setTurn('defeat'); } catch(e){} }, 0); }              return next;            });`;

if (code.includes(oldPatternDefeat)) {
  code = code.replace(oldPatternDefeat, newPatternDefeat);
  console.log("Replaced player defeat setPlayerHp trigger.");
}

// 3. Fix ErrorBoundary Mr: Auto-recover and suppress modal when combat is closed / inactive
const oldMrDef = `class Mr extends b.Component{constructor(){super(...arguments),this.state={hasError:!1,error:null,errorInfo:null},this.handleReload=()=>{this.props.onReset?(this.setState({hasError:!1,error:null,errorInfo:null}),this.props.onReset()):window.location.reload()},this.handleSoftRecover=()=>{this.setState({hasError:!1,error:null,errorInfo:null})}}static getDerivedStateFromError(s){return{hasError:!0,error:s,errorInfo:null}}componentDidCatch(s,a){console.error("ErrorBoundary caught an error:",s,a),this.setState({errorInfo:a})}render(){return this.state.hasError?e.jsx("div",{className:"fixed inset-0 z-[9999]`;

const newMrDef = `class Mr extends b.Component{constructor(){super(...arguments),this.state={hasError:!1,error:null,errorInfo:null},this.handleReload=()=>{this.setState({hasError:!1,error:null,errorInfo:null}),this.props.onReset?this.props.onReset():window.location.reload()},this.handleSoftRecover=()=>{this.setState({hasError:!1,error:null,errorInfo:null})}}static getDerivedStateFromError(s){return{hasError:!0,error:s,errorInfo:null}}componentDidCatch(s,a){console.warn("ErrorBoundary captured exception:",s,a),this.setState({errorInfo:a})}componentDidUpdate(prevProps){if(this.state.hasError&&(!this.props.hasActiveCombat||this.props.children===null||this.props.children===false)){this.setState({hasError:!1,error:null,errorInfo:null})}}render(){if(this.props.fallbackTitle==="COMBAT ACTION RECOVERED"&&!this.props.hasActiveCombat){return this.props.children||null;}return this.state.hasError?e.jsx("div",{className:"fixed inset-0 z-[9999]`;

if (code.includes(oldMrDef)) {
  code = code.replace(oldMrDef, newMrDef);
  console.log("Upgraded Mr ErrorBoundary with self-healing and inactive state suppression.");
} else {
  console.warn("Could not find exact oldMrDef match, checking partial match...");
}

// 4. Update combat modal invocation in App to supply hasActiveCombat and dynamic key
const oldCombatModalBoundary = `e.jsx(Mr,{fallbackTitle:"COMBAT ACTION RECOVERED",onReset:()=>Re(!1),children:e.jsx(Nt,{children:f&&e.jsx(om,{enemy:f,player:o,setPlayer:l,onClose:Re,isDetachment:!!(k||he||D?.startsWith("garrison_")||D?.startsWith("city_")),locationName:k?Bt.find(S=>S.id===k)?.name||k:he?Bt.find(S=>S.id===he)?.name:void 0},f.id)})},"combat_modal_boundary")`;

const newCombatModalBoundary = `e.jsx(Mr,{key:f?("combat_modal_"+f.id):"combat_modal_closed",hasActiveCombat:!!f,fallbackTitle:"COMBAT ACTION RECOVERED",onReset:()=>Re(!1),children:e.jsx(Nt,{children:f&&e.jsx(om,{enemy:f,player:o,setPlayer:l,onClose:Re,isDetachment:!!(k||he||D?.startsWith("garrison_")||D?.startsWith("city_")),locationName:k?Bt.find(S=>S.id===k)?.name||k:he?Bt.find(S=>S.id===he)?.name:void 0},f.id)})},"combat_modal_boundary")`;

if (code.includes(oldCombatModalBoundary)) {
  code = code.replace(oldCombatModalBoundary, newCombatModalBoundary);
  console.log("Updated App combat modal boundary with dynamic key and hasActiveCombat prop.");
} else {
  console.warn("Could not find oldCombatModalBoundary exact match.");
}

// 5. Clean up combat relic bar (id: "combat-relic-leather-tab")
const oldRelicBarStart = `e.jsxs("div", {            id: "combat-relic-leather-tab",            className: "absolute top-full left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 transition-all duration-150 select-none max-w-[96vw] overflow-x-auto custom-scrollbar",            style: {              background: "linear-gradient(180deg, #2a1408 0%, #160a03 100%)",              borderLeft: "1.5px solid #92400e",              borderRight: "1.5px solid #92400e",              borderBottom: "2px solid #d97706",              borderTop: "none",              borderBottomLeftRadius: "12px",              borderBottomRightRadius: "12px",              boxShadow: "0 6px 18px rgba(0,0,0,0.85), 0 0 14px rgba(217,119,6,0.4), inset 0 1px 0 rgba(245,158,11,0.25)",              transform: "translateX(-50%) translateY(0px)"            },`;

const newRelicBarStart = `e.jsxs("div", {            id: "combat-relic-leather-tab",            className: "pointer-events-auto flex items-center justify-center gap-2 px-3.5 py-1 rounded-full backdrop-blur-md transition-all duration-150 select-none max-w-[94vw] overflow-x-auto no-scrollbar mx-auto shadow-lg",            style: {              background: "linear-gradient(180deg, rgba(30,16,8,0.92) 0%, rgba(15,7,3,0.96) 100%)",              border: "1.5px solid rgba(217,119,6,0.75)",              boxShadow: "0 4px 20px rgba(0,0,0,0.7), 0 0 16px rgba(245,158,11,0.3), inset 0 1px 1px rgba(254,240,138,0.3)"            },`;

if (code.includes(oldRelicBarStart)) {
  code = code.replace(oldRelicBarStart, newRelicBarStart);
  console.log("Refined combat relic bar with elegant centered Sea Glass Roman styling.");
} else {
  console.warn("Could not find oldRelicBarStart exact match.");
}

// 6. Masterwork Artifact Redesigns in __masterworkSVGs
// art_gladius_hispaniensis
const targetGladius = `art_gladius_hispaniensis: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [`;
const nextGladiusEnd = code.indexOf(`art_curved_sica:`, code.indexOf("art_gladius_hispaniensis:", code.indexOf("__masterworkSVGs")));
if (nextGladiusEnd !== -1) {
  let gStart = code.lastIndexOf("art_gladius_hispaniensis:", nextGladiusEnd);
  let oldGBlock = code.substring(gStart, nextGladiusEnd);
  
  const newGBlock = `art_gladius_hispaniensis: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_gh_blade", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#e2e8f0" }),
        e.jsx("stop", { offset: "48%", stopColor: "#f8fafc" }),
        e.jsx("stop", { offset: "50%", stopColor: "#334155" }),
        e.jsx("stop", { offset: "52%", stopColor: "#94a3b8" }),
        e.jsx("stop", { offset: "100%", stopColor: "#1e293b" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_gh_gold", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "45%", stopColor: "#f59e0b" }),
        e.jsx("stop", { offset: "80%", stopColor: "#b45309" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_gh_grip", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#78350f" }),
        e.jsx("stop", { offset: "50%", stopColor: "#451a03" }),
        e.jsx("stop", { offset: "100%", stopColor: "#1c0a02" })
      ]}),
      e.jsxs("radialGradient", { id: "mw_gh_gem", cx: "35%", cy: "35%", r: "65%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fca5a5" }),
        e.jsx("stop", { offset: "40%", stopColor: "#dc2626" }),
        e.jsx("stop", { offset: "100%", stopColor: "#450a0a" })
      ]}),
      e.jsxs("radialGradient", { id: "mw_gh_glow", cx: "50%", cy: "50%", r: "50%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fbbf24", stopOpacity: "0.45" }),
        e.jsx("stop", { offset: "100%", stopColor: "#fbbf24", stopOpacity: "0" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "50", r: "46", fill: "url(#mw_gh_glow)", pointerEvents: "none" }),
    e.jsx("path", { d: "M 22,70 C 18,52 24,34 38,22 C 34,32 32,46 36,60 Z", fill: "url(#mw_gh_gold)", opacity: "0.55" }),
    e.jsx("path", { d: "M 78,70 C 82,52 76,34 62,22 C 66,32 68,46 64,60 Z", fill: "url(#mw_gh_gold)", opacity: "0.55" }),
    e.jsx("path", { d: "M 50,10 L 56,22 C 58,34 55,54 55,64 L 45,64 C 45,54 42,34 44,22 Z", fill: "url(#mw_gh_blade)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "50", y1: "12", x2: "50", y2: "62", stroke: "#0f172a", strokeWidth: "1.5" }),
    e.jsx("line", { x1: "49.2", y1: "13", x2: "49.2", y2: "59", stroke: "#ffffff", strokeWidth: "0.8", opacity: "0.9" }),
    e.jsx("ellipse", { cx: "50", cy: "65", rx: "15", ry: "4.5", fill: "url(#mw_gh_gold)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("ellipse", { cx: "50", cy: "64.5", rx: "11", ry: "2.5", fill: "#fef08a", opacity: "0.7" }),
    e.jsx("rect", { x: "47", y: "68", width: "6", height: "18", rx: "3", fill: "url(#mw_gh_grip)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("ellipse", { cx: "50", cy: "72", rx: "4.5", ry: "1.2", fill: "url(#mw_gh_gold)" }),
    e.jsx("ellipse", { cx: "50", cy: "77", rx: "4.5", ry: "1.2", fill: "url(#mw_gh_gold)" }),
    e.jsx("ellipse", { cx: "50", cy: "82", rx: "4.5", ry: "1.2", fill: "url(#mw_gh_gold)" }),
    e.jsx("circle", { cx: "50", cy: "89", r: "6.5", fill: "url(#mw_gh_gold)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "50", cy: "89", r: "3", fill: "url(#mw_gh_gem)", stroke: "#78350f", strokeWidth: "0.6" })
  ]}),  `;
  
  code = code.replace(oldGBlock, newGBlock);
  console.log("Installed Masterwork Gladius Hispaniensis illustration.");
}

// art_aegis_jupiter
const nextAegisEnd = code.indexOf(`art_apollo_quiver:`, code.indexOf("art_aegis_jupiter:", code.indexOf("__masterworkSVGs")));
if (nextAegisEnd !== -1) {
  let aStart = code.lastIndexOf("art_aegis_jupiter:", nextAegisEnd);
  let oldABlock = code.substring(aStart, nextAegisEnd);
  
  const newABlock = `art_aegis_jupiter: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("radialGradient", { id: "mw_aj_field", cx: "50%", cy: "50%", r: "50%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#3730a3" }),
        e.jsx("stop", { offset: "65%", stopColor: "#1e1b4b" }),
        e.jsx("stop", { offset: "100%", stopColor: "#0f0e26" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_aj_gold", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "40%", stopColor: "#f59e0b" }),
        e.jsx("stop", { offset: "80%", stopColor: "#b45309" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_aj_snake", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#86efac" }),
        e.jsx("stop", { offset: "50%", stopColor: "#15803d" }),
        e.jsx("stop", { offset: "100%", stopColor: "#052e16" })
      ]}),
      e.jsxs("radialGradient", { id: "mw_aj_eye", cx: "40%", cy: "40%", r: "60%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fca5a5" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ef4444" }),
        e.jsx("stop", { offset: "100%", stopColor: "#7f1d1d" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_aj_fulmen", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "40%", stopColor: "#fde047" }),
        e.jsx("stop", { offset: "100%", stopColor: "#eab308" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "50", r: "47", fill: "none", stroke: "url(#mw_aj_gold)", strokeWidth: "1", strokeDasharray: "2 2", opacity: "0.7" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "44", fill: "url(#mw_aj_field)", stroke: "url(#mw_aj_gold)", strokeWidth: "3.5" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "41.5", fill: "none", stroke: "#fef08a", strokeWidth: "0.75", opacity: "0.8" }),
    e.jsx("path", { d: "M 50,12 L 48,22 L 53,24 L 50,34 M 50,88 L 52,78 L 47,76 L 50,66", stroke: "url(#mw_aj_fulmen)", strokeWidth: "1.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 12,50 L 22,48 L 24,53 L 34,50 M 88,50 L 78,52 L 76,47 L 66,50", stroke: "url(#mw_aj_fulmen)", strokeWidth: "1.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 23,23 L 30,30 L 34,27 L 38,36 M 77,77 L 70,70 L 66,73 L 62,64", stroke: "url(#mw_aj_fulmen)", strokeWidth: "1.2", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 77,23 L 70,30 L 73,34 L 64,38 M 23,77 L 30,70 L 27,66 L 36,62", stroke: "url(#mw_aj_fulmen)", strokeWidth: "1.2", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "24", fill: "url(#mw_aj_gold)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 32,44 C 26,38 28,30 36,32 C 42,34 38,40 44,36 C 48,32 52,32 56,36 C 62,40 58,34 64,32 C 72,30 74,38 68,44", fill: "none", stroke: "url(#mw_aj_snake)", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 32,56 C 26,60 28,68 36,66 C 40,64 38,58 44,60 M 68,56 C 74,60 72,68 64,66 C 60,64 62,58 56,60", fill: "none", stroke: "url(#mw_aj_snake)", strokeWidth: "2.2", strokeLinecap: "round" }),
    e.jsx("circle", { cx: "27", cy: "33", r: "1.8", fill: "#86efac" }),
    e.jsx("circle", { cx: "73", cy: "33", r: "1.8", fill: "#86efac" }),
    e.jsx("path", { d: "M 38,42 C 38,36 62,36 62,42 C 62,55 58,62 50,62 C 42,62 38,55 38,42 Z", fill: "#fde047", stroke: "#78350f", strokeWidth: "1.2" }),
    e.jsx("ellipse", { cx: "44", cy: "46", rx: "3", ry: "2", fill: "url(#mw_aj_eye)", stroke: "#450a0a", strokeWidth: "0.6" }),
    e.jsx("ellipse", { cx: "56", cy: "46", rx: "3", ry: "2", fill: "url(#mw_aj_eye)", stroke: "#450a0a", strokeWidth: "0.6" }),
    e.jsx("circle", { cx: "44", cy: "46", r: "0.8", fill: "#ffffff" }),
    e.jsx("circle", { cx: "56", cy: "46", r: "0.8", fill: "#ffffff" }),
    e.jsx("path", { d: "M 49,47 L 50,51 L 51,47", stroke: "#78350f", strokeWidth: "0.8", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 44,55 Q 50,58 56,55", stroke: "#78350f", strokeWidth: "1.2", fill: "none" }),
    e.jsx("path", { d: "M 47,55 L 47,57 M 53,55 L 53,57", stroke: "#ffffff", strokeWidth: "0.8" })
  ]}),  `;
  
  code = code.replace(oldABlock, newABlock);
  console.log("Installed Masterwork Aegis of Jupiter (Medusa Gorgoneion) illustration.");
}

// art_lorica_segmentata
const nextLoricaEnd = code.indexOf(`art_lorica_plumata:`, code.indexOf("art_lorica_segmentata:", code.indexOf("__masterworkSVGs")));
if (nextLoricaEnd !== -1) {
  let lStart = code.lastIndexOf("art_lorica_segmentata:", nextLoricaEnd);
  let oldLBlock = code.substring(lStart, nextLoricaEnd);
  
  const newLBlock = `art_lorica_segmentata: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ls_iron", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#64748b" }),
        e.jsx("stop", { offset: "35%", stopColor: "#f1f5f9" }),
        e.jsx("stop", { offset: "50%", stopColor: "#cbd5e1" }),
        e.jsx("stop", { offset: "75%", stopColor: "#94a3b8" }),
        e.jsx("stop", { offset: "100%", stopColor: "#334155" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_ls_brass", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_ls_tunic", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#dc2626" }),
        e.jsx("stop", { offset: "50%", stopColor: "#991b1b" }),
        e.jsx("stop", { offset: "100%", stopColor: "#450a0a" })
      ]})
    ]}),
    e.jsx("path", { d: "M 20,24 Q 50,14 80,24 L 88,88 Q 50,94 12,88 Z", fill: "url(#mw_ls_tunic)", stroke: "#450a0a", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 20,84 L 20,92 M 30,85 L 30,94 M 40,86 L 40,95 M 50,86 L 50,95 M 60,86 L 60,95 M 70,85 L 70,94 M 80,84 L 80,92", stroke: "url(#mw_ls_brass)", strokeWidth: "3.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 22,48 C 36,44 64,44 78,48 L 76,56 C 64,52 36,52 24,56 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 23,54 C 36,50 64,50 77,54 L 75,62 C 64,58 36,58 25,62 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 24,60 C 36,56 64,56 76,60 L 74,68 C 64,64 36,64 26,68 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 25,66 C 36,62 64,62 75,66 L 73,74 C 64,70 36,70 27,74 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 26,72 C 36,68 64,68 74,72 L 72,80 C 64,76 36,76 28,80 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 28,26 C 40,20 60,20 72,26 L 76,46 C 62,42 38,42 24,46 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 16,28 C 14,36 16,46 26,44 C 28,34 26,26 22,24 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 84,28 C 86,36 84,46 74,44 C 72,34 74,26 78,24 Z", fill: "url(#mw_ls_iron)", stroke: "#1e293b", strokeWidth: "1" }),
    e.jsx("path", { d: "M 14,34 Q 22,28 32,30 M 86,34 Q 78,28 68,30", stroke: "url(#mw_ls_brass)", strokeWidth: "1.5" }),
    e.jsx("rect", { x: "47", y: "28", width: "6", height: "4", rx: "1", fill: "url(#mw_ls_brass)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("rect", { x: "47", y: "36", width: "6", height: "4", rx: "1", fill: "url(#mw_ls_brass)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("rect", { x: "47", y: "50", width: "6", height: "3.5", rx: "1", fill: "url(#mw_ls_brass)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("rect", { x: "47", y: "58", width: "6", height: "3.5", rx: "1", fill: "url(#mw_ls_brass)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("rect", { x: "47", y: "66", width: "6", height: "3.5", rx: "1", fill: "url(#mw_ls_brass)", stroke: "#451a03", strokeWidth: "0.6" }),
    e.jsx("line", { x1: "50", y1: "26", x2: "50", y2: "78", stroke: "#78350f", strokeWidth: "1.5" })
  ]}),  `;
  
  code = code.replace(oldLBlock, newLBlock);
  console.log("Installed Masterwork Lorica Segmentata armor illustration.");
}

// art_legion_roster
const rStart = code.indexOf("art_legion_roster:", code.indexOf("// 50. Laterculum of Trajan"));
if (rStart !== -1) {
  let rEnd = code.indexOf("\n};", rStart);
  if (rEnd === -1) rEnd = code.indexOf("};", rStart);
  let oldRBlock = code.substring(rStart, rEnd);
  
  const newRBlock = `art_legion_roster: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_lr_gold", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_lr_parch", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef9c3" }),
        e.jsx("stop", { offset: "60%", stopColor: "#fde68a" }),
        e.jsx("stop", { offset: "100%", stopColor: "#d97706" })
      ]}),
      e.jsxs("radialGradient", { id: "mw_lr_seal", cx: "35%", cy: "35%", r: "65%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#f87171" }),
        e.jsx("stop", { offset: "40%", stopColor: "#dc2626" }),
        e.jsx("stop", { offset: "100%", stopColor: "#450a0a" })
      ]})
    ]}),
    e.jsx("rect", { x: "22", y: "14", width: "56", height: "72", rx: "3", fill: "rgba(0,0,0,0.5)" }),
    e.jsx("rect", { x: "20", y: "12", width: "56", height: "72", rx: "3", fill: "url(#mw_lr_parch)", stroke: "#78350f", strokeWidth: "1.2" }),
    e.jsx("rect", { x: "23", y: "15", width: "50", height: "66", rx: "2", fill: "none", stroke: "#b45309", strokeWidth: "0.7", strokeDasharray: "3 1" }),
    e.jsx("rect", { x: "16", y: "10", width: "5", height: "76", rx: "1.5", fill: "url(#mw_lr_gold)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("circle", { cx: "18.5", cy: "9", r: "4", fill: "url(#mw_lr_gold)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("circle", { cx: "18.5", cy: "87", r: "4", fill: "url(#mw_lr_gold)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("rect", { x: "75", y: "10", width: "5", height: "76", rx: "1.5", fill: "url(#mw_lr_gold)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("circle", { cx: "77.5", cy: "9", r: "4", fill: "url(#mw_lr_gold)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("circle", { cx: "77.5", cy: "87", r: "4", fill: "url(#mw_lr_gold)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("path", { d: "M 48,20 L 46,26 L 50,24 L 54,26 L 52,20 Z M 44,23 L 38,28 L 44,27 Z M 56,23 L 62,28 L 56,27 Z", fill: "#78350f" }),
    e.jsx("text", { x: "48", y: "34", textAnchor: "middle", fill: "#78350f", fontFamily: "Cinzel, serif", fontWeight: "900", fontSize: "5", letterSpacing: "1", children: "LEGIO • I • TRAIANA" }),
    e.jsx("line", { x1: "28", y1: "39", x2: "68", y2: "39", stroke: "#78350f", strokeWidth: "1.2", strokeLinecap: "round", opacity: "0.85" }),
    e.jsx("line", { x1: "28", y1: "44", x2: "68", y2: "44", stroke: "#78350f", strokeWidth: "1.2", strokeLinecap: "round", opacity: "0.85" }),
    e.jsx("line", { x1: "28", y1: "49", x2: "62", y2: "49", stroke: "#78350f", strokeWidth: "1.2", strokeLinecap: "round", opacity: "0.85" }),
    e.jsx("line", { x1: "28", y1: "54", x2: "68", y2: "54", stroke: "#78350f", strokeWidth: "1.2", strokeLinecap: "round", opacity: "0.85" }),
    e.jsx("line", { x1: "28", y1: "59", x2: "56", y2: "59", stroke: "#78350f", strokeWidth: "1.2", strokeLinecap: "round", opacity: "0.85" }),
    e.jsx("path", { d: "M 44,68 L 38,82 L 43,80 L 45,82 Z", fill: "#991b1b" }),
    e.jsx("path", { d: "M 52,68 L 58,82 L 53,80 L 51,82 Z", fill: "#991b1b" }),
    e.jsx("circle", { cx: "48", cy: "68", r: "8", fill: "url(#mw_lr_seal)", stroke: "#7f1d1d", strokeWidth: "1" }),
    e.jsx("path", { d: "M 48,63 L 46,67 L 48,66 L 50,67 Z M 44,65 L 42,69 L 45,68 Z M 52,65 L 54,69 L 51,68 Z", fill: "#fef08a" })
  ]})`;
  
  code = code.replace(oldRBlock, newRBlock);
  console.log("Installed Masterwork Laterculum of Trajan (Imperial Scroll) illustration.");
}

// 7. Validate syntax before saving
try {
  esbuild.transformSync(code, { loader: "js" });
  console.log("ESBUILD VALIDATION SUCCEEDED: Code is 100% syntactically valid.");
  fs.writeFileSync(filePath, code, 'utf8');
  console.log("Master index-V33.js successfully patched!");
} catch(e) {
  console.error("ESBUILD VALIDATION FAILED! Aborting write.", e.message);
  process.exit(1);
}
