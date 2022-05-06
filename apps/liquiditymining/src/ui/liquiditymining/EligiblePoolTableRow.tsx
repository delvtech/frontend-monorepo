import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/tokenlist";
import { ChevronDownIcon, MinusIcon, PlusIcon } from "@heroicons/react/solid";
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
import PopoverButton from "src/ui/base/Button/PopoverButton";
import { GiftIcon } from "@heroicons/react/outline";

interface EligiblePoolCardProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  pool: PrincipalPoolTokenInfo;
  className?: string;
}
export function EligiblePoolTableRow({
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
  const { data: lpTokenBalance = "0" } = useLPTokenBalance(
    poolContract,
    account,
  );
  const elfiPerBlock = useELFIPerBlock(poolAddress);
  const elfiPerWeek = ETHEREUM_BLOCKS_PER_WEEK * elfiPerBlock;

  const poolShare = usePoolShare(poolAddress, account);
  const { data: userInfo } = useUserInfo(account, poolAddress);
  const depositedBalance = userInfo?.amount || "0";
  const depositedBalanceLabel = commify((+depositedBalance).toFixed(4));

  const userElfiPerWeek = elfiPerWeek * +poolShare;

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

  const hasNoBalance = !+lpTokenBalance;
  const hasNotStaked = !+depositedBalance;
  const hasNoRewards = !+pendingRewards;
  return (
    <>
      <div
        className={classNames(
          "grid grid-cols-[repeat(18,_minmax(0,_1fr))] p-5 text-gray-500",
          className,
        )}
      >
        <div className="col-span-3 flex items-center gap-3">
          <AssetIcon symbol={baseAssetSymbol} className="h-10" />
          <div>
            <H2 className="!text-base tracking-wide text-principalRoyalBlue">{t`${baseAssetSymbol} LP Token`}</H2>
            <ExternalLink href={POOL_HREF}>
              <Tag
                intent={Intent.PRIMARY}
                className="!rounded-full !py-[2px] text-[13px]"
              >
                {formatAbbreviatedDate(unlockDate)}
              </Tag>
            </ExternalLink>
          </div>
        </div>
        <span className="col-span-2 flex items-center justify-end">
          ${commify(totalFiatStaked)}
        </span>
        <span className="col-span-2 flex items-center justify-end">
          <Elfi amount={elfiPerWeek} />
        </span>
        <span className="col-span-2 flex items-center justify-end">
          {formatPercent(+poolShare)}
        </span>
        <span className="col-span-2 flex items-center justify-end">
          <Elfi amount={userElfiPerWeek} />
        </span>
        <span className="col-span-2 flex items-center justify-end">
          <Elfi
            className={classNames(
              +pendingRewards > 0 && "font-semibold text-gray-800",
            )}
            amount={pendingRewards}
          />
        </span>
        <span
          className={classNames(
            "col-span-2 flex items-center justify-end",
            +depositedBalance > 0 && "font-semibold text-gray-800",
          )}
        >
          {depositedBalanceLabel}
        </span>
        <div className="col-span-3 flex pl-10">
          {hasNotStaked ? (
            <Button
              className="flex-1 justify-center"
              variant={ButtonVariant.GRADIENT}
              onClick={() => setStakeDialogIsShowing(true)}
              loading={transactionIsPending}
              disabled={hasNoBalance}
            >{t`Stake`}</Button>
          ) : (
            <div className="flex-1">
              <PopoverButton
                className="w-full justify-center"
                variant={ButtonVariant.GRADIENT}
                loading={transactionIsPending}
                popoverOptions={{
                  placement: "bottom-end",
                }}
                popover={
                  <Card className="my-2 flex flex-col items-stretch !p-3">
                    <Button
                      disabled={hasNoBalance}
                      variant={ButtonVariant.MINIMAL}
                      onClick={() => setStakeDialogIsShowing(true)}
                      className="gap-2 !shadow-none"
                    >
                      <PlusIcon className="h-5 text-principalRoyalBlue" />
                      {t`Stake`}
                    </Button>
                    <Button
                      disabled={hasNotStaked}
                      variant={ButtonVariant.MINIMAL}
                      onClick={() => setUnstakeDialogIsShowing(true)}
                      className="gap-2 !shadow-none"
                    >
                      <MinusIcon className="h-5 text-principalRoyalBlue" />
                      {t`Unstake & Claim`}
                    </Button>
                    <Button
                      disabled={hasNoRewards}
                      variant={ButtonVariant.MINIMAL}
                      onClick={handleClaim}
                      loading={transactionIsPending}
                      className="gap-2 !shadow-none"
                    >
                      <GiftIcon className="h-5 text-principalRoyalBlue" />
                      {t`Claim ELFI`}
                    </Button>
                  </Card>
                }
              >
                {(open: boolean) => (
                  <span className="flex w-[90px] items-center justify-center">
                    {t`Actions`}

                    <ChevronDownIcon
                      className={classNames(
                        open ? classNames("rotate-180 transform") : "",
                        "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                      )}
                      aria-hidden="true"
                    />
                  </span>
                )}
              </PopoverButton>
            </div>
          )}
        </div>
      </div>

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
