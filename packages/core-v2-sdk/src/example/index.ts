import { getDefaultProvider } from "ethers";
import { ElementContext } from "src/context";
import goerliAddresses from "./goerliAddresses.json";
import { MultiPool } from "src/models/MultiPool";

const chainId = 5;
const provider = getDefaultProvider(chainId);

async function example(): Promise<void> {
  const context = new ElementContext({ chainId, provider });
  const usdcMultiPool = new MultiPool(goerliAddresses.USDC_Pool, context);
  const usdc = await usdcMultiPool.getBaseAsset();
  const usdcPools = await usdcMultiPool.getPools();

  console.log({
    usdc,
    usdcPools,
  });
}

example();
