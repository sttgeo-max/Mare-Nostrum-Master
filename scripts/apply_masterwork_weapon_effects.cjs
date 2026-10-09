const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING MASTERWORK COMBAT CARD WEAPON ANIMATIONS ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

// 1. UPDATE PLAYCARD WEAPON ANIMATION RESOLUTION IN `nm`
// Identify exact weapon animation type from all combat card attributes:
const targetCardWeaponDetection = `      const cid = card.id || "";
      const atype = card.actionType || "";
      const sEffect = card.statusEffect || "";
      let weaponAnim = 'sword_slash';
      if (atype === 'grapple' || cid.includes('grapple') || cid.includes('harpax') || cid.includes('corvus')) {
        weaponAnim = 'grapple_hook';
      } else if (atype === 'shear' || cid.includes('shear') || cid.includes('diekplous')) {
        weaponAnim = 'oar_shear';
      } else if (atype === 'ram' || cid.includes('ram')) {
        weaponAnim = 'ram_impact';
      } else if (atype === 'fire' || sEffect === 'fire' || cid.includes('greek_fire') || cid.includes('onager')) {
        weaponAnim = 'fire_spray';
      } else if (cid.includes('fire_arrow') || cid.includes('ignitae') || (atype === 'volley' && sEffect === 'fire')) {
        weaponAnim = 'fire_arrow';
      } else if (atype === 'poison' || sEffect === 'poison' || cid.includes('venom') || cid.includes('hydra')) {
        weaponAnim = 'poison_spray';
      } else if (atype === 'lifesteal' || sEffect === 'life_steal' || cid.includes('siphon') || cid.includes('sanguine')) {
        weaponAnim = 'life_steal';
      } else if (atype === 'lightning' || sEffect === 'lightning_bolt' || cid.includes('lightning') || cid.includes('jupiter') || cid.includes('fulmen') || cid.includes('tempestas')) {
        weaponAnim = 'lightning_bolt';
      } else if (cid.includes('pilum') || cid.includes('javelin') || cid.includes('plumbatae') || atype === 'javelin' || cid.includes('velites')) {
        weaponAnim = 'javelin_launch';
      } else if (cid.includes('scorpio') || cid.includes('ballista') || atype === 'siege') {
        weaponAnim = 'ballista_shot';
      } else if (cid.includes('archer') || cid.includes('sagittarii') || atype === 'volley') {
        weaponAnim = 'arrow_fire';
      } else {
        weaponAnim = 'sword_slash';
      }`;

