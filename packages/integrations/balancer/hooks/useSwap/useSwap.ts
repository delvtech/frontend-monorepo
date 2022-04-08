import { Vault } from "@elementfi/core-typechain/dist/v1";
import { FundManagement } from "integrations/balancer/FundManagement";
import { SingleSwap } from "integrations/balancer/SingleSwap";
import { SwapKind } from "integrations/balancer/SwapKind";
import { balancerVaultContract } from "elf/balancer/vault";
import { AppToaster, makeErrorToast } from "ui/toaster/AppToaster/AppToaster";
import { useSmartContractTransactionPersisted } from "ui/transactions/useSmartContractTransactionPersisted/useSmartContractTransactionPersisted";
import { BALANCER_ETH_SENTINEL } from "integrations/balancer/ethSentinel";
import { sortAddresses } from "base/sortAddresses/sortAddresses";
import { serializeError } from "eth-rpc-errors";
import {
  BigNumber,
  BytesLike,
  ContractReceipt,
  PayableOverrides,
  Signer,
} from "ethers";
import { useCallback } from "react";
import { UseMutationResult } from "react-query";
import { ONE_DAY_IN_SECONDS } from "base/time";
import {
  mapETHSentinalToWETH,
  mapWETHToETHSentinal,
} from "elf/balancer/balancer";
import { ContractMethodArgs } from "elf/contracts/types";

/**
 * Hook for Balancer Vault's swap method.
 *
 * Note: This hook takes token addresses as arguments because the Balancer
 * Vault supports eth via a sentinel token address, see: BALANCER_ETH_SENTINAL
 */
export function useSwap(
  account: string | null | undefined,
  signer: Signer | undefined,
  poolId: string,
  tokenInAddress: string,
  tokenOutAddress: string,
  amountIn: BigNumber,
  limit: BigNumber,
  swapKind: SwapKind,
  onTransactionSubmitted?: () => void,
): {
  swap: () => void;
  mutationResult: UseMutationResult<
    ContractReceipt | undefined,
    unknown,
    Parameters<Vault["swap"]>
  >;
} {
  const mutationResult = useSmartContractTransactionPersisted(
    balancerVaultContract,
    "swap",
    signer,
    {
      onTransactionSubmitted: () => {
        onTransactionSubmitted?.();
      },
      onError: (error) => {
        const serializedError = serializeError(error);
        AppToaster?.show(makeErrorToast(serializedError.message));
      },
    },
  );

  const { mutate: swap } = mutationResult;
  const onSwap = useCallback(() => {
    const callArgs = makeSwapCallArgs(
      account,
      poolId,
      tokenInAddress,
      tokenOutAddress,
      amountIn,
      limit,
      swapKind,
    );
    if (callArgs) {
      swap(callArgs);
    }
  }, [
    account,
    poolId,
    tokenInAddress,
    tokenOutAddress,
    amountIn,
    limit,
    swapKind,
    swap,
  ]);

  return { swap: onSwap, mutationResult };
}

function makeSwapCallArgs(
  account: string | null | undefined,
  poolId: BytesLike,
  tokenInAddress: string,
  tokenOutAddress: string,
  amount: BigNumber,
  limit: BigNumber,
  swapKind: SwapKind,
): ContractMethodArgs<Vault, "swap"> | undefined {
  if (!account || !poolId || !tokenInAddress || !tokenOutAddress || !amount) {
    return;
  }

  // balancer's batchSwap requires that the assets be sorted
  let assets = sortAddresses([tokenInAddress, tokenOutAddress]);
  // ETH is a special case. Balancer uses the
  // zero address as an address sentinel for ETH, but still expects the addresses sorted as though
  // it were WETH.
  if (assets.includes(BALANCER_ETH_SENTINEL)) {
    assets = sortAddresses(assets.map(mapETHSentinalToWETH)).map(
      mapWETHToETHSentinal,
    );
  }

  const singleSwap: SingleSwap = {
    poolId,
    kind: swapKind,
    assetIn: tokenInAddress,
    assetOut: tokenOutAddress,
    amount,
    // no need to pass data
    userData: "0x00",
  };

  // trading with ourselves.  internal balance means internal to balancer.  we don't have anything
  // in there to start, but we'll keep whatever base assets we get from swapping in the balancer vault.
  const funds: FundManagement = {
    sender: account,
    recipient: account,
    fromInternalBalance: false,
    toInternalBalance: false,
  };

  // set a large deadline for now, it was being buggy.  time is in seconds.  must be an integer.
  const deadline = Math.round(Date.now() / 1000) + ONE_DAY_IN_SECONDS;

  const callArgs: ContractMethodArgs<Vault, "swap"> = [
    singleSwap,
    funds,
    limit,
    deadline,
  ];
  if (tokenInAddress === BALANCER_ETH_SENTINEL) {
    const overrides: PayableOverrides = { value: amount };
    callArgs.push(overrides);
  }

  return callArgs;
}
