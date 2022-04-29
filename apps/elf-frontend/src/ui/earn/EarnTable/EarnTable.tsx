import { CSSProperties, ReactElement, useCallback, useState } from "react";

import { Classes } from "@blueprintjs/core";
import { Web3Provider } from "@ethersproject/providers";
import classNames from "classnames";
import { Signer } from "ethers";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { EarnCard } from "ui/earn/EarnCard/EarnCard";
import styles from "ui/earn/grid.module.css";
import { useOpenPrincipalTokenInfos } from "ui/tranche/useOpenPrincipalTokenInfos";

interface EarnTableProps {
  signer: Signer | undefined;
  library: Web3Provider | undefined;
  account: string | null | undefined;
}

const earnTableStyle: CSSProperties = {
  width: 1256,
};
export function EarnTable({
  account,
  library,
  signer,
}: EarnTableProps): ReactElement {
  const [expandedCardId, setExpandedCardId] = useState<string | undefined>();
  const openPrincipalTokenInfos = useOpenPrincipalTokenInfos();
  const onExpandClose = useCallback(() => setExpandedCardId(undefined), []);

  return (
    <div
      className={tw("flex", "flex-col", "items-center", "space-y-5")}
      style={earnTableStyle}
    >
      <div
        className={classNames(styles.earnGrid, tw("px-5"), Classes.TEXT_MUTED)}
      >
        <div>{t`Vault`}</div>
        <div>{t`Element TVL`}</div>
        <div className={tw("font-bold")}>{t`Vault APY`}</div>
        <div className={tw("font-bold")}>{t`LP APY`}</div>
        <div>{t`Liquidity`}</div>
        <div>{t`Price`}</div>
        <div>{t`Fixed APR`}</div>
        <div>{t`Term`}</div>
      </div>
      {[...openPrincipalTokenInfos]
        .sort((info) => info.extensions.createdAtTimestamp)
        .reverse()
        .map((principalTokenInfo) => {
          const cardId = principalTokenInfo.address;
          return (
            <EarnCard
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

export default EarnTable;
