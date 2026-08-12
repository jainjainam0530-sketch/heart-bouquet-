/* Bloom For You variation memory: every new bouquet receives a fresh local variation ID and avoids recent visual fingerprints. */

import { createBouquet, type BouquetModel } from "./bouquetEngine";
import { normalizeName } from "./nameSeed";

const COUNTER_KEY = "bloom-for-you:variation-counter";
const HISTORY_KEY = "bloom-for-you:variation-history";
const HISTORY_LIMIT = 24;

type VariationRecord = {
  variationId: number;
  name: string;
  fingerprint: string;
};

function readCounter() {
  if (typeof window === "undefined") return 0;
  return Number.parseInt(window.localStorage.getItem(COUNTER_KEY) ?? "0", 10) || 0;
}

function readHistory(): VariationRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(HISTORY_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistory(records: VariationRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(records.slice(-HISTORY_LIMIT)));
}

export function bouquetFingerprint(model: BouquetModel) {
  return [
    model.styleName,
    model.palette.name,
    model.flowers.map((flower) => flower.type).join("-"),
    model.flowers.map((flower) => `${Math.round(flower.x / 20)}:${Math.round(flower.y / 20)}:${Math.round(flower.scale * 10)}`).join("|"),
    model.leaves.length,
  ].join("::");
}

export function createFreshBouquet(rawName: string) {
  const name = normalizeName(rawName) || "best friend";
  const history = readHistory();
  let variationId = readCounter() + 1;
  let model = createBouquet(name, variationId);
  let fingerprint = bouquetFingerprint(model);
  let attempts = 0;

  while (history.some((record) => record.fingerprint === fingerprint) && attempts < 40) {
    variationId += 1;
    model = createBouquet(name, variationId);
    fingerprint = bouquetFingerprint(model);
    attempts += 1;
  }

  if (typeof window !== "undefined") window.localStorage.setItem(COUNTER_KEY, String(variationId));
  writeHistory([...history, { variationId, name, fingerprint }]);
  return model;
}

