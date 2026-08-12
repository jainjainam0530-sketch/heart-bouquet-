/* Midnight Conservatory voice: short, warm, playful notes tied to the actual garden. */

import { FLOWER_META } from "./flowerLibrary";
import type { BouquetModel } from "./bouquetEngine";

const GENERAL = [
  (name: string) => `${name}, I was going to give you flowers… then I thought, why not grow you a whole little garden?`,
  (name: string) => `${name}, I tried coding a bouquet as lovely as you. The code is still trying to keep up.`,
  (name: string) => `${name}, this bouquet has one tiny problem… it still isn’t as lovely as the person it was made for.`,
  (name: string) => `${name}, a small garden for my best friend — hand-grown with a questionable amount of affection.`,
];

const DOMINANT: Partial<Record<string, (name: string) => string>> = {
  rose: (name) => `${name}, the roses wanted to make a dramatic entrance for you.`,
  lavender: (name) => `Something about lavender felt very you, ${name} — calm, pretty, and impossible to ignore.`,
  sunflower: (name) => `This garden needed a little sunshine, ${name}. So obviously, it brought its own.`,
  cherry: (name) => `This little garden decided you deserved something soft and dreamy, ${name}.`,
};

export function generatePersonalNote(model: BouquetModel) {
  const dominantNote = DOMINANT[model.dominant];
  if (dominantNote) return dominantNote(model.name);
  const index = model.seed % GENERAL.length;
  return GENERAL[index](model.name);
}

export function personalityLine(model: BouquetModel) {
  const personalities = model.selectedTypes.slice(0, 3).map((type) => FLOWER_META[type].personality);
  return `${personalities.join(", ")} little blooms, arranged specifically for you.`;
}

