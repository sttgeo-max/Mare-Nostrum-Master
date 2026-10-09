const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== APPLYING BULLETPROOF CITY UNFREEZE, LOOT & TURN RECOVERY ENGINE ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. FIX REACT HOOKS ORDER VIOLATION IN vc (Loot & Spoils Modal)
const oldVcStart = 'vc=({isOpen:t,solidiGained:s,famaGained:a,suppliesGained:r,desertGemsGained:o=0,artifact:l=null,cardDropped:n=null,diceDropped:c=null,enemyName:i="Hostile Fleet",enemyLatinName:p,onClaim:x})=>{const[u,d]=b.useState("initial"),[m,h]=b.useState(0),[y,g]=b.useState(!1);';
const newVcStart = 'vc=({isOpen:t,solidiGained:s,famaGained:a,suppliesGained:r,desertGemsGained:o=0,artifact:l=null,cardDropped:n=null,diceDropped:c=null,enemyName:i="Hostile Fleet",enemyLatinName:p,onClaim:x})=>{const[u,d]=b.useState("initial"),[m,h]=b.useState(0),[y,g]=b.useState(!1),[F,I]=b.useState(!1);';
if (js.includes(oldVcStart)) {
  js = js.replace(oldVcStart, newVcStart);
  
}

const oldVcHookInReturn = 'T=l?la(l):[],[F,I]=b.useState(!1);return e.jsxs("div",{children:[e.jsxs(ie.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0}';
const newVcHookInReturn = 'T=l?la(l):[];return e.jsxs("div",{children:[e.jsxs(ie.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0}';
if (js.includes(oldVcHookInReturn)) {
  js = js.replace(oldVcHookInReturn, newVcHookInReturn);
  
}

// 2. BULLETPROOF Relic & Artifact Claim button in vc modal to ALWAYS clear locks
const oldClaimHandler = 'onClick:()=>{g(!1),setTimeout(()=>x(),180)}';
const newClaimHandler = 'onClick:()=>{try{g(!1);x();window.dispatchEvent(new CustomEvent("combat-exit"));window.dispatchEvent(new CustomEvent("unfreeze-engine"));}catch(e){console.warn("Claim error:",e);x();}}';
if (js.includes(oldClaimHandler)) {
  js = js.replace(oldClaimHandler, newClaimHandler);
  
}

// 3. UPGRADE gt (ENEMY PATROL AI & TURN RESOLUTION IN ax)
const oldGt = 'gt=b.useCallback(()=>{a(S=>({...S,isEnemyTurn:!0})),setTimeout(()=>(se(S=>S.map(Q=>{const te=Q.enemyUnit?.domain==="sea";if(te){const Ce=[{dx:Q.vx||1,dy:Q.vy||0},{dx:-(Q.vx||1),dy:Q.vy||0},{dx:0,dy:1},{dx:0,dy:-1},{dx:1,dy:0},{dx:-1,dy:0}],Se=[];for(const Ne of Ce){const Xe=Q.x+Ne.dx,dt=Q.y+Ne.dy;Xe>=0&&Xe<k&&dt>=1&&dt<=M&&_(Xe,dt)&&Se.push({x:Xe,y:dt,vx:Ne.dx,vy:Ne.dy})}if(Se.length>0){const Ne=Se.find(dt=>dt.vx===Q.vx&&dt.vy===Q.vy);if(Ne&&Math.random()<.6)return{...Q,x:Ne.x,y:Ne.y,vx:Ne.vx,vy:Ne.vy};const Xe=Se[Math.floor(Math.random()*Se.length)];return{...Q,x:Xe.x,y:Xe.y,vx:Xe.vx,vy:Xe.vy}}return Q}const te=[{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:0},{dx:1,dy:0}],Ce=[];for(const Se of te){const Ne=Q.x+Se.dx,Xe=Q.y+Se.dy;Ne>=0&&Ne<k&&Xe>=1&&Xe<=7&&!_(Ne,Xe)&&f(Ne,Xe)&&Ce.push({x:Ne,y:Xe,vx:Se.dx,vy:Se.dy})}if(Ce.length>0){const Se=Ce.find(Xe=>Xe.vx===Q.vx&&Xe.vy===Q.vy);if(Se&&Math.random()<.55)return{...Q,x:Se.x,y:Se.y,vx:Se.vx,vy:Se.vy};const Ne=Ce[Math.floor(Math.random()*Ce.length)];return{...Q,x:Ne.x,y:Ne.y,vx:Ne.vx,vy:Ne.vy}}return Q})),setTimeout(()=>{const S=(W.current.turn||1)+1,Q=An(S),te=Cn(W.current.timeOfDay||"DIES"),Ce=Bi(W.current.weather||"SERENVM",Q),Se=Fi(W.current.windDirection||"EURUS");a(Ne=>({...Ne,iter:Math.max(1,Ne.maxIter||6),isEnemyTurn:!1,turn:S,season:Q,timeOfDay:te,weather:Ce,windDirection:Se})),le.current=!1,Y("YOUR TURN: MOVEMENT RESTORED","")},450))},[f,a])';

