import { describe, expect, it } from "vitest";
import { createBouquet } from "@/lib/bouquetEngine";
import { HANDMADE_NOTE } from "@/lib/noteGenerator";
import { buildPrintCardData } from "@/lib/printCard";

describe("print card content", () => {
  const model = createBouquet("Mira", 14);

  it("keeps the custom personal message beside the QR content", () => {
    const customNote = "For every ordinary day that deserves a little color.\n— Jainam";
    const card = buildPrintCardData(model, customNote);

    expect(card.recipient).toBe("Mira");
    expect(card.note).toBe(customNote);
    expect(card.scanHint).toContain("Mira");
  });

  it("falls back to the handmade note when no custom message is set", () => {
    expect(buildPrintCardData(model).note).toBe(HANDMADE_NOTE);
    expect(buildPrintCardData(model, "").note).toBe(HANDMADE_NOTE);
  });
});
