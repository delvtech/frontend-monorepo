import { Fragment, ReactElement, useMemo } from "react";

import { jt, t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { Title } from "ui/base/Title";
import { FixedRateCardList } from "ui/fixedrates/FixedRateCardList/FixedRateCardList";
import { ViewTitle } from "ui/page/ViewTitle/ViewTitle";
import { useOpenPrincipalTokenInfos } from "ui/tranche/useOpenPrincipalTokenInfos";

interface FixedRatesListViewProps {}

const fixedYieldLink = (
  <a
    key="fixed-yield-link"
    href="https://medium.com/element-finance/fixed-rate-interest-markets-a-casual-users-journey-through-fixed-rate-interest-using-element-50f420df1859"
    target="_noreferrer"
  >{t`Fixed Yield`}</a>
);
export function FixedRatesListView(
  unusedProps: FixedRatesListViewProps,
): ReactElement {
  const openPrincipalTokenInfos = useOpenPrincipalTokenInfos();

  const sortedPrincipalTokenInfos = useMemo(() => {
    return [...openPrincipalTokenInfos].sort(
      (info1, info2) =>
        info2.extensions.createdAtTimestamp -
        info1.extensions.createdAtTimestamp,
    );
  }, [openPrincipalTokenInfos]);

  return (
    <Fragment>
      <Title
        text={t`Earn fixed yield from buying at a discount. Exit anytime.`}
      />
      {/* Top-level route components should specify their own containers. */}
      <div className={tw("flex", "flex-col", "h-full", "items-center")}>
        <div
          className={tw(
            "flex",
            "flex-col",
            "w-full",
            "items-center",
            "text-center",
            "space-y-4",
            "lg:space-y-10",
            "pt-2",
            "px-6",
            "lg:pb-0",
            "lg:pt-10",
            "lg:max-w-4xl",
          )}
        >
          <ViewTitle
            title={t`The simplest way to grow your crypto savings.`}
            subtitle={jt`No minimums, no withdrawal penalties, exit anytime. Learn more about ${fixedYieldLink}.`}
          />
          <div
            className={tw(
              "flex",
              "w-full",
              "flex-col",
              "space-y-4",
              // there is a footer on small screens, so we need to add padding
              // in order for the list to scroll all the way to the bottom.
              "pb-20",
              // On large screens, we just need enough padding so the last card
              // isn't up against the bottom edge of the browser
              "lg:pb-4",
            )}
          >
            <FixedRateCardList principalTokens={sortedPrincipalTokenInfos} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
