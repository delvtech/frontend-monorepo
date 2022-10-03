import { Signer } from "ethers";

export interface PoolReserves {
  bonds: string;
  shares: string;
}

export interface PoolParameters {
  mu: string;
  timeStretch: string;
}

export interface MintParameters {
  signer: Signer;
  amount: string;
  ptDestination: string;
  ytDestination: string;
  ytBeginDate: number;
  hasPrefunding: boolean;
}

export interface MintResponse {
  principalTokens: string;
  yieldTokens: string;
}
