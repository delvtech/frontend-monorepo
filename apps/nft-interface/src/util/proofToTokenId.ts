import { BigNumber } from "ethers";
import { ProofData } from "src/types";

export const proofToTokenId = (data?: ProofData): string | undefined =>
  data?.leaf.tokenId
    ? BigNumber.from(data?.leaf.tokenId).toString()
    : undefined;
