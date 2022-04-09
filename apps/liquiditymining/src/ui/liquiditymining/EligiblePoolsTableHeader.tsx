import { InformationCircleIcon } from "@heroicons/react/solid";
import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { t } from "ttag";

const columnClass = "text-left text-sm font-semibold";

export function EligiblePoolsTableHeader(): ReactElement {
  return (
    <div className="grid h-full w-full grid-cols-[820px_1fr] items-center space-x-8">
      <Card
        variant={CardVariant.GRADIENT}
        className="grid h-full w-full grid-cols-[1fr_112px_112px_128px] items-center gap-x-10 !py-3 text-white"
      >
        <div className={`${columnClass}`}>{t`Eligible LP Token`}</div>

        <div className={columnClass}>{t`Pool TVL`}</div>

        <div className={columnClass}>
          <span>
            {t`Staked TVL`}
            <Tooltip
              content={t`total $ amount of LP tokens currently staked to earn ELFI`}
            >
              <InformationCircleIcon className="ml-1 mb-0.5 inline h-4 w-4" />
            </Tooltip>
          </span>
        </div>

        <div className={columnClass}>
          <span>
            {
              t`ELFI / $1K Week`
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
      </Card>

      <Card
        variant={CardVariant.GRADIENT}
        className="grid h-full grid-cols-[112px_112px_128px_1fr] items-center gap-x-10 !py-3 text-white"
      >
        <div className={columnClass}>{t`Unclaimed ELFI`}</div>
        <div className={columnClass}>{t`Staked balance`}</div>
        <div className={columnClass}>{t`Available to stake`}</div>
        {/* Actions (spacer) */}
        <div />
      </Card>
    </div>
  );
}
