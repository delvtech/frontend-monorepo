import { Web3Provider } from "@ethersproject/providers";
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
    <div className="mt-8 h-full w-full max-w-7xl items-center">
      <Card
        className="mb-6 flex flex-col items-center gap-4 !p-8 text-white lg:flex-row"
        variant={CardVariant.GRADIENT}
      >
        <div>
          <h2 className="text-left text-lg font-semibold leading-6">
            {t`Welcome to our Liquidity Mining program`}
          </h2>
          <p className="mt-1 text-left">{t`Earn more ELFI by staking your Element Finance LP Tokens. The ELFI you earn can be used to increase your delegate's voting power in Element Council.`}</p>
        </div>
        <Button
          variant={ButtonVariant.OUTLINE_WHITE}
          className="block w-full shrink-0 justify-center lg:w-auto"
        >{t`Learn more`}</Button>
      </Card>
      <div className="grid grid-cols-1 flex-wrap gap-8 xl:grid-cols-2 2xl:grid-cols-3">
        {Object.values(eligibleGoerliPoolTokenInfos).map((pool) => (
          <EligiblePoolCard
            key={pool.address}
            account={account}
            signer={signer}
            pool={pool}
          />
        ))}
      </div>
    </div>
  );
}

export default LiquidityMiningPage;
