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
  rotation: number;
  scale: number;
  side: "left" | "right";
};

export type BouquetModel = {
  name: string;
  seed: number;
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
  { name: "Rose Garden", petal: "#d56a82", deep: "#612038", highlight: "#ffd7cf", secondary: "#efb2ad", leaf: "#3f6851", leafLight: "#91b99c", gold: "#d6a46d", atmosphere: "#321321" },
  { name: "Sunset", petal: "#d97762", deep: "#682d31", highlight: "#ffe0b8", secondary: "#efaa82", leaf: "#4d6d4e", leafLight: "#a5c493", gold: "#e4b66f", atmosphere: "#3b201a" },
  { name: "Lavender Dream", petal: "#a987c6", deep: "#3d2a57", highlight: "#f4d9e3", secondary: "#d1b6e1", leaf: "#45645d", leafLight: "#9fbbaa", gold: "#cbb28a", atmosphere: "#241b37" },
  { name: "Midnight Bloom", petal: "#a95079", deep: "#341736", highlight: "#f4c8da", secondary: "#c874a0", leaf: "#3d5f56", leafLight: "#8fb6a8", gold: "#c6a9c8", atmosphere: "#25112e" },
  { name: "Spring Garden", petal: "#de879b", deep: "#73384c", highlight: "#fff1d6", secondary: "#f4c4a5", leaf: "#4c7651", leafLight: "#a8c58e", gold: "#d5b26f", atmosphere: "#33261b" },
  { name: "Cherry Blossom", petal: "#e29cae", deep: "#74374e", highlight: "#fff3e9", secondary: "#f5cad4", leaf: "#4d705d", leafLight: "#a5c4a8", gold: "#d8b37d", atmosphere: "#321923" },
  { name: "Golden Hour", petal: "#d98b54", deep: "#663238", highlight: "#ffe4a7", secondary: "#efbc74", leaf: "#466b4b", leafLight: "#a6c18a", gold: "#e3bd71", atmosphere: "#39241a" },
  { name: "Romantic Wine", petal: "#be526f", deep: "#4a192d", highlight: "#ffd4cd", secondary: "#dd8c99", leaf: "#3d604d", leafLight: "#8eaf94", gold: "#d0a36d", atmosphere: "#2b101b" },
];

const BOUQUET_STYLES: BouquetStyle[] = [
  {
    name: "Tall Rose Arch",
    flowerSet: ["rose", "rose", "tulip", "daisy", "lavender"],
    positions: [[250, 108], [150, 182], [350, 168], [235, 244], [378, 250], [105, 304], [419, 313], [184, 348], [314, 357], [140, 416], [366, 426], [250, 430], [78, 247], [430, 238]],
    minCount: 11, maxCount: 14, spread: 20, yJitter: 13, scaleBias: .98, leafMin: 13, leafMax: 18, leafTilt: 0, leafYMin: 250, leafYMax: 510, paletteOffset: 0, stemBend: 1,
  },
  {
    name: "Sunlit Handful",
    flowerSet: ["sunflower", "hibiscus", "daisy", "wildflower", "tulip"],
    positions: [[250, 138], [168, 210], [333, 218], [112, 269], [390, 278], [206, 304], [301, 321], [99, 367], [402, 374], [160, 418], [345, 420], [252, 451], [60, 306], [440, 302]],
    minCount: 10, maxCount: 13, spread: 34, yJitter: 18, scaleBias: 1.06, leafMin: 12, leafMax: 16, leafTilt: 12, leafYMin: 285, leafYMax: 515, paletteOffset: 6, stemBend: 1.3,
  },
  {
    name: "Lavender Drift",
    flowerSet: ["lavender", "lavender", "cherry", "daisy", "wildflower"],
    positions: [[250, 108], [212, 166], [301, 176], [157, 242], [355, 248], [230, 275], [325, 291], [113, 338], [398, 352], [178, 401], [342, 414], [250, 453], [78, 283], [430, 293]],
    minCount: 12, maxCount: 15, spread: 18, yJitter: 11, scaleBias: .86, leafMin: 15, leafMax: 20, leafTilt: -9, leafYMin: 230, leafYMax: 505, paletteOffset: 2, stemBend: .8,
  },
  {
    name: "Wide Meadow",
    flowerSet: ["cherry", "daisy", "carnation", "wildflower", "tulip"],
    positions: [[250, 156], [122, 230], [380, 226], [188, 260], [318, 268], [80, 318], [433, 327], [142, 363], [360, 372], [197, 405], [306, 413], [250, 448], [55, 268], [448, 260]],
    minCount: 12, maxCount: 16, spread: 42, yJitter: 22, scaleBias: .91, leafMin: 16, leafMax: 20, leafTilt: 8, leafYMin: 275, leafYMax: 515, paletteOffset: 5, stemBend: 1.45,
  },
  {
    name: "Deep Wine Cluster",
    flowerSet: ["rose", "hibiscus", "carnation", "tulip"],
    positions: [[250, 142], [188, 205], [315, 198], [134, 264], [369, 265], [214, 286], [291, 300], [104, 349], [401, 356], [171, 397], [344, 405], [250, 432], [76, 282], [430, 294]],
    minCount: 10, maxCount: 14, spread: 24, yJitter: 15, scaleBias: 1.09, leafMin: 11, leafMax: 15, leafTilt: -4, leafYMin: 260, leafYMax: 510, paletteOffset: 7, stemBend: 1.1,
  },
];

