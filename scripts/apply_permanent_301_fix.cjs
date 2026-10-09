const fs = require('fs');

let code = fs.readFileSync('public/assets/index-V37.js', 'utf8');

console.log('Original file size:', code.length);

// 1. Replace setEnemyHp block in abilities/relics (matches all 7 occurrences)
const pattern1 = /setEnemyHp\(prev => \{\s*const next = Math\.max\(0, prev - val\);\s*if \(next <= 0\) \{\s*setEnemyAnim\(\x27death\x27\);\s*setTurn\(\x27victory\x27\);\s*spawnText\(isSea \? \x27☠ VESSEL SUNK!\x27 : \x27☠ COHORT DESTROYED!\x27, false, \x27#fbbf24\x27\);\s*\}\s*return next;\s*\}\);/g;

code = code.replace(pattern1, "setEnemyHp(prev => Math.max(0, prev - val));");

// 2. Replace setEnemyHp in DoT ticks
const pattern2 = /setEnemyHp\(prev => \{\s*const next = Math\.max\(0, prev - tickDmg\);\s*if \(next <= 0\) \{\s*setEnemyAnim\(\x27death\x27\);\s*setTurn\(\x27victory\x27\);\s*spawnText\(isSea \? \x27☠ VESSEL SUNK!\x27 : \x27☠ COHORT DESTROYED!\x27, false, \x27#fbbf24\x27\);\s*try \{\s*if \(typeof v !== \x27undefined\x27\) \{\s*if \(v\.playSplinterCrash\) v\.playSplinterCrash\(\);\s*if \(v\.playVictory\) v\.playVictory\(\);\s*\}\s*\} catch\(e\)\{\}\s*\}\s*return next;\s*\}\);/g;

code = code.replace(pattern2, "setEnemyHp(prev => Math.max(0, prev - tickDmg));");

// 3. Replace setEnemyHp in tactical card play
const pattern3 = /setEnemyHp\(prev => \{\s*const next = Math\.max\(0, prev - finalDmg\);\s*if \(next <= 0\) setTurn\(\x27victory\x27\);\s*return next;\s*\}\);/g;

code = code.replace(pattern3, "setEnemyHp(prev => Math.max(0, prev - finalDmg));");

// 4. Replace setEnemyHp in basic strikes
const pattern4 = /setEnemyHp\(prev => \{\s*const next = Math\.max\(0, prev - dmg\);\s*if \(next <= 0\) setTurn\(\x27victory\x27\);\s*return next;\s*\}\);/g;

code = code.replace(pattern4, "setEnemyHp(prev => Math.max(0, prev - dmg));");

// 5. Replace setPlayerHp in DoT ticks
const pattern5 = /setPlayerHp\(prev => \{\s*const next = Math\.max\(0, prev - tickDmg\);\s*if \(next <= 0\) \{\s*if \(deathWardActive\) \{\s*setDeathWardActive\(false\);\s*spawnText\("☀️ SOL INVICTUS DEATH WARD ACTIVATED!", true, "#fbbf24"\);\s*spawnFX\(true, "buff"\);\s*return 1;\s*\}\s*setPlayerAnim\(\x27death\x27\);\s*setTurn\(\x27defeat\x27\);\s*spawnText\(isSea \? \x27☠ VESSEL SUNK!\x27 : \x27☠ COHORT FALLEN!\x27, true, \x27#ef4444\x27\);\s*try \{ if \(typeof v !== \x27undefined\x27 && v\.playSplinterCrash\) v\.playSplinterCrash\(\); \} catch\(e\)\{\}\s*\}\s*return next;\s*\}\);/g;

code = code.replace(pattern5, "setPlayerHp(prev => Math.max(0, prev - tickDmg));");

// 6. Replace setPlayerHp in enemy attacks
const pattern6 = /setPlayerHp\(prev => \{\s*const next = Math\.max\(0, prev - dmg\);\s*if \(next <= 0\) setTurn\(\x27defeat\x27\);\s*return next;\s*\}\);/g;

code = code.replace(pattern6, "setPlayerHp(prev => Math.max(0, prev - dmg));");

// Now inject the new declarative useEffect hooks for victory and defeat
const refTarget = "b.useEffect(() => { enemyHpRef.current = enemyHp; }, [enemyHp]);";
const newEffects = `b.useEffect(() => { enemyHpRef.current = enemyHp; }, [enemyHp]);
  b.useEffect(() => {
    if (enemyHp <= 0 && turn !== 'victory') {
      setEnemyAnim('death');
      setTurn('victory');
      try {
        if (typeof spawnText === 'function') {
          spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT DESTROYED!', false, '#fbbf24');
        }
        if (typeof v !== 'undefined') {
          if (v.playSplinterCrash) v.playSplinterCrash();
          if (v.playVictory) v.playVictory();
        }
      } catch(e){}
    }
  }, [enemyHp, turn, isSea]);
  b.useEffect(() => {
    if (playerHp <= 0 && turn !== 'defeat' && turn !== 'victory') {
      if (deathWardActive) {
        setDeathWardActive(false);
        setPlayerHp(1);
        try {
          if (typeof spawnText === 'function') {
            spawnText("☀️ SOL INVICTUS DEATH WARD ACTIVATED!", true, "#fbbf24");
          }
          if (typeof spawnFX === 'function') {
            spawnFX(true, "buff");
          }
        } catch(e){}
      } else {
        setPlayerAnim('death');
        setTurn('defeat');
        try {
          if (typeof spawnText === 'function') {
            spawnText(isSea ? '☠ VESSEL SUNK!' : '☠ COHORT FALLEN!', true, '#ef4444');
          }
          if (typeof v !== 'undefined' && v.playSplinterCrash) v.playSplinterCrash();
        } catch(e){}
      }
    }
  }, [playerHp, turn, deathWardActive, isSea]);`;

code = code.replace(refTarget, newEffects);

fs.writeFileSync('public/assets/index-V37.js', code, 'utf8');
console.log('Successfully applied permanent 301 fix to public/assets/index-V37.js!');
