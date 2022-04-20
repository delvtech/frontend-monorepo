import {
  WalletDialogContextType,
  WalletDialogContext,
} from "contexts/WalletDialogContext";
import React from "react";

export const useWalletDialog = (): WalletDialogContextType => {
  const context = React.useContext(WalletDialogContext);
  return context;
};
