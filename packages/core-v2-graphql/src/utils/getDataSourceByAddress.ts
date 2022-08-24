import { CoreV2Context } from "src/context";

type CoreV2DataSources = CoreV2Context["elementDataSources"];
type DataSource = CoreV2DataSources[keyof CoreV2DataSources][number];

export function getDataSourceByAddress(
  address: string,
  dataSources: CoreV2DataSources[keyof CoreV2DataSources],
): DataSource | undefined {
  return dataSources.find(
    (dataSource: { address: string }) => dataSource.address === address,
  );
}
