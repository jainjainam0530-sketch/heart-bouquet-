/* Midnight Conservatory bouquet engine: a name now selects a full visual composition family, not just a text label. */

import { between, createRng, hashName, normalizeName, pick } from "./nameSeed";
import { FLOWER_META, type FlowerType } from "./flowerLibrary";

export type Palette = {
  name: string;
  petal: string;
  deep: string;
  highlight: string;
  secondary: string;
  leaf: string;
  leafLight: string;
  gold: string;
  atmosphere: string;
};

export type BouquetMode = "all" | "premium";

export type BouquetFlower = {
  id: string;
  type: FlowerType;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  bend: number;
  role: "hero" | "support" | "filler";
};

export type BouquetLeaf = {
  x: number;
  y: number;
  anchorX: number;
  anchorY: number;
  rotation: number;
  scale: number;
  side: "left" | "right";
};

export type BouquetModel = {
  name: string;
  seed: number;
  variationId: number;
  mode: BouquetMode;
  palette: Palette;
  styleName: string;
  flowers: BouquetFlower[];
  leaves: BouquetLeaf[];
  dominant: FlowerType;
  selectedTypes: FlowerType[];
  wind: number;
};

type BouquetStyle = {
  name: string;
  flowerSet: FlowerType[];
  positions: Array<[number, number]>;
  minCount: number;
  maxCount: number;
  spread: number;
  yJitter: number;
  scaleBias: number;
  leafMin: number;
  leafMax: number;
  leafTilt: number;
  leafYMin: number;
  leafYMax: number;
  paletteOffset: number;
  stemBend: number;
};

const PALETTES: Palette[] = [
  { name: "Garnet Velvet", petal: "#b43f68", deep: "#3a0e2b", highlight: "#ffe1e8", secondary: "#df7898", leaf: "#315b50", leafLight: "#84b7a1", gold: "#e4b86a", atmosphere: "#21091d" },
  { name: "Sapphire Blush", petal: "#6f78c9", deep: "#1d245a", highlight: "#e8e9ff", secondary: "#a4a9ef", leaf: "#285a59", leafLight: "#82c3b2", gold: "#f0c878", atmosphere: "#101a3c" },
  { name: "Amethyst Smoke", petal: "#9562c4", deep: "#291442", highlight: "#f3e7ff", secondary: "#c49be8", leaf: "#35615d", leafLight: "#8cc4ae", gold: "#e1bd78", atmosphere: "#1b102e" },
  { name: "Emerald Noir", petal: "#4f9b83", deep: "#123d3a", highlight: "#dcfff0", secondary: "#86cfad", leaf: "#244c43", leafLight: "#78b99b", gold: "#e5c77a", atmosphere: "#0b282c" },
  { name: "Champagne Orchid", petal: "#c98eae", deep: "#4d2344", highlight: "#fff5df", secondary: "#e8bed0", leaf: "#406456", leafLight: "#a4c7a4", gold: "#f0ca83", atmosphere: "#2b1526" },
  { name: "Cobalt Peony", petal: "#487ab7", deep: "#162d5c", highlight: "#e1f0ff", secondary: "#8fb9e5", leaf: "#27564e", leafLight: "#7ebaa7", gold: "#efc56e", atmosphere: "#101d3b" },
  { name: "Obsidian Rose", petal: "#8d3b70", deep: "#240d2d", highlight: "#ffd9ed", secondary: "#c776aa", leaf: "#2b5049", leafLight: "#79ae96", gold: "#d9b56d", atmosphere: "#170a20" },
  { name: "Antique Coral", petal: "#c66b78", deep: "#512233", highlight: "#ffe8dc", secondary: "#e6a398", leaf: "#3a604d", leafLight: "#9cc59b", gold: "#efc67e", atmosphere: "#32151f" },
  { name: "Rose Garden", petal: "#c95578", deep: "#4b1730", highlight: "#ffe0e4", secondary: "#e99ab1", leaf: "#315b50", leafLight: "#91b99c", gold: "#d6a46d", atmosphere: "#321321" },
  { name: "Lavender Dream", petal: "#9b73c8", deep: "#312054", highlight: "#f4e0ff", secondary: "#c7a6e7", leaf: "#45645d", leafLight: "#9fbbaa", gold: "#d8b879", atmosphere: "#241b37" },
];

