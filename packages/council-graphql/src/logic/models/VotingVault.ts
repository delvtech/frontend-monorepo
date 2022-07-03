import { VotingVault } from "src/generated";
import { AddressType, getAddresses } from "src/logic/addresses";
import { CouncilResolverContext } from "src/resolvers/context";

export const VotingVaultModel = {
  getByName(
    name: AddressType,
    { chainId }: CouncilResolverContext,
  ): VotingVault {
    const addresses = getAddresses(chainId);
    return {
      address: addresses[name],
      name,
    };
  },
};
