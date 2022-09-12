import { tradePrincipalTokens } from "./tradePrincipalTokens";
/* eslint-disable no-restricted-imports */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import hre, { ethers } from "hardhat";

// TODO add tsconfig-paths/register to hardhat config
import { LiquidityPool__factory } from "typechain/factories/LiquidityPool__factory";
import { MockERC20__factory } from "typechain/factories/MockERC20__factory";
import { LiquidityPool } from "typechain/LiquidityPool";
import { MockERC20 } from "typechain/MockERC20";

describe("tradePrincipalTokens", () => {
  let signers: SignerWithAddress[];
  let signer: SignerWithAddress;
  let tokenContract: MockERC20;
  let poolTokenContract: MockERC20;
  let liquidityPoolContract: LiquidityPool;

  beforeEach(async () => {
    signers = await hre.ethers.getSigners();
    [signer] = signers;
    tokenContract = await deployToken("token", "T", signer);
    poolTokenContract = await deployToken("poolToken", "PT", signer);
    liquidityPoolContract = await deployLiquidityPool(
      signer,
      tokenContract.address,
      poolTokenContract.address,
    );
  });

  it("Should deposit", async () => {
    const depositAmount = parseEther("1");
    await tokenContract.connect(signer).mint(signer.address, parseEther("100"));
    await tokenContract
      .connect(signer)
      .approve(liquidityPoolContract.address, ethers.constants.MaxUint256);

    await expect(liquidityPoolContract.deposit(depositAmount))
      .to.emit(liquidityPoolContract, "Deposit")
      .withArgs(signer.address, 0, depositAmount);

    // expect(tokenBalance).to.equal(depositAmount);
  });
});

async function deployLiquidityPool(
  signer: SignerWithAddress,
  tokenAddress: string,
  poolTokenAddress: string,
): Promise<LiquidityPool> {
  const deployer = new LiquidityPool__factory(signer);

  const contract = await deployer.deploy(poolTokenAddress, tokenAddress);

  return contract;
}

async function deployToken(
  name: string,
  symbol: string,
  signer: SignerWithAddress,
): Promise<MockERC20> {
  const tokenDeployer = new MockERC20__factory(signer);
  const tokenContract = await tokenDeployer.deploy(name, symbol);

  return tokenContract;
}
