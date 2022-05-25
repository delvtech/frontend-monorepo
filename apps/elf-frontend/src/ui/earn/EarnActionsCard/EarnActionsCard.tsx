import { ReactElement } from "react";

import { Button, Callout, H4, Intent } from "@blueprintjs/core";
import { Web3Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { PrincipalTokenInfo as TrancheInfo } from "@elementfi/core-tokenlist";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { EarnActionsTabId } from "ui/earn/EarnActionsTabs/EarnActionsTabId";
import { EarnActionsTabs } from "ui/earn/EarnActionsTabs/EarnActionsTabs";
import { EarnStakingForms } from "ui/earn/EarnStakingForm/EarnStakingForms";
import { MintForm } from "ui/mint/MintCard/MintForm";
import { useRouter } from "next/router";

interface EarnActionsCardProps {
  signer: Signer | undefined;
  library: Web3Provider | undefined;
  account: string | null | undefined;
  trancheInfo: TrancheInfo;
  activeTabId: EarnActionsTabId;
  setActiveTabId: (tabId: EarnActionsTabId) => void;
}

export function EarnActionsCard(props: EarnActionsCardProps): ReactElement {
  const { signer, library, account, activeTabId, setActiveTabId, trancheInfo } =
    props;
  const { push: navigate } = useRouter();

  return (
    <div className={tw("flex", "space-x-6", "p-4")}>
      <EarnActionsTabs
        unlockTimestamp={trancheInfo.extensions.unlockTimestamp}
        activeTabId={activeTabId}
        onSetActiveTab={setActiveTabId}
      />

      <div className={tw("flex", "flex-1", "justify-center")}>
        {(() => {
          switch (activeTabId) {
            case EarnActionsTabId.MINT:
              return (
                <div className={tw("flex", "w-full", "space-x-6")}>
                  <MintForm
                    library={library}
                    account={account}
                    trancheInfo={trancheInfo}
                  />
                  <div
                    className={tw("flex", "flex-col", "space-y-6", "flex-1")}
                  >
                    <Callout
                      icon={null}
                      intent={Intent.PRIMARY}
                      className={tw("p-4")}
                    >
                      <H4>{t`Want to earn additional yield?`}</H4>
                      <div className={tw("space-y-4")}>
                        <div>
                          {t`Earn additional trading fees when you provide liquidity
                        in Element Pools.`}
                        </div>
                        <Button
                          intent={Intent.PRIMARY}
                          outlined
                          onClick={() =>
                            setActiveTabId(EarnActionsTabId.PROVIDE_LIQUIDITY)
                          }
                        >
                          {t`LP for additional yield`}
                        </Button>
                      </div>
                    </Callout>
                    <Callout
                      title={t`Sell your position at any time`}
                      icon={null}
                      className={tw("p-4")}
                    >
                      <div className={tw("space-y-4")}>
                        <div>
                          {t`Principal and Yield tokens can be sold at any time from
                        your Portfolio.`}
                        </div>
                        <Button outlined onClick={() => navigate("/portfolio")}>
                          {t`Go to Portfolio`}
                        </Button>
                      </div>
                    </Callout>
                  </div>
                </div>
              );
            case EarnActionsTabId.PROVIDE_LIQUIDITY:
              return (
                <div className={tw("flex", "flex-col")}>
                  <EarnStakingForms
                    key={activeTabId}
                    library={library}
                    signer={signer}
                    account={account}
                    trancheInfo={trancheInfo}
                    className={tw("space-x-6")}
                  />
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}
