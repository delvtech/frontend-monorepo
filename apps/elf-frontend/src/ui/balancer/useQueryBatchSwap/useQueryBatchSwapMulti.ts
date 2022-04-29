import { Vault } from "@elementfi/core-typechain/dist/v1";
import { SwapKind } from "integrations/balancer/SwapKind";
import { balancerVaultContract } from "elf/balancer/vault";
import { makeQueryBatchSwapCallArgs } from "ui/balancer/useQueryBatchSwap/makeQueryBatchSwapCallArgs";
import { getQueriesData } from "ui/base/queryResults";
import { UseSmartContractReadCallOptions } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { useSmartContractReadCalls } from "ui/contracts/useSmartContractReadCalls/useSmartContractReadCalls";
import { PoolContract } from "elf/pools/PoolContract";
import { BigNumber } from "ethers";
import zip from "lodash.zip";
import { QueryObserverResult } from "react-query";

export function useQueryBatchSwapMulti(
  kind: SwapKind,
  pools: (PoolContract | undefined)[],
  tokenInAddresses: (string | undefined)[],
  tokenOutAddresses: (string | undefined)[],
  amounts: (BigNumber | undefined)[],
): QueryObserverResult<BigNumber[]>[] {
  const poolIdResults = useSmartContractReadCalls(pools, "getPoolId");
  const poolIds = getQueriesData(poolIdResults);

  const zipped = zip(poolIds, tokenInAddresses, amounts, tokenOutAddresses);
  const readCallOptions = zipped.map(
    ([poolId, tokenInAddress, amount, tokenOutAddress]):
      | UseSmartContractReadCallOptions<Vault, "queryBatchSwap", BigNumber[]>
      | undefined => {
      const callArgs = makeQueryBatchSwapCallArgs(
        kind,
        poolId,
        tokenInAddress,
        amount,
        tokenOutAddress,
      );
      // must check undefined as `kind` is an enum of 0 or 1
      const enabled = !!callArgs?.every((v) => v !== undefined);
      return {
        enabled,
        callArgs,
      };
    },
  );

  const queryBatchSwapResults = useSmartContractReadCalls(
    pools.map(() => balancerVaultContract),
    "queryBatchSwap",
    readCallOptions,
  );

  return queryBatchSwapResults;
}
