import { parseUnits } from "ethers/lib/utils";
import hre from "hardhat";

import { getContracts } from "src/scripts/getContracts";
import { getSigner, SIGNER } from "src/scripts/getSigner";

// mints some stuff for a user
async function mintTokensForUser() {
  const trader = await getSigner(SIGNER.TRADER3, hre);
  const { usdcContract, wethContract } = getContracts(hre, trader);

  const traderAddress = await trader.getAddress();
  console.log("minting tokens for ", traderAddress);

  const contracts = [usdcContract, wethContract];

  const mintTransactions = contracts.map(async (contract) => {
    const contractDecimals = await contract.decimals();
    await contract.mint(
      traderAddress,
      parseUnits("10000000", contractDecimals),
    );
    return contract.balanceOf(traderAddress);
  });

  const balances = await Promise.all(mintTransactions);
  console.log("balances", balances);
}

mintTokensForUser()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
