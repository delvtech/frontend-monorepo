import { getDefaultProvider } from "ethers";
import { ElementClient } from "src/client";
import goerliAddresses from "./goerliAddresses.json";
import { MultiPool } from "src/models/MultiPool";

const chainId = 5;
const provider = getDefaultProvider(chainId);

async function example() {
  const client = new ElementClient({ chainId, provider });
  const multiPool = new MultiPool({
    address: goerliAddresses.USDC_Pool,
    client,
  });
  const multiTerm = await multiPool.getTerm();
  const baseAsset = await multiTerm.getBaseAsset();
  const yieldSource = await multiTerm.getYieldSource();

  console.log({
    multiPool,
    multiTerm,
    baseAsset,
    yieldSource,
  });
}

example();
