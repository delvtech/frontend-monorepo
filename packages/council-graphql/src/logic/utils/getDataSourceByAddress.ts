import { CouncilContext } from "src/logic/context";

export function getDataSourceByAddress(
  address: string,
  dataSources: CouncilContext["dataSources"],
) {
  return Object.values(dataSources).find(
    (dataSource) => dataSource.address === address,
  );
}
