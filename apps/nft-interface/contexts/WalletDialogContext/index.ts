import React from "react";

export interface WalletDialogContextType {
  isOpen: boolean;
  close: () => void;
  open: () => void;
}

const defaultContext: WalletDialogContextType = {
  isOpen: false,
  close: () => {},
  open: () => {},
};

export const WalletDialogContext =
  React.createContext<WalletDialogContextType>(defaultContext);

export default WalletDialogContext;
