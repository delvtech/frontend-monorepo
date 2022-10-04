import { Signer } from "ethers";

export interface PoolReserves {
  bonds: string;
  shares: string;
}

export interface PoolParameters {
  mu: string;
  timeStretch: string;
}

export interface MintResponse {
  principalTokens: string;
  yieldTokens: string;
}
