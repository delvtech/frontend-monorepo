import { Vault } from "@elementfi/core-typechain/dist/v1";
import { SwapKind } from "integrations/balancer/SwapKind";
import { balancerVaultContract } from "integrations/balancer/vault";
import { makeQueryBatchSwapCallArgs } from "integrations/balancer/hooks/useQueryBatchSwap/makeQueryBatchSwapCallArgs";
import { getQueriesData } from "base/queries/queryResults";
import {
  useSmartContractReadCalls,
  UseSmartContractReadCallOptions,
} from "@elementfi/react-query-typechain";
import { PoolContract } from "core/pools/PoolContract";
import { BigNumber } from "ethers";
import zip from "lodash.zip";
import { QueryObserverResult } from "react-query";

export function useQueryBatchSwapMulti(
  kind: SwapKind,
  pools: (PoolContract | undefined)[],
  tokenInAddresses: (string | undefined)[],
  tokenOutAddresses: (string | undefined)[],
  amounts: (BigNumber | undefined)[],
  wethAddress: string
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
        wethAddress
      );
      // must check undefined as `kind` is an enum of 0 or 1
      const enabled = !!callArgs?.every((v: unknown) => v !== undefined);
      return {
        enabled,
        callArgs,
      };
    }
  );

  const queryBatchSwapResults = useSmartContractReadCalls(
    pools.map(() => balancerVaultContract),
    "queryBatchSwap",
    readCallOptions
  );

  return queryBatchSwapResults;
}
