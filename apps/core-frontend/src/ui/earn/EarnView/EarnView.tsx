import { CSSProperties, Fragment, ReactElement } from "react";

import { NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import dynamic from "next/dynamic";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useIsTailwindSmallScreen } from "ui/base/mediaBreakpoints";
import { Title } from "ui/base/Title";
import { ViewTitle } from "ui/page/ViewTitle/ViewTitle";
import { useSigner } from "ui/provider/useBlockFromTag/useSigner/useSigner";
import { useOpenPrincipalTokenInfos } from "ui/tranche/useOpenPrincipalTokenInfos";

const DynamicEarnTable = dynamic(() => import("ui/earn/EarnTable/EarnTable"));

const DynamicEarnCardList = dynamic(
  () => import("ui/earn/EarnCardList/EarnCardList"),
);

interface EarnViewProps {}

export function EarnView(unusedProps: EarnViewProps): ReactElement {
  const { account, library } = useWeb3React<Web3Provider>();
  const signer = useSigner(account, library);

  const openPrincipalTokenInfos = useOpenPrincipalTokenInfos();
  const hasOpenPrincipalTokenInfos = !!openPrincipalTokenInfos.length;
  const isSmallScreenView = useIsTailwindSmallScreen();
  const showSmallScreenView = isSmallScreenView && hasOpenPrincipalTokenInfos;
  const showLargeScreenView = !isSmallScreenView && hasOpenPrincipalTokenInfos;

  const earnViewStyle: CSSProperties = { maxWidth: 610 };
  return (
    <Fragment>
      <Title text={t`Earn | Element.fi`} />
      <div
        data-testid="earn-view"
        className={tw(
          "flex",
          "flex-col",
          "items-center",
          "w-full",
          "space-y-12",
          "lg:pb-12",
          "pb-24",
        )}
      >
        <div style={earnViewStyle}>
          <ViewTitle
            title={t`Capital efficiency for your yield positions.`}
            className={tw("text-center")}
            subtitle={t`Mint Principal and Yield Tokens from your base asset, boost your APY by providing liquidity and view current APYs across all available terms.`}
          />
        </div>
        {!hasOpenPrincipalTokenInfos && (
          <NonIdealState
            className={tw("mt-12")}
            icon={IconNames.CLEAN}
            title={t`No available terms`}
            description={t`Please check back soon!`}
          />
        )}

        {showSmallScreenView && (
          <DynamicEarnCardList
            library={library}
            account={account}
            signer={signer}
          />
        )}
        {showLargeScreenView && (
          <DynamicEarnTable
            library={library}
            account={account}
            signer={signer}
          />
        )}
      </div>
    </Fragment>
  );
}
