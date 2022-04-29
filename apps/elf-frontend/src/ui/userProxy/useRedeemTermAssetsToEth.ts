import { Tranche, UserProxy } from "@elementfi/core-typechain/dist/v1";
import { ERC20, ERC20Permit } from "@elementfi/core-typechain/dist/libraries";
import { PrincipalTokenInfo } from "@elementfi/tokenlist";
import { useTokenAllowance } from "ui/token/hooks/useTokenAllowance";
import { useSmartContractTransactionPersisted } from "ui/transactions/useSmartContractTransactionPersisted/useSmartContractTransactionPersisted";
import { fetchPermitData, PermitCallData } from "base/fetchPermitData";
import { flushPromises } from "base/flush/flush";
import { ContractMethodArgs } from "elf/contracts/types";
import { interestTokenContractsByAddress } from "elf/interestToken/interestToken";
import { getTokenInfo } from "tokenlists/tokenlists";
import { userProxyContract } from "elf/userProxy/contract";
import { BigNumber, Signer } from "ethers";
import { useCallback, useMemo } from "react";

// list of shitty principal and yield token contracts whose names are messed up.  they change their
// name after the constructor uses them to create their PERMIT_HASH's, which breaks permit calls.
// So, we have to look up these fuckers, and use 'Principal Token ', or 'Element Yield Token '
// instead of the actual token name.  Once these terms close out we can kill this list.
const shittyGoerliAddresses: string[] = [
  "0x89d66Ad25F3A723D606B78170366d8da9870A879",
  "0x44eecA004b2612d131EDA7dA2b9d986E7fED562e",
  "0xBf4B5cB5ca49B1eF6B02615a94980723f6484899",
  "0x80272c960b862B4d6542CDB7338Ad1f727E0D18d",
  "0x2c637c5142eE4F31A1a78Ad3DF012fc242F6CAe6",
  "0x6866dFc9A60e9dba922668b9b27931DCaCDF645A",
  "0x649b9a57cb8fbd01bE019bDBBed9768d2a457173",
  "0xDCf80C068B7fFDF7273d8ADAE4B076BF384F711A",
  "0x419b57dE54F7F1E108C72d6E6b405A1E66Fc5895",
];

export function useRedeemTermAssetsToEth(
  signer: Signer | undefined,
  tranche: Tranche | undefined,
  account: string | null | undefined,
  // note both are required.  set to BigNumber.from(0) if you don't want that one.
  amountPrinicpalToken: BigNumber,
  amountYieldToken: BigNumber,
  onTransactionSubmitted?: () => void,
): {
  withdraw: () => void;
  reset: () => void;
  isError: boolean;
  isLoading: boolean;
} {
  const principalTokenInfo = tranche
    ? getTokenInfo<PrincipalTokenInfo>(tranche.address)
    : undefined;
  const expiration = principalTokenInfo?.extensions.unlockTimestamp;
  const position = principalTokenInfo?.extensions.position;
  const interestTokenAddress = principalTokenInfo?.extensions.interestToken;
  const interestTokenContract = interestTokenAddress
    ? interestTokenContractsByAddress[interestTokenAddress]
    : undefined;

  const userProxy = useMemo(
    () => (signer ? userProxyContract.connect(signer) : userProxyContract),
    [signer],
  );
  const {
    mutate: withdrawToEth,
    isError,
    isLoading,
    reset,
  } = useSmartContractTransactionPersisted(userProxy, "withdrawWeth", signer, {
    onTransactionSubmitted,
  });

  const { data: ptApproval } = useTokenAllowance(
    tranche as unknown as ERC20,
    account,
    userProxy?.address,
  );

  const { data: ytApproval } = useTokenAllowance(
    interestTokenContract as unknown as ERC20,
    account,
    userProxy?.address,
  );

  const withdraw = useCallback(async () => {
    if (
      !signer ||
      !account ||
      !userProxy ||
      !expiration ||
      !position ||
      !tranche ||
      !interestTokenContract ||
      !ptApproval ||
      !ytApproval
    ) {
      return;
    }
    // we need an amount from at least one
    if (!amountPrinicpalToken.gt(0) && !amountYieldToken.gt(0)) {
      return;
    }

    // Note that the name in the TokenInfo is incorrect
    let ptName = await tranche.name();
    if (shittyGoerliAddresses.includes(tranche.address)) {
      ptName = "Principal Token ";
    }
    const permits: PermitCallData[] = [];

    if (ptApproval.lt(amountPrinicpalToken)) {
      const nonce = await interestTokenContract.nonces(account);
      const ptPermitData = await fetchPermitData(
        signer,
        tranche as unknown as ERC20Permit,
        ptName,
        account,
        userProxy.address,
        nonce.toNumber(),
        "1",
      );
      if (ptPermitData) {
        permits.push(ptPermitData);
      }
    }

    // wait before bringing up MM again, otherwise the pop-up can get hidden sometimes.
    await flushPromises(100);

    // Note that the name in the TokenInfo is incorrect
    let ytName = await interestTokenContract.name();
    if (shittyGoerliAddresses.includes(interestTokenContract.address)) {
      ytName = "Element Yield Token ";
    }

    if (ytApproval.lt(amountYieldToken)) {
      const nonce = await interestTokenContract.nonces(account);
      const ytPermitData = await fetchPermitData(
        signer,
        interestTokenContract as unknown as ERC20Permit,
        ytName,
        account,
        userProxy.address,
        nonce.toNumber(),
        "1",
      );
      if (ytPermitData) {
        permits.push(ytPermitData);
      }
    }

    // wait before bringing up MM again, otherwise the pop-up can get hidden sometimes.
    await flushPromises(100);

    const withdrawInterestToEthCallArgs = makeWithdrawInterestToEthCallArgs(
      expiration,
      position,
      amountPrinicpalToken,
      amountYieldToken,
      permits,
    );

    withdrawToEth(withdrawInterestToEthCallArgs);
  }, [
    account,
    amountPrinicpalToken,
    amountYieldToken,
    expiration,
    interestTokenContract,
    position,
    ptApproval,
    signer,
    tranche,
    userProxy,
    withdrawToEth,
    ytApproval,
  ]);

  return {
    withdraw,
    reset,
    isError,
    isLoading,
  };
}
export function makeWithdrawInterestToEthCallArgs(
  expiration: number,
  position: string,
  amountPT: BigNumber,
  amountYT: BigNumber,
  permitCallData: PermitCallData[],
): ContractMethodArgs<UserProxy, "withdrawWeth"> {
  const callArgs: ContractMethodArgs<UserProxy, "withdrawWeth"> = [
    expiration,
    position,
    amountPT,
    amountYT,
    permitCallData,
  ];

  return callArgs;
}
