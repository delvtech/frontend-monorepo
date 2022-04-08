import React, { ReactElement } from "react";
import { t } from "ttag";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card from "src/ui/base/Card/Card";
import { PrincipalPoolTokenInfo } from "@elementfi/tokenlist";
import USDCIcon from "src/ui/base/svg/USDCIcon";
import { formatMoney } from "base/money/formatMoney";
import { eligibleGoerliPoolContracts } from "src/elf/liquiditymining/eligiblepools";
import { formatBalance } from "src/formatBalance";
import { useLPTokenBalance } from "./hooks/useLPTokenBalance";
import { useUserInfo } from "src/ui/liquiditymining/hooks/useUserInfo";
import { useTotalFiatLiquidity } from "core/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { usePoolRewardsRate } from "./hooks/usePoolRewardsRate";

interface EligiblePoolCardRowProps {
  account: string | null | undefined;
  pool: PrincipalPoolTokenInfo;
}

export function EligiblePoolCardRow({
  account,
  pool,
  pool: { name, address: poolAddress },
}: EligiblePoolCardRowProps): ReactElement {
  const poolIcon = <USDCIcon className="mr-4 inline h-8 w-8" />;
  const ccPoolTVL = useTotalFiatLiquidity(pool);

  const poolContract = eligibleGoerliPoolContracts[poolAddress];
  const { data: lpTokenBalance } = useLPTokenBalance(poolContract, account);
  const rewardsRate = usePoolRewardsRate(poolAddress);
  const { data: userInfo } = useUserInfo(account, poolAddress);
  const depositedBalance = userInfo?.amount || "0.0";
  const pendingRewards = userInfo?.rewardDebt || "0.0";

  return (
    <Card className="!py-2">
      <div className="grid grid-cols-8 items-center">
        <a
          href={`https://testnet.element.fi/pools/${poolAddress}`}
          className="col-span-2 text-sm underline hover:no-underline"
          target="_blank"
          rel="noreferrer"
        >
          {poolIcon}
          {name}
          <ExternalLinkIcon className="mb-1 ml-0.5 inline h-4" />
        </a>

        <div className="text-sm text-gray-500">{formatMoney(ccPoolTVL)}</div>
        <div className="text-sm text-gray-500">{rewardsRate.toFixed(2)}</div>
        <div className="text-sm text-gray-500">{depositedBalance}</div>
        <div className="text-sm text-gray-500">{pendingRewards}</div>
        <div className="text-sm text-gray-500">
          {lpTokenBalance ? formatBalance(lpTokenBalance, 4) : "0"}
        </div>
        <div className="flex space-x-2 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <Button variant={ButtonVariant.GRADIENT}>{t`Stake`}</Button>
          <Button
            disabled
            variant={ButtonVariant.OUTLINE_BLUE}
          >{t`Unstake`}</Button>
        </div>
      </div>
    </Card>
  );
}
