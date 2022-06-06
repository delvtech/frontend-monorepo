import { CSSProperties, FC, ReactElement, SVGProps } from "react";

interface SvgIconProps {
  height: number;
  width: number;
  className: string | undefined;
  style: CSSProperties | undefined;
  alt: string;
  src: string;
}

export function SvgIcon({
  height,
  width,
  className = "",
  style = {},
  src,
  alt,
}: SvgIconProps): ReactElement {
  return (
    <img
      alt={alt}
      className={className}
      style={style}
      src={src}
      height={height}
      width={width}
    />
  );
}
