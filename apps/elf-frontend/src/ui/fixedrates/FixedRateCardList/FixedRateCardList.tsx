import { PrincipalTokenInfo } from "@elementfi/tokenlist";
import tw from "efi-tailwindcss-classnames";
import { ReactElement } from "react";
import { useIsTailwindLargeScreen } from "ui/base/mediaBreakpoints";
import { FixedRateCardWithZap } from "ui/fixedrates/FixedRateCard/FixedRateCardWithZap";
import { FixedRateCardListHeader } from "./FixedRateCardListHeader";

interface FixedRateCardListProps {
  principalTokens: PrincipalTokenInfo[];
}

export function FixedRateCardList(props: FixedRateCardListProps): ReactElement {
  const { principalTokens } = props;
  const isLargeScreen = useIsTailwindLargeScreen();

  return (
    <div className={tw("flex", "flex-col", "space-y-4", "items-center")}>
      {/* TODO:
          Understand better what's going on here and if there is a better way
          to handle it. */}
      {process.browser && ( // required for blueprint to render correctly
        <>
          <FixedRateCardListHeader hide={!isLargeScreen} />
          {principalTokens.map((principalToken) => (
            <FixedRateCardWithZap
              key={principalToken.address}
              principalToken={principalToken}
            />
          ))}
        </>
      )}
    </div>
  );
}