const newCardWeaponDetection = `      const cid = (card.id || "").toLowerCase();
      const atype = (card.actionType || "").toLowerCase();
      const cname = (card.name || "").toLowerCase();
      const sEffect = (card.statusEffect || "").toLowerCase();
      const kw = (card.keywords || []).map(k => String(k).toLowerCase());
      
      let weaponAnim = 'sword_slash';
      if (atype === 'corvus' || cid.includes('corvus') || cname.includes('corvus') || kw.includes('corvus') || kw.includes('boarding')) {
        weaponAnim = 'corvus_boarding';
      } else if (atype === 'grapple' || cid.includes('grapple') || cid.includes('harpax') || cname.includes('harpax') || kw.includes('grapple')) {
        weaponAnim = 'grapple_hook';
      } else if (atype === 'shear' || cid.includes('shear') || cid.includes('diekplous') || cname.includes('shear') || kw.includes('shear')) {
        weaponAnim = 'oar_shear';
      } else if (atype === 'ram' || cid.includes('ram') || cname.includes('ram') || kw.includes('ram') || cid.includes('cutwater') || cid.includes('cathead')) {
        weaponAnim = 'ram_impact';
      } else if (atype === 'claw' || cid.includes('claw') || cname.includes('claw') || cid.includes('beast') || cid.includes('fang') || cid.includes('bite') || cid.includes('pounce') || cid.includes('gore') || kw.includes('beast')) {
        weaponAnim = 'beast_claw';
      } else if (atype === 'fire' || sEffect === 'fire' || cid.includes('greek_fire') || cid.includes('onager') || cname.includes('ignis') || cname.includes('fire')) {
        weaponAnim = 'fire_spray';
      } else if (cid.includes('fire_arrow') || cid.includes('ignitae') || (atype === 'volley' && sEffect === 'fire') || cname.includes('fire arrow')) {
        weaponAnim = 'fire_arrow';
      } else if (atype === 'poison' || sEffect === 'poison' || cid.includes('venom') || cid.includes('hydra') || cname.includes('toxic') || cname.includes('venom')) {
        weaponAnim = 'poison_spray';
      } else if (atype === 'lifesteal' || sEffect === 'life_steal' || cid.includes('siphon') || cid.includes('sanguine') || cname.includes('siphon')) {
        weaponAnim = 'life_steal';
      } else if (atype === 'lightning' || sEffect === 'lightning_bolt' || cid.includes('lightning') || cid.includes('jupiter') || cid.includes('fulmen') || cid.includes('tempestas')) {
        weaponAnim = 'lightning_bolt';
      } else if (cid.includes('pilum') || cid.includes('javelin') || cid.includes('plumbatae') || atype === 'javelin' || cid.includes('velites') || cname.includes('pilum') || cname.includes('javelin') || cname.includes('dart')) {
        weaponAnim = 'javelin_launch';
      } else if (cid.includes('scorpio') || cid.includes('ballista') || atype === 'siege' || cname.includes('ballista') || cname.includes('scorpio') || cname.includes('bolt')) {
        weaponAnim = 'ballista_shot';
      } else if (cid.includes('archer') || cid.includes('sagittarii') || atype === 'volley' || cname.includes('archer') || cname.includes('salvo') || cname.includes('arrow')) {
        weaponAnim = 'arrow_fire';
      } else if (cid.includes('elephant') || cname.includes('elephant') || atype === 'trample') {
        weaponAnim = 'war_elephant_trample';
      } else {
        weaponAnim = 'sword_slash';
      }`;

if (bundle.includes(targetCardWeaponDetection)) {
  bundle = bundle.replace(targetCardWeaponDetection, newCardWeaponDetection);
  console.log("- Updated tactical card weaponAnim detection with comprehensive classifications (arrows, javelin, ram, boarding, claw, etc.).");
} else {
  console.error("ERROR: targetCardWeaponDetection not found!");
}

// 2. UPDATE AUDIO DISPATCH IN PLAYCARD FOR NEW WEAPON TYPES
const targetAudioDispatch = `      if (weaponAnim === 'arrow_fire') {
        try { if (typeof v !== 'undefined' && v.playArrowSalvo) v.playArrowSalvo(); } catch(e){}
      } else if (weaponAnim === 'fire_arrow') {
        try { if (typeof v !== 'undefined' && v.playArrowSalvo) v.playArrowSalvo(); } catch(e){}
      } else if (weaponAnim === 'javelin_launch') {
        try { if (typeof v !== 'undefined' && v.playPilumBarrage) v.playPilumBarrage(); } catch(e){}
      } else if (weaponAnim === 'ballista_shot') {
        try { if (typeof v !== 'undefined' && v.playArrowSalvo) v.playArrowSalvo(); } catch(e){}
      } else if (weaponAnim === 'fire_spray') {
        try { if (typeof v !== 'undefined' && v.playGreekFire) v.playGreekFire(); } catch(e){}
      } else if (weaponAnim === 'grapple_hook') {
        try { if (typeof v !== 'undefined' && v.playGrappleThrow) v.playGrappleThrow(); } catch(e){}
      } else if (weaponAnim === 'oar_shear') {
        try { if (typeof v !== 'undefined' && v.playOarSheerSnap) v.playOarSheerSnap(); } catch(e){}
      } else if (weaponAnim === 'ram_impact') {
        setPlayerAnim('ram');
        try { if (typeof v !== 'undefined' && v.playNavalRamming) v.playNavalRamming(); } catch(e){}
      } else if (weaponAnim === 'poison_spray') {
        try { if (typeof v !== 'undefined' && v.playPoisonHiss) v.playPoisonHiss(); } catch(e){}
      } else if (weaponAnim === 'life_steal') {
        try { if (typeof v !== 'undefined' && v.playLifeStealSiphon) v.playLifeStealSiphon(); } catch(e){}
      } else if (weaponAnim === 'lightning_bolt') {
        try { if (typeof v !== 'undefined' && v.playFulmenShock) v.playFulmenShock(); } catch(e){}
      } else {
        try { if (typeof v !== 'undefined' && v.playGladiusClash) v.playGladiusClash(); } catch(e){}
      }`;

