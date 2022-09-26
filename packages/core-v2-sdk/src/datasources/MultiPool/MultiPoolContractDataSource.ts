import { providers } from "ethers";
import { Pool, Pool__factory } from "@elementfi/core-v2-typechain";
import { ContractDataSource } from "src/datasources/ContractDataSource";
import { MultiPoolDataSource } from "./MultiPoolDataSource";

export class MultiPoolContractDataSource
  extends ContractDataSource<Pool>
  implements MultiPoolDataSource
{
  constructor(address: string, provider: providers.BaseProvider) {
    super(Pool__factory.connect(address, provider));
  }

  getPoolIds(fromBlock?: number, toBlock?: number): Promise<number[]> {
    return this.cached(["getPoolIds", fromBlock, toBlock], async () => {
      const eventFilter = this.contract.filters.PoolRegistered();
      const events = await this.contract.queryFilter(
        eventFilter,
        fromBlock,
        toBlock,
      );
      return events.map((event) => event.args.poolId.toNumber());
    });
  }

  getMultiTerm(): Promise<string> {
    return this.call("term", []);
  }

  async getReserves(tokenId: string): Promise<{
    shares: string;
    bonds: string;
  }> {
    const [sharesBigNumber, bondsBigNumber] = await this.call("reserves", [
      tokenId,
    ]);
    return {
      shares: sharesBigNumber.toString(),
      bonds: bondsBigNumber.toString(),
    };
  }

  async getShareReserves(tokenId: string): Promise<string> {
    const { shares } = await this.getReserves(tokenId);
    return shares;
  }

  async getBondReserves(tokenId: string): Promise<any> {
    const { bonds } = await this.getReserves(tokenId);
    return bonds;
  }
}
