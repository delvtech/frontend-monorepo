import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import { useClaimedAirdrop } from "src/ui/airdrop/useClaimedAirdrop";

interface ClaimedAmountCardProps {
  account: string | null | undefined;
}
export function ClaimedAmountCard({
  account,
}: ClaimedAmountCardProps): ReactElement {
  const claimedAmount = useClaimedAirdrop(account);
  return (
    <Card variant={CardVariant.HACKER_SKY} className="h-64 flex-1">
      <div className="flex h-full w-full flex-col">
        <div className="mb-2 text-lg font-bold text-gray-500">{t`You claimed and deposited`}</div>
        <div className="flex-1">
          <div className="text-principalRoyalBlue text-2xl font-bold">
            {claimedAmount}
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <span className="mb-4">{t`$ELFI tokens`}</span>
            <ElementIconCircle className="ml-2" size={IconSize.LARGE} />
          </div>
        </div>
      </div>
    </Card>
  );
}
