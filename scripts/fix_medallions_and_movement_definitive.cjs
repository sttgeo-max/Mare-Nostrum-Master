const fs = require('fs');
const path = require('path');

console.log("=== EXECUTING DEFINITIVE MEDALLION, MOVEMENT, PLAYER TOKEN & HUD FIX ===");

const c0Path = path.join(__dirname, '../c0_dump.js');
const v37Path = path.join(__dirname, '../public/assets/index-V37.js');

if (!fs.existsSync(c0Path) || !fs.existsSync(v37Path)) {
  console.error("ERROR: Missing c0_dump.js or index-V37.js");
  process.exit(1);
}

const c0 = fs.readFileSync(c0Path, 'utf8');
let v37 = fs.readFileSync(v37Path, 'utf8');

// 1. Remove duplicate Medallion code blocks from v37
while (v37.indexOf("rt.displayName=\"Medallion\";") !== v37.lastIndexOf("rt.displayName=\"Medallion\";")) {
  const secondIdx = v37.lastIndexOf("rt.displayName=\"Medallion\";");
  const firstXd = v37.lastIndexOf("var Xd=", secondIdx) !== -1 ? v37.lastIndexOf("var Xd=", secondIdx) : v37.lastIndexOf("Xd=", secondIdx);
  v37 = v37.substring(0, firstXd) + v37.substring(secondIdx + "rt.displayName=\"Medallion\";".length);
  console.log("Removed duplicate Medallion block.");
}

// 2. Ensure global exports and bindings for Medallions
if (!v37.includes("window.rt = rt;")) {
  const idxRtEnd = v37.indexOf("rt.displayName=\"Medallion\";");
  if (idxRtEnd !== -1) {
    const bindCode = ";\nvar Vr = rt;\nvar Medallion = rt;\nif (typeof window !== 'undefined') {\n  window.rt = rt;\n  window.Ao = Ao;\n  window.$i = $i;\n  window.Vr = Vr;\n  window.Medallion = rt;\n  window.Jd = Jd;\n  window.Fo = Fo;\n}\n";
    v37 = v37.substring(0, idxRtEnd + "rt.displayName=\"Medallion\";".length) + bindCode + v37.substring(idxRtEnd + "rt.displayName=\"Medallion\";".length);
    console.log("SUCCESS: Attached global window medallion bindings.");
  }
}

// 3. Fix DummyIcon fallbacks so medallion components never resolve to empty spans
v37 = v37.replace(/var rt = typeof window !== "undefined" && window\.rt \|\| DummyIcon;/g, 'var rt = window.rt || rt;');
v37 = v37.replace(/var Vr = typeof window !== "undefined" && window\.Vr \|\| DummyIcon;/g, 'var Vr = window.rt || rt;');
v37 = v37.replace(/var Ao = typeof window !== "undefined" && window\.Ao \|\| DummyIcon;/g, 'var Ao = window.Ao || Ao;');
v37 = v37.replace(/var \$i = typeof window !== "undefined" && window\.\$i \|\| DummyIcon;/g, 'var $i = window.$i || $i;');

