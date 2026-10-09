const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== APPLYING HIGH-FIDELITY COHESIVE COMBAT PRESENTATION REFINEMENT ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. UPGRADE renderToken EXECUTING CALL TO PASS name AS LAST PARAMETER
const battleDamageCallMarker = "renderTokenBattleDamage(isPlayer, hp, maxHp, anim)";
if (js.includes(battleDamageCallMarker)) {
  js = js.replace(
    battleDamageCallMarker,
    "renderTokenBattleDamage(isPlayer, hp, maxHp, anim, name)"
  );
  
} else {
  console.warn("WARN: Could not find battleDamageCallMarker.");
}

// 2. RECONSTRUCT renderTokenBattleDamage FUNCTION DEFINITION WITH DETERMINISTIC PERSISTENT PATTERNS
const originalBattleDamageStart = "const renderTokenBattleDamage = (isPlayer, hp, maxHp, anim) => {";
const renderTokenMarker = "const renderToken = (isPlayer, hp, anim, modelType, faction, name) => {";

const pDamageStart = js.indexOf(originalBattleDamageStart);
const pRenderToken = js.indexOf(renderTokenMarker);

if (pDamageStart !== -1 && pRenderToken !== -1 && pDamageStart < pRenderToken) {
  
  
  const newDamageCode = `const renderTokenBattleDamage = (isPlayer, hp, maxHp, anim, name = "") => {
    const hpPct = Math.max(0, Math.min(100, Math.round((hp / (maxHp || 100)) * 100)));
    const dmgPct = 100 - hpPct;
    const isDead = hp <= 0;
    const isHit = anim === 'hit';

    if (dmgPct < 5 && !isHit && !isDead) return null;

    // Stable, distinct pattern based on the ship/token name!
    const label = name || (isPlayer ? "Imperator" : "Hostis");
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
      hash = label.charCodeAt(i) + ((hash << 5) - hash);
    }
    const prng = () => {
      const x = Math.sin(hash++) * 10000;
      return x - Math.floor(x);
    };

    // Generate 8 stable distinct marks concentrated strictly on illustrated vessel & rim (radius 26 to 43), NOT covering center faction emblem!
    const stableMarks = [];
    for (let i = 0; i < 8; i++) {
      const angle = prng() * Math.PI * 2;
      const radius = 26 + prng() * 17;
      const cx = 50 + Math.cos(angle) * radius;
      const cy = 50 + Math.sin(angle) * radius;
      const r = 2.0 + prng() * 3.5;
      const rot = Math.round(prng() * 360);
      const length = 12 + prng() * 15;
      stableMarks.push({ cx, cy, r, rot, length, type: i % 3 }); // 0: crack, 1: blood, 2: burn
    }

    // Determine how many marks to show based on health percentage lost
    let showCount = 0;
    if (dmgPct >= 70) showCount = 8;
    else if (dmgPct >= 48) showCount = 6;
    else if (dmgPct >= 28) showCount = 4;
    else if (dmgPct >= 12) showCount = 2;

    // Add impact directional marks if currently hit
    // If player is hit (isPlayer=true), attacker is on right, so impact is on right (angle around 0)
    // If enemy is hit (isPlayer=false), attacker is on left, so impact is on left (angle around PI)
    const impactMarks = [];
    if (isHit) {
      const baseAngle = isPlayer ? 0 : Math.PI;
      for (let i = 0; i < 3; i++) {
        const angle = baseAngle + (prng() * 1.0 - 0.5);
        const radius = 30 + prng() * 12;
        const cx = 50 + Math.cos(angle) * radius;
        const cy = 50 + Math.sin(angle) * radius;
        const r = 3.5 + prng() * 2.5;
        impactMarks.push({ cx, cy, r });
      }
    }

    return e.jsxs("div", {
      className: "absolute inset-0 rounded-full overflow-hidden pointer-events-none z-30 select-none",
      children: [
        // Render the stable persistent marks (cracks, blood, burns)
        showCount > 0 && e.jsxs("svg", {
          viewBox: "0 0 100 100",
          className: "absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] transition-all duration-500",
          children: stableMarks.slice(0, showCount).map((m, idx) => {
            if (m.type === 0) {
              return e.jsx("line", {
                x1: m.cx,
                y1: m.cy,
                x2: m.cx + Math.cos(m.rot * Math.PI / 180) * m.length,
                y2: m.cy + Math.sin(m.rot * Math.PI / 180) * m.length,
                stroke: dmgPct >= 65 ? "#ef4444" : "#1a1310",
                strokeWidth: "1.2",
                strokeLinecap: "round",
                opacity: "0.85"
              }, "cr_" + idx);
            } else if (m.type === 1) {
              return e.jsx("circle", {
                cx: m.cx,
                cy: m.cy,
                r: m.r,
                fill: "#991b1b",
                opacity: "0.82"
              }, "bl_" + idx);
            } else {
              return e.jsx("circle", {
                cx: m.cx,
                cy: m.cy,
                r: m.r * 1.3,
                fill: "#1f1205",
                opacity: "0.75"
              }, "sc_" + idx);
            }
          })
        }),
        // Render immediate impact marks
        isHit && impactMarks.length > 0 && e.jsxs("svg", {
          viewBox: "0 0 100 100",
          className: "absolute inset-0 w-full h-full pointer-events-none",
          children: [
            e.jsx("circle", { cx: isPlayer ? "80" : "20", cy: "50", r: "20", fill: "none", stroke: "#ef4444", strokeWidth: "2", className: "animate-ping opacity-75" }),
            impactMarks.map((m, idx) => e.jsx("circle", {
              cx: m.cx,
              cy: m.cy,
              r: m.r,
              fill: "#dc2626",
              className: "animate-pulse"
            }, "imp_" + idx))
          ]
        }),
        // Simple dead overlay if destroyed
        isDead && e.jsxs("div", {
          className: "absolute inset-0 rounded-full bg-black/80 flex flex-col items-center justify-center backdrop-grayscale z-40 border border-red-950 shadow-[inset_0_0_12px_rgba(0,0,0,0.95)]",
          children: [
            e.jsx("div", { className: "text-red-500 font-cinzel font-black text-[9px] tracking-widest uppercase drop-shadow", children: "VICTUS" }),
            e.jsx("div", { className: "w-6 h-[0.8px] bg-red-600/60 my-0.5" }),
            e.jsx("div", { className: "text-[6.5px] font-mono text-red-400/80 tracking-widest", children: "CLADES" })
          ]
        })
      ]
    });
  };\n  `;

  js = js.substring(0, pDamageStart) + newDamageCode + js.substring(pRenderToken);
  
} else {
  console.log("INFO: renderTokenBattleDamage already modern or boundary matched.");
}