const FLOWER_FAMILIES: FlowerType[][] = [
  ["rose", "tulip", "daisy", "lavender"],
  ["sunflower", "hibiscus", "daisy", "wildflower"],
  ["cherry", "daisy", "carnation", "wildflower"],
  ["rose", "hibiscus", "carnation", "tulip"],
  ["lavender", "cherry", "wildflower", "daisy"],
  ["sunflower", "rose", "daisy", "cherry"],
  ["hibiscus", "carnation", "tulip", "lavender"],
  ["rose", "tulip", "carnation", "wildflower"],
  ["cherry", "lavender", "daisy", "hibiscus"],
  ["sunflower", "wildflower", "tulip", "carnation"],
];

export function createBouquet(rawName: string): BouquetModel {
  const name = normalizeName(rawName) || "best friend";
  const seed = hashName(name);
  const rng = createRng(seed);
  const firstCode = name.charCodeAt(0) || 0;
  const style = BOUQUET_STYLES[(seed + name.length * 17 + firstCode) % BOUQUET_STYLES.length];
  const flowerSet = FLOWER_FAMILIES[(seed + name.length * 31 + firstCode) % FLOWER_FAMILIES.length];
  const paletteSeed = hashName(`${name}-palette`);
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

  const leafCount = style.leafMin + Math.floor(rng() * (style.leafMax - style.leafMin + 1));
  const leaves = Array.from({ length: leafCount }, (_, index) => {
    const side = index % 2 === 0 ? "left" : "right";
    const left = side === "left";
    return {
      x: between(rng, left ? 70 : 270, left ? 238 : 430),
      y: between(rng, style.leafYMin, style.leafYMax),
      rotation: between(rng, left ? -82 + style.leafTilt : 12 + style.leafTilt, left ? -18 + style.leafTilt : 82 + style.leafTilt),
      scale: between(rng, .48, 1.02),
      side: side as "left" | "right",
    };
  });

  const selectedTypes = Array.from(new Set(flowers.map((flower) => flower.type)));
  return { name, seed, palette, styleName: style.name, flowers, leaves, dominant, selectedTypes, wind: between(rng, -3.5, 3.5) };
}

export function flowerList(model: BouquetModel) {
  return model.selectedTypes.map((type) => FLOWER_META[type]);
}
