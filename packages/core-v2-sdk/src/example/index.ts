import { constants, getDefaultProvider, Wallet } from "ethers";
import { ElementContext } from "src/context";
import goerliAddresses from "./goerliAddresses.json";
import { MultiPool } from "src/models/MultiPool";
import { Token } from "..";

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
  // const firstPoolId = pools[0].id;

  // console.log(await firstPool.getSpotPrice());
  const firstPoolId = firstPool.id;

  console.log(firstPool.provideLiquidity(wallet, "50000", "0"));

  // console.log(await firstPool.getSpotPrice());

  const term = await firstPool.getTerm();
  // console.log(await term.multiTerm.getTVL());
  // console.log(await term.mint(wallet, "10000"));
  const dai = new Token("0xB09FB09D0B77d8F11D431E906BA73b38a71922b0", context);
  console.log(
    await dai.approve(wallet, "0x5a063D2Bfcf35192B10ba756a6256f084992F5d7"),
  );
}

example();
