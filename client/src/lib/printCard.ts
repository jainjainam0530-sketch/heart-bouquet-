import type { BouquetModel } from "./bouquetEngine";
import { generatePersonalNote } from "./noteGenerator";

export type PrintCardData = {
  recipient: string;
  note: string;
  scanHint: string;
};

export function buildPrintCardData(model: BouquetModel, customNote?: string): PrintCardData {
  return {
    recipient: model.name,
    note: generatePersonalNote(model, customNote),
    scanHint: `Scan to view ${model.name}'s unique bouquet`,
  };
}
