import { Button, Callout, Intent } from "@blueprintjs/core";
import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
  TokenInfo,
  YieldPoolTokenInfo,
  YieldTokenInfo,
} from "@elementfi/tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import { BALANCER_POOL_LP_TOKEN_DECIMALS } from "integrations/balancer/pools";
import tw from "efi-tailwindcss-classnames";
import { useNumericInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { useIsTailwindSmallScreen } from "ui/base/mediaBreakpoints";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { useExitConvergentCurvePool } from "ui/pools/hooks/useExitConvergentCurvePool/useExitConvergentCurvePool";
import { useExitWeightedPool } from "ui/pools/hooks/useExitWeightedPool/useExitWeightedPool";
import { useCanPerformPool } from "ui/pools/hooks/usePoolCanPerform/usePoolCanPerform";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { UnstakeInput } from "ui/pools/UnstakeInput/UnstakeInput";
import { UnstakeConfirmationDrawer } from "ui/pools/UnstakeTokensConfirmationDrawer/UnstakeTokensConfirmationDrawer";
import { PoolStakeStats } from "ui/pools/UnstakingPanel/PoolStakeStats";
import { useTokenBalanceOf } from "ui/token/hooks/useTokenBalanceOf";
import { ElementIcon } from "ui/token/TokenIcon";
import { ConnectWalletDialog } from "ui/wallets/ConnectWalletDialog/ConnectWalletDialog";
import { formatBalance } from "base/formatBalance/formatBalance";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolContract } from "elf/pools/PoolContract";
import { PoolInfo } from "elf/pools/PoolInfo";
import { isYieldPool } from "elf/pools/weightedPool";
import { BigNumber, Signer } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import zipObject from "lodash.zipobject";
import { ReactElement, useCallback, useState } from "react";
import { t } from "ttag";

interface UnstakeCardProps {
  signer: Signer | undefined;
  library: Web3Provider | undefined;
  account: string | null | undefined;
  poolInfo: PoolInfo;
}

