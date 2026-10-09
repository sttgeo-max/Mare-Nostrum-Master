const fs = require("fs");
const path = require("path");
let esbuild;
try {
  esbuild = require("esbuild");
} catch(e) {
  try {
    esbuild = require(path.join(__dirname, "../node_modules/esbuild"));
  } catch(e2) {
    esbuild = null;
  }
}

console.log("=== APPLYING COMBAT CONCURRENCY LOCK & LAUNCH MUTEX ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// Guard: if already applied, skip
if (js.includes("[COMBAT LOCK]")) {
  console.log("[SKIP] Combat concurrency lock already applied.");
  process.exit(0);
}

// 1. Root st handler (engage enemy)
const oldSt = "st=S=>{_(S.enemyUnit),B(S.id)}";
const newSt = "st=S=>{if(typeof window!==\"undefined\"){if(window.__mnCombatActive||f!==null){console.warn(\"[COMBAT LOCK] Blocked concurrent st trigger:\",S);return;}window.__mnCombatActive=!0;}_(S.enemyUnit);B(S.id)}";
if (js.includes(oldSt)) {
  js = js.replace(oldSt, newSt);
  
}

// 2. Root Qe handler (boss siege)
const oldQe = "Qe=S=>{const Q=Ts.find(te=>te.usurperKey===S);Q&&(M(null),_(Q),B(null))}";
const newQe = "Qe=S=>{if(typeof window!==\"undefined\"){if(window.__mnCombatActive||f!==null){console.warn(\"[COMBAT LOCK] Blocked concurrent Qe trigger:\",S);return;}}const Q=Ts.find(te=>te.usurperKey===S);Q&&(typeof window!==\"undefined\"&&(window.__mnCombatActive=!0),M(null),_(Q),B(null))}";
if (js.includes(oldQe)) {
  js = js.replace(oldQe, newQe);
  
}

// 3. Root re handler (garrison combat)
const oldReGarrison = "M(null),_(Se),Le(S.id)}";
const newReGarrison = "if(typeof window!==\"undefined\"){if(window.__mnCombatActive||f!==null){console.warn(\"[COMBAT LOCK] Blocked concurrent re trigger:\",S?.id);return;}window.__mnCombatActive=!0;}M(null);_(Se);Le(S.id)}";
if (js.includes(oldReGarrison)) {
  js = js.replace(oldReGarrison, newReGarrison);
  
}

// 4. Root Re exit reset
const markerReExit = "ROOT_RE_ENTERED";
const pRe = js.indexOf(markerReExit);
if (pRe !== -1) {
  const pReStart = js.lastIndexOf("Re=S=>{", pRe);
  if (pReStart !== -1) {
    js = js.substring(0, pReStart) + "Re=S=>{if(typeof window!==\"undefined\"){window.__mnCombatActive=!1;}\n  " + js.substring(pReStart + 7);
    
  }
}

// 5. City View node tap handler
const oldTap = "Q.col===S.col&&Q.row===S.row?st(S):Qe(S.col,S.row)";
const newTap = "Q.col===S.col&&Q.row===S.row?(typeof window!==\"undefined\"&&window.__mnCombatActive?null:st(S)):Qe(S.col,S.row)";
if (js.includes(oldTap)) {
  js = js.replace(oldTap, newTap);
  
}

// 6. City View patrol collision useEffect
const oldPatrol = "se(Xe=>Xe.filter((dt,at)=>at!==Ce));l(Se);}";
const newPatrol = "if(typeof window===\"undefined\"||!window.__mnCombatActive){se(Xe=>Xe.filter((dt,at)=>at!==Ce));l(Se);}}";
if (js.includes(oldPatrol)) {
  js = js.replace(oldPatrol, newPatrol);
  
}

if (esbuild) {
  console.log("Validating updated bundle with esbuild...");
  esbuild.transformSync(js, { loader: "js" });
  
}

fs.writeFileSync(bundlePath, js, "utf8");

// Sync to dist
const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
}

console.log("=== COMBAT CONCURRENCY LOCK COMPLETE ===");
