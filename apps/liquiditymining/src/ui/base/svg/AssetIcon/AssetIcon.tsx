import classNames from "classnames";
import { ReactElement } from "react";
import { SVGComponentProps } from "src/ui/base/svg/types";

import ThreeCRV from "./3crv.svg";
import ALUSD from "./alusd.svg";
import BTC from "./btc.svg";
import DAI from "./dai.svg";
import ETH from "./eth.svg";
import LUSD from "./lusd.svg";
import MIM from "./mim.svg";
import STETH from "./steth.svg";
import USDC from "./usdc.svg";
import USDT from "./usdt.svg";
import WBTC from "./wbtc.svg";

const icons = {
  "3CRV": ThreeCRV,
  ALUSD,
  BTC,
  DAI,
  ETH,
  LUSD,
  MIM,
  STETH,
  USDC,
  USDT,
  WBTC,
};

interface AssetIconProps extends SVGComponentProps {
  symbol: string;
}

export default function AssetIcon({
  symbol,
  ...props
}: AssetIconProps): ReactElement {
  const Icon = icons[symbol.toUpperCase() as keyof typeof icons];
  return Icon ? (
    <Icon {...props} />
  ) : (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="30" cy="30" r="30" className="fill-principalRoyalBlue" />
      <text
        x="30"
        y="30"
        textAnchor="middle"
        alignmentBaseline="central"
        className={classNames(
          symbol.length > 5 ? "text-xs" : symbol.length > 3 && "text-sm",
          "fill-white font-sans font-semibold",
        )}
      >
        {symbol}
      </text>
    </svg>
  );
}
