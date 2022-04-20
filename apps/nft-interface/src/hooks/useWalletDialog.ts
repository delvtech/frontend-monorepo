import WalletDialogContext from "contexts/WalletDialogContext";
import React from "react";

export const useWalletDialog = (): WalletDialogContext => {
  const context = React.useContext(WalletDialogContext);
  return context;
};
