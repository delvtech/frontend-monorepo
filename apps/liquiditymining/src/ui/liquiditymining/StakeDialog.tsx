import { ReactElement, useState } from "react";
import SimpleDialog from "src/ui/base/Dialog/Dialog";
import H2 from "src/ui/base/H2/H2";
import { t } from "ttag";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import TokenInput from "src/ui/base/Input/TokenInput";
import { useStake } from "./hooks/useStake";
import { Signer } from "ethers";
import { ConnectWalletButton } from "src/ui/wallet/ConnectWalletButton";
import { parseEther } from "ethers/lib/utils";
import { ConvergentCurvePool } from "@elementfi/core-typechain/dist/v1.1";
import { useLPTokenBalance } from "./hooks/useLPTokenBalance";
import { useIsPoolApproved } from "./hooks/useIsPoolApproved";
import { useApprovePool } from "./hooks/useApprovePool";
import { useTransactionOptionsWithToast } from "src/ui/transactions/useTransactionOptionsWithToast";

interface StakeDialogProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  poolId: number;
  poolContract: ConvergentCurvePool;
  isOpen: boolean;
  onClose?: () => void;
}

export function StakeDialog({
  account,
  signer,
  poolId,
  poolContract,
  isOpen,
  onClose = () => {},
}: StakeDialogProps): ReactElement {
  const [stakeAmount, setStakeAmount] = useState("");
  const { data: availableAmount } = useLPTokenBalance(poolContract, account);

  const [transactionIsPending, setTransactionIsPending] = useState(false);
  const transactionOptions = useTransactionOptionsWithToast({
    options: {
      onTransactionSubmitted: () => {
        setTransactionIsPending(true);
      },
      onTransactionMined: () => {
        setTransactionIsPending(false);
      },
    },
  });

  const { data: isApproved } = useIsPoolApproved(poolContract, account);
  const { mutate: approve } = useApprovePool(
    poolContract,
    account,
    signer,
    transactionOptions,
  );

  const { mutate: stake } = useStake(signer, transactionOptions);
  const handleStake = () => {
    if (account) {
      stake([poolId, parseEther(stakeAmount), account]);
    }
  };

  return (
    <SimpleDialog className="!max-w-sm" isOpen={isOpen} onClose={onClose}>
      <H2 className="mb-8 text-center text-3xl tracking-wide text-brandDarkBlue-dark">{t`Stake`}</H2>
      <TokenInput
        id="stake-input"
        className="mb-1"
        name="Stake Amount"
        screenReaderLabel="Amount to stake"
        value={stakeAmount}
        onChange={setStakeAmount}
        maxValue={availableAmount}
        showMaxButton
        disabled={!isApproved}
      />
      <p className="mb-6 text-blueGrey">{t`Available to stake: ${parseFloat(
        availableAmount || "0",
      ).toFixed(4)} LP Tokens`}</p>
      {!account ? (
        <ConnectWalletButton
          className="w-full justify-center"
          variant={ButtonVariant.GRADIENT}
        />
      ) : !isApproved ? (
        <Button
          className="w-full justify-center"
          variant={ButtonVariant.GRADIENT}
          onClick={approve}
          loading={transactionIsPending}
        >
          {t`Approve`}
        </Button>
      ) : (
        <Button
          className="w-full justify-center"
          variant={ButtonVariant.GRADIENT}
          onClick={handleStake}
          loading={transactionIsPending}
        >
          {t`Stake`}
        </Button>
      )}
    </SimpleDialog>
  );
}
