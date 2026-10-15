/* Midnight Conservatory voice: this exact handwritten note is used for every bouquet, as requested by Jainam. */

import type { BouquetModel } from "./bouquetEngine";
import { FLOWER_META } from "./flowerLibrary";

export const HANDMADE_NOTE = `Hey you! 🌷
Just a tiny little gift from me to you.
Since real flowers don’t last forever, I made you one with a little code, a little creativity, and a lot of friendship. 💗
Hope this little garden makes you smile.
— From your friend, Jainam ✨`;

export function generatePersonalNote(_model: BouquetModel, customNote?: string) {
  return customNote || HANDMADE_NOTE;
}

export function personalityLine(model: BouquetModel) {
  const labels = model.selectedTypes.map((type) => FLOWER_META[type].label.toLowerCase());
  const last = labels.pop();
  const list = last ? `${labels.join(", ")} & ${last}` : labels.join(", ");
  return `A mix of ${list} blooms, arranged specifically for you.`;
}
