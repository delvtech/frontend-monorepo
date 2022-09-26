import { ElementClient } from "src/client";
import { MultiTermDataSource } from "src/datasources/MultiTerm/MultiTermDataSource";
import { MultiTermContractDataSource } from "src/datasources/MultiTerm/MultiTermContractDataSource";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";
import { Term } from "./Term";

export class MultiTerm {
  address: string;
  client: ElementClient;
  dataSource: MultiTermDataSource;

  constructor(
    address: string,
    client: ElementClient,
    dataSource?: MultiTermDataSource,
  ) {
    this.address = address;
    this.client = client;
    this.dataSource =
      dataSource ??
      client.setDataSource(
        { address },
        new MultiTermContractDataSource(address, client.provider),
      );
  }

  async getTerm(expiryTimestamp: number): Promise<Term | null> {
    // TODO: should this validate that the term exists?
    return new Term(expiryTimestamp, this.client, this);
  }

  async getTerms(fromBlock?: number, toBlock?: number): Promise<Term[]> {
    const termIds = await this.dataSource.getTermIds(fromBlock, toBlock);
    return termIds.map((id) => new Term(id, this.client, this));
  }

  async getYieldSource(): Promise<YieldSource | null> {
    const address = await this.dataSource.getYieldSource();
    if (!address) {
      return null;
    }
    return new YieldSource(address, this.client);
  }

  async getBaseAsset(): Promise<Token> {
    const address = await this.dataSource.getBaseAsset();
    return new Token(address, this.client);
  }

  getDecimals(): Promise<number> {
    return this.dataSource.getDecimals();
  }

  // TODO:
  async getTVL(atBlock: number): Promise<string> {
    return "0";
  }
}
