import { MockERC20, MockERC20__factory } from "@elementfi/core-v2-typechain";
import { Signer, BigNumberish } from "ethers";

export async function deployMockToken(
  signer: Signer,
  name: string,
  symbol: string,
  decimal: BigNumberish,
): Promise<MockERC20> {
  const erc20Factory = new MockERC20__factory(signer);
  const mockERC20 = await erc20Factory.deploy(name, symbol, decimal);
  await mockERC20.deployed();

  return mockERC20;
}
