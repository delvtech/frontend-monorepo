import React, { ReactElement } from "react";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { t } from "ttag";
import toast from "react-hot-toast";

export function OverviewPage(): ReactElement {
  const { data: account } = useAccount();

  return (
    <div className="daisy-hero min-h-screen bg-base-200">
      <div className="daisy-hero-content flex-col gap-8 text-center">
        {account?.address ? <FakeTxButton /> : t`Connect wallet to continue`}
      </div>
    </div>
  );
}

export default OverviewPage;

function FakeTxButton() {
  const addRecentTransaction = useAddRecentTransaction();
  return (
    <button
      className="daisy-btn daisy-btn-outline daisy-btn-info"
      onClick={() => {
        addRecentTransaction({
          hash: "0xeef10fc5170f669b86c4cd0444882a96087221325f8bf2f55d6188633aa7be7c",
          description: "Bought 1,420 fixed rate usdc",
        });
        toast.custom(
          <div className="daisy-alert max-w-md justify-center shadow-lg">
            <span>
              <span className="text-4xl">🧝‍♂️ 🪄</span> {t`Transaction submitted`}
            </span>
          </div>,
        );
      }}
    >
      Send fake transaction
    </button>
  );
}
