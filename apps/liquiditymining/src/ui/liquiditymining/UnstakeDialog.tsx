import { ReactElement, useState } from "react";
import SimpleDialog from "src/ui/base/Dialog/Dialog";
import H2 from "src/ui/base/H2/H2";
import { t } from "ttag";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import TokenInput from "src/ui/base/Input/TokenInput";
import { Signer } from "ethers";
import { ConnectWalletButton } from "src/ui/wallet/ConnectWalletButton";
import { commify, parseEther } from "ethers/lib/utils";
import { ConvergentCurvePool } from "@elementfi/core-typechain/dist/v1.1";
import { useTransactionOptionsWithToast } from "src/ui/transactions/useTransactionOptionsWithToast";
import { useUserInfo } from "./hooks/useUserInfo";
import { useUnstakeAndClaim } from "./hooks/useUnstakeAndClaim";
import AssetIcon from "src/ui/base/svg/AssetIcon/AssetIcon";
import { getTokenInfo } from "@elementfi/core/tokenlists/tokenlists";
import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/tokenlist";
import { convertEpochSecondsToDate } from "@elementfi/base/time/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { formatAbbreviatedDate } from "src/base/dates";
import { Tag } from "src/ui/base/Tag/Tag";
import { Intent } from "src/ui/base/Intent";
import { Elfi } from "./Elfi";
import { usePendingSushi } from "./hooks/usePendingSushi";

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
  const { data: userInfo } = useUserInfo(account, poolContract.address);
  const depositedBalance = userInfo?.amount || "0";
  const { data: pendingRewards = "0" } = usePendingSushi(
    poolContract.address,
    account,
  );
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
      },
    },
  });

  const { mutate: unstakeAndClaim } = useUnstakeAndClaim(
    signer,
    transactionOptions,
  );
  const handleUnstakeAndClaim = () => {
    if (account) {
      unstakeAndClaim([poolId, parseEther(unstakeAmount), account]);
    }
  };

  const amountIsInvalid =
    isNaN(+unstakeAmount) ||
    +unstakeAmount <= 0 ||
    +unstakeAmount > +depositedBalance;

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
      <div className="mb-4 space-y-1 px-1 text-gray-500">
        <p className="flex flex-wrap justify-between gap-x-1 align-baseline">
          <span className="whitespace-nowrap">{t`Your staked balance`}</span>
          <span>{`${commify((+depositedBalance).toFixed(4))} LP`}</span>
        </p>
        <p className="flex flex-wrap justify-between gap-x-1 align-baseline">
          <span className="whitespace-nowrap">{t`Unclaimed ELFI`}</span>
          <Elfi amount={pendingRewards} />
        </p>
      </div>
      {/* The id will be on the input from TokenInput, but eslint doesn't
      know that yet. */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor="unstake-input"
        className="block px-1 text-lg text-principalRoyalBlue"
      >{t`Amount`}</label>
      <TokenInput
        id="unstake-input"
        className="mb-6"
        name="Unstake Amount"
        screenReaderLabel="Amount to unstake"
        value={unstakeAmount}
        onChange={setUnstakeAmount}
        maxValue={depositedBalance}
      />
      {!account ? (
        <ConnectWalletButton
          className="w-full justify-center"
          variant={ButtonVariant.GRADIENT}
        />
      ) : (
        <Button
          className="w-full justify-center"
          variant={ButtonVariant.GRADIENT}
          onClick={handleUnstakeAndClaim}
          loading={transactionIsPending}
          disabled={amountIsInvalid}
        >
          {t`Unstake and Claim`}
        </Button>
      )}
      <p className="mt-5 -mb-2 text-sm text-slate-400">{t`Your ELFI will automatically be delegated to your selected delegate. If you haven't chosen a delegate, it will be self-delegated.`}</p>
    </SimpleDialog>
  );
}
