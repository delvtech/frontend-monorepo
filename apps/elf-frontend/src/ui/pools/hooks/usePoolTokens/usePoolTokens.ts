import { Vault } from "@elementfi/core-typechain/dist/v1";
import {
  PrincipalPoolTokenInfo,
  YieldPoolTokenInfo,
} from "@elementfi/core-tokenlist";
import { balancerVaultContract } from "elf/balancer/vault";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { ContractMethodArgs } from "elf/contracts/types";
import { PoolContract } from "elf/pools/PoolContract";
import { getTokenInfo } from "tokenlists/tokenlists";
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
