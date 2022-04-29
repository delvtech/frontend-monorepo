import { Button, Callout, Intent } from "@blueprintjs/core";
import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { TokenInfo } from "@elementfi/tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import { getTokenAddressForBalancer } from "elf/balancer/getTokenAddressForBalancer";
import { SwapKind } from "integrations/balancer/SwapKind";
import tw from "efi-tailwindcss-classnames";
import { getCalcSwap } from "ui/balancer/useQueryBatchSwap/useQueryBatchSwap";
import { useNumericInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import { useCryptoBalanceOf } from "ui/crypto/hooks/useCryptoBalance/useCryptoBalance";
import { useCanPerformPool } from "ui/pools/hooks/usePoolCanPerform/usePoolCanPerform";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { useTokenPoolBalance } from "ui/pools/hooks/useTokenPoolBalance/useTokenPoolBalance";
import { useTokenPoolIndex } from "ui/pools/hooks/useTokenPoolIndex/useTokenPoolIndex";
import {
  getPriceImpact,
  SwapTokensTransactionConfirmationDrawer,
} from "ui/swaps/SwapTokensTransactionConfirmationDrawer/SwapTokensTransactionConfirmationDrawer";
import { TradeInput } from "ui/trade/TradeInput/TradeInput";
import { ConnectWalletDialog } from "ui/wallets/ConnectWalletDialog/ConnectWalletDialog";
import { BALANCER_ETH_SENTINEL } from "integrations/balancer/ethSentinel";
import { formatBalance } from "base/formatBalance/formatBalance";
import { CryptoAssetType } from "elf/crypto/CryptoAsset";
import { CryptoAssets } from "elf/crypto/CryptoAssetRegistry";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { interestTokenContractsByAddress } from "elf/interestToken/interestToken";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolContract } from "elf/pools/PoolContract";
import { PoolInfo } from "elf/pools/PoolInfo";
import {
  isYieldPool,
  MAX_WEIGHTED_POOL_PRICE_IMPACT,
} from "elf/pools/weightedPool";
import { validateTradeValues } from "elf/trade/validateTradeValues";
import { trancheContractsByAddress as principalTokenContractsByAddress } from "elf/tranche/tranches";
import { underlyingContractsByAddress } from "elf/underlying/underlying";
import { BigNumber, Signer } from "ethers";
import { formatEther, formatUnits, parseUnits } from "ethers/lib/utils";
import { ReactElement, useCallback, useState } from "react";
import { t } from "ttag";

interface TradePanelProps {
  tradeType: "buy" | "sell";
  library: Web3Provider | undefined;
  signer: Signer | undefined;
  account: string | null | undefined;
  poolInfo: PoolInfo;
  formDisabled?: boolean;
  submitDisabled?: boolean;
  buttonLabel: string;
  buttonIntent?: Intent;
  tokenIn: TokenInfo;
  tokenOut: TokenInfo;
}

