import { Term } from "@elementfi/core-v2-typechain";
import { BigNumberish } from "ethers";
import { validateAddresses } from "@elementfi/base";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// Creates new term within existing term contract
export async function createTerm(
  signer: SignerWithAddress,
  term: Term,
  start: number, // unix timestamp seconds
  expiry: number, // unix timestamp seconds
  destination: string,
  underlyingAmount: BigNumberish,
): Promise<void> {
  validateAddresses([destination]);
  const assetIds: number[] = [];
  const assetAmounts: number[] = [];
  const hasPreFunding = false; // tokens have been sent before doing a lock

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
