import { Web3Provider } from "@ethersproject/providers";
import { InformationCircleIcon as InformationCircleIconOutline } from "@heroicons/react/outline";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import React, { ReactElement } from "react";
import {
  eligibleGoerliPoolTokenInfos,
  poolIdsByPoolAddress,
} from "src/elf/liquiditymining/eligiblepools";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { t } from "ttag";

import { EligiblePoolCardRow } from "./EligiblePoolCardRow";

const columnClass = "text-left text-sm font-semibold";

export function LiquidityMiningPage(): ReactElement {
  const { account } = useWeb3React<Web3Provider>();
  return (
    <div className="mt-8 flex h-full w-full flex-col items-center space-y-6">
      <div className="relative mb-6">
        <Card variant={CardVariant.GRADIENT} className="flex">
          <div className="ml-4 mt-2">
            <h2 className="text-left text-lg font-semibold leading-6 text-white">
              {t`Welcome to our Liquidity Mining program`}
            </h2>
            <p className="mt-1 text-left text-white">{t`Earn more ELFI by staking your Element Finance LP Tokens. The ELFI you earn can be used to increase your delegate's voting power in Element Council.`}</p>
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
                {t`ELFI / block` /* TODO: make this {t`ELFI / $1K Week`} */}
                <Tooltip
                  content={
                    "The weekly amount of ELFI earned for $1,000 worth of LP tokens staked"
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
          {Object.keys(poolIdsByPoolAddress).map((pool) => (
            <EligiblePoolCardRow
              key={pool}
              account={account}
              pool={eligibleGoerliPoolTokenInfos[pool]}
            />
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

export default LiquidityMiningPage;