const newAudioDispatch = `      if (weaponAnim === 'arrow_fire' || weaponAnim === 'fire_arrow') {
        try { if (typeof v !== 'undefined' && v.playArrowSalvo) v.playArrowSalvo(); } catch(e){}
      } else if (weaponAnim === 'javelin_launch') {
        try { if (typeof v !== 'undefined' && v.playPilumBarrage) v.playPilumBarrage(); } catch(e){}
      } else if (weaponAnim === 'ballista_shot') {
        try { if (typeof v !== 'undefined' && v.playArrowSalvo) v.playArrowSalvo(); } catch(e){}
      } else if (weaponAnim === 'corvus_boarding') {
        setPlayerAnim('attack');
        try { if (typeof v !== 'undefined' && v.playGrappleThrow) v.playGrappleThrow(); } catch(e){}
      } else if (weaponAnim === 'beast_claw') {
        setPlayerAnim('attack');
        try { if (typeof v !== 'undefined' && v.playGladiusClash) v.playGladiusClash(); } catch(e){}
      } else if (weaponAnim === 'war_elephant_trample') {
        setPlayerAnim('ram');
        try { if (typeof v !== 'undefined' && v.playNavalRamming) v.playNavalRamming(); } catch(e){}
      } else if (weaponAnim === 'fire_spray') {
        try { if (typeof v !== 'undefined' && v.playGreekFire) v.playGreekFire(); } catch(e){}
      } else if (weaponAnim === 'grapple_hook') {
        try { if (typeof v !== 'undefined' && v.playGrappleThrow) v.playGrappleThrow(); } catch(e){}
      } else if (weaponAnim === 'oar_shear') {
        try { if (typeof v !== 'undefined' && v.playOarSheerSnap) v.playOarSheerSnap(); } catch(e){}
      } else if (weaponAnim === 'ram_impact') {
        setPlayerAnim('ram');
        try { if (typeof v !== 'undefined' && v.playNavalRamming) v.playNavalRamming(); } catch(e){}
      } else if (weaponAnim === 'poison_spray') {
        try { if (typeof v !== 'undefined' && v.playPoisonHiss) v.playPoisonHiss(); } catch(e){}
      } else if (weaponAnim === 'life_steal') {
        try { if (typeof v !== 'undefined' && v.playLifeStealSiphon) v.playLifeStealSiphon(); } catch(e){}
      } else if (weaponAnim === 'lightning_bolt') {
        try { if (typeof v !== 'undefined' && v.playFulmenShock) v.playFulmenShock(); } catch(e){}
      } else {
        try { if (typeof v !== 'undefined' && v.playGladiusClash) v.playGladiusClash(); } catch(e){}
      }`;

if (bundle.includes(targetAudioDispatch)) {
  bundle = bundle.replace(targetAudioDispatch, newAudioDispatch);
  console.log("- Updated audio/SFX dispatch for all card weapon animations.");
} else {
  console.error("ERROR: targetAudioDispatch not found!");
}

