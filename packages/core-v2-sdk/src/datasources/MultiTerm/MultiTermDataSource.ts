import { BigNumber, Signer } from "ethers";
import { MintResponse } from "src/types";

export interface MultiTermDataSource {
  address: string;
  getTermIds: (fromBlock?: number, toBlock?: number) => Promise<string[]>;
  getCreatedAtBlock: (termId: string) => Promise<number | null>;
  getYieldSource: () => Promise<string | null>;
  getBaseAsset: () => Promise<string>;
  getSymbol: (termId: string) => Promise<string>;
  getDecimals: () => Promise<number>;
  getName: (termId: string) => Promise<string>;
  getBalanceOf: (termId: string, address: string) => Promise<string>;
  getUnlockedPricePerShare: () => Promise<string>;
  getTotalSupply: (termId: string) => Promise<string>;
  lock: (
    signer: Signer,
    termId: string,
    assetIds: string[],
    assetAmounts: string[],
    amount: BigNumber,
    ptDestination: string,
    ytDestination: string,
    ytBeginDate: number,
    hasPreFunding: boolean,
  ) => Promise<MintResponse>;
}
