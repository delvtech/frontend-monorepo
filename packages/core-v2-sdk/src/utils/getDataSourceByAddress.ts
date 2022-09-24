import { ElementClient } from "src/client";

export function getDataSourceByAddress<T extends { address: string }>(
  address: string,
  client: ElementClient,
): T | null {
  const dataSource = client.dataSources.find(
    (dataSource) => dataSource.address === address,
  );
  return dataSource ? (dataSource as T) : null;
}
