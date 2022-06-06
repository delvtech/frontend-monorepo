import { BigNumber } from "ethers";

import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { PoolInfo } from "elf/pools/PoolInfo";
import { getPrincipalTokenInfoForPool } from "elf/pools/getPrincipalTokenInfoForPool";
import { trancheContractsByAddress } from "elf/tranche/tranches";
import { assetProxyContractsByAddress } from "elf/tranche/positions";

export function useAccumulatedInterestForTranche(
  poolInfo: PoolInfo,
): BigNumber | undefined {
  const {
    address: trancheAddress,
    extensions: { position: vaultAssetProxyAddress },
  } = getPrincipalTokenInfoForPool(poolInfo);

  const trancheContract = trancheContractsByAddress[trancheAddress];

  // this is the amount of underlying that has been deposited into the tranche.
  const { data: balanceOfUnderlying } = useSmartContractReadCall(
    trancheContract,
    "valueSupplied",
  );

  const yVaultAssetProxy = assetProxyContractsByAddress[vaultAssetProxyAddress];

  // the wrapped position has shares of a yearn vault.  this returns the base asset value of the
  // shares that this tranche has.  the method is poorly named.
  const { data: valueOfSharesInUnderlying } = useSmartContractReadCall(
    yVaultAssetProxy,
    "balanceOfUnderlying",
    {
      callArgs: [trancheAddress],
    },
  );

  if (!valueOfSharesInUnderlying || !balanceOfUnderlying) {
    return undefined;
  }

  return valueOfSharesInUnderlying.sub(balanceOfUnderlying);
}
