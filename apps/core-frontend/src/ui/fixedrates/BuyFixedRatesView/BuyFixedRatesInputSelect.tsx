import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { Select } from "@blueprintjs/select";
import { TokenInfo } from "@elementfi/core-tokenlist";
import { t } from "ttag";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { findAssetIconByAddress } from "ui/crypto/CryptoIcon";
import { ReactElement, useMemo } from "react";
import { useIsTailwindLargeScreen } from "ui/base/mediaBreakpoints";

const TokenInfoSelect = Select.ofType<TokenInfo>();

interface BuyFixedRatesInputSelectProps {
  inputTokens: TokenInfo[];
  selectedToken: TokenInfo;
  onTokenSelect: (item: TokenInfo) => void;
}

export function BuyFixedRatesInputSelect({
  inputTokens,
  selectedToken,
  onTokenSelect,
}: BuyFixedRatesInputSelectProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  const inputTokenIconsByAddress = useMemo(
    () =>
      Object.fromEntries(
        inputTokens.map(({ address }) => [
          address,
          findAssetIconByAddress(address),
        ]),
      ),
    [inputTokens],
  );

  const isLargeScreen = useIsTailwindLargeScreen();

  const height = isLargeScreen ? 40 : 30;
  const width = height;

  return (
    <div className={tw("flex", "flex-col", "space-y-3")}>
      <span className={tw("text-base", "text-left")}>{t`Choose Token`}</span>

      <div
        style={{
          background: isDarkMode ? "var(--bp3-dark-bg-color)" : "",
        }}
        className={classNames(
          tw("flex", "p-1", "border", "rounded", "border-gray-500"),
        )}
      >
        <TokenInfoSelect
          className={tw("w-full")}
          disabled={inputTokens.length === 1}
          items={inputTokens}
          itemPredicate={(_, s) => s.address !== selectedToken.address}
          itemRenderer={({ symbol, address }, { handleClick }) => (
            // div -> button possibly broken something
            <button className={classNames(tw("p-1"))} onClick={handleClick}>
              <LabeledText
                containerClassName={tw("p-4")}
                icon={inputTokenIconsByAddress[address]({
                  height,
                  width,
                })}
                iconClassName={tw("flex-shrink-0", "mr-4")}
                large={isLargeScreen}
                labelClassName={tw("text-xs", "text-left")}
                label={""}
                textClassName={tw("lg:text-base", "text-left")}
                text={symbol}
              />
            </button>
          )}
          onItemSelect={onTokenSelect}
          filterable={false}
        >
          <button
            disabled={inputTokens.length === 1}
            // disabled === true still sets cursor = pointer for some weird reason
            style={{ cursor: inputTokens.length === 1 ? "default" : "pointer" }}
          >
            <LabeledText
              containerClassName={tw("p-4")}
              icon={inputTokenIconsByAddress[selectedToken.address]({
                height,
                width,
              })}
              iconClassName={tw("flex-shrink-0", "mr-4")}
              large={isLargeScreen}
              labelClassName={tw("text-xs", "text-left")}
              label={""}
              textClassName={tw("lg:text-base", "text-left")}
              text={selectedToken.symbol}
            />
          </button>
        </TokenInfoSelect>
      </div>
    </div>
  );
}
