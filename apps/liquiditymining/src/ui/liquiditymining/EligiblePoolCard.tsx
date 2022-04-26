import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/tokenlist";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { convertEpochSecondsToDate } from "@elementfi/base/time/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { useTotalFiatLiquidity } from "@elementfi/core/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { getTokenInfo } from "@elementfi/core/tokenlists/tokenlists";
import { getVaultTokenInfoForTranche } from "@elementfi/core/tranche/tranches";
import React, { ReactElement, useState } from "react";
import { formatAbbreviatedDate } from "src/base/dates";
import {
  eligibleGoerliPoolContracts,
  poolIdsByPoolAddress,
} from "src/elf/liquiditymining/eligiblepools";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card from "src/ui/base/Card/Card";
import Well from "src/ui/base/Well/Well";
import { useLPTokenBalance } from "src/ui/liquiditymining/hooks/useLPTokenBalance";
import { useELFIPerBlock } from "src/ui/liquiditymining/hooks/useELFIPerBlock";
import { useUserInfo } from "src/ui/liquiditymining/hooks/useUserInfo";
import { t } from "ttag";
import {
  ETHEREUM_BLOCKS_PER_WEEK,
  ChainId,
} from "@elementfi/base/ethereum/ethereum";
import { getPoolURL } from "@elementfi/core/pools/urls";
import { commify } from "ethers/lib/utils";
import { usePoolShare } from "src/ui/liquiditymining/hooks/usePoolShare";
import { StakeDialog } from "src/ui/liquiditymining/StakeDialog";
import { Signer } from "ethers";
import { useTotalFiatStaked } from "src/ui/liquiditymining/hooks/useTotalFiatStaked";
import { UnstakeDialog } from "src/ui/liquiditymining/UnstakeDialog";
import { useClaim } from "src/ui/liquiditymining/hooks/useClaim";
import { useTransactionOptionsWithToast } from "src/ui/transactions/useTransactionOptionsWithToast";
import AssetIcon from "src/ui/base/svg/AssetIcon/AssetIcon";

interface EligiblePoolCardProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  pool: PrincipalPoolTokenInfo;
}
export function EligiblePoolCard({
  account,
  signer,
  pool,
  pool: {
    address: poolAddress,
    symbol: poolSymbol,
    extensions: { bond },
  },
}: EligiblePoolCardProps): ReactElement {
  const [stakeDialogIsShowing, setStakeDialogIsShowing] = useState(false);
  const [unstakeDialogIsShowing, setUnstakeDialogIsShowing] = useState(false);

  const vaultTokenInfo = getVaultTokenInfoForTranche(bond);
  const {
    symbol,
    extensions: { unlockTimestamp, underlying },
  } = getTokenInfo<PrincipalTokenInfo>(bond);

  const { symbol: baseAssetSymbol } = getTokenInfo(underlying);

  const poolId = poolIdsByPoolAddress[pool.address];
  const ccPoolTVL = useTotalFiatLiquidity(pool);
  const unlockDate = convertEpochSecondsToDate(unlockTimestamp);
  const dateLabel = formatAbbreviatedDate(unlockDate);

  const poolContract = eligibleGoerliPoolContracts[poolAddress];
  const { data: lpTokenBalance } = useLPTokenBalance(poolContract, account);
  const elfiPerBlock = useELFIPerBlock(poolAddress);
  const elfiPerWeek = ETHEREUM_BLOCKS_PER_WEEK * elfiPerBlock;

  const poolShare = usePoolShare(poolAddress, account);
  const { data: userInfo } = useUserInfo(account, poolAddress);
  const depositedBalance = userInfo?.amount || "0.0";
  const depositedBalanceLabel = (+depositedBalance).toFixed(4);
  const pendingRewards = userInfo?.rewardDebt || "0.0";
  const pendingRewardsLabel = (+pendingRewards).toFixed(2);

  // TODO: Get ChainId from environment
  const POOL_HREF = getPoolURL(ChainId.GOERLI, poolAddress);

  const totalFiatStaked = useTotalFiatStaked(pool, account);

  const [transactionIsPending, setTransactionIsPending] = useState(false);
  const transactionOptions = useTransactionOptionsWithToast({
    options: {
      onTransactionSubmitted: () => {
        setTransactionIsPending(true);
      },
      onTransactionMined: () => {
        setTransactionIsPending(false);
      },
    },
  });

  const { mutate: claim } = useClaim(signer, transactionOptions);
  const handleClaim = () => {
    if (account) {
      claim([poolId, account]);
    }
  };

  return (
    <>
      <Card className="flex w-[382px] flex-col space-y-6">
        <div className="flex flex-col items-center">
          <AssetIcon symbol={baseAssetSymbol} className="mb-3 h-12" />
          <span className="font-semibold text-principalRoyalBlue ">{t`${baseAssetSymbol} Principal Pool LP Token`}</span>
          <ExternalLink href={POOL_HREF}>
            <span className="font-semibold text-gray-600">{dateLabel}</span>
          </ExternalLink>
        </div>
        <Well>
          <div className="grid grid-cols-2 gap-8 ">
            <span className="text-principalRoyalBlue">{t`Total Staked`}</span>
            <span className="text-right">${commify(totalFiatStaked)}</span>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <span className="text-principalRoyalBlue">{t`Total ELFI / Week`}</span>
            <span className="text-right">{commify(elfiPerWeek)} ELFI</span>
          </div>
        </Well>

        <div className="space-y-2 px-2">
          <div className="grid grid-cols-2 gap-8 ">
            <span className="text-principalRoyalBlue">{t`Pool Share`}</span>
            <span className="text-right">{poolShare}</span>
          </div>
          <div className="grid grid-cols-2 gap-8 ">
            <span className="text-principalRoyalBlue">{t`ELFI / Week`}</span>
            <span className="text-right">{`${pendingRewardsLabel} ELFI`}</span>
          </div>
          <div className="grid grid-cols-2 gap-8 ">
            <span className="text-principalRoyalBlue">{t`Unclaimed`}</span>
            <span className="text-right font-semibold">{`${pendingRewardsLabel} ELFI`}</span>
          </div>
        </div>

        <div className="space-y-8 px-2">
          <div className="grid grid-cols-2 gap-8 ">
            <div className="flex flex-col">
              <span className="mb-1 text-principalRoyalBlue">LP Staked</span>
              <span className="font-semibold">{depositedBalanceLabel}</span>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant={ButtonVariant.OUTLINE_BLUE}
                onClick={() => setUnstakeDialogIsShowing(true)}
              >
                <MinusIcon className="h-6 text-principalRoyalBlue" />
              </Button>
              <Button
                variant={ButtonVariant.OUTLINE_BLUE}
                onClick={() => setStakeDialogIsShowing(true)}
              >
                <PlusIcon className="h-6 text-principalRoyalBlue" />
              </Button>
            </div>
          </div>
          <Button
            className="w-full justify-center"
            variant={ButtonVariant.OUTLINE_BLUE}
            onClick={handleClaim}
            loading={transactionIsPending}
            disabled={!+depositedBalance}
          >{t`Claim`}</Button>
        </div>
      </Card>

      <StakeDialog
        account={account}
        signer={signer}
        poolId={poolId}
        poolContract={poolContract}
        isOpen={stakeDialogIsShowing}
        onClose={() => setStakeDialogIsShowing(false)}
      />

      <UnstakeDialog
        account={account}
        signer={signer}
        poolId={poolId}
        poolContract={poolContract}
        isOpen={unstakeDialogIsShowing}
        onClose={() => setUnstakeDialogIsShowing(false)}
      />
    </>
  );
}
