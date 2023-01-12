import { ReactElement, useMemo } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { formatEther, formatUnits, parseUnits } from "ethers/lib/utils";
import { t } from "ttag";

import { getBalancerApprovalMessage } from "ui/balancer/balancerApprovalMessage";
import { StakeConfirmationForm } from "ui/pools/StakeTokensConfirmationDrawer/StakeConfirmationForm";
import { StakeTokensDetails } from "ui/pools/StakeTokensConfirmationDrawer/StakeTokensDetails";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { usePoolSwapFee } from "ui/pools/hooks/usePoolSwapFee/usePoolSwapFee";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { useStakingAPY } from "ui/pools/hooks/useStakingAPY";
import { useTokenAllowance } from "ui/token/hooks/useTokenAllowance";
import { TransactionDrawer } from "ui/transactions/TransactionDrawer/TransactionDrawer";
import { ERC20Shim } from "elf/contracts/ERC20Shim";
import {
  CryptoAsset,
  CryptoAssetType,
  findTokenContract,
} from "elf/crypto/CryptoAsset";
import { isPrincipalPool } from "elf/pools/ccpool";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { isConvergentCurvePool } from "elf/pools/PoolContract";
import { PoolInfo } from "elf/pools/PoolInfo";
import { WalletApprovalInfo } from "elf/wallets/WalletApprovalInfo";
import { AddressesJson } from "addresses/addresses";

interface StakingConfirmationDrawerProps {
  account: string | null | undefined;
  library: Web3Provider | undefined;
  poolInfo: PoolInfo;
  baseAsset: CryptoAsset;
  termAsset: CryptoAsset;
  baseAssetDecimals: number;
  termAssetDecimals: number;
  baseAssetSymbol: string;
  termAssetSymbol: string;
  baseAssetIn: string;
  termAssetIn: string;
  isOpen: boolean;
  onClose: () => void;
  onStake: () => void;
  isStakeLoading: boolean;
  isStakeError: boolean;
  isStakeSuccess: boolean;
  stakeError: Error | undefined;
}

export function StakingConfirmationDrawer({
  library,
  account,
  poolInfo,
  baseAsset,
  termAsset,
  termAssetDecimals,
  baseAssetDecimals,
  baseAssetSymbol,
  termAssetSymbol,
  baseAssetIn,
  termAssetIn,
  isOpen,
  onClose,
  isStakeError,
  isStakeLoading,
  isStakeSuccess,
  stakeError,
  onStake,
}: StakingConfirmationDrawerProps): ReactElement {
  const shareOfPool = useShareOfPool(poolInfo, baseAssetDecimals, baseAssetIn);
  const appliedFeePercent = useFeePercent(poolInfo, termAssetIn);
  const stakingAPY = useStakingAPY(poolInfo);
  const isPrincipal = isPrincipalPool(poolInfo);

  // close the drawer after stake succeeds

  const baseAssetInBigNumber = parseUnits(
    baseAssetIn || "0",
    baseAssetDecimals,
  );
  const trancheAssetInBigNumber = parseUnits(
    termAssetIn || "0",
    termAssetDecimals,
  );

  const hasTokenApprovals = useHasTokenApprovals(
    account,
    AddressesJson.addresses.balancerVaultAddress,
    baseAsset,
    termAsset,
    baseAssetInBigNumber,
    trancheAssetInBigNumber,
  );

  // TODO: validate inputs as well
  const confirmButtonDisabled = !hasTokenApprovals;

  const walletApprovalInfos = useWalletApprovalInfos(
    baseAsset,
    baseAssetIn,
    termAsset,
    termAssetIn,
    account,
    AddressesJson.addresses.balancerVaultAddress,
  );

  return (
    <TransactionDrawer
      library={library}
      account={account}
      transactionPending={isStakeLoading}
      transactionSuccess={isStakeSuccess}
      transactionFailed={isStakeError}
      transactionError={stakeError}
      confirmButtonDisabled={confirmButtonDisabled}
      confirmButtonLabel={t`Add liquidity`}
      isOpen={isOpen}
      onClose={onClose}
      onConfirmTransaction={onStake}
      walletApprovalInfos={walletApprovalInfos}
      transactionDetails={
        <StakeConfirmationForm
          assetOneSymbol={baseAssetSymbol}
          assetTwoSymbol={termAssetSymbol}
          heading={t`Confirm adding liquidity`}
          assetOneValueLabel={baseAssetIn}
          assetTwoValueLabel={termAssetIn}
        >
          <StakeTokensDetails
            isPrincipalPool={isPrincipal}
            shareOfPool={shareOfPool}
            poolAPY={stakingAPY}
            poolFees={appliedFeePercent}
          />
        </StakeConfirmationForm>
      }
    />
  );
}

