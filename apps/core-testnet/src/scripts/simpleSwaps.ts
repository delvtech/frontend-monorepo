import { parseEther } from "ethers/lib/utils";
import hre from "hardhat";

import { ERC20 } from "src/types/ERC20";

import { MAX_ALLOWANCE } from "src/maxAllowance";
import { batchSwapIn } from "src/scripts/batchSwapIn";
import { getContracts } from "src/scripts/getContracts";
import { getSigner, SIGNER } from "src/scripts/getSigner";

async function simpleSwaps() {
  const trader1 = await getSigner(SIGNER.TRADER1, hre);
  const {
    balancerVaultContract,
    wethContract,
    wethTrancheContract,
    marketFyWethContract,
    userProxyContract,
  } = getContracts(hre, trader1);

  const trader1Address = await trader1.getAddress();

  await wethContract.approve(balancerVaultContract.address, MAX_ALLOWANCE);
  await wethTrancheContract.approve(
    balancerVaultContract.address,
    MAX_ALLOWANCE,
  );

  await wethContract.mint(trader1Address, parseEther("10000000"));
  const wethFytPoolId = await marketFyWethContract.getPoolId();

  await wethContract.approve(userProxyContract.address, MAX_ALLOWANCE);
  const expiration = await wethTrancheContract.unlockTimestamp();
  const position = await wethTrancheContract.position();
  await userProxyContract.mint(
    parseEther("10000"),
    wethContract.address,
    expiration,
    position,
    [],
  );

  const numBatches = 100;
  let batchCount = 0;
  while (batchCount < numBatches) {
    const numSwaps = 2;
    let swapCount = 0;
    const swaps = [];
    while (swapCount < numSwaps) {
      swaps.push(
        batchSwapIn(
          wethContract,
          wethTrancheContract as unknown as ERC20,
          wethFytPoolId,
          trader1Address,
          balancerVaultContract,
          "1",
          18,
        ),
      );
      swaps.push(
        batchSwapIn(
          wethTrancheContract as unknown as ERC20,
          wethContract,
          wethFytPoolId,
          trader1Address,
          balancerVaultContract,
          "1",
          18,
        ),
      );

      swapCount += 1;
      await Promise.all(swaps);
    }

    batchCount += 1;
  }
}

simpleSwaps()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
