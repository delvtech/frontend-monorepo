import { Signer } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { ERC20__factory } from "src/types/factories/ERC20__factory";
import { Vault } from "src/types/Vault";
import { queryBatchSwap } from "./queryBatchSwap";

export async function printSpotPriceForPool(
  vault: Vault,
  poolId: string,
  signer: Signer,
): Promise<void> {
  const sender = await signer.getAddress();
  const tokenInfo = await vault.getPoolTokens(poolId);
  const [tokens] = tokenInfo;
  const token0 = ERC20__factory.connect(tokens[0], signer);
  const token0Name = await token0.symbol();
  const token0Decimals = await token0.decimals();

  const token1 = ERC20__factory.connect(tokens[1], signer);
  const token1Name = await token1.symbol();
  const token1Decimals = await token1.decimals();

  const swapRx = await queryBatchSwap(
    token0,
    token1,
    poolId,
    sender,
    vault,
    ".01",
  );
  const swap0 = +formatUnits(swapRx[0], token0Decimals);
  const swap1 = +formatUnits(swapRx[1], token1Decimals);
  console.log(`${token1Name}/${token0Name}`, Math.abs(swap1 / swap0));
}
