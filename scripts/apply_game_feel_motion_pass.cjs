const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== APPLYING MARE NOSTRUM PREMIUM GAME FEEL, MOTION & INTERACTION PASS ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// ----------------------------------------------------
// 1. MAP PANNING & NATIVE INERTIA PHYSICS (SECTION 2)
// ----------------------------------------------------
// A. Native iOS friction: change sluggish 1.4 decay to responsive 5.0 decay
const oldInertiaDecay = "const ue=Math.exp(-1.4*Zt);Ks.current*=ue,hs.current*=ue,Math.hypot(Ks.current,hs.current)<.02&&(ta.current=!1,Ks.current=0,hs.current=0)";
const newInertiaDecay = "const ue=Math.exp(-5.0*Zt);Ks.current*=ue,hs.current*=ue,Math.hypot(Ks.current,hs.current)<.035&&(ta.current=!1,Ks.current=0,hs.current=0)";
if (js.includes(oldInertiaDecay)) {
  js = js.replace(oldInertiaDecay, newInertiaDecay);
  
} else if (js.includes(newInertiaDecay)) {
  
} else {
  console.warn("WARN: Could not find oldInertiaDecay.");
}

// B. Restrained release velocity clamp: limit max release velocity from 7.5 to 2.8 px/ms
const oldVelocityClamp = "const Ct=ze>7.5?7.5/ze:1;Ks.current=ct*Ct,hs.current=we*Ct,ta.current=!0";
const newVelocityClamp = "const Ct=ze>2.8?2.8/ze:1;Ks.current=ct*Ct,hs.current=we*Ct,ta.current=!0";
if (js.includes(oldVelocityClamp)) {
  js = js.replace(oldVelocityClamp, newVelocityClamp);
  
} else if (js.includes(newVelocityClamp)) {
  
} else {
  console.warn("WARN: Could not find oldVelocityClamp.");
}

// C. Synchronize parallax layers in lockstep with map transform in gameLoop (eliminates lag/snapping)
const oldPanTransform = "k.current&&(ne!==ft||ee!==R)&&(k.current.style.transform=`translate3d(${-ft}px, ${-R}px, 0)`)";
const newPanTransform = "(ne!==ft||ee!==R)&&(k.current&&(k.current.style.transform=`translate3d(${-ft}px, ${-R}px, 0)`),I.current&&(I.current.style.transform=`translate3d(${-ft*.15}px, ${-R*.15}px, 0)`),E.current&&(E.current.style.transform=`translate3d(${-ft*.2}px, ${-R*.2}px, 0)`))";
if (js.includes(oldPanTransform)) {
  js = js.replace(oldPanTransform, newPanTransform);
  
} else if (js.includes(newPanTransform)) {
  
} else {
  console.warn("WARN: Could not find oldPanTransform.");
}

// ----------------------------------------------------
// 2. UNIT MOVEMENT: GROUNDED DELIBERATE & ARRIVAL ACKNOWLEDGEMENT (SECTION 3)
// ----------------------------------------------------
// A. Acknowledge departure & arrival timestamps
const oldMovementFinish = "let wt=!1;os&&(os.x!==0||os.y!==0)&&(we.iter??0)>0?_r(os.x,os.y)||(wt=!0):De.current&&De.current.length>0&&(we.iter??0)>0?(Za(),ws.current||(wt=!0)):wt=!0;";
const newMovementFinish = "let wt=!1;os&&(os.x!==0||os.y!==0)&&(we.iter??0)>0?_r(os.x,os.y)||(wt=!0):De.current&&De.current.length>0&&(we.iter??0)>0?(Za(),ws.current||(wt=!0)):(wt=!0,typeof window!==\"undefined\"&&(window.__mnUnitArrival=performance.now()));";
if (js.includes(oldMovementFinish)) {
  js = js.replace(oldMovementFinish, newMovementFinish);
  
} else if (js.includes(newMovementFinish)) {
  
} else {
  console.warn("WARN: Could not find oldMovementFinish.");
}

