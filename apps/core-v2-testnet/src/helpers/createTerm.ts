import { Term } from "@elementfi/core-v2-typechain";
import { BigNumber, Signer } from "ethers";
import { validateAddresses } from "src/utils/validateAddresses";

// Creates new term within existing term contract
export async function createTerm(
  signer: Signer,
  term: Term,
  start: BigNumber, // unix timestamp seconds
  expiry: BigNumber, // unix timestamp seconds
  destination: string,
  underlyingAmount: BigNumber,
): Promise<void> {
  validateAddresses([destination]);
  const assetIds: number[] = [];
  const assetAmounts: number[] = [];
  const hasPreFunding = false; // ???

  await term
    .connect(signer)
    .lock(
      assetIds,
      assetAmounts,
      underlyingAmount,
      hasPreFunding,
      destination,
      destination,
      start,
      expiry,
    );
}
