import { ContractTransaction, Signer } from "ethers";
import { defaultAbiCoder, parseUnits } from "ethers/lib/utils";

import { Tranche } from "src/types/Tranche";
import { USDC } from "src/types/USDC";
import { Vault } from "src/types/Vault";
import { WETH } from "src/types/WETH";

import { MAX_ALLOWANCE } from "src/maxAllowance";

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
export async function initializeConvergentPool(
  poolId: string,
  signer: Signer,
  vaultContract: Vault,
  baseAssetContract: WETH | USDC,
  trancheContract: Tranche,
  amountIn: string,
): Promise<ContractTransaction> {
  const signerAddress = await signer.getAddress();
  // tokens in ascending order by address
  const { tokens } = await vaultContract.getPoolTokens(poolId);

  const baseAssetDecimals = await baseAssetContract.decimals();
  // Max amount for each asset to join the pool with. the initial join only allows base asset.  this
  // has something to do with the way we keep track of the yield asset price based off of swaps.  to
  // initialize the pool with yield asset we need to follow up the joinPool by swapping in some
  // yield asset for some base asset.

  const parseToken = (value: string) => parseUnits(value, baseAssetDecimals);

  const maxAmountsIn = [parseToken(amountIn), parseToken(amountIn)];

  // Whether or not to use balances held in balancer.  Since The Vault has nothing, set this to false.
  const fromInternalBalance = false;

  // Allow balancer pool to take user's fyt and base tokens
  await baseAssetContract
    .connect(signer)
    .approve(vaultContract.address, MAX_ALLOWANCE);
  await trancheContract
    .connect(signer)
    .approve(vaultContract.address, MAX_ALLOWANCE);

  // Balancer V2 vault allows userData as a way to pass props through to pool contracts.  In our
  // case we need to pass the maxAmountsIn.
  const userData = defaultAbiCoder.encode(["uint256[]"], [maxAmountsIn]);

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