// 3. INJECT MASTERWORK KEYFRAMES INTO BattleTheatreV2 SVG STYLE
const targetKeyframeSearch = "@keyframes bt_star_twinkle {";
const newKeyframes = `@keyframes bt_arrow_flight {
                0% { stroke-dashoffset: 600; opacity: 0; }
                8% { opacity: 1; }
                85% { stroke-dashoffset: 0; opacity: 1; }
                100% { stroke-dashoffset: -120; opacity: 0; }
              }
              @keyframes bt_javelin_spin {
                0% { stroke-dashoffset: 500; opacity: 0; transform: scaleY(1); }
                10% { opacity: 1; }
                80% { stroke-dashoffset: 0; opacity: 1; }
                100% { stroke-dashoffset: -100; opacity: 0; }
              }
              @keyframes bt_ram_surge {
                0% { transform: translateX(0); }
                40% { transform: translateX(55px); }
                65% { transform: translateX(65px); }
                100% { transform: translateX(0); }
              }
              @keyframes bt_corvus_drop {
                0% { transform: rotate(-75deg); opacity: 0; }
                15% { opacity: 1; }
                60% { transform: rotate(0deg); opacity: 1; }
                85% { transform: rotate(0deg); opacity: 0.9; }
                100% { transform: rotate(-10deg); opacity: 0; }
              }
              @keyframes bt_claw_swipe {
                0% { stroke-dashoffset: 120; opacity: 0; transform: scale(0.6) rotate(-15deg); }
                20% { opacity: 1; stroke-dashoffset: 0; transform: scale(1.1) rotate(0deg); }
                80% { opacity: 1; transform: scale(1.0) rotate(5deg); }
                100% { opacity: 0; transform: scale(0.95); }
              }
              @keyframes bt_grapple_hurl {
                0% { stroke-dashoffset: 400; opacity: 0; }
                15% { opacity: 1; }
                75% { stroke-dashoffset: 0; opacity: 1; }
                100% { stroke-dashoffset: -60; opacity: 0; }
              }
              @keyframes bt_greek_fire_jet {
                0% { stroke-dashoffset: 350; opacity: 0; }
                10% { opacity: 0.9; }
                50% { stroke-dashoffset: 0; opacity: 1; }
                85% { opacity: 0.8; }
                100% { stroke-dashoffset: -100; opacity: 0; }
              }
              @keyframes bt_shockwave_ring {
                0% { r: 5; opacity: 1; stroke-width: 6; }
                100% { r: 65; opacity: 0; stroke-width: 0.5; }
              }
              @keyframes bt_star_twinkle {`;

if (bundle.includes(targetKeyframeSearch)) {
  bundle = bundle.replace(targetKeyframeSearch, newKeyframes);
  console.log("- Injected Masterwork Keyframes for arrow, javelin, ram, corvus boarding, beast claw, grapple, and Greek fire.");
} else {
  console.error("ERROR: targetKeyframeSearch not found!");
}

// 4. INJECT COMPREHENSIVE MASTERWORK WEAPON OVERLAYS LAYER INTO BattleTheatreV2 SVG
// Right before `floatingText.map(ft =>` inside BattleTheatreV2 SVG children:
const targetSvgChildrenEnd = `            style: {
              background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)"
            }
          })
        ]
      }),`;

