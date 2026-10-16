import { describe, expect, it } from "vitest";
import { createBouquet } from "../client/src/lib/bouquetEngine";

const premiumTypes = new Set(["peony", "orchid", "ranunculus", "gardenia", "magnolia", "anemone", "cosmos"]);

function assertFiniteGeometry(model: ReturnType<typeof createBouquet>) {
  for (const flower of model.flowers) {
    expect(Number.isFinite(flower.x)).toBe(true);
    expect(Number.isFinite(flower.y)).toBe(true);
    expect(flower.scale).toBeGreaterThan(0);
    expect(flower.x - flower.scale * 60).toBeGreaterThanOrEqual(0);
    expect(flower.x + flower.scale * 60).toBeLessThanOrEqual(500);
    expect(flower.y - flower.scale * 65).toBeGreaterThanOrEqual(0);
    expect(flower.y + flower.scale * 65).toBeLessThanOrEqual(600);
  }
  for (const leaf of model.leaves) {
    expect(Number.isFinite(leaf.x)).toBe(true);
    expect(Number.isFinite(leaf.y)).toBe(true);
    expect(Number.isFinite(leaf.anchorX)).toBe(true);
    expect(Number.isFinite(leaf.anchorY)).toBe(true);
    expect(leaf.anchorY).toBeGreaterThanOrEqual(0);
    expect(leaf.anchorY).toBeLessThanOrEqual(600);
  }
}

describe("bouquet engine regressions", () => {
  it("keeps premium mode limited to premium flower families", () => {
    const model = createBouquet("Mira", 14, "premium");
    expect(model.mode).toBe("premium");
    expect(model.selectedTypes.every(type => premiumTypes.has(type))).toBe(true);
    expect(model.leaves.length).toBeGreaterThanOrEqual(9);
    assertFiniteGeometry(model);
  });

  it("keeps mixed mode varied while allowing premium blooms", () => {
    const model = createBouquet("Sofia", 14, "all");
    expect(model.mode).toBe("all");
    expect(model.selectedTypes.length).toBeGreaterThanOrEqual(6);
    expect(model.leaves.length).toBeGreaterThanOrEqual(13);
    assertFiniteGeometry(model);
  });

  it("exposes the full mixed flower catalog across variations", () => {
    const seen = new Set<string>();
    for (let variation = 0; variation < 20; variation += 1) {
      createBouquet("Best friend", variation, "all").selectedTypes.forEach(type => seen.add(type));
    }
    expect(seen.size).toBeGreaterThanOrEqual(16);
    expect(seen.has("rose")).toBe(true);
    expect(seen.has("sunflower")).toBe(true);
    expect(seen.has("lavender")).toBe(true);
    expect(seen.has("wildflower")).toBe(true);
    expect(seen.has("gardenia")).toBe(true);
    expect(seen.has("magnolia")).toBe(true);
    expect(seen.has("anemone")).toBe(true);
    expect(seen.has("cosmos")).toBe(true);
  });

  it("is deterministic for the same name, variation, and mode", () => {
    const first = createBouquet("Jainam", 7, "premium");
    const second = createBouquet("Jainam", 7, "premium");
    expect(second).toEqual(first);
  });
});
