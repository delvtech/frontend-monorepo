import { InformationCircleIcon } from "@heroicons/react/outline";
import React, { ReactElement, ReactNode } from "react";

import Card from "src/ui/base/Card/Card";
import Tooltip from "src/ui/base/Tooltip/Tooltip";

interface SummaryCardProps {
  title: string | ReactElement;
  tooltipContent?: string | ReactElement;
  balance?: ReactNode;
  children?: ReactNode;
}
export function SummaryCard(props: SummaryCardProps): ReactElement {
  const { title, balance, children, tooltipContent } = props;

  return (
    <Card className="flex flex-col lg:flex-1">
      <div className="text-principalRoyalBlue flex items-center justify-center">
        {title}
        {tooltipContent ? (
          <Tooltip content={tooltipContent}>
            <InformationCircleIcon className="ml-1 h-4 cursor-help" />
          </Tooltip>
        ) : null}
      </div>
      <div className="text-principalRoyalBlue flex flex-1 items-center justify-center py-4 text-center text-5xl font-extralight">
        {balance}
      </div>
      {children}
    </Card>
  );
}

export default SummaryCard;
