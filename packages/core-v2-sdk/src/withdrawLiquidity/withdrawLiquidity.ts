import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
  Overrides,
  Signer,
} from "ethers";

/**
 * withdraw liquidity before the term is expired to underlying and pts
 * @param amount
 * @param poolAddress
 * @param signer
 * @param overrides
 * @returns
 */
export async function withdrawLiquidity(
  amount: BigNumberish,
  poolAddress: string,
  signer: Signer,
  overrides: Overrides = {},
): Promise<ContractTransaction> {
  const signerAddress = await signer.getAddress();

  return {
    hash: "0x00",
    from: signerAddress,
    gasLimit: BigNumber.from(100),
    data: "0x",
    value: BigNumber.from(amount),
    confirmations: 1,
    chainId: 1,
    nonce: 1,
    wait: async () => Promise.resolve({} as unknown as ContractReceipt),
  };
}
