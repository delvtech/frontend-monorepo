import { CoreV2Context } from "src/context";

export function getDataSourceByAddress(
  address: string,
  dataSources: CoreV2Context["elementDataSources"],
  key: keyof CoreV2Context["elementDataSources"],
): any | undefined {
  return dataSources[key].find(
    (dataSource: { address: string }) => dataSource.address === address,
  );
}
