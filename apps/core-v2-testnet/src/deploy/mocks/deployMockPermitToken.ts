import {
  MockERC20Permit__factory,
  MockERC20Permit,
} from "@elementfi/core-v2-typechain";
import { Signer, BigNumberish } from "ethers";

export async function deployMockPermitToken(
  signer: Signer,
  name: string,
  symbol: string,
  decimal: BigNumberish,
): Promise<MockERC20Permit> {
  const erc20Factory = new MockERC20Permit__factory(signer);
  const mockERC20Permit = await erc20Factory.deploy(name, symbol, decimal);
  await mockERC20Permit.deployed();

  return mockERC20Permit;
}
