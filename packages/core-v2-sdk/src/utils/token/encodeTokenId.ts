/**
 * Get a token id
 * @param {number} maturity - The maturity timestamp in seconds
 * @param {number} startTime - The optional start time timestamp in seconds.
 *   Adding a start time will result in a Yield Token ID.
 * @return A token id
 */
export function encodeTokenId(maturity: number, startTime = 0): string {
  const maturityHex = maturity.toString(16);
  if (!startTime) {
    return `0x${maturityHex}`;
  }
  const startTimeBits = startTime.toString(16).padStart(31, "0");
  const maturityBits = maturityHex.padStart(32, "0");
  return `0x8${startTimeBits}${maturityBits}`;
}
