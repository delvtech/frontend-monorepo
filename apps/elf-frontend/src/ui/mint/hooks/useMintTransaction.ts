import { ERC20, ERC20Permit } from "@elementfi/core-typechain/dist/libraries";
import {
  InterestToken,
  Tranche,
  UserProxy,
} from "@elementfi/core-typechain/dist/v1";
import {
  PrincipalTokenInfo as TrancheInfo,
  YieldTokenInfo,
} from "@elementfi/core-tokenlist";
import { ContractReceipt } from "@ethersproject/contracts";
import { TransactionError } from "ui/contracts/TransactionError";
import { useTokenApprovedForAmount } from "ui/token/hooks/useTokenApprovedForAmount";
import { useSmartContractTransactionPersisted } from "ui/transactions/useSmartContractTransactionPersisted/useSmartContractTransactionPersisted";
import ContractAddresses from "addresses/addresses";
import { EMPTY_ARRAY } from "base/emptyArray";
import { fetchPermitData, PermitCallData } from "base/fetchPermitData";
import { CryptoAsset } from "elf/crypto/CryptoAsset";
import { getCryptoDecimals } from "elf/crypto/getCryptoDecimals";
import { interestTokenContractsByAddress } from "elf/interestToken/interestToken";
import { makeMintCallArgs } from "elf/mint/makeMintCallArgs";
import { getPermitVersion } from "elf/permit/getPermitVersion";
import { trancheContractsByAddress } from "elf/tranche/tranches";
import {
  isUnderlyingAddressERC20Permit,
  underlyingContractsByAddress,
} from "elf/underlying/underlying";
import { getTokenAddressForUserProxy } from "elf/userProxy/address";
import { userProxyContract } from "elf/userProxy/contract";
import { Signer } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useCallback, useMemo } from "react";
import { UseMutationResult } from "react-query";
import { getPoolForYieldToken } from "elf/pools/weightedPool";

/**
 * Returns the number of Principal Tokens you'd get for minting into a tranche.
 * This is useful because in order to mint into a tranche, some amount of
 * principal must be used to cover the current earnings of the YT. This results
 * in less than 1 to 1 principal tokens for your deposit.
 */
export function useMintTransaction(
  signer: Signer | undefined,
  account: string | undefined | null,
  baseAsset: CryptoAsset,
  trancheInfo: TrancheInfo,
  yieldTokenInfo: YieldTokenInfo,
  amountIn: string,
  includePermits: boolean,
  onTransactionSubmitted: () => void,
  onTransactionError: (error: TransactionError) => void,
): {
  mint: () => void;
  mutationResult: UseMutationResult<
    ContractReceipt | undefined,
    unknown,
    Parameters<UserProxy["mint"]>
  >;
} {
  const { balancerVaultAddress, userProxyContractAddress } = ContractAddresses;
  const userProxy = useMemo(
    () => (signer ? userProxyContract.connect(signer) : userProxyContract),
    [signer],
  );
  const baseAssetDecimals = getCryptoDecimals(baseAsset);
  const amountInBigNumber = parseUnits(amountIn || "0", baseAssetDecimals);
  const baseAssetContract = underlyingContractsByAddress[
    trancheInfo.extensions.underlying
  ] as unknown as ERC20Permit;

  const yieldTokenContract =
    interestTokenContractsByAddress[yieldTokenInfo.address];

  const principalTokenContract = trancheContractsByAddress[trancheInfo.address];
  const { decimals: principalTokenDecimals } = trancheInfo;
  const { decimals: yieldTokenDecimals } = yieldTokenInfo;

  const mutationResult = useSmartContractTransactionPersisted(
    userProxy,
    "mint",
    signer,
    {
      onTransactionSubmitted: () => {
        onTransactionSubmitted();
      },
      onError: (error: TransactionError) => {
        onTransactionError(error);
      },
    },
  );
  const { mutate: mint } = mutationResult;

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

  const onMintTransaction = useCallback(async () => {
    const permitCallData = await getPermitCallData(
      signer,
      account,
      approvals,
      baseAssetContract,
      principalTokenContract,
      yieldTokenContract,
      includePermits,
    );

    const baseAssetAddress = getTokenAddressForUserProxy(baseAsset) as string;
    const { unlockTimestamp, position } = trancheInfo.extensions;

    const mintCallArgs = makeMintCallArgs(
      amountInBigNumber,
      baseAssetAddress,
      unlockTimestamp,
      position,
      permitCallData,
    );

    if (mintCallArgs) {
      mint(mintCallArgs);
    }
  }, [
    account,
    amountInBigNumber,
    approvals,
    baseAsset,
    baseAssetContract,
    includePermits,
    mint,
    principalTokenContract,
    signer,
    trancheInfo.extensions,
    yieldTokenContract,
  ]);

  return { mint: onMintTransaction, mutationResult };
}

