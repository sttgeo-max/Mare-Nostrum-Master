import { MapNode, Sector } from '../types/game';

export const SECTORS: Sector[] = [
  {
    id: 1,
    name: "Western Basin",
    latinName: "MARE OCCIDENTALIS",
    bounds: { minX: 0, maxX: 920 },
    ports: ["massilia", "gades", "tingis"],
    center: 460
  },
  {
    id: 2,
    name: "Central Seas",
    latinName: "MARE INTERNUM",
    bounds: { minX: 920, maxX: 1450 },
    ports: ["roma", "carthago", "aquileia", "syracusae"],
    center: 1185
  },
  {
    id: 3,
    name: "Aegean Basin",
    latinName: "MARE AEGEUM",
    bounds: { minX: 1450, maxX: 1850 },
    ports: ["athenae", "gortyna", "constantinopolis"],
    center: 1650
  },
  {
    id: 4,
    name: "Levantine Corridor",
    latinName: "MARE ORIENTALE",
    bounds: { minX: 1850, maxX: 2400 },
    ports: ["alexandria", "antiochia"],
    center: 2125
  }
];

export const MAP_NODES: MapNode[] = [
  {
    id: "roma",
    name: "Rome",
    latinName: "Roma",
    position: { x: 1080, y: 350 },
    terrain: "coastal_port",
    connections: ["massilia", "carthago", "syracusae"]
  },
  {
    id: "massilia",
    name: "Marseille",
    latinName: "Massilia",
    position: { x: 860, y: 168 },
    terrain: "coastal_port",
    connections: ["roma", "gades"]
  },
  {
    id: "carthago",
    name: "Carthage",
    latinName: "Carthago",
    position: { x: 1040, y: 640 },
    terrain: "coastal_port",
    connections: ["roma", "syracusae", "tingis"]
  },
  {
    id: "alexandria",
    name: "Alexandria",
    latinName: "Alexandria",
    position: { x: 2010, y: 780 },
    terrain: "coastal_port",
    connections: ["antiochia", "constantinopolis"]
  }
  // ... more nodes can be added here
];
