// Masterwork Icon System - Part 1 (Artifacts 1 - 25)
module.exports = {
  // 1. Holy Lance of Longinus
  art_lance_longinus: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_lng_st", x1: "20%", y1: "15%", x2: "80%", y2: "85%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "35%", stopColor: "#cbd5e1" }),
        e.jsx("stop", { offset: "70%", stopColor: "#475569" }),
        e.jsx("stop", { offset: "100%", stopColor: "#0f172a" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_lng_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "45%", stopColor: "#d97706" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_lng_wd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#9a6a42" }),
        e.jsx("stop", { offset: "100%", stopColor: "#3a2010" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_lng_sv", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#f8fafc" }),
        e.jsx("stop", { offset: "50%", stopColor: "#94a3b8" }),
        e.jsx("stop", { offset: "100%", stopColor: "#334155" })
      ]})
    ]}),
    e.jsx("line", { x1: "22", y1: "82", x2: "52", y2: "52", stroke: "rgba(0,0,0,0.6)", strokeWidth: "6", strokeLinecap: "round" }),
    e.jsx("line", { x1: "20", y1: "80", x2: "50", y2: "50", stroke: "url(#mw_lng_wd)", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("polygon", { points: "46,54 54,46 62,54 54,62", fill: "url(#mw_lng_bz)", stroke: "#78350f", strokeWidth: "0.8" }),
    e.jsx("path", { d: "M 48,52 L 86,14 C 88,12 88,12 86,14 L 72,40 C 70,44 64,48 58,50 Z", fill: "url(#mw_lng_st)", stroke: "#0f172a", strokeWidth: "0.8" }),
    e.jsx("path", { d: "M 52,48 L 86,14 C 88,12 88,12 86,14 L 40,72 C 44,70 48,64 50,58 Z", fill: "url(#mw_lng_st)", stroke: "#0f172a", strokeWidth: "0.8" }),
    e.jsx("line", { x1: "50", y1: "50", x2: "86", y2: "14", stroke: "#ffffff", strokeWidth: "1.2" }),
    e.jsx("rect", { x: "58", y: "32", width: "8", height: "12", rx: "1", transform: "rotate(-45 62 38)", fill: "url(#mw_lng_sv)", stroke: "#1e293b", strokeWidth: "0.8" }),
    e.jsx("line", { x1: "56", y1: "44", x2: "68", y2: "32", stroke: "#fef08a", strokeWidth: "1.5" })
  ]}),

  // 2. Fragment of the True Cross
  art_true_cross: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_tc_wd", x1: "15%", y1: "15%", x2: "85%", y2: "85%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#a77b53" }),
        e.jsx("stop", { offset: "50%", stopColor: "#6c4827" }),
        e.jsx("stop", { offset: "100%", stopColor: "#381f0d" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_tc_gd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "40%", stopColor: "#eab308" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("rect", { x: "16", y: "16", width: "68", height: "68", rx: "6", fill: "url(#mw_tc_gd)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("rect", { x: "20", y: "20", width: "60", height: "60", rx: "4", fill: "#1c0a00", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("path", { d: "M 44,24 L 56,24 L 56,76 L 44,76 Z", fill: "url(#mw_tc_wd)", stroke: "#271407", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 26,38 L 74,38 L 74,50 L 26,50 Z", fill: "url(#mw_tc_wd)", stroke: "#271407", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "47", y1: "25", x2: "47", y2: "75", stroke: "#ffffff", strokeWidth: "0.8", opacity: "0.4" }),
    e.jsx("line", { x1: "27", y1: "41", x2: "73", y2: "41", stroke: "#ffffff", strokeWidth: "0.8", opacity: "0.4" }),
    e.jsx("circle", { cx: "50", cy: "44", r: "3", fill: "#991b1b", stroke: "url(#mw_tc_gd)", strokeWidth: "0.8" }),
    e.jsx("circle", { cx: "30", cy: "44", r: "2.5", fill: "#991b1b" }),
    e.jsx("circle", { cx: "70", cy: "44", r: "2.5", fill: "#991b1b" }),
    e.jsx("circle", { cx: "50", cy: "28", r: "2.5", fill: "#991b1b" }),
    e.jsx("circle", { cx: "50", cy: "68", r: "2.5", fill: "#991b1b" })
  ]}),

  // 3. Holy Crown of Thorns
  art_crown_thorns: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ct_wd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#854d0e" }),
        e.jsx("stop", { offset: "50%", stopColor: "#543007" }),
        e.jsx("stop", { offset: "100%", stopColor: "#271407" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_ct_iv", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef3c7" }),
        e.jsx("stop", { offset: "100%", stopColor: "#d97706" })
      ]})
    ]}),
    e.jsx("ellipse", { cx: "50", cy: "52", rx: "33", ry: "25", fill: "none", stroke: "rgba(0,0,0,0.5)", strokeWidth: "9" }),
    e.jsx("ellipse", { cx: "50", cy: "50", rx: "32", ry: "24", fill: "none", stroke: "url(#mw_ct_wd)", strokeWidth: "6" }),
    e.jsx("ellipse", { cx: "50", cy: "50", rx: "30", ry: "22", fill: "none", stroke: "#3d1e08", strokeWidth: "3", strokeDasharray: "12 6" }),
    e.jsx("path", { d: "M 22,42 L 14,36 M 28,32 L 20,24 M 40,27 L 38,16 M 58,27 L 60,16 M 72,32 L 80,24 M 78,42 L 86,36 M 75,58 L 85,64 M 62,68 L 68,78 M 40,68 L 34,78 M 24,58 L 15,64", stroke: "url(#mw_ct_iv)", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("ellipse", { cx: "50", cy: "50", rx: "32", ry: "24", fill: "none", stroke: "#fef08a", strokeWidth: "1", opacity: "0.4" })
  ]}),

  // 4. Holy Shroud of Edessa
  art_shroud_turin: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_sh_ln", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef3c7" }),
        e.jsx("stop", { offset: "50%", stopColor: "#debe8d" }),
        e.jsx("stop", { offset: "100%", stopColor: "#926532" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_sh_fnt", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#78350f", stopOpacity: "0.1" }),
        e.jsx("stop", { offset: "50%", stopColor: "#78350f", stopOpacity: "0.4" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f", stopOpacity: "0.1" })
      ]})
    ]}),
    e.jsx("rect", { x: "22", y: "16", width: "56", height: "68", rx: "3", fill: "url(#mw_sh_ln)", stroke: "#543310", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 22,28 Q 50,32 78,28 M 22,44 Q 50,48 78,44 M 22,60 Q 50,64 78,60", fill: "none", stroke: "#78350f", strokeWidth: "0.8", opacity: "0.3" }),
    e.jsx("ellipse", { cx: "50", cy: "42", rx: "11", ry: "15", fill: "url(#mw_sh_fnt)" }),
    e.jsx("ellipse", { cx: "50", cy: "64", rx: "14", ry: "12", fill: "url(#mw_sh_fnt)" }),
    e.jsx("path", { d: "M 46,40 L 50,46 L 54,40 M 44,48 Q 50,52 56,48", fill: "none", stroke: "#451a03", strokeWidth: "0.9", opacity: "0.5" })
  ]}),

  // 5. The Seal of Solomon
  art_seal_solomon: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ss_gd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]}),
      e.jsxs("radialGradient", { id: "mw_ss_lp", cx: "45%", cy: "40%", r: "60%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#60a5fa" }),
        e.jsx("stop", { offset: "50%", stopColor: "#1d4ed8" }),
        e.jsx("stop", { offset: "100%", stopColor: "#0f172a" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "52", r: "34", fill: "rgba(0,0,0,0.5)" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "34", fill: "url(#mw_ss_gd)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "27", fill: "url(#mw_ss_lp)", stroke: "#fef08a", strokeWidth: "1" }),
    e.jsx("polygon", { points: "50,28 66,58 34,58", fill: "none", stroke: "#fef08a", strokeWidth: "2" }),
    e.jsx("polygon", { points: "50,72 66,42 34,42", fill: "none", stroke: "#fef08a", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "4", fill: "#fef08a", stroke: "#78350f", strokeWidth: "0.8" })
  ]}),

  // 6. Paludamentum of Aurelian
  art_paludamentum_aurelian: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_pa_pr", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#a855f7" }),
        e.jsx("stop", { offset: "40%", stopColor: "#7e22ce" }),
        e.jsx("stop", { offset: "100%", stopColor: "#3b0764" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_pa_gd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#eab308" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("path", { d: "M 28,26 Q 50,16 72,26 L 82,78 Q 50,90 18,78 Z", fill: "url(#mw_pa_pr)", stroke: "#2e1065", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 28,26 Q 40,50 34,79 M 50,20 Q 52,52 50,85 M 72,26 Q 60,50 66,79", fill: "none", stroke: "#facc15", strokeWidth: "1.2", opacity: "0.6" }),
    e.jsx("circle", { cx: "32", cy: "28", r: "8", fill: "url(#mw_pa_gd)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "32", cy: "28", r: "3", fill: "#991b1b" })
  ]}),

  // 7. Imperial Diadem of Constantine
  art_diadem_constantine: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_dc_gd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#eab308" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("path", { d: "M 16,56 Q 50,30 84,56", fill: "none", stroke: "rgba(0,0,0,0.5)", strokeWidth: "8" }),
    e.jsx("path", { d: "M 16,54 Q 50,28 84,54", fill: "none", stroke: "url(#mw_dc_gd)", strokeWidth: "5" }),
    e.jsx("circle", { cx: "50", cy: "36", r: "6", fill: "#2563eb", stroke: "url(#mw_dc_gd)", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "34", cy: "42", r: "4.5", fill: "#f8fafc", stroke: "url(#mw_dc_gd)", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "66", cy: "42", r: "4.5", fill: "#f8fafc", stroke: "url(#mw_dc_gd)", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "22", cy: "50", r: "3.5", fill: "#2563eb", stroke: "url(#mw_dc_gd)", strokeWidth: "1" }),
    e.jsx("circle", { cx: "78", cy: "50", r: "3.5", fill: "#2563eb", stroke: "url(#mw_dc_gd)", strokeWidth: "1" }),
    e.jsx("line", { x1: "18", y1: "54", x2: "16", y2: "72", stroke: "url(#mw_dc_gd)", strokeWidth: "1.5" }),
    e.jsx("line", { x1: "82", y1: "54", x2: "84", y2: "72", stroke: "url(#mw_dc_gd)", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "16", cy: "74", r: "2.5", fill: "#f8fafc" }),
    e.jsx("circle", { cx: "84", cy: "74", r: "2.5", fill: "#f8fafc" })
  ]}),

  // 8. Signet of Sol Invictus
  art_signet_sol: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ss_gd2", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "40%", stopColor: "#f59e0b" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "52", r: "32", fill: "rgba(0,0,0,0.5)" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "32", fill: "url(#mw_ss_gd2)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "24", fill: "#b45309", stroke: "#fef08a", strokeWidth: "1" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "10", fill: "url(#mw_ss_gd2)" }),
    e.jsx("path", { d: "M 50,22 L 50,30 M 50,70 L 50,78 M 22,50 L 30,50 M 70,50 L 78,50 M 30,30 L 36,36 M 64,64 L 70,70 M 30,70 L 36,64 M 64,36 L 70,30", stroke: "#fef08a", strokeWidth: "2.5", strokeLinecap: "round" })
  ]}),

  // 9. Trident of Neptune
  art_trident_neptune: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_tn_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#67e8f9" }),
        e.jsx("stop", { offset: "35%", stopColor: "#0d9488" }),
        e.jsx("stop", { offset: "100%", stopColor: "#115e59" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_tn_wd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#854d0e" }),
        e.jsx("stop", { offset: "100%", stopColor: "#3b1a03" })
      ]})
    ]}),
    e.jsx("line", { x1: "22", y1: "82", x2: "52", y2: "52", stroke: "rgba(0,0,0,0.6)", strokeWidth: "6", strokeLinecap: "round" }),
    e.jsx("line", { x1: "20", y1: "80", x2: "50", y2: "50", stroke: "url(#mw_tn_wd)", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 42,58 L 58,42 C 64,36 72,32 80,24 L 84,16 M 48,52 C 54,40 60,30 72,20 L 80,12 M 52,48 C 60,42 68,34 76,26 L 84,18", fill: "none", stroke: "url(#mw_tn_bz)", strokeWidth: "3", strokeLinecap: "round" }),
    e.jsx("polygon", { points: "80,12 86,18 78,20", fill: "url(#mw_tn_bz)" }),
    e.jsx("polygon", { points: "84,16 88,22 82,24", fill: "url(#mw_tn_bz)" }),
    e.jsx("polygon", { points: "76,26 82,32 74,34", fill: "url(#mw_tn_bz)" })
  ]}),

  // 10. Aegis of Minerva
  art_aegis_jupiter: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_aj_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]})
    ]}),
    e.jsx("path", { d: "M 50,14 C 74,14 84,32 80,62 C 76,80 50,90 50,90 C 50,90 24,80 20,62 C 16,32 26,14 50,14 Z", fill: "rgba(0,0,0,0.5)" }),
    e.jsx("path", { d: "M 50,12 C 74,12 84,30 80,60 C 76,78 50,88 50,88 C 50,88 24,78 20,60 C 16,30 26,12 50,12 Z", fill: "url(#mw_aj_bz)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 50,18 C 70,18 78,34 74,58 C 70,72 50,80 50,80 C 50,80 30,72 26,58 C 22,34 30,18 50,18 Z", fill: "#271407", stroke: "#fef08a", strokeWidth: "1" }),
    e.jsx("circle", { cx: "50", cy: "48", r: "14", fill: "url(#mw_aj_bz)", stroke: "#78350f", strokeWidth: "1" }),
    e.jsx("circle", { cx: "45", cy: "45", r: "2", fill: "#1e293b" }),
    e.jsx("circle", { cx: "55", cy: "45", r: "2", fill: "#1e293b" }),
    e.jsx("path", { d: "M 44,54 Q 50,58 56,54", fill: "none", stroke: "#1e293b", strokeWidth: "1.2" })
  ]}),

  // 11. Light Prism of Ptolemy
  art_pharos_prism: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_pp_gl", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "40%", stopColor: "#bae6fd" }),
        e.jsx("stop", { offset: "80%", stopColor: "#38bdf8" }),
        e.jsx("stop", { offset: "100%", stopColor: "#0284c7" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_pp_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("polygon", { points: "50,16 82,76 18,76", fill: "url(#mw_pp_gl)", stroke: "#f0f9ff", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "50", y1: "16", x2: "50", y2: "76", stroke: "#ffffff", strokeWidth: "1.5", opacity: "0.8" }),
    e.jsx("polygon", { points: "50,16 50,76 18,76", fill: "#ffffff", opacity: "0.25" }),
    e.jsx("path", { d: "M 14,76 L 86,76 L 80,84 L 20,84 Z", fill: "url(#mw_pp_bz)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("line", { x1: "18", y1: "76", x2: "50", y2: "16", stroke: "url(#mw_pp_bz)", strokeWidth: "2" }),
    e.jsx("line", { x1: "82", y1: "76", x2: "50", y2: "16", stroke: "url(#mw_pp_bz)", strokeWidth: "2" })
  ]}),

  // 12. The Emerald Tablet of Hermes
  art_emerald_tablet: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_et_em", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#6ee7b7" }),
        e.jsx("stop", { offset: "40%", stopColor: "#059669" }),
        e.jsx("stop", { offset: "100%", stopColor: "#064e3b" })
      ]})
    ]}),
    e.jsx("rect", { x: "22", y: "16", width: "56", height: "68", rx: "4", fill: "rgba(0,0,0,0.5)" }),
    e.jsx("rect", { x: "20", y: "14", width: "56", height: "68", rx: "4", fill: "url(#mw_et_em)", stroke: "#a7f3d0", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 26,26 L 70,26 M 26,34 L 70,34 M 26,42 L 70,42 M 26,50 L 70,50 M 26,58 L 70,58 M 26,66 L 70,66 M 26,74 L 54,74", stroke: "#fef08a", strokeWidth: "1.2", strokeDasharray: "4 2", opacity: "0.85" })
  ]}),

  // 13. Siphon of Callinicus
  art_greek_fire_siphon: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_gfs_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#d97706" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_gfs_fl", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#f97316" }),
        e.jsx("stop", { offset: "100%", stopColor: "#dc2626" })
      ]})
    ]}),
    e.jsx("rect", { x: "16", y: "42", width: "52", height: "16", rx: "3", fill: "url(#mw_gfs_bz)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("circle", { cx: "72", cy: "50", r: "10", fill: "url(#mw_gfs_bz)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 78,44 Q 92,34 94,50 Q 88,58 78,56 Z", fill: "url(#mw_gfs_fl)" }),
    e.jsx("rect", { x: "22", y: "38", width: "6", height: "24", fill: "#1e293b" }),
    e.jsx("rect", { x: "42", y: "38", width: "6", height: "24", fill: "#1e293b" })
  ]}),

  // 14. Pyrophoros Projector of Proclus
  art_byzantine_pyrophoros: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("radialGradient", { id: "mw_bp_bz", cx: "40%", cy: "35%", r: "60%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#b45309" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "54", r: "28", fill: "rgba(0,0,0,0.5)" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "28", fill: "url(#mw_bp_bz)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("rect", { x: "44", y: "16", width: "12", height: "12", rx: "2", fill: "url(#mw_bp_bz)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("path", { d: "M 24,52 C 24,38 76,38 76,52 M 50,24 L 50,80", stroke: "#1e293b", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "52", r: "5", fill: "#dc2626", stroke: "#fef08a", strokeWidth: "0.8" })
  ]}),

  // 15. Feathered Lorica of Aurelian
  art_lorica_plumata: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_lp_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#d97706" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]})
    ]}),
    e.jsx("path", { d: "M 26,20 C 38,16 62,16 74,20 L 82,78 C 62,88 38,88 18,78 Z", fill: "url(#mw_lp_bz)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 42,20 Q 50,32 58,20", fill: "none", stroke: "#271407", strokeWidth: "2" }),
    e.jsx("path", { d: "M 22,34 C 34,38 66,38 78,34 M 24,46 C 34,50 66,50 76,46 M 26,58 C 34,62 66,62 74,58 M 28,70 C 34,74 66,74 72,70", fill: "none", stroke: "#78350f", strokeWidth: "2", strokeDasharray: "4 3" })
  ]}),

  // 16. Scutum of Horatius Cocles
  art_scutum_praetorian: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_sp_rd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ef4444" }),
        e.jsx("stop", { offset: "50%", stopColor: "#b91c1c" }),
        e.jsx("stop", { offset: "100%", stopColor: "#450a0a" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_sp_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("rect", { x: "22", y: "14", width: "56", height: "72", rx: "10", fill: "url(#mw_sp_rd)", stroke: "url(#mw_sp_bz)", strokeWidth: "2" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "12", fill: "url(#mw_sp_bz)", stroke: "#451a03", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 26,50 L 38,50 M 62,50 L 74,50 M 50,22 L 50,38 M 50,62 L 50,78", stroke: "url(#mw_sp_bz)", strokeWidth: "2.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 32,32 L 40,40 M 68,32 L 60,40 M 32,68 L 40,60 M 68,68 L 60,60", stroke: "url(#mw_sp_bz)", strokeWidth: "1.8", strokeLinecap: "round" })
  ]}),

  // 17. Gladius of Julius Caesar
  art_gladius_hispaniensis: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_gh_st", x1: "20%", y1: "20%", x2: "80%", y2: "80%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "40%", stopColor: "#cbd5e1" }),
        e.jsx("stop", { offset: "100%", stopColor: "#334155" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_gh_iv", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef3c7" }),
        e.jsx("stop", { offset: "100%", stopColor: "#d97706" })
      ]})
    ]}),
    e.jsx("path", { d: "M 46,44 L 84,12 L 88,16 L 56,48 Z", fill: "url(#mw_gh_st)", stroke: "#0f172a", strokeWidth: "1" }),
    e.jsx("line", { x1: "48", y1: "46", x2: "86", y2: "14", stroke: "#ffffff", strokeWidth: "1.2" }),
    e.jsx("rect", { x: "42", y: "46", width: "12", height: "6", rx: "1", transform: "rotate(-45 48 49)", fill: "url(#mw_gh_iv)", stroke: "#78350f", strokeWidth: "0.8" }),
    e.jsx("line", { x1: "26", y1: "68", x2: "42", y2: "52", stroke: "url(#mw_gh_iv)", strokeWidth: "4.5" }),
    e.jsx("circle", { cx: "22", cy: "72", r: "6", fill: "url(#mw_gh_iv)", stroke: "#78350f", strokeWidth: "1" })
  ]}),

  // 18. Golden Bulla of Young Augustus
  art_augustus_bulla: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_ab_gd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#eab308" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f" })
      ]})
    ]}),
    e.jsx("path", { d: "M 50,14 L 38,28 L 62,28 Z", fill: "url(#mw_ab_gd)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("path", { d: "M 24,32 Q 50,24 76,32 C 84,60 50,86 50,86 C 50,86 16,60 24,32 Z", fill: "url(#mw_ab_gd)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "10", fill: "none", stroke: "#78350f", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "4", fill: "#78350f" })
  ]}),

  // 19. Dory of King Leonidas
  art_spartan_dory: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_sd_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "40%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_sd_wd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#854d0e" }),
        e.jsx("stop", { offset: "100%", stopColor: "#3b1a03" })
      ]})
    ]}),
    e.jsx("line", { x1: "18", y1: "82", x2: "82", y2: "18", stroke: "url(#mw_sd_wd)", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 74,26 L 88,12 L 80,8 Z", fill: "url(#mw_sd_bz)", stroke: "#451a03", strokeWidth: "1" }),
    e.jsx("line", { x1: "74", y1: "26", x2: "84", y2: "16", stroke: "#ffffff", strokeWidth: "1.2" }),
    e.jsx("polygon", { points: "16,84 24,76 12,88", fill: "url(#mw_sd_bz)", stroke: "#451a03", strokeWidth: "1" })
  ]}),

  // 20. Bow of Philoctetes
  art_syrian_composite_bow: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_cb_wd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#a16207" }),
        e.jsx("stop", { offset: "50%", stopColor: "#713f12" }),
        e.jsx("stop", { offset: "100%", stopColor: "#3b1a03" })
      ]})
    ]}),
    e.jsx("path", { d: "M 18,18 C 38,10 44,38 50,50 C 56,62 62,90 82,82", fill: "none", stroke: "url(#mw_cb_wd)", strokeWidth: "5.5", strokeLinecap: "round" }),
    e.jsx("line", { x1: "18", y1: "18", x2: "82", y2: "82", stroke: "#f8fafc", strokeWidth: "1.2", opacity: "0.85" }),
    e.jsx("rect", { x: "46", y: "46", width: "8", height: "8", fill: "#1e293b", rx: "1" })
  ]}),

  // 21. Chariot Scythe of Boudicca
  art_boudicca_scythe: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_bs_st", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "40%", stopColor: "#cbd5e1" }),
        e.jsx("stop", { offset: "100%", stopColor: "#1e293b" })
      ]})
    ]}),
    e.jsx("circle", { cx: "26", cy: "50", r: "12", fill: "#451a03", stroke: "#78350f", strokeWidth: "2" }),
    e.jsx("path", { d: "M 32,44 C 50,42 70,24 86,14 C 70,36 54,58 32,56 Z", fill: "url(#mw_bs_st)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 32,44 C 50,42 70,24 86,14", fill: "none", stroke: "#ffffff", strokeWidth: "1.5" })
  ]}),

  // 22. Sica of Spartacus
  art_gladiator_sica: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_gs_st", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "50%", stopColor: "#94a3b8" }),
        e.jsx("stop", { offset: "100%", stopColor: "#1e293b" })
      ]})
    ]}),
    e.jsx("path", { d: "M 22,78 L 44,56 L 62,56 L 82,18 L 72,16 L 54,48 L 38,48 Z", fill: "url(#mw_gs_st)", stroke: "#0f172a", strokeWidth: "1.2" }),
    e.jsx("line", { x1: "22", y1: "78", x2: "82", y2: "18", stroke: "#ffffff", strokeWidth: "0.8", opacity: "0.5" }),
    e.jsx("rect", { x: "18", y: "74", width: "10", height: "8", transform: "rotate(-45 23 78)", fill: "#78350f" })
  ]}),

  // 23. Draco Standard of Decebalus
  art_dacian_draco_standard: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_dd_sv", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "50%", stopColor: "#cbd5e1" }),
        e.jsx("stop", { offset: "100%", stopColor: "#334155" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_dd_rd", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ef4444" }),
        e.jsx("stop", { offset: "50%", stopColor: "#dc2626" }),
        e.jsx("stop", { offset: "100%", stopColor: "#7f1d1d" })
      ]})
    ]}),
    e.jsx("line", { x1: "18", y1: "86", x2: "42", y2: "32", stroke: "#451a03", strokeWidth: "4.5", strokeLinecap: "round" }),
    e.jsx("path", { d: "M 36,36 C 30,22 46,14 56,22 C 58,16 66,16 68,24 C 58,28 50,38 36,36 Z", fill: "url(#mw_dd_sv)", stroke: "#1e293b", strokeWidth: "1.2" }),
    e.jsx("path", { d: "M 56,22 C 68,20 78,32 88,28 C 80,44 64,36 50,38 Z", fill: "url(#mw_dd_rd)", stroke: "#450a0a", strokeWidth: "1" }),
    e.jsx("circle", { cx: "44", cy: "22", r: "2.5", fill: "#1e293b" })
  ]}),

  // 24. Scale Barding of Shapur I
  art_cataphract_scale: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_cs_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#ca8a04" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]})
    ]}),
    e.jsx("rect", { x: "18", y: "18", width: "64", height: "64", rx: "6", fill: "#271407", stroke: "url(#mw_cs_bz)", strokeWidth: "1.5" }),
    e.jsx("path", { d: "M 26,26 C 32,26 34,34 26,38 C 18,34 20,26 26,26 Z M 42,26 C 48,26 50,34 42,38 C 34,34 36,26 42,26 Z M 58,26 C 64,26 66,34 58,38 C 50,34 52,26 58,26 Z M 74,26 C 80,26 82,34 74,38 C 66,34 68,26 74,26 Z", fill: "url(#mw_cs_bz)", stroke: "#451a03", strokeWidth: "0.8" }),
    e.jsx("path", { d: "M 34,42 C 40,42 42,50 34,54 C 26,50 28,42 34,42 Z M 50,42 C 56,42 58,50 50,54 C 42,50 44,42 50,42 Z M 66,42 C 72,42 74,50 66,54 C 58,50 60,42 66,42 Z", fill: "url(#mw_cs_bz)", stroke: "#451a03", strokeWidth: "0.8" }),
    e.jsx("path", { d: "M 26,58 C 32,58 34,66 26,70 C 18,66 20,58 26,58 Z M 42,58 C 48,58 50,66 42,70 C 34,66 36,58 42,58 Z M 58,58 C 64,58 66,66 58,70 C 50,66 52,58 58,58 Z M 74,58 C 80,58 82,66 74,70 C 66,66 68,58 74,58 Z", fill: "url(#mw_cs_bz)", stroke: "#451a03", strokeWidth: "0.8" })
  ]}),

  // 25. Ivory Shield of Pyrrhus
  art_elephant_tusk_shield: t => e.jsxs("svg", { viewBox: "0 0 100 100", fill: "none", overflow: "visible", ...t, children: [
    e.jsxs("defs", { children: [
      e.jsxs("linearGradient", { id: "mw_es_iv", x1: "15%", y1: "15%", x2: "85%", y2: "85%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff" }),
        e.jsx("stop", { offset: "35%", stopColor: "#fef3c7" }),
        e.jsx("stop", { offset: "75%", stopColor: "#fde68a" }),
        e.jsx("stop", { offset: "100%", stopColor: "#d97706" })
      ]}),
      e.jsxs("linearGradient", { id: "mw_es_bz", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#fef08a" }),
        e.jsx("stop", { offset: "50%", stopColor: "#b45309" }),
        e.jsx("stop", { offset: "100%", stopColor: "#451a03" })
      ]}),
      e.jsxs("radialGradient", { id: "mw_es_shd", cx: "35%", cy: "30%", r: "65%", children: [
        e.jsx("stop", { offset: "0%", stopColor: "#ffffff", stopOpacity: "0.5" }),
        e.jsx("stop", { offset: "60%", stopColor: "#fef3c7", stopOpacity: "0.1" }),
        e.jsx("stop", { offset: "100%", stopColor: "#78350f", stopOpacity: "0.6" })
      ]})
    ]}),
    e.jsx("circle", { cx: "50", cy: "52", r: "36", fill: "rgba(0,0,0,0.55)" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "36", fill: "url(#mw_es_iv)", stroke: "#78350f", strokeWidth: "1.8" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "36", fill: "url(#mw_es_shd)" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "28", fill: "none", stroke: "#ca8a04", strokeWidth: "1.2", strokeDasharray: "14 4" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "14", fill: "url(#mw_es_bz)", stroke: "#451a03", strokeWidth: "1.5" }),
    e.jsx("circle", { cx: "50", cy: "50", r: "6", fill: "#fef08a", stroke: "#78350f", strokeWidth: "0.8" }),
    e.jsx("path", { d: "M 18,36 C 26,22 42,16 50,16 M 82,36 C 74,22 58,16 50,16 M 18,64 C 26,78 42,84 50,84 M 82,64 C 74,78 58,84 50,84", stroke: "#ffffff", strokeWidth: "1.2", opacity: "0.6" })
  ]})
};
