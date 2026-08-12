/* Midnight Conservatory personalization layer: names become stable seeds so each garden feels authored, not random. */

export function normalizeName(value: string) {
  return Array.from(value.trim().replace(/\s+/g, " ")).filter((character) => /[A-Za-z0-9 .'-]/.test(character) || character.toUpperCase() !== character.toLowerCase()).join("").slice(0, 28);
}

export function hashName(value: string) {
  let hash = 2166136261;
  for (const character of value.toLowerCase()) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function createRng(seed: number) {
  let state = seed || 1;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick<T>(rng: () => number, items: readonly T[]) {
  return items[Math.floor(rng() * items.length)] ?? items[0];
}

export function between(rng: () => number, min: number, max: number) {
  return min + (max - min) * rng();
}
