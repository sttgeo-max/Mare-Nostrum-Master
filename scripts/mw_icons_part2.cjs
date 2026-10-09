// Masterwork Icon System - Part 2 (Artifacts 26 - 50)
module.exports = {
  // 26. Cursed Gold of Tolosa
  art_tolosa_gold: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_tg_gd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "40%", stopColor: "#eab308" }),
        e.jsx("stop", { offset: "80%", stopColor: "#9a3412" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]})
    ]}),
    e.jsx("polygon", { points: "18,68 42,54 82,68 58,82", fill: "url(#mw_tg_gd)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("polygon", { points: "18,68 18,74 58,88 58,82", fill: "#78350f" }),
    e.jsx("polygon", { points: "58,82 82,68 82,74 58,88", fill: "#451a03" }),
    e.jsx("polygon", { points: "24,46 48,32 88,46 64,60", fill: "url(#mw_tg_gd)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("polygon", { points: "24,46 24,52 64,66 64,60", fill: "#78350f" }),
    e.jsx("polygon", { points: "64,60 88,46 88,52 64,66", fill: "#451a03" }),
    e.jsx("polygon", { points: "14,32 38,18 78,32 54,46", fill: "url(#mw_tg_gd)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "46", cy: "32", r: "4", fill: "none", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("path", { d: "M 42,32 A 4 4 0 0 1 50 32", fill: "none", stroke: "#78350f", strokeWidth: "1" })
  ]}),

  // 27. Itinerary of Emperor Antoninus
  art_antonine_itinerary: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ai_pa", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef3c7" }),
        e.jsx("stop", { offset: "50%", stopColor: "#fde68a" }),
        e.jsx("stop", { offset: "100%", stopColor: "#d97706" })
      ]})
    ]}),
    e.jsx("rect", { x: "20", y: "16", width: "60", height: "68", rx: "3", fill: "url(#mw_ai_pa)", stroke: "#78350f", strokeWidth: "1.5" }),
    e.jsx("ellipse", { cx: "20", cy: "50", rx: "4", ry: "34", fill: "#b45309", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("ellipse", { cx: "80", cy: "50", rx: "4", ry: "34", fill: "#b45309", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("path", { d: "M 28,32 Q 40,24 50,42 T 72,36", fill: "none", stroke: "#dc2626", strokeWidth: "2", strokeDasharray: "4 2" }),
    e.jsx("path", { d: "M 28,60 Q 44,68 56,54 T 72,66", fill: "none", stroke: "#dc2626", strokeWidth: "2", strokeDasharray: "4 2" }),
    e.jsx("circle", { cx: "28", cy: "32", r: "2.5", fill: "#451a03" }),
    e.jsx("circle", { cx: "50", cy: "42", r: "2.5", fill: "#451a03" }),
    e.jsx("circle", { cx: "72", cy: "36", r: "2.5", fill: "#451a03" }),
    e.jsx("line", { x1: "30", y1: "24", x2: "70", y2: "24", stroke: "#78350f", strokeWidth: "1", strokeDasharray: "2 2" })
  ]}),

  // 28. Imperial Lorica of Trajan
  art_lorica_segmentata: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ls_st", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "40%", stopColor: "#94a3b8" }),
        e.jsx("stop", { offset: "100%", stopColor: "#1e293b" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_ls_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("path", { d: "M 26,20 Q 50,14 74,20 L 80,78 C 60,86 40,86 20,78 Z", fill: "url(#mw_ls_st)", stroke: "#0f172a", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 22,32 L 78,32 M 21,42 L 79,42 M 20,52 L 80,52 M 20,62 L 80,62 M 21,72 L 79,72", stroke: "#0f172a", strokeWidth: "1.8" }),
    e.jsx("line", { x1: "50", y1: "20", x2: "50", y2: "80", stroke: "#0f172a", strokeWidth: "2" }),
    e.jsx("circle", { cx: "44", cy: "37", r: "1.5", fill: "url(#mw_ls_bz)" }),
    e.jsx("circle", { cx: "56", cy: "37", r: "1.5", fill: "url(#mw_ls_bz)" }),
    e.jsx("circle", { cx: "44", cy: "47", r: "1.5", fill: "url(#mw_ls_bz)" }),
    e.jsx("circle", { cx: "56", cy: "47", r: "1.5", fill: "url(#mw_ls_bz)" }),
    e.jsx("path", { d: "M 30,20 Q 50,28 70,20", fill: "none", stroke: "#78350f", strokeWidth: "2.5" })
  ]}),

  // 29. Commentaries of Julius Caesar
  art_commentarii_caesar: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_cc_pa", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef3c7" }),
        e.jsx("stop", { offset: "50%", stopColor: "#fde68a" }),
        e.jsx("stop", { offset: "100%", stopColor: "#b45309" })
      ]})
    ]}),
    e.jsx("rect", { x: "22", y: "24", width: "56", height: "20", rx: "10", fill: "url(#mw_cc_pa)", stroke: "#78350f", strokeWidth: "1.2" }),
    e.jsx("rect", { x: "22", y: "52", width: "56", height: "20", rx: "10", fill: "url(#mw_cc_pa)", stroke: "#78350f", strokeWidth: "1.2" }),
    e.jsx("rect", { x: "46", y: "18", width: "8", height: "60", rx: "2", fill: "#dc2626", stroke: "#7f1d1d", strokeWidth: "1" }),
    e.jsx("circle", { cx: "50", cy: "48", r: "7", fill: "#991b1b", stroke: "#fef08a", strokeWidth: "1" }),
    e.jsx("circle", { cx: "50", cy: "48", r: "3", fill: "#fef08a" })
  ]}),

  // 30. Astrolabe of Hipparchus
  art_greek_astrolabe: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ga_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "40%", stopColor: "#eab308" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "54", r: "32", fill: "rgba(0,0,0,0.5)" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "32", fill: "url(#mw_ga_bz)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "26", fill: "#271407", stroke: "#fef08a", strokeWidth: "1" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "18", fill: "none", stroke: "url(#mw_ga_bz)", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 32,52 Q 50,34 68,52 Q 50,70 32,52 Z", fill: "none", stroke: "#fef08a", strokeWidth: "1" }),
    e.jsx("line", { x1: "26", y1: "28", x2: "74", y2: "76", stroke: "#fef08a", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "16", r: "4", fill: "none", stroke: "url(#mw_ga_bz)", strokeWidth: "1.5" })
  ]}),

  // 31. Naval Rostrum of Gaius Duilius
  art_rostrum_carthage: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_rc_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#5eead4" }),
        e.jsx("stop", { offset: "40%", stopColor: "#0d9488" }),
        e.jsx("stop", { offset: "100%", stopColor: "#115e59" })
      ]})
    ]}),
    e.jsx("path", { d: "M 18,34 L 54,34 L 84,50 L 54,66 L 18,66 Z", fill: "url(#mw_rc_bz)", stroke: "#042f2e", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 54,34 L 84,50 L 54,66 Z", fill: "#134e4a" }),
    e.jsx("line", { x1: "54", y1: "34", x2: "54", y2: "66", stroke: "#5eead4", strokeWidth: "1.5" }),
    e.jsx("line", { x1: "18", y1: "50", x2: "84", y2: "50", stroke: "#5eead4", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "34", cy: "44", r: "3", fill: "#042f2e" }),
    e.jsx("circle", { cx: "34", cy: "56", r: "3", fill: "#042f2e" })
  ]}),

  // 32. Boarding Corvus of Duilius
  art_corvus_bridge: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_cb_wd2", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#a16207" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_cb_st", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#cbd5e1" }),
        e.jsx("stop", { offset: "100%", stopColor: "#0f172a" })
      ]})
    ]}),
    e.jsx("polygon", { points: "18,74 72,20 84,32 30,86", fill: "url(#mw_cb_wd2)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "26", y1: "66", x2: "76", y2: "16", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("line", { x1: "36", y1: "76", x2: "86", y2: "26", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("polygon", { points: "76,16 88,12 84,28", fill: "url(#mw_cb_st)", stroke: "#0f172a", strokeWidth: "1" })
  ]}),

  // 33. Burning Mirror of Archimedes
  art_syracusan_mirror: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("radialGradient", { id: "mw_sm_bz", cx: "45%", cy: "40%", r: "60%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "30%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "70%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]})
    ]}),
    e.jsx("polygon", { points: "50,14 82,32 82,68 50,86 18,68 18,32", fill: "rgba(0,0,0,0.5)" }),
    e.jsx("polygon", { points: "50,12 82,30 82,66 50,84 18,66 18,30", fill: "url(#mw_sm_bz)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("polygon", { points: "50,22 72,35 72,61 50,74 28,61 28,35", fill: "none", stroke: "#ffffff", strokeWidth: "1", opacity: "0.8" }),
    e.jsx("line", { x1: "50", y1: "12", x2: "50", y2: "84", stroke: "#ffffff", strokeWidth: "0.8", opacity: "0.4" }),
    e.jsx("line", { x1: "18", y1: "30", x2: "82", y2: "66", stroke: "#ffffff", strokeWidth: "0.8", opacity: "0.4" }),
    e.jsx("line", { x1: "18", y1: "66", x2: "82", y2: "30", stroke: "#ffffff", strokeWidth: "0.8", opacity: "0.4" })
  ]}),

  // 34. Sibylline Books of Prophecy
  art_sibylline_leaves: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_sb_lt", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#451a03" }),
        e.jsx("stop", { offset: "100%", stopColor: "#0f172a" })
      ]})
    ]}),
    e.jsx("rect", { x: "20", y: "18", width: "56", height: "68", rx: "4", fill: "url(#mw_sb_lt)", stroke: "#fef08a", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 28,18 L 28,86 M 32,18 L 32,86", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("path", { d: "M 42,34 L 66,34 M 42,42 L 66,42 M 42,50 L 66,50 M 42,58 L 66,58", stroke: "#fef08a", strokeWidth: "1.2", strokeDasharray: "3 2" }),
    e.jsx("path", { d: "M 76,18 L 76,86 L 72,82 L 72,22 Z", fill: "#78350f" })
  ]}),

  // 35. Meditations of Marcus Aurelius
  art_philosopher_scroll: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ps_pa", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef3c7" }),
        e.jsx("stop", { offset: "100%", stopColor: "#d97706" })
      ]})
    ]}),
    e.jsx("rect", { x: "20", y: "20", width: "60", height: "60", rx: "2", fill: "url(#mw_ps_pa)", stroke: "#78350f", strokeWidth: "1.2" }),
    e.jsx("rect", { x: "16", y: "16", width: "8", height: "68", rx: "3", fill: "#451a03", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("rect", { x: "76", y: "16", width: "8", height: "68", rx: "3", fill: "#451a03", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("path", { d: "M 28,32 L 72,32 M 28,40 L 72,40 M 28,48 L 72,48 M 28,56 L 72,56 M 28,64 L 56,64", stroke: "#451a03", strokeWidth: "1", strokeDasharray: "2 2" })
  ]}),

  // 36. Lorica Hamata of Vercingetorix
  art_gallic_chainmail: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_gc_st", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "50%", stopColor: "#64748b" }),
        e.jsx("stop", { offset: "100%", stopColor: "#0f172a" })
      ]})
    ]}),
    e.jsx("path", { d: "M 24,20 C 38,14 62,14 76,20 L 84,78 C 62,86 38,86 16,78 Z", fill: "url(#mw_gc_st)", stroke: "#0f172a", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 24,20 Q 50,32 76,20 L 72,44 Q 50,52 28,44 Z", fill: "#334155", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "36", cy: "32", r: "2.5", fill: "#fef08a" }),
    e.jsx("circle", { cx: "64", cy: "32", r: "2.5", fill: "#fef08a" })
  ]}),

  // 37. Falcata of Hannibal Barca
  art_falcata_hispania: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_fh_st", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "40%", stopColor: "#cbd5e1" }),
        e.jsx("stop", { offset: "100%", stopColor: "#1e293b" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_fh_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("path", { d: "M 22,78 L 38,56 Q 50,42 72,26 L 82,18 L 78,32 Q 54,52 38,68 Z", fill: "url(#mw_fh_st)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 22,78 L 38,56 Q 50,42 72,26", fill: "none", stroke: "#ffffff", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 16,84 C 18,72 26,72 26,80 C 26,86 18,88 16,84 Z", fill: "url(#mw_fh_bz)", stroke: "#451a03", strokeWidth: "1" })
  ]}),

  // 38. Corinthian Helm of Miltiades
  art_corinthian_helm: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ch_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "40%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]})
    ]}),
    e.jsx("path", { d: "M 26,44 C 26,20 74,20 74,44 L 74,78 C 64,84 58,74 50,74 C 42,74 36,84 26,78 Z", fill: "url(#mw_ch_bz)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 34,44 Q 42,48 50,44 Q 58,48 66,44 L 66,54 C 58,54 54,64 50,64 C 46,64 42,54 34,54 Z", fill: "#1c0a00", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("path", { d: "M 18,18 C 38,10 62,10 82,18 C 72,26 28,26 18,18 Z", fill: "#dc2626", stroke: "#7f1d1d", strokeWidth: "1" })
  ]}),

  // 39. Sun Disk of Baal-Hammon
  art_carthaginian_baal_amulet: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ba_gd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#eab308" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "52", r: "32", fill: "rgba(0,0,0,0.5)" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "32", fill: "#271407", stroke: "url(#mw_ba_gd)", strokeWidth: "2" }),
    e.jsx("path", { d: "M 26,44 A 24 24 0 0 0 74 44 A 20 20 0 0 1 26 44 Z", fill: "url(#mw_ba_gd)" }),
    e.jsx("circle", { cx: "50", cy: "56", r: "10", fill: "url(#mw_ba_gd)", stroke: "#451a03", strokeWidth: "1" })
  ]}),

  // 40. Poison Signet of Hannibal
  art_ring_hannibal: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_rh_gd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "52", r: "30", fill: "rgba(0,0,0,0.5)" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "30", fill: "url(#mw_rh_gd)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "20", fill: "#0f172a", stroke: "#fef08a", strokeWidth: "1" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "8", fill: "#dc2626", opacity: "0.8" })
  ]}),

  // 41. Dioptra of Hero of Alexandria
  art_alexandrian_dioptra: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ad_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "44", r: "24", fill: "none", stroke: "url(#mw_ad_bz)", strokeWidth: "3" }),
    e.jsx("line", { x1: "20", y1: "44", x2: "80", y2: "44", stroke: "url(#mw_ad_bz)", strokeWidth: "2" }),
    e.jsx("line", { x1: "50", y1: "14", x2: "50", y2: "74", stroke: "url(#mw_ad_bz)", strokeWidth: "2" }),
    e.jsx("line", { x1: "50", y1: "68", x2: "26", y2: "88", stroke: "#451a03", strokeWidth: "3" }),
    e.jsx("line", { x1: "50", y1: "68", x2: "74", y2: "88", stroke: "#451a03", strokeWidth: "3" })
  ]}),

  // 42. Tyrian Trade Ledger
  art_merchants_ledger: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ml_wd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#854d0e" }),
        e.jsx("stop", { offset: "100%", stopColor: "#3b1a03" })
      ]})
    ]}),
    e.jsx("rect", { x: "16", y: "20", width: "32", height: "60", rx: "3", fill: "url(#mw_ml_wd)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("rect", { x: "52", y: "20", width: "32", height: "60", rx: "3", fill: "url(#mw_ml_wd)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("rect", { x: "20", y: "24", width: "24", height: "52", fill: "#3b0764" }),
    e.jsx("rect", { x: "56", y: "24", width: "24", height: "52", fill: "#3b0764" }),
    e.jsx("line", { x1: "78", y1: "16", x2: "22", y2: "84", stroke: "#fef08a", strokeWidth: "2.5", strokeLinecap: "round" })
  ]}),

  // 43. Muscled Cuirass of Mars Ultor
  art_iron_cuirass: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ic_st", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "40%", stopColor: "#64748b" }),
        e.jsx("stop", { offset: "100%", stopColor: "#0f172a" })
      ]})
    ]}),
    e.jsx("path", { d: "M 24,18 C 38,12 62,12 76,18 L 84,78 C 62,86 38,86 16,78 Z", fill: "url(#mw_ic_st)", stroke: "#0f172a", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 34,36 C 42,32 46,42 38,50 M 66,36 C 58,32 54,42 62,50", fill: "none", stroke: "#cbd5e1", strokeWidth: "2" }),
    e.jsx("path", { d: "M 38,58 Q 50,68 62,58", fill: "none", stroke: "#cbd5e1", strokeWidth: "2" })
  ]}),

  // 44. Scutum of Legio X Equestris
  art_veteran_scutum: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_vs_bl", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#3b82f6" }),
        e.jsx("stop", { offset: "50%", stopColor: "#1d4ed8" }),
        e.jsx("stop", { offset: "100%", stopColor: "#1e3a8a" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_vs_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("rect", { x: "22", y: "14", width: "56", height: "72", rx: "10", fill: "url(#mw_vs_bl)", stroke: "url(#mw_vs_bz)", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "12", fill: "url(#mw_vs_bz)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 32,32 Q 50,22 68,32 M 32,68 Q 50,78 68,68", fill: "none", stroke: "url(#mw_vs_bz)", strokeWidth: "2" }),
    e.jsx("path", { d: "M 36,44 L 24,56 L 38,60 L 46,52 Z", fill: "url(#mw_vs_bz)" })
  ]}),

  // 45. Javelins of King Masinissa
  art_numidian_javelins: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_nj_st", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "40%", stopColor: "#cbd5e1" }),
        e.jsx("stop", { offset: "100%", stopColor: "#0f172a" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_nj_wd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#78350f" }),
        e.jsx("stop", { offset: "100%", stopColor: "#271407" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_nj_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("line", { x1: "14", y1: "86", x2: "86", y2: "14", stroke: "url(#mw_nj_wd)", strokeWidth: "3.5", strokeLinecap: "round" }),
    e.jsx("line", { x1: "14", y1: "14", x2: "86", y2: "86", stroke: "url(#mw_nj_wd)", strokeWidth: "3.5", strokeLinecap: "round" }),
    e.jsx("polygon", { points: "86,14 96,6 90,20", fill: "url(#mw_nj_st)", stroke: "#0f172a", strokeWidth: "1" }),
    e.jsx("polygon", { points: "86,86 96,94 90,80", fill: "url(#mw_nj_st)", stroke: "#0f172a", strokeWidth: "1" }),
    e.jsx("rect", { x: "45", y: "45", width: "10", height: "10", fill: "url(#mw_nj_bz)", rx: "2" })
  ]}),

  // 46. Pugio of Marcus Brutus
  art_worn_pugio: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_wp_st", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "50%", stopColor: "#94a3b8" }),
        e.jsx("stop", { offset: "100%", stopColor: "#0f172a" })
      ]})
    ]}),
    e.jsx("path", { d: "M 44,18 L 56,18 L 58,54 L 50,84 L 42,54 Z", fill: "url(#mw_wp_st)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "50", y1: "18", x2: "50", y2: "84", stroke: "#ffffff", strokeWidth: "1" }),
    e.jsx("rect", { x: "36", y: "14", width: "28", height: "6", rx: "1", fill: "#78350f" })
  ]}),

  // 47. Parma of Arminius
  art_wooden_parma: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("radialGradient", { id: "mw_wp_wd", cx: "45%", cy: "40%", r: "60%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#a16207" }),
        e.jsx("stop", { offset: "70%", stopColor: "#713f12" }),
        e.jsx("stop", { offset: "100%", stopColor: "#271407" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "52", r: "34", fill: "rgba(0,0,0,0.5)" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "34", fill: "url(#mw_wp_wd)", stroke: "#451a03", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "26", fill: "none", stroke: "#451a03", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "12", fill: "#64748b", stroke: "#0f172a", strokeWidth: "1.2" })
  ]}),

  // 48. Subarmalis of Centurion Pullo
  art_tunic_centurion: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_tc_rd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ef4444" }),
        e.jsx("stop", { offset: "50%", stopColor: "#b91c1c" }),
        e.jsx("stop", { offset: "100%", stopColor: "#450a0a" })
      ]})
    ]}),
    e.jsx("path", { d: "M 24,20 Q 50,14 76,20 L 82,78 C 62,86 38,86 18,78 Z", fill: "url(#mw_tc_rd)", stroke: "#450a0a", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 20,60 L 80,60 M 22,68 L 78,68 M 24,76 L 76,76", stroke: "#78350f", strokeWidth: "2" })
  ]}),

  // 49. Signet of the Plebeian Tribune
  art_bronze_signet: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_bs_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "52", r: "30", fill: "rgba(0,0,0,0.5)" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "30", fill: "url(#mw_bs_bz)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 32,50 L 46,50 L 54,42 L 68,50 M 32,54 L 46,54 L 54,62 L 68,54", fill: "none", stroke: "#451a03", strokeWidth: "2.5" })
  ]}),

  // 50. Laterculum of Trajan
  art_legion_roster: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_lr_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("rect", { x: "20", y: "18", width: "60", height: "68", rx: "3", fill: "url(#mw_lr_bz)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "26", r: "3", fill: "#451a03" }),
    e.jsx("path", { d: "M 28,38 L 72,38 M 28,46 L 72,46 M 28,54 L 72,54 M 28,62 L 72,62 M 28,70 L 64,70", stroke: "#451a03", strokeWidth: "1.2", strokeDasharray: "4 2" })
  ]})
};
