import { decodeTokenId } from "./decodeTokenId";

/**
 * Determines whether or not the specified tokenId is a yield token.
 * @param {BigNumber} tokenId - token id
 * @return {boolean} whether or not is a yield token
 */
export function isYT(tokenId: string): boolean {
  return decodeTokenId(tokenId).isYieldToken;
}
