import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/tokenlist";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { convertEpochSecondsToDate } from "@elementfi/base/time/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { getTokenInfo } from "@elementfi/core/tokenlists/tokenlists";
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
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";
import H2 from "src/ui/base/H2/H2";
import { Elfi } from "./Elfi";

interface EligiblePoolCardProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  pool: PrincipalPoolTokenInfo;
  className?: string;
}
export function EligiblePoolCard({
  account,
  signer,
  pool,
  pool: {
    address: poolAddress,
    extensions: { bond },
  },
  className,
}: EligiblePoolCardProps): ReactElement {
  const [stakeDialogIsShowing, setStakeDialogIsShowing] = useState(false);
  const [unstakeDialogIsShowing, setUnstakeDialogIsShowing] = useState(false);

  const {
    extensions: { unlockTimestamp, underlying },
  } = getTokenInfo<PrincipalTokenInfo>(bond);

  const { symbol: baseAssetSymbol } = getTokenInfo(underlying);

  const poolId = poolIdsByPoolAddress[pool.address];
  const unlockDate = convertEpochSecondsToDate(unlockTimestamp);

  const poolContract = eligibleGoerliPoolContracts[poolAddress];
  const { data: lpTokenBalance } = useLPTokenBalance(poolContract, account);
  const elfiPerBlock = useELFIPerBlock(poolAddress);
  const elfiPerWeek = ETHEREUM_BLOCKS_PER_WEEK * elfiPerBlock;

  const poolShare = usePoolShare(poolAddress, account);
  const { data: userInfo } = useUserInfo(account, poolAddress);
  const depositedBalance = userInfo?.amount || "0";
  const depositedBalanceLabel = (+depositedBalance).toFixed(4);
  const pendingRewards = userInfo?.rewardDebt || "0";
  const pendingRewardsLabel = (+pendingRewards).toFixed(2);

  // TODO: Get ChainId from environment
  const POOL_HREF = getPoolURL(ChainId.GOERLI, poolAddress);

  const totalFiatStaked = useTotalFiatStaked(pool);

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

  const isStakeDisabled = !+(lpTokenBalance || 0);
  const isUnstakeDisabled = !+depositedBalance;
  const isClaimDisabled = !+pendingRewards;
  return (
    <>
      <Card className={className}>
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <H2 className="text-center !text-2xl font-medium tracking-wide text-brandDarkBlue-dark">{t`${baseAssetSymbol} LP Token`}</H2>
            <ExternalLink href={POOL_HREF}>
              <Tag
                intent={Intent.PRIMARY}
                className="!rounded-full py-1 font-light"
              >
                {formatAbbreviatedDate(unlockDate)}
              </Tag>
            </ExternalLink>
          </div>
          <AssetIcon symbol={baseAssetSymbol} className="mb-2 h-14" />
        </div>
        <Well className="mb-6">
          <p className="flex flex-wrap justify-between gap-x-1 px-1 align-baseline">
            <span className="whitespace-nowrap text-principalRoyalBlue">{t`Total Staked`}</span>
            <span>${commify(totalFiatStaked)}</span>
          </p>
          <p className="mb-1 flex flex-wrap justify-between gap-x-1 px-1 align-baseline">
            <span className="whitespace-nowrap text-principalRoyalBlue">{t`Total ELFI / Week`}</span>
            <Elfi amount={elfiPerWeek} />
          </p>
        </Well>

        <div className="mb-6 space-y-1 px-2">
          <p className="flex flex-wrap justify-between gap-x-1 align-baseline">
            <span className="whitespace-nowrap text-principalRoyalBlue">{t`Pool Share`}</span>
            <span>{poolShare}</span>
          </p>
          <p className="flex flex-wrap justify-between gap-x-1 align-baseline">
            <span className="whitespace-nowrap text-principalRoyalBlue">{t`ELFI / Week`}</span>
            <Elfi amount={pendingRewardsLabel} />
          </p>
          <p className="flex flex-wrap justify-between gap-x-1 align-baseline">
            <span className="whitespace-nowrap text-principalRoyalBlue">{t`Unclaimed ELFI`}</span>
            <Elfi className="font-semibold" amount={pendingRewards} />
          </p>
        </div>

        <div className="space-y-8 px-2">
          <div className="grid grid-cols-2 gap-8 ">
            <div className="flex flex-col">
              <span className="mb-1 text-principalRoyalBlue">LP Staked</span>
              <span className="font-semibold">{depositedBalanceLabel}</span>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                disabled={isUnstakeDisabled}
                variant={ButtonVariant.MINIMAL}
                onClick={() => setUnstakeDialogIsShowing(true)}
                title="Unstake"
              >
                <MinusIcon className="h-5 text-principalRoyalBlue" />
              </Button>
              <Button
                disabled={isStakeDisabled}
                variant={ButtonVariant.MINIMAL}
                onClick={() => setStakeDialogIsShowing(true)}
                title="Stake"
              >
                <PlusIcon className={`h-5 text-principalRoyalBlue`} />
              </Button>
            </div>
          </div>
          <Button
            className="w-full justify-center"
            variant={ButtonVariant.GRADIENT}
            onClick={handleClaim}
            loading={transactionIsPending}
            disabled={isClaimDisabled}
          >{t`Claim ELFI`}</Button>
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
