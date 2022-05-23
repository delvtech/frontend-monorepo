import React, { ReactElement } from "react";
import { WalletButton } from "src/ui/wallet/WalletButton";
import classNames from "classnames";

interface HeaderProps {
  className?: string;
}

function Header({ className }: HeaderProps): ReactElement {
  return (
    <div className={classNames("flex items-center", className)}>
      <WalletButton />
    </div>
  );
}

export default Header;
