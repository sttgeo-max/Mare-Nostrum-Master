const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

console.log("=== FIXING DIAGNOSTIC OVERLAY PANEL SCOPE & SAFARI TILE LAYER SPLITTER ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// 1. INJECT GLOBAL DIAGNOSTIC STATE & GLOBAL COMPONENT AT TOP OF BUNDLE
const globalInitCode = `
if (typeof window !== "undefined") {
  window.__mnDiag = window.__mnDiag || {
    hudHidden: false,
    waterHidden: false,
    effectsHidden: false,
    flatShapes: false
  };
  window.__mnDiagFrameTimes = window.__mnDiagFrameTimes || [];
  window.__mnDiagStats = window.__mnDiagStats || {
    median: "0.0",
    worst: "0.0",
    longFrames: 0,
    count: 0,
    duration: "0.0",
    isDragging: false
  };

  window.DiagnosticOverlayPanel = function DiagnosticOverlayPanel() {
    const [diag, setDiag] = b.useState(() => (typeof window !== "undefined" && window.__mnDiag) || {
      hudHidden: false, waterHidden: false, effectsHidden: false, flatShapes: false
    });
    const [stats, setStats] = b.useState(() => (typeof window !== "undefined" && window.__mnDiagStats) || {
      median: "0.0", worst: "0.0", longFrames: 0, count: 0, duration: "0.0", isDragging: false
    });
    const [collapsed, setCollapsed] = b.useState(false);

    b.useEffect(() => {
      const handleUpdate = () => {
        if (typeof window !== "undefined") {
          if (window.__mnDiag) setDiag({ ...window.__mnDiag });
          if (window.__mnDiagStats) setStats({ ...window.__mnDiagStats });
        }
      };
      window.addEventListener("mn-diag-update", handleUpdate);
      return () => window.removeEventListener("mn-diag-update", handleUpdate);
    }, []);

    const toggleSwitch = (key) => {
      if (typeof window === "undefined") return;
      window.__mnDiag = window.__mnDiag || {};
      const curVal = !!window.__mnDiag[key];
      
      // Diagnostic 1-at-a-time switch constraint
      window.__mnDiag.hudHidden = false;
      window.__mnDiag.waterHidden = false;
      window.__mnDiag.effectsHidden = false;
      window.__mnDiag.flatShapes = false;

      if (!curVal) {
        window.__mnDiag[key] = true;
      }

      // Reset 10s frame times
      window.__mnDiagFrameTimes = [];
      window.__mnDiagStats = { median: "0.0", worst: "0.0", longFrames: 0, count: 0, duration: "0.0", isDragging: false };

      setDiag({ ...window.__mnDiag });
      setStats({ ...window.__mnDiagStats });
      window.dispatchEvent(new CustomEvent("mn-diag-update"));
    };

    const resetTest = () => {
      if (typeof window === "undefined") return;
      window.__mnDiagFrameTimes = [];
      window.__mnDiagStats = { median: "0.0", worst: "0.0", longFrames: 0, count: 0, duration: "0.0", isDragging: false };
      setStats({ ...window.__mnDiagStats });
      window.dispatchEvent(new CustomEvent("mn-diag-update"));
    };

    return e.jsx("div", {
      className: "fixed top-2 left-2 z-[400] pointer-events-auto select-none max-w-xs sm:max-w-sm font-sans",
      children: e.jsxs("div", {
        className: "bg-stone-950/92 backdrop-blur-md border-2 border-amber-500/80 rounded-xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.95)] text-amber-100 text-xs flex flex-col gap-2",
        children: [
          e.jsxs("div", {
            className: "flex items-center justify-between border-b border-amber-500/40 pb-1.5",
            children: [
              e.jsx("div", { className: "font-cinzel font-bold text-amber-300 tracking-wider text-[11px]", children: "⚡ DIAGNOSTICA IMPERII (Safari Drag)" }),
              e.jsx("button", {
                onClick: () => setCollapsed(!collapsed),
                className: "px-2 py-0.5 rounded bg-amber-950 hover:bg-amber-900 border border-amber-600/50 text-[10px] text-amber-200 cursor-pointer",
                children: collapsed ? "Expand" : "Minimize"
              })
            ]
          }),
          !collapsed && e.jsxs(e.Fragment, {
            children: [
              e.jsx("div", { className: "text-[10px] text-amber-300/80 uppercase font-semibold tracking-wider", children: "Reversible A/B Diagnostic Switches (1 at a time):" }),
              e.jsxs("div", {
                className: "grid grid-cols-1 gap-1",
                children: [
                  e.jsxs("button", {
                    onClick: () => toggleSwitch("hudHidden"),
                    className: \`px-2.5 py-1.5 rounded text-[11px] font-semibold text-left transition-all flex items-center justify-between border cursor-pointer \${diag.hudHidden ? "bg-amber-500 text-black border-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-stone-900/90 text-amber-200 border-amber-900/60 hover:bg-stone-800"}\`,
                    children: [e.jsx("span", { children: "1. Hide Entire HUD" }), e.jsx("span", { className: "text-[10px] uppercase font-mono", children: diag.hudHidden ? "ON" : "OFF" })]
                  }),
                  e.jsxs("button", {
                    onClick: () => toggleSwitch("waterHidden"),
                    className: \`px-2.5 py-1.5 rounded text-[11px] font-semibold text-left transition-all flex items-center justify-between border cursor-pointer \${diag.waterHidden ? "bg-amber-500 text-black border-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-stone-900/90 text-amber-200 border-amber-900/60 hover:bg-stone-800"}\`,
                    children: [e.jsx("span", { children: "2. Hide Water Detail" }), e.jsx("span", { className: "text-[10px] uppercase font-mono", children: diag.waterHidden ? "ON" : "OFF" })]
                  }),
                  e.jsxs("button", {
                    onClick: () => toggleSwitch("effectsHidden"),
                    className: \`px-2.5 py-1.5 rounded text-[11px] font-semibold text-left transition-all flex items-center justify-between border cursor-pointer \${diag.effectsHidden ? "bg-amber-500 text-black border-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-stone-900/90 text-amber-200 border-amber-900/60 hover:bg-stone-800"}\`,
                    children: [e.jsx("span", { children: "3. Hide Shadows/Glows/Filters" }), e.jsx("span", { className: "text-[10px] uppercase font-mono", children: diag.effectsHidden ? "ON" : "OFF" })]
                  }),
                  e.jsxs("button", {
                    onClick: () => toggleSwitch("flatShapes"),
                    className: \`px-2.5 py-1.5 rounded text-[11px] font-semibold text-left transition-all flex items-center justify-between border cursor-pointer \${diag.flatShapes ? "bg-amber-500 text-black border-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-stone-900/90 text-amber-200 border-amber-900/60 hover:bg-stone-800"}\`,
                    children: [e.jsx("span", { children: "4. Replace Terrain/Markers with Flat Shapes" }), e.jsx("span", { className: "text-[10px] uppercase font-mono", children: diag.flatShapes ? "ON" : "OFF" })]
                  })
                ]
              }),
              e.jsxs("div", {
                className: "mt-1 pt-1.5 border-t border-amber-500/30 flex flex-col gap-1",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center justify-between text-[11px] font-mono",
                    children: [
                      e.jsx("span", { className: "text-amber-300 font-bold", children: "10s Drag Readout:" }),
                      e.jsx("span", { className: stats.isDragging ? "text-emerald-400 font-bold animate-pulse" : "text-stone-400", children: stats.isDragging ? "● Dragging Map..." : "○ Drag Map to Measure" })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "grid grid-cols-2 gap-1.5 font-mono text-[11px] bg-black/70 p-2 rounded border border-amber-900/40",
                    children: [
                      e.jsxs("div", {
                        children: [
                          e.jsx("div", { className: "text-[9px] text-stone-400 uppercase", children: "Median Frame Time" }),
                          e.jsxs("div", { className: \`font-bold text-sm \${parseFloat(stats.median) <= 16.7 ? "text-emerald-400" : parseFloat(stats.median) <= 25 ? "text-amber-300" : "text-rose-400"}\`, children: [stats.median, " ms"] })
                        ]
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("div", { className: "text-[9px] text-stone-400 uppercase", children: "Worst Frame Time" }),
                          e.jsxs("div", { className: \`font-bold text-sm \${parseFloat(stats.worst) <= 20 ? "text-emerald-400" : parseFloat(stats.worst) <= 33 ? "text-amber-300" : "text-rose-400"}\`, children: [stats.worst, " ms"] })
                        ]
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("div", { className: "text-[9px] text-stone-400 uppercase", children: "Long Frames (>16.7ms)" }),
                          e.jsxs("div", { className: \`font-bold text-xs \${stats.longFrames === 0 ? "text-emerald-400" : stats.longFrames < 10 ? "text-amber-300" : "text-rose-400"}\`, children: [stats.longFrames, " frames"] })
                        ]
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx("div", { className: "text-[9px] text-stone-400 uppercase", children: "Drag Duration" }),
                          e.jsxs("div", { className: "font-bold text-xs text-amber-200", children: [stats.duration, "s / 10.0s"] })
                        ]
                      })
                    ]
                  }),
                  e.jsx("button", {
                    onClick: resetTest,
                    className: "w-full mt-1 py-1 px-2 rounded bg-amber-950/90 hover:bg-amber-900 border border-amber-600/50 text-[10px] text-amber-200 font-semibold cursor-pointer",
                    children: "Reset 10s Drag Test"
                  })
                ]
              })
            ]
          })
        ]
      })
    });
  };
}
`;

if (!js.includes("window.DiagnosticOverlayPanel")) {
  js = globalInitCode + "\n" + js;
  
}

// 2. UPGRADE C0 (MAP SVG) WITH DIAGNOSTIC CONDITIONAL SWITCHES
const c0Start = js.indexOf("C0=({width:t,height:s,timeOfDay:a,season:r,weather:o,windDirection:l})=>");
if (c0Start !== -1) {
  const c0Return = js.indexOf("return e.jsx(\"div\",{className:\"absolute inset-0 pointer-events-none select-none overflow-hidden bg-[#0c0a09]\"", c0Start);
  if (c0Return !== -1) {
    const diagCheckInject = `
    const isWaterHidden = typeof window !== "undefined" && window.__mnDiag && window.__mnDiag.waterHidden;
    const isEffectsHidden = typeof window !== "undefined" && window.__mnDiag && window.__mnDiag.effectsHidden;
    const isFlatShapes = typeof window !== "undefined" && window.__mnDiag && window.__mnDiag.flatShapes;
    `;
    js = js.substring(0, c0Return) + diagCheckInject + js.substring(c0Return);
    
  }
}

// 3. UPGRADE RC TILE RASTERIZER & LAYER SPLITTER FOR SAFARI GPU ACCELERATION
const oldRcMarker = "Rc=lt.memo(t=>{";
const pRcStart = js.indexOf(oldRcMarker);
if (pRcStart !== -1) {
  const pSx = js.indexOf(",Sx=", pRcStart);
  if (pSx !== -1) {
    const newRcEngine = `Rc=lt.memo(t=>{
      const [tiles, setTiles] = b.useState(null);
      const [generating, setGenerating] = b.useState(false);
      const svgRef = b.useRef(null);

      const diagKey = (typeof window !== "undefined" && window.__mnDiag ? 
        (window.__mnDiag.hudHidden ? 1 : 0) + 
        (window.__mnDiag.waterHidden ? 2 : 0) + 
        (window.__mnDiag.effectsHidden ? 4 : 0) + 
        (window.__mnDiag.flatShapes ? 8 : 0) : 0);

      const cacheKey = \`mn_tiles_v47_\${t.timeOfDay||'DIES'}_\${t.season||'AESTAS'}_\${t.weather||'SERENVM'}_\${diagKey}\`;

      b.useEffect(() => {
        setGenerating(false);
        setTiles(null);
      }, [cacheKey]);

      b.useEffect(() => {
        if (!tiles && !generating && svgRef.current) {
          setGenerating(true);
          const timer = requestAnimationFrame(() => {
            try {
              const svgEl = svgRef.current.querySelector("svg");
              if (!svgEl) return;
              const serializer = new XMLSerializer();
              svgEl.setAttribute("width", "2400px");
              svgEl.setAttribute("height", "1000px");
              const xmlStr = serializer.serializeToString(svgEl);
              const blob = new Blob([xmlStr], { type: "image/svg+xml;charset=utf-8" });
              const url = URL.createObjectURL(blob);
              const img = new Image();
              img.crossOrigin = "anonymous";
              img.onload = () => {
                const cols = 4, rows = 2; // 8 GPU texture tiles (600px x 500px)
                const tileW = 600;
                const tileH = 500;
                const canvas = document.createElement("canvas");
                canvas.width = tileW;
                canvas.height = tileH;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                const tileUrls = [];
                for (let r = 0; r < rows; r++) {
                  for (let c = 0; c < cols; c++) {
                    ctx.clearRect(0, 0, tileW, tileH);
                    ctx.drawImage(img, c * tileW, r * tileH, tileW, tileH, 0, 0, tileW, tileH);
                    tileUrls.push(canvas.toDataURL("image/png"));
                  }
                }
                setTiles(tileUrls);
                setGenerating(false);
                URL.revokeObjectURL(url);
              };
              img.onerror = () => { setGenerating(false); URL.revokeObjectURL(url); };
              img.src = url;
            } catch (err) {
              console.warn("Tile raster failed", err);
              setGenerating(false);
            }
          });
          return () => cancelAnimationFrame(timer);
        }
      }, [generating, tiles, cacheKey]);

      if (tiles && tiles.length === 8) {
        return e.jsx("div", {
          className: "absolute inset-0 origin-top-left pointer-events-none select-none",
          style: { width: t.width || "100%", height: t.height || "100%", contain: "layout paint size" },
          children: tiles.map((tileUrl, idx) => {
            const r = Math.floor(idx / 4);
            const c = idx % 4;
            return e.jsx("img", {
              src: tileUrl,
              alt: \`Map Tile \${idx}\`,
              className: "absolute origin-top-left pointer-events-none select-none block",
              style: {
                left: \`\${c * 25}%\`,
                top: \`\${r * 50}%\`,
                width: "25%",
                height: "50%",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
              },
              decoding: "async",
              draggable: false
            }, idx);
          })
        });
      }

      return e.jsx("div", {
        ref: svgRef,
        className: "absolute inset-0 origin-top-left pointer-events-none select-none",
        style: { width: t.width || "100%", height: t.height || "100%" },
        children: e.jsx(A0, t)
      });
    })`;

    js = js.substring(0, pRcStart) + newRcEngine + js.substring(pSx);
    
  }
}

// 4. MOUNT DIAGNOSTIC OVERLAY PANEL INTO MAP VIEWPORT USING window.DiagnosticOverlayPanel
const pViewportEnd = js.indexOf("id:\"map-main-scroll-viewport\"");
if (pViewportEnd !== -1) {
  const pViewportJsxEnd = js.indexOf("children:[", pViewportEnd);
  if (pViewportJsxEnd !== -1) {
    js = js.substring(0, pViewportJsxEnd + 10) + "e.jsx(window.DiagnosticOverlayPanel,{})," + js.substring(pViewportJsxEnd + 10);
    
  }
}

// 5. INJECT FRAME-TIME MEASUREMENT IN XN (POINTERMOVE DRAG HANDLER)
if (!js.includes("nowDragFrame")) {
  const pXn = js.indexOf("xn=b.useCallback(V=>{if(!xs.current)return;");
  if (pXn !== -1) {
    const xnInject = `xn=b.useCallback(V=>{if(!xs.current)return;
      const nowDragFrame = performance.now();
      if (typeof window !== "undefined") {
        if (window.__mnLastDragFrameTime) {
          const delta = nowDragFrame - window.__mnLastDragFrameTime;
          if (delta > 2 && delta < 500) {
            window.__mnDiagFrameTimes = window.__mnDiagFrameTimes || [];
            window.__mnDiagFrameTimes.push(delta);
            if (window.__mnDiagFrameTimes.length > 600) window.__mnDiagFrameTimes.shift();

            const sorted = [...window.__mnDiagFrameTimes].sort((a, b) => a - b);
            const median = sorted[Math.floor(sorted.length / 2)] || 0;
            const worst = sorted[sorted.length - 1] || 0;
            const longFrames = window.__mnDiagFrameTimes.filter(f => f > 16.7).length;

            window.__mnDiagStats = {
              median: median.toFixed(1),
              worst: worst.toFixed(1),
              longFrames: longFrames,
              count: window.__mnDiagFrameTimes.length,
              duration: (window.__mnDiagFrameTimes.length * (1000 / 60) / 1000).toFixed(1),
              isDragging: true
            };
            window.dispatchEvent(new CustomEvent("mn-diag-update"));
          }
        }
        window.__mnLastDragFrameTime = nowDragFrame;
      }
    `;
    js = js.replace("xn=b.useCallback(V=>{if(!xs.current)return;", xnInject);
    
  }
}

// Reset dragging status in si (pointerup)
const pSi = js.indexOf("si=b.useCallback(V=>{if(xs.current){xs.current=!1;");
if (pSi !== -1) {
  const siInject = `si=b.useCallback(V=>{if(xs.current){xs.current=!1; if(typeof window !== "undefined"){ window.__mnLastDragFrameTime = null; if(window.__mnDiagStats) { window.__mnDiagStats.isDragging = false; window.dispatchEvent(new CustomEvent("mn-diag-update")); } }`;
  js = js.replace("si=b.useCallback(V=>{if(xs.current){xs.current=!1;", siInject);
  
}

// 6. HUD HIDDEN DIAGNOSTIC SWITCH CONDITIONAL ENFORCEMENT
const oldTopHudContainer = 'className:"amber-glass-top-canopy flex items-center justify-between w-full pointer-events-none max-w-7xl mx-auto gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-1 sm:py-1.5"';
const newTopHudContainer = 'className:`amber-glass-top-canopy flex items-center justify-between w-full pointer-events-none max-w-7xl mx-auto gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-1 sm:py-1.5 ${typeof window!=="undefined"&&window.__mnDiag&&window.__mnDiag.hudHidden?"!hidden":""}`';
if (js.includes(oldTopHudContainer)) {
  js = js.replace(oldTopHudContainer, newTopHudContainer);
  
}

const oldBottomHudNav = 'id:"bottom-hud-nav",className:`fixed inset-0 z-[100] pointer-events-none select-none transition-all duration-300 ${t?"opacity-0 pointer-events-none":"opacity-100"}`';
const newBottomHudNav = 'id:"bottom-hud-nav",className:`fixed inset-0 z-[100] pointer-events-none select-none transition-all duration-300 ${t||(typeof window!=="undefined"&&window.__mnDiag&&window.__mnDiag.hudHidden)?"opacity-0 pointer-events-none !hidden":"opacity-100"}`';
if (js.includes(oldBottomHudNav)) {
  js = js.replace(oldBottomHudNav, newBottomHudNav);
  
}

// Validate transformation syntax with esbuild
console.log("Validating transformation syntax with esbuild...");
esbuild.transformSync(js, { loader: "jsx" });


fs.writeFileSync(bundlePath, js, "utf8");

// Sync to dist
const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
  
}

console.log("=== SAFARI DIAGNOSTICS & TILE SPLITTER FIX COMPLETE ===");