// B. Grounded land movement (remove 6% bob) & arrival settle (2.8% scale) in gameLoop
const oldUnitTokenTransform = "const pe=F.current;if(pe){let $=0,ue=1;Te.current===\"sea\"?ze?$=Math.max(-15,Math.min(15,ja.current.x/50*12)):$=Math.sin(Date.now()*.002)*1.8:ze&&(ue=1+Math.abs(Math.sin(Date.now()*.012))*.06,$=Math.max(-6,Math.min(6,ja.current.x/50*5))),pe.style.transform=`translate3d(${St}px, ${Ct}px, 0) translate(-50%, -50%) rotate(${$.toFixed(2)}deg) scale(${ue.toFixed(3)})`;";
const newUnitTokenTransform = `const pe=F.current;if(pe){
  let $=0,ue=1;
  const nowMs=performance.now();
  const arrElapsed=nowMs-(window.__mnUnitArrival||0);
  if(Te.current==="sea"){
    if(ze){
      $=Math.max(-8,Math.min(8,ja.current.x/50*7));
      ue=1.015;
    } else {
      $=Math.sin(nowMs*.0016)*1.2;
      ue=1.0;
    }
  } else {
    if(ze){
      ue=1.012;
      $=Math.max(-3,Math.min(3,ja.current.x/50*2.5));
    } else {
      ue=1.0;
      $=0;
    }
  }
  if(arrElapsed<220){
    const arrP=arrElapsed/220;
    ue+=Math.sin(arrP*Math.PI)*0.028;
  }
  pe.style.transform=\`translate3d(\${St}px, \${Ct}px, 0) translate(-50%, -50%) rotate(\${$.toFixed(2)}deg) scale(\${ue.toFixed(3)})\`;`;

if (js.includes(oldUnitTokenTransform)) {
  js = js.replace(oldUnitTokenTransform, newUnitTokenTransform);
  
} else if (js.includes(newUnitTokenTransform)) {
  
} else {
  console.warn("WARN: Could not find oldUnitTokenTransform.");
}

// ----------------------------------------------------
// 3. CAMERA CHOREOGRAPHY: SAFE VIEWPORT & OPTICAL CENTERING (SECTION 5)
// ----------------------------------------------------
const oldRrFunc = "rr=b.useCallback((V,ne,ee=!1)=>{if(Xs.current={x:V,y:ne},pa.current=!1,Ks.current=0,hs.current=0,ta.current=!1,Ea.current=performance.now()+750,ee){const be=Mt.w||(typeof window<\"u\"?window.innerWidth:1e3),Ie=Mt.h||(typeof window<\"u\"?window.innerHeight:768),Pe=Math.max(Wt,Math.min(Et,V*Je-be/2)),Ke=zr*Je,ct=Ke<=Ie?(Ke-Ie)/2:Math.max(0,Math.min(Ke-Ie,ne*Je-Ie/2));Rt.current=Pe,Ft.current=ct,k.current&&(k.current.style.transform=`translate3d(${-Pe}px, ${-ct}px, 0)`)}},[Je,Wt,Et,Mt.w,Mt.h])";
const newRrFunc = `rr=b.useCallback((V,ne,ee=!1)=>{
  const be=Mt.w||(typeof window<"u"?window.innerWidth:1e3);
  const Ie=Mt.h||(typeof window<"u"?window.innerHeight:768);
  if(!ee){
    const sX=V*Je-Rt.current;
    const sY=ne*Je-Ft.current;
    const padX=be*0.16;
    if(sX>=padX&&sX<=(be-padX)&&sY>=64&&sY<=(Ie-84)){
      return;
    }
  }
  Xs.current={x:V,y:ne};
  pa.current=!1;
  Ks.current=0;
  hs.current=0;
  ta.current=!1;
  Ea.current=performance.now()+450;
  if(ee){
    const Pe=Math.max(Wt,Math.min(Et,V*Je-be/2));
    const Ke=zr*Je;
    const optY=ne*Je-(Ie/2-14);
    const ct=Ke<=Ie?(Ke-Ie)/2:Math.max(0,Math.min(Ke-Ie,optY));
    Rt.current=Pe;
    Ft.current=ct;
    k.current&&(k.current.style.transform=\`translate3d(\${-Pe}px, \${-ct}px, 0)\`);
    I.current&&(I.current.style.transform=\`translate3d(\${-Pe*.15}px, \${-ct*.15}px, 0)\`);
    E.current&&(E.current.style.transform=\`translate3d(\${-Pe*.2}px, \${-ct*.2}px, 0)\`);
  }
},[Je,Wt,Et,Mt.w,Mt.h])`;

if (js.includes(oldRrFunc)) {
  js = js.replace(oldRrFunc, newRrFunc);
  
} else if (js.includes("sX>=padX&&sX<=(be-padX)")) {
  
} else {
  console.warn("WARN: Could not find oldRrFunc.");
}

