import React, { ReactElement } from "react";
import { t } from "ttag";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card from "src/ui/base/Card/Card";
import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/tokenlist";
import USDCIcon from "src/ui/base/svg/USDCIcon";
import { formatMoney } from "base/money/formatMoney";
import { eligibleGoerliPoolContracts } from "src/elf/liquiditymining/eligiblepools";
import { formatBalance } from "src/formatBalance";
import { useLPTokenBalance } from "./hooks/useLPTokenBalance";
import { useUserInfo } from "src/ui/liquiditymining/hooks/useUserInfo";
import { useTotalFiatLiquidity } from "core/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { usePoolRewardsRate } from "./hooks/usePoolRewardsRate";
import { getVaultTokenInfoForTranche } from "core/tranche/tranches";
import { formatAbbreviatedDate } from "src/base/dates";
import { convertEpochSecondsToDate } from "base/time/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { getTokenInfo } from "core/tokenlists/tokenlists";

interface EligiblePoolCardRowProps {
  account: string | null | undefined;
  pool: PrincipalPoolTokenInfo;
}

export function EligiblePoolCardRow({
  account,
  pool,
  pool: {
    address: poolAddress,
    extensions: { bond },
  },
}: EligiblePoolCardRowProps): ReactElement {
  const vaultTokenInfo = getVaultTokenInfoForTranche(bond);
  const {
    extensions: { unlockTimestamp },
  } = getTokenInfo<PrincipalTokenInfo>(bond);

  const poolIcon = <USDCIcon className="mr-4 inline h-8 w-8" />;
  const ccPoolTVL = useTotalFiatLiquidity(pool);
  const unlockDate = convertEpochSecondsToDate(unlockTimestamp);
  const dateLabel = formatAbbreviatedDate(unlockDate);

  const poolContract = eligibleGoerliPoolContracts[poolAddress];
  const { data: lpTokenBalance } = useLPTokenBalance(poolContract, account);
  const rewardsRate = usePoolRewardsRate(poolAddress);
  const { data: userInfo } = useUserInfo(account, poolAddress);
  const depositedBalance = userInfo?.amount || "0.0";
  const pendingRewards = userInfo?.rewardDebt || "0.0";

  return (
    <div className="grid h-20 w-full grid-cols-[820px_1fr] items-center space-x-8">
      <Card className="grid h-full w-full grid-cols-[1fr_112px_112px_128px] items-center gap-x-10 !py-3 ">
        {/* Eligible LP Token */}
        <a
          href={`https://testnet.element.fi/pools/${poolAddress}`}
          className="text-sm text-principalRoyalBlue hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex">
            {poolIcon}
            <div className="flex flex-col">
              <span>
                {t`LP Principal Token ${vaultTokenInfo.symbol}`}
                <ExternalLinkIcon className="mb-1 ml-8 inline h-4 " />
              </span>
              <span className="text-xs">{dateLabel}</span>
            </div>
          </div>
        </a>

        {/* Pool TVL */}
        <div className="text-sm text-gray-500">{formatMoney(ccPoolTVL)}</div>
        {/* Staked TVL */}
        <div className="text-sm text-gray-500">{0}</div>
        {/* ELFI / $K Week */}
        <div className="text-sm text-gray-500">{rewardsRate.toFixed(2)}</div>
      </Card>

      <Card className="grid h-full grid-cols-[112px_112px_128px_1fr] items-center gap-x-10 !py-3 ">
        <div className="text-sm text-gray-500">{depositedBalance}</div>
        <div className="text-sm text-gray-500">{pendingRewards}</div>
        <div className="text-sm text-gray-500">
          {lpTokenBalance ? formatBalance(lpTokenBalance, 4) : "0"}
        </div>
        <div className="flex space-x-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <Button variant={ButtonVariant.GRADIENT}>{t`Stake`}</Button>
          <Button
            disabled
            variant={ButtonVariant.OUTLINE_BLUE}
          >{t`Unstake`}</Button>
        </div>
      </Card>
    </div>
  );
}
