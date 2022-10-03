import { getDefaultProvider, Signer, Wallet } from "ethers";
import { ElementContext } from "src/context";
import goerliAddresses from "./goerliAddresses.json";
import { MultiPool } from "src/models/MultiPool";
import { getCurrentBlockTimestamp } from "src/utils/ethereum/getCurrentBlockNumber";

const chainId = 5;
const provider = getDefaultProvider(process.env.PROVIDER_URI || chainId);

const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function example(): Promise<void> {
  const context = new ElementContext({ chainId, provider });
  const usdcMultiPool = new MultiPool(goerliAddresses.USDC_Pool, context);
  if (!PRIVATE_KEY) {
    throw new Error("Add private key to env!");
  }
  const wallet = new Wallet(PRIVATE_KEY, provider);

  const pools = await usdcMultiPool.getPools();
  const firstPool = pools[0];
  const firstPoolId = pools[0].id;

  // console.log(await firstPool.getSpotPrice());
  // console.log(await firstPool.getTVL());
  // const usdcMultiTerm = await usdcMultiPool.getMultiTerm();
  // const usdcTerm = await usdcMultiTerm.getTerm(firstPoolId);
  // // console.log(await usdcTerm?.getTVL());
  // console.log(await usdcMultiTerm.getTVL());
  // console.log(await firstPool.getFixedAPR());
  // console.log(usdcMultiTerm.address);
  // console.log(firstPoolId);

  // console.log(await firstPool.getSpotPrice());

  const currentBlockTimestamp = await getCurrentBlockTimestamp(provider);

  const term = await firstPool.getTerm();
  console.log(
    await term.mint({
      signer: wallet,
      amount: (10_000 * 1e6).toString(),
      ptDestination: wallet.address,
      ytDestination: wallet.address,
      ytBeginDate: currentBlockTimestamp + 1000,
      hasPrefunding: false,
    }),
  );
}

example();
