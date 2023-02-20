import React, { Fragment, ReactElement, ReactNode } from "react";
import { ChainId, ChainNames } from "@elementfi/base";
import classNames from "classnames";
import { jt, t } from "ttag";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { addressesJson } from "src/addresses";
import Footer from "src/ui/app/Footer";
import Header from "src/ui/app/Header";
import Sidebar from "src/ui/app/Sidebar";
import SimpleDialog from "src/ui/base/Dialog/Dialog";
import H3 from "src/ui/base/H3/H3";
import Button from "src/ui/base/Button/Button";
import ElementUrl from "src/urls";

interface PageViewProps {
  children?: ReactNode;
  childrenContainerClassName?: string;
  /**
   * Whether or not the sidebar navigation should be shown, defaults to true
   */
  showSidebar?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
}

const councilLink = (
  <a
    href={ElementUrl.COUNCIL_UI}
    target="_blank"
    rel="noreferrer"
    className={classNames(
      "text-principalRoyalBlue decoration-current underline-offset-2 hover:underline",
    )}
  >
    governance.element.fi
  </a>
);
export default function PageView(props: PageViewProps): ReactElement {
  const {
    children,
    showSidebar = true,
    showHeader = true,
    showFooter = false,
    childrenContainerClassName,
  } = props;
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork, isLoading } = useSwitchNetwork();

  const isWrongChain = !!chain?.id && chain.id !== addressesJson.chainId;

  return (
    <Fragment>
      <div
        className={classNames(
          "flex h-full w-full justify-between bg-appBackgroundLight",
          {
            "md:pl-60": showSidebar,
          },
        )}
      >
        {showSidebar ? <Sidebar account={address} /> : null}
        <div className="flex h-full w-full flex-1 flex-col items-center p-6">
          {showHeader ? <Header /> : null}

          <p className="mt-4 rounded-xl bg-red-200 p-4">
            {jt`This UI will be deprecated on April 1st, 2023. Visit the new UI at
            ${councilLink}`}
          </p>
          <div
            className={classNames(
              "mt-6 h-full w-full flex-1",
              childrenContainerClassName,
            )}
          >
            {children}
          </div>
          {showFooter ? <Footer /> : null}
        </div>
      </div>

      <SimpleDialog isOpen={isWrongChain}>
        <div className="flex flex-col text-center">
          <H3>{t`Wrong network detected`}</H3>

          <Button
            onClick={() => switchNetwork?.(addressesJson.chainId)}
            loading={isLoading}
            className="mt-3 flex justify-center"
          >
            <span>
              {`Switch to ${ChainNames[addressesJson.chainId as ChainId]}`}
            </span>
          </Button>
        </div>
      </SimpleDialog>
    </Fragment>
  );
}
