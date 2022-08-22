import { ERC20__factory } from "@elementfi/core-v2-typechain";
import { CoreV2Context } from "src/context";
import { TokenContract } from "src/datasources/TokenContract";
import { Token } from "src/generated";

// model should be a class that takes in a datasource(s)
export const TokenModel = {
  getAllowance,
  getBalanceOf,
  getByAddress,
};

interface GetByAddressOptions {
  address: string;
  context: CoreV2Context;
}

async function getByAddress({
  address,
  context,
}: GetByAddressOptions): Promise<Token> {
  const tokenContract = ERC20__factory.connect(address, context.provider);

  return {
    address: await tokenContract.address,
    decimals: await tokenContract.decimals(),
    symbol: await tokenContract.symbol(),
    name: await tokenContract.name(),
  };
}

async function getBalanceOf({
  address,
  owner,
  context,
}: { owner: string } & GetByAddressOptions): Promise<string> {
  const tokenContract = new TokenContract(address, context.provider);

  return (await tokenContract.getBalanceOf(owner)).toString();
}

async function getAllowance({
  address,
  owner,
  spender,
  context,
}: {
  owner: string;
  spender: string;
} & GetByAddressOptions): Promise<string> {
  const tokenContract = new TokenContract(address, context.provider);

  return (await tokenContract.getAllowance(owner, spender)).toString();
}
