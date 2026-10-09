const fs = require("fs");
const path = require("path");
let esbuild;
try {
  esbuild = require("esbuild");
} catch(e) {
  try {
    esbuild = require(path.join(__dirname, "../node_modules/esbuild"));
  } catch(e2) {
    esbuild = null;
  }
}

console.log("=== APPLYING FINE-ONLY REGIONAL PRECIPITATION TEXTURE-FIELD SYSTEM ===");

const bundlePath = path.join(__dirname, "../public/assets/index-V33.js");
let js = fs.readFileSync(bundlePath, "utf8");

// Strip any existing weather engine block if present
if (js.includes("window.__mnWeatherEngine")) {
  console.log("[INFO] Replacing previous weather engine with Fine-Only Regional Precipitation System...");
  const engineStart = js.indexOf("if (typeof window !== \"undefined\") {\n  (function() {");
  const engineEnd = js.indexOf("})();\n}\n");
  if (engineStart !== -1 && engineEnd !== -1) {
    js = js.substring(engineEnd + 7);
  }
}

// 1. FINE-ONLY TEXTURE-FIELD WEATHER ENGINE CODE
const weatherEngineCode = `if (typeof window !== "undefined") {
  (function() {
    // 1. Seamless 256x256 texture for tiny, fine, semi-transparent blue-gray dashes (no speed lines, large empty gaps)
    let precipCanvas = null;
    function getPrecipTexture() {
      if (precipCanvas) return precipCanvas;
      precipCanvas = document.createElement("canvas");
      precipCanvas.width = 256;
      precipCanvas.height = 256;
      const ctx = precipCanvas.getContext("2d");
      if (!ctx) return precipCanvas;

      ctx.clearRect(0, 0, 256, 256);

      // Draw exactly ~90 highly-irregularly scattered tiny blue-gray dashes to ensure substantial empty space
      // Lengths: 2px to 5px (absolute maximum 7px), thickness: 0.6px, opacity: 0.08 - 0.16
      for (let i = 0; i < 95; i++) {
        // Group them irregularly using noise clusters to prevent any uniform stripe pattern
        const cluster = Math.floor(i / 15);
        const ox = (cluster % 3) * 80;
        const oy = Math.floor(cluster / 3) * 80;
        
        const rx = ox + Math.random() * 70;
        const ry = oy + Math.random() * 70;
        
        const len = 2.0 + Math.random() * 3.0; // 2px to 5px (absolute max limit 7px)
        const alpha = 0.08 + Math.random() * 0.08; // 8% to 16% opacity

        ctx.strokeStyle = "rgba(125, 148, 172, " + alpha.toFixed(2) + ")";
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        
        // Consistent wind direction: ~25 degree diagonal slope
        const dx = len * 0.45;
        const dy = len * 0.89;
        ctx.lineTo(rx + dx, ry + dy);
        ctx.stroke();
      }
      return precipCanvas;
    }

    // 8 Highly-Tuned Presets (Atmospheric parameters only, ZERO visible rain line renderers)
    const PRESETS = {
      CLEAR: {
        name: "Clear Mediterranean",
        precipType: "NONE", precipOpacity: 0.0,
        tint: [255, 245, 220, 0.00], brightness: 1.0, contrast: 1.0, saturation: 1.0
      },
      PARTLY_CLOUDY: {
        name: "Partly Cloudy",
        precipType: "NONE", precipOpacity: 0.0,
        tint: [210, 228, 245, 0.02], brightness: 0.98, contrast: 0.98, saturation: 0.95
      },
      OVERCAST: {
        name: "Overcast Skies",
        precipType: "NONE", precipOpacity: 0.0,
        tint: [175, 192, 212, 0.06], brightness: 0.90, contrast: 0.94, saturation: 0.85
      },
      FOG: {
        name: "Coastal Fog & Mist",
        precipType: "NONE", precipOpacity: 0.0,
        tint: [205, 222, 238, 0.15], brightness: 0.88, contrast: 0.86, saturation: 0.80
      },
      LIGHT_RAIN: {
        name: "Light Mediterranean Rain",
        precipType: "RAIN", precipOpacity: 0.35, // Sparse blits of the tiny-speckle texture
        tint: [145, 162, 185, 0.04], brightness: 0.92, contrast: 0.95, saturation: 0.90 // Subtle cooling desaturation
      },
      STORM: {
        name: "Mediterranean Storm",
        precipType: "STORM", precipOpacity: 0.75, // Denser blits of the tiny-speckle texture
        tint: [120, 140, 165, 0.09], brightness: 0.85, contrast: 0.92, saturation: 0.82 // Stronger cooling & desaturation
      },
      SNOW: {
        name: "Alpine Snow",
        precipType: "SNOW", precipOpacity: 0.0,
        tint: [235, 244, 255, 0.08], brightness: 0.95, contrast: 0.90, saturation: 0.80
      },
      DUST: {
        name: "Saharan Dust & Haze",
        precipType: "DUST", precipOpacity: 0.0,
        tint: [220, 165, 90, 0.10], brightness: 0.94, contrast: 0.88, saturation: 0.88
      }
    };

    function getRegionalWeather(mapX, mapY) {
      const timeSec = Date.now() / 1000;
      const frontX = ((timeSec / 180) % 1.0) * 2400;
      const frontDist = Math.abs(mapX - frontX);

      if (mapY > 680) {
        if (frontDist < 300) return "DUST";
        const cycle = Math.floor(timeSec / 60) % 4;
        return ["CLEAR", "CLEAR", "DUST", "PARTLY_CLOUDY"][cycle];
      }
      if (mapY < 320) {
        if (frontDist < 350) return "SNOW";
        const cycle = Math.floor(timeSec / 50) % 5;
        return ["OVERCAST", "LIGHT_RAIN", "FOG", "SNOW", "PARTLY_CLOUDY"][cycle];
      }
      if (mapX < 450) {
        if (frontDist < 400) return "STORM";
        const cycle = Math.floor(timeSec / 55) % 4;
        return ["STORM", "OVERCAST", "LIGHT_RAIN", "FOG"][cycle];
      }
      if (frontDist < 250) return "STORM";
      if (frontDist < 500) return "LIGHT_RAIN";
      const cycle = Math.floor(timeSec / 90) % 5;
      return ["CLEAR", "PARTLY_CLOUDY", "CLEAR", "FOG", "LIGHT_RAIN"][cycle];
    }

    const state = {
      activeType: "CLEAR",
      targetType: "CLEAR",
      transitionProgress: 1.0,
      forcedOverride: null,
      qualityLevel: 0,
      suspended: false,
      curParams: { ...PRESETS.CLEAR },
      precipX: 0,
      precipY: 0,
      lastRenderMs: 0
    };

    // Low-frequency simulation loop (~3 Hz)
    setInterval(() => {
      if (state.suspended) return;

      let desiredType = state.forcedOverride;
      if (!desiredType) {
        const cameraX = window.__mnCameraPos ? window.__mnCameraPos.x : 1200;
        const cameraY = window.__mnCameraPos ? window.__mnCameraPos.y : 500;
        desiredType = getRegionalWeather(cameraX, cameraY);
      }

      if (desiredType !== state.targetType) {
        state.targetType = desiredType;
        state.transitionProgress = 0.0;
      }

      if (state.transitionProgress < 1.0) {
        state.transitionProgress = Math.min(1.0, state.transitionProgress + 0.035);
        if (state.transitionProgress >= 1.0) {
          state.activeType = state.targetType;
        }
      }

      const startPreset = PRESETS[state.activeType] || PRESETS.CLEAR;
      const targetPreset = PRESETS[state.targetType] || PRESETS.CLEAR;
      const t = state.transitionProgress;

      const lerp = (a, b) => a + (b - a) * t;
      state.curParams.precipOpacity = lerp(startPreset.precipOpacity, targetPreset.precipOpacity);
      state.curParams.brightness = lerp(startPreset.brightness, targetPreset.brightness);
      state.curParams.contrast = lerp(startPreset.contrast, targetPreset.contrast);
      state.curParams.saturation = lerp(startPreset.saturation, targetPreset.saturation);
      state.curParams.tint = [
        Math.round(lerp(startPreset.tint[0], targetPreset.tint[0])),
        Math.round(lerp(startPreset.tint[1], targetPreset.tint[1])),
        Math.round(lerp(startPreset.tint[2], targetPreset.tint[2])),
        lerp(startPreset.tint[3], targetPreset.tint[3])
      ];
      state.curParams.precipType = t > 0.5 ? targetPreset.precipType : startPreset.precipType;
    }, 350);

    window.__mnWeatherEngine = {
      state,
      PRESETS,
      setForcedWeather: function(type) {
        state.forcedOverride = type;
        if (type && PRESETS[type]) {
          state.targetType = type;
          state.transitionProgress = 1.0;
          state.activeType = type;
          state.curParams = { ...PRESETS[type] };
        }
        window.dispatchEvent(new CustomEvent("mn-diag-update"));
      },
      setSuspended: function(sus) {
        state.suspended = sus;
      }
    };

    // High-Performance CSS-Driven Weather Layer bounded strictly under HUD (54px top, 66px bottom) at z-10
    window.WeatherCanvasLayer = function WeatherCanvasLayer() {
      const containerRef = b.useRef(null);
      const rainRef = b.useRef(null);
      const veilRef = b.useRef(null);

      // Pre-generate textures for light rain and heavy storm
      const lightRainUrl = b.useMemo(() => {
        if (typeof document === "undefined") return "";
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        if (!ctx) return "";
        ctx.clearRect(0, 0, 256, 256);
        // Sparse tiny dashes for light rain: ~35 marks to ensure substantial empty space
        for (let i = 0; i < 35; i++) {
          const rx = Math.random() * 248;
          const ry = Math.random() * 248;
          const len = 2.0 + Math.random() * 3.2; // typical 2px to 5px (absolute max 7px)
          const alpha = 0.08 + Math.random() * 0.08; // 8% to 16% opacity
          ctx.strokeStyle = "rgba(110, 132, 158, " + alpha.toFixed(3) + ")";
          ctx.lineWidth = 0.70;
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx + len * 0.45, ry + len * 0.89); // ~25 degree slope wind
          ctx.stroke();
        }
        return canvas.toDataURL();
      }, []);

      const stormUrl = b.useMemo(() => {
        if (typeof document === "undefined") return "";
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        if (!ctx) return "";
        ctx.clearRect(0, 0, 256, 256);
        // Denser marks for heavy rain: ~110 marks (size, brightness, thickness and length remain tiny/constant!)
        for (let i = 0; i < 110; i++) {
          const rx = Math.random() * 248;
          const ry = Math.random() * 248;
          const len = 2.0 + Math.random() * 3.5; // remains typical 2-5px, max 7px
          const alpha = 0.08 + Math.random() * 0.08; // same low opacity (never bright white!)
          ctx.strokeStyle = "rgba(110, 132, 158, " + alpha.toFixed(3) + ")";
          ctx.lineWidth = 0.70;
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx + len * 0.45, ry + len * 0.89); // consistent wind direction
          ctx.stroke();
        }
        return canvas.toDataURL();
      }, []);

      b.useEffect(() => {
        // Inject high-performance CSS keyframe for translation if not present
        if (!document.getElementById("rain-drift-style")) {
          const style = document.createElement("style");
          style.id = "rain-drift-style";
          style.innerHTML = \`
            @keyframes rainDrift {
              0% { transform: translate3d(0px, 0px, 0px); }
              100% { transform: translate3d(256px, 512px, 0px); }
            }
\`;
          document.head.appendChild(style);
        }
      }, []);

      b.useEffect(() => {
        let animId;
        
        const update = () => {
          animId = requestAnimationFrame(update);
          
          if (state.suspended) return;
          
          const params = state.curParams;
          const rainEl = rainRef.current;
          const veilEl = veilRef.current;
          
          // 1. Dynamic map color temperature and desaturation
          const mapEl = document.getElementById("map-container-inner");
          if (mapEl) {
            // Apply live desaturation and contrast directly to the map layer
            mapEl.style.filter = "brightness(" + params.brightness.toFixed(3) + ") contrast(" + params.contrast.toFixed(3) + ") saturate(" + params.saturation.toFixed(3) + ")";
          }
          
          // 2. Update Atmospheric Veil style properties
          if (veilEl) {
            if (params.tint && params.tint[3] > 0.001) {
              veilEl.style.opacity = params.tint[3].toFixed(3);
              const r = params.tint[0], g = params.tint[1], bColor = params.tint[2];
              veilEl.style.backgroundColor = "rgb(" + r + "," + g + "," + bColor + ")";
              veilEl.style.display = "block";
            } else {
              veilEl.style.display = "none";
            }
          }
          
          // 3. Update Precipitation Layer style properties
          if (rainEl) {
            if (params.precipOpacity > 0.01 && (params.precipType === "RAIN" || params.precipType === "STORM")) {
              rainEl.style.opacity = params.precipOpacity.toFixed(3);
              rainEl.style.display = "block";
              
              const isStorm = params.precipType === "STORM";
              const targetBg = "url(" + (isStorm ? stormUrl : lightRainUrl) + ")";
              if (rainEl.style.backgroundImage !== targetBg) {
                rainEl.style.backgroundImage = targetBg;
              }
            } else {
              rainEl.style.display = "none";
            }
          }
        };
        
        animId = requestAnimationFrame(update);
        return () => {
          cancelAnimationFrame(animId);
          // Restore map element style when unmounted
          const mapEl = document.getElementById("map-container-inner");
          if (mapEl) {
            mapEl.style.filter = "";
          }
        };
      }, [lightRainUrl, stormUrl]);

      return e.jsxs("div", {
        ref: containerRef,
        className: "absolute left-0 right-0 pointer-events-none z-10 block overflow-hidden",
        style: { top: "54px", bottom: "66px", width: "100%", height: "calc(100% - 120px)" },
        children: [
          // Atmospheric cooling veil
          e.jsx("div", {
            ref: veilRef,
            className: "absolute inset-0 pointer-events-none transition-opacity duration-300",
            style: { opacity: 0 }
          }),
          // Seamless repeating rain layer using CSS transform translation (hardware-accelerated, zero repaints)
          e.jsx("div", {
            ref: rainRef,
            className: "absolute pointer-events-none",
            style: {
              inset: "-512px", // Oversized to ensure no gaps during translation
              backgroundRepeat: "repeat",
              backgroundPosition: "0 0",
              animation: "rainDrift 2.2s linear infinite",
              opacity: 0,
              willChange: "transform"
            }
          })
        ]
      });
    };
  })();
}
`;

