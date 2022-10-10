import { UNLOCKED_YT_ID } from "src/utils/constants";

/**
 * Get the data stored in a token id
 * @param {string} tokenId - The token id to decode
 * @return An object containing the data stored in the id
 */
export function decodeTokenId(tokenId: string): {
  isYieldToken: boolean;
  /**
   * The start timestamp in milliseconds
   */
  startTime: number | null;
  /**
   * The maturity timestamp in milliseconds
   */
  maturity: number;
} {
  // A full token id is a 66 characters long, starting with 0x and followed by
  // a 256 bit string constructed as such:
  // [ isYieldToken 1-bit ][ startTimeInSeconds 127-bit ][ expiry 128-bit ]
  const isLongForm = tokenId.length === 66;
  return {
    isYieldToken:
      // yield token ids are always in long form
      isLongForm &&
      // yield token ids always start with 0x8 (1 in binary)
      tokenId.startsWith("0x8") &&
      // This is a special yield token used for accounting in the
      // pools, disregard it.
      tokenId !== UNLOCKED_YT_ID,
    startTime: isLongForm ? +`0x${tokenId.slice(3, 34)}` * 1000 : null,
    maturity: +`0x${isLongForm ? tokenId.slice(-32) : tokenId.slice(2)}` * 1000,
  };
}