// ----------------------------------------------------
// 4. TIME-OF-DAY SYSTEM: COLOR-PRESERVING LIGHTING (SECTION 6)
// ----------------------------------------------------
const pUlStart = js.indexOf("Ul={AVRORA:");
if (pUlStart !== -1) {
  const pUlEnd = js.indexOf("},Vl=", pUlStart);
  if (pUlEnd !== -1) {
    const newUlContent = 'Ul={AVRORA:"linear-gradient(to bottom, rgba(251, 113, 133, 0.09) 0%, rgba(251, 146, 60, 0.05) 50%, rgba(254, 240, 138, 0.02) 100%)",DIES:"linear-gradient(to bottom, rgba(254, 240, 138, 0.015) 0%, transparent 100%)",VESPER:"linear-gradient(to bottom, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.04) 40%, rgba(30, 41, 59, 0.04) 100%)",NOX:"linear-gradient(to bottom, rgba(15, 23, 42, 0.22) 0%, rgba(30, 58, 138, 0.14) 50%, rgba(15, 23, 42, 0.24) 100%)",AVRORA_PRIMA:"linear-gradient(to bottom, rgba(251, 113, 133, 0.09) 0%, rgba(251, 146, 60, 0.05) 50%, rgba(254, 240, 138, 0.02) 100%)",MANE:"linear-gradient(to bottom, rgba(254, 243, 199, 0.05) 0%, rgba(253, 230, 138, 0.02) 50%, transparent 100%)",MERIDIES:"linear-gradient(to bottom, rgba(251, 191, 36, 0.04) 0%, rgba(245, 158, 11, 0.02) 60%, transparent 100%)",CREPUSCULUM:"linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 0%, rgba(67, 56, 202, 0.05) 50%, rgba(30, 27, 75, 0.06) 100%)"}';
    js = js.substring(0, pUlStart) + newUlContent + js.substring(pUlEnd + 1);
    
  }
}

// In mp layer: switch NOX mixBlendMode from destructive "multiply" to "soft-light"
const oldMpLayer = 'e.jsx("div",{className:"absolute inset-0 transition-[background] duration-1000 ease-linear",style:{background:o,mixBlendMode:n?"multiply":"normal"}})';
const newMpLayer = 'e.jsx("div",{className:"absolute inset-0 transition-[background] duration-700 ease-out",style:{background:o,mixBlendMode:n?"soft-light":"normal"}})';
if (js.includes(oldMpLayer)) {
  js = js.replace(oldMpLayer, newMpLayer);
  
} else if (js.includes(newMpLayer)) {
  
} else {
  console.warn("WARN: Could not find oldMpLayer.");
}

// ----------------------------------------------------
// 5. COMBAT MOTION LANGUAGE & ATTACK SEQUENCE (SECTIONS 8, 9, 10)
// ----------------------------------------------------
// A. Upgrade tokenVariants: crisp, decisive physical impulse (no rubbery cartoon wobble)
const pTokenVar = js.indexOf("tokenVariants = {");
if (pTokenVar !== -1) {
  const pTokenVarEnd = js.indexOf("};", pTokenVar);
  if (pTokenVarEnd !== -1) {
    const newTokenVariantsCode = `tokenVariants = {
    idle: { x: 0, y: 0, rotate: 0, scale: 1, transition: { type: "spring", stiffness: 500, damping: 28 } },
    attackPlayer: { x: 45, rotate: 6, scale: 1.08, transition: { type: "spring", stiffness: 480, damping: 24 } },
    attackEnemy: { x: -45, rotate: -6, scale: 1.08, transition: { type: "spring", stiffness: 480, damping: 24 } },
    ramPlayer: { x: 65, rotate: 3, scale: 1.12, transition: { type: "spring", stiffness: 520, damping: 22 } },
    ramEnemy: { x: -65, rotate: -3, scale: 1.12, transition: { type: "spring", stiffness: 520, damping: 22 } },
    shootPlayer: { x: -14, rotate: -3, scale: 0.98, transition: { type: "spring", stiffness: 450, damping: 22 } },
    shootEnemy: { x: 14, rotate: 3, scale: 0.98, transition: { type: "spring", stiffness: 450, damping: 22 } },
    hitPlayer: { x: -16, rotate: -6, scale: 0.96, transition: { type: "spring", stiffness: 650, damping: 26 } },
    hitEnemy: { x: 16, rotate: 6, scale: 0.96, transition: { type: "spring", stiffness: 650, damping: 26 } },
    dead: { y: 40, scale: 0.65, rotate: 35, filter: "grayscale(90%) brightness(0.4)", transition: { duration: 0.6, ease: "easeOut" } }
  };`;
    js = js.substring(0, pTokenVar) + newTokenVariantsCode + js.substring(pTokenVarEnd + 2);
    
  }
}

