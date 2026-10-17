import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync("client/src/pages/Home.tsx", "utf8");

describe("QR renderer compatibility", () => {
  it("uses a portable rounded path instead of Canvas roundRect", () => {
    expect(homeSource).toContain("function traceRoundedRect");
    expect(homeSource).not.toContain("context.roundRect");
  });

  it("uses the same compatibility helper for the downloadable keepsake", () => {
    expect(homeSource).toContain("traceRoundedRect(context, x, y, width, height, radius)");
    expect(homeSource).toContain("const qrImage = new Image()");
    expect(homeSource).toContain("canvas.toDataURL(\"image/png\")");
  });
});
