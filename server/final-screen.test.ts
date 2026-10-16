import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync("client/src/pages/Home.tsx", "utf8");

describe("final sharing scene regression coverage", () => {
  it("renders a guarded final scene after the One more thing transition", () => {
    expect(homeSource).toContain('onClick={() => setStage("final")}');
    expect(homeSource).toContain('stage === "final" && model && printCard');
    expect(homeSource).toContain('className="final-screen"');
  });

  it("keeps the complete sharing and QR action surface in the final scene", () => {
    for (const label of [
      "Share this garden",
      "WhatsApp",
      "Instagram",
      "Copy link",
      "QR code",
      "Print Card",
      "Grow another bouquet",
    ]) {
      expect(homeSource).toContain(label);
    }
  });
});