const masterworkWeaponVisualLayer = `            style: {
              background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)"
            }
          }),
          
          // =========================================================================
          // === MASTERWORK WEAPON VISUAL EFFECTS LAYER (COMBAT CARDS & ABILITIES) ===
          // =========================================================================
          e.jsxs("g", {
            id: "masterwork-weapon-animations-layer",
            className: "pointer-events-none select-none",
            children: [
              // 1. ARROW SALVO / SAGITTARII FIRE
              (activeCombatFX && (activeCombatFX.type === "arrow_fire" || activeCombatFX.type === "fire_arrow" || activeCombatFX.type === "arrow_fire_travel")) && e.jsxs("g", {
                id: "fx-arrow-salvo-flight",
                children: [
                  // Three staggered archer trajectory paths
                  [ { sy: 115, ey: 118, arc: 45, d: "0s" }, { sy: 215, ey: 215, arc: 125, d: "0.06s" }, { sy: 310, ey: 312, arc: 240, d: "0.12s" } ].map((lane, idx) => {
                    const isFire = activeCombatFX.type === "fire_arrow";
                    const sx = activeCombatFX.isPlayer ? 635 : 165;
                    const ex = activeCombatFX.isPlayer ? 165 : 635;
                    const pth = "M " + sx + " " + lane.sy + " Q 400 " + lane.arc + " " + ex + " " + lane.ey;
                    return e.jsxs("g", { key: "arr_lane_" + idx, children: [
                      // Arrow flight streak
                      e.jsx("path", {
                        d: pth,
                        stroke: isFire ? "#f97316" : "#fef08a",
                        strokeWidth: isFire ? "3.5" : "2.2",
                        strokeDasharray: "45 600",
                        strokeLinecap: "round",
                        fill: "none",
                        style: { animation: "bt_arrow_flight 0.48s cubic-bezier(0.2, 0.6, 0.35, 1) " + lane.d + " forwards" }
                      }),
                      // Luminous head projectile
                      e.jsx("path", {
                        d: pth,
                        stroke: "#ffffff",
                        strokeWidth: "1.4",
                        strokeDasharray: "18 627",
                        strokeLinecap: "round",
                        fill: "none",
                        style: { animation: "bt_arrow_flight 0.48s cubic-bezier(0.2, 0.6, 0.35, 1) " + lane.d + " forwards" }
                      }),
                      // Fiery embers for fire arrow
                      isFire && e.jsx("circle", {
                        cx: ex,
                        cy: lane.ey,
                        r: "16",
                        fill: "rgba(249,115,22,0.6)",
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
                      // Lead weighted Roman Pilum Spear
                      e.jsx("path", {
                        d: pth,
                        stroke: "#78350f",
                        strokeWidth: "3.8",
                        strokeDasharray: "55 500",
                        strokeLinecap: "round",
                        fill: "none",
                        style: { animation: "bt_javelin_spin 0.45s cubic-bezier(0.16, 1, 0.3, 1) " + lane.d + " forwards" }
                      }),
                      // Barbed Steel Tip
                      e.jsx("path", {
                        d: pth,
                        stroke: "#f8fafc",
                        strokeWidth: "2.4",
                        strokeDasharray: "20 535",
                        strokeLinecap: "round",
                        fill: "none",
                        style: { animation: "bt_javelin_spin 0.45s cubic-bezier(0.16, 1, 0.3, 1) " + lane.d + " forwards" }
                      }),
                      // Armor-piercing impact flash
                      e.jsx("circle", {
                        cx: ex,
                        cy: lane.ey,
                        r: "22",
                        fill: "rgba(254,240,138,0.75)",
                        stroke: "#f59e0b",
                        strokeWidth: "2",
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
                  // Massive kinetic shockwave blast rings
                  e.jsx("circle", { cx: "0", cy: "0", r: "50", fill: "rgba(251,191,36,0.35)", stroke: "#f59e0b", strokeWidth: "3.5", style: { animation: "bt_shockwave_ring 0.45s ease-out forwards" } }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "80", fill: "none", stroke: "#fef08a", strokeWidth: "2", opacity: "0.85", style: { animation: "bt_shockwave_ring 0.55s 0.08s ease-out forwards" } }),
                  // Timber splinter bursts
                  [-40, -20, 0, 20, 40].map((deg, i) => e.jsx("line", {
                    key: "splinter_" + i,
                    x1: "0",
                    y1: "0",
                    x2: Math.cos(deg * Math.PI / 180) * 45,
                    y2: Math.sin(deg * Math.PI / 180) * 45,
                    stroke: "#78350f",
                    strokeWidth: "2.8",
                    strokeLinecap: "round"
                  })),
                  // Forward ram thrust graphic
                  e.jsx("polygon", {
                    points: activeCombatFX.isPlayer ? "20,-12 50,0 20,12" : "-20,-12 -50,0 -20,12",
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
                  // Heavy spiked iron bridge slamming down connecting player & enemy line
                  e.jsxs("g", {
                    transform: "translate(" + (activeCombatFX.isPlayer ? 320 : 480) + ", 215)",
                    style: { animation: "bt_corvus_drop 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards" },
                    children: [
                      // Heavy wooden walkway
                      e.jsx("rect", { x: "-80", y: "-12", width: "160", height: "24", fill: "#573012", stroke: "#f59e0b", strokeWidth: "2", rx: "3" }),
                      // Gangway railings
                      e.jsx("line", { x1: "-80", y1: "-12", x2: "80", y2: "-12", stroke: "#b45309", strokeWidth: "2" }),
                      e.jsx("line", { x1: "-80", y1: "12", x2: "80", y2: "12", stroke: "#b45309", strokeWidth: "2" }),
                      // Giant downward iron Corvus beak spike (Picus)
                      e.jsx("polygon", { points: "70,-10 95,0 70,10", fill: "#f1f5f9", stroke: "#0f172a", strokeWidth: "1.5" }),
                      // Iron chain lashings
                      e.jsx("line", { x1: "-70", y1: "-22", x2: "-40", y2: "-12", stroke: "#94a3b8", strokeWidth: "3", strokeDasharray: "4 2" })
                    ]
                  }),
                  // Impact clamp shockwave on target
                  e.jsx("circle", {
                    cx: activeCombatFX.isPlayer ? 220 : 580,
                    cy: "215",
                    r: "38",
                    fill: "rgba(245,158,11,0.4)",
                    stroke: "#fbbf24",
                    strokeWidth: "2.5",
                    style: { animation: "bt_shockwave_ring 0.4s 0.2s ease-out forwards" }
                  })
                ]
              }),

              // 5. BEAST CLAW / FANG / GORE SWIPE
              (activeCombatFX && (activeCombatFX.type === "beast_claw" || activeCombatFX.type === "claw_slash")) && e.jsxs("g", {
                id: "fx-beast-claw-swipe",
                transform: "translate(" + (activeCombatFX.isPlayer ? 180 : 620) + ", 215)",
                children: [
                  // Three deep bloody razor slash curves
                  [-18, 0, 18].map((offsetY, i) => e.jsx("path", {
                    key: "claw_" + i,
                    d: "M -35 " + (offsetY - 25) + " Q 0 " + offsetY + " 35 " + (offsetY + 25),
                    stroke: "#ef4444",
                    strokeWidth: "6",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "120",
                    style: { animation: "bt_claw_swipe 0.45s ease-out forwards" }
                  })),
                  // White inner sharp edge
                  [-18, 0, 18].map((offsetY, i) => e.jsx("path", {
                    key: "claw_edge_" + i,
                    d: "M -35 " + (offsetY - 25) + " Q 0 " + offsetY + " 35 " + (offsetY + 25),
                    stroke: "#fecaca",
                    strokeWidth: "2.2",
                    strokeLinecap: "round",
                    fill: "none",
                    strokeDasharray: "120",
                    style: { animation: "bt_claw_swipe 0.45s ease-out forwards" }
                  })),
                  // Crimson gore blood spatter
                  e.jsx("circle", { cx: "0", cy: "0", r: "28", fill: "rgba(239,68,68,0.5)", style: { animation: "bt_shockwave_ring 0.35s ease-out forwards" } })
                ]
              }),

              // 6. GREEK FIRE SPRAY / INCENDIARY CATAPULT
              (activeCombatFX && (activeCombatFX.type === "fire_spray" || activeCombatFX.type === "ignis")) && e.jsxs("g", {
                id: "fx-greek-fire-incendiary-jet",
                children: [
                  // Jet of naptha / liquid Greek fire from siphon across sea
                  e.jsx("path", {
                    d: activeCombatFX.isPlayer ? "M 580 215 Q 400 170 180 215" : "M 180 215 Q 400 170 580 215",
                    stroke: "url(#bt_fire_trail)",
                    strokeWidth: "9",
                    strokeDasharray: "120 400",
                    strokeLinecap: "round",
                    fill: "none",
                    style: { animation: "bt_greek_fire_jet 0.52s ease-out forwards" }
                  }),
                  // Flaming bursts on target hull
                  [ { x: 0, y: 0, r: 35 }, { x: -15, y: -20, r: 25 }, { x: 15, y: 15, r: 28 } ].map((pos, i) => e.jsx("circle", {
                    key: "fire_burst_" + i,
                    cx: (activeCombatFX.isPlayer ? 180 : 580) + pos.x,
                    cy: 215 + pos.y,
                    r: pos.r,
                    fill: "rgba(249,115,22,0.7)",
                    stroke: "#fef08a",
                    strokeWidth: "2",
                    style: { animation: "bt_shockwave_ring 0.45s " + (i * 0.08) + "s ease-out forwards" }
                  }))
                ]
              }),

              // 7. OAR SHEAR CUTTING BLADE
              (activeCombatFX && activeCombatFX.type === "oar_shear") && e.jsxs("g", {
                id: "fx-oar-shear-shatter",
                transform: "translate(" + (activeCombatFX.isPlayer ? 170 : 630) + ", 215)",
                children: [
                  // Shearing blade cutting across oar line
                  e.jsx("path", {
                    d: "M -40,-40 L 40,40",
                    stroke: "#fbbf24",
                    strokeWidth: "7",
                    strokeLinecap: "round",
                    style: { animation: "bt_claw_swipe 0.4s ease-out forwards" }
                  }),
                  // Snapped oar fragments flying
                  [ -30, -10, 10, 30 ].map((oy, i) => e.jsx("line", {
                    key: "snapped_oar_" + i,
                    x1: "-15",
                    y1: oy,
                    x2: "25",
                    y2: oy + 8,
                    stroke: "#78350f",
                    strokeWidth: "3",
                    strokeLinecap: "round"
                  })),
                  e.jsx("circle", { cx: "0", cy: "0", r: "30", fill: "rgba(245,158,11,0.45)", style: { animation: "bt_shockwave_ring 0.35s ease-out forwards" } })
                ]
              }),

              // 8. WAR ELEPHANT TRAMPLE
              (activeCombatFX && activeCombatFX.type === "war_elephant_trample") && e.jsxs("g", {
                id: "fx-elephant-trample-shockwave",
                transform: "translate(" + (activeCombatFX.isPlayer ? 180 : 620) + ", 235)",
                children: [
                  e.jsx("ellipse", { cx: "0", cy: "0", rx: "75", ry: "35", fill: "rgba(180,83,9,0.35)", stroke: "#b45309", strokeWidth: "4", style: { animation: "bt_shockwave_ring 0.5s ease-out forwards" } }),
                  e.jsx("ellipse", { cx: "0", cy: "0", rx: "110", ry: "50", fill: "none", stroke: "#fef08a", strokeWidth: "2", style: { animation: "bt_shockwave_ring 0.6s 0.08s ease-out forwards" } }),
                  // Dust & cracked earth lines
                  [-45, -15, 15, 45].map((dx, i) => e.jsx("line", {
                    key: "dust_" + i,
                    x1: dx,
                    y1: "0",
                    x2: dx * 1.6,
                    y2: "-25",
                    stroke: "#92400e",
                    strokeWidth: "3.5",
                    strokeLinecap: "round"
                  }))
                ]
              })
            ]
          }),
        ]
      }),`;

if (bundle.includes(targetSvgChildrenEnd)) {
  bundle = bundle.replace(targetSvgChildrenEnd, masterworkWeaponVisualLayer);
  console.log("- Successfully mounted Masterwork Weapon Animations Layer directly into the BattleTheatreV2 SVG renderer!");
} else {
  console.error("ERROR: targetSvgChildrenEnd not found!");
}

// 5. VALIDATE WITH ESBUILD AND WRITE
try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, "utf8");
  console.log("SUCCESS: public/assets/index-V33.js validated and updated.");

  const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, "utf8");
    console.log("SUCCESS: dist/assets/index-V33.js synced.");
  }
} catch (err) {
  console.error("ERR: esbuild transform failed on masterwork weapon effects:", err.message);
  process.exit(1);
}