// 3. RECONSTRUCT renderFXOverlay FUNCTION DEFINITION WITH RESTRAINED, COHESIVE, HIGH-FIDELITY OVERLAYS
const originalFXOverlayStart = "const renderFXOverlay = (fx) => {";
const renderGaugeMarker = "const renderGauge = (curr, max, block, isPlayer) => {";

const pFXStart = js.indexOf(originalFXOverlayStart);
const pGauge = js.indexOf(renderGaugeMarker);

if (pFXStart !== -1 && pGauge !== -1 && pFXStart < pGauge) {
  

  const newFXOverlayCode = `const renderFXOverlay = (fx) => {
    // 1. RESTRAINED SWIPE (Melee Slashes/Gladius Strikes)
    if (fx.type === 'sword_slash' || fx.type === 'melee_slash') {
      return e.jsxs("div", {
        className: "w-40 h-40 sm:w-48 sm:h-48 relative flex items-center justify-center pointer-events-none z-50",
        children: [
          e.jsx("div", { className: "absolute inset-4 rounded-full bg-red-600/10 blur-md animate-ping opacity-50" }),
          e.jsxs("svg", {
            viewBox: "0 0 100 100",
            className: "w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(239,68,68,0.85)] animate-roman-shake",
            children: [
              e.jsx("path", {
                d: "M 15 85 Q 45 45 85 15",
                fill: "none",
                stroke: "rgba(251, 191, 36, 0.45)",
                strokeWidth: "10",
                strokeLinecap: "round",
                className: "animate-slash-sweep"
              }),
              e.jsx("path", {
                d: "M 15 85 Q 45 45 85 15",
                fill: "none",
                stroke: "#dc2626",
                strokeWidth: "6",
                strokeLinecap: "round",
                className: "animate-slash-sweep"
              }),
              e.jsx("path", {
                d: "M 15 85 Q 45 45 85 15",
                fill: "none",
                stroke: "#ffffff",
                strokeWidth: "2",
                strokeLinecap: "round",
                className: "animate-slash-sweep"
              }),
              Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45) * Math.PI / 180;
                const tx = Math.cos(angle) * 20;
                const ty = Math.sin(angle) * 20;
                return e.jsx("circle", {
                  key: i,
                  cx: "50",
                  cy: "50",
                  r: "1.5",
                  fill: i % 2 === 0 ? "#fbbf24" : "#ffffff",
                  className: "animate-[particleOut_0.35s_ease-out_forwards]",
                  style: { '--tx': tx + 'px', '--ty': ty + 'px' }
                });
              })
            ]
          })
        ]
      });
    }

    // 2. PROJECTILE TRAVEL (Restrained Arrows, Ballista Trajectories)
    if (fx.type === 'arrow_fire_travel' || fx.type === 'arrow_fire_enemy_travel' || fx.type === 'projectile_travel' || fx.type === 'projectile_travel_enemy') {
      const isFromPlayer = fx.type === 'arrow_fire_travel' || fx.type === 'projectile_travel';
      const path1 = isFromPlayer ? "M 180 175 Q 500 55 820 175" : "M 820 175 Q 500 55 180 175";
      
      return e.jsx("div", {
        className: "w-full max-w-4xl mx-auto absolute inset-x-0 pointer-events-none z-50 flex items-center justify-center",
        style: {
          top: "max(calc(env(safe-area-inset-top, 0px) + 54px), 110px)",
          bottom: "max(calc(env(safe-area-inset-bottom, 0px) + 180px), 240px)"
        },
        children: e.jsxs("svg", {
          viewBox: "0 0 1000 400",
          className: "w-full h-full overflow-visible pointer-events-none",
          children: [
            e.jsx("circle", {
              cx: isFromPlayer ? "180" : "820",
              cy: "175",
              r: "16",
              fill: "none",
              stroke: "#f59e0b",
              strokeWidth: "2",
              className: "animate-ping opacity-60"
            }),
            e.jsxs("g", {
              children: [
                e.jsx("animateMotion", {
                  path: path1,
                  dur: "0.32s",
                  repeatCount: "1",
                  rotate: "auto",
                  fill: "freeze"
                }),
                e.jsx("line", { x1: "-20", y1: "0", x2: "6", y2: "0", stroke: "#78350f", strokeWidth: "2", strokeLinecap: "round" }),
                e.jsx("polygon", { points: "10,0 2,-3 4,0 2,3", fill: "#fef08a" }),
                e.jsx("circle", { cx: "8", cy: "0", r: "3", fill: "#f59e0b", className: "animate-ping opacity-70" })
              ]
            })
          ]
        })
      });
    }

    // 3. PROJECTILE IMPACT (Restrained embedded arrows/missiles)
    if (fx.type === 'arrow_fire_hit' || fx.type === 'projectile_hit') {
      return e.jsxs("div", {
        className: "w-36 h-36 sm:w-44 sm:h-44 relative flex items-center justify-center pointer-events-none z-50",
        children: [
          e.jsx("div", { className: "absolute inset-2 bg-red-600/15 rounded-full animate-ping opacity-60" }),
          e.jsxs("svg", {
            viewBox: "0 0 100 100",
            className: "w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(220,38,38,0.85)]",
            children: [
              e.jsxs("g", {
                transform: "translate(44, 46) rotate(-15)",
                className: "animate-arrow-quiver",
                children: [
                  e.jsx("line", { x1: "-24", y1: "0", x2: "0", y2: "0", stroke: "#78350f", strokeWidth: "2", strokeLinecap: "round" }),
                  e.jsx("polygon", { points: "0,-2 6,0 0,2", fill: "#fde047" }),
                  e.jsx("polygon", { points: "-24,-3 -16,0 -24,0", fill: "#dc2626" })
                ]
              }),
              e.jsxs("g", {
                transform: "translate(56, 54) rotate(10)",
                className: "animate-arrow-quiver",
                children: [
                  e.jsx("line", { x1: "-22", y1: "0", x2: "0", y2: "0", stroke: "#78350f", strokeWidth: "2", strokeLinecap: "round" }),
                  e.jsx("polygon", { points: "0,-2 6,0 0,2", fill: "#ffffff" }),
                  e.jsx("polygon", { points: "-22,-3 -14,0 -22,0", fill: "#f59e0b" })
                ]
              })
            ]
          })
        ]
      });
    }

    // 4. JAVELIN TRAVEL & IMPACT (Slender heavy Roman pilum)
    if (fx.type === 'javelin_launch_travel' || fx.type === 'javelin_launch_enemy_travel') {
      const isFromPlayer = fx.type === 'javelin_launch_travel';
      const pilumPath = isFromPlayer ? "M 180 175 Q 500 65 820 175" : "M 820 175 Q 500 65 180 175";

      return e.jsx("div", {
        className: "w-full max-w-4xl mx-auto absolute inset-x-0 pointer-events-none z-50 flex items-center justify-center",
        style: {
          top: "max(calc(env(safe-area-inset-top, 0px) + 54px), 110px)",
          bottom: "max(calc(env(safe-area-inset-bottom, 0px) + 180px), 240px)"
        },
        children: e.jsxs("svg", {
          viewBox: "0 0 1000 400",
          className: "w-full h-full overflow-visible pointer-events-none",
          children: [
            e.jsx("circle", {
              cx: isFromPlayer ? "180" : "820",
              cy: "175",
              r: "20",
              fill: "none",
              stroke: "#fbbf24",
              strokeWidth: "2",
              className: "animate-ping opacity-60"
            }),
            e.jsxs("g", {
              children: [
                e.jsx("animateMotion", {
                  path: pilumPath,
                  dur: "0.30s",
                  repeatCount: "1",
                  rotate: "auto",
                  fill: "freeze"
                }),
                e.jsx("line", { x1: "-45", y1: "0", x2: "0", y2: "0", stroke: "#78350f", strokeWidth: "3.5", strokeLinecap: "round" }),
                e.jsx("line", { x1: "0", y1: "0", x2: "30", y2: "0", stroke: "#cbd5e1", strokeWidth: "2" }),
                e.jsx("polygon", { points: "30,-3 40,0 30,3", fill: "#ffffff" })
              ]
            })
          ]
        })
      });
    }

    if (fx.type === 'javelin_launch_hit') {
      return e.jsxs("div", {
        className: "w-40 h-40 sm:w-48 sm:h-48 relative flex items-center justify-center pointer-events-none z-50",
        children: [
          e.jsx("div", { className: "absolute inset-2 bg-amber-500/10 rounded-full animate-ping opacity-50" }),
          e.jsxs("svg", {
            viewBox: "0 0 100 100",
            className: "w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(239,68,68,0.85)] animate-roman-shake",
            children: [
              e.jsxs("g", {
                transform: "translate(50, 50) rotate(-20)",
                children: [
                  e.jsx("line", { x1: "-40", y1: "-6", x2: "-10", y2: "0", stroke: "#78350f", strokeWidth: "3.5", strokeLinecap: "round" }),
                  e.jsx("line", { x1: "-10", y1: "0", x2: "12", y2: "5", stroke: "#cbd5e1", strokeWidth: "2" }),
                  e.jsx("polygon", { points: "12,3 22,6 12,8", fill: "#ffffff" })
                ]
              })
            ]
          })
        ]
      });
    }

    // 5. GREEK FIRE SIPHON (Continuous warm coning stream)
    if (fx.type === 'fire_spray' || fx.type === 'fire_spray_enemy') {
      const isFromPlayer = fx.type === 'fire_spray';
      const streamPath = isFromPlayer
        ? "M 180 175 Q 500 110 820 160 Q 830 175 820 190 Q 500 240 180 175 Z"
        : "M 820 175 Q 500 110 180 160 Q 170 175 180 190 Q 500 240 820 175 Z";

      return e.jsx("div", {
        className: "w-full max-w-4xl mx-auto absolute inset-x-0 pointer-events-none z-50 flex items-center justify-center",
        style: {
          top: "max(calc(env(safe-area-inset-top, 0px) + 54px), 110px)",
          bottom: "max(calc(env(safe-area-inset-bottom, 0px) + 180px), 240px)"
        },
        children: e.jsxs("svg", {
          viewBox: "0 0 1000 400",
          className: "w-full h-full overflow-visible pointer-events-none",
          children: [
            e.jsx("path", {
              d: streamPath,
              fill: "url(#greekFireLiquidGrad)",
              opacity: "0.85",
              className: "animate-pulse"
            }),
            e.jsxs("defs", {
              children: [
                e.jsxs("linearGradient", {
                  id: "greekFireLiquidGrad",
                  x1: isFromPlayer ? "0%" : "100%",
                  y1: "50%",
                  x2: isFromPlayer ? "100%" : "0%",
                  y2: "50%",
                  children: [
                    e.jsx("stop", { offset: "0%", stopColor: "#fde047" }),
                    e.jsx("stop", { offset: "45%", stopColor: "#f97316" }),
                    e.jsx("stop", { offset: "100%", stopColor: "#dc2626", stopOpacity: "0.3" })
                  ]
                })
              ]
            })
          ]
        })
      });
    }

    if (fx.type === 'fire_burn' || fx.type === 'fire') {
      return e.jsxs("div", {
        className: "w-40 h-40 sm:w-48 sm:h-48 relative flex items-center justify-center pointer-events-none z-50",
        children: [
          e.jsx("div", { className: "absolute inset-4 bg-orange-600/20 rounded-full blur-lg animate-pulse" }),
          e.jsxs("svg", {
            viewBox: "0 0 100 100",
            className: "w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(249,115,22,0.85)] animate-flame-lick",
            children: [
              e.jsx("path", { d: "M 35 85 Q 25 55 33 40 Q 42 25 38 10 Q 48 30 45 50 C 40 70 48 85 48 85 Z", fill: "#dc2626", opacity: "0.85" }),
              e.jsx("path", { d: "M 48 85 Q 40 58 48 44 Q 54 30 52 18 Q 58 32 55 52 C 50 72 58 85 58 85 Z", fill: "#f97316", opacity: "0.9" }),
              e.jsx("path", { d: "M 60 85 Q 52 62 58 48 Q 64 34 62 24 Q 68 36 65 56 C 60 76 68 85 68 85 Z", fill: "#fef08a" })
            ]
          })
        ]
      });
    }

    // 6. DIRECTIONAL RAMMING COLLISION (Kinetic shockwave & fine splinter burst)
    if (fx.type === 'ram_impact') {
      return e.jsxs("div", {
        className: "w-44 h-44 sm:w-52 sm:h-52 relative flex items-center justify-center pointer-events-none z-50",
        children: [
          e.jsx("div", { className: "absolute inset-2 rounded-full border-4 border-amber-400/80 animate-ram-wave" }),
          e.jsxs("svg", {
            viewBox: "0 0 100 100",
            className: "w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(251,191,36,0.9)] animate-roman-heavy-shake",
            children: [
              e.jsx("circle", { cx: "50", cy: "50", r: "35", fill: "none", stroke: "rgba(251,191,36,0.65)", strokeWidth: "2", className: "animate-ping" }),
              Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30) * Math.PI / 180;
                const dist = 24 + (i % 3) * 12;
                return e.jsx("circle", {
                  key: i,
                  cx: 50,
                  cy: 50,
                  r: 2 + (i % 2),
                  fill: i % 2 === 0 ? "#fbbf24" : "#78350f",
                  className: "animate-[splatter_0.45s_ease-out_forwards]",
                  style: { '--tx': (Math.cos(angle) * dist) + 'px', '--ty': (Math.sin(angle) * dist) + 'px' }
                });
              })
            ]
          })
        ]
      });
    }

    // 7. COMPACT DEFENSE RESPONSE (Compact semi-translucent Scutum barrier)
    if (fx.type === 'block') {
      return e.jsxs("div", {
        className: "w-36 h-36 sm:w-44 sm:h-44 relative flex items-center justify-center pointer-events-none z-50 animate-shield-pulse",
        children: [
          e.jsx("div", { className: "absolute inset-4 bg-sky-400/15 rounded-full blur-md animate-ping" }),
          e.jsxs("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#38bdf8",
            strokeWidth: "2",
            className: "w-28 h-28 sm:w-34 sm:h-34 drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]",
            children: [
              e.jsx("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10", fill: "rgba(14, 165, 233, 0.22)" }),
              e.jsx("circle", { cx: "12", cy: "11", r: "2", fill: "#fef08a", stroke: "#f59e0b", strokeWidth: "0.8" })
            ]
          })
        ]
      });
    }

    // 8. LIGHTNING BOLT (Jupiter Fulmen)
    if (fx.type === 'lightning_bolt' || fx.type === 'lightning') {
      return e.jsxs("div", {
        className: "w-44 h-80 sm:w-52 sm:h-[380px] relative flex flex-col items-center justify-end pointer-events-none z-50 -top-24",
        children: [
          e.jsx("div", { className: "absolute -inset-20 bg-cyan-400/20 rounded-full blur-3xl animate-ping" }),
          e.jsxs("svg", {
            viewBox: "0 0 100 300",
            className: "w-full h-full overflow-visible drop-shadow-[0_0_25px_rgba(56,189,248,0.95)] animate-lightning-bolt",
            children: [
              e.jsx("path", {
                d: "M 50 0 L 60 50 L 40 95 L 65 145 L 42 195 L 58 245 L 48 290 L 50 300",
                fill: "none",
                stroke: "rgba(56, 189, 248, 0.7)",
                strokeWidth: "12",
                strokeLinecap: "round"
              }),
              e.jsx("path", {
                d: "M 50 0 L 60 50 L 40 95 L 65 145 L 42 195 L 58 245 L 48 290 L 50 300",
                fill: "none",
                stroke: "#ffffff",
                strokeWidth: "3.5",
                strokeLinecap: "round"
              }),
              e.jsx("circle", { cx: "50", cy: "300", r: "18", fill: "#ffffff", className: "animate-ping opacity-90" })
            ]
          })
        ]
      });
    }

    // 9. CRITICAL BURST
    if (fx.type === 'crit_burst') {
      return e.jsxs("svg", {
        viewBox: "0 0 100 100",
        className: "w-48 h-48 sm:w-60 sm:h-60 drop-shadow-[0_0_25px_rgba(251,191,36,0.95)] z-50 overflow-visible",
        children: [
          Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const tx = Math.cos(angle) * 35;
            const ty = Math.sin(angle) * 35;
            return e.jsx("circle", {
              cx: "50",
              cy: "50",
              r: "1.5",
              fill: "#fde047",
              className: "animate-[particleOut_0.45s_ease-out_forwards]",
              style: { '--tx': tx + 'px', '--ty': ty + 'px' }
            }, "cr_pt_" + i);
          }),
          e.jsx("circle", { cx: "50", cy: "50", r: "14", fill: "none", stroke: "#fbbf24", strokeWidth: "2.5", className: "animate-[ping_0.4s_ease-out_forwards]" })
        ]
      });
    }

    // 10. BUFF / CONSECRATION
    if (fx.type === 'buff') {
      return e.jsxs("div", {
        className: "w-28 h-28 sm:w-34 sm:h-34 relative flex items-center justify-center pointer-events-none z-50 animate-[ping_0.35s_ease-out_forwards]",
        children: [
          e.jsx("div", { className: "absolute inset-2 bg-amber-400/20 rounded-full blur-md" }),
          e.jsxs("svg", {
            viewBox: "0 0 24 24",
            fill: "currentColor",
            className: "w-22 h-22 text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.85)]",
            children: [
              e.jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" })
            ]
          })
        ]
      });
    }

    // Status fallbacks
    if (fx.type === 'bleed') {
      return e.jsxs("svg", {
        viewBox: "0 0 100 100",
        className: "w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_0_12px_rgba(220,38,38,0.7)] z-50 overflow-visible",
        children: [
          Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45) * Math.PI / 180;
            const dist = 14 + (i % 2) * 12;
            return e.jsx("circle", {
              cx: "50",
              cy: "50",
              r: "2",
              fill: "#dc2626",
              className: "animate-[splatter_0.45s_ease-out_forwards]",
              style: { '--tx': (Math.cos(angle) * dist) + 'px', '--ty': (Math.sin(angle) * dist + 10) + 'px' }
            }, "bl_pt_" + i);
          })
        ]
      });
    }

    if (fx.type === 'poison') {
      return e.jsxs("div", {
        className: "w-28 h-28 sm:w-34 sm:h-34 rounded-full flex items-center justify-center pointer-events-none drop-shadow-[0_0_15px_rgba(34,197,94,0.7)] z-50 animate-poison-bubble",
        children: [
          e.jsx("div", { className: "absolute inset-2 bg-emerald-500/15 rounded-full blur-md" }),
          e.jsx("div", { className: "text-3xl sm:text-4xl", children: "☠️" })
        ]
      });
    }

    if (fx.type === 'stun') {
      return e.jsx("div", {
        className: "w-24 h-24 sm:w-32 sm:h-32 rounded-full border-[3px] border-dashed border-amber-400/80 z-50 animate-stun-halo drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
      });
    }

    if (fx.type === 'freeze') {
      return e.jsx("svg", {
        viewBox: "0 0 24 24",
        stroke: "#7dd3fc",
        strokeWidth: "1.5",
        fill: "none",
        className: "w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_0_15px_rgba(125,211,252,0.7)] z-50 animate-[spin_6s_linear_infinite]",
        children: e.jsx("path", { d: "M12 2v20 M2 12h20 M4.9 4.9l14.2 14.2 M4.9 19.1L19.1 4.9" })
      });
    }

    return null;
  };\n  `;

  js = js.substring(0, pFXStart) + newFXOverlayCode + js.substring(pGauge);
  
} else {
  console.log("INFO: renderFXOverlay already updated or boundary matched.");
}

