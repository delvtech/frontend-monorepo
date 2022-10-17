/**
 * Get a token id
 * @param {number} maturity - The maturity timestamp in seconds
 * @param {number} startTime - The optional start time timestamp in seconds
 * @param {boolean} isYieldToken - Whether or not the token is a yield token
 * @return A token id
 */
export function encodeTokenId(
  maturity: number,
  startTime = 0,
  isYieldToken = false,
): string {
  const firstBit = isYieldToken ? 8 : 0;
  const startTimeBits = startTime.toString(16).padStart(31, "0");
  const maturityHex = maturity.toString(16);
  const maturityBits = maturityHex.padStart(32, "0");

  return isYieldToken || startTime
    ? `0x${firstBit}${startTimeBits}${maturityBits}`
    : `0x${maturityHex}`;
}
