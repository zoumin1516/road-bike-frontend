export function toOptions(values?: string[]) {
  return (values || []).map((value) => ({ label: value, value }));
}
