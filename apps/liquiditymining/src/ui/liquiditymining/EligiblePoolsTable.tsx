import React, { ReactElement } from "react";
import {
  eligibleGoerliPoolTokenInfos,
  poolIdsByPoolAddress,
} from "src/elf/liquiditymining/eligiblepools";
import Card from "src/ui/base/Card/Card";
import { EligiblePoolCardRow } from "./EligiblePoolCardRow";
import { EligiblePoolsTableHeader } from "./EligiblePoolsTableHeader";

export function EligiblePoolsTable(props: {
  account: string | null | undefined;
}): ReactElement {
  return (
    <Card className="flex w-min flex-col space-y-6">
      {/* Header */}
      <EligiblePoolsTableHeader />
      <hr />

      <div className="flex-col space-y-4">
        {Object.keys(poolIdsByPoolAddress).map((pool) => (
          <EligiblePoolCardRow
            key={pool}
            account={props.account}
            pool={eligibleGoerliPoolTokenInfos[pool]}
          />
        ))}
      </div>
    </Card>
  );
}
