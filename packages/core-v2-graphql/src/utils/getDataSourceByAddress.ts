import { CoreV2Context } from "src/context";

type CoreV2DataSources = CoreV2Context["elementDataSources"];

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export function getDataSourceByAddress(
  address: string,
  dataSources: CoreV2DataSources[keyof CoreV2DataSources],
): ArrElement<CoreV2DataSources[keyof CoreV2DataSources]> | undefined {
  return dataSources.find(
    (dataSource: { address: string }) => dataSource.address === address,
  );
}
