import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ReactElement, useEffect, useState } from "react";

export default function Header(): ReactElement {
  // Hack to prevent Rainbow's ConnectButton from crashing during ssr
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <div className="daisy-navbar bg-base-100">
      <div className="flex-1">
        <span className="text-xl font-bold normal-case">Element V2</span>
      </div>

      <div className="flex-none">{isMounted ? <ConnectButton /> : null}</div>
    </div>
  );
}
