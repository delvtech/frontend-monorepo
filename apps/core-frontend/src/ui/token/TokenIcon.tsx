import { CSSProperties, FC, ReactElement } from "react";

import crvAlusdIcon from "static/logos/crvALUSD.png";
import crvLusdIcon from "static/logos/svg/crvLUSD.svg?url";
import crvMimIcon from "static/logos/crvMIM.png";
import crvEursIcon from "static/logos/crvEURS.png";
import stethIcon from "static/logos/steth.png";
import alUsdIcon from "static/logos/alusd.png";
import crvStethIcon from "static/logos/svg/crvSTETH.svg?url";
import crvTricryptoIcon from "static/logos/svg/crvtricrypto.svg?url";
import daiIcon from "static/logos/svg/DAI.svg?url";
import elementIconDark from "static/logos/svg/ELEMENT-dark.svg?url";
import elementIcon from "static/logos/svg/ELEMENT-light.svg?url";
import ethIconGrey from "static/logos/svg/ethereum-eth.svg?url";
import lusdIcon from "static/logos/svg/LUSD.svg?url";
import mimIcon from "static/logos/svg/mim.svg?url";
import usdcIcon from "static/logos/svg/USDC.svg?url";
import usdtIcon from "static/logos/svg/usdt.svg?url";
import threeCrvIcon from "static/logos/svg/3crv.svg?url";
import wethIcon from "static/logos/svg/WETH.svg?url";
import wbtcIcon from "static/logos/svg/WBTC.svg?url";
import bbaUsdc from "static/logos/bb-a-usdc.png";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { SvgIcon } from "ui/base/SvgIcon";

/**
 * @deprecated, just use FC<IconProps>;
 */
export type TokenIcon = FC<IconProps>;

export interface IconProps {
  height: number;
  width: number;
  className?: string | undefined;
  style?: CSSProperties | undefined;
}

export function StethIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"steth"}
      className={className}
      style={style}
      src={stethIcon.src}
      height={height}
      width={width}
    />
  );
}

export function MimIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"mim"}
      className={className}
      style={style}
      src={mimIcon}
      height={height}
      width={width}
    />
  );
}

export function AlusdIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"alusd"}
      className={className}
      style={style}
      src={alUsdIcon.src}
      height={height}
      width={width}
    />
  );
}

export function ThreeCrvIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"3CRV"}
      className={className}
      style={style}
      src={threeCrvIcon}
      height={height}
      width={width}
    />
  );
}

export function UsdtIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"USDT"}
      className={className}
      style={style}
      src={usdtIcon}
      height={height}
      width={width}
    />
  );
}

export function CrvEursIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"crvEURS"}
      className={className}
      style={style}
      src={crvEursIcon.src}
      height={height}
      width={width}
    />
  );
}

export function CrvMimIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"crvMIM"}
      className={className}
      style={style}
      src={crvMimIcon.src}
      height={height}
      width={width}
    />
  );
}
export function WbtcIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"wbtc"}
      className={className}
      style={style}
      src={wbtcIcon}
      height={height}
      width={width}
    />
  );
}

export function LusdIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"lusd"}
      className={className}
      style={style}
      src={lusdIcon}
      height={height}
      width={width}
    />
  );
}
export function CrvTricryptoIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"crvtricrypto"}
      className={className}
      style={style}
      src={crvTricryptoIcon}
      height={height}
      width={width}
    />
  );
}

export function CrvStethIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"crvsteth"}
      className={className}
      style={style}
      src={crvStethIcon}
      height={height}
      width={width}
    />
  );
}
export function BbaUsdcIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"bb-a-usdc"}
      className={className}
      style={style}
      src={bbaUsdc.src}
      height={height}
      width={width}
    />
  );
}
export function CrvAlusdIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"crvalusd"}
      className={className}
      style={style}
      src={crvAlusdIcon.src}
      height={height}
      width={width}
    />
  );
}
export function CrvLusdIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"crvlusd"}
      className={className}
      style={style}
      src={crvLusdIcon}
      height={height}
      width={width}
    />
  );
}
export function EthIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"ethereum"}
      className={className}
      style={style}
      src={ethIconGrey}
      height={height}
      width={width}
    />
  );
}

export function DaiIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"dai"}
      className={className}
      style={style}
      src={daiIcon}
      height={height}
      width={width}
    />
  );
}
export function UsdcIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  return (
    <SvgIcon
      alt={"usdc"}
      className={className}
      style={style}
      src={usdcIcon}
      height={height}
      width={width}
    />
  );
}

export function WethIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  // const { isDarkMode } = useDarkMode();
  // const color = isDarkMode ? Colors.GRAY5 : Colors.DARK_GRAY5;
  const iconStyle: CSSProperties = {
    // backgroundColor: color,
    ...style,
  };

  return (
    <SvgIcon
      alt={"weth"}
      className={className}
      style={iconStyle}
      src={wethIcon}
      height={height}
      width={width}
    />
  );
}

export function ElementIcon({
  height,
  width,
  className,
  style,
}: IconProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  const icon = isDarkMode ? elementIconDark : elementIcon;
  return (
    <SvgIcon
      alt={"element"}
      className={className}
      style={style}
      src={icon}
      height={height}
      width={width}
    />
  );
}
