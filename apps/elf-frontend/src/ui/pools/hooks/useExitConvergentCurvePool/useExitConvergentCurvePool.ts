import { ConvergentCurvePool, Vault } from "@elementfi/core-typechain/dist/v1";
import { PrincipalPoolTokenInfo } from "@elementfi/core-tokenlist";
import { ExitRequest } from "integrations/balancer/ExitRequest";
import { BALANCER_POOL_LP_TOKEN_DECIMALS } from "integrations/balancer/pools";
import { balancerVaultContract } from "elf/balancer/vault";
import { useSmartContractTransactionPersisted } from "ui/transactions/useSmartContractTransactionPersisted/useSmartContractTransactionPersisted";
import ContractAddresses, { AddressesJson } from "addresses/addresses";
import { BALANCER_ETH_SENTINEL } from "integrations/balancer/ethSentinel";
import {
  clipFixNumberToStringDecimals,
  getSafeFixedNumber,
} from "base/math/fixedPoint";
import { ContractMethodArgs } from "elf/contracts/types";
import { calculateTokensOutForLPInFixed } from "elf/pools/calculateTokensOutForLPIn";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getTokenInfo } from "tokenlists/tokenlists";
import { BigNumber, Signer } from "ethers";
import { defaultAbiCoder, formatUnits, parseUnits } from "ethers/lib/utils";
import { useCallback } from "react";

export function useExitConvergentCurvePool(
  signer: Signer | undefined,
  account: string | null | undefined,
  poolInfo: PrincipalPoolTokenInfo,
  lpIn: string,
  onTransactionSubmitted?: () => void,
): {
  onExitPool: () => void;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | undefined;
  reset: () => void;
} {
  const { poolId } = poolInfo.extensions;
  const pool = getPoolContract(poolInfo.address) as ConvergentCurvePool;
  const {
    mutate: exitPool,
    isLoading,
    isError,
    isSuccess,
    reset,
    error,
  } = useSmartContractTransactionPersisted(
    balancerVaultContract,
    "exitPool",
    signer,
    {
      onTransactionSubmitted,
    },
  );

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
      poolInfo.extensions.convergentPoolFactory,
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
  }, [
    account,
    exitPool,
    lpIn,
    pool,
    poolId,
    poolInfo.extensions.convergentPoolFactory,
  ]);

  return {
    onExitPool,
    isLoading,
    isError,
    isSuccess,
    reset,
    error: error as Error | undefined,
  };
}

function makeExitPoolCallArgs(
  poolId: string | undefined,
  poolFactory: string,
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

  // ok to cast since all input defined above
  const poolTokenMinAmountsOut = getPoolTokenMinAmountsOut(
    lpIn,
    totalSupply,
    poolTokenReserves,
    poolTokenDecimals,
  ) as BigNumber[];

  // default to v1.1 userData, but if it's a v1, then use that instead
  let userData = defaultAbiCoder.encode(
    ["uint256"],
    [parseUnits(lpIn, BALANCER_POOL_LP_TOKEN_DECIMALS)],
  );
  if (poolFactory === AddressesJson.addresses.convergentPoolFactoryAddress.v1) {
    userData = defaultAbiCoder.encode(["uint256[]"], [poolTokenMinAmountsOut]);
  }

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

function getPoolTokenMinAmountsOut(
  lpIn: string,
  totalSupply: BigNumber,
  poolTokenReserves: BigNumber[],
  poolTokenDecimals: number[],
) {
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

  // ConvergentCurvePool calculates how many LP tokens are required to provide a given amount of
  // tokens out.  Here we do the opposite, for a given number of LP tokens in we calculate how many
  // x,y tokens should be returned.
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
  const xNeededPadded = parseUnits(
    clipFixNumberToStringDecimals(
      getSafeFixedNumber(xNeeded).mulUnsafe(getSafeFixedNumber("0.997")),
      poolTokenDecimals[0],
    ),
    poolTokenDecimals[0],
  );
  const yNeededPadded = parseUnits(
    clipFixNumberToStringDecimals(
      getSafeFixedNumber(yNeeded).mulUnsafe(getSafeFixedNumber("0.997")),
      poolTokenDecimals[1],
    ),
    poolTokenDecimals[1],
  );

  const poolTokenMinAmountsOut = [xNeededPadded, yNeededPadded];

  return poolTokenMinAmountsOut;
}
