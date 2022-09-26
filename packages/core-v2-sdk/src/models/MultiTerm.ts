import { ElementContext } from "src/context";
import { MultiTermDataSource } from "src/datasources/MultiTerm/MultiTermDataSource";
import { MultiTermContractDataSource } from "src/datasources/MultiTerm/MultiTermContractDataSource";
import { Token } from "./Token";
import { YieldSource } from "./YieldSource";
import { Term } from "./Term";

export class MultiTerm {
  address: string;
  context: ElementContext;
  dataSource: MultiTermDataSource;

  constructor(
    address: string,
    context: ElementContext,
    dataSource?: MultiTermDataSource,
  ) {
    this.address = address;
    this.context = context;
    this.dataSource =
      dataSource ??
      context.registerDataSource(
        { address },
        new MultiTermContractDataSource(address, context.provider),
      );
  }

  async getTerm(expiryTimestamp: number): Promise<Term | null> {
    // TODO: should this validate that the term exists?
    return new Term(expiryTimestamp, this.context, this);
  }

  async getTerms(fromBlock?: number, toBlock?: number): Promise<Term[]> {
    const termIds = await this.dataSource.getTermIds(
      fromBlock,
      toBlock ?? (await this.context.provider.getBlockNumber()),
    );
    return termIds.map((id) => new Term(id, this.context, this));
  }

  async getYieldSource(): Promise<YieldSource | null> {
    const address = await this.dataSource.getYieldSource();
    if (!address) {
      return null;
    }
    return new YieldSource(address, this.context);
  }

  async getBaseAsset(): Promise<Token> {
    const address = await this.dataSource.getBaseAsset();
    return new Token(address, this.context);
  }

  getDecimals(): Promise<number> {
    return this.dataSource.getDecimals();
  }

  // TODO:
  async getTVL(atBlock: number): Promise<string> {
    return "0";
  }
}
