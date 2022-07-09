import { Provider } from "@ethersproject/providers";
import { CoreVotingContract } from "src/datasources/CoreVotingContract";
import { VotingVaultContract } from "src/datasources/VotingVaultContract";

export type CouncilContext = {
  chainId: number;
  provider: Provider;
  councilDataSources: {
    votingContracts: CoreVotingContract[];
    votingVaults: VotingVaultContract[];
  };
};
