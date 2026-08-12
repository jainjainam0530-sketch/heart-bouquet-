/* Midnight Conservatory voice: short, warm, playful notes tied to the actual garden. */

import { FLOWER_META } from "./flowerLibrary";
import type { BouquetModel } from "./bouquetEngine";

const GENERAL = [
  (name: string) => `I made this little garden for you, ${name}. Hope it makes you smile.`,
  (name: string) => `You like flowers, so I made you a small garden instead.`,
  (name: string) => `I wanted to give you something small, but not forgettable.`,
  (name: string) => `This is my slightly overthought way of saying you’re one of my favorite people.`,
  (name: string) => `I know it isn’t a real bouquet, but I made it carefully anyway.`,
  (name: string) => `The flowers are doing their best. I think you’ll like them.`,
  (name: string) => `A little garden for you, because you make ordinary days better.`,
];

const DOMINANT: Partial<Record<string, (name: string) => string>> = {
  rose: () => `I put the roses in first. They felt like the right place to start.`,
  lavender: (name) => `I added lavender because it felt calm, like a good day with you, ${name}.`,
  sunflower: () => `The sunflower is here because every bouquet needs a bright spot.`,
  cherry: () => `The little blossoms looked nice, so I kept them.`,
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
