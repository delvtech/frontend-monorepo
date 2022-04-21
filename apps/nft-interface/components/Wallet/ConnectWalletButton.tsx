import { PrimaryButton } from "common/Button/styles";
import { useWalletDialog } from "hooks/useWalletDialog";
import useWeb3 from "hooks/useWeb3";
import React from "react";

export const ConnectWalletButton: React.FC = () => {
  const { active } = useWeb3();
  const { open } = useWalletDialog();

  return (
    <PrimaryButton onClick={() => open()}>
      {active ? "Connected" : "Connect Wallet"}
    </PrimaryButton>
  );
};
