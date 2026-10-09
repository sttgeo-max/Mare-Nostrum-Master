const esbuild = require("esbuild");

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
      const path1 = isFromPlayer ? "M 220 250 Q 500 160 780 250" : "M 780 250 Q 500 160 220 250";
      
      return e.jsx("div", {
        className: "w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-50",
        children: e.jsxs("svg", {
          viewBox: "0 0 1000 500",
          className: "w-full h-full overflow-visible pointer-events-none",
          children: [
            e.jsx("circle", {
              cx: isFromPlayer ? "220" : "780",
              cy: "250",
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
      ]);
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
      const pilumPath = isFromPlayer ? "M 220 250 Q 500 170 780 250" : "M 780 250 Q 500 170 220 250";

      return e.jsx("div", {
        className: "w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-50",
        children: e.jsxs("svg", {
          viewBox: "0 0 1000 500",
          className: "w-full h-full overflow-visible pointer-events-none",
          children: [
            e.jsx("circle", {
              cx: isFromPlayer ? "220" : "780",
              cy: "250",
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
        ? "M 220 250 Q 500 190 780 230 Q 790 250 780 270 Q 500 310 220 250 Z"
        : "M 780 250 Q 500 190 220 230 Q 210 250 220 270 Q 500 310 780 250 Z";

      return e.jsx("div", {
        className: "w-full h-full absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-50",
        children: e.jsxs("svg", {
          viewBox: "0 0 1000 500",
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
  };`;

try {
  esbuild.transformSync(newFXOverlayCode, { loader: "js" });
  console.log("newFXOverlayCode compiles successfully!");
} catch (e) {
  console.log("newFXOverlayCode failed compile:", e.message);
}
