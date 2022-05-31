import {
  BigNumber,
  BigNumberish,
  ContractReceipt,
  ContractTransaction,
  Overrides,
  Signer,
} from "ethers";

export async function buyYieldTokens(
  tokenAddress: string,
  vaultAddress: string,
  amount: BigNumberish,
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
