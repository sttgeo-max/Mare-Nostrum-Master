// === MARE NOSTRUM II: COMBAT TRACE & RETURN-TO-MAP DIAGNOSTIC ENGINE ===
if (typeof window !== "undefined") {
  (function() {
    const STORAGE_KEY = "mare_nostrum_combat_debug_trace";
    const MAX_EVENTS = 100;
    
    let ringBuffer = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        ringBuffer = JSON.parse(stored);
        if (!Array.isArray(ringBuffer)) ringBuffer = [];
      }
    } catch (e) {
      ringBuffer = [];
    }

    let currentTraceId = ringBuffer.length > 0 && ringBuffer[ringBuffer.length - 1].traceId ? ringBuffer[ringBuffer.length - 1].traceId : ("trace_init_" + Date.now());
    let currentCombatStartTime = Date.now();
    let currentSeq = ringBuffer.length > 0 ? (ringBuffer[ringBuffer.length - 1].seq || 0) : 0;
    let combatPhase = "IDLE";
    let transitionPhase = "IDLE";
    let isResultCommitted = false;
    let mapLoopRunning = true;
    let currentScreen = "MAP";
    let transitionWatchdogTimer = null;
    let stepCallCounts = {};

    function checkMapLoopStatus() {
      if (typeof window !== "undefined" && window.__mnMapLoopActive !== undefined) {
        return window.__mnMapLoopActive;
      }
      return mapLoopRunning;
    }

    function recordEvent(step, details, error) {
      if (details === undefined) details = {};
      if (error === undefined) error = null;
      currentSeq++;
      const nowMs = Date.now();
      const perfNow = typeof performance !== "undefined" ? Number(performance.now().toFixed(2)) : 0;
      const relMs = nowMs - currentCombatStartTime;

      stepCallCounts[step] = (stepCallCounts[step] || 0) + 1;
      const isDuplicate = stepCallCounts[step] > 1;

      let sanitizedDetails = "";
      try {
        if (typeof details === "string") {
          sanitizedDetails = details;
        } else if (typeof details === "object" && details !== null) {
          sanitizedDetails = JSON.stringify(details);
        } else {
          sanitizedDetails = String(details);
        }
      } catch (err) {
        sanitizedDetails = "[Unserializable details]";
      }

      const eventObj = {
        traceId: currentTraceId,
        seq: currentSeq,
        ts: new Date().toISOString(),
        relMs: relMs,
        perfMs: perfNow,
        step: step,
        screen: currentScreen,
        combatPhase: combatPhase,
        transitionPhase: transitionPhase,
        resultCommitted: isResultCommitted,
        mapLoopRunning: checkMapLoopStatus(),
        duplicate: isDuplicate,
        callCount: stepCallCounts[step],
        details: sanitizedDetails
      };

      if (error) {
        eventObj.error = typeof error === "string" ? error : (error.message || String(error));
        if (error.stack) eventObj.errorStack = error.stack.split("\n").slice(0, 3).join(" -> ");
      }

      ringBuffer.push(eventObj);
      if (ringBuffer.length > MAX_EVENTS) {
        ringBuffer = ringBuffer.slice(-MAX_EVENTS);
      }

      if (!window.__mnTraceSaveTimer) {
        window.__mnTraceSaveTimer = setTimeout(() => {
          window.__mnTraceSaveTimer = null;
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ringBuffer));
          } catch (storageErr) {}
        }, 1000);
      }

      console.log("[COMBAT_TRACE #" + currentSeq + " | " + currentTraceId.slice(-6) + "] " + step + " " + sanitizedDetails, error || "");
      return eventObj;
    }

    function startCombatTrace(enemyInfo) {
      currentTraceId = "trace_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6);
      currentCombatStartTime = Date.now();
      stepCallCounts = {};
      combatPhase = "COMBAT_ACTIVE";
      transitionPhase = "COMBAT_ACTIVE";
      isResultCommitted = false;
      currentScreen = "BATTLE";

      if (transitionWatchdogTimer) {
        clearTimeout(transitionWatchdogTimer);
        transitionWatchdogTimer = null;
      }

      const enemySummary = {
        id: enemyInfo ? enemyInfo.id : "unknown",
        name: enemyInfo ? enemyInfo.name : "Enemy",
        hp: enemyInfo ? enemyInfo.hp : 0,
        domain: enemyInfo ? enemyInfo.domain : "sea"
      };

      return recordEvent("COMBAT_ENCOUNTER_START", enemySummary);
    }

    function armTransitionWatchdog(stepName, timeoutMs) {
      if (timeoutMs === undefined) timeoutMs = 3000;
      if (transitionWatchdogTimer) clearTimeout(transitionWatchdogTimer);
      transitionWatchdogTimer = setTimeout(function() {
        if (transitionPhase !== "MAP_READY" && transitionPhase !== "IDLE") {
          const domOverlays = [];
          if (document.querySelector(".fixed.inset-0")) domOverlays.push("fixed-inset-0");
          if (document.querySelector("[data-modal]")) domOverlays.push("data-modal");
          if (document.querySelector(".combat-modal-boundary")) domOverlays.push("combat-boundary");

          recordEvent("TRANSITION_STALL_WATCHDOG_TRIGGERED", {
            lastStep: stepName,
            transitionPhase: transitionPhase,
            combatPhase: combatPhase,
            screen: currentScreen,
            activeOverlays: domOverlays,
            bodyPointerEvents: document.body.style.pointerEvents || "auto",
            message: "Combat transition did not complete within " + timeoutMs + "ms"
          });
        }
      }, timeoutMs);
    }

    function measureSync(checkpointName, fn) {
      const t0 = performance.now();
      try {
        const result = fn();
        const duration = Number((performance.now() - t0).toFixed(2));
        recordEvent("TIMING_CHECKPOINT", { name: checkpointName, durationMs: duration });
        return result;
      } catch (err) {
        const duration = Number((performance.now() - t0).toFixed(2));
        recordEvent("TIMING_CHECKPOINT_ERROR", { name: checkpointName, durationMs: duration }, err);
        throw err;
      }
    }

    window.addEventListener("error", function(evt) {
      recordEvent("WINDOW_UNHANDLED_ERROR", {
        message: evt.message,
        filename: evt.filename ? evt.filename.split("/").pop() : "unknown",
        lineno: evt.lineno,
        colno: evt.colno
      }, evt.error);
    });

    window.addEventListener("unhandledrejection", function(evt) {
      recordEvent("WINDOW_UNHANDLED_PROMISE_REJECTION", {
        reason: typeof evt.reason === "object" ? (evt.reason ? evt.reason.message || JSON.stringify(evt.reason) : "") : String(evt.reason)
      });
    });

    function showInGameToast(msg) {
      try {
        const existing = document.getElementById("mn-trace-toast");
        if (existing) existing.remove();
        const toast = document.createElement("div");
        toast.id = "mn-trace-toast";
        toast.style.cssText = "position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:999999;background:rgba(18,11,1,0.95);border:2px solid #f59e0b;color:#fef08a;font-family:Cinzel,serif;font-weight:900;font-size:11px;padding:8px 16px;border-radius:6px;box-shadow:0 10px 25px rgba(0,0,0,0.8);letter-spacing:1px;pointer-events:none;transition:opacity 0.3s ease;";
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(function() { toast.style.opacity = "0"; setTimeout(function() { toast.remove(); }, 350); }, 2200);
      } catch(e) {}
    }

    function showTraceModalUI(jsonText) {
      try {
        const existing = document.getElementById("mn-trace-modal");
        if (existing) existing.remove();
        const modal = document.createElement("div");
        modal.id = "mn-trace-modal";
        modal.style.cssText = "position:fixed;inset:0;z-index:999998;background:rgba(0,0,0,0.85);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:16px;";
        
        const card = document.createElement("div");
        card.style.cssText = "width:100%;max-width:540px;max-height:85vh;background:#181106;border:2px solid #f59e0b;border-radius:10px;display:flex;flex-direction:column;box-shadow:0 20px 40px rgba(0,0,0,0.9);overflow:hidden;";
        
        const header = document.createElement("div");
        header.style.cssText = "padding:12px 16px;background:rgba(60,40,10,0.6);border-bottom:1px solid #78350f;display:flex;align-items:center;justify-content:space-between;color:#fef08a;font-family:Cinzel,serif;font-weight:900;font-size:12px;letter-spacing:1px;";
        header.innerHTML = "<span>⚔️ COMBAT & RETURN-TO-MAP DEBUG TRACE</span><button id='mn-trace-close-btn' style='margin-left:auto;background:none;border:none;color:#fca5a5;font-size:16px;cursor:pointer;font-weight:bold;'>✕</button>";
        
        const body = document.createElement("div");
        body.style.cssText = "padding:12px 16px;display:flex;flex-direction:column;gap:10px;flex:1;overflow:hidden;";
        
        const desc = document.createElement("div");
        desc.style.cssText = "color:#cbd5e1;font-size:10px;font-family:sans-serif;";
        desc.textContent = "Latest 100 combat transition events stored persistently in localStorage. Copy and inspect exact step-by-step sequence:";
        
        const textarea = document.createElement("textarea");
        textarea.readOnly = true;
        textarea.value = jsonText;
        textarea.style.cssText = "width:100%;flex:1;min-height:220px;background:#0d0802;border:1px solid #78350f;color:#86efac;font-family:monospace;font-size:9.5px;padding:8px;border-radius:4px;resize:none;outline:none;";
        
        const actions = document.createElement("div");
        actions.style.cssText = "display:flex;gap:8px;margin-top:4px;";
        
        const copyBtn = document.createElement("button");
        copyBtn.textContent = "📋 COPY TO CLIPBOARD";
        copyBtn.style.cssText = "flex:1;background:#78350f;border:1px solid #f59e0b;color:#fef08a;font-family:Cinzel,serif;font-weight:bold;font-size:11px;padding:8px;border-radius:4px;cursor:pointer;";
        copyBtn.onclick = function() {
          textarea.select();
          try {
            navigator.clipboard.writeText(jsonText).then(function() {
              showInGameToast("DEBUG TRACE COPIED (" + ringBuffer.length + " EVENTS)");
            }).catch(function() {
              document.execCommand("copy");
              showInGameToast("DEBUG TRACE COPIED (" + ringBuffer.length + " EVENTS)");
            });
          } catch(e) {
            document.execCommand("copy");
            showInGameToast("DEBUG TRACE COPIED (" + ringBuffer.length + " EVENTS)");
          }
        };

        const clearBtn = document.createElement("button");
        clearBtn.textContent = "🗑️ CLEAR LOG";
        clearBtn.style.cssText = "background:#450a0a;border:1px solid #ef4444;color:#fca5a5;font-family:Cinzel,serif;font-weight:bold;font-size:10px;padding:8px 12px;border-radius:4px;cursor:pointer;";
        clearBtn.onclick = function() {
          window.__CombatTraceEngine.clearTrace();
          textarea.value = "[]";
          showInGameToast("DEBUG TRACE CLEARED");
        };

        actions.appendChild(copyBtn);
        actions.appendChild(clearBtn);
        body.appendChild(desc);
        body.appendChild(textarea);
        body.appendChild(actions);
        card.appendChild(header);
        card.appendChild(body);
        modal.appendChild(card);
        document.body.appendChild(modal);

        modal.querySelector("#mn-trace-close-btn").onclick = function() { modal.remove(); };
        modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
      } catch(e) {}
    }

    window.__showTraceNotification = showInGameToast;
    window.__showTraceModal = showTraceModalUI;

    window.__CombatTraceEngine = {
      record: recordEvent,
      startCombat: startCombatTrace,
      armWatchdog: armTransitionWatchdog,
      measureSync: measureSync,
      setScreen: function(scr) { currentScreen = scr; },
      setCombatPhase: function(cp) { combatPhase = cp; },
      setTransitionPhase: function(tp) { transitionPhase = tp; },
      setResultCommitted: function(rc) { isResultCommitted = rc; },
      setMapLoopActive: function(mla) { mapLoopRunning = mla; window.__mnMapLoopActive = mla; },
      getTrace: function() { return ringBuffer; },
      getTraceJson: function() { return JSON.stringify(ringBuffer, null, 2); },
      clearTrace: function() {
        ringBuffer = [];
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
        console.log("[TraceEngine] Cleared combat trace buffer.");
      },
      showModal: function() { showTraceModalUI(JSON.stringify(ringBuffer, null, 2)); },
      copyTrace: async function() {
        const json = JSON.stringify(ringBuffer, null, 2);
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(json);
            showInGameToast("DEBUG TRACE COPIED (" + ringBuffer.length + " EVENTS)");
            return { success: true, count: ringBuffer.length, json: json };
          }
        } catch (e) {}
        showTraceModalUI(json);
        return { success: false, count: ringBuffer.length, json: json };
      }
    };

    window.__getCombatTrace = function() { return window.__CombatTraceEngine.getTrace(); };
    window.__copyCombatTrace = function() { return window.__CombatTraceEngine.copyTrace(); };
    window.__clearCombatTrace = function() { return window.__CombatTraceEngine.clearTrace(); };
    window.__showCombatTrace = function() { return window.__CombatTraceEngine.showModal(); };
  })();
}
