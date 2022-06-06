import { Fragment, ReactElement } from "react";

import { Card } from "@blueprintjs/core";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { Title } from "ui/base/Title";
import { useTotalValueLockedForPlatform } from "ui/stats/useTotalValueLockedForPlatform";
import { formatMoney } from "elf/money/formatMoney";

interface StatsViewProps {}

export function StatsView(unusedProps: StatsViewProps): ReactElement {
  const tvl = useTotalValueLockedForPlatform();
  return (
    <Fragment>
      <Title text={t`Stats | Element.fi`} />
      {/* Main content */}
      <div
        data-testid="stats-view"
        className={tw(
          "flex",
          "flex-col",
          "h-full",
          "flex-1",
          "items-center",
          "justify-center",
        )}
      >
        <Card>{t`Element TVL: ${formatMoney(tvl)}`}</Card>
      </div>
    </Fragment>
  );
}