// Inject weather engine code at top of bundle
js = weatherEngineCode + "\n" + js;


// Mount WeatherCanvasLayer into map-main-scroll-viewport if not present
if (!js.includes("window.WeatherCanvasLayer")) {
  const markerViewport = 'id:"map-main-scroll-viewport"';
  const pViewport = js.indexOf(markerViewport);
  if (pViewport !== -1) {
    const pJsxChildren = js.indexOf("children:[", pViewport);
    if (pJsxChildren !== -1) {
      js = js.substring(0, pJsxChildren + 10) + "e.jsx(window.WeatherCanvasLayer,{})," + js.substring(pJsxChildren + 10);
      
    }
  }
}

// Enhance Diagnostic Overlay Panel if not present
if (!js.includes("Weather Director:")) {
  const diagMarker = '⚡ DIAGNOSTICA IMPERII (Safari Drag)';
  const pDiag = js.indexOf(diagMarker);
  if (pDiag !== -1) {
    const pGridEnd = js.indexOf('e.jsx("button", {', pDiag);
    if (pGridEnd !== -1) {
      const weatherDiagUi = `
        e.jsxs("div", {
          className: "mt-1 pt-1.5 border-t border-amber-500/30 flex flex-col gap-1",
          children: [
            e.jsxs("div", {
              className: "flex items-center justify-between text-[10px] font-mono text-amber-200",
              children: [
                e.jsx("span", { className: "font-bold text-amber-300", children: "Weather Director:" }),
                e.jsxs("span", { children: [
                  window.__mnWeatherEngine ? window.__mnWeatherEngine.state.targetType : "CLEAR"
                ] })
              ]
            }),
            e.jsxs("div", {
              className: "grid grid-cols-4 gap-1 text-[9px]",
              children: [
                e.jsx("button", { onClick: () => window.__mnWeatherEngine?.setForcedWeather(null), className: "px-1 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-900", children: "Auto" }),
                e.jsx("button", { onClick: () => window.__mnWeatherEngine?.setForcedWeather("CLEAR"), className: "px-1 py-0.5 rounded bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-800", children: "Clear" }),
                e.jsx("button", { onClick: () => window.__mnWeatherEngine?.setForcedWeather("LIGHT_RAIN"), className: "px-1 py-0.5 rounded bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-800", children: "Rain" }),
                e.jsx("button", { onClick: () => window.__mnWeatherEngine?.setForcedWeather("STORM"), className: "px-1 py-0.5 rounded bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-800", children: "Storm" }),
                e.jsx("button", { onClick: () => window.__mnWeatherEngine?.setForcedWeather("FOG"), className: "px-1 py-0.5 rounded bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-800", children: "Fog" }),
                e.jsx("button", { onClick: () => window.__mnWeatherEngine?.setForcedWeather("SNOW"), className: "px-1 py-0.5 rounded bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-800", children: "Snow" }),
                e.jsx("button", { onClick: () => window.__mnWeatherEngine?.setForcedWeather("DUST"), className: "px-1 py-0.5 rounded bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-800", children: "Dust" }),
                e.jsx("button", { onClick: () => window.__mnWeatherEngine?.setForcedWeather("OVERCAST"), className: "px-1 py-0.5 rounded bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-800", children: "Clouds" })
              ]
            })
          ]
        }),
      `;
      js = js.substring(0, pGridEnd) + weatherDiagUi + js.substring(pGridEnd);
      
    }
  }
}

if (esbuild) {
  console.log("Validating Weather System syntax with esbuild...");
  esbuild.transformSync(js, { loader: "js" });
  
}

fs.writeFileSync(bundlePath, js, "utf8");

// Sync to dist
const distPath = path.join(__dirname, "../dist/assets/index-V33.js");
if (fs.existsSync(path.dirname(distPath))) {
  fs.writeFileSync(distPath, js, "utf8");
}

console.log("=== FINE-ONLY REGIONAL PRECIPITATION TEXTURE-FIELD SYSTEM COMPLETE ===");
