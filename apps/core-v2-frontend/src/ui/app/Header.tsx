import { ConnectButton } from "@rainbow-me/rainbowkit";

import { ReactElement } from "react";

export default function Header(): ReactElement {
  return (
    <div className="daisy-navbar bg-base-100">
      <div className="flex-1">
        <span className="text-xl font-bold normal-case">Element V2</span>
      </div>

      <div className="flex-none">{<ConnectButton />}</div>
    </div>
  );
}
