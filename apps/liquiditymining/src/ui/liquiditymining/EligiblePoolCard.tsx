import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/tokenlist";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { convertEpochSecondsToDate } from "@elementfi/base/time/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { useTotalFiatLiquidity } from "@elementfi/core/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { getTokenInfo } from "@elementfi/core/tokenlists/tokenlists";
import { getVaultTokenInfoForTranche } from "@elementfi/core/tranche/tranches";
import React, { ReactElement } from "react";
import { formatAbbreviatedDate } from "src/base/dates";
import { eligibleGoerliPoolContracts } from "src/elf/liquiditymining/eligiblepools";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card from "src/ui/base/Card/Card";
import USDCIcon from "src/ui/base/svg/USDCIcon";
import Well from "src/ui/base/Well/Well";
import { useLPTokenBalance } from "src/ui/liquiditymining/hooks/useLPTokenBalance";
import { useELFIPerBlock } from "src/ui/liquiditymining/hooks/useELFIPerBlock";
import { useUserInfo } from "src/ui/liquiditymining/hooks/useUserInfo";
import { t } from "ttag";
import { ETHEREUM_BLOCKS_PER_WEEK } from "@elementfi/base/ethereum/ethereum";
import { commify } from "ethers/lib/utils";
import { usePoolShare } from "./hooks/usePoolShare";

interface EligiblePoolCardProps {
  account: string | null | undefined;
  pool: PrincipalPoolTokenInfo;
}
export function EligiblePoolCard({
  account,
  pool,
  pool: {
    address: poolAddress,
    symbol: poolSymbol,
    extensions: { bond },
  },
}: EligiblePoolCardProps): ReactElement {
  const vaultTokenInfo = getVaultTokenInfoForTranche(bond);
  const {
    symbol,
    extensions: { unlockTimestamp, underlying },
  } = getTokenInfo<PrincipalTokenInfo>(bond);

  const { symbol: baseAssetSymbol } = getTokenInfo(underlying);

  const poolIcon = <USDCIcon className="mr-4 inline h-8 w-8 flex-shrink-0" />;
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
  const pendingRewards = userInfo?.rewardDebt || "0.0";

  return (
    <Card className="flex w-[382px] flex-col space-y-6">
      <div className="flex flex-col items-center">
        <USDCIcon className="mb-3 h-12" />
        <span className="font-semibold text-principalRoyalBlue ">{t`${baseAssetSymbol} Principal Pool LP Token`}</span>
        <span className="font-semibold text-gray-600">
          {dateLabel}
          <ExternalLinkIcon className="mb-1 ml-1 inline h-4 " />
        </span>
      </div>
      <Well>
        <div className="grid grid-cols-2 gap-8 ">
          <span className="text-principalRoyalBlue">{t`Total Staked`}</span>
          <span className="text-right">$9,000,000</span>
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
          <span className="text-right">{`${pendingRewards} ELFI`}</span>
        </div>
        <div className="grid grid-cols-2 gap-8 ">
          <span className="text-principalRoyalBlue">{t`Unclaimed`}</span>
          <span className="text-right font-semibold">{`${pendingRewards} ELFI`}</span>
        </div>
      </div>

      <div className="space-y-8 px-2">
        <div className="grid grid-cols-2 gap-8 ">
          <div className="flex flex-col">
            <span className="mb-1 text-principalRoyalBlue">LP Staked</span>
            <span className="font-semibold">22,500 LP</span>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant={ButtonVariant.OUTLINE_BLUE}>
              <MinusIcon className="h-6 text-principalRoyalBlue" />
            </Button>
            <Button variant={ButtonVariant.OUTLINE_BLUE}>
              <PlusIcon className="h-6 text-principalRoyalBlue" />
            </Button>
          </div>
        </div>
        <Button
          className="w-full justify-center"
          variant={ButtonVariant.OUTLINE_BLUE}
        >{t`Claim`}</Button>
      </div>
    </Card>
  );
}
