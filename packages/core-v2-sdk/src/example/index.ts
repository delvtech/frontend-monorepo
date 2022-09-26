import { getDefaultProvider } from "ethers";
import { ElementClient } from "src/client";
import goerliAddresses from "./goerliAddresses.json";
import { MultiPool } from "src/models/MultiPool";

const chainId = 5;
const provider = getDefaultProvider(chainId);

async function example(): Promise<void> {
  const client = new ElementClient({ chainId, provider });
  const multiPool = new MultiPool(goerliAddresses.USDC_Pool, client);
  const usdc = await multiPool.getBaseAsset();

  const name = await usdc.getName();
  // const price = await usdc.getPrice("usd");

  console.log({
    name,
  });
}

example();

console.log("done");

export {};
