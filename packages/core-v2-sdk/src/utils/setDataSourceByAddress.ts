import { ElementClient } from "src/client";
import { getDataSourceByAddress } from "./getDataSourceByAddress";

export function setDataSourceByAddress<T extends { address: string }>(
  dataSource: T,
  client: ElementClient,
): T {
  if (!getDataSourceByAddress(dataSource.address, client)) {
    client.dataSources.push(dataSource);
  }

  return dataSource;
}
