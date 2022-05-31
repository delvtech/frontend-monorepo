import { BigNumberish, Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { WeightedPool } from "src/types";

import { WeightedPool__factory } from "src/types/factories/WeightedPool__factory";
import { Vault } from "src/types/Vault";
import { WeightedPoolFactory } from "src/types/WeightedPoolFactory";

export async function deployWeightedPool(
  signer: Signer,
  vaultContract: Vault,
  poolFactory: WeightedPoolFactory,
  name: string,
  symbol: string,
  tokens: string[],
  weights: BigNumberish[],
  swapFee: string,
): Promise<{ poolId: string; poolContract: WeightedPool }> {
  const signerAddress = await signer.getAddress();
  const createTx = await poolFactory.create(
    name,
    symbol,
    tokens,
    weights,
    parseEther(swapFee),
    signerAddress,
  );
  await createTx.wait(1);

  const filter = poolFactory.filters.PoolCreated(null);
  const results = await poolFactory.queryFilter(filter);
  const poolAddress = results[results.length - 1]?.args?.[0];

  const poolContract = WeightedPool__factory.connect(poolAddress, signer);
  const poolId = await poolContract.getPoolId();
  return { poolId, poolContract };
}
