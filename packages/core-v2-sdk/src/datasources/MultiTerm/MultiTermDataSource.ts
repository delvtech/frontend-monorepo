import { BigNumber, Signer } from "ethers";
import { MintResponse } from "src/types";

export interface MultiTermDataSource {
  address: string;
  getTermIds: (fromBlock?: number, toBlock?: number) => Promise<string[]>;
  getCreatedAtBlock: (tokenId: string) => Promise<number | null>;
  getYieldSource: () => Promise<string | null>;
  getBaseAsset: () => Promise<string>;
  getSymbol: (tokenId: string) => Promise<string>;
  getDecimals: () => Promise<number>;
  getName: (tokenId: string) => Promise<string>;
  getBalanceOf: (tokenId: string, address: string) => Promise<string>;
  getUnlockedPricePerShare: () => Promise<string>;
  getTotalSupply: (tokenId: string) => Promise<string>;
  lock: (
    signer: Signer,
    termId: string,
    assetIds: string[],
    assetAmounts: string[],
    amount: string,
    ptDestination: string,
    ytDestination: string,
    ytBeginDate: number,
    hasPreFunding: boolean,
  ) => Promise<MintResponse>;
}
