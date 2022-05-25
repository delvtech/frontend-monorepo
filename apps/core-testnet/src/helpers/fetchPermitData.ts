import {
  TypedDataDomain,
  TypedDataField,
  TypedDataSigner,
} from "@ethersproject/abstract-signer";
import { BigNumber, BigNumberish, BytesLike, ethers, Signer } from "ethers";

import { ERC20Permit } from "src/types/ERC20Permit";

export interface PermitCallData {
  tokenContract: string;
  who: string;
  amount: BigNumberish;
  expiration: BigNumberish;
  r: BytesLike;
  s: BytesLike;
  v: BigNumberish;
}

// Uses a default infinite permit expiration time
export async function fetchPermitData(
  signer: Signer,
  token: ERC20Permit,
  tokenName: string,
  owner: string,
  spender: string,
  spenderAmount: BigNumberish,
  nonce: BigNumber,
  // '1' for every ERC20Permit.  Except USDC which is '2' ¯\_(ツ)_/¯
  version: string,
): Promise<PermitCallData | undefined> {
  const typedSigner = signer as unknown as TypedDataSigner;
  // don't use metdata, must match exactly

  // The following line is commented out due a bug in our token's PERMIT_HASH's.  Our tokens are
  // appending a datestring to the name after the PERMIT_HASH is created, which breaks permit calls.
  // After we fix this we can uncomment this line instead of passing in the name as an argument to
  // this function.
  // const name = await token.name();

  const chainId = await signer.getChainId();

  const domain: TypedDataDomain = {
    name: tokenName,
    version: version,
    chainId: `${chainId}`,
    verifyingContract: token.address,
  };

  const types: Record<string, TypedDataField[]> = {
    Permit: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
      {
        name: "value",
        type: "uint256",
      },
      {
        name: "nonce",
        type: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
      },
    ],
  };

  // don't do this in a query hook.  make sure we grab the latest
  // const nonce = await token.nonces(owner);
  if (nonce === undefined || chainId === undefined) {
    return;
  }

  const data = {
    owner,
    spender,
    value: ethers.constants.MaxUint256,
    nonce: nonce,
    deadline: ethers.constants.MaxUint256,
  };

  // _signeTypedData is an experimental feature and is not on the type signature!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sigString: string = await typedSigner._signTypedData(
    domain,
    types,
    data,
  );

  const r = `0x${sigString.slice(2, 66)}`;
  const s = `0x${sigString.slice(66, 130)}`;
  const v = `0x${sigString.slice(130, 132)}`;

  return {
    tokenContract: token.address,
    who: spender,
    amount: ethers.constants.MaxUint256,
    expiration: ethers.constants.MaxUint256,
    r,
    s,
    v,
  };
}
