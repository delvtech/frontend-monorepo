import { UseMutationResult } from "react-query";

import { Airdrop } from "@elementfi/council-typechain";
import { ContractReceipt, Signer } from "ethers";
import { airdropContract } from "src/contracts";
import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain/src/hooks/useSmartContractTransaction/useSmartContractTransaction";

export function useClaimAndDepositAirdrop(
  signer: Signer | undefined,
  options?: UseSmartContractTransactionOptions<Airdrop, "claimAndDelegate">,
): UseMutationResult<
  ContractReceipt | undefined,
  unknown,
  Parameters<Airdrop["claimAndDelegate"]>
> {
  const claimAndDeposit = useSmartContractTransaction(
    airdropContract,
    "claimAndDelegate",
    signer,
    options,
  );
  return claimAndDeposit;
}
