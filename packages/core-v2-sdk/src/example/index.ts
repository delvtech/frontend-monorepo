import { getDefaultProvider } from "ethers";
import { ElementClient } from "src/client";
import { MultiPoolContractDataSource } from "src/datasources/MultiPool/MultiPoolContractDataSource";
import { ERC4626TermContractDataSource } from "src/datasources/MultiTerm/ERC4626TermContractDataSource";
import goerliAddresses from "./goerliAddresses.json";

const chainId = 5;
const provider = getDefaultProvider(chainId);

const usdcMultiTerm = new ERC4626TermContractDataSource({
  address: goerliAddresses.USDC_Term,
  provider,
  yieldSource: goerliAddresses.yvUSDC,
});

const usdcMultiPool = new MultiPoolContractDataSource({
  address: goerliAddresses.USDC_Pool,
  provider,
  multiTerm: usdcMultiTerm,
});

const element = new ElementClient({
  chainId,
  provider,
  multiPools: [usdcMultiPool],
  expiryTimestamps: [1665179436, 1667771436, 1670363436],
});

const multiPool = element.multiPools.get(goerliAddresses.USDC_Pool);

console.log(multiPool);
