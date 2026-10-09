const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== APPLYING GEOGRAPHIC MAP COORDINATES & LABEL PLACEMENT PASS ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. REDUCE CONTRAST & DENSITY OF SMALL REPEATED TERRAIN MARKS IN DEF PATTERNS
const oldDesertPattern = 'stroke:"#c4a876",strokeWidth:"1.2",fill:"none",opacity:"0.35"';
const newDesertPattern = 'stroke:"#a88b62",strokeWidth:"0.6",fill:"none",opacity:"0.12"';
if (js.includes(oldDesertPattern)) {
  js = js.replace(oldDesertPattern, newDesertPattern);
  
}

const oldLandHatchPattern = 'stroke:"#3d2716",strokeWidth:"0.7",opacity:"0.22"';
const newLandHatchPattern = 'stroke:"#2c1a0e",strokeWidth:"0.4",opacity:"0.08"';
if (js.includes(oldLandHatchPattern)) {
  js = js.replace(oldLandHatchPattern, newLandHatchPattern);
  
}

const oldGrittyPattern = 'stroke:"#26170c",strokeWidth:"1.2",opacity:"0.35"';
const newGrittyPattern = 'stroke:"#26170c",strokeWidth:"0.5",opacity:"0.10"';
if (js.includes(oldGrittyPattern)) {
  js = js.replace(oldGrittyPattern, newGrittyPattern);
  
}

// 2. QUIETER ROMAN ROADS
const oldRoadsBlock = 'e.jsx("path",{d:le,fill:"none",stroke:"#2c1608",strokeWidth:"3.4",opacity:"0.6",strokeLinejoin:"round",strokeLinecap:"round"}),e.jsx("path",{d:le,fill:"none",stroke:"#ca8a04",strokeWidth:"2.2",opacity:"0.9",strokeLinejoin:"round",strokeLinecap:"round"}),e.jsx("path",{d:le,fill:"none",stroke:"#fef08a",strokeWidth:"1.0",strokeDasharray:"5 3",opacity:"0.9",strokeLinejoin:"round",strokeLinecap:"round"})';

const newRoadsBlock = 'e.jsx("path",{d:le,fill:"none",stroke:"#78350f",strokeWidth:"1.6",opacity:"0.45",strokeLinejoin:"round",strokeLinecap:"round"}),e.jsx("path",{d:le,fill:"none",stroke:"#fde047",strokeWidth:"0.9",strokeDasharray:"4 3",opacity:"0.60",strokeLinejoin:"round",strokeLinecap:"round"})';

if (js.includes(oldRoadsBlock)) {
  js = js.replace(oldRoadsBlock, newRoadsBlock);
  
}

// 3. CORRECT GEOGRAPHIC LABELS PLACEMENT USING ACCURATE MAP SVG COORDINATES (2400x1000)
// Locate existing labels group (supports previous or base bundle formats)
let pStart = js.indexOf('e.jsxs("g",{pointerEvents:"none",opacity:"0.88",children:[');
if (pStart === -1) {
  pStart = js.indexOf('e.jsxs("g",{pointerEvents:"none",opacity:"0.35",style:{mixBlendMode:"screen"},children:[');
}

