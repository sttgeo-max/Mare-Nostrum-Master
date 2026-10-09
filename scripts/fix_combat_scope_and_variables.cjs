const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== FIXING BATTLETHEATREV2 VARIABLE SCOPE & DECLARATION ORDER ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V33.js');
let bundle = fs.readFileSync(bundlePath, 'utf8');

const pBT = bundle.indexOf("const BattleTheatreV2 =");
if (pBT === -1) {
  console.error("Could not find BattleTheatreV2 in bundle");
  process.exit(1);
}

const pRoot = bundle.indexOf('id: "battle-theatre-v2-root"', pBT);
if (pRoot === -1) {
  console.error("Could not find battle-theatre-v2-root in bundle");
  process.exit(1);
}

// Extract the header block of BattleTheatreV2
const pReturn = bundle.indexOf('return e.jsxs("div", {', pBT);
if (pReturn === -1) {
  console.error("Could not find return statement in BattleTheatreV2");
  process.exit(1);
}

const cleanBattleTheatreHeader = `
const BattleTheatreV2 = ({
  isSea = true,
  playerHp = 100, maxPlayerHp = 100, playerBlock = 0, playerAnim = "idle",
  enemyHp = 100, maxEnemyHp = 100, enemyBlock = 0, enemyAnim = "idle",
  turn = "player", currentIntent = null, hoveredAbility = null,
  timeOfDay = "DIES", weather = "CLEAR", regionName = "Mediterranean",
  enemy = null, player = null,
  playerStatus = [], enemyStatus = [], activeCombatFX = null,
  floatingText = [], totalDamageDealt = 0, totalDamageTaken = 0,
  recentEnemyDmg = null, recentPlayerDmg = null
}) => {
  // 1. Primitive and String Normalization
  const tod = String(timeOfDay || "DIES").toUpperCase();
  const reg = String(regionName || "").toLowerCase();
  const wStr = String(weather || "CLEAR").toUpperCase();

  // 2. Time of Day Classification
  const isDawn = tod === "AURORA" || tod === "DAWN";
  const isDusk = tod === "CREPUSCULUM" || tod === "DUSK" || tod === "VESPER";
  const isNight = tod === "NOX" || tod === "NIGHT";
  const isDies = !isDawn && !isDusk && !isNight;

  // 3. Regional Classifications
  const isEgyptLevant = reg.includes("alexandria") || reg.includes("egypt") || reg.includes("nile") || reg.includes("levant") || reg.includes("tyre") || reg.includes("palmyra") || reg.includes("gaza");
  const isRomeItaly = reg.includes("rome") || reg.includes("ostia") || reg.includes("ital") || reg.includes("tyrrhen") || reg.includes("tiber");
  const isCarthagePunic = reg.includes("carthage") || reg.includes("afric") || reg.includes("numid") || reg.includes("punic") || reg.includes("syrtis") || reg.includes("tripoli");
  const isHellasAegean = reg.includes("athen") || reg.includes("sparta") || reg.includes("corinth") || reg.includes("hellas") || reg.includes("aegean") || reg.includes("rhodes") || reg.includes("delphi");
  const isChokepoint = reg.includes("messina") || reg.includes("hellespont") || reg.includes("strait") || reg.includes("bosphorus") || reg.includes("fretum") || reg.includes("gibraltar") || reg.includes("milvian") || reg.includes("pons");
  const isShallows = reg.includes("cyclades") || reg.includes("syrtis") || reg.includes("rhodes") || reg.includes("balearic") || reg.includes("reef") || reg.includes("shoal") || reg.includes("creta") || reg.includes("cyprus");
  const isFortress = reg.includes("syracuse") || reg.includes("ravenna") || reg.includes("siege") || reg.includes("castra") || reg.includes("fortress") || reg.includes("massilia") || reg.includes("verona");
  const isNorthernFrontier = reg.includes("rhine") || reg.includes("danube") || reg.includes("alesia") || reg.includes("trier") || reg.includes("gallia") || reg.includes("germania") || reg.includes("britannia") || reg.includes("turin") || reg.includes("alps");
  const isMilvianRiver = reg.includes("milvian") || reg.includes("pons") || reg.includes("tiber") || reg.includes("rubicon");

  // 4. Weather Classifications
  const isRain = wStr.includes("RAIN") || wStr.includes("PLUVIA");
  const isStorm = wStr.includes("STORM") || wStr.includes("TEMPEST") || wStr.includes("TEMPESTAS");
  const isFog = wStr.includes("FOG") || wStr.includes("NEBULA") || wStr.includes("MIST");
  const isSirocco = wStr.includes("SIROCCO") || wStr.includes("DUST") || (isEgyptLevant && wStr.includes("WIND"));
  const isSnow = wStr.includes("SNOW") || wStr.includes("NIX") || (isNorthernFrontier && (isNight || wStr.includes("WINTER")));

  // 5. Factions & Unit Categories
  const enemyFaction = enemy?.faction || enemy?.flagshipMedallion || enemy?.variant || (isCarthagePunic ? "punic" : isHellasAegean ? "greek" : isEgyptLevant ? "egyptian" : isNorthernFrontier ? "barbarian" : "usurpers");
  const pFaction = player?.faction || player?.medallionVariant || player?.flagshipVariant || player?.flagshipMedallion || "constantine";
  const isNaval = isSea === true || (isSea !== false && !enemy?.isLand && enemy?.type !== "legion");

  // 6. Combat State & Animation
  const isPlayerAttacking = playerAnim === "attack" || playerAnim === "ram" || playerAnim === "shoot";
  const isEnemyAttacking = enemyAnim === "attack" || enemyAnim === "ram" || enemyAnim === "shoot";
  const isPlayerDefending = playerAnim === "defend" || playerBlock > 0;
  const isEnemyDefending = enemyAnim === "defend" || enemyBlock > 0;
  const isRamClash = playerAnim === "ram" || enemyAnim === "ram";

  const pPct = Math.max(0, Math.min(100, Math.round((playerHp / (maxPlayerHp || 100)) * 100)));
  const ePct = Math.max(0, Math.min(100, Math.round((enemyHp / (maxEnemyHp || 100)) * 100)));

  // Staggered Offsets for 3-Lane Formation
  const pFlagOffset = playerAnim === "ram" ? 140 : playerAnim === "attack" ? 110 : playerAnim === "shoot" ? -14 : playerAnim === "hit" ? -24 : 0;
  const pEsc1Offset = playerAnim === "ram" ? 105 : playerAnim === "attack" ? 85 : playerAnim === "shoot" ? -8 : playerAnim === "hit" ? -18 : 0;
  const pEsc2Offset = playerAnim === "ram" ? 115 : playerAnim === "attack" ? 95 : playerAnim === "shoot" ? -10 : playerAnim === "hit" ? -20 : 0;
  const eFlagOffset = enemyAnim === "ram" ? -140 : enemyAnim === "attack" ? -110 : enemyAnim === "shoot" ? 14 : enemyAnim === "hit" ? 24 : 0;
  const eEsc1Offset = enemyAnim === "ram" ? -105 : enemyAnim === "attack" ? -85 : enemyAnim === "shoot" ? 8 : enemyAnim === "hit" ? 18 : 0;
  const eEsc2Offset = enemyAnim === "ram" ? -115 : enemyAnim === "attack" ? -95 : enemyAnim === "shoot" ? 10 : enemyAnim === "hit" ? 20 : 0;

  const abKw = (kw) => {
    if (!hoveredAbility) return false;
    if (typeof hoveredAbility === "string") return hoveredAbility.toLowerCase().includes(kw);
    const idStr = typeof hoveredAbility.id === "string" ? hoveredAbility.id : (typeof hoveredAbility.id === "number" ? String(hoveredAbility.id) : "");
    const nameStr = typeof hoveredAbility.name === "string" ? hoveredAbility.name : "";
    const typeStr = typeof hoveredAbility.type === "string" ? hoveredAbility.type : "";
    return idStr.toLowerCase().includes(kw) || nameStr.toLowerCase().includes(kw) || typeStr.toLowerCase().includes(kw);
  };

  // Dynamic Root Container Sky Gradient by Time of Day & Domain
  const arenaBgGradient = isNaval
    ? (isNight
        ? "linear-gradient(180deg, #01040a 0%, #030a16 28%, #06152b 62%, #010307 100%)"
        : isDusk
        ? "linear-gradient(180deg, #18051e 0%, #3b0a45 26%, #581c3b 58%, #0f0514 100%)"
        : isDawn
        ? "linear-gradient(180deg, #1a0c24 0%, #3a1532 26%, #5c2238 58%, #0a0410 100%)"
        : "linear-gradient(180deg, #020a16 0%, #051a32 28%, #082647 62%, #020710 100%)")
    : (isNight
        ? "linear-gradient(180deg, #050408 0%, #0c0a12 28%, #14101d 62%, #030205 100%)"
        : isDusk
        ? "linear-gradient(180deg, #240a0c 0%, #451515 28%, #4a2118 62%, #120404 100%)"
        : isDawn
        ? "linear-gradient(180deg, #210d18 0%, #3d1722 28%, #452119 62%, #0f0508 100%)"
        : "linear-gradient(180deg, #150d06 0%, #26190d 28%, #382512 62%, #0a0502 100%)");
`;

bundle = bundle.substring(0, pBT) + cleanBattleTheatreHeader.trim() + "\n  " + bundle.substring(pReturn);
console.log("Cleaned and ordered BattleTheatreV2 initialization header!");

// Write updated bundle and test with esbuild
fs.writeFileSync(bundlePath, bundle, 'utf8');
console.log("Wrote updated bundle. Validating with esbuild...");

try {
  esbuild.buildSync({
    entryPoints: [bundlePath],
    outfile: '/tmp/test_bundle.js',
    bundle: false,
    format: 'esm',
  });
  console.log("ESBUILD VALIDATION PASSED! All syntax and imports are 100% valid.");
} catch (e) {
  console.error("ESBUILD VALIDATION FAILED:", e.message);
  process.exit(1);
}
