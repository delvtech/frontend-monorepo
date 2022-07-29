import { ethers } from "hardhat";
// import Logger from "utils/logger";

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = ethers.utils.parseEther("1");

  const Lock = await ethers.getContractFactory("Lock");

  // Logger.deployContract("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  // Logger.successfulDeploy("Lock", lock);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
