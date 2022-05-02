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
  const pendingRewards = userInfo?.rewardDebt || "0";
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
  const handleStake = () => {
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
      className="!max-w-sm !p-10"
      showCloseIcon
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="mb-8 flex items-center gap-3">
        <AssetIcon symbol={baseAssetSymbol} className="h-14" />
        <div>
          <H2 className="!text-2xl font-medium tracking-wide text-brandDarkBlue-dark">{t`${baseAssetSymbol} LP Token`}</H2>
          <Tag
            intent={Intent.PRIMARY}
            className="!rounded-full py-1 font-light"
          >
            {formatAbbreviatedDate(unlockDate)}
          </Tag>
        </div>
      </div>
      <p className="mb-1 flex flex-wrap justify-between gap-x-1 px-1 align-baseline text-lg">
        <span className="whitespace-nowrap text-principalRoyalBlue">{t`Staked balance`}</span>
        <span>{commify((+depositedBalance).toFixed(4))}</span>
      </p>
      <p className="mb-8 flex flex-wrap justify-between gap-x-1 px-1 align-baseline text-lg">
        <span className="whitespace-nowrap text-principalRoyalBlue">{t`Unclaimed ELFI`}</span>
        <Elfi amount={pendingRewards} />
      </p>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor="unstake-input"
        className="mb-1 block px-1 text-lg text-principalRoyalBlue"
      >{t`Amount`}</label>
      <TokenInput
        id="unstake-input"
        className="mb-8"
        inputClassName="h-12 !text-base"
        buttonClassName="!bg-hackerSky hover:!bg-hackerSky-dark !text-principalRoyalBlue !px-4 !py-2 -mr-1"
        name="Unstake Amount"
        screenReaderLabel="Amount to unstake"
        value={unstakeAmount}
        onChange={setUnstakeAmount}
        maxValue={depositedBalance}
        placeholder="0.00"
        showMaxButton
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
          onClick={handleStake}
          loading={transactionIsPending}
          disabled={amountIsInvalid}
        >
          {t`Unstake and Claim`}
        </Button>
      )}
    </SimpleDialog>
  );
}
