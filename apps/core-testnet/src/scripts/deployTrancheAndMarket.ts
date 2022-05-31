import { Signer } from "ethers";

import { ConvergentPoolFactory } from "src/types/ConvergentPoolFactory";
import { TrancheFactory } from "src/types/TrancheFactory";
import { USDC } from "src/types/USDC";
import { Vault } from "src/types/Vault";
import { WeightedPoolFactory } from "src/types/WeightedPoolFactory";
import { WETH } from "src/types/WETH";
import { YVaultAssetProxy } from "src/types/YVaultAssetProxy";

import { deployConvergentPool } from "src/scripts/deployConvergentPool";
import { setupPrincipalTokenPool } from "src/scripts/setupPrincipalToken";
import { SIX_MONTHS_IN_SECONDS } from "src/time";

import { deployTranche } from "./deployTranche";
import { setupInterestTokenPool } from "./setupInterestTokenPool";
import { ERC20 } from "src/types/ERC20";
import { InterestToken__factory } from "src/types/factories/InterestToken__factory";
import { Tranche } from "src/types/Tranche";
import { InterestToken } from "src/types/InterestToken";
import { ConvergentCurvePool } from "src/types/ConvergentCurvePool";
import { WeightedPool } from "src/types/WeightedPool";

const defaultOptions = {
  swapFeeConvergentCurvePool: "0.1",
  swapFeeWeightedPool: ".003",
  durationInSeconds: SIX_MONTHS_IN_SECONDS,
};

export async function deployTrancheAndMarket(
  signer: Signer,
  trancheFactory: TrancheFactory,
  yearnVaultAssetProxy: YVaultAssetProxy,
  baseAssetContract: WETH | USDC,
  balancerVaultContract: Vault,
  convergentPoolFactory: ConvergentPoolFactory,
  weightedPoolFactory: WeightedPoolFactory,
  options: {
    swapFeeConvergentCurvePool?: string;
    swapFeeWeightedPool?: string;
    durationInSeconds?: number;
    baseAssetIn: string;
    yieldAssetIn: string;
    ytBaseAssetIn: string;
    ytYieldAssetIn: string;
    mintAmount: string;
  },
): Promise<{
  trancheContract: Tranche;
  interestTokenContract: InterestToken;
  fytPoolContract: ConvergentCurvePool;
  fytPoolId: string;
  ycPoolContract: WeightedPool;
  ycPoolId: string;
}> {
  const {
    swapFeeConvergentCurvePool,
    swapFeeWeightedPool,
    durationInSeconds,
    baseAssetIn,
    yieldAssetIn,
    ytBaseAssetIn,
    ytYieldAssetIn,
    mintAmount,
  } = {
    ...defaultOptions,
    ...options,
  };

  const expiration = durationInSeconds + Math.round(Date.now() / 1000);

  // deploy a tranche
  const trancheContract = await deployTranche(
    signer,
    trancheFactory,
    yearnVaultAssetProxy,
    expiration,
  );
  const interestTokenAddress = await trancheContract.interestToken();
  const interestTokenContract = InterestToken__factory.connect(
    interestTokenAddress,
    signer,
  );

  // deploy an FYT market, seed with base asset
  const { poolId: fytPoolId, poolContract: fytPoolContract } =
    await deployConvergentPool(
      signer,
      convergentPoolFactory,
      balancerVaultContract,
      baseAssetContract,
      trancheContract as unknown as ERC20,
      { swapFee: swapFeeConvergentCurvePool, durationInSeconds },
    );

  // seed market with initial yield asset
  await setupPrincipalTokenPool(
    signer,
    balancerVaultContract,
    fytPoolId,
    baseAssetContract,
    trancheContract,
    { mintAmount, baseAssetIn, yieldAssetIn },
  );

  // now setup a yc market
  const { poolId: ycPoolId, poolContract: ycPoolContract } =
    await setupInterestTokenPool(
      signer,
      trancheContract,
      balancerVaultContract,
      baseAssetContract,
      weightedPoolFactory,
      {
        swapFee: swapFeeWeightedPool,
        baseAssetIn: ytBaseAssetIn,
        yieldAssetIn: ytYieldAssetIn,
      },
    );

  const result = {
    trancheContract,
    interestTokenContract,
    fytPoolContract,
    fytPoolId,
    ycPoolContract,
    ycPoolId,
  };
  return result;
}
