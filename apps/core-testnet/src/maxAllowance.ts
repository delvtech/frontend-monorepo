import { BigNumber } from "ethers";

/**
 * the erc20 allowance() method takes a unit256, therefore the max you can approve is 2^256 - 1
 */
export const MAX_ALLOWANCE = BigNumber.from(
  "115792089237316195423570985008687907853269984665640564039457584007913129639935",
);
