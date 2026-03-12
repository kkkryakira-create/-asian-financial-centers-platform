export type CsvRow = Record<string, string>;

// Lightweight CSV parser that supports quoted fields and commas inside quotes.
export function parseCsv(text: string): CsvRow[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(current.trim());
      current = "";
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (current.length > 0 || row.length > 0) {
        row.push(current.trim());
        rows.push(row);
      }
      current = "";
      row = [];

      if (char === '\r' && next === '\n') {
        i += 1;
      }
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current.trim());
    rows.push(row);
  }

  if (rows.length === 0) return [];

  const [header, ...data] = rows;
  return data.map((values) => {
    const record: CsvRow = {};
    header.forEach((key, index) => {
      record[key] = values[index] ?? "";
    });
    return record;
  });
}

export function toNumber(value: string): number {
  const normalized = value.replace(/\s/g, '').replace(',', '.');
  const num = Number(normalized);
  return Number.isFinite(num) ? num : 0;
}