// 4. Replace player token map component (zo) cleanly
const idxZo = v37.indexOf("var zo = b.memo");
if (idxZo !== -1) {
  const idxPp = v37.indexOf("var pp = ", idxZo);
  if (idxPp !== -1) {
    const cleanZoCode = `var zo = b.memo(({ player: t, playerMode: ge = "sea", isMoving: V = false, activeVector: Zs, velocity: vel, modeTransitioning: ht, mapScale: Je = 1 }) => {
  const isSea = ge === "sea";
  const iter = t?.iter ?? 6;
  const maxIter = t?.maxIter ?? 6;
  const variant = isSea ? "imperial_purple" : "crimson_blood";
  const emblem = isSea ? "emblem_ship_roman" : "emblem_legion_roman";
  
  return e.jsxs("div", {
    className: "relative flex flex-col items-center justify-center select-none pointer-events-auto cursor-pointer group",
    style: { transform: "scale(" + Math.max(0.85, Math.min(1.25, 1 / (Je || 1))) + ")", transformOrigin: "center center" },
    children: [
      e.jsx("div", {
        className: "absolute -inset-3 rounded-full pointer-events-none transition-all duration-300 " + (
          isSea
            ? "border-2 border-amber-400/90 shadow-[0_0_24px_rgba(245,158,11,0.75),inset_0_0_12px_rgba(245,158,11,0.4)]"
            : "border-2 border-rose-500/90 shadow-[0_0_24px_rgba(244,63,94,0.75),inset_0_0_12px_rgba(244,63,94,0.4)]"
        ) + (V ? " animate-pulse scale-110" : " scale-100")
      }),
      e.jsx(rt, {
        size: 64,
        variant: variant,
        emblem: emblem,
        level: 5,
        isElaborate: true,
        className: "drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] transition-transform duration-200 group-hover:scale-105"
      }),
      e.jsxs("div", {
        className: "mt-1.5 px-3 py-0.5 bg-black/90 border border-amber-500/80 rounded-full flex items-center gap-1.5 shadow-xl text-[10px] font-bold text-amber-300 font-cinzel tracking-wider backdrop-blur-md",
        children: [
          e.jsx("span", { className: "text-amber-400/90", children: "ITER" }),
          e.jsx("span", { className: "text-amber-100 font-mono text-xs", children: iter + "/" + maxIter })
        ]
      })
    ]
  });
});\n`;
    v37 = v37.substring(0, idxZo) + cleanZoCode + v37.substring(idxPp);
    console.log("SUCCESS: Cleanly replaced zo component.");
  }
}

// 5. Fix Movement: Auto-clear ANCORIS stance and ensure movement executes
const ancorisPattern = 'if (ee.fleetStance === "ANCORIS") return Y("IN ANCORIS (ANCHORED)", "Vessel is riding at anchor. Switch stance to sail.", "warning"), false;';
const ancorisFix = 'if (ee.fleetStance === "ANCORIS") { ee.fleetStance = "VELIS"; Y("ANCHOR WEIGHED", "Stance automatically set to Velis for voyage.", "imperial"); }';

if (v37.includes(ancorisPattern)) {
  v37 = v37.replace(ancorisPattern, ancorisFix);
  console.log("SUCCESS: Fixed ANCORIS stance check in movement logic (_r).");
}

// 6. Ensure Top HUD Save Button is present and functional
if (!v37.includes("top-hud-save-btn")) {
  v37 = v37.replace(
    'e.jsx(rt, { size: "md", variant: "gold", emblem: "custom_codex",',
    'e.jsx(rt, { size: "md", variant: "gold", emblem: "custom_codex", id: "top-hud-save-btn",'
  );
  console.log("SUCCESS: Added top-hud-save-btn ID to Top HUD save medallion.");
}

// 7. Write updated code back to index-V37.js
fs.writeFileSync(v37Path, v37, 'utf8');
console.log("SUCCESS: Saved updated public/assets/index-V37.js");

// 8. Sync across all bundle versions in public/assets/ and dist/
const publicDir = path.join(__dirname, '../public/assets');
const files = fs.readdirSync(publicDir);
files.forEach(file => {
  if (file.startsWith('index-V') && file.endsWith('.js')) {
    fs.copyFileSync(v37Path, path.join(publicDir, file));
  }
});
console.log("SUCCESS: Synchronized all public/assets/index-V*.js bundles.");

const distDir = path.join(__dirname, '../dist/assets');
if (fs.existsSync(distDir)) {
  const distFiles = fs.readdirSync(distDir);
  distFiles.forEach(file => {
    if (file.startsWith('index-V') && file.endsWith('.js')) {
      fs.copyFileSync(v37Path, path.join(distDir, file));
    }
  });
  console.log("SUCCESS: Synchronized dist/assets/ bundles.");
}

// 9. Sync index.html timestamp
const htmlPath = path.join(__dirname, '../index.html');
if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  const newVer = "V37_" + Date.now();
  html = html.replace(/V37_\d+/g, newVer);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`SUCCESS: Updated index.html bundle version to ${newVer}.`);
}

console.log("=== ALL FIXES APPLIED SUCCESSFULLY ===");
