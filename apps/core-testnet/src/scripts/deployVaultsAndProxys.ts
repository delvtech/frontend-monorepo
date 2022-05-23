import { Signer } from "ethers";
import { parseUnits } from "ethers/lib/utils";

import { USDC } from "src/types/USDC";
import { WETH } from "src/types/WETH";
import { YVaultAssetProxy } from "src/types/YVaultAssetProxy";

import { MAX_ALLOWANCE } from "src/maxAllowance";

import { deployYearnVault } from "./deployYVault";
import { deployYearnVaultAssetProxy } from "./deployYVaultAssetProxy";
import { TestYVault } from "src/types/TestYVault";

export async function deployVaultsAndProxys(
  signer: Signer,
  wethContract: WETH,
  usdcContract: USDC,
): Promise<{
  yWeth: TestYVault;
  yUsdc: TestYVault;
  wethYearnVaultAssetProxy: YVaultAssetProxy;
  usdcYearnVaultAssetProxy: YVaultAssetProxy;
}> {
  const signerAddress = await signer.getAddress();
  // deploy stubbed yearn vault
  const yWeth = await deployYearnVault(
    signer,
    wethContract.address,
    18,
    "WETH Yearn Vault",
    "yWETH",
  );

  // seed the yearn vault with an initial totalSupply.  wrapped positions calculate the base asset
  // amount per share by assets * numShares / totalSupply which will return a divide by zero error
  // if total supply is zero.
  const approvexTx = await wethContract
    .connect(signer)
    .approve(yWeth.address, MAX_ALLOWANCE);
  await approvexTx.wait(1);
  await yWeth.deposit(parseUnits("1000", 6), signerAddress);

  // deploy yearn vault asset proxy
  const wethYearnVaultAssetProxy: YVaultAssetProxy =
    await deployYearnVaultAssetProxy(
      signer,
      yWeth.address,
      wethContract.address,
      "ELF - WETH Yearn Vault",
      "ELFyWETH",
    );

  // deploy stubbed yearn vault
  const yUsdc = await deployYearnVault(
    signer,
    usdcContract.address,
    6,
    "USDC Yearn Vault",
    "yUSDC",
  );

  // seed the yearn vault with an initial totalSupply.  wrapped positions calculate the base asset
  // amount per share by assets * numShares / totalSupply which will return a divide by zero error
  // if total supply is zero.
  await usdcContract.connect(signer).approve(yUsdc.address, MAX_ALLOWANCE);
  await yUsdc.deposit(parseUnits("1000", 6), signerAddress);

  // deploy yearn vault asset proxy
  const usdcYearnVaultAssetProxy: YVaultAssetProxy =
    await deployYearnVaultAssetProxy(
      signer,
      yUsdc.address,
      usdcContract.address,
      "ELF - USDC Yearn Vault",
      "ELFyUSDC",
    );

  return {
    yWeth,
    yUsdc,
    wethYearnVaultAssetProxy,
    usdcYearnVaultAssetProxy,
  };
}
