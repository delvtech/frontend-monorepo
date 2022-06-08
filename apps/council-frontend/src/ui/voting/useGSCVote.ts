import { useCallback } from "react";

import { CoreVoting } from "@elementfi/council-typechain";
import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain/src/hooks/useSmartContractTransaction/useSmartContractTransaction";
import { Signer } from "ethers";

import { addressesJson } from "src/addresses";
import { gscCoreVotingContract } from "src/contracts";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { Ballot } from "src/ui/voting/Ballot";

const { gscVault: gscVaultAddress } = addressesJson.addresses;

export function useGSCVote(
  account: string | undefined | null,
  signer: Signer | undefined,
  proposalCreatedAtBlockNumber: number,
  options?: UseSmartContractTransactionOptions<CoreVoting, "vote">,
): {
  mutate: (proposalId: string, ballot: Ballot) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
} {
  const { data: latestBlockNumber } = useLatestBlockNumber();

  const {
    mutate: vote,
    isLoading,
    isSuccess,
    isError,
  } = useSmartContractTransaction(
    gscCoreVotingContract,
    "vote",
    signer,
    options,
  );

  const onVote = useCallback(
    (proposalId: string, ballot: Ballot) => {
      const blockNumber = proposalCreatedAtBlockNumber || latestBlockNumber;

      if (!blockNumber || !account) {
        return;
      }

      // We should not include any vaults that the user has 0 voting power in
      // when casting a vote to save gas
      const votingVaults: string[] = [gscVaultAddress];
      // extra data is not needed for the gsc vault to query vote power, stub with empty value
      const extraDatas: string[] = ["0x00"];

      vote([votingVaults, extraDatas, Number(proposalId), ballot]);
    },
    [account, proposalCreatedAtBlockNumber, latestBlockNumber, vote],
  );

  return { mutate: onVote, isLoading, isSuccess, isError };
}
