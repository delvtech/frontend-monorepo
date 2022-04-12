import { InformationCircleIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import Well from "src/ui/base/Well/Well";
import { t } from "ttag";

const columnClass = "text-left text-sm font-semibold";

export function EligiblePoolsTableHeader(): ReactElement {
  return (
    <Well className="grid h-12 grid-cols-[320px_142px_128px_112px_112px_128px_48px] items-center gap-x-10 !py-3 text-principalRoyalBlue">
      <div className={`${columnClass}`}>{t`Eligible LP Token`}</div>

      <div className={columnClass}>
        <span>
          {t`Total Staked`}
          <Tooltip
            content={t`total $ amount of LP tokens currently staked to earn ELFI`}
          >
            <InformationCircleIcon className="ml-1 mb-0.5 inline h-4 w-4" />
          </Tooltip>
        </span>
      </div>

      <div className={columnClass}>
        <span>
          {t`ELFI / $1K Week`}
          <Tooltip
            content={
              "The weekly amount of ELFI earned for $1,000 worth of LP tokens staked"
            }
          >
            <InformationCircleIcon className="ml-1 mb-0.5 inline h-4 w-4" />
          </Tooltip>
        </span>
      </div>
      <div className={columnClass}>{t`Unclaimed ELFI`}</div>
      <div className={columnClass}>{t`Staked balance`}</div>
      <div className={columnClass}>{t`Available to stake`}</div>
      <div>{/* Actions (spacer) */}</div>
    </Well>
  );
}
