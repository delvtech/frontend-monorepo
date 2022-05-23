import { Signer, ContractTransaction } from "ethers";
import { defaultAbiCoder, parseUnits } from "ethers/lib/utils";

import { Vault } from "src/types/Vault";

/**
 * Stakes an initial amount of base asset into the ConvergentCurvePool
 *
 * @param poolId
 * @param signer
 * @param vaultContract
 * @param baseAssetContract
 * @param trancheContract
 * @param amountIn
 */
export async function exitConvergentCurvePool(
  poolId: string,
  signer: Signer,
  vaultContract: Vault,
  tokens: string[],
  baseAssetDecimals: number,
  minAmountOut: string,
): Promise<ContractTransaction> {
  const signerAddress = await signer.getAddress();
  const parseToken = (value: string) => parseUnits(value, baseAssetDecimals);

  // just do same amounts for each, balancer will figure out how much of each you need.
  const minAmountsOut = [parseToken(minAmountOut), parseToken(minAmountOut)];
  // Balancer V2 vault allows userData as a way to pass props through to pool contracts.  In our
  // case we need to pass the minAmountsOut.
  const userData = defaultAbiCoder.encode(["uint256[]"], [minAmountsOut]);

  // Whether or not to use balances held in balancer.  Since The Vault has nothing, set this to false.
  const toInternalBalance = false;

  const exitRequest = {
    assets: tokens,
    minAmountsOut,
    userData,
    toInternalBalance,
  };

  const exitReceipt = await vaultContract.exitPool(
    poolId,
    signerAddress,
    signerAddress,
    exitRequest,
  );
  await exitReceipt.wait(1);
  return exitReceipt;
}
