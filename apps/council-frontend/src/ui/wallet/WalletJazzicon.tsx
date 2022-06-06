import React, { CSSProperties, ReactElement, useEffect, useRef } from "react";

import jazzicon from "@metamask/jazzicon";
import { getMetamaskJazziconSeed } from "src/getMetamaskJazziconSeed";

interface WalletJazziconProps {
  account: string | null | undefined;
  size?: number;

  className?: string;
  iconClassName?: string;
  style?: CSSProperties;
}

const JAZZICON_DIAMETER_PIXELS = 48;
export function WalletJazzicon({
  account,
  size,
  className,
  iconClassName,
  style,
}: WalletJazziconProps): ReactElement {
  const jazziconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!account) {
      return;
    }

    const seed = getMetamaskJazziconSeed(account);
    const jazziconElement = jazzicon(size || JAZZICON_DIAMETER_PIXELS, seed);
    jazziconElement.className = iconClassName || "";

    const jazziconRefElement = jazziconRef.current;
    if (jazziconRefElement) {
      jazziconRefElement.appendChild(jazziconElement);
    }

    return () => {
      // always remove the previuos render's injected elements
      if (jazziconRefElement?.children) {
        Array.from(jazziconRefElement?.children).forEach((child) => {
          child.remove();
        });
      }
    };
  }, [account, iconClassName, size]);

  return <div ref={jazziconRef} style={style} className={className}></div>;
}
