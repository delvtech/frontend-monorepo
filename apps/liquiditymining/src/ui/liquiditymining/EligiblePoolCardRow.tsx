import React, { ReactElement } from "react";
import { t } from "ttag";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/tokenlist";
import USDCIcon from "src/ui/base/svg/USDCIcon";
import { eligibleGoerliPoolContracts } from "src/elf/liquiditymining/eligiblepools";
import { formatBalance } from "src/formatBalance";
import { useLPTokenBalance } from "./hooks/useLPTokenBalance";
import { useUserInfo } from "src/ui/liquiditymining/hooks/useUserInfo";
import { useTotalFiatLiquidity } from "core/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { useELFIPerBlock } from "./hooks/useELFIPerBlock";
import { getVaultTokenInfoForTranche } from "core/tranche/tranches";
import { formatAbbreviatedDate } from "src/base/dates";
import { convertEpochSecondsToDate } from "base/time/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { getTokenInfo } from "core/tokenlists/tokenlists";
import { Popover2 } from "@blueprintjs/popover2";
import {
  DotsHorizontalIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";

interface EligiblePoolCardRowProps {
  account: string | null | undefined;
  pool: PrincipalPoolTokenInfo;
}

export function EligiblePoolCardRow({
  account,
  pool,
  pool: {
    address: poolAddress,
    symbol: poolSymbol,
    extensions: { bond },
  },
}: EligiblePoolCardRowProps): ReactElement {
  const vaultTokenInfo = getVaultTokenInfoForTranche(bond);
  const {
    symbol,
    extensions: { unlockTimestamp },
  } = getTokenInfo<PrincipalTokenInfo>(bond);

  const poolIcon = <USDCIcon className="mr-4 inline h-8 w-8 flex-shrink-0" />;
  const ccPoolTVL = useTotalFiatLiquidity(pool);
  const unlockDate = convertEpochSecondsToDate(unlockTimestamp);
  const dateLabel = formatAbbreviatedDate(unlockDate);

  const poolContract = eligibleGoerliPoolContracts[poolAddress];
  const { data: lpTokenBalance } = useLPTokenBalance(poolContract, account);
  const rewardsRate = useELFIPerBlock(poolAddress);
  const { data: userInfo } = useUserInfo(account, poolAddress);
  const depositedBalance = userInfo?.amount || "0.0";
  const pendingRewards = userInfo?.rewardDebt || "0.0";

  return (
    <div className="grid grid-cols-[320px_142px_128px_112px_112px_128px_48px] items-center gap-x-10 px-4 !py-3 text-principalRoyalBlue">
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
            <span>{poolSymbol}</span>
            <span className="text-xs">
              {dateLabel} <ExternalLinkIcon className="mb-1 inline h-4 " />
            </span>
          </div>
        </div>
      </a>

      {/* Staked TVL */}
      <div className="text-sm text-gray-500">{0}</div>
      {/* ELFI / $K Week */}
      <div className="text-sm text-gray-500">{rewardsRate.toFixed(2)}</div>
      <div className="text-sm text-gray-500">{depositedBalance}</div>
      <div className="text-sm text-gray-500">{pendingRewards}</div>
      <div className="text-sm text-gray-500">
        {lpTokenBalance ? formatBalance(lpTokenBalance, 4) : "0"}
      </div>
      <div className="flex space-x-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
        <Popover2
          placement="right"
          content={
            <div className="flex flex-col gap-8 p-8">
              <a
                href={"https://element.fi"}
                className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-100"
              >
                <PlusCircleIcon
                  className="h-6 w-6 flex-shrink-0 text-principalRoyalBlue"
                  aria-hidden="true"
                />
                <div className="ml-4">
                  <p className="text-base font-medium text-principalRoyalBlue">
                    {t`Stake`}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{t`Stake your LP tokens to earn ELFI.`}</p>
                </div>
              </a>
              <a
                href={"https://www.element.fi/"}
                className="-m-3 flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50"
              >
                <MinusCircleIcon
                  className="h-6 w-6 flex-shrink-0 text-principalRoyalBlue"
                  aria-hidden="true"
                />
                <div className="ml-4">
                  <p className="text-base font-medium text-principalRoyalBlue">
                    {t`Unstake`}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{t`Unstake to withdraw your LP tokens and claim your earned ELFI.`}</p>
                </div>
              </a>
            </div>
          }
        >
          <DotsHorizontalIcon
            className="h-6 w-6 cursor-pointer text-principalRoyalBlue hover:text-principalBlue"
            aria-hidden="true"
          />
        </Popover2>
      </div>
    </div>
  );
}
