import { providers } from "ethers";
import { ERC4626, ERC4626__factory } from "@elementfi/core-v2-typechain";
import { ContractDataSource } from "src/datasources/ContractDataSource";
import { YieldSourceDataSource } from "./YieldSourceDataSource";

export class ERC4626ContractDataSource
  extends ContractDataSource<ERC4626>
  implements YieldSourceDataSource
{
  constructor(address: string, provider: providers.BaseProvider) {
    super(ERC4626__factory.connect(address, provider));
  }

  async getName(): Promise<string> {
    return this.call("name", []);
  }
}