export function UnstakeCard({
  signer,
  library,
  account,
  poolInfo,
}: UnstakeCardProps): ReactElement {
  const pool = getPoolContract(poolInfo.address);
  const { address: poolAddress } = poolInfo;
  const canPerformRemoveLiquidity = useCanPerformPool(
    poolAddress,
    "removeLiquidity",
  );
  const isSmallScreen = useIsTailwindSmallScreen();

  // local state
  const [isWalletDialogOpen, setWalletDialogOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { stringValue: unstakeValue, setValue: setUnstakeValue } =
    useNumericInput();

  // handlers
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const onClickButton = useCallback(() => {
    if (!account) {
      return setWalletDialogOpen(true);
    }
    openDrawer();
  }, [account, openDrawer]);

  const onTransactionSubmitted = useCallback(() => {
    setDrawerOpen(false);
    setUnstakeValue("");
  }, [setUnstakeValue]);

  const {
    exitPool: unstakeFromPool,
    isLoading,
    isError,
    error,
    reset,
  } = useExitPool(
    signer,
    account,
    poolInfo,
    unstakeValue,
    onTransactionSubmitted,
  );

  const onCloseDrawer = useCallback(() => {
    setDrawerOpen(false);
    setUnstakeValue("");
    reset();
  }, [reset, setUnstakeValue]);

  // display info
  const { baseAssetInfo, termAssetInfo } = getPoolTokens(poolInfo);
  const poolSymbol = `ELF:${baseAssetInfo.symbol}-${termAssetInfo.symbol}`;
  const { data: lpBalanceOf } = useTokenBalanceOf(
    pool as unknown as ERC20,
    account,
  );
  const lpDisplayBalance = formatBalance(
    lpBalanceOf,
    BALANCER_POOL_LP_TOKEN_DECIMALS,
  );

  // drawer info
  const { baseAssetOut, termAssetOut } = useCalculateAssetsOut(
    pool,
    unstakeValue,
    baseAssetInfo,
    termAssetInfo,
  );

  // form validators
  const { balanceIsZero, isValidValue, disableUnstake } = getFormValidators(
    unstakeValue,
    lpBalanceOf,
  );

  return (
    <div
      className={tw(
        "flex",
        "flex-col",
        "space-y-2",
        "py-2",
        "items-center",
        "justify-between",
        "h-full",
        "overflow-hidden",
      )}
    >
      <UnstakeInput
        label={isSmallScreen ? "" : t`LP Tokens`}
        cryptoSymbol={poolSymbol}
        cryptoDecimals={poolInfo.decimals}
        cryptoAssetIcon={ElementIcon}
        cryptoBalanceOf={lpBalanceOf}
        cryptoDisplayBalance={lpDisplayBalance}
        disabled={balanceIsZero}
        onChange={setUnstakeValue}
        value={unstakeValue}
        validValue={isValidValue}
      />
      <PoolStakeStats account={account} poolInfo={poolInfo} />

      <Button
        className={tw("w-full")}
        disabled={disableUnstake || !canPerformRemoveLiquidity}
        onClick={onClickButton}
        minimal
        large
        outlined
        intent={canPerformRemoveLiquidity ? Intent.PRIMARY : Intent.DANGER}
      >
        {t`Remove liquidity`}
      </Button>

      {!canPerformRemoveLiquidity ? (
        <Callout intent={Intent.DANGER}>
          {t`Removing liquidity from this pool has been temporarily disabled, please refer to our Discord or Twitter for further updates.`}
        </Callout>
      ) : null}
      <UnstakeConfirmationDrawer
        library={library}
        account={account}
        baseAssetInfo={baseAssetInfo}
        termAssetInfo={termAssetInfo as PrincipalTokenInfo | YieldTokenInfo}
        baseAssetValue={baseAssetOut}
        termAssetValue={termAssetOut}
        lpTokensIn={unstakeValue}
        unstakeError={error as Error | undefined}
        isOpen={isDrawerOpen}
        isUnstakeLoading={isLoading}
        isUnstakeError={isError}
        isUnstakeSuccess={false}
        onClose={onCloseDrawer}
        onUnstake={unstakeFromPool}
      />
      <ConnectWalletDialog isOpen={isWalletDialogOpen} onClose={closeDrawer} />
    </div>
  );
}

function useExitPool(
  signer: Signer | undefined,
  account: string | null | undefined,
  poolInfo: PoolInfo,
  amount: string,
  onTransactionSubmitted?: () => void,
) {
  const {
    onExitPool: exitPrincipalPool,
    isLoading: isPrincipalLoading,
    isError: isPrincipalError,
    reset: resetPrincipal,
    error: principalError,
  } = useExitConvergentCurvePool(
    signer,
    account,
    poolInfo as PrincipalPoolTokenInfo,
    amount,
    onTransactionSubmitted,
  );

  const {
    mutationResult: {
      isLoading: isYieldLoading,
      isError: isYieldError,
      reset: resetYield,
      error: yieldError,
    },
    onExitPool: exitYieldPool,
  } = useExitWeightedPool(
    signer,
    account,
    poolInfo as YieldPoolTokenInfo,
    amount,
    onTransactionSubmitted,
  );

  if (isYieldPool(poolInfo)) {
    return {
      exitPool: exitYieldPool,
      isLoading: isYieldLoading,
      isError: isYieldError,
      reset: resetYield,
      error: yieldError,
    };
  }

  return {
    exitPool: exitPrincipalPool,
    isLoading: isPrincipalLoading,
    isError: isPrincipalError,
    reset: resetPrincipal,
    error: principalError,
  };
}

function useCalculateAssetsOut(
  pool: PoolContract,
  unstakeValue: string,
  baseAssetInfo: TokenInfo,
  termAssetInfo: TokenInfo,
) {
  const { data: [addresses, poolBalances] = [] } = usePoolTokens(pool);
  const { decimals: baseAssetDecimals } = baseAssetInfo;
  const { data: totalSupply } = useSmartContractReadCall(pool, "totalSupply");
  const shareOut = totalSupply
    ? Number(unstakeValue) /
      Number(formatUnits(totalSupply, BALANCER_POOL_LP_TOKEN_DECIMALS))
    : 0;

  const baseAssetOutValue = calculatePoolShareLiquidity(
    shareOut,
    addresses,
    poolBalances,
    baseAssetInfo.address,
    baseAssetDecimals,
  );

  const termAssetOutValue = calculatePoolShareLiquidity(
    shareOut,
    addresses,
    poolBalances,
    termAssetInfo.address,
    termAssetInfo.decimals,
  );

  const baseAssetOut = baseAssetOutValue
    ? `${baseAssetOutValue?.toFixed(4)}`
    : "0.0000";

  const termAssetOut = termAssetOutValue
    ? `${termAssetOutValue?.toFixed(4)}`
    : "0.0000";
  return { baseAssetOut, termAssetOut };
}

function calculatePoolShareLiquidity(
  poolShares: number | undefined,
  poolTokenAddresses: string[] | undefined,
  poolTokenReserves: BigNumber[] | undefined,
  tokenAddress: string | undefined,
  tokenDecimals: number | undefined,
): number | undefined {
  let baseAssetLiquidity: number | undefined;
  if (
    poolShares &&
    poolTokenAddresses &&
    poolTokenReserves &&
    tokenAddress &&
    tokenDecimals
  ) {
    const reservesByAddress = zipObject(poolTokenAddresses, poolTokenReserves);
    const reserves = reservesByAddress[tokenAddress];
    const reservesNumber = +formatUnits(reserves ?? 0, tokenDecimals);
    baseAssetLiquidity = poolShares * reservesNumber;
  }
  return baseAssetLiquidity;
}

function getFormValidators(
  unstakeValue: string,
  lpBalanceOf: BigNumber | undefined,
) {
  const valueBN = parseUnits(
    unstakeValue || "0",
    BALANCER_POOL_LP_TOKEN_DECIMALS,
  );

  const balanceIsZero = lpBalanceOf?.isZero() ?? true;
  const valueIsZero = valueBN.isZero();
  const valueLessThanBalance = lpBalanceOf ? valueBN.lte(lpBalanceOf) : false;

  const isValidValue = valueLessThanBalance;
  const disableUnstake = balanceIsZero || valueIsZero || !isValidValue;
  return { balanceIsZero, isValidValue, disableUnstake };
}
