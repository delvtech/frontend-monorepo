import { BigNumber, BytesLike } from "ethers";

export interface JoinRequest {
  assets: string[];
  maxAmountsIn: BigNumber[];
  userData: BytesLike;
  fromInternalBalance: boolean;
}
