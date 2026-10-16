/* Midnight Conservatory flower library: names and interactions stay extensible while artwork remains procedural SVG. */

export type FlowerType = "rose" | "tulip" | "cherry" | "daisy" | "sunflower" | "hibiscus" | "lavender" | "carnation" | "wildflower" | "peony" | "orchid" | "ranunculus" | "gardenia" | "magnolia" | "anemone" | "cosmos";

export type FlowerMeta = {
  label: string;
  symbol: string;
  personality: string;
  interaction: string;
};

export const FLOWER_META: Record<FlowerType, FlowerMeta> = {
  rose: { label: "Rose", symbol: "✿", personality: "romantic", interaction: "A little extra romance for you." },
  tulip: { label: "Tulip", symbol: "❀", personality: "sweet", interaction: "Okay, this one is ridiculously cute." },
  cherry: { label: "Cherry blossom", symbol: "✦", personality: "dreamy", interaction: "A soft little moment, just for you." },
  daisy: { label: "Daisy", symbol: "✽", personality: "cheerful", interaction: "Tiny flower. Big personality." },
  sunflower: { label: "Sunflower", symbol: "✺", personality: "sunny", interaction: "Someone brought the sunshine." },
  hibiscus: { label: "Hibiscus", symbol: "✾", personality: "bold", interaction: "A bold bloom for a one-of-a-kind person." },
  lavender: { label: "Lavender", symbol: "❋", personality: "calm", interaction: "A little calm in the middle of everything." },
  carnation: { label: "Carnation", symbol: "❉", personality: "warm", interaction: "A frilled little reminder that you are adored." },
  wildflower: { label: "Wildflower", symbol: "✧", personality: "playful", interaction: "A tiny wild thing with a very big heart." },
  peony: { label: "Peony", symbol: "✤", personality: "lush", interaction: "A soft, luxurious bloom with room for every feeling." },
  orchid: { label: "Orchid", symbol: "❁", personality: "elegant", interaction: "A graceful little statement, chosen with care." },
  ranunculus: { label: "Ranunculus", symbol: "✥", personality: "layered", interaction: "So many petals, and somehow still perfectly sweet." },
  gardenia: { label: "Gardenia", symbol: "❋", personality: "refined", interaction: "A quietly elegant bloom with a little secret glow." },
  magnolia: { label: "Magnolia", symbol: "✾", personality: "serene", interaction: "Soft, sculptural, and impossible not to notice." },
  anemone: { label: "Anemone", symbol: "✹", personality: "modern", interaction: "A jewel-toned little statement with perfect contrast." },
  cosmos: { label: "Cosmos", symbol: "✧", personality: "airy", interaction: "A light, graceful bloom with a little bit of magic." },
};

export const FLOWER_TYPES = Object.keys(FLOWER_META) as FlowerType[];
