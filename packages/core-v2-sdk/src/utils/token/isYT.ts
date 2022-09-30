import { BigNumber } from "ethers";
import { UNLOCKED_YT_ID } from "src/utils/constants";

/**
 * Determines whether or not the specified tokenId is a yield token.
 * @param {BigNumber} tokenId - token id
 * @return {boolean} whether or not is a yield token
 */
export function isYT(tokenId: BigNumber): boolean {
  const idHex = tokenId.toHexString();

  const isYT =
    // yield token ids are always 66 characters, ie: "0x" + 64 hex characters
    // (whereas principal tokens are shorter in length)
    idHex.length === 66 &&
    // yield token ids always start with 0x8 (1 in binary)
    idHex.startsWith("0x8") &&
    // This is a special yield token used for accounting in the
    // pools, disregard it.
    idHex !== UNLOCKED_YT_ID;

  return isYT;
}
