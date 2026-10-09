const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING HIGH-FIDELITY ROMAN EMPEROR COMBAT VISUALS AND FACTION SHIELDS ===");

const masterPath = path.join(__dirname, '../public/assets/index-V33.js');
let code = fs.readFileSync(masterPath, 'utf8');

// 1. Map player hand tactical card play weaponAnim to travel effects in playTacticalCard
console.log("1. Enhancing playTacticalCard to trigger ballistic projectile flights...");
const targetCardPlay = "setPlayerAnim(playerAnimToSet);      spawnFX(false, weaponAnim);";
const replaceCardPlay = `setPlayerAnim(playerAnimToSet);
      if (weaponAnim === 'arrow_fire' || weaponAnim === 'fire_arrow') {
        spawnFX(false, 'arrow_fire_travel');
      } else if (weaponAnim === 'javelin_launch') {
        spawnFX(false, 'javelin_launch_travel');
      } else if (weaponAnim === 'ballista_shot') {
        spawnFX(false, 'projectile_travel');
      } else {
        spawnFX(false, weaponAnim);
      }`;

if (code.includes(targetCardPlay)) {
  code = code.replace(targetCardPlay, replaceCardPlay);
  console.log("-> SUCCESS: Enhanced playTacticalCard travel triggers.");
} else {
  console.log("-> Note: Target card play already modified or not found.");
}

