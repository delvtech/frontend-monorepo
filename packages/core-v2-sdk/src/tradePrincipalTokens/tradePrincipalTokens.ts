import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
  Overrides,
  Signer,
} from "ethers";

/**
 * performs a trade of principal tokens on a v2 pool
 * this is likely to get a lot more complicated with swap kinds, exact in, exact out etc
 * @param tokenInAddress
 * @param tokenOutAddress
 * @param vaultAddress
 * @param amount
 * @param slippage
 * @param signer
 * @param overrides
 * @returns
 */
export async function tradePrincipalTokens(
  tokenInAddress: string,
  tokenOutAddress: string,
  vaultAddress: string,
  amount: BigNumberish,
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
    value: BigNumber.from(amount),
    confirmations: 1,
    chainId: 1,
    nonce: 1,
    wait: async () => Promise.resolve({} as unknown as ContractReceipt),
  };
}