// 4. REFINE SNAPPY spawnFX & spawnText CLEANUP DURATION TO PREVENT RAPID OVERLAPPING
js = js.replaceAll(
  "setTimeout(() => { setHitFx(prev => prev.filter(f => f.id !== id)); }, type === 'projectile' ? 800 : 1200);",
  "setTimeout(() => { setHitFx(prev => prev.filter(f => f.id !== id)); }, type === 'projectile' || type.includes('travel') ? 450 : 700);"
);
js = js.replaceAll(
  "setTimeout(() => { setFloatingText(prev => prev.filter(f => f.id !== id)); }, 1200);",
  "setTimeout(() => { setFloatingText(prev => prev.filter(f => f.id !== id)); }, 850);"
);


// 5. ADJUST FLOATING TEXT POSITION TO FLOAT BEAUTIFULLY "BESIDE" THE STRUCK TOKEN INSTEAD OF OVER IT
js = js.replaceAll(
  "style: { color: ft.color, left: ft.isPlayer ? '22%' : '78%', top: '42%' },",
  "style: { color: ft.color, left: ft.isPlayer ? '34%' : '66%', top: '38%' },"
);
js = js.replaceAll(
  "style: isFullArena ? {} : { left: fx.isPlayer ? '22%' : '78%', top: '42%' },",
  "style: isFullArena ? {} : { left: fx.isPlayer ? '18%' : '82%', top: '38%' },"
);


// VALIDATE BUNDLE WITH ESBUILD
try {
  esbuild.transformSync(js, { loader: "js" });
  
} catch (err) {
  console.error("ERR: ESBuild validation failed on updated bundle js:", err.message);
  process.exit(1);
}

fs.writeFileSync(bundlePath, js, "utf8");

