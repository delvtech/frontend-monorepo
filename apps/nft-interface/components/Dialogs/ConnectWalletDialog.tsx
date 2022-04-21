import { AbstractConnector } from "@web3-react/abstract-connector";
import { Button, PaddedButton } from "common/Button/styles";
import { Flex } from "common/Container/styles";
import { Dialog, DialogProps } from "common/Dialog";
import { DialogBodyText, DialogTitle } from "common/Dialog/styles";
import { Spacer } from "common/Spacer";
import { createToastError } from "helpers/createToast";
import { WithChildren } from "helpers/types";
import useWeb3 from "hooks/useWeb3";
import Image from "next/image";
import React, { ReactElement, useCallback } from "react";
import {
  getWalletConnectConnector,
  injectedConnector,
} from "wallets/connectors";

interface WalletButtonProps {
  alt: string;
  connector: AbstractConnector;
  deactivator?: () => void;
  onClick?: () => void;
  source: string;
}

const WalletButton = ({
  alt,
  connector,
  deactivator,
  onClick,
  source,
}: WalletButtonProps): ReactElement => {
  const { activate } = useWeb3();

  const handleClick = useCallback(() => {
    activate(connector, deactivator);
    onClick?.();
  }, [activate, connector, deactivator, onClick]);

  return (
    <PaddedButton onClick={handleClick}>
      <Image layout="fixed" height={100} width={100} src={source} alt={alt} />
    </PaddedButton>
  );
};

export const ConnectWalletDialog = ({
  isOpen,
  onClose,
}: WithChildren<DialogProps>): ReactElement => {
  const { active, deactivate } = useWeb3();

  const deactivateActiveConnector = useCallback(async () => {
    await deactivate();
    createToastError("Wallet has been disconnected.");
  }, [deactivate]);

  return (
    <Dialog isOpen={isOpen} onClose={() => onClose?.()}>
      <Flex align="center" direction="column">
        <DialogTitle>Connect Wallet</DialogTitle>

        <WalletButton
          connector={injectedConnector}
          deactivator={deactivateActiveConnector}
          alt="MetaMask"
          source="/assets/svg/metamask.svg"
          onClick={() => onClose?.()}
        />

        <Spacer />

        <WalletButton
          connector={getWalletConnectConnector()}
          deactivator={deactivateActiveConnector}
          alt="WalletConnect"
          source="/assets/svg/walletConnectIcon.svg"
          onClick={() => onClose?.()}
        />

        <DialogBodyText>
          Note: Some connectors can only disconnect wallets from their app. Some
          connectors may also cause a page refresh.
        </DialogBodyText>

        {active && (
          <>
            <Spacer />
            <Button
              sidePadding="24px"
              onClick={async () => {
                await deactivateActiveConnector();
                onClose?.();
              }}
            >
              Close connection
            </Button>
            <Spacer />
          </>
        )}
      </Flex>
    </Dialog>
  );
};
