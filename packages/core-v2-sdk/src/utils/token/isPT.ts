import { decodeTokenId } from "./decodeTokenId";

/**
 * Determines whether or not the specified tokenId is a principle token.
 * @param {BigNumber} tokenId - token id
 * @return {boolean} whether or not is a principle token
 */
export function isPT(tokenId: string): boolean {
  return !decodeTokenId(tokenId).isYieldToken;
}