// B. Player tactical card attack sequence: smooth weighted strike (380ms melee, 460ms ram, 480ms projectile, 800-950ms recovery)
const pPlayerAttack = js.indexOf("if (weaponAnim === 'arrow_fire') {");
if (pPlayerAttack !== -1) {
  const pPlayerAttackEnd = js.indexOf("const critChance", pPlayerAttack);
  if (pPlayerAttackEnd !== -1) {
    const newPlayerAttackCode = `var attackerRecovery = 800;
      hitDelay = 220;

      if (weaponAnim === 'arrow_fire') {
        setPlayerAnim('shoot');
        spawnFX(false, 'arrow_fire_travel');
        hitDelay = 480;
        attackerRecovery = 950;
        impactFX = 'arrow_fire_hit';
      } else if (weaponAnim === 'javelin_launch') {
        setPlayerAnim('shoot');
        spawnFX(false, 'javelin_launch_travel');
        hitDelay = 480;
        attackerRecovery = 950;
        impactFX = 'javelin_launch_hit';
      } else if (weaponAnim === 'fire_spray') {
        setPlayerAnim('attack');
        spawnFX(false, 'fire_spray');
        hitDelay = 360;
        attackerRecovery = 850;
        impactFX = 'fire_burn';
      } else if (weaponAnim === 'lightning_bolt') {
        setPlayerAnim('attack');
        hitDelay = 260;
        attackerRecovery = 750;
        impactFX = 'lightning_bolt';
      } else if (weaponAnim === 'ram_impact') {
        setPlayerAnim('ram');
        hitDelay = 460;
        attackerRecovery = 880;
        impactFX = 'ram_impact';
      } else {
        setPlayerAnim('attack');
        hitDelay = 380;
        attackerRecovery = 800;
        impactFX = 'sword_slash';
      }

      setTimeout(() => { setPlayerAnim('idle'); }, attackerRecovery);

      `;
    js = js.substring(0, pPlayerAttack) + newPlayerAttackCode + js.substring(pPlayerAttackEnd);

    // Also remove premature setPlayerAnim('idle') from impact setTimeout in playTacticalCard
    const pNextImpact = js.indexOf("spawnFX(false, impactFX);", pPlayerAttack);
    if (pNextImpact !== -1) {
      const pPrevIdle = js.lastIndexOf("setPlayerAnim('idle');", pNextImpact);
      if (pPrevIdle !== -1 && pNextImpact - pPrevIdle < 60) {
        js = js.substring(0, pPrevIdle) + js.substring(pNextImpact);
      }
    }
  }
}

// B2. Player default ability attack sequence (playAbility): smooth weighted strike
const pPlayAbilityAttack = js.indexOf("if (weaponAnim === 'arrow_fire') {", pPlayerAttack + 100);
if (pPlayAbilityAttack !== -1) {
  const pPlayAbilityEnd = js.indexOf("const isCrit = Math.random() <", pPlayAbilityAttack);
  if (pPlayAbilityEnd !== -1) {
    const newPlayAbilityAttackCode = `var attackerRecovery = 800;
      hitDelay = 220;

      if (weaponAnim === 'arrow_fire') {
        setPlayerAnim('shoot');
        spawnFX(false, 'arrow_fire_travel');
        hitDelay = 480;
        attackerRecovery = 950;
        impactFX = 'arrow_fire_hit';
      } else if (weaponAnim === 'javelin_launch') {
        setPlayerAnim('shoot');
        spawnFX(false, 'javelin_launch_travel');
        hitDelay = 480;
        attackerRecovery = 950;
        impactFX = 'javelin_launch_hit';
      } else if (weaponAnim === 'lightning_bolt') {
        setPlayerAnim('attack');
        hitDelay = 260;
        attackerRecovery = 750;
        impactFX = 'lightning_bolt';
      } else if (weaponAnim === 'ram_impact') {
        setPlayerAnim('ram');
        hitDelay = 460;
        attackerRecovery = 880;
        impactFX = 'ram_impact';
      } else {
        setPlayerAnim('attack');
        hitDelay = 380;
        attackerRecovery = 800;
        impactFX = 'sword_slash';
      }

      setTimeout(() => { setPlayerAnim('idle'); }, attackerRecovery);

      `;
    js = js.substring(0, pPlayAbilityAttack) + newPlayAbilityAttackCode + js.substring(pPlayAbilityEnd);

    // Also remove premature setPlayerAnim('idle') from impact setTimeout in playAbility
    const pNextImpact2 = js.indexOf("spawnFX(false, impactFX);", pPlayAbilityAttack);
    if (pNextImpact2 !== -1) {
      const pPrevIdle2 = js.lastIndexOf("setPlayerAnim('idle');", pNextImpact2);
      if (pPrevIdle2 !== -1 && pNextImpact2 - pPrevIdle2 < 60) {
        js = js.substring(0, pPrevIdle2) + js.substring(pNextImpact2);
      }
    }
  }
}