if (pStart !== -1) {
  const pEnd = js.indexOf("]})", pStart);
  if (pEnd !== -1) {
    const oldLabelsGroup = js.substring(pStart, pEnd + 3);

    const newLabelsGroup = `e.jsxs("g",{pointerEvents:"none",opacity:"0.92",children:[` +
      /* LAND REGION LABELS (Positioned strictly on land masses) */
      `e.jsx("text",{x:"440",y:"350",fill:"#fef3c7",stroke:"#1c0a02",strokeWidth:"2.5",paintOrder:"stroke fill",fontSize:"15",fontFamily:"'Cinzel', serif",letterSpacing:"6px",fontWeight:"900",textAnchor:"middle",children:"HISPANIA"}),` +
      `e.jsx("text",{x:"780",y:"80",fill:"#fef3c7",stroke:"#1c0a02",strokeWidth:"2.5",paintOrder:"stroke fill",fontSize:"15",fontFamily:"'Cinzel', serif",letterSpacing:"6px",fontWeight:"900",textAnchor:"middle",children:"GALLIA"}),` +
      `e.jsx("text",{x:"1080",y:"200",fill:"#fef3c7",stroke:"#1c0a02",strokeWidth:"2.5",paintOrder:"stroke fill",fontSize:"14",fontFamily:"'Cinzel', serif",letterSpacing:"6px",fontWeight:"900",textAnchor:"middle",children:"ITALIA"}),` +
      `e.jsx("text",{x:"1360",y:"190",fill:"#fef3c7",stroke:"#1c0a02",strokeWidth:"2.5",paintOrder:"stroke fill",fontSize:"12",fontFamily:"'Cinzel', serif",letterSpacing:"5px",fontWeight:"900",textAnchor:"middle",children:"ILLYRICVM"}),` +
      `e.jsx("text",{x:"1530",y:"460",fill:"#fef3c7",stroke:"#1c0a02",strokeWidth:"2.5",paintOrder:"stroke fill",fontSize:"13",fontFamily:"'Cinzel', serif",letterSpacing:"5px",fontWeight:"900",textAnchor:"middle",children:"GRAECIA"}),` +
      `e.jsx("text",{x:"1950",y:"410",fill:"#fef3c7",stroke:"#1c0a02",strokeWidth:"2.5",paintOrder:"stroke fill",fontSize:"15",fontFamily:"'Cinzel', serif",letterSpacing:"6px",fontWeight:"900",textAnchor:"middle",children:"ASIA"}),` +
      `e.jsx("text",{x:"2260",y:"610",fill:"#fef3c7",stroke:"#1c0a02",strokeWidth:"2.5",paintOrder:"stroke fill",fontSize:"14",fontFamily:"'Cinzel', serif",letterSpacing:"5px",fontWeight:"900",textAnchor:"middle",children:"SYRIA"}),` +
      `e.jsx("text",{x:"1950",y:"920",fill:"#fef3c7",stroke:"#1c0a02",strokeWidth:"2.5",paintOrder:"stroke fill",fontSize:"15",fontFamily:"'Cinzel', serif",letterSpacing:"6px",fontWeight:"900",textAnchor:"middle",children:"AEGYPTVS"}),` +
      `e.jsx("text",{x:"920",y:"680",fill:"#fef3c7",stroke:"#1c0a02",strokeWidth:"2.5",paintOrder:"stroke fill",fontSize:"15",fontFamily:"'Cinzel', serif",letterSpacing:"6px",fontWeight:"900",textAnchor:"middle",children:"AFRICA"}),` +
      `e.jsx("text",{x:"420",y:"680",fill:"#fef3c7",stroke:"#1c0a02",strokeWidth:"2.5",paintOrder:"stroke fill",fontSize:"14",fontFamily:"'Cinzel', serif",letterSpacing:"5px",fontWeight:"900",textAnchor:"middle",children:"MAVRETANIA"}),` +

      /* SEA BASIN LABELS (Positioned strictly over open sea water geometries) */
      `e.jsx("text",{x:"1000",y:"380",fill:"#e0f2fe",stroke:"#02132e",strokeWidth:"2.8",paintOrder:"stroke fill",fontSize:"12",fontFamily:"'Cinzel', serif",letterSpacing:"6px",fontStyle:"italic",fontWeight:"800",textAnchor:"middle",opacity:"0.82",children:"MARE TYRRHENVM"}),` +
      `e.jsx("text",{x:"1370",y:"550",fill:"#e0f2fe",stroke:"#02132e",strokeWidth:"2.8",paintOrder:"stroke fill",fontSize:"13",fontFamily:"'Cinzel', serif",letterSpacing:"6px",fontStyle:"italic",fontWeight:"800",textAnchor:"middle",opacity:"0.85",children:"MARE IONIVM"}),` +
      `e.jsx("text",{x:"1680",y:"480",fill:"#e0f2fe",stroke:"#02132e",strokeWidth:"2.8",paintOrder:"stroke fill",fontSize:"13",fontFamily:"'Cinzel', serif",letterSpacing:"6px",fontStyle:"italic",fontWeight:"800",textAnchor:"middle",opacity:"0.82",children:"MARE AEGAEVM"}),` +
      `e.jsx("text",{x:"2000",y:"160",fill:"#e0f2fe",stroke:"#02132e",strokeWidth:"2.8",paintOrder:"stroke fill",fontSize:"12",fontFamily:"'Cinzel', serif",letterSpacing:"6px",fontStyle:"italic",fontWeight:"800",textAnchor:"middle",opacity:"0.82",children:"PONTVS EVXINVS"}),` +
      `e.jsx("text",{x:"710",y:"340",fill:"#e0f2fe",stroke:"#02132e",strokeWidth:"2.8",paintOrder:"stroke fill",fontSize:"12",fontFamily:"'Cinzel', serif",letterSpacing:"6px",fontStyle:"italic",fontWeight:"800",textAnchor:"middle",opacity:"0.82",children:"MARE BALEARICVM"}),` +
      `e.jsx("text",{x:"880",y:"520",fill:"#fef08a",stroke:"#02132e",strokeWidth:"3.0",paintOrder:"stroke fill",fontSize:"15",fontFamily:"'Cinzel', serif",letterSpacing:"8px",fontWeight:"900",textAnchor:"middle",opacity:"0.78",children:"MARE NOSTRVM"})` +
      `]})`;

    js = js.replace(oldLabelsGroup, newLabelsGroup);
    
  }
}

