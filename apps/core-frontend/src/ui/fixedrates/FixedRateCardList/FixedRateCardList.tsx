import { PrincipalTokenInfo } from "@elementfi/core-tokenlist";
import { aztecTerms } from "integrations/aztec/aztecAddresses";
import { ReactElement } from "react";
import { jt } from "ttag";
import { useIsTailwindLargeScreen } from "ui/base/mediaBreakpoints";
import { FixedRateCardWithZap } from "ui/fixedrates/FixedRateCard/FixedRateCardWithZap";

import tw from "efi-tailwindcss-classnames";

import { FixedRateCardListHeader } from "./FixedRateCardListHeader";

interface FixedRateCardListProps {
  principalTokens: PrincipalTokenInfo[];
}

const aztecLink = (
  <a href="https://zk.money/earn" key="aztec-link">
    zk.money
  </a>
);

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
              bannerText={
                aztecTerms.includes(principalToken.address)
                  ? jt`✨ Want Privacy? Use Element via Aztec's ${aztecLink} for up to 30x cheaper, private transactions! ✨`
                  : null
              }
            />
          ))}
        </>
      )}
    </div>
  );
}
