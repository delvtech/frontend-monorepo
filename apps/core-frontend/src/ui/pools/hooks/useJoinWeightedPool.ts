import { Vault, WeightedPool } from "@elementfi/core-typechain/dist/v1";
import { JoinRequest } from "integrations/balancer/JoinRequest";
import { balancerVaultContract } from "elf/balancer/vault";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { useSmartContractTransactionPersisted } from "ui/transactions/useSmartContractTransactionPersisted/useSmartContractTransactionPersisted";
import ContractAddresses from "addresses/addresses";
import { BALANCER_ETH_SENTINEL } from "integrations/balancer/ethSentinel";
import { ContractMethodArgs } from "elf/contracts/types";
import { isWeightedPool } from "elf/pools/PoolContract";
import { BigNumber, CallOverrides, ContractReceipt, Signer } from "ethers";
import { defaultAbiCoder } from "ethers/lib/utils";
import zipObject from "lodash.zipobject";
import { useCallback } from "react";
import { UseMutationResult } from "react-query";

enum JoinKind {
  INIT,
  EXACT_TOKENS_IN_FOR_BPT_OUT,
  TOKEN_IN_FOR_EXACT_BPT_OUT,
}

export function useJoinWeightedPool(
  signer: Signer | undefined,
  account: string | null | undefined,
  pool: WeightedPool | undefined,
  poolTokenMaxAmounts: BigNumber[] | undefined,
  onTransactionSubmitted?: () => void,
): {
  onJoinPool: () => void;
  mutationResult: UseMutationResult<
    ContractReceipt | undefined,
    unknown,
    Parameters<Vault["joinPool"]>
  >;
} {
  const { data: poolId } = useSmartContractReadCall(pool, "getPoolId");
  const { data: poolWeights } = useSmartContractReadCall(
    pool,
    "getNormalizedWeights",
    {
      enabled: isWeightedPool(pool),
    },
  );
  const { data: [poolTokens] = [] } = usePoolTokens(pool);
  const mutationResult = useSmartContractTransactionPersisted(
    balancerVaultContract,
    "joinPool",
    signer,
    { onTransactionSubmitted },
  );

  const { mutate: joinPool } = mutationResult;

  const joinPoolCallArgs = makeJoinPoolCallArgs(
    poolId,
    account,
    poolTokens,
    poolWeights,
    poolTokenMaxAmounts,
  );
  const onJoinPool = useCallback(() => {
    if (!joinPoolCallArgs) {
      return;
    }
    joinPool(joinPoolCallArgs);
  }, [joinPool, joinPoolCallArgs]);
  return { onJoinPool, mutationResult };
}

function makeJoinPoolCallArgs(
  poolId: string | undefined,
  account: string | null | undefined,
  poolTokens: string[] | undefined,
  poolWeights: BigNumber[] | undefined,
  poolTokenMaxAmounts: BigNumber[] | undefined,
): ContractMethodArgs<Vault, "joinPool"> | undefined {
  if (
    !poolId ||
    !account ||
    !poolTokens ||
    !poolTokenMaxAmounts ||
    !poolWeights
  ) {
    return;
  }

  let isEth = false;
  const assets = poolTokens.map((poolToken) => {
    if (poolToken === ContractAddresses.wethAddress) {
      isEth = true;
      return BALANCER_ETH_SENTINEL;
    }
    return poolToken;
  });

  // By setting minBPTOut we can set the slippage tolerance.
  const minBPTOut = 0;
  const userData = defaultAbiCoder.encode(
    ["uint8", "uint256[]", "uint256"],
    [JoinKind.EXACT_TOKENS_IN_FOR_BPT_OUT, poolTokenMaxAmounts, minBPTOut],
  );

  const joinRequest: JoinRequest = {
    fromInternalBalance: false,
    assets,
    maxAmountsIn: poolTokenMaxAmounts,
    userData,
  };

  const callArgs: ContractMethodArgs<Vault, "joinPool"> = [
    poolId,
    account,
    account,
    joinRequest,
  ];

  if (isEth) {
    const maxAmountsByPoolToken = zipObject(poolTokens, poolTokenMaxAmounts);
    const overrides: CallOverrides = {
      value: maxAmountsByPoolToken[ContractAddresses.wethAddress],
    };
    callArgs.push(overrides);
  }

  return callArgs;
}
