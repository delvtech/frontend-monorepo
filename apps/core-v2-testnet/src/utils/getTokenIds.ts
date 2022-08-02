// Utils to get PT and YT token ids
// Token ids reference the token values in the MultiToken contract

import { BigNumber, BigNumberish } from "ethers";

export function getPTId(expiry: BigNumberish): BigNumber {
  return BigNumber.from(expiry);
}

// YTs are constructed with a leading 1
const YT_FLAG = BigNumber.from(1).shl(255);

export function getYTId(start: BigNumberish, expiry: BigNumberish): BigNumber {
  // shift start by 128 bits
  const shiftedStart = BigNumber.from(start).shl(128);
  return YT_FLAG.add(shiftedStart).add(BigNumber.from(expiry));
}
