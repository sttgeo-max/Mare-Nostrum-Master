/**
 * Mare Nostrum II - Map Region Definitions (Extracted from V37 Bundle)
 */

export interface RegionBounds {
  minX: number;
  maxX: number;
}

export interface RegionRecord {
  id: number;
  name: string;
  latinName: string;
  subtitle: string;
  bounds: RegionBounds;
  ports: string[];
  center: number;
  gemColor: string;
  gemGlow: string;
  [key: string]: any;
}

export const REGIONS: RegionRecord[] = [
  {
    "id": 1,
    "name": "Western Basin",
    "latinName": "MARE OCCIDENTALIS",
    "subtitle": "Hispania & Gallia Narbonensis",
    "bounds": {
      "minX": 0,
      "maxX": 920
    },
    "ports": [
      "massilia",
      "gades",
      "tingis"
    ],
    "center": 460,
    "gemColor": "text-[#d4af37] bg-emerald-500/20 border-[#b8860b]/40",
    "gemGlow": "rgba(16, 185, 129, 0.6)"
  },
  {
    "id": 2,
    "name": "Central Seas",
    "latinName": "MARE INTERNUM",
    "subtitle": "Italia, Sicilia & Carthago",
    "bounds": {
      "minX": 920,
      "maxX": 1450
    },
    "ports": [
      "roma",
      "carthago",
      "aquileia",
      "syracusae"
    ],
    "center": 1185,
    "gemColor": "text-indigo-400 bg-indigo-500/20 border-indigo-500/40",
    "gemGlow": "rgba(99, 102, 241, 0.6)"
  },
  {
    "id": 3,
    "name": "Aegean Basin",
    "latinName": "MARE AEGEUM",
    "subtitle": "Graecia, Creta & Byzantium",
    "bounds": {
      "minX": 1450,
      "maxX": 1850
    },
    "ports": [
      "athenae",
      "gortyna",
      "constantinopolis"
    ],
    "center": 1650,
    "gemColor": "text-[#d4af37] bg-cyan-500/20 border-[#b8860b]/40",
    "gemGlow": "rgba(6, 182, 212, 0.6)"
  },
  {
    "id": 4,
    "name": "Levantine Corridor",
    "latinName": "MARE ORIENTALE",
    "subtitle": "Aegyptus & Syria",
    "bounds": {
      "minX": 1850,
      "maxX": 2400
    },
    "ports": [
      "alexandria",
      "trapezus",
      "antiocheia"
    ],
    "center": 2125,
    "gemColor": "text-[#C9A351] bg-amber-500/20 border-amber-800",
    "gemGlow": "rgba(245, 158, 11, 0.6)"
  }
];
