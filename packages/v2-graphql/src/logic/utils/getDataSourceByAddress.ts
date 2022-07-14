import { V2Context } from "src/logic/context";

export function getDataSourceByAddress(
  address: string,
  dataSources: V2Context["elementDataSources"],
): any | undefined {
  return dataSources.find(
    (dataSource: { address: string }) => dataSource.address === address,
  );
}
