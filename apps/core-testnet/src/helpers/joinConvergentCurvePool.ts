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
export async function joinConvergentCurvePool(
  poolId: string,
  signer: Signer,
  vaultContract: Vault,
  tokens: string[],
  baseAssetDecimals: number,
  maxAmountIn: string,
): Promise<ContractTransaction> {
  const signerAddress = await signer.getAddress();
  const parseToken = (value: string) => parseUnits(value, baseAssetDecimals);

  // just do same amounts for each, balancer will figure out how much of each you need.
  const maxAmountsIn = [parseToken(maxAmountIn), parseToken(maxAmountIn)];
  // Balancer V2 vault allows userData as a way to pass props through to pool contracts.  In our
  // case we need to pass the maxAmountsIn.
  const userData = defaultAbiCoder.encode(["uint256[]"], [maxAmountsIn]);

  // Whether or not to use balances held in balancer.  Since The Vault has nothing, set this to false.
  const fromInternalBalance = false;

  const joinRequest = {
    assets: tokens,
    maxAmountsIn,
    userData,
    fromInternalBalance,
  };
  const joinReceipt = await vaultContract.joinPool(
    poolId,
    signerAddress,
    signerAddress,
    joinRequest,
  );
  await joinReceipt.wait(1);
  return joinReceipt;
}
