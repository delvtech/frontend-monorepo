import { BigNumber, Signer } from "ethers";
import { defaultAbiCoder, parseEther, parseUnits } from "ethers/lib/utils";
import { MAX_ALLOWANCE } from "src/maxAllowance";
import { WeightedPool } from "src/types";
import { InterestToken__factory } from "src/types/factories/InterestToken__factory";

import { Tranche } from "src/types/Tranche";
import { USDC } from "src/types/USDC";
import { Vault } from "src/types/Vault";
import { WeightedPoolFactory } from "src/types/WeightedPoolFactory";
import { WETH } from "src/types/WETH";

import { deployWeightedPool } from "./deployWeightedPool";

// JoinKind from WeightedPool.sol
enum JoinKind {
  INIT,
  ALL_TOKENS_IN_FOR_EXACT_BPT_OUT,
  TOKEN_IN_FOR_EXACT_BPT_OUT,
}

export async function setupInterestTokenPool(
  signer: Signer,
  trancheContract: Tranche,
  balancerVaultContract: Vault,
  baseAssetContract: WETH | USDC,
  poolFactory: WeightedPoolFactory,
  options: { swapFee: string; baseAssetIn: string; yieldAssetIn: string },
): Promise<{ poolId: string; poolContract: WeightedPool }> {
  const { baseAssetIn, yieldAssetIn } = options;
  const signerAddress = await signer.getAddress();
  const baseAssetSymbol = await baseAssetContract.symbol();
  const baseAssetDecimals = await baseAssetContract.decimals();
  const parseToken = (value: string) => parseUnits(value, baseAssetDecimals);

  // deploy an interest token pool
  const interestTokenAddress = await trancheContract.interestToken();
  const interestTokenContract = InterestToken__factory.connect(
    interestTokenAddress,
    signer,
  );

  const interestTokenValue = BigNumber.from(interestTokenAddress);
  const baseAssetValue = BigNumber.from(baseAssetContract.address);

  let poolTokens = [baseAssetContract.address, interestTokenAddress];
  // weights must be normalized now, so they have to add up to 1
  let weights = [parseEther(".5"), parseEther(".5")];
  let maxAmountsIn = [parseToken(baseAssetIn), parseToken(yieldAssetIn)];
  let amounts = [
    parseToken(baseAssetIn).toHexString(),
    parseToken(yieldAssetIn).toHexString(),
  ];
  if (interestTokenValue.lt(baseAssetValue)) {
    poolTokens = poolTokens.reverse();
    weights = weights.reverse();
    maxAmountsIn = maxAmountsIn.reverse();
    amounts = amounts.reverse();
  }

  const { poolId, poolContract } = await deployWeightedPool(
    signer,
    balancerVaultContract,
    poolFactory,
    `Element ${baseAssetSymbol} - ey${baseAssetSymbol}`,
    `${baseAssetSymbol}-ey${baseAssetSymbol}`,
    poolTokens,
    weights,
    "0.003",
  );

  await interestTokenContract
    .connect(signer)
    .approve(balancerVaultContract.address, MAX_ALLOWANCE);

  // this encodes the joinKind and the amountsIn.
  const userData = defaultAbiCoder.encode(
    ["uint8", "uint256[]"],
    [JoinKind.INIT, amounts],
  );

  // the amounts to put in.  they are 'max' because pools will figure out the exact ratio's required
  // for the pool's weight requirements.
  const joinRequest = {
    assets: poolTokens,
    maxAmountsIn,
    userData,
    fromInternalBalance: false,
  };

  const joinTxReceipt = await balancerVaultContract.joinPool(
    poolId,
    signerAddress,
    signerAddress,
    joinRequest,
  );

  await joinTxReceipt.wait(1);

  return {
    poolId,
    poolContract,
  };
}
