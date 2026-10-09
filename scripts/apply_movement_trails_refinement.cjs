const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== REFINING LAND & SEA MOVEMENT TRAILS (FINE OCHRE & THIN BLUE-WHITE) ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. UPGRADE THE PLANNED ROUTE PATH PLANNER BLOCK (SINGLE SVG PATH + OCCASIONAL CHEVRONS + DOUBLE-RING DESTINATION MARKER)
const startIdx = js.indexOf('fe.length>0&&e.jsx("svg",');
if (startIdx !== -1) {
  const endIdx = js.indexOf('})()})', startIdx) + 6;
  const exactBlock = js.substring(startIdx, endIdx);

  const upgradedPlannedBlock = `fe.length>0&&e.jsx("svg",{className:"absolute inset-0 pointer-events-none z-20 w-full h-full",children:(()=>{
    const V=[];
    let ne=t.iter??6,ee=!1;
    fe.forEach((Ke,ct)=>{
      const we=ca(Ke);
      if(we){
        const cellData=ar().get(Ke);
        const isMtn=cellData?.terrain==="mountain";
        const Ct=isMtn?2:1;
        const Zt=ne>=Ct;
        const Ht=!ee&&Zt&&(ne-Ct<1)&&(ct<fe.length-1);
        Ht&&(ee=!0);
        ne=Math.max(0,ne-Ct);
        V.push({
          x:we.center.x*Je,
          y:we.center.y*Je,
          reachable:Zt,
          isTurnMilestone:Ht,
          terrain:cellData?.terrain,
          isRoad:we.isRoad||we.terrain==="road"||cellData?.terrain==="road"
        });
      }
    });
    const be=_s(t.position.x,t.position.y);
    let Ie={x:t.position.x*Je,y:t.position.y*Je};
    if(be){
      const Ke=ca(be.cellId);
      Ke&&(Ie={x:Ke.center.x*Je,y:Ke.center.y*Je})
    }
    const startCellData=be?ar().get(be.cellId):null;
    const Pe=[{x:Ie.x,y:Ie.y,reachable:!0,terrain:startCellData?.terrain},...V];
    const pathD=Pe.map((pt,idx)=>(idx===0?"M ":" L ")+pt.x.toFixed(1)+" "+pt.y.toFixed(1)).join("");
    const isLandRoute=ge===\"land\"||V.some(pt=>pt.terrain===\"land\"||pt.terrain===\"mountain\");
    const chevrons=[];
    Pe.forEach((Ke,ct)=>{
      if(ct===0)return;
      const we=Pe[ct-1];
      const dx=Ke.x-we.x;
      const dy=Ke.y-we.y;
      const len=Math.hypot(dx,dy);
      if(len>15){
        const angle=Math.atan2(dy,dx)*180/Math.PI;
        const mx=we.x+dx*0.5;
        const my=we.y+dy*0.5;
        chevrons.push({mx,my,angle});
      }
    });
    return e.jsxs(\"g\",{children:[
      /* Thin Dark Underglow backing for high contrast readability across all light & dark terrains */
      e.jsx(\"path\",{d:pathD,fill:\"none\",stroke:\"#020617\",strokeWidth:Math.max(2.5,3.2*Je),strokeLinecap:\"round\",strokeLinejoin:\"round\",opacity:0.45}),
      /* Main Planned Line: Fine ochre for land, thin softly colored blue-white for sea. Subtly dashed. */
      e.jsx(\"path\",{d:pathD,fill:\"none\",stroke:isLandRoute?\"#ca8a04\":\"#bae6fd\",strokeWidth:isLandRoute?Math.max(1.2,1.5*Je):Math.max(1.5,1.8*Je),strokeDasharray:\"4 3\",strokeLinecap:\"round\",strokeLinejoin:\"round\",opacity:0.95}),
      /* Directional Chevrons in the center of long path segments */
      chevrons.map((ch,idx)=>e.jsx(\"path\",{d:\"M -2.5 -1.8 L 0.5 0 L -2.5 1.8\",fill:\"none\",stroke:isLandRoute?\"#ca8a04\":\"#bae6fd\",strokeWidth:1.2,strokeLinecap:\"round\",strokeLinejoin:\"round\",opacity:0.75,transform:\"translate(\"+ch.mx.toFixed(1)+\",\"+ch.my.toFixed(1)+\") rotate(\"+ch.angle.toFixed(1)+\")\"},\"chevron_\"+idx)),
      V.map((Ke,ct)=>{
        const St=ct===V.length-1;
        const dotColor=isLandRoute?\"#ca8a04\":\"#bae6fd\";
        const strokeColor=isLandRoute?\"#1c0a02\":\"#020617\";
        return e.jsxs(\"g\",{children:[
          Ke.isTurnMilestone&&e.jsxs(\"g\",{transform:\"translate(\"+Ke.x+\",\"+Ke.y+\")\",children:[
            e.jsx(\"circle\",{r:7.5,fill:\"#0c0a09\",stroke:\"#ca8a04\",strokeWidth:1.2}),
            e.jsx(\"text\",{textAnchor:\"middle\",dominantBaseline:\"central\",fill:\"#fde047\",fontSize:\"7.5\",fontWeight:\"bold\",fontFamily:\"Cinzel, serif\",children:\"I\"})
          ]}),
          !Ke.isTurnMilestone&&!St&&e.jsx(\"circle\",{cx:Ke.x,cy:Ke.y,r:2.2,fill:dotColor,stroke:strokeColor,strokeWidth:1.0}),
          /* Clear Golden Double-Ring Destination Marker at the end of route */
          St&&e.jsxs(\"g\",{transform:\"translate(\"+Ke.x+\",\"+Ke.y+\")\",children:[
            e.jsx(\"circle\",{r:5.5,fill:\"none\",stroke:dotColor,strokeWidth:1.2}),
            e.jsx(\"circle\",{r:2.2,fill:dotColor})
          ]})
        ]},\"path_dot_\"+ct)
      })
    ]})
  })()})`;

  js = js.replace(exactBlock, upgradedPlannedBlock);
  
} else {
  console.warn("WARN: Could not find planned route SVG block!");
}

