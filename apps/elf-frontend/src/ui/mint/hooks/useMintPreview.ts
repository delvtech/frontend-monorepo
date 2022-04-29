import {
  TestYVault,
  Tranche,
  YVaultAssetProxy,
} from "@elementfi/core-typechain/dist/v1";
import {
  AssetProxyTokenInfo,
  PrincipalTokenInfo as TrancheInfo,
} from "@elementfi/tokenlist";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { getTokenInfo } from "tokenlists/tokenlists";
import { assetProxyContractsByAddress } from "elf/tranche/positions";
import {
  getVaultContractForTranche,
  trancheContractsByAddress,
} from "elf/tranche/tranches";
import { formatUnits } from "ethers/lib/utils";

/**
 * Returns the number of Principal Tokens you'd get for minting into a tranche.
 * This is useful because in order to mint into a tranche, some amount of
 * principal must be used to cover the current earnings of the YT. This results
 * in less than 1 to 1 principal tokens for your deposit.
 */
export function useMintPreview(
  trancheInfo: TrancheInfo,
  amountIn: string,
): number | undefined {
  const trancheContract = trancheContractsByAddress[trancheInfo.address];

  const { wrappedPosition, vault, trancheDecimals } =
    getStaticInformation(trancheInfo);

  const {
    wrappedPositionDecimals,
    vaultDecimals,
    trancheValueSuppliedBN,
    trancheInterestSupplyBN,
    balanceBeforeBN,
    vaultTotalAssetsBN,
    vaultTotalSupplyBN,
  } = useSmartContractData(trancheContract, wrappedPosition, vault);

  if (
    !amountIn ||
    !trancheValueSuppliedBN ||
    !trancheInterestSupplyBN ||
    !balanceBeforeBN ||
    !vaultTotalAssetsBN ||
    !vaultTotalSupplyBN ||
    !trancheDecimals ||
    !wrappedPositionDecimals
  ) {
    return undefined;
  }

  const trancheValueSupplied = +formatUnits(
    trancheValueSuppliedBN,
    trancheDecimals,
  );
  const trancheInterestSupply = +formatUnits(
    trancheInterestSupplyBN,
    trancheDecimals,
  );
  const balanceBefore = +formatUnits(balanceBeforeBN, wrappedPositionDecimals);
  const vaultTotalAssets = +formatUnits(vaultTotalAssetsBN, vaultDecimals);
  const vaultTotalSupply = +formatUnits(vaultTotalSupplyBN, vaultDecimals);

  // avoid rounding errors for UI, don't let interest be negative
  const interestPerUnderlying = Math.max(
    ((balanceBefore * vaultTotalAssets) / vaultTotalSupply -
      trancheValueSupplied) /
      trancheInterestSupply,
    0,
  );

  const adjustedAmount = +amountIn - +amountIn * interestPerUnderlying;
  return adjustedAmount;
}

function getWrappedPositionForTranche(
  trancheInfo: TrancheInfo,
): YVaultAssetProxy {
  const { position: vaultAssetProxyAddress } = trancheInfo.extensions;

  const yVaultAssetProxy = assetProxyContractsByAddress[vaultAssetProxyAddress];

  return yVaultAssetProxy;
}

function getStaticInformation(trancheInfo: TrancheInfo) {
  const wrappedPosition = getWrappedPositionForTranche(trancheInfo);
  const vault = getVaultContractForTranche(trancheInfo.address);
  const { decimals: trancheDecimals } = trancheInfo;

  return {
    wrappedPosition,
    vault,
    trancheDecimals,
  };
}

function useSmartContractData(
  trancheContract: Tranche,
  wrappedPosition: YVaultAssetProxy,
  vault: TestYVault,
) {
  const { decimals: wrappedPositionDecimals } =
    getTokenInfo<AssetProxyTokenInfo>(wrappedPosition.address);
  // the wrapped position gets its decimal value from the vault
  const vaultDecimals = wrappedPositionDecimals;

  const { data: trancheValueSuppliedBN } = useSmartContractReadCall(
    trancheContract,
    "valueSupplied",
  );
  const { data: trancheInterestSupplyBN } = useSmartContractReadCall(
    trancheContract,
    "interestSupply",
  );

  const { data: balanceBeforeBN } = useSmartContractReadCall(
    wrappedPosition,
    "balanceOf",
    {
      callArgs: [trancheContract.address],
    },
  );

  // our stub doesn't have this yet so don't make the call so we don't bork trying to call a method
  // that doesn't exist
  const { data: vaultTotalAssetsBN } = useSmartContractReadCall(
    vault,
    "totalAssets",
  );

  const { data: vaultTotalSupplyBN } = useSmartContractReadCall(
    vault,
    "totalSupply",
  );

  return {
    wrappedPositionDecimals,
    vaultDecimals,
    trancheValueSuppliedBN,
    trancheInterestSupplyBN,
    balanceBeforeBN,
    vaultTotalAssetsBN,
    vaultTotalSupplyBN,
  };
}
