import { VotingContract } from "src/generated";
import { AddressType, getAddresses } from "src/logic/addresses";
import { CouncilResolverContext } from "src/resolvers/context";
import { VotingVaultModel } from "./VotingVault";

export const VotingContractModel = {
  getByName(
    name: AddressType,
    context: CouncilResolverContext,
  ): VotingContract {
    const addresses = getAddresses(context.chainId);
    return {
      address: addresses[name],
      name,
      votingVaults:
        vaultNamesByVotingContract[name]?.map((name) =>
          VotingVaultModel.getByName(name, context),
        ) || [],
    };
  },
};

const vaultNamesByVotingContract: Partial<Record<AddressType, AddressType[]>> =
  {
    coreVoting: ["lockingVault", "vestingVault"],
    gscCoreVoting: ["gscVault"],
  };
