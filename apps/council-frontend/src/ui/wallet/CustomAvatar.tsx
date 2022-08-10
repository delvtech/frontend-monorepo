import React, { useEffect, useRef } from "react";
import { AvatarComponent } from "@rainbow-me/rainbowkit";
import jazzicon from "@metamask/jazzicon";
import { t } from "ttag";
import Image from "next/image";

import { getMetamaskJazziconSeed } from "src/base/getMetamaskJazziconSeed";

const JAZZICON_DIAMETER_PIXELS = 48;

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const jazziconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!address) {
      return;
    }

    const seed = getMetamaskJazziconSeed(address);
    const jazziconElement = jazzicon(size || JAZZICON_DIAMETER_PIXELS, seed);
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
  }, [address, size]);

  return ensImage ? (
    <Image src={ensImage} width={size} height={size} alt={t`ENS Avatar`} />
  ) : (
    <div ref={jazziconRef}></div>
  );
};

export default CustomAvatar;
