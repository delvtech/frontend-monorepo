import { Provider } from "@ethersproject/providers";
import { GSCVault, GSCVault__factory } from "@elementfi/council-typechain";
import VotingVaultContract from "./VotingVaultContract";

// TODO: implement Dataloader (https://github.com/graphql/dataloader)
export default class GSCVaultContract extends VotingVaultContract {
  contract: GSCVault;

  constructor(address: string, provider: Provider) {
    const contract = GSCVault__factory.connect(address, provider);
    super(address, contract);
    this.contract = contract;
  }
}
