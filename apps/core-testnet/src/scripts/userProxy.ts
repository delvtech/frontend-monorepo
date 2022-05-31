import { Signer } from "ethers";
import { solidityKeccak256 } from "ethers/lib/utils";

import { UserProxy__factory } from "src/types/factories/UserProxy__factory";
import { TrancheFactory } from "src/types/TrancheFactory";
import { UserProxy } from "src/types/UserProxy";
import { WETH } from "src/types/WETH";

// TODO: figure out how to alias the artifacts/ directory
// eslint-disable-next-line no-restricted-imports
import trancheData from "../../artifacts/src/contracts/Tranche.sol/Tranche.json";

export async function deployUserProxy(
  signer: Signer,
  wethContract: WETH,
  trancheFactory: TrancheFactory,
): Promise<UserProxy> {
  const bytecodeHash = solidityKeccak256(["bytes"], [trancheData.bytecode]);
  const UserProxyDeployer = new UserProxy__factory(signer);
  const userProxyContract = await UserProxyDeployer.deploy(
    wethContract.address,
    trancheFactory.address,
    bytecodeHash,
  );

  return userProxyContract;
}
