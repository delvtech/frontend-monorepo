import { Term } from "./Term";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";

export interface MultiTermFields {
  address: string;
  yieldSource: YieldSource;
  // baseAsset: Token;
  // terms: Term[];
  // totalVolume: string;
  // perDayVolume: string;
  // yields: string[];
}

export class MultiTerm {
  address: string;
  yieldSource: YieldSource;
  // baseAsset: Token;
  // terms: Term[];
  // totalVolume: string;
  // perDayVolume: string;
  // yields: string[];

  constructor({
    address,
    yieldSource,
  }: // baseAsset,
  // terms,
  // totalVolume,
  // perDayVolume,
  // yields,
  MultiTermFields) {
    this.address = address;
    this.yieldSource = yieldSource;
    // this.baseAsset = baseAsset;
    // this.terms = terms;
    // this.totalVolume = totalVolume;
    // this.perDayVolume = perDayVolume;
    // this.yields = yields;
  }
}