function useFeePercent(poolInfo: PoolInfo, termAssetIn: string) {
  const poolContract = getPoolContract(poolInfo.address);
  const spotPrice = usePoolSpotPrice(poolContract, termAssetIn);
  const feePercentBN = usePoolSwapFee(poolInfo);
  const feePercent = +formatEther(feePercentBN ?? 0);
  let appliedFeePercent = feePercent;
  if (isConvergentCurvePool(poolContract) && spotPrice) {
    // CCPools apply the fee perent to the difference in price between the two assets
    appliedFeePercent = feePercent * Math.abs(1 - spotPrice);
  }
  return appliedFeePercent;
}

function useShareOfPool(
  poolInfo: PoolInfo,
  baseAssetDecimals: number,
  baseAssetIn: string,
) {
  const poolContract = getPoolContract(poolInfo.address);
  const { baseAssetIndex } = getPoolTokens(poolInfo);
  const { data: [, balances] = [] } = usePoolTokens(poolContract);
  const baseAssetReservesBN = balances?.[baseAssetIndex] ?? BigNumber.from(0);
  const baseAssetReserves = +formatUnits(
    baseAssetReservesBN,
    baseAssetDecimals,
  );
  // because we limit staking of assets to the current reserves ratio, we can just use one side to
  // calculate share of pool
  const shareOfPool = +baseAssetIn / (baseAssetReserves + +baseAssetIn);
  return shareOfPool;
}

function useWalletApprovalInfos(
  baseAsset: CryptoAsset,
  baseAssetAmount: string,
  trancheAsset: CryptoAsset,
  trancheAssetAmount: string,
  account: string | null | undefined,
  vaultAddress: string | undefined,
) {
  return useMemo(() => {
    const walletApprovalInfos: WalletApprovalInfo[] = [
      {
        cryptoAsset: trancheAsset,
        ownerAddress: account,
        spenderAddress: vaultAddress,
        amount: trancheAssetAmount,
        messageRenderer: getBalancerApprovalMessage,
      },
    ];
    if (baseAsset?.type !== CryptoAssetType.ETHEREUM) {
      walletApprovalInfos.push({
        cryptoAsset: baseAsset,
        ownerAddress: account,
        spenderAddress: vaultAddress,
        amount: baseAssetAmount,
        messageRenderer: getBalancerApprovalMessage,
      });
    }
    return walletApprovalInfos;
  }, [
    account,
    baseAsset,
    baseAssetAmount,
    trancheAsset,
    trancheAssetAmount,
    vaultAddress,
  ]);
}

function getConfirmButtonDisabled(
  account: string | null | undefined,
  baseAsset: CryptoAsset | undefined,
  amountIn: BigNumber | undefined,
  marketAllowance: BigNumber | undefined,
) {
  // can't confirm anything w/out a base asset
  if (!baseAsset) {
    return true;
  }

  // must be connected to click this button
  if (!account) {
    return true;
  }

  // disabled when no amount is entered
  if (!amountIn) {
    return true;
  }

  // disabled if it's an erc20 or erc20permits w/out enough allowance.
  // NOTE: we have to use approvals for erc20permits because balancer does not
  // support that
  if (
    [CryptoAssetType.ERC20, CryptoAssetType.ERC20PERMIT].includes(
      baseAsset.type,
    )
  ) {
    const hasEnoughAllowance = marketAllowance?.gte(amountIn);
    if (!hasEnoughAllowance) {
      return true;
    }
  }

  // otherwise the button should not be disabled
  return false;
}

const useHasTokenApprovals = (
  ownerAddress: string | null | undefined,
  spenderAddress: string | undefined,
  baseAsset: CryptoAsset | undefined,
  trancheAsset: CryptoAsset | undefined,
  baseAssetIn: BigNumber | undefined,
  trancheAssetIn: BigNumber | undefined,
) => {
  const { data: baseAssetAllowance } = useTokenAllowance(
    findTokenContract(baseAsset) as ERC20Shim,
    ownerAddress,
    spenderAddress,
  );
  const { data: trancheAssetAllowance } = useTokenAllowance(
    findTokenContract(trancheAsset) as ERC20Shim,
    ownerAddress,
    spenderAddress,
  );

  const hasEnoughBaseAssetAllowance = getConfirmButtonDisabled(
    ownerAddress,
    baseAsset,
    baseAssetIn,
    baseAssetAllowance,
  );
  const hasEnoughTrancheAssetAllowance = getConfirmButtonDisabled(
    ownerAddress,
    trancheAsset,
    trancheAssetIn,
    trancheAssetAllowance,
  );
  return !hasEnoughBaseAssetAllowance || !hasEnoughTrancheAssetAllowance;
};
