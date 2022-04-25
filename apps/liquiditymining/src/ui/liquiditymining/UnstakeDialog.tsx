import { ReactElement, useState } from "react";
import SimpleDialog from "src/ui/base/Dialog/Dialog";
import H2 from "src/ui/base/H2/H2";
import { t } from "ttag";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import TokenInput from "src/ui/base/Input/TokenInput";
import { useUnstake } from "./hooks/useUnstake";
import { Signer } from "ethers";
import { ConnectWalletButton } from "src/ui/wallet/ConnectWalletButton";
import { parseEther } from "ethers/lib/utils";
import { ConvergentCurvePool } from "@elementfi/core-typechain/dist/v1.1";
import { useTransactionOptionsWithToast } from "src/ui/transactions/useTransactionOptionsWithToast";
import { useUserInfo } from "./hooks/useUserInfo";

interface UnstakeDialogProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  poolId: number;
  poolContract: ConvergentCurvePool;
  isOpen: boolean;
  onClose?: () => void;
}

export function UnstakeDialog({
  account,
  signer,
  poolId,
  poolContract,
  isOpen,
  onClose = () => {},
}: UnstakeDialogProps): ReactElement {
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [transactionIsPending, setTransactionIsPending] = useState(false);
  const { data: userInfo } = useUserInfo(account, poolContract.address);
  const depositedBalance = userInfo?.amount || "0";

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

  const { mutate: unstake } = useUnstake(signer, transactionOptions);
  const handleStake = () => {
    if (account) {
      unstake([poolId, parseEther(unstakeAmount), account]);
    }
  };

  return (
    <SimpleDialog className="!max-w-sm" isOpen={isOpen} onClose={onClose}>
      <H2 className="mb-8 text-center text-3xl tracking-wide text-brandDarkBlue-dark">{t`Unstake`}</H2>
      <TokenInput
        id="stake-input"
        className="mb-1"
        name="Stake Amount"
        screenReaderLabel="Amount to stake"
        value={unstakeAmount}
        onChange={setUnstakeAmount}
        maxValue={depositedBalance}
        showMaxButton
      />
      <p className="mb-6 text-blueGrey">{t`Staked balance: ${parseFloat(
        depositedBalance || "0",
      ).toFixed(2)} ELFI`}</p>
      {!account ? (
        <ConnectWalletButton
          className="w-full justify-center"
          variant={ButtonVariant.GRADIENT}
        />
      ) : (
        <Button
          className="w-full justify-center"
          variant={ButtonVariant.GRADIENT}
          onClick={handleStake}
          loading={transactionIsPending}
        >
          {t`Unstake`}
        </Button>
      )}
    </SimpleDialog>
  );
}