// 2. Slow down travel animations in renderFXOverlay for realistic projectile tracking
console.log("2. Adjusting projectile motion timing to feel organic and trackable...");
code = code.replace(/dur:\s*["']0\.38s["']/g, 'dur: "0.55s"');
code = code.replace(/dur:\s*["']0\.41s["']/g, 'dur: "0.58s"');
code = code.replace(/dur:\s*["']0\.36s["']/g, 'dur: "0.52s"');

// 3. Inject our high-fidelity real Roman Gladius weapon into sword_slash / melee_slash inside renderFXOverlay
console.log("3. Forging a high-fidelity double-edged Roman Gladius for sword_slash...");
const bloodSplatterTarget = `                  className: "animate-[splatter_0.6s_ease-out_forwards]",
                  style: { '--tx': tx + 'px', '--ty': ty + 'px' }
                });
              })
            ]
          })
        ]
      });
    }

    // 2. ARROW FIRE TRAVEL`;

const bloodSplatterReplacement = `                  className: "animate-[splatter_0.6s_ease-out_forwards]",
                  style: { '--tx': tx + 'px', '--ty': ty + 'px' }
                });
              }),
              // Real, beautifully sculpted double-edged Roman Gladius sweeping
              e.jsxs("g", {
                id: "real-gladius-weapon-overlay",
                className: "origin-center animate-[swordSweep_0.55s_cubic-bezier(0.16,_1,_0.3,_1)_forwards]",
                style: { transformOrigin: "100px 100px" },
                children: [
                  // Ivory grip/hilt
                  e.jsx("rect", { x: "96", y: "135", width: "8", height: "30", rx: "3", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1.2" }),
                  // Golden pommel ball
                  e.jsx("circle", { cx: "100", cy: "170", r: "8", fill: "#fbbf24", stroke: "#78350f", strokeWidth: "1.2" }),
                  e.jsx("circle", { cx: "100", cy: "170", r: "3", fill: "#fde047" }),
                  // Crossguard
                  e.jsx("path", { d: "M 84,135 Q 100,130 116,135 L 112,141 Q 100,138 88,141 Z", fill: "#fbbf24", stroke: "#78350f", strokeWidth: "1.2" }),
                  // Steel blade
                  e.jsx("polygon", { points: "90,131 92,35 100,20 108,35 110,131", fill: "#cbd5e1", stroke: "#475569", strokeWidth: "1.2" }),
                  // Blade fuller/ridge
                  e.jsx("line", { x1: "100", y1: "131", x2: "100", y2: "22", stroke: "#ffffff", strokeWidth: "1.5" }),
                  e.jsx("line", { x1: "101", y1: "131", x2: "101", y2: "22", stroke: "#94a3b8", strokeWidth: "1" })
                ]
              })
            ]
          })
        ]
      });
    }

    // 2. ARROW FIRE TRAVEL`;

if (code.includes(bloodSplatterTarget)) {
  code = code.replace(bloodSplatterTarget, bloodSplatterReplacement);
  console.log("-> SUCCESS: Injected double-edged Gladius overlay weapon.");
} else {
  console.log("-> Warning: bloodSplatterTarget not found.");
}

// 4. Forge a corresponding real Roman Gladius for BattleTheatreV2 SVG layer
console.log("4. Inserting real Gladius sword into BattleTheatreV2 SVG animation layer...");
const targetCleaveBlock = `              // 6. GLADIUS DECISIVE CLEAVE & SWORD SLASH
              (activeCombatFX && activeCombatFX.type === "sword_slash") && e.jsxs("g", {
                id: "fx-gladius-decisive-cleave",
                transform: "translate(" + (activeCombatFX.isPlayer ? 175 : 625) + ", 215)",
                children: [
                  e.jsx("path", {
                    d: "M -55,-45 Q 0,0 55,45",
                    stroke: "#fef08a",
                    strokeWidth: "8",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "160",
                    style: { animation: "bt_gladius_cleave 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards", willChange: "transform, opacity" }
                  }),
                  e.jsx("path", {
                    d: "M -55,-45 Q 0,0 55,45",
                    stroke: "#ffffff",
                    strokeWidth: "3",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "160",
                    style: { animation: "bt_gladius_cleave 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards", willChange: "transform, opacity" }
                  }),`;

const replaceCleaveBlock = `              // 6. GLADIUS DECISIVE CLEAVE & SWORD SLASH
              (activeCombatFX && activeCombatFX.type === "sword_slash") && e.jsxs("g", {
                id: "fx-gladius-decisive-cleave",
                transform: "translate(" + (activeCombatFX.isPlayer ? 175 : 625) + ", 215)",
                children: [
                  e.jsx("path", {
                    d: "M -55,-45 Q 0,0 55,45",
                    stroke: "#fef08a",
                    strokeWidth: "8",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "160",
                    style: { animation: "bt_gladius_cleave 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards", willChange: "transform, opacity" }
                  }),
                  e.jsx("path", {
                    d: "M -55,-45 Q 0,0 55,45",
                    stroke: "#ffffff",
                    strokeWidth: "3",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "160",
                    style: { animation: "bt_gladius_cleave 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards", willChange: "transform, opacity" }
                  }),
                  // Real Gladius model sweeping through the 2D combat field
                  e.jsxs("g", {
                    id: "real-gladius-battle-theatre",
                    style: {
                      transformOrigin: "0px 30px",
                      animation: "bt_gladius_cleave 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                      willChange: "transform, opacity"
                    },
                    children: [
                      e.jsx("rect", { x: "-2", y: "15", width: "4", height: "15", rx: "1.5", fill: "#fef08a", stroke: "#78350f", strokeWidth: "0.8" }),
                      e.jsx("circle", { cx: "0", cy: "32", r: "4.5", fill: "#fbbf24", stroke: "#78350f", strokeWidth: "0.8" }),
                      e.jsx("path", { d: "M -8,15 Q 0,12 8,15 L 6,18 Q 0,16 -6,18 Z", fill: "#fbbf24", stroke: "#78350f", strokeWidth: "0.8" }),
                      e.jsx("polygon", { points: "-5,13 -4,-30 0,-42 4,-30 5,13", fill: "#cbd5e1", stroke: "#475569", strokeWidth: "0.8" }),
                      e.jsx("line", { x1: "0", y1: "13", x2: "0", y2: "-40", stroke: "#ffffff", strokeWidth: "1" })
                    ]
                  }),`;

if (code.includes(targetCleaveBlock)) {
  code = code.replace(targetCleaveBlock, replaceCleaveBlock);
  console.log("-> SUCCESS: Forged real Gladius inside BattleTheatreV2 SVG layer.");
} else {
  console.log("-> Warning: targetCleaveBlock not found.");
}

// 5. Inject swordSweep keyframe in styles inside BattleTheatreV2
console.log("5. Embedding @keyframes swordSweep into combat styles block...");
const targetStyles = "children: `              @keyframes bt_gladius_cleave {";
const replaceStyles = `children: \`              @keyframes swordSweep {
                0% { transform: rotate(-85deg) translate(0, 40px) scale(0.65); opacity: 0; }
                15% { opacity: 1; }
                50% { transform: rotate(15deg) translate(0, 0px) scale(0.85); opacity: 1; }
                85% { opacity: 0.8; }
                100% { transform: rotate(55deg) translate(0, -10px) scale(0.65); opacity: 0; }
              }
              @keyframes bt_gladius_cleave {`;

if (code.includes(targetStyles)) {
  code = code.replace(targetStyles, replaceStyles);
  console.log("-> SUCCESS: Registered swordSweep CSS keyframes.");
} else {
  console.log("-> Warning: targetStyles not found.");
}

// 6. Replace Scutum standard winged thunderbolt with a magnificent medallion-customized shield system
console.log("6. Designing customized scutum shield insignia for all 13 medallions/factions...");
const targetShieldInsignia = `              // Faction Crest / Insignia on Scutum (Winged Thunderbolts / Crescent / Owl / Boar)
              e.jsxs("g", {
                stroke: scutumEmblemColor,
                strokeWidth: "1.5",
                fill: "none",
                children: [
                  // Upper Thunderbolt Wings / Horns
                  e.jsx("path", { d: "M -16,0 Q -8,6 0,2 Q 8,6 16,0", strokeLinecap: "round" }),
                  e.jsx("path", { d: "M -18,-6 Q -8,0 0,-4 Q 8,0 18,-6", strokeLinecap: "round" }),
                  // Lower Thunderbolt Wings
                  e.jsx("path", { d: "M -16,28 Q -8,22 0,26 Q 8,22 16,28", strokeLinecap: "round" }),
                  e.jsx("path", { d: "M -18,34 Q -8,28 0,32 Q 8,28 18,34", strokeLinecap: "round" }),
                  // Vertical Spear Shaft Spine
                  e.jsx("line", { x1: "0", y1: "-12", x2: "0", y2: "40", stroke: goldTrim, strokeWidth: "2" })
                ]
              })`;

const replaceShieldInsignia = `              // Faction Crest / Insignia on Scutum (Winged Thunderbolts / Crescent / Owl / Boar)
              e.jsxs("g", {
                stroke: scutumEmblemColor,
                strokeWidth: "1.5",
                fill: "none",
                children: [
                  isAnchor ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-8", r: "3", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "-6", y1: "-4", x2: "6", y2: "-4", stroke: scutumEmblemColor, strokeWidth: "1.5", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -14,24 Q 0,38 14,24", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.8", strokeLinecap: "round" }),
                      e.jsx("polygon", { points: "-14,24 -11,21 -17,21", fill: scutumEmblemColor }),
                      e.jsx("polygon", { points: "14,24 11,21 17,21", fill: scutumEmblemColor }),
                      e.jsx("line", { x1: "0", y1: "-12", x2: "0", y2: "38", stroke: goldTrim, strokeWidth: "2" })
                    ]
                  }) : isSol ? e.jsxs("g", {
                    children: [
                      [-135, -90, -45, 180, 0, 135, 90, 45].map((deg, ri) => {
                        const rad = deg * Math.PI / 180;
                        return e.jsx("line", {
                          key: "shd_ray_" + ri,
                          x1: Math.cos(rad) * 12,
                          y1: 14 + Math.sin(rad) * 12,
                          x2: Math.cos(rad) * 22,
                          y2: 14 + Math.sin(rad) * 22,
                          stroke: scutumEmblemColor,
                          strokeWidth: "1.6",
                          strokeLinecap: "round"
                        });
                      })
                    ]
                  }) : isChiRho ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -1,-14 L -1,-6 C 2,-6 2,-10 -1,-10", fill: "none", stroke: scutumEmblemColor, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-4", y1: "-4", x2: "2", y2: "-8", stroke: scutumEmblemColor, strokeWidth: "1.5", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-4", y1: "-8", x2: "2", y2: "-4", stroke: scutumEmblemColor, strokeWidth: "1.5", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -10,32 L -7,24 L -4,32 M -9,29 L -5,29", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.2", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M 4,32 Q 7,24 10,32 L 12,32 M 5,32 L 3,32", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.2", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "0", y1: "-16", x2: "0", y2: "40", stroke: goldTrim, strokeWidth: "2" })
                    ]
                  }) : isAquila ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -6,-10 L 0,-14 L 6,-10 L 4,-4 L -4,-4 Z", fill: scutumEmblemColor }),
                      e.jsx("polygon", { points: "0,-14 3,-13 0,-11", fill: scutumEmblemColor }),
                      e.jsx("path", { d: "M -8,-6 C -20,-12 -24,-2 -10,4", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.5", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M 8,-6 C 20,-12 24,-2 10,4", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.5", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -6,22 L -8,32 L 0,28 L 8,32 L 6,22 Z", fill: scutumEmblemColor }),
                      e.jsx("line", { x1: "0", y1: "-12", x2: "0", y2: "38", stroke: goldTrim, strokeWidth: "2" })
                    ]
                  }) : isTriton ? e.jsxs("g", {
                    children: [
                      e.jsx("line", { x1: "0", y1: "-16", x2: "0", y2: "-4", stroke: scutumEmblemColor, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -6,-4 L -6,-12 L -8,-12", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.5", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M 6,-4 L 6,-12 L 8,-12", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.5", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-8", y1: "-4", x2: "8", y2: "-4", stroke: scutumEmblemColor, strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "0", y1: "22", x2: "0", y2: "38", stroke: scutumEmblemColor, strokeWidth: "1.8" }),
                      e.jsx("polygon", { points: "-3,34 0,38 3,34", fill: scutumEmblemColor })
                    ]
                  }) : isBull ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -18,-10 Q 0,-4 18,-10 Q 12,-16 0,-12 Q -12,-16 -18,-10 Z", fill: scutumEmblemColor }),
                      e.jsx("path", { d: "M -8,24 L 8,24 L 10,32 L 0,38 L -10,32 Z", fill: scutumEmblemColor }),
                      e.jsx("line", { x1: "0", y1: "-12", x2: "0", y2: "40", stroke: goldTrim, strokeWidth: "2" })
                    ]
                  }) : isPraetorian ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -8,-2 Q -18,-14 -12,-16", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.5" }),
                      e.jsx("path", { d: "M 8,-2 Q 18,-14 12,-16", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.5" }),
                      e.jsx("rect", { x: "-3", y: "22", width: "6", height: "10", rx: "1.5", fill: scutumEmblemColor }),
                      e.jsx("path", { d: "M 0,32 Q 8,38 8,26 Q 8,22 14,24", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.5" }),
                      e.jsx("polygon", { points: "14,24 16,21 12,22", fill: scutumEmblemColor })
                    ]
                  }) : isUsurper ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -6,-12 L -18,2 L -8,2 L -20,16 L -12,16 L -22,32", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.6" }),
                      e.jsx("path", { d: "M 6,-12 L 18,2 L 8,2 L 20,16 L 12,16 L 22,32", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.6" }),
                      e.jsx("line", { x1: "0", y1: "-12", x2: "0", y2: "40", stroke: goldTrim, strokeWidth: "2" })
                    ]
                  }) : isPunic ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-10", r: "3", fill: scutumEmblemColor }),
                      e.jsx("line", { x1: "-12", y1: "-4", x2: "12", y2: "-4", stroke: scutumEmblemColor, strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "-12", y1: "-4", x2: "-4", y2: "-1", stroke: scutumEmblemColor, strokeWidth: "1.2" }),
                      e.jsx("line", { x1: "12", y1: "-4", x2: "4", y2: "-1", stroke: scutumEmblemColor, strokeWidth: "1.2" }),
                      e.jsx("path", { d: "M -16,26 Q 0,38 16,26 Q 0,32 -16,26", fill: scutumEmblemColor }),
                      e.jsx("polygon", { points: "0,27 2,29 0,31 -2,29", fill: scutumEmblemColor })
                    ]
                  }) : isGreek ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -8,-6 L -5,-12 L 0,-10 L 5,-12 L 8,-6 Z", fill: scutumEmblemColor }),
                      e.jsx("circle", { cx: "-3", cy: "-6", r: "2.5", fill: scutumEmblemColor }),
                      e.jsx("circle", { cx: "3", cy: "-6", r: "2.5", fill: scutumEmblemColor }),
                      e.jsx("path", { d: "M -6,22 C -6,34 6,34 6,22 Z", fill: scutumEmblemColor }),
                      e.jsx("line", { x1: "-10", y1: "32", x2: "10", y2: "32", stroke: scutumEmblemColor, strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "0", y1: "-12", x2: "0", y2: "40", stroke: goldTrim, strokeWidth: "2" })
                    ]
                  }) : isEgyptian ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -12,-8 C -14,-14 -6,-14 -4,-6 C -2,-14 6,-14 12,-8 C 4,-2 -4,-2 -12,-8 Z", fill: scutumEmblemColor }),
                      e.jsx("circle", { cx: "0", cy: "30", r: "4", fill: scutumEmblemColor }),
                      e.jsx("path", { d: "M -4,30 Q -16,26 -14,34", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.2" }),
                      e.jsx("path", { d: "M 4,30 Q 16,26 14,34", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.2" })
                    ]
                  }) : isBarbarian ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -12,-4 L -4,-12 L 4,-12 L 8,-4 Z", fill: scutumEmblemColor }),
                      e.jsx("path", { d: "M -4,-12 L -6,-16 L 0,-14 L 2,-16 L 4,-12", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.2" }),
                      e.jsx("path", { d: "M -12,28 Q -6,22 -6,28 Q -6,34 -12,28", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.5" }),
                      e.jsx("path", { d: "M 12,28 Q 6,22 6,28 Q 6,34 12,28", fill: "none", stroke: scutumEmblemColor, strokeWidth: "1.5" })
                    ]
                  }) : isPirate ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-8", r: "4.5", fill: scutumEmblemColor }),
                      e.jsx("rect", { x: "-2", y: "-5", width: "4", height: "3", rx: "0.5", fill: scutumEmblemColor }),
                      e.jsx("line", { x1: "-16", y1: "-8", x2: "16", y2: "32", stroke: scutumEmblemColor, strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "16", y1: "-8", x2: "-16", y2: "32", stroke: scutumEmblemColor, strokeWidth: "1.5" })
                    ]
                  }) : e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -16,0 Q -8,6 0,2 Q 8,6 16,0", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -18,-6 Q -8,0 0,-4 Q 8,0 18,-6", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -16,28 Q -8,22 0,26 Q 8,22 16,28", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -18,34 Q -8,28 0,32 Q 8,28 18,34", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "0", y1: "-12", x2: "0", y2: "40", stroke: goldTrim, strokeWidth: "2" })
                    ]
                  })
                ]
              })`;

if (code.includes(targetShieldInsignia)) {
  code = code.replace(targetShieldInsignia, replaceShieldInsignia);
  console.log("-> SUCCESS: Customized all scutum shield insignia.");
} else {
  console.log("-> Warning: targetShieldInsignia not found.");
}

// 7. Write code back to bundle
fs.writeFileSync(masterPath, code, 'utf8');
console.log("7. Master bundle V33 successfully enhanced!");

// 8. Re-validate and bundle
try {
  esbuild.buildSync({
    entryPoints: [masterPath],
    outfile: '/tmp/test_enhanced_bundle.js',
    bundle: false,
    format: 'esm',
  });
  console.log("8. ESBUILD SYNTAX VALIDATION PASSED!");
} catch (e) {
  console.error("8. ESBUILD SYNTAX VALIDATION FAILED:", e.message);
  process.exit(1);
}

console.log("=== COMPLETED HIGH-FIDELITY ENHANCEMENTS ===");
