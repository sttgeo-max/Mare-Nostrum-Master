const fs = require('fs');
const path = require('path');

console.log("=== FIXING ISDAWN VARIABLE SCOPE & ATMOSPHERE LAYER POSITION ===");

const files = ['public/assets/index-V33.js', 'dist/assets/index-V33.js'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let b = fs.readFileSync(file, 'utf8');

  // 1. Add fallback definitions for time of day / weather variables at top of nm (CombatModal)
  const nmStart = `nm=({enemy:t,player:s,setPlayer:a,onClose:r,isDetachment:o=!1,locationName:l})=>{`;
  const nmVars = `nm=({enemy:t,player:s,setPlayer:a,onClose:r,isDetachment:o=!1,locationName:l})=>{
  const tod = String(s?.timeOfDay || "DIES").toUpperCase();
  const isDawn = tod === "AURORA" || tod === "DAWN";
  const isDusk = tod === "CREPUSCULUM" || tod === "DUSK" || tod === "VESPER";
  const isNight = tod === "NOX" || tod === "NIGHT";
  const isDies = !isDawn && !isDusk && !isNight;
  const isNaval = typeof isSea !== "undefined" ? isSea : true;
  const isFog = String(s?.weather || "").toUpperCase().includes("NEBULA") || String(s?.weather || "").toUpperCase().includes("FOG");
  const isStorm = String(s?.weather || "").toUpperCase().includes("TEMPESTAS") || String(s?.weather || "").toUpperCase().includes("STORM");
`;

  if (b.includes(nmStart)) {
    b = b.replace(nmStart, nmVars);
    console.log("SUCCESS: Injected time-of-day scope safety variables into nm (CombatModal) in", file);
  } else {
    console.log("nmStart not matched directly, searching for nm=...");
    let pNm = b.indexOf("nm=({enemy:");
    if (pNm !== -1) {
      let pNmBrace = b.indexOf("=>{", pNm);
      if (pNmBrace !== -1) {
        let oldNmHead = b.substring(pNm, pNmBrace + 3);
        b = b.replace(oldNmHead, oldNmHead + `
  const tod = String(s?.timeOfDay || "DIES").toUpperCase();
  const isDawn = tod === "AURORA" || tod === "DAWN";
  const isDusk = tod === "CREPUSCULUM" || tod === "DUSK" || tod === "VESPER";
  const isNight = tod === "NOX" || tod === "NIGHT";
  const isDies = !isDawn && !isDusk && !isNight;
  const isNaval = typeof isSea !== "undefined" ? isSea : true;
  const isFog = String(s?.weather || "").toUpperCase().includes("NEBULA") || String(s?.weather || "").toUpperCase().includes("FOG");
  const isStorm = String(s?.weather || "").toUpperCase().includes("TEMPESTAS") || String(s?.weather || "").toUpperCase().includes("STORM");
`);
        console.log("SUCCESS: Updated nm head in", file);
      }
    }
  }

  // 2. Remove any misplaced out-of-scope shadows/weather layers after BattleTheatreV2
  const misplacedMarker = `// =========================================================================\n              // === MASTERWORK ATMOSPHERIC EFFECTS, WEATHER & TIME-OF-DAY SYSTEM ===`;
  if (b.includes(misplacedMarker)) {
    let pMarker = b.indexOf(misplacedMarker);
    let pMarkerEnd = b.indexOf("// =========================================================================", pMarker + 100);
    if (pMarkerEnd === -1) pMarkerEnd = b.indexOf("e.jsxs(\"header\"", pMarker);
    if (pMarkerEnd !== -1) {
      let snippetToRemove = b.substring(pMarker, pMarkerEnd);
      b = b.replace(snippetToRemove, "");
      console.log("SUCCESS: Removed misplaced out-of-scope atmosphere snippet from", file);
    }
  }

  fs.writeFileSync(file, b, 'utf8');
  console.log("SUCCESS: Saved updated file", file);
});

console.log("=== COMPLETED ISDAWN VARIABLE SCOPE FIX ===");
