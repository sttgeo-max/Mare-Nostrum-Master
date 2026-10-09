const fs = require('fs');
const path = require('path');

console.log("=== IMPLEMENTING TABBED CATEGORY FILTERING SYSTEM (OFFENSIVE, DEFENSIVE, UTILITY) ===");

const bundlePath = path.join(__dirname, '..', 'public', 'assets', 'index-V37.js');
let code = fs.readFileSync(bundlePath, 'utf8');

// 1. Update le memo filtering logic in px component
console.log("1. Updating le memo filtering logic...");

const oldLeRegex = /le=b\.useMemo\(\(\)=>d==="ALL"\?Ue:d==="EQUIPPED"\?Ue\.filter\(C=>C\.isEquipped\):d==="HOLD"\?Ue\.filter\(C=>!C\.isEquipped\):d==="REGALIA"\?Ue\.filter\(C=>C\.artifact\.slot==="ARMOR"\|\|C\.artifact\.slot==="RING"\):d==="STANDARDS"\?Ue\.filter\(C=>C\.artifact\.slot==="WEAPON_1H"\|\|C\.artifact\.slot==="WEAPON_2H"\|\|C\.artifact\.slot==="SHIELD"\):d==="DOCTRINE"\?Ue\.filter\(C=>C\.artifact\.slot==="SCROLL"\|\|C\.artifact\.slot==="ACCESSORY"\):d==="WEAPON"\?Ue\.filter\(C=>C\.artifact\.slot==="WEAPON_1H"\|\|C\.artifact\.slot==="WEAPON_2H"\):d==="ARMOR_SHIELD"\?Ue\.filter\(C=>C\.artifact\.slot==="ARMOR"\|\|C\.artifact\.slot==="SHIELD"\):d==="ACCESSORY"\?Ue\.filter\(C=>C\.artifact\.slot==="RING"\|\|C\.artifact\.slot==="SCROLL"\|\|C\.artifact\.slot==="ACCESSORY"\):Ue,\[Ue,d\]\)/;

const newLeCode = `le=b.useMemo(()=>{if(d==="ALL")return Ue;if(d==="OFFENSIVE")return Ue.filter(C=>{const s=C.artifact.slot;return s==="WEAPON"||s==="WEAPON_1H"||s==="WEAPON_2H"||s==="RANGED_WEAPON"||s==="NAVAL_RAM"||(C.artifact.bonusAttack&&C.artifact.bonusAttack>0)});if(d==="DEFENSIVE")return Ue.filter(C=>{const s=C.artifact.slot;return s==="SHIELD"||s==="ARMOR"||s==="HELMET"||s==="CUIRASS"||s==="LORICA"||s==="OFF_HAND"||s==="PARMA"||(C.artifact.bonusDefense&&C.artifact.bonusDefense>0)});if(d==="UTILITY")return Ue.filter(C=>{const s=C.artifact.slot;return s==="RING"||s==="AMULET"||s==="SIGNET"||s==="SCROLL"||s==="ACCESSORY"||s==="SIEGE_EQUIPMENT"||s==="ASTROLABE"||s==="LEDGER"||s==="DOCTRINE"||s==="AUXILIARY"||(!C.artifact.bonusAttack&&!C.artifact.bonusDefense)});if(d==="EQUIPPED")return Ue.filter(C=>C.isEquipped);if(d==="HOLD")return Ue.filter(C=>!C.isEquipped);if(d==="REGALIA"||d==="ARMOR")return Ue.filter(C=>C.artifact.slot==="ARMOR"||C.artifact.slot==="RING"||C.artifact.slot==="HELMET");if(d==="STANDARDS"||d==="WEAPON")return Ue.filter(C=>C.artifact.slot==="WEAPON_1H"||C.artifact.slot==="WEAPON_2H"||C.artifact.slot==="SHIELD"||C.artifact.slot==="NAVAL_RAM");if(d==="DOCTRINE")return Ue.filter(C=>C.artifact.slot==="SCROLL"||C.artifact.slot==="ACCESSORY"||C.artifact.slot==="SIEGE_EQUIPMENT");return Ue},[Ue,d])`;

if (oldLeRegex.test(code)) {
  code = code.replace(oldLeRegex, newLeCode);
  console.log("Replaced le memo filtering logic successfully!");
} else {
  console.log("Flexible replace for le memo...");
  code = code.replace(/le=b\.useMemo\(\(\)=>d==="ALL"\?[^,]+,\[Ue,d\]\)/, newLeCode);
}

// 2. Update category tabs array in JSX
console.log("2. Updating category tabs list in JSX...");

const oldTabsStr = `[{id:"ALL",label:\`ALL RELICS (\${Ue.length})\`},{id:"EQUIPPED",label:\`EQUIPPED (\${W})\`},{id:"HOLD",label:\`CARGO HOLD (\${P.length})\`},{id:"REGALIA",label:"👑 REGALIA"},{id:"STANDARDS",label:"⚔️ STANDARDS"},{id:"DOCTRINE",label:"📜 DOCTRINE"},{id:"DICE",label:\`ALEA DICE (\${E.length})\`},{id:"COMMODITIES",label:"TRADE CARGO"},{id:"MATERIALS",label:"FORGE MATERIALS"}]`;

const newTabsStr = `[
  {id:"ALL",label:\`ALL RELICS (\${Ue.length})\`,icon:"🏛️"},
  {id:"OFFENSIVE",label:"⚔️ OFFENSIVE",icon:"⚔️"},
  {id:"DEFENSIVE",label:"🛡️ DEFENSIVE",icon:"🛡️"},
  {id:"UTILITY",label:"📜 UTILITY & NAUTICAL",icon:"📜"},
  {id:"EQUIPPED",label:\`⚡ EQUIPPED (\${W})\`,icon:"⚡"},
  {id:"HOLD",label:\`📦 CARGO HOLD (\${P.length})\`,icon:"📦"},
  {id:"DICE",label:\`🎲 ALEA DICE (\${E.length})\`,icon:"🎲"},
  {id:"COMMODITIES",label:"🏺 TRADE CARGO",icon:"🏺"},
  {id:"MATERIALS",label:"⚒️ FORGE MATERIALS",icon:"⚒️"}
]`;

if (code.includes(oldTabsStr)) {
  code = code.replace(oldTabsStr, newTabsStr);
  console.log("Replaced category tabs list in JSX successfully!");
} else {
  console.log("Flexible replace for category tabs list...");
  code = code.replace(/\[\{id:"ALL",label:\`ALL RELICS[^\}]+\}\]/, newTabsStr);
}

// Write back updated code
fs.writeFileSync(bundlePath, code, 'utf8');
console.log("=== TABBED CATEGORY FILTERING SYSTEM COMPLETE ===");