export function TradePanel(props: TradePanelProps): ReactElement {
  const {
    tradeType,
    account,
    library,
    buttonLabel,
    formDisabled = false,
    submitDisabled = false,
    poolInfo,
    tokenIn,
    tokenOut,
  } = props;

  const {
    address: poolAddress,
    extensions: { underlying: baseAssetAddress },
  } = poolInfo;
  const { termAssetInfo } = getPoolTokens(poolInfo);
  const baseAsset = CryptoAssets[baseAssetAddress];

  const pool = getPoolContract(poolAddress);

  /**
   * Component state
   **/
  const [swapKind, setSwapKind] = useState(SwapKind.GIVEN_IN);
  const [isWalletDialogOpen, setWalletDialogOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  /**
   * Handlers
   **/
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const onClickButton = useCallback(() => {
    if (!account) {
      return setWalletDialogOpen(true);
    }
    openDrawer();
  }, [account, openDrawer]);

  const { stringValue: amountIn, setValue: setAmountIn } = useNumericInput();
  const { stringValue: amountOut, setValue: setAmountOut } = useNumericInput();

  const clearInputs = useCallback(() => {
    setAmountIn("");
    setAmountOut("");
  }, [setAmountIn, setAmountOut]);

  const onClose = useCallback(() => {
    setDrawerOpen(false);
    setAmountIn("");
    setAmountOut("");
  }, [setAmountIn, setAmountOut]);

  /**
   * Token information for inputs
   */
  const {
    asset: tokenInAsset,
    address: tokenInAddress = "",
    // need this for calcSwap.  can't send ETH 0x00 address
    contractAddress: tokenInContractAddress = "",
    icon: tokenInIcon,
    symbol: tokenInSymbol,
    decimals: tokenInDecimals,
    balanceOf: tokenInBalanceOf,
    displayBalance: tokenInDisplayBalance,
    poolBalance: tokenInPoolBalance,
    poolIndex: tokenInPoolIndex,
  } = useTokenInfoForTradeInput(pool, tokenIn, account, library);

  const {
    address: tokenOutAddress = "",
    contractAddress: tokenOutContractAddress = "",
    icon: tokenOutIcon,
    symbol: tokenOutSymbol,
    decimals: tokenOutDecimals,
    balanceOf: tokenOutBalanceOf,
    displayBalance: tokenOutDisplayBalance,
    poolBalance: tokenOutPoolBalance,
    poolIndex: tokenOutPoolIndex,
  } = useTokenInfoForTradeInput(pool, tokenOut, account, library);

  const canPerformBuy = useCanPerformPool(poolAddress, "buy");
  const canPerformSell = useCanPerformPool(poolAddress, "sell");
  let canPerformTransaction = true;
  if (tokenInContractAddress === baseAssetAddress) {
    canPerformTransaction = canPerformBuy;
  } else if (tokenOutAddress === getTokenAddressForBalancer(baseAsset)) {
    canPerformTransaction = canPerformSell;
  }

  /**
   * Form validation
   */
  const { isValidTokenInValue, isValidTokenOutValue } = validateTradeValues(
    amountIn,
    amountOut,
    tokenInPoolBalance,
    tokenOutPoolBalance,
    tokenInBalanceOf,
    tokenInDecimals,
  );

  const insufficientBalance = parseUnits(amountIn || "0", tokenInDecimals).gt(
    tokenInBalanceOf ?? 0,
  );

  const insufficientPoolBalance = parseUnits(
    amountOut || "0",
    tokenOutDecimals,
  ).gt(tokenOutPoolBalance ?? 0);

  const spotPrice = usePoolSpotPrice(pool, termAssetInfo.address);
  const priceImpact = getPriceImpact(
    amountIn,
    amountOut,
    spotPrice,
    baseAssetAddress === tokenInContractAddress,
  );

  const priceImpactTooHigh =
    isYieldPool(poolInfo) && priceImpact > MAX_WEIGHTED_POOL_PRICE_IMPACT;

  const invalidInput =
    formDisabled ||
    submitDisabled ||
    insufficientBalance ||
    insufficientPoolBalance ||
    !isValidTokenInValue ||
    !isValidTokenOutValue ||
    !amountIn ||
    !amountOut;

  const submitButtonDisabled =
    !account || invalidInput || !canPerformTransaction || priceImpactTooHigh;

  const { submitButtonError, submitButtonLabel } = getSubmitButtonLabel(
    buttonLabel,
    amountIn,
    amountOut,
    insufficientBalance,
    account,
    insufficientPoolBalance,
    priceImpactTooHigh,
  );

  const { data: totalSupplyBN } = useSmartContractReadCall(pool, "totalSupply");
  const totalSupply = formatEther(totalSupplyBN ?? 0);

  /**
   * Main input handlers
   */
  const onChangeIn = useOnChangeIn(
    poolInfo,
    tokenInContractAddress,
    tokenInPoolBalance,
    tokenInDecimals,
    tokenOutContractAddress,
    tokenOutPoolBalance,
    tokenOutDecimals,
    totalSupply,
    clearInputs,
    setSwapKind,
    setAmountIn,
    setAmountOut,
  );

  const onChangeOut = useOnChangeOut(
    poolInfo,
    tokenInContractAddress,
    tokenInPoolBalance,
    tokenInDecimals,
    tokenOutContractAddress,
    tokenOutPoolBalance,
    tokenOutDecimals,
    totalSupply,
    clearInputs,
    setSwapKind,
    setAmountIn,
    setAmountOut,
  );

  return (
    <div
      className={tw(
        "flex",
        "flex-col",
        "justify-between",
        "py-2",
        "space-y-2",
        "h-full",
      )}
    >
      {/* Trade Asset */}
      <TradeInput
        cryptoDecimals={tokenInDecimals}
        cryptoBalanceOf={tokenInBalanceOf}
        cryptoDisplayBalance={tokenInDisplayBalance}
        cryptoSymbol={tokenInSymbol}
        cryptoIcon={tradeType === "buy" ? tokenInIcon : undefined}
        previewCryptoAddress={tokenOutAddress}
        previewCryptoPoolIndex={tokenOutPoolIndex}
        labelTopLeft={
          swapKind === SwapKind.GIVEN_IN ? t`Trade` : t`Trade (estimated)`
        }
        disabled={formDisabled}
        swapKind={SwapKind.GIVEN_IN}
        pool={pool}
        onChange={onChangeIn}
        value={amountIn}
        validValue={isValidTokenInValue && !priceImpactTooHigh}
      />
      <TradeInput
        cryptoDecimals={tokenOutDecimals}
        cryptoBalanceOf={tokenOutBalanceOf}
        cryptoDisplayBalance={tokenOutDisplayBalance}
        cryptoSymbol={tokenOutSymbol}
        cryptoIcon={tradeType === "sell" ? tokenOutIcon : undefined}
        previewCryptoAddress={tokenInAddress}
        previewCryptoPoolIndex={tokenInPoolIndex}
        labelTopLeft={
          swapKind === SwapKind.GIVEN_OUT ? t`For` : t`For (estimated)`
        }
        disabled={formDisabled}
        swapKind={SwapKind.GIVEN_OUT}
        pool={pool}
        onChange={onChangeOut}
        value={amountOut}
        validValue={isValidTokenOutValue && !priceImpactTooHigh}
      />
      <Button
        disabled={submitButtonDisabled}
        onClick={onClickButton}
        minimal
        outlined
        large
        intent={
          submitButtonError || !canPerformTransaction
            ? Intent.DANGER
            : Intent.PRIMARY
        }
      >
        {submitButtonLabel}
      </Button>
      {!canPerformTransaction ? (
        <Callout intent={Intent.DANGER}>
          {t`Trading for this token has been temporarily disabled, please refer to our Discord or Twitter for further updates.`}
        </Callout>
      ) : null}
      <SwapTokensTransactionConfirmationDrawer
        tokenInAddress={tokenInAddress}
        tokenInSymbol={tokenInSymbol}
        tokenInDecimals={tokenInDecimals}
        tokenInAsset={tokenInAsset}
        tokenInIcon={tokenInIcon}
        tokenOutAddress={tokenOutAddress}
        tokenOutSymbol={tokenOutSymbol}
        tokenOutDecimals={tokenOutDecimals}
        tokenOutIcon={tokenOutIcon}
        account={account}
        library={library}
        poolInfo={poolInfo}
        amountIn={amountIn}
        amountOut={amountOut}
        swapKind={swapKind}
        spotPrice={spotPrice}
        isOpen={isDrawerOpen}
        onClose={onClose}
      />
      <ConnectWalletDialog
        isOpen={isWalletDialogOpen}
        onClose={() => setWalletDialogOpen(false)}
      />
    </div>
  );
}

function useOnChangeOut(
  poolInfo: PoolInfo,
  tokenInAddress: string,
  tokenInBalanceOf: BigNumber | undefined,
  tokenInDecimals: number | undefined,
  tokenOutAddress: string,
  tokenOutBalanceOf: BigNumber | undefined,
  tokenOutDecimals: number | undefined,
  totalSupply: string,
  clearInputs: () => void,
  setSwapKind: (swapKind: SwapKind) => void,
  setAmountIn: (value: string) => void,
  setAmountOut: (value: string) => void,
) {
  return useCallback(
    (newAmountOut: string, swapKind: SwapKind) => {
      if (!newAmountOut) {
        clearInputs();
        return;
      }

      const tokenInReserves = formatUnits(
        tokenInBalanceOf ?? 0,
        tokenInDecimals,
      );
      const tokenOutReserves = formatUnits(
        tokenOutBalanceOf ?? 0,
        tokenOutDecimals,
      );

      const newAmountOutResult = getCalcSwap(
        newAmountOut,
        SwapKind.GIVEN_OUT,
        poolInfo,
        tokenInAddress,
        tokenOutAddress,
        tokenInReserves,
        tokenOutReserves,
        totalSupply,
      );

      const { result: [newAmountIn] = ["", ""] } = newAmountOutResult;
      setSwapKind(swapKind);
      setAmountIn(newAmountIn);
      setAmountOut(newAmountOut);
    },
    [
      clearInputs,
      poolInfo,
      setAmountIn,
      setAmountOut,
      setSwapKind,
      tokenInAddress,
      tokenInBalanceOf,
      tokenInDecimals,
      tokenOutAddress,
      tokenOutBalanceOf,
      tokenOutDecimals,
      totalSupply,
    ],
  );
}

function useOnChangeIn(
  poolInfo: PoolInfo,
  tokenInAddress: string,
  tokenInBalanceOf: BigNumber | undefined,
  tokenInDecimals: number | undefined,
  tokenOutAddress: string,
  tokenOutBalanceOf: BigNumber | undefined,
  tokenOutDecimals: number | undefined,
  totalSupply: string,
  clearInputs: () => void,
  setSwapKind: (swapKind: SwapKind) => void,
  setAmountIn: (value: string) => void,
  setAmountOut: (value: string) => void,
) {
  return useCallback(
    (newAmountIn: string, swapKind: SwapKind) => {
      if (!newAmountIn) {
        clearInputs();
        return;
      }
      const tokenInReserves = formatUnits(
        tokenInBalanceOf ?? 0,
        tokenInDecimals,
      );
      const tokenOutReserves = formatUnits(
        tokenOutBalanceOf ?? 0,
        tokenOutDecimals,
      );

      const newAmountOutResult = getCalcSwap(
        newAmountIn,
        SwapKind.GIVEN_IN,
        poolInfo,
        tokenInAddress,
        tokenOutAddress,
        tokenInReserves,
        tokenOutReserves,
        totalSupply,
      );

      const { result: [, newAmountOut] = ["", ""] } = newAmountOutResult;

      setSwapKind(swapKind);
      setAmountIn(newAmountIn);
      setAmountOut(newAmountOut);
    },
    [
      clearInputs,
      poolInfo,
      setAmountIn,
      setAmountOut,
      setSwapKind,
      tokenInAddress,
      tokenInBalanceOf,
      tokenInDecimals,
      tokenOutAddress,
      tokenOutBalanceOf,
      tokenOutDecimals,
      totalSupply,
    ],
  );
}

function getSubmitButtonLabel(
  buttonLabel: string,
  amountIn: string,
  amountOut: string,
  insufficientBalance: boolean,
  account: string | null | undefined,
  insufficientPoolBalance: boolean,
  priceIpactTooHigh: boolean,
) {
  let submitButtonLabel = buttonLabel;
  let submitButtonError = false;
  if (!amountIn && !amountOut) {
    submitButtonLabel = t`Enter an amount`;
  }
  if (insufficientBalance && account) {
    submitButtonError = true;
    submitButtonLabel = t`Insufficient balance`;
  }
  if (insufficientPoolBalance && account) {
    submitButtonError = true;
    submitButtonLabel = t`Insufficient pool liquidity`;
  }
  if (priceIpactTooHigh && account) {
    submitButtonError = true;
    submitButtonLabel = t`Price impact too high`;
  }
  if (!account) {
    submitButtonLabel = t`Connect wallet`;
  }
  return { submitButtonError, submitButtonLabel };
}

function useTokenInfoForTradeInput(
  pool: PoolContract,
  tokenInfo: TokenInfo,
  account: string | null | undefined,
  library: Web3Provider | undefined,
) {
  const { decimals } = tokenInfo;

  const tokenContract =
    principalTokenContractsByAddress[tokenInfo.address] ??
    interestTokenContractsByAddress[tokenInfo.address] ??
    underlyingContractsByAddress[tokenInfo.address];

  const asset = getCryptoAssetForToken(tokenInfo.address);
  const address =
    asset?.type === CryptoAssetType.ETHEREUM
      ? BALANCER_ETH_SENTINEL
      : tokenInfo.address;

  const symbol = getCryptoSymbol(asset);
  const icon = findAssetIcon(asset);

  const balanceOf = useCryptoBalanceOf(library, account, asset);
  const displayBalance = formatBalance(balanceOf, decimals);
  const poolBalance = useTokenPoolBalance(
    pool,
    tokenContract as unknown as ERC20,
  );
  const poolIndex = useTokenPoolIndex(pool, tokenContract as unknown as ERC20);

  return {
    asset,
    contractAddress: tokenInfo.address,
    address,
    icon,
    symbol,
    decimals,
    balanceOf,
    displayBalance,
    poolBalance,
    poolIndex,
  };
}
