import { getDefaultProvider, providers } from "ethers";
import { MultiPoolContractDataSource } from "src/datasources/MultiPool/MultiPoolContractDataSource";
import { MultiPoolDataSource } from "src/datasources/MultiPool/MultiPoolDataSource";
import { MultiTermContractDataSource } from "src/datasources/MultiTerm/MultiTermContractDataSource";
import { MultiTermDataSource } from "src/datasources/MultiTerm/MultiTermDataSource";
import { TokenContractDataSource } from "src/datasources/Token/TokenContractDataSource";
import { TokenDataSource } from "src/datasources/Token/TokenDataSource";
import { ElementClient } from "src/client";
import goerliAddresses from "./goerliAddresses.json";

const chainId = 5;
const provider = getDefaultProvider(chainId);

class Token {
  address: string;
  dataSource: TokenDataSource;

  constructor(
    address: string,
    provider: providers.BaseProvider,
    dataSource?: TokenDataSource,
  ) {
    this.address = address;
    this.dataSource =
      dataSource || new TokenContractDataSource({ address, provider });
  }
}

class MultiTerm {
  address: string;
  dataSource: MultiTermDataSource;
  provider: providers.BaseProvider;

  constructor(
    address: string,
    provider: providers.BaseProvider,
    dataSource?: MultiTermDataSource,
  ) {
    this.address = address;
    this.dataSource =
      dataSource ?? new MultiTermContractDataSource({ address, provider });
    this.provider = provider;
  }

  async getBaseAsset(): Promise<Token> {
    const address = await this.dataSource.getBaseAsset();
    return new Token(address, this.provider);
  }
}

class MultiPool {
  address: string;
  dataSource: MultiPoolDataSource;
  provider: providers.BaseProvider;

  constructor(
    address: string,
    client: ElementClient,
    dataSource?: MultiPoolDataSource,
  ) {
    this.address = address;
    this.provider = provider;
    this.dataSource =
      dataSource ??
      setDataSourceByAddress(
        new MultiPoolContractDataSource({ address, provider }),
        client,
      );
  }

  async getTerm(): Promise<MultiTerm> {
    const address = await this.dataSource.getMultiTerm();
    return new MultiTerm(address, this.provider);
  }
}

async function example() {
  const client = new ElementClient({ chainId, provider, dataSources: [] });
  const multiPool = new MultiPool(goerliAddresses.USDC_Pool, client);
  const multiTerm = await multiPool.getTerm();
  const baseAsset = await multiTerm.getBaseAsset();

  console.log({
    multiPool,
    multiTerm,
    baseAsset,
  });
}

example();

function getDataSourceByAddress<T>(address: string, client: ElementClient) {
  const dataSource = client.dataSources.find(
    (dataSource) => dataSource.address === address,
  );
  return dataSource ? (dataSource as T) : null;
}

function setDataSourceByAddress<T extends Record<string, any>>(
  dataSource: T,
  client: ElementClient,
) {
  if (!getDataSourceByAddress(dataSource.address, client)) {
    client.dataSources.push(dataSource);
  }

  return dataSource;
}
