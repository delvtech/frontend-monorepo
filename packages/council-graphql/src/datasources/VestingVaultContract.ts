import { Provider } from "@ethersproject/providers";
import {
  VestingVault,
  VestingVault__factory,
} from "@elementfi/council-typechain";
import { VotingVaultContract } from "./VotingVaultContract";

// TODO: implement Dataloader (https://github.com/graphql/dataloader)
export class VestingVaultContract extends VotingVaultContract {
  contract: VestingVault;

  constructor(address: string, provider: Provider) {
    const contract = VestingVault__factory.connect(address, provider);
    super(address, contract);
    this.contract = contract;
  }
}
