import { formatUnits, parseEther, parseUnits } from "ethers/lib/utils";
import hre from "hardhat";

import { MAX_ALLOWANCE } from "src/maxAllowance";
import { exitConvergentCurvePool } from "src/helpers/exitConvergentCurvePool";
import { getContracts } from "src/scripts/getContracts";
import { getSigner, SIGNER } from "src/scripts/getSigner";
import { joinConvergentCurvePool } from "src/helpers/joinConvergentCurvePool";
import { printSpotPriceForPool } from "src/scripts/printSpotPriceForPool";
import { printTokenInfoForPool } from "src/scripts/printTokenInfoForPool";
import { fetchPermitData, PermitCallData } from "src/helpers/fetchPermitData";
import { ERC20Permit, ERC20Permit__factory, Tranche } from "src/types";
import { BigNumber, ethers, Signer } from "ethers";
import { networkInterfaces } from "os";

async function simpleJoins() {
  const trader1 = await getSigner(SIGNER.TRADER1, hre);
  const {
    balancerVaultContract,
    // wethContract: baseAssetContract,
    // wethTrancheContract: trancheContract,
    // marketFyWethContract: ptPoolContract,
    // TODO: make the baseAsset or pool configurable for this script
    usdcContract: baseAssetContract,
    usdcTrancheContract: trancheContract,
    marketFyUsdcContract: ptPoolContract,
    userProxyContract,
  } = getContracts(hre, trader1);

  const trader1Address = await trader1.getAddress();

  await baseAssetContract.approve(balancerVaultContract.address, MAX_ALLOWANCE);

  const baseAssetDecimals = await baseAssetContract.decimals();
  await baseAssetContract.mint(
    trader1Address,
    parseUnits("10000000", baseAssetDecimals),
  );

  const poolId = await ptPoolContract.getPoolId();
  const { tokens } = await balancerVaultContract.getPoolTokens(poolId);
  const yieldTokenAddress = await trancheContract.interestToken();
  const yieldTokenContract = ERC20Permit__factory.connect(
    yieldTokenAddress,
    trader1,
  );
  await printTokenInfoForPool(balancerVaultContract, poolId, trader1);

  // approvals if base asset doesn't have permit
  // await trancheContract.approve(balancerVaultContract.address, MAX_ALLOWANCE);
  // await baseAssetContract.approve(userProxyContract.address, MAX_ALLOWANCE);

  // Note the trailing space is required
  const principalTokenName = "Principal Token ";
  // Note the trailing space is required
  const yieldTokenName = "Element Yield Token ";

  const baseAssetName = await baseAssetContract.name();
  const tokenNames = [
    principalTokenName,
    yieldTokenName,
    baseAssetName,
    baseAssetName,
  ];
  console.log("tokenNames", tokenNames);
  const tokenContracts = [
    trancheContract,
    yieldTokenContract,
    baseAssetContract,
    baseAssetContract,
  ] as ERC20Permit[];

  const spenders = [
    balancerVaultContract.address,
    balancerVaultContract.address,
    balancerVaultContract.address,
    userProxyContract.address,
  ];

  const trancheNonce = await trancheContract.nonces(trader1Address);
  const yieldTokenNonce = await yieldTokenContract.nonces(trader1Address);
  const baseAssetNonce = await baseAssetContract.nonces(trader1Address);
  const nonces = [
    trancheNonce,
    yieldTokenNonce,
    baseAssetNonce,
    baseAssetNonce.add(1),
  ];

  const permits = await getPermits(
    trader1,
    trader1Address,
    spenders,
    tokenContracts,
    tokenNames,
    nonces,
  );
  console.log("permits", permits);

  const expiration = await trancheContract.unlockTimestamp();
  const position = await trancheContract.position();

  console.log("minting new tokens to join pool with");
  const mintTx = await userProxyContract.mint(
    parseUnits("10000", baseAssetDecimals),
    baseAssetContract.address,
    expiration,
    position,
    permits,
  );
  await mintTx.wait(1);

  console.log("seeding pool with some tokens");
  await joinConvergentCurvePool(
    poolId,
    trader1,
    balancerVaultContract,
    tokens,
    baseAssetDecimals,
    "1000",
  );

  console.log(
    "now joining and exiting pool a bunch to simulate liquidity events",
  );
  const numBatches = 100;
  let batchCount = 0;
  while (batchCount < numBatches) {
    try {
      const numSwaps = 1;
      let joinCount = 0;
      const joins = [];
      while (joinCount < numSwaps) {
        joins.push(
          joinConvergentCurvePool(
            poolId,
            trader1,
            balancerVaultContract,
            tokens,
            baseAssetDecimals,
            "11.123",
          ),
        );

        joins.push(
          exitConvergentCurvePool(
            poolId,
            trader1,
            balancerVaultContract,
            tokens,
            baseAssetDecimals,
            "10.02",
          ),
        );

        joinCount += 1;
        await Promise.all(joins);
      }
    } catch (error) {
      console.log("error", error);
    }
    batchCount += 1;
  }
}

simpleJoins()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function getPermits(
  signer: Signer,
  owner: string,
  spenders: string[],
  tokenContracts: ERC20Permit[],
  tokenNames: string[],
  nonces: BigNumber[],
): Promise<PermitCallData[]> {
  const promises = tokenContracts.map(async (token, i) => {
    const tokenName = tokenNames[i];
    const spender = spenders[i];
    const nonce = nonces[i];

    const permitData = await fetchPermitData(
      signer,
      token,
      tokenName,
      owner,
      spender,
      ethers.constants.MaxUint256,
      nonce,
      "1",
      // tokenName === "USD Coin" ? " 2" : "1"
    );
    if (permitData) {
      return permitData;
    }
  });

  const permitsOrUndefined = await Promise.all(promises);

  const permits = permitsOrUndefined.filter(
    (permit): permit is PermitCallData => !!permit,
  );
  return permits;
}
