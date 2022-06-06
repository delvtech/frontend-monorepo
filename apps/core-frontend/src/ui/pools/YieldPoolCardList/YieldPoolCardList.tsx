import { ReactElement, useMemo } from "react";

import classNames from "classnames";

import tw from "efi-tailwindcss-classnames";
import { useOpenYieldPools } from "ui/pools/hooks/useOpenYieldPools";
import { YieldPoolCardListItem } from "ui/pools/YieldPoolCardList/YieldPoolCardListItem";
import { yieldPools } from "elf/pools/weightedPool";

interface YieldPoolCardListProps {
  showMaturePools?: boolean;
  className: string;
}

export function YieldPoolCardList({
  showMaturePools = true,
  className,
}: YieldPoolCardListProps): ReactElement {
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
        tw("flex-col", "items-center", "space-y-5", "w-full"),
        className,
      )}
    >
      {sortedPools.map((poolInfo) => {
        return (
          <YieldPoolCardListItem
            key={poolInfo.address}
            yieldPoolTokenInfo={poolInfo}
          />
        );
      })}
    </div>
  );
}
