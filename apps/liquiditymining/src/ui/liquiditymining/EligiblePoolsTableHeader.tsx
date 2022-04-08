import { InformationCircleIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { t } from "ttag";

const columnClass = "text-left text-sm font-semibold";

export function EligiblePoolsTableHeader(): ReactElement {
  return (
    <Card variant={CardVariant.GRADIENT} className="!p-4 !px-6 text-white">
      <div className="grid grid-cols-8">
        <div
          className={`${columnClass} col-span-2`}
        >{t`Eligible LP Token`}</div>
        <div className={columnClass}>{t`TVL`}</div>
        <div className={columnClass}>
          <span>
            {
              t`ELFI / block`
              /* TODO: make this {t`ELFI / $1K Week`} */
            }
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
  );
}
