import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Navbar } from "@elementfi/component-library";

import { ReactElement } from "react";

export default function Header(): ReactElement {
  return (
    <Navbar>
      <div className="flex-1">
        <span className="text-xl font-bold normal-case">Element</span>
      </div>
      <div className="flex-none">{<ConnectButton />}</div>
    </Navbar>
  );
}
