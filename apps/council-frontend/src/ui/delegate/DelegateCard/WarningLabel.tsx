import { ReactElement, ReactNode } from "react";
import classNames from "classnames";

interface WarningLabelProps {
  className?: string;
  children?: ReactNode;
}

function WarningLabel({
  className,
  children,
}: WarningLabelProps): ReactElement {
  return (
    <div
      className={classNames(
        className,
        "bg-alertOrange flex items-center rounded-md text-sm font-bold leading-5 text-white",
      )}
    >
      {children}
    </div>
  );
}

export default WarningLabel;
