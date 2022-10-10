/**
 * Get a token id
 * @param {number} maturity - The maturity timestamp in milliseconds
 * @param {number} startTime - The optional start time timestamp in milliseconds
 * @param {boolean} isYieldToken - Whether or not the token is a yield token
 * @return A token id
 */
export function encodeTokenId(
  maturity: number,
  startTime = 0,
  isYieldToken = false,
): string {
  const firstBit = isYieldToken ? 8 : 0;
  const startTimeBits = (startTime / 1000).toString(16).padStart(31, "0");
  const maturityHex = (maturity / 1000).toString(16);
  const maturityBits = maturityHex.padStart(32, "0");

  return isYieldToken || startTime
    ? `0x${firstBit}${startTimeBits}${maturityBits}`
    : `0x${maturityHex}`;
}
