import { Button, Callout, Intent, Tag } from "@blueprintjs/core";
import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import { BALANCER_POOL_LP_TOKEN_DECIMALS } from "integrations/balancer/pools";
import { SwapKind } from "integrations/balancer/SwapKind";
import tw from "efi-tailwindcss-classnames";
import { getCalcSwap } from "ui/balancer/useQueryBatchSwap/useQueryBatchSwap";
import { useNumericInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { usePoolTotalSupply } from "ui/pools/hooks/usePoolTotalSupply";
import { useTokenBalanceOf } from "ui/token/hooks/useTokenBalanceOf";
import { TokenAmountInput } from "ui/token/TokenAmountInput/TokenAmountInput";
import { RedeemPrincipalTokensConfirmationDrawer } from "ui/tranche/RedeemTokensDrawer/RedeemPrincipalTokensConfirmationDrawer/RedeemPrincipalTokensConfirmationDrawer";
import { useTrancheCanPerform } from "ui/tranche/useTrancheCanPerform";
import { formatBalance } from "base/formatBalance/formatBalance";
import { clipStringValueToDecimals } from "base/math/fixedPoint";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { getTokenInfo } from "tokenlists/tokenlists";
import { validateTradeValues } from "elf/trade/validateTradeValues";
import { getBaseAssetForTranche } from "elf/tranche/baseAssets";
import { trancheContractsByAddress } from "elf/tranche/tranches";
import { formatUnits } from "ethers/lib/utils";
import { Fragment, ReactElement, useCallback, useState } from "react";
import { t } from "ttag";

interface RedeemPrincipalTokensFormProps {
  library: Web3Provider | undefined;
  account: string | null | undefined;
  principalToken: PrincipalTokenInfo;
}

export function RedeemPrincipalTokensForm(
  props: RedeemPrincipalTokensFormProps,
): ReactElement {
  const {
    library,
    account,
    principalToken,
    principalToken: {
      address: ptAddress,
      decimals: ptDecimals,
      symbol: ptSymbol,
    },
  } = props;

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const { stringValue: amountIn, setValue: onAmountInChange } =
    useNumericInput();
  const closeDrawer = useCallback(() => {
    onAmountInChange("");
    setDrawerOpen(false);
  }, [onAmountInChange]);

  // base asset
  const baseAsset = getBaseAssetForTranche(ptAddress);
  const baseAssetSymbol = getCryptoSymbol(baseAsset);

  // principal token
  const trancheContract = trancheContractsByAddress[ptAddress];
  const { data: ptBalanceOf } = useTokenBalanceOf(
    trancheContract as unknown as ERC20,
    account,
  );
  const ptBalanceLabel = formatBalance(ptBalanceOf, ptDecimals, ptDecimals);
  const canPerformWithdrawPrincipal = useTrancheCanPerform(
    ptAddress,
    "withdrawPrincipal",
  );

  // inputs
  const poolInfo = getPoolInfoForPrincipalToken(ptAddress);
  const { tokenOutError, tokenInError } = useValidateInput(
    account,
    poolInfo,
    amountIn,
  );

  const buttonDisabled =
    !!tokenInError ||
    !!tokenOutError ||
    !amountIn ||
    !canPerformWithdrawPrincipal;

  let buttonIntent: Intent = Intent.PRIMARY;
  if (tokenInError || tokenOutError || !canPerformWithdrawPrincipal) {
    buttonIntent = Intent.DANGER;
  }

  return (
    <Fragment>
      <div className={tw("flex", "flex-col", "space-y-4")}>
        <div className={tw("flex", "flex-col", "w-full", "space-y-2")}>
          <span
            className={tw("pb-4")}
          >{t`Redeem ${baseAssetSymbol} for your principal tokens`}</span>
          <div className={tw("grid", "grid-cols-4", "gap-3")}>
            <TokenAmountInput
              className={tw("col-span-3")}
              showMaxButton
              errorMessage={tokenInError || tokenOutError}
              leftIcon={
                <Tag minimal large className={tw("ml-2")}>
                  {ptSymbol}
                </Tag>
              }
              value={amountIn}
              maxAmount={ptBalanceOf}
              tokenDecimals={ptDecimals}
              onValueChange={onAmountInChange}
            />
            <div>
              <Button
                fill
                disabled={buttonDisabled}
                outlined
                large
                intent={buttonIntent}
                onClick={openDrawer}
              >{t`Redeem`}</Button>
            </div>
          </div>
          <div className={tw("grid", "grid-cols-4", "gap-3")}>
            <span
              className={tw("col-span-3", "text-right")}
            >{t`Available balance: ${ptBalanceLabel}`}</span>
          </div>
        </div>
        {!canPerformWithdrawPrincipal ? (
          <Callout intent={Intent.DANGER}>
            {t`Redeeming for this token has been temporarily disabled, please refer to our Discord or Twitter for further updates.`}
          </Callout>
        ) : null}
      </div>
      <RedeemPrincipalTokensConfirmationDrawer
        library={library}
        principalTokenInfo={principalToken}
        account={account}
        amountIn={amountIn}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </Fragment>
  );
}

function useValidateInput(
  account: string | null | undefined,
  poolInfo: PrincipalPoolTokenInfo,
  amountIn: string,
) {
  const {
    address: poolAddress,
    extensions: { bond },
  } = poolInfo;

  const trancheContract = trancheContractsByAddress[bond];
  const { data: ptBalanceOf } = useTokenBalanceOf(
    trancheContract as unknown as ERC20,
    account,
  );
  const { decimals: ptDecimals } = getTokenInfo<PrincipalTokenInfo>(bond);

  const { baseAssetIndex, termAssetIndex: principalTokenIndex } =
    getPoolTokens(poolInfo);

  const poolContract = getPoolContract(poolAddress);

  const { data: [, balances] = [] } = usePoolTokens(poolContract);
  const underlyingReservesBalanceOf = balances?.[baseAssetIndex];
  const principalReservesBalanceOf = balances?.[principalTokenIndex];

  const amountPrincipalTokensOutBN = useCalculateUnderlyingTokenOut(
    poolInfo,
    amountIn,
  );

  return validateTradeValues(
    amountIn,
    amountPrincipalTokensOutBN,
    underlyingReservesBalanceOf,
    principalReservesBalanceOf,
    ptBalanceOf,
    ptDecimals,
  );
}

function useCalculateUnderlyingTokenOut(
  poolInfo: PrincipalPoolTokenInfo,
  amountIn: string,
): string {
  const {
    address: poolAddress,
    extensions: { bond, underlying },
  } = poolInfo;

  const { baseAssetIndex, termAssetIndex: principalTokenIndex } =
    getPoolTokens(poolInfo);

  const poolContract = getPoolContract(poolAddress);

  const { data: totalSupplyBN } = usePoolTotalSupply(poolContract);
  const totalSupply = formatUnits(
    totalSupplyBN ?? 0,
    BALANCER_POOL_LP_TOKEN_DECIMALS,
  );

  const { data: [, balances] = [] } = usePoolTokens(poolContract);
  const underlyingReservesBalanceOf = balances?.[baseAssetIndex];
  const principalReservesBalanceOf = balances?.[principalTokenIndex];

  const { decimals: baseAssetDecimals } = getTokenInfo(underlying);
  const underlyingReserves = formatUnits(
    underlyingReservesBalanceOf ?? 0,
    baseAssetDecimals,
  );
  const principalReserves = formatUnits(
    principalReservesBalanceOf ?? 0,
    baseAssetDecimals,
  );

  const { result: [, amountOut] = [] } = getCalcSwap(
    amountIn,
    SwapKind.GIVEN_IN,
    poolInfo,
    bond,
    underlying,
    principalReserves,
    underlyingReserves,
    totalSupply,
  );

  return clipStringValueToDecimals(amountOut?.toString(), baseAssetDecimals);
}
