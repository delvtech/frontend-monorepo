import { ElementContext } from "src/context";
import { YieldSourceDataSource } from "src/datasources/YieldSource/YieldSourceDataSource";
import { UnknownYieldSourceDataSource } from "src/datasources/YieldSource/UnknownYieldSourceDataSource";

export class YieldSource {
  address: string;
  context: ElementContext;
  dataSource: YieldSourceDataSource;

  constructor(
    address: string,
    context: ElementContext,
    dataSource?: YieldSourceDataSource,
  ) {
    this.address = address;
    this.context = context;
    this.dataSource =
      dataSource ??
      context.registerDataSource(
        { address },
        new UnknownYieldSourceDataSource(address),
      );
  }

  getName(): Promise<string> {
    return this.dataSource.getName();
  }
}
