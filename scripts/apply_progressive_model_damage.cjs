const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING HIGH-FIDELITY PROGRESSIVE MODEL DAMAGE & CARNAGE ===");
const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

const pStart = bundle.indexOf("const render2DSeaMonster =");
const pEnd = bundle.indexOf("const BattleTheatreV2 =");

if (pStart === -1 || pEnd === -1) {
  console.error("Could not find insertion points in bundle!");
  process.exit(1);
}

const newUnitSystem = `const renderMasterwork2DMedallionUnit = (x, y, isPlayer, role = "flagship", faction = "constantine", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1, unitCategory = "ship", customEmblem = "") => {
  const fRawCheck = String(faction || "").toLowerCase();
  const isAnchor = fRawCheck.includes("anchor") || fRawCheck.includes("marinus") || fRawCheck.includes("classis") || fRawCheck.includes("lapis_blue") || fRawCheck.includes("navis");
  const isSol = fRawCheck.includes("sol") || fRawCheck.includes("sun") || fRawCheck.includes("gold") || fRawCheck.includes("civitas");
  const isChiRho = fRawCheck.includes("chi_rho") || fRawCheck.includes("labarum") || fRawCheck.includes("constantine");
  const isAquila = fRawCheck.includes("eagle") || fRawCheck.includes("aquila") || fRawCheck.includes("crimson_blood") || fRawCheck.includes("legio");
  const isTriton = fRawCheck.includes("triton") || fRawCheck.includes("neptune") || fRawCheck.includes("poseidon");
  const isBull = fRawCheck.includes("bull") || fRawCheck.includes("dacia");
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isFlag = role === "flagship" || role === "commander";
  const flip = isPlayer ? 1 : -1;
  const unitTier = Math.min(5, Math.max(1, tier || 1));
  const isNaval = unitCategory === "ship";

  // Comprehensive Faction & Medallion Color Normalization
  const fRaw = String(faction || "").toLowerCase();
  const isPraetorian = fRaw.includes("praetorian") || fRaw.includes("purple") || fRaw.includes("maxentius") || fRaw.includes("amethyst") || fRaw.includes("imperial_purple") || fRaw.includes("praeclarus");
  const isUsurper = fRaw.includes("usurper") || fRaw.includes("licinius") || fRaw.includes("sanguine") || fRaw.includes("crimson") || fRaw.includes("hostis") || fRaw.includes("rubrum") || fRaw.includes("porphyry_red");
  const isPunic = fRaw.includes("punic") || fRaw.includes("carthage") || fRaw.includes("africa") || fRaw.includes("numidia") || fRaw.includes("byzacena") || fRaw.includes("sand_gold") || fRaw.includes("ochre");
  const isGreek = fRaw.includes("greek") || fRaw.includes("hellas") || fRaw.includes("achaea") || fRaw.includes("athen") || fRaw.includes("sparta") || fRaw.includes("macedon") || fRaw.includes("lapis") || fRaw.includes("aegean") || fRaw.includes("sapphire");
  const isEgyptian = fRaw.includes("egypt") || fRaw.includes("aegypt") || fRaw.includes("alexandria") || fRaw.includes("ptolema") || fRaw.includes("turquoise") || fRaw.includes("teal");
  const isBarbarian = fRaw.includes("barb") || fRaw.includes("celt") || fRaw.includes("gaul") || fRaw.includes("germani") || fRaw.includes("vandal") || fRaw.includes("emerald") || fRaw.includes("moss") || fRaw.includes("green") || fRaw.includes("malachite_green");
  const isPirate = fRaw.includes("pirat") || fRaw.includes("corsair") || fRaw.includes("illyria") || fRaw.includes("cilicia") || fRaw.includes("obsidian") || fRaw.includes("black") || fRaw.includes("obsidian_black");
  const isMerchant = fRaw.includes("merchant") || fRaw.includes("neutral") || fRaw.includes("bronze");
  const isConstantine = (!isPraetorian && !isUsurper && !isPunic && !isGreek && !isEgyptian && !isBarbarian && !isPirate && !isMerchant) || fRaw.includes("constantine") || fRaw.includes("roman") || fRaw.includes("player") || fRaw.includes("gold") || fRaw.includes("imperial") || fRaw.includes("civitas") || fRaw.includes("sol_invictus") || fRaw.includes("illustris");

  let sailGrad = "url(#sl_prp_rom)";
  let sailBorder = "#fef08a";
  let scutumGrad = "url(#shd_carm_rom)";
  let scutumBorder = "#fbbf24";
  let scutumEmblemColor = "#fef08a";
  let plumeColor = "#dc2626";
  let hullWoodL = "url(#hl_wd_l_rom)";
  let hullWoodR = "url(#hl_wd_r_rom)";
  let goldTrim = unitTier >= 4 ? "#fef08a" : "#fbbf24";
  let bronzeBase = "#a17e4d";
  let factionInsignia = "SPQR";

  if (isAnchor) {
    sailGrad = "#1e3a8a"; sailBorder = "#bae6fd"; scutumGrad = "#1d4ed8"; scutumBorder = "#60a5fa"; scutumEmblemColor = "#ffffff"; plumeColor = "#2563eb"; hullWoodL = "#1e293b"; hullWoodR = "#334155"; factionInsignia = "CLASS";
  } else if (isSol) {
    sailGrad = "#ea580c"; sailBorder = "#fef08a"; scutumGrad = "#ea580c"; scutumBorder = "#fbbf24"; scutumEmblemColor = "#fef08a"; plumeColor = "#ea580c"; hullWoodL = "#451a03"; hullWoodR = "#78350f"; factionInsignia = "SOL";
  } else if (isChiRho) {
    sailGrad = "#581c87"; sailBorder = "#fde047"; scutumGrad = "#4a044e"; scutumBorder = "#fbbf24"; scutumEmblemColor = "#fde047"; plumeColor = "#9333ea"; hullWoodL = "#3b0764"; hullWoodR = "#581c87"; factionInsignia = "CHRXP";
  } else if (isAquila) {
    sailGrad = "#991b1b"; sailBorder = "#fca5a5"; scutumGrad = "#7f1d1d"; scutumBorder = "#ea580c"; scutumEmblemColor = "#fecaca"; plumeColor = "#b91c1c"; hullWoodL = "#450a0a"; hullWoodR = "#7f1d1d"; factionInsignia = "AQVLA";
  } else if (isTriton) {
    sailGrad = "#0369a1"; sailBorder = "#bae6fd"; scutumGrad = "#0284c7"; scutumBorder = "#38bdf8"; scutumEmblemColor = "#bae6fd"; plumeColor = "#0284c7"; hullWoodL = "#0c4a6e"; hullWoodR = "#075985"; factionInsignia = "TRITN";
  } else if (isBull) {
    sailGrad = "#78350f"; sailBorder = "#fed7aa"; scutumGrad = "#92400e"; scutumBorder = "#fbbf24"; scutumEmblemColor = "#fed7aa"; plumeColor = "#b45309"; hullWoodL = "#292524"; hullWoodR = "#44403c"; factionInsignia = "TAVRS";
  } else if (isPraetorian) {
    sailGrad = "#581c87"; sailBorder = "#fde047"; scutumGrad = "#4a044e"; scutumBorder = "#fbbf24"; scutumEmblemColor = "#fde047"; plumeColor = "#9333ea"; hullWoodL = "#3b0764"; hullWoodR = "#581c87"; factionInsignia = "PRAET";
  } else if (isUsurper) {
    sailGrad = "#991b1b"; sailBorder = "#fca5a5"; scutumGrad = "#7f1d1d"; scutumBorder = "#ea580c"; scutumEmblemColor = "#fecaca"; plumeColor = "#b91c1c"; hullWoodL = "#450a0a"; hullWoodR = "#7f1d1d"; factionInsignia = "HOSTIS";
  } else if (isPunic) {
    sailGrad = "#701a75"; sailBorder = "#fde047"; scutumGrad = "#581c87"; scutumBorder = "#f59e0b"; scutumEmblemColor = "#fef08a"; plumeColor = "#701a75"; hullWoodL = "#3b0764"; hullWoodR = "#581c87"; factionInsignia = "TANIT";
  } else if (isGreek) {
    sailGrad = "#1e40af"; sailBorder = "#93c5fd"; scutumGrad = "#1d4ed8"; scutumBorder = "#60a5fa"; scutumEmblemColor = "#ffffff"; plumeColor = "#2563eb"; hullWoodL = "#1e293b"; hullWoodR = "#334155"; factionInsignia = "ATHEN";
  } else if (isEgyptian) {
    sailGrad = "#0d9488"; sailBorder = "#fef08a"; scutumGrad = "#0f766e"; scutumBorder = "#f59e0b"; scutumEmblemColor = "#fef08a"; plumeColor = "#06b6d4"; hullWoodL = "#78350f"; hullWoodR = "#92400e"; factionInsignia = "RA";
  } else if (isBarbarian) {
    sailGrad = "#14532d"; sailBorder = "#86efac"; scutumGrad = "#166534"; scutumBorder = "#a3e635"; scutumEmblemColor = "#d9f99d"; plumeColor = "#15803d"; hullWoodL = "#291807"; hullWoodR = "#45240c"; factionInsignia = "CELT";
  } else if (isPirate) {
    sailGrad = "#0f172a"; sailBorder = "#ef4444"; scutumGrad = "#1e1b4b"; scutumBorder = "#dc2626"; scutumEmblemColor = "#fca5a5"; plumeColor = "#020617"; hullWoodL = "#09090b"; hullWoodR = "#18181b"; factionInsignia = "MORS";
  } else if (isMerchant) {
    sailGrad = "#b45309"; sailBorder = "#fde047"; scutumGrad = "#92400e"; scutumBorder = "#fbbf24"; scutumEmblemColor = "#fef08a"; plumeColor = "#d97706"; hullWoodL = "#451a03"; hullWoodR = "#78350f"; factionInsignia = "NAVIS";
  } else {
    sailGrad = unitTier >= 4 ? "url(#sl_prp_rom)" : "#991b1b"; sailBorder = "#fef08a"; scutumGrad = "url(#shd_carm_rom)"; scutumBorder = "#fbbf24"; scutumEmblemColor = "#fef08a"; plumeColor = "#dc2626"; hullWoodL = "url(#hl_wd_l_rom)"; hullWoodR = "url(#hl_wd_r_rom)"; factionInsignia = "SPQR";
  }
  const armorSteel = "url(#lgn_arm_rom)";
  const takesHit = isHit || animState === "hit";

  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.75" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead 
        ? (isNaval ? "bt_ship_death_sink 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards" : "bt_legion_death_collapse 2.4s cubic-bezier(0.25, 1, 0.5, 1) forwards")
        : takesHit ? "pulse 0.25s ease-in-out" : "none"
    },
    className: "transition-all duration-300 ease-out " + staggerClass + " " + (takesHit ? "brightness-200 drop-shadow-[0_0_28px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]" : isDead ? "drop-shadow-[0_0_24px_rgba(239,68,68,0.9)]" : ""),
    children: [
      // =========================================================================
      // 1. NAVAL WARSHIP WITH FULL MODEL DAMAGE & PROGRESSIVE CARNAGE
      // =========================================================================
      isNaval && e.jsxs("g", {
        id: "naval-medallion-body",
        children: [
          // Natural Hydrodynamic Wave Foam & Water Contact Lines
          !isDead && e.jsxs("g", {
            id: "hull-sea-contact-lines",
            children: [
              e.jsx("path", {
                d: "M -55,26 Q -25,30 0,26 Q 25,30 55,26",
                fill: "none",
                stroke: "rgba(224,242,254,0.7)",
                strokeWidth: "2",
                strokeLinecap: "round"
              }),
              e.jsx("path", {
                d: "M -40,30 Q 0,35 40,30",
                fill: "none",
                stroke: "rgba(255,255,255,0.85)",
                strokeWidth: "1.5",
                strokeLinecap: "round"
              }),
              e.jsx("path", {
                d: "M -8,24 Q 0,18 8,24",
                fill: "none",
                stroke: "#ffffff",
                strokeWidth: "2.5",
                strokeLinecap: "round"
              }),
              [-30, -12, 12, 30].map((wx, i) => e.jsx("circle", {
                key: "foam_drop_" + i,
                cx: wx,
                cy: 28 + (i % 2) * 3,
                r: "1.2",
                fill: "#ffffff",
                opacity: "0.85"
              }))
            ]
          }),

          // Dynamic Rowing Oars (Progressively Broken, Snapped & Missing as HP drops)
          !isDead && e.jsxs("g", {
            stroke: bronzeBase,
            strokeWidth: "2.2",
            strokeLinecap: "round",
            className: isAttacking ? "animate-oar-sweep" : "",
            children: [
              // Left Port Oars
              [-42, -32, -22, -12, -2].map((ox, i) => {
                const isBroken = (hpPct < 75 && (i === 1 || i === 3)) || (hpPct < 45 && i !== 2) || (hpPct < 25);
                if (isBroken) {
                  return e.jsxs("g", { key: "oar_l_" + i, children: [
                    e.jsx("line", { x1: ox, y1: 14 + i * 2, x2: ox - 7, y2: 21 + i * 2, stroke: "#78350f", strokeWidth: "2.6", strokeDasharray: "4 2" }),
                    (hpPct < 60) && e.jsx("line", { x1: ox - 14, y1: 27 + i * 2, x2: ox - 20, y2: 32 + i * 2, stroke: "#b45309", strokeWidth: "1.6", opacity: "0.7" })
                  ] });
                }
                return e.jsx("line", { key: "oar_l_" + i, x1: ox, y1: 14 + i * 2, x2: ox - 18, y2: 32 + i * 2 });
              }),
              // Right Starboard Oars
              [10, 20, 30, 40, 50].map((ox, i) => {
                const isBroken = (hpPct < 75 && (i === 0 || i === 3)) || (hpPct < 45 && i !== 1) || (hpPct < 25);
                if (isBroken) {
                  return e.jsxs("g", { key: "oar_r_" + i, children: [
                    e.jsx("line", { x1: ox, y1: 22 - i * 2, x2: ox + 8, y2: 28 - i * 2, stroke: "#78350f", strokeWidth: "2.6", strokeDasharray: "4 2" }),
                    (hpPct < 60) && e.jsx("line", { x1: ox + 15, y1: 33 - i * 2, x2: ox + 22, y2: 37 - i * 2, stroke: "#b45309", strokeWidth: "1.6", opacity: "0.7" })
                  ] });
                }
                return e.jsx("line", { key: "oar_r_" + i, x1: ox, y1: 22 - i * 2, x2: ox + 18, y2: 38 - i * 2 });
              })
            ]
          }),

          // 2.5D Ship Hull Planking, Bronze Wales & Structural Damage
          e.jsxs("g", {
            id: "medallion-ship-hull",
            children: [
              e.jsx("path", { d: "M 0,32 L -48,12 C -36,5 -18,4 0,6 Z", fill: hullWoodL, stroke: "#270e02", strokeWidth: "1" }),
              e.jsx("path", { d: "M 0,32 L 48,12 C 36,5 18,4 0,6 Z", fill: hullWoodR, stroke: "#270e02", strokeWidth: "1" }),
              e.jsx("path", { d: "M -40,14 Q -20,17 0,24 Q 20,17 40,14", fill: "none", stroke: "#270e02", strokeWidth: "1.2" }),
              e.jsx("path", { d: "M -32,18 Q -16,22 0,28 Q 16,22 32,18", fill: "none", stroke: "#270e02", strokeWidth: "1.2" }),
              e.jsx("path", { d: "M -48,11 Q 0,16 48,11 L 48,13 Q 0,18 -48,13 Z", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.6" }),

              // MODEL DAMAGE: Deep Hull Timber Fractures & Gashes
              (hpPct < 80) && e.jsxs("g", {
                id: "hull-timber-fractures",
                children: [
                  e.jsx("path", { d: "M -28,14 L -20,20 L -24,24", fill: "none", stroke: "#1c0a00", strokeWidth: "1.8", strokeLinecap: "round" }),
                  e.jsx("path", { d: "M 16,16 L 24,22 L 20,26", fill: "none", stroke: "#1c0a00", strokeWidth: "1.8", strokeLinecap: "round" }),
                  e.jsx("line", { x1: "-8", y1: "18", x2: "-2", y2: "26", stroke: "#450a0a", strokeWidth: "1.5" })
                ]
              }),

              // MODEL DAMAGE: Jagged Hull Splinter Breach & Churning Water Leakage
              (hpPct < 55) && e.jsxs("g", {
                id: "hull-splinter-breach",
                children: [
                  e.jsx("polygon", { points: "-26,17 -18,22 -22,27 -30,22", fill: "#09090b", stroke: "#78350f", strokeWidth: "1.2" }),
                  e.jsx("path", { d: "M -26,19 Q -20,28 -14,24", fill: "none", stroke: "rgba(56,189,248,0.85)", strokeWidth: "2" }),
                  e.jsx("circle", { cx: "-22", cy: "23", r: "3", fill: "rgba(224,242,254,0.7)", className: "animate-ping" })
                ]
              }),

              // MODEL DAMAGE: Critical Structural Keel Breach & Water Inundation
              (hpPct < 30) && e.jsxs("g", {
                id: "hull-critical-breach",
                children: [
                  e.jsx("path", { d: "M -32,22 Q -18,30 2,24 Q -14,34 -32,22", fill: "#0c4a6e", opacity: "0.9" }),
                  e.jsx("path", { d: "M 12,20 L 26,27 L 18,30 Z", fill: "#020617", stroke: "#ea580c", strokeWidth: "1" }),
                  e.jsx("path", { d: "M -40,11 L -28,13", stroke: "#450a0a", strokeWidth: "2.4", strokeDasharray: "4 2" })
                ]
              })
            ]
          }),

          // Bulwark Shields Line along Gunwales (Progressively Dented, Smashed & Missing)
          !isDead && e.jsxs("g", {
            id: "medallion-cataphract-shields",
            children: [
              [-36, -26, -16, 16, 26, 36].map((sx, i) => {
                const isShieldDestroyed = (hpPct < 65 && (i === 1 || i === 4)) || (hpPct < 35 && (i === 0 || i === 5));
                if (isShieldDestroyed) {
                  return e.jsxs("g", { key: "shd_dmg_" + i, children: [
                    e.jsx("line", { x1: sx - 3, y1: "6", x2: sx + 2, y2: "13", stroke: "#450a0a", strokeWidth: "1.8" }),
                    e.jsx("circle", { cx: sx, cy: "10", r: "1.2", fill: "#1c1917" })
                  ] });
                }
                const isShieldDented = hpPct < 85 && (i === 0 || i === 3);
                return e.jsxs("g", { key: "shd_" + i, children: [
                  e.jsx("rect", {
                    x: sx - 4,
                    y: "5",
                    width: "8",
                    height: "10",
                    rx: "2",
                    fill: isShieldDented ? "#7f1d1d" : scutumGrad,
                    stroke: isShieldDented ? "#450a0a" : scutumBorder,
                    strokeWidth: "0.8"
                  }),
                  e.jsx("circle", {
                    cx: sx,
                    cy: "10",
                    r: "1.6",
                    fill: isShieldDented ? "#dc2626" : scutumEmblemColor
                  }),
                  isShieldDented && e.jsx("line", { x1: sx - 4, y1: "6", x2: sx + 4, y2: "14", stroke: "#000000", strokeWidth: "1.2" })
                ] });
              })
            ]
          }),

          // Sculpted Bronze Rostrum Ram (Dented, Twisted, Bloody on Impact)
          e.jsxs("g", {
            id: "medallion-rostrum-ram",
            children: [
              e.jsx("polygon", { points: "0,16 -7,26 7,26", fill: "url(#rst_bz_rom)", stroke: "#78350f", strokeWidth: "1.2" }),
              e.jsx("polygon", { points: "0,28 -5,24 0,18 5,24", fill: goldTrim, stroke: "#78350f", strokeWidth: "1.2" }),
              e.jsx("circle", { cx: "0", cy: "22", r: "2.4", fill: "#b45309", stroke: "#fef08a", strokeWidth: "0.8" }),
              e.jsx("circle", { cx: "0", cy: "22", r: "1.2", fill: "#000000" }),
              (hpPct < 60) && e.jsx("line", { x1: "-4", y1: "21", x2: "3", y2: "26", stroke: "#000000", strokeWidth: "1.6" }),
              (hpPct < 30) && e.jsx("path", { d: "M -2,26 L 0,33 L 4,28", stroke: "#7f1d1d", strokeWidth: "2", fill: "none" })
            ]
          }),

          // Rigging, Mast & Mainsail (Progressively Torn, Burnt, Frayed with Broken Yardarm)
          e.jsxs("g", {
            id: "medallion-mainsail-system",
            children: [
              // Central Wooden Mast
              e.jsx("line", { x1: "0", y1: "-4", x2: "0", y2: hpPct < 25 ? "-32" : "-48", stroke: "#451a03", strokeWidth: "4.5", strokeLinecap: "round" }),
              e.jsx("line", { x1: "-1", y1: "-4", x2: "-1", y2: hpPct < 25 ? "-32" : "-48", stroke: goldTrim, strokeWidth: "1" }),
              (hpPct < 25) && e.jsx("line", { x1: "0", y1: "-32", x2: "14", y2: "-24", stroke: "#78350f", strokeWidth: "3.2", strokeDasharray: "6 3" }),

              // Rigging Shrouds & Stays (Fraying as HP drops)
              e.jsx("line", { x1: "0", y1: "-46", x2: "-46", y2: "4", stroke: "rgba(254,240,138,0.4)", strokeWidth: "1", strokeDasharray: hpPct < 55 ? "8 4" : "none" }),
              e.jsx("line", { x1: "0", y1: "-46", x2: "46", y2: "4", stroke: "rgba(254,240,138,0.4)", strokeWidth: "1", strokeDasharray: hpPct < 40 ? "6 4" : "none" }),
              
              // Horizontal Yardarm (Tilting and splintered under heavy fire)
              e.jsx("line", {
                x1: hpPct < 35 ? "-36" : "-38",
                y1: hpPct < 35 ? "-41" : "-44",
                x2: hpPct < 35 ? "38" : "38",
                y2: hpPct < 35 ? "-47" : "-44",
                stroke: "#78350f",
                strokeWidth: "3",
                strokeLinecap: "round"
              }),
              
              // Mainsail Canvas with Faction Gradient & Border
              e.jsx("path", {
                d: "M -34,-42 C -18,-46 18,-46 34,-42 C 40,-24 36,-6 28,-2 C 14,2 -14,2 -28,-2 C -36,-6 -40,-24 -34,-42 Z",
                fill: sailGrad,
                stroke: sailBorder,
                strokeWidth: "1.5"
              }),
              e.jsx("path", {
                d: "M -26,-38 C -14,-41 14,-41 26,-38 C 30,-22 28,-8 22,-5 C 10,-2 -10,-2 -22,-5 C -28,-8 -30,-22 -26,-38 Z",
                fill: "rgba(255,255,255,0.12)"
              }),

              // MODEL DAMAGE: Arrow Punctures Through Sail Cloth
              (hpPct < 85) && e.jsxs("g", {
                id: "sail-arrow-holes",
                children: [
                  e.jsx("circle", { cx: "-18", cy: "-28", r: "2.2", fill: "#09090b", stroke: "#78350f", strokeWidth: "0.8" }),
                  e.jsx("circle", { cx: "16", cy: "-20", r: "2", fill: "#09090b", stroke: "#78350f", strokeWidth: "0.8" }),
                  e.jsx("circle", { cx: "-8", cy: "-12", r: "1.8", fill: "#09090b" }),
                  e.jsx("line", { x1: "-18", y1: "-28", x2: "-26", y2: "-34", stroke: "#78350f", strokeWidth: "1.4" })
                ]
              }),

              // MODEL DAMAGE: Jagged Vertical Canvas Slash Rip
              (hpPct < 65) && e.jsxs("g", {
                id: "sail-jagged-rip",
                children: [
                  e.jsx("path", { d: "M -14,-36 Q -6,-24 -12,-10 L -9,-8 Q -3,-22 -11,-36 Z", fill: "#0f172a", stroke: "#451a03", strokeWidth: "1" }),
                  e.jsx("line", { x1: "-14", y1: "-36", x2: "-10", y2: "-38", stroke: sailBorder, strokeWidth: "1.2" })
                ]
              }),

              // MODEL DAMAGE: Charred Gaping Fire Blast Hole & Smoldering Embers
              (hpPct < 40) && e.jsxs("g", {
                id: "sail-fire-blast-hole",
                children: [
                  e.jsx("ellipse", { cx: "18", cy: "-26", rx: "10", ry: "7", fill: "#09090b", stroke: "#ea580c", strokeWidth: "1.5", className: "animate-pulse" }),
                  e.jsx("circle", { cx: "18", cy: "-26", r: "4", fill: "#f97316", opacity: "0.8" }),
                  [-4, 8, 20].map((ex, ei) => e.jsx("circle", { key: "cinder_sail_" + ei, cx: 16 + ex, cy: -28 + (ei % 2) * 5, r: "1.6", fill: "#fef08a" }))
                ]
              }),

              // MODEL DAMAGE: Shredded Tattered Sail Strips flapping in gale
              (hpPct < 20) && e.jsxs("g", {
                id: "sail-tattered-strips",
                children: [
                  e.jsx("path", { d: "M -24,-2 L -20,6 L -16,-2", fill: sailGrad, stroke: sailBorder, strokeWidth: "0.8" }),
                  e.jsx("path", { d: "M 14,-2 L 20,8 L 24,-2", fill: sailGrad, stroke: sailBorder, strokeWidth: "0.8" })
                ]
              }),

              // Faction Specific Insignia & Crest Wreath on Sail
              e.jsxs("g", {
                transform: "translate(0, -22)",
                opacity: hpPct < 30 ? "0.45" : "1",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: "rgba(0,0,0,0.25)", stroke: sailBorder, strokeWidth: "1.6", strokeDasharray: "4 2" }),
                  isAnchor ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-6", r: "2", fill: "none", stroke: sailBorder, strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "0", y1: "-4", x2: "0", y2: "7", stroke: sailBorder, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-5", y1: "-2", x2: "5", y2: "-2", stroke: sailBorder, strokeWidth: "1.8", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -6,2 Q 0,10 6,2", fill: "none", stroke: sailBorder, strokeWidth: "1.8", strokeLinecap: "round" })
                    ]
                  }) : (isSol ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "0", r: "4", fill: sailBorder }),
                      [-45, 0, 45, 90, 135, 180, 225, 270].map((deg, ri) => e.jsx("line", {
                        key: "sunray_" + ri,
                        x1: "0", y1: "0",
                        x2: Math.cos(deg * Math.PI / 180) * 8,
                        y2: Math.sin(deg * Math.PI / 180) * 8,
                        stroke: sailBorder, strokeWidth: "1.5", strokeLinecap: "round"
                      }))
                    ]
                  }) : (isChiRho ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -0.5,7 L -0.5,-8 C 3.5,-8 3.5,-3 -0.5,-3", fill: "none", stroke: sailBorder, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-6", y1: "4", x2: "6", y2: "-4", stroke: sailBorder, strokeWidth: "1.8", strokeLinecap: "round" }),
                      e.jsx("line", { x1: "-6", y1: "-4", x2: "6", y2: "4", stroke: sailBorder, strokeWidth: "1.8", strokeLinecap: "round" })
                    ]
                  }) : (isAquila ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M 0,-7 L -3,-2 L -9,-6 L -7,1 L -3,3 L 0,8 L 3,3 L 7,1 L 9,-6 L 3,-2 Z", fill: sailBorder }),
                      e.jsx("circle", { cx: "0", cy: "-7", r: "2.5", fill: sailBorder })
                    ]
                  }) : (isTriton ? e.jsxs("g", {
                    children: [
                      e.jsx("line", { x1: "0", y1: "-8", x2: "0", y2: "8", stroke: sailBorder, strokeWidth: "2", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M -5,-3 L -5,-8 L -2,-8 L -2,-4 M 5,-3 L 5,-8 L 2,-8 L 2,-4 M -6,-3 Q 0,2 6,-3", fill: "none", stroke: sailBorder, strokeWidth: "1.5", strokeLinecap: "round" })
                    ]
                  }) : (isBull ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -6,-5 Q -9,-11 -4,-9 Q 0,-5 0,-1 Q 0,-5 4,-9 Q 9,-11 6,-5 L 4,3 Q 0,7 -4,3 Z", fill: sailBorder, stroke: "#78350f", strokeWidth: "0.8" })
                    ]
                  }) : (isPirate ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-2", r: "4", fill: "#ffffff" }),
                      e.jsx("circle", { cx: "-1.5", cy: "-2", r: "1", fill: "#000000" }),
                      e.jsx("circle", { cx: "1.5", cy: "-2", r: "1", fill: "#000000" }),
                      e.jsx("line", { x1: "-5", y1: "5", x2: "5", y2: "-5", stroke: "#ffffff", strokeWidth: "1.5" }),
                      e.jsx("line", { x1: "-5", y1: "-5", x2: "5", y2: "5", stroke: "#ffffff", strokeWidth: "1.5" })
                    ]
                  }) : (isPunic ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-3", r: "3.5", fill: sailBorder }),
                      e.jsx("path", { d: "M -6,2 Q 0,7 6,2 Q 0,4 -6,2 Z", fill: sailBorder })
                    ]
                  }) : (isPraetorian ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M 0,-6 Q 0,6 0,8 Q 2,11 4,11 M -2,2 Q -5,1 -8,-2 M 2,2 Q 5,1 8,-2", fill: "none", stroke: sailBorder, strokeWidth: "1.2", strokeLinecap: "round" }),
                      e.jsx("path", { d: "M 0,-8 C -3,-12 -7,-8 -6,-4 Q -3,-4 0,-4 C 3,-4 6,-4 6,-8 C 7,-12 3,-12 0,-8", fill: "none", stroke: sailBorder, strokeWidth: "1.2" }),
                      e.jsx("circle", { cx: "0", cy: "-2", r: "2", fill: sailBorder })
                    ]
                  }) : (isUsurper ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -3,-8 L -7,0 L -2,0 L -6,8 M 5,-8 L 1,0 L 6,0 L 2,8", fill: "none", stroke: sailBorder, strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })
                    ]
                  }) : (isGreek ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -4,-4 L -2,-7 L 0,-5 L 2,-7 L 4,-4 L 3,4 L -3,4 Z", fill: sailBorder }),
                      e.jsx("circle", { cx: "-1.8", cy: "-1.5", r: "1.5", fill: "#ffffff" }),
                      e.jsx("circle", { cx: "1.8", cy: "-1.5", r: "1.5", fill: "#ffffff" }),
                      e.jsx("polygon", { points: "-0.8,-0.5 0,1 0.8,-0.5", fill: "#000000" })
                    ]
                  }) : (isEgyptian ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -7,-2 Q -1.5,-6.5 5.5,-2 Q 0,3.5 -7,-2 Z", fill: "none", stroke: sailBorder, strokeWidth: "1.4" }),
                      e.jsx("circle", { cx: "-0.8", cy: "-1.8", r: "1.8", fill: sailBorder }),
                      e.jsx("path", { d: "M -2.5,0.8 Q -4,5 -5,2.5 M 1,0.8 L 1,4.2 Q 3.5,5 3.5,2.5", fill: "none", stroke: sailBorder, strokeWidth: "1" })
                    ]
                  }) : (isBarbarian ? e.jsxs("g", {
                    children: [
                      e.jsx("path", { d: "M -7,2 Q 0,-7 7,2 L 4.5,4.5 Q 0,1 -4.5,4.5 Z", fill: sailBorder }),
                      e.jsx("path", { d: "M -7,2 Q -10,-3 -6,-1.5 M 7,2 Q 10,-3 6,-1.5", fill: "none", stroke: sailBorder, strokeWidth: "1.3", strokeLinecap: "round" })
                    ]
                  }) : (isMerchant ? e.jsxs("g", {
                    children: [
                      e.jsx("circle", { cx: "0", cy: "-6", r: "1.8", fill: sailBorder }),
                      e.jsx("line", { x1: "0", y1: "-4", x2: "0", y2: "7", stroke: sailBorder, strokeWidth: "1.5" }),
                      e.jsx("path", { d: "M -4,-2 C -4,1 0,2 0,-0.8 C 0,2 4,1 4,-2 M -3,3 C -3,6 0,7 0,4.5 C 0,7 3,3 3,3", fill: "none", stroke: sailBorder, strokeWidth: "1" })
                    ]
                  }) : e.jsx("text", {
                    x: "0", y: "3.2", textAnchor: "middle", fill: sailBorder, fontSize: "7", fontFamily: "Cinzel, serif", fontWeight: "900", letterSpacing: "0.6", children: factionInsignia
                  }))))))))))))))
                ]
              }),

              // Stern Roman Standard & Vexillum (Snapped & Scorched at low HP)
              isFlag && e.jsxs("g", {
                transform: "translate(-38, -6)",
                children: [
                  e.jsx("line", { x1: "0", y1: "0", x2: hpPct < 30 ? "6" : "0", y2: hpPct < 30 ? "-16" : "-26", stroke: goldTrim, strokeWidth: "1.8", strokeDasharray: hpPct < 30 ? "6 3" : "none" }),
                  e.jsx("rect", { x: "-10", y: hpPct < 30 ? "-16" : "-24", width: "10", height: hpPct < 30 ? "8" : "14", fill: sailGrad, stroke: sailBorder, strokeWidth: "0.8" }),
                  e.jsx("circle", { cx: hpPct < 30 ? "6" : "0", cy: hpPct < 30 ? "-16" : "-26", r: "3", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" })
                ]
              })
            ]
          }),

          // =========================================================================
          // PROGRESSIVE SHIP CARNAGE & VISCERAL STATUS TIERS (TIERS 1 TO 5)
          // =========================================================================
          // TIER 1: Stuck Flaming Arrows & Ballista Bolts (hpPct < 90)
          (hpPct < 90) && e.jsxs("g", {
            id: "status-fx-ship-tier1",
            children: [
              [-34, -14, 16, 36].map((ax, i) => e.jsxs("g", {
                key: "flame_arr_" + i,
                transform: "translate(" + ax + ", 6) rotate(" + (i % 2 === 0 ? 32 : -28) + ")",
                children: [
                  e.jsx("line", { x1: "0", y1: "0", x2: "-14", y2: "0", stroke: "#78350f", strokeWidth: "1.8" }),
                  e.jsx("polygon", { points: "0,0 -3,-2 -3,2", fill: "#94a3b8" }),
                  e.jsx("circle", { cx: "-2", cy: "0", r: "3", fill: "#f97316", className: "animate-pulse" }),
                  e.jsx("circle", { cx: "-1", cy: "0", r: "1.5", fill: "#fef08a" })
                ]
              }))
            ]
          }),

          // TIER 2: Broken Oar Stubs & Floating Debris (hpPct < 75)
          (hpPct < 75) && e.jsxs("g", {
            id: "status-fx-ship-tier2",
            children: [
              [-38, -18, 22, 42].map((ox, i) => e.jsx("line", {
                key: "drifting_oar_" + i,
                x1: ox,
                y1: 30 + (i % 2) * 4,
                x2: ox + 14,
                y2: 36 + (i % 2) * 4,
                stroke: "#78350f",
                strokeWidth: "2.4",
                strokeDasharray: "6 3",
                opacity: "0.8"
              })),
              e.jsx("path", { d: "M -20,12 L -12,24", stroke: "#7f1d1d", strokeWidth: "2" })
            ]
          }),

          // TIER 3: Billowing Pitch Smoke Columns & Smoldering Embers (hpPct < 55)
          (hpPct < 55) && e.jsxs("g", {
            id: "status-fx-ship-tier3",
            children: [
              [-16, 12, 28].map((smkX, i) => e.jsx("circle", {
                key: "ship_smk_" + i,
                cx: smkX,
                cy: -18 - i * 8,
                r: 10 + i * 4,
                fill: "rgba(35,30,25,0.78)",
                className: "animate-pulse"
              })),
              [-18, 0, 18].map((ex, i) => e.jsx("circle", {
                key: "smk_cinder_" + i,
                cx: ex,
                cy: -24 - i * 6,
                r: "2",
                fill: "#fef08a",
                className: "animate-ping"
              }))
            ]
          }),

          // TIER 4: Raging Greek Fire Tongues & Crew Overboard (hpPct < 35)
          (hpPct < 35) && e.jsxs("g", {
            id: "status-fx-ship-tier4",
            children: [
              e.jsx("path", {
                d: "M -35,6 Q -22,-28 -8,6 Q 8,-32 24,6 Q 36,-18 42,6 Z",
                fill: "url(#grad-greek-fire)",
                opacity: "0.92",
                className: "animate-pulse"
              }),
              [-32, -12, 10, 30].map((cx, i) => e.jsx("circle", {
                key: "gk_cinder_" + i,
                cx: cx,
                cy: -14 - (i % 2) * 12,
                r: "2.6",
                fill: "#fef08a"
              })),
              // Drowning Crew Overboard in Sea
              [-36, 32].map((px, i) => e.jsxs("g", {
                key: "crew_overboard_" + i,
                transform: "translate(" + px + ", 32)",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: "4", fill: "#fde047" }),
                  e.jsx("line", { x1: "-3", y1: "0", x2: "-7", y2: "-6", stroke: "#991b1b", strokeWidth: "2" }),
                  e.jsx("line", { x1: "3", y1: "0", x2: "7", y2: "-6", stroke: "#991b1b", strokeWidth: "2" }),
                  e.jsx("circle", { cx: "0", cy: "0", r: "8", fill: "none", stroke: "#ffffff", strokeWidth: "1.5", className: "animate-ping" })
                ]
              }))
            ]
          }),

          // TIER 5: Devastating Shipwreck Ruin & Sinking Keel (hpPct < 15 || isDead)
          (hpPct < 15 || isDead) && e.jsxs("g", {
            id: "status-fx-ship-tier5",
            children: [
              e.jsx("ellipse", { cx: "0", cy: "30", rx: "58", ry: "14", fill: "rgba(12,74,110,0.85)" }),
              e.jsx("path", { d: "M -45,18 Q 0,40 45,18 Z", fill: "rgba(0,0,0,0.8)" }),
              e.jsx("line", { x1: "-20", y1: "-10", x2: "30", y2: "26", stroke: "#ea580c", strokeWidth: "3.5", className: "animate-pulse" })
            ]
          }),

          // HIT IMPACT DYNAMICS: Violent Splinter Explosions & Red Sparks on Hit
          takesHit && e.jsxs("g", {
            id: "ship-hit-impact-fx",
            children: [
              e.jsx("circle", { cx: "0", cy: "14", r: "24", fill: "rgba(239,68,68,0.5)", className: "animate-ping" }),
              [-20, -8, 8, 20].map((sx, i) => e.jsx("line", {
                key: "splinter_burst_" + i,
                x1: "0", y1: "14",
                x2: sx * 1.8, y2: 14 + (i % 2 === 0 ? -18 : 18),
                stroke: "#fef08a",
                strokeWidth: "2.4"
              })),
              e.jsx("polygon", { points: "0,14 -12,2 -4,22 8,6", fill: "#f59e0b" })
            ]
          })
        ]
      }),

      // =========================================================================
      // 2. LAND LEGION / CENTURION COHORT WITH PROGRESSIVE WOUNDS & CARNAGE
      // =========================================================================
      !isNaval && e.jsxs("g", {
        id: "land-legion-medallion-body",
        children: [
          // 1. Dual Crossed Weapons (Pila / Gladius) - Snapped & Bloodied as HP drops
          !isDead && e.jsxs("g", {
            id: "medallion-crossed-weapons",
            className: isAttacking ? "animate-pila-thrust" : "",
            children: [
              e.jsx("line", {
                x1: "-34", y1: "-34",
                x2: hpPct < 55 ? "14" : "34",
                y2: hpPct < 55 ? "14" : "34",
                stroke: "#78350f",
                strokeWidth: "3.5",
                strokeLinecap: "round",
                strokeDasharray: hpPct < 55 ? "12 4" : "none"
              }),
              e.jsx("polygon", { points: "-34,-34 -26,-37 -31,-28", fill: hpPct < 60 ? "#991b1b" : "#e2e8f0", stroke: "#475569", strokeWidth: "1" }),
              e.jsx("line", { x1: "34", y1: "-34", x2: "-34", y2: "34", stroke: "#78350f", strokeWidth: "3.5", strokeLinecap: "round" }),
              e.jsx("polygon", { points: "34,-34 26,-37 31,-28", fill: hpPct < 40 ? "#991b1b" : "#e2e8f0", stroke: "#475569", strokeWidth: "1" }),
              (hpPct < 50) && e.jsx("line", { x1: "8", y1: "-8", x2: "22", y2: "6", stroke: "#7f1d1d", strokeWidth: "2.5" })
            ]
          }),

          // 2. Centurion / Legionary Helmet (Galea) with Horsehair Crest & Armored Shoulders
          !isDead && e.jsxs("g", {
            id: "centurion-galea-helmet-system",
            transform: "translate(0, -26)",
            children: [
              // Armored Shoulders with Lorica Segmentata
              e.jsx("path", {
                d: "M -24,10 Q -12,2 0,4 Q 12,2 24,10 L 22,18 Q 0,14 -22,18 Z",
                fill: armorSteel,
                stroke: goldTrim,
                strokeWidth: "1.2"
              }),
              // Leather Pteruges
              [-16, -8, 8, 16].map((px, pi) => e.jsx("line", {
                key: "ptg_" + pi,
                x1: px,
                y1: "16",
                x2: px,
                y2: (hpPct < 50 && (pi === 0 || pi === 3)) ? "19" : "22",
                stroke: "#78350f",
                strokeWidth: "2"
              })),
              // Galea Dome Helmet
              e.jsx("ellipse", { cx: "0", cy: "2", rx: "9", ry: "8", fill: goldTrim, stroke: "#78350f", strokeWidth: "1.2" }),
              // Brow Guard & Cheek Plates
              e.jsx("path", { d: "M -8 2 Q 0 -2 8 2", fill: "none", stroke: "#78350f", strokeWidth: "1.8", strokeLinecap: "round" }),
              e.jsx("path", { d: "M -7 3 L -6 10 L -4 9", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" }),
              e.jsx("path", { d: "M 7 3 L 6 10 L 4 9", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" }),

              // MODEL DAMAGE: Bloody forehead gash & fractured helmet dome
              (hpPct < 65) && e.jsx("path", { d: "M -3,2 L -1,7 L 1,6", stroke: "#991b1b", strokeWidth: "1.6", fill: "none" }),
              (hpPct < 35) && e.jsx("circle", { cx: "3", cy: "0", r: "2.4", fill: "#450a0a" }),

              // Transverse Centurion Horsehair Crest (Plume progressively shredded/burned)
              e.jsx("path", {
                d: isFlag 
                  ? (hpPct < 45 ? "M -8,-5 Q 0,-10 8,-5 L 6,-2 Q 0,-6 -6,-2 Z" : "M -16,-6 Q 0,-14 16,-6 L 14,-2 Q 0,-8 -14,-2 Z")
                  : (hpPct < 45 ? "M -2,-8 Q 0,-12 2,-8 L 2,-4 Q 0,-5 -2,-4 Z" : "M -4,-12 Q 0,-16 4,-12 L 3,-4 Q 0,-6 -3,-4 Z"),
                fill: hpPct < 45 ? "#7f1d1d" : plumeColor,
                stroke: "#7f1d1d",
                strokeWidth: "0.8"
              }),
              (hpPct < 45) && e.jsx("line", { x1: "8", y1: "-6", x2: "14", y2: "-2", stroke: "#1c1917", strokeWidth: "1.4" })
            ]
          }),

          // 3. Iconic Curved Scutum Shield with Faction Colors, Boss & DEEP PROGRESSIVE MODEL DAMAGE
          e.jsxs("g", {
            id: "medallion-scutum-shield",
            children: [
              // Shield Body
              e.jsx("rect", {
                x: "-26",
                y: "-18",
                width: "52",
                height: "64",
                rx: "10",
                fill: scutumGrad,
                stroke: scutumBorder,
                strokeWidth: "2"
              }),
              // Inner Bevel Inset Line
              e.jsx("rect", {
                x: "-22",
                y: "-14",
                width: "44",
                height: "56",
                rx: "7",
                fill: "none",
                stroke: "rgba(255,255,255,0.25)",
                strokeWidth: "1"
              }),
              // Shield Corner Reinforcement Brackets
              [
                [-26, -18], [18, -18], [-26, 38], [18, 38]
              ].map(([bx, by], bi) => {
                if (hpPct < 45 && bi === 0) return null; // Corner bracket sheared off
                return e.jsx("rect", {
                  key: "c_brk_" + bi,
                  x: bx,
                  y: by,
                  width: "8",
                  height: "8",
                  fill: goldTrim,
                  stroke: "#78350f",
                  strokeWidth: "0.8"
                });
              }),

              // Central Brass Shield Boss (Umbo)
              e.jsx("ellipse", { cx: "0", cy: "14", rx: "10", ry: "10", fill: goldTrim, stroke: "#78350f", strokeWidth: "1.8" }),
              e.jsx("ellipse", { cx: "0", cy: "14", rx: "5", ry: "5", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1" }),
              e.jsx("circle", { cx: "0", cy: "14", r: "2", fill: "#000000" }),
              (hpPct < 60) && e.jsx("line", { x1: "-5", y1: "12", x2: "5", y2: "16", stroke: "#450a0a", strokeWidth: "1.8" }),

              // Faction Crest / Insignia on Scutum
              e.jsxs("g", {
                stroke: scutumEmblemColor,
                strokeWidth: "1.5",
                fill: "none",
                opacity: hpPct < 30 ? "0.4" : "1",
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
              }),

              // MODEL DAMAGE: Gladius Slash Cuts & Embedded Pilum in Scutum Shield
              (hpPct < 85) && e.jsxs("g", {
                id: "scutum-scratch-marks",
                children: [
                  e.jsx("line", { x1: "-16", y1: "-6", x2: "-8", y2: "2", stroke: "#1c1917", strokeWidth: "1.5" }),
                  e.jsx("line", { x1: "10", y1: "20", x2: "18", y2: "28", stroke: "#1c1917", strokeWidth: "1.5" }),
                  [-12, 14].map((bx, bi) => e.jsx("circle", { key: "blood_dot_" + bi, cx: bx, cy: bi * 16, r: "1.6", fill: "#991b1b" }))
                ]
              }),

              (hpPct < 65) && e.jsxs("g", {
                id: "scutum-deep-cleave",
                children: [
                  e.jsx("path", { d: "M -20,2 L 16,32", stroke: "#1c1917", strokeWidth: "3.2", strokeLinecap: "round" }),
                  e.jsx("path", { d: "M -20,2 L 16,32", stroke: "#7f1d1d", strokeWidth: "1.8" }),
                  // Stuck barbed arrow lodged into top right shield rim
                  e.jsx("line", { x1: "18", y1: "-16", x2: "28", y2: "-26", stroke: "#78350f", strokeWidth: "2" }),
                  e.jsx("polygon", { points: "18,-16 22,-14 20,-18", fill: "#475569" })
                ]
              }),

              (hpPct < 45) && e.jsxs("g", {
                id: "scutum-fracture-break",
                children: [
                  e.jsx("path", { d: "M -24,-10 L -4,14 L 20,38", stroke: "#000000", strokeWidth: "3.5" }),
                  e.jsx("path", { d: "M -22,-8 L -6,14 L 18,36", stroke: "#f59e0b", strokeWidth: "1" }),
                  // Heavy blood wash smeared across shield
                  e.jsx("path", { d: "M -12,8 Q 0,26 12,18", stroke: "rgba(127,29,29,0.85)", strokeWidth: "4", fill: "none" }),
                  e.jsx("line", { x1: "-10", y1: "22", x2: "-20", y2: "16", stroke: "#78350f", strokeWidth: "2" })
                ]
              }),

              (hpPct < 25) && e.jsxs("g", {
                id: "scutum-shattered-ruin",
                children: [
                  e.jsx("path", { d: "M -26,-2 L -12,16 L -26,34 Z", fill: "#291807", stroke: "#000", strokeWidth: "1" }),
                  e.jsx("ellipse", { cx: "0", cy: "20", rx: "18", ry: "10", fill: "rgba(69,10,10,0.8)" })
                ]
              })
            ]
          }),

          // 4. Imperial Roman Aquila Eagle / Faction Vexillum Banner for Commanders
          isFlag && e.jsxs("g", {
            transform: "translate(-32, -38)",
            children: [
              e.jsx("line", { x1: "0", y1: "0", x2: hpPct < 30 ? "8" : "0", y2: hpPct < 30 ? "40" : "70", stroke: goldTrim, strokeWidth: "2.4", strokeDasharray: hpPct < 30 ? "10 5" : "none" }),
              e.jsx("rect", { x: "-12", y: "6", width: "12", height: hpPct < 30 ? "12" : "20", fill: sailGrad, stroke: sailBorder, strokeWidth: "1" }),
              e.jsx("text", { x: "-6", y: "18", textAnchor: "middle", fill: sailBorder, fontSize: "6.5", fontFamily: "Cinzel, serif", fontWeight: "900", children: factionInsignia.substring(0, 3) }),
              e.jsx("polygon", { points: "0,0 -8,6 8,6", fill: goldTrim, stroke: "#78350f", strokeWidth: "1" }),
              e.jsx("circle", { cx: "0", cy: "-2", r: "3", fill: goldTrim })
            ]
          }),

          // =========================================================================
          // PROGRESSIVE LEGION BATTLEFIELD CARNAGE & CASUALTIES (TIERS 1 TO 5)
          // =========================================================================
          // TIER 1: Stuck Pila & Barbed Arrows in Ground & Initial Blood Drops (hpPct < 90)
          (hpPct < 90) && e.jsxs("g", {
            id: "status-fx-legion-tier1",
            children: [
              [-30, 14, 34].map((px, i) => e.jsxs("g", {
                key: "stuck_pilum_" + i,
                transform: "translate(" + px + ", 20) rotate(" + (i % 2 === 0 ? 25 : -35) + ")",
                children: [
                  e.jsx("line", { x1: "0", y1: "-22", x2: "0", y2: "8", stroke: "#78350f", strokeWidth: "2.5" }),
                  e.jsx("line", { x1: "0", y1: "-22", x2: "0", y2: "-30", stroke: "#94a3b8", strokeWidth: "1.5" })
                ]
              })),
              [-16, 6, 24].map((bx, i) => e.jsx("circle", {
                key: "blood_drop_" + i,
                cx: bx,
                cy: 28 + (i % 2) * 3,
                r: "2.8",
                fill: "#991b1b"
              }))
            ]
          }),

          // TIER 2: Expanding Dark Arterial Blood Pools & Shattered Gladius (hpPct < 75)
          (hpPct < 75) && e.jsxs("g", {
            id: "status-fx-legion-tier2",
            children: [
              e.jsx("ellipse", { cx: "-18", cy: "30", rx: "24", ry: "8", fill: "#7f1d1d", opacity: "0.9" }),
              e.jsx("ellipse", { cx: "22", cy: "32", rx: "18", ry: "6", fill: "#991b1b", opacity: "0.85" }),
              // Shattered gladius shortsword on dirt
              e.jsxs("g", {
                transform: "translate(15, 30) rotate(-15)",
                children: [
                  e.jsx("line", { x1: "-8", y1: "0", x2: "6", y2: "0", stroke: "#f1f5f9", strokeWidth: "2.4" }),
                  e.jsx("line", { x1: "-8", y1: "-2", x2: "-8", y2: "2", stroke: goldTrim, strokeWidth: "2" }),
                  e.jsx("circle", { cx: "-10", cy: "0", r: "1.5", fill: goldTrim })
                ]
              })
            ]
          }),

          // TIER 3: Fallen Wounded Comrade / Centurion on Ground (hpPct < 55)
          (hpPct < 55) && e.jsxs("g", {
            id: "status-fx-legion-tier3",
            children: [
              e.jsxs("g", {
                transform: "translate(-10, 26)",
                children: [
                  e.jsx("ellipse", { cx: "0", cy: "5", rx: "26", ry: "9", fill: "#450a0a" }),
                  e.jsx("rect", { x: "-12", y: "-3", width: "24", height: "8", rx: "2", fill: "#7f1d1d" }),
                  e.jsx("rect", { x: "-10", y: "-2", width: "18", height: "6", rx: "1", fill: armorSteel, stroke: goldTrim, strokeWidth: "0.8" }),
                  e.jsx("circle", { cx: "-14", cy: "-2", r: "4.5", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" }),
                  e.jsx("path", { d: "M -16 -4 L -22 -8", stroke: "#dc2626", strokeWidth: "2", strokeLinecap: "round" })
                ]
              }),
              [-20, 20].map((dx, i) => e.jsx("circle", {
                key: "battle_dust_" + i,
                cx: dx,
                cy: "24",
                r: "16",
                fill: "rgba(120,53,15,0.35)",
                className: "animate-pulse"
              }))
            ]
          }),

          // TIER 4: Second Fallen Comrade & Heavy Gore Splatters (hpPct < 35)
          (hpPct < 35) && e.jsxs("g", {
            id: "status-fx-legion-tier4",
            children: [
              e.jsxs("g", {
                transform: "translate(22, 28)",
                children: [
                  e.jsx("ellipse", { cx: "0", cy: "4", rx: "22", ry: "8", fill: "#7f1d1d" }),
                  e.jsx("rect", { x: "-10", y: "-2", width: "20", height: "7", rx: "2", fill: "#1c1917" }),
                  e.jsx("line", { x1: "-12", y1: "5", x2: "8", y2: "5", stroke: "#f1f5f9", strokeWidth: "2" })
                ]
              }),
              [-30, -10, 10, 30].map((sx, i) => e.jsx("ellipse", {
                key: "carnage_splat_" + i,
                cx: sx,
                cy: 28 + (i % 3) * 3,
                rx: "10",
                ry: "4",
                fill: "rgba(185,28,28,0.9)"
              })),
              e.jsx("path", { d: "M -35 15 Q 0 -15 35 15 Q 0 35 -35 15 Z", fill: "rgba(153,27,27,0.35)", className: "animate-pulse" })
            ]
          }),

          // TIER 5: Devastated Ground Saturated in Blood & Smashed Standard (hpPct < 15 || isDead)
          (hpPct < 15 || isDead) && e.jsxs("g", {
            id: "status-fx-legion-tier5",
            children: [
              e.jsx("ellipse", { cx: "0", cy: "28", rx: "60", ry: "15", fill: "rgba(69,10,10,0.95)" }),
              e.jsxs("g", {
                transform: "translate(5, 29) rotate(70)",
                children: [
                  e.jsx("line", { x1: "0", y1: "-30", x2: "0", y2: "20", stroke: "#451a03", strokeWidth: "3.5", strokeDasharray: "10 5" }),
                  e.jsx("polygon", { points: "-10,-35 0,-45 10,-35", fill: goldTrim, stroke: "#78350f", strokeWidth: "1" }),
                  e.jsx("rect", { x: "-12", y: "-30", width: "24", height: "14", fill: "#7f1d1d", stroke: goldTrim, strokeWidth: "1" })
                ]
              })
            ]
          }),

          // HIT IMPACT DYNAMICS: Arterial Blood Spray & Deflection Sparks on Hit
          takesHit && e.jsxs("g", {
            id: "legion-hit-impact-fx",
            children: [
              e.jsx("circle", { cx: "0", cy: "14", r: "26", fill: "rgba(220,38,38,0.55)", className: "animate-ping" }),
              [-24, -10, 10, 24].map((bx, i) => e.jsx("circle", {
                key: "blood_spurt_" + i,
                cx: bx,
                cy: 14 + (i % 2 === 0 ? -16 : 14),
                r: "3.5",
                fill: "#7f1d1d"
              })),
              e.jsx("polygon", { points: "0,14 -10,4 -2,24 8,8", fill: "#fef08a" })
            ]
          })
        ]
      })
    ]
  });
};

const render2DSeaMonster = (x, y, isPlayer = false, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "flagship", faction || "mythic", hpPct, animState, scale * 1.35, isAttacking, isHit, false, "Kraken", 3, "ship", "kraken");
};

const render2DSiren = (x, y, isPlayer = false, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "escortA", faction || "greek", hpPct, animState, scale * 1.15, isAttacking, isHit, false, "Siren", 2, "ship", "siren");
};

const render2DPoseidonAvatar = (x, y, isPlayer, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "flagship", faction || "greek", hpPct, animState, scale * 1.4, isAttacking, isHit, false, "Poseidon", 4, "ship", "poseidon");
};

const render2DWarElephant = (x, y, isPlayer = false, faction = "punic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "commander", faction || "punic", hpPct, animState, scale * 1.35, isAttacking, isHit, false, "Elephant", 3, "legion", "elephant");
};

const render2DMinotaur = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "commander", faction || "punic", hpPct, animState, scale * 1.3, isAttacking, isHit, false, "Minotaur", 3, "legion", "minotaur");
};

const render2DGorgon = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "cohort", faction || "greek", hpPct, animState, scale * 1.1, isAttacking, isHit, false, "Gorgon", 2, "legion", "gorgon");
};

const render2DCerberus = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "commander", faction || "barbarian", hpPct, animState, scale * 1.2, isAttacking, isHit, false, "Cerberus", 3, "legion", "cerberus");
};

const render2DWolfPack = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "cohort", faction || "barbarian", hpPct, animState, scale * 0.9, isAttacking, isHit, false, "WolfPack", 2, "legion", "wolf");
};

const render2DAfricanLion = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "commander", faction || "punic", hpPct, animState, scale * 1.1, isAttacking, isHit, false, "Lion", 3, "legion", "lion");
};

const render2DHercynianBoar = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "cohort", faction || "barbarian", hpPct, animState, scale * 1.05, isAttacking, isHit, false, "Boar", 2, "legion", "boar");
};

const render2DAlpineBear = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "commander", faction || "barbarian", hpPct, animState, scale * 1.25, isAttacking, isHit, false, "Bear", 3, "legion", "bear");
};

const render2DScorpion = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  return renderMasterwork2DMedallionUnit(x, y, isPlayer, "cohort", faction || "punic", hpPct, animState, scale * 0.95, isAttacking, isHit, false, "Scorpion", 2, "legion", "scorpion");
};`;

bundle = bundle.substring(0, pStart) + newUnitSystem + ";\n" + bundle.substring(pEnd);

// Validate with esbuild
try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, 'utf8');
  console.log("SUCCESS: public/assets/index-V33.js updated with progressive model damage and visceral combat carnage!");
} catch (err) {
  console.error("ERR transform failed:", err.message);
  process.exit(1);
}
