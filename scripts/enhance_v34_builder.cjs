const fs = require("fs");
const path = require("path");

let script = fs.readFileSync(path.join(__dirname, "build_clean_v34.cjs"), "utf8");

// Add additional tab routing to Catalogus in v34TransformStep:
const oldRoutingMarker = `  // Upgrade Catalogus in Mx:`;
const newRoutingCode = `  // Upgrade Catalogus in Mx:
  // Subtab initial routing
  const oldInitCat = 'if(init==="BESTIARIVM"||init==="RELIQVIAE"||init==="NAVALIA")return"CATALOGUS";';
  const newInitCat = 'if(init==="BESTIARIVM"||init==="RELIQVIAE"||init==="NAVALIA"||init==="WARSHIPS"||init==="LEGIONS"||init==="EXERCITUS")return"CATALOGUS";';
  if (cleanJs.includes(oldInitCat)) {
    cleanJs = cleanJs.replace(oldInitCat, newInitCat);
    
  }

  const oldEffectCat = 'else if(dt==="NAVALIA"||dt==="SHIPS"){m("CATALOGUS");setCatTab("NAVALIA")}';
  const newEffectCat = 'else if(dt==="NAVALIA"||dt==="SHIPS"||dt==="WARSHIPS"){m("CATALOGUS");setCatTab("WARSHIPS")}else if(dt==="LEGIONS"||dt==="EXERCITUS"||dt==="COHORTS"){m("CATALOGUS");setCatTab("LEGIONS")}';
  if (cleanJs.includes(oldEffectCat)) {
    cleanJs = cleanJs.replace(oldEffectCat, newEffectCat);
    
  }
`;

if (!script.includes("Extended Catalogus initial route check")) {
  script = script.replace(oldRoutingMarker, newRoutingCode);
}

// Add Warships and Legions quick buttons into FloatingMiniMenu CODEX view
const oldCodexBtnAnchor = 'btnContent("laurel", "Imperial Doctrines & Talents", "", N)';
const newCodexBtnAnchor = `btnContent("laurel", "Imperial Doctrines & Talents", "", N)
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); a(); if (oCodexTab) oCodexTab("WARSHIPS"); else { r("CODEX"); setTimeout(() => window.dispatchEvent(new CustomEvent("open-codex-tab", { detail: "WARSHIPS" })), 50); } },
                  className: btnStyle + " hover:border-cyan-400/80",
                  children: btnContent("ship_trireme_imperialis", "Warships & Imperial Navalia", "")
                }),
                e.jsx("button", {
                  type: "button",
                  onClick: () => { v.playClick(); a(); if (oCodexTab) oCodexTab("LEGIONS"); else { r("CODEX"); setTimeout(() => window.dispatchEvent(new CustomEvent("open-codex-tab", { detail: "LEGIONS" })), 50); } },
                  className: btnStyle + " hover:border-amber-400/80",
                  children: btnContent("legion_cohort", "Imperial Legions & Cohorts", "")`;

if (script.includes(oldCodexBtnAnchor) && !script.includes("Warships & Imperial Navalia")) {
  script = script.replace(oldCodexBtnAnchor, newCodexBtnAnchor);
  console.log("Added Warships & Legions quick launch buttons into FloatingMiniMenu!");
}

fs.writeFileSync(path.join(__dirname, "build_clean_v34.cjs"), script, "utf8");
console.log("Updated build_clean_v34.cjs successfully!");
