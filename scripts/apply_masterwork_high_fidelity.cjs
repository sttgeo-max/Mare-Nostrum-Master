const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING HIGH-FIDELITY COMBAT EFFECTS, DEFENSES, DAMAGE & CASUALTIES ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// 1. INJECT MASTERWORK KEYFRAMES
const targetKeyframeSearch = "@keyframes bt_arrow_flight {";
const newKeyframes = `@keyframes bt_gladius_cleave {
                0% { stroke-dashoffset: 160; opacity: 0; transform: scale(0.6) rotate(-25deg); }
                18% { opacity: 1; stroke-dashoffset: 0; transform: scale(1.15) rotate(0deg); }
                75% { opacity: 1; transform: scale(1.0) rotate(8deg); }
                100% { opacity: 0; transform: scale(0.9); }
              }
              @keyframes bt_shield_shatter {
                0% { transform: scale(0.4) rotate(0deg); opacity: 0; }
                20% { transform: scale(1.2) rotate(-5deg); opacity: 1; }
                60% { transform: scale(1.0) rotate(5deg); opacity: 0.95; }
                100% { transform: scale(0.8) rotate(15deg); opacity: 0; }
              }
              @keyframes bt_blood_splatter {
                0% { r: 2; opacity: 1; }
                60% { r: 35; opacity: 0.85; }
                100% { r: 55; opacity: 0; }
              }
              @keyframes bt_divine_retribution {
                0% { transform: scale(0.2) rotate(0deg); opacity: 0; }
                25% { transform: scale(1.1) rotate(90deg); opacity: 1; }
                75% { transform: scale(1.0) rotate(270deg); opacity: 0.9; }
                100% { transform: scale(0.4) rotate(360deg); opacity: 0; }
              }
              @keyframes bt_scutum_wall_pulse {
                0% { transform: scale(0.94); opacity: 0.7; }
                50% { transform: scale(1.03); opacity: 1; }
                100% { transform: scale(0.94); opacity: 0.7; }
              }
              @keyframes bt_arrow_flight {`;

if (!bundle.includes("bt_gladius_cleave") && bundle.includes(targetKeyframeSearch)) {
  bundle = bundle.replace(targetKeyframeSearch, newKeyframes);
  console.log("- Keyframes injected successfully.");
}

// 2. UPGRADE WEAPONS OVERLAY LAYER
const pLayerStart = bundle.indexOf('id: "masterwork-weapon-animations-layer"');
const pLayerEnd = bundle.indexOf("floatingText.map(ft =>", pLayerStart);

