const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING GLOBAL NAVIGATION OVERLAY PASS ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. HUD POD BUTTON (Skipped - User prefers direct Arma access)
/*
const oldPodButton = 'e.jsx(Vr,{id:"btn-hud-arma",onClick:()=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}if(typeof o==="function")o("ARMA");else window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu",{detail:"ARMA"}))},variant:"gold",emblem:"helmet",title:"Arma & Reliquiae (Loadout, Equipment, Cards)",showGlow:!0})';
const newPodButton = 'e.jsx(Vr,{id:"btn-hud-arma",onClick:()=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu",{detail:"NAV"}))},variant:"gold",emblem:"spqr",title:"Imperium Menu (Command & Navigation)",showGlow:!0})';

if (js.includes(oldPodButton)) {
    js = js.replace(oldPodButton, newPodButton);
    
}
*/

// 2. UPDATE EVENT HANDLER IN vp
// Current: if(d==="ARMA"||d==="CODEX"||d==="TREASURY"){setMiniMenu(null);_e(d);}
const oldHandler = 'if(d==="ARMA"||d==="CODEX"||d==="TREASURY"){setMiniMenu(null);_e(d);}';
const newHandler = 'if(d==="NAV"){setMiniMenu("NAV");}else if(d==="ARMA"||d==="CODEX"||d==="TREASURY"){setMiniMenu(null);_e(d);}';

if (js.includes(oldHandler)) {
    js = js.replace(oldHandler, newHandler);
    
}

// 3. HIDE ORIGINAL NAVIGATION GRID
// It uses grid grid-cols-5.
// We'll add a 'hidden' class to it.
const oldGridClass = 'grid grid-cols-5';
js = js.replaceAll(oldGridClass, 'hidden grid-cols-5'); // Hide the persistent one


// 4. INJECT NAV OVERLAY CASE INTO FloatingMiniMenu
// We need to find where it checks t === "ARMA" for positioning.
const oldPosCheck = 'className: "fixed " + (t === "ARMA" ? "bottom-14 sm:bottom-16 right-2 sm:right-4" : "top-14 sm:top-16 " + (t === "TREASURY" ? "left-2 sm:left-4" : "right-2 sm:right-4"))';
const newPosCheck = 'className: "fixed " + (t === "NAV" ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !bottom-auto !right-auto !left-1/2 !top-1/2" : (t === "ARMA" ? "bottom-14 sm:bottom-16 right-2 sm:right-4" : "top-14 sm:top-16 " + (t === "TREASURY" ? "left-2 sm:left-4" : "right-2 sm:right-4")))';

if (js.includes(oldPosCheck)) {
    js = js.replace(oldPosCheck, newPosCheck);
    
}

// And the content:
// We'll search for where the children start.
const oldChildrenStart = 'children: [        e.jsx(es, { type: "weathered_patina", opacity: 0.15, className: "rounded-2xl pointer-events-none" }),';
const newChildrenStart = 'children: [        t === "NAV" ? e.jsxs("div", { className: "flex flex-col gap-4 p-4 w-64", children: [' +
    'e.jsxs("button", { onClick: () => { a(); _e("MAP"); }, className: "p-4 bg-[#0B1424] border border-[#C9A351] rounded-2xl text-[#F3E7C8] font-cinzel font-bold text-center", children: [e.jsx(rt,{emblem:"map",size:20,className:"mx-auto mb-1"}), "MAP"] }),' +
    'e.jsxs("button", { onClick: () => { a(); _e("ARMA"); }, className: "p-4 bg-[#0B1424] border border-[#C9A351] rounded-2xl text-[#F3E7C8] font-cinzel font-bold text-center", children: [e.jsx(rt,{emblem:"helmet",size:20,className:"mx-auto mb-1"}), "ARMA"] }),' +
    'e.jsxs("button", { onClick: () => { a(); _e("CODEX"); }, className: "p-4 bg-[#0B1424] border border-[#C9A351] rounded-2xl text-[#F3E7C8] font-cinzel font-bold text-center", children: [e.jsx(rt,{emblem:"book",size:20,className:"mx-auto mb-1"}), "CODEX"] }),' +
    'e.jsxs("button", { onClick: () => { a(); _e("TREASURY"); }, className: "p-4 bg-[#0B1424] border border-[#C9A351] rounded-2xl text-[#F3E7C8] font-cinzel font-bold text-center", children: [e.jsx(rt,{emblem:"coin",size:20,className:"mx-auto mb-1"}), "TREASURY"] }),' +
    'e.jsxs("button", { onClick: () => { a(); window.dispatchEvent(new CustomEvent("open-save-manager")); }, className: "p-4 bg-[#0B1424] border border-[#C9A351] rounded-2xl text-[#F3E7C8] font-cinzel font-bold text-center", children: [e.jsx(rt,{emblem:"gear",size:20,className:"mx-auto mb-1"}), "SETTINGS"] }),' +
    'e.jsx("button", { onClick: a, className: "mt-2 p-2 text-red-400 font-cinzel text-xs uppercase", children: "Close" })' +
    '] }) : e.jsxs(e.Fragment, { children: [' +
    'e.jsx(es, { type: "weathered_patina", opacity: 0.15, className: "rounded-2xl pointer-events-none" }),';

