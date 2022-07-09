import { Provider } from "@ethersproject/providers";
import {
  LockingVault,
  LockingVault__factory,
} from "@elementfi/council-typechain";
import { VotingVaultContract } from "./VotingVaultContract";

// TODO: implement Dataloader (https://github.com/graphql/dataloader)
export class LockingVaultContract extends VotingVaultContract {
  contract: LockingVault;

  constructor(address: string, provider: Provider) {
    const contract = LockingVault__factory.connect(address, provider);
    super(address, contract);
    this.contract = contract;
  }
}
