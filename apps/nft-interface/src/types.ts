import { BigNumber, BytesLike } from "ethers";

type TokenId = BigNumber;

type Proof = BytesLike[];

type Leaf = {
  address: string;
  tokenId: TokenId;
};

export interface ProofData {
  leaf: Leaf;
  proof: Proof;
}

export type ProofDataResponse = Array<ProofData>;

export type NullableAddress = string | null | undefined;

export interface DayCount {
  date: string;
  count: number;
}
