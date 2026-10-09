/**
 * Build Clean V32 - Enforcing Master Medallion & Unified High-Fidelity HUD / Icon System
 * 
 * Guarantees:
 * 1. Player Medallion: Roman Imperial Galley with purple sails and gold eagle (emblem_ship_roman).
 * 2. Enemy Pirate Medallions: Pirate Galleys with black/crimson sails, pirate rams, and oars (emblem_ship_pirate).
 * 3. Enemy Rebel Medallions: Rebel Warships with crimson sails and Chi-Rho/Rebel insignia (emblem_ship_rebel).
 * 4. Enemy Dromon Medallions: Imperial Dromons with Greek Fire siphons and emerald/gold sails (emblem_ship_dromon).
 * 5. Enemy Punic Medallions: Punic Warships with amber/red sails and crescent insignias (emblem_ship_punic).
 * 6. Sea Monsters: Abyssal Kraken, Great Leviathan, Sea Serpent, Whirlpool Beast.
 * 7. Land Legions: Roman Scutum and Eagle, Rebel Vexillum, Carthaginian/Tribal Shields.
 * 8. Land Beasts: Lion, Wolf, Boar, Bear, Cerberus, Cyclops.
 * 9. Pickups & Loot (jc): High-Definition Roman chests, solidi, amphorae, sealed papyrus scrolls, radiant gems, codices.
 * 10. Location Markers (Im, Dm, Om): High-Definition Colosseum / Roman marble temples, Alexandria lighthouse, Carthage circular Cothon port, naval & land battlefields.
 * 11. HUD Buttons (Vr): Sea Glass frosted roundels with Roman jewel bevels, custom SVG icons (Anchor, Galea helmet, Hourglass, Target, Laurel).
 * 12. Currency (fp): Roman Aureus gold coin with laurel wreath and SOL minting.
 * 13. Clean cache purging and single bundle reference in index.html.
 */

const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