// 4. REFINE MOBILE CITY MAP READABILITY, WATER HIGHLIGHTS, QUIETER GRIDS, AND MARKERS
console.log("=== REFINE MOBILE CITY MAP READABILITY ===");

// A. Make the city roads darker and more prominent
const oldCityRoadsBase = 'stroke:"#665945",strokeWidth:"26",strokeLinecap:"square",opacity:"0.9"';
const newCityRoadsBase = 'stroke:"#3f2e1e",strokeWidth:"26",strokeLinecap:"square",opacity:"0.95"';
if (js.includes(oldCityRoadsBase)) {
  js = js.replace(oldCityRoadsBase, newCityRoadsBase);
  
}

const oldCityRoadsCurb = 'stroke:"#423727",strokeWidth:"20",strokeLinecap:"square"';
const newCityRoadsCurb = 'stroke:"#20140a",strokeWidth:"20",strokeLinecap:"square"';
if (js.includes(oldCityRoadsCurb)) {
  js = js.replace(oldCityRoadsCurb, newCityRoadsCurb);
  
}

// B. Reduce contrast of decorative ground grid in plains and city blocks
const oldPlainsGrid = 'stroke:"#786c58",strokeWidth:"0.8",opacity:"0.22",strokeDasharray:"6 6"';
const newPlainsGrid = 'stroke:"#4d3d2c",strokeWidth:"0.4",opacity:"0.06",strokeDasharray:"4 8"';
if (js.includes(oldPlainsGrid)) {
  js = js.replace(oldPlainsGrid, newPlainsGrid);
  
}

const oldCityGroundGrid = 'stroke:"#9c8c5c",strokeWidth:"0.8",opacity:"0.25",strokeDasharray:"4 6"';
const newCityGroundGrid = 'stroke:"#5a4a35",strokeWidth:"0.4",opacity:"0.06",strokeDasharray:"4 8"';
if (js.includes(oldCityGroundGrid)) {
  js = js.replace(oldCityGroundGrid, newCityGroundGrid);
  
}

