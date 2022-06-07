import React, { ReactElement } from "react";
import Card, { CardVariant } from "src/ui/base/Card/Card";
import { t } from "ttag";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import { MerkleRewardType, useMerkleInfo } from "src/ui/merkle/useMerkleInfo";
import { commify } from "ethers/lib/utils";
import { useUnclaimedAirdrop } from "src/ui/airdrop/useUnclaimedAirdrop";

interface AirdropAmountCardProps {
  account: string | null | undefined;
}
export function AirdropAmountCard({
  account,
}: AirdropAmountCardProps): ReactElement {
  const { data: merkleInfo } = useMerkleInfo(account, MerkleRewardType.RETRO);

  const claimableBalance = useUnclaimedAirdrop(account, merkleInfo);
  const airdropAmountLabel = getAirdropAmountLabel(claimableBalance);

  return (
    <Card
      variant={CardVariant.HACKER_SKY}
      className="h-64 text-center shadow-[0_0_52px_rgba(143,216,231,.7)]"
    >
      <div className="flex h-full w-full flex-col items-center justify-center p-6">
        <div className="text-principalRoyalBlue mb-3 text-lg font-bold text-opacity-60">{t`Claimable voting power`}</div>
        <div className="text-principalRoyalBlue flex justify-center gap-2 text-center text-5xl font-bold">
          <ElementIconCircle
            className="bg-paleLily mr-2"
            size={IconSize.LARGE}
          />
          <span>{airdropAmountLabel}</span>
        </div>
      </div>
    </Card>
  );
}

function getAirdropAmountLabel(claimableBalance: string): string {
  if (claimableBalance) {
    return t`${commify(claimableBalance)} ELFI`;
  }

  return t`0 ELFI`;
}
