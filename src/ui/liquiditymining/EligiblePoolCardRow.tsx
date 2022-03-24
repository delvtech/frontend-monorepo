import React, { ReactElement } from "react";
import { t } from "ttag";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card from "src/ui/base/Card/Card";
import { PrincipalPoolTokenInfo } from "@elementfi/tokenlist";
import USDCIcon from "src/ui/base/svg/USDCIcon";

interface EligiblePoolCardRowProps {
  pool: PrincipalPoolTokenInfo;
}

export function EligiblePoolCardRow({
  pool: { name, address: poolAddress },
}: EligiblePoolCardRowProps): ReactElement {
  const poolIcon = <USDCIcon className="mr-4 inline h-8 w-8" />;
  const rewardsRate = "500.0000";
  const depositedBalance = "0.0000";
  const pendingRewards = "0.0000 ELFI";
  const lpTokenBalance = "0.0000";

  return (
    <Card className="!py-2">
      <div className="grid grid-cols-7 items-center">
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

        <div className="text-sm text-gray-500">{rewardsRate}</div>
        <div className="text-sm text-gray-500">{lpTokenBalance}</div>
        <div className="text-sm text-gray-500">{pendingRewards}</div>
        <div className="text-sm text-gray-500">{depositedBalance}</div>
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
