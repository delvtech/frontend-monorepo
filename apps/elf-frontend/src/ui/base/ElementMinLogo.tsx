import { CSSProperties, ReactElement } from "react";

import Logo from "static/logos/svg/ELEMENT-super-light.svg?url";
import { SvgIcon } from "./SvgIcon";

export interface IconProps {
  height: number;
  width: number;
  className?: string | undefined;
  style?: CSSProperties | undefined;
}

export function ElementMinLogo({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"Element Logo"}
      className={className}
      style={style}
      src={Logo}
      height={height}
      width={width}
    />
  );
}
