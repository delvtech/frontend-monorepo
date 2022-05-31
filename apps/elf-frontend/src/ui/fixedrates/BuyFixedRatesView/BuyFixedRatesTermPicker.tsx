import tw from "efi-tailwindcss-classnames";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { t } from "ttag";
import classNames from "classnames";
import { PrincipalTokenInfo } from "@elementfi/core-tokenlist";
import { ReactElement } from "react";
import { TermPicker2 } from "ui/tranche/TermPicker/TermPicker2";
import { PrincipalTokenTermButtonLabel2 } from "ui/tranche/TermPicker/PrincipalTokenTermButtonLabel2";

interface BuyFixedRatesTermPickerProps {
  availablePrincipalTokens: PrincipalTokenInfo[];
  account: string | null | undefined;
  activePrincipalToken: PrincipalTokenInfo;
}

export function BuyFixedRatesTermPicker({
  availablePrincipalTokens,
  account,
  activePrincipalToken,
}: BuyFixedRatesTermPickerProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  return (
    <div className={tw("flex", "flex-col", "space-y-3")}>
      <span
        className={tw("text-base", "text-left")}
      >{t`Select Term Period`}</span>
      <div
        style={{
          background: isDarkMode ? "var(--bp3-dark-bg-color)" : "",
        }}
        className={classNames(
          tw("flex", "p-1", "border", "rounded", "border-gray-500"),
        )}
      >
        {availablePrincipalTokens.length > 1 ? (
          <TermPicker2
            account={account}
            principalTokenInfos={availablePrincipalTokens}
            activePrincipalToken={activePrincipalToken}
            buttonLabelRenderer={buttonLabelRenderer}
          />
        ) : (
          // just show the label if there's no picker
          <PrincipalTokenTermButtonLabel2
            className={tw("p-4")}
            principalTokenInfo={activePrincipalToken}
          />
        )}
      </div>
    </div>
  );
}

function buttonLabelRenderer(term: PrincipalTokenInfo): ReactElement {
  return <PrincipalTokenTermButtonLabel2 principalTokenInfo={term} />;
}
