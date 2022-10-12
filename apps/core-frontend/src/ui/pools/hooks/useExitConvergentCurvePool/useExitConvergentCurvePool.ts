import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { ConvergentCurvePool, Vault } from "@elementfi/core-typechain/dist/v1";
import { ConvergentCurvePool as ConvergentCurvePoolV1_1 } from "@elementfi/core-typechain/dist/v1.1";
import sortBy from "lodash.sortby";
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
  const poolv1_1 = getPoolContract(poolInfo.address) as ConvergentCurvePoolV1_1;
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

  const { data: feesBond } = useSmartContractReadCall(pool, "feesBond");
  const { data: feesUnderlying } = useSmartContractReadCall(
    pool,
    "feesUnderlying",
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

    const bondAddress = await pool.bond();
    const underlyingAddress = await pool.underlying();

    // get sorted governance and protocol fees by token address.  for v1 contracts, there are no
    // methods governanceFeesBond and governanceFeesUnderlying so poolGovFees and poolFees will both
    // just be [0, 0].
    let poolGovFees: BigNumber[] = [BigNumber.from(0), BigNumber.from(0)];
    let poolFees: BigNumber[] = [BigNumber.from(0), BigNumber.from(0)];
    try {
      // these will fail for pool v1 contracts
      const poolGovFeesBond = await poolv1_1.governanceFeesBond();
      const poolGovFeesUnderlying = await poolv1_1.governanceFeesUnderlying();
      poolGovFees = sortBy(
        [
          { address: bondAddress, fees: poolGovFeesBond },
          { address: underlyingAddress, fees: poolGovFeesUnderlying },
        ],
        (o) => o.address,
      ).map((a) => a.fees);

      // get sorted protocol fees by token address.
      poolFees = sortBy(
        [
          { address: bondAddress, fees: feesBond || BigNumber.from(0) },
          {
            address: underlyingAddress,
            fees: feesUnderlying || BigNumber.from(0),
          },
        ],
        (o) => o.address,
      ).map((a) => a.fees);
    } catch (error) {}

    const exitPoolCallArgs = makeExitPoolCallArgs(
      poolId,
      poolInfo.extensions.convergentPoolFactory,
      account,
      poolTokens,
      poolTokenReserves,
      poolGovFees,
      poolFees,
      poolTokenDecimals,
      totalSupply,
      lpIn,
    );

    if (!exitPoolCallArgs) {
      return;
    }
    exitPool(exitPoolCallArgs);
  }, [
    pool,
    poolId,
    feesBond,
    feesUnderlying,
    poolInfo.extensions.convergentPoolFactory,
    account,
    lpIn,
    exitPool,
    poolv1_1,
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
  poolGovFees: BigNumber[] | undefined,
  poolFees: BigNumber[] | undefined,
  poolTokenDecimals: number[],
  totalSupply: BigNumber | undefined,
  lpIn: string,
): ContractMethodArgs<Vault, "exitPool"> | undefined {
  if (
    !poolId ||
    !account ||
    !poolTokens ||
    !poolTokenReserves ||
    !poolGovFees ||
    !poolFees ||
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
    poolGovFees,
    poolFees,
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
  poolGovFees: BigNumber[],
  poolFees: BigNumber[],
  poolTokenDecimals: number[],
) {
  const totalSupplyString = formatUnits(
    totalSupply,
    BALANCER_POOL_LP_TOKEN_DECIMALS,
  );

  const xReservesString = formatUnits(
    poolTokenReserves[0].sub(poolFees[0]).sub(poolGovFees[0]),
    poolTokenDecimals[0],
  );
  const yReservesString = formatUnits(
    poolTokenReserves[1].sub(poolFees[1]).sub(poolGovFees[1]),
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
