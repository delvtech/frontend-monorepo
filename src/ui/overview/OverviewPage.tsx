import React, { ReactElement } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { t } from "ttag";

import USDCIcon from "src/ui/base/svg/USDCIcon";
import { InformationCircleIcon } from "@heroicons/react/solid";
import {
  ExternalLinkIcon,
  InformationCircleIcon as InformationCircleIconOutline,
} from "@heroicons/react/outline";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import Tooltip from "src/ui/base/Tooltip/Tooltip";

const pools = [
  {
    name: "LP Principal Token yUSDC:07-APR-22-GMT",
    tokenSymbol: "LP Principal Token yUSDC:07-APR-22-GMT",
    poolAddress: "0xEA4058419730bc53Cce50950D458E41c22F94452",
    poolIcon: <USDCIcon className="mr-4 inline h-8 w-8" />,
    rewardsRate: "500.0000",
    depositedBalance: "0.0000",
    pendingRewards: "0.0000 ELFI",
    lpTokenBalance: "0.0000",
  },
  {
    name: "LP Principal Token eyUSDC:10-AUG-22-GMT",
    tokenSymbol: "LP Principal Token eyUSDC:10-AUG-22-GMT",
    poolAddress: "0x4294005520c453EB8Fa66F53042cfC79707855c4",
    poolIcon: <USDCIcon className="mr-4 inline h-8 w-8" />,
    rewardsRate: "500.0000",
    depositedBalance: "0.0000",
    pendingRewards: "0.0000 ELFI",
    lpTokenBalance: "0.0000",
  },
];
const columnClass = "text-left text-sm font-semibold";
export function OverviewPage(): ReactElement {
  const { account } = useWeb3React<Web3Provider>();
  return (
    <div className="mt-8 flex h-full w-full flex-col items-center space-y-6">
      <div className="relative mb-6">
        <Card variant={CardVariant.GRADIENT} className="flex">
          <div className="ml-4 mt-2">
            <h2 className="text-left text-lg font-semibold leading-6 text-white">
              {t`Welcome to our Liquidity Mining program`}
            </h2>
            <p className="mt-1 text-left text-white">{t`Earn ELFI by staking your Element Finance LP Tokens. The ELFI you earn can be used to increase your delegate's voting power in Element Council.`}</p>
          </div>
          <div className="ml-4 mt-4 shrink-0">
            {<Button variant={ButtonVariant.WHITE}>{t`Learn more`}</Button>}
          </div>
        </Card>
      </div>

      <div className=" flex flex-col space-y-6 ">
        {/* Header */}
        <Card variant={CardVariant.GRADIENT} className="!p-4 !px-6 text-white">
          <div className="grid grid-cols-7 ">
            <div
              className={`${columnClass} col-span-2`}
            >{t`Eligible LP Token`}</div>
            <div className={columnClass}>
              <span>
                {t`ELFI / $1K Week`}
                <Tooltip
                  content={
                    "The weekly amount of ELFI earned by $1,000 of LP tokens staked"
                  }
                >
                  <InformationCircleIcon className="ml-1 mb-0.5 inline h-4 w-4" />
                </Tooltip>
              </span>
            </div>
            <div className={columnClass}>{t`Staked balance`}</div>
            <div className={columnClass}>{t`Earned rewards`}</div>
            <div className={columnClass}>{t`Available to stake`}</div>
            {/* Actions (spacer) */}
            <div />
          </div>
        </Card>

        <div className="flex-col space-y-4">
          {pools.map((pool) => (
            <Card key={pool.depositedBalance} className="!py-2">
              <div className="grid grid-cols-7 items-center">
                <a
                  href={`https://testnet.element.fi/pools/${pool.poolAddress}`}
                  className="col-span-2 text-sm underline hover:no-underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {pool.poolIcon}
                  {pool.name}
                  <ExternalLinkIcon className="mb-1 ml-0.5 inline h-4" />
                </a>

                <div className="text-sm text-gray-500">{pool.rewardsRate}</div>
                <div className="text-sm text-gray-500">
                  {pool.lpTokenBalance}
                </div>
                <div className="text-sm text-gray-500">
                  {pool.pendingRewards}
                </div>
                <div className="text-sm text-gray-500">
                  {pool.depositedBalance}
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
          ))}
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-3xl text-center text-base text-gray-500">
        <InformationCircleIconOutline className="mr-1 mb-0.5 inline h-4 w-4" />
        {t`Note: Clicking Unstake will also claim your pending ELFI rewards.`}
      </p>
    </div>
  );
}

export default OverviewPage;
