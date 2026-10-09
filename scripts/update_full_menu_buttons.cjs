const fs = require("fs");
const path = require("path");

const builderPath = path.join(__dirname, "build_clean_v34.cjs");
let script = fs.readFileSync(builderPath, "utf8");

// 1. Ensure _e directly switches screens to ARMA, CODEX, TREASURY:
const oldScreenSwitch = 'if(S==="ARMA"||S==="CODEX"||S==="TREASURY"){if(h==="MAP"){setMiniMenu(cur=>cur===S?null:S);return}}setMiniMenu(null),U(!1),fe(!1),me(!1),X(!1),se(!1),K(!1),Ge(!1),y(S);';
const newScreenSwitch = 'setMiniMenu(null),U(!1),fe(!1),me(!1),X(!1),se(!1),K(!1),Ge(!1),y(S);';
if (!script.includes(newScreenSwitch)) {
  script = script.replace(oldScreenSwitch, newScreenSwitch);
}

// 2. Add explicit string replacements inside cleanJs in buildClean():
const directMenuPatch = `
  // Direct Full Menus for Solidus, Codex, and Arma:
  const oldArmaHudClick = 'id:"btn-hud-arma",onClick:()=>{v.playClick(),window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu",{detail:"ARMA"}))}';
  const newArmaHudClick = 'id:"btn-hud-arma",onClick:()=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}if(typeof o==="function")o("ARMA");else window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu",{detail:"ARMA"}))}';
  if (cleanJs.includes(oldArmaHudClick)) {
    cleanJs = cleanJs.replace(oldArmaHudClick, newArmaHudClick);
    
  }

  const oldCodexTopClick = 'id:"top-hud-codex-btn",type:"button",onClick:()=>{v.playClick(),window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu",{detail:"CODEX"}))}';
  const newCodexTopClick = 'id:"top-hud-codex-btn",type:"button",onClick:()=>{try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}if(typeof r==="function")r("CODEX");else window.dispatchEvent(new CustomEvent("open-codex-tab",{detail:"PRINCIPIA"}))}';
  if (cleanJs.includes(oldCodexTopClick)) {
    cleanJs = cleanJs.replace(oldCodexTopClick, newCodexTopClick);
    
  }

  const oldSolidusTopClick = 'onClick:()=>{v.playClick(),window.dispatchEvent(new CustomEvent("toggle-floating-mini-menu",{detail:"TREASURY"}))}';
  const newSolidusTopClick = 'onClick:()=>{try{if(typeof v!=="undefined"&&(v.playCoin||v.playCoinClink))(v.playCoin?v.playCoin():v.playCoinClink());}catch(e){}if(typeof r==="function")r("TREASURY");}';
  if (cleanJs.includes(oldSolidusTopClick)) {
    cleanJs = cleanJs.replace(oldSolidusTopClick, newSolidusTopClick);
    
  }

  // Bypass miniMenu in screen switcher _e:
  const oldUnderScoreE = 'if(S==="ARMA"||S==="CODEX"||S==="TREASURY"){if(h==="MAP"){setMiniMenu(cur=>cur===S?null:S);return}}setMiniMenu(null),U(!1),fe(!1),me(!1),X(!1),se(!1),K(!1),Ge(!1),y(S);';
  const newUnderScoreE = 'setMiniMenu(null),U(!1),fe(!1),me(!1),X(!1),se(!1),K(!1),Ge(!1),y(S);';
  if (cleanJs.includes(oldUnderScoreE)) {
    cleanJs = cleanJs.replace(oldUnderScoreE, newUnderScoreE);
    
  }

  // Ensure toggle-floating-mini-menu listener also opens full screens directly:
  const oldToggleListener = 'if(d==="ARMA"||d==="CODEX"||d==="TREASURY"){setMiniMenu(cur=>cur===d?null:d)}else if(!d||d==="CLOSE"){setMiniMenu(null)}';
  const newToggleListener = 'if(d==="ARMA"||d==="CODEX"||d==="TREASURY"){setMiniMenu(null);_e(d);}else if(!d||d==="CLOSE"){setMiniMenu(null)}';
  if (cleanJs.includes(oldToggleListener)) {
    cleanJs = cleanJs.replace(oldToggleListener, newToggleListener);
    
  }
`;

const insertPos = script.indexOf("console.log(\"Validating updated bundle with esbuild...\");");
if (insertPos !== -1 && !script.includes("Direct Full Menus for Solidus, Codex, and Arma")) {
  script = script.substring(0, insertPos) + directMenuPatch + "\n  " + script.substring(insertPos);
}

fs.writeFileSync(builderPath, script, "utf8");

