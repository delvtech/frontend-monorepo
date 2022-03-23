import React, { ReactElement } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { t } from "ttag";

import USDCIcon from "src/ui/base/svg/USDCIcon";
import {
  ExternalLinkIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import CardHeader from "src/ui/base/Card/CardHeader";

const pools = [
  {
    name: "LP Principal Token yUSDC:07-APR-22-GMT",
    tokenSymbol: "LP Principal Token yUSDC:07-APR-22-GMT",
    poolAddress: "0xEA4058419730bc53Cce50950D458E41c22F94452",
    poolIcon: <USDCIcon className="mr-4 inline h-8 w-8" />,
    rewardsRate: "500 ELFI/week",
    title: "Front-end Developer",
    department: "Optimization",
    depositedBalance: "0.0000",
    pendingRewards: "0.0000 ELFI",
    lpTokenBalance: "0.0000",
  },
];
export function OverviewPage(): ReactElement {
  const { account } = useWeb3React<Web3Provider>();
  return (
    <div className="flex h-full w-full flex-col items-center space-y-6 ">
      <div className="relative mb-6">
        <Card variant={CardVariant.GRADIENT}>
          <CardHeader
            title={t`Learn about our Liquidity Mining program`}
            description={t`Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.`}
            action={
              <Button variant={ButtonVariant.WHITE}>{t`Learn more`}</Button>
            }
          />
        </Card>
      </div>

      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                {t`Eligible LP Token`}
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                {t`Weekly Rewards`}
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                {t`Your pending rewards`}
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                {t`Staked balance`}
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                {t`Available to stake`}
              </th>
              {/* Actions*/}
              <th
                scope="col"
                className="relative py-3.5 pl-3 pr-4 text-sm sm:pr-6"
              >{t`Actions`}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {pools.map((pool) => (
              <tr key={pool.depositedBalance}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  <a
                    href={`https://testnet.element.fi/pools/${pool.poolAddress}`}
                    className="underline hover:no-underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {pool.poolIcon}
                    {pool.name}
                    <ExternalLinkIcon className="mb-1 ml-0.5 inline h-4" />
                  </a>
                </td>

                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {pool.rewardsRate}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {pool.pendingRewards}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {pool.depositedBalance}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {pool.lpTokenBalance}
                </td>
                <td className="flex space-x-2 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Button>{t`Stake`}</Button>
                  <Button
                    disabled
                    variant={ButtonVariant.MINIMAL}
                  >{t`Unstake`}</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-auto mt-4 max-w-3xl text-center text-base text-gray-500">
        <InformationCircleIcon className="mr-1 mb-0.5 inline h-4 w-4" />
        {t`Note: Clicking Unstake will also claim your pending ELFI rewards.`}
      </p>
    </div>
  );
}

export default OverviewPage;
