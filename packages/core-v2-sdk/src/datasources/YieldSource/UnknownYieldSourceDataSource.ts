import { YieldSourceDataSource } from "./YieldSourceDataSource";
import { CachedDataSource } from "src/datasources/CachedDataSource";

export class UnknownYieldSourceDataSource
  extends CachedDataSource
  implements YieldSourceDataSource
{
  address: string;

  constructor(address: string) {
    super();
    this.address = address;
  }

  async getName(): Promise<string> {
    return this.cached("getName", async () => "Unnamed YieldSource");
  }
}
