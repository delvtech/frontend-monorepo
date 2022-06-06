import { CSSProperties, ReactElement, useMemo } from "react";

import logoDark from "static/logos/svg/ELEMENT-dark.svg?url";
import logo from "static/logos/svg/ELEMENT-light.svg?url";
import wordLogoDark from "static/logos/svg/logo--dark.svg?url";
import wordLogo from "static/logos/svg/logo--light.svg?url";

interface ElementLogoProps {
  iconOnly?: boolean;
  height: number;
  isDarkMode: boolean;
  className?: string;
}
export function ElementLogo({
  height,
  iconOnly = false,
  isDarkMode,
  className,
}: ElementLogoProps): ReactElement {
  // don't use tailwind for height since we want fixed height and rem is dynamic
  const style: CSSProperties = useMemo(
    () => ({
      height,
    }),
    [height],
  );

  let logoSrc = logo;
  if (isDarkMode) {
    logoSrc = iconOnly ? logoDark : wordLogoDark;
  } else {
    logoSrc = iconOnly ? logo : wordLogo;
  }

  return (
    <img
      style={style}
      src={logoSrc}
      alt={"Element Finance"}
      className={className}
    />
  );
}