const newGt = `const gt=b.useCallback(()=>{
  if(W.current.isEnemyTurn){
    a(Ne=>({...Ne,iter:Math.max(1,Ne.maxIter||6),isEnemyTurn:!1}));
    le.current=!1;
    return;
  }
  try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}
  a(S=>({...S,isEnemyTurn:!0}));
  setTimeout(()=>{
    try{
      se(Ne=>Ne.map(Xe=>{
        try{
          const dt=Xe.enemyUnit?.domain==="sea";
          if(dt){
            const Tt=[{dx:Xe.vx||1,dy:Xe.vy||0},{dx:-(Xe.vx||1),dy:Xe.vy||0},{dx:0,dy:1},{dx:0,dy:-1},{dx:1,dy:0},{dx:-1,dy:0}],Gt=[];
            for(const Jt of Tt){
              const us=Xe.x+Jt.dx,it=Xe.y+Jt.dy;
              us>=0&&us<k&&it>=1&&it<=M&&_(us,it)&&Gt.push({x:us,y:it,vx:Jt.dx,vy:Jt.dy});
            }
            if(Gt.length>0){
              const Jt=Gt.find(it=>it.vx===Xe.vx&&it.vy===Xe.vy);
              if(Jt&&Math.random()<.6)return{...Xe,x:Jt.x,y:Jt.y,vx:Jt.vx,vy:Jt.vy};
              const us=Gt[Math.floor(Math.random()*Gt.length)];
              return{...Xe,x:us.x,y:us.y,vx:us.vx,vy:us.vy};
            }
            return Xe;
          }
          const at=[{dx:0,dy:-1},{dx:0,dy:1},{dx:-1,dy:0},{dx:1,dy:0}],Lt=[];
          for(const Tt of at){
            const Gt=Xe.x+Tt.dx,Jt=Xe.y+Tt.dy;
            Gt>=0&&Gt<k&&Jt>=1&&Jt<=7&&!_(Gt,Jt)&&f(Gt,Jt)&&Lt.push({x:Gt,y:Jt,vx:Tt.dx,vy:Tt.dy});
          }
          if(Lt.length>0){
            const Tt=Lt.find(Jt=>Jt.vx===Xe.vx&&Jt.vy===Xe.vy);
            if(Tt&&Math.random()<.55)return{...Xe,x:Tt.x,y:Tt.y,vx:Tt.vx,vy:Tt.vy};
            const Gt=Lt[Math.floor(Math.random()*Lt.length)];
            return{...Xe,x:Gt.x,y:Gt.y,vx:Gt.vx,vy:Gt.vy};
          }
          return Xe;
        }catch(e){return Xe;}
      }));
    }catch(e){console.warn("Enemy patrol move error:",e);}
    try{
      const S=(W.current.turn||1)+1,Q=An(S),te=Cn(W.current.timeOfDay||"DIES"),Ce=Bi(W.current.weather||"SERENVM",Q),Se=Fi(W.current.windDirection||"EURUS");
      a(Ne=>({...Ne,iter:Math.max(1,Ne.maxIter||6),isEnemyTurn:!1,turn:S,season:Q,timeOfDay:te,weather:Ce,windDirection:Se}));
      le.current=!1;
      Y("YOUR TURN: MOVEMENT RESTORED","");
    }catch(e){\n      a(Ne=>({...Ne,iter:Math.max(1,Ne.maxIter||6),isEnemyTurn:!1}));\n      le.current=!1;\n    }\n  },380);\n},[f,_,k,M,a]);\n// Watchdog: Auto-advance turn when iter drops to 0 (Safely declared AFTER gt)\nb.useEffect(()=>{\n  if((s.iter??6)<=0&&!s.isEnemyTurn&&(s.autoTurnSwitching??!0)){\n    const tm=setTimeout(()=>{\n      if((W.current.iter??6)<=0&&!W.current.isEnemyTurn){\n        gt();\n      }\n    },240);\n    return()=>clearTimeout(tm);\n  }\n},[s.iter,s.isEnemyTurn,s.autoTurnSwitching,gt])`;

