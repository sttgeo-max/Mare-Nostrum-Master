const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING FINAL CLEANUP PASS (MAP & UI REFINE) ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. REDUCE DECORATIVE TERRAIN MARKS (20-25%)
// Target desertPattern and grittyMapPattern
console.log("- Reducing terrain marks in SVG patterns...");
js = js.replace(
  'id:"desertPattern",width:"100",height:"100",patternUnits:"userSpaceOnUse",children:[e.jsx("path",{d:"M 10 20 Q 20 15 30 20 T 50 20 M 60 70 Q 75 65 90 70 M 20 80 Q 30 75 40 80 M 70 30 Q 80 25 90 30",stroke:"#a88b62",strokeWidth:"0.6",fill:"none",opacity:"0.12"}),e.jsx("path",{d:"M 0 40 Q 15 35 30 40 T 60 40 M 40 90 Q 55 85 70 90 T 100 90 M 80 50 Q 90 45 100 50",stroke:"#b39765",strokeWidth:"0.8",fill:"none",opacity:"0.25"})',
  'id:"desertPattern",width:"100",height:"100",patternUnits:"userSpaceOnUse",children:[e.jsx("path",{d:"M 10 20 Q 20 15 30 20 T 50 20 M 60 70 Q 75 65 90 70",stroke:"#a88b62",strokeWidth:"0.5",fill:"none",opacity:"0.08"}),e.jsx("path",{d:"M 0 40 Q 15 35 30 40 T 60 40",stroke:"#b39765",strokeWidth:"0.6",fill:"none",opacity:"0.15"})'
);

// Reduce circles in desertPattern
js = js.replace(
  'e.jsx("circle",{cx:"15",cy:"25",r:"1.2",fill:"#b39765",opacity:"0.15"}),e.jsx("circle",{cx:"45",cy:"50",r:"1",fill:"#b39765",opacity:"0.3"}),e.jsx("circle",{cx:"75",cy:"15",r:"1",fill:"#b39765",opacity:"0.3"}),e.jsx("circle",{cx:"85",cy:"80",r:"1.2",fill:"#b39765",opacity:"0.15"})',
  'e.jsx("circle",{cx:"15",cy:"25",r:"1",fill:"#b39765",opacity:"0.08"}),e.jsx("circle",{cx:"75",cy:"15",r:"0.8",fill:"#b39765",opacity:"0.12"})'
);

// Reduce grittyMapPattern
js = js.replace(
  'id:"grittyMapPattern",width:"180",height:"180",patternUnits:"userSpaceOnUse",children:[e.jsx("path",{d:"M 12 15 L 14 16 M 45 75 L 46 77 M 95 35 L 97 36 M 130 110 L 132 111 M 150 45 L 151 47 M 60 145 L 62 146",stroke:"#26170c",strokeWidth:"0.5",opacity:"0.10"}),e.jsx("circle",{cx:"20",cy:"40",r:"0.9",fill:"#3d2716",opacity:"0.15"}),e.jsx("circle",{cx:"80",cy:"90",r:"0.8",fill:"#3d2716",opacity:"0.3"}),e.jsx("circle",{cx:"140",cy:"30",r:"0.7",fill:"#3d2716",opacity:"0.15"}),e.jsx("circle",{cx:"110",cy:"130",r:"0.8",fill:"#3d2716",opacity:"0.3"})]',
  'id:"grittyMapPattern",width:"180",height:"180",patternUnits:"userSpaceOnUse",children:[e.jsx("path",{d:"M 12 15 L 14 16 M 95 35 L 97 36 M 150 45 L 151 47",stroke:"#26170c",strokeWidth:"0.4",opacity:"0.06"}),e.jsx("circle",{cx:"20",cy:"40",r:"0.7",fill:"#3d2716",opacity:"0.08"}),e.jsx("circle",{cx:"140",cy:"30",r:"0.6",fill:"#3d2716",opacity:"0.08"})]'
);

// 2. REDUCE INACTIVE DESTINATION MARKERS (10-15%)
console.log("- Reducing city markers count and visibility...");
// Remove some cities from j0
const citiesToRemove = ['Augusta Treverorum', 'Sirmium', 'Salona', 'Philippi', 'Pergamum', 'Panormus'];
citiesToRemove.forEach(city => {
  const regex = new RegExp(`\\{name:"${city}",[^}]+\\},?`, 'g');
  js = js.replace(regex, '');
});

// Dim the remaining markers
js = js.replace(
  'pointerEvents:"none",opacity:"0.68",children:j0.map',
  'pointerEvents:"none",opacity:"0.42",children:j0.map'
);
// Thinner marker outlines
js = js.replace(
  'e.jsx("circle",{r:"2.2",fill:"#fef08a",stroke:"#451a03",strokeWidth:"0.8"})',
  'e.jsx("circle",{r:"2",fill:"#fef08a",stroke:"#451a03",strokeWidth:"0.5",opacity:"0.6"})'
);

// 3. THIN GOLD OUTLINES IN JS
console.log("- Thinning gold outlines in JS...");
js = js.replaceAll('border border-[#C9A351]', 'border border-[#C9A351]/35');
js = js.replaceAll('border-2 border-[#C9A351]', 'border-[1.2px] border-[#C9A351]/40');
js = js.replaceAll('shadow-[0_0_10px_rgba(245,158,11,0.5)]', 'shadow-[0_0_6px_rgba(245,158,11,0.22)]');

// 4. ITALY AREA ADJUSTMENTS
console.log("- Refining Italy city placements...");
// Neapolis: x:1135, y:355 -> x:1130, y:370
js = js.replace('name:"Neapolis",x:1135,y:355', 'name:"Neapolis",x:1130,y:370');
// Ariminum: x:1155, y:230 -> x:1165, y:245
js = js.replace('name:"Ariminum",x:1155,y:230', 'name:"Ariminum",x:1165,y:245');

console.log("Validating updated bundle with esbuild...");
esbuild.transformSync(js, { loader: "jsx" });


fs.writeFileSync(bundlePath, js, "utf8");

// Sync to dist
const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
}

console.log("=== FINAL CLEANUP PASS COMPLETE ===");
