import { Web3Provider } from "@ethersproject/providers";
import { InformationCircleIcon as InformationCircleIconOutline } from "@heroicons/react/outline";
import { useWeb3React } from "@web3-react/core";
import React, { ReactElement } from "react";
import { eligibleGoerliPoolTokenInfos } from "src/elf/liquiditymining/eligiblepools";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import { useSigner } from "src/ui/signer/useSigner";
import { EligiblePoolCard } from "./EligiblePoolCard";

export function LiquidityMiningPage(): ReactElement {
  const { account, library } = useWeb3React<Web3Provider>();
  const signer = useSigner(account, library);
  return (
    <div className="mt-8 flex h-full w-full flex-col items-center space-y-6">
      <div className="relative mb-6">
        <Card className="flex">
          <div className="ml-4 mt-2">
            <h2 className="text-left text-lg font-semibold leading-6 text-principalRoyalBlue">
              {t`Welcome to our Liquidity Mining program`}
            </h2>
            <p className="mt-1 text-left text-principalRoyalBlue">{t`Earn more ELFI by staking your Element Finance LP Tokens. The ELFI you earn can be used to increase your delegate's voting power in Element Council.`}</p>
          </div>
          <div className="ml-4 mt-4 shrink-0">
            {
              <Button
                variant={ButtonVariant.OUTLINE_BLUE}
              >{t`Learn more`}</Button>
            }
          </div>
        </Card>
      </div>
      <div className="flex gap-8">
        {Object.values(eligibleGoerliPoolTokenInfos).map((pool) => (
          <EligiblePoolCard
            key={pool.address}
            account={account}
            signer={signer}
            pool={pool}
          />
        ))}
      </div>

      {/* TODO: Delete this if we go with cards instead
      <EligiblePoolsTable account={account} /> */}
    </div>
  );
}

export default LiquidityMiningPage;
