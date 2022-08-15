import React, { Fragment, ReactElement } from "react";
import { useAccount, useEnsName } from "wagmi";
import { t } from "ttag";
import { Button, Card, CardTitle } from "@elementfi/component-library";

export function OverviewPage(): ReactElement {
  const { address: userAddress } = useAccount();
  const { data: ensName } = useEnsName({ address: userAddress });

  return (
    <div className="bg-base-200 min-h-screen">
      <h1>{t`Welcome ${ensName}`}</h1>
      <TermCard />
    </div>
  );
}

export default OverviewPage;

function TermCard(): ReactElement {
  return (
    <Card>
      <CardTitle
        title={t`Dai pool 6m`}
        action={<Button onClick={() => {}}>{t`Deposit`}</Button>}
      />
      <div>
        <p>{t`Fixed APR`}</p>
        <p>{t`6.61% APR`}</p>
      </div>
      <div>
        <p>{t`Variable APY`}</p>
        <p>{t`1.96% APY`}</p>
      </div>
      <div>
        <p>{t`TVL`}</p>
        <p>{t`$909,888`}</p>
      </div>
    </Card>
  );
}