if (pLayerStart !== -1 && pLayerEnd !== -1) {
  const pClosingGroup = bundle.lastIndexOf("          }),", pLayerEnd);

  const comprehensiveMasterworkWeaponLayer = `id: "masterwork-weapon-animations-layer",
            className: "pointer-events-none select-none",
            children: [
              // 1. ARROW SALVO / SAGITTARII VOLLEY
              (activeCombatFX && (activeCombatFX.type === "arrow_fire" || activeCombatFX.type === "fire_arrow" || activeCombatFX.type === "arrow_fire_travel")) && e.jsxs("g", {
                id: "fx-arrow-salvo-flight",
                children: [
                  [ { sy: 115, ey: 118, arc: 45, d: "0s" }, { sy: 215, ey: 215, arc: 125, d: "0.06s" }, { sy: 310, ey: 312, arc: 240, d: "0.12s" } ].map((lane, idx) => {
                    const isFire = activeCombatFX.type === "fire_arrow";
                    const sx = activeCombatFX.isPlayer ? 635 : 165;
                    const ex = activeCombatFX.isPlayer ? 165 : 635;
                    const pth = "M " + sx + " " + lane.sy + " Q 400 " + lane.arc + " " + ex + " " + lane.ey;
                    return e.jsxs("g", { key: "arr_lane_" + idx, children: [
                      e.jsx("path", {
                        d: pth,
                        stroke: isFire ? "#f97316" : "#fef08a",
                        strokeWidth: isFire ? "3.8" : "2.4",
                        strokeDasharray: "45 600",
                        strokeLinecap: "round",
                        fill: "none",
                        style: { animation: "bt_arrow_flight 0.48s cubic-bezier(0.2, 0.6, 0.35, 1) " + lane.d + " forwards" }
                      }),
                      e.jsx("path", {
                        d: pth,
                        stroke: "#ffffff",
                        strokeWidth: "1.5",
                        strokeDasharray: "18 627",
                        strokeLinecap: "round",
                        fill: "none",
                        style: { animation: "bt_arrow_flight 0.48s cubic-bezier(0.2, 0.6, 0.35, 1) " + lane.d + " forwards" }
                      }),
                      isFire && e.jsx("circle", {
                        cx: ex,
                        cy: lane.ey,
                        r: "18",
                        fill: "rgba(249,115,22,0.65)",
                        style: { animation: "bt_burst_salvo2 0.45s 0.32s ease-out forwards" }
                      })
                    ]});
                  })
                ]
              }),

              // 2. PILUM & VELITES JAVELIN LAUNCH
              (activeCombatFX && (activeCombatFX.type === "javelin_launch" || activeCombatFX.type === "javelin_launch_travel")) && e.jsxs("g", {
                id: "fx-javelin-launch-flight",
                children: [
                  [ { sy: 135, ey: 125, d: "0s" }, { sy: 215, ey: 215, d: "0.05s" }, { sy: 295, ey: 305, d: "0.1s" } ].map((lane, idx) => {
                    const sx = activeCombatFX.isPlayer ? 620 : 180;
                    const ex = activeCombatFX.isPlayer ? 180 : 620;
                    const pth = "M " + sx + " " + lane.sy + " Q 400 " + (lane.sy - 30) + " " + ex + " " + lane.ey;
                    return e.jsxs("g", { key: "jav_lane_" + idx, children: [
                      e.jsx("path", {
                        d: pth,
                        stroke: "#78350f",
                        strokeWidth: "4.2",
                        strokeDasharray: "55 500",
                        strokeLinecap: "round",
                        fill: "none",
                        style: { animation: "bt_javelin_spin 0.45s cubic-bezier(0.16, 1, 0.3, 1) " + lane.d + " forwards" }
                      }),
                      e.jsx("path", {
                        d: pth,
                        stroke: "#f8fafc",
                        strokeWidth: "2.6",
                        strokeDasharray: "20 535",
                        strokeLinecap: "round",
                        fill: "none",
                        style: { animation: "bt_javelin_spin 0.45s cubic-bezier(0.16, 1, 0.3, 1) " + lane.d + " forwards" }
                      }),
                      e.jsx("circle", {
                        cx: ex,
                        cy: lane.ey,
                        r: "24",
                        fill: "rgba(254,240,138,0.8)",
                        stroke: "#f59e0b",
                        strokeWidth: "2.5",
                        style: { animation: "bt_shockwave_ring 0.35s 0.28s ease-out forwards" }
                      })
                    ]});
                  })
                ]
              }),

              // 3. BRONZE ROSTRUM RAM & DIEKPLOUS COLLISION
              (activeCombatFX && (activeCombatFX.type === "ram_impact" || activeCombatFX.type === "ram_charge")) && e.jsxs("g", {
                id: "fx-bronze-rostrum-ram-collision",
                transform: "translate(" + (activeCombatFX.isPlayer ? 165 : 635) + ", 215)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "55", fill: "rgba(251,191,36,0.4)", stroke: "#f59e0b", strokeWidth: "4", style: { animation: "bt_shockwave_ring 0.45s ease-out forwards" } }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "85", fill: "none", stroke: "#fef08a", strokeWidth: "2.5", opacity: "0.85", style: { animation: "bt_shockwave_ring 0.55s 0.08s ease-out forwards" } }),
                  [-40, -20, 0, 20, 40].map((deg, i) => e.jsx("line", {
                    key: "splinter_" + i,
                    x1: "0",
                    y1: "0",
                    x2: Math.cos(deg * Math.PI / 180) * 50,
                    y2: Math.sin(deg * Math.PI / 180) * 50,
                    stroke: "#78350f",
                    strokeWidth: "3.2",
                    strokeLinecap: "round"
                  })),
                  e.jsx("polygon", {
                    points: activeCombatFX.isPlayer ? "20,-14 55,0 20,14" : "-20,-14 -55,0 -20,14",
                    fill: "#fef08a",
                    stroke: "#b45309",
                    strokeWidth: "2"
                  })
                ]
              }),

              // 4. CORVUS BOARDING ASSAULT & HARPAX GRAPPLE
              (activeCombatFX && (activeCombatFX.type === "corvus_boarding" || activeCombatFX.type === "grapple_hook")) && e.jsxs("g", {
                id: "fx-corvus-boarding-bridge",
                children: [
                  e.jsxs("g", {
                    transform: "translate(" + (activeCombatFX.isPlayer ? 320 : 480) + ", 215)",
                    style: { animation: "bt_corvus_drop 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards" },
                    children: [
                      e.jsx("rect", { x: "-80", y: "-14", width: "160", height: "28", fill: "#573012", stroke: "#f59e0b", strokeWidth: "2.5", rx: "3" }),
                      e.jsx("line", { x1: "-80", y1: "-14", x2: "80", y2: "-14", stroke: "#b45309", strokeWidth: "2" }),
                      e.jsx("line", { x1: "-80", y1: "14", x2: "80", y2: "14", stroke: "#b45309", strokeWidth: "2" }),
                      e.jsx("polygon", { points: "70,-12 100,0 70,12", fill: "#f1f5f9", stroke: "#0f172a", strokeWidth: "2" }),
                      e.jsx("line", { x1: "-70", y1: "-22", x2: "-40", y2: "-14", stroke: "#94a3b8", strokeWidth: "3.5", strokeDasharray: "4 2" })
                    ]
                  }),
                  e.jsx("circle", {
                    cx: activeCombatFX.isPlayer ? 220 : 580,
                    cy: "215",
                    r: "42",
                    fill: "rgba(245,158,11,0.45)",
                    stroke: "#fbbf24",
                    strokeWidth: "3",
                    style: { animation: "bt_shockwave_ring 0.4s 0.2s ease-out forwards" }
                  })
                ]
              }),

              // 5. BEAST CLAW / FANG / GORE SWIPE
              (activeCombatFX && (activeCombatFX.type === "beast_claw" || activeCombatFX.type === "claw_slash")) && e.jsxs("g", {
                id: "fx-beast-claw-swipe",
                transform: "translate(" + (activeCombatFX.isPlayer ? 180 : 620) + ", 215)",
                children: [
                  [-20, 0, 20].map((offsetY, i) => e.jsx("path", {
                    key: "claw_" + i,
                    d: "M -40 " + (offsetY - 30) + " Q 0 " + offsetY + " 40 " + (offsetY + 30),
                    stroke: "#dc2626",
                    strokeWidth: "7",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "140",
                    style: { animation: "bt_claw_swipe 0.45s ease-out forwards" }
                  })),
                  [-20, 0, 20].map((offsetY, i) => e.jsx("path", {
                    key: "claw_edge_" + i,
                    d: "M -40 " + (offsetY - 30) + " Q 0 " + offsetY + " 40 " + (offsetY + 30),
                    stroke: "#fecaca",
                    strokeWidth: "2.6",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "140",
                    style: { animation: "bt_claw_swipe 0.45s ease-out forwards" }
                  })),
                  e.jsx("circle", { cx: "0", cy: "0", r: "35", fill: "rgba(220,38,38,0.6)", style: { animation: "bt_blood_splatter 0.4s ease-out forwards" } })
                ]
              }),

              // 6. GLADIUS DECISIVE CLEAVE & SWORD SLASH
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
                    style: { animation: "bt_gladius_cleave 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards" }
                  }),
                  e.jsx("path", {
                    d: "M -55,-45 Q 0,0 55,45",
                    stroke: "#ffffff",
                    strokeWidth: "3",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "160",
                    style: { animation: "bt_gladius_cleave 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards" }
                  }),
                  [0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => e.jsx("line", {
                    key: "gladius_spark_" + i,
                    x1: "0",
                    y1: "0",
                    x2: Math.cos(ang * Math.PI / 180) * 28,
                    y2: Math.sin(ang * Math.PI / 180) * 28,
                    stroke: "#fbbf24",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                  })),
                  e.jsx("circle", { cx: "0", cy: "0", r: "20", fill: "rgba(254,240,138,0.7)", style: { animation: "bt_shockwave_ring 0.35s ease-out forwards" } })
                ]
              }),

              // 7. GREEK FIRE SPRAY / INCENDIARY CATAPULT
              (activeCombatFX && (activeCombatFX.type === "fire_spray" || activeCombatFX.type === "ignis")) && e.jsxs("g", {
                id: "fx-greek-fire-incendiary-jet",
                children: [
                  e.jsx("path", {
                    d: activeCombatFX.isPlayer ? "M 580 215 Q 400 170 180 215" : "M 180 215 Q 400 170 580 215",
                    stroke: "url(#bt_fire_trail)",
                    strokeWidth: "10",
                    strokeDasharray: "120 400",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_greek_fire_jet 0.52s ease-out forwards" }
                  }),
                  [ { x: 0, y: 0, r: 38 }, { x: -18, y: -22, r: 28 }, { x: 18, y: 18, r: 32 } ].map((pos, i) => e.jsx("circle", {
                    key: "fire_burst_" + i,
                    cx: (activeCombatFX.isPlayer ? 180 : 580) + pos.x,
                    cy: 215 + pos.y,
                    r: pos.r,
                    fill: "rgba(249,115,22,0.75)",
                    stroke: "#fef08a",
                    strokeWidth: "2.5",
                    style: { animation: "bt_shockwave_ring 0.45s " + (i * 0.08) + "s ease-out forwards" }
                  }))
                ]
              }),

              // 8. OAR SHEAR CUTTING BLADE
              (activeCombatFX && activeCombatFX.type === "oar_shear") && e.jsxs("g", {
                id: "fx-oar-shear-shatter",
                transform: "translate(" + (activeCombatFX.isPlayer ? 170 : 630) + ", 215)",
                children: [
                  e.jsx("path", {
                    d: "M -45,-45 L 45,45",
                    stroke: "#fbbf24",
                    strokeWidth: "8",
                    strokeLinecap: "round",
                    style: { animation: "bt_claw_swipe 0.4s ease-out forwards" }
                  }),
                  [ -35, -12, 12, 35 ].map((oy, i) => e.jsx("line", {
                    key: "snapped_oar_" + i,
                    x1: "-18",
                    y1: oy,
                    x2: "28",
                    y2: oy + 10,
                    stroke: "#78350f",
                    strokeWidth: "3.5",
                    strokeLinecap: "round"
                  })),
                  e.jsx("circle", { cx: "0", cy: "0", r: "35", fill: "rgba(245,158,11,0.5)", style: { animation: "bt_shockwave_ring 0.35s ease-out forwards" } })
                ]
              }),

              // 9. WAR ELEPHANT TRAMPLE
              (activeCombatFX && activeCombatFX.type === "war_elephant_trample") && e.jsxs("g", {
                id: "fx-elephant-trample-shockwave",
                transform: "translate(" + (activeCombatFX.isPlayer ? 180 : 620) + ", 235)",
                children: [
                  e.jsx("ellipse", { cx: "0", cy: "0", rx: "80", ry: "40", fill: "rgba(180,83,9,0.4)", stroke: "#b45309", strokeWidth: "4.5", style: { animation: "bt_shockwave_ring 0.5s ease-out forwards" } }),
                  e.jsx("ellipse", { cx: "0", cy: "0", rx: "120", ry: "55", fill: "none", stroke: "#fef08a", strokeWidth: "2.5", style: { animation: "bt_shockwave_ring 0.6s 0.08s ease-out forwards" } }),
                  [-50, -20, 20, 50].map((dx, i) => e.jsx("line", {
                    key: "dust_" + i,
                    x1: dx,
                    y1: "0",
                    x2: dx * 1.6,
                    y2: "-30",
                    stroke: "#92400e",
                    strokeWidth: "4",
                    strokeLinecap: "round"
                  }))
                ]
              }),

              // 10. ARTIFACT RETRIBUTION / RADIANT DIVINE BEAM
              (activeCombatFX && (activeCombatFX.type === "retaliation" || activeCombatFX.type === "divine_ray" || activeCombatFX.type === "curse")) && e.jsxs("g", {
                id: "fx-artifact-divine-retribution",
                transform: "translate(" + (activeCombatFX.isPlayer ? 175 : 625) + ", 215)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "65", fill: "rgba(254,240,138,0.35)", stroke: "#fef08a", strokeWidth: "3.5", style: { animation: "bt_divine_retribution 0.6s ease-out forwards" } }),
                  [0, 60, 120, 180, 240, 300].map((ang, i) => e.jsx("line", {
                    key: "div_beam_" + i,
                    x1: "0",
                    y1: "0",
                    x2: Math.cos(ang * Math.PI / 180) * 85,
                    y2: Math.sin(ang * Math.PI / 180) * 85,
                    stroke: "#fef08a",
                    strokeWidth: "4",
                    strokeLinecap: "round"
                  })),
                  e.jsx("circle", { cx: "0", cy: "0", r: "30", fill: "#ffffff", stroke: "#fbbf24", strokeWidth: "2" })
                ]
              }),

              // 11. SHIELD BLOCK IMPACT
              (activeCombatFX && activeCombatFX.type === "block") && e.jsxs("g", {
                id: "fx-shield-block-impact",
                transform: "translate(" + (activeCombatFX.isPlayer ? 175 : 625) + ", 215)",
                children: [
                  e.jsx("rect", {
                    x: "-28",
                    y: "-38",
                    width: "56",
                    height: "76",
                    rx: "8",
                    fill: "rgba(56,189,248,0.3)",
                    stroke: "#38bdf8",
                    strokeWidth: "3.5",
                    style: { animation: "bt_shield_shatter 0.45s ease-out forwards" }
                  }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "16", fill: "#fef08a", stroke: "#b45309", strokeWidth: "2" }),
                  [-60, -30, 0, 30, 60].map((ang, i) => e.jsx("line", {
                    key: "def_spark_" + i,
                    x1: "0",
                    y1: "0",
                    x2: Math.cos(ang * Math.PI / 180) * 45,
                    y2: Math.sin(ang * Math.PI / 180) * 45,
                    stroke: "#38bdf8",
                    strokeWidth: "3",
                    strokeLinecap: "round"
                  }))
                ]
              }),

              // 12. ARTERIAL BLEED / BLOODBURST
              (activeCombatFX && activeCombatFX.type === "bleed") && e.jsxs("g", {
                id: "fx-bleed-bloodburst",
                transform: "translate(" + (activeCombatFX.isPlayer ? 175 : 625) + ", 215)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "42", fill: "rgba(220,38,38,0.7)", style: { animation: "bt_blood_splatter 0.45s ease-out forwards" } }),
                  [-40, -15, 15, 40].map((deg, i) => e.jsx("circle", {
                    key: "blood_drop_" + i,
                    cx: Math.cos(deg * Math.PI / 180) * 35,
                    cy: Math.sin(deg * Math.PI / 180) * 35,
                    r: "6",
                    fill: "#991b1b"
                  }))
                ]
              })
            ]
          }),`;

  bundle = bundle.substring(0, pLayerStart) + comprehensiveMasterworkWeaponLayer + bundle.substring(pClosingGroup + "          }),".length);
  console.log("- Successfully updated Masterwork Weapon Animations Layer.");
}