interface MintApprovals {
  userProxyApprovedForBaseAsset: boolean;
  balancerApprovedForBaseAsset: boolean;
  balancerApprovedForPrincipalToken: boolean;
  balancerApprovedForYieldToken: boolean;
}
// all the approvals that we need to check before including permit data with the mint call.  to do
// the actual mint we just need to permit the user proxy to take the user's base asset.  for staking
// we need to allow balancer to take the base asset/pt/yt.  for now we are just doing a simple check
// to see if there is any approval amount.
export function useMintApprovals(
  ownerAddress: string | null | undefined,
  userProxyAddress: string,
  balancerVaultAddress: string,
  baseAssetContract: ERC20Permit | ERC20,
  principalTokenContract: Tranche,
  yieldTokenContract: InterestToken,
  baseAssetDecimals: number,
  principalTokenDecimals: number,
  yieldTokenDecimals: number,
): MintApprovals {
  const userProxyApprovedForBaseAsset = useTokenApprovedForAmount(
    ownerAddress,
    userProxyAddress,
    baseAssetContract,
    baseAssetDecimals,
    "1", // just check for any approval amount above zero
  );

  const balancerApprovedForBaseAsset = useTokenApprovedForAmount(
    ownerAddress,
    balancerVaultAddress,
    baseAssetContract,
    baseAssetDecimals,
    "1", // just check for any approval amount above zero
  );

  const balancerApprovedForPrincipalToken = useTokenApprovedForAmount(
    ownerAddress,
    balancerVaultAddress,
    principalTokenContract,
    principalTokenDecimals,
    "1", // just check for any approval amount above zero
  );

  const balancerApprovedForYieldToken = useTokenApprovedForAmount(
    ownerAddress,
    balancerVaultAddress,
    yieldTokenContract,
    yieldTokenDecimals,
    "1", // just check for any approval amount above zero
  );

  return {
    userProxyApprovedForBaseAsset,
    balancerApprovedForBaseAsset,
    balancerApprovedForPrincipalToken,
    balancerApprovedForYieldToken,
  };
}