const BOUQUET_STYLES: BouquetStyle[] = [
  {
    name: "Tall Rose Arch",
    flowerSet: ["rose", "rose", "tulip", "peony", "daisy"],
    positions: [[250, 108], [150, 182], [350, 168], [235, 244], [378, 250], [105, 304], [419, 313], [184, 348], [314, 357], [140, 416], [366, 426], [250, 430], [78, 247], [430, 238]],
    minCount: 11, maxCount: 14, spread: 20, yJitter: 13, scaleBias: .98, leafMin: 13, leafMax: 18, leafTilt: 0, leafYMin: 250, leafYMax: 510, paletteOffset: 0, stemBend: 1,
  },
  {
    name: "Sunlit Handful",
    flowerSet: ["sunflower", "hibiscus", "orchid", "daisy", "wildflower"],
    positions: [[250, 138], [168, 210], [333, 218], [112, 269], [390, 278], [206, 304], [301, 321], [99, 367], [402, 374], [160, 418], [345, 420], [252, 451], [60, 306], [440, 302]],
    minCount: 10, maxCount: 13, spread: 34, yJitter: 18, scaleBias: 1.06, leafMin: 12, leafMax: 16, leafTilt: 12, leafYMin: 285, leafYMax: 515, paletteOffset: 6, stemBend: 1.3,
  },
  {
    name: "Lavender Drift",
    flowerSet: ["lavender", "lavender", "ranunculus", "cherry", "daisy"],
    positions: [[250, 108], [212, 166], [301, 176], [157, 242], [355, 248], [230, 275], [325, 291], [113, 338], [398, 352], [178, 401], [342, 414], [250, 453], [78, 283], [430, 293]],
    minCount: 12, maxCount: 15, spread: 18, yJitter: 11, scaleBias: .86, leafMin: 15, leafMax: 20, leafTilt: -9, leafYMin: 230, leafYMax: 505, paletteOffset: 2, stemBend: .8,
  },
  {
    name: "Wide Meadow",
    flowerSet: ["cherry", "daisy", "carnation", "ranunculus", "tulip"],
    positions: [[250, 156], [122, 230], [380, 226], [188, 260], [318, 268], [80, 318], [433, 327], [142, 363], [360, 372], [197, 405], [306, 413], [250, 448], [55, 268], [448, 260]],
    minCount: 12, maxCount: 16, spread: 42, yJitter: 22, scaleBias: .91, leafMin: 16, leafMax: 20, leafTilt: 8, leafYMin: 275, leafYMax: 515, paletteOffset: 5, stemBend: 1.45,
  },
  {
    name: "Deep Wine Cluster",
    flowerSet: ["rose", "peony", "hibiscus", "carnation"],
    positions: [[250, 142], [188, 205], [315, 198], [134, 264], [369, 265], [214, 286], [291, 300], [104, 349], [401, 356], [171, 397], [344, 405], [250, 432], [76, 282], [430, 294]],
    minCount: 10, maxCount: 14, spread: 24, yJitter: 15, scaleBias: 1.09, leafMin: 11, leafMax: 15, leafTilt: -4, leafYMin: 260, leafYMax: 510, paletteOffset: 7, stemBend: 1.1,
  },
];

const PREMIUM_FAMILIES: FlowerType[][] = [
  ["peony", "orchid", "ranunculus", "gardenia", "magnolia", "anemone"],
  ["orchid", "ranunculus", "magnolia", "anemone", "cosmos", "peony"],
  ["ranunculus", "peony", "orchid", "gardenia", "anemone", "cosmos"],
  ["gardenia", "magnolia", "anemone", "orchid", "peony", "ranunculus"],
];

const FLOWER_FAMILIES: FlowerType[][] = [
  ["rose", "tulip", "peony", "daisy", "cherry", "wildflower"],
  ["sunflower", "hibiscus", "orchid", "lavender", "carnation", "magnolia"],
  ["cherry", "daisy", "ranunculus", "wildflower", "lavender", "anemone"],
  ["rose", "hibiscus", "peony", "carnation", "orchid", "cosmos"],
  ["lavender", "cherry", "orchid", "daisy", "ranunculus", "gardenia"],
  ["sunflower", "rose", "ranunculus", "cherry", "tulip", "magnolia"],
  ["hibiscus", "carnation", "peony", "lavender", "anemone", "wildflower"],
  ["rose", "tulip", "orchid", "carnation", "sunflower", "cosmos"],
  ["cherry", "lavender", "ranunculus", "hibiscus", "gardenia", "cosmos"],
  ["sunflower", "wildflower", "peony", "magnolia", "rose", "gardenia"],
];

