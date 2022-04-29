import { Button, Card, Colors, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
  TokenInfo,
} from "@elementfi/tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import tw from "efi-tailwindcss-classnames";
import { Fragment, ReactElement, useCallback, useState } from "react";
import { t } from "ttag";
import { useNavigation } from "ui/app/navigation/hooks/useNavigation";
import { Navigation } from "ui/app/navigation/navigation";
import { Title } from "ui/base/Title";
import { BuyFixedRatesKind } from "ui/fixedrates/buyFixedRateKind";
import { BuyFixedRatesInputSelect } from "ui/fixedrates/BuyFixedRatesView/BuyFixedRatesInputSelect";
import { BuyFixedRatesSwap } from "ui/fixedrates/BuyFixedRatesView/BuyFixedRatesSwap";
import { BuyFixedRatesTermPicker } from "ui/fixedrates/BuyFixedRatesView/BuyFixedRatesTermPicker";
import { BuyFixedRatesZap } from "ui/fixedrates/BuyFixedRatesView/BuyFixedRatesZap";
import { getFixedRateInputTokens } from "ui/fixedrates/getFixedRateInputTokens";

export interface BuyFixedRatesViewProps {
  availablePrincipalTokens: PrincipalTokenInfo[];
  principalTokenInfo: PrincipalTokenInfo;
  principalTokenPoolInfo: PrincipalPoolTokenInfo;
  // principalTokenAddress comes from the url params whos type is
  // `parsedUrlQuery | undefined` so it must be optional.
  principalTokenAddress?: string;
}

export function BuyFixedRatesViewWithZap({
  availablePrincipalTokens,
  principalTokenInfo,
  principalTokenPoolInfo,
}: BuyFixedRatesViewProps): ReactElement {
  const { account } = useWeb3React<Web3Provider>();
  const { changeTab } = useNavigation();
  const goToFixedRatesListPage = useCallback(() => {
    changeTab(Navigation.FIXED_RATES);
  }, [changeTab]);

  const {
    extensions: { underlying },
  } = principalTokenInfo;

  // inputTokenInfos will always give an array of either [underlyingTokenInfo]
  // in the case when principalTokenis not curve based and otherwise will give
  // the underlyingTokenInfo + other input tokens
  const inputTokenInfos = getFixedRateInputTokens(principalTokenInfo);
  const [selectedInputToken, setSelectedInputToken] = useState<TokenInfo>(
    inputTokenInfos[0],
  );

  const buyFixedRatesKind =
    selectedInputToken.address === underlying
      ? BuyFixedRatesKind.Swap
      : BuyFixedRatesKind.Zap;

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
            "items-center",
            "w-full",
            "space-x-5",
            "lg:px-16",
            "lg:text-lg",
          )}
        >
          <Button
            className={tw("font-semibold")}
            icon={
              <Icon
                color={Colors.WHITE}
                icon={IconNames.DOWNLOAD}
                size={32}
                className={tw(
                  // transform is a weird property that requires casting in tw()
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  "transform" as any,
                  "rotate-90",
                )}
              />
            }
            minimal
            large
            onClick={goToFixedRatesListPage}
          >{t`Principal Pools`}</Button>
          <div style={{ width: 1 }} className={tw("h-full", "bg-white")} />
          <span
            className={tw("pl-2", "font-semibold")}
          >{`${inputTokenInfos[0].symbol}`}</span>
        </div>
        <div
          className={tw(
            "flex",
            "flex-col",
            "w-full",
            "items-center",
            "text-center",
            "space-y-4",
            "pt-2",
            "px-6",
            "pb-24",
            "lg:py-10",
            "lg:max-w-4xl",
          )}
        >
          <Card className={tw("flex", "flex-col", "w-400", "p-6", "space-y-8")}>
            <BuyFixedRatesInputSelect
              inputTokens={inputTokenInfos}
              selectedToken={selectedInputToken}
              onTokenSelect={setSelectedInputToken}
            />
            <BuyFixedRatesTermPicker
              availablePrincipalTokens={availablePrincipalTokens}
              account={account}
              activePrincipalToken={principalTokenInfo}
            />
            {buyFixedRatesKind === BuyFixedRatesKind.Swap ? (
              <BuyFixedRatesSwap
                principalToken={principalTokenInfo}
                principalTokenPoolInfo={principalTokenPoolInfo}
              />
            ) : (
              <BuyFixedRatesZap
                principalToken={principalTokenInfo}
                inputToken={selectedInputToken}
                inputTokens={inputTokenInfos}
              />
            )}
          </Card>
        </div>
      </div>
    </Fragment>
  );
}
