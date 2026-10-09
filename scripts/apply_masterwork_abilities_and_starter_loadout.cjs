const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== RESTORING STANDARD STARTER LOADOUT & MAIN GAME PROGRESSION ===");

function restoreStandardStarterLoadout() {
  const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
  let js = fs.readFileSync(bundlePath, "utf8");

  // 1. Ensure Rl starter deck remains the standard balanced starter deck (special cards return to main game progression)
  const standardRl = 'Rl=(t="sea")=>t==="sea"?{attack:["card_ramming","card_oar_shear","card_harpax"],defense:["card_counter_ram","card_caligo_fog","card_prow_angle"],command:["card_cornicen_horn"]}:{attack:["card_velites_javelin","card_plumbatae","card_archers"],defense:["card_veteran_parry","card_defensive_orbis","card_palisade_fort"],command:["card_cornicen_horn"]}';

  const pRl = js.indexOf('Rl=(t="sea")=>');
  if (pRl !== -1) {
    const pRlEnd = js.indexOf(',uo=(t,s,a,r)=>', pRl);
    if (pRlEnd !== -1) {
      js = js.substring(0, pRl) + standardRl + js.substring(pRlEnd);
      console.log("- Ensured standard starter tactical loadouts in Rl (rare cards return to main game rewards).");
    }
  }

  // 2. Ensure rare cards are set to unlockedByDefault: false so they are unlocked via main game progression
  const unlockableRareCards = [
    "card_greek_fire",
    "card_tempestas_lightning",
    "card_venom_blade",
    "card_blood_frenzy",
    "card_corvus",
    "card_aegis_imperialis",
    "card_siphon_vitality"
  ];

  for (const cid of unlockableRareCards) {
    const cardIdMarker = `\"id\":\"${cid}\"`;
    let pCard = js.indexOf(cardIdMarker);
    if (pCard !== -1) {
      const pNextCard = js.indexOf('\"id\":\"card_', pCard + 20);
      const cardBlock = js.substring(pCard, pNextCard !== -1 ? pNextCard : pCard + 1200);
      if (cardBlock.includes('\"unlockedByDefault\":true')) {
        const fixedBlock = cardBlock.replace('\"unlockedByDefault\":true', '\"unlockedByDefault\":false');
        js = js.substring(0, pCard) + fixedBlock + js.substring(pCard + cardBlock.length);
        console.log(`- Restored ${cid} unlockedByDefault to false (unlocked through main game)`);
      }
    }
  }

  // Validate with esbuild
  try {
    esbuild.transformSync(js, { loader: "jsx" });
    fs.writeFileSync(bundlePath, js, "utf8");

    const distBundlePath = path.join(__dirname, "../dist/assets/index-V33.js");
    if (fs.existsSync(path.dirname(distBundlePath))) {
      fs.writeFileSync(distBundlePath, js, "utf8");
    }
    console.log("SUCCESS: Standard starter loadouts active. Special ability cards returned to main game.");
  } catch (e) {
    console.error("ERR: esbuild failed on restoring starter loadouts:", e.message);
    process.exit(1);
  }

  // 3. Update index.html with fresh timestamp to bust browser cache
  const timestamp = Date.now();
  const htmlPath = path.join(__dirname, "../index.html");
  if (fs.existsSync(htmlPath)) {
    let html = fs.readFileSync(htmlPath, "utf8");
    html = html.replace(/\/assets\/index-V33\.js(\?v=\d+)?/, `/assets/index-V33.js?v=${timestamp}`);
    fs.writeFileSync(htmlPath, html, "utf8");
    console.log(`- Updated index.html with fresh cachebuster timestamp ?v=${timestamp}`);

    const distHtmlPath = path.join(__dirname, "../dist/index.html");
    if (fs.existsSync(path.dirname(distHtmlPath))) {
      fs.writeFileSync(distHtmlPath, html, "utf8");
    }
  }
}

restoreStandardStarterLoadout();
