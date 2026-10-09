const fs = require('fs');
const path = require('path');

console.log("=== COMPILING HD MASTERWORK ENEMY MODELS (BEASTS, MONSTERS & WARBANDS) ===");

const hdEnemyModelsCode = `
// 3. MASTERWORK BARBARIAN WARBAND (CELTIC / GALLIC / GERMANIC BERSERKERS WITH HORNS, WOAD PAINT & CARNYX)
const render2DBarbarianWarband = (x, y, isPlayer, faction = "barbarian", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s forwards" : "none"
    },
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(245,158,11,0.9)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "28", rx: "68", ry: "16", fill: "#000000", opacity: "0.7" }),
      // Rear Row: Carnyx War Trumpet & Horned Chieftains
      !isDead && [-28, -10, 10, 28].map((sX, idx) => e.jsxs("g", {
        key: "barb_br_" + idx,
        children: [
          // Muscular Torso with Woad Blue War Paint Tattoos
          e.jsx("rect", { x: sX - 5, y: "2", width: "10", height: "18", fill: "#78350f", rx: "2" }),
          e.jsx("path", { d: "M " + (sX - 4) + " 6 Q " + sX + " 10 " + (sX + 4) + " 6", stroke: "#0284c7", strokeWidth: "1.8", fill: "none" }),
          // Head & Spiked/Horned Iron Helmet
          e.jsx("circle", { cx: sX, cy: "-2", r: "5", fill: "#78350f", stroke: "#29180c", strokeWidth: "1" }),
          // Heavy Curved Beast Horns
          e.jsx("path", { d: "M " + (sX - 3) + " -5 Q " + (sX - 12) + " -14 " + (sX - 8) + " -22", stroke: "#fef08a", strokeWidth: "2.2", fill: "none", strokeLinecap: "round" }),
          e.jsx("path", { d: "M " + (sX + 3) + " -5 Q " + (sX + 12) + " -14 " + (sX + 8) + " -22", stroke: "#fef08a", strokeWidth: "2.2", fill: "none", strokeLinecap: "round" }),
          // Chieftain Carnyx Boar Horn
          idx === 0 
            ? e.jsxs("g", {
                children: [
                  e.jsx("path", { d: "M " + sX + " 2 L " + (sX - 6) + " -32 Q " + (sX + 6) + " -40 " + (sX + 14) + " -32", stroke: "#f59e0b", strokeWidth: "3", fill: "none" }),
                  e.jsx("circle", { cx: sX + 14, cy: "-32", r: "4", fill: "#d97706" })
                ]
              })
            : e.jsxs("g", {
                children: [
                  e.jsx("line", { x1: sX, y1: "4", x2: sX + 36, y2: "-18", stroke: "#e2e8f0", strokeWidth: "3", strokeLinecap: "round" }),
                  e.jsx("circle", { cx: sX, cy: "4", r: "2.5", fill: "#d97706" })
                ]
              })
        ]
      })),
      // Front Row: Wicker Oval Shields with Celtic Knots & Longswords
      !isDead && [-18, 4, 26].map((sX, idx) => e.jsxs("g", {
        key: "barb_fr_" + idx,
        children: [
          // Legs & Fur Boots
          e.jsx("line", { x1: sX + 3, y1: "24", x2: sX + 3, y2: "33", stroke: "#451a03", strokeWidth: "3" }),
          e.jsx("line", { x1: sX + 11, y1: "24", x2: sX + 11, y2: "33", stroke: "#451a03", strokeWidth: "3" }),
          // Large Celtic Oval Shield with Heavy Bronze Rim
          e.jsx("ellipse", { cx: sX + 7, cy: "14", rx: "11", ry: "17", fill: "#451a03", stroke: "#f59e0b", strokeWidth: "2", filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.85))" }),
          // Celtic Knot Motif
          e.jsx("circle", { cx: sX + 7, cy: "14", r: "4.5", fill: "none", stroke: "#0284c7", strokeWidth: "2" }),
          e.jsx("line", { x1: sX + 7, y1: "2", x2: sX + 7, y2: "26", stroke: "#fef08a", strokeWidth: "1.5" }),
          // Forward Thrusting Celtic Iron Longsword
          e.jsx("line", { x1: sX + 14, y1: "12", x2: sX + 44, y2: "6", stroke: "#f1f5f9", strokeWidth: "3", strokeLinecap: "round" }),
          e.jsx("polygon", { points: (sX + 46) + ",6 " + (sX + 40) + ",3 " + (sX + 40) + ",9", fill: "#ffffff" })
        ]
      }))
    ]
  });
};

// 4. MASTERWORK GREEK PHALANX (HOPLITES WITH CORINTHIAN HELMETS & ASPIS SHIELDS)
const render2DGreekPhalanx = (x, y, isPlayer, faction = "greek", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s forwards" : "none"
    },
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(59,130,246,0.9)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "28", rx: "65", ry: "16", fill: "#000000", opacity: "0.7" }),
      // Rear Rank Hoplites with Tall Crests & Leveled Dory Spears
      !isDead && [-24, -8, 8, 24].map((sX, idx) => e.jsxs("g", {
        key: "grk_br_" + idx,
        children: [
          // Bronze Muscle Cuirass
          e.jsx("rect", { x: sX - 5, y: "2", width: "10", height: "18", fill: "#b45309", stroke: "#78350f", strokeWidth: "1", rx: "1.5" }),
          // Corinthian Helmet Bowl
          e.jsx("circle", { cx: sX, cy: "-2", r: "5.2", fill: "#d97706", stroke: "#78350f", strokeWidth: "1.2" }),
          // Flowing Blue/Gold Horsehair Crest
          e.jsx("ellipse", { cx: sX, cy: "-8", rx: "8", ry: "3.5", fill: "#1e3a8a", stroke: "#fef08a", strokeWidth: "1" }),
          // Long Dory Spear pointing forward to +X
          e.jsx("line", { x1: sX, y1: "6", x2: sX + 54, y2: "-14", stroke: "#78350f", strokeWidth: "2.6", strokeLinecap: "round" }),
          e.jsx("polygon", { points: (sX + 56) + ",-14 " + (sX + 48) + ",-11 " + (sX + 50) + ",-17", fill: "#ffffff" })
        ]
      })),
      // Front Rank Round Bronze Aspis Shields with Lambda / Gorgon Emblems
      !isDead && [-18, 2, 22].map((sX, idx) => e.jsxs("g", {
        key: "grk_fr_" + idx,
        children: [
          // Greaved Legs
          e.jsx("line", { x1: sX + 3, y1: "24", x2: sX + 3, y2: "33", stroke: "#d97706", strokeWidth: "3" }),
          e.jsx("line", { x1: sX + 11, y1: "24", x2: sX + 11, y2: "33", stroke: "#d97706", strokeWidth: "3" }),
          // Large Round Convex Aspis Shield
          e.jsx("circle", { cx: sX + 8, cy: "14", r: "15", fill: "#1e3a8a", stroke: "#f59e0b", strokeWidth: "2.2", filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.85))" }),
          // Spartan Lambda or Athenian Owl Motif
          e.jsx("path", { d: "M " + (sX + 3) + " 20 L " + (sX + 8) + " 8 L " + (sX + 13) + " 20", stroke: "#fef08a", strokeWidth: "2.6", fill: "none" })
        ]
      }))
    ]
  });
};

// 5. MASTERWORK PUNIC SACRED BAND / LIBYAN VETERANS
const render2DPunicInfantry = (x, y, isPlayer, faction = "punic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s forwards" : "none"
    },
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(168,85,247,0.9)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "28", rx: "65", ry: "16", fill: "#000000", opacity: "0.7" }),
      // Rear Rank Veterans with Phrygian Helmets & Sarissas
      !isDead && [-24, -8, 8, 24].map((sX, idx) => e.jsxs("g", {
        key: "pun_br_" + idx,
        children: [
          // Scale Armor (Lorica Squamata)
          e.jsx("rect", { x: sX - 5, y: "2", width: "10", height: "18", fill: "#581c87", stroke: "#f59e0b", strokeWidth: "1", rx: "1.5" }),
          // Phrygian Helmet with Forward Crest
          e.jsx("circle", { cx: sX, cy: "-2", r: "5.2", fill: "#d97706", stroke: "#4a044e", strokeWidth: "1.2" }),
          e.jsx("path", { d: "M " + (sX - 3) + " -5 Q " + (sX + 6) + " -12 " + (sX + 4) + " -2", fill: "#701a75" }),
          // Long Thrusting Sarissa Pike
          e.jsx("line", { x1: sX, y1: "6", x2: sX + 56, y2: "-14", stroke: "#78350f", strokeWidth: "2.6", strokeLinecap: "round" }),
          e.jsx("polygon", { points: (sX + 58) + ",-14 " + (sX + 50) + ",-11 " + (sX + 52) + ",-17", fill: "#ffffff" })
        ]
      })),
      // Front Rank Purple Shields with Golden Tanit Symbol
      !isDead && [-18, 2, 22].map((sX, idx) => e.jsxs("g", {
        key: "pun_fr_" + idx,
        children: [
          // Greaved Legs
          e.jsx("line", { x1: sX + 3, y1: "24", x2: sX + 3, y2: "33", stroke: "#f59e0b", strokeWidth: "3" }),
          e.jsx("line", { x1: sX + 11, y1: "24", x2: sX + 11, y2: "33", stroke: "#f59e0b", strokeWidth: "3" }),
          // Heavy Carthaginian Shield
          e.jsx("rect", { x: sX - 1, y: "4", width: "18", height: "28", rx: "3.5", fill: "#701a75", stroke: "#f59e0b", strokeWidth: "2", filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.85))" }),
          // Sacred Tanit Symbol of Carthage
          e.jsx("circle", { cx: sX + 8, cy: "12", r: "3", fill: "#fef08a" }),
          e.jsx("line", { x1: sX + 3, y1: "17", x2: sX + 13, y2: "17", stroke: "#fef08a", strokeWidth: "1.8" }),
          e.jsx("polygon", { points: (sX + 8) + ",17 " + (sX + 4) + ",25 " + (sX + 12) + ",25", fill: "none", stroke: "#fef08a", strokeWidth: "1.6" })
        ]
      }))
    ]
  });
};

// 6. MASTERWORK ARMORED WAR ELEPHANT (CARTHAGINIAN / SELEUCID BEAST OF WAR WITH HOWDAH & MAHOUT)
const render2DWarElephant = (x, y, isPlayer, faction = "punic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s forwards" : "none"
    },
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_24px_rgba(251,191,36,0.95)]" : ""),
    children: [
      // Ground Shadow & Stomp Shockwave
      e.jsx("ellipse", { cx: "0", cy: "34", rx: "75", ry: "20", fill: "#000000", opacity: "0.75" }),
      isAttacking && e.jsx("circle", { cx: "55", cy: "34", r: "34", fill: "rgba(245,158,11,0.4)", className: "animate-ping" }),
      
      // Massive Muscular Elephant Body with Wrinkled Shading
      e.jsx("path", {
        d: "M -55 12 Q -68 -32 -24 -38 Q 30 -40 56 -12 Q 68 12 50 30 L 34 30 L 25 12 L -12 12 L -22 30 L -42 30 Z",
        fill: "#475569",
        stroke: "#1e293b",
        strokeWidth: "2.4",
        filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.85))"
      }),
      // Elephant Muscular Legs
      e.jsx("rect", { x: "-38", y: "10", width: "18", height: "24", rx: "5", fill: "#334155", stroke: "#1e293b", strokeWidth: "1.2" }),
      e.jsx("rect", { x: "24", y: "10", width: "20", height: "24", rx: "5", fill: "#334155", stroke: "#1e293b", strokeWidth: "1.2" }),

      // Embroidered Royal Punic Saddlecloth (Tyrian Purple & Gold Tassels)
      e.jsx("path", {
        d: "M -32 -20 Q 4 -24 38 -20 L 32 12 Q 0 16 -26 12 Z",
        fill: "#701a75",
        stroke: "#f59e0b",
        strokeWidth: "2.4"
      }),
      [-20, -5, 10, 25].map((tx, i) => e.jsx("circle", { key: "tassel_" + i, cx: tx, cy: "14", r: "2.2", fill: "#fef08a" })),

      // Fortified Wooden Howdah Battle Tower with Numidian Archer
      !isDead && e.jsxs("g", {
        id: "elephant-howdah-tower",
        transform: "translate(-6, -58)",
        children: [
          // Tower Wall
          e.jsx("rect", { x: "-22", y: "0", width: "44", height: "26", rx: "3", fill: "#573012", stroke: "#d97706", strokeWidth: "2" }),
          // Gilded Crenellated Battlements
          e.jsx("polygon", { points: "-22,0 -16,0 -16,5 -8,5 -8,0 0,0 0,5 8,5 8,0 16,0 16,5 22,5 22,0 22,6 -22,6", fill: "#fef08a" }),
          // Numidian Archer Aiming Bow
          e.jsx("circle", { cx: "4", cy: "-7", r: "5.5", fill: "#d97706" }),
          e.jsx("path", { d: "M 8 -16 Q 20 -8 8 2", fill: "none", stroke: "#fef08a", strokeWidth: "2.5" }),
          e.jsx("line", { x1: "2", y1: "-7", x2: "22", y2: "-7", stroke: "#f8fafc", strokeWidth: "1.8" }),
          // Punic War Standard Banner
          e.jsx("line", { x1: "-16", y1: "0", x2: "-16", y2: "-22", stroke: "#d97706", strokeWidth: "2.4" }),
          e.jsx("polygon", { points: "-16,-22 2,-25 -4,-16", fill: "#ef4444" })
        ]
      }),

      // Elephant Head, Chamfron Armor, Ears & Trunk (Facing +X)
      e.jsxs("g", {
        id: "elephant-head-assembly",
        transform: "translate(50, -12)",
        className: isAttacking ? "animate-pila-thrust" : "",
        children: [
          // Head Bowl
          e.jsx("circle", { cx: "0", cy: "0", r: "18", fill: "#475569" }),
          // Large Flared Ear with Bronze Boss
          e.jsx("path", { d: "M -10 -10 Q -30 0 -10 18 Z", fill: "#334155", stroke: "#1e293b", strokeWidth: "1.2" }),
          e.jsx("circle", { cx: "-14", cy: "2", r: "3", fill: "#f59e0b" }),
          // Bronze Chamfron Head Armor & Red Plume
          e.jsx("path", { d: "M 2 -14 L 14 -4 L 10 8 L -2 4 Z", fill: "#d97706", stroke: "#fef08a", strokeWidth: "1.8" }),
          e.jsx("ellipse", { cx: "4", cy: "-16", rx: "6", ry: "2.5", fill: "#dc2626" }),
          // Glowing Fierce Eye
          e.jsx("circle", { cx: "7", cy: "-4", r: "2.5", fill: "#fde047" }),
          // Massive Armored Ivory Tusks with Steel Spikes
          e.jsx("path", { d: "M 8 8 Q 28 14 38 -4", fill: "none", stroke: "#f8fafc", strokeWidth: "5.5", strokeLinecap: "round" }),
          e.jsx("polygon", { points: "38,-4 44,-12 34,-8", fill: "#d97706", stroke: "#fef08a", strokeWidth: "1" }),
          // Prehensile Armored Trunk
          e.jsx("path", { d: "M 12 4 Q 22 18 14 32 Q 6 42 20 44", fill: "none", stroke: "#475569", strokeWidth: "6.5", strokeLinecap: "round" })
        ]
      }),

      // Punic Mahout Rider on Elephant Neck
      !isDead && e.jsxs("g", {
        id: "elephant-mahout-rider",
        transform: "translate(28, -32)",
        children: [
          e.jsx("circle", { cx: "0", cy: "0", r: "5.5", fill: "#d97706" }),
          e.jsx("line", { x1: "2", y1: "0", x2: "12", y2: "10", stroke: "#fef08a", strokeWidth: "2.2" }) // Ankus goad
        ]
      })
    ]
  });
};
`;

// Update build_masterwork_models_and_facing.cjs with the enhanced models
const masterworkFacingScriptPath = path.join(__dirname, 'build_masterwork_models_and_facing.cjs');
let facingScript = fs.readFileSync(masterworkFacingScriptPath, 'utf8');

const pBarbStart = facingScript.indexOf('// 3. Masterwork Barbarian Warband');
const pSeaMonsterStart = facingScript.indexOf('// 7. Masterwork Colossal Sea Monster');

if (pBarbStart !== -1 && pSeaMonsterStart !== -1) {
  facingScript = facingScript.substring(0, pBarbStart) + hdEnemyModelsCode.trim() + "\n\n" + facingScript.substring(pSeaMonsterStart);
  fs.writeFileSync(masterworkFacingScriptPath, facingScript, 'utf8');
  console.log("SUCCESS: build_masterwork_models_and_facing.cjs updated with HD Masterwork enemy models!");
} else {
  console.error("Could not find insertion points in build_masterwork_models_and_facing.cjs", { pBarbStart, pSeaMonsterStart });
}
