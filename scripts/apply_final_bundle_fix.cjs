const fs = require('fs');
const path = require('path');

console.log("=== APPLYING FINAL COMPREHENSIVE BUNDLE FIX (WITH GLOBAL LT DEFINITION) ===");

const bundlePath = path.join(__dirname, '..', 'public', 'assets', 'index-V37.js');
let code = fs.readFileSync(bundlePath, 'utf8');

// 1. Remove any duplicate var CompareArtifactsModal at pos 0 if present
if (code.startsWith("var CompareArtifactsModal =")) {
  console.log("-> Cleaning duplicate var CompareArtifactsModal from top of bundle...");
  const endIdx = code.indexOf(";function RelicAltarTab");
  if (endIdx !== -1) {
    code = code.substring(endIdx + 1);
  } else {
    const endIdx2 = code.indexOf(";function CompareArtifactsModal");
    if (endIdx2 !== -1) {
      code = code.substring(endIdx2 + 1);
    }
  }
}

// 2. Remove topBoilerplate if already prepended so we can re-prepend cleanly
const flag = "/* GLOBAL_BOILERPLATE_V1 */";
if (code.includes(flag)) {
  console.log("-> Removing existing boilerplate header...");
  const endFlagIdx = code.indexOf("/* END_GLOBAL_BOILERPLATE_V1 */");
  if (endFlagIdx !== -1) {
    code = code.substring(endFlagIdx + "/* END_GLOBAL_BOILERPLATE_V1 */".length).trim();
  }
}

// 3. Replace all lt. references with b.
console.log("-> Replacing lt. references with b. (React alias)...");
code = code.replace(/\blt\./g, "b.");

// 4. Prepend complete topBoilerplate (including var lt = b;)
console.log("-> Injecting global React/DOM/Icon/LT safety boilerplate at head...");
const topBoilerplate = `/* GLOBAL_BOILERPLATE_V1 */
var b = (typeof window !== "undefined" && window.React) || globalThis.React;
var lt = b;
var e = (typeof window !== "undefined" && window.ReactJSX) || {
  jsx: function(type, props, key) { return b ? b.createElement(type, key !== undefined ? Object.assign({}, props, { key }) : props) : null; },
  jsxs: function(type, props, key) { return b ? b.createElement(type, key !== undefined ? Object.assign({}, props, { key }) : props) : null; },
  Fragment: (b && b.Fragment) || "Fragment"
};
var Qc = (typeof window !== "undefined" && window.ReactDOM) || globalThis.ReactDOM || { createRoot: function() { return { render: function() {} }; } };
var DummyIcon = function(p) { return e.jsx("span", p); };
var Mn = DummyIcon, Pt = DummyIcon, xt = DummyIcon, as = DummyIcon, br = DummyIcon, Yt = DummyIcon, bs = DummyIcon, md = DummyIcon, Un = DummyIcon, Kt = DummyIcon;
if (typeof ia === "undefined") var ia = [];
if (typeof jr === "undefined") var jr = {};
if (typeof Bt === "undefined") var Bt = [];
/* END_GLOBAL_BOILERPLATE_V1 */
`;

code = topBoilerplate + "\n" + code;

fs.writeFileSync(bundlePath, code, 'utf8');
console.log("-> Updated public/assets/index-V37.js with final fixes.");

// 5. Run build to sync dist and all version assets
require('./sync_production_build.cjs');

console.log("=== FINAL BUNDLE FIX COMPLETED SUCCESSFULLY ===");