// C. Enemy attack sequence timing: smooth weighted strike (380ms melee, 460ms ram, 480ms projectile, 800-950ms recovery)
const pEnemyProj = js.indexOf("if (isProj) {");
if (pEnemyProj !== -1) {
  const pEnemyProjEnd = js.indexOf("setTimeout(() => {", pEnemyProj);
  if (pEnemyProjEnd !== -1) {
    const newEnemyProjCode = `var enemyRecovery = 800;

        if (isProj) {
          enemyWeapon = isSea ? 'arrow_fire' : 'javelin_launch';
          setEnemyAnim('shoot');
          spawnFX(true, enemyWeapon === 'arrow_fire' ? 'arrow_fire_enemy_travel' : 'javelin_launch_enemy_travel');
          hitDelay = 480;
          enemyRecovery = 950;
          impactFX = enemyWeapon === 'arrow_fire' ? 'arrow_fire_hit' : 'javelin_launch_hit';
        } else if (isRam) {
          enemyWeapon = 'ram_impact';
          setEnemyAnim('ram');
          hitDelay = 460;
          enemyRecovery = 880;
          impactFX = 'ram_impact';
        } else {
          setEnemyAnim('attack');
          hitDelay = 380;
          enemyRecovery = 800;
          impactFX = 'sword_slash';
        }

        setTimeout(() => { setEnemyAnim('idle'); }, enemyRecovery);
        `;
    js = js.substring(0, pEnemyProj) + newEnemyProjCode + js.substring(pEnemyProjEnd);

    // Also remove premature setEnemyAnim('idle') from impact setTimeout in endTurn
    const pNextEnemyImpact = js.indexOf("spawnFX(true, impactFX);", pEnemyProj);
    if (pNextEnemyImpact !== -1) {
      const pPrevEnemyIdle = js.lastIndexOf("setEnemyAnim('idle');", pNextEnemyImpact);
      if (pPrevEnemyIdle !== -1 && pNextEnemyImpact - pPrevEnemyIdle < 60) {
        js = js.substring(0, pPrevEnemyIdle) + js.substring(pNextEnemyImpact);
      }
    }
  }
}

// D. Target hit recovery: return smoothly to gameplay state (750ms instead of truncating at 220ms) across all combat handlers
let hitRecovCount = 0;
while (js.includes("setTimeout(() => setEnemyAnim('idle'), 450)")) {
  js = js.replace("setTimeout(() => setEnemyAnim('idle'), 450)", "setTimeout(() => setEnemyAnim('idle'), 750)");
  hitRecovCount++;
}
while (js.includes("setTimeout(() => setPlayerAnim('idle'), 450)")) {
  js = js.replace("setTimeout(() => setPlayerAnim('idle'), 450)", "setTimeout(() => setPlayerAnim('idle'), 750)");
  hitRecovCount++;
}


// E. Floating damage numbers: crisp pop, upward drift, 650ms duration (was 1100ms)
const pFloatText = js.indexOf("floatingText.map(");
if (pFloatText !== -1) {
  const pInit = js.indexOf("initial: {", pFloatText);
  const pChild = js.indexOf("children: ft.text", pFloatText);
  if (pInit !== -1 && pChild !== -1) {
    const newFloatAnim = `initial: { opacity: 0, y: 6, scale: 0.8 },
        animate: { opacity: [0, 1, 1, 0], y: [-6, -26, -38, -46], scale: [0.8, 1.12, 1.05, 0.95] },
        exit: { opacity: 0 },
        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        `;
    js = js.substring(0, pInit) + newFloatAnim + js.substring(pChild);
    
  }
}

// ----------------------------------------------------
// 6. SYNTAX VALIDATION & WRITE
// ----------------------------------------------------
console.log("Validating updated bundle with esbuild...");
esbuild.transformSync(js, { loader: "js" });


fs.writeFileSync(bundlePath, js, "utf8");

// Sync to dist if present
const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
  
}

console.log("=== MARE NOSTRUM PREMIUM GAME FEEL PASS APPLIED SUCCESSFULLY ===");
