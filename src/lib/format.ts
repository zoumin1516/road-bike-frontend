export function formatPrice(value?: number | null, currency?: string | null) {
  if (value === null || value === undefined) return "-";
  return `${currency || "USD"} ${value}`;
}

export function formatYear(value?: number | null) {
  if (value === null || value === undefined) return "-";
  return String(value);
}

export function formatWeightKg(value?: number | null) {
  if (value === null || value === undefined) return "-";
  return `${value} kg`;
}

export function formatWeightG(value?: number | null) {
  if (value === null || value === undefined) return "-";
  return `${value} g`;
}