// C. Thin and simplify tree canopies and understory trees
const oldTreeLoop = 'for(let Z=85;Z<255;Z+=15)for(let K=0;K<360;K+=13)if(p()>.3){const qe=K*Math.PI/180,Ge=ce.x+(Z+p()*10-5)*Math.cos(qe),_e=ce.y+(Z+p()*10-5)*Math.sin(qe);';
const newTreeLoop = 'for(let Z=85;Z<255;Z+=24)for(let K=0;K<360;K+=24){const qe=K*Math.PI/180,Ge=ce.x+(Z+p()*10-5)*Math.cos(qe),_e=ce.y+(Z+p()*10-5)*Math.sin(qe);if(p()<(_e<420?0.92:0.74))continue;';
if (js.includes(oldTreeLoop)) {
  js = js.replace(oldTreeLoop, newTreeLoop);
  
}

const oldBlockTreeMarker = '_,y:Ge,type:gt}),p()>.35){';
const newBlockTreeMarker = '_,y:Ge,type:gt}),p()>.85){';
if (js.includes(oldBlockTreeMarker)) {
  js = js.replace(oldBlockTreeMarker, newBlockTreeMarker);
  
}

// D. Quiet decorative objects by reducing opacity of the decorations-layer group
const oldDecorationsLayer = 'id:"decorations-layer",children:';
const newDecorationsLayer = 'id:"decorations-layer",opacity:"0.30",children:';
if (js.includes(oldDecorationsLayer)) {
  js = js.replace(oldDecorationsLayer, newDecorationsLayer);
  
}

// E. Add visual signaling gold highlights & larger touch hit zone for interactive destinations (F0 component)
const oldNodeBaseEllipse = 'e.jsx("ellipse",{cx:"24",cy:"18",rx:"20",ry:"8",fill:"#0c0a09",opacity:"0.45"}),';
const newNodeBaseEllipse = 'e.jsx("ellipse",{cx:"24",cy:"18",rx:"20",ry:"8",fill:"#0c0a09",opacity:"0.45"}),e.jsx("ellipse",{cx:"24",cy:"18",rx:"22",ry:"9",fill:"none",stroke:A?"#f59e0b":"#ca8a04",strokeWidth:"1.2",opacity:A?"0.9":"0.5",strokeDasharray:A?"none":"3 3"}),';
if (js.includes(oldNodeBaseEllipse)) {
  js = js.replace(oldNodeBaseEllipse, newNodeBaseEllipse);
  
}

const oldNodeHitZone = 'className:"relative w-10 h-7 sm:w-12 sm:h-8 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"';
const newNodeHitZone = 'className:"relative w-12 h-9 sm:w-14 sm:h-10 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"';
if (js.includes(oldNodeHitZone)) {
  js = js.replace(oldNodeHitZone, newNodeHitZone);
  
}

// F. Harbor visual centerpiece enhancements (depth highlights, dock outlines, and waves)
const oldCothonHighlights = 'e.jsx("circle",{cx:"450",cy:"720",r:"105",fill:"none",stroke:"#7dd3fc",strokeWidth:"1.5",opacity:"0.4",strokeDasharray:"18 10 24 8"}),e.jsx("circle",{cx:"450",cy:"720",r:"88",fill:"none",stroke:"#bae6fd",strokeWidth:"1.5",opacity:"0.5",strokeDasharray:"14 12 20 10"}),e.jsx("circle",{cx:"450",cy:"720",r:"70",fill:"none",stroke:"#e0f2fe",strokeWidth:"1.2",opacity:"0.45",strokeDasharray:"10 14"}),';
const newCothonHighlights = 'e.jsx("circle",{cx:"450",cy:"720",r:"105",fill:"none",stroke:"#38bdf8",strokeWidth:"2.2",opacity:"0.7",strokeDasharray:"18 10 24 8"}),e.jsx("circle",{cx:"450",cy:"720",r:"88",fill:"none",stroke:"#bae6fd",strokeWidth:"2.2",opacity:"0.75",strokeDasharray:"14 12 20 10"}),e.jsx("circle",{cx:"450",cy:"720",r:"70",fill:"none",stroke:"#ffffff",strokeWidth:"1.8",opacity:"0.65",strokeDasharray:"10 14"}),';
if (js.includes(oldCothonHighlights)) {
  js = js.replace(oldCothonHighlights, newCothonHighlights);
  
}

