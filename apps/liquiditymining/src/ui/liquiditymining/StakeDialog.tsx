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
import { commify, parseEther } from "ethers/lib/utils";
import { ConvergentCurvePool } from "@elementfi/core-typechain/dist/v1.1";
import { useLPTokenBalance } from "./hooks/useLPTokenBalance";
import { useIsPoolApproved } from "./hooks/useIsPoolApproved";
import { useApprovePool } from "./hooks/useApprovePool";
import { useTransactionOptionsWithToast } from "src/ui/transactions/useTransactionOptionsWithToast";
import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/tokenlist";
import { getTokenInfo } from "@elementfi/core/tokenlists/tokenlists";
import { convertEpochSecondsToDate } from "@elementfi/base/time/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { formatAbbreviatedDate } from "src/base/dates";
import AssetIcon from "src/ui/base/svg/AssetIcon/AssetIcon";
import { Intent } from "src/ui/base/Intent";
import { Tag } from "src/ui/base/Tag/Tag";

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
  const { data: lpTokenBalanceData } = useLPTokenBalance(poolContract, account);
  const availableAmount = lpTokenBalanceData || "0";
  const {
    extensions: { underlying, bond },
  } = getTokenInfo<PrincipalPoolTokenInfo>(poolContract.address);
  const { symbol: baseAssetSymbol } = getTokenInfo(underlying);
  const {
    extensions: { unlockTimestamp },
  } = getTokenInfo<PrincipalTokenInfo>(bond);
  const unlockDate = convertEpochSecondsToDate(unlockTimestamp);

  const [transactionIsPending, setTransactionIsPending] = useState(false);
  const transactionOptions = useTransactionOptionsWithToast({
    options: {
      onTransactionSubmitted: () => {
        setTransactionIsPending(true);
      },
      onTransactionMined: () => {
        setTransactionIsPending(false);
        onClose();
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

  const amountIsInvalid =
    isNaN(+stakeAmount) || +stakeAmount <= 0 || +stakeAmount > +availableAmount;

  return (
    <SimpleDialog
      className="!max-w-sm !p-8"
      showCloseIcon
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="mb-8 flex items-center gap-3">
        <AssetIcon symbol={baseAssetSymbol} className="h-12" />
        <div>
          <H2 className="tracking-wide text-brandDarkBlue-dark">{t`${baseAssetSymbol} LP Token`}</H2>
          <Tag
            intent={Intent.PRIMARY}
            className="!rounded-full !py-1 font-light"
          >
            {formatAbbreviatedDate(unlockDate)}
          </Tag>
        </div>
      </div>
      <p className="mb-4 flex flex-wrap justify-between gap-x-1 px-1 align-baseline text-gray-500">
        <span className="whitespace-nowrap">{t`Available to stake`}</span>
        <span>{commify((+availableAmount).toFixed(4))}</span>
      </p>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor="stake-input"
        className="mb-1 block px-1 text-lg text-principalRoyalBlue"
      >{t`Amount`}</label>
      <TokenInput
        id="stake-input"
        className="mb-6"
        name="Stake Amount"
        screenReaderLabel="Amount to stake"
        value={stakeAmount}
        onChange={setStakeAmount}
        maxValue={availableAmount}
        disabled={!isApproved}
      />
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
          disabled={amountIsInvalid}
        >
          {t`Stake`}
        </Button>
      )}
    </SimpleDialog>
  );
}
