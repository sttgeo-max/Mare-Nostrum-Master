const fs = require('fs');
const path = require('path');

console.log("=== APPLYING COMPLETE FACTION COLOR & PLAYER MEDALLION ALIGNMENT ENGINE ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let b = fs.readFileSync(bundlePath, 'utf8');

// 1. Upgrade pFaction computation in BattleTheatreV2 to include player?.medallion
const pFactionOld = `const pFaction = player?.faction || player?.medallionVariant || player?.flagshipVariant || player?.flagshipMedallion || "constantine";`;
const pFactionNew = `const pFaction = player?.faction || player?.medallion || player?.medallionVariant || player?.flagshipVariant || player?.flagshipMedallion || player?.equippedMedallion || player?.variant || "gold";`;

if (b.includes(pFactionOld)) {
  b = b.replace(pFactionOld, pFactionNew);
  console.log("SUCCESS: Replaced pFaction computation in BattleTheatreV2.");
} else {
  console.log("pFactionOld not found directly, searching for variant...");
  let idx = b.indexOf("pFaction = player?.faction");
  if (idx !== -1) {
    let endIdx = b.indexOf(";", idx);
    let oldStr = b.substring(idx, endIdx + 1);
    console.log("Found pFaction line:", oldStr);
    b = b.replace(oldStr, `pFaction = player?.faction || player?.medallion || player?.medallionVariant || player?.flagshipVariant || player?.flagshipMedallion || player?.equippedMedallion || player?.variant || "gold";`);
    console.log("SUCCESS: Updated pFaction computation line.");
  }
}

// 2. Upgrade renderMasterwork2DMedallionUnit faction resolution to handle all medallion variants
const targetUnitStart = `const renderMasterwork2DMedallionUnit =`;
let pUnit = b.indexOf(targetUnitStart);
if (pUnit !== -1) {
  let pUnitEnd = b.indexOf("const armorSteel =", pUnit);
  if (pUnitEnd !== -1) {
    let oldUnitBlock = b.substring(pUnit, pUnitEnd);
    let newUnitBlock = `const renderMasterwork2DMedallionUnit = (x, y, isPlayer, role = "flagship", faction = "constantine", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1, unitCategory = "ship", customEmblem = "") => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isFlag = role === "flagship" || role === "commander";
  const flip = isPlayer ? 1 : -1;
  const unitTier = Math.min(5, Math.max(1, tier || 1));
  const isNaval = unitCategory === "ship";

  // Comprehensive Faction & Medallion Color Normalization
  const fRaw = String(faction || "").toLowerCase();

  // Faction Category Resolution (Matching Medallion Variants)
  const isPraetorian = fRaw.includes("praetorian") || fRaw.includes("purple") || fRaw.includes("maxentius") || fRaw.includes("amethyst") || fRaw.includes("imperial_purple") || fRaw.includes("praeclarus");
  const isUsurper = fRaw.includes("usurper") || fRaw.includes("licinius") || fRaw.includes("sanguine") || fRaw.includes("crimson") || fRaw.includes("hostis") || fRaw.includes("rubrum") || fRaw.includes("crimson_blood") || fRaw.includes("porphyry_red");
  const isPunic = fRaw.includes("punic") || fRaw.includes("carthage") || fRaw.includes("africa") || fRaw.includes("numidia") || fRaw.includes("byzacena") || fRaw.includes("sand_gold") || fRaw.includes("ochre");
  const isGreek = fRaw.includes("greek") || fRaw.includes("hellas") || fRaw.includes("achaea") || fRaw.includes("athen") || fRaw.includes("sparta") || fRaw.includes("macedon") || fRaw.includes("lapis") || fRaw.includes("aegean") || fRaw.includes("sapphire") || fRaw.includes("blue") || fRaw.includes("navis") || fRaw.includes("lapis_blue") || fRaw.includes("teal_sea");
  const isEgyptian = fRaw.includes("egypt") || fRaw.includes("aegypt") || fRaw.includes("alexandria") || fRaw.includes("ptolema") || fRaw.includes("turquoise") || fRaw.includes("teal");
  const isBarbarian = fRaw.includes("barb") || fRaw.includes("celt") || fRaw.includes("gaul") || fRaw.includes("germani") || fRaw.includes("vandal") || fRaw.includes("emerald") || fRaw.includes("moss") || fRaw.includes("green") || fRaw.includes("malachite_green");
  const isPirate = fRaw.includes("pirat") || fRaw.includes("corsair") || fRaw.includes("illyria") || fRaw.includes("cilicia") || fRaw.includes("obsidian") || fRaw.includes("black") || fRaw.includes("obsidian_black");
  const isMerchant = fRaw.includes("merchant") || fRaw.includes("neutral") || fRaw.includes("bronze");
  const isConstantine = (!isPraetorian && !isUsurper && !isPunic && !isGreek && !isEgyptian && !isBarbarian && !isPirate && !isMerchant) || fRaw.includes("constantine") || fRaw.includes("roman") || fRaw.includes("player") || fRaw.includes("gold") || fRaw.includes("imperial") || fRaw.includes("civitas") || fRaw.includes("sol_invictus") || fRaw.includes("illustris");

  // Palette Derivations (Matching Medallion Jewels & Emblems)
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

  if (isPraetorian) {
    // Praetorian Guard: Midnight Purple & Radiant Gold with Scorpion
    sailGrad = "#581c87";
    sailBorder = "#fde047";
    scutumGrad = "#4a044e";
    scutumBorder = "#fbbf24";
    scutumEmblemColor = "#fde047";
    plumeColor = "#9333ea";
    hullWoodL = "#3b0764";
    hullWoodR = "#581c87";
    factionInsignia = "PRAET";
  } else if (isUsurper) {
    // Usurper Legions: Sanguine Blood Crimson & Dark Bronze with Fulmen
    sailGrad = "#991b1b";
    sailBorder = "#fca5a5";
    scutumGrad = "#7f1d1d";
    scutumBorder = "#ea580c";
    scutumEmblemColor = "#fecaca";
    plumeColor = "#b91c1c";
    hullWoodL = "#450a0a";
    hullWoodR = "#7f1d1d";
    factionInsignia = "HOSTIS";
  } else if (isPunic) {
    // Carthaginian / Punic: Royal Tyrian Violet & Ochre Gold with Tanit Moon
    sailGrad = "#701a75";
    sailBorder = "#fde047";
    scutumGrad = "#581c87";
    scutumBorder = "#f59e0b";
    scutumEmblemColor = "#fef08a";
    plumeColor = "#701a75";
    hullWoodL = "#3b0764";
    hullWoodR = "#581c87";
    factionInsignia = "TANIT";
  } else if (isGreek) {
    // Hellenic / Athenian / Navis: Aegean Sapphire Azure Blue & White with Athena Owl
    sailGrad = "#1e40af";
    sailBorder = "#93c5fd";
    scutumGrad = "#1d4ed8";
    scutumBorder = "#60a5fa";
    scutumEmblemColor = "#ffffff";
    plumeColor = "#2563eb";
    hullWoodL = "#1e293b";
    hullWoodR = "#334155";
    factionInsignia = "ATHEN";
  } else if (isEgyptian) {
    // Ptolemaic Egypt: Desert Sun Gold & Lapis Turquoise with Eye of Horus
    sailGrad = "#0d9488";
    sailBorder = "#fef08a";
    scutumGrad = "#0f766e";
    scutumBorder = "#f59e0b";
    scutumEmblemColor = "#fef08a";
    plumeColor = "#06b6d4";
    hullWoodL = "#78350f";
    hullWoodR = "#92400e";
    factionInsignia = "RA";
  } else if (isBarbarian) {
    // Gallic / Germanic / Vandal: Deep Forest Emerald Moss Green & Earth with Boar
    sailGrad = "#14532d";
    sailBorder = "#86efac";
    scutumGrad = "#166534";
    scutumBorder = "#a3e635";
    scutumEmblemColor = "#d9f99d";
    plumeColor = "#15803d";
    hullWoodL = "#291807";
    hullWoodR = "#45240c";
    factionInsignia = "CELT";
  } else if (isPirate) {
    // Corsair / Illyrian: Obsidian Charcoal Black & Sanguine Red with Skull
    sailGrad = "#0f172a";
    sailBorder = "#ef4444";
    scutumGrad = "#1e1b4b";
    scutumBorder = "#dc2626";
    scutumEmblemColor = "#fca5a5";
    plumeColor = "#020617";
    hullWoodL = "#09090b";
    hullWoodR = "#18181b";
    factionInsignia = "MORS";
  } else if (isMerchant) {
    // Merchants / Neutral: Amber Ochre & Sea Navy with Coin Scales
    sailGrad = "#b45309";
    sailBorder = "#fde047";
    scutumGrad = "#92400e";
    scutumBorder = "#fbbf24";
    scutumEmblemColor = "#fef08a";
    plumeColor = "#d97706";
    hullWoodL = "#451a03";
    hullWoodR = "#78350f";
    factionInsignia = "NAVIS";
  } else {
    // Constantine / Imperial Rome: Imperial Tyrian Crimson & Golden SPQR Laurel
    sailGrad = unitTier >= 4 ? "url(#sl_prp_rom)" : "#991b1b";
    sailBorder = "#fef08a";
    scutumGrad = "url(#shd_carm_rom)";
    scutumBorder = "#fbbf24";
    scutumEmblemColor = "#fef08a";
    plumeColor = "#dc2626";
    hullWoodL = "url(#hl_wd_l_rom)";
    hullWoodR = "url(#hl_wd_r_rom)";
    factionInsignia = "SPQR";
  }
`;
    b = b.replace(oldUnitBlock, newUnitBlock);
    console.log("SUCCESS: Upgraded renderMasterwork2DMedallionUnit faction palette logic.");
  }
}

// 3. Upgrade render2DShip and render2DLegion palette derivations
const renderShipStart = `const render2DShip =`;
let pShip = b.indexOf(renderShipStart);
if (pShip !== -1) {
  let pShipEnd = b.indexOf("return e.jsxs(\"g\", {", pShip);
  if (pShipEnd !== -1) {
    let oldShipHead = b.substring(pShip, pShipEnd);
    let newShipHead = `const render2DShip = (x, y, isPlayer, role = "flagship", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isFlag = role === "flagship";
  const flip = isPlayer ? 1 : -1;
  const shipTier = Math.min(5, Math.max(1, tier || 1));
  const fRaw = String(faction || "").toLowerCase();

  const isPraetorian = fRaw.includes("praetorian") || fRaw.includes("purple") || fRaw.includes("maxentius") || fRaw.includes("amethyst") || fRaw.includes("imperial_purple");
  const isUsurper = fRaw.includes("usurper") || fRaw.includes("licinius") || fRaw.includes("sanguine") || fRaw.includes("crimson") || fRaw.includes("hostis") || fRaw.includes("crimson_blood");
  const isPunic = fRaw.includes("punic") || fRaw.includes("carthage") || fRaw.includes("africa") || fRaw.includes("numidia") || fRaw.includes("sand_gold");
  const isGreek = fRaw.includes("greek") || fRaw.includes("hellas") || fRaw.includes("athen") || fRaw.includes("lapis") || fRaw.includes("aegean") || fRaw.includes("sapphire") || fRaw.includes("blue") || fRaw.includes("navis") || fRaw.includes("lapis_blue");
  const isEgyptian = fRaw.includes("egypt") || fRaw.includes("aegypt") || fRaw.includes("alexandria") || fRaw.includes("turquoise");
  const isBarbarian = fRaw.includes("barb") || fRaw.includes("celt") || fRaw.includes("gaul") || fRaw.includes("germani") || fRaw.includes("vandal") || fRaw.includes("emerald") || fRaw.includes("green") || fRaw.includes("malachite_green");
  const isPirate = fRaw.includes("pirat") || fRaw.includes("corsair") || fRaw.includes("obsidian") || fRaw.includes("black") || fRaw.includes("obsidian_black");
  const isRoman = (!isPraetorian && !isUsurper && !isPunic && !isGreek && !isEgyptian && !isBarbarian && !isPirate) || fRaw.includes("roman") || fRaw.includes("constantine") || fRaw.includes("player") || fRaw.includes("gold");

  let sailGrad = isPraetorian ? "#581c87" : (isUsurper ? "#991b1b" : (isPunic ? "#701a75" : (isGreek ? "#1e40af" : (isEgyptian ? "#0d9488" : (isBarbarian ? "#14532d" : (isPirate ? "#0f172a" : (shipTier >= 4 ? "url(#sl_prp_rom)" : "#7e22ce")))))));
  let hullWoodL = isPraetorian ? "#3b0764" : (isUsurper ? "#450a0a" : (isPunic ? "#3b0764" : (isGreek ? "#1e293b" : (isEgyptian ? "#78350f" : (isBarbarian ? "#291807" : (isPirate ? "#09090b" : "url(#hl_wd_l_rom)"))))));
  let hullWoodR = isPraetorian ? "#581c87" : (isUsurper ? "#7f1d1d" : (isPunic ? "#581c87" : (isGreek ? "#334155" : (isEgyptian ? "#92400e" : (isBarbarian ? "#45240c" : (isPirate ? "#18181b" : "url(#hl_wd_r_rom)"))))));
  const ramBronze = "url(#rst_bz_rom)";
  const goldTrim = shipTier >= 4 ? "#fef08a" : "#fbbf24";
`;
    b = b.replace(oldShipHead, newShipHead);
    console.log("SUCCESS: Upgraded render2DShip faction colors.");
  }
}

const renderLegionStart = `const render2DLegion =`;
let pLeg = b.indexOf(renderLegionStart);
if (pLeg !== -1) {
  let pLegEnd = b.indexOf("return e.jsxs(\"g\", {", pLeg);
  if (pLegEnd !== -1) {
    let oldLegHead = b.substring(pLeg, pLegEnd);
    let newLegHead = `const render2DLegion = (x, y, isPlayer, role = "cohort", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isCommander = role === "flagship" || role === "commander" || role === "centurion" || role === "legatus";
  const flip = isPlayer ? 1 : -1;
  const legionTier = Math.min(5, Math.max(1, tier || 1));
  const fRaw = String(faction || "").toLowerCase();

  const isPraetorian = fRaw.includes("praetorian") || fRaw.includes("purple") || fRaw.includes("maxentius") || fRaw.includes("amethyst") || fRaw.includes("imperial_purple");
  const isUsurper = fRaw.includes("usurper") || fRaw.includes("licinius") || fRaw.includes("sanguine") || fRaw.includes("crimson") || fRaw.includes("hostis") || fRaw.includes("crimson_blood");
  const isPunic = fRaw.includes("punic") || fRaw.includes("carthage") || fRaw.includes("africa") || fRaw.includes("numidia") || fRaw.includes("sand_gold");
  const isGreek = fRaw.includes("greek") || fRaw.includes("hellas") || fRaw.includes("athen") || fRaw.includes("lapis") || fRaw.includes("aegean") || fRaw.includes("sapphire") || fRaw.includes("blue") || fRaw.includes("navis") || fRaw.includes("lapis_blue");
  const isEgyptian = fRaw.includes("egypt") || fRaw.includes("aegypt") || fRaw.includes("alexandria") || fRaw.includes("turquoise");
  const isBarbarian = fRaw.includes("barb") || fRaw.includes("celt") || fRaw.includes("gaul") || fRaw.includes("germani") || fRaw.includes("vandal") || fRaw.includes("emerald") || fRaw.includes("green") || fRaw.includes("malachite_green");
  const isPirate = fRaw.includes("pirat") || fRaw.includes("corsair") || fRaw.includes("obsidian") || fRaw.includes("black") || fRaw.includes("obsidian_black");
  const isRoman = (!isPraetorian && !isUsurper && !isPunic && !isGreek && !isEgyptian && !isBarbarian && !isPirate) || fRaw.includes("roman") || fRaw.includes("constantine") || fRaw.includes("player") || fRaw.includes("gold");

  const scutumGrad = isPraetorian ? "#4a044e" : (isUsurper ? "#7f1d1d" : (isPunic ? "#581c87" : (isGreek ? "#1d4ed8" : (isEgyptian ? "#0f766e" : (isBarbarian ? "#166534" : (isPirate ? "#1e1b4b" : "url(#shd_carm_rom)"))))));
  const goldTrim = legionTier >= 4 ? "#fef08a" : "#fbbf24";
  const plumeColor = isPraetorian ? "#9333ea" : (isUsurper ? "#b91c1c" : (isPunic ? "#701a75" : (isGreek ? "#2563eb" : (isEgyptian ? "#06b6d4" : (isBarbarian ? "#15803d" : (isPirate ? "#020617" : "#dc2626"))))));
  const armorSteel = "url(#lgn_arm_rom)";
`;
    b = b.replace(oldLegHead, newLegHead);
    console.log("SUCCESS: Upgraded render2DLegion faction colors.");
  }
}

fs.writeFileSync(bundlePath, b, 'utf8');
console.log("SUCCESS: Saved updated index-V33.js bundle!");

// Also sync dist/ directory if dist/ exists
const distBundlePath = path.join(__dirname, '../dist/assets/index-V33.js');
if (fs.existsSync(path.dirname(distBundlePath))) {
  fs.writeFileSync(distBundlePath, b, 'utf8');
  console.log("SUCCESS: Synced updated bundle to dist/assets/index-V33.js!");
}
