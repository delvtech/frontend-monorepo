import { ReactElement, useCallback, useState } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { Signer } from "ethers";

import tw from "efi-tailwindcss-classnames";
import { EarnCardListItem } from "ui/earn/EarnCardListItem/EarnCardListItem";
import { useOpenPrincipalTokenInfos } from "ui/tranche/useOpenPrincipalTokenInfos";

interface EarnCartListProps {
  signer: Signer | undefined;
  library: Web3Provider | undefined;
  account: string | null | undefined;
}

export function EarnCardList({
  account,
  library,
  signer,
}: EarnCartListProps): ReactElement {
  const [expandedCardId, setExpandedCardId] = useState<string | undefined>();
  const openPrincipalTokenInfos = useOpenPrincipalTokenInfos();
  const onExpandClose = useCallback(() => setExpandedCardId(undefined), []);

  return (
    <div
      className={tw(
        "flex",
        "flex-col",
        "items-center",
        "space-y-5",
        "w-full",
        "px-4",
      )}
    >
      {[...openPrincipalTokenInfos]
        .sort((info) => info.extensions.createdAtTimestamp)
        .reverse()
        .map((principalTokenInfo) => {
          const cardId = principalTokenInfo.address;
          return (
            <EarnCardListItem
              key={principalTokenInfo.address}
              id={cardId}
              library={library}
              account={account}
              signer={signer}
              isExpanded={cardId === expandedCardId}
              principalTokenInfo={principalTokenInfo}
              onExpandClose={onExpandClose}
              onExpandOpen={setExpandedCardId}
            />
          );
        })}
    </div>
  );
}

export default EarnCardList;