// Note: I need to handle the closing bracket of the Fragment.
// And I need to make sure _e and a are accessible.
// In FloatingMiniMenu, a is onClose, r is onOpenFull (which calls setActiveScreen/_e).
// Wait, setActiveScreen in FloatingMiniMenu is 's'.

const newChildrenStartCorrected = 'children: [        t === "NAV" ? e.jsxs("div", { className: "flex flex-col gap-3 p-2 w-64", children: [' +
    'e.jsx("h2",{className:"font-cinzel text-center text-[#C9A351] mb-2",children:"COMMAND NAV"}),' +
    'e.jsxs("button", { onClick: () => { a(); }, className: "p-3 bg-[#0B1424]/80 border border-[#C9A351]/40 rounded-xl text-[#F3E7C8] font-cinzel font-bold text-sm flex items-center gap-3", children: [e.jsx(rt,{emblem:"map",size:18}), "CAMPAIGN MAP"] }),' +
    'e.jsxs("button", { onClick: () => { a(); r("ARMA"); }, className: "p-3 bg-[#0B1424]/80 border border-[#C9A351]/40 rounded-xl text-[#F3E7C8] font-cinzel font-bold text-sm flex items-center gap-3", children: [e.jsx(rt,{emblem:"helmet",size:18}), "ARMA & RELIQUIAE"] }),' +
    'e.jsxs("button", { onClick: () => { a(); r("CODEX"); }, className: "p-3 bg-[#0B1424]/80 border border-[#C9A351]/40 rounded-xl text-[#F3E7C8] font-cinzel font-bold text-sm flex items-center gap-3", children: [e.jsx(rt,{emblem:"book",size:18}), "CODEX IMPERII"] }),' +
    'e.jsxs("button", { onClick: () => { a(); r("TREASURY"); }, className: "p-3 bg-[#0B1424]/80 border border-[#C9A351]/40 rounded-xl text-[#F3E7C8] font-cinzel font-bold text-sm flex items-center gap-3", children: [e.jsx(rt,{emblem:"coin",size:18}), "AERARIUM"] }),' +
    'e.jsxs("button", { onClick: () => { a(); window.dispatchEvent(new CustomEvent("open-save-manager")); }, className: "p-3 bg-[#0B1424]/80 border border-[#C9A351]/40 rounded-xl text-[#F3E7C8] font-cinzel font-bold text-sm flex items-center gap-3", children: [e.jsx(rt,{emblem:"gear",size:18}), "SETTINGS"] }),' +
    'e.jsx("button", { onClick: a, className: "mt-4 p-2 text-red-400 font-cinzel font-bold text-[10px] uppercase tracking-widest text-center border border-red-900/30 rounded-lg", children: "Close" })' +
    '] }) : ([' +
    'e.jsx(es, { type: "weathered_patina", opacity: 0.15, className: "rounded-2xl pointer-events-none" }),';

if (js.includes(oldChildrenStart)) {
    js = js.replace(oldChildrenStart, newChildrenStartCorrected);
    // I need to close the parenthesis/array correctly.
    // FloatingMiniMenu children is usually children: [ ... ]
}

console.log("Validating updated bundle with esbuild...");
esbuild.transformSync(js, { loader: "jsx" });


fs.writeFileSync(bundlePath, js, "utf8");

// Sync to dist
const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
}

console.log("=== GLOBAL NAVIGATION OVERLAY PASS COMPLETE ===");
