const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== ENRICHING MASTERWORK GRADIENT SHADERS IN BATTLE THEATRE ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

const targetDefs = `// Shaders & Gradients for Weapons and Shields
          e.jsxs("defs", {
            children: [`;

const enrichedDefs = `// Shaders & Gradients for Weapons, Shields & 2.5D Medallion Models
          e.jsxs("defs", {
            children: [
              // Imperial Tyrian Purple & Crimson Sails
              e.jsxs("linearGradient", {
                id: "sl_prp_rom", x1: "0%", y1: "0%", x2: "100%", y2: "100%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "#c084fc" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#7e22ce" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#581c87" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#3b0764" })
                ]
              }),
              // Timber Hull Left Highlights
              e.jsxs("linearGradient", {
                id: "hl_wd_l_rom", x1: "0%", y1: "0%", x2: "0%", y2: "100%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "#f59e0b" }),
                  e.jsx("stop", { offset: "50%", stopColor: "#b45309" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
                ]
              }),
              // Timber Hull Right Shadows
              e.jsxs("linearGradient", {
                id: "hl_wd_r_rom", x1: "0%", y1: "0%", x2: "0%", y2: "100%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "#78350f" }),
                  e.jsx("stop", { offset: "50%", stopColor: "#451a03" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#1c0a00" })
                ]
              }),
              // Gilded Roman Bronze Rostrum Ram
              e.jsxs("linearGradient", {
                id: "rst_bz_rom", x1: "0%", y1: "0%", x2: "100%", y2: "100%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
                  e.jsx("stop", { offset: "35%", stopColor: "#fbbf24" }),
                  e.jsx("stop", { offset: "70%", stopColor: "#d97706" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
                ]
              }),
              // Foaming Mediterranean Sea Wave
              e.jsxs("linearGradient", {
                id: "ocn_bg_rom", x1: "0%", y1: "0%", x2: "0%", y2: "100%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "#38bdf8" }),
                  e.jsx("stop", { offset: "40%", stopColor: "#0284c7" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#0369a1" })
                ]
              }),
              // Roman Carmine Scutum Shield
              e.jsxs("linearGradient", {
                id: "shd_carm_rom", x1: "0%", y1: "0%", x2: "100%", y2: "100%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "#f87171" }),
                  e.jsx("stop", { offset: "40%", stopColor: "#dc2626" }),
                  e.jsx("stop", { offset: "80%", stopColor: "#991b1b" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#450a0a" })
                ]
              }),
              // Lorica Segmentata Steel Armor
              e.jsxs("linearGradient", {
                id: "lgn_arm_rom", x1: "0%", y1: "0%", x2: "0%", y2: "100%",
                children: [
                  e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
                  e.jsx("stop", { offset: "45%", stopColor: "#e2e8f0" }),
                  e.jsx("stop", { offset: "100%", stopColor: "#94a3b8" })
                ]
              }),
              `;

if (bundle.includes(targetDefs)) {
  bundle = bundle.replace(targetDefs, enrichedDefs);
  console.log("SUCCESS: Enriched gradient shaders in BattleTheatreV2.");
} else {
  console.error("targetDefs not found in bundle");
  process.exit(1);
}

try {
  esbuild.transformSync(bundle, { loader: "jsx" });
  fs.writeFileSync(bundlePath, bundle, 'utf8');
  console.log("SUCCESS: public/assets/index-V33.js validated and saved.");

  const distPath = path.join(__dirname, '../dist/assets/index-V33.js');
  if (fs.existsSync(path.dirname(distPath))) {
    fs.writeFileSync(distPath, bundle, 'utf8');
    console.log("SUCCESS: dist/assets/index-V33.js synchronized.");
  }
} catch (err) {
  console.error("ERR transform failed:", err.message);
  process.exit(1);
}
