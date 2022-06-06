import { BigNumber } from "ethers";
import { getPrincipalTokenInfoForPool } from "elf/pools/getPrincipalTokenInfoForPool";
import { PoolInfo } from "elf/pools/PoolInfo";
import { assetProxyContractsByAddress } from "elf/tranche/positions";
import { trancheContractsByAddress } from "elf/tranche/tranches";

export async function fetchAccumulatedInterestForTranche(
  poolInfo: PoolInfo,
): Promise<BigNumber> {
  const {
    address: trancheAddress,
    extensions: { position: vaultAssetProxyAddress },
  } = getPrincipalTokenInfoForPool(poolInfo);

  const trancheContract = trancheContractsByAddress[trancheAddress];
  const yVaultAssetProxy = assetProxyContractsByAddress[vaultAssetProxyAddress];

  // this is the amount of underlying that has been deposited into the tranche.
  const balanceOfUnderlying = await trancheContract.valueSupplied();

  // the wrapped position has shares of a yearn vault.  this returns the base asset value of the
  // shares that this tranche has.  the method is poorly named.
  const valueOfSharesInUnderlying = await yVaultAssetProxy.balanceOfUnderlying(
    trancheAddress,
  );

  return valueOfSharesInUnderlying.sub(balanceOfUnderlying);
}
