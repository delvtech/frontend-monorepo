import { useCallback } from "react";

import { CoreVoting } from "@elementfi/council-typechain";
import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain/src/hooks/useSmartContractTransaction/useSmartContractTransaction";
import { parseEther } from "@ethersproject/units";
import { ethers, Signer } from "ethers";

import { addressesJson } from "src/addresses";
import { coreVotingContract } from "src/contracts";
import { MerkleProof } from "src/merkle/MerkleProof";

import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { Ballot } from "src/ui/voting/Ballot";
import { useLockingVaultVotingPower } from "src/ui/voting/useLockingVaultVotingPower";
import { useVestingVaultVotingPower } from "src/ui/voting/useVestingVaultVotingPower";

const { lockingVault: lockingVaultAddress, vestingVault: vestingVaultAddress } =
  addressesJson.addresses;

export function useVote(
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
  } = useSmartContractTransaction(coreVotingContract, "vote", signer, options);

  const lockingVaultVotingPower = useLockingVaultVotingPower(
    account,
    proposalCreatedAtBlockNumber,
  );

  const vestingVaultVotingPower = useVestingVaultVotingPower(
    account,
    proposalCreatedAtBlockNumber,
  );

  const onVote = useCallback(
    (proposalId: string, ballot: Ballot) => {
      const blockNumber = proposalCreatedAtBlockNumber || latestBlockNumber;

      if (!blockNumber || !account) {
        return;
      }

      // We should not include any vaults that the user has 0 voting power in
      // when casting a vote to save gas
      const votingVaults: string[] = [];
      const extraDatas: string[] = [];

      if (+lockingVaultVotingPower > 0) {
        votingVaults.push(lockingVaultAddress);
        const extraData = getEmptyCallDatas();
        extraDatas.push(extraData);
      }

      if (+vestingVaultVotingPower > 0) {
        votingVaults.push(vestingVaultAddress);
        const extraData = getEmptyCallDatas();
        extraDatas.push(extraData);
      }

      vote([votingVaults, extraDatas, Number(proposalId), ballot]);
    },
    [
      account,
      proposalCreatedAtBlockNumber,
      latestBlockNumber,
      lockingVaultVotingPower,
      vestingVaultVotingPower,
      vote,
    ],
  );

  return { mutate: onVote, isLoading, isSuccess, isError };
}

// extra data is not needed for locking/vesting vaults to query vote power, stub with empty value
function getEmptyCallDatas(): string {
  return "0x00";
}

// not used right now, but we'll need to when we add optimistic rewards
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCallDatasForRewardsVaultQueryVotePower(
  merkleInfo: MerkleProof,
): string {
  const { value: totalGrant } = merkleInfo?.leaf || {};
  const { proof = [] } = merkleInfo || {};

  const extraDataForRewardsVault = ethers.utils.defaultAbiCoder.encode(
    ["uint256", "bytes32[]"],
    [parseEther(totalGrant || "0"), proof],
  );

  return extraDataForRewardsVault;
}
