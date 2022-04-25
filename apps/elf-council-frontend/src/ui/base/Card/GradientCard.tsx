// See: https://tailwindui.com/components/application-ui/layout/panels#component-415761fd4b5592742ec78ce4c638973e

import classNames from "classnames";
import { CSSProperties, ReactElement, ReactNode } from "react";

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function GradientCard(props: GradientCardProps): ReactElement {
  const { className, children, style } = props;
  return (
    <div
      className={classNames(
        "from-principalRoyalBlue via-principalRoyalBlue to-principalBlue overflow-hidden rounded-xl bg-gradient-to-br shadow",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
