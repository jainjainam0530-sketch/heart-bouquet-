/* Midnight Conservatory bouquet engine: the entered name controls palette, species, structure, and motion. */

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
  flowers: BouquetFlower[];
  leaves: BouquetLeaf[];
  dominant: FlowerType;
  selectedTypes: FlowerType[];
  wind: number;
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

const FLOWER_SETS: FlowerType[][] = [
  ["rose", "tulip", "daisy", "lavender"],
  ["hibiscus", "cherry", "carnation", "wildflower"],
  ["sunflower", "daisy", "lavender", "tulip"],
  ["rose", "cherry", "carnation", "tulip"],
  ["rose", "lavender", "wildflower", "daisy"],
];
const POSITIONS = [
  [250, 128], [160, 214], [346, 190], [248, 258], [386, 286], [112, 315], [422, 354], [192, 360], [304, 350], [145, 406], [370, 420], [249, 424], [75, 250], [430, 240], [184, 120], [334, 112],
];

export function createBouquet(rawName: string): BouquetModel {
  const name = normalizeName(rawName) || "best friend";
  const seed = hashName(name);
  const rng = createRng(seed);
  const palette = pick(rng, PALETTES);
  const selectedSet = pick(rng, FLOWER_SETS);
  const dominant = pick(rng, selectedSet);
  const count = 10 + Math.floor(rng() * 5);
  const flowers: BouquetFlower[] = [];

  for (let index = 0; index < count; index += 1) {
    const role = index < 3 ? "hero" : index < 7 ? "support" : "filler";
    const type = index < selectedSet.length ? selectedSet[index] : index === 0 ? dominant : pick(rng, selectedSet);
    const [baseX, baseY] = POSITIONS[index % POSITIONS.length];
    const spread = role === "hero" ? 22 : role === "support" ? 28 : 34;
    flowers.push({
      id: `${type}-${index}-${seed}`,
      type,
      x: baseX + between(rng, -spread, spread),
      y: baseY + between(rng, -14, 14),
      scale: role === "hero" ? between(rng, .88, 1.14) : role === "support" ? between(rng, .67, .93) : between(rng, .36, .58),
      rotation: between(rng, -13, 13),
      delay: role === "hero" ? 2.2 + index * .18 : role === "support" ? 1.35 + index * .15 : .75 + index * .12,
      bend: between(rng, -58, 58),
      role,
    });
  }

  const leaves = Array.from({ length: 12 + Math.floor(rng() * 6) }, (_, index) => {
    const side = index % 2 === 0 ? "left" : "right";
    return {
      x: between(rng, side === "left" ? 92 : 260, side === "left" ? 245 : 408),
      y: between(rng, 260, 500),
      rotation: between(rng, side === "left" ? -72 : 18, side === "left" ? -18 : 72),
      scale: between(rng, .52, .98),
      side: side as "left" | "right",
    };
  });

  const selectedTypes = Array.from(new Set(flowers.map((flower) => flower.type)));
  return { name, seed, palette, flowers, leaves, dominant, selectedTypes, wind: between(rng, -2.5, 2.5) };
}

export function flowerList(model: BouquetModel) {
  return model.selectedTypes.map((type) => FLOWER_META[type]);
}
