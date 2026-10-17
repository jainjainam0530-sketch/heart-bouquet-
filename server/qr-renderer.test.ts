import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync("client/src/pages/Home.tsx", "utf8");

describe("QR renderer compatibility", () => {
  it("uses the standard qrcode data-URL renderer with warm single-color modules", () => {
    expect(homeSource).toContain("QRCode.toDataURL(value");
    expect(homeSource).toContain('dark: "#321321"');
    expect(homeSource).toContain('errorCorrectionLevel: "M"');
    expect(homeSource).not.toContain("renderStyledQrCanvasDataUrl");
    expect(homeSource).not.toContain("context.roundRect");
  });

  it("keeps the downloadable keepsake aligned with the generated QR image", () => {
    expect(homeSource).toContain("const qrImage = new Image()");
    expect(homeSource).toContain("canvas.toDataURL(\"image/png\")");
    expect(homeSource).toContain("qrImage.src = qrDataUrl");
  });
});
