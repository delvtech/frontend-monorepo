import { providers } from "ethers";
import {
  CompoundV3Term,
  CompoundV3Term__factory,
} from "@elementfi/core-v2-typechain";
import { ContractDataSource } from "src/datasources/ContractDataSource";
import { MultiTermContractDataSource } from "./MultiTermContractDataSource";

export class CompoundV3TermContractDataSource extends MultiTermContractDataSource {
  contract: CompoundV3Term;

  constructor(address: string, provider: providers.Provider) {
    super(address, provider);
    this.contract = CompoundV3Term__factory.connect(address, provider);
  }

  getYieldSourceAddress(
    this: ContractDataSource<CompoundV3Term>,
  ): Promise<string> {
    return this.call("yieldSource", []);
  }
}
