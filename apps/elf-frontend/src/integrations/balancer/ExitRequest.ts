import { BigNumber, BytesLike } from "ethers";

export interface ExitRequest {
  assets: string[];
  minAmountsOut: BigNumber[];
  userData: BytesLike;
  toInternalBalance: boolean;
}