const oldCothonDockBorders = 'e.jsx("circle",{cx:"450",cy:"720",r:"122",fill:"#8a7960",stroke:"#4d4435",strokeWidth:"2"}),e.jsx("circle",{cx:"450",cy:"720",r:"118",fill:"url(#cothonTurquoiseGrad)",stroke:"#0369a1",strokeWidth:"3"}),';
const newCothonDockBorders = 'e.jsx("circle",{cx:"450",cy:"720",r:"122",fill:"#8a7960",stroke:"#2e2316",strokeWidth:"3"}),e.jsx("circle",{cx:"450",cy:"720",r:"118",fill:"url(#cothonTurquoiseGrad)",stroke:"#103654",strokeWidth:"4.5",strokeOpacity:"0.95"}),';
if (js.includes(oldCothonDockBorders)) {
  js = js.replace(oldCothonDockBorders, newCothonDockBorders);
  
}

const oldBeachWaves = 'e.jsx("path",{d:y,fill:"none",stroke:"#bae6fd",strokeWidth:"3.5",opacity:"0.65",strokeDasharray:"32 16 48 12",transform:"translate(0, 20)",className:"city-wave-1"}),e.jsx("path",{d:y,fill:"none",stroke:"#ffffff",strokeWidth:"3",opacity:"0.75",strokeDasharray:"20 10 40 14",transform:"translate(0, 10)",className:"city-wave-2"}),e.jsx("path",{d:y,fill:"none",stroke:"#f0f9ff",strokeWidth:"3.5",opacity:"0.6",strokeDasharray:"14 8 28 10",transform:"translate(0, 4)",className:"city-wave-3"})';
const newBeachWaves = 'e.jsx("path",{d:y,fill:"none",stroke:"#38bdf8",strokeWidth:"4.5",opacity:"0.8",strokeDasharray:"35 15 50 10",transform:"translate(0, 20)",className:"city-wave-1"}),e.jsx("path",{d:y,fill:"none",stroke:"#e0f2fe",strokeWidth:"2.2",opacity:"0.9",strokeDasharray:"15 35 25 25",transform:"translate(0, 12)",className:"city-wave-specular"}),e.jsx("path",{d:y,fill:"none",stroke:"#ffffff",strokeWidth:"3",opacity:"0.95",strokeDasharray:"20 10 40 14",transform:"translate(0, 8)",className:"city-wave-2"}),e.jsx("path",{d:y,fill:"none",stroke:"#f0f9ff",strokeWidth:"2",opacity:"0.7",strokeDasharray:"14 8 28 10",transform:"translate(0, 4)",className:"city-wave-3"})';
if (js.includes(oldBeachWaves)) {
  js = js.replace(oldBeachWaves, newBeachWaves);
  
}

const oldShoreBeachLine = 'e.jsx("path",{d:y,fill:"none",stroke:"#9a815a",strokeWidth:"3.5",opacity:"0.45"}),';
const newShoreBeachLine = 'e.jsx("path",{d:y,fill:"none",stroke:"#3d2e1f",strokeWidth:"2.8",opacity:"0.7"}),';
if (js.includes(oldShoreBeachLine)) {
  js = js.replace(oldShoreBeachLine, newShoreBeachLine);
  
}


// Validate syntax with esbuild
console.log("Validating updated bundle with esbuild...");
esbuild.transformSync(js, { loader: "jsx" });


fs.writeFileSync(bundlePath, js, "utf8");

// Sync to dist
const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
  
}

console.log("=== GEOGRAPHIC MAP COORDINATES PASS COMPLETE ===");
