import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync("client/src/pages/Home.tsx", "utf8");
const cssSource = readFileSync("client/src/index.css", "utf8");

describe("music options regression coverage", () => {
  it("keeps five distinct selectable moods with hosted audio assets", () => {
    for (const mood of ["dreamy", "whimsical", "classic", "twilight", "rain"]) {
      expect(homeSource).toContain(`id: "${mood}"`);
    }
    expect(homeSource).toContain("twilight-piano-garden_811cecb2.mp3");
    expect(homeSource).toContain("garden-rain-melody_674a5bec.mp3");
  });

  it("keeps each mood described and the panel usable on mobile", () => {
    for (const detail of ["tender felt piano", "fresh and peaceful"]) {
      expect(homeSource).toContain(detail);
    }
    expect(homeSource).toContain('aria-pressed={mood === m.id}');
    expect(cssSource).toContain("max-height: min(420px, 52vh)");
    expect(cssSource).toContain("overflow-y: auto");
  });
});
