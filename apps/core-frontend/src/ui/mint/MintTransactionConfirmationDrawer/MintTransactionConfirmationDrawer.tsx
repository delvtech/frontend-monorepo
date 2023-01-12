import { Callout, Switch } from "@blueprintjs/core";
import { ERC20Permit } from "@elementfi/core-typechain/dist/libraries";
import {
  PrincipalTokenInfo as TrancheInfo,
  YieldTokenInfo,
} from "@elementfi/core-tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import tw from "efi-tailwindcss-classnames";
import { useMintPreview } from "ui/mint/hooks/useMintPreview";
import {
  useMintApprovals,
  useMintTransaction,
} from "ui/mint/hooks/useMintTransaction";
import { MintTransactionDetails } from "ui/mint/MintTransactionDetails/MintTransactionDetails";
import { SwapDetailsForm } from "ui/swaps/SwapDetailsPreview/SwapDetailsForm";
import { TokenIcon } from "ui/token/TokenIcon";
import { TransactionDrawer } from "ui/transactions/TransactionDrawer/TransactionDrawer";
import ContractAddresses from "addresses/addresses";
import { convertEpochSecondsToDate } from "base/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { CryptoAsset, CryptoAssetType } from "elf/crypto/CryptoAsset";
import { getCryptoDecimals } from "elf/crypto/getCryptoDecimals";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { interestTokenContractsByAddress } from "elf/interestToken/interestToken";
import { getTokenInfo } from "tokenlists/tokenlists";
import { trancheContractsByAddress } from "elf/tranche/tranches";
import {
  isUnderlyingAddressERC20Permit,
  underlyingContractsByAddress,
} from "elf/underlying/underlying";
import { WalletApprovalInfo } from "elf/wallets/WalletApprovalInfo";
import { Signer } from "ethers";
import {
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { t } from "ttag";

interface MintTransactionConfirmationDrawerProps {
  account: string | null | undefined;
  library: Web3Provider | undefined;

  amountIn: string;
  baseAsset: CryptoAsset;
  baseAssetIcon: TokenIcon;
  principalTokenSymbol: string;
  yieldTokenSymbol: string;

  trancheInfo: TrancheInfo;
  isOpen: boolean;

  onClose: () => void;
}

export function MintTransactionConfirmationDrawer({
  library,
  account,
  baseAsset,
  principalTokenSymbol,
  yieldTokenSymbol,
  trancheInfo,
  amountIn,
  isOpen,
  onClose,
}: MintTransactionConfirmationDrawerProps): ReactElement {
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;
  const [loadingPermits, setLoadingPermits] = useState(false);

  const [includePermits, setIncludePermits] = useState(true);

  const baseAssetSymbol = getCryptoSymbol(baseAsset);
  const {
    interestToken: interestTokenAddress,
    unlockTimestamp: trancheUnlockTimestamp,
  } = trancheInfo.extensions;
  const yieldTokenInfo = getTokenInfo<YieldTokenInfo>(interestTokenAddress);

  const unlockTimeStampDate = convertEpochSecondsToDate(trancheUnlockTimestamp);

  const numPrincipalTokens = useMintPreview(trancheInfo, amountIn);

  const onError = useCallback(() => {
    setLoadingPermits(false);
  }, []);

  const {
    mint,
    mutationResult: { isLoading, isError, error, isSuccess, reset },
  } = useMintTransaction(
    signer,
    account,
    baseAsset,
    trancheInfo,
    yieldTokenInfo,
    amountIn,
    includePermits,
    onClose,
    onError,
  );

  const onCloseDrawer = useCallback(() => {
    setLoadingPermits(false);
    reset();
    onClose();
  }, [onClose, reset]);

  const onConfirmMint = useCallback(async () => {
    setLoadingPermits(true);
    try {
      mint();
    } catch (error) {
      setLoadingPermits(false);
    }
  }, [mint]);
  useEffect(() => {
    if (isLoading || isError) {
      setLoadingPermits(false);
    }
  }, [isError, isLoading]);

  const { showPermitCallout, showWalletApprovalCallout } = useShowCallouts(
    trancheInfo,
    yieldTokenInfo,
    baseAsset,
    account,
  );

  const useApprovals = showPermitCallout && !includePermits;
  const walletApprovalInfos = useWalletApprovalInfos(
    baseAsset,
    account,
    amountIn,
    useApprovals || showWalletApprovalCallout,
  );

  return (
    <TransactionDrawer
      confirmButtonLabel={t`Mint`}
      transactionPending={isLoading || loadingPermits}
      transactionError={error as Error | undefined}
      transactionFailed={isError}
      transactionSuccess={isSuccess}
      walletApprovalInfos={walletApprovalInfos}
      isOpen={isOpen}
      onClose={onCloseDrawer}
      account={account}
      library={library}
      onConfirmTransaction={onConfirmMint}
      transactionDetails={
        <div className={tw("flex", "flex-col", "space-y-8")}>
          <SwapDetailsForm
            amountIn={(+amountIn).toFixed(4)}
            heading={t`Mint Preview`}
            amountInLabel={t`Deposit`}
            assetInSymbol={baseAssetSymbol}
            assetOutSymbol={`${baseAssetSymbol} Principal Token`}
          >
            <Fragment>
              <MintTransactionDetails
                principalTokenSymbol={principalTokenSymbol}
                yieldTokenSymbol={yieldTokenSymbol}
                unlockTimestamp={unlockTimeStampDate}
                numPrincipalTokens={numPrincipalTokens}
                numYieldTokens={+amountIn}
              />
              {showPermitCallout && (
                <Callout>
                  <div>
                    <Switch
                      label={t`Include token approvals for providing liquidity. (Turn this off if you are using a Ledger wallet.)`}
                      checked={includePermits}
                      onChange={() => setIncludePermits(!includePermits)}
                    />
                    {includePermits &&
                      t`You need to approve Balancer to use one or more of the
                        tokens you are about to mint. If you plan to LP your
                        tokens in the future, you can save on gas by
                        pre-approving these tokens now.`}
                  </div>
                </Callout>
              )}
            </Fragment>
          </SwapDetailsForm>
        </div>
      }
    />
  );
}
function useShowCallouts(
  trancheInfo: TrancheInfo,
  yieldTokenInfo: YieldTokenInfo,
  baseAsset: CryptoAsset,
  account: string | null | undefined,
) {
  const { balancerVaultAddress, userProxyContractAddress } = ContractAddresses;
  const baseAssetContract = underlyingContractsByAddress[
    trancheInfo.extensions.underlying
  ] as unknown as ERC20Permit;
  const yieldTokenContract =
    interestTokenContractsByAddress[yieldTokenInfo.address];
  const principalTokenContract = trancheContractsByAddress[trancheInfo.address];
  const baseAssetDecimals = getCryptoDecimals(baseAsset);
  const { decimals: principalTokenDecimals } = trancheInfo;
  const { decimals: yieldTokenDecimals } = yieldTokenInfo;

  const approvals = useMintApprovals(
    account,
    userProxyContractAddress,
    balancerVaultAddress,
    baseAssetContract,
    principalTokenContract,
    yieldTokenContract,
    baseAssetDecimals,
    principalTokenDecimals,
    yieldTokenDecimals,
  );

  const {
    userProxyApprovedForBaseAsset,
    balancerApprovedForBaseAsset,
    balancerApprovedForPrincipalToken,
    balancerApprovedForYieldToken,
  } = approvals;

  const baseAssetIsERC20Permit = isUnderlyingAddressERC20Permit(
    baseAssetContract?.address,
  );

  let showPermitCallout = false;
  if (
    (baseAssetIsERC20Permit && !balancerApprovedForBaseAsset) ||
    !balancerApprovedForPrincipalToken ||
    !balancerApprovedForYieldToken
  ) {
    showPermitCallout = true;
  }

  let showWalletApprovalCallout = false;
  if (
    !userProxyApprovedForBaseAsset &&
    !baseAssetIsERC20Permit &&
    baseAsset.type !== CryptoAssetType.ETHEREUM
  ) {
    showWalletApprovalCallout = true;
  }

  return { showPermitCallout, showWalletApprovalCallout };
}

function useWalletApprovalInfos(
  tokenInAsset: CryptoAsset,
  account: string | null | undefined,
  amountIn: string,
  useApprovals: boolean,
): WalletApprovalInfo[] {
  const { userProxyContractAddress } = ContractAddresses;
  const assetSymbol = getCryptoSymbol(tokenInAsset);
  return useMemo(() => {
    if (
      !useApprovals ||
      !tokenInAsset ||
      tokenInAsset.type === CryptoAssetType.ETHEREUM
    ) {
      return [];
    }
    return [
      {
        cryptoAsset: tokenInAsset,
        ownerAddress: account,
        spenderAddress: userProxyContractAddress,
        amount: amountIn,
        messageRenderer: () => t`
          You need to grant Element approval to spend your ${assetSymbol} in order to perform this transaction.
        `,
      },
    ];
  }, [
    account,
    amountIn,
    assetSymbol,
    tokenInAsset,
    useApprovals,
    userProxyContractAddress,
  ]);
}
