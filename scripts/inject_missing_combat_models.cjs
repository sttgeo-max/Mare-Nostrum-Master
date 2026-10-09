const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== INJECTING MISSING 2.5D FACTION & MYTHIC COMBAT MODELS ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

const targetAnchor = "// 10. Masterwork Minotaur Beast / Colossus Titan";
const pAnchor = bundle.indexOf(targetAnchor);

if (pAnchor === -1) {
  console.error("Target anchor not found in bundle");
  process.exit(1);
}

const missingModelsCode = `// === 2.5D MASTERWORK FACTION & SPECIALIZED COMBAT UNITS ===

// 1. 2.5D BARBARIAN WARBAND
const render2DBarbarianWarband = (x, y, isPlayer, faction = "barbarian", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  return render2DLegion(x, y, isPlayer, "cohort", "barbarian", hpPct, animState, scale, isAttacking, isHit, isTargeted, staggerClass, tier);
};

// 2. 2.5D GREEK HELLENIC PHALANX
const render2DGreekPhalanx = (x, y, isPlayer, faction = "greek", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  return render2DLegion(x, y, isPlayer, "cohort", "greek", hpPct, animState, scale, isAttacking, isHit, isTargeted, staggerClass, tier);
};

// 3. 2.5D PUNIC CARTHAGINIAN INFANTRY
const render2DPunicInfantry = (x, y, isPlayer, faction = "punic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  return render2DLegion(x, y, isPlayer, "cohort", "punic", hpPct, animState, scale, isAttacking, isHit, isTargeted, staggerClass, tier);
};

// 4. 2.5D MASTERWORK ARMORED WAR ELEPHANT
const render2DWarElephant = (x, y, isPlayer, faction = "punic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip * 1.3) + ", " + (scale * 1.3) + ")",
    opacity: isDead ? "0.7" : "1",
    style: { filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.85))" },
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125" : ""),
    children: [
      // Ground Dust
      !isDead && e.jsx("ellipse", { cx: "0", cy: "36", rx: "55", ry: "15", fill: "rgba(0,0,0,0.4)" }),
      // Elephant Legs
      [-25, -10, 15, 30].map((lx, i) => e.jsx("rect", { key: "e_leg_" + i, x: lx - 6, y: "10", width: "12", height: "26", rx: "4", fill: "#57534e", stroke: "#292524", strokeWidth: "1.2" })),
      // Massive Elephant Body (Grey-Brown hide with bronze armor trappings)
      e.jsx("ellipse", { cx: "0", cy: "5", rx: "42", ry: "30", fill: "#78716c", stroke: "#44403c", strokeWidth: "2" }),
      // Bronze Armor Saddle Cloth (Caparison)
      e.jsx("path", { d: "M -28 -5 Q 0 -12 28 -5 L 24 16 Q 0 20 -24 16 Z", fill: "#991b1b", stroke: "#fbbf24", strokeWidth: "1.8" }),
      // Head & Ears
      e.jsx("ellipse", { cx: "32", cy: "-2", rx: "18", ry: "22", fill: "#78716c", stroke: "#44403c", strokeWidth: "1.5" }),
      e.jsx("ellipse", { cx: "22", cy: "-4", rx: "14", ry: "18", fill: "#57534e" }),
      // Bronze Chamfron (Head Armor)
      e.jsx("polygon", { points: "32,-20 44,-2 36,8 24,-2", fill: "#fbbf24", stroke: "#78350f", strokeWidth: "1.2" }),
      // Trunk (Curved upward)
      e.jsx("path", { d: "M 42 6 Q 55 16 52 30 Q 48 34 44 26 Q 48 18 38 12", fill: "#78716c", stroke: "#44403c", strokeWidth: "2" }),
      // Polished Ivory Tusks with Bronze Tips
      e.jsx("path", { d: "M 38 8 Q 54 4 60 -6", fill: "none", stroke: "#fef08a", strokeWidth: "3.5", strokeLinecap: "round" }),
      // Howdah (Wooden Fighting Tower on Back)
      e.jsxs("g", {
        transform: "translate(0, -32)",
        children: [
          e.jsx("rect", { x: "-18", y: "-12", width: "36", height: "20", rx: "3", fill: "#451a03", stroke: "#fbbf24", strokeWidth: "1.5" }),
          e.jsx("circle", { cx: "-6", cy: "-16", r: "4", fill: "#fde047" }),
          e.jsx("circle", { cx: "6", cy: "-16", r: "4", fill: "#fde047" }),
          e.jsx("line", { x1: "6", y1: "-14", x2: "18", y2: "-22", stroke: "#94a3b8", strokeWidth: "2" })
        ]
      })
    ]
  });
};

// 5. 2.5D MYTHIC SIREN
const render2DSiren = (x, y, isPlayer, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.6" : "1",
    children: [
      // Singing Aura Waves
      !isDead && e.jsx("circle", { cx: "0", cy: "-10", r: "35", fill: "none", stroke: "rgba(147,197,253,0.5)", strokeWidth: "2", className: "animate-ping" }),
      // Serpentine Tail
      e.jsx("path", { d: "M 0 10 Q 20 25 10 38 Q -10 45 5 55", fill: "none", stroke: "#0284c7", strokeWidth: "8", strokeLinecap: "round" }),
      // Body & Wings
      e.jsx("ellipse", { cx: "0", cy: "-5", rx: "9", ry: "16", fill: "#38bdf8" }),
      e.jsx("circle", { cx: "0", cy: "-22", r: "7", fill: "#fde047" })
    ]
  });
};

// 6. 2.5D KRAKEN / SEA MONSTER
const render2DSeaMonster = (x, y, isPlayer, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip * 1.2) + ", " + (scale * 1.2) + ")",
    opacity: isDead ? "0.6" : "1",
    children: [
      // Swirling Dark Maelstrom
      e.jsx("ellipse", { cx: "0", cy: "20", rx: "60", ry: "20", fill: "rgba(3,105,161,0.3)", className: "animate-spin" }),
      // Rising Tentacles
      [-30, -10, 15, 35].map((tx, idx) => e.jsx("path", {
        key: "tentacle_" + idx,
        d: "M " + tx + " 20 Q " + (tx + (idx % 2 === 0 ? 15 : -15)) + " -10 " + (tx + 5) + " -35 Q " + (tx - 5) + " -45 " + (tx - 12) + " -30",
        fill: "none",
        stroke: "#0369a1",
        strokeWidth: "7",
        strokeLinecap: "round"
      })),
      // Glowing Abyssal Eye
      e.jsx("circle", { cx: "0", cy: "5", r: "8", fill: "#ef4444", className: "animate-pulse" }),
      e.jsx("circle", { cx: "0", cy: "5", r: "3", fill: "#fef08a" })
    ]
  });
};

`;

bundle = bundle.substring(0, pAnchor) + missingModelsCode + bundle.substring(pAnchor);

try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, 'utf8');
  console.log("SUCCESS: public/assets/index-V33.js updated with missing 2.5D combat models.");

  const distPath = path.join(__dirname, '../dist/assets/index-V33.js');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, 'utf8');
    console.log("SUCCESS: dist/assets/index-V33.js synchronized.");
  }
} catch (err) {
  console.error("ERR transform failed:", err.message);
  process.exit(1);
}
