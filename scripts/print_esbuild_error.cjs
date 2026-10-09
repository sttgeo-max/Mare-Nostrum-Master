const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
const js = fs.readFileSync(bundlePath, "utf8");

// Since the error mentions stdin (meaning the code we passed to esbuild.transformSync)
// let's look at our replacement strings in scripts/apply_combat_refinement.cjs.
// Let's check if there are missing braces or unmatched parentheses.
// We can check renderFXOverlay first, specifically line 7459-ish of the output.
// Wait, we can test compiling just the newDamageCode and newFXOverlayCode strings!

const esbuild = require("esbuild");

const newDamageCode = `const renderTokenBattleDamage = (isPlayer, hp, maxHp, anim, name = "") => {
    const hpPct = Math.max(0, Math.min(100, Math.round((hp / (maxHp || 100)) * 100)));
    const dmgPct = 100 - hpPct;
    const isDead = hp <= 0;
    const isHit = anim === 'hit';

    if (dmgPct < 5 && !isHit && !isDead) return null;

    const label = name || (isPlayer ? "Imperator" : "Hostis");
    let hash = 0;
    for (let i = 0; i < label.length; i++) {
      hash = label.charCodeAt(i) + ((hash << 5) - hash);
    }
    const prng = () => {
      const x = Math.sin(hash++) * 10000;
      return x - Math.floor(x);
    };

    const stableMarks = [];
    for (let i = 0; i < 8; i++) {
      const angle = prng() * Math.PI * 2;
      const radius = 26 + prng() * 17;
      const cx = 50 + Math.cos(angle) * radius;
      const cy = 50 + Math.sin(angle) * radius;
      const r = 2.0 + prng() * 3.5;
      const rot = Math.round(prng() * 360);
      const length = 12 + prng() * 15;
      stableMarks.push({ cx, cy, r, rot, length, type: i % 3 });
    }

    let showCount = 0;
    if (dmgPct >= 70) showCount = 8;
    else if (dmgPct >= 48) showCount = 6;
    else if (dmgPct >= 28) showCount = 4;
    else if (dmgPct >= 12) showCount = 2;

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
  };`;

try {
  esbuild.transformSync(newDamageCode, { loader: "js" });
  console.log("newDamageCode compiles successfully!");
} catch (e) {
  console.log("newDamageCode failed compile:", e.message);
}
