import { ReactElement } from "react";
import { commify } from "ethers/lib/utils";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import classNames from "classnames";

interface ElfiProps {
  className?: string;
  amount?: number | string;
}

export const Elfi = ({ className, amount = 0 }: ElfiProps): ReactElement => {
  return (
    <span className={classNames("inline-flex items-center", className)}>
      <ElementIconCircle inline size={IconSize.SMALL} className="mr-1" />
      <span>{commify((+amount).toFixed(2))}</span>
    </span>
  );
};