// 3. UPGRADE DEFENSIVE SHIELD WALLS (FULL ROMAN SCUTUM TESTUDO INTERLOCKING WALL)
const pAegisStart = bundle.indexOf('id: "player-multi-aegis-wall"');
if (pAegisStart !== -1) {
  const pAegisBlockStart = bundle.lastIndexOf("isPlayerDefending", pAegisStart);
  const pAegisBlockEnd = bundle.indexOf("// 4G.", pAegisStart);
  
  const newMasterworkShieldWall = `isPlayerDefending && e.jsxs("g", {
            id: "player-multi-aegis-wall",
            style: { animation: "bt_scutum_wall_pulse 1.8s ease-in-out infinite" },
            children: [
              // Interlocking curved Roman Scutum Wall across All Lanes
              [ { x: 125, y: 115 }, { x: 195, y: 215 }, { x: 125, y: 310 } ].map((pos, idx) => e.jsxs("g", {
                key: "p_scutum_wall_" + idx,
                transform: "translate(" + pos.x + ", " + pos.y + ")",
                children: [
                  // Aura glow
                  e.jsx("rect", { x: "-22", y: "-42", width: "44", height: "84", rx: "8", fill: "rgba(251,191,36,0.25)", stroke: "#fef08a", strokeWidth: "3.5", filter: "drop-shadow(0 0 16px rgba(251,191,36,0.9))" }),
                  // Roman curved tower shield body
                  e.jsx("rect", { x: "-18", y: "-38", width: "36", height: "76", rx: "6", fill: "#991b1b", stroke: "#fbbf24", strokeWidth: "2" }),
                  // Golden Umbo boss with radiating winged fulmen thunderbolts
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1.5" }),
                  e.jsx("path", { d: "M -12 -18 L 0 -10 L 12 -18 M -12 18 L 0 10 L 12 18", fill: "none", stroke: "#fef08a", strokeWidth: "2" }),
                  // Protective bronze barricade beam
                  e.jsx("line", { x1: "-24", y1: "-46", x2: "-24", y2: "46", stroke: "#f59e0b", strokeWidth: "4", strokeLinecap: "round" })
                ]
              }))
            ]
          }),

          isEnemyDefending && e.jsxs("g", {
            id: "enemy-multi-aegis-wall",
            style: { animation: "bt_scutum_wall_pulse 1.8s ease-in-out infinite" },
            children: [
              [ { x: 675, y: 115 }, { x: 605, y: 215 }, { x: 675, y: 310 } ].map((pos, idx) => e.jsxs("g", {
                key: "e_scutum_wall_" + idx,
                transform: "translate(" + pos.x + ", " + pos.y + ")",
                children: [
                  e.jsx("rect", { x: "-22", y: "-42", width: "44", height: "84", rx: "8", fill: "rgba(239,68,68,0.25)", stroke: "#fca5a5", strokeWidth: "3.5", filter: "drop-shadow(0 0 16px rgba(239,68,68,0.9))" }),
                  e.jsx("rect", { x: "-18", y: "-38", width: "36", height: "76", rx: "6", fill: "#450a0a", stroke: "#ef4444", strokeWidth: "2" }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "#f87171", stroke: "#450a0a", strokeWidth: "1.5" }),
                  e.jsx("path", { d: "M -12 -18 L 0 -10 L 12 -18 M -12 18 L 0 10 L 12 18", fill: "none", stroke: "#ef4444", strokeWidth: "2" }),
                  e.jsx("line", { x1: "24", y1: "-46", x2: "24", y2: "46", stroke: "#ef4444", strokeWidth: "4", strokeLinecap: "round" })
                ]
              }))
            ]
          }),

          `;
  bundle = bundle.substring(0, pAegisBlockStart) + newMasterworkShieldWall + bundle.substring(pAegisBlockEnd);
  console.log("- Successfully updated Shield Wall with interlocking Scutum Testudo defense!");
}

