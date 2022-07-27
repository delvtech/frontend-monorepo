import { Vault } from "@elementfi/core-typechain/dist/v1";
import { SwapKind } from "@elementfi/integrations/balancer/SwapKind";
import { balancerVaultContract } from "@elementfi/integrations/balancer/vault";
import { makeQueryBatchSwapCallArgs } from "@elementfi/integrations/balancer/hooks/useQueryBatchSwap/makeQueryBatchSwapCallArgs";
import { getQueriesData } from "@elementfi/base";
import { useSmartContractReadCalls } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCalls/useSmartContractReadCalls";
import { UseSmartContractReadCallOptions } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { PoolContract } from "@elementfi/core/pools/PoolContract";
import { BigNumber } from "ethers";
import zip from "lodash.zip";
import { QueryObserverResult } from "react-query";

export function useQueryBatchSwapMulti(
  kind: SwapKind,
  pools: (PoolContract | undefined)[],
  tokenInAddresses: (string | undefined)[],
  tokenOutAddresses: (string | undefined)[],
  amounts: (BigNumber | undefined)[],
  wethAddress: string,
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
        wethAddress,
      );
      // must check undefined as `kind` is an enum of 0 or 1
      const enabled = !!callArgs?.every((v: unknown) => v !== undefined);
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
