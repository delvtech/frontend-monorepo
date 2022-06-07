import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
  Overrides,
  Signer,
} from "ethers";

/**
 * A function to provide liquidity to a v2 term
 * @param tokensInAddresses
 * @param amounts
 * @param vaultAddress
 * @param slippage
 * @param signer
 * @param overrides
 * @returns
 */
export async function provideLiquidity(
  tokensInAddresses: string[],
  amounts: BigNumberish[],
  vaultAddress: string,
  slippage: BigNumberish,
  signer: Signer,
  overrides: Overrides = {},
): Promise<ContractTransaction> {
  const signerAddress = await signer.getAddress();

  return {
    hash: "0x00",
    from: signerAddress,
    gasLimit: BigNumber.from(100),
    data: "0x",
    value: BigNumber.from(amounts[0]),
    confirmations: 1,
    chainId: 1,
    nonce: 1,
    wait: async () => Promise.resolve({} as unknown as ContractReceipt),
  };
}
