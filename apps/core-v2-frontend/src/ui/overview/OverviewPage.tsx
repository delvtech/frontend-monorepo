import React, { ReactElement } from "react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { t } from "ttag";
import { toastTransactionSubmitted } from "src/ui/overview/toasts";
import { Button } from "@elementfi/component-library";

export function OverviewPage(): ReactElement {
  const { address: userAddress } = useAccount();

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="flex-col gap-8 text-center">
        {userAddress ? <FakeTxButton /> : t`Connect wallet to continue`}
      </div>
    </div>
  );
}

export default OverviewPage;

function FakeTxButton(): ReactElement {
  const addRecentTransaction = useAddRecentTransaction();
  return (
    <Button
      onClick={() => {
        addRecentTransaction({
          hash: "0xeef10fc5170f669b86c4cd0444882a96087221325f8bf2f55d6188633aa7be7c",
          description: "Swap 1 ETH for 1,100 USDC",
        });
        toastTransactionSubmitted();
      }}
    >
      Send fake transaction
    </Button>
  );
}