function buildClean() {
  console.log("=== ENFORCING MASTER MEDALLION, COMMODITY, AUGURY & ARCHITECTURAL SYSTEM (V33) ===");

  const v28Path = path.join(__dirname, "../public/assets/index-V28.js");
  let b28 = fs.readFileSync(v28Path, "utf8");

  // Validate critical emblems in base:
  if (!b28.includes("emblem_ship_roman: t =>") || !b28.includes("emblem_ship_pirate: t =>")) {
    throw new Error("Missing required warship emblems in base!");
  }

  // Locate degraded duplicate blocks (Block 3 and Block 4) which overwrite Block 2
  const marker1 = 'je["custom_art_s_p_q_r"] = je["spqr"];';
  const p1 = b28.indexOf(marker1);
  if (p1 === -1) {
    throw new Error("Could not find end of Block 2 aliases (marker1)!");
  }
  const startCut = p1 + marker1.length;

  const marker2 = "const Ze={liburnian_raiders:";
  const endCut = b28.indexOf(marker2, startCut);
  if (endCut === -1) {
    throw new Error("Could not find start of Ze section (marker2)!");
  }

  
  let cleanJs = b28.substring(0, startCut) + b28.substring(endCut);

  // 1. Comprehensive targetName resolution in rt (Medallion)
  const rtTargetCheck = 'const targetName = w || (d === "ship" ? (m === "pirate" ? "emblem_ship_pirate" : m === "punic" ? "emblem_ship_punic" : m === "rebel" ? "emblem_ship_rebel" : "emblem_ship_roman") : d === "legion" ? (m === "punic" ? "emblem_legion_punic" : m === "rebel" ? "emblem_legion_rebel" : "emblem_legion_roman") : "spqr");';
  if (!cleanJs.includes(rtTargetCheck)) {
    throw new Error("rtTargetCheck not found in cleanJs!");
  }

  const newRtTarget = `const targetName = (() => {
    const allStr = ((d || "") + " " + (m || "") + " " + (w || "") + " " + (h || "")).toLowerCase();
    if (allStr.includes("cetus") || allStr.includes("atlantic_leviathan")) return "cetus_atlantic_leviathan";
    if (allStr.includes("kraken") || allStr.includes("hatchling")) return "abyssal_kraken_submerged";
    if (allStr.includes("leviathan")) return "great_leviathan_deep";
    if (allStr.includes("serpent") || allStr.includes("snake")) return "atlantic_sea_serpent";
    if (allStr.includes("charybdis") || allStr.includes("whirlpool")) return "charybdis_whirlpool_beast";
    if (allStr.includes("scylla")) return "sirens_scylla_monster";
    if (allStr.includes("cyclops")) return "cyclops_brute";
    if (allStr.includes("minotaur")) return "minotaur_beast";
    if (allStr.includes("medusa") || allStr.includes("gorgon")) return "medusa_gorgon";
    if (allStr.includes("cerberus")) return "cerberus_hound";
    if (allStr.includes("lion") || allStr.includes("leo")) return "african_lion";
    if (allStr.includes("wolf") || allStr.includes("lupus")) return "appennine_wolf_pack";
    if (allStr.includes("boar") || allStr.includes("aper")) return "hercynian_boar";
    if (allStr.includes("bear") || allStr.includes("ursus")) return "alpine_brown_bear";
    if (allStr.includes("scorpion")) return "saharan_scorpion";
    if (allStr.includes("poseidon") || allStr.includes("neptune")) return "poseidon_avatar";
    if (allStr.includes("triton")) return "triton_wrath";
    if (allStr.includes("siren") || allStr.includes("enchantress")) return "siren_enchantress";
    if (allStr.includes("infernus")) return "infernus";
    if (allStr.includes("pirate_king") || allStr.includes("zenobios")) return "pirate_king";
    if (allStr.includes("red_leviathan") || allStr.includes("gaius")) return "red_leviathan";
    if (allStr.includes("ghost_ship") || allStr.includes("ghost ship") || allStr.includes("spectral") || allStr.includes("phantom")) return "atlantic_ghost_ship";
    if (d === "ship" || (!d && (m === "player" || allStr.includes("ship") || allStr.includes("galley") || allStr.includes("liburn") || allStr.includes("trireme") || allStr.includes("dromon") || allStr.includes("quinquereme") || allStr.includes("corsair") || allStr.includes("pirate") || allStr.includes("raider")))) {
      if (m === "player" || m === "roman" || (allStr.includes("roman") && !allStr.includes("patrol_legionary"))) return "emblem_ship_roman";
      if (m === "dromon" || allStr.includes("dromon") || allStr.includes("fire_ship") || allStr.includes("bosphoran")) return "emblem_ship_dromon";
      if (m === "rebel" || allStr.includes("rebel") || allStr.includes("maxent") || allStr.includes("licin") || allStr.includes("usurper") || allStr.includes("gallica")) return "emblem_ship_rebel";
      if (m === "punic" || allStr.includes("punic") || allStr.includes("phoenician") || allStr.includes("carthag")) return "emblem_ship_punic";
      return "emblem_ship_pirate";
    }
    if (d === "legion" || allStr.includes("legion") || allStr.includes("cohort") || allStr.includes("centurion") || allStr.includes("spear") || allStr.includes("infantry") || allStr.includes("cavalry") || allStr.includes("warband") || allStr.includes("clan")) {
      if (m === "roman" || m === "player" || (allStr.includes("roman") && !allStr.includes("rebel"))) return "emblem_legion_roman";
      if (m === "rebel" || allStr.includes("rebel") || allStr.includes("maxent") || allStr.includes("licin") || allStr.includes("usurper") || allStr.includes("gallica")) return "emblem_legion_rebel";
      return "emblem_legion_punic";
    }
    // Commodities & Trade Goods
    if (allStr.includes("grain") || allStr.includes("wheat") || allStr.includes("frumentum")) return "commodity_grain";
    if (allStr.includes("wine") || allStr.includes("vinum") || allStr.includes("falern")) return "commodity_wine";
    if (allStr.includes("oil") || allStr.includes("oleum") || allStr.includes("olive")) return "commodity_oil";
    if (allStr.includes("marble") || allStr.includes("marmor") || allStr.includes("column")) return "commodity_marble";
    if (allStr.includes("silk") || allStr.includes("sericum") || allStr.includes("fabric")) return "commodity_silk";
    if (allStr.includes("spices") || allStr.includes("aromata") || allStr.includes("incense")) return "commodity_spices";
    if (allStr.includes("timber") || allStr.includes("lignum") || allStr.includes("cedar")) return "commodity_timber";
    if (allStr.includes("iron") || allStr.includes("ferrum") || allStr.includes("ore")) return "commodity_iron";
    if (allStr.includes("gold") || allStr.includes("aurum") || allStr.includes("aureus")) return "commodity_gold";
    if (allStr.includes("silver") || allStr.includes("argentum") || allStr.includes("denarius")) return "commodity_silver";
    if (allStr.includes("porphyry") || allStr.includes("porphyrites")) return "commodity_porphyry";

    // Auguries & Divine Omens
    if (allStr.includes("venus") || allStr.includes("favorabilis")) return "augury_venus";
    if (allStr.includes("mars") || allStr.includes("bellicus") || allStr.includes("gradivus")) return "augury_mars";
    if (allStr.includes("neptun") || allStr.includes("pacatum") || allStr.includes("tranquill")) return "augury_neptune";
    if (allStr.includes("fortuna") || allStr.includes("tutela") || allStr.includes("reducis")) return "augury_fortuna";
    if (allStr.includes("canis") || allStr.includes("obscur") || allStr.includes("sortes")) return "augury_canis";

    // Port Buildings & Harbor Structures
    if (allStr.includes("commerce") || allStr.includes("basilica") || allStr.includes("commerce_hub")) return "building_commerce_hub";
    if (allStr.includes("armamentarium") || allStr.includes("drydock") || allStr.includes("shipyard")) return "building_armamentarium";
    if (allStr.includes("horreum") || allStr.includes("granary")) return "building_horreum";
    if (allStr.includes("sanctuary") || allStr.includes("classis_sanctuary")) return "building_sanctuary";

    // Cursus Honorum Insignia Ranks
    if (allStr.includes("rank_civic") || allStr.includes("tribunus") || allStr.includes("praefectus coh")) return "rank_civic_crown";
    if (allStr.includes("rank_naval") || allStr.includes("legatus") || allStr.includes("praefectus cla")) return "rank_naval_crown";
    if (allStr.includes("rank_aquila") || allStr.includes("dux") || allStr.includes("magister")) return "rank_aquila_standard";
    if (allStr.includes("rank_curule") || allStr.includes("vicarius") || allStr.includes("caesar")) return "rank_curule_baton";
    if (allStr.includes("rank_sol") || allStr.includes("augustus") || allStr.includes("imperator")) return "rank_sol_imperator";

    if (je[w] || Ze[w] || je[d] || Ze[d]) return (je[w] || Ze[w]) ? w : d;
    return w || "spqr";
  })();`;
  cleanJs = cleanJs.replace(rtTargetCheck, newRtTarget);
  

  // Inject comprehensive vector aliases for Ze and upgrade $i to prioritize offline vector SVGs
  const oldDollarI = `,$i=({name:t="",variant:s,className:a="",style:r,width:o,height:l})=>{const raw=(t||"").toString().trim(),c=raw.toLowerCase(),i=c.replace(/^custom_/,"");const p=je[raw]||je[t]||je[c]||je[i]||je["art_"+i]||je["emblem_"+i]||je["custom_"+i];if(p){const{fill:fl,color:cl,...clean}=r||{};return e.jsx(p,{className:a,style:clean,width:o,height:l})}const x=Ze[raw]||Ze[t]||Ze[c]||Ze[i];if(x)return e.jsx(x,{className:a,style:r,width:o,height:l});`;
  const dollarIdx = cleanJs.indexOf(oldDollarI);
  if (dollarIdx !== -1) {
    const newDollarI = `,$i=({name:t="",variant:s,className:a="",style:r,width:o,height:l})=>{const raw=(t||"").toString().trim(),c=raw.toLowerCase(),i=c.replace(/^custom_/,"").replace(/^art_/,"").replace(/^emblem_/,"");const x=Ze[raw]||Ze[t]||Ze[c]||Ze[i]||Ze["custom_"+i]||Ze["emblem_"+i]||Ze[i+"_brute"]||Ze[i+"_beast"]||Ze[i+"_hound"]||Ze[i+"_gorgon"]||Ze[i+"_pack"]||Ze[i+"_submerged"]||Ze[i+"_deep"]||(i==="cetus"||i==="cetus_atlantic_leviathan"||i==="atlantic_leviathan"?Ze.cetus_atlantic_leviathan:i==="kraken"||i==="abyssal_kraken"||i==="abyssal_kraken_submerged"?Ze.abyssal_kraken_submerged:i==="leviathan"||i==="great_leviathan"||i==="great_leviathan_deep"?Ze.great_leviathan_deep:i==="serpent"||i==="atlantic_sea_serpent"||i==="sea_serpent"?Ze.atlantic_sea_serpent:i==="charybdis"||i==="charybdis_whirlpool_beast"?Ze.charybdis_whirlpool_beast:i==="scylla"||i==="sirens_scylla_monster"?Ze.sirens_scylla_monster:i==="cyclops"?Ze.cyclops_brute:i==="cerberus"?Ze.cerberus_hound:i==="minotaur"?Ze.minotaur_beast:i==="medusa"?Ze.medusa_gorgon:i==="lion"?Ze.african_lion:i==="wolf"?Ze.appennine_wolf_pack:i==="boar"?Ze.hercynian_boar:i==="bear"?Ze.alpine_brown_bear:i==="scorpion"?Ze.saharan_scorpion:i==="siren"?Ze.siren_enchantress:i==="poseidon"?Ze.poseidon_avatar:i==="triton"?Ze.triton_wrath:i==="ghost_ship"?Ze.atlantic_ghost_ship:i==="pirate_king"?Ze.pirate_king:i==="red_leviathan"?Ze.red_leviathan:i==="infernus"?Ze.infernus:null);if(x)return e.jsx(x,{className:a,style:r,width:o,height:l});const p=je[raw]||je[t]||je[c]||je[i]||je["art_"+i]||je["emblem_"+i]||je["custom_"+i];if(p){const{fill:fl,color:cl,...clean}=r||{};return e.jsx(p,{className:a,style:clean,width:o,height:l})};`;
    cleanJs = cleanJs.replace(oldDollarI, newDollarI);
    
  }

  // Inject Master Monster SVGs into Ze and alias tables
  const zeAssignMarker = "Object.assign(Ze,{corsair_flagship:";
  const zeAssignIdx = cleanJs.indexOf(zeAssignMarker);
  if (zeAssignIdx !== -1) {
    const zeAssignEnd = cleanJs.indexOf("});", zeAssignIdx);
    if (zeAssignEnd !== -1) {
      const monsterSVGsCode = `Object.assign(Ze, {
        cetus_atlantic_leviathan: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#0369a1", opacity: "0.6" }),
          e.jsx("path", { d: "M 22,65 C 22,35 34,18 50,18 C 66,18 78,35 78,65 C 78,78 64,84 50,84 C 36,84 22,78 22,65 Z", fill: "#0e7490", stroke: "#164e63", strokeWidth: "2" }),
          e.jsx("path", { d: "M 28,62 C 28,38 38,24 50,24 C 62,24 72,38 72,62 C 72,74 62,78 50,78 C 38,78 28,74 28,62 Z", fill: "#06b6d4", opacity: "0.9" }),
          e.jsx("path", { d: "M 50,6 L 46,18 L 54,18 Z M 36,14 L 38,24 L 32,22 Z M 64,14 L 62,24 L 68,22 Z M 24,28 L 28,36 L 22,36 Z M 76,28 L 72,36 L 78,36 Z", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1" }),
          e.jsx("circle", { cx: "36", cy: "42", r: "4.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1.2" }),
          e.jsx("circle", { cx: "64", cy: "42", r: "4.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1.2" }),
          e.jsx("ellipse", { cx: "36", cy: "42", rx: "1.5", ry: "3.5", fill: "#fef08a" }),
          e.jsx("ellipse", { cx: "64", cy: "42", rx: "1.5", ry: "3.5", fill: "#fef08a" }),
          e.jsx("path", { d: "M 44,48 L 50,52 L 56,48", stroke: "#164e63", strokeWidth: "2", fill: "none" }),
          e.jsx("path", { d: "M 32,58 Q 50,52 68,58 Q 62,74 50,74 Q 38,74 32,58 Z", fill: "#155e75", stroke: "#083344", strokeWidth: "1.5" }),
          e.jsx("polygon", { points: "36,58 39,66 42,58", fill: "#fef08a" }),
          e.jsx("polygon", { points: "44,57 47,67 50,57", fill: "#fef08a" }),
          e.jsx("polygon", { points: "50,57 53,67 56,57", fill: "#fef08a" }),
          e.jsx("polygon", { points: "58,58 61,66 64,58", fill: "#fef08a" }),
          e.jsx("polygon", { points: "40,72 43,65 46,72", fill: "#fef08a" }),
          e.jsx("polygon", { points: "54,72 57,65 60,72", fill: "#fef08a" }),
          e.jsx("path", { d: "M 8,78 Q 28,68 50,74 Q 72,68 92,78", fill: "none", stroke: "#bae6fd", strokeWidth: "2.5", strokeLinecap: "round" })
        ]}),
        abyssal_kraken_submerged: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 32,44 C 32,20 40,10 50,10 C 60,10 68,20 68,44 C 68,54 60,60 50,60 C 40,60 32,54 32,44 Z", fill: "#0f766e", stroke: "#134e4a", strokeWidth: "1.5" }),
          e.jsx("path", { d: "M 36,42 C 36,24 42,14 50,14 C 58,14 64,24 64,42 C 64,50 58,56 50,56 C 42,56 36,50 36,42 Z", fill: "#14b8a6", opacity: "0.9" }),
          e.jsx("path", { d: "M 42,12 L 50,4 L 58,12", fill: "#f59e0b", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("circle", { cx: "42", cy: "44", r: "4.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("circle", { cx: "58", cy: "44", r: "4.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("ellipse", { cx: "42", cy: "44", rx: "1.5", ry: "3", fill: "#042f2e" }),
          e.jsx("ellipse", { cx: "58", cy: "44", rx: "1.5", ry: "3", fill: "#042f2e" }),
          e.jsx("path", { d: "M 34,54 C 18,58 8,72 16,88 C 22,82 24,70 38,62", fill: "none", stroke: "#0d9488", strokeWidth: "4.5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 66,54 C 82,58 92,72 84,88 C 78,82 76,70 62,62", fill: "none", stroke: "#0d9488", strokeWidth: "4.5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 40,58 C 28,68 22,82 32,94 C 36,86 38,76 46,64", fill: "none", stroke: "#14b8a6", strokeWidth: "4", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 60,58 C 72,68 78,82 68,94 C 64,86 62,76 54,64", fill: "none", stroke: "#14b8a6", strokeWidth: "4", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 46,60 C 42,74 44,84 48,96", fill: "none", stroke: "#2dd4bf", strokeWidth: "3.5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 54,60 C 58,74 56,84 52,96", fill: "none", stroke: "#2dd4bf", strokeWidth: "3.5", strokeLinecap: "round" }),
          e.jsx("circle", { cx: "14", cy: "76", r: "1.8", fill: "#fef08a" }),
          e.jsx("circle", { cx: "86", cy: "76", r: "1.8", fill: "#fef08a" }),
          e.jsx("circle", { cx: "26", cy: "84", r: "1.8", fill: "#fef08a" }),
          e.jsx("circle", { cx: "74", cy: "84", r: "1.8", fill: "#fef08a" })
        ]}),
        great_leviathan_deep: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 10,78 Q 50,68 90,78 L 90,88 L 10,88 Z", fill: "#0369a1", opacity: "0.6" }),
          e.jsx("path", { d: "M 22,65 C 22,35 34,18 50,18 C 66,18 78,35 78,65 C 78,78 64,84 50,84 C 36,84 22,78 22,65 Z", fill: "#0e7490", stroke: "#164e63", strokeWidth: "2" }),
          e.jsx("path", { d: "M 28,62 C 28,38 38,24 50,24 C 62,24 72,38 72,62 C 72,74 62,78 50,78 C 38,78 28,74 28,62 Z", fill: "#06b6d4", opacity: "0.9" }),
          e.jsx("path", { d: "M 50,6 L 46,18 L 54,18 Z M 36,14 L 38,24 L 32,22 Z M 64,14 L 62,24 L 68,22 Z M 24,28 L 28,36 L 22,36 Z M 76,28 L 72,36 L 78,36 Z", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1" }),
          e.jsx("circle", { cx: "36", cy: "42", r: "4.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1.2" }),
          e.jsx("circle", { cx: "64", cy: "42", r: "4.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1.2" }),
          e.jsx("ellipse", { cx: "36", cy: "42", rx: "1.5", ry: "3.5", fill: "#fef08a" }),
          e.jsx("ellipse", { cx: "64", cy: "42", rx: "1.5", ry: "3.5", fill: "#fef08a" }),
          e.jsx("path", { d: "M 44,48 L 50,52 L 56,48", stroke: "#164e63", strokeWidth: "2", fill: "none" }),
          e.jsx("path", { d: "M 32,58 Q 50,52 68,58 Q 62,74 50,74 Q 38,74 32,58 Z", fill: "#155e75", stroke: "#083344", strokeWidth: "1.5" }),
          e.jsx("polygon", { points: "36,58 39,66 42,58", fill: "#fef08a" }),
          e.jsx("polygon", { points: "44,57 47,67 50,57", fill: "#fef08a" }),
          e.jsx("polygon", { points: "50,57 53,67 56,57", fill: "#fef08a" }),
          e.jsx("polygon", { points: "58,58 61,66 64,58", fill: "#fef08a" }),
          e.jsx("polygon", { points: "40,72 43,65 46,72", fill: "#fef08a" }),
          e.jsx("polygon", { points: "54,72 57,65 60,72", fill: "#fef08a" }),
          e.jsx("path", { d: "M 8,78 Q 28,68 50,74 Q 72,68 92,78", fill: "none", stroke: "#bae6fd", strokeWidth: "2.5", strokeLinecap: "round" })
        ]}),
        atlantic_sea_serpent: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 12,80 Q 50,70 88,80 L 88,88 L 12,88 Z", fill: "#064e3b", opacity: "0.6" }),
          e.jsx("path", { d: "M 26,62 C 26,36 36,22 50,22 C 64,22 74,36 74,62 C 74,76 62,82 50,82 C 38,82 26,76 26,62 Z", fill: "#047857", stroke: "#064e3b", strokeWidth: "2" }),
          e.jsx("path", { d: "M 32,58 C 32,40 40,28 50,28 C 60,28 68,40 68,58 C 68,70 60,76 50,76 C 40,76 32,70 32,58 Z", fill: "#10b981", opacity: "0.9" }),
          e.jsx("path", { d: "M 50,8 L 47,20 L 53,20 Z M 38,16 L 40,24 L 34,24 Z M 62,16 L 60,24 L 66,24 Z", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1" }),
          e.jsx("circle", { cx: "38", cy: "44", r: "4", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("circle", { cx: "62", cy: "44", r: "4", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("ellipse", { cx: "38", cy: "44", rx: "1.5", ry: "3", fill: "#7f1d1d" }),
          e.jsx("ellipse", { cx: "62", cy: "44", rx: "1.5", ry: "3", fill: "#7f1d1d" }),
          e.jsx("path", { d: "M 36,60 Q 50,56 64,60 Q 58,72 50,72 Q 42,72 36,60 Z", fill: "#065f46" }),
          e.jsx("polygon", { points: "40,60 43,66 46,60", fill: "#fff" }),
          e.jsx("polygon", { points: "54,60 57,66 60,60", fill: "#fff" }),
          e.jsx("path", { d: "M 50,66 L 50,76 L 46,80 M 50,76 L 54,80", stroke: "#ef4444", strokeWidth: "1.8", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 10,80 Q 30,72 50,78 Q 70,72 90,80", fill: "none", stroke: "#6ee7b7", strokeWidth: "2", strokeLinecap: "round" })
        ]}),
        charybdis_whirlpool_beast: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("circle", { cx: "50", cy: "50", r: "42", fill: "#0c4a6e", stroke: "#0369a1", strokeWidth: "2" }),
          e.jsx("path", { d: "M 50,12 C 72,12 88,28 88,50 C 88,68 74,84 56,88 C 36,92 18,78 14,60 C 10,40 24,22 42,18 C 58,14 72,26 74,42 C 76,56 66,68 52,68 C 40,68 32,58 34,48 C 36,40 44,34 50,38 C 54,40 54,46 50,48", fill: "none", stroke: "#38bdf8", strokeWidth: "3.5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 50,22 L 53,30 L 47,30 Z M 78,50 L 70,53 L 70,47 Z M 50,78 L 47,70 L 53,70 Z M 22,50 L 30,47 L 30,53 Z M 68,32 L 62,38 L 66,41 Z M 32,68 L 38,62 L 34,59 Z", fill: "#f8fafc", stroke: "#cbd5e1", strokeWidth: "0.8" }),
          e.jsx("circle", { cx: "50", cy: "50", r: "7", fill: "#020617", stroke: "#ef4444", strokeWidth: "1.5" }),
          e.jsx("circle", { cx: "50", cy: "50", r: "2.5", fill: "#facc15" })
        ]}),
        sirens_scylla_monster: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 42,80 C 42,50 44,30 50,18 C 56,30 58,50 58,80", fill: "none", stroke: "#047857", strokeWidth: "6", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 42,80 C 34,60 26,44 18,30", fill: "none", stroke: "#059669", strokeWidth: "5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 58,80 C 66,60 74,44 82,30", fill: "none", stroke: "#059669", strokeWidth: "5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 44,18 L 50,10 L 56,18 L 50,24 Z", fill: "#10b981", stroke: "#047857", strokeWidth: "1" }),
          e.jsx("path", { d: "M 12,30 L 18,22 L 24,30 L 18,36 Z", fill: "#10b981", stroke: "#047857", strokeWidth: "1" }),
          e.jsx("path", { d: "M 76,30 L 82,22 L 88,30 L 82,36 Z", fill: "#10b981", stroke: "#047857", strokeWidth: "1" }),
          e.jsx("circle", { cx: "48", cy: "16", r: "1.5", fill: "#ef4444" }),
          e.jsx("circle", { cx: "52", cy: "16", r: "1.5", fill: "#ef4444" }),
          e.jsx("circle", { cx: "16", cy: "28", r: "1.5", fill: "#ef4444" }),
          e.jsx("circle", { cx: "20", cy: "28", r: "1.5", fill: "#ef4444" }),
          e.jsx("circle", { cx: "80", cy: "28", r: "1.5", fill: "#ef4444" }),
          e.jsx("circle", { cx: "84", cy: "28", r: "1.5", fill: "#ef4444" }),
          e.jsx("path", { d: "M 10,82 Q 30,74 50,80 Q 70,74 90,82", fill: "none", stroke: "#6ee7b7", strokeWidth: "2.5", strokeLinecap: "round" })
        ]}),
        siren_enchantress: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 24,42 C 22,20 34,12 50,12 C 66,12 78,20 76,42 C 74,60 62,70 50,70 C 38,70 26,60 24,42 Z", fill: "#f59e0b", stroke: "#b45309", strokeWidth: "1.5" }),
          e.jsx("circle", { cx: "50", cy: "38", r: "16", fill: "#fed7aa", stroke: "#ea580c", strokeWidth: "1" }),
          e.jsx("path", { d: "M 32,32 C 36,18 64,18 68,32 C 60,26 40,26 32,32 Z", fill: "#d97706" }),
          e.jsx("circle", { cx: "43", cy: "36", r: "2.5", fill: "#0284c7" }),
          e.jsx("circle", { cx: "57", cy: "36", r: "2.5", fill: "#0284c7" }),
          e.jsx("circle", { cx: "43", cy: "36", r: "1", fill: "#fff" }),
          e.jsx("circle", { cx: "57", cy: "36", r: "1", fill: "#fff" }),
          e.jsx("path", { d: "M 46,44 Q 50,48 54,44", fill: "none", stroke: "#e11d48", strokeWidth: "1.8", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 38,62 C 34,74 42,86 50,94 C 58,86 66,74 62,62 Z", fill: "#0d9488", stroke: "#042f2e", strokeWidth: "1.5" }),
          e.jsx("path", { d: "M 32,84 L 50,96 L 68,84 C 60,88 40,88 32,84 Z", fill: "#14b8a6", stroke: "#0f766e", strokeWidth: "1" }),
          e.jsx("path", { d: "M 42,14 L 50,6 L 58,14", stroke: "#facc15", strokeWidth: "2", fill: "#eab308" })
        ]}),
        cyclops_brute: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 24,52 C 24,28 34,18 50,18 C 66,18 76,28 76,52 C 76,74 66,86 50,86 C 34,86 24,74 24,52 Z", fill: "#9a3412", stroke: "#431407", strokeWidth: "2" }),
          e.jsx("path", { d: "M 28,48 C 28,32 36,22 50,22 C 64,22 72,32 72,48 C 72,68 64,78 50,78 C 36,78 28,68 28,48 Z", fill: "#c2410c", opacity: "0.9" }),
          e.jsx("path", { d: "M 30,22 Q 50,12 70,22 L 68,28 Q 50,20 32,28 Z", fill: "#d97706", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("path", { d: "M 32,36 Q 50,28 68,36 Q 66,42 50,38 Q 34,42 32,36 Z", fill: "#431407" }),
          e.jsx("circle", { cx: "50", cy: "44", r: "10", fill: "#fef08a", stroke: "#78350f", strokeWidth: "2" }),
          e.jsx("circle", { cx: "50", cy: "44", r: "5.5", fill: "#dc2626" }),
          e.jsx("circle", { cx: "50", cy: "44", r: "2.5", fill: "#000" }),
          e.jsx("path", { d: "M 44,58 L 50,62 L 56,58", stroke: "#431407", strokeWidth: "2", fill: "none" }),
          e.jsx("path", { d: "M 36,68 Q 50,62 64,68", stroke: "#431407", strokeWidth: "3", strokeLinecap: "round" }),
          e.jsx("polygon", { points: "40,68 43,62 46,68", fill: "#f8fafc" }),
          e.jsx("polygon", { points: "54,68 57,62 60,68", fill: "#f8fafc" }),
          e.jsx("path", { d: "M 30,74 Q 50,88 70,74 Q 58,94 42,94 Z", fill: "#7c2d12" })
        ]}),
        minotaur_beast: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 28,32 C 12,20 8,6 16,4 C 24,2 32,16 36,26", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "2", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 72,32 C 88,20 92,6 84,4 C 76,2 68,16 64,26", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "2", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 26,48 C 26,28 36,20 50,20 C 64,20 74,28 74,48 C 74,72 64,84 50,84 C 36,84 26,72 26,48 Z", fill: "#78350f", stroke: "#451a03", strokeWidth: "2" }),
          e.jsx("path", { d: "M 30,46 C 30,32 38,24 50,24 C 62,24 70,32 70,46 C 70,66 62,78 50,78 C 38,78 30,66 30,46 Z", fill: "#92400e", opacity: "0.95" }),
          e.jsx("circle", { cx: "38", cy: "42", r: "4", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1" }),
          e.jsx("circle", { cx: "62", cy: "42", r: "4", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1" }),
          e.jsx("ellipse", { cx: "50", cy: "64", rx: "16", ry: "12", fill: "#451a03" }),
          e.jsx("circle", { cx: "44", cy: "62", r: "3", fill: "#000" }),
          e.jsx("circle", { cx: "56", cy: "62", r: "3", fill: "#000" }),
          e.jsx("circle", { cx: "50", cy: "74", r: "6", fill: "none", stroke: "#facc15", strokeWidth: "2.5" })
        ]}),
        medusa_gorgon: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 20,38 C 10,24 16,10 28,14 C 36,18 32,30 40,32 M 80,38 C 90,24 84,10 72,14 C 64,18 68,30 60,32 M 30,22 C 26,8 44,4 48,16 M 70,22 C 74,8 56,4 52,16 M 16,52 C 6,42 12,32 24,36 M 84,52 C 94,42 88,32 76,36", fill: "none", stroke: "#10b981", strokeWidth: "3.5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 26,14 L 30,12 L 28,18 Z M 74,14 L 70,12 L 72,18 Z M 48,14 L 52,10 L 50,18 Z", fill: "#ef4444" }),
          e.jsx("circle", { cx: "50", cy: "52", r: "24", fill: "#15803d", stroke: "#14532d", strokeWidth: "2" }),
          e.jsx("circle", { cx: "50", cy: "52", r: "20", fill: "#22c55e", opacity: "0.9" }),
          e.jsx("ellipse", { cx: "42", cy: "48", rx: "4.5", ry: "3", fill: "#fef08a", stroke: "#713f12", strokeWidth: "1" }),
          e.jsx("ellipse", { cx: "58", cy: "48", rx: "4.5", ry: "3", fill: "#fef08a", stroke: "#713f12", strokeWidth: "1" }),
          e.jsx("ellipse", { cx: "42", cy: "48", rx: "1.5", ry: "3", fill: "#7f1d1d" }),
          e.jsx("ellipse", { cx: "58", cy: "48", rx: "1.5", ry: "3", fill: "#7f1d1d" }),
          e.jsx("path", { d: "M 48,52 L 50,58 L 52,52", stroke: "#14532d", strokeWidth: "1.5", fill: "none" }),
          e.jsx("path", { d: "M 42,64 Q 50,70 58,64", stroke: "#7f1d1d", strokeWidth: "2", fill: "none", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 50,66 L 50,74 L 46,78 M 50,74 L 54,78", stroke: "#ef4444", strokeWidth: "1.5", strokeLinecap: "round" })
        ]}),
        cerberus_hound: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("circle", { cx: "50", cy: "44", r: "18", fill: "#1c1917", stroke: "#44403c", strokeWidth: "1.5" }),
          e.jsx("circle", { cx: "50", cy: "44", r: "15", fill: "#292524" }),
          e.jsx("circle", { cx: "28", cy: "50", r: "15", fill: "#1c1917", stroke: "#44403c", strokeWidth: "1.5" }),
          e.jsx("circle", { cx: "28", cy: "50", r: "12", fill: "#292524" }),
          e.jsx("circle", { cx: "72", cy: "50", r: "15", fill: "#1c1917", stroke: "#44403c", strokeWidth: "1.5" }),
          e.jsx("circle", { cx: "72", cy: "50", r: "12", fill: "#292524" }),
          e.jsx("polygon", { points: "42,30 46,20 50,30", fill: "#44403c" }),
          e.jsx("polygon", { points: "50,30 54,20 58,30", fill: "#44403c" }),
          e.jsx("polygon", { points: "20,40 22,28 28,38", fill: "#44403c" }),
          e.jsx("polygon", { points: "72,38 78,28 80,40", fill: "#44403c" }),
          e.jsx("circle", { cx: "45", cy: "42", r: "2.5", fill: "#ef4444" }),
          e.jsx("circle", { cx: "55", cy: "42", r: "2.5", fill: "#ef4444" }),
          e.jsx("circle", { cx: "24", cy: "48", r: "2.2", fill: "#ef4444" }),
          e.jsx("circle", { cx: "32", cy: "48", r: "2.2", fill: "#ef4444" }),
          e.jsx("circle", { cx: "68", cy: "48", r: "2.2", fill: "#ef4444" }),
          e.jsx("circle", { cx: "76", cy: "48", r: "2.2", fill: "#ef4444" }),
          e.jsx("path", { d: "M 44,52 Q 50,56 56,52 L 54,58 L 50,54 L 46,58 Z", fill: "#f8fafc", stroke: "#7f1d1d", strokeWidth: "1" }),
          e.jsx("path", { d: "M 22,58 Q 28,62 34,58", stroke: "#f8fafc", strokeWidth: "1.5" }),
          e.jsx("path", { d: "M 66,58 Q 72,62 78,58", stroke: "#f8fafc", strokeWidth: "1.5" }),
          e.jsx("path", { d: "M 20,74 C 36,84 64,84 80,74", stroke: "#dc2626", strokeWidth: "4.5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 30,76 L 30,84 M 50,78 L 50,86 M 70,76 L 70,84", stroke: "#facc15", strokeWidth: "2" })
        ]}),
        african_lion: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 50,12 Q 68,16 78,30 Q 90,48 82,68 Q 68,88 50,88 Q 32,88 18,68 Q 10,48 22,30 Q 32,16 50,12 Z", fill: "#b45309", stroke: "#78350f", strokeWidth: "2" }),
          e.jsx("circle", { cx: "50", cy: "52", r: "22", fill: "#f59e0b", stroke: "#d97706", strokeWidth: "1.5" }),
          e.jsx("circle", { cx: "32", cy: "36", r: "6", fill: "#d97706" }),
          e.jsx("circle", { cx: "68", cy: "36", r: "6", fill: "#d97706" }),
          e.jsx("ellipse", { cx: "42", cy: "48", rx: "3.5", ry: "2.5", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("ellipse", { cx: "58", cy: "48", rx: "3.5", ry: "2.5", fill: "#fef08a", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("circle", { cx: "42", cy: "48", r: "1.5", fill: "#000" }),
          e.jsx("circle", { cx: "58", cy: "48", r: "1.5", fill: "#000" }),
          e.jsx("polygon", { points: "46,56 54,56 50,62", fill: "#78350f" }),
          e.jsx("path", { d: "M 42,66 Q 50,62 58,66 Q 50,74 42,66 Z", fill: "#451a03" }),
          e.jsx("polygon", { points: "44,65 46,69 48,65", fill: "#fff" }),
          e.jsx("polygon", { points: "52,65 54,69 56,65", fill: "#fff" })
        ]}),
        appennine_wolf_pack: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 22,50 C 22,28 34,16 50,16 C 66,16 78,28 78,50 C 78,74 66,86 50,86 C 34,86 22,74 22,50 Z", fill: "#44403c", stroke: "#1c1917", strokeWidth: "2" }),
          e.jsx("path", { d: "M 26,48 C 26,30 36,20 50,20 C 64,20 74,30 74,48 C 74,70 64,80 50,80 C 36,80 26,70 26,48 Z", fill: "#78716c", opacity: "0.95" }),
          e.jsx("polygon", { points: "24,34 28,12 40,24", fill: "#292524", stroke: "#1c1917", strokeWidth: "1" }),
          e.jsx("polygon", { points: "76,34 72,12 60,24", fill: "#292524", stroke: "#1c1917", strokeWidth: "1" }),
          e.jsx("polygon", { points: "28,32 31,16 38,24", fill: "#a8a29e" }),
          e.jsx("polygon", { points: "72,32 69,16 62,24", fill: "#a8a29e" }),
          e.jsx("ellipse", { cx: "38", cy: "44", rx: "4", ry: "2.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("ellipse", { cx: "62", cy: "44", rx: "4", ry: "2.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("circle", { cx: "38", cy: "44", r: "1.5", fill: "#000" }),
          e.jsx("circle", { cx: "62", cy: "44", r: "1.5", fill: "#000" }),
          e.jsx("ellipse", { cx: "50", cy: "60", rx: "10", ry: "8", fill: "#1c1917" }),
          e.jsx("polygon", { points: "46,56 54,56 50,62", fill: "#292524" }),
          e.jsx("path", { d: "M 40,68 Q 50,62 60,68 Q 50,76 40,68 Z", fill: "#1c1917" }),
          e.jsx("polygon", { points: "42,67 44,72 46,67", fill: "#fff" }),
          e.jsx("polygon", { points: "54,67 56,72 58,67", fill: "#fff" }),
          e.jsx("path", { d: "M 32,74 C 42,84 58,84 68,74", stroke: "#d6d3d1", strokeWidth: "2", strokeLinecap: "round" })
        ]}),
        hercynian_boar: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 24,50 C 24,26 34,16 50,16 C 66,16 76,26 76,50 C 76,74 66,86 50,86 C 34,86 24,74 24,50 Z", fill: "#451a03", stroke: "#1c1917", strokeWidth: "2" }),
          e.jsx("path", { d: "M 28,48 C 28,30 36,20 50,20 C 64,20 72,30 72,48 C 72,70 64,80 50,80 C 36,80 28,70 28,48 Z", fill: "#78350f", opacity: "0.95" }),
          e.jsx("path", { d: "M 42,8 L 46,18 L 54,18 L 58,8 Z", fill: "#ca8a04", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("polygon", { points: "22,34 26,16 36,26", fill: "#292524" }),
          e.jsx("polygon", { points: "78,34 74,16 64,26", fill: "#292524" }),
          e.jsx("circle", { cx: "36", cy: "42", r: "3.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1" }),
          e.jsx("circle", { cx: "64", cy: "42", r: "3.5", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1" }),
          e.jsx("circle", { cx: "36", cy: "42", r: "1.5", fill: "#000" }),
          e.jsx("circle", { cx: "64", cy: "42", r: "1.5", fill: "#000" }),
          e.jsx("ellipse", { cx: "50", cy: "58", rx: "14", ry: "10", fill: "#1c1917" }),
          e.jsx("circle", { cx: "44", cy: "58", r: "3.5", fill: "#000" }),
          e.jsx("circle", { cx: "56", cy: "58", r: "3.5", fill: "#000" }),
          e.jsx("path", { d: "M 32,68 C 22,60 22,46 26,38 C 28,46 34,54 36,60 Z", fill: "#fef08a", stroke: "#ca8a04", strokeWidth: "1" }),
          e.jsx("path", { d: "M 68,68 C 78,60 78,46 74,38 C 72,46 66,54 64,60 Z", fill: "#fef08a", stroke: "#ca8a04", strokeWidth: "1" }),
          e.jsx("path", { d: "M 38,72 Q 50,68 62,72", stroke: "#451a03", strokeWidth: "2.5", strokeLinecap: "round" })
        ]}),
        alpine_brown_bear: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("circle", { cx: "26", cy: "28", r: "10", fill: "#451a03", stroke: "#1c1917", strokeWidth: "1.5" }),
          e.jsx("circle", { cx: "74", cy: "28", r: "10", fill: "#451a03", stroke: "#1c1917", strokeWidth: "1.5" }),
          e.jsx("circle", { cx: "26", cy: "28", r: "6", fill: "#78350f" }),
          e.jsx("circle", { cx: "74", cy: "28", r: "6", fill: "#78350f" }),
          e.jsx("circle", { cx: "50", cy: "52", r: "32", fill: "#451a03", stroke: "#1c1917", strokeWidth: "2" }),
          e.jsx("circle", { cx: "50", cy: "52", r: "28", fill: "#78350f", opacity: "0.95" }),
          e.jsx("circle", { cx: "38", cy: "44", r: "3.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("circle", { cx: "62", cy: "44", r: "3.5", fill: "#facc15", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("circle", { cx: "38", cy: "44", r: "1.8", fill: "#000" }),
          e.jsx("circle", { cx: "62", cy: "44", r: "1.8", fill: "#000" }),
          e.jsx("ellipse", { cx: "50", cy: "62", rx: "16", ry: "12", fill: "#d97706" }),
          e.jsx("polygon", { points: "46,58 54,58 50,64", fill: "#1c1917" }),
          e.jsx("path", { d: "M 42,68 Q 50,64 58,68 L 56,72 L 50,68 L 44,72 Z", fill: "#fff", stroke: "#451a03", strokeWidth: "1" })
        ]}),
        saharan_scorpion: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("ellipse", { cx: "50", cy: "58", rx: "16", ry: "22", fill: "#78350f", stroke: "#451a03", strokeWidth: "2" }),
          e.jsx("ellipse", { cx: "50", cy: "58", rx: "13", ry: "18", fill: "#b45309", opacity: "0.9" }),
          e.jsx("path", { d: "M 50,40 C 50,22 46,14 50,8 C 54,14 50,22 50,40", fill: "none", stroke: "#d97706", strokeWidth: "5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 46,8 L 50,2 L 54,8 Z", fill: "#ef4444", stroke: "#7f1d1d", strokeWidth: "1" }),
          e.jsx("circle", { cx: "50", cy: "3", r: "2.5", fill: "#84cc16" }),
          e.jsx("path", { d: "M 38,50 C 22,44 14,32 18,20 C 22,12 32,18 30,28", fill: "none", stroke: "#92400e", strokeWidth: "4.5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 62,50 C 78,44 86,32 82,20 C 78,12 68,18 70,28", fill: "none", stroke: "#92400e", strokeWidth: "4.5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 14,20 L 22,14 L 24,24 Z M 86,20 L 78,14 L 76,24 Z", fill: "#f59e0b", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("path", { d: "M 36,60 L 20,64 M 36,68 L 18,74 M 38,76 L 22,84 M 64,60 L 80,64 M 64,68 L 82,74 M 62,76 L 78,84", stroke: "#78350f", strokeWidth: "2.5", strokeLinecap: "round" }),
          e.jsx("circle", { cx: "44", cy: "44", r: "2", fill: "#fef08a" }),
          e.jsx("circle", { cx: "56", cy: "44", r: "2", fill: "#fef08a" })
        ]}),
        poseidon_avatar: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("circle", { cx: "50", cy: "38", r: "18", fill: "#0369a1", stroke: "#075985", strokeWidth: "1.5" }),
          e.jsx("path", { d: "M 32,38 C 34,60 42,74 50,82 C 58,74 66,60 68,38 Z", fill: "#f8fafc", stroke: "#cbd5e1", strokeWidth: "1.5" }),
          e.jsx("path", { d: "M 30,32 C 34,16 66,16 70,32 Z", fill: "#e2e8f0" }),
          e.jsx("path", { d: "M 36,22 L 50,10 L 64,22 L 58,16 L 50,8 L 42,16 Z", fill: "#facc15", stroke: "#a16207", strokeWidth: "1" }),
          e.jsx("circle", { cx: "44", cy: "36", r: "2.5", fill: "#38bdf8" }),
          e.jsx("circle", { cx: "56", cy: "36", r: "2.5", fill: "#38bdf8" }),
          e.jsx("line", { x1: "50", y1: "92", x2: "50", y2: "20", stroke: "#facc15", strokeWidth: "3.5", strokeLinecap: "round" }),
          e.jsx("path", { d: "M 38,32 Q 42,20 50,20 Q 58,20 62,32", fill: "none", stroke: "#facc15", strokeWidth: "3", strokeLinecap: "round" }),
          e.jsx("polygon", { points: "50,12 46,24 54,24", fill: "#fef08a" }),
          e.jsx("polygon", { points: "38,22 34,32 42,30", fill: "#fef08a" }),
          e.jsx("polygon", { points: "62,22 58,30 66,32", fill: "#fef08a" })
        ]}),
        triton_wrath: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 28,52 C 28,34 38,20 50,20 C 62,20 72,34 72,52 C 72,70 60,82 50,82 C 40,82 28,70 28,52 Z", fill: "#0d9488", stroke: "#115e59", strokeWidth: "2" }),
          e.jsx("circle", { cx: "50", cy: "34", r: "14", fill: "#fde68a" }),
          e.jsx("path", { d: "M 34,34 Q 50,56 66,34 Q 68,48 50,56 Q 32,48 34,34 Z", fill: "#2dd4bf" }),
          e.jsx("circle", { cx: "44", cy: "34", r: "2.5", fill: "#0f766e" }),
          e.jsx("circle", { cx: "56", cy: "34", r: "2.5", fill: "#0f766e" }),
          e.jsx("path", { d: "M 42,44 C 42,36 58,36 58,44 L 54,62 L 46,62 Z", fill: "#facc15", stroke: "#ca8a04", strokeWidth: "1.5" }),
          e.jsx("path", { d: "M 10,76 Q 30,68 50,74 T 90,72", fill: "none", stroke: "#5eead4", strokeWidth: "2.5", strokeLinecap: "round" })
        ]}),
        atlantic_ghost_ship: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
          e.jsx("path", { d: "M 8,78 Q 50,68 92,78 L 92,88 L 8,88 Z", fill: "#064e3b", opacity: "0.6" }),
          e.jsx("path", { d: "M 28,72 L 50,84 L 72,72 L 66,48 L 34,48 Z", fill: "#064e3b", stroke: "#34d399", strokeWidth: "2" }),
          e.jsx("line", { x1: "50", y1: "12", x2: "50", y2: "74", stroke: "#10b981", strokeWidth: "3" }),
          e.jsx("path", { d: "M 20,24 Q 50,16 80,24 L 74,44 Q 50,38 26,44 Z", fill: "#6ee7b7", stroke: "#34d399", strokeWidth: "1.5", opacity: "0.8" }),
          e.jsx("polygon", { points: "50,84 46,92 54,92", fill: "#10b981", stroke: "#34d399", strokeWidth: "1" }),
          e.jsx("path", { d: "M 16,56 L 30,52 M 14,64 L 28,60 M 84,56 L 70,52 M 86,64 L 72,60", stroke: "#a7f3d0", strokeWidth: "2", strokeLinecap: "round" }),
          e.jsx("circle", { cx: "50", cy: "32", r: "4", fill: "#34d399", filter: "drop-shadow(0 0 5px #34d399)" }),
          e.jsx("path", { d: "M 10,78 Q 30,70 50,76 Q 70,70 90,78", fill: "none", stroke: "#a7f3d0", strokeWidth: "2.5", strokeLinecap: "round" })
        ]}),
        custom_cetus_atlantic_leviathan: Ze.cetus_atlantic_leviathan,
        cetus: Ze.cetus_atlantic_leviathan,
        custom_cetus: Ze.cetus_atlantic_leviathan,
        emblem_cetus_atlantic_leviathan: Ze.cetus_atlantic_leviathan,
        custom_abyssal_kraken_submerged: Ze.abyssal_kraken_submerged,
        abyssal_kraken: Ze.abyssal_kraken_submerged,
        custom_abyssal_kraken: Ze.abyssal_kraken_submerged,
        kraken: Ze.abyssal_kraken_submerged,
        custom_kraken: Ze.abyssal_kraken_submerged,
        emblem_kraken_abyssal: Ze.abyssal_kraken_submerged,
        sea_kraken_hatchling: Ze.abyssal_kraken_submerged,
        custom_great_leviathan_deep: Ze.great_leviathan_deep,
        great_leviathan: Ze.great_leviathan_deep,
        leviathan: Ze.great_leviathan_deep,
        custom_leviathan: Ze.great_leviathan_deep,
        emblem_leviathan: Ze.great_leviathan_deep,
        custom_atlantic_sea_serpent: Ze.atlantic_sea_serpent,
        sea_serpent: Ze.atlantic_sea_serpent,
        serpent: Ze.atlantic_sea_serpent,
        custom_serpent: Ze.atlantic_sea_serpent,
        emblem_serpent: Ze.atlantic_sea_serpent,
        custom_charybdis_whirlpool_beast: Ze.charybdis_whirlpool_beast,
        charybdis: Ze.charybdis_whirlpool_beast,
        whirlpool: Ze.charybdis_whirlpool_beast,
        custom_sirens_scylla_monster: Ze.sirens_scylla_monster,
        scylla: Ze.sirens_scylla_monster,
        custom_scylla: Ze.sirens_scylla_monster,
        custom_siren_enchantress: Ze.siren_enchantress,
        siren: Ze.siren_enchantress,
        custom_siren: Ze.siren_enchantress,
        custom_cyclops_brute: Ze.cyclops_brute,
        cyclops: Ze.cyclops_brute,
        custom_cyclops: Ze.cyclops_brute,
        custom_minotaur_beast: Ze.minotaur_beast,
        minotaur: Ze.minotaur_beast,
        custom_minotaur: Ze.minotaur_beast,
        custom_medusa_gorgon: Ze.medusa_gorgon,
        medusa: Ze.medusa_gorgon,
        gorgon: Ze.medusa_gorgon,
        custom_medusa: Ze.medusa_gorgon,
        custom_cerberus_hound: Ze.cerberus_hound,
        cerberus: Ze.cerberus_hound,
        custom_cerberus: Ze.cerberus_hound,
        custom_african_lion: Ze.african_lion,
        lion: Ze.african_lion,
        leo: Ze.african_lion,
        custom_lion: Ze.african_lion,
        custom_appennine_wolf_pack: Ze.appennine_wolf_pack,
        wolf_pack: Ze.appennine_wolf_pack,
        wolf: Ze.appennine_wolf_pack,
        lupus: Ze.appennine_wolf_pack,
        custom_wolf: Ze.appennine_wolf_pack,
        custom_hercynian_boar: Ze.hercynian_boar,
        boar: Ze.hercynian_boar,
        aper: Ze.hercynian_boar,
        custom_boar: Ze.hercynian_boar,
        custom_alpine_brown_bear: Ze.alpine_brown_bear,
        bear: Ze.alpine_brown_bear,
        ursus: Ze.alpine_brown_bear,
        custom_bear: Ze.alpine_brown_bear,
        custom_saharan_scorpion: Ze.saharan_scorpion,
        scorpion: Ze.saharan_scorpion,
        custom_scorpion: Ze.saharan_scorpion,
        custom_poseidon_avatar: Ze.poseidon_avatar,
        poseidon: Ze.poseidon_avatar,
        neptune: Ze.poseidon_avatar,
        custom_poseidon: Ze.poseidon_avatar,
        custom_triton_wrath: Ze.triton_wrath,
        triton: Ze.triton_wrath,
        custom_triton: Ze.triton_wrath,
        custom_atlantic_ghost_ship: Ze.atlantic_ghost_ship,
        ghost_ship: Ze.atlantic_ghost_ship,
        custom_ghost_ship: Ze.atlantic_ghost_ship,

        // === MASTERWORK NAMED SHIPS & FLEET BOSSES (Aliased to High-Detail Masterwork Ship Emblems in je) ===
        pirate_king: t => (je.emblem_ship_pirate || Ze.cetus_atlantic_leviathan)(t),
        corsair_admiral_flagship: t => (je.emblem_ship_pirate || Ze.cetus_atlantic_leviathan)(t),
        corsair_flagship: t => (je.emblem_ship_pirate || Ze.cetus_atlantic_leviathan)(t),
        pirate_flagship: t => (je.emblem_ship_pirate || Ze.cetus_atlantic_leviathan)(t),
        infernus: t => (je.emblem_ship_roman || Ze.cetus_atlantic_leviathan)(t),
        mythic_dreadnought_galley: t => (je.emblem_ship_roman || Ze.cetus_atlantic_leviathan)(t),
        dreadnought_galley: t => (je.emblem_ship_roman || Ze.cetus_atlantic_leviathan)(t),
        quadrireme_ironclad: t => (je.emblem_ship_roman || Ze.cetus_atlantic_leviathan)(t),
        maxentian_harbor_armada: t => (je.emblem_ship_rebel || Ze.cetus_atlantic_leviathan)(t),
        usurper_licinius: t => (je.emblem_ship_rebel || Ze.cetus_atlantic_leviathan)(t),
        licinius: t => (je.emblem_ship_rebel || Ze.cetus_atlantic_leviathan)(t),
        liburnian_raiders: t => (je.emblem_ship_pirate || Ze.cetus_atlantic_leviathan)(t),
        illyrian_coastal_raider: t => (je.emblem_ship_pirate || Ze.cetus_atlantic_leviathan)(t),
        cilician_pirate_galley: t => (je.emblem_ship_pirate || Ze.cetus_atlantic_leviathan)(t),
        aegean_corsairs: t => (je.emblem_ship_pirate || Ze.cetus_atlantic_leviathan)(t),
        rhodian_rogue_trireme: t => (je.emblem_ship_roman || Ze.cetus_atlantic_leviathan)(t),
        dromon_fire_ship: t => (je.emblem_ship_dromon || Ze.cetus_atlantic_leviathan)(t),
        corinthian_corsair: t => (je.emblem_ship_pirate || Ze.cetus_atlantic_leviathan)(t),
        pontic_corsairs: t => (je.emblem_ship_pirate || Ze.cetus_atlantic_leviathan)(t),
        phoenician_pirates: t => (je.emblem_ship_punic || Ze.cetus_atlantic_leviathan)(t),
        lusitanian_barque: t => (je.emblem_ship_pirate || Ze.cetus_atlantic_leviathan)(t),
        red_leviathan: t => (je.emblem_ship_roman || Ze.cetus_atlantic_leviathan)(t),

        // === MASTERWORK NAMED LEGIONS & COMMANDERS (Aliased to High-Detail Masterwork Legion Emblems in je) ===
        roman_patrol_legionary: t => (je.emblem_legion_roman || Ze.minotaur_beast)(t),
        veteran_centurion_guard: t => (je.emblem_legion_roman || Ze.minotaur_beast)(t),
        usurper_maxentius: t => (je.emblem_legion_rebel || Ze.minotaur_beast)(t),
        maxentius: t => (je.emblem_legion_rebel || Ze.minotaur_beast)(t),
        rebel_warlord_tribune: t => (je.emblem_legion_rebel || Ze.minotaur_beast)(t),
        licinian_garrison_commander: t => (je.emblem_legion_rebel || Ze.minotaur_beast)(t),
        provincial_garrison_governor: t => (je.emblem_legion_roman || Ze.minotaur_beast)(t),
        dread_legate_conqueror: t => (je.emblem_legion_roman || Ze.minotaur_beast)(t),
        licinian_phalanx_spear: t => (je.emblem_legion_punic || Ze.minotaur_beast)(t),
        licinian_palatine_guard: t => (je.emblem_legion_roman || Ze.minotaur_beast)(t),
        praetorian_land_garrison: t => (je.emblem_legion_roman || Ze.minotaur_beast)(t),
        maxentian_cohort_patrol: t => (je.emblem_legion_rebel || Ze.minotaur_beast)(t),
        gallica_rebel_cohort: t => (je.emblem_legion_rebel || Ze.minotaur_beast)(t),
        celtiberian_warband: t => (je.emblem_legion_rebel || Ze.minotaur_beast)(t),
        germanic_heavy_infantry: t => (je.emblem_legion_rebel || Ze.minotaur_beast)(t),
        numidian_spearmen: t => (je.emblem_legion_punic || Ze.minotaur_beast)(t),
        desert_nomad_raider: t => (je.emblem_legion_punic || Ze.minotaur_beast)(t),
        cataphract_cavalry: t => (je.emblem_legion_roman || Ze.minotaur_beast)(t),
        pictish_raiders: t => (je.emblem_legion_rebel || Ze.minotaur_beast)(t),
        berber_cavalry: t => (je.emblem_legion_punic || Ze.minotaur_beast)(t),
        bructeri_warriors: t => (je.emblem_legion_rebel || Ze.minotaur_beast)(t),
        caledonian_clan: t => (je.emblem_legion_rebel || Ze.minotaur_beast)(t),
        garamantian_chariots: t => (je.emblem_legion_punic || Ze.minotaur_beast)(t),
        isaurian_brigands: t => (je.emblem_legion_rebel || Ze.minotaur_beast)(t),
        cappadocian_cavalry: t => (je.emblem_legion_punic || Ze.minotaur_beast)(t),
        palmyrene_cataphracts: t => (je.emblem_legion_roman || Ze.minotaur_beast)(t),

        // === MASTERWORK COMMODITIES & TRADE GOODS ===
        commodity_grain: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("path", { d: "M 50 88 L 50 45 C 50 35 55 25 65 18 C 58 26 56 36 56 46 L 56 88 Z", fill: "#d97706" }),
          e.jsx("ellipse", { cx: "44", cy: "36", rx: "6", ry: "13", transform: "rotate(-25 44 36)", fill: "#f59e0b" }),
          e.jsx("ellipse", { cx: "56", cy: "36", rx: "6", ry: "13", transform: "rotate(25 56 36)", fill: "#f59e0b" }),
          e.jsx("ellipse", { cx: "41", cy: "52", rx: "6", ry: "12", transform: "rotate(-30 41 52)", fill: "#d97706" }),
          e.jsx("ellipse", { cx: "59", cy: "52", rx: "6", ry: "12", transform: "rotate(30 59 52)", fill: "#d97706" }),
          e.jsx("ellipse", { cx: "45", cy: "68", rx: "5", ry: "11", transform: "rotate(-28 45 68)", fill: "#b45309" }),
          e.jsx("ellipse", { cx: "55", cy: "68", rx: "5", ry: "11", transform: "rotate(28 55 68)", fill: "#b45309" }),
          e.jsx("ellipse", { cx: "50", cy: "22", rx: "5.5", ry: "13", fill: "#fef08a" }),
          e.jsx("path", { d: "M 26 82 C 26 62 44 60 44 60 C 44 60 35 66 35 82 Z", fill: "#e2e8f0", opacity: "0.9" }),
          e.jsx("path", { d: "M 35 82 L 40 88 L 44 85 L 39 80 Z", fill: "#78716c" })
        ]}),

        commodity_wine: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("ellipse", { cx: "50", cy: "18", rx: "11", ry: "3.5", fill: "#b45309" }),
          e.jsx("path", { d: "M 43 20 L 43 32 C 32 40 30 60 35 75 C 39 86 61 86 65 75 C 70 60 68 40 57 32 L 57 20 Z", fill: "#78350f" }),
          e.jsx("path", { d: "M 43 32 C 36 32 28 38 28 50 C 28 62 34 66 38 66 L 37 60 C 33 60 32 55 32 50 C 32 42 36 36 43 36 Z", fill: "#b45309" }),
          e.jsx("path", { d: "M 57 32 C 64 32 72 38 72 50 C 72 62 66 66 62 66 L 63 60 C 67 60 68 55 68 50 C 68 42 64 36 57 36 Z", fill: "#b45309" }),
          e.jsx("ellipse", { cx: "50", cy: "62", rx: "10", ry: "14", fill: "#991b1b" }),
          e.jsx("circle", { cx: "46", cy: "57", r: "2.5", fill: "#fca5a5", opacity: "0.5" }),
          e.jsx("path", { d: "M 48 84 L 46 88 L 54 88 L 52 84 Z", fill: "#b45309" })
        ]}),

        commodity_oil: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("path", { d: "M 25 80 C 40 65 55 50 82 25", stroke: "#78350f", strokeWidth: "3", fill: "none" }),
          e.jsx("ellipse", { cx: "45", cy: "40", rx: "7", ry: "15", transform: "rotate(35 45 40)", fill: "#65a30d" }),
          e.jsx("ellipse", { cx: "62", cy: "28", rx: "7", ry: "15", transform: "rotate(45 62 28)", fill: "#84cc16" }),
          e.jsx("ellipse", { cx: "68", cy: "52", rx: "7", ry: "15", transform: "rotate(-25 68 52)", fill: "#65a30d" }),
          e.jsx("circle", { cx: "40", cy: "62", r: "8", fill: "#1e293b", stroke: "#65a30d", strokeWidth: "1" }),
          e.jsx("circle", { cx: "38", cy: "60", r: "2.5", fill: "#fef08a", opacity: "0.6" }),
          e.jsx("circle", { cx: "55", cy: "68", r: "7.5", fill: "#3f6212" }),
          e.jsx("circle", { cx: "53", cy: "66", r: "2", fill: "#fef08a", opacity: "0.7" }),
          e.jsx("path", { d: "M 70 82 C 60 76 65 60 72 54 C 79 60 84 76 74 82 Z", fill: "#eab308", opacity: "0.85" })
        ]}),

        commodity_marble: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("rect", { x: "18", y: "16", width: "64", height: "10", rx: "2", fill: "#f8fafc", stroke: "#94a3b8", strokeWidth: "1" }),
          e.jsx("circle", { cx: "26", cy: "32", r: "8", fill: "#cbd5e1", stroke: "#64748b", strokeWidth: "1.5" }),
          e.jsx("circle", { cx: "74", cy: "32", r: "8", fill: "#cbd5e1", stroke: "#64748b", strokeWidth: "1.5" }),
          e.jsx("path", { d: "M 26 32 C 38 28 62 28 74 32", stroke: "#64748b", strokeWidth: "2", fill: "none" }),
          e.jsx("rect", { x: "30", y: "32", width: "40", height: "46", fill: "#f1f5f9", stroke: "#94a3b8", strokeWidth: "1" }),
          e.jsx("line", { x1: "38", y1: "32", x2: "38", y2: "78", stroke: "#cbd5e1", strokeWidth: "2.5" }),
          e.jsx("line", { x1: "46", y1: "32", x2: "46", y2: "78", stroke: "#cbd5e1", strokeWidth: "2.5" }),
          e.jsx("line", { x1: "54", y1: "32", x2: "54", y2: "78", stroke: "#cbd5e1", strokeWidth: "2.5" }),
          e.jsx("line", { x1: "62", y1: "32", x2: "62", y2: "78", stroke: "#cbd5e1", strokeWidth: "2.5" }),
          e.jsx("rect", { x: "24", y: "78", width: "52", height: "8", rx: "1", fill: "#e2e8f0", stroke: "#64748b", strokeWidth: "1" }),
          e.jsx("rect", { x: "18", y: "86", width: "64", height: "6", rx: "1", fill: "#cbd5e1", stroke: "#475569", strokeWidth: "1" })
        ]}),

        commodity_silk: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("ellipse", { cx: "35", cy: "42", rx: "18", ry: "30", transform: "rotate(-25 35 42)", fill: "#581c87" }),
          e.jsx("ellipse", { cx: "35", cy: "42", rx: "14", ry: "24", transform: "rotate(-25 35 42)", fill: "#7e22ce" }),
          e.jsx("ellipse", { cx: "35", cy: "42", rx: "7", ry: "16", transform: "rotate(-25 35 42)", fill: "#a855f7" }),
          e.jsx("path", { d: "M 48 30 C 65 30 75 48 85 58 C 75 75 58 78 48 70", stroke: "#eab308", strokeWidth: "3", fill: "none" }),
          e.jsx("path", { d: "M 42 22 C 60 22 75 35 88 42", stroke: "#fbbf24", strokeWidth: "1.5", fill: "none" }),
          e.jsx("polygon", { points: "15,85 22,76 85,15 92,22 28,88 18,92", fill: "#d97706" }),
          e.jsx("circle", { cx: "20", cy: "82", r: "3", fill: "#fef08a" })
        ]}),

        commodity_spices: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("path", { d: "M 50 14 C 44 24 56 30 50 40", stroke: "#cbd5e1", strokeWidth: "2", fill: "none", opacity: "0.6", strokeDasharray: "2 2" }),
          e.jsx("path", { d: "M 44 18 C 38 26 48 32 44 42", stroke: "#cbd5e1", strokeWidth: "1.5", fill: "none", opacity: "0.4" }),
          e.jsx("path", { d: "M 56 16 C 62 25 52 32 56 42", stroke: "#cbd5e1", strokeWidth: "1.5", fill: "none", opacity: "0.4" }),
          e.jsx("path", { d: "M 32 45 C 32 40 40 38 50 38 C 60 38 68 40 68 45 L 64 54 L 36 54 Z", fill: "#d97706" }),
          e.jsx("path", { d: "M 30 54 L 36 78 C 38 84 62 84 64 78 L 70 54 Z", fill: "#b45309" }),
          e.jsx("circle", { cx: "50", cy: "64", r: "5", fill: "#ea580c" }),
          e.jsx("circle", { cx: "50", cy: "64", r: "2", fill: "#fef08a" }),
          e.jsx("rect", { x: "42", y: "84", width: "16", height: "4", rx: "1", fill: "#78350f" }),
          e.jsx("line", { x1: "36", y1: "54", x2: "28", y2: "25", stroke: "#f59e0b", strokeWidth: "1.5" }),
          e.jsx("line", { x1: "64", y1: "54", x2: "72", y2: "25", stroke: "#f59e0b", strokeWidth: "1.5" }),
          e.jsx("line", { x1: "50", y1: "40", x2: "50", y2: "20", stroke: "#f59e0b", strokeWidth: "1.5" })
        ]}),

        commodity_timber: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("rect", { x: "15", y: "55", width: "65", height: "18", rx: "3", transform: "rotate(-15 47 64)", fill: "#78350f", stroke: "#451a03", strokeWidth: "1" }),
          e.jsx("ellipse", { cx: "18", cy: "71", rx: "5", ry: "9", transform: "rotate(-15 18 71)", fill: "#b45309" }),
          e.jsx("rect", { x: "20", y: "35", width: "65", height: "18", rx: "3", transform: "rotate(15 52 44)", fill: "#92400e", stroke: "#451a03", strokeWidth: "1" }),
          e.jsx("ellipse", { cx: "80", cy: "51", rx: "5", ry: "9", transform: "rotate(15 80 51)", fill: "#d97706" }),
          e.jsx("path", { d: "M 46 20 L 54 16 L 50 48 L 44 46 Z", fill: "#a16207" }),
          e.jsx("path", { d: "M 48 18 C 58 14 68 22 66 32 C 60 30 52 26 48 24 Z", fill: "#94a3b8", stroke: "#475569", strokeWidth: "1" })
        ]}),

        commodity_iron: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("path", { d: "M 22 40 L 78 40 L 70 70 L 30 70 Z", fill: "#334155", stroke: "#1e293b", strokeWidth: "1.5" }),
          e.jsx("polygon", { points: "22,40 30,30 86,30 78,40", fill: "#64748b" }),
          e.jsx("polygon", { points: "78,40 86,30 78,60 70,70", fill: "#475569" }),
          e.jsx("path", { d: "M 38 48 L 62 48 L 58 62 L 34 62 Z", fill: "#ea580c", opacity: "0.85" }),
          e.jsx("ellipse", { cx: "48", cy: "55", rx: "8", ry: "3", fill: "#fef08a", opacity: "0.9" }),
          e.jsx("rect", { x: "18", y: "74", width: "64", height: "12", rx: "2", fill: "#1e293b" })
        ]}),

        commodity_gold: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("circle", { cx: "50", cy: "50", r: "40", fill: "#eab308", stroke: "#ca8a04", strokeWidth: "2.5" }),
          e.jsx("circle", { cx: "50", cy: "50", r: "34", fill: "none", stroke: "#fef08a", strokeWidth: "1.5", strokeDasharray: "2 2" }),
          e.jsx("circle", { cx: "50", cy: "42", r: "14", fill: "#ca8a04" }),
          e.jsx("path", { d: "M 38 68 C 38 56 44 54 50 54 C 56 54 62 56 62 68 Z", fill: "#ca8a04" }),
          e.jsx("polygon", { points: "50,22 46,30 54,30", fill: "#fef08a" }),
          e.jsx("polygon", { points: "40,24 40,32 46,30", fill: "#fef08a" }),
          e.jsx("polygon", { points: "60,24 54,30 60,32", fill: "#fef08a" }),
          e.jsx("circle", { cx: "50", cy: "50", r: "3", fill: "#fef08a" })
        ]}),

        commodity_silver: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("circle", { cx: "50", cy: "50", r: "40", fill: "#94a3b8", stroke: "#64748b", strokeWidth: "2.5" }),
          e.jsx("circle", { cx: "50", cy: "50", r: "34", fill: "none", stroke: "#f8fafc", strokeWidth: "1.5", strokeDasharray: "2 2" }),
          e.jsx("path", { d: "M 50 20 C 65 20 74 34 74 50 C 74 66 65 80 50 80 C 44 80 40 76 40 76 C 54 70 60 62 60 50 C 60 38 54 30 40 24 C 40 24 44 20 50 20 Z", fill: "#f8fafc" }),
          e.jsx("circle", { cx: "36", cy: "48", r: "4", fill: "#f8fafc" })
        ]}),

        commodity_porphyry: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("polygon", { points: "50,15 85,35 85,75 50,92 15,75 15,35", fill: "#581c87", stroke: "#a855f7", strokeWidth: "1.5" }),
          e.jsx("polygon", { points: "50,15 85,35 50,52 15,35", fill: "#7e22ce" }),
          e.jsx("polygon", { points: "50,52 85,35 85,75 50,92", fill: "#3b0764" }),
          e.jsx("circle", { cx: "35", cy: "38", r: "2", fill: "#fef08a" }),
          e.jsx("circle", { cx: "55", cy: "42", r: "1.5", fill: "#fef08a" }),
          e.jsx("circle", { cx: "65", cy: "32", r: "2", fill: "#fef08a" }),
          e.jsx("circle", { cx: "42", cy: "68", r: "2", fill: "#fef08a" }),
          e.jsx("circle", { cx: "68", cy: "60", r: "1.5", fill: "#fef08a" })
        ]}),

        // === MASTERWORK DIVINE AUGURIES & OMENS ===
        augury_venus: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("circle", { cx: "50", cy: "50", r: "44", fill: "none", stroke: "#fbbf24", strokeWidth: "1.5", strokeDasharray: "3 3" }),
          e.jsx("polygon", { points: "50,14 54,38 78,42 58,54 66,78 50,62 34,78 42,54 22,42 46,38", fill: "#fbbf24", stroke: "#d97706", strokeWidth: "1" }),
          e.jsx("circle", { cx: "50", cy: "50", r: "10", fill: "#fef08a" }),
          e.jsx("circle", { cx: "50", cy: "50", r: "4", fill: "#ffffff" })
        ]}),

        augury_mars: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("line", { x1: "20", y1: "80", x2: "80", y2: "20", stroke: "#ef4444", strokeWidth: "5", strokeLinecap: "round" }),
          e.jsx("line", { x1: "80", y1: "80", x2: "20", y2: "20", stroke: "#ef4444", strokeWidth: "5", strokeLinecap: "round" }),
          e.jsx("polygon", { points: "80,20 85,25 78,32 73,27", fill: "#fbbf24" }),
          e.jsx("polygon", { points: "20,20 15,25 22,32 27,27", fill: "#fbbf24" }),
          e.jsx("rect", { x: "44", y: "44", width: "12", height: "12", transform: "rotate(45 50 50)", fill: "#b91c1c", stroke: "#fef08a", strokeWidth: "1.5" }),
          e.jsx("circle", { cx: "50", cy: "50", r: "3", fill: "#fef08a" })
        ]}),

        augury_neptune: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("path", { d: "M 15 78 C 30 68 40 85 55 78 C 70 71 80 85 90 78", stroke: "#38bdf8", strokeWidth: "3", fill: "none" }),
          e.jsx("line", { x1: "50", y1: "88", x2: "50", y2: "20", stroke: "#38bdf8", strokeWidth: "4" }),
          e.jsx("path", { d: "M 28 35 C 28 55 72 55 72 35", stroke: "#38bdf8", strokeWidth: "3.5", fill: "none" }),
          e.jsx("polygon", { points: "50,14 45,24 55,24", fill: "#38bdf8" }),
          e.jsx("polygon", { points: "28,28 23,38 33,38", fill: "#38bdf8" }),
          e.jsx("polygon", { points: "72,28 67,38 77,38", fill: "#38bdf8" }),
          e.jsx("circle", { cx: "50", cy: "50", r: "3", fill: "#fef08a" })
        ]}),

        augury_fortuna: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("path", { d: "M 22 75 C 18 50 40 38 65 30 C 58 45 62 65 42 78 Z", fill: "#b45309", stroke: "#78350f", strokeWidth: "1.5" }),
          e.jsx("ellipse", { cx: "65", cy: "30", rx: "14", ry: "8", transform: "rotate(25 65 30)", fill: "#d97706" }),
          e.jsx("circle", { cx: "65", cy: "28", r: "4", fill: "#eab308" }),
          e.jsx("circle", { cx: "72", cy: "26", r: "3.5", fill: "#eab308" }),
          e.jsx("circle", { cx: "76", cy: "32", r: "3", fill: "#fef08a" }),
          e.jsx("circle", { cx: "60", cy: "34", r: "3", fill: "#fde047" }),
          e.jsx("circle", { cx: "68", cy: "36", r: "3.5", fill: "#eab308" }),
          e.jsx("path", { d: "M 35 75 C 30 82 25 88 18 88", stroke: "#78350f", strokeWidth: "3", fill: "none" })
        ]}),

        augury_canis: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("polygon", { points: "56,12 34,46 52,46 44,88 74,40 54,40", fill: "#c084fc", stroke: "#7e22ce", strokeWidth: "1" }),
          e.jsx("circle", { cx: "48", cy: "46", r: "3", fill: "#ffffff" }),
          e.jsx("circle", { cx: "50", cy: "50", r: "44", fill: "none", stroke: "#a855f7", strokeWidth: "1", strokeDasharray: "2 4" })
        ]}),

        // === MASTERWORK PORT BUILDINGS & HARBOR INFRASTRUCTURE ===
        building_commerce_hub: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("polygon", { points: "50,16 16,32 84,32", fill: "#b45309", stroke: "#fbbf24", strokeWidth: "1.2" }),
          e.jsx("rect", { x: "20", y: "32", width: "60", height: "6", fill: "#fef3c7" }),
          e.jsx("rect", { x: "24", y: "38", width: "6", height: "42", fill: "#e2e8f0" }),
          e.jsx("rect", { x: "38", y: "38", width: "6", height: "42", fill: "#e2e8f0" }),
          e.jsx("rect", { x: "56", y: "38", width: "6", height: "42", fill: "#e2e8f0" }),
          e.jsx("rect", { x: "70", y: "38", width: "6", height: "42", fill: "#e2e8f0" }),
          e.jsx("rect", { x: "16", y: "80", width: "68", height: "8", fill: "#b45309" }),
          e.jsx("circle", { cx: "50", cy: "26", r: "4", fill: "#eab308" })
        ]}),

        building_armamentarium: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("path", { d: "M 15 65 C 30 65 50 55 85 45 L 85 62 L 68 72 L 15 72 Z", fill: "#78350f" }),
          e.jsx("polygon", { points: "85,45 92,62 82,62", fill: "#b45309" }),
          e.jsx("polygon", { points: "85,62 95,68 85,74", fill: "#eab308" }),
          e.jsx("line", { x1: "45", y1: "25", x2: "45", y2: "65", stroke: "#92400e", strokeWidth: "3" }),
          e.jsx("polygon", { points: "47,27 75,40 47,40", fill: "#f8fafc", opacity: "0.9" }),
          e.jsx("rect", { x: "18", y: "72", width: "64", height: "8", fill: "#334155" })
        ]}),

        building_horreum: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("polygon", { points: "50,18 18,34 82,34", fill: "#b45309" }),
          e.jsx("rect", { x: "22", y: "34", width: "56", height: "46", fill: "#fef3c7" }),
          e.jsx("path", { d: "M 32 80 L 32 56 C 32 50 40 50 40 56 L 40 80 Z", fill: "#78350f" }),
          e.jsx("path", { d: "M 46 80 L 46 56 C 46 50 54 50 54 56 L 54 80 Z", fill: "#78350f" }),
          e.jsx("path", { d: "M 60 80 L 60 56 C 60 50 68 50 68 56 L 68 80 Z", fill: "#78350f" }),
          e.jsx("circle", { cx: "50", cy: "27", r: "3.5", fill: "#eab308" }),
          e.jsx("rect", { x: "18", y: "80", width: "64", height: "6", fill: "#92400e" })
        ]}),

        building_sanctuary: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("polygon", { points: "50,14 20,30 80,30", fill: "#0891b2", stroke: "#38bdf8", strokeWidth: "1" }),
          e.jsx("rect", { x: "24", y: "30", width: "52", height: "6", fill: "#f8fafc" }),
          e.jsx("rect", { x: "28", y: "36", width: "6", height: "42", fill: "#e2e8f0" }),
          e.jsx("rect", { x: "42", y: "36", width: "6", height: "42", fill: "#e2e8f0" }),
          e.jsx("rect", { x: "52", y: "36", width: "6", height: "42", fill: "#e2e8f0" }),
          e.jsx("rect", { x: "66", y: "36", width: "6", height: "42", fill: "#e2e8f0" }),
          e.jsx("circle", { cx: "50", cy: "24", r: "4", fill: "#fef08a" }),
          e.jsx("path", { d: "M 48 58 C 48 50 52 50 52 58 Z", fill: "#ef4444" }),
          e.jsx("rect", { x: "20", y: "78", width: "60", height: "8", fill: "#0891b2" })
        ]}),

        // === MASTERWORK CURSUS HONORUM RANK INSIGNIA ===
        rank_civic_crown: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("path", { d: "M 25 72 C 16 52 24 28 50 20 C 76 28 84 52 75 72", stroke: "#94a3b8", strokeWidth: "4", fill: "none" }),
          e.jsx("ellipse", { cx: "32", cy: "40", rx: "5", ry: "10", transform: "rotate(-30 32 40)", fill: "#cbd5e1" }),
          e.jsx("ellipse", { cx: "68", cy: "40", rx: "5", ry: "10", transform: "rotate(30 68 40)", fill: "#cbd5e1" }),
          e.jsx("circle", { cx: "50", cy: "20", r: "4", fill: "#f8fafc" }),
          e.jsx("path", { d: "M 42 75 L 50 68 L 58 75 L 54 86 L 50 78 L 46 86 Z", fill: "#cbd5e1" })
        ]}),

        rank_naval_crown: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("path", { d: "M 20 62 L 80 62 L 76 74 L 24 74 Z", fill: "#eab308" }),
          e.jsx("polygon", { points: "24,62 30,36 38,62", fill: "#fef08a" }),
          e.jsx("polygon", { points: "44,62 50,30 56,62", fill: "#fef08a" }),
          e.jsx("polygon", { points: "62,62 70,36 76,62", fill: "#fef08a" }),
          e.jsx("circle", { cx: "30", cy: "36", r: "2.5", fill: "#b45309" }),
          e.jsx("circle", { cx: "50", cy: "30", r: "3", fill: "#b45309" }),
          e.jsx("circle", { cx: "70", cy: "36", r: "2.5", fill: "#b45309" })
        ]}),

        rank_aquila_standard: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("line", { x1: "50", y1: "25", x2: "50", y2: "88", stroke: "#b45309", strokeWidth: "4" }),
          e.jsx("circle", { cx: "50", cy: "32", r: "14", fill: "#eab308", stroke: "#ca8a04", strokeWidth: "2" }),
          e.jsx("polygon", { points: "50,12 40,24 60,24", fill: "#fef08a" }),
          e.jsx("path", { d: "M 34 26 C 24 22 20 28 20 34 C 30 36 36 32 36 32 Z", fill: "#eab308" }),
          e.jsx("path", { d: "M 66 26 C 76 22 80 28 80 34 C 70 36 64 32 64 32 Z", fill: "#eab308" }),
          e.jsx("rect", { x: "36", y: "46", width: "28", height: "16", fill: "#991b1b", stroke: "#eab308", strokeWidth: "1" }),
          e.jsx("text", { x: "50", y: "58", fill: "#fef08a", fontSize: "8", fontWeight: "bold", textAnchor: "middle", fontFamily: "cinzel", children: "SPQR" })
        ]}),

        rank_curule_baton: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("path", { d: "M 25 78 L 75 22", stroke: "#eab308", strokeWidth: "4", strokeLinecap: "round" }),
          e.jsx("circle", { cx: "75", cy: "22", r: "8", fill: "#7e22ce", stroke: "#eab308", strokeWidth: "2" }),
          e.jsx("circle", { cx: "75", cy: "22", r: "3", fill: "#fef08a" }),
          e.jsx("circle", { cx: "50", cy: "50", r: "42", fill: "none", stroke: "#ca8a04", strokeWidth: "1", strokeDasharray: "2 3" }),
          e.jsx("polygon", { points: "25,78 20,84 28,84", fill: "#eab308" })
        ]}),

        rank_sol_imperator: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "currentColor", stroke: "none", ...t, children: [
          e.jsx("circle", { cx: "50", cy: "50", r: "38", fill: "#ca8a04", stroke: "#fef08a", strokeWidth: "2" }),
          e.jsx("polygon", { points: "50,14 47,26 53,26", fill: "#fef08a" }),
          e.jsx("polygon", { points: "50,86 47,74 53,74", fill: "#fef08a" }),
          e.jsx("polygon", { points: "14,50 26,47 26,53", fill: "#fef08a" }),
          e.jsx("polygon", { points: "86,50 74,47 74,53", fill: "#fef08a" }),
          e.jsx("polygon", { points: "24,24 34,31 31,34", fill: "#fef08a" }),
          e.jsx("polygon", { points: "76,76 66,69 69,66", fill: "#fef08a" }),
          e.jsx("polygon", { points: "76,24 69,34 66,31", fill: "#fef08a" }),
          e.jsx("polygon", { points: "24,76 31,66 34,69", fill: "#fef08a" }),
          e.jsx("circle", { cx: "50", cy: "50", r: "18", fill: "#eab308" }),
          e.jsx("text", { x: "50", y: "56", fill: "#78350f", fontSize: "16", fontWeight: "900", textAnchor: "middle", fontFamily: "cinzel", children: "☧" })
        ]}),

        // Aliases
        grain: t => Ze.commodity_grain(t),
        wheat: t => Ze.commodity_grain(t),
        wine: t => Ze.commodity_wine(t),
        oil: t => Ze.commodity_oil(t),
        marble: t => Ze.commodity_marble(t),
        silk: t => Ze.commodity_silk(t),
        spices: t => Ze.commodity_spices(t),
        timber: t => Ze.commodity_timber(t),
        iron: t => Ze.commodity_iron(t),
        gold: t => Ze.commodity_gold(t),
        silver: t => Ze.commodity_silver(t),
        porphyry: t => Ze.commodity_porphyry(t),

        venus_victoria: t => Ze.augury_venus(t),
        mars_gradivus: t => Ze.augury_mars(t),
        neptunus_tranquillus: t => Ze.augury_neptune(t),
        fortuna_redux: t => Ze.augury_fortuna(t),
        canis_obscurus: t => Ze.augury_canis(t),

        COMMERCE_HUB: t => Ze.building_commerce_hub(t),
        ARMAMENTARIUM: t => Ze.building_armamentarium(t),
        HORREUM: t => Ze.building_horreum(t),
        CLASSIS_SANCTUARY: t => Ze.building_sanctuary(t)
      });
      Object.assign(je, Ze);`;
      
      const existingAssignCode = cleanJs.substring(zeAssignIdx, zeAssignEnd + 3);
      cleanJs = cleanJs.replace(existingAssignCode, monsterSVGsCode + "\n" + existingAssignCode);
      
    }
  }

  // 2. High-fidelity Uo (EnemyMapToken)
  const oldUoStart = 'Uo=lt.memo(({fleet:t,isMoving:s,size:a=32,isElaborate:r=!1})=>{';
  const uoIdx = cleanJs.indexOf(oldUoStart);
  if (uoIdx === -1) {
    throw new Error("Could not find Uo component in cleanJs!");
  }
  const uoEndMarker = 'Uo.displayName="EnemyMapToken";';
  const uoEndIdx = cleanJs.indexOf(uoEndMarker, uoIdx);
  if (uoEndIdx === -1) {
    throw new Error("Could not find Uo end marker!");
  }

  const newUo = `Uo=lt.memo(({fleet:t,isMoving:s,size:a=32,isElaborate:r=!1})=>{
  const o=t.enemyUnit?.domain!=="land",
  l=b.useMemo(()=>t.enemyUnit?Rr(t.enemyUnit,t.masterPortId):{variant:"bronze",emblem:"pirate"},[t.enemyUnit,t.masterPortId]),
  n=!!(t.isBoss||t.enemyUnit?.isBoss||t.enemyUnit?.maxHp>=120),
  c=Math.max(20,Math.min(36,a)),
  i=n?"gold":l.variant==="silver"?"silver":"bronze",
  uInfo=((t.enemyUnit?.id||"")+" "+(t.enemyUnit?.name||"")+" "+(t.enemyUnit?.icon||"")).toLowerCase(),
  isMonster=o?(uInfo.includes("kraken")||uInfo.includes("leviathan")||uInfo.includes("cetus")||uInfo.includes("serpent")||uInfo.includes("scylla")||uInfo.includes("charybdis")||uInfo.includes("poseidon")||uInfo.includes("triton")):(uInfo.includes("cyclops")||uInfo.includes("minotaur")||uInfo.includes("medusa")||uInfo.includes("cerberus")||uInfo.includes("wolf")||uInfo.includes("boar")||uInfo.includes("bear")||uInfo.includes("lion")||uInfo.includes("scorpion")),
  faction=t.enemyUnit?.faction||(uInfo.includes("pirate")||uInfo.includes("corsair")||uInfo.includes("raider")||uInfo.includes("vandal")||uInfo.includes("longboat")||uInfo.includes("barge")?"pirate":uInfo.includes("rebel")||uInfo.includes("maxent")||uInfo.includes("licin")||uInfo.includes("usurper")||uInfo.includes("gallica")?"rebel":uInfo.includes("roman")||uInfo.includes("praetor")||uInfo.includes("centur")?"roman":(o?"pirate":"punic"));
  return e.jsxs("div",{className:"relative flex flex-col items-center justify-end select-none group",children:[
    n&&e.jsx("div",{className:"absolute -inset-1 rounded-full pointer-events-none",style:{boxShadow:"0 0 6px rgba(217, 119, 6, 0.4)"}}),
    e.jsx(Ha,{size:c,medium:o?"water":"land",isMoving:s,isElaborate:r||n,children:
      e.jsx(Fo,{size:c,metalFinish:i,ringVariant:l.variant,showGlow:n,children:
        e.jsx(rt,{
          size:Math.round(c*.82),
          variant:l.variant,
          emblem:l.emblem,
          topDownModel:isMonster?l.emblem:(o?"ship":"legion"),
          topDownFaction:faction,
          topDownShipModelType:t.enemyUnit?.shipModelType||"pirate_liburnian",
          isElaborate:r||n,
          isHeroic:n,
          showGlow:n
        })
      })
    })
  ]})});`;

  cleanJs = cleanJs.substring(0, uoIdx) + newUo + cleanJs.substring(uoEndIdx);
  

  // 3. Combat faction detection
  const oldCombatFaction = 'topDownFaction:a?.faction||"punic"';
  const newCombatFaction = 'topDownFaction:a?.faction||(Rr(a).emblem.includes("pirate")||Rr(a).emblem.includes("corsair")||Rr(a).emblem.includes("raider")?"pirate":Rr(a).emblem.includes("rebel")||Rr(a).emblem.includes("maxent")?"rebel":Rr(a).emblem.includes("roman")?"roman":"punic")';
  if (cleanJs.includes(oldCombatFaction)) {
    cleanJs = cleanJs.replace(oldCombatFaction, newCombatFaction);
    
  }

  // 4. Upgrade jc (Pickups / Loot) to HD Roman Standard
  const jcStartMarker = "const jc=";
  const jcIdx = cleanJs.indexOf(jcStartMarker);
  if (jcIdx === -1) throw new Error("Could not find jc in cleanJs");
  const jcEndMarker = ",F0=lt.memo(";
  const jcEndIdx = cleanJs.indexOf(jcEndMarker, jcIdx);
  if (jcEndIdx === -1) throw new Error("Could not find F0 after jc in cleanJs");

  const newJc = `const jc=({type:t="artifact",rarity:s="bronze",isNear:a=!1,isTracked:r=!1,size:o=26,className:l=""})=>{
  const n=(t||"").toLowerCase();
  const c=()=>{
    if(n.includes("chest")||n.includes("treasure")||n.includes("gold_chest")||n.includes("solidi")){
      return e.jsxs("g",{id:"drop-hd-chest",children:[
        e.jsx("ellipse",{cx:"18",cy:"31",rx:"13",ry:"3.5",fill:"#020617",opacity:"0.45"}),
        e.jsx("path",{d:"M 6 20 L 30 20 L 28 30 L 8 30 Z",fill:"#78350f",stroke:"#451a03",strokeWidth:"0.8"}),
        e.jsx("line",{x1:"7",y1:"25",x2:"29",y2:"25",stroke:"#451a03",strokeWidth:"0.7"}),
        e.jsx("path",{d:"M 6 20 L 9 20 L 10 30 L 8 30 Z",fill:"#d97706"}),
        e.jsx("path",{d:"M 30 20 L 27 20 L 26 30 L 28 30 Z",fill:"#d97706"}),
        e.jsx("circle",{cx:"8",cy:"22",r:"0.8",fill:"#fef08a"}),
        e.jsx("circle",{cx:"28",cy:"22",r:"0.8",fill:"#fef08a"}),
        e.jsx("circle",{cx:"9",cy:"28",r:"0.8",fill:"#fef08a"}),
        e.jsx("circle",{cx:"27",cy:"28",r:"0.8",fill:"#fef08a"}),
        e.jsx("path",{d:"M 5 19 C 5 13 31 13 31 19 Z",fill:"#92400e",stroke:"#451a03",strokeWidth:"0.8"}),
        e.jsx("path",{d:"M 8 18 C 9 14 13 14 14 18",stroke:"#d97706",strokeWidth:"1.2",fill:"none"}),
        e.jsx("path",{d:"M 22 18 C 23 14 27 14 28 18",stroke:"#d97706",strokeWidth:"1.2",fill:"none"}),
        e.jsx("ellipse",{cx:"18",cy:"19.5",rx:"8",ry:"3",fill:"#fbbf24",stroke:"#d97706",strokeWidth:"0.6"}),
        e.jsx("circle",{cx:"15",cy:"19",r:"1.5",fill:"#fef08a",stroke:"#b45309",strokeWidth:"0.4"}),
        e.jsx("circle",{cx:"18",cy:"18.5",r:"1.6",fill:"#fde047",stroke:"#b45309",strokeWidth:"0.4"}),
        e.jsx("circle",{cx:"21",cy:"19",r:"1.5",fill:"#fef08a",stroke:"#b45309",strokeWidth:"0.4"}),
        e.jsx("rect",{x:"16",y:"19",width:"4",height:"6",rx:"0.8",fill:"#f59e0b",stroke:"#78350f",strokeWidth:"0.6"}),
        e.jsx("circle",{cx:"18",cy:"21",r:"0.7",fill:"#451a03"})
      ]});
    }
    if(n.includes("amphora")||n.includes("provisions")||n.includes("supply")||n.includes("supplies")||n.includes("grain")||n.includes("wine")){
      return e.jsxs("g",{id:"drop-hd-amphora",children:[
        e.jsx("ellipse",{cx:"18",cy:"31.5",rx:"8",ry:"2.5",fill:"#020617",opacity:"0.4"}),
        e.jsx("ellipse",{cx:"18",cy:"6",rx:"3.5",ry:"1.2",fill:"#fdba74",stroke:"#7c2d12",strokeWidth:"0.7"}),
        e.jsx("path",{d:"M 15 6 L 15 12 Q 11 15 11 20 Q 11 27 18 31 Q 25 27 25 20 Q 25 15 21 12 L 21 6 Z",fill:"#c2410c",stroke:"#7c2d12",strokeWidth:"0.8"}),
        e.jsx("path",{d:"M 15 6 L 15 12 Q 13 14 13 18 Q 13 25 18 29 Q 15 26 15 20 Q 15 15 17 12 L 17 6 Z",fill:"#ea580c",opacity:"0.7"}),
        e.jsx("path",{d:"M 14 8 C 8 8 8 16 13 16",fill:"none",stroke:"#ea580c",strokeWidth:"1.8",strokeLinecap:"round"}),
        e.jsx("path",{d:"M 14 8 C 8 8 8 16 13 16",fill:"none",stroke:"#7c2d12",strokeWidth:"0.7",strokeLinecap:"round"}),
        e.jsx("path",{d:"M 22 8 C 28 8 28 16 23 16",fill:"none",stroke:"#c2410c",strokeWidth:"1.8",strokeLinecap:"round"}),
        e.jsx("path",{d:"M 22 8 C 28 8 28 16 23 16",fill:"none",stroke:"#7c2d12",strokeWidth:"0.7",strokeLinecap:"round"}),
        e.jsx("line",{x1:"15",y1:"10",x2:"21",y2:"10",stroke:"#f59e0b",strokeWidth:"0.8",strokeDasharray:"1.5 1"}),
        e.jsx("circle",{cx:"18",cy:"18",r:"2.2",fill:"#991b1b",stroke:"#7f1d1d",strokeWidth:"0.5"}),
        e.jsx("text",{x:"18",y:"19",fontSize:"2.5",fontFamily:"Cinzel, serif",fontWeight:"bold",fill:"#fef08a",textAnchor:"middle",children:"SPQR"})
      ]});
    }
    if(n.includes("scroll")||n.includes("relic")||n.includes("fragment")||n.includes("document")){
      return e.jsxs("g",{id:"drop-hd-scroll",children:[
        e.jsx("ellipse",{cx:"18",cy:"29",rx:"11",ry:"3",fill:"#020617",opacity:"0.4"}),
        e.jsx("rect",{x:"9",y:"14",width:"18",height:"9",rx:"1",fill:"#fef3c7",stroke:"#b45309",strokeWidth:"0.8",transform:"rotate(-6 18 18.5)"}),
        e.jsx("ellipse",{cx:"9",cy:"17",rx:"2.5",ry:"4.5",fill:"#fde68a",stroke:"#b45309",strokeWidth:"0.8",transform:"rotate(-6 9 17)"}),
        e.jsx("ellipse",{cx:"27",cy:"20",rx:"2.5",ry:"4.5",fill:"#fef3c7",stroke:"#b45309",strokeWidth:"0.8",transform:"rotate(-6 27 20)"}),
        e.jsx("rect",{x:"16.5",y:"13",width:"3.5",height:"11",fill:"#dc2626",transform:"rotate(-6 18 18.5)"}),
        e.jsx("circle",{cx:"18",cy:"18.5",r:"3.2",fill:"#b91c1c",stroke:"#7f1d1d",strokeWidth:"0.8"}),
        e.jsx("circle",{cx:"18",cy:"18.5",r:"1.8",fill:"#f59e0b"}),
        e.jsx("path",{d:"M 16.5 21 L 14 26 M 19 21 L 21 26",stroke:"#b91c1c",strokeWidth:"1.2",strokeLinecap:"round"})
      ]});
    }
    if(n.includes("gem")||n.includes("silver_ore")||n.includes("porphyry")||n.includes("ruby")){
      const isRed=n.includes("porphyry")||n.includes("ruby"),
      c1=isRed?"#e11d48":"#0284c7",
      c2=isRed?"#fda4af":"#7dd3fc",
      c3=isRed?"#881337":"#0c4a6e";
      return e.jsxs("g",{id:"drop-hd-gem",children:[
        e.jsx("ellipse",{cx:"18",cy:"30",rx:"9",ry:"3",fill:"#020617",opacity:"0.4"}),
        e.jsx("polygon",{points:"12,12 18,5 24,12 18,29",fill:c3}),
        e.jsx("polygon",{points:"18,5 26,12 21,29 18,29",fill:c1}),
        e.jsx("polygon",{points:"18,5 10,12 15,29 18,29",fill:c2,opacity:"0.75"}),
        e.jsx("polygon",{points:"14,12 18,5 22,12 18,15",fill:"#ffffff",opacity:"0.6"}),
        e.jsx("polygon",{points:"12,12 18,5 24,12 18,29",fill:"none",stroke:"#ffffff",strokeWidth:"0.6",opacity:"0.8"}),
        e.jsx("circle",{cx:"17.5",cy:"7.5",r:"1",fill:"#ffffff"})
      ]});
    }
    if(n.includes("card")||n.includes("event")||n.includes("book")||n.includes("codex")){
      return e.jsxs("g",{id:"drop-hd-codex",children:[
        e.jsx("ellipse",{cx:"18",cy:"30",rx:"11",ry:"3.5",fill:"#020617",opacity:"0.4"}),
        e.jsx("rect",{x:"9",y:"10",width:"18",height:"17",rx:"1.5",fill:"#450a0a",stroke:"#b45309",strokeWidth:"1",transform:"rotate(-6 18 18.5)"}),
        e.jsx("polygon",{points:"9,10 13,10 9,14",fill:"#fbbf24",transform:"rotate(-6 18 18.5)"}),
        e.jsx("polygon",{points:"27,10 23,10 27,14",fill:"#fbbf24",transform:"rotate(-6 18 18.5)"}),
        e.jsx("polygon",{points:"9,27 13,27 9,23",fill:"#fbbf24",transform:"rotate(-6 18 18.5)"}),
        e.jsx("polygon",{points:"27,27 23,27 27,23",fill:"#fbbf24",transform:"rotate(-6 18 18.5)"}),
        e.jsx("circle",{cx:"18",cy:"18.5",r:"3.5",fill:"none",stroke:"#fbbf24",strokeWidth:"1.2",transform:"rotate(-6 18 18.5)"}),
        e.jsx("circle",{cx:"18",cy:"18.5",r:"1.5",fill:"#dc2626",transform:"rotate(-6 18 18.5)"}),
        e.jsx("line",{x1:"18",y1:"12",x2:"18",y2:"25",stroke:"#fbbf24",strokeWidth:"0.8",transform:"rotate(-6 18 18.5)"})
      ]});
    }
    return e.jsxs("g",{id:"drop-hd-artifact",children:[
      e.jsx("ellipse",{cx:"18",cy:"30",rx:"10",ry:"3",fill:"#020617",opacity:"0.4"}),
      e.jsx("ellipse",{cx:"18",cy:"18",rx:"10",ry:"8",fill:"none",stroke:"#f59e0b",strokeWidth:"1.8"}),
      e.jsx("path",{d:"M 10 18 Q 8 13 12 14 Q 11 18 10 18 Z",fill:"#fbbf24",stroke:"#d97706",strokeWidth:"0.5"}),
      e.jsx("path",{d:"M 13 13 Q 15 9 18 11 Q 16 15 13 13 Z",fill:"#fbbf24",stroke:"#d97706",strokeWidth:"0.5"}),
      e.jsx("path",{d:"M 23 13 Q 21 9 18 11 Q 20 15 23 13 Z",fill:"#fbbf24",stroke:"#d97706",strokeWidth:"0.5"}),
      e.jsx("path",{d:"M 26 18 Q 28 13 24 14 Q 25 18 26 18 Z",fill:"#fbbf24",stroke:"#d97706",strokeWidth:"0.5"}),
      e.jsx("circle",{cx:"18",cy:"18",r:"4.5",fill:"#1e3a8a",stroke:"#fbbf24",strokeWidth:"1.2"}),
      e.jsx("circle",{cx:"18",cy:"18",r:"2",fill:"#38bdf8"}),
      e.jsx("circle",{cx:"17.2",cy:"17.2",r:"0.8",fill:"#ffffff"})
    ]});
  };
  return e.jsxs("div",{
    className:\`relative flex items-center justify-center select-none transition-transform duration-200 \${a||r?"scale-125":"hover:scale-115"} \${l}\`,
    style:{width:\`\${o}px\`,height:\`\${o}px\`},
    children:[
      r&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:e.jsx("div",{className:"w-7 h-7 rounded-full bg-amber-400/20 blur-[3px] animate-pulse"})}),
      null,
      e.jsx("svg",{viewBox:"0 0 36 36",className:"w-full h-full overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]",children:c()}),
      (a||r)&&e.jsx("div",{className:"absolute -top-1 -right-1 pointer-events-none animate-bounce",children:e.jsx(xt,{className:"w-3 h-3 text-amber-300 fill-amber-200 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]"})})
    ]
  })
}`;

  cleanJs = cleanJs.substring(0, jcIdx) + newJc + cleanJs.substring(jcEndIdx);
  

  // 5. Upgrade Dm, Im, and Om (Location Markers) to HD Roman Standard with rich regional variety
  const imStartMarker = "const Im=({portId:";
  const imIdx = cleanJs.indexOf(imStartMarker);
  if (imIdx === -1) throw new Error("Could not find Im component");
  const omEndMarker = ",Qi=(t,s)=>pc(t,s)";
  const omEndIdx = cleanJs.indexOf(omEndMarker, imIdx);
  if (omEndIdx === -1) throw new Error("Could not find Qi after Om");

  const newLocationMarkers = `const Im=({portId:t="",category:s="MAJOR_PORT",faction:a="usurpers",isCaptured:r=!1,isNear:o=!1,isBlockaded:l=!1,isSieged:n=!1,size:c=32,className:i=""})=>{
  const p=(t||"").toLowerCase(),
  isPlayer=r||a==="constantine",
  stoneFill=isPlayer?"#fef3c7":"#e2e8f0",
  stoneStroke=isPlayer?"#d97706":"#64748b",
  roofFill=isPlayer?"#b45309":"#475569",
  roofStroke=isPlayer?"#fbbf24":"#94a3b8",
  goldAccent="#f59e0b",
  hVal=p.split("").reduce((acc,ch)=>acc+ch.charCodeAt(0),0)%3;

  const renderCity=()=>{
    if(p.includes("roma")||p.includes("rome")){
      return e.jsxs("g",{id:"hd-city-roma",children:[
        e.jsx("ellipse",{cx:"24",cy:"36",rx:"19",ry:"6",fill:"#020617",opacity:"0.45"}),
        e.jsx("path",{d:"M 7 32 C 7 21 15 18 24 18 C 33 18 41 21 41 32 Z",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1.2"}),
        e.jsx("path",{d:"M 10 32 C 10 27 13 27 13 32 M 15 31 C 15 26 18 26 18 31 M 20 30 C 20 25 23 25 23 30 M 25 30 C 25 25 28 25 28 30 M 30 31 C 30 26 33 26 33 31 M 35 32 C 35 27 38 27 38 32",stroke:stoneStroke,strokeWidth:"1.1",fill:"#1c1917"}),
        e.jsx("polygon",{points:"24,6 14,14 34,14",fill:roofFill,stroke:roofStroke,strokeWidth:"1.1"}),
        e.jsx("rect",{x:"16",y:"14",width:"16",height:"11",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("line",{x1:"18",y1:"14",x2:"18",y2:"25",stroke:stoneStroke,strokeWidth:"1.3"}),
        e.jsx("line",{x1:"22",y1:"14",x2:"22",y2:"25",stroke:stoneStroke,strokeWidth:"1.3"}),
        e.jsx("line",{x1:"26",y1:"14",x2:"26",y2:"25",stroke:stoneStroke,strokeWidth:"1.3"}),
        e.jsx("line",{x1:"30",y1:"14",x2:"30",y2:"25",stroke:stoneStroke,strokeWidth:"1.3"}),
        e.jsx("polygon",{points:"24,1 29,3.5 24,6",fill:goldAccent}),
        e.jsx("circle",{cx:"24",cy:"1",r:"1.3",fill:"#fef08a"})
      ]});
    }
    if(p.includes("athen")||p.includes("corinth")||p.includes("sparta")||p.includes("delphi")||p.includes("thebes")){
      return e.jsxs("g",{id:"hd-city-athens",children:[
        e.jsx("ellipse",{cx:"24",cy:"36",rx:"18",ry:"5",fill:"#020617",opacity:"0.45"}),
        e.jsx("polygon",{points:"6,35 14,24 34,24 42,35",fill:"#78716c",stroke:"#44403c",strokeWidth:"0.8"}),
        e.jsx("rect",{x:"10",y:"22",width:"28",height:"3",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.8"}),
        e.jsx("polygon",{points:"24,8 10,16 38,16",fill:roofFill,stroke:roofStroke,strokeWidth:"1"}),
        e.jsx("circle",{cx:"24",cy:"13",r:"1.8",fill:"#fef08a"}),
        e.jsx("line",{x1:"12",y1:"16",x2:"12",y2:"22",stroke:stoneStroke,strokeWidth:"1.5"}),
        e.jsx("line",{x1:"17",y1:"16",x2:"17",y2:"22",stroke:stoneStroke,strokeWidth:"1.5"}),
        e.jsx("line",{x1:"22",y1:"16",x2:"22",y2:"22",stroke:stoneStroke,strokeWidth:"1.5"}),
        e.jsx("line",{x1:"26",y1:"16",x2:"26",y2:"22",stroke:stoneStroke,strokeWidth:"1.5"}),
        e.jsx("line",{x1:"31",y1:"16",x2:"31",y2:"22",stroke:stoneStroke,strokeWidth:"1.5"}),
        e.jsx("line",{x1:"36",y1:"16",x2:"36",y2:"22",stroke:stoneStroke,strokeWidth:"1.5"}),
        e.jsx("polygon",{points:"24,3 27,5.5 24,8",fill:goldAccent}),
        e.jsx("circle",{cx:"24",cy:"3",r:"1.2",fill:"#fef08a"})
      ]});
    }
    if(p.includes("constantin")||p.includes("byzant")){
      return e.jsxs("g",{id:"hd-city-constantinople",children:[
        e.jsx("ellipse",{cx:"24",cy:"37",rx:"19",ry:"5",fill:"#020617",opacity:"0.45"}),
        e.jsx("rect",{x:"8",y:"25",width:"32",height:"10",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1.1"}),
        e.jsx("circle",{cx:"24",cy:"20",r:"9",fill:goldAccent,stroke:"#b45309",strokeWidth:"1"}),
        e.jsx("path",{d:"M 15 20 A 9 9 0 0 1 33 20 Z",fill:"#fde047"}),
        e.jsx("rect",{x:"14",y:"20",width:"20",height:"7",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.9"}),
        e.jsx("rect",{x:"6",y:"16",width:"6",height:"19",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.9"}),
        e.jsx("polygon",{points:"9,11 6,16 12,16",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("rect",{x:"36",y:"16",width:"6",height:"19",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.9"}),
        e.jsx("polygon",{points:"39,11 36,16 42,16",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("circle",{cx:"24",cy:"11",r:"1.4",fill:"#fef08a"})
      ]});
    }
    if(p.includes("petra")||p.includes("palmyra")||p.includes("damascus")||p.includes("hierosolyma")||p.includes("carrhae")||p.includes("heliopolis")){
      const desertStone=isPlayer?"#fde68a":"#d97706",desertDark=isPlayer?"#b45309":"#78350f";
      return e.jsxs("g",{id:"hd-city-desert-oasis",children:[
        e.jsx("ellipse",{cx:"24",cy:"36",rx:"18",ry:"5",fill:"#020617",opacity:"0.45"}),
        e.jsx("rect",{x:"9",y:"16",width:"30",height:"19",fill:desertStone,stroke:desertDark,strokeWidth:"1.1"}),
        e.jsx("polygon",{points:"24,7 13,16 35,16",fill:desertDark,stroke:roofStroke,strokeWidth:"0.9"}),
        e.jsx("circle",{cx:"24",cy:"12",r:"2.2",fill:"#fef08a"}),
        e.jsx("path",{d:"M 19 35 L 19 25 Q 24 21 29 25 L 29 35 Z",fill:"#1c1917",stroke:desertDark,strokeWidth:"0.9"}),
        e.jsx("line",{x1:"12",y1:"16",x2:"12",y2:"35",stroke:desertDark,strokeWidth:"1.4"}),
        e.jsx("line",{x1:"36",y1:"16",x2:"36",y2:"35",stroke:desertDark,strokeWidth:"1.4"}),
        e.jsx("path",{d:"M 5 35 Q 5 24 2 21 M 2 21 Q 6 18 8 23 M 2 21 Q 0 17 -1 21 M 2 21 Q -2 23 1 27",stroke:"#15803d",strokeWidth:"1.2",fill:"none"})
      ]});
    }
    if(p.includes("sirmium")||p.includes("mediolanum")||p.includes("taurinorum")||p.includes("cibalae")||p.includes("carnuntum")||p.includes("aquileia")||p.includes("vindobona")){
      return e.jsxs("g",{id:"hd-city-castrum-fort",children:[
        e.jsx("ellipse",{cx:"24",cy:"36",rx:"18",ry:"5",fill:"#020617",opacity:"0.45"}),
        e.jsx("rect",{x:"10",y:"22",width:"28",height:"13",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1.2"}),
        e.jsx("rect",{x:"6",y:"14",width:"8",height:"21",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("polygon",{points:"10,9 6,14 14,14",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("rect",{x:"34",y:"14",width:"8",height:"21",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("polygon",{points:"38,9 34,14 42,14",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("rect",{x:"18",y:"16",width:"12",height:"10",fill:roofFill,stroke:roofStroke,strokeWidth:"0.9"}),
        e.jsx("path",{d:"M 21 35 L 21 28 Q 24 26 27 28 L 27 35 Z",fill:"#1c1917",stroke:stoneStroke,strokeWidth:"0.8"}),
        e.jsx("line",{x1:"24",y1:"7",x2:"24",y2:"16",stroke:"#b91c1c",strokeWidth:"1.4"}),
        e.jsx("rect",{x:"24",y:"8",width:"5",height:"4",fill:"#dc2626"})
      ]});
    }
    if(p.includes("emerita")||p.includes("corduba")||p.includes("hispalis")||p.includes("caesaraugusta")||p.includes("tarraco")||p.includes("trier")||p.includes("treverorum")||p.includes("alesia")||p.includes("lugdunum")){
      return e.jsxs("g",{id:"hd-city-arch-aqueduct",children:[
        e.jsx("ellipse",{cx:"24",cy:"36",rx:"18",ry:"5",fill:"#020617",opacity:"0.45"}),
        e.jsx("rect",{x:"4",y:"10",width:"40",height:"6",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.9"}),
        e.jsx("path",{d:"M 6 16 L 6 22 M 14 16 L 14 22 M 20 16 L 20 22 M 28 16 L 28 22 M 34 16 L 34 22 M 42 16 L 42 22",stroke:stoneStroke,strokeWidth:"1.3"}),
        e.jsx("path",{d:"M 6 22 Q 10 17 14 22 M 20 22 Q 24 17 28 22 M 34 22 Q 38 17 42 22",stroke:stoneStroke,strokeWidth:"1",fill:"none"}),
        e.jsx("rect",{x:"14",y:"20",width:"20",height:"15",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1.1"}),
        e.jsx("polygon",{points:"24,14 14,20 34,20",fill:roofFill,stroke:roofStroke,strokeWidth:"0.9"}),
        e.jsx("path",{d:"M 20 35 L 20 27 Q 24 24 28 27 L 28 35 Z",fill:"#1c1917",stroke:stoneStroke,strokeWidth:"0.9"}),
        e.jsx("circle",{cx:"24",cy:"7",r:"1.3",fill:"#fef08a"})
      ]});
    }
    if(p.includes("volubilis")||p.includes("cirta")||p.includes("thamugadi")||p.includes("zama")||p.includes("theveste")){
      return e.jsxs("g",{id:"hd-city-triumphal-arch",children:[
        e.jsx("ellipse",{cx:"24",cy:"36",rx:"18",ry:"5",fill:"#020617",opacity:"0.45"}),
        e.jsx("rect",{x:"8",y:"12",width:"32",height:"7",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("rect",{x:"9",y:"19",width:"9",height:"16",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("rect",{x:"30",y:"19",width:"9",height:"16",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("path",{d:"M 18 35 L 18 24 Q 24 19 30 24 L 30 35 Z",fill:"#1c1917",stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("line",{x1:"12",y1:"12",x2:"12",y2:"35",stroke:stoneStroke,strokeWidth:"1.2"}),
        e.jsx("line",{x1:"36",y1:"12",x2:"36",y2:"35",stroke:stoneStroke,strokeWidth:"1.2"}),
        e.jsx("circle",{cx:"24",cy:"15.5",r:"2",fill:goldAccent}),
        e.jsx("polygon",{points:"24,7 28,9.5 24,12",fill:goldAccent})
      ]});
    }
    if(p.includes("ancyra")||p.includes("caesarea")||p.includes("pergamum")||p.includes("sardis")||p.includes("antioch")){
      return e.jsxs("g",{id:"hd-city-hellenistic-citadel",children:[
        e.jsx("ellipse",{cx:"24",cy:"36",rx:"18",ry:"5",fill:"#020617",opacity:"0.45"}),
        e.jsx("polygon",{points:"8,35 15,22 33,22 40,35",fill:"#78716c",stroke:"#44403c",strokeWidth:"0.8"}),
        e.jsx("path",{d:"M 14 34 Q 24 26 34 34",fill:"none",stroke:"#e2e8f0",strokeWidth:"1.1"}),
        e.jsx("path",{d:"M 17 31 Q 24 25 31 31",fill:"none",stroke:"#e2e8f0",strokeWidth:"1"}),
        e.jsx("rect",{x:"17",y:"14",width:"14",height:"10",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("polygon",{points:"24,8 15,14 33,14",fill:roofFill,stroke:roofStroke,strokeWidth:"0.9"}),
        e.jsx("line",{x1:"20",y1:"14",x2:"20",y2:"24",stroke:stoneStroke,strokeWidth:"1.2"}),
        e.jsx("line",{x1:"28",y1:"14",x2:"28",y2:"24",stroke:stoneStroke,strokeWidth:"1.2"}),
        e.jsx("circle",{cx:"24",cy:"5",r:"1.3",fill:"#fef08a"})
      ]});
    }
    if(hVal===0){
      return e.jsxs("g",{id:"hd-town-villa-rustica",children:[
        e.jsx("ellipse",{cx:"24",cy:"36",rx:"17",ry:"5",fill:"#020617",opacity:"0.45"}),
        e.jsx("rect",{x:"10",y:"21",width:"28",height:"14",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1.1"}),
        e.jsx("polygon",{points:"24,13 8,21 40,21",fill:roofFill,stroke:roofStroke,strokeWidth:"1"}),
        e.jsx("rect",{x:"18",y:"21",width:"12",height:"14",fill:"#475569",opacity:"0.2"}),
        e.jsx("line",{x1:"20",y1:"21",x2:"20",y2:"35",stroke:stoneStroke,strokeWidth:"1.2"}),
        e.jsx("line",{x1:"28",y1:"21",x2:"28",y2:"35",stroke:stoneStroke,strokeWidth:"1.2"}),
        e.jsx("circle",{cx:"24",cy:"17",r:"1.4",fill:"#fef08a"})
      ]});
    }
    if(hVal===1){
      return e.jsxs("g",{id:"hd-town-basilica-forum",children:[
        e.jsx("ellipse",{cx:"24",cy:"36",rx:"17",ry:"5",fill:"#020617",opacity:"0.45"}),
        e.jsx("rect",{x:"12",y:"19",width:"24",height:"16",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1.1"}),
        e.jsx("polygon",{points:"24,10 10,19 38,19",fill:roofFill,stroke:roofStroke,strokeWidth:"0.9"}),
        e.jsx("rect",{x:"8",y:"25",width:"8",height:"10",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.9"}),
        e.jsx("polygon",{points:"12,21 7,25 17,25",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("rect",{x:"32",y:"25",width:"8",height:"10",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.9"}),
        e.jsx("polygon",{points:"36,21 31,25 41,25",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("path",{d:"M 21 35 L 21 28 Q 24 26 27 28 L 27 35 Z",fill:"#1c1917",stroke:stoneStroke,strokeWidth:"0.8"})
      ]});
    }
    return e.jsxs("g",{id:"hd-town-outpost",children:[
      e.jsx("ellipse",{cx:"24",cy:"36",rx:"17",ry:"5",fill:"#020617",opacity:"0.45"}),
      e.jsx("rect",{x:"14",y:"15",width:"20",height:"20",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1.1"}),
      e.jsx("polygon",{points:"24,8 12,15 36,15",fill:roofFill,stroke:roofStroke,strokeWidth:"0.9"}),
      e.jsx("line",{x1:"10",y1:"27",x2:"38",y2:"27",stroke:"#78350f",strokeWidth:"1.4"}),
      e.jsx("path",{d:"M 21 35 L 21 28 L 27 28 L 27 35 Z",fill:"#1c1917",stroke:stoneStroke,strokeWidth:"0.8"}),
      e.jsx("polygon",{points:"24,3 27,5.5 24,8",fill:goldAccent}),
      e.jsx("circle",{cx:"24",cy:"3",r:"1.2",fill:"#fef08a"})
    ]});
  };
  return e.jsx("div",{
    className:\`relative flex items-center justify-center select-none transition-transform duration-200 \${i}\`,
    style:{width:\`\${c}px\`,height:\`\${c}px\`},
    children:e.jsx("svg",{viewBox:"0 0 48 48",className:"w-full h-full overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",children:renderCity()})
  });
},
Dm=({portId:t="",category:s="MINOR_PORT",faction:a="usurpers",isCaptured:r=!1,isNear:o=!1,isBlockaded:l=!1,isSieged:n=!1,size:c=28,className:i=""})=>{
  const p=(t||"").toLowerCase(),
  isPlayer=r||a==="constantine",
  stoneFill=isPlayer?"#fef3c7":"#e2e8f0",
  stoneStroke=isPlayer?"#d97706":"#64748b",
  roofFill=isPlayer?"#b45309":"#475569",
  roofStroke=isPlayer?"#fbbf24":"#94a3b8",
  lightColor=isPlayer?"#fef08a":"#38bdf8",
  goldAccent="#f59e0b",
  hVal=p.split("").reduce((acc,ch)=>acc+ch.charCodeAt(0),0)%3;

  const renderPort=()=>{
    if(p.includes("alexandria")){
      return e.jsxs("g",{id:"hd-pharos-alexandria",children:[
        e.jsx("ellipse",{cx:"24",cy:"38",rx:"16",ry:"4",fill:"#020617",opacity:"0.45"}),
        e.jsx("polygon",{points:"12,38 36,38 33,29 15,29",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("rect",{x:"17",y:"21",width:"14",height:"8",rx:"0.5",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("polygon",{points:"19,13 29,13 28,21 20,21",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.9"}),
        e.jsx("rect",{x:"21",y:"7",width:"6",height:"6",rx:"0.5",fill:"#1e293b",stroke:stoneStroke,strokeWidth:"0.8"}),
        e.jsx("circle",{cx:"24",cy:"10",r:"2.8",fill:lightColor}),
        e.jsx("polygon",{points:"24,2 20,7 28,7",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("polygon",{points:"24,10 44,2 41,18",fill:lightColor,opacity:"0.25",pointerEvents:"none"})
      ]});
    }
    if(p.includes("carthag")){
      return e.jsxs("g",{id:"hd-cothon-carthage",children:[
        e.jsx("ellipse",{cx:"24",cy:"27",rx:"17",ry:"11",fill:"none",stroke:"#0284c7",strokeWidth:"3",opacity:"0.8"}),
        e.jsx("ellipse",{cx:"24",cy:"27",rx:"15",ry:"9",fill:"none",stroke:stoneFill,strokeWidth:"2.2"}),
        e.jsx("ellipse",{cx:"24",cy:"27",rx:"12",ry:"7",fill:"none",stroke:"#0369a1",strokeWidth:"2.5",opacity:"0.9"}),
        e.jsx("ellipse",{cx:"24",cy:"27",rx:"6",ry:"4",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("rect",{x:"21.5",y:"19",width:"5",height:"7",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.9"}),
        e.jsx("polygon",{points:"24,14 20,19 28,19",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"})
      ]});
    }
    if(p.includes("ostia")||p.includes("portus")||p.includes("massilia")||p.includes("gades")||p.includes("syracus")||p.includes("tarentum")||p.includes("ephesus")||p.includes("smyrna")||p.includes("neapolis")||p.includes("ravenna")){
      return e.jsxs("g",{id:"hd-port-commercial-harbor",children:[
        e.jsx("ellipse",{cx:"24",cy:"37",rx:"18",ry:"5",fill:"#020617",opacity:"0.45"}),
        e.jsx("path",{d:"M 6 36 C 6 27 12 25 24 25 C 36 25 42 27 42 36 L 38 38 C 34 30 14 30 10 38 Z",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("ellipse",{cx:"24",cy:"32",rx:"10",ry:"5",fill:"#0284c7",opacity:"0.7"}),
        e.jsx("rect",{x:"10",y:"18",width:"10",height:"8",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.8"}),
        e.jsx("polygon",{points:"15,13 9,18 21,18",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("rect",{x:"28",y:"18",width:"10",height:"8",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.8"}),
        e.jsx("polygon",{points:"33,13 27,18 39,18",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("rect",{x:"22",y:"12",width:"4",height:"12",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.8"}),
        e.jsx("circle",{cx:"24",cy:"10",r:"1.8",fill:lightColor})
      ]});
    }
    if(p.includes("rhod")||p.includes("delos")||p.includes("cyprus")||p.includes("salamis")||p.includes("crete")||p.includes("knossos")||p.includes("palma")||p.includes("alalia")||p.includes("corsica")){
      return e.jsxs("g",{id:"hd-port-island-colossus",children:[
        e.jsx("ellipse",{cx:"24",cy:"37",rx:"17",ry:"5",fill:"#020617",opacity:"0.45"}),
        e.jsx("path",{d:"M 8 36 Q 16 32 24 33 Q 32 32 40 36 L 38 39 Q 31 35 24 36 Q 17 35 10 39 Z",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.9"}),
        e.jsx("rect",{x:"11",y:"22",width:"6",height:"12",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.8"}),
        e.jsx("rect",{x:"31",y:"22",width:"6",height:"12",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.8"}),
        e.jsx("path",{d:"M 14 22 L 20 10 L 24 6 L 28 10 L 34 22",fill:"none",stroke:goldAccent,strokeWidth:"1.4"}),
        e.jsx("circle",{cx:"24",cy:"4.5",r:"2",fill:"#fef08a",stroke:"#b45309",strokeWidth:"0.6"}),
        e.jsx("polygon",{points:"24,2 26,0 28,3",fill:lightColor}),
        e.jsx("circle",{cx:"28",cy:"2",r:"1.4",fill:lightColor})
      ]});
    }
    if(p.includes("leptis")||p.includes("tingis")||p.includes("hippo")||p.includes("pelusium")||p.includes("tyre")||p.includes("sidon")){
      return e.jsxs("g",{id:"hd-port-grain-colonnade",children:[
        e.jsx("ellipse",{cx:"24",cy:"37",rx:"17",ry:"5",fill:"#020617",opacity:"0.45"}),
        e.jsx("rect",{x:"8",y:"28",width:"32",height:"8",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("rect",{x:"10",y:"16",width:"16",height:"12",fill:stoneFill,stroke:stoneStroke,strokeWidth:"0.9"}),
        e.jsx("polygon",{points:"18,10 9,16 27,16",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("line",{x1:"29",y1:"28",x2:"29",y2:"15",stroke:stoneStroke,strokeWidth:"1.5"}),
        e.jsx("line",{x1:"33",y1:"28",x2:"33",y2:"15",stroke:stoneStroke,strokeWidth:"1.5"}),
        e.jsx("line",{x1:"37",y1:"28",x2:"37",y2:"15",stroke:stoneStroke,strokeWidth:"1.5"}),
        e.jsx("line",{x1:"27",y1:"15",x2:"39",y2:"15",stroke:stoneStroke,strokeWidth:"1.2"}),
        e.jsx("line",{x1:"33",y1:"15",x2:"42",y2:"8",stroke:"#78350f",strokeWidth:"1.2"}),
        e.jsx("circle",{cx:"42",cy:"8",r:"1.2",fill:goldAccent})
      ]});
    }
    if(p.includes("corsair")||p.includes("pirate")||p.includes("cove")||p.includes("haven")||p.includes("vandal")||p.includes("hideout")){
      return e.jsxs("g",{id:"hd-port-pirate-haven",children:[
        e.jsx("ellipse",{cx:"24",cy:"37",rx:"16",ry:"4",fill:"#020617",opacity:"0.45"}),
        e.jsx("polygon",{points:"6,37 14,24 24,26 34,22 42,37",fill:"#475569",stroke:"#1e293b",strokeWidth:"0.8"}),
        e.jsx("rect",{x:"19",y:"12",width:"10",height:"16",fill:"#78350f",stroke:"#451a03",strokeWidth:"0.9"}),
        e.jsx("polygon",{points:"24,6 17,12 31,12",fill:"#991b1b",stroke:"#450a0a",strokeWidth:"0.8"}),
        e.jsx("circle",{cx:"24",cy:"4.5",r:"2",fill:"#ea580c"}),
        e.jsx("polygon",{points:"24,2 22,5 26,5",fill:"#fbbf24"}),
        e.jsx("path",{d:"M 10 36 L 10 32 L 20 32",stroke:"#b45309",strokeWidth:"1.2",fill:"none"})
      ]});
    }
    if(hVal===0){
      return e.jsxs("g",{id:"hd-coastal-lighthouse",children:[
        e.jsx("ellipse",{cx:"24",cy:"37",rx:"16",ry:"4",fill:"#020617",opacity:"0.45"}),
        e.jsx("path",{d:"M 8 36 Q 16 31 24 33 Q 32 31 40 36 L 38 39 Q 31 34 24 36 Q 17 34 10 39 Z",fill:"#334155",stroke:"#1e293b",strokeWidth:"0.8"}),
        e.jsx("path",{d:"M 10 35 Q 17 31 24 33 Q 31 31 38 35 L 36 32 Q 30 29 24 30 Q 18 29 12 32 Z",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("rect",{x:"13",y:"23",width:"12",height:"9",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("polygon",{points:"19,17 11,23 27,23",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("rect",{x:"27",y:"14",width:"7",height:"17",rx:"0.5",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("rect",{x:"29",y:"19",width:"3",height:"4",rx:"0.5",fill:"#0f172a"}),
        e.jsx("polygon",{points:"30.5,9 25.5,14 35.5,14",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("circle",{cx:"30.5",cy:"11.5",r:"2.2",fill:lightColor}),
        e.jsx("polygon",{points:"30.5,11.5 44,5 42,19",fill:lightColor,opacity:"0.25",pointerEvents:"none"})
      ]});
    }
    if(hVal===1){
      return e.jsxs("g",{id:"hd-port-sea-gate",children:[
        e.jsx("ellipse",{cx:"24",cy:"37",rx:"17",ry:"4.5",fill:"#020617",opacity:"0.45"}),
        e.jsx("rect",{x:"8",y:"16",width:"8",height:"19",rx:"0.5",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("polygon",{points:"12,10 7,16 17,16",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("rect",{x:"32",y:"16",width:"8",height:"19",rx:"0.5",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
        e.jsx("polygon",{points:"36,10 31,16 41,16",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
        e.jsx("path",{d:"M 16 26 Q 24 22 32 26",stroke:stoneStroke,strokeWidth:"1.8",fill:"none"}),
        e.jsx("ellipse",{cx:"24",cy:"32",rx:"7",ry:"3",fill:"#0284c7",opacity:"0.7"}),
        e.jsx("circle",{cx:"12",cy:"8",r:"1.2",fill:lightColor}),
        e.jsx("circle",{cx:"36",cy:"8",r:"1.2",fill:lightColor})
      ]});
    }
    return e.jsxs("g",{id:"hd-port-anchorage-pier",children:[
      e.jsx("ellipse",{cx:"24",cy:"37",rx:"16",ry:"4",fill:"#020617",opacity:"0.45"}),
      e.jsx("rect",{x:"10",y:"22",width:"16",height:"13",fill:stoneFill,stroke:stoneStroke,strokeWidth:"1"}),
      e.jsx("polygon",{points:"18,15 9,22 27,22",fill:roofFill,stroke:roofStroke,strokeWidth:"0.8"}),
      e.jsx("path",{d:"M 26 31 L 42 31 L 40 35 L 26 35 Z",fill:"#78350f",stroke:"#451a03",strokeWidth:"0.8"}),
      e.jsx("line",{x1:"30",y1:"35",x2:"30",y2:"38",stroke:"#451a03",strokeWidth:"1.2"}),
      e.jsx("line",{x1:"36",y1:"35",x2:"36",y2:"38",stroke:"#451a03",strokeWidth:"1.2"}),
      e.jsx("circle",{cx:"18",cy:"12",r:"1.4",fill:lightColor})
    ]});
  };
  return e.jsx("div",{
    className:\`relative flex items-center justify-center select-none transition-transform duration-200 \${i}\`,
    style:{width:\`\${c}px\`,height:\`\${c}px\`},
    children:e.jsx("svg",{viewBox:"0 0 48 48",className:"w-full h-full overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",children:renderPort()})
  });
},
Om=({battlefieldId:t="",domain:s="land",isCaptured:a=!1,isNear:r=!1,size:o=28,className:l=""})=>{
  const isNaval=s==="sea"||t.includes("strait")||t.includes("actium")||t.includes("hellespont");
  return e.jsx("div",{
    className:\`relative flex items-center justify-center select-none transition-transform duration-200 \${l}\`,
    style:{width:\`\${o}px\`,height:\`\${o}px\`},
    children:e.jsxs("svg",{viewBox:"0 0 44 44",className:"w-full h-full overflow-visible drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",children:[
      e.jsx("ellipse",{cx:"22",cy:"36",rx:"14",ry:"4",fill:"#020617",opacity:"0.45"}),
      isNaval?e.jsxs("g",{id:"hd-naval-battlefield",children:[
        e.jsx("line",{x1:"12",y1:"12",x2:"32",y2:"32",stroke:"#e2e8f0",strokeWidth:"2.2",strokeLinecap:"round"}),
        e.jsx("line",{x1:"32",y1:"12",x2:"12",y2:"32",stroke:"#e2e8f0",strokeWidth:"2.2",strokeLinecap:"round"}),
        e.jsx("polygon",{points:"12,12 8,16 16,8",fill:"#f59e0b",stroke:"#b45309",strokeWidth:"0.6"}),
        e.jsx("polygon",{points:"32,12 28,8 36,16",fill:"#f59e0b",stroke:"#b45309",strokeWidth:"0.6"}),
        e.jsx("circle",{cx:"22",cy:"22",r:"6",fill:"#0284c7",stroke:"#fbbf24",strokeWidth:"1.2"}),
        e.jsx("circle",{cx:"22",cy:"22",r:"3",fill:"#fef08a"})
      ]}):e.jsxs("g",{id:"hd-land-battlefield",children:[
        e.jsx("line",{x1:"11",y1:"11",x2:"33",y2:"33",stroke:"#e2e8f0",strokeWidth:"2.4",strokeLinecap:"round"}),
        e.jsx("line",{x1:"33",y1:"11",x2:"11",y2:"33",stroke:"#e2e8f0",strokeWidth:"2.4",strokeLinecap:"round"}),
        e.jsx("polygon",{points:"11,11 7,15 15,7",fill:"#fbbf24",stroke:"#78350f",strokeWidth:"0.7"}),
        e.jsx("polygon",{points:"33,11 29,7 37,15",fill:"#fbbf24",stroke:"#78350f",strokeWidth:"0.7"}),
        e.jsx("rect",{x:"18",y:"16",width:"8",height:"12",rx:"1.5",fill:"#b91c1c",stroke:"#fbbf24",strokeWidth:"1.2"}),
        e.jsx("circle",{cx:"22",cy:"22",r:"2.2",fill:"#fbbf24",stroke:"#78350f",strokeWidth:"0.6"})
      ]})
    ]})
  });
}`;

  cleanJs = cleanJs.substring(0, imIdx) + newLocationMarkers + cleanJs.substring(omEndIdx);
  

  // 6. Upgrade Vr (HUD Action Buttons) to Unified High-Definition Roman Standard
  const vrStartMarker = "Vr=lt.memo(({emblem:t,icon:s";
  const vrIdx = cleanJs.indexOf(vrStartMarker);
  if (vrIdx === -1) throw new Error("Could not find Vr component");
  const vrEndMarker = 'Vr.displayName="HUDButton";';
  const vrEndIdx = cleanJs.indexOf(vrEndMarker, vrIdx) + vrEndMarker.length;

  const newVr = `Vr=lt.memo(({emblem:t,icon:s,variant:a="teal",title:r,onClick:o,disabled:l=!1,showGlow:n=!1,className:c="",id:i,onPointerDown:p,onTouchStart:x})=>{
  const d=(()=>{
    switch(a){
      case"gold": return {bg:"bg-gradient-to-b from-[#3d2a08]/90 via-[#261904]/98 to-[#120b01]/98", border:"border-[1.5px] border-amber-400/85 hover:border-amber-300", glow:"shadow-[0_6px_18px_rgba(0,0,0,0.85),0_0_10px_rgba(245,158,11,0.3),inset_0_1.5px_2px_rgba(254,240,138,0.4)]", iconColor:"text-amber-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]", pulseGlow:"shadow-[0_8px_16px_rgba(0,0,0,0.9),0_0_16px_rgba(245,158,11,0.45)]"};
      case"bronze": return {bg:"bg-gradient-to-b from-[#341d0c]/90 via-[#201006]/98 to-[#0f0702]/98", border:"border-[1.5px] border-amber-600/80 hover:border-amber-500", glow:"shadow-[0_6px_18px_rgba(0,0,0,0.85),0_0_8px_rgba(217,119,6,0.25),inset_0_1.5px_2px_rgba(251,191,36,0.35)]", iconColor:"text-amber-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]", pulseGlow:"shadow-[0_8px_16px_rgba(0,0,0,0.9),0_0_14px_rgba(217,119,6,0.4)]"};
      case"silver": return {bg:"bg-gradient-to-b from-[#1e293b]/90 via-[#0f172a]/98 to-[#020617]/98", border:"border-[1.5px] border-slate-300/85 hover:border-slate-200", glow:"shadow-[0_6px_18px_rgba(0,0,0,0.85),0_0_8px_rgba(203,213,225,0.25),inset_0_1.5px_2px_rgba(255,255,255,0.4)]", iconColor:"text-slate-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]", pulseGlow:"shadow-[0_8px_16px_rgba(0,0,0,0.9),0_0_14px_rgba(203,213,225,0.4)]"};
      case"crimson": return {bg:"bg-gradient-to-b from-[#450a0a]/90 via-[#250404]/98 to-[#100101]/98", border:"border-[1.5px] border-red-500/85 hover:border-red-400", glow:"shadow-[0_6px_18px_rgba(0,0,0,0.85),0_0_10px_rgba(239,68,68,0.3),inset_0_1.5px_2px_rgba(254,202,202,0.35)]", iconColor:"text-red-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]", pulseGlow:"shadow-[0_8px_16px_rgba(0,0,0,0.9),0_0_16px_rgba(239,68,68,0.45)]"};
      default: return {bg:"bg-gradient-to-b from-[#063336]/90 via-[#032024]/98 to-[#010e10]/98", border:"border-[1.5px] border-teal-400/80 hover:border-teal-300", glow:"shadow-[0_6px_18px_rgba(0,0,0,0.85),0_0_8px_rgba(45,212,191,0.25),inset_0_1.5px_2px_rgba(153,246,228,0.35)]", iconColor:"text-teal-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]", pulseGlow:"shadow-[0_8px_16px_rgba(0,0,0,0.9),0_0_14px_rgba(45,212,191,0.4)]"};
    }
  })();
  const renderContent=()=>{
    if(s){
      return e.jsx("div",{
        className:\`w-full h-full flex items-center justify-center \${d.iconColor}\`,
        children:lt.isValidElement(s)?lt.cloneElement(s,{className:"w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] text-amber-200 shrink-0",style:{width:"20px",height:"20px"},strokeWidth:2}):s
      });
    }
    if(t){
      const k=t.toLowerCase();
      if(k==="anchor"){
        return e.jsxs("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"none",className:"w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",children:[
          e.jsx("circle",{cx:"12",cy:"4.5",r:"2.5",stroke:"#fbbf24",strokeWidth:"2"}),
          e.jsx("line",{x1:"12",y1:"7",x2:"12",y2:"21",stroke:"#fbbf24",strokeWidth:"2.2",strokeLinecap:"round"}),
          e.jsx("line",{x1:"6",y1:"9",x2:"18",y2:"9",stroke:"#fde047",strokeWidth:"2",strokeLinecap:"round"}),
          e.jsx("path",{d:"M 4.5 15 C 5.5 21.5 18.5 21.5 19.5 15",stroke:"#fbbf24",strokeWidth:"2.4",strokeLinecap:"round"}),
          e.jsx("polygon",{points:"4.5,15 2.5,13.5 5.5,13",fill:"#fde047"}),
          e.jsx("polygon",{points:"19.5,15 21.5,13.5 18.5,13",fill:"#fde047"}),
          e.jsx("circle",{cx:"12",cy:"4.5",r:"1",fill:"#fef08a"})
        ]});
      }
      if(k==="helmet"||k==="galea"){
        return e.jsxs("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"none",className:"w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",children:[
          e.jsx("rect",{x:"10.5",y:"4.5",width:"3",height:"2.5",rx:"0.5",fill:"#f59e0b",stroke:"#78350f",strokeWidth:"0.8"}),
          e.jsx("path",{d:"M 3.5 6 C 5.5 2.5 18.5 2.5 20.5 6 C 17.5 4 6.5 4 3.5 6 Z",fill:"#dc2626",stroke:"#991b1b",strokeWidth:"0.8"}),
          e.jsx("path",{d:"M 5 5 C 8.5 3.2 15.5 3.2 19 5",stroke:"#f87171",strokeWidth:"1",strokeLinecap:"round"}),
          e.jsx("path",{d:"M 6.5 11 C 6.5 7.5 17.5 7.5 17.5 11 C 17.5 13.5 17 15 16 15.5 L 8 15.5 C 7 15 6.5 13.5 6.5 11 Z",fill:"#d97706",fillOpacity:"0.4",stroke:"#fbbf24",strokeWidth:"1.6",strokeLinejoin:"round"}),
          e.jsx("path",{d:"M 5.5 10.5 Q 12 8.5 18.5 10.5",stroke:"#fef08a",strokeWidth:"1.6",strokeLinecap:"round"}),
          e.jsx("path",{d:"M 7 12.5 L 6.5 17.5 L 9.5 16 L 9.5 12",fill:"#b45309",stroke:"#fbbf24",strokeWidth:"1.2",strokeLinejoin:"round"}),
          e.jsx("path",{d:"M 17 12.5 L 17.5 17.5 L 14.5 16 L 14.5 12",fill:"#b45309",stroke:"#fbbf24",strokeWidth:"1.2",strokeLinejoin:"round"}),
          e.jsx("line",{x1:"12",y1:"10.5",x2:"12",y2:"15",stroke:"#78350f",strokeWidth:"1.2"}),
          e.jsx("circle",{cx:"12",cy:"10.5",r:"1",fill:"#fef08a"}),
          e.jsx("path",{d:"M 5.5 13.5 L 3.5 16.5",stroke:"#fbbf24",strokeWidth:"1.4",strokeLinecap:"round"}),
          e.jsx("path",{d:"M 18.5 13.5 L 20.5 16.5",stroke:"#fbbf24",strokeWidth:"1.4",strokeLinecap:"round"})
        ]});
      }
      if(k==="target"||k==="centrum"){
        return e.jsxs("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"none",className:"w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",children:[
          e.jsx("circle",{cx:"12",cy:"12",r:"9",stroke:"#fbbf24",strokeWidth:"1.8"}),
          e.jsx("circle",{cx:"12",cy:"12",r:"4.8",stroke:"#f59e0b",strokeWidth:"1.8",fill:"#d97706",fillOpacity:"0.25"}),
          e.jsx("circle",{cx:"12",cy:"12",r:"2",fill:"#fef08a"}),
          e.jsx("line",{x1:"12",y1:"1",x2:"12",y2:"5",stroke:"#fbbf24",strokeWidth:"2",strokeLinecap:"round"}),
          e.jsx("line",{x1:"12",y1:"19",x2:"12",y2:"23",stroke:"#fbbf24",strokeWidth:"2",strokeLinecap:"round"}),
          e.jsx("line",{x1:"1",y1:"12",x2:"5",y2:"12",stroke:"#fbbf24",strokeWidth:"2",strokeLinecap:"round"}),
          e.jsx("line",{x1:"19",y1:"12",x2:"23",y2:"12",stroke:"#fbbf24",strokeWidth:"2",strokeLinecap:"round"})
        ]});
      }
      if(k==="hourglass"){
        return e.jsxs("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"none",className:"w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",children:[
          e.jsx("line",{x1:"5",y1:"3",x2:"19",y2:"3",stroke:"#fbbf24",strokeWidth:"2.2",strokeLinecap:"round"}),
          e.jsx("line",{x1:"5",y1:"21",x2:"19",y2:"21",stroke:"#fbbf24",strokeWidth:"2.2",strokeLinecap:"round"}),
          e.jsx("path",{d:"M 7 3 C 7 10 12 12 12 12 C 12 12 17 10 17 3",stroke:"#fef08a",strokeWidth:"1.6",fill:"#d97706",fillOpacity:"0.2"}),
          e.jsx("path",{d:"M 7 21 C 7 14 12 12 12 12 C 12 12 17 14 17 21",stroke:"#fef08a",strokeWidth:"1.6",fill:"#d97706",fillOpacity:"0.3"}),
          e.jsx("polygon",{points:"10,19 14,19 12,15",fill:"#fde047"}),
          e.jsx("line",{x1:"12",y1:"12",x2:"12",y2:"18",stroke:"#fde047",strokeWidth:"1",strokeDasharray:"1 1"}),
          e.jsx("circle",{cx:"12",cy:"3",r:"1",fill:"#fef08a"}),
          e.jsx("circle",{cx:"12",cy:"21",r:"1",fill:"#fef08a"})
        ]});
      }
      if(k==="temple"){
        return e.jsxs("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"none",className:"w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",children:[
          e.jsx("polygon",{points:"12,3 3,9 21,9",fill:"#f59e0b",stroke:"#fbbf24",strokeWidth:"1.5",strokeLinejoin:"round"}),
          e.jsx("line",{x1:"2",y1:"21",x2:"22",y2:"21",stroke:"#fbbf24",strokeWidth:"2",strokeLinecap:"round"}),
          e.jsx("line",{x1:"4",y1:"19",x2:"20",y2:"19",stroke:"#fde047",strokeWidth:"1.5"}),
          e.jsx("line",{x1:"6",y1:"9",x2:"6",y2:"19",stroke:"#fbbf24",strokeWidth:"1.8"}),
          e.jsx("line",{x1:"10",y1:"9",x2:"10",y2:"19",stroke:"#fbbf24",strokeWidth:"1.8"}),
          e.jsx("line",{x1:"14",y1:"9",x2:"14",y2:"19",stroke:"#fbbf24",strokeWidth:"1.8"}),
          e.jsx("line",{x1:"18",y1:"9",x2:"18",y2:"19",stroke:"#fbbf24",strokeWidth:"1.8"}),
          e.jsx("circle",{cx:"12",cy:"6.5",r:"1.2",fill:"#fef08a"})
        ]});
      }
      if(k==="swords"||k==="crossed_weapons"){
        return e.jsxs("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"none",className:"w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",children:[
          e.jsx("line",{x1:"4",y1:"4",x2:"20",y2:"20",stroke:"#fca5a5",strokeWidth:"2.2",strokeLinecap:"round"}),
          e.jsx("line",{x1:"20",y1:"4",x2:"4",y2:"20",stroke:"#fca5a5",strokeWidth:"2.2",strokeLinecap:"round"}),
          e.jsx("line",{x1:"3",y1:"7",x2:"7",y2:"3",stroke:"#fbbf24",strokeWidth:"2.6",strokeLinecap:"round"}),
          e.jsx("line",{x1:"17",y1:"3",x2:"21",y2:"7",stroke:"#fbbf24",strokeWidth:"2.6",strokeLinecap:"round"}),
          e.jsx("circle",{cx:"20",cy:"20",r:"1.5",fill:"#fef08a"}),
          e.jsx("circle",{cx:"4",cy:"20",r:"1.5",fill:"#fef08a"})
        ]});
      }
      if(k==="shield"||k==="scutum"){
        return e.jsxs("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"none",className:"w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",children:[
          e.jsx("rect",{x:"5",y:"3",width:"14",height:"18",rx:"3",fill:"#b91c1c",stroke:"#fbbf24",strokeWidth:"1.8"}),
          e.jsx("circle",{cx:"12",cy:"12",r:"3",fill:"#fbbf24",stroke:"#78350f",strokeWidth:"1"}),
          e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12",stroke:"#fbbf24",strokeWidth:"1.2"})
        ]});
      }
      if(k==="gem"||k==="diamond"){
        return e.jsxs("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"none",className:"w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",children:[
          e.jsx("polygon",{points:"6,3 18,3 22,9 12,21 2,9",fill:"#38bdf8",fillOpacity:"0.3",stroke:"#7dd3fc",strokeWidth:"1.8"}),
          e.jsx("line",{x1:"2",y1:"9",x2:"22",y2:"9",stroke:"#bae6fd",strokeWidth:"1.2"})
        ]});
      }
      if(k==="book"||k==="scroll"){
        return e.jsxs("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"none",className:"w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",children:[
          e.jsx("path",{d:"M 4 5 Q 4 3 7 3 L 18 3 Q 21 3 21 5 L 21 19 Q 21 21 18 21 L 7 21 Q 4 21 4 19 Z",fill:"#f59e0b",fillOpacity:"0.25",stroke:"#fbbf24",strokeWidth:"1.8"}),
          e.jsx("circle",{cx:"12",cy:"16",r:"2",fill:"#ef4444"}),
          e.jsx("line",{x1:"8",y1:"8",x2:"16",y2:"8",stroke:"#fbbf24",strokeWidth:"1.2"}),
          e.jsx("line",{x1:"8",y1:"11",x2:"16",y2:"11",stroke:"#fbbf24",strokeWidth:"1.2"})
        ]});
      }
      if(k==="crown"){
        return e.jsxs("svg",{viewBox:"0 0 24 24",width:"22",height:"22",fill:"none",className:"w-5 h-5 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",children:[
          e.jsx("polygon",{points:"4,18 20,18 18,8 12,12 6,8",fill:"#fbbf24",fillOpacity:"0.35",stroke:"#fef08a",strokeWidth:"1.8"}),
          e.jsx("circle",{cx:"12",cy:"7",r:"1.5",fill:"#ef4444"})
        ]});
      }
      const Comp = (typeof oo !== "undefined" && (oo[k] || oo[t])) || (typeof je !== "undefined" && (je[k] || je[t])) || sd;
      return e.jsx(Comp,{className:\`w-5 h-5 \${d.iconColor} drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] shrink-0\`,style:{width:"20px",height:"20px"},strokeWidth:2});
    }
    return null;
  };
  return e.jsx("div",{className:"relative group flex items-center justify-center",children:e.jsxs("button",{
    id:i,type:"button",onClick:o,onPointerDown:p,onTouchStart:x,disabled:l,title:r,"aria-label":r,
    className:\`relative w-11 h-11 rounded-full \${d.bg} \${d.border} \${d.glow} \${n?d.pulseGlow:""} flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer select-none overflow-hidden \${l?"opacity-50 cursor-not-allowed":""} \${c}\`,
    style:{minWidth:"44px",minHeight:"44px"},
    children:[
      e.jsx("div",{className:"absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"}),
      e.jsx(es,{type:"weathered_patina",opacity:.12,className:"rounded-full pointer-events-none"}),
      e.jsx("div",{
        className:"rounded-full bg-black/50 border border-amber-500/40 flex items-center justify-center relative z-10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]",
        style:{width:"32px",height:"32px"},
        children:renderContent()
      })
    ]
  })});
});Vr.displayName="HUDButton";`;

  cleanJs = cleanJs.substring(0, vrIdx) + newVr + cleanJs.substring(vrEndIdx);
  

  // 7. Upgrade fp (Solidi Currency Icon in Top Bar) to HD Roman Aureus Coin
  const oldFpCoin = 'e.jsx(Yt,{className:`w-4 h-4 sm:w-4.5 sm:h-4.5 ${a?"text-amber-300":"text-amber-400/90"}`})';
  if (cleanJs.includes(oldFpCoin)) {
    const newFpCoin = `e.jsxs("svg",{viewBox:"0 0 20 20",className:\`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 overflow-visible drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] \${a?"scale-110":""}\`,children:[
      e.jsx("circle",{cx:"10",cy:"10",r:"9.2",fill:"#d97706",stroke:"#78350f",strokeWidth:"0.8"}),
      e.jsx("circle",{cx:"10",cy:"10",r:"8.2",fill:"#f59e0b",stroke:"#b45309",strokeWidth:"0.5"}),
      e.jsx("circle",{cx:"10",cy:"10",r:"7.5",fill:"none",stroke:"#fef08a",strokeWidth:"0.5",strokeDasharray:"1 0.8"}),
      e.jsx("path",{d:"M 7 13.5 C 7 10 13 10 13 13.5 Z",fill:"#fde047",stroke:"#78350f",strokeWidth:"0.5"}),
      e.jsx("circle",{cx:"10",cy:"8.2",r:"2.2",fill:"#fef08a",stroke:"#78350f",strokeWidth:"0.5"}),
      e.jsx("polygon",{points:"8.5,5.5 10,3.5 11.5,5.5",fill:"#ffffff"}),
      e.jsx("polygon",{points:"6.8,7 8.5,6 7.8,7.8",fill:"#fef08a"}),
      e.jsx("polygon",{points:"13.2,7 11.5,6 12.2,7.8",fill:"#fef08a"}),
      e.jsx("text",{x:"10",y:"17.2",fontSize:"2.8",fontFamily:"Cinzel, serif",fontWeight:"900",fill:"#78350f",textAnchor:"middle",children:"SOL"})
    ]})`;
    cleanJs = cleanJs.replace(oldFpCoin, newFpCoin);
    
  }

  // 8. Upgrade City Map Medallions (F0 and ax) to Match Campaign Map Size (34px - 36px)
  const oldCityEnemyTokens = 'j?e.jsx(Ha,{size:h?28:26,medium:h?"water":"land",isMoving:!1,children:e.jsx(rt,{variant:N,emblem:T,size:h?28:26,isElaborate:!0,showGlow:!1})}):e.jsx(Uo,{fleet:m,isMoving:!1,size:h?24:22,isElaborate:!0})';
  const newCityEnemyTokens = 'j?e.jsx(Ha,{size:34,medium:h?"water":"land",isMoving:!1,children:e.jsx(rt,{variant:N,emblem:T,size:34,isElaborate:!0,showGlow:!1})}):e.jsx(Uo,{fleet:m,isMoving:!1,size:34,isElaborate:!0})';
  if (cleanJs.includes(oldCityEnemyTokens)) {
    cleanJs = cleanJs.replace(oldCityEnemyTokens, newCityEnemyTokens);
    
  }

  const oldCityLoot = 'children:e.jsx(jc,{type:m.type||"artifact",rarity:"silver",size:22})';
  const newCityLoot = 'children:e.jsx(jc,{type:m.type||"artifact",rarity:"silver",size:32})';
  if (cleanJs.includes(oldCityLoot)) {
    cleanJs = cleanJs.replace(oldCityLoot, newCityLoot);
    
  }

  const oldCityAnchor = 'children:e.jsx(Ha,{size:24,medium:"port",isElaborate:!0,children:e.jsx(rt,{variant:"gold",emblem:"anchor",size:24,showGlow:!0})})';
  const newCityAnchor = 'children:e.jsx(Ha,{size:34,medium:"port",isElaborate:!0,children:e.jsx(rt,{variant:"gold",emblem:"anchor",size:34,showGlow:!0})})';
  if (cleanJs.includes(oldCityAnchor)) {
    cleanJs = cleanJs.replace(oldCityAnchor, newCityAnchor);
    
  }

  // 9. Unify Top HUD Buttons with Bottom HUD Sea Glass Roundel Standard (Vr)
  const oldTopRightButtons = `e.jsxs("div",{className:"pointer-events-auto flex items-center gap-1 sm:gap-1.5 shrink-0",children:[e.jsxs("button",{id:"top-hud-codex-btn",type:"button",onClick:()=>{v.playClick(),window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu",{detail:"CODEX"}))},className:"flex items-center justify-center gap-1.5 px-2.5 sm:px-3.5 py-1 bg-gradient-to-b from-[#1c1917]/60 via-[#141210]/98 to-[#090807]/98 bg-slate-950/90 border-[1.5px] border-amber-400/80 hover:border-amber-300 rounded-full shadow-[0_6px_18px_rgba(0,0,0,0.85),0_0_8px_rgba(245,158,11,0.25),inset_0_1.5px_2px_rgba(254,240,138,0.35)] h-9 sm:h-10 transition-all duration-200 hover:scale-105 active:scale-95 select-none cursor-pointer group text-amber-200 hover:text-white",title:"Codex Imperialis (Archives, Lore, Doctrines)","aria-label":"Codex Imperialis",children:[e.jsx(Wa,{className:"w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 group-hover:text-amber-300 transition-colors shrink-0"}),e.jsx("span",{className:"font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase text-amber-100/90 group-hover:text-amber-200 hidden xs:inline-block",children:"CODEX"})]}),e.jsxs("button",{id:"top-hud-settings-btn",type:"button",onClick:()=>{v.playClick(),n?n():window.dispatchEvent(new CustomEvent("open-save-manager"))},className:"flex items-center justify-center gap-1 px-2 sm:px-2.5 py-1 bg-gradient-to-b from-[#1c1917]/60 via-[#141210]/98 to-[#090807]/98 bg-slate-950/90 border-[1.5px] border-amber-400/80 hover:border-amber-300 rounded-full shadow-[0_6px_18px_rgba(0,0,0,0.85),0_0_8px_rgba(245,158,11,0.25),inset_0_1.5px_2px_rgba(254,240,138,0.35)] h-9 sm:h-10 transition-all duration-200 hover:scale-105 active:scale-95 select-none cursor-pointer group text-amber-200 hover:text-white",title:"Tabularium & Settings (Save/Load, Audio, D-Pad)","aria-label":"Tabularium Settings",children:[e.jsx(ml,{className:"w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400 group-hover:text-amber-300 transition-colors shrink-0",strokeWidth:2}),e.jsx("span",{className:"font-cinzel font-bold text-[10px] sm:text-xs tracking-wider uppercase text-amber-100/90 group-hover:text-amber-200 hidden md:inline-block",children:"SETTINGS"})]})]})`;
  const newTopRightButtons = `e.jsxs("div",{className:"pointer-events-auto flex items-center gap-1.5 sm:gap-2 shrink-0",children:[e.jsx(Vr,{id:"top-hud-codex-btn",variant:"gold",emblem:"book",title:"Codex Imperialis (Archives, Lore, Doctrines)",onClick:()=>{v.playClick(),window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu",{detail:"CODEX"}))}}),e.jsx(Vr,{id:"top-hud-settings-btn",variant:"gold",icon:e.jsx(ml,{className:"w-[60%] h-[60%] text-amber-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",strokeWidth:2}),title:"Tabularium & Settings (Save/Load, Audio, D-Pad)",onClick:()=>{v.playClick(),n?n():window.dispatchEvent(new CustomEvent("open-save-manager"))}})]})`;
  if (cleanJs.includes(oldTopRightButtons)) {
    cleanJs = cleanJs.replace(oldTopRightButtons, newTopRightButtons);
    
  }

  // 10. Remove Weird Glowing Blurred Ovals Behind Item Pickups
  const pOvalStart = cleanJs.indexOf("absolute w-7 h-2 rounded-full border border-sky-400/30");
  if (pOvalStart !== -1) {
    const pChildrenStart = cleanJs.lastIndexOf("children:[", pOvalStart);
    const pEndMarker = 'className:`relative z-10 transition-transform ${!Z?"animate-[bounce_3s_ease-in-out_infinite]":""}`';
    const pEndPos = cleanJs.indexOf(pEndMarker, pOvalStart);
    if (pChildrenStart !== -1 && pEndPos !== -1) {
      const targetChunk = cleanJs.substring(pChildrenStart, pEndPos);
      const replacementChunk = `children:[
        e.jsx("div",{className:"absolute w-6 h-1.5 rounded-full bg-black/35 pointer-events-none translate-y-3.5"}),
        e.jsx("div",{
          `;
      cleanJs = cleanJs.replace(targetChunk, replacementChunk);
      
    }
  }

  // 11. Implement 3-Tap Wayfinding Interaction (Single tap to inspect, Double tap to plot course, Third tap to move)
  const oldWayfindingLogic = `if(de.current===St){const plan=ti(Ht,St);if(plan&&plan.path.length>1){const waypoints=plan.path.slice(1).map(c=>ca(c)?.center).filter(Boolean);if(waypoints.length>0){nr.current={x:0,y:0},wr({x:0,y:0}),De.current=waypoints,de.current=null,U(null),ce([]),Ae(null),Za();return}}}else{const plan=ti(Ht,St);if(plan&&plan.path.length>1){de.current=St,U(St),ce(plan.path),Ae(plan),v.playClick();return}}de.current=null,U(null),ce([]),Ae(null);`;
  const newWayfindingLogic = `if(de.current===St){const plan=ti(Ht,St);if(plan&&plan.path.length>1){const waypoints=plan.path.slice(1).map(c=>ca(c)?.center).filter(Boolean);if(waypoints.length>0){nr.current={x:0,y:0},wr({x:0,y:0}),De.current=waypoints,de.current=null,window.__pendingWayfindingCell=null,U(null),ce([]),Ae(null),Za();return}}}else if(window.__pendingWayfindingCell===St){const plan=ti(Ht,St);if(plan&&plan.path.length>1){de.current=St,U(St),ce(plan.path),Ae(plan),v.playClick();return}}else{window.__pendingWayfindingCell=St,de.current=null,U(null),ce([]),Ae(null),v.playClick();return}de.current=null,window.__pendingWayfindingCell=null,U(null),ce([]),Ae(null);`;
  if (cleanJs.includes(oldWayfindingLogic)) {
    cleanJs = cleanJs.replace(oldWayfindingLogic, newWayfindingLogic);
    
  }

  // 12. Integrate Talents and Equipped Relic Modifiers into Combat Damage & Defense Calculations
  const oldCombatCardMath = `    const bonusAtk = eqArts.reduce((acc, a) => acc + (a.bonusAttack || 0), 0);
    const bonusDef = eqArts.reduce((acc, a) => acc + (a.bonusDefense || 0), 0);
    const rawDmg = card.baseDamage || 0;
    const dmg = rawDmg > 0 ? (rawDmg + bonusAtk) : 0;
    const rawDef = card.defenseValue || 0;
    const def = rawDef > 0 ? (rawDef + bonusDef) : 0;`;
  const newCombatCardMath = `    const bonusAtk = eqArts.reduce((acc, a) => acc + (a.bonusAttack || 0), 0);
    const bonusDef = eqArts.reduce((acc, a) => acc + (a.bonusDefense || 0), 0);
    const rawDmg = card.baseDamage || 0;
    const cid = card.id || "";
    const atype = card.actionType || "";
    let talentDmgMult = 1;
    if (isSea) {
      if (atype === "ram" || cid.includes("ram")) talentDmgMult += ((s.talents?.navis_ram || 0) * 0.15);
      if (atype === "volley" || atype === "projectile" || cid.includes("ballista") || cid.includes("scorpio") || cid.includes("archer")) talentDmgMult += ((s.talents?.navis_ballista || 0) * 0.10);
    } else {
      talentDmgMult += ((s.talents?.legio_damage || 0) * 0.10);
    }
    const dmg = rawDmg > 0 ? Math.round((rawDmg + bonusAtk) * talentDmgMult) : 0;
    const rawDef = card.defenseValue || 0;
    const talentDefMult = isSea ? (1 + ((s.talents?.navis_repair || 0) * 0.15)) : 1;
    const def = rawDef > 0 ? Math.round((rawDef + bonusDef) * talentDefMult) : 0;`;
  if (cleanJs.includes(oldCombatCardMath)) {
    cleanJs = cleanJs.replace(oldCombatCardMath, newCombatCardMath);
    
  }

  // 12b. Combat Relics: Restrict battle active abilities exclusively to EQUIPPED artifacts (exclude inventory / unequipped collection)
  const combatRelicsStart = cleanJs.indexOf("const combatRelics = b.useMemo");
  if (combatRelicsStart !== -1) {
    const combatRelicsEnd = cleanJs.indexOf("const activateRelic = (relic)", combatRelicsStart);
    if (combatRelicsEnd !== -1) {
      const oldCombatRelicsBlock = cleanJs.slice(combatRelicsStart, combatRelicsEnd);
      const newCombatRelicsBlock = `const combatRelics = b.useMemo(() => {
    const eq = s.equipped || {};
    const rawList = Array.isArray(eq) ? eq : Object.values(eq);
    const catalog = (typeof Ro !== "undefined" && Array.isArray(Ro)) ? Ro : ((typeof ia !== "undefined" && typeof jr !== "undefined") ? [...ia, ...Object.values(jr)] : []);
    const eqList = rawList.filter(Boolean).map(item => {
      if (typeof item === "string") {
        return catalog.find(c => c && c.id === item) || { id: item, name: item, rarity: "gold" };
      }
      if (item && item.id) {
        const fullArt = catalog.find(c => c && c.id === item.id);
        return fullArt ? { ...fullArt, ...item, specialAbility: item.specialAbility || fullArt.specialAbility } : item;
      }
      return item;
    }).filter(Boolean);

    const unique = [];
    const seen = new Set();
    for (const item of eqList) {
      if (item && item.id && !seen.has(item.id)) {
        seen.add(item.id);
        unique.push(item);
      }
    }

    if (unique.length === 0) {
      return [];
    }
    return unique.map(r => {
      const ability = r.specialAbility || {
        name: r.name ? \`\${r.name} Surge\` : "Divine Surge",
        effectType: r.bonusAttack ? "DAMAGE" : (r.bonusDefense ? "SHIELD" : "LIGHTNING"),
        value: Math.max(16, (r.bonusAttack || 0) * 2 + (r.bonusDefense || 0) * 2 + 14),
        cooldownRounds: 2,
        description: r.description || "Unleash sacred relic invocation to turn the tide of war."
      };

      let variant = "teal";
      if (r.rarity === "radiant" || r.rarity === "RELIQUIAE") variant = "gold";
      else if (r.rarity === "gold" || r.rarity === "DIVINUS") variant = "gold";
      else if (r.rarity === "silver" || r.rarity === "PRAECLARUS") variant = "teal";
      else if (r.rarity === "crimson" || r.rarity === "cursed") variant = "crimson";

      let emblem = "sparkles";
      const et = (ability.effectType || "").toUpperCase();
      if (et.includes("DAMAGE") || et.includes("ATTACK") || et.includes("FIRE")) emblem = "sword";
      else if (et.includes("SHIELD") || et.includes("DEFENSE") || et.includes("BLOCK")) emblem = "shield";
      else if (et.includes("HEAL") || et.includes("LIFESTEAL")) emblem = "heart";
      else if (et.includes("LIGHTNING") || et.includes("SHOCK")) emblem = "sparkles";
      else if (et.includes("POISON")) emblem = "target";

      return {
        ...r,
        variant,
        emblem,
        specialAbility: ability
      };
    });
  }, [s.equipped]);

  `;
      cleanJs = cleanJs.replace(oldCombatRelicsBlock, newCombatRelicsBlock);
      
    }
  }

  // 13. Expand Tactical Cards Catalog with New Epic & Mythic Cards
  const oldAnchor = ',"unlockedByDefault":false}],fr=()=>';
  const extraCards = `,{"id":"card_imperator_triumphus","name":"Imperator Triumphus Imperialis","latinName":"Triumphus Augusti","role":"COMMAND","domain":"universal","rarity":"DIVINUS","timing":"ACTION","keywords":["COMMAND","TRIUMPH","GLORY"],"description":"Summon the full ceremonial fury of the Roman Empire, devastating foes while fortifying and healing all legionaries and rowers.","latinQuote":"Veni, vidi, vici. Gloria in excelsis Romae.","icon":"Crown","actionType":"rally","cost":2,"baseDamage":24,"defenseValue":16,"healAmount":16,"shortName":"Imperator Triumphus","tag":"24 DMG • +16 DEF • +16 HP","commandBonus":"Imperial Triumph","critChance":25,"statusEffect":"shield_boost","statusChance":1,"synergyMaterial":"gold","synergyEffect":"Unleashes imperial wrath, massive healing and impenetrable defense.","unlockedByDefault":false},{"id":"card_charybdis_maelstrom","name":"Charybdis Abyssal Vortex","latinName":"Charybdis Vorago","role":"ATTACK","domain":"sea","rarity":"LEGENDARY","timing":"ACTION","keywords":["WATER","VORTEX","RAM"],"description":"Unleash swirling Mediterranean tidal currents that rip apart enemy hulls and snap oar banks.","latinQuote":"Dextra Scylla latus, laeva implacata Charybdis.","icon":"Zap","actionType":"ram","cost":2,"baseDamage":32,"defenseValue":0,"healAmount":0,"shortName":"Charybdis Vortex","tag":"32 DMG • MAELSTROM","commandBonus":"Tidal Destruction","critChance":22,"statusEffect":"stunned","statusChance":0.5,"synergyMaterial":"bloodstone","synergyEffect":"Devastating oceanic ramming damage.","unlockedByDefault":false},{"id":"card_hydra_venenum_salvo","name":"Lernaean Hydra Toxic Volley","latinName":"Sagittae Hydrae","role":"ATTACK","domain":"universal","rarity":"EPIC","timing":"ACTION","keywords":["POISON","VOLLEY","MISSILE"],"description":"Archers loose arrows dipped in deadly Lernaean venom, melting enemy armor plates.","latinQuote":"Venenum serpentis litora complet.","icon":"Zap","actionType":"strike","cost":2,"baseDamage":22,"defenseValue":0,"healAmount":0,"shortName":"Hydra Salvo","tag":"22 DMG • POISON BARRAGE","commandBonus":"Toxic Venom","critChance":20,"statusEffect":"poison","statusChance":0.8,"synergyMaterial":"bloodstone","synergyEffect":"Applies severe continuous toxic poison.","unlockedByDefault":false},{"id":"card_praetorian_decimation","name":"Praetorian Decimatio Fury","latinName":"Decimatio Praetoriana","role":"ATTACK","domain":"land","rarity":"EPIC","timing":"ACTION","keywords":["MELEE","CHARGE","SHOCK"],"description":"The elite Praetorian guard charges in unbreakable wedge formation, shattering hostile battle lines.","latinQuote":"Ferro et igne imperium custodimus.","icon":"Zap","actionType":"strike","cost":2,"baseDamage":26,"defenseValue":12,"healAmount":0,"shortName":"Praetorian Decimatio","tag":"26 DMG • +12 DEF","commandBonus":"Praetorian Charge","critChance":25,"statusEffect":"shield_boost","statusChance":1,"synergyMaterial":"iron","synergyEffect":"Heavy offensive strike with reinforced forward guard.","unlockedByDefault":false},{"id":"card_apollo_solar_flare","name":"Sol Invictus Solar Ray","latinName":"Radius Solis Invicti","role":"COMMAND","domain":"universal","rarity":"DIVINUS","timing":"ACTION","keywords":["DIVINE","LIGHT","HEAL"],"description":"Channel the blinding aura of the Unconquered Sun, searing the enemy while revitalizing Roman spirit.","latinQuote":"Sol Invictus omnia vincit.","icon":"Flame","actionType":"rally","cost":1,"baseDamage":18,"defenseValue":10,"healAmount":15,"shortName":"Solar Ray","tag":"18 DMG • +15 HP • +10 DEF","commandBonus":"Solar Radiance","critChance":20,"statusEffect":"fire","statusChance":0.5,"synergyMaterial":"gold","synergyEffect":"Sears hostile ranks while healing Roman forces.","unlockedByDefault":false},{"id":"card_scutum_iron_wall","name":"Murus Ferreus Phalanx","latinName":"Murus Ferreus","role":"DEFENSE","domain":"universal","rarity":"RARE","timing":"ACTION","keywords":["DEFENSE","PHALANX","FORTIFY"],"description":"Interlocking heavy tower shields form an impassable iron fortress against all kinetic and missile strikes.","latinQuote":"Stant muri ferrei, non cedunt viri.","icon":"Shield","actionType":"shield","cost":1,"baseDamage":0,"defenseValue":22,"healAmount":8,"shortName":"Murus Ferreus","tag":"+22 DEF • +8 HP","commandBonus":"Iron Bulwark","critChance":0,"statusEffect":"shield_boost","statusChance":1,"synergyMaterial":"iron","synergyEffect":"Massive armor fortification and steady vitality restore.","unlockedByDefault":false}`;
  if (cleanJs.includes(oldAnchor)) {
    cleanJs = cleanJs.replace(oldAnchor, ',"unlockedByDefault":false}' + extraCards + '],fr=()=>');
    
  }

  // 13b. Integrated Combat Victory Spoils (Talents + Tactical Card Drops + Relic Drops)
  const spoilsStart = cleanJs.indexOf("const victorySpoils = b.useMemo");
  if (spoilsStart !== -1) {
    const spoilsEnd = cleanJs.indexOf("const backdropTerrain = b.useMemo", spoilsStart);
    if (spoilsEnd !== -1) {
      const oldSpoils = cleanJs.slice(spoilsStart, spoilsEnd);
      const newSpoils = `const victorySpoils = b.useMemo(() => {
    const solMult = s.solidiMultiplier || (s.activeAugury && s.activeAugury.bonusSolidiMult) || 1;
    const baseSol = t.rewardSolidi || t.rewardGold || (t.isBoss ? 450 : (Math.floor(Math.random() * 35) + 35));
    const lootBonus = 1 + ((s.talents?.legio_loot || 0) * 0.10);
    const calcSol = Math.round(baseSol * solMult * lootBonus);
    const famaBonus = 1 + ((s.talents?.civitas_fama || 0) * 0.10);
    const baseFama = t.rewardFama || (t.isBoss ? 150 : (Math.floor(Math.random() * 15) + 25));
    const calcFama = Math.round(baseFama * famaBonus);
    const calcSupp = t.rewardSupplies || (t.isBoss ? 45 : (Math.floor(Math.random() * 15) + 15));
    const calcEss = t.rewardEssence || (t.isBoss ? 25 : (Math.floor(Math.random() * 6) + 4));
    const calcGems = t.isBoss ? 2 : (Math.random() < 0.35 ? 1 : 0);

    let dropArt = null;
    const isPlayerOwned = (artId) => {
      if (!artId) return true;
      const inInv = (s.inventory || []).some(inv => inv.id === artId || inv.baseId === artId);
      const inEq = Object.values(s.equipped || {}).some(eq => eq && (eq.id === artId || eq.baseId === artId));
      return inInv || inEq;
    };

    // 1. Boss signature artifact drop: 65% chance ONLY IF unowned
    if (t.isBoss && t.artifactDropId && typeof Ro !== "undefined" && !isPlayerOwned(t.artifactDropId)) {
      if (Math.random() < 0.65) {
        dropArt = Ro.find(x => x.id === t.artifactDropId) || null;
      }
    }
    // 2. Rare discovery for unowned artifacts: Bosses have 30% chance for random unowned; high-tier elites (level >= 6) have 5% chance.
    if (!dropArt && typeof Ro !== "undefined" && Ro.length > 0) {
      const unowned = Ro.filter(x => !isPlayerOwned(x.id));
      if (unowned.length > 0) {
        if (t.isBoss && Math.random() < 0.30) {
          dropArt = unowned[Math.floor(Math.random() * unowned.length)];
        } else if ((t.level || 1) >= 6 && Math.random() < 0.05) {
          dropArt = unowned[Math.floor(Math.random() * unowned.length)];
        }
      }
    }

    // 3. TACTICAL CARD DROPS: Discover and unlock new tactical Tabula scroll cards from victory
    let dropCard = null;
    const curCards = (s.unlockedCards && s.unlockedCards.length > 0) ? s.unlockedCards : (typeof fr === "function" ? fr() : []);
    if (typeof ss !== "undefined" && Array.isArray(ss) && ss.length > 0) {
      const unownedCards = ss.filter(c => c && c.id && !curCards.includes(c.id) && !c.id.includes("enemy"));
      if (unownedCards.length > 0) {
        const domainMatches = unownedCards.filter(c => c.domain === "universal" || (isSea ? c.domain === "sea" : c.domain === "land"));
        const pool = domainMatches.length > 0 ? domainMatches : unownedCards;
        const isBoss = t.isBoss || !!t.usurperKey || (t.id && (t.id.includes("boss") || t.id.includes("king") || t.id.includes("nemesis")));
        const isElite = (t.level || 1) >= 5 || t.isGarrison || t.type === "GARRISON" || (t.maxHp || 100) >= 280;

        // Bosses: 100% Guaranteed Card Drop
        if (isBoss) {
          dropCard = pool[Math.floor(Math.random() * pool.length)];
        }
        // Elites / Fortresses / Garrisons: 65% Chance
        else if (isElite && Math.random() < 0.65) {
          dropCard = pool[Math.floor(Math.random() * pool.length)];
        }
        // Standard encounters / patrols: 35% Chance
        else if (Math.random() < 0.35) {
          dropCard = pool[Math.floor(Math.random() * pool.length)];
        }
      }
    }

    let cargoPlunder = null;
    if (isSea) {
      const cTypes = [
        { id: "vinum", name: "Vinum Falernum (Fine Wine)", amount: 4, icon: "🍷" },
        { id: "oleum", name: "Oleum Hispanicum (Olive Oil)", amount: 5, icon: "🫒" },
        { id: "frumentum", name: "Frumentum Aegyptium (Grain)", amount: 6, icon: "🌾" },
        { id: "purpura", name: "Purpura Tyria (Tyrian Purple)", amount: 2, icon: "🏺" }
      ];
      cargoPlunder = cTypes[Math.floor(Math.random() * cTypes.length)];
    }

    return {
      solidi: calcSol,
      fama: calcFama,
      supplies: calcSupp,
      essence: calcEss,
      desertGems: calcGems,
      droppedArtifact: dropArt,
      droppedCard: dropCard,
      cargoPlunder: cargoPlunder
    };
  }, [t, s, isSea]);  `;
      cleanJs = cleanJs.replace(oldSpoils, newSpoils);
      
    }
  }

  // 13c. Connect Dropped Tactical Card to Player unlockedCards State
  const oldClaimBlock = `        if (victorySpoils.droppedArtifact && !newInv.some(x => x.id === victorySpoils.droppedArtifact.id)) {
          newInv.push(victorySpoils.droppedArtifact);
        }`;
  const newClaimBlock = `        if (victorySpoils.droppedArtifact && !newInv.some(x => x.id === victorySpoils.droppedArtifact.id)) {
          newInv.push(victorySpoils.droppedArtifact);
        }
        let newCards = [...(prev.unlockedCards || (typeof fr === "function" ? fr() : []))];
        if (victorySpoils.droppedCard && !newCards.includes(victorySpoils.droppedCard.id)) {
          newCards.push(victorySpoils.droppedCard.id);
        }`;
  if (cleanJs.includes(oldClaimBlock)) {
    cleanJs = cleanJs.replace(oldClaimBlock, newClaimBlock);
    cleanJs = cleanJs.replace("inventory: newInv,", "inventory: newInv, unlockedCards: newCards,");
    cleanJs = cleanJs.replace(') + (victorySpoils.droppedArtifact ? (", Claimed Relic: "', ') + (victorySpoils.droppedCard ? (", Unlocked Tactic: " + victorySpoils.droppedCard.name) : "") + (victorySpoils.droppedArtifact ? (", Claimed Relic: "');
    
  }

  // 13d. Render Dropped Tactical Card in Combat Victory Modal
  const oldDropUiAnchor = "// Dropped Artifact / Relic";
  const cardUiCode = `// Dropped Tactical Card
            victorySpoils.droppedCard ? e.jsxs("div", { className: "w-full bg-gradient-to-r from-red-950/90 via-amber-950/80 to-red-950/90 border border-amber-400/90 rounded-xl p-3 mb-3 flex items-center gap-3 text-left shadow-[0_0_20px_rgba(239,68,68,0.35)]", children: [
              e.jsx(rt, { variant: (victorySpoils.droppedCard.rarity === "DIVINUS" || victorySpoils.droppedCard.rarity === "LEGENDARY" ? "gold" : victorySpoils.droppedCard.rarity === "EPIC" ? "purple" : "red"), emblem: "sword", size: 40, showGlow: true }),
              e.jsxs("div", { className: "min-w-0 flex-1", children: [
                e.jsx("div", { className: "text-[9px] font-cinzel font-bold text-amber-400 uppercase tracking-widest", children: "📜 TACTICAL TABULA SCROLL UNLOCKED" }),
                e.jsx("div", { className: "text-xs sm:text-sm font-cinzel font-bold text-amber-100 truncate", children: victorySpoils.droppedCard.name }),
                e.jsxs("div", { className: "text-[9px] text-amber-300/90 font-serif-body italic", children: [
                  victorySpoils.droppedCard.latinName ? victorySpoils.droppedCard.latinName + " • " : "",
                  victorySpoils.droppedCard.role || "TACTIC",
                  " • ",
                  victorySpoils.droppedCard.tag || victorySpoils.droppedCard.description
                ]})
              ]})
            ]}) : null,
            // Dropped Artifact / Relic`;
  if (cleanJs.includes(oldDropUiAnchor)) {
    cleanJs = cleanJs.replace(oldDropUiAnchor, cardUiCode);
    
  }

  // 14. Add Reactive Level/XP Auto-Progression Sync Hook
  const oldLevelHook = `b.useEffect(()=>{const S=o.level||1;S>We.current&&Ue({newLevel:S,oldLevel:We.current}),We.current=S},[o.level])`;
  const newLevelHook = `b.useEffect(()=>{const targetLvl=Nc(o.fama||0),curLvl=o.level||1;if(targetLvl>curLvl){const{maxFleetHp:flHp,maxLegionHp:lgHp}=_c(targetLvl),supMax=ys(targetLvl);l(prev=>({...prev,level:targetLvl,maxFleetHp:Math.max(prev.maxFleetHp||100,flHp),maxLegionHp:Math.max(prev.maxLegionHp||100,lgHp),maxSupplies:Math.max(prev.maxSupplies||100,supMax),fleetHp:Math.min((prev.fleetHp||100)+(flHp-(prev.maxFleetHp||100)),flHp),legionHp:Math.min((prev.legionHp||100)+(lgHp-(prev.maxLegionHp||100)),lgHp)}));}},[o.fama,o.level]),b.useEffect(()=>{const S=o.level||1;S>We.current&&Ue({newLevel:S,oldLevel:We.current}),We.current=S},[o.level])`;
  if (cleanJs.includes(oldLevelHook)) {
    cleanJs = cleanJs.replace(oldLevelHook, newLevelHook);
    
  }

  // 15. Upgrade FloatingMiniMenu with dynamic XP/Rank bars, full submenu links, and live vitality calculations
  const miniMenuStartStr = "FloatingMiniMenu=({activeMenu:t,setActiveMenu:s,";
  const miniMenuEndStr = ",wp=({player:";
  const mmStartIdx = cleanJs.indexOf(miniMenuStartStr);
  const mmEndIdx = cleanJs.indexOf(miniMenuEndStr, mmStartIdx);
  if (mmStartIdx !== -1 && mmEndIdx !== -1) {
    const upgradedMiniMenu = `FloatingMiniMenu=({activeMenu:t,setActiveMenu:s,onClose:a,onOpenFull:r,player:o,setPlayer:l,onOpenJournal:n,onOpenTrade:oTrade,onOpenDefense:oDef,onOpenSave:oSave,onNewVoyage:oVoyage,onOpenDeck:oDeck,onNavigateToCodexTab:oCodexTab,onNavigateToArmaTab:oArmaTab})=>{
  if (!t) return null;
  const [showVoyageConfirm, setShowVoyageConfirm] = b.useState(false);
  const [touchStartY, setTouchStartY] = b.useState(null);

  b.useEffect(() => {
    const onKey = ev => {
      if (ev.key === "Escape") {
        ev.preventDefault();
        ev.stopPropagation();
        a && a();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [a]);

  const c = o || {};
  const i = c.solidi || 0;
  const p = c.fama || 0;
  const isLand = c.playerMode === "land";
  const x = isLand ? (c.legionHp ?? 100) : (c.fleetHp ?? 100);
  const u = isLand ? (c.maxLegionHp || 100) : (c.maxFleetHp || 100);
  const d = Math.min(100, Math.max(0, Math.round(x / Math.max(1, u) * 100)));
  const isDamaged = x < u;
  const isCritical = d <= 35;
  const m = c.attack || 14;
  const h = c.defense || 10;
  const y = c.luck || 3;
  const g = c.commanderName || "Imperator";
  const j = isLand ? (c.legionName || "LEGIO I ITALICA") : (c.shipType ? c.shipType.toUpperCase() : "PRAETORIAN DECERES");
  const A = c.capturedPorts || [];
  const N = c.activeDoctrine || "Pax Romana";
  const T = c.currencyStandard === "debased";
  const F = (c.taxRate || "Moderate").toUpperCase();
  const invArtifacts = c.inventory || [];
  const equipped = c.equipped || { REGALIA: null, STANDARDS: null, DOCTRINE: null };
  const stance = c.tacticalStance || "BALANCED";

  const lvlInfo = tn(p);
  const rankTitle = ix(lvlInfo.currentLevel);
  const shipClass = Gn(lvlInfo.currentLevel);
  const maxSupp = ys(lvlInfo.currentLevel);
  const curSupp = c.supplies || 0;
  const curIter = c.iter ?? 6;
  const maxIter = 6;

  const stanceBonusAtk = stance === "IMPETUS" ? 4 : stance === "TESTUDO" ? -3 : 0;
  const stanceBonusDef = stance === "IMPETUS" ? -2 : stance === "TESTUDO" ? 5 : 0;

  const bonusAtk = Object.values(equipped).filter(Boolean).reduce((acc, it) => acc + (it.bonusAttack || 0), 0) + stanceBonusAtk;
  const bonusDef = Object.values(equipped).filter(Boolean).reduce((acc, it) => acc + (it.bonusDefense || 0), 0) + stanceBonusDef;
  const totalAtk = Math.max(1, m + bonusAtk);
  const totalDef = Math.max(1, h + bonusDef);

  const handleSelectStance = newStance => {
    if (newStance === stance) return;
    try {
      if (newStance === "IMPETUS") v.playSwordClash();
      else if (newStance === "TESTUDO") (v.playShieldBlock ? v.playShieldBlock() : v.playBumpLand());
      else v.playClick();
    } catch(err) {}
    l(prev => ({ ...prev, tacticalStance: newStance }));
    const title = newStance === "IMPETUS" ? "Impetus (Ramming / Charge)" : newStance === "TESTUDO" ? "Testudo (Shield Wall)" : "Balanced Stance";
    const desc = newStance === "IMPETUS" ? "+4 Attack / -2 Defense" : newStance === "TESTUDO" ? "+5 Defense / -3 Attack" : "Standard tactical equilibrium";
    Y("Tactical Posture: " + title, desc, "gold");
  };

  const I = () => {
    if (i < 100) {
      v.playBumpLand();
      Y("Insufficient Solidi", "Requires 100 Solidi to distribute Imperial Donativum.");
      return;
    }
    v.playCoin();
    l(P => ({
      ...P,
      solidi: Math.max(0, (P.solidi || 0) - 100),
      fama: (P.fama || 0) + 20,
      morale: Math.min(100, (P.morale || 75) + 15)
    }));
    Y("Donativum Distributed!", "+20 Imperial Fama & Plebeian Morale bolstered.", "gold");
  };

  const E = () => {
    if (!isDamaged) {
      v.playClick();
      Y("Hull & Cohort Sound", "Your forces are already at maximum integrity (100%).");
      return;
    }
    if (i < 40) {
      v.playBumpLand();
      Y("Insufficient Solidi", "Requires 40 Solidi for emergency timber & pitch caulk.");
      return;
    }
    const k = Math.min(u, x + 35);
    v.playCoin();
    try { if (v.playWoodCreak) v.playWoodCreak(); } catch(err) {}
    l(P => ({
      ...P,
      solidi: Math.max(0, (P.solidi || 0) - 40),
      fleetHp: isLand ? P.fleetHp : k,
      legionHp: isLand ? k : P.legionHp,
      hp: k
    }));
    Y("Forces Caulked & Repaired", "Restored +35 HP (" + k + "/" + u + ") (-40 Solidi).", "gold");
  };

  const handleOpenDeck = () => {
    v.playClick();
    a();
    if (oDeck) { oDeck(); return; }
    if (oCodexTab) { oCodexTab("BATTLE DECK"); return; }
    r("CODEX");
    setTimeout(() => window.dispatchEvent(new CustomEvent("open-codex-tab", { detail: "BATTLE DECK" })), 50);
  };

  const handleQuickArtifactSwap = () => {
    if (invArtifacts.length === 0) {
      v.playClick();
      Y("No Relics in Reserve", "Acquire relics from ruins, sunken galleons, or shrines in Sacred Arsenal.");
      a();
      if (oArmaTab) oArmaTab("RELIQVIAE"); else r("ARMA");
      return;
    }
    const nextItem = invArtifacts[0];
    const slot = (nextItem.slot === "STANDARDS" || nextItem.slot === "WEAPON" || nextItem.slot === "SHIELD") ? "STANDARDS" : (nextItem.slot === "DOCTRINE" || nextItem.slot === "SCROLL" || nextItem.slot === "ACCESSORY") ? "DOCTRINE" : "REGALIA";
    const oldItem = equipped[slot];
    let newInv = invArtifacts.filter(item => item.id !== nextItem.id);
    if (oldItem) newInv.push(oldItem);
    v.playSwordClash();
    l(prev => ({ ...prev, inventory: newInv, equipped: { ...(prev.equipped || {}), [slot]: nextItem } }));
    Y("Relic Swapped!", "Equipped " + nextItem.name + " into " + slot + " slot!", "gold");
  };

  const P = () => {
    if (T) {
      if (i < 120) {
        v.playBumpLand();
        Y("Insufficient Solidi", "Requires 120 Solidi to melt and remint pure gold coinage.");
        return;
      }
      v.playCoin();
      l(k => ({ ...k, currencyStandard: "standard", solidi: Math.max(0, (k.solidi || 0) - 120), fama: (k.fama || 0) + 10 }));
      Y("Re-established Pure Aureus Standard!", "Imperial credit & Fama enhanced (+10 Fama).", "gold");
    } else {
      v.playCoin();
      l(k => ({ ...k, currencyStandard: "debased", solidi: (k.solidi || 0) + 150, fama: Math.max(0, (k.fama || 0) - 10) }));
      Y("Debased to Bronze Nummus Standard!", "+150 Solidi emergency liquidity disbursed (-10 Fama).", "gold");
    }
  };

  const q = () => {
    const tribute = (A.length * 40) + 50;
    v.playCoin();
    l(k => ({
      ...k,
      solidi: (k.solidi || 0) + tribute,
      captainsLog: [{
        id: "log_income_" + Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: "Levied imperial tribute: +" + tribute + " Solidi from " + A.length + " ports & senate stipend."
      }, ...(k.captainsLog || [])]
    }));
    Y("Provincial Tribute Collected!", "Levied +" + tribute + " Solidi from " + A.length + " liberated ports & imperial stipends.", "gold");
  };

  const btnStyle = "w-full flex items-center justify-between p-2 sm:p-2.5 rounded-xl bg-black/40 hover:bg-[#1a140d]/80 border border-[#8b6508]/40 hover:border-amber-500/80 text-left transition-all active:scale-[0.98] shadow-sm cursor-pointer group";
  const btnContent = (icon, label, cost, badge) => e.jsxs("div", {
    className: "flex items-center justify-between w-full gap-2",
    children: [
      e.jsxs("div", {
        className: "flex items-center gap-2 min-w-0",
        children: [
          e.jsx(rt, { variant: "gold", emblem: icon, size: 16, className: "shrink-0" }),
          e.jsx("span", { className: "font-cinzel text-[10px] sm:text-[10.5px] font-bold text-amber-100 tracking-wider uppercase truncate", children: label })
        ]
      }),
      e.jsxs("div", {
        className: "flex items-center gap-1 shrink-0",
        children: [
          badge && e.jsx("span", { className: "text-[8.5px] font-mono text-amber-400 bg-amber-950/60 px-1 py-0.5 rounded border border-amber-600/40", children: badge }),
          (cost !== "" && cost !== undefined) && e.jsxs("span", { className: "text-[9.5px] font-mono font-bold text-amber-300 bg-black/50 px-1.5 py-0.5 rounded border border-amber-500/30 tabular-nums", children: [cost, " S"] })
        ]
      })
    ]
  });

  const handleTouchStart = ev => {
    if (ev.touches && ev.touches[0]) {
      setTouchStartY(ev.touches[0].clientY);
    }
  };

  const handleTouchEnd = ev => {
    if (touchStartY !== null && ev.changedTouches && ev.changedTouches[0]) {
      const diffY = ev.changedTouches[0].clientY - touchStartY;
      if (diffY > 60) {
        a();
      }
      setTouchStartY(null);
    }
  };

  return e.jsx(ie.div, {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
    className: "fixed inset-0 z-[140] pointer-events-auto overflow-hidden",
    onClick: a,
    children: e.jsxs(ie.div, {
      initial: { y: t === "ARMA" ? 40 : -40, opacity: 0, scale: 0.95 },
      animate: { y: 0, opacity: 1, scale: 1 },
      exit: { y: t === "ARMA" ? 40 : -40, opacity: 0, scale: 0.95 },
      transition: { type: "spring", damping: 26, stiffness: 320 },
      onClick: k => k.stopPropagation(),
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      className: "fixed " + (t === "ARMA" ? "bottom-14 sm:bottom-16 right-2 sm:right-4" : "top-14 sm:top-16 " + (t === "TREASURY" ? "left-2 sm:left-4" : "right-2 sm:right-4")) + " z-[141] w-[min(340px,calc(100vw-16px))] sm:w-84 max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain no-scrollbar intaglio-gem basalt-menu bg-[#080b12]/95 border-2 border-amber-500/80 rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.95),0_0_16px_rgba(245,158,11,0.25),inset_0_1px_2px_rgba(255,255,255,0.1)] select-none bg-slate-950/90 pointer-events-auto",
      children: [
        e.jsx(es, { type: "weathered_patina", opacity: 0.15, className: "rounded-2xl pointer-events-none" }),
        e.jsx($t, { position: "top-left", size: 14 }),
        e.jsx($t, { position: "top-right", size: 14 }),
        e.jsx($t, { position: "bottom-left", size: 14 }),
        e.jsx($t, { position: "bottom-right", size: 14 }),
        e.jsxs("div", {
          className: "flex items-center justify-between border-b border-amber-800/60 pb-2 mb-2.5",
          children: [
            e.jsxs("div", {
              className: "flex items-center gap-2 min-w-0",
              children: [
                e.jsx(rt, { variant: "gold", emblem: t === "ARMA" ? "shield" : t === "CODEX" ? "laurel" : "coin", size: 20 }),
                e.jsxs("div", {
                  className: "flex flex-col min-w-0",
                  children: [
                    e.jsx("span", { className: "text-[12px] font-black font-cinzel tracking-wider text-amber-200 uppercase truncate", children: t === "ARMA" ? "ARMA ET ARSENALIS" : t === "CODEX" ? "CODEX IMPERIALIS" : "FISCUS IMPERIALIS" }),
                    e.jsx("span", { className: "text-[8px] font-mono text-[#b8860b] uppercase truncate", children: t === "ARMA" ? "SACRED ARSENAL & POSTURES" : t === "CODEX" ? "COMMANDER & TACTICA" : "TREASURY & ARBITRAGE" })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "flex items-center gap-1 shrink-0",
              children: [
                e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); a(); if (oSave) oSave(); else window.dispatchEvent(new CustomEvent("open-save-manager")); },
                  className: "p-1 rounded-full bg-black/40 hover:bg-black/80 text-[#b8860b] hover:text-amber-200 border border-[#b8860b]/40 transition-all cursor-pointer",
                  title: "Tabularium & Settings (Save, Audio, D-Pad)",
                  children: e.jsx(ml, { className: "w-3.5 h-3.5 text-amber-400", strokeWidth: 2 })
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); a(); },
                  className: "p-1 rounded-full bg-black/40 hover:bg-black/80 text-[#b8860b] hover:text-white border border-[#b8860b]/40 transition-all cursor-pointer",
                  title: "Close",
                  children: e.jsx(qs, { className: "w-3.5 h-3.5" })
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          className: "grid grid-cols-3 gap-1 p-1 bg-black/60 rounded-xl border border-amber-900/40 mb-2.5",
          children: [
            e.jsxs("button", {
              type: "button",
              onClick: () => { try { v.playSwordClash(); } catch(e){} s("ARMA"); },
              className: "py-1 px-1.5 rounded-lg font-cinzel text-[9px] sm:text-[10px] font-bold text-center flex items-center justify-center gap-1 transition-all " + (t === "ARMA" ? "bg-amber-600/80 text-white shadow border border-amber-400/60" : "text-stone-400 hover:text-amber-200 hover:bg-stone-800/50"),
              title: "Arma & Arsenal",
              children: [e.jsx(Pt, { className: "w-3.5 h-3.5", strokeWidth: 2 }), "ARMA"]
            }),
            e.jsxs("button", {
              type: "button",
              onClick: () => { try { v.playClick(); } catch(e){} s("CODEX"); },
              className: "py-1 px-1.5 rounded-lg font-cinzel text-[9px] sm:text-[10px] font-bold text-center flex items-center justify-center gap-1 transition-all " + (t === "CODEX" ? "bg-amber-600/80 text-white shadow border border-amber-400/60" : "text-stone-400 hover:text-amber-200 hover:bg-stone-800/50"),
              title: "Codex Imperialis",
              children: [e.jsx(pl, { className: "w-3.5 h-3.5", strokeWidth: 2 }), "CODEX"]
            }),
            e.jsxs("button", {
              type: "button",
              onClick: () => { try { v.playCoin(); } catch(e){} s("TREASURY"); },
              className: "py-1 px-1.5 rounded-lg font-cinzel text-[9px] sm:text-[10px] font-bold text-center flex items-center justify-center gap-1 transition-all " + (t === "TREASURY" ? "bg-amber-600/80 text-white shadow border border-amber-400/60" : "text-stone-400 hover:text-amber-200 hover:bg-stone-800/50"),
              title: "Fiscus & Treasury",
              children: [e.jsx(Yt, { className: "w-3.5 h-3.5", strokeWidth: 2 }), "TREASURY"]
            })
          ]
        }),

        t === "ARMA" && e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsxs("div", {
              className: "p-2.5 rounded-xl bg-black/60 border border-amber-900/60 flex flex-col gap-1.5 shadow-inner " + (isCritical ? "ring-1 ring-rose-500/80 bg-red-950/30 animate-pulse" : ""),
              children: [
                e.jsxs("div", {
                  className: "flex items-center justify-between text-[9px] font-cinzel font-bold text-[#d4af37]",
                  children: [
                    e.jsx("span", { className: "truncate max-w-[160px]", children: j }),
                    e.jsxs("span", { className: "font-mono text-amber-300", children: [x, "/", u, " HP (", d, "%)"] })
                  ]
                }),
                e.jsx("div", {
                  className: "w-full h-1.5 bg-black/80 rounded-full overflow-hidden border border-amber-950",
                  children: e.jsx("div", {
                    className: "h-full transition-all duration-300 " + (d > 50 ? "bg-emerald-500" : d > 25 ? "bg-amber-500" : "bg-rose-600"),
                    style: { width: d + "%" }
                  })
                }),
                e.jsxs("div", {
                  className: "flex items-center justify-between text-[8px] font-mono text-[#b8860b] pt-0.5",
                  children: [
                    e.jsxs("span", { children: ["ATK: ", totalAtk, bonusAtk > 0 ? " (+" + bonusAtk + ")" : bonusAtk < 0 ? " (" + bonusAtk + ")" : ""] }),
                    e.jsxs("span", { children: ["DEF: ", totalDef, bonusDef > 0 ? " (+" + bonusDef + ")" : bonusDef < 0 ? " (" + bonusDef + ")" : ""] }),
                    e.jsxs("span", { children: ["LUCK: ", y] })
                  ]
                }),
                e.jsxs("div", {
                  className: "pt-1 border-t border-amber-900/40 flex flex-col gap-1",
                  children: [
                    e.jsx("span", { className: "text-[7.5px] font-cinzel font-bold text-amber-400/90 uppercase", children: "Tactical Posture" }),
                    e.jsxs("div", {
                      className: "grid grid-cols-3 gap-1",
                      children: [
                        e.jsx("button", {
                          type: "button",
                          onClick: () => handleSelectStance("BALANCED"),
                          className: "py-0.5 px-1 rounded text-[8px] font-cinzel font-bold uppercase transition-all border " + (stance === "BALANCED" ? "bg-amber-600 text-stone-950 border-amber-300 shadow" : "bg-black/40 text-stone-300 border-amber-900/40 hover:bg-stone-800"),
                          children: "BALANCED"
                        }),
                        e.jsx("button", {
                          type: "button",
                          onClick: () => handleSelectStance("IMPETUS"),
                          className: "py-0.5 px-1 rounded text-[8px] font-cinzel font-bold uppercase transition-all border " + (stance === "IMPETUS" ? "bg-amber-600 text-stone-950 border-amber-300 shadow" : "bg-black/40 text-rose-300 border-rose-900/40 hover:bg-stone-800"),
                          children: "IMPETUS (+ATK)"
                        }),
                        e.jsx("button", {
                          type: "button",
                          onClick: () => handleSelectStance("TESTUDO"),
                          className: "py-0.5 px-1 rounded text-[8px] font-cinzel font-bold uppercase transition-all border " + (stance === "TESTUDO" ? "bg-amber-600 text-stone-950 border-amber-300 shadow" : "bg-black/40 text-sky-300 border-sky-900/40 hover:bg-stone-800"),
                          children: "TESTUDO (+DEF)"
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "space-y-1.5 pt-0.5",
              children: [
                e.jsx("button", {
                  type: "button",
                  onClick: E,
                  disabled: !isDamaged,
                  className: btnStyle + " " + (!isDamaged ? "opacity-60 cursor-default" : "hover:border-amber-400 " + (isCritical ? "border-amber-400 bg-amber-950/40 shadow-[0_0_8px_rgba(245,158,11,0.4)]" : "")),
                  children: btnContent("shield", isDamaged ? "Emergency Repair Hull (+35 HP)" : "Hull Fully Sound (100%)", isDamaged ? "40" : "")
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: handleOpenDeck,
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("scroll", "Tactical Deck Builder", "", "3A • 2D • 1C")
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: handleQuickArtifactSwap,
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("gem", invArtifacts.length > 0 ? "Quick Swap Relic (" + invArtifacts[0].name.slice(0, 14) + "...)" : "Relics in Reserve: 0", "", "Inv: " + invArtifacts.length)
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); a(); if (oArmaTab) oArmaTab("RELIQVIAE"); else r("ARMA"); },
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("gem", "Sacred Arsenal (Epigraphy & Sets)", "")
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); a(); if (oArmaTab) oArmaTab("NAVAL"); else r("ARMA"); },
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("ship", "Flagship Yard & Upgrades", "")
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => { v.playClick(); a(); r("ARMA"); },
              className: "w-full mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-700/80 via-amber-600/90 to-amber-700/80 hover:from-amber-600 hover:to-amber-500 text-black font-cinzel font-black text-[10px] tracking-widest uppercase shadow-md active:scale-95 transition-all text-center cursor-pointer border border-amber-400/80",
              children: "OPEN FULL ARMA VIEW →"
            })
          ]
        }),

        t === "CODEX" && e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsxs("div", {
              className: "p-2.5 rounded-xl bg-black/60 border border-amber-900/60 flex flex-col gap-1.5 shadow-inner",
              children: [
                e.jsxs("div", {
                  className: "flex items-center justify-between text-[9px] font-cinzel text-amber-200",
                  children: [
                    e.jsxs("div", {
                      className: "flex flex-col",
                      children: [
                        e.jsx("span", { className: "text-[7.5px] font-mono text-[#b8860b] uppercase", children: "COMMANDER RANK" }),
                        e.jsxs("div", { className: "flex items-center gap-1.5", children: [
                        e.jsx(rt, {
                          variant: lvlInfo.currentLevel >= 8 ? "gold" : lvlInfo.currentLevel >= 5 ? "purple" : "silver",
                          emblem: lvlInfo.currentLevel >= 9 ? "rank_sol_imperator" : lvlInfo.currentLevel >= 7 ? "rank_curule_baton" : lvlInfo.currentLevel >= 5 ? "rank_aquila_standard" : lvlInfo.currentLevel >= 3 ? "rank_naval_crown" : "rank_civic_crown",
                          size: 24,
                          showGlow: true
                        }),
                        e.jsxs("span", { className: "font-black text-amber-300", children: ["LVL ", lvlInfo.currentLevel, " • ", rankTitle] })
                      ] })
                      ]
                    }),
                    e.jsxs("div", {
                      className: "flex flex-col text-right",
                      children: [
                        e.jsx("span", { className: "text-[7.5px] font-mono text-[#b8860b] uppercase", children: "SUPPLIES & PROVISIONS" }),
                        e.jsxs("span", { className: "font-mono font-bold text-amber-400", children: [curSupp, "/", maxSupp, " SUP"] })
                      ]
                    })
                  ]
                }),
                e.jsxs("div", {
                  className: "flex items-center justify-between pt-0.5 border-t border-amber-900/40",
                  children: [
                    e.jsxs("div", {
                      className: "flex items-center gap-1",
                      children: [
                        e.jsx("span", { className: "text-[7.5px] font-mono text-[#b8860b] uppercase", children: "ACTION POINTS:" }),
                        e.jsx("div", {
                          className: "flex items-center gap-0.5",
                          children: Array.from({ length: maxIter }).map((_, idx) => e.jsx("div", {
                            key: idx,
                            className: "w-2 h-2 rounded-sm border transition-all " + (idx < curIter ? "bg-amber-400 border-amber-200 shadow-[0_0_4px_rgba(245,158,11,0.8)]" : "bg-black/60 border-amber-900/40")
                          }))
                        })
                      ]
                    }),
                    e.jsxs("span", { className: "text-[7.5px] font-mono text-amber-300/80", children: ["-3 SUP / STEP"] })
                  ]
                }),
                e.jsxs("div", {
                  className: "flex items-center justify-between text-[8px] font-mono text-[#d4af37] pt-0.5",
                  children: [
                    e.jsxs("span", { children: ["Fama: ", p.toLocaleString(), " XP"] }),
                    e.jsx("span", { children: lvlInfo.isMaxLevel ? "Max Level Reached" : lvlInfo.famaInCurrentLevel + " / " + lvlInfo.famaNeededForNextLevel + " (" + lvlInfo.progressPct + "%)" })
                  ]
                }),
                e.jsx("div", {
                  className: "w-full h-1.5 bg-black/80 rounded-full overflow-hidden border border-amber-950",
                  children: e.jsx("div", {
                    className: "h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 shadow-[0_0_8px_rgba(245,158,11,0.6)] transition-all duration-300",
                    style: { width: lvlInfo.progressPct + "%" }
                  })
                })
              ]
            }),
            e.jsxs("div", {
              className: "space-y-1.5 pt-0.5",
              children: [
                e.jsx("button", {
                  type: "button",
                  onClick: handleOpenDeck,
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("scroll", "Tactical Deck Builder (Tabulae)", "")
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); a(); if (oCodexTab) oCodexTab("DOCTRINES"); else r("CODEX"); },
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("laurel", "Imperial Doctrines & Talents", "", N)
                }),
                !showVoyageConfirm ? e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); setShowVoyageConfirm(true); },
                  className: btnStyle + " hover:border-teal-400/80",
                  children: btnContent("ship", "Start New Voyage", "")
                }) : e.jsxs("div", {
                  className: "p-2 rounded-xl bg-amber-950/70 border border-amber-500/80 flex flex-col gap-1.5 animate-fadeIn",
                  children: [
                    e.jsx("div", { className: "text-[8.5px] font-cinzel font-bold text-amber-200 text-center leading-tight", children: "Start a new Mediterranean voyage? Lifetime stats and achievements are retained." }),
                    e.jsxs("div", {
                      className: "grid grid-cols-2 gap-1.5 pt-0.5",
                      children: [
                        e.jsx("button", {
                          type: "button",
                          onClick: () => { v.playBuccina(); setShowVoyageConfirm(false); a(); if (oVoyage) oVoyage(); },
                          className: "py-1 px-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-cinzel font-black text-[8.5px] uppercase shadow active:scale-95 transition-all cursor-pointer",
                          children: "CONFIRM"
                        }),
                        e.jsx("button", {
                          type: "button",
                          onClick: () => { v.playClick(); setShowVoyageConfirm(false); },
                          className: "py-1 px-2 rounded-lg bg-black/60 hover:bg-stone-800 text-amber-300 font-cinzel font-bold text-[8.5px] uppercase border border-[#8b6508]/40 active:scale-95 transition-all cursor-pointer",
                          children: "CANCEL"
                        })
                      ]
                    })
                  ]
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); a(); if (n) n(); },
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("scroll", "Campaign Journal (Acta)", "")
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); a(); if (oDef) oDef(); },
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("shield", "Province Defense & Hegemony", "")
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); a(); if (oSave) oSave(); else window.dispatchEvent(new CustomEvent("open-save-manager")); },
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("gem", "Tabularium (Saves)", "")
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => { v.playClick(); a(); r("CODEX"); },
              className: "w-full mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-700/80 via-amber-600/90 to-amber-700/80 hover:from-amber-600 hover:to-amber-500 text-black font-cinzel font-black text-[10px] tracking-widest uppercase shadow-md active:scale-95 transition-all text-center cursor-pointer border border-amber-400/80",
              children: "OPEN FULL CODEX VIEW →"
            })
          ]
        }),

        t === "TREASURY" && e.jsxs("div", {
          className: "space-y-2",
          children: [
            e.jsxs("div", {
              className: "p-2.5 rounded-xl bg-black/60 border border-amber-900/60 flex flex-col gap-1.5 shadow-inner",
              children: [
                e.jsxs("div", {
                  className: "flex items-center justify-between text-[9px] font-cinzel text-amber-200",
                  children: [
                    e.jsxs("div", {
                      className: "flex flex-col",
                      children: [
                        e.jsx("span", { className: "text-[7.5px] font-mono text-[#b8860b] uppercase", children: "SOLIDVS VAULT" }),
                        e.jsxs("span", { className: "font-black text-[#fff1b0] text-[11px]", children: [i.toLocaleString(), " S"] })
                      ]
                    }),
                    e.jsxs("div", {
                      className: "flex flex-col text-right",
                      children: [
                        e.jsx("span", { className: "text-[7.5px] font-mono text-[#b8860b] uppercase", children: "TAX & PORTS" }),
                        e.jsxs("span", { className: "font-bold text-amber-400", children: [F, " (", A.length, " Ports)"] })
                      ]
                    })
                  ]
                }),
                e.jsxs("div", {
                  className: "p-1.5 rounded-lg bg-amber-950/40 border border-amber-900/50 flex flex-col gap-0.5",
                  children: [
                    e.jsx("span", { className: "text-[7.5px] font-cinzel font-bold text-amber-300 uppercase", children: "Regional Trade Arbitrage" }),
                    e.jsx("span", { className: "text-[7.5px] font-mono text-amber-200/80 leading-tight", children: "✦ Garum: Carthago (+120%) • Wine: Massilia (+85%) • Grain: Alexandria (+60%)" })
                  ]
                }),
                e.jsxs("div", {
                  className: "flex items-center justify-between text-[8px] font-mono text-[#d4af37] pt-0.5 border-t border-amber-900/40",
                  children: [
                    e.jsxs("span", { children: ["Essence: ", c.essence || 0, " 🔮"] }),
                    e.jsxs("span", { children: ["Gems: ", c.desertGems || 0, " 💎"] }),
                    e.jsxs("span", { children: ["Standard: ", T ? "Nummus" : "Aureus"] })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              className: "space-y-1.5 pt-0.5",
              children: [
                e.jsx("button", {
                  type: "button",
                  onClick: q,
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("column", A.length > 0 ? "Levy Tribute (" + A.length + " Ports)" : "Levy Senate Stipend", "+" + ((A.length * 40) + 50))
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: I,
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("laurel", "Distribute Imperial Donativum", "100")
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: P,
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("coin", T ? "Remint Pure Aureus Standard" : "Debase Currency Standard", T ? "120" : "-150")
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); a(); if (oTrade) oTrade(); },
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("ship", "Provincial Trade & Commodities", "")
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); a(); if (oDef) oDef(); },
                  className: btnStyle + " hover:border-amber-400",
                  children: btnContent("shield", "Province Defenses & Hegemony", "")
                })
              ]
            }),
            e.jsx("button", {
              type: "button",
              onClick: () => { v.playClick(); a(); r("TREASURY"); },
              className: "w-full mt-2 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-700/80 via-amber-600/90 to-amber-700/80 hover:from-amber-600 hover:to-amber-500 text-black font-cinzel font-black text-[10px] tracking-widest uppercase shadow-md active:scale-95 transition-all text-center cursor-pointer border border-amber-400/80",
              children: "OPEN FULL TREASURY VIEW →"
            })
          ]
        })
      ]
    })
  });
}`;
    cleanJs = cleanJs.substring(0, mmStartIdx) + upgradedMiniMenu + cleanJs.substring(mmEndIdx);
    
  }

  // 16. Theme Unification: Standardize merchant modal button styling to Roman Sea Glass / Imperial Gold
  const oldMerchantBtn = 'className:"py-1.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider uppercase transition-all cursor-pointer shrink-0"';
  const newMerchantBtn = 'className:"py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-cinzel font-black text-xs tracking-wider uppercase shadow-md border border-amber-400/80 transition-all cursor-pointer shrink-0"';
  if (cleanJs.includes(oldMerchantBtn)) {
    cleanJs = cleanJs.replace(oldMerchantBtn, newMerchantBtn);
    
  }

  // 17. Theme Unification: Standardize Map Overview player marker & legend to Imperial Gold
  const oldMapPlayerMarker = 'fill:"#3b82f6",stroke:"#eff6ff",strokeWidth:"3"';
  const newMapPlayerMarker = 'fill:"#f59e0b",stroke:"#fffbeb",strokeWidth:"2.5",filter:"drop-shadow(0 0 6px rgba(245,158,11,0.8))"';
  if (cleanJs.includes(oldMapPlayerMarker)) {
    cleanJs = cleanJs.replace(oldMapPlayerMarker, newMapPlayerMarker);
    
  }

  const oldMapLegendFleet = 'className:"w-3 h-3 rounded-full bg-blue-500 border border-white"';
  const newMapLegendFleet = 'className:"w-3 h-3 rounded-full bg-amber-400 border border-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.8)]"';
  if (cleanJs.includes(oldMapLegendFleet)) {
    cleanJs = cleanJs.replace(oldMapLegendFleet, newMapLegendFleet);
    
  }

  // 18. Recalibrate D-Pad Physics, Movement Smoothing & Camera Damping
  const dpadStartIdx = cleanJs.indexOf("const GameDPad =");
  const dpadEndMarker = "window.GameDPad = GameDPad;";
  const dpadEndIdx = cleanJs.indexOf(dpadEndMarker, dpadStartIdx);
  if (dpadStartIdx !== -1 && dpadEndIdx !== -1) {
    const calibratedDPad = `const GameDPad = ({ onMoveVector, onMoveEnd, pos, iter, maxIter, playerMode }) => {
  const [activeDir, setActiveDir] = b.useState(null);
  const repeatTimerRef = b.useRef(null);
  const initialDelayRef = b.useRef(null);
  const dirRef = b.useRef(null);

  if (pos === "off") return null;

  const clearTimers = () => {
    if (initialDelayRef.current) {
      clearTimeout(initialDelayRef.current);
      initialDelayRef.current = null;
    }
    if (repeatTimerRef.current) {
      clearInterval(repeatTimerRef.current);
      repeatTimerRef.current = null;
    }
  };

  b.useEffect(() => {
    return () => clearTimers();
  }, []);

  const stopPan = (ev) => {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      if (ev.target && typeof ev.target.releasePointerCapture === "function" && ev.pointerId !== undefined) {
        try { ev.target.releasePointerCapture(ev.pointerId); } catch(err) {}
      }
    }
    clearTimers();
    dirRef.current = null;
    setActiveDir(null);
    if (onMoveEnd) onMoveEnd();
  };

  const startPan = (dx, dy, ev) => {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      if (ev.target && typeof ev.target.setPointerCapture === "function" && ev.pointerId !== undefined) {
        try { ev.target.setPointerCapture(ev.pointerId); } catch(err) {}
      }
    }
    clearTimers();
    dirRef.current = { dx, dy };
    setActiveDir({ dx, dy });
    
    onMoveVector({ x: dx, y: dy });

    initialDelayRef.current = setTimeout(() => {
      repeatTimerRef.current = setInterval(() => {
        if (dirRef.current) {
          onMoveVector({ x: dirRef.current.dx, y: dirRef.current.dy });
        }
      }, 180);
    }, 260);
  };

  const isLeft = pos === "left";
  const isRight = pos === "right";
  const numGems = Math.max(1, maxIter || 6);
  const currentIter = Math.max(0, iter || 0);

  const renderGems = () => {
    const gems = [];
    const radius = 50;
    for (let i = 0; i < numGems; i++) {
      const angle = (i / numGems) * Math.PI * 2 - Math.PI / 2;
      const x = 56 + Math.cos(angle) * radius;
      const y = 56 + Math.sin(angle) * radius;
      const isActive = i < currentIter;
      gems.push(
        e.jsx("div", {
          key: "gem-" + i,
          style: {
            position: "absolute",
            left: x + "px",
            top: y + "px",
            width: "8px",
            height: "8px",
            marginLeft: "-4px",
            marginTop: "-4px",
            borderRadius: "50%",
            background: isActive
              ? "radial-gradient(circle at 30% 30%, #fff 0%, rgba(254,243,199,1) 40%, rgba(217,119,6,1) 100%)"
              : "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(69,26,3,0.5) 100%)",
            border: isActive ? "1px solid rgba(255,255,255,0.8)" : "1px solid rgba(69,26,3,0.8)",
            boxShadow: isActive
              ? "0 0 6px rgba(254,243,199,0.8), inset 0 0 4px rgba(255,255,255,0.8)"
              : "inset 0 2px 4px rgba(0,0,0,0.5)",
            transform: "rotate(45deg)",
            zIndex: 10
          }
        })
      );
    }
    return gems;
  };

  const btnBaseStyle = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    pointerEvents: "auto",
    touchAction: "none",
    color: "rgba(212, 175, 55, 0.9)",
    transition: "transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.12s ease"
  };

  return e.jsx("div", {
    className: "fixed z-[120] pointer-events-none",
    style: {
      bottom: "32px",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
      left: isLeft ? "32px" : isRight ? "auto" : "50%",
      right: isRight ? "32px" : "auto",
      transform: (!isLeft && !isRight) ? "translateX(-50%)" : "none",
      filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.6))"
    },
    onContextMenu: (ev) => ev.preventDefault(),
    children: e.jsxs("div", {
      className: "relative flex items-center justify-center pointer-events-none",
      style: { width: "112px", height: "112px" },
      children: [
        e.jsx("div", {
          style: {
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "transparent",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            border: "1px solid rgba(212, 175, 55, 0.15)",
            borderBottomColor: "rgba(5, 11, 20, 0.3)",
            borderRightColor: "rgba(5, 11, 20, 0.3)",
            boxShadow: "inset 0 4px 10px rgba(212, 175, 55, 0.15), inset 0 -4px 10px rgba(5, 11, 20, 0.15), 0 8px 24px rgba(0,0,0,0.25)"
          }
        }),
        e.jsx("div", {
          style: {
            position: "absolute",
            inset: "16px",
            borderRadius: "50%",
            background: "transparent",
            border: "1px solid rgba(212, 175, 55, 0.15)",
            borderBottomColor: "rgba(212, 175, 55, 0.1)",
            borderRightColor: "rgba(212, 175, 55, 0.1)",
            boxShadow: "inset 0 6px 12px rgba(5, 11, 20, 0.4), 0 1px 2px rgba(212, 175, 55, 0.4)"
          }
        }),
        ...renderGems(),
        e.jsx("button", {
          onPointerDown: (ev) => startPan(0, -1, ev),
          onPointerUp: stopPan,
          onPointerCancel: stopPan,
          onPointerLeave: stopPan,
          style: {
            ...btnBaseStyle,
            top: "4px",
            left: "36px",
            transform: activeDir?.dx === 0 && activeDir?.dy === -1 ? "scale(0.88)" : "scale(1)",
            filter: activeDir?.dx === 0 && activeDir?.dy === -1 ? "drop-shadow(0 0 8px rgba(245,158,11,0.9))" : "drop-shadow(0 -1px 2px rgba(5, 11, 20, 0.9)) drop-shadow(0 1px 1px rgba(212, 175, 55, 0.5))"
          },
          children: e.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: e.jsx("path", { d: "M18 15L12 9L6 15" }) })
        }),
        e.jsx("button", {
          onPointerDown: (ev) => startPan(0, 1, ev),
          onPointerUp: stopPan,
          onPointerCancel: stopPan,
          onPointerLeave: stopPan,
          style: {
            ...btnBaseStyle,
            bottom: "4px",
            left: "36px",
            transform: activeDir?.dx === 0 && activeDir?.dy === 1 ? "scale(0.88)" : "scale(1)",
            filter: activeDir?.dx === 0 && activeDir?.dy === 1 ? "drop-shadow(0 0 8px rgba(245,158,11,0.9))" : "drop-shadow(0 -1px 2px rgba(5, 11, 20, 0.9)) drop-shadow(0 1px 1px rgba(212, 175, 55, 0.5))"
          },
          children: e.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: e.jsx("path", { d: "M6 9L12 15L18 9" }) })
        }),
        e.jsx("button", {
          onPointerDown: (ev) => startPan(-1, 0, ev),
          onPointerUp: stopPan,
          onPointerCancel: stopPan,
          onPointerLeave: stopPan,
          style: {
            ...btnBaseStyle,
            left: "4px",
            top: "36px",
            transform: activeDir?.dx === -1 && activeDir?.dy === 0 ? "scale(0.88)" : "scale(1)",
            filter: activeDir?.dx === -1 && activeDir?.dy === 0 ? "drop-shadow(0 0 8px rgba(245,158,11,0.9))" : "drop-shadow(0 -1px 2px rgba(5, 11, 20, 0.9)) drop-shadow(0 1px 1px rgba(212, 175, 55, 0.5))"
          },
          children: e.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: e.jsx("path", { d: "M15 6L9 12L15 18" }) })
        }),
        e.jsx("button", {
          onPointerDown: (ev) => startPan(1, 0, ev),
          onPointerUp: stopPan,
          onPointerCancel: stopPan,
          onPointerLeave: stopPan,
          style: {
            ...btnBaseStyle,
            right: "4px",
            top: "36px",
            transform: activeDir?.dx === 1 && activeDir?.dy === 0 ? "scale(0.88)" : "scale(1)",
            filter: activeDir?.dx === 1 && activeDir?.dy === 0 ? "drop-shadow(0 0 8px rgba(245,158,11,0.9))" : "drop-shadow(0 -1px 2px rgba(5, 11, 20, 0.9)) drop-shadow(0 1px 1px rgba(212, 175, 55, 0.5))"
          },
          children: e.jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: e.jsx("path", { d: "M9 6L15 12L9 18" }) })
        }),
        e.jsx("button", {
          onClick: (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            window.dispatchEvent(new CustomEvent("dpad-center-click"));
          },
          title: "Centrum / Halt Course",
          className: "active:scale-90 active:brightness-125 transition-all duration-75",
          style: {
            position: "absolute",
            inset: 0,
            margin: "auto",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: currentIter === 0
              ? "radial-gradient(circle at 35% 35%, rgba(180, 83, 9, 0.5) 0%, rgba(120, 53, 15, 0.35) 30%, rgba(5, 11, 20, 0.7) 100%)"
              : "radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.4) 0%, rgba(212, 175, 55, 0.25) 30%, rgba(5, 11, 20, 0.2) 60%, rgba(5, 11, 20, 0.5) 100%)",
            border: currentIter === 0 ? "1px solid rgba(180, 83, 9, 0.6)" : "1px solid rgba(212, 175, 55, 0.5)",
            borderBottomColor: "rgba(5, 11, 20, 0.8)",
            borderRightColor: "rgba(5, 11, 20, 0.8)",
            boxShadow: currentIter === 0
              ? "inset -2px -2px 6px rgba(5, 11, 20, 0.9), 0 0 8px rgba(217, 119, 6, 0.3)"
              : "inset -2px -2px 6px rgba(5, 11, 20, 0.9), inset 2px 2px 6px rgba(255,255,255,0.3), 0 6px 12px rgba(0,0,0,0.7)",
            pointerEvents: "auto",
            touchAction: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: currentIter === 0 ? "#b45309" : "#fde68a",
            filter: "none"
          },
          children: playerMode === "land"
            ? e.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", style: { filter: "drop-shadow(0px 1px 0px rgba(255,255,255,0.4)) drop-shadow(0px -1px 0px rgba(0,0,0,0.8))" }, children: [ e.jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }) ] })
            : e.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", style: { filter: "drop-shadow(0px 1px 0px rgba(255,255,255,0.4)) drop-shadow(0px -1px 0px rgba(0,0,0,0.8))" }, children: [ e.jsx("circle", { cx: "12", cy: "5", r: "3" }), e.jsx("line", { x1: "12", y1: "22", x2: "12", y2: "8" }), e.jsx("path", { d: "M5 12H2a10 10 0 0 0 20 0h-3" }) ] })
        })
      ]
    })
  });
}; window.GameDPad = GameDPad;`;
    cleanJs = cleanJs.substring(0, dpadStartIdx) + calibratedDPad + cleanJs.substring(dpadEndIdx + dpadEndMarker.length);
    
  }

  // Movement animation duration & easing curves
  const oldDuration = "const ft=Math.max(.2,Math.min(3,ee.speedModifier||1));nn.current=Math.max(70,Math.round(100/ft)),ws.current=!0";
  const newDuration = "const ft=Math.max(.2,Math.min(3,ee.speedModifier||1));nn.current=Math.max(130,Math.round(180/ft)),ws.current=!0";
  if (cleanJs.includes(oldDuration)) {
    cleanJs = cleanJs.replace(oldDuration, newDuration);
    
  }

  const oldEasing = "const ue=performance.now()-rn.current,ke=Math.max(50,nn.current||90),kt=Math.min(1,ue/ke),bt=1-Math.pow(1-kt,3)";
  const newEasing = "const ue=performance.now()-rn.current,ke=Math.max(90,nn.current||180),kt=Math.min(1,ue/ke),bt=kt*kt*(3-2*kt)";
  if (cleanJs.includes(oldEasing)) {
    cleanJs = cleanJs.replace(oldEasing, newEasing);
    
  }

  // Camera follow damping
  const oldCameraDamp = "Dt=kt?Math.max(16,Math.min(32,16+bt*.03)):ze?14:Xs.current?8:9.5";
  const newCameraDamp = "Dt=kt?8.5:ze?7.2:Xs.current?6.5:7.0";
  if (cleanJs.includes(oldCameraDamp)) {
    cleanJs = cleanJs.replace(oldCameraDamp, newCameraDamp);
    
  }

  // 19. Un-nest ARMA Submenus (Sanctuaries, Epigraphy, Pax Deorum, Sets, Forge)
  const nestedDiceArma = 'armaTab==="DICE"&&e.jsxs("div",{className:"space-y-4 animate-fade-in",children:[e.jsx(ex,{player:t,setPlayer:s,onClose:()=>setArmaTab("TRIAD")})]}),o==="SANCTUARIA"';
  const unnestedDiceArma = 'armaTab==="DICE"&&e.jsxs("div",{className:"space-y-4 animate-fade-in",children:[e.jsx(ex,{player:t,setPlayer:s,onClose:()=>setArmaTab("TRIAD")})]})]}),o==="SANCTUARIA"';
  if (cleanJs.includes(nestedDiceArma)) {
    cleanJs = cleanJs.replace(nestedDiceArma, unnestedDiceArma);
    
  }

  const nestedForgeTail = 'children:"FORGE ARTIFACT"})]},`bp_${C.id}_${ae}`)})})]})]})]}),e.jsx(Nt,{';
  const unnestedForgeTail = 'children:"FORGE ARTIFACT"})]},`bp_${C.id}_${ae}`)})})]})]}),e.jsx(Nt,{';
  if (cleanJs.includes(nestedForgeTail)) {
    cleanJs = cleanJs.replace(nestedForgeTail, unnestedForgeTail);
    
  }

  // 20. Total combat-to-map transition unfreezing & notification cleanup
  const oldCombatExitBlock = `const onCombatExit=()=>{    ws.current=!1;    cr.current=!1;    Ds.current=null;    or.current=null;    if(Nr.current)Nr.current.active=!1;    De.current=[];    xs.current=!1;    ta.current=!1;    pa.current=!1;    Ia.current=null;    kr(!1);    Fe.current=null;    se.current=null;    Oa.current=null;    Qa.current=null;    de.current=null;    vr.current=!1;    cn.current=performance.now();    ve.current=performance.now();    if(it.current){      it.current.isEnemyTurn=!1;      it.current.iter=Math.max(6,it.current.iter??6);    }    s(prev=>({...prev,isEnemyTurn:!1,iter:Math.max(6,prev.iter??6)}));  };`;
  const newCombatExitBlock = `const onCombatExit=()=>{    ws.current=!1;    cr.current=!1;    Ds.current=null;    or.current=null;    nr.current={x:0,y:0};    wr({x:0,y:0});    window._dpad=null;    if(Nr.current)Nr.current.active=!1;    De.current=[];    xs.current=!1;    ta.current=!1;    pa.current=!1;    Ia.current=null;    kr(!1);    Fe.current=null;    se.current=null;    Oa.current=null;    Qa.current=null;    de.current=null;    vr.current=!1;    cn.current=performance.now();    ve.current=performance.now();    if(it.current){      it.current.isEnemyTurn=!1;      it.current.iter=Math.max(6,it.current.iter??6);    }    s(prev=>({...prev,isEnemyTurn:!1,iter:Math.max(6,prev.iter??6)}));    try{if(window.showToast)window.showToast("VICTORIA! COURSE CLEARED","Movement restored to 6/6","imperial");}catch(e){}  };`;
  if (cleanJs.includes(oldCombatExitBlock)) {
    cleanJs = cleanJs.replace(oldCombatExitBlock, newCombatExitBlock);
    
  }

  // 21. Upgrade Port Market (a0) to Render Masterwork Roman Commodity Medallions
  const oldMarketRowStart = 'children:[e.jsx("span",{className:"text-xs font-cinzel font-bold text-amber-200",children:h.name})';
  const newMarketRowStart = 'children:[e.jsx(rt,{variant:"bronze",emblem:h.id,size:32,showGlow:!0}),e.jsx("span",{className:"text-xs font-cinzel font-bold text-amber-200",children:h.name})';
  if (cleanJs.includes(oldMarketRowStart)) {
    cleanJs = cleanJs.replace(oldMarketRowStart, newMarketRowStart);
    
  } else {
    console.warn("WARN: oldMarketRowStart not found!");
  }

  // 22. Upgrade Cargo Hold Modal to Masterwork Roman Medallions
  const oldCargoHoldIcon = 'children:[e.jsx("span",{className:"text-xl",children:C.icon}),';
  const newCargoHoldIcon = 'children:[e.jsx(rt,{variant:"bronze",emblem:C.id,size:32,showGlow:!0}),';
  if (cleanJs.includes(oldCargoHoldIcon)) {
    cleanJs = cleanJs.replace(oldCargoHoldIcon, newCargoHoldIcon);
    
  } else {
    console.warn("WARN: oldCargoHoldIcon not found!");
  }

  // 23. Upgrade Fleet Summary Commodity Grid to Masterwork Roman Medallions
  const oldSummaryCard = 'map(m=>{const h=t.cargo?.[m.id]||0;return e.jsxs("div",{className:`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${h>0?"bg-[#44403c]/90 border-[#b8860b]/40 shadow-[0_2px_8px_rgba(120,113,108,0.3)]":"bg-[#04282c]/60 border-[#b8860b]/40 opacity-60"} bg-slate-950/90`,children:[e.jsx("span",{className:"text-[10px] font-bold font-cinzel text-stone-200 truncate w-full",children:m.label})';
  const newSummaryCard = 'map(m=>{const h=t.cargo?.[m.id]||0;return e.jsxs("div",{className:`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${h>0?"bg-[#44403c]/90 border-[#b8860b]/40 shadow-[0_2px_8px_rgba(120,113,108,0.3)]":"bg-[#04282c]/60 border-[#b8860b]/40 opacity-60"} bg-slate-950/90`,children:[e.jsx(rt,{variant:"bronze",emblem:m.id,size:28,showGlow:h>0}),e.jsx("span",{className:"text-[10px] font-bold font-cinzel text-stone-200 truncate w-full mt-1.5",children:m.label})';
  if (cleanJs.includes(oldSummaryCard)) {
    cleanJs = cleanJs.replace(oldSummaryCard, newSummaryCard);
    
  } else {
    console.warn("WARN: oldSummaryCard not found!");
  }

  // 24. Upgrade Port Infrastructure Buildings to Masterwork Roman Architectural Medallions
  const oldPortBldgWrapper = 'className:"font-bold font-cinzel text-xs text-stone-200 flex items-center gap-1",children:[e.jsx(O.icon,{className:"w-3.5 h-3.5 text-amber-300"}),e.jsx("span",{children:O.name})]';
  const newPortBldgWrapper = 'className:"font-bold font-cinzel text-xs text-stone-200 flex items-center gap-2",children:[e.jsx(rt,{variant:ge?"gold":"bronze",emblem:O.id,size:30,showGlow:ge}),e.jsx("span",{children:O.name})]';
  if (cleanJs.includes(oldPortBldgWrapper)) {
    cleanJs = cleanJs.replace(oldPortBldgWrapper, newPortBldgWrapper);
    
  } else {
    console.warn("WARN: oldPortBldgWrapper not found!");
  }

  // 25. Upgrade Ara Augurii Temple Omens to Masterwork Glowing Sea Glass Medallions
  const oldAuguryBadge = 'e.jsx("span", { className: "text-base", children: d.icon || "✨" })';
  const newAuguryBadge = 'e.jsx(rt, { variant: "gold", emblem: d.id, size: 30, showGlow: true })';
  if (cleanJs.includes(oldAuguryBadge)) {
    cleanJs = cleanJs.replace(oldAuguryBadge, newAuguryBadge);
    
  }

  const oldAuguryIcon = 'e.jsx("span", { children: p.icon })';
  const newAuguryIcon = 'e.jsx(rt, { variant: "gold", emblem: p.id, size: 28, showGlow: true })';
  if (cleanJs.includes(oldAuguryIcon)) {
    cleanJs = cleanJs.replace(oldAuguryIcon, newAuguryIcon);
    
  }

  // 26. Upgrade Combat Victory Plunder Display to Masterwork Commodity Medallion
  const oldVictoryPlunder = 'children: [e.jsx("span", { children: victorySpoils.cargoPlunder.icon }), e.jsx("span", { children: victorySpoils.cargoPlunder.name })]';
  const newVictoryPlunder = 'children: [e.jsx(rt, { variant: "bronze", emblem: victorySpoils.cargoPlunder.id || "gold", size: 24, showGlow: true }), e.jsx("span", { children: victorySpoils.cargoPlunder.name })]';
  if (cleanJs.includes(oldVictoryPlunder)) {
    cleanJs = cleanJs.replace(oldVictoryPlunder, newVictoryPlunder);
    
  }

  
  // 8. Validate syntax using esbuild
  console.log("Validating updated bundle with esbuild...");
  esbuild.transformSync(cleanJs, { loader: "jsx" });
  

  // 9. Write out index-V33.js
  const v33Path = path.join(__dirname, "../public/assets/index-V33.js");
  fs.writeFileSync(v33Path, cleanJs, "utf8");
  

  // 10. Update index.html cachebuster timestamp
  const indexPath = path.join(__dirname, "../index.html");
  let html = fs.readFileSync(indexPath, "utf8");
  const timestamp = Date.now();
  const versionTag = `V33_${timestamp}`;
  html = html.replace(/var LATEST_VER = "[^"]*";/, `var LATEST_VER = "${versionTag}";`);
  html = html.replace(/src="\/assets\/index-V32\.js\?v=[^"]*"/, `src="/assets/index-V33.js?v=${timestamp}"`);
  fs.writeFileSync(indexPath, html, "utf8");
  

  // Also sync to dist if dist exists
  const distV32Path = path.join(__dirname, "../dist/assets/index-V33.js");
  if (fs.existsSync(path.dirname(distV32Path))) {
    fs.writeFileSync(distV32Path, cleanJs, "utf8");
    
  }
  const distIndexPath = path.join(__dirname, "../dist/index.html");
  if (fs.existsSync(distIndexPath)) {
    fs.writeFileSync(distIndexPath, html, "utf8");
    
  }
}

if (require.main === module) {
  buildClean();
}

module.exports = { buildClean };
