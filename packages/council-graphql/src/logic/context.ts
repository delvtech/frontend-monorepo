import { Provider } from "@ethersproject/providers";
import { CoreVotingContract } from "src/datasources/CoreVotingContract";
import { VotingVaultDataSource } from "src/datasources/VotingVaultDataSource";

export interface CouncilContext {
  chainId: number;
  provider: Provider;
  councilDataSources: {
    votingContracts: CoreVotingContract[];
    votingVaults: VotingVaultDataSource[];
  };
}
