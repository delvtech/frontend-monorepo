/**
 * Gets the time remaining until a timestamp. If negative, returns zero.
 * @param {number} timestamp - the timestamp in milliseconds
 * @return {number} time remaining in milliseconds
 */
export function timeUntil(timestamp: number): number {
  return Math.max(Date.now() - timestamp, 0);
}
