export function formatPercent(decimalAmount: number, precision = 2): string {
  const percent = (decimalAmount * 100).toFixed(precision);
  return `${percent}%`;
}
