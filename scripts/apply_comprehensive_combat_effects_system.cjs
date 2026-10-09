const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== APPLYING MASTERWORK ROMAN SHIPS, LEGIONS, MONSTERS, ANIMAL UNITS & LEVEL PROGRESSION ===");

function applyOptimizedCombatSystem() {
  const targetPath = path.join(__dirname, "../public/assets/index-V33.js");
  let bundle = fs.readFileSync(targetPath, "utf8");

  // 0. Ensure hitDelay is declared safely at top of nm
  const pNmStart = bundle.indexOf("var nm = ({");
  if (pNmStart !== -1 && !bundle.includes("var hitDelay = 120; // safe scope root")) {
    const pNmBody = bundle.indexOf("{", pNmStart);
    bundle = bundle.substring(0, pNmBody + 1) + "\n  var hitDelay = 120; // safe scope root\n" + bundle.substring(pNmBody + 1);
  }

  // 1. Hook up playerStatus, enemyStatus, activeCombatFX, floatingText with high-performance state management
  const hitFxMarker = "const [hitFx, setHitFx] = b.useState([]);";
  const hitFxPos = bundle.indexOf(hitFxMarker);
  if (hitFxPos !== -1 && !bundle.includes("const [totalDamageDealt, setTotalDamageDealt]")) {
    const statusStateCode = `const [hitFx, setHitFx] = b.useState([]);
  const [playerStatus, setPlayerStatus] = b.useState([]);
  const [enemyStatus, setEnemyStatus] = b.useState([]);
  const [activeCombatFX, setActiveCombatFX] = b.useState(null);
  const [totalDamageDealt, setTotalDamageDealt] = b.useState(0);
  const [totalDamageTaken, setTotalDamageTaken] = b.useState(0);
  const [recentEnemyDmg, setRecentEnemyDmg] = b.useState(null);
  const [recentPlayerDmg, setRecentPlayerDmg] = b.useState(null);
  const [deathWardActive, setDeathWardActive] = b.useState(true);

  const applyStatusEffect = (isPlayer, type, duration = 3, val = 8) => {
    const meta = {
      bleed: { name: 'Laceratio', icon: '🩸', color: '#ef4444', label: 'BLEED' },
      poison: { name: 'Venenum', icon: '☠', color: '#22c55e', label: 'POISON (-25% ATK)' },
      fire: { name: 'Ignis', icon: '🔥', color: '#f97316', label: 'BURN (FIRE)' },
      shock: { name: 'Fulmen', icon: '⚡', color: '#38bdf8', label: 'SHOCK (DRAIN AP)' },
      stun: { name: 'Stupefactio', icon: '💫', color: '#93c5fd', label: 'STUN (TURN SKIP)' },
      blind: { name: 'Caecitas', icon: '👁️', color: '#facc15', label: 'BLIND' },
      reflect: { name: 'Aegis Reflexio', icon: '🛡️', color: '#38bdf8', label: 'REFLECT' },
      lifesteal: { name: 'Sanguis', icon: '🩸', color: '#a855f7', label: 'LIFESTEAL' }
    }[type] || { name: type, icon: '⚡', color: '#fbbf24', label: type.toUpperCase() };

    const item = { id: type + '_' + Date.now(), type, name: meta.name, icon: meta.icon, color: meta.color, label: meta.label, turnsLeft: duration, val };
    if (isPlayer) {
      setPlayerStatus(prev => [...prev.filter(e => e.type !== type), item]);
      spawnText(meta.icon + ' ' + meta.label, true, meta.color);
    } else {
      setEnemyStatus(prev => [...prev.filter(e => e.type !== type), item]);
      spawnText(meta.icon + ' ' + meta.label, false, meta.color);
    }
  };

  const processDoTTicks = (forPlayer) => {
    const currentList = forPlayer ? playerStatus : enemyStatus;
    if (!currentList || currentList.length === 0) return;
    const nextList = [];
    currentList.forEach(effect => {
      const tickDmg = effect.val || 8;
      if (effect.type === 'stun') {
        if (effect.turnsLeft > 1) {
          nextList.push({ ...effect, turnsLeft: effect.turnsLeft - 1 });
        }
        return;
      }
      if (forPlayer) {
        setPlayerHp(prev => {
          const next = Math.max(0, prev - tickDmg);
          if (next <= 0) {
            if (deathWardActive) {
              setDeathWardActive(false);
              spawnText("☀️ SOL INVICTUS DEATH WARD ACTIVATED!", true, "#fbbf24");
              spawnFX(true, "buff");
              return 1;
            }
            setPlayerAnim('death');
            setTurn('defeat');
            spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT FALLEN!', true, '#ef4444');
            try { if (typeof v !== 'undefined' && v.playSplinterCrash) v.playSplinterCrash(); } catch(e){}
          }
          return next;
        });
        spawnText(effect.icon + ' -' + tickDmg, true, effect.color);
      } else {
        setEnemyHp(prev => {
          const next = Math.max(0, prev - tickDmg);
          if (next <= 0) {
            setEnemyAnim('death');
            setTurn('victory');
            spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24');
            try {
              if (typeof v !== 'undefined') {
                if (v.playSplinterCrash) v.playSplinterCrash();
                if (v.playVictory) v.playVictory();
              }
            } catch(e){}
          }
          return next;
        });
        spawnText(effect.icon + ' -' + tickDmg, false, effect.color);
      }
      try {
        if (typeof v !== 'undefined') {
          if (effect.type === 'poison' && v.playPoisonHiss) v.playPoisonHiss();
          else if (effect.type === 'bleed' && v.playBleedSlash) v.playBleedSlash();
          else if (effect.type === 'fire' && v.playGreekFireCrackle) v.playGreekFireCrackle();
          else if (effect.type === 'shock' && v.playFulmenShock) v.playFulmenShock();
          else if (effect.type === 'lifesteal') {
            if (v.playLifeStealSiphon) v.playLifeStealSiphon();
            if (!forPlayer) {
              setPlayerHp(prev => Math.min(maxPlayerHp, prev + tickDmg));
              spawnText('+' + tickDmg + ' HP 💚', true, '#22c55e');
            }
          }
        }
      } catch(e){}
      if (effect.turnsLeft > 1) {
        nextList.push({ ...effect, turnsLeft: effect.turnsLeft - 1 });
      }
    });
    if (forPlayer) setPlayerStatus(nextList);
    else setEnemyStatus(nextList);
  };`;
    bundle = bundle.substring(0, hitFxPos) + statusStateCode + bundle.substring(hitFxPos + hitFxMarker.length);
  }

  // 1b. Fast spawnFX
  const pSpawnFxOld = bundle.indexOf("const spawnFX = (isPlayer, type) => {");
  if (pSpawnFxOld !== -1) {
    const pNextAfterSpawnFx = bundle.indexOf("const activeOmen =", pSpawnFxOld) !== -1 ? bundle.indexOf("const activeOmen =", pSpawnFxOld) : (bundle.indexOf("const rollTacticalDice =", pSpawnFxOld) !== -1 ? bundle.indexOf("const rollTacticalDice =", pSpawnFxOld) : bundle.indexOf("const playTacticalCard =", pSpawnFxOld));
    const pSpawnFxEnd = pNextAfterSpawnFx !== -1 ? bundle.lastIndexOf("};", pNextAfterSpawnFx) : bundle.indexOf("};", pSpawnFxOld);
    const newSpawnFxCode = `const spawnFX = (isPlayer, type) => {
    const fxId = Date.now() + Math.random();
    setActiveCombatFX({ id: fxId, isPlayer, type });
    setHitFx(prev => [...prev.slice(-3), { id: fxId, isPlayer, type }]);
    setTimeout(() => {
      setActiveCombatFX(current => (current && current.id === fxId ? null : current));
    }, 450);
    setTimeout(() => {
      setHitFx(prev => prev.filter(f => f.id !== fxId));
    }, 600);
  };`;
    bundle = bundle.substring(0, pSpawnFxOld) + newSpawnFxCode + bundle.substring(pSpawnFxEnd + 2);
  }

  // 2. Roman-Themed spawnText
  const pSpawnTextOld = bundle.indexOf("const spawnText = (text, isPlayer, color) => {");
  if (pSpawnTextOld !== -1) {
    const pNextAfterSpawnText = bundle.indexOf("const spawnFX =", pSpawnTextOld) !== -1 ? bundle.indexOf("const spawnFX =", pSpawnTextOld) : (bundle.indexOf("const activeOmen =", pSpawnTextOld) !== -1 ? bundle.indexOf("const activeOmen =", pSpawnTextOld) : bundle.indexOf("const playTacticalCard =", pSpawnTextOld));
    const pSpawnTextEnd = pNextAfterSpawnText !== -1 ? bundle.lastIndexOf("};", pNextAfterSpawnText) : bundle.indexOf("};", pSpawnTextOld);
    const newSpawnText = `const spawnText = (text, isPlayer, color) => {
    const id = Math.random().toString(36).substring(2, 9) + '_' + Date.now();
    const txtStr = String(text || '');
    const isCrit = txtStr.includes('CRITICAL') || txtStr.includes('CRIT') || txtStr.includes('⚡') || txtStr.includes('💥');
    const isHeal = txtStr.includes('HP') || txtStr.includes('💚') || txtStr.includes('+');
    const isBlock = txtStr.includes('DEFENSE') || txtStr.includes('🛡️') || txtStr.includes('BULWARK') || txtStr.includes('BLOCKED') || txtStr.includes('SCUTUM');
    const displayColor = color || (isPlayer ? (isHeal ? '#22c55e' : '#ef4444') : (isCrit ? '#fef08a' : '#fbbf24'));
    
    const dmgMatch = txtStr.match(/-(\\d+)/);
    if (dmgMatch && dmgMatch[1]) {
      const numVal = parseInt(dmgMatch[1], 10);
      if (!isNaN(numVal) && numVal > 0) {
        if (!isPlayer) {
          try {
            setTotalDamageDealt(prev => prev + numVal);
            setRecentEnemyDmg({ val: numVal, isCrit, id: Date.now() });
          } catch(e){}
        } else {
          try {
            setTotalDamageTaken(prev => prev + numVal);
            setRecentPlayerDmg({ val: numVal, isCrit, id: Date.now() });
          } catch(e){}
        }
      }
    }
    setFloatingText(prev => {
      const capped = prev.length >= 6 ? prev.slice(-5) : prev;
      return [...capped, { id, text: txtStr, isPlayer, color: displayColor, isCrit, isHeal, isBlock }];
    });
    setTimeout(() => { setFloatingText(prev => prev.filter(f => f.id !== id)); }, 700);
  };`;
    bundle = bundle.substring(0, pSpawnTextOld) + newSpawnText + bundle.substring(pSpawnTextEnd + 2);
  }

  // 3. Connect DoT ticks on turn change
  const pRawSetTurn = bundle.indexOf("rawSetTurn(nextTurn);");
  if (pRawSetTurn !== -1 && !bundle.includes("processDoTTicks(nextTurn === 'player')")) {
    const dotTurnCode = `rawSetTurn(nextTurn);
    processDoTTicks(nextTurn === 'player');
    `;
    bundle = bundle.substring(0, pRawSetTurn) + dotTurnCode + bundle.substring(pRawSetTurn + "rawSetTurn(nextTurn);".length);
  }

  // 4. Ultra-Fast & Responsive endTurn logic
  const pEndTurnStart = bundle.indexOf("const endTurn = () => {");
  if (pEndTurnStart !== -1) {
    const pNextFunc = bundle.indexOf("const handleVictory =", pEndTurnStart);
    if (pNextFunc !== -1) {
      const fastEndTurnCode = `const endTurn = () => {
    setTurnDiceRolled(false);
    setDiceBonus(1.0);
    setOmenMessage("");
    setDiceTotal(0);
    setRelicCooldowns(prev => {
      const next = {};
      for (const k in prev) {
        if (prev[k] > 1) next[k] = prev[k] - 1;
      }
      return next;
    });
    if (enemyHpRef.current <= 0 || playerHpRef.current <= 0) return;

    // Check stun on enemy - instant responsive skip
    const isEnemyStunned = (enemyStatus || []).some(s => s.type === 'stun');
    if (isEnemyStunned) {
      spawnText("💫 ENEMY STUNNED • TURN SKIPPED!", false, "#93c5fd");
      setEnemyStatus(prev => prev.filter(s => s.type !== 'stun'));
      setTimeout(() => {
        setActionPoints(maxAP);
        if (typeof getInitialEquippedTacticalCards === "function") {
          setTacticalHand(getInitialEquippedTacticalCards());
        }
        setTurn('player');
        spawnText("YOUR TURN: AP RESTORED", true, "#38bdf8");
      }, 250);
      return;
    }

    setTurn('enemy');
    setActionPoints(0);

    // Fast enemy reaction
    setTimeout(() => {
      if (enemyHpRef.current <= 0 || playerHpRef.current <= 0) return;
      let dmg = currentIntent.type !== 'defend' ? currentIntent.val : 0;
      const isEnemyPoisoned = (enemyStatus || []).some(s => s.type === 'poison');
      if (isEnemyPoisoned && dmg > 0) {
        dmg = Math.max(1, Math.round(dmg * 0.75));
        spawnText("☠ VENOM WEAKNESS (-25% ATK)", false, "#22c55e");
      }
      const isEnemyShocked = (enemyStatus || []).some(s => s.type === 'shock');
      if (isEnemyShocked && dmg > 0) {
        dmg = Math.max(1, Math.round(dmg * 0.80));
        spawnText("⚡ SHOCK DISCHARGE • ATK DRAINED", false, "#38bdf8");
      }

      if (dmg > 0) {
        const isProj = currentIntent.type === 'projectile';
        const isRam = currentIntent.type === 'heavy' || currentIntent.type === 'ram';
        const isCrit = Math.random() < 0.15;
        if (isCrit) dmg = Math.floor(dmg * 1.5);

        let enemyWeapon = 'sword_slash';
        let hitDelay = 120;
        let impactFX = 'sword_slash';
        let enemyRecovery = 250;

        if (isProj) {
          enemyWeapon = isSea ? 'arrow_fire' : 'javelin_launch';
          setEnemyAnim('shoot');
          spawnFX(true, enemyWeapon === 'arrow_fire' ? 'arrow_fire_enemy_travel' : 'javelin_launch_enemy_travel');
          hitDelay = 160;
          enemyRecovery = 300;
          impactFX = enemyWeapon === 'arrow_fire' ? 'arrow_fire_hit' : 'javelin_launch_hit';
        } else if (isRam) {
          enemyWeapon = 'ram_impact';
          setEnemyAnim('ram');
          hitDelay = 150;
          enemyRecovery = 280;
          impactFX = 'ram_impact';
        } else {
          setEnemyAnim('attack');
          hitDelay = 130;
          enemyRecovery = 260;
          impactFX = 'sword_slash';
        }

        setTimeout(() => { setEnemyAnim('idle'); }, enemyRecovery);

        setTimeout(() => {
          spawnFX(true, impactFX);
          let currentBlock = playerBlockRef.current;
          if (currentBlock > 0) {
            if (currentBlock >= dmg) {
              setPlayerBlock(prev => prev - dmg);
              spawnText('BLOCKED 🛡️', true, '#93c5fd');
              spawnFX(true, 'block');
              dmg = 0;
            } else {
              dmg -= currentBlock;
              setPlayerBlock(0);
              spawnFX(true, 'block');
            }
          }
          if (dmg > 0) {
            setPlayerAnim('hit');
            setTimeout(() => setPlayerAnim('idle'), 260);
            setPlayerHp(prev => {
              const next = Math.max(0, prev - dmg);
              if (next <= 0) setTurn('defeat');
              return next;
            });
            if (isCrit) {
              spawnFX(true, 'crit_burst');
              spawnText('CRIT -' + dmg + ' ⚡', true, '#fbbf24');
            } else {
              spawnText('-' + dmg, true, '#ef4444');
            }
            spawnFX(true, 'bleed');
          }
        }, hitDelay);
      } else if (currentIntent.type === 'defend') {
        setEnemyBlock(prev => prev + currentIntent.val);
        spawnText('+' + currentIntent.val + ' DEFENSE 🛡️', false, '#38bdf8');
        spawnFX(false, 'buff');
      }

      // Fast turn return to player
      setTimeout(() => {
        if (playerHpRef.current <= 0 || enemyHpRef.current <= 0) return;
        setTurn('player');
        setActionPoints(maxAP);
        setAbilities(defaultAbilities);
        if (typeof getInitialEquippedTacticalCards === "function") {
          setTacticalHand(getInitialEquippedTacticalCards());
        }
        setEnemyBlock(0);
        setPlayerBlock(0);
        setCurrentIntent(intents[Math.floor(Math.random() * intents.length)]);
      }, 340);
    }, 180);
  };
  `;
      bundle = bundle.substring(0, pEndTurnStart) + fastEndTurnCode + bundle.substring(pNextFunc);
      console.log("- Replaced endTurn with high-speed responsive AI turn pipeline.");
    }
  }

  // 5. High-responsiveness playTacticalCard
  const pCardWeap = bundle.indexOf("let weaponAnim = 'sword_slash';", bundle.indexOf("const playTacticalCard ="));
  if (pCardWeap !== -1) {
    const pCardWeapEnd = bundle.indexOf("let hitDelay = 220;", pCardWeap);
    if (pCardWeapEnd !== -1) {
      const newCardWeapCode = `let weaponAnim = 'sword_slash';
      if (atype === 'grapple' || cid.includes('grapple') || cid.includes('harpax') || cid.includes('corvus')) {
        weaponAnim = 'grapple_hook';
      } else if (atype === 'shear' || cid.includes('shear') || cid.includes('diekplous')) {
        weaponAnim = 'oar_shear';
      } else if (atype === 'ram' || cid.includes('ram')) {
        weaponAnim = 'ram_impact';
      } else if (atype === 'fire' || sEffect === 'fire' || cid.includes('greek_fire') || cid.includes('onager')) {
        weaponAnim = 'fire_spray';
      } else if (cid.includes('fire_arrow') || cid.includes('ignitae') || (atype === 'volley' && sEffect === 'fire')) {
        weaponAnim = 'fire_arrow';
      } else if (atype === 'poison' || sEffect === 'poison' || cid.includes('venom') || cid.includes('hydra')) {
        weaponAnim = 'poison_spray';
      } else if (atype === 'lifesteal' || sEffect === 'life_steal' || cid.includes('siphon') || cid.includes('sanguine')) {
        weaponAnim = 'life_steal';
      } else if (atype === 'lightning' || sEffect === 'lightning_bolt' || cid.includes('lightning') || cid.includes('jupiter') || cid.includes('fulmen') || cid.includes('tempestas')) {
        weaponAnim = 'lightning_bolt';
      } else if (cid.includes('pilum') || cid.includes('javelin') || cid.includes('plumbatae') || atype === 'javelin' || cid.includes('velites')) {
        weaponAnim = 'javelin_launch';
      } else if (cid.includes('scorpio') || cid.includes('ballista') || atype === 'siege') {
        weaponAnim = 'ballista_shot';
      } else if (cid.includes('archer') || cid.includes('sagittarii') || atype === 'volley') {
        weaponAnim = 'arrow_fire';
      } else {
        weaponAnim = 'sword_slash';
      }
      `;
      bundle = bundle.substring(0, pCardWeap) + newCardWeapCode + bundle.substring(pCardWeapEnd);
    }
  }

  // 6. Fast execution & recovery in playTacticalCard
  const pCardExec = bundle.indexOf("if (weaponAnim === 'arrow_fire') {", bundle.indexOf("const playTacticalCard ="));
  if (pCardExec !== -1) {
    const pCardExecEnd = bundle.indexOf("const critChance", pCardExec);
    if (pCardExecEnd !== -1) {
      const newCardExecCode = `hitDelay = 110;
      var attackerRecovery = 250;
      setPlayerAnim('attack');
      spawnFX(false, weaponAnim);
      if (weaponAnim === 'arrow_fire') {
        try { if (typeof v !== 'undefined' && v.playArrowSalvo) v.playArrowSalvo(); } catch(e){}
      } else if (weaponAnim === 'fire_arrow') {
        try { if (typeof v !== 'undefined' && v.playArrowSalvo) v.playArrowSalvo(); } catch(e){}
      } else if (weaponAnim === 'javelin_launch') {
        try { if (typeof v !== 'undefined' && v.playPilumBarrage) v.playPilumBarrage(); } catch(e){}
      } else if (weaponAnim === 'ballista_shot') {
        try { if (typeof v !== 'undefined' && v.playArrowSalvo) v.playArrowSalvo(); } catch(e){}
      } else if (weaponAnim === 'fire_spray') {
        try { if (typeof v !== 'undefined' && v.playGreekFire) v.playGreekFire(); } catch(e){}
      } else if (weaponAnim === 'grapple_hook') {
        try { if (typeof v !== 'undefined' && v.playGrappleThrow) v.playGrappleThrow(); } catch(e){}
      } else if (weaponAnim === 'oar_shear') {
        try { if (typeof v !== 'undefined' && v.playOarSheerSnap) v.playOarSheerSnap(); } catch(e){}
      } else if (weaponAnim === 'ram_impact') {
        setPlayerAnim('ram');
        try { if (typeof v !== 'undefined' && v.playNavalRamming) v.playNavalRamming(); } catch(e){}
      } else if (weaponAnim === 'poison_spray') {
        try { if (typeof v !== 'undefined' && v.playPoisonHiss) v.playPoisonHiss(); } catch(e){}
      } else if (weaponAnim === 'life_steal') {
        try { if (typeof v !== 'undefined' && v.playLifeStealSiphon) v.playLifeStealSiphon(); } catch(e){}
      } else if (weaponAnim === 'lightning_bolt') {
        try { if (typeof v !== 'undefined' && v.playFulmenShock) v.playFulmenShock(); } catch(e){}
      } else {
        try { if (typeof v !== 'undefined' && v.playGladiusClash) v.playGladiusClash(); } catch(e){}
      }
      setTimeout(() => { setPlayerAnim('idle'); }, attackerRecovery);
      `;
      bundle = bundle.substring(0, pCardExec) + newCardExecCode + bundle.substring(pCardExecEnd);
    }
  }

  // 7. Apply persistent status effects on card hit
  const pCardHit = bundle.indexOf("if (card.statusEffect === 'fire' || card.actionType === 'fire') {", bundle.indexOf("const playTacticalCard ="));
  if (pCardHit !== -1) {
    const endMarker = "\n        }\n      }, hitDelay);";
    const pEnd = bundle.indexOf(endMarker, pCardHit);
    if (pEnd !== -1) {
      const newStatusApplyCode = `if (card.statusEffect === 'fire' || card.actionType === 'fire' || card.id?.includes('fire') || card.id?.includes('ignis')) {
            applyStatusEffect(false, 'fire', 3, 10);
            try { if (typeof v !== 'undefined' && v.playGreekFireCrackle) v.playGreekFireCrackle(); } catch(e){}
          } else if (card.statusEffect === 'poison' || card.actionType === 'poison' || card.id?.includes('venom') || card.id?.includes('hydra')) {
            applyStatusEffect(false, 'poison', 3, 10);
            try { if (typeof v !== 'undefined' && v.playPoisonHiss) v.playPoisonHiss(); } catch(e){}
          } else if (card.statusEffect === 'bleed' || card.actionType === 'bleed' || card.id?.includes('bleed') || card.id?.includes('lacerat')) {
            applyStatusEffect(false, 'bleed', 3, 10);
            try { if (typeof v !== 'undefined' && v.playBleedSlash) v.playBleedSlash(); } catch(e){}
          } else if (card.statusEffect === 'lightning_bolt' || card.actionType === 'lightning' || card.id?.includes('lightning') || card.id?.includes('jupiter') || card.id?.includes('tempestas')) {
            applyStatusEffect(false, 'shock', 2, 10);
            try { if (typeof v !== 'undefined' && v.playFulmenShock) v.playFulmenShock(); } catch(e){}
          } else if (card.statusEffect === 'stun' || card.actionType === 'stun' || card.id?.includes('stun') || card.id?.includes('harpax') || card.id?.includes('corvus')) {
            applyStatusEffect(false, 'stun', 1, 0);
            spawnText('💫 STUN APPLIED • TURN SKIPPED!', false, '#93c5fd');
          } else if (card.statusEffect === 'life_steal' || card.actionType === 'lifesteal' || card.id?.includes('siphon')) {
            applyStatusEffect(false, 'lifesteal', 2, 8);
            setPlayerHp(prev => Math.min(maxPlayerHp, prev + Math.round(finalDmg * 0.5)));
            spawnText('+' + Math.round(finalDmg * 0.5) + ' HP 💚', true, '#22c55e');
          }`;
      bundle = bundle.substring(0, pCardHit) + newStatusApplyCode + bundle.substring(pEnd);
    }
  }

  // 7b. Accelerate animation recoveries in playTacticalCard
  bundle = bundle.replace(/setTimeout\(\(\)\s*=>\s*setEnemyAnim\('idle'\),\s*750\);/g, "setTimeout(() => setEnemyAnim('idle'), 280);");
  bundle = bundle.replace(/setTimeout\(\(\)\s*=>\s*setPlayerAnim\('idle'\),\s*750\);/g, "setTimeout(() => setPlayerAnim('idle'), 280);");
  bundle = bundle.replace(/setTimeout\(\(\)\s*=>\s*endTurn\(\),\s*1400\);/g, "setTimeout(() => endTurn(), 300);");

  // 8. Relics & Artifact Special Abilities with fast execution
  const pActRelic = bundle.indexOf("const activateRelic = (relic) => {");
  if (pActRelic !== -1) {
    const pNextMarker = bundle.indexOf("const [playerHp, setPlayerHp] = b.useState", pActRelic);
    const pActRelicEnd = pNextMarker !== -1 ? bundle.lastIndexOf("};", pNextMarker) : bundle.indexOf("};", pActRelic);
    const newActRelic = `const activateRelic = (relic) => {
    if (!relic) return;
    const relicCost = typeof relic.cost === "number" ? relic.cost : 1;
    if (turn !== 'player' || (relicCooldowns[relic.id] || 0) > 0 || actionPoints < relicCost) return;
    const ability = relic.specialAbility || {};
    setActionPoints(prev => Math.max(0, prev - relicCost));
    if (typeof setIsRelicDrawerOpen === "function") setIsRelicDrawerOpen(false);
    setRelicCooldowns(prev => ({
      ...prev,
      [relic.id]: ability.cooldownRounds || 2
    }));
    
    try {
      if (typeof v !== 'undefined') {
        if (v.playSpecialAbility) v.playSpecialAbility();
        else if (v.playClick) v.playClick();
      }
    } catch(e){}

    const eff = (ability.effectType || ability.effect || relic.effect || relic.name || "DAMAGE").toUpperCase();
    const val = ability.value || Math.max(18, (relic.bonusAttack || 0) * 2 + (relic.bonusDefense || 0) * 2 + 16);

    if (eff.includes('STUN') || eff.includes('STUPEFACTIO') || eff.includes('MEDUSA') || eff.includes('GORGON') || eff.includes('TALON') || eff.includes('CORVUS')) {
      setPlayerAnim('attack');
      spawnFX(false, 'grapple_hook');
      setTimeout(() => {
        setPlayerAnim('idle');
        setEnemyAnim('hit');
        setTimeout(() => setEnemyAnim('idle'), 280);
        setEnemyHp(prev => {
          const next = Math.max(0, prev - val);
          if (next <= 0) {
            setEnemyAnim('death');
            setTurn('victory');
            spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24');
          }
          return next;
        });
        applyStatusEffect(false, 'stun', 1, 0);
        spawnText('💫 -' + val + ' ' + (ability.name || 'STUN') + '!', false, '#93c5fd');
        try { if (typeof v !== 'undefined' && v.playFulmenShock) v.playFulmenShock(); } catch(e){}
      }, 90);
    } else if (eff.includes('LIGHTNING') || eff.includes('FULMEN') || eff.includes('SHOCK') || eff.includes('JUPITER') || eff.includes('TEMPESTAS')) {
      setPlayerAnim('attack');
      spawnFX(false, 'lightning_bolt');
      setTimeout(() => {
        setPlayerAnim('idle');
        setEnemyAnim('hit');
        setTimeout(() => setEnemyAnim('idle'), 280);
        setEnemyHp(prev => {
          const next = Math.max(0, prev - val);
          if (next <= 0) {
            setEnemyAnim('death');
            setTurn('victory');
            spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24');
          }
          return next;
        });
        applyStatusEffect(false, 'shock', 2, 10);
        spawnText('⚡ -' + val + ' ' + (ability.name || 'JUPITER FULMEN') + '!', false, '#38bdf8');
        try { if (typeof v !== 'undefined' && v.playFulmenShock) v.playFulmenShock(); } catch(e){}
      }, 90);
    } else if (eff.includes('POISON') || eff.includes('VENOM') || eff.includes('HYDRA') || eff.includes('VIPER')) {
      setPlayerAnim('attack');
      spawnFX(false, 'poison_spray');
      setTimeout(() => {
        setPlayerAnim('idle');
        setEnemyAnim('hit');
        setTimeout(() => setEnemyAnim('idle'), 280);
        setEnemyHp(prev => {
          const next = Math.max(0, prev - val);
          if (next <= 0) {
            setEnemyAnim('death');
            setTurn('victory');
            spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24');
          }
          return next;
        });
        applyStatusEffect(false, 'poison', 3, 10);
        spawnText('☠ -' + val + ' ' + (ability.name || 'HYDRA VENOM') + '!', false, '#22c55e');
        try { if (typeof v !== 'undefined' && v.playPoisonHiss) v.playPoisonHiss(); } catch(e){}
      }, 90);
    } else if (eff.includes('BLEED') || eff.includes('BLEEDING') || eff.includes('LACERATIO') || eff.includes('BLOOD') || eff.includes('MARS')) {
      setPlayerAnim('attack');
      spawnFX(false, 'sword_slash');
      setTimeout(() => {
        setPlayerAnim('idle');
        setEnemyAnim('hit');
        setTimeout(() => setEnemyAnim('idle'), 280);
        setEnemyHp(prev => {
          const next = Math.max(0, prev - val);
          if (next <= 0) {
            setEnemyAnim('death');
            setTurn('victory');
            spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24');
          }
          return next;
        });
        applyStatusEffect(false, 'bleed', 3, 11);
        spawnText('🩸 -' + val + ' ' + (ability.name || 'LACERATIO') + '!', false, '#ef4444');
        try { if (typeof v !== 'undefined' && v.playBleedSlash) v.playBleedSlash(); } catch(e){}
      }, 90);
    } else if (eff.includes('FIRE') || eff.includes('BURN') || eff.includes('IGNIS') || eff.includes('GREEK_FIRE') || eff.includes('VULCAN')) {
      setPlayerAnim('attack');
      spawnFX(false, 'fire_spray');
      setTimeout(() => {
        setPlayerAnim('idle');
        setEnemyAnim('hit');
        setTimeout(() => setEnemyAnim('idle'), 280);
        setEnemyHp(prev => {
          const next = Math.max(0, prev - val);
          if (next <= 0) {
            setEnemyAnim('death');
            setTurn('victory');
            spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24');
          }
          return next;
        });
        applyStatusEffect(false, 'fire', 3, 12);
        spawnText('🔥 -' + val + ' ' + (ability.name || 'GREEK FIRE') + '!', false, '#f97316');
        try { if (typeof v !== 'undefined' && v.playGreekFire) v.playGreekFire(); } catch(e){}
      }, 90);
    } else if (eff.includes('SHIELD') || eff.includes('AEGIS') || eff.includes('DEFENSE') || eff.includes('BULWARK')) {
      setPlayerBlock(prev => prev + val);
      spawnText('+' + val + ' ' + (ability.name || 'AEGIS BULWARK') + ' 🛡️', true, '#38bdf8');
      spawnFX(true, 'block');
      applyStatusEffect(true, 'reflect', 2, 0);
      try { if (typeof v !== 'undefined' && v.playScutumWall) v.playScutumWall(); } catch(e){}
    } else if (eff.includes('SOLAR') || eff.includes('SOL_INVICTUS') || eff.includes('LABARUM') || eff.includes('HEAL') || eff.includes('RECOVERY')) {
      setPlayerHp(prev => Math.min(maxPlayerHp, prev + val));
      setDeathWardActive(true);
      spawnText('+' + val + ' HP ☀️ ' + (ability.name || 'SOL INVICTUS'), true, '#fbbf24');
      spawnFX(true, 'buff');
      try { if (typeof v !== 'undefined' && v.playOmen) v.playOmen(); } catch(e){}
    } else if (eff.includes('LIFESTEAL') || eff.includes('SIPHON') || eff.includes('OSIRIS') || eff.includes('PLUTO')) {
      setPlayerAnim('attack');
      spawnFX(false, 'life_steal');
      setTimeout(() => {
        setPlayerAnim('idle');
        setEnemyAnim('hit');
        setTimeout(() => setEnemyAnim('idle'), 280);
        setEnemyHp(prev => {
          const next = Math.max(0, prev - val);
          if (next <= 0) {
            setEnemyAnim('death');
            setTurn('victory');
            spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24');
          }
          return next;
        });
        setPlayerHp(prev => Math.min(maxPlayerHp, prev + Math.round(val * 0.6)));
        applyStatusEffect(false, 'lifesteal', 2, 8);
        spawnText('🩸 SIPHON +' + Math.round(val * 0.6) + ' HP / -' + val + ' DMG', true, '#a855f7');
        try { if (typeof v !== 'undefined' && v.playLifeStealSiphon) v.playLifeStealSiphon(); } catch(e){}
      }, 90);
    } else {
      setPlayerAnim('attack');
      spawnFX(false, 'sword_slash');
      setTimeout(() => {
        setPlayerAnim('idle');
        setEnemyAnim('hit');
        setTimeout(() => setEnemyAnim('idle'), 280);
        setEnemyHp(prev => {
          const next = Math.max(0, prev - val);
          if (next <= 0) {
            setEnemyAnim('death');
            setTurn('victory');
            spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24');
          }
          return next;
        });
        spawnText('-' + val + ' ' + (ability.name || 'RELIC INVOCATION'), false, '#fbbf24');
        try { if (typeof v !== 'undefined' && v.playGladiusClash) v.playGladiusClash(); } catch(e){}
      }, 90);
    }
  };`;
    bundle = bundle.substring(0, pActRelic) + newActRelic + bundle.substring(pActRelicEnd + 2);
  }

  // 8b. Transform Pull-Down Tab into Direct Glowing Golden Artifact Ability Buttons (No Tray)
  const pTabSearch = bundle.indexOf('id: "combat-relic-leather-tab"');
  if (pTabSearch !== -1) {
    let pTabElem = bundle.lastIndexOf('e.jsxs(', pTabSearch);
    if (pTabElem === -1) pTabElem = bundle.lastIndexOf('e.jsx(', pTabSearch);

    const pMainSearch = bundle.indexOf('id: "battle-theatre-v2-container"');
    if (pMainSearch !== -1 && pTabElem !== -1) {
      let pMainElem = bundle.lastIndexOf('e.jsx("main",', pMainSearch);
      if (pMainElem !== -1) {
        const glowingTabButtonsCode = `e.jsxs("div", {
            id: "combat-relic-leather-tab",
            className: "absolute top-full left-1/2 -translate-x-1/2 z-40 pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 transition-all duration-150 select-none max-w-[96vw] overflow-x-auto custom-scrollbar",
            style: {
              background: "linear-gradient(180deg, #2a1408 0%, #160a03 100%)",
              borderLeft: "1.5px solid #92400e",
              borderRight: "1.5px solid #92400e",
              borderBottom: "2px solid #d97706",
              borderTop: "none",
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.85), 0 0 14px rgba(217,119,6,0.4), inset 0 1px 0 rgba(245,158,11,0.25)",
              transform: "translateX(-50%) translateY(0px)"
            },
            children: [
              e.jsx("div", {
                className: "w-1.5 h-1.5 rounded-full shrink-0",
                style: {
                  backgroundColor: "#b45309",
                  boxShadow: "inset 0 1px 1px rgba(0,0,0,0.8), 0 0.5px 0 rgba(255,255,255,0.2)"
                }
              }),
              e.jsx("span", {
                className: "text-[10px] text-amber-400 select-none",
                children: "🏛️"
              }),
              e.jsx("span", {
                className: "font-cinzel font-black text-[8px] sm:text-[9px] tracking-widest text-amber-300 uppercase shrink-0 hidden xs:inline drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",
                children: "RELICS:"
              }),
              combatRelics.length === 0
                ? e.jsx("span", {
                    className: "font-cinzel italic text-[8px] sm:text-[8.5px] text-stone-400 px-1 whitespace-nowrap",
                    children: "NONE CONSECRATED"
                  })
                : combatRelics.map(relic => {
                    const cd = relicCooldowns[relic.id] || 0;
                    const relicCost = typeof relic.cost === "number" ? relic.cost : 1;
                    const hasAP = actionPoints >= relicCost;
                    const isReady = cd === 0 && turn === "player" && hasAP;
                    const ability = relic.specialAbility || {};
                    const shortName = (ability.name || relic.name || "RELIC").toUpperCase();

                    return e.jsxs("button", {
                      key: relic.id,
                      type: "button",
                      onClick: (ev) => {
                        ev.stopPropagation();
                        if (isReady) {
                          activateRelic(relic);
                        }
                      },
                      disabled: !isReady,
                      title: \`\${relic.name}: \${ability.description || "Activate sacred power"} (\${relicCost} AP)\${cd > 0 ? \` [Cooldown: \${cd} turns]\` : ""}\`,
                      className: \`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg font-cinzel font-black text-[8.5px] sm:text-[9.5px] tracking-wider uppercase transition-all duration-150 shrink-0 whitespace-nowrap \${
                        isReady
                          ? "cursor-pointer active:scale-95 text-stone-950 shadow-[0_0_12px_rgba(245,158,11,0.85)] hover:brightness-110"
                          : "cursor-not-allowed opacity-60 text-stone-300"
                      }\`,
                      style: isReady
                        ? {
                            background: "linear-gradient(135deg, #fef08a 0%, #f59e0b 50%, #d97706 100%)",
                            border: "1.2px solid #fef08a",
                            boxShadow: "0 0 14px rgba(245, 158, 11, 0.8), 0 2px 4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.7)"
                          }
                        : {
                            background: "linear-gradient(180deg, #201309 0%, #110904 100%)",
                            border: "1px solid rgba(120, 113, 108, 0.35)",
                            color: "#a8a29e"
                          },
                      children: [
                        e.jsx("span", {
                          className: "text-[9px] sm:text-[10px]",
                          children: isReady ? "⚡" : (cd > 0 ? "⏳" : "🔒")
                        }),
                        e.jsx("span", {
                          className: "truncate max-w-[85px] sm:max-w-[125px] drop-shadow-sm font-bold",
                          children: shortName
                        }),
                        e.jsx("span", {
                          className: \`text-[7px] sm:text-[7.5px] font-mono font-black px-1 py-0.2 rounded \${
                            isReady
                              ? "bg-amber-950/80 text-amber-200 border border-amber-400/60"
                              : "bg-black/60 text-stone-400 border border-stone-700/50"
                          }\`,
                          children: cd > 0 ? \`\${cd}T\` : \`\${relicCost}AP\`
                        })
                      ]
                    });
                  }),
              e.jsx("div", {
                className: "w-1.5 h-1.5 rounded-full shrink-0",
                style: {
                  backgroundColor: "#b45309",
                  boxShadow: "inset 0 1px 1px rgba(0,0,0,0.8), 0 0.5px 0 rgba(255,255,255,0.2)"
                }
              })
            ]
          })
        ]
      }),
      `;
        bundle = bundle.substring(0, pTabElem) + glowingTabButtonsCode + bundle.substring(pMainElem);
        console.log("- Replaced pull-down tab tray with direct glowing golden artifact buttons inside tab shape.");
      }
    }
  }

  // 8c. Update BattleTheatreV2 Signature to Destructure All Combat Props including floatingText
  const pBtSig = bundle.indexOf("const BattleTheatreV2 = ({");
  if (pBtSig !== -1) {
    const pBtSigEnd = bundle.indexOf("}) => {", pBtSig);
    if (pBtSigEnd !== -1) {
      const fullParams = `const BattleTheatreV2 = ({
  isSea = true,
  playerHp = 100, maxPlayerHp = 100, playerBlock = 0, playerAnim = "idle",
  enemyHp = 100, maxEnemyHp = 100, enemyBlock = 0, enemyAnim = "idle",
  turn = "player", currentIntent = null, hoveredAbility = null,
  timeOfDay = "DIES", weather = "CLEAR", regionName = "Mediterranean",
  enemy = null, player = null,
  playerStatus = [], enemyStatus = [], activeCombatFX = null,
  floatingText = [], totalDamageDealt = 0, totalDamageTaken = 0,
  recentEnemyDmg = null, recentPlayerDmg = null`;
      bundle = bundle.substring(0, pBtSig) + fullParams + bundle.substring(pBtSigEnd);
      console.log("- Updated BattleTheatreV2 parameter signature with floatingText and all combat states.");
    }
  }

  // 9. Update BattleTheatreV2 props in JSX invocation
  const btCallMarker = "children: BattleTheatreV2({";
  const pBtCall = bundle.indexOf(btCallMarker);
  if (pBtCall !== -1) {
    const pBtCallEnd = bundle.indexOf("})", pBtCall);
    if (pBtCallEnd !== -1) {
      const callSlice = bundle.substring(pBtCall, pBtCallEnd);
      if (!callSlice.includes("floatingText")) {
        const newCallSlice = callSlice.replace(/player:\s*s/, "player: s, playerStatus, enemyStatus, activeCombatFX, floatingText, totalDamageDealt, totalDamageTaken, recentEnemyDmg, recentPlayerDmg");
        bundle = bundle.substring(0, pBtCall) + newCallSlice + bundle.substring(pBtCallEnd);
      }
    }
  }

  // 10. INJECT MASTERWORK 2D MODELS: PROGRESSIVE ROMAN SHIPS (TIERS 1-5), LEGIONS (TIERS 1-5), ALL MONSTERS & ANIMALS
  const pShipFuncStart = bundle.indexOf("const render2DShip =");
  const pBtFuncStart = bundle.indexOf("const BattleTheatreV2 =");
  if (pShipFuncStart !== -1 && pBtFuncStart !== -1) {
    const masterworkModelsCode = `// === MASTERWORK COMBAT UNITS, MONSTERS & LEVEL PROGRESSION SYSTEM ===

// 1. MASTERWORK ROMAN & MEDITERRANEAN WARSHIPS (TIERS 1 TO 5 PROGRESSION)
const render2DShip = (x, y, isPlayer, role = "flagship", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isFlag = role === "flagship";
  const flip = isPlayer ? 1 : -1;
  const shipTier = Math.min(5, Math.max(1, tier || 1));
  
  // Hull palette
  const hullDark = isPlayer
    ? (shipTier >= 5 ? "#290f04" : shipTier >= 4 ? "#451a03" : shipTier >= 3 ? "#573012" : shipTier >= 2 ? "#5c3317" : "#4a2810")
    : (faction === "punic" ? "#3b0764" : faction === "greek" ? "#0f172a" : faction === "barbarian" ? "#29180c" : "#1c1917");
  const hullMid = isPlayer
    ? (shipTier >= 5 ? "#78350f" : shipTier >= 4 ? "#854d0e" : shipTier >= 3 ? "#92400e" : shipTier >= 2 ? "#854d0e" : "#78350f")
    : (faction === "punic" ? "#581c87" : faction === "greek" ? "#1e3a8a" : faction === "barbarian" ? "#451a03" : "#334155");
  const hullLight = isPlayer
    ? (shipTier >= 5 ? "#b45309" : shipTier >= 4 ? "#d97706" : shipTier >= 3 ? "#b45309" : shipTier >= 2 ? "#a16207" : "#92400e")
    : (faction === "punic" ? "#7e22ce" : faction === "greek" ? "#2563eb" : faction === "barbarian" ? "#78350f" : "#475569");

  // Sail palette
  const sailColor = isPlayer 
    ? (shipTier >= 5 ? "#581c87" : shipTier >= 4 ? "#701a75" : shipTier >= 3 ? "#881337" : shipTier >= 2 ? "#991b1b" : "#b91c1c") 
    : (faction === "punic" ? "#701a75" : faction === "greek" ? "#1d4ed8" : faction === "barbarian" ? "#78350f" : "#334155");
  const sailShadow = isPlayer
    ? (shipTier >= 5 ? "#3b0764" : shipTier >= 4 ? "#4a044e" : shipTier >= 3 ? "#4c0519" : "#7f1d1d")
    : "#0f172a";
  const goldTrim = shipTier >= 4 ? "#fef08a" : (shipTier >= 3 ? "#fde047" : "#f59e0b");
  const bronzeWale = shipTier >= 4 ? "#fbbf24" : (shipTier >= 3 ? "#f59e0b" : "#d97706");

  // Progressive boat sizing & geometry factors
  const bowX = isFlag ? (shipTier >= 4 ? 170 : shipTier >= 3 ? 150 : 135) : (shipTier >= 3 ? 120 : 105);
  const sternX = isFlag ? (shipTier >= 4 ? -135 : shipTier >= 3 ? -120 : -105) : (shipTier >= 3 ? -85 : -75);
  const keelY = isFlag ? 34 : 26;
  const gunwaleY = isFlag ? 6 : 8;

  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_sinking_ship_pitch 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards" : "none"
    },
    className: "transition-all duration-300 ease-out " + staggerClass + " " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]" : isDead ? "drop-shadow-[0_0_24px_rgba(239,68,68,0.9)]" : ""),
    children: [
      // 1. Foaming Water Wake & Hydrodynamic Displacement (Multi-layered realistic wake)
      !isDead && e.jsxs("g", {
        id: "ship-sea-wake-system",
        children: [
          // Outer turbulent sea spread
          e.jsx("ellipse", { cx: "-10", cy: keelY + 8, rx: isFlag ? "145" : "95", ry: isFlag ? "24" : "16", fill: "rgba(14,165,233,0.18)", className: "animate-pulse" }),
          // Inner foaming white water around keel
          e.jsx("ellipse", { cx: "5", cy: keelY + 4, rx: isFlag ? "110" : "75", ry: isFlag ? "12" : "9", fill: "rgba(224,242,254,0.35)" }),
          // Prow bow wave crest
          e.jsx("path", {
            d: "M " + (bowX - 35) + " " + (keelY - 2) + " Q " + (bowX + 15) + " " + (keelY + 4) + " " + (bowX + 35) + " " + (keelY + 12) + " Q " + (bowX + 5) + " " + (keelY + 10) + " " + (bowX - 25) + " " + (keelY + 4) + " Z",
            fill: "rgba(255,255,255,0.75)"
          }),
          // Stern churning propeller/oar eddy
          e.jsx("path", {
            d: "M " + (sternX - 10) + " " + (keelY + 2) + " Q " + (sternX - 45) + " " + (keelY + 10) + " " + (sternX - 60) + " " + (keelY + 16) + " Q " + (sternX - 30) + " " + (keelY + 12) + " " + (sternX) + " " + (keelY + 6) + " Z",
            fill: "rgba(186,230,253,0.4)"
          })
        ]
      }),

      // 2. Synchronized Realistic Oars (Remi) with Oarports & Water Splashes
      !isDead && e.jsxs("g", {
        id: "ship-synchronized-oars",
        className: "animate-oar-row",
        children: (isFlag 
          ? [-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75, 90].slice(0, shipTier >= 4 ? 12 : shipTier >= 3 ? 10 : 8) 
          : [-50, -35, -20, -5, 10, 25, 40, 55].slice(0, shipTier >= 3 ? 8 : 6)
        ).map((ox, idx) => e.jsxs("g", {
          key: "oar_assembly_" + idx,
          children: [
            // Circular Bronze Oarport with leather seal (Columbarium)
            e.jsx("circle", { cx: ox, cy: gunwaleY + 12, r: "2.8", fill: "#1c1917", stroke: bronzeWale, strokeWidth: "1" }),
            // Primary Oar Loom (Tapered hardwood shaft)
            e.jsx("line", { x1: ox, y1: gunwaleY + 12, x2: ox - 26, y2: keelY + 18, stroke: "#b45309", strokeWidth: "2.8", strokeLinecap: "round" }),
            // Oar Blade (Flared paddle with bronze tip dipping into sea)
            e.jsx("path", {
              d: "M " + (ox - 24) + " " + (keelY + 13) + " L " + (ox - 35) + " " + (keelY + 23) + " L " + (ox - 30) + " " + (keelY + 25) + " L " + (ox - 21) + " " + (keelY + 16) + " Z",
              fill: "#f59e0b",
              stroke: "#78350f",
              strokeWidth: "0.8"
            }),
            // Tier 2-5: Second Bank of Oars (Double/Triple banked galley)
            shipTier >= 2 && e.jsxs("g", {
              children: [
                e.jsx("circle", { cx: ox + 6, cy: gunwaleY + 16, r: "2.4", fill: "#1c1917", stroke: "#92400e", strokeWidth: "0.8" }),
                e.jsx("line", { x1: ox + 6, y1: gunwaleY + 16, x2: ox - 16, y2: keelY + 22, stroke: "#78350f", strokeWidth: "2.2", strokeLinecap: "round" }),
                e.jsx("ellipse", { cx: ox - 18, cy: keelY + 23, rx: "3.5", ry: "2", fill: "#d97706" })
              ]
            }),
            // Tier 4-5: Third Bank of Oars (Quinquereme / Hexareme)
            shipTier >= 4 && isFlag && e.jsxs("g", {
              children: [
                e.jsx("line", { x1: ox + 11, y1: gunwaleY + 19, x2: ox - 8, y2: keelY + 26, stroke: "#573012", strokeWidth: "1.8", strokeLinecap: "round" }),
                e.jsx("ellipse", { cx: ox - 9, cy: keelY + 27, rx: "3", ry: "1.8", fill: "#fef08a" })
              ]
            }),
            // Small foaming wake splash at blade entry
            e.jsx("circle", { cx: ox - 28, cy: keelY + 21, r: "2.2", fill: "rgba(255,255,255,0.7)" })
          ]
        }))
      }),

      // 3. Lower Hull & Keel Timbers (Below Waterline Shading)
      e.jsx("path", {
        d: "M " + sternX + " " + (gunwaleY + 16) + " Q " + (sternX + 25) + " " + (keelY + 4) + " 0 " + (keelY + 6) + " Q " + (bowX - 30) + " " + (keelY + 4) + " " + bowX + " " + (gunwaleY + 16) + " L " + (bowX - 15) + " " + (gunwaleY + 22) + " Q 0 " + (keelY + 8) + " " + (sternX + 15) + " " + (gunwaleY + 20) + " Z",
        fill: hullDark,
        stroke: "#1c1917",
        strokeWidth: "1.2"
      }),

      // 4. Main Warship Hull (Curved Roman Mediterranean Galley with Flared Bow & Tapered Stern)
      e.jsx("path", {
        d: "M " + sternX + " " + (gunwaleY + 4) + " Q " + (sternX + 20) + " " + (gunwaleY - 6) + " " + (sternX + 50) + " " + gunwaleY + " L " + (bowX - 40) + " " + gunwaleY + " Q " + (bowX - 10) + " " + (gunwaleY - 8) + " " + (bowX + 12) + " " + (gunwaleY + 6) + " L " + (bowX + 6) + " " + (gunwaleY + 18) + " Q " + (bowX - 25) + " " + keelY + " 0 " + keelY + " Q " + (sternX + 35) + " " + keelY + " " + sternX + " " + (gunwaleY + 16) + " Z",
        fill: hullMid,
        stroke: shipTier >= 3 ? goldTrim : "#78350f",
        strokeWidth: shipTier >= 3 ? "2" : "1.4",
        filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.85))"
      }),

      // 5. Heavy Longitudinal Wales & Bronze Reinforcement Strakes
      e.jsx("path", {
        d: "M " + (sternX + 6) + " " + (gunwaleY + 10) + " Q 0 " + (gunwaleY + 14) + " " + (bowX - 4) + " " + (gunwaleY + 10),
        fill: "none",
        stroke: bronzeWale,
        strokeWidth: shipTier >= 4 ? "3.5" : "2.6"
      }),
      shipTier >= 2 && e.jsx("path", {
        d: "M " + (sternX + 14) + " " + (gunwaleY + 18) + " Q 0 " + (gunwaleY + 22) + " " + (bowX - 12) + " " + (gunwaleY + 18),
        fill: "none",
        stroke: shipTier >= 4 ? goldTrim : "#b45309",
        strokeWidth: "2"
      }),
      // Bronze Hull Rivet Plates (Tiers 3-5)
      shipTier >= 3 && isFlag && [-70, -40, -10, 20, 50, 80, 110].map((rvX, i) => e.jsx("rect", {
        key: "rv_" + i,
        x: rvX,
        y: gunwaleY + 8,
        width: "5",
        height: "12",
        fill: goldTrim,
        stroke: "#78350f",
        strokeWidth: "0.8",
        rx: "1"
      })),

      // 6. Classical Eye of Minerva (Ophthalmos) on Prow Cheeks
      !isDead && e.jsxs("g", {
        id: "ship-eye-ophthalmos",
        transform: "translate(" + (bowX - 18) + ", " + (gunwaleY + 8) + ")",
        children: [
          // White Sclera
          e.jsx("path", { d: "M -9 0 Q 0 -5 9 0 Q 0 5 -9 0 Z", fill: "#ffffff", stroke: "#78350f", strokeWidth: "1.2" }),
          // Azure/Bronze Iris
          e.jsx("circle", { cx: "1", cy: "0", r: "3.2", fill: isPlayer ? "#0284c7" : "#7e22ce" }),
          // Pupil
          e.jsx("circle", { cx: "1.5", cy: "0", r: "1.5", fill: "#000000" }),
          // Highlight
          e.jsx("circle", { cx: "0.8", cy: "-0.8", r: "0.8", fill: "#ffffff" })
        ]
      }),

      // 7. Cast Bronze Rostrum Ram at Prow (Keel-Integrated Rostrum Tridens)
      !isDead && e.jsxs("g", {
        id: "ship-prow-rostrum-ram",
        className: isAttacking ? "animate-rostrum-ram-thrust" : "",
        children: [
          // Main Ram Body (Cast heavy bronze trident)
          e.jsx("path", {
            d: "M " + (bowX - 10) + " " + (gunwaleY + 12) + " L " + (bowX + 32) + " " + (gunwaleY + 14) + " L " + (bowX + 26) + " " + (gunwaleY + 20) + " L " + (bowX + 36) + " " + (gunwaleY + 18) + " L " + (bowX + 26) + " " + (gunwaleY + 24) + " L " + (bowX + 20) + " " + (gunwaleY + 28) + " L " + (bowX - 15) + " " + (keelY + 2) + " Z",
            fill: shipTier >= 4 ? goldTrim : "#d97706",
            stroke: shipTier >= 4 ? "#78350f" : "#92400e",
            strokeWidth: "1.6",
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.8))"
          }),
          // Steel Reinforcing Blades & Ram Spikes (Tiers 2-5)
          shipTier >= 2 && e.jsx("polygon", {
            points: (bowX + 32) + "," + (gunwaleY + 14) + " " + (bowX + 46) + "," + (gunwaleY + 13) + " " + (bowX + 36) + "," + (gunwaleY + 17),
            fill: "#f8fafc",
            stroke: "#475569",
            strokeWidth: "1"
          }),
          // Secondary Upper Ram (Proembolion)
          e.jsx("polygon", {
            points: (bowX + 6) + "," + (gunwaleY + 4) + " " + (bowX + 24) + "," + (gunwaleY + 8) + " " + (bowX + 8) + "," + (gunwaleY + 12),
            fill: bronzeWale,
            stroke: "#78350f",
            strokeWidth: "1"
          })
        ]
      }),

      // 8. Stempost Carved Roman Figurehead (Golden Eagle / Victoria Aloft)
      !isDead && e.jsxs("g", {
        id: "ship-figurehead",
        transform: "translate(" + (bowX + 12) + ", " + (gunwaleY - 6) + ")",
        children: [
          // Graceful upward curving prow timber
          e.jsx("path", { d: "M -6 14 Q 4 -4 8 -18 Q 2 -8 -4 8", fill: hullLight, stroke: bronzeWale, strokeWidth: "1.5" }),
          // Golden Aquila figurehead at tip
          e.jsx("circle", { cx: "9", cy: "-20", r: shipTier >= 4 ? "6.5" : "5", fill: goldTrim, stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("path", { d: "M 8 -24 L 16 -21 L 10 -17 Z", fill: goldTrim }),
          e.jsx("path", { d: "M 4 -22 Q -4 -32 2 -36 Q 6 -28 7 -22", fill: goldTrim, stroke: "#92400e", strokeWidth: "0.8" })
        ]
      }),

      // 9. Classical Roman Aphlaston (Goose-Neck Curved Stern Fan)
      !isDead && e.jsxs("g", {
        id: "ship-aphlaston-stern",
        transform: "translate(" + sternX + ", " + (gunwaleY + 2) + ")",
        children: [
          // Primary Volute Inward Curve
          e.jsx("path", {
            d: "M 0 12 Q -24 -12 -16 -36 Q -6 -24 -2 0",
            fill: hullLight,
            stroke: goldTrim,
            strokeWidth: "1.8"
          }),
          // Gilded Lotus Petals & Acanthus Foliage Fan
          shipTier >= 3 && e.jsx("path", {
            d: "M -16 -36 Q -30 -44 -24 -24 M -16 -36 Q -22 -52 -8 -42 M -16 -36 Q -8 -50 0 -38",
            fill: "none",
            stroke: goldTrim,
            strokeWidth: "2",
            strokeLinecap: "round"
          }),
          // Stern Sternpost Gilded Sphere / Lantern
          e.jsx("circle", { cx: "-16", cy: "-37", r: "4", fill: goldTrim, stroke: "#78350f", strokeWidth: "1" }),
          // Dual Steering Oars (Gubernacula)
          e.jsx("line", { x1: "4", y1: "6", x2: "-18", y2: keelY + 16, stroke: "#78350f", strokeWidth: "3.5", strokeLinecap: "round" }),
          e.jsx("ellipse", { cx: "-18", cy: keelY + 16, rx: "4.5", ry: "2.5", fill: bronzeWale, stroke: "#78350f", strokeWidth: "0.8" })
        ]
      }),

      // 10. Cataphract Bulwark Line of Overlapping Roman Scuta Shields
      !isDead && e.jsxs("g", {
        id: "ship-cataphract-shields",
        children: (isFlag
          ? [-60, -45, -30, -15, 0, 15, 30, 45, 60, 75].slice(0, shipTier >= 4 ? 10 : shipTier >= 3 ? 8 : 6)
          : [-40, -26, -12, 2, 16, 30].slice(0, shipTier >= 3 ? 6 : 4)
        ).map((shX, idx) => e.jsxs("g", {
          key: "cat_sh_" + idx,
          transform: "translate(" + shX + ", " + (gunwaleY - (isFlag ? 2 : 1)) + ")",
          children: [
            // Shield Body (Curved Scutum with depth)
            e.jsx("rect", {
              x: "-7",
              y: "-7",
              width: "14",
              height: isFlag ? "18" : "15",
              rx: "3",
              fill: isPlayer ? (shipTier >= 4 ? "#7f1d1d" : "#991b1b") : (faction === "punic" ? "#581c87" : faction === "greek" ? "#1e3a8a" : "#451a03"),
              stroke: goldTrim,
              strokeWidth: "1.2",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
            }),
            // Gilded Umbo Boss
            e.jsx("circle", { cx: "0", cy: "2", r: "3", fill: goldTrim, stroke: "#78350f", strokeWidth: "0.8" }),
            // Winged Fulmen or SPQR Wreath motif on shield face
            shipTier >= 2 && e.jsx("path", {
              d: "M -4 -2 L 0 0 L 4 -2 M -4 6 L 0 4 L 4 6",
              fill: "none",
              stroke: goldTrim,
              strokeWidth: "1"
            })
          ]
        }))
      }),

      // 11. Fortified Forecastle & Aftcastle Fighting Towers (Turres)
      !isDead && isFlag && shipTier >= 3 && e.jsxs("g", {
        id: "ship-fighting-castles",
        children: [
          // Forecastle (Turris Pronaos) with crenellations
          e.jsxs("g", {
            transform: "translate(" + (bowX - 48) + ", " + (gunwaleY - 20) + ")",
            children: [
              // Castle Wall
              e.jsx("rect", { x: "0", y: "0", width: "30", height: "22", fill: "#573012", stroke: bronzeWale, strokeWidth: "1.5", rx: "1.5" }),
              // Crenellated Battlements
              e.jsx("polygon", { points: "0,0 6,0 6,4 12,4 12,0 18,0 18,4 24,4 24,0 30,0 30,6 0,6", fill: goldTrim }),
              // Archer Slit
              e.jsx("rect", { x: "13", y: "9", width: "4", height: "8", fill: "#1c1917", rx: "1" }),
              // Castle Shield emblem
              e.jsx("circle", { cx: "7", cy: "13", r: "3.5", fill: "#991b1b", stroke: goldTrim, strokeWidth: "0.8" })
            ]
          }),
          // Aftcastle (Turris Puppis - Quarterdeck Command Tower)
          e.jsxs("g", {
            transform: "translate(" + (sternX + 18) + ", " + (gunwaleY - 18) + ")",
            children: [
              e.jsx("rect", { x: "0", y: "0", width: "32", height: "20", fill: "#573012", stroke: bronzeWale, strokeWidth: "1.5", rx: "1.5" }),
              e.jsx("polygon", { points: "0,0 6,0 6,4 13,4 13,0 19,0 19,4 26,4 26,0 32,0 32,6 0,6", fill: goldTrim }),
              // Gilded awning support pillars
              e.jsx("line", { x1: "6", y1: "0", x2: "6", y2: "-8", stroke: goldTrim, strokeWidth: "1.5" }),
              e.jsx("line", { x1: "26", y1: "0", x2: "26", y2: "-8", stroke: goldTrim, strokeWidth: "1.5" }),
              // Imperial Silk Canopy
              e.jsx("path", { d: "M 4 -8 Q 16 -14 28 -8 L 26 -5 Q 16 -11 6 -5 Z", fill: sailColor, stroke: goldTrim, strokeWidth: "1" })
            ]
          })
        ]
      }),

      // 12. Roman Corvus Boarding Bridge (Tiers 2-5)
      !isDead && isFlag && shipTier >= 2 && e.jsxs("g", {
        id: "ship-corvus-boarding-bridge",
        transform: "translate(" + (bowX - 70) + ", " + (gunwaleY - 6) + ")",
        children: [
          // Corvus Swivel Base
          e.jsx("rect", { x: "-4", y: "0", width: "8", height: "10", fill: "#78350f", stroke: "#1c1917", strokeWidth: "1" }),
          // Upright Heavy Gangway Plank with Side Railings
          e.jsx("rect", { x: "-3", y: "-36", width: "6", height: "36", fill: "#854d0e", stroke: "#451a03", strokeWidth: "1.2", rx: "1" }),
          // Iron Spike / Raven Beak (Corvus) at the top
          e.jsx("polygon", { points: "3,-36 12,-34 3,-30", fill: "#e2e8f0", stroke: "#475569", strokeWidth: "1" }),
          // Pulley Tackle & Cable
          e.jsx("line", { x1: "0", y1: "-34", x2: "-14", y2: "-10", stroke: "#d97706", strokeWidth: "1.2", strokeDasharray: "2 1" })
        ]
      }),

      // 13. Syracusan Greek Fire Siphon Dragon Head (Tiers 3-5)
      !isDead && shipTier >= 3 && e.jsxs("g", {
        id: "mounted-fire-siphon-prow",
        transform: isFlag ? "translate(" + (bowX - 6) + ", " + (gunwaleY + 2) + ")" : "translate(" + (bowX - 12) + ", " + (gunwaleY + 2) + ")",
        children: [
          // Bronze Dragon Head Nozzle
          e.jsx("ellipse", { cx: "0", cy: "0", rx: "8", ry: "5.5", fill: "#92400e", stroke: "#ea580c", strokeWidth: "1.4" }),
          e.jsx("path", { d: "M 4 -4 L 16 -6 L 16 6 L 4 4 Z", fill: "#b45309", stroke: "#f97316", strokeWidth: "1.2" }),
          // Fire Dragon Horns
          e.jsx("path", { d: "M -2 -5 L 4 -10 M -4 -4 L 0 -9", stroke: "#fef08a", strokeWidth: "1.5" }),
          // Glowing Ember Maw
          e.jsx("circle", { cx: "16", cy: "0", r: "2.5", fill: "#fde047" }),
          (activeCombatFX && activeCombatFX.type === "fire_spray") && e.jsx("circle", { cx: "18", cy: "0", r: "10", fill: "#fdba74", className: "animate-ping" })
        ]
      }),

      // 14. Deck Heavy Artillery: Scorpio / Ballista (Tiers 2-5) or Onager (Tiers 4-5)
      !isDead && shipTier >= 2 && e.jsxs("g", {
        id: "mounted-deck-ballista",
        transform: isFlag ? "translate(42, " + (gunwaleY - 14) + ")" : "translate(22, " + (gunwaleY - 8) + ")",
        className: (activeCombatFX && activeCombatFX.type === "ballista_shot") ? "animate-ballista-swivel" : "",
        children: [
          // Turntable Mount
          e.jsx("rect", { x: "-5", y: "0", width: "10", height: "14", fill: "#78350f", rx: "1.5" }),
          // Dual Torsion Skein Cylinders
          e.jsx("rect", { x: "-12", y: "-4", width: "6", height: "10", fill: "#d97706", stroke: "#78350f", strokeWidth: "0.8" }),
          e.jsx("rect", { x: "6", y: "-4", width: "6", height: "10", fill: "#d97706", stroke: "#78350f", strokeWidth: "0.8" }),
          // Torsion Bow Arms
          e.jsx("line", { x1: "-14", y1: "1", x2: "14", y2: "1", stroke: "#fef08a", strokeWidth: "3.2", strokeLinecap: "round" }),
          // Cocked Steel Bolt
          e.jsx("line", { x1: "0", y1: "-10", x2: "0", y2: "8", stroke: "#38bdf8", strokeWidth: "2.4", strokeLinecap: "round" }),
          e.jsx("polygon", { points: "0,-12 -3,-8 3,-8", fill: "#f8fafc" })
        ]
      }),

      // Heavy Onager Catapult (Tiers 4-5 Flagship)
      !isDead && shipTier >= 4 && isFlag && e.jsxs("g", {
        id: "deck-heavy-onager-catapult",
        transform: "translate(-38, " + (gunwaleY - 12) + ")",
        children: [
          e.jsx("rect", { x: "-8", y: "0", width: "16", height: "12", fill: "#451a03", stroke: goldTrim, strokeWidth: "1.2", rx: "2" }),
          e.jsx("line", { x1: "-6", y1: "6", x2: "10", y2: "-18", stroke: "#b45309", strokeWidth: "4", strokeLinecap: "round" }),
          e.jsx("circle", { cx: "11", cy: "-19", r: "5", fill: "#78716c", stroke: "#292524", strokeWidth: "1" })
        ]
      }),

      // 15. Masterwork Masts, Rigging & Billowing Imperial Roman Sail
      !isDead && e.jsxs("g", {
        id: "ship-rigging-and-sail",
        children: [
          // Standing Rigging / Shrouds (Diagonal support ropes)
          e.jsx("line", { x1: "-5", y1: isFlag ? "-60" : "-42", x2: "-45", y2: gunwaleY, stroke: "rgba(217,119,6,0.6)", strokeWidth: "1.2" }),
          e.jsx("line", { x1: "-5", y1: isFlag ? "-60" : "-42", x2: "35", y2: gunwaleY, stroke: "rgba(217,119,6,0.6)", strokeWidth: "1.2" }),
          // Main Cedar Mast
          e.jsx("line", { x1: "-5", y1: gunwaleY + 10, x2: "-5", y2: isFlag ? (shipTier >= 4 ? "-72" : "-62") : "-48", stroke: "#573012", strokeWidth: isFlag ? "5" : "4", strokeLinecap: "round" }),
          // Horizontal Yardarm (Antenna) with Gilded End Caps
          e.jsx("line", {
            x1: isFlag ? (shipTier >= 4 ? "-58" : "-48") : "-34",
            y1: isFlag ? (shipTier >= 4 ? "-66" : "-56") : "-44",
            x2: isFlag ? (shipTier >= 4 ? "48" : "40") : "28",
            y2: isFlag ? (shipTier >= 4 ? "-60" : "-50") : "-40",
            stroke: "#78350f",
            strokeWidth: "4",
            strokeLinecap: "round"
          }),
          e.jsx("circle", { cx: isFlag ? (shipTier >= 4 ? "-58" : "-48") : "-34", cy: isFlag ? (shipTier >= 4 ? "-66" : "-56") : "-44", r: "3", fill: goldTrim }),
          e.jsx("circle", { cx: isFlag ? (shipTier >= 4 ? "48" : "40") : "28", cy: isFlag ? (shipTier >= 4 ? "-60" : "-50") : "-40", r: "3", fill: goldTrim }),

          // Billowing Roman Square Sail with Curvature & Shading
          e.jsx("path", {
            d: isFlag 
              ? (shipTier >= 4 
                  ? "M -56 -64 Q 0 -78 46 -58 Q 18 -10 -56 -14 Z" 
                  : "M -46 -54 Q 0 -66 38 -48 Q 14 -12 -46 -16 Z")
              : "M -32 -42 Q 0 -52 26 -38 Q 10 -10 -32 -14 Z",
            fill: sailColor,
            stroke: goldTrim,
            strokeWidth: "2",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.85))"
          }),
          // Shaded Crease Folds on Billowing Sail
          e.jsx("path", {
            d: isFlag 
              ? (shipTier >= 4 ? "M -30 -68 Q 0 -40 -20 -15 M 10 -64 Q 25 -38 12 -12" : "M -20 -58 Q 0 -34 -15 -14 M 10 -54 Q 20 -34 10 -12")
              : "M -12 -44 Q 0 -26 -10 -12",
            fill: "none",
            stroke: sailShadow,
            strokeWidth: "2.5",
            opacity: "0.55"
          }),

          // MASTERWORK SAIL HERALDRY & EMBELLISHMENTS
          isPlayer && e.jsxs("g", {
            id: "sail-heraldry-emblem",
            children: [
              // Tier 1: Bold Classical SPQR & Laurel Branch
              shipTier === 1 && e.jsxs("g", {
                children: [
                  e.jsx("text", { x: "-2", y: isFlag ? "-32" : "-24", fontSize: isFlag ? "15" : "11", textAnchor: "middle", fill: goldTrim, fontWeight: "900", fontFamily: "Cinzel, serif", letterSpacing: "2px", children: "SPQR" }),
                  e.jsx("path", { d: "M -18 " + (isFlag ? "-26" : "-20") + " Q 0 " + (isFlag ? "-20" : "-16") + " 18 " + (isFlag ? "-26" : "-20"), fill: "none", stroke: goldTrim, strokeWidth: "1.2" })
                ]
              }),
              // Tier 2: Golden Imperial Laurel Wreath (Corona Triumphalis) encircling SPQR
              shipTier === 2 && e.jsxs("g", {
                transform: "translate(-2, " + (isFlag ? "-34" : "-26") + ")",
                children: [
                  e.jsx("circle", { cx: "0", cy: "0", r: isFlag ? "16" : "12", fill: "none", stroke: goldTrim, strokeWidth: "1.8", strokeDasharray: "4 2" }),
                  e.jsx("text", { x: "0", y: isFlag ? "4" : "3", fontSize: isFlag ? "12" : "9", textAnchor: "middle", fill: goldTrim, fontWeight: "900", fontFamily: "Cinzel, serif", letterSpacing: "1px", children: "SPQR" })
                ]
              }),
              // Tier 3: Golden Roman Eagle (Aquila Aloft) clutching Thunderbolts
              shipTier === 3 && e.jsxs("g", {
                transform: "translate(-2, " + (isFlag ? "-36" : "-28") + ")",
                children: [
                  // Spread Eagle Wings
                  e.jsx("path", { d: "M 0 4 Q -16 -16 -24 0 Q -10 -4 0 6 Q 10 -4 24 0 Q 16 -16 0 4 Z", fill: goldTrim, stroke: "#78350f", strokeWidth: "1" }),
                  // Eagle Head & Beak
                  e.jsx("circle", { cx: "0", cy: "-6", r: "4.5", fill: goldTrim }),
                  e.jsx("polygon", { points: "0,-9 6,-6 0,-3", fill: "#fef08a" }),
                  // Jupiter Lightning Bolts in Talons
                  e.jsx("path", { d: "M -12 10 L 0 6 L 12 10 M -8 8 L -14 14 M 8 8 L 14 14", fill: "none", stroke: "#fef08a", strokeWidth: "1.8" }),
                  e.jsx("text", { x: "0", y: "16", fontSize: "8", textAnchor: "middle", fill: goldTrim, fontWeight: "900", fontFamily: "Cinzel, serif", children: "SPQR" })
                ]
              }),
              // Tier 4: Radiant Sol Invictus Golden Sunburst with Laurels & Imperial Eagle
              shipTier === 4 && e.jsxs("g", {
                transform: "translate(-2, " + (isFlag ? "-38" : "-30") + ")",
                children: [
                  // Radiant Sunburst Rays
                  [0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => e.jsx("line", {
                    key: "sun_ray_" + i,
                    x1: "0", y1: "0",
                    x2: Math.round(Math.cos(ang * Math.PI / 180) * 22),
                    y2: Math.round(Math.sin(ang * Math.PI / 180) * 22),
                    stroke: goldTrim,
                    strokeWidth: "2"
                  })),
                  // Golden Sun Disc
                  e.jsx("circle", { cx: "0", cy: "0", r: "10", fill: goldTrim, stroke: "#b45309", strokeWidth: "1.5" }),
                  // Crowned Imperial Eagle
                  e.jsx("text", { x: "0", y: "5", fontSize: "14", textAnchor: "middle", fill: "#78350f", fontWeight: "900", children: "🦅" })
                ]
              }),
              // Tier 5: Divus Imperator Celestial Sol & Golden Laurel Crown
              shipTier >= 5 && e.jsxs("g", {
                transform: "translate(-2, " + (isFlag ? "-40" : "-32") + ")",
                children: [
                  // Grand Sunburst
                  [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((ang, i) => e.jsx("line", {
                    key: "div_ray_" + i,
                    x1: "0", y1: "0",
                    x2: Math.round(Math.cos(ang * Math.PI / 180) * 26),
                    y2: Math.round(Math.sin(ang * Math.PI / 180) * 26),
                    stroke: "#fef08a",
                    strokeWidth: "2.4"
                  })),
                  e.jsx("circle", { cx: "0", cy: "0", r: "13", fill: "url(#lng_gd)", stroke: "#fef08a", strokeWidth: "2" }),
                  e.jsx("text", { x: "0", y: "6", fontSize: "16", textAnchor: "middle", fill: "#78350f", fontWeight: "900", children: "👑" })
                ]
              })
            ]
          }),

          // Masthead Flying Vexillum Silk Standard & Pennant
          e.jsxs("g", {
            transform: "translate(-5, " + (isFlag ? (shipTier >= 4 ? "-72" : "-62") : "-48") + ")",
            children: [
              // Gilded finial sphere
              e.jsx("circle", { cx: "0", cy: "0", r: "3", fill: goldTrim }),
              // Fluttering Swallowtail Pennant
              e.jsx("path", {
                d: isFlag ? "M 0 0 L 32 -3 L 22 4 L 32 11 L 0 5 Z" : "M 0 0 L 22 -2 L 15 3 L 22 8 L 0 4 Z",
                fill: isPlayer ? "#ef4444" : "#f59e0b",
                stroke: goldTrim,
                strokeWidth: "1"
              })
            ]
          })
        ]
      }),

      // 16. Status effects overlay
      (() => {
        const sList = isPlayer ? (typeof playerStatus !== "undefined" ? (playerStatus || []) : []) : (typeof enemyStatus !== "undefined" ? (enemyStatus || []) : []);
        if (!sList || sList.length === 0) return null;
        return e.jsxs("g", {
          id: "status-fx-ship",
          children: [
            sList.some(s => s.type === "fire") && e.jsx("path", { d: "M -40 -10 Q -30 -45 -20 -15 Q -10 -50 0 -10 Q 10 -45 20 -15 Q 30 -50 40 -10 Z", fill: "url(#grad-greek-fire)", opacity: "0.85", className: "animate-phys-flames" }),
            sList.some(s => s.type === "poison") && e.jsx("ellipse", { cx: "0", cy: "15", rx: "45", ry: "10", fill: "rgba(34,197,94,0.35)", className: "animate-phys-poison" }),
            sList.some(s => s.type === "shock") && e.jsx("path", { d: "M -35 -20 L -15 0 L -5 -25 L 15 5 L 35 -15", stroke: "#38bdf8", strokeWidth: "2.5", fill: "none", className: "animate-phys-shock" }),
            sList.some(s => s.type === "stun") && e.jsx("ellipse", { cx: "0", cy: "-45", rx: "25", ry: "8", fill: "none", stroke: "#fde047", strokeWidth: "2", strokeDasharray: "4 4", className: "animate-phys-stun" })
          ]
        });
      })()
    ]
  });
};

// 2. MASTERWORK ROMAN LEGIONS (TIERS 1 TO 5 PROGRESSION WITH CLEAR SOLDIER ANATOMY & IMPERIAL REGALIA)
const render2DLegion = (x, y, isPlayer, role = "cohort", faction = "roman", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false, isTargeted = false, staggerClass = "", tier = 1) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const isCommander = role === "flagship" || role === "commander";
  const flip = isPlayer ? 1 : -1;
  const legionTier = Math.min(5, Math.max(1, tier || 1));

  // Authentic Roman Palette
  const shieldColor = isPlayer 
    ? (legionTier >= 5 ? "#4c0519" : legionTier >= 4 ? "#7f1d1d" : legionTier >= 3 ? "#991b1b" : legionTier >= 2 ? "#b91c1c" : "#dc2626") 
    : (faction === "punic" ? "#701a75" : faction === "greek" ? "#1e3a8a" : faction === "barbarian" ? "#451a03" : "#334155");
  const tunicRed = isPlayer ? "#b91c1c" : (faction === "punic" ? "#6b21a8" : faction === "greek" ? "#1d4ed8" : "#78350f");
  const goldTrim = legionTier >= 4 ? "#fef08a" : (legionTier >= 3 ? "#fde047" : "#f59e0b");
  const armorSteel = legionTier >= 4 ? "#fef08a" : (legionTier >= 3 ? "#e2e8f0" : "#94a3b8");

  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s cubic-bezier(0.25, 1, 0.5, 1) forwards" : "none"
    },
    className: "transition-all duration-300 ease-out " + staggerClass + " " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]" : isDead ? "drop-shadow-[0_0_24px_rgba(239,68,68,0.9)]" : ""),
    children: [
      // 1. Natural Ground Shadow & Tactile Terrain Foundation
      e.jsx("ellipse", { cx: "0", cy: "28", rx: isCommander ? (legionTier >= 4 ? "85" : "75") : "58", ry: "16", fill: "#000000", opacity: "0.7" }),
      
      // 2. Rear Rank (Support Line: Field Artillery & High Pila Spears)
      // Attached Field Scorpio Catapult (Tiers 4-5 Commander Cohort)
      !isDead && legionTier >= 4 && isCommander && e.jsxs("g", {
        id: "field-scorpio-artillery",
        transform: "translate(-42, 2)",
        children: [
          // Wooden Tripod Legs
          e.jsx("line", { x1: "0", y1: "0", x2: "-10", y2: "22", stroke: "#78350f", strokeWidth: "3" }),
          e.jsx("line", { x1: "0", y1: "0", x2: "8", y2: "22", stroke: "#573012", strokeWidth: "3" }),
          // Scorpio Bronze Frame & Torsion skeins
          e.jsx("rect", { x: "-6", y: "-8", width: "12", height: "16", fill: "#854d0e", stroke: goldTrim, strokeWidth: "1.2", rx: "1.5" }),
          // Bow arms
          e.jsx("line", { x1: "-16", y1: "-4", x2: "16", y2: "-4", stroke: goldTrim, strokeWidth: "3.5", strokeLinecap: "round" }),
          // Cocked Bolt pointing forward to +X
          e.jsx("line", { x1: "-4", y1: "-4", x2: "24", y2: "-10", stroke: "#f1f5f9", strokeWidth: "2.4" }),
          e.jsx("polygon", { points: "26,-10 20,-8 21,-13", fill: "#ffffff" })
        ]
      }),

      // 3. Second Rank: Veteran Legionaries with Elevated Ready Pila (45° angle)
      !isDead && [-30, -15, 0, 15, 30].map((sX, idx) => e.jsxs("g", {
        key: "vet_legionary_" + idx,
        children: [
          // Legionary Torso & Tunic
          e.jsx("rect", { x: sX - 5, y: "0", width: "10", height: "18", fill: tunicRed, rx: "2" }),
          // Lorica Armor (Hamata / Segmentata plates)
          e.jsx("rect", { x: sX - 5, y: "2", width: "10", height: "12", fill: armorSteel, stroke: "#475569", strokeWidth: "0.8", rx: "1" }),
          // Realistic Roman Galea Helmet (Bowl, Neck Flange, Cheek Pieces)
          e.jsx("ellipse", { cx: sX, cy: "-3", rx: "5", ry: "4.5", fill: legionTier >= 4 ? goldTrim : (legionTier >= 3 ? "#e2e8f0" : "#d97706"), stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("path", { d: "M " + (sX - 5) + " -1 Q " + sX + " 2 " + (sX + 5) + " -1", fill: "none", stroke: "#475569", strokeWidth: "1.5" }),
          // Crest Plume (Red feathers / horsehair)
          legionTier >= 2 && e.jsx("path", { d: "M " + sX + " -7 Q " + (sX + 3) + " -14 " + (sX + 7) + " -8", stroke: "#dc2626", strokeWidth: "2.5", strokeLinecap: "round" }),
          // Heavy Roman Pilum Spear (Raised at 45° angle pointing forward to +X)
          e.jsx("line", { x1: sX, y1: "8", x2: sX + 38, y2: "-24", stroke: "#78350f", strokeWidth: "2.6", strokeLinecap: "round" }),
          e.jsx("circle", { cx: sX + 22, cy: "-10", r: "2.5", fill: "#475569" }), // Lead Weighting Ball (Columella)
          e.jsx("line", { x1: sX + 24, y1: "-12", x2: sX + 42, y2: "-27", stroke: "#f1f5f9", strokeWidth: "2" }), // Soft Iron Shank
          e.jsx("polygon", { points: (sX + 44) + ",-28 " + (sX + 39) + ",-23 " + (sX + 41) + ",-30", fill: "#ffffff" }) // Barbed Pyramidal Point
        ]
      })),

      // 4. Aquilifer Standard Bearer (Golden Roman Eagle & Lion Pelt Standard)
      !isDead && isCommander && legionTier >= 3 && e.jsxs("g", {
        id: "aquilifer-standard-bearer",
        transform: "translate(-14, -34)",
        children: [
          // Tall Standard Pole
          e.jsx("line", { x1: "0", y1: "0", x2: "0", y2: "62", stroke: goldTrim, strokeWidth: "3.8" }),
          // Golden SPQR Aquila (Roman Eagle Perched on Lightning Bolt)
          e.jsx("circle", { cx: "0", cy: "-4", r: legionTier >= 4 ? "11" : "9.5", fill: goldTrim, stroke: "#78350f", strokeWidth: "1.8" }),
          e.jsx("path", { d: "M -9 -6 L 0 -20 L 9 -6 L 5 4 L -5 4 Z", fill: goldTrim, stroke: "#78350f", strokeWidth: "1.2" }),
          // Jupiter Lightning Bar
          e.jsx("line", { x1: "-10", y1: "5", x2: "10", y2: "5", stroke: "#fef08a", strokeWidth: "2.5" }),
          // SPQR Vexillum Banner with Golden Fringe
          e.jsx("rect", { x: "-14", y: "8", width: "28", height: "14", fill: "#991b1b", stroke: goldTrim, strokeWidth: "1.2" }),
          e.jsx("text", { x: "0", y: "18", fontSize: "7", textAnchor: "middle", fill: goldTrim, fontWeight: "900", fontFamily: "Cinzel, serif", letterSpacing: "1px", children: "LEG · X" }),
          // Lion Pelt Hood (Ferocious beast jaws framing standard bearer)
          e.jsx("circle", { cx: "0", cy: "28", r: "6", fill: "#b45309", stroke: "#78350f", strokeWidth: "1" }),
          e.jsx("path", { d: "M -6 26 L -2 22 L 2 22 L 6 26", fill: "#fef08a" }),
          e.jsx("path", { d: "M -8 32 Q -16 44 -6 56 Q 6 44 4 32", fill: "#d97706", stroke: "#78350f", strokeWidth: "1" })
        ]
      }),

      // 5. Centurion Officer (Crista Transversa Crimson Crest, Muscle Cuirass & Vitis Staff)
      !isDead && isCommander && legionTier >= 2 && e.jsxs("g", {
        id: "centurion-command-officer",
        transform: "translate(34, -4)",
        children: [
          // Centurion Body & Muscle Cuirass (Lorica Musculata)
          e.jsx("rect", { x: "-6", y: "4", width: "12", height: "18", fill: goldTrim, stroke: "#78350f", strokeWidth: "1.2", rx: "2" }),
          // Gorgoneion Chest Medallion
          e.jsx("circle", { cx: "0", cy: "10", r: "2.8", fill: "#991b1b" }),
          // Silver Greaves (Ocreae) on Shins
          e.jsx("line", { x1: "-3", y1: "22", x2: "-3", y2: "32", stroke: "#f1f5f9", strokeWidth: "3" }),
          e.jsx("line", { x1: "3", y1: "22", x2: "3", y2: "32", stroke: "#f1f5f9", strokeWidth: "3" }),
          // Caligae Military Sandals
          e.jsx("ellipse", { cx: "-3", cy: "33", rx: "2.5", ry: "1.5", fill: "#451a03" }),
          e.jsx("ellipse", { cx: "3", cy: "33", rx: "2.5", ry: "1.5", fill: "#451a03" }),
          // Galea Helmet with Cheek Guards
          e.jsx("circle", { cx: "0", cy: "-2", r: "5.5", fill: goldTrim, stroke: "#78350f", strokeWidth: "1.2" }),
          // Transverse Red Horsehair Crest (Crista Transversa)
          e.jsx("ellipse", { cx: "0", cy: "-8", rx: "10", ry: "3.5", fill: "#dc2626", stroke: "#991b1b", strokeWidth: "1" }),
          // Raised Gleaming Gladius Sword pointing forward to +X
          e.jsx("line", { x1: "4", y1: "8", x2: "22", y2: "2", stroke: "#f8fafc", strokeWidth: "2.6", strokeLinecap: "round" }),
          e.jsx("circle", { cx: "4", cy: "8", r: "2", fill: goldTrim }), // Pommel
          // Vine Staff of Command (Vitis)
          e.jsx("line", { x1: "-5", y1: "8", x2: "-8", y2: "28", stroke: "#b45309", strokeWidth: "2", strokeLinecap: "round" })
        ]
      }),

      // 6. Front Rank: Masterwork Interlocking Scutum Wall & Disciplined Legionaries
      !isDead && e.jsxs("g", {
        id: "legion-front-rank-shield-wall",
        children: [-24, -8, 8, 24].map((sX, idx) => e.jsxs("g", {
          key: "fr_legionary_" + idx,
          children: [
            // Visible Caligae Hobnailed Sandals & Greaved Legs
            e.jsx("line", { x1: sX + 3, y1: "24", x2: sX + 3, y2: "34", stroke: goldTrim, strokeWidth: "2.8" }),
            e.jsx("line", { x1: sX + 11, y1: "24", x2: sX + 11, y2: "34", stroke: goldTrim, strokeWidth: "2.8" }),
            e.jsx("ellipse", { cx: sX + 3, cy: "35", rx: "2.8", ry: "1.8", fill: "#29180c" }),
            e.jsx("ellipse", { cx: sX + 11, cy: "35", rx: "2.8", ry: "1.8", fill: "#29180c" }),

            // Legionary Helmet Peeking Over Scutum
            e.jsx("ellipse", { cx: sX + 7, cy: "4", rx: "4.8", ry: "4", fill: legionTier >= 4 ? goldTrim : (legionTier >= 3 ? "#e2e8f0" : "#d97706"), stroke: "#78350f", strokeWidth: "1" }),
            legionTier >= 2 && e.jsx("rect", { x: sX + 4, y: "6", width: "6", height: "3", fill: "#cbd5e1" }), // Brow guard

            // Authentic Curved Rectangular Scutum Shield (3D Bevel & Gilded Brass Edging)
            e.jsx("rect", {
              x: sX - 2,
              y: "6",
              width: "18",
              height: "28",
              rx: "3",
              fill: shieldColor,
              stroke: goldTrim,
              strokeWidth: legionTier >= 3 ? "2" : "1.4",
              filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.9))"
            }),
            // Gilded Bronze Umbo (3D Raised Shield Boss with Rivets)
            e.jsx("circle", { cx: sX + 7, cy: "20", r: "4.5", fill: goldTrim, stroke: "#78350f", strokeWidth: "1.2" }),
            e.jsx("circle", { cx: sX + 7, cy: "20", r: "1.8", fill: "#fef08a" }),

            // Winged Fulmen Thunderbolts & Laurel Garlands on Shield Face
            e.jsx("path", {
              d: "M " + (sX + 1) + " 13 L " + (sX + 7) + " 16 L " + (sX + 13) + " 13 M " + (sX + 1) + " 27 L " + (sX + 7) + " 24 L " + (sX + 13) + " 27",
              fill: "none",
              stroke: goldTrim,
              strokeWidth: "1.4"
            }),
            legionTier >= 3 && e.jsx("circle", { cx: sX + 7, cy: "20", r: "7", fill: "none", stroke: goldTrim, strokeWidth: "0.8", strokeDasharray: "2 1" })
          ]
        }))
      }),

      // 7. Front Rank Levelled Barbed Pila Spears (Thrusting Forward to +X)
      !isDead && e.jsxs("g", {
        className: isAttacking ? "animate-pila-thrust" : "",
        children: [
          e.jsx("line", { x1: "26", y1: "18", x2: legionTier >= 4 ? "76" : "66", y2: "16", stroke: "#78350f", strokeWidth: "3.2", strokeLinecap: "round" }),
          e.jsx("circle", { cx: "52", cy: "17", r: "2.8", fill: "#475569" }), // Lead Weight
          e.jsx("line", { x1: "54", y1: "17", x2: legionTier >= 4 ? "78" : "68", y2: "16", stroke: "#f1f5f9", strokeWidth: "2.4" }), // Soft Iron Shank
          e.jsx("polygon", { points: (legionTier >= 4 ? "80" : "70") + ",16 " + (legionTier >= 4 ? "74" : "64") + ",13 " + (legionTier >= 4 ? "75" : "65") + ",19", fill: "#ffffff" })
        ]
      }),

      // 8. Status effects overlay
      (() => {
        const sList = isPlayer ? (typeof playerStatus !== "undefined" ? (playerStatus || []) : []) : (typeof enemyStatus !== "undefined" ? (enemyStatus || []) : []);
        if (!sList || sList.length === 0) return null;
        return e.jsxs("g", {
          id: "status-fx-legion",
          children: [
            sList.some(s => s.type === "fire") && e.jsx("path", { d: "M -30 20 Q -20 -25 -10 5 Q 0 -30 10 5 Q 20 -25 30 20 Z", fill: "url(#grad-greek-fire)", opacity: "0.85", className: "animate-phys-flames" }),
            sList.some(s => s.type === "poison") && e.jsx("ellipse", { cx: "0", cy: "22", rx: "35", ry: "8", fill: "rgba(34,197,94,0.4)", className: "animate-phys-poison" }),
            sList.some(s => s.type === "shock") && e.jsx("path", { d: "M -25 -10 L -10 10 L 0 -15 L 15 15 L 25 -5", stroke: "#38bdf8", strokeWidth: "2.5", fill: "none", className: "animate-phys-shock" }),
            sList.some(s => s.type === "stun") && e.jsx("ellipse", { cx: "0", cy: "-40", rx: "22", ry: "7", fill: "none", stroke: "#fde047", strokeWidth: "2", strokeDasharray: "4 4", className: "animate-phys-stun" })
          ]
        });
      })()
    ]
  });
};

// 3. MASTERWORK BARBARIAN WARBAND (CELTIC / GALLIC / GERMANIC BERSERKERS WITH HORNS, WOAD PAINT & CARNYX)
const render2DBarbarianWarband = (x, y, isPlayer, faction = "barbarian", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s forwards" : "none"
    },
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(245,158,11,0.9)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "28", rx: "68", ry: "16", fill: "#000000", opacity: "0.7" }),
      // Rear Row: Carnyx War Trumpet & Horned Chieftains
      !isDead && [-28, -10, 10, 28].map((sX, idx) => e.jsxs("g", {
        key: "barb_br_" + idx,
        children: [
          // Muscular Torso with Woad Blue War Paint Tattoos
          e.jsx("rect", { x: sX - 5, y: "2", width: "10", height: "18", fill: "#78350f", rx: "2" }),
          e.jsx("path", { d: "M " + (sX - 4) + " 6 Q " + sX + " 10 " + (sX + 4) + " 6", stroke: "#0284c7", strokeWidth: "1.8", fill: "none" }),
          // Head & Spiked/Horned Iron Helmet
          e.jsx("circle", { cx: sX, cy: "-2", r: "5", fill: "#78350f", stroke: "#29180c", strokeWidth: "1" }),
          // Heavy Curved Beast Horns
          e.jsx("path", { d: "M " + (sX - 3) + " -5 Q " + (sX - 12) + " -14 " + (sX - 8) + " -22", stroke: "#fef08a", strokeWidth: "2.2", fill: "none", strokeLinecap: "round" }),
          e.jsx("path", { d: "M " + (sX + 3) + " -5 Q " + (sX + 12) + " -14 " + (sX + 8) + " -22", stroke: "#fef08a", strokeWidth: "2.2", fill: "none", strokeLinecap: "round" }),
          // Chieftain Carnyx Boar Horn
          idx === 0 
            ? e.jsxs("g", {
                children: [
                  e.jsx("path", { d: "M " + sX + " 2 L " + (sX - 6) + " -32 Q " + (sX + 6) + " -40 " + (sX + 14) + " -32", stroke: "#f59e0b", strokeWidth: "3", fill: "none" }),
                  e.jsx("circle", { cx: sX + 14, cy: "-32", r: "4", fill: "#d97706" })
                ]
              })
            : e.jsxs("g", {
                children: [
                  e.jsx("line", { x1: sX, y1: "4", x2: sX + 36, y2: "-18", stroke: "#e2e8f0", strokeWidth: "3", strokeLinecap: "round" }),
                  e.jsx("circle", { cx: sX, cy: "4", r: "2.5", fill: "#d97706" })
                ]
              })
        ]
      })),
      // Front Row: Wicker Oval Shields with Celtic Knots & Longswords
      !isDead && [-18, 4, 26].map((sX, idx) => e.jsxs("g", {
        key: "barb_fr_" + idx,
        children: [
          // Legs & Fur Boots
          e.jsx("line", { x1: sX + 3, y1: "24", x2: sX + 3, y2: "33", stroke: "#451a03", strokeWidth: "3" }),
          e.jsx("line", { x1: sX + 11, y1: "24", x2: sX + 11, y2: "33", stroke: "#451a03", strokeWidth: "3" }),
          // Large Celtic Oval Shield with Heavy Bronze Rim
          e.jsx("ellipse", { cx: sX + 7, cy: "14", rx: "11", ry: "17", fill: "#451a03", stroke: "#f59e0b", strokeWidth: "2", filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.85))" }),
          // Celtic Knot Motif
          e.jsx("circle", { cx: sX + 7, cy: "14", r: "4.5", fill: "none", stroke: "#0284c7", strokeWidth: "2" }),
          e.jsx("line", { x1: sX + 7, y1: "2", x2: sX + 7, y2: "26", stroke: "#fef08a", strokeWidth: "1.5" }),
          // Forward Thrusting Celtic Iron Longsword
          e.jsx("line", { x1: sX + 14, y1: "12", x2: sX + 44, y2: "6", stroke: "#f1f5f9", strokeWidth: "3", strokeLinecap: "round" }),
          e.jsx("polygon", { points: (sX + 46) + ",6 " + (sX + 40) + ",3 " + (sX + 40) + ",9", fill: "#ffffff" })
        ]
      }))
    ]
  });
};

// 4. MASTERWORK GREEK PHALANX (HOPLITES WITH CORINTHIAN HELMETS & ASPIS SHIELDS)
const render2DGreekPhalanx = (x, y, isPlayer, faction = "greek", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s forwards" : "none"
    },
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(59,130,246,0.9)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "28", rx: "65", ry: "16", fill: "#000000", opacity: "0.7" }),
      // Rear Rank Hoplites with Tall Crests & Leveled Dory Spears
      !isDead && [-24, -8, 8, 24].map((sX, idx) => e.jsxs("g", {
        key: "grk_br_" + idx,
        children: [
          // Bronze Muscle Cuirass
          e.jsx("rect", { x: sX - 5, y: "2", width: "10", height: "18", fill: "#b45309", stroke: "#78350f", strokeWidth: "1", rx: "1.5" }),
          // Corinthian Helmet Bowl
          e.jsx("circle", { cx: sX, cy: "-2", r: "5.2", fill: "#d97706", stroke: "#78350f", strokeWidth: "1.2" }),
          // Flowing Blue/Gold Horsehair Crest
          e.jsx("ellipse", { cx: sX, cy: "-8", rx: "8", ry: "3.5", fill: "#1e3a8a", stroke: "#fef08a", strokeWidth: "1" }),
          // Long Dory Spear pointing forward to +X
          e.jsx("line", { x1: sX, y1: "6", x2: sX + 54, y2: "-14", stroke: "#78350f", strokeWidth: "2.6", strokeLinecap: "round" }),
          e.jsx("polygon", { points: (sX + 56) + ",-14 " + (sX + 48) + ",-11 " + (sX + 50) + ",-17", fill: "#ffffff" })
        ]
      })),
      // Front Rank Round Bronze Aspis Shields with Lambda / Gorgon Emblems
      !isDead && [-18, 2, 22].map((sX, idx) => e.jsxs("g", {
        key: "grk_fr_" + idx,
        children: [
          // Greaved Legs
          e.jsx("line", { x1: sX + 3, y1: "24", x2: sX + 3, y2: "33", stroke: "#d97706", strokeWidth: "3" }),
          e.jsx("line", { x1: sX + 11, y1: "24", x2: sX + 11, y2: "33", stroke: "#d97706", strokeWidth: "3" }),
          // Large Round Convex Aspis Shield
          e.jsx("circle", { cx: sX + 8, cy: "14", r: "15", fill: "#1e3a8a", stroke: "#f59e0b", strokeWidth: "2.2", filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.85))" }),
          // Spartan Lambda or Athenian Owl Motif
          e.jsx("path", { d: "M " + (sX + 3) + " 20 L " + (sX + 8) + " 8 L " + (sX + 13) + " 20", stroke: "#fef08a", strokeWidth: "2.6", fill: "none" })
        ]
      }))
    ]
  });
};

// 5. MASTERWORK PUNIC SACRED BAND / LIBYAN VETERANS
const render2DPunicInfantry = (x, y, isPlayer, faction = "punic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s forwards" : "none"
    },
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(168,85,247,0.9)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "28", rx: "65", ry: "16", fill: "#000000", opacity: "0.7" }),
      // Rear Rank Veterans with Phrygian Helmets & Sarissas
      !isDead && [-24, -8, 8, 24].map((sX, idx) => e.jsxs("g", {
        key: "pun_br_" + idx,
        children: [
          // Scale Armor (Lorica Squamata)
          e.jsx("rect", { x: sX - 5, y: "2", width: "10", height: "18", fill: "#581c87", stroke: "#f59e0b", strokeWidth: "1", rx: "1.5" }),
          // Phrygian Helmet with Forward Crest
          e.jsx("circle", { cx: sX, cy: "-2", r: "5.2", fill: "#d97706", stroke: "#4a044e", strokeWidth: "1.2" }),
          e.jsx("path", { d: "M " + (sX - 3) + " -5 Q " + (sX + 6) + " -12 " + (sX + 4) + " -2", fill: "#701a75" }),
          // Long Thrusting Sarissa Pike
          e.jsx("line", { x1: sX, y1: "6", x2: sX + 56, y2: "-14", stroke: "#78350f", strokeWidth: "2.6", strokeLinecap: "round" }),
          e.jsx("polygon", { points: (sX + 58) + ",-14 " + (sX + 50) + ",-11 " + (sX + 52) + ",-17", fill: "#ffffff" })
        ]
      })),
      // Front Rank Purple Shields with Golden Tanit Symbol
      !isDead && [-18, 2, 22].map((sX, idx) => e.jsxs("g", {
        key: "pun_fr_" + idx,
        children: [
          // Greaved Legs
          e.jsx("line", { x1: sX + 3, y1: "24", x2: sX + 3, y2: "33", stroke: "#f59e0b", strokeWidth: "3" }),
          e.jsx("line", { x1: sX + 11, y1: "24", x2: sX + 11, y2: "33", stroke: "#f59e0b", strokeWidth: "3" }),
          // Heavy Carthaginian Shield
          e.jsx("rect", { x: sX - 1, y: "4", width: "18", height: "28", rx: "3.5", fill: "#701a75", stroke: "#f59e0b", strokeWidth: "2", filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.85))" }),
          // Sacred Tanit Symbol of Carthage
          e.jsx("circle", { cx: sX + 8, cy: "12", r: "3", fill: "#fef08a" }),
          e.jsx("line", { x1: sX + 3, y1: "17", x2: sX + 13, y2: "17", stroke: "#fef08a", strokeWidth: "1.8" }),
          e.jsx("polygon", { points: (sX + 8) + ",17 " + (sX + 4) + ",25 " + (sX + 12) + ",25", fill: "none", stroke: "#fef08a", strokeWidth: "1.6" })
        ]
      }))
    ]
  });
};

// 6. MASTERWORK ARMORED WAR ELEPHANT (CARTHAGINIAN / SELEUCID BEAST OF WAR WITH HOWDAH & MAHOUT)
const render2DWarElephant = (x, y, isPlayer, faction = "punic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s forwards" : "none"
    },
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_24px_rgba(251,191,36,0.95)]" : ""),
    children: [
      // Ground Shadow & Stomp Shockwave
      e.jsx("ellipse", { cx: "0", cy: "34", rx: "75", ry: "20", fill: "#000000", opacity: "0.75" }),
      isAttacking && e.jsx("circle", { cx: "55", cy: "34", r: "34", fill: "rgba(245,158,11,0.4)", className: "animate-ping" }),
      
      // Massive Muscular Elephant Body with Wrinkled Shading
      e.jsx("path", {
        d: "M -55 12 Q -68 -32 -24 -38 Q 30 -40 56 -12 Q 68 12 50 30 L 34 30 L 25 12 L -12 12 L -22 30 L -42 30 Z",
        fill: "#475569",
        stroke: "#1e293b",
        strokeWidth: "2.4",
        filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.85))"
      }),
      // Elephant Muscular Legs
      e.jsx("rect", { x: "-38", y: "10", width: "18", height: "24", rx: "5", fill: "#334155", stroke: "#1e293b", strokeWidth: "1.2" }),
      e.jsx("rect", { x: "24", y: "10", width: "20", height: "24", rx: "5", fill: "#334155", stroke: "#1e293b", strokeWidth: "1.2" }),

      // Embroidered Royal Punic Saddlecloth (Tyrian Purple & Gold Tassels)
      e.jsx("path", {
        d: "M -32 -20 Q 4 -24 38 -20 L 32 12 Q 0 16 -26 12 Z",
        fill: "#701a75",
        stroke: "#f59e0b",
        strokeWidth: "2.4"
      }),
      [-20, -5, 10, 25].map((tx, i) => e.jsx("circle", { key: "tassel_" + i, cx: tx, cy: "14", r: "2.2", fill: "#fef08a" })),

      // Fortified Wooden Howdah Battle Tower with Numidian Archer
      !isDead && e.jsxs("g", {
        id: "elephant-howdah-tower",
        transform: "translate(-6, -58)",
        children: [
          // Tower Wall
          e.jsx("rect", { x: "-22", y: "0", width: "44", height: "26", rx: "3", fill: "#573012", stroke: "#d97706", strokeWidth: "2" }),
          // Gilded Crenellated Battlements
          e.jsx("polygon", { points: "-22,0 -16,0 -16,5 -8,5 -8,0 0,0 0,5 8,5 8,0 16,0 16,5 22,5 22,0 22,6 -22,6", fill: "#fef08a" }),
          // Numidian Archer Aiming Bow
          e.jsx("circle", { cx: "4", cy: "-7", r: "5.5", fill: "#d97706" }),
          e.jsx("path", { d: "M 8 -16 Q 20 -8 8 2", fill: "none", stroke: "#fef08a", strokeWidth: "2.5" }),
          e.jsx("line", { x1: "2", y1: "-7", x2: "22", y2: "-7", stroke: "#f8fafc", strokeWidth: "1.8" }),
          // Punic War Standard Banner
          e.jsx("line", { x1: "-16", y1: "0", x2: "-16", y2: "-22", stroke: "#d97706", strokeWidth: "2.4" }),
          e.jsx("polygon", { points: "-16,-22 2,-25 -4,-16", fill: "#ef4444" })
        ]
      }),

      // Elephant Head, Chamfron Armor, Ears & Trunk (Facing +X)
      e.jsxs("g", {
        id: "elephant-head-assembly",
        transform: "translate(50, -12)",
        className: isAttacking ? "animate-pila-thrust" : "",
        children: [
          // Head Bowl
          e.jsx("circle", { cx: "0", cy: "0", r: "18", fill: "#475569" }),
          // Large Flared Ear with Bronze Boss
          e.jsx("path", { d: "M -10 -10 Q -30 0 -10 18 Z", fill: "#334155", stroke: "#1e293b", strokeWidth: "1.2" }),
          e.jsx("circle", { cx: "-14", cy: "2", r: "3", fill: "#f59e0b" }),
          // Bronze Chamfron Head Armor & Red Plume
          e.jsx("path", { d: "M 2 -14 L 14 -4 L 10 8 L -2 4 Z", fill: "#d97706", stroke: "#fef08a", strokeWidth: "1.8" }),
          e.jsx("ellipse", { cx: "4", cy: "-16", rx: "6", ry: "2.5", fill: "#dc2626" }),
          // Glowing Fierce Eye
          e.jsx("circle", { cx: "7", cy: "-4", r: "2.5", fill: "#fde047" }),
          // Massive Armored Ivory Tusks with Steel Spikes
          e.jsx("path", { d: "M 8 8 Q 28 14 38 -4", fill: "none", stroke: "#f8fafc", strokeWidth: "5.5", strokeLinecap: "round" }),
          e.jsx("polygon", { points: "38,-4 44,-12 34,-8", fill: "#d97706", stroke: "#fef08a", strokeWidth: "1" }),
          // Prehensile Armored Trunk
          e.jsx("path", { d: "M 12 4 Q 22 18 14 32 Q 6 42 20 44", fill: "none", stroke: "#475569", strokeWidth: "6.5", strokeLinecap: "round" })
        ]
      }),

      // Punic Mahout Rider on Elephant Neck
      !isDead && e.jsxs("g", {
        id: "elephant-mahout-rider",
        transform: "translate(28, -32)",
        children: [
          e.jsx("circle", { cx: "0", cy: "0", r: "5.5", fill: "#d97706" }),
          e.jsx("line", { x1: "2", y1: "0", x2: "12", y2: "10", stroke: "#fef08a", strokeWidth: "2.2" }) // Ankus goad
        ]
      })
    ]
  });
};

// 7. Masterwork Colossal Sea Monster (Leviathan / Hydra / Kraken)
const render2DSeaMonster = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_sinking_ship_pitch 2.5s forwards" : "none"
    },
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_20px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(56,189,248,1)]" : ""),
    children: [
      // Frothing Ocean Vortex Whirlpool
      e.jsx("ellipse", { cx: "0", cy: "25", rx: "75", ry: "20", fill: "rgba(14,165,233,0.35)", className: "animate-pulse" }),
      e.jsx("ellipse", { cx: "10", cy: "25", rx: "50", ry: "12", fill: "none", stroke: "#38bdf8", strokeWidth: "2", strokeDasharray: "8 4" }),
      // Coiling Serpentine Body Loops (Rising from deep water)
      e.jsx("path", {
        d: "M -60 25 Q -45 -15 -30 20 Q -10 -35 15 15 Q 35 -40 55 5",
        fill: "none",
        stroke: "url(#grad-gladius-steel)",
        strokeWidth: "18",
        strokeLinecap: "round"
      }),
      // Bioluminescent Dorsal Spines & Scales
      e.jsx("path", {
        d: "M -55 20 Q -40 -12 -25 18 M -5 -28 L 5 -35 L 15 -25",
        fill: "none",
        stroke: "#38bdf8",
        strokeWidth: "3.5"
      }),
      // Primary Serpentine Dragon Head (Facing Forward to +X)
      e.jsxs("g", {
        id: "sea-monster-head",
        transform: "translate(55, -20)",
        className: isAttacking ? "animate-pila-thrust" : "",
        children: [
          // Dragon Maw
          e.jsx("path", {
            d: "M -10 10 L 25 -5 L 35 10 L 15 18 Z",
            fill: "#0f172a",
            stroke: "#38bdf8",
            strokeWidth: "2.5"
          }),
          // Gaping Jaw with Razor Fangs
          e.jsx("polygon", { points: "15,-2 22,2 18,6", fill: "#f8fafc" }),
          e.jsx("polygon", { points: "25,3 32,8 27,12", fill: "#f8fafc" }),
          // Glowing Abyssal Eye
          e.jsx("circle", { cx: "10", cy: "-2", r: "3.5", fill: "#38bdf8", className: "animate-pulse" }),
          // Hydra Crest
          e.jsx("path", { d: "M -5 -2 L 8 -16 L 14 -4", stroke: "#0ea5e9", strokeWidth: "2.5", fill: "none" })
        ]
      }),
      // Secondary Hydra Head
      !isDead && e.jsxs("g", {
        transform: "translate(25, -38)",
        children: [
          e.jsx("path", { d: "M -10 8 L 18 -2 L 22 10 Z", fill: "#0f172a", stroke: "#22c55e", strokeWidth: "2" }),
          e.jsx("circle", { cx: "8", cy: "0", r: "2.5", fill: "#4ade80" })
        ]
      })
    ]
  });
};

// 8. Masterwork Siren Enchantress / Scylla Nymph
const render2DSiren = (x, y, isPlayer, faction = "monster", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_20px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(236,72,153,1)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "22", rx: "45", ry: "14", fill: "rgba(168,85,247,0.3)", className: "animate-pulse" }),
      // Serpentine aquatic tail
      e.jsx("path", { d: "M -30 20 Q -15 0 0 16 Q 15 28 30 18", fill: "none", stroke: "#a855f7", strokeWidth: "12", strokeLinecap: "round" }),
      // Siren Nymph Torso (Facing +X)
      e.jsx("path", { d: "M -4 14 L 6 14 L 8 -12 L -6 -12 Z", fill: "#fbcfe8", stroke: "#ec4899", strokeWidth: "1.5" }),
      // Beguiling Wings / Fins
      e.jsx("path", { d: "M -8 -8 Q -28 -28 -12 -38 Q -2 -24 -4 -8", fill: "rgba(236,72,153,0.6)", stroke: "#f472b6", strokeWidth: "1.5" }),
      // Siren Head & Crown of Pearls
      e.jsx("circle", { cx: "2", cy: "-18", r: "8", fill: "#fbcfe8", stroke: "#ec4899", strokeWidth: "1.5" }),
      e.jsx("circle", { cx: "6", cy: "-18", r: "2", fill: "#c084fc" }),
      // Golden Lyre / Harp
      !isDead && e.jsxs("g", {
        transform: "translate(14, -14)",
        children: [
          e.jsx("path", { d: "M 0 0 Q 8 -12 16 0 L 8 16 Z", fill: "none", stroke: "#fef08a", strokeWidth: "2" }),
          e.jsx("line", { x1: "4", y1: "0", x2: "8", y2: "12", stroke: "#fde047", strokeWidth: "1" }),
          e.jsx("line", { x1: "8", y1: "-4", x2: "10", y2: "12", stroke: "#fde047", strokeWidth: "1" })
        ]
      })
    ]
  });
};

// 9. Masterwork Avatar of Poseidon / Neptunus
const render2DPoseidonAvatar = (x, y, isPlayer, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_24px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_24px_rgba(56,189,248,1)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "28", rx: "75", ry: "20", fill: "rgba(2,132,199,0.45)", className: "animate-pulse" }),
      // Giant surging water wave body
      e.jsx("path", { d: "M -40 28 Q -20 -20 0 10 Q 20 -40 40 28 Z", fill: "url(#grad-gladius-steel)", stroke: "#38bdf8", strokeWidth: "3" }),
      // Titan Torso & Crown of Coral & Pearls (Facing +X)
      e.jsx("circle", { cx: "0", cy: "-25", r: "18", fill: "#0369a1", stroke: "#7dd3fc", strokeWidth: "2" }),
      // Crown
      e.jsx("path", { d: "M -12 -38 L -6 -48 L 0 -42 L 6 -48 L 12 -38 Z", fill: "#fef08a", stroke: "#d97706", strokeWidth: "1.5" }),
      e.jsx("circle", { cx: "4", cy: "-26", r: "3", fill: "#38bdf8", className: "animate-ping" }),
      // Massive Golden Trident of Poseidon
      !isDead && e.jsxs("g", {
        transform: "translate(24, -20)",
        className: isAttacking ? "animate-pila-thrust" : "",
        children: [
          e.jsx("line", { x1: "-15", y1: "50", x2: "25", y2: "-45", stroke: "#f59e0b", strokeWidth: "4.5" }),
          // Trident Prongs
          e.jsx("path", { d: "M 15 -40 L 25 -60 L 35 -40 M 25 -45 L 25 -68", fill: "none", stroke: "#fef08a", strokeWidth: "3.5", strokeLinecap: "round" }),
          e.jsx("circle", { cx: "25", cy: "-55", r: "6", fill: "rgba(56,189,248,0.6)", className: "animate-ping" })
        ]
      })
    ]
  });
};

// 10. Masterwork Minotaur Beast / Colossus Titan
const render2DMinotaur = (x, y, isPlayer, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    style: {
      willChange: "transform, opacity",
      animation: isDead ? "bt_legion_death_collapse 2.4s forwards" : "none"
    },
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_20px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(245,158,11,1)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "28", rx: "55", ry: "16", fill: "#000", opacity: "0.8" }),
      // Colossal Muscular Torso & Spiked Bronze Harness (Facing +X)
      e.jsx("path", {
        d: "M -25 -20 L 25 -20 L 18 15 L -18 15 Z",
        fill: "#78350f",
        stroke: "#d97706",
        strokeWidth: "2.5"
      }),
      // Bull Horns & Head (Facing +X)
      e.jsxs("g", {
        transform: "translate(6, -32)",
        children: [
          e.jsx("circle", { cx: "0", cy: "0", r: "15", fill: "#451a03" }),
          // Massive Sweeping Bronze-Capped Horns
          e.jsx("path", { d: "M -8 -4 Q -26 -26 -6 -32 Q -14 -18 -2 -8", fill: "#d97706", stroke: "#fef08a", strokeWidth: "1.8" }),
          e.jsx("path", { d: "M 8 -4 Q 28 -26 12 -32 Q 16 -18 6 -8", fill: "#d97706", stroke: "#fef08a", strokeWidth: "1.8" }),
          e.jsx("circle", { cx: "5", cy: "-2", r: "3", fill: "#ef4444" }),
          e.jsx("circle", { cx: "8", cy: "6", r: "4", fill: "#d97706" })
        ]
      }),
      // Massive Two-Handed Double-Bladed Labrys Battle Axe (Facing +X)
      !isDead && e.jsxs("g", {
        transform: "translate(24, -15)",
        className: isAttacking ? "animate-gladius-strike" : "",
        children: [
          e.jsx("line", { x1: "-10", y1: "38", x2: "28", y2: "-38", stroke: "#78350f", strokeWidth: "5" }),
          // Double Axe Blades
          e.jsx("path", { d: "M 18 -26 Q 40 -40 28 -10 Z", fill: "#d97706", stroke: "#fef08a", strokeWidth: "2.2" }),
          e.jsx("path", { d: "M 18 -26 Q -4 -40 8 -10 Z", fill: "#d97706", stroke: "#fef08a", strokeWidth: "2.2" })
        ]
      })
    ]
  });
};

// 11. Masterwork Medusa Gorgon
const render2DGorgon = (x, y, isPlayer, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_20px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(34,197,94,1)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "24", rx: "48", ry: "14", fill: "#000", opacity: "0.75" }),
      // Coiling golden serpent tail
      e.jsx("path", { d: "M -25 24 Q 0 8 15 24 Q 30 12 40 20", fill: "none", stroke: "#ca8a04", strokeWidth: "12", strokeLinecap: "round" }),
      // Gorgon Torso & Bronze Scale Cuirass (Facing +X)
      e.jsx("path", { d: "M -6 16 L 8 16 L 10 -10 L -4 -10 Z", fill: "#854d0e", stroke: "#fef08a", strokeWidth: "1.5" }),
      // Writhing Serpent Hair
      !isDead && [-12, -4, 4, 12].map((sx, idx) => e.jsx("path", {
        key: "gorgon_snk_" + idx,
        d: "M " + sx + " -18 Q " + (sx - 8) + " -32 " + (sx + 6) + " -38",
        fill: "none",
        stroke: "#16a34a",
        strokeWidth: "2.4",
        strokeLinecap: "round"
      })),
      // Gorgon Face & Petrifying Emerald Eyes
      e.jsx("circle", { cx: "4", cy: "-16", r: "8", fill: "#15803d", stroke: "#ca8a04", strokeWidth: "1.2" }),
      e.jsx("circle", { cx: "7", cy: "-16", r: "2.5", fill: "#4ade80", className: "animate-ping" })
    ]
  });
};

// 12. Masterwork Three-Headed Cerberus
const render2DCerberus = (x, y, isPlayer, faction = "mythic", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_20px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_20px_rgba(239,68,68,1)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "22", rx: "48", ry: "14", fill: "#000", opacity: "0.8" }),
      // Muscular Hellhound Body (Facing +X)
      e.jsx("path", { d: "M -32 5 Q -25 -18 0 -14 Q 25 -12 34 0 L 24 20 L 12 18 L 0 5 L -18 20 L -30 15 Z", fill: "#1c1917", stroke: "#451a03", strokeWidth: "2" }),
      // Spiked Bronze Collars on 3 Necks
      e.jsx("rect", { x: "12", y: "-10", width: "10", height: "16", fill: "#b91c1c", rx: "2" }),
      // 3 Snarling Hellfire Heads (Facing +X)
      [-10, 0, 10].map((offsetY, idx) => e.jsxs("g", {
        key: "cerb_head_" + idx,
        transform: "translate(" + (28 + idx * 4) + ", " + (-10 + offsetY) + ")",
        children: [
          e.jsx("circle", { cx: "0", cy: "0", r: "8", fill: "#1c1917" }),
          e.jsx("path", { d: "M 2 -2 L 14 0 L 10 6 L 2 3 Z", fill: "#292524" }),
          e.jsx("circle", { cx: "4", cy: "-2", r: "2", fill: "#ef4444" }),
          e.jsx("polygon", { points: "8,2 12,0 10,4", fill: "#fef08a" })
        ]
      }))
    ]
  });
};

// 13. Masterwork Savage Wolf Pack
const render2DWolfPack = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_18px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_16px_rgba(245,158,11,0.9)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "20", rx: "42", ry: "12", fill: "#000", opacity: "0.75" }),
      // Wolf body with grey-brown fur (Facing +X)
      e.jsx("path", { d: "M -28 5 Q -22 -16 0 -12 Q 22 -10 30 0 L 20 18 L 10 16 L 0 4 L -16 18 L -26 14 Z", fill: "#44403c", stroke: "#292524", strokeWidth: "1.8" }),
      // Wolf head & sharp ears (Facing +X)
      e.jsxs("g", {
        transform: "translate(26, -8)",
        className: isAttacking ? "animate-pila-thrust" : "",
        children: [
          e.jsx("polygon", { points: "-2,-12 2,-4 -6,-4", fill: "#78716c" }),
          e.jsx("circle", { cx: "0", cy: "0", r: "8.5", fill: "#44403c" }),
          e.jsx("path", { d: "M 2 -1 L 15 1 L 10 6 L 1 3 Z", fill: "#292524" }),
          e.jsx("circle", { cx: "4", cy: "-2", r: "2", fill: "#f59e0b" }),
          e.jsx("polygon", { points: "8,2 12,1 10,4", fill: "#f8fafc" })
        ]
      })
    ]
  });
};

// 14. Masterwork Royal Barbary Lion
const render2DAfricanLion = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_18px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_16px_rgba(234,179,8,0.9)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "22", rx: "48", ry: "14", fill: "#000", opacity: "0.75" }),
      // Muscular Lion Body (Facing +X)
      e.jsx("path", { d: "M -32 6 Q -26 -16 0 -12 Q 24 -10 32 2 L 22 20 L 10 18 L 0 5 L -18 20 L -30 15 Z", fill: "#b45309", stroke: "#78350f", strokeWidth: "2" }),
      // Voluminous Golden-Brown Mane
      e.jsx("circle", { cx: "24", cy: "-8", r: "16", fill: "#78350f" }),
      e.jsx("circle", { cx: "26", cy: "-8", r: "13", fill: "#d97706" }),
      // Lion Head & Fangs (Facing +X)
      e.jsxs("g", {
        transform: "translate(28, -8)",
        children: [
          e.jsx("circle", { cx: "0", cy: "0", r: "9", fill: "#f59e0b" }),
          e.jsx("path", { d: "M 4 -2 L 14 0 L 10 7 L 2 4 Z", fill: "#b45309" }),
          e.jsx("circle", { cx: "4", cy: "-3", r: "2.2", fill: "#ef4444" }),
          e.jsx("polygon", { points: "8,3 12,1 10,5", fill: "#f8fafc" })
        ]
      })
    ]
  });
};

// 15. Masterwork Hercynian Armored Forest Boar
const render2DHercynianBoar = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_18px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_16px_rgba(239,68,68,0.9)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "22", rx: "44", ry: "13", fill: "#000", opacity: "0.75" }),
      // Heavy Boar Body (Facing +X)
      e.jsx("path", { d: "M -28 8 Q -24 -18 0 -14 Q 24 -12 32 4 L 20 20 L 8 18 L 0 6 L -16 20 L -26 15 Z", fill: "#451a03", stroke: "#292524", strokeWidth: "2" }),
      // Bristling Spined Back
      e.jsx("path", { d: "M -20 -12 L -16 -20 L -12 -13 L -8 -22 L -4 -13 L 0 -22 L 4 -14", stroke: "#78350f", strokeWidth: "2.5", fill: "none" }),
      // Snout & Massive Curved Ivory Tusks (Facing +X)
      e.jsxs("g", {
        transform: "translate(28, 2)",
        children: [
          e.jsx("circle", { cx: "0", cy: "0", r: "9", fill: "#451a03" }),
          e.jsx("path", { d: "M 2 -2 L 14 0 L 10 6 L 2 4 Z", fill: "#292524" }),
          // Massive Upward Curved Tusks
          e.jsx("path", { d: "M 4 4 Q 16 8 18 -6", stroke: "#f8fafc", strokeWidth: "3.2", fill: "none", strokeLinecap: "round" }),
          e.jsx("circle", { cx: "3", cy: "-3", r: "2", fill: "#ef4444" })
        ]
      })
    ]
  });
};

// 16. Masterwork Alpine Cave Bear
const render2DAlpineBear = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_18px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_16px_rgba(245,158,11,0.9)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "24", rx: "50", ry: "15", fill: "#000", opacity: "0.75" }),
      // Heavy Bear Fur & Muscular Torso (Facing +X)
      e.jsx("path", { d: "M -30 6 Q -26 -22 2 -18 Q 26 -14 34 2 L 24 22 L 12 18 L 0 6 L -16 22 L -28 16 Z", fill: "#451a03", stroke: "#1c1917", strokeWidth: "2" }),
      // Bear Head & Jaws (Facing +X)
      e.jsxs("g", {
        transform: "translate(28, -6)",
        children: [
          e.jsx("circle", { cx: "0", cy: "0", r: "11", fill: "#573012" }),
          e.jsx("circle", { cx: "-3", cy: "-10", r: "4", fill: "#451a03" }),
          e.jsx("path", { d: "M 4 -1 L 16 2 L 12 8 L 2 5 Z", fill: "#292524" }),
          e.jsx("circle", { cx: "4", cy: "-2", r: "2.2", fill: "#fef08a" })
        ]
      })
    ]
  });
};

// 17. Masterwork Saharan Giant Desert Scorpion
const render2DScorpion = (x, y, isPlayer, faction = "beast", hpPct = 100, animState = "idle", scale = 1.0, isAttacking = false, isHit = false) => {
  const isDead = animState === "dead" || animState === "death" || hpPct <= 0;
  const flip = isPlayer ? 1 : -1;
  return e.jsxs("g", {
    transform: "translate(" + x + ", " + y + ") scale(" + (scale * flip) + ", " + scale + ")",
    opacity: isDead ? "0.8" : "1",
    className: "transition-all duration-300 " + (isHit ? "brightness-200 drop-shadow-[0_0_18px_rgba(239,68,68,1)]" : isAttacking ? "brightness-125 drop-shadow-[0_0_18px_rgba(34,197,94,0.9)]" : ""),
    children: [
      e.jsx("ellipse", { cx: "0", cy: "22", rx: "48", ry: "12", fill: "#000", opacity: "0.75" }),
      // Segmented Chitin Carapace Body (Facing +X)
      e.jsx("ellipse", { cx: "0", cy: "10", rx: "24", ry: "14", fill: "#78350f", stroke: "#d97706", strokeWidth: "1.8" }),
      // Giant Crushing Pincers (Facing +X)
      e.jsxs("g", {
        transform: "translate(22, 10)",
        className: isAttacking ? "animate-pila-thrust" : "",
        children: [
          e.jsx("path", { d: "M 0 -8 Q 18 -14 26 -4 Q 18 0 10 -2 Z", fill: "#92400e", stroke: "#f59e0b", strokeWidth: "1.5" }),
          e.jsx("path", { d: "M 0 8 Q 18 14 26 4 Q 18 0 10 2 Z", fill: "#92400e", stroke: "#f59e0b", strokeWidth: "1.5" })
        ]
      }),
      // Raised Venomous Stinger Tail (Arching Over Forward)
      e.jsx("path", { d: "M -20 10 Q -40 -10 -20 -28 Q 0 -38 12 -24", fill: "none", stroke: "#92400e", strokeWidth: "6", strokeLinecap: "round" }),
      e.jsx("polygon", { points: "12,-24 18,-30 14,-20", fill: "#22c55e" }),
      e.jsx("circle", { cx: "16", cy: "-28", r: "4", fill: "rgba(34,197,94,0.6)", className: "animate-ping" })
    ]
  });
};
`;
    bundle = bundle.substring(0, pShipFuncStart) + masterworkModelsCode + "\n" + bundle.substring(pBtFuncStart);
    console.log("- Injected Masterwork 2D Models (Tiers 1-5 Roman Ships, Legions, Barbarians, Greeks, Punics, Monsters & Animals).");
  }

  // 11. INJECT LEVEL PROGRESSION & DYNAMIC UNIT DISPATCH INTO BATTLETHEATREV2
  const pBtBodyStart = bundle.indexOf("const BattleTheatreV2 = ({");
  if (pBtBodyStart !== -1) {
    let pFormSearch = bundle.indexOf("// === DYNAMIC UNIT DISPATCH", pBtBodyStart);
    if (pFormSearch === -1) {
      pFormSearch = bundle.indexOf("// 2. PLAYER FORMATION (LEFT SIDE", pBtBodyStart);
    }
    const pEffectsSearch = bundle.indexOf("// 4. PRECISELY MODEL-ALIGNED COMBAT EFFECTS", pBtBodyStart);

    if (pFormSearch !== -1 && pEffectsSearch !== -1) {
      const dynamicFormationCode = `// === DYNAMIC UNIT DISPATCH WITH MONSTER ENCOUNTERS & LEVEL PROGRESSION ===
          // Level & Tier Calculation
          ...(() => {
            const pLvl = Math.max(1, (player && player.level) || (typeof s !== "undefined" && s.level) || Math.floor(((typeof s !== "undefined" && s.fama) || 0) / 60) + 1);
            const pLegTier = Math.min(5, Math.max(1, (player && player.legionTier) || (typeof s !== "undefined" && s.legionTier) || (pLvl >= 8 ? 5 : pLvl >= 6 ? 4 : pLvl >= 4 ? 3 : pLvl >= 2 ? 2 : 1)));
            const pFltTier = Math.min(5, Math.max(1, (player && player.fleetTier) || (typeof s !== "undefined" && s.fleetTier) || (pLvl >= 8 ? 5 : pLvl >= 6 ? 4 : pLvl >= 4 ? 3 : pLvl >= 2 ? 2 : 1)));
            
            const eName = ((enemy && (enemy.name || enemy.title || enemy.latinName)) || "").toLowerCase();
            const eType = ((enemy && enemy.type) || "").toLowerCase();
            const eCat = ((enemy && enemy.category) || "").toLowerCase();
            const eId = ((enemy && enemy.id) || "").toLowerCase();
            const eIcon = ((enemy && enemy.icon) || "").toLowerCase();

            // Comprehensive Monster & Animal Classification
            const isPoseidon = isNaval && (eName.includes("poseidon") || eName.includes("neptun") || eId.includes("poseidon"));
            const isSiren = isNaval && (eName.includes("siren") || eName.includes("scylla") || eId.includes("siren") || eIcon.includes("siren"));
            const isSeaBeast = isNaval && (isPoseidon || isSiren || eType.includes("monster") || eType.includes("beast") || eType.includes("serpent") || eType.includes("kraken") || eType.includes("hydra") || eType.includes("leviathan") || eName.includes("serpent") || eName.includes("kraken") || eName.includes("hydra") || eName.includes("leviathan") || eName.includes("scylla") || eName.includes("charybdis") || eName.includes("monster") || eId.includes("kraken") || eId.includes("serpent"));
            
            const isElephantUnit = !isNaval && (eType.includes("elephant") || eName.includes("elephant") || eId.includes("elephant") || eCat.includes("elephant") || (enemyFaction === "punic" && (eName.includes("vanguard") || (enemy && enemy.hasElephant))));
            const isMinotaurUnit = !isNaval && (eName.includes("minotaur") || eId.includes("minotaur") || eName.includes("colossus") || eName.includes("titan") || eName.includes("cyclops") || eType.includes("minotaur"));
            const isGorgonUnit = !isNaval && (eName.includes("gorgon") || eName.includes("medusa") || eId.includes("medusa") || eId.includes("gorgon"));
            const isCerberusUnit = !isNaval && (eName.includes("cerberus") || eId.includes("cerberus") || eName.includes("hellhound"));
            const isWolfUnit = !isNaval && (eName.includes("wolf") || eId.includes("wolf") || eName.includes("lupus") || eIcon.includes("wolf"));
            const isLionUnit = !isNaval && (eName.includes("lion") || eId.includes("lion") || eName.includes("leo") || eIcon.includes("lion"));
            const isBoarUnit = !isNaval && (eName.includes("boar") || eId.includes("boar") || eName.includes("aper") || eIcon.includes("boar"));
            const isBearUnit = !isNaval && (eName.includes("bear") || eId.includes("bear") || eName.includes("ursus") || eIcon.includes("bear"));
            const isScorpionUnit = !isNaval && (eName.includes("scorpion") || eId.includes("scorpion") || eIcon.includes("scorpion"));
            const isAnyLandAnimal = isElephantUnit || isMinotaurUnit || isGorgonUnit || isCerberusUnit || isWolfUnit || isLionUnit || isBoarUnit || isBearUnit || isScorpionUnit;

            const isBarbarianUnit = !isNaval && !isAnyLandAnimal && (enemyFaction === "barbarian" || eName.includes("celt") || eName.includes("gaul") || eName.includes("german") || eName.includes("berserk") || eName.includes("warband") || eName.includes("chieftain") || eName.includes("rebel") || eName.includes("bandit") || eName.includes("raider"));
            const isGreekUnit = !isNaval && !isAnyLandAnimal && (enemyFaction === "greek" || eName.includes("hoplite") || eName.includes("phalanx") || eName.includes("athenian") || eName.includes("spartan"));
            const isPunicUnit = !isNaval && !isAnyLandAnimal && (enemyFaction === "punic" || eName.includes("sacred band") || eName.includes("carthag") || eName.includes("libyan"));

            // Helper to render specific land enemy model
            const renderLandEnemy = (laneX, laneY, isFlagUnit, scaleVal) => {
              if (isElephantUnit) return isFlagUnit ? render2DWarElephant(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit") : render2DPunicInfantry(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isMinotaurUnit) return render2DMinotaur(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isGorgonUnit) return render2DGorgon(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isCerberusUnit) return render2DCerberus(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isWolfUnit) return render2DWolfPack(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isLionUnit) return render2DAfricanLion(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isBoarUnit) return render2DHercynianBoar(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isBearUnit) return render2DAlpineBear(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isScorpionUnit) return render2DScorpion(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isBarbarianUnit) return render2DBarbarianWarband(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isGreekUnit) return render2DGreekPhalanx(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isPunicUnit) return render2DPunicInfantry(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              return render2DLegion(laneX, laneY, false, isFlagUnit ? "flagship" : "cohort", enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit", isFlagUnit, "", 2);
            };

            // Helper to render specific naval enemy model
            const renderNavalEnemy = (laneX, laneY, isFlagUnit, scaleVal) => {
              if (isPoseidon) return render2DPoseidonAvatar(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isSiren) return render2DSiren(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              if (isSeaBeast) return render2DSeaMonster(laneX, laneY, false, enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit");
              return render2DShip(laneX, laneY, false, isFlagUnit ? "flagship" : "escortA", enemyFaction, ePct, enemyAnim, scaleVal, isEnemyAttacking, enemyAnim === "hit", isFlagUnit, "", isFlagUnit ? 3 : 2);
            };

            return [
              // =================================================================
              // 2. PLAYER FORMATION (LEFT SIDE - TIERS 1 TO 5 PROGRESSION)
              // =================================================================
              // Lane 1 (Upper Escort)
              isNaval
                ? render2DShip(110 + pEsc1Offset, 115, true, "escortA", "roman", pPct, playerAnim, 0.85, isPlayerAttacking, playerAnim === "hit", false, "", pFltTier)
                : render2DLegion(110 + pEsc1Offset, 115, true, "cohort", "roman", pPct, playerAnim, 0.85, isPlayerAttacking, playerAnim === "hit", false, "", pLegTier),

              // Lane 2 (Center Flagship / Commander Cohort)
              isNaval
                ? render2DShip(165 + pFlagOffset, 215, true, "flagship", "roman", pPct, playerAnim, 1.25, isPlayerAttacking, playerAnim === "hit", false, "", pFltTier)
                : render2DLegion(165 + pFlagOffset, 215, true, "flagship", "roman", pPct, playerAnim, 1.25, isPlayerAttacking, playerAnim === "hit", false, "", pLegTier),

              // Lane 3 (Lower Escort)
              isNaval
                ? render2DShip(110 + pEsc2Offset, 310, true, "escortB", "roman", pPct, playerAnim, 0.90, isPlayerAttacking, playerAnim === "hit", false, "", pFltTier)
                : render2DLegion(110 + pEsc2Offset, 310, true, "cohort", "roman", pPct, playerAnim, 0.90, isPlayerAttacking, playerAnim === "hit", false, "", pLegTier),

              // =================================================================
              // 3. ENEMY FORMATION (RIGHT SIDE - FACING DIRECTLY TOWARDS PLAYER)
              // =================================================================
              // Lane 1 (Upper Escort / Flank)
              isNaval ? renderNavalEnemy(690 + eEsc1Offset, 115, false, 0.85) : renderLandEnemy(690 + eEsc1Offset, 115, false, 0.85),

              // Lane 2 (Center Boss / Monster / Flagship)
              isNaval ? renderNavalEnemy(635 + eFlagOffset, 215, true, 1.30) : renderLandEnemy(635 + eFlagOffset, 215, true, 1.30),

              // Lane 3 (Lower Escort / Flank)
              isNaval ? renderNavalEnemy(690 + eEsc2Offset, 310, false, 0.90) : renderLandEnemy(690 + eEsc2Offset, 310, false, 0.90)
            ];
          })(),`;
      bundle = bundle.substring(0, pFormSearch) + dynamicFormationCode + bundle.substring(pEffectsSearch);
      console.log("- Injected dynamic formation dispatch with monsters, animals & level progression.");
    }
  }

  // 11b. Inject Dedicated Roman Themed Floating Damage HTML Layer into BattleTheatreV2
  const pReturnSearch = bundle.indexOf('id: "battle-theatre-v2-root"');
  if (pReturnSearch !== -1 && !bundle.includes('id: "combat-floating-damage-roman-layer"')) {
    const pChildrenStart = bundle.indexOf("children: [", pReturnSearch);
    if (pChildrenStart !== -1) {
      const targetChildrenPos = pChildrenStart + "children: [".length;
      const romanFloatingDamageLayer = `
      // === ROMAN THEMED FLOATING DAMAGE & COMBAT NUMBERS LAYER ===
      (floatingText && floatingText.length > 0) && e.jsx("div", {
        id: "combat-floating-damage-roman-layer",
        className: "absolute inset-0 pointer-events-none z-[9999] overflow-visible select-none",
        children: (floatingText || []).map(ft => {
          const isEnemyTarget = !ft.isPlayer;
          const isCrit = ft.isCrit || ft.text.includes('CRITICAL') || ft.text.includes('CRIT') || ft.text.includes('⚡') || ft.text.includes('💥');
          const isHeal = ft.isHeal || ft.text.includes('HP') || ft.text.includes('+') || ft.text.includes('💚');
          const isBlock = ft.isBlock || ft.text.includes('DEFENSE') || ft.text.includes('🛡️') || ft.text.includes('BLOCKED') || ft.text.includes('SCUTUM');
          
          let romanBadge = "";
          if (isCrit) romanBadge = "★ CRITICUS ★";
          else if (isBlock) romanBadge = "SCUTUM";
          else if (isHeal) romanBadge = "SALUS";
          else if (ft.text.includes('FIRE') || ft.text.includes('🔥')) romanBadge = "IGNIS";
          else if (ft.text.includes('VENOM') || ft.text.includes('☠')) romanBadge = "VENENUM";
          else if (ft.text.includes('LIGHTNING') || ft.text.includes('⚡')) romanBadge = "FULMEN";
          else if (ft.text.includes('BLEED') || ft.text.includes('🩸')) romanBadge = "SANGUIS";
          else if (ft.text.includes('STUN') || ft.text.includes('💫')) romanBadge = "STUPEFACTIO";
          else if (ft.text.includes('-')) romanBadge = isEnemyTarget ? "ICTUS" : "VULNUS";

          return e.jsxs("div", {
            key: ft.id,
            className: "absolute pointer-events-none flex flex-col items-center animate-roman-float-dmg",
            style: {
              left: isEnemyTarget ? "70%" : "30%",
              top: "34%",
              transform: "translate(-50%, -50%)",
              willChange: "transform, opacity"
            },
            children: [
              romanBadge ? e.jsx("span", {
                className: "font-cinzel text-[9px] sm:text-[11px] font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded border border-amber-500/40 bg-black/85 mb-0.5 whitespace-nowrap",
                style: {
                  color: isCrit ? "#fde047" : (isHeal ? "#86efac" : (isBlock ? "#7dd3fc" : (isEnemyTarget ? "#fde047" : "#fca5a5"))),
                  boxShadow: "0 0 12px rgba(0,0,0,0.9), 0 0 8px rgba(245,158,11,0.3)"
                },
                children: romanBadge
              }) : null,
              e.jsx("span", {
                className: "font-cinzel font-black text-2xl sm:text-4xl md:text-5xl tracking-wider whitespace-nowrap select-none",
                style: {
                  color: ft.color || (isCrit ? "#fef08a" : (isHeal ? "#4ade80" : (isBlock ? "#38bdf8" : (isEnemyTarget ? "#fef08a" : "#f87171")))),
                  textShadow: isCrit 
                    ? "0 0 20px rgba(254,240,138,1), 0 2px 10px rgba(0,0,0,1), 0 0 32px rgba(245,158,11,0.9)"
                    : (isHeal 
                        ? "0 0 18px rgba(74,222,128,1), 0 2px 8px rgba(0,0,0,1)" 
                        : (isBlock 
                            ? "0 0 18px rgba(56,189,248,1), 0 2px 8px rgba(0,0,0,1)" 
                            : (isEnemyTarget 
                                ? "0 0 20px rgba(251,191,36,0.95), 0 2px 8px rgba(0,0,0,1)" 
                                : "0 0 20px rgba(239,68,68,1), 0 2px 8px rgba(0,0,0,1), 0 0 28px rgba(185,28,28,0.8)"))),
                  WebkitTextStroke: isCrit ? "1.5px #78350f" : "1.2px rgba(0,0,0,0.95)"
                },
                children: ft.text
              })
            ]
          });
        })
      }),
`;
      bundle = bundle.substring(0, targetChildrenPos) + romanFloatingDamageLayer + bundle.substring(targetChildrenPos);
    }
  }

  // 12. Validate with esbuild & save
  try {
    esbuild.transformSync(bundle, { loader: "jsx" });
    fs.writeFileSync(targetPath, bundle, "utf8");

    const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
    if (fs.existsSync(path.dirname(distPath))) {
      fs.writeFileSync(distPath, bundle, "utf8");
    }
    console.log("SUCCESS: apply_comprehensive_combat_effects_system applied masterwork models, level progression, animals & monsters.");
  } catch (err) {
    console.error("ERR: esbuild validation failed on comprehensive combat effects:", err.message);
    process.exit(1);
  }
}

applyOptimizedCombatSystem();
