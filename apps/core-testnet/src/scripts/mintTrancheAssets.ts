import { ContractTransaction, Signer } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { YVaultAssetProxy__factory } from "src/types/factories/YVaultAssetProxy__factory";

import { Tranche } from "src/types/Tranche";
import { USDC } from "src/types/USDC";
import { WETH } from "src/types/WETH";

import { MAX_ALLOWANCE } from "src/maxAllowance";

export async function mintTrancheAssets(
  signer: Signer,
  baseAssetContract: WETH | USDC,
  trancheContract: Tranche,
  baseAssetAmountIn: string,
): Promise<ContractTransaction> {
  const signerAddress = await signer.getAddress();

  // allow tranche contract to take signers's base asset tokens
  await baseAssetContract
    .connect(signer)
    .approve(trancheContract.address, MAX_ALLOWANCE);

  const wrappedPositionAddress = await trancheContract.position();
  const wrappedPositionContract = YVaultAssetProxy__factory.connect(
    wrappedPositionAddress,
    signer,
  );
  await baseAssetContract
    .connect(signer)
    .approve(wrappedPositionContract.address, MAX_ALLOWANCE);

  const baseAssetDecimals = await baseAssetContract.decimals();
  const baseAssetDeposit = parseUnits(baseAssetAmountIn, baseAssetDecimals);

  // deposit base asset into tranche contract
  const depositTx = await trancheContract.deposit(
    baseAssetDeposit,
    signerAddress,
  );

  await depositTx.wait(1);

  return depositTx;
}
