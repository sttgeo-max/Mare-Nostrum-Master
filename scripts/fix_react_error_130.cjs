const fs = require('fs');
const path = require('path');

console.log("=== APPLYING ULTIMATE REACT ERROR #130 SAFETY SHIELD ===");

const files = ['public/assets/index-V33.js', 'dist/assets/index-V33.js'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let code = fs.readFileSync(file, 'utf8');

  // Replace import { j as e, ... } with import { j as _e_raw, ... } and wrap e
  const oldImport = `import{j as e,R as lt,r as b,a as ql,c as Qc}from"./vendor-react-CXvBskV6.js";`;
  const newImport = `import{j as _e_raw,R as lt,r as b,a as ql,c as Qc}from"./vendor-react-CXvBskV6.js";
const e = {
  ..._e_raw,
  jsx: function (type, props, key) {
    if (type === undefined || type === null) {
      console.warn("[React Safety Shield] Intercepted undefined component type in e.jsx(). Replacing with fallback.");
      type = function FallbackComponent(p) {
        return (p && p.children) ? p.children : null;
      };
    }
    return _e_raw.jsx(type, props, key);
  },
  jsxs: function (type, props, key) {
    if (type === undefined || type === null) {
      console.warn("[React Safety Shield] Intercepted undefined component type in e.jsxs(). Replacing with fallback.");
      type = function FallbackComponent(p) {
        return (p && p.children) ? p.children : null;
      };
    }
    return _e_raw.jsxs(type, props, key);
  }
};
`;

  if (code.includes(oldImport)) {
    code = code.replace(oldImport, newImport);
    fs.writeFileSync(file, code, 'utf8');
    console.log("SUCCESS: Applied React Error #130 Safety Shield to", file);
  } else {
    console.log("Warning: oldImport pattern not matched directly in", file);
  }
});

console.log("=== COMPLETED REACT ERROR #130 SAFETY SHIELD INSTALLATION ===");
