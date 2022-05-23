import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ConvergentCurvePool__factory } from "src/types/factories/ConvergentCurvePool__factory";
import { ConvergentPoolFactory__factory } from "src/types/factories/ConvergentPoolFactory__factory";
import { Tranche__factory } from "src/types/factories/Tranche__factory";
import { USDC__factory } from "src/types/factories/USDC__factory";
import { Vault__factory } from "src/types/factories/Vault__factory";
import { WeightedPoolFactory__factory } from "src/types/factories/WeightedPoolFactory__factory";
import { WETH__factory } from "src/types/factories/WETH__factory";

import addresses from "src/all-addresses.json";
import { UserProxy__factory } from "src/types/factories/UserProxy__factory";
import { Signer } from "@ethersproject/abstract-signer";

// In this case we want to infer the contracts object interface
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getContracts(hre: HardhatRuntimeEnvironment, signer?: Signer) {
  const {
    balancerVaultAddress,
    wethAddress,
    usdcAddress,
    convergentPoolFactoryAddress,
    weightedPoolFactoryAddress,
    wethTrancheAddress,
    marketFyWethAddress,
    usdcTrancheAddress,
    marketFyUsdcAddress,
    userProxyContractAddress,
  } = addresses;
  const provider = hre.ethers.provider;
  const balancerVaultContract = Vault__factory.connect(
    balancerVaultAddress,
    signer ?? provider,
  );
  const wethContract = WETH__factory.connect(wethAddress, signer ?? provider);
  const usdcContract = USDC__factory.connect(usdcAddress, signer ?? provider);

  const convergentPoolFactory = ConvergentPoolFactory__factory.connect(
    convergentPoolFactoryAddress,
    signer ?? provider,
  );
  const weightedPoolFactory = WeightedPoolFactory__factory.connect(
    weightedPoolFactoryAddress,
    signer ?? provider,
  );

  const wethTrancheContract = Tranche__factory.connect(
    wethTrancheAddress,
    signer ?? provider,
  );

  const marketFyWethContract = ConvergentCurvePool__factory.connect(
    marketFyWethAddress,
    signer ?? provider,
  );
  const usdcTrancheContract = Tranche__factory.connect(
    usdcTrancheAddress,
    signer ?? provider,
  );

  const marketFyUsdcContract = ConvergentCurvePool__factory.connect(
    marketFyUsdcAddress,
    signer ?? provider,
  );

  const userProxyContract = UserProxy__factory.connect(
    userProxyContractAddress,
    signer ?? provider,
  );

  return {
    balancerVaultContract,
    wethContract,
    usdcContract,
    convergentPoolFactory,
    weightedPoolFactory,
    wethTrancheContract,
    marketFyWethContract,
    usdcTrancheContract,
    marketFyUsdcContract,
    userProxyContract,
  };
}