export function createBouquet(rawName: string, variationId = 0, mode: BouquetMode = "all"): BouquetModel {
  const name = normalizeName(rawName) || "best friend";
  const seed = (hashName(name) + Math.imul(variationId + 1, 2654435761)) >>> 0;
  const rng = createRng(seed);
  const firstCode = name.charCodeAt(0) || 0;
  const style = BOUQUET_STYLES[(seed + name.length * 17 + firstCode) % BOUQUET_STYLES.length];
  const familyIndex = (seed + name.length * 31 + firstCode) % (mode === "premium" ? PREMIUM_FAMILIES.length : FLOWER_FAMILIES.length);
  const flowerSet = mode === "premium" ? PREMIUM_FAMILIES[familyIndex] : FLOWER_FAMILIES[familyIndex];
  const paletteSeed = (hashName(`${name}-palette`) + Math.imul(variationId + 3, 2246822519)) >>> 0;
  const palette = PALETTES[(paletteSeed + style.paletteOffset) % PALETTES.length];
  const dominant = flowerSet[0];
  const count = style.minCount + Math.floor(rng() * (style.maxCount - style.minCount + 1));
  const flowers: BouquetFlower[] = [];

  for (let index = 0; index < count; index += 1) {
    const role = index < 3 ? "hero" : index < 7 ? "support" : "filler";
    const type = index < flowerSet.length ? flowerSet[index] : pick(rng, flowerSet);
    const [baseX, baseY] = style.positions[index % style.positions.length];
    const spread = style.spread + (index % 3) * 6;
    const baseScale = role === "hero" ? between(rng, .88, 1.14) : role === "support" ? between(rng, .67, .93) : between(rng, .36, .58);
    flowers.push({
      id: `${type}-${index}-${seed}`,
      type,
      x: baseX + between(rng, -spread, spread),
      y: baseY + between(rng, -style.yJitter, style.yJitter),
      scale: Math.max(.31, baseScale * style.scaleBias),
      rotation: between(rng, -15, 15),
      delay: role === "hero" ? 2.15 + index * .18 : role === "support" ? 1.25 + index * .15 : .65 + index * .12,
      bend: between(rng, -58, 58) * style.stemBend,
      role,
    });
  }

  const leafFloor = mode === "premium" ? 9 : Math.max(13, Math.round(style.leafMin * .9));
  const leafCeiling = mode === "premium" ? 12 : Math.min(18, Math.max(leafFloor, Math.round(style.leafMax * .92)));
  const leafCount = leafFloor + Math.floor(rng() * (leafCeiling - leafFloor + 1));
  const leafStemPool = flowers.filter((flower) => flower.role !== "filler");
  const leaves = Array.from({ length: leafCount }, (_, index) => {
    const side = index % 2 === 0 ? "left" : "right";
    const left = side === "left";
    const stemFlower = leafStemPool[index % Math.max(1, leafStemPool.length)] ?? flowers[index % flowers.length];
    const stemTargetX = stemFlower.x;
    const stemTargetY = stemFlower.y + 34;
    const alongStem = between(rng, .38, .78);
    const stemX = 250 + (stemTargetX - 250) * alongStem;
    const stemY = 560 + (stemTargetY - 560) * alongStem;
    return {
      x: stemX + (left ? -14 : 14),
      y: Math.max(285, Math.min(505, stemY + between(rng, -8, 8))),
      anchorX: stemX,
      anchorY: stemY,
      rotation: between(rng, left ? -78 + style.leafTilt : 24 + style.leafTilt, left ? -28 + style.leafTilt : 78 + style.leafTilt),
      scale: between(rng, mode === "premium" ? .54 : .5, mode === "premium" ? .92 : .94),
      side: side as "left" | "right",
    };
  });

  const selectedTypes = Array.from(new Set(flowers.map((flower) => flower.type)));
  return { name, seed, variationId, mode, palette, styleName: style.name, flowers, leaves, dominant, selectedTypes, wind: between(rng, -3.5, 3.5) };
}

export function flowerList(model: BouquetModel) {
  return model.selectedTypes.map((type) => FLOWER_META[type]);
}