// 4. PROGRESSIVE PHYSICAL DAMAGE FOR SHIPS
const targetShipFx = 'id: "status-fx-ship",';
if (!bundle.includes("ship-physical-damage-tier1") && bundle.includes(targetShipFx)) {
  const newShipDamageLayer = `id: "status-fx-ship",
          children: [
            // === REALISTIC PHYSICAL UNIT DAMAGE: BROKEN OARS, SHREDDED SAILS & BURNING TIMBER ===
            (hpPct < 75) && e.jsxs("g", {
              id: "ship-physical-damage-tier1",
              children: [
                [-35, 10, 45].map((ox, i) => e.jsx("line", {
                  key: "broken_oar_" + i,
                  x1: ox,
                  y1: gunwaleY + 12,
                  x2: ox + 18,
                  y2: gunwaleY + 28,
                  stroke: "#451a03",
                  strokeWidth: "2.8",
                  strokeDasharray: "8 4"
                })),
                e.jsx("path", { d: "M -20 " + (gunwaleY + 8) + " L 10 " + (gunwaleY + 14) + " L 0 " + (gunwaleY + 18) + " Z", fill: "#0c0a09" })
              ]
            }),
            (hpPct < 45) && e.jsxs("g", {
              id: "ship-physical-damage-tier2",
              children: [
                e.jsx("path", { d: "M -15 -25 Q -5 -15 -10 -5 Q -2 -15 8 -20", stroke: "#1c1917", strokeWidth: "3.5", fill: "none" }),
                e.jsx("polygon", { points: "0,-30 15,-20 8,-12", fill: "#1c1917" }),
                [-25, 20].map((smkX, i) => e.jsx("circle", {
                  key: "smoke_" + i,
                  cx: smkX,
                  cy: gunwaleY - 6,
                  r: 8 + i * 4,
                  fill: "rgba(87,83,78,0.7)",
                  className: "animate-ping"
                }))
              ]
            }),
            (hpPct < 25) && e.jsxs("g", {
              id: "ship-physical-damage-tier3-catastrophic",
              children: [
                e.jsx("path", { d: "M -40 " + (keelY - 4) + " L 30 " + (keelY - 2) + " L -10 " + (keelY + 8) + " Z", fill: "#0369a1", opacity: "0.85" }),
                e.jsx("path", { d: "M -35 " + gunwaleY + " Q -20 " + (gunwaleY - 35) + " -5 " + gunwaleY + " Q 15 " + (gunwaleY - 40) + " 30 " + gunwaleY + " Z", fill: "url(#grad-greek-fire)", opacity: "0.9", className: "animate-pulse" }),
                [-30, -10, 15, 35].map((cx, i) => e.jsx("circle", {
                  key: "cinder_" + i,
                  cx: cx,
                  cy: gunwaleY - 20 - (i % 2) * 10,
                  r: "2.5",
                  fill: "#fef08a"
                }))
              ]
            }),`;
  bundle = bundle.replace(targetShipFx, newShipDamageLayer);
  console.log("- Successfully injected progressive ship damage: broken oars, holed sails, smoke and fire.");
}

