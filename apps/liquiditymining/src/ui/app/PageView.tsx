import { useWeb3React } from "@web3-react/core";
import classNames from "classnames";
import React, { Fragment, ReactElement, ReactNode } from "react";
import { addressesJson } from "src/elf-council-addresses";
import { ChainId, ChainNames } from "src/ethereum";
import Header from "src/ui/app/Header";
import SimpleDialog from "src/ui/base/Dialog/Dialog";
import H3 from "src/ui/base/H3/H3";
import { t } from "ttag";

interface PageViewProps {
  children?: ReactNode;
  childrenContainerClassName?: string;
  showHeader?: boolean;
}

export default function PageView(props: PageViewProps): ReactElement {
  const { children, showHeader = true, childrenContainerClassName } = props;
  const { chainId } = useWeb3React();
  const isWrongChain = !!chainId && chainId !== addressesJson.chainId;
  return (
    <Fragment>
      <div className="min-h-screen bg-appBackgroundLight">
        <div className="w-full p-6">
          {showHeader ? <Header /> : null}
          <div className={classNames("mt-6", childrenContainerClassName)}>
            {children}
          </div>
        </div>
      </div>
      <SimpleDialog isOpen={isWrongChain} className="text-center">
        <H3>{t`Please connect to ${
          ChainNames[addressesJson.chainId as ChainId]
        }`}</H3>
        <span>{t`Chain ID: ${addressesJson.chainId}`}</span>
      </SimpleDialog>
    </Fragment>
  );
}