// 2. UPGRADE THE IN-PROGRESS MOVEMENT TRAIL (CONTINUOUS FINE OCHRE FOR LAND, THIN BLUE-WHITE FOR SEA, NATURALLY FADING BEHIND UNIT)
const oldGameLoopBlock = 'Te.current==="sea"?(f.current.style.stroke="rgba(224, 242, 254, 0.45)",f.current.style.strokeWidth=`${Math.max(2,6*Je)}px`,f.current.style.strokeDasharray="none"):(f.current.style.stroke="rgba(120, 53, 15, 0.4)",f.current.style.strokeWidth=`${Math.max(2,4*Je)}px`,f.current.style.strokeDasharray=`${4*Je} ${6*Je}`)';
const upgradedGameLoopBlock = 'Te.current==="sea"?(f.current.style.stroke="rgba(224, 242, 254, 0.8)",f.current.style.strokeWidth=`${Math.max(1.5,2.2*Je)}px`,f.current.style.strokeDasharray="none"):(f.current.style.stroke="rgba(217, 119, 6, 0.85)",f.current.style.strokeWidth=`${Math.max(1.2,1.8*Je)}px`,f.current.style.strokeDasharray="none")';

if (js.includes(oldGameLoopBlock)) {
  js = js.replace(oldGameLoopBlock, upgradedGameLoopBlock);
  
} else {
  console.warn("WARN: Could not find in-progress movement trail block in gameLoop!");
}

console.log("Verifying upgraded bundle syntax with esbuild...");
esbuild.transformSync(js, { loader: "jsx" });


// Write back to index-V33.js
fs.writeFileSync(bundlePath, js, "utf8");


// Sync to dist if dist exists
const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
  
}
