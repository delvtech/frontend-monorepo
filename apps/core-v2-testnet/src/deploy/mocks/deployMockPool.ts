import {
  ERC20,
  ERC20Permit,
  ForwarderFactory,
  MockPool,
  MockPool__factory,
  Term,
} from "@elementfi/core-v2-typechain";
import { BigNumberish, BytesLike, Signer } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export async function deployMockPool(
  signer: Signer,
  term: Term,
  token: ERC20 | ERC20Permit,
  fee: BigNumberish,
  linkHash: BytesLike,
  governance: SignerWithAddress,
  factory: ForwarderFactory,
): Promise<MockPool> {
  const poolFactory = new MockPool__factory(signer);
  const pool = await poolFactory.deploy(
    term.address,
    token.address,
    fee,
    linkHash,
    governance.address,
    factory.address,
  );

  return await pool.deployed();
}
