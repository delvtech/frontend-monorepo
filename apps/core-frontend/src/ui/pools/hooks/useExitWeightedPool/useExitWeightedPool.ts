import { Vault } from "@elementfi/core-typechain/dist/v1";
import { YieldPoolTokenInfo } from "@elementfi/core-tokenlist";
import { ExitRequest } from "integrations/balancer/ExitRequest";
import { BALANCER_POOL_LP_TOKEN_DECIMALS } from "integrations/balancer/pools";
import { balancerVaultContract } from "elf/balancer/vault";
import { useSmartContractTransactionPersisted } from "ui/transactions/useSmartContractTransactionPersisted/useSmartContractTransactionPersisted";
import ContractAddresses from "addresses/addresses";
import { BALANCER_ETH_SENTINEL } from "integrations/balancer/ethSentinel";
import {
  clipFixNumberToStringDecimals,
  getSafeFixedNumber,
} from "base/math/fixedPoint";
import { ContractMethodArgs } from "elf/contracts/types";
import { calculateTokensOutForLPInFixed } from "elf/pools/calculateTokensOutForLPIn";
import { getPoolContract } from "elf/pools/getPoolContract";
import { WeightedPoolExitKind } from "elf/pools/weightedPool";
import { getTokenInfo } from "tokenlists/tokenlists";
import { BigNumber, ContractReceipt, Signer } from "ethers";
import { defaultAbiCoder, formatUnits, parseUnits } from "ethers/lib/utils";
import { useCallback } from "react";
import { UseMutationResult } from "react-query";

export function useExitWeightedPool(
  signer: Signer | undefined,
  account: string | null | undefined,
  poolInfo: YieldPoolTokenInfo,
  lpIn: string,
  onTransactionSubmitted?: () => void,
): {
  mutationResult: UseMutationResult<
    ContractReceipt | undefined,
    unknown,
    ContractMethodArgs<Vault, "exitPool">
  >;
  onExitPool: () => void;
} {
  const { poolId } = poolInfo.extensions;
  const pool = getPoolContract(poolInfo.address);

  const mutationResult = useSmartContractTransactionPersisted(
    balancerVaultContract,
    "exitPool",
    signer,
    {
      onTransactionSubmitted,
    },
  );

  const { mutate: exitPool } = mutationResult;

  const onExitPool = useCallback(async () => {
    // grab these right when we exit to try to get the latest values
    const totalSupply = await pool.totalSupply();
    const [poolTokens = [], poolTokenReserves = []] =
      await balancerVaultContract.getPoolTokens(poolId);
    const poolTokenDecimals = poolTokens.map((tokenAddress) => {
      const { decimals } = getTokenInfo(tokenAddress);
      return decimals;
    });

    const exitPoolCallArgs = makeExitPoolCallArgs(
      poolId,
      account,
      poolTokens,
      poolTokenReserves,
      poolTokenDecimals,
      totalSupply,
      lpIn,
    );

    if (!exitPoolCallArgs) {
      return;
    }
    exitPool(exitPoolCallArgs);
  }, [account, exitPool, lpIn, pool, poolId]);

  return {
    mutationResult,
    onExitPool,
  };
}

function makeExitPoolCallArgs(
  poolId: string | undefined,
  account: string | null | undefined,
  poolTokens: string[] | undefined,
  poolTokenReserves: BigNumber[] | undefined,
  poolTokenDecimals: number[],
  totalSupply: BigNumber | undefined,
  lpIn: string,
): ContractMethodArgs<Vault, "exitPool"> | undefined {
  if (
    !poolId ||
    !account ||
    !poolTokens ||
    !poolTokenReserves ||
    !totalSupply
  ) {
    return;
  }

  const assets = poolTokens.map((poolToken) => {
    if (poolToken === ContractAddresses.wethAddress) {
      return BALANCER_ETH_SENTINEL;
    }
    return poolToken;
  });

  // ok to cast since all inputs are checked above
  // TODO: see if we can remove this, this is uses logic for exiting from a CCPool
  const poolTokenMinAmountsOut = getPoolTokenMinAmountsOut(
    lpIn,
    totalSupply,
    poolTokenReserves,
    poolTokenDecimals,
  ) as BigNumber[];

  const lpInBN = parseUnits(lpIn || "0", BALANCER_POOL_LP_TOKEN_DECIMALS);

  // weighted pools take a exit kind and amount of bpt token in the user data
  const userData = defaultAbiCoder.encode(
    ["uint8", "uint256"],
    [WeightedPoolExitKind.EXACT_BPT_IN_FOR_TOKENS_OUT, lpInBN],
  );

  const exitRequest: ExitRequest = {
    toInternalBalance: false,
    assets,
    minAmountsOut: poolTokenMinAmountsOut,
    userData,
  };

  const callArgs: ContractMethodArgs<Vault, "exitPool"> = [
    poolId,
    account,
    account,
    exitRequest,
  ];

  return callArgs;
}

// TODO: see if we can remove this, this is uses logic for exiting from a CCPool
function getPoolTokenMinAmountsOut(
  lpIn: string,
  totalSupply: BigNumber,
  poolTokenReserves: BigNumber[],
  poolTokenDecimals: number[],
) {
  if (!poolTokenReserves.length) {
    return undefined;
  }

  const totalSupplyString = formatUnits(
    totalSupply,
    BALANCER_POOL_LP_TOKEN_DECIMALS,
  );

  const xReservesString = formatUnits(
    poolTokenReserves[0],
    poolTokenDecimals[0],
  );
  const yReservesString = formatUnits(
    poolTokenReserves[1],
    poolTokenDecimals[1],
  );

  const { xNeeded, yNeeded } = calculateTokensOutForLPInFixed(
    lpIn,
    xReservesString,
    yReservesString,
    totalSupplyString,
    poolTokenDecimals[0],
  );

  if (!xNeeded || !yNeeded) {
    return undefined;
  }

  // Pad this by 0.3% to account for changing pool reserves. We are guaranteeing
  // you'll receive at least 99.7% of what you try to withdraw.
  const xNeededPadded = clipFixNumberToStringDecimals(
    getSafeFixedNumber(xNeeded).mulUnsafe(getSafeFixedNumber("0.997")),
    poolTokenDecimals[0],
  );
  const yNeededPadded = clipFixNumberToStringDecimals(
    getSafeFixedNumber(yNeeded).mulUnsafe(getSafeFixedNumber("0.997")),
    poolTokenDecimals[1],
  );

  const poolTokenMinAmountsOut = [
    parseUnits(xNeededPadded, poolTokenDecimals[0]),
    parseUnits(yNeededPadded, poolTokenDecimals[1]),
  ];
  return poolTokenMinAmountsOut;
}
