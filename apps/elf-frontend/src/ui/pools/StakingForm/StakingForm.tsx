import { Intent } from "@blueprintjs/core";
import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { WeightedPool } from "@elementfi/core-typechain/dist/v1";
import { Web3Provider } from "@ethersproject/providers";
import { useNumericInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import { useJoinConvergentPool } from "ui/pools/hooks/useJoinConvergentPool/useJoinConvergentPool";
import { useJoinWeightedPool } from "ui/pools/hooks/useJoinWeightedPool";
import { useTokenPoolBalance } from "ui/pools/hooks/useTokenPoolBalance/useTokenPoolBalance";
import { StakingConfirmationDrawer } from "ui/pools/StakeTokensConfirmationDrawer/StakeTokensConfirmationDrawer";
import { useTokenBalanceOf } from "ui/token/hooks/useTokenBalanceOf";
import { IconProps } from "ui/token/TokenIcon";
import { ConnectWalletDialog } from "ui/wallets/ConnectWalletDialog/ConnectWalletDialog";
import { useEthBalance } from "ui/wallets/hooks/useEthBalance/useEthBalance";
import ContractAddresses from "addresses/addresses";
import { BALANCER_ETH_SENTINEL } from "integrations/balancer/ethSentinel";
import { formatBalance } from "base/formatBalance/formatBalance";
import { CryptoSymbol } from "elf/crypto/CryptoSymbol";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolContract } from "elf/pools/PoolContract";
import { PoolInfo } from "elf/pools/PoolInfo";
import { validateStakingValue } from "elf/staking/validateStakeValue";
import { getTokenInfo } from "tokenlists/tokenlists";
import { trancheContracts } from "elf/tranche/tranches";
import { BigNumber, Signer } from "ethers";
import { formatEther, formatUnits, parseUnits } from "ethers/lib/utils";
import React, {
  Fragment,
  ReactElement,
  ReactEventHandler,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { t } from "ttag";

interface StakingAssetInputProps {
  cryptoSymbol: CryptoSymbol;
  cryptoDecimals: number | undefined;
  cryptoAssetIcon: React.FC<IconProps>;
  cryptoBalanceOf: BigNumber | undefined;
  cryptoDisplayBalance: string | number;
  disabled: boolean;
  onPreviewUpdate: (otherNeeded: string, lpOut: string | undefined) => void;
  onChange: (inputValue: string) => void;
  labelTopLeft: string | undefined;
  value: string | undefined;
  validValue: boolean;
  tokenPoolReserves: string | undefined;
  otherTokenPoolReserves: string | undefined;
  totalSupply: string | undefined;
}

interface StakingSubmitButtonProps {
  disabled: boolean;
  label: string;
  error: boolean;
  onClick: ReactEventHandler;
}

interface StakingInputProps {
  termAssetInputProps: StakingAssetInputProps;
  baseAssetInputProps: StakingAssetInputProps;
  submitButtonProps: StakingSubmitButtonProps;
}
interface StakingFormProps {
  library: Web3Provider | undefined;
  signer: Signer | undefined;
  account: string | null | undefined;
  poolInfo: PoolInfo;
  formDisabled?: boolean;
  submitDisabled?: boolean;
  buttonLabel: string;
  buttonIntent?: Intent;
  children: (inputProps: StakingInputProps) => ReactNode;
}

export function StakingForm(props: StakingFormProps): ReactElement {
  const {
    account,
    library,
    signer,
    buttonLabel,
    formDisabled = false,
    submitDisabled = false,
    poolInfo,
    children,
  } = props;
  const pool = getPoolContract(poolInfo.address);

  const [isWalletDialogOpen, setWalletDialogOpen] = useState(false);
  // local state
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const onClickButton = useCallback(() => {
    if (!account) {
      return setWalletDialogOpen(true);
    }
    openDrawer();
  }, [account, openDrawer]);

  const {
    baseAssetContract,
    baseAssetIndex,
    termAssetContract,
    termAssetIndex,
  } = getPoolTokens(poolInfo);
  // Pool calls
  const { data: totalSupplyBN } = useSmartContractReadCall(pool, "totalSupply");
  const totalSupply = formatEther(totalSupplyBN ?? 0);

  const {
    asset: baseAsset,
    symbol: baseAssetSymbol,
    decimals: baseAssetDecimals,
    balanceOf: baseAssetBalanceOf,
    displayBalance: baseAssetDisplayBalance,
    poolBalance: baseAssetPoolBalance,
  } = useTokenInfoForTradeInput(pool, baseAssetContract, account, library);

  // use this hook to make sure we get the ETH icon if the base asset it WETH
  const cryptoAsset = getCryptoAssetForToken(baseAssetContract?.address);
  const termCryptoAsset = getCryptoAssetForToken(termAssetContract?.address);
  const BaseAssetIcon = findAssetIcon(cryptoAsset);
  const TermAssetIcon = findAssetIcon(termCryptoAsset);

  const {
    asset: termAsset,
    symbol: termAssetSymbol,
    address: termAssetAddress,
    decimals: termAssetDecimals,
    balanceOf: termAssetBalanceOf,
    displayBalance: termAssetDisplayBalance,
    poolBalance: termAssetPoolBalance,
  } = useTokenInfoForTradeInput(pool, termAssetContract, account, library);
  const isPrincipalPoolType = trancheContracts
    .map(({ address }) => address)
    .includes(termAssetAddress ?? "");

  const baseAssetReserves = formatUnits(
    baseAssetPoolBalance ?? 0,
    baseAssetDecimals,
  );

  const yieldAssetReserves = formatUnits(
    termAssetPoolBalance ?? 0,
    termAssetDecimals,
  );

  const { stringValue: baseAssetIn, setValue: onChangeBaseAssetIn } =
    useNumericInput();
  const { stringValue: termAssetIn, setValue: onChangeTermAssetIn } =
    useNumericInput();

  const isValidBaseAssetValue = validateStakingValue(
    baseAssetIn,
    baseAssetBalanceOf,
    baseAssetDecimals,
  );

  const isValidTermAssetValue = validateStakingValue(
    termAssetIn,
    termAssetBalanceOf,
    termAssetDecimals,
  );

  const onClose = useCallback(() => {
    setDrawerOpen(false);
    onChangeBaseAssetIn("");
    onChangeTermAssetIn("");
  }, [onChangeBaseAssetIn, onChangeTermAssetIn]);

  const poolTokenMaxAmounts = [BigNumber.from(0), BigNumber.from(0)];
  poolTokenMaxAmounts[baseAssetIndex] = parseUnits(
    baseAssetIn || "0",
    baseAssetDecimals,
  );
  poolTokenMaxAmounts[termAssetIndex] = parseUnits(
    termAssetIn || "0",
    termAssetDecimals,
  );

  const {
    onJoinPool: joinConvergentPool,
    mutationResult: {
      isLoading: isJoinCCPoolLoading,
      isSuccess: isJoinCCPoolSuccess,
      isError: isJoinCCPoolError,
      error: joinCCPoolError,
    },
  } = useJoinConvergentPool(
    signer,
    account,
    pool,
    poolTokenMaxAmounts,
    onClose,
  );

  const {
    onJoinPool: joinWeightedPool,
    mutationResult: {
      isLoading: isJoinWPoolLoading,
      isSuccess: isJoinWPoolSuccess,
      isError: isJoinWPoolError,
      error: joinWPoolError,
    },
  } = useJoinWeightedPool(
    signer,
    account,
    pool as WeightedPool,
    poolTokenMaxAmounts,
    onClose,
  );

  const onStake = useCallback(() => {
    if (isPrincipalPoolType) {
      joinConvergentPool();
    } else {
      joinWeightedPool();
    }
  }, [isPrincipalPoolType, joinConvergentPool, joinWeightedPool]);

  const insufficientBalance =
    parseUnits(baseAssetIn || "0", baseAssetDecimals).gt(
      baseAssetBalanceOf ?? 0,
    ) ||
    parseUnits(termAssetIn || "0", termAssetDecimals).gt(
      termAssetBalanceOf ?? 0,
    );

  const invalidInput =
    formDisabled ||
    submitDisabled ||
    insufficientBalance ||
    !isValidBaseAssetValue ||
    !isValidTermAssetValue ||
    !baseAssetIn ||
    !termAssetIn;
  const submitButtonDisabled = !!account && invalidInput;

  let submitButtonLabel = buttonLabel;
  let submitButtonError = false;
  if (!baseAssetIn && !termAssetIn) {
    submitButtonLabel = t`Enter an amount`;
  }
  if (insufficientBalance && account) {
    submitButtonError = true;
    submitButtonLabel = t`Insufficient balance`;
  }
  if (!account) {
    submitButtonLabel = t`Connect wallet`;
  }

  return (
    <Fragment>
      {children({
        termAssetInputProps: {
          cryptoSymbol: termAssetSymbol as CryptoSymbol,
          cryptoDecimals: baseAssetDecimals,
          cryptoAssetIcon: TermAssetIcon,
          cryptoBalanceOf: termAssetBalanceOf,
          cryptoDisplayBalance: termAssetDisplayBalance || "",
          disabled: formDisabled,
          onChange: onChangeTermAssetIn,
          onPreviewUpdate: onChangeBaseAssetIn,
          labelTopLeft: t`Term asset`,
          value: termAssetIn,
          validValue: isValidTermAssetValue,
          tokenPoolReserves: yieldAssetReserves,
          otherTokenPoolReserves: baseAssetReserves,
          totalSupply: totalSupply,
        },
        baseAssetInputProps: {
          cryptoSymbol: baseAssetSymbol as CryptoSymbol,
          cryptoDecimals: baseAssetDecimals,
          cryptoAssetIcon: BaseAssetIcon,
          cryptoBalanceOf: baseAssetBalanceOf,
          cryptoDisplayBalance: baseAssetDisplayBalance || "",
          disabled: formDisabled,
          onChange: onChangeBaseAssetIn,
          onPreviewUpdate: onChangeTermAssetIn,
          labelTopLeft: t`Base asset`,
          value: baseAssetIn,
          validValue: isValidBaseAssetValue,
          tokenPoolReserves: baseAssetReserves,
          otherTokenPoolReserves: yieldAssetReserves,
          totalSupply: totalSupply,
        },
        submitButtonProps: {
          disabled: submitButtonDisabled,
          label: submitButtonLabel,
          error: submitButtonError,
          onClick: onClickButton,
        },
      })}
      <StakingConfirmationDrawer
        library={library}
        account={account}
        poolInfo={poolInfo}
        baseAsset={baseAsset}
        termAsset={termAsset}
        baseAssetDecimals={baseAssetDecimals}
        termAssetDecimals={termAssetDecimals}
        baseAssetSymbol={baseAssetSymbol}
        termAssetSymbol={termAssetSymbol}
        baseAssetIn={baseAssetIn}
        termAssetIn={termAssetIn}
        isOpen={isDrawerOpen}
        onClose={onClose}
        stakeError={
          isPrincipalPoolType
            ? (joinCCPoolError as Error | undefined)
            : (joinWPoolError as Error | undefined)
        }
        isStakeLoading={
          isPrincipalPoolType ? isJoinCCPoolLoading : isJoinWPoolLoading
        }
        isStakeError={
          isPrincipalPoolType ? isJoinCCPoolError : isJoinWPoolError
        }
        isStakeSuccess={
          isPrincipalPoolType ? isJoinCCPoolSuccess : isJoinWPoolSuccess
        }
        onStake={onStake}
      />
      <ConnectWalletDialog
        isOpen={isWalletDialogOpen}
        onClose={() => setWalletDialogOpen(false)}
      />
    </Fragment>
  );
}

function useTokenInfoForTradeInput(
  pool: PoolContract,
  tokenContract: ERC20,
  account: string | null | undefined,
  library: Web3Provider | undefined,
) {
  const isWETH = tokenContract?.address === ContractAddresses.wethAddress;
  const { data: ethBalance } = useEthBalance(library, account);

  const asset = getCryptoAssetForToken(tokenContract?.address);
  const symbol = getCryptoSymbol(asset);
  const icon = findAssetIcon(asset);

  // otherwise get values from token calls
  const poolBalance = useTokenPoolBalance(pool, tokenContract);

  const { decimals } = getTokenInfo(tokenContract.address);
  const { data: tokenBalance } = useTokenBalanceOf(tokenContract, account);

  const balanceOf = isWETH ? ethBalance : tokenBalance;
  const displayBalance = formatBalance(balanceOf, decimals);
  const address = isWETH ? BALANCER_ETH_SENTINEL : tokenContract?.address;
  return {
    asset,
    address,
    icon,
    symbol,
    decimals,
    balanceOf,
    displayBalance,
    poolBalance,
  };
}
