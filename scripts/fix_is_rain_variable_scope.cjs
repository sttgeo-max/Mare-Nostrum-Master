const fs = require('fs');
const path = require('path');

console.log("=== FIXING ISRAIN & ALL WEATHER VARIABLES IN COMBAT MODAL SCOPE ===");

const files = ['public/assets/index-V33.js', 'dist/assets/index-V33.js'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let b = fs.readFileSync(file, 'utf8');

  // Find start of nm (CombatModal)
  let pNm = b.indexOf("nm=({enemy:t,player:s");
  if (pNm !== -1) {
    let pNmBrace = b.indexOf("=>{", pNm);
    if (pNmBrace !== -1) {
      let pNmEndBrace = b.indexOf("b.useEffect", pNmBrace);
      if (pNmEndBrace !== -1) {
        let oldNmHead = b.substring(pNm, pNmEndBrace);
        let newNmHead = `nm=({enemy:t,player:s,setPlayer:a,onClose:r,isDetachment:o=!1,locationName:l})=>{
  const tod = String(s?.timeOfDay || "DIES").toUpperCase();
  const isDawn = tod === "AURORA" || tod === "DAWN";
  const isDusk = tod === "CREPUSCULUM" || tod === "DUSK" || tod === "VESPER";
  const isNight = tod === "NOX" || tod === "NIGHT";
  const isDies = !isDawn && !isDusk && !isNight;
  const isNaval = !o && t?.domain === "sea";
  const wStr = String(s?.weather || "").toUpperCase();
  const isRain = wStr.includes("RAIN") || wStr.includes("PLUVIA") || wStr.includes("PLVVIA");
  const isStorm = wStr.includes("STORM") || wStr.includes("TEMPESTAS");
  const isFog = wStr.includes("FOG") || wStr.includes("NEBULA") || wStr.includes("NEBVLA") || wStr.includes("MIST");
  const isSirocco = wStr.includes("SIROCCO") || wStr.includes("DUST") || wStr.includes("PULVIS") || wStr.includes("WIND");
  const isSnow = wStr.includes("SNOW") || wStr.includes("NIX") || wStr.includes("WINTER");
  `;
        b = b.replace(oldNmHead, newNmHead);
        fs.writeFileSync(file, b, 'utf8');
        console.log("SUCCESS: Replaced nm header with complete weather & time-of-day variables in", file);
      }
    }
  }
});

console.log("=== COMPLETED ISRAIN & WEATHER VARIABLES FIX ===");