if (js.includes(oldGt)) {
  js = js.replace(oldGt, newGt);
  
}

// 4. UPGRADE C (MOVEMENT IN ax) WITH DEBOUNCE AUTO-RECOVERY & NON-BLOCKING RESETS
const oldCStart = 'lastCityMoveTime=b.useRef(0),C=b.useCallback((S,Q)=>{if(S===0&&Q===0)return!1;if(Date.now()-lastCityMoveTime.current>250)le.current=!1;if(le.current||W.current.isEnemyTurn)return!1;';
const newCStart = 'lastCityMoveTime=b.useRef(0),C=b.useCallback((S,Q)=>{if(S===0&&Q===0)return!1;if(Date.now()-lastCityMoveTime.current>200)le.current=!1;if(W.current.isEnemyTurn){if(Date.now()-lastCityMoveTime.current>600){a(p=>({...p,isEnemyTurn:!1,iter:Math.max(1,p.iter??6)}));le.current=!1;}return!1;}if(le.current)return!1;';
if (js.includes(oldCStart)) {
  js = js.replace(oldCStart, newCStart);
  
}

// 5. UPGRADE Qe (TOUCH / TILE CLICK IN ax) WITH RECOVERY & NON-LOCKING RELIC CLEAR
const oldQeStart = 'Qe=b.useCallback((S,Q)=>{if(s.isEnemyTurn||le.current||u!==null||y!==null)return;';
const newQeStart = 'Qe=b.useCallback((S,Q)=>{if(Date.now()-lastCityMoveTime.current>200)le.current=!1;if(s.isEnemyTurn&&Date.now()-lastCityMoveTime.current>600){a(p=>({...p,isEnemyTurn:!1,iter:Math.max(1,p.iter??6)}));le.current=!1;}if(y!==null){g(null);le.current=!1;}if(s.isEnemyTurn||le.current||u!==null)return;';
if (js.includes(oldQeStart)) {
  js = js.replace(oldQeStart, newQeStart);
  
}

// 6. INJECT RESCUE WATCHDOGS INTO ax (Safe from TDZ)
const oldOnCeBlock = 'b.useEffect(()=>{const onCe=()=>{le.current=!1;Ue.current=[];We.current={x:0,y:0};$e.current&&(clearInterval($e.current),$e.current=null);Oe.current&&(clearTimeout(Oe.current),Oe.current=null);Z(null);qe([]);_e(null);d(null);g(null);A(!1);a(pr=>({...pr,isEnemyTurn:!1,iter:Math.max(6,pr.iter??6)}));};window.addEventListener("combat-exit",onCe);return()=>window.removeEventListener("combat-exit",onCe);},[a]);';

