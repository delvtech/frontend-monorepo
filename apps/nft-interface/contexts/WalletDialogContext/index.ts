import React from "react";

interface WalletDialogContext {
  isOpen: boolean;
  close: () => void;
  open: () => void;
}

const defaultContext: WalletDialogContext = {
  isOpen: false,
  close: () => {},
  open: () => {},
};

const WalletDialogContext =
  React.createContext<WalletDialogContext>(defaultContext);

export default WalletDialogContext;
