import React, { ReactElement } from "react";
import { t } from "ttag";
import { Button, Card, CardTitle } from "@elementfi/component-library";

interface TermCardProps {
  // maturity: string;
}

export function TermCard({}: TermCardProps): ReactElement {
  // TODO: make this work
  // const {
  //   data: { title, fixedApr, VariableApy, tvl },
  // } = useTermCardQuery({ });

  return (
    <Card>
      <CardTitle
        title={t`Dai pool 6m`}
        action={<Button onClick={() => {}}>{t`Deposit`}</Button>}
      />
      {/* TODO: Make Stat component */}
      <div>
        <strong>{t`Fixed APR`}</strong>
        <p>{t`6.61% APR`}</p>
      </div>
      <div>
        <strong>{t`Variable APY`}</strong>
        <p>{t`1.96% APY`}</p>
      </div>
      <div>
        <strong>{t`TVL`}</strong>
        <p>{t`$909,888`}</p>
      </div>
    </Card>
  );
}
