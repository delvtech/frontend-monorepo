import { ContractTransaction, Signer } from "ethers";
import { printSpotPriceForPool } from "src/scripts/printSpotPriceForPool";
import { printTokenInfoForPool } from "src/scripts/printTokenInfoForPool";

import { ERC20 } from "src/types/ERC20";
import { Tranche } from "src/types/Tranche";
import { USDC } from "src/types/USDC";
import { Vault } from "src/types/Vault";
import { WETH } from "src/types/WETH";

import { batchSwapIn } from "./batchSwapIn";
import { initializeConvergentPool } from "./initializeConvergentPool";
import { mintTrancheAssets } from "./mintTrancheAssets";

export async function setupPrincipalTokenPool(
  signer: Signer,
  balancerVaultContract: Vault,
  poolId: string,
  baseAssetContract: WETH | USDC,
  trancheContract: Tranche,
  options: { mintAmount: string; baseAssetIn: string; yieldAssetIn: string },
): Promise<ContractTransaction> {
  const { baseAssetIn, yieldAssetIn, mintAmount } = options;
  const sender = await signer.getAddress();

  // put base asset into market
  await initializeConvergentPool(
    poolId,
    signer,
    balancerVaultContract,
    baseAssetContract,
    trancheContract,
    baseAssetIn,
  );

  // mint some tranche assets
  await mintTrancheAssets(
    signer,
    baseAssetContract,
    trancheContract,
    mintAmount,
  );

  // trade some tranche assets for some base assets
  const swapReceipt = await batchSwapIn(
    trancheContract as unknown as ERC20,
    baseAssetContract as unknown as ERC20,
    poolId,
    sender,
    balancerVaultContract,
    yieldAssetIn,
  );

  await printSpotPriceForPool(balancerVaultContract, poolId, signer);
  await printTokenInfoForPool(balancerVaultContract, poolId, signer);

  await swapReceipt.wait(1);
  return swapReceipt;
}
