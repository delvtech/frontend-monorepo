import { providers } from "ethers";
import {
  ERC4626Term,
  ERC4626Term__factory,
} from "@elementfi/core-v2-typechain";
import { ContractDataSource } from "src/datasources/ContractDataSource";
import { MultiTermContractDataSource } from "./MultiTermContractDataSource";

export class ERC4626TermContractDataSource extends MultiTermContractDataSource {
  contract: ERC4626Term;

  constructor(address: string, provider: providers.Provider) {
    super(address, provider);
    this.contract = ERC4626Term__factory.connect(address, provider);
  }

  getYieldSourceAddress(
    this: ContractDataSource<ERC4626Term>,
  ): Promise<string> {
    return this.call("vault", []);
  }
}
