import { Vault } from "@elementfi/core-typechain/dist/v1";
import {
  PrincipalPoolTokenInfo,
  YieldPoolTokenInfo,
} from "@elementfi/tokenlist";
import { balancerVaultContract } from "@elementfi/integrations/balancer/vault";
import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { ContractMethodArgs } from "@elementfi/react-query-typechain/src/types";
import {} from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { PoolContract } from "@elementfi/core/pools/PoolContract";
import { getTokenInfo } from "@elementfi/core/tokenlists/tokenlists";
import { BigNumber } from "ethers";
import { QueryObserverResult } from "react-query";

export function usePoolTokens(
  pool: PoolContract | undefined,
): QueryObserverResult<
  [
    string[], // addresses
    BigNumber[], // balances
    BigNumber, // lastChangeBlock
  ]
> {
  const poolId = pool?.address
    ? getTokenInfo<PrincipalPoolTokenInfo | YieldPoolTokenInfo>(pool?.address)
        .extensions.poolId
    : undefined;

  const poolTokensResults = useSmartContractReadCall(
    balancerVaultContract,
    "getPoolTokens",
    {
      enabled: !!poolId,
      callArgs: [poolId] as ContractMethodArgs<Vault, "getPoolTokens">,
    },
  );
  return poolTokensResults;
}