// 5. PROGRESSIVE PHYSICAL DAMAGE FOR LEGIONS
const targetLegionFx = 'id: "status-fx-legion",';
if (!bundle.includes("legion-battle-casualties-tier1") && bundle.includes(targetLegionFx)) {
  const newLegionDamageLayer = `id: "status-fx-legion",
          children: [
            // === REALISTIC PHYSICAL BATTLEFIELD CASUALTIES: BLOOD, FALLEN SOLDIERS, BROKEN SCUTA & DIRT ===
            (hpPct < 75) && e.jsxs("g", {
              id: "legion-battle-casualties-tier1",
              children: [
                e.jsx("ellipse", { cx: "-15", cy: "28", rx: "18", ry: "6", fill: "#7f1d1d", opacity: "0.85" }),
                e.jsx("line", { x1: "-22", y1: "15", x2: "-30", y2: "29", stroke: "#451a03", strokeWidth: "2.6" }),
                e.jsx("line", { x1: "25", y1: "18", x2: "32", y2: "29", stroke: "#451a03", strokeWidth: "2.4" })
              ]
            }),
            (hpPct < 45) && e.jsxs("g", {
              id: "legion-battle-casualties-tier2",
              children: [
                e.jsxs("g", {
                  transform: "translate(-25, 26)",
                  children: [
                    e.jsx("rect", { x: "-12", y: "-4", width: "24", height: "8", rx: "2", fill: tunicRed }),
                    e.jsx("circle", { cx: "-14", cy: "-2", r: "4", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" }),
                    e.jsx("ellipse", { cx: "0", cy: "4", rx: "16", ry: "5", fill: "#991b1b" })
                  ]
                }),
                e.jsxs("g", {
                  transform: "translate(22, 25) rotate(35)",
                  children: [
                    e.jsx("rect", { x: "-7", y: "-12", width: "14", height: "24", rx: "3", fill: shieldColor, stroke: "#000", strokeWidth: "1.2" }),
                    e.jsx("line", { x1: "-7", y1: "-2", x2: "7", y2: "4", stroke: "#000", strokeWidth: "2" }),
                    e.jsx("circle", { cx: "0", cy: "0", r: "3", fill: goldTrim })
                  ]
                })
              ]
            }),
            (hpPct < 25) && e.jsxs("g", {
              id: "legion-battle-casualties-tier3-carnage",
              children: [
                e.jsxs("g", {
                  transform: "translate(15, 27)",
                  children: [
                    e.jsx("rect", { x: "-10", y: "-3", width: "20", height: "6", rx: "2", fill: "#1c1917" }),
                    e.jsx("line", { x1: "-12", y1: "5", x2: "8", y2: "5", stroke: "#f1f5f9", strokeWidth: "2" }),
                    e.jsx("line", { x1: "-12", y1: "2", x2: "-12", y2: "8", stroke: goldTrim, strokeWidth: "2.5" })
                  ]
                }),
                e.jsx("ellipse", { cx: "0", cy: "28", rx: "48", ry: "12", fill: "rgba(153,27,27,0.75)" }),
                e.jsx("path", { d: "M 0 10 Q -6 -15 -2 -30 Q 6 -15 2 10 Z", fill: "rgba(120,53,15,0.7)", className: "animate-pulse" })
              ]
            }),`;
  bundle = bundle.replace(targetLegionFx, newLegionDamageLayer);
  console.log("- Successfully injected battlefield casualties: fallen legionaries, blood pools, broken scuta and dirt.");
}

// 6. VALIDATE AND WRITE
try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, "utf8");
  console.log("SUCCESS: public/assets/index-V33.js transformed & written.");

  const distPath = path.join(__dirname, '../dist/assets/index-V33.js');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, "utf8");
    console.log("SUCCESS: dist/assets/index-V33.js synced.");
  }
} catch (err) {
  console.error("ERR: esbuild transform failed:", err.message);
  process.exit(1);
}
