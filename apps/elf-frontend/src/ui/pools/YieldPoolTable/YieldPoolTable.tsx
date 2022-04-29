import { CSSProperties, ReactElement, useMemo } from "react";

import tw from "efi-tailwindcss-classnames";
import { useOpenYieldPools } from "ui/pools/hooks/useOpenYieldPools";
import { yieldPools } from "elf/pools/weightedPool";

import { YieldPoolTableHeader } from "./YieldPoolTableHeader";
import { YieldPoolTableRow } from "ui/pools/YieldPoolTable/YieldPoolTableRow";
import classNames from "classnames";

interface YieldPoolTableProps {
  showMaturePools?: boolean;
  className: string;
}

const yieldPoolTableStyle: CSSProperties = {
  width: 1240,
};

export function YieldPoolTable({
  showMaturePools = true,
  className,
}: YieldPoolTableProps): ReactElement {
  const openYieldPools = useOpenYieldPools();
  const yieldPoolsToShow = showMaturePools ? yieldPools : openYieldPools;

  const sortedPools = useMemo(
    () =>
      [...yieldPoolsToShow]
        .sort((info) => info.extensions.createdAtTimestamp)
        .reverse(),
    [yieldPoolsToShow],
  );

  return (
    <div
      className={classNames(
        tw("flex-col", "items-center", "space-y-5"),
        className,
      )}
      style={yieldPoolTableStyle}
    >
      <YieldPoolTableHeader className={tw("hidden", "lg:grid")} />

      {sortedPools.map((poolInfo) => {
        return (
          <YieldPoolTableRow key={poolInfo.address} yieldPoolInfo={poolInfo} />
        );
      })}
    </div>
  );
}
