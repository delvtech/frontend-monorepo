import { getDefaultProvider } from "ethers";
import { ElementContext } from "src/context";
import goerliAddresses from "./goerliAddresses.json";
import { MultiPool } from "src/models/MultiPool";

const chainId = 5;
const provider = getDefaultProvider(process.env.PROVIDER_URI || chainId);

async function example(): Promise<void> {
  const context = new ElementContext({ chainId, provider });
  const usdcMultiPool = new MultiPool(goerliAddresses.USDC_Pool, context);

  const pools = await usdcMultiPool.getPools();
  const firstPool = pools[0];
  const firstPoolId = pools[0].id;

  console.log(await firstPool.getSpotPrice());
  // console.log(await firstPool.getTVL());
  // const usdcMultiTerm = await usdcMultiPool.getMultiTerm();
  // const usdcTerm = await usdcMultiTerm.getTerm(firstPoolId);
  // // console.log(await usdcTerm?.getTVL());
  // console.log(await usdcMultiTerm.getTVL());
  console.log(await firstPool.getFixedAPR());
  // console.log(usdcMultiTerm.address);
  // console.log(firstPoolId);

  // console.log(await firstPool.getSpotPrice());
}

example();
