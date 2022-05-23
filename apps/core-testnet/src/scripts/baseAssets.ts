import { Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";

import { DAI, LUSD, LUSD__factory, WETH__factory } from "src/types";
import { DAI__factory } from "src/types/factories/DAI__factory";
import { USDC__factory } from "src/types/factories/USDC__factory";
import { USDC } from "src/types/USDC";
import { WETH } from "src/types/WETH";

export async function deployBaseAssets(
  wethSigner: Signer,
  usdcSigner: Signer,
  daiSigner: Signer,
  lusdSigner: Signer,
): Promise<[WETH, USDC, DAI, LUSD]> {
  const wethSignerAddress = await wethSigner.getAddress();
  const usdcSignerAddress = await usdcSigner.getAddress();
  const daiSignerAddress = await daiSigner.getAddress();
  const lusdSignerAddress = await lusdSigner.getAddress();

  const wethDeployer = new WETH__factory(wethSigner);
  const wethContract = await wethDeployer.deploy(wethSignerAddress);
  await wethContract.deployed();
  // give weth contract some ETH for withdrawals
  await wethContract.deposit({ value: parseEther("900") });

  const usdcDeployer = new USDC__factory(usdcSigner);
  const usdcContract = await usdcDeployer.deploy(usdcSignerAddress);
  await usdcContract.deployed();

  const daiDeployer = new DAI__factory(daiSigner);
  const daiContract = await daiDeployer.deploy(daiSignerAddress);
  await daiContract.deployed();

  const lusdDeployer = new LUSD__factory(lusdSigner);
  const lusdContract = await lusdDeployer.deploy(lusdSignerAddress);
  await lusdContract.deployed();

  return [wethContract, usdcContract, daiContract, lusdContract];
}