const newOnCeBlock = `b.useEffect(()=>{
  const onCe=()=>{
    le.current=!1;
    Ue.current=[];
    We.current={x:0,y:0};
    $e.current&&(clearInterval($e.current),$e.current=null);
    Oe.current&&(clearTimeout(Oe.current),Oe.current=null);
    Z(null);
    qe([]);
    _e(null);
    d(null);
    g(null);
    A(!1);
    a(pr=>({...pr,isEnemyTurn:!1,iter:Math.max(6,pr.iter??6)}));
  };
  window.addEventListener("combat-exit",onCe);
  window.addEventListener("unfreeze-engine",onCe);
  return()=>{
    window.removeEventListener("combat-exit",onCe);
    window.removeEventListener("unfreeze-engine",onCe);
  };
},[a]);
// Failsafe watchdog: Recover if isEnemyTurn stuck for > 1.2s without active battle
b.useEffect(()=>{
  if(s.isEnemyTurn){
    const rescueTimer=setTimeout(()=>{
      if(W.current.isEnemyTurn){
        le.current=!1;
        a(prev=>({...prev,isEnemyTurn:!1,iter:Math.max(1,prev.iter??6)}));
        Y("MOVEMENT RESTORED","","imperial");
      }
    },1200);
    return()=>clearTimeout(rescueTimer);
  }
},[s.isEnemyTurn,a]);`;

if (js.includes(oldOnCeBlock)) {
  js = js.replace(oldOnCeBlock, newOnCeBlock);
  
}

// 7. ENHANCE FINIS / HOURGLASS BUTTON IN BOTTOM HUD (d0)
const oldHourglass = 'e.jsx(Vr,{onClick:y,disabled:a.isEnemyTurn,variant:a.isEnemyTurn?"crimson":"gold",emblem:"hourglass",title:a.isEnemyTurn?"Hostes Movet (Enemy Turn...)":"Finis (End Turn)",showGlow:!a.isEnemyTurn&&(a.iter??0)<=1})';
const newHourglass = 'e.jsx(Vr,{onClick:()=>{if(a.isEnemyTurn){try{if(typeof v!=="undefined"&&v.playClick)v.playClick();}catch(e){}window.dispatchEvent(new CustomEvent("unfreeze-engine"));window.dispatchEvent(new CustomEvent("combat-exit"));}else{y();}},variant:a.isEnemyTurn?"crimson":"gold",emblem:"hourglass",title:a.isEnemyTurn?"Hostes Movet (Tap to Force Restore)":"Finis (End Turn)",showGlow:!a.isEnemyTurn&&(a.iter??0)<=1})';
if (js.includes(oldHourglass)) {
  js = js.replace(oldHourglass, newHourglass);
  
}

// 8. ENHANCE vc MODAL RENDER IN ax WITH CATALOG FALLBACK AND LOCK CLEAR
const oldVcRenderInAx = 'y&&e.jsx(vc,{isOpen:!0,artifact:ia.find(S=>S.id===y),solidiGained:0,famaGained:0,suppliesGained:0,onClaim:()=>g(null)})';
const newVcRenderInAx = 'y&&e.jsx(vc,{isOpen:!0,artifact:ia.find(S=>S.id===y)||(typeof Ro!=="undefined"?Ro.find(S=>S.id===y):null)||null,solidiGained:0,famaGained:0,suppliesGained:0,onClaim:()=>{g(null);le.current=!1;}})';
if (js.includes(oldVcRenderInAx)) {
  js = js.replace(oldVcRenderInAx, newVcRenderInAx);
  
}

console.log("Validating updated bundle with esbuild...");
esbuild.transformSync(js, { loader: "jsx" });


fs.writeFileSync(bundlePath, js, "utf8");


const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
  
}
