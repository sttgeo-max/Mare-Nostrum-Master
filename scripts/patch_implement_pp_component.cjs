const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

console.log("=== IMPLEMENTING PP COMPONENT (MEDITERRANEAN MAP & HUD CONTROLLER) ===");

const bundlePath = path.join(__dirname, '../public/assets/index-V37.js');
let code = fs.readFileSync(bundlePath, 'utf8');

const ppComponentCode = `    const pp = ({
      player,
      setPlayer,
      fleets = [],
      setFleets,
      convoys = [],
      setConvoys,
      hazards = [],
      setHazards,
      mapArtifacts = [],
      setMapArtifacts
    }) => {
      const [activeScreen, setActiveScreen] = b.useState("MAP");
      const [selectedPort, setSelectedPort] = b.useState(null);
      const [selectedEnemy, setSelectedEnemy] = b.useState(null);
      const [toastMsg, setToastMsg] = b.useState(null);

      // Player coordinates
      const [playerPos, setPlayerPos] = b.useState(() => {
        return (player && player.position) ? player.position : { x: 1180, y: 380 };
      });

      // Viewport Camera Coordinates (Centered on player)
      const [camera, setCamera] = b.useState(() => ({ x: playerPos.x, y: playerPos.y }));
      const [isDragging, setIsDragging] = b.useState(false);
      const dragRef = b.useRef({ startX: 0, startY: 0, camX: playerPos.x, camY: playerPos.y, moved: false });
      const [dims, setDims] = b.useState(() => ({
        w: typeof window !== 'undefined' ? window.innerWidth : 1024,
        h: typeof window !== 'undefined' ? window.innerHeight : 768
      }));

      b.useEffect(() => {
        const handleResize = () => setDims({ w: window.innerWidth, h: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      // Synchronize player position
      b.useEffect(() => {
        if (setPlayer && (!player.position || player.position.x !== playerPos.x || player.position.y !== playerPos.y)) {
          setPlayer(prev => ({ ...prev, position: playerPos }));
        }
      }, [playerPos, player, setPlayer]);

      // Recenter camera on player
      b.useEffect(() => {
        const handleRecenter = () => setCamera({ x: playerPos.x, y: playerPos.y });
        window.addEventListener('recenter-camera-on-player', handleRecenter);
        return () => window.removeEventListener('recenter-camera-on-player', handleRecenter);
      }, [playerPos]);

      // Auto-dismiss toast notifications
      b.useEffect(() => {
        if (toastMsg) {
          const timer = setTimeout(() => setToastMsg(null), 3500);
          return () => clearTimeout(timer);
        }
      }, [toastMsg]);

      // Strategic Proximities
      const nearbyPort = b.useMemo(() => {
        if (typeof Bt === 'undefined' || !Array.isArray(Bt)) return null;
        return Bt.find(p => {
          if (typeof p.x !== 'number' || typeof p.y !== 'number') return false;
          const dx = p.x - playerPos.x;
          const dy = p.y - playerPos.y;
          return (dx * dx + dy * dy) <= 65 * 65;
        }) || null;
      }, [playerPos]);

      const nearbyEnemy = b.useMemo(() => {
        if (!Array.isArray(fleets)) return null;
        return fleets.find(f => {
          if (f.defeated) return false;
          const fx = f.x ?? f.position?.x ?? 0;
          const fy = f.y ?? f.position?.y ?? 0;
          const dx = fx - playerPos.x;
          const dy = fy - playerPos.y;
          return (dx * dx + dy * dy) <= 55 * 55;
        }) || null;
      }, [fleets, playerPos]);

      // Direction Pad Traversal Logic
      const handleMoveVector = b.useCallback((dx, dy) => {
        const curIter = player?.iter ?? 6;
        if (curIter <= 0) {
          setToastMsg("Movement points (Iter) exhausted! End your turn to replenish provisions.");
          return;
        }
        const step = 28;
        setPlayerPos(prev => {
          const nx = Math.max(80, Math.min(2320, prev.x + dx * step));
          const ny = Math.max(60, Math.min(940, prev.y + dy * step));
          setCamera({ x: nx, y: ny });
          return { x: nx, y: ny };
        });
        setPlayer(p => ({ ...p, iter: Math.max(0, curIter - 1) }));
        try { if (typeof v !== 'undefined' && v.playShipMove) v.playShipMove(); } catch(e){}
      }, [player, setPlayer]);

      // Turn System: Provisions replenish & tribute collection
      const handleEndTurn = b.useCallback(() => {
        setPlayer(p => {
          const maxIt = p.maxIter || 6;
          const captured = p.capturedPorts || ['roma', 'massilia', 'gades'];
          const tributeSolidi = captured.length * 40;
          const newTurn = (p.turn || 1) + 1;
          setToastMsg("Turn " + newTurn + ": Collected " + tributeSolidi + " Solidi in provincial tributes. Iter replenished!");
          return {
            ...p,
            iter: maxIt,
            turn: newTurn,
            solidi: (p.solidi || 0) + tributeSolidi
          };
        });
        try { if (typeof v !== 'undefined' && v.playEndTurn) v.playEndTurn(); } catch(e){}
      }, [setPlayer]);

      // Smooth Viewport Dragging
      const handlePointerDown = b.useCallback((ev) => {
        if (ev.target && ev.target.closest('button, [role="button"], .interactive-node')) return;
        setIsDragging(true);
        dragRef.current = {
          startX: ev.clientX,
          startY: ev.clientY,
          camX: camera.x,
          camY: camera.y,
          moved: false
        };
      }, [camera]);

      const handlePointerMove = b.useCallback((ev) => {
        if (!isDragging) return;
        const dx = ev.clientX - dragRef.current.startX;
        const dy = ev.clientY - dragRef.current.startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragRef.current.moved = true;
        const nx = Math.max(100, Math.min(2300, dragRef.current.camX - dx));
        const ny = Math.max(100, Math.min(900, dragRef.current.camY - dy));
        setCamera({ x: nx, y: ny });
      }, [isDragging]);

      const handlePointerUp = b.useCallback(() => {
        setIsDragging(false);
      }, []);

      // Direct Map Sector Clicking
      const handleMapClick = b.useCallback((ev) => {
        if (dragRef.current.moved) return;
        if (ev.target && ev.target.closest('button, [role="button"], .interactive-node')) return;
        const rect = ev.currentTarget.getBoundingClientRect();
        const clickX = ev.clientX - rect.left + camera.x - dims.w / 2;
        const clickY = ev.clientY - rect.top + camera.y - dims.h / 2;
        if (clickX >= 0 && clickX <= 2400 && clickY >= 0 && clickY <= 1000) {
          const curIter = player?.iter ?? 6;
          if (curIter <= 0) {
            setToastMsg("Iter exhausted! Click End Turn to restore navigation action points.");
            return;
          }
          const dx = clickX - playerPos.x;
          const dy = clickY - playerPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const step = Math.min(dist, 40);
          const nx = Math.max(80, Math.min(2320, playerPos.x + (dx / dist) * step));
          const ny = Math.max(60, Math.min(940, playerPos.y + (dy / dist) * step));
          setPlayerPos({ x: nx, y: ny });
          setCamera({ x: nx, y: ny });
          setPlayer(p => ({ ...p, iter: Math.max(0, curIter - 1) }));
          try { if (typeof v !== 'undefined' && v.playShipMove) v.playShipMove(); } catch(e){}
        }
      }, [camera, dims, player, playerPos, setPlayer]);

      // Relic Collection
      const handleCollectArtifact = b.useCallback((art) => {
        if (setMapArtifacts) {
          setMapArtifacts(prev => prev.filter(a => a.id !== art.id));
        }
        setPlayer(p => ({
          ...p,
          inventory: [...(p.inventory || []), art],
          fama: (p.fama || 0) + 25
        }));
        setToastMsg("Acquired Sacred Relic: " + (art.name || "Imperial Artifact") + "! (+25 Fama)");
        try { if (typeof v !== 'undefined' && v.playItemPickup) v.playItemPickup(); } catch(e){}
      }, [setMapArtifacts, setPlayer]);

      // Active Region
      const currentRegion = b.useMemo(() => {
        if (typeof Pn === 'undefined' || !Array.isArray(Pn)) return "Mediterranean";
        const reg = Pn.find(r => playerPos.x >= r.bounds?.minX && playerPos.x <= r.bounds?.maxX);
        return reg ? reg.latinName : "MARE NOSTRUM";
      }, [playerPos.x]);

      const offsetX = -camera.x + dims.w / 2;
      const offsetY = -camera.y + dims.h / 2;

      return e.jsxs("div", {
        id: "map-main-scroll-viewport",
        className: "fixed inset-0 w-full h-full overflow-hidden select-none bg-[#06080e]",
        onPointerDown: handlePointerDown,
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerUp,
        style: { touchAction: "none" },
        children: [
          // 1. MAP SCENE WITH PARALLAX & ENTITIES
          e.jsxs("div", {
            className: "absolute inset-0 cursor-grab active:cursor-grabbing",
            onClick: handleMapClick,
            style: {
              width: 2400,
              height: 1000,
              transform: "translate3d(" + offsetX + "px, " + offsetY + "px, 0)",
              willChange: "transform"
            },
            children: [
              // A. Mediterranean Map SVG Layer
              typeof A0 !== 'undefined'
                ? e.jsx(A0, { width: 2400, height: 1000, timeOfDay: "DIES", season: "AESTAS", weather: "SERENVM" })
                : (typeof C0 !== 'undefined' ? e.jsx(C0, { width: 2400, height: 1000, timeOfDay: "DIES", season: "AESTAS", weather: "SERENVM" }) : null),

              // B. Strategic Ports Layer
              typeof Bt !== 'undefined' && Array.isArray(Bt) && Bt.map(port => {
                if (typeof port.x !== 'number' || typeof port.y !== 'number') return null;
                const isCaptured = (player?.capturedPorts || []).includes(port.id);
                return e.jsxs("div", {
                  key: "port_" + port.id,
                  className: "interactive-node absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-transform hover:scale-110",
                  style: { left: port.x, top: port.y },
                  onClick: (ev) => {
                    ev.stopPropagation();
                    setSelectedPort(port);
                    try { if (typeof v !== 'undefined' && v.playClick) v.playClick(); } catch(e){}
                  },
                  children: [
                    typeof rt !== 'undefined'
                      ? e.jsx(rt, {
                          variant: isCaptured ? "gold_sun" : "bronze_shield",
                          emblem: port.emblem || "anchor",
                          size: 32,
                          showGlow: isCaptured
                        })
                      : e.jsx("div", { className: "w-8 h-8 rounded-full bg-amber-500/80 border border-amber-300 flex items-center justify-center text-xs font-bold text-black", children: "⚓" }),
                    e.jsx("div", {
                      className: "absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-full bg-black/80 border border-amber-500/60 text-[9px] font-cinzel font-bold text-amber-200 whitespace-nowrap shadow-md pointer-events-none",
                      children: port.name || port.id
                    })
                  ]
                });
              }),

              // C. Relics & Map Artifacts Layer
              Array.isArray(mapArtifacts) && mapArtifacts.map(art => {
                const ax = art.x ?? 1200;
                const ay = art.y ?? 450;
                return e.jsx("div", {
                  key: "art_" + art.id,
                  className: "interactive-node absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-25 transition-transform hover:scale-125",
                  style: { left: ax, top: ay },
                  onClick: (ev) => {
                    ev.stopPropagation();
                    handleCollectArtifact(art);
                  },
                  children: typeof jc !== 'undefined'
                    ? e.jsx(jc, { type: art.type || "treasure", rarity: art.rarity || "gold", size: 30 })
                    : e.jsx("div", { className: "w-7 h-7 rounded-full bg-amber-400 text-black flex items-center justify-center text-sm font-bold shadow-lg", children: "🏛️" })
                });
              }),

              // D. Enemy & Fleet Entities Layer
              Array.isArray(fleets) && fleets.map(fleet => {
                if (fleet.defeated) return null;
                const fx = fleet.x ?? fleet.position?.x ?? 1250;
                const fy = fleet.y ?? fleet.position?.y ?? 420;
                return e.jsxs("div", {
                  key: "fleet_" + fleet.id,
                  className: "interactive-node absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 transition-transform hover:scale-115",
                  style: { left: fx, top: fy },
                  onClick: (ev) => {
                    ev.stopPropagation();
                    setSelectedEnemy(fleet);
                    try { if (typeof v !== 'undefined' && v.playClick) v.playClick(); } catch(e){}
                  },
                  children: [
                    typeof Uo !== 'undefined'
                      ? e.jsx(Uo, { fleet: fleet, size: 38, isElaborate: true })
                      : e.jsx("div", { className: "w-9 h-9 rounded-full bg-red-900 border-2 border-red-500 flex items-center justify-center text-xs font-bold text-white", children: "⚔️" }),
                    fleet.name && e.jsx("div", {
                      className: "absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.2 bg-black/80 border border-red-600/60 rounded text-[8px] font-cinzel text-red-300 whitespace-nowrap",
                      children: fleet.name
                    })
                  ]
                });
              }),

              // E. Player Token (zo)
              e.jsx("div", {
                className: "absolute -translate-x-1/2 -translate-y-1/2 z-35 transition-all duration-150 ease-out",
                style: { left: playerPos.x, top: playerPos.y },
                children: typeof zo !== 'undefined'
                  ? e.jsx(zo, {
                      player: { ...player, position: playerPos },
                      playerMode: player?.playerMode || "sea",
                      isMoving: false,
                      mapScale: 1
                    })
                  : e.jsx("div", { className: "w-12 h-12 rounded-full bg-indigo-900 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-bold", children: "SPQR" })
              })
            ]
          }),

          // 2. TOP BAR: ROMAN STATUS & REGION
          e.jsxs("div", {
            className: "pointer-events-none fixed top-0 inset-x-0 z-40 p-2 sm:p-3 flex items-center justify-between bg-gradient-to-b from-[#04060b]/90 via-[#060910]/70 to-transparent",
            children: [
              // Emperor Title & Province
              e.jsxs("div", {
                className: "pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-black/70 border border-amber-500/40 shadow-lg backdrop-blur-md",
                children: [
                  e.jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.9)]" }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("div", { className: "text-[11px] font-cinzel font-black text-amber-300 tracking-wider", children: player?.latinName || "Imperator Constantinus" }),
                      e.jsx("div", { className: "text-[8.5px] font-mono text-amber-400/80 tracking-widest uppercase", children: currentRegion })
                    ]
                  })
                ]
              }),

              // Solidi, Fama, HP, Iter
              e.jsxs("div", {
                className: "pointer-events-auto flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-2xl bg-black/70 border border-amber-500/40 shadow-lg backdrop-blur-md text-[10px] font-cinzel font-bold text-amber-200",
                children: [
                  e.jsxs("div", { className: "flex items-center gap-1 text-amber-300", children: ["🪙", e.jsx("span", { className: "font-mono font-bold", children: (player?.solidi ?? 2450).toLocaleString() })] }),
                  e.jsxs("div", { className: "flex items-center gap-1 text-purple-300", children: ["🏛️", e.jsx("span", { className: "font-mono font-bold", children: (player?.fama ?? 120).toLocaleString() })] }),
                  e.jsxs("div", { className: "flex items-center gap-1 text-emerald-400", children: ["❤️", e.jsx("span", { className: "font-mono font-bold", children: (player?.fleetHp ?? 100) + "/" + (player?.maxFleetHp ?? 100) })] }),
                  e.jsxs("div", { className: "flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 border border-amber-500/60 rounded-full text-amber-300", children: ["ITER: ", e.jsx("span", { className: "font-mono font-black text-white", children: (player?.iter ?? 6) + "/" + (player?.maxIter ?? 6) })] })
                ]
              })
            ]
          }),

          // 3. TOAST NOTIFICATIONS
          toastMsg && e.jsx("div", {
            className: "pointer-events-none fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-black/90 border border-amber-400/90 rounded-2xl shadow-2xl backdrop-blur-md text-amber-200 font-cinzel text-xs font-bold text-center tracking-wide",
            children: toastMsg
          }),

          // 4. BOTTOM HUD OVERLAY (d0)
          typeof d0 !== 'undefined' && e.jsx(d0, {
            player: { ...player, position: playerPos },
            activeScreen: activeScreen,
            setActiveScreen: setActiveScreen,
            fleets: fleets,
            mapArtifacts: mapArtifacts,
            nearbyPort: nearbyPort,
            onDockAtPort: () => { if (nearbyPort) setSelectedPort(nearbyPort); },
            nearbyEnemy: nearbyEnemy,
            onEngageEnemy: () => { if (nearbyEnemy) setSelectedEnemy(nearbyEnemy); },
            onEndTurn: handleEndTurn,
            onMoveVector: handleMoveVector,
            onRecenterMap: () => setCamera({ x: playerPos.x, y: playerPos.y })
          }),

          // 5. CONTEXT PORT DOCKING MODAL (e0)
          selectedPort && typeof e0 !== 'undefined' && e.jsx(e0, {
            port: selectedPort,
            player: player,
            setPlayer: setPlayer,
            onClose: () => setSelectedPort(null)
          }),

          // 6. COMBAT ENGAGEMENT MODAL
          selectedEnemy && e.jsxs("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-lg select-none",
            children: [
              e.jsxs("div", {
                className: "relative w-full max-w-lg p-6 rounded-3xl bg-gradient-to-b from-[#1c0c07] via-[#100703] to-[#080302] border-2 border-amber-500/80 shadow-[0_0_50px_rgba(245,158,11,0.3)] text-amber-100 flex flex-col gap-4 text-center font-cinzel",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx("div", { className: "text-xs tracking-widest text-red-400 font-bold", children: "⚔️ NAVAL ENGAGEMENT DECREE" }),
                      e.jsx("h2", { className: "text-xl font-bold text-amber-300 mt-1", children: selectedEnemy.name || "Hostile Vessel" }),
                      e.jsx("p", { className: "text-[11px] text-amber-200/80 italic mt-0.5", children: selectedEnemy.description || "Enemy galley maneuvering for battle." })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "grid grid-cols-2 gap-3 py-3 border-y border-amber-900/60",
                    children: [
                      e.jsxs("div", {
                        className: "p-3 rounded-2xl bg-black/50 border border-amber-600/40",
                        children: [
                          e.jsx("div", { className: "text-[10px] text-amber-400", children: "IMPERIAL FLEET" }),
                          e.jsxs("div", { className: "text-lg font-mono font-bold text-emerald-400", children: [(player?.fleetHp || 100), " HP"] })
                        ]
                      }),
                      e.jsxs("div", {
                        className: "p-3 rounded-2xl bg-black/50 border border-red-700/40",
                        children: [
                          e.jsx("div", { className: "text-[10px] text-red-400", children: "ENEMY FLEET" }),
                          e.jsxs("div", { className: "text-lg font-mono font-bold text-rose-400", children: [(selectedEnemy.hp || 90), " HP"] })
                        ]
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex gap-2 justify-center",
                    children: [
                      e.jsx("button", {
                        type: "button",
                        className: "flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-red-700 via-amber-600 to-red-700 hover:brightness-110 text-stone-950 font-black tracking-widest text-xs uppercase shadow-lg border border-amber-300 cursor-pointer active:scale-95 transition-all",
                        onClick: () => {
                          const reward = Math.round(selectedEnemy.rewardSolidi || 180);
                          const fama = Math.round(selectedEnemy.rewardFama || 45);
                          setPlayer(p => ({
                            ...p,
                            solidi: (p.solidi || 0) + reward,
                            fama: (p.fama || 0) + fama
                          }));
                          if (setFleets) {
                            setFleets(prev => prev.map(f => f.id === selectedEnemy.id ? { ...f, defeated: true } : f));
                          }
                          setToastMsg("Victory! Hostile vessel neutralized! Looted " + reward + " Solidi & " + fama + " Fama.");
                          setSelectedEnemy(null);
                          try { if (typeof v !== 'undefined' && v.playCoin) v.playCoin(); } catch(e){}
                        },
                        children: "⚔️ ENGAGE & RAM"
                      }),
                      e.jsx("button", {
                        type: "button",
                        className: "py-3 px-5 rounded-2xl bg-black/60 hover:bg-stone-800 text-stone-300 font-bold text-xs uppercase border border-amber-900/50 cursor-pointer active:scale-95 transition-all",
                        onClick: () => setSelectedEnemy(null),
                        children: "TACTICAL RETREAT"
                      })
                    ]
                  })
                ]
              })
            ]
          }),

          // 7. SCREENS: ARMA / CODEX / TREASURY
          activeScreen !== "MAP" && e.jsxs("div", {
            className: "fixed inset-0 z-50 flex flex-col bg-[#06080e]/95 backdrop-blur-xl p-4 sm:p-6 text-amber-100 font-cinzel",
            children: [
              e.jsxs("div", {
                className: "flex items-center justify-between pb-4 border-b border-amber-600/40 mb-4",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx("h2", { className: "text-xl sm:text-2xl font-bold text-amber-400 tracking-wider", children: activeScreen === "ARMA" ? "ARMA ET RELIQVIAE" : activeScreen === "CODEX" ? "CODEX IMPERIALIS" : "AERARIUM IMPERII" }),
                      e.jsx("p", { className: "text-xs text-amber-200/70 italic", children: activeScreen === "ARMA" ? "Imperial Equipment, Relics & Tactical Formations" : activeScreen === "CODEX" ? "Provinces, Strategic Ports, Bestiary & Navalia" : "Provincial Assessments, Treasury & Trade Tariffs" })
                    ]
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: () => setActiveScreen("MAP"),
                    className: "py-2 px-4 rounded-xl bg-red-950/80 hover:bg-red-900 text-amber-200 border border-red-700/60 text-xs font-bold uppercase transition-all cursor-pointer",
                    children: "RETURN TO MAP"
                  })
                ]
              }),
              e.jsx("div", {
                className: "flex-1 overflow-y-auto custom-scrollbar p-2",
                children: activeScreen === "ARMA"
                  ? e.jsxs("div", {
                      className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                      children: [
                        e.jsxs("div", {
                          className: "p-4 rounded-2xl bg-black/50 border border-amber-600/30 flex flex-col gap-3",
                          children: [
                            e.jsx("h3", { className: "text-sm font-bold text-amber-300", children: "🏛️ EQUIPPED RELICS & ARTIFACTS" }),
                            e.jsx("div", {
                              className: "grid grid-cols-3 gap-2",
                              children: ["WEAPON", "OFF_HAND", "ARMOR", "SIGNET", "DOCTRINE", "AUXILIARY"].map(slot => e.jsxs("div", {
                                key: slot,
                                className: "p-2 rounded-xl bg-black/60 border border-amber-800/40 text-center flex flex-col items-center gap-1",
                                children: [
                                  e.jsx("div", { className: "text-[9px] text-amber-400/80 font-bold", children: slot }),
                                  e.jsx("div", { className: "w-8 h-8 rounded-full bg-amber-500/10 border border-amber-600/40 flex items-center justify-center text-xs", children: "✨" })
                                ]
                              }))
                            })
                          ]
                        }),
                        e.jsxs("div", {
                          className: "p-4 rounded-2xl bg-black/50 border border-amber-600/30 flex flex-col gap-3",
                          children: [
                            e.jsx("h3", { className: "text-sm font-bold text-amber-300", children: "📦 CARGO INVENTORY (" + (player?.inventory || []).length + ")" }),
                            (player?.inventory || []).length === 0
                              ? e.jsx("div", { className: "text-xs text-amber-200/60 italic py-6 text-center", children: "No relics claimed yet. Explore Mediterranean sea sectors and sacred ruins to collect artifacts." })
                              : e.jsx("div", {
                                  className: "space-y-2",
                                  children: (player?.inventory || []).map((item, idx) => e.jsxs("div", {
                                    key: "inv_" + idx,
                                    className: "p-2 rounded-xl bg-black/60 border border-amber-800/40 flex items-center justify-between",
                                    children: [
                                      e.jsxs("div", {
                                        children: [
                                          e.jsx("div", { className: "text-xs font-bold text-amber-200", children: item.name }),
                                          e.jsx("div", { className: "text-[9px] text-amber-400/70 italic", children: item.latinName || item.slot })
                                        ]
                                      }),
                                      e.jsx("div", { className: "text-xs text-amber-400 font-mono font-bold", children: item.rarity })
                                    ]
                                  }))
                                })
                          ]
                        })
                      ]
                    })
                  : activeScreen === "CODEX"
                  ? e.jsxs("div", {
                      className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                      children: [
                        e.jsxs("div", {
                          className: "p-4 rounded-2xl bg-black/50 border border-amber-600/30",
                          children: [
                            e.jsx("h3", { className: "text-sm font-bold text-amber-300 mb-2", children: "⚓ STRATEGIC PORTS (52)" }),
                            e.jsx("div", {
                              className: "max-h-[50vh] overflow-y-auto space-y-1.5 custom-scrollbar",
                              children: (typeof Bt !== 'undefined' && Array.isArray(Bt) ? Bt : []).map(p => {
                                const isCap = (player?.capturedPorts || []).includes(p.id);
                                return e.jsxs("div", {
                                  key: "codex_port_" + p.id,
                                  className: "p-2 rounded-lg text-xs flex items-center justify-between border " + (isCap ? "bg-amber-950/40 border-amber-500/50 text-amber-200" : "bg-black/40 border-stone-800 text-stone-300"),
                                  children: [
                                    e.jsx("span", { children: p.name }),
                                    e.jsx("span", { className: "text-[9px] font-mono", children: isCap ? "CAPTURED" : "NEUTRAL" })
                                  ]
                                });
                              })
                            })
                          ]
                        }),
                        e.jsxs("div", {
                          className: "p-4 rounded-2xl bg-black/50 border border-amber-600/30",
                          children: [
                            e.jsx("h3", { className: "text-sm font-bold text-amber-300 mb-2", children: "🏛️ PROVINCIAL REGIONS (4)" }),
                            e.jsx("div", {
                              className: "space-y-2",
                              children: (typeof Pn !== 'undefined' && Array.isArray(Pn) ? Pn : []).map(r => e.jsxs("div", {
                                key: "codex_reg_" + r.id,
                                className: "p-2.5 rounded-xl bg-black/40 border border-amber-900/40",
                                children: [
                                  e.jsx("div", { className: "font-bold text-amber-200 text-xs", children: r.name }),
                                  e.jsx("div", { className: "text-[10px] font-serif-body italic text-amber-400/80", children: r.latinName }),
                                  e.jsx("div", { className: "text-[9px] text-stone-400 mt-1", children: r.subtitle })
                                ]
                              }))
                            })
                          ]
                        }),
                        e.jsxs("div", {
                          className: "p-4 rounded-2xl bg-black/50 border border-amber-600/30",
                          children: [
                            e.jsx("h3", { className: "text-sm font-bold text-amber-300 mb-2", children: "⚔️ BESTIARIUM & HOSTILES (68)" }),
                            e.jsx("div", {
                              className: "max-h-[50vh] overflow-y-auto space-y-1.5 custom-scrollbar",
                              children: (typeof Ts !== 'undefined' && Array.isArray(Ts) ? Ts : []).slice(0, 20).map(t => e.jsxs("div", {
                                key: "codex_en_" + t.id,
                                className: "p-2 rounded-lg bg-black/40 border border-stone-800 text-xs flex items-center justify-between",
                                children: [
                                  e.jsx("span", { children: t.name }),
                                  e.jsx("span", { className: "text-[9px] font-mono text-red-400", children: "LVL " + (t.level || 1) })
                                ]
                              }))
                            })
                          ]
                        })
                      ]
                    })
                  : e.jsxs("div", {
                      className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                      children: [
                        e.jsxs("div", {
                          className: "p-4 rounded-2xl bg-black/50 border border-amber-600/30 flex flex-col gap-3",
                          children: [
                            e.jsx("h3", { className: "text-sm font-bold text-amber-300", children: "🏛️ IMPERIAL TREASURY BALANCE" }),
                            e.jsxs("div", { className: "text-2xl font-mono font-black text-amber-400", children: [(player?.solidi ?? 2450).toLocaleString(), " Solidi"] }),
                            e.jsx("p", { className: "text-xs text-amber-200/80", children: "Gold standard minted under Constantine. Funds legionary stipends, quinquereme repairs, and provincial public works." })
                          ]
                        }),
                        e.jsxs("div", {
                          className: "p-4 rounded-2xl bg-black/50 border border-amber-600/30 flex flex-col gap-3",
                          children: [
                            e.jsx("h3", { className: "text-sm font-bold text-amber-300", children: "🪙 TRIBUTUM ASSESSMENT" }),
                            e.jsx("p", { className: "text-xs text-amber-200/80", children: "Captured Ports (" + (player?.capturedPorts || []).length + "): Yields " + ((player?.capturedPorts || []).length * 40) + " Solidi per End Turn." }),
                            e.jsx("button", {
                              type: "button",
                              onClick: handleEndTurn,
                              className: "mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-black font-black uppercase text-xs tracking-wider shadow cursor-pointer",
                              children: "COLLECT ALL PROVINCIAL TRIBUTES"
                            })
                          ]
                        })
                      ]
                    })
              })
            ]
          })
        ]
      });
    };
`;

// Remove any existing pp definition if present
const ppMarker = '    const pp =';
if (code.includes(ppMarker)) {
  const mIdx = code.indexOf(ppMarker);
  const mEnd = code.indexOf('    const MainApp = () => {', mIdx);
  if (mEnd !== -1) {
    code = code.substring(0, mIdx) + code.substring(mEnd);
  }
}

// Inject pp right before MainApp
const target = '    const MainApp = () => {';
code = code.replace(target, ppComponentCode + '\n' + target);

// Validate with esbuild
try {
  esbuild.buildSync({
    stdin: {
      contents: code,
      loader: 'jsx',
      resolveDir: __dirname
    },
    outfile: '/tmp/test_pp_bundle.js',
    bundle: false,
    format: 'esm'
  });
  console.log("ESBUILD VALIDATION PASSED! Bundle with pp component is 100% valid JavaScript.");
  fs.writeFileSync(bundlePath, code, 'utf8');
  console.log("SUCCESS: Written updated index-V37.js with complete pp implementation.");
} catch(err) {
  console.error("ESBUILD ERROR:", err.message);
  process.exit(1);
}
