import { Button } from "common/Button/styles";
import { Flex } from "common/Container/styles";
import { Dialog } from "common/Dialog";
import { DialogBodyText, DialogTitle } from "common/Dialog/styles";
import { Spacer } from "common/Spacer";
import { BigNumber } from "ethers";
import { hexStripZeros } from "ethers/lib/utils";
import { createToastError } from "helpers/createToast";
import useWeb3 from "hooks/useWeb3";
import React, { useCallback, useEffect, useState } from "react";
import { NEXT_ENV } from "src/providers";
import { chainName, getTargetChain } from "wallets/chains";

interface ErrorWithCode extends Error {
  code?: number;
}

export const SwitchNetworkDialog: React.FC = () => {
  const { active, deactivate, library, chainId } = useWeb3();

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => setIsOpen(true), [setIsOpen]);
  const closeDialog = useCallback(() => setIsOpen(false), [setIsOpen]);

  useEffect(() => {
    if (
      !!chainId &&
      getTargetChain() !== chainId &&
      // Overrides this check if we are in development mode
      NEXT_ENV !== "development"
    ) {
      openDialog();
    } else {
      closeDialog();
    }
  }, [chainId, openDialog, closeDialog]);

  const deactivateActiveConnector = useCallback(async () => {
    createToastError("Wallet has been disconnected.");
    await deactivate();
  }, [deactivate]);

  const switchToNetwork = async () => {
    if (!library?.provider?.request) {
      return;
    }
    const formattedChainId = hexStripZeros(
      BigNumber.from(getTargetChain()).toHexString(),
    );
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: formattedChainId }],
      });
    } catch (error) {
      // 4902 is the error code for attempting to switch to an unrecognized chainId
      const _error = error as ErrorWithCode;
      if (_error.code && _error.code === 4902) {
        // This should never happen
        createToastError("Network not available in wallet provider.");
      } else {
        throw error;
      }
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={() => closeDialog()}>
      <Flex align="center" direction="column">
        <DialogTitle>Switch to {chainName}</DialogTitle>
        <Button sidePadding="24px" onClick={switchToNetwork}>
          Switch network
        </Button>

        {active && (
          <>
            <Spacer />
            <Button
              sidePadding="24px"
              onClick={async () => {
                await deactivateActiveConnector();
                closeDialog();
              }}
            >
              Close connection
            </Button>
          </>
        )}

        <DialogBodyText>
          Note: Elfiverse is only supported on {chainName}. Please switch to
          {chainName} by clicking on the button or changing networks in your
          wallet directly.
        </DialogBodyText>
      </Flex>
    </Dialog>
  );
};
