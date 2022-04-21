import { Button, ButtonSize, ButtonStyles } from "common/Button/styles";
import { useWalletDialog } from "hooks/useWalletDialog";
import useWeb3 from "hooks/useWeb3";
import React from "react";

export const ConnectWalletNavButton: React.FC<ButtonStyles> = ({ size }) => {
  const { account, active } = useWeb3();
  const { open } = useWalletDialog();

  return (
    <Button size={size ?? ButtonSize.SMALL} onClick={() => open()}>
      {active
        ? `${account?.slice(0, 6)}...${account?.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  );
};
