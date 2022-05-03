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
import { useLPTokenBalance } from "src/ui/liquiditymining/hooks/useLPTokenBalance";
import { useELFIPerBlock } from "src/ui/liquiditymining/hooks/useELFIPerBlock";
import { useUserInfo } from "src/ui/liquiditymining/hooks/useUserInfo";
import { t } from "ttag";
import {
  ETHEREUM_BLOCKS_PER_WEEK,
  ChainId,
} from "@elementfi/base/ethereum/ethereum";
import { formatPercent } from "@elementfi/base/utils/formatPercent/formatPercent";
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
import classNames from "classnames";
import { usePendingSushi } from "src/ui/liquiditymining/hooks/usePendingSushi";

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
  const depositedBalanceLabel = commify((+depositedBalance).toFixed(4));

  const userElfiPerWeek = elfiPerWeek * poolShare;

  const { data: pendingRewards = "0" } = usePendingSushi(poolAddress, account);

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

  const hasNoBalance = !+(lpTokenBalance || 0);
  const hasNotStaked = !+depositedBalance;
  const hasNoRewards = !+pendingRewards;
  return (
    <>
      <Card className={classNames("flex flex-col !p-8", className)}>
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <H2 className="tracking-wide text-principalRoyalBlue">{t`${baseAssetSymbol} LP Token`}</H2>
            <ExternalLink href={POOL_HREF}>
              <Tag
                intent={Intent.PRIMARY}
                className="!rounded-full py-1 font-light"
              >
                {formatAbbreviatedDate(unlockDate)}
              </Tag>
            </ExternalLink>
          </div>
          <AssetIcon symbol={baseAssetSymbol} className="mb-2 h-12" />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="space-y-1 border-t border-b border-hackerSky-dark bg-hackerSky px-4 py-6">
            <p className="gap-x-1align-baseline flex flex-wrap justify-between">
              <span className="whitespace-nowrap text-principalRoyalBlue">{t`Total Staked`}</span>
              <span>${commify(totalFiatStaked)}</span>
            </p>
            <p className="flex flex-wrap justify-between gap-x-1 align-baseline">
              <span className="whitespace-nowrap text-principalRoyalBlue">{t`Total ELFI / Week`}</span>
              <Elfi amount={elfiPerWeek} />
            </p>
          </div>
          <div className="space-y-1 px-4 py-6">
            <p className="flex flex-wrap justify-between gap-x-1 align-baseline">
              <span className="whitespace-nowrap text-principalRoyalBlue">{t`Pool Share`}</span>
              <span>{formatPercent(+poolShare)}</span>
            </p>
            <p className="flex flex-wrap justify-between gap-x-1 align-baseline">
              <span className="whitespace-nowrap text-principalRoyalBlue">{t`ELFI / Week`}</span>
              <Elfi amount={userElfiPerWeek} />
            </p>
            <p className="flex flex-wrap justify-between gap-x-1 align-baseline">
              <span className="whitespace-nowrap text-principalRoyalBlue">{t`Unclaimed ELFI`}</span>
              <Elfi
                className={classNames(+pendingRewards > 0 && "font-semibold")}
                amount={pendingRewards}
              />
            </p>
          </div>
          {hasNotStaked ? (
            <>
              <Button
                className="mt-auto w-full justify-center"
                variant={ButtonVariant.GRADIENT}
                onClick={() => setStakeDialogIsShowing(true)}
                loading={transactionIsPending}
                disabled={hasNoBalance}
              >{t`Stake`}</Button>
            </>
          ) : (
            <>
              <hr className="border-hackerSky-dark" />
              <div className="flex justify-between px-4 py-6">
                <div>
                  <span className="block text-principalRoyalBlue">{t`LP Staked`}</span>
                  <span className="block text-2xl">
                    {depositedBalanceLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    disabled={hasNotStaked}
                    variant={ButtonVariant.MINIMAL}
                    onClick={() => setUnstakeDialogIsShowing(true)}
                    title="Unstake"
                  >
                    <MinusIcon className="h-5 text-principalRoyalBlue" />
                  </Button>
                  <Button
                    disabled={hasNoBalance}
                    variant={ButtonVariant.MINIMAL}
                    onClick={() => setStakeDialogIsShowing(true)}
                    title="Stake"
                  >
                    <PlusIcon className={`h-5 text-principalRoyalBlue`} />
                  </Button>
                </div>
              </div>
              <hr className="border-hackerSky-dark" />
              <Button
                className="mt-6 w-full justify-center"
                variant={ButtonVariant.GRADIENT}
                onClick={handleClaim}
                loading={transactionIsPending}
                disabled={hasNoRewards}
              >{t`Claim ELFI`}</Button>
            </>
          )}
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