// list of shitty principal and yield token contracts whose names are messed up.  they change their
// name after the constructor uses them to create their PERMIT_HASH's, which breaks permit calls.
// So, we have to look up these fuckers, and use 'Principal Token ', or 'Element Yield Token '
// instead of the actual token name.  Once these terms close out we can kill this list.
const shittyGoerliAddresses: string[] = [
  "0xDCf80C068B7fFDF7273d8ADAE4B076BF384F711A",
  "0x419b57dE54F7F1E108C72d6E6b405A1E66Fc5895",
  "0xbce711DfCD200b659f3f2715970207E719b8B273",
];
async function getPermitCallData(
  signer: Signer | undefined,
  account: string | null | undefined,
  approvals: MintApprovals,
  baseAssetContract: ERC20Permit,
  principalTokenContract: Tranche,
  yieldTokenContract: InterestToken,
  includePermits: boolean,
): Promise<PermitCallData[]> {
  const {
    userProxyApprovedForBaseAsset,
    balancerApprovedForBaseAsset,
    balancerApprovedForPrincipalToken,
    balancerApprovedForYieldToken,
  } = approvals;

  const { balancerVaultAddress, userProxyContractAddress } = ContractAddresses;
  const { address: baseAssetAddress } = baseAssetContract;
  const baseAssetIsERC20Permit =
    isUnderlyingAddressERC20Permit(baseAssetAddress);

  const spenders: string[] = [];
  const tokenContracts: ERC20Permit[] = [];
  const tokenNames: string[] = [];
  const nonces: number[] = [];

  if (!signer || !account) {
    return EMPTY_ARRAY as PermitCallData[];
  }

  if (
    baseAssetIsERC20Permit &&
    !userProxyApprovedForBaseAsset &&
    isUnderlyingAddressERC20Permit(baseAssetAddress)
  ) {
    const tokenName = await baseAssetContract.name();
    const nonceBN = await baseAssetContract.nonces(account);
    spenders.push(userProxyContractAddress);
    tokenContracts.push(baseAssetContract);
    tokenNames.push(tokenName);
    nonces.push(nonceBN.toNumber());
  }

  if (includePermits) {
    if (
      baseAssetIsERC20Permit &&
      !balancerApprovedForBaseAsset &&
      isUnderlyingAddressERC20Permit(baseAssetAddress)
    ) {
      const tokenName = await baseAssetContract.name();
      const nonceBN = await baseAssetContract.nonces(account);
      spenders.push(balancerVaultAddress);
      tokenContracts.push(baseAssetContract);
      tokenNames.push(tokenName);
      const nonce = !userProxyApprovedForBaseAsset
        ? nonceBN.toNumber() + 1
        : nonceBN.toNumber();
      nonces.push(nonce);
    }

    if (!balancerApprovedForPrincipalToken) {
      let tokenName = await principalTokenContract.name();
      if (shittyGoerliAddresses.includes(principalTokenContract.address)) {
        tokenName = "Principal Token ";
      }
      const nonceBN = await principalTokenContract.nonces(account);
      spenders.push(balancerVaultAddress);
      tokenContracts.push(principalTokenContract as unknown as ERC20Permit);
      tokenNames.push(tokenName);
      nonces.push(nonceBN.toNumber());
    }

    // TODO: This can be remove after the last v1 tranche expires, as you cannot
    // mint into an expired term
    const yieldPool = getPoolForYieldToken(yieldTokenContract.address);
    if (yieldPool && !balancerApprovedForYieldToken) {
      let tokenName = await yieldTokenContract.name();
      if (shittyGoerliAddresses.includes(yieldTokenContract.address)) {
        tokenName = "Element Yield Token ";
      }
      const nonceBN = await yieldTokenContract.nonces(account);
      spenders.push(balancerVaultAddress);
      tokenContracts.push(yieldTokenContract as unknown as ERC20Permit);
      tokenNames.push(tokenName);
      nonces.push(nonceBN.toNumber());
    }
  }

  const permitCallData = await fetchPermitDataMulti(
    signer,
    account,
    spenders,
    tokenContracts,
    tokenNames,
    nonces,
  );
  return permitCallData;
}

async function fetchPermitDataMulti(
  signer: Signer,
  owner: string,
  spenders: string[],
  tokenContracts: ERC20Permit[],
  tokenNames: string[],
  nonces: number[],
): Promise<PermitCallData[]> {
  const promises = tokenContracts.map(async (tokenContract, i) => {
    const tokenName = tokenNames[i];
    const spender = spenders[i];
    const nonce = nonces[i];

    const version = getPermitVersion(tokenContract.address);
    // catch the error and filter the rejected permit.  if a required permit is rejected, then
    // the transaction should fail and the error will propagate through the
    // useSmartContractPersisted logic.
    try {
      const permitData = await fetchPermitData(
        signer,
        tokenContract,
        tokenName,
        owner,
        spender,
        nonce,
        version,
      );
      if (permitData) {
        return permitData;
      }
    } catch (error) {}
  });

  const permitsOrUndefined = await Promise.all(promises);

  const permits = permitsOrUndefined.filter(
    (permit): permit is PermitCallData => !!permit,
  );
  return permits;
}
