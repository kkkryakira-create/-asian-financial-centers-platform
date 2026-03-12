export const SHEETS_DOC_ID = process.env.NEXT_PUBLIC_SHEETS_DOC_ID || "";

export const SHEET_GIDS = {
  gfci: process.env.NEXT_PUBLIC_SHEET_GID_GFCI || "0",
  fdi: process.env.NEXT_PUBLIC_SHEET_GID_FDI || "0",
  institutions: process.env.NEXT_PUBLIC_SHEET_GID_INSTITUTIONS || "0",
  models: process.env.NEXT_PUBLIC_SHEET_GID_MODELS || "0",
  regression: process.env.NEXT_PUBLIC_SHEET_GID_REGRESSION || "0",
  map: process.env.NEXT_PUBLIC_SHEET_GID_MAP || "0"
};

export function getSheetCsvUrl(gid: string) {
  if (!SHEETS_DOC_ID) return "";
  return `https://docs.google.com/spreadsheets/d/${SHEETS_DOC_ID}/export?format=csv&gid=${gid}`;
}
