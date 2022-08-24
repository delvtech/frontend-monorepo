import { CoreV2Context } from "src/context";
import { TokenContract } from "src/datasources/TokenContract";
import { Token } from "src/generated";
import { getDataSourceByAddress } from "src/utils/getDataSourceByAddress";

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
}: GetByAddressOptions): Promise<Token | null> {
  const tokenContract = getDataSourceByAddress(
    address,
    context.elementDataSources.tokenContracts,
  );

  return tokenContract
    ? {
        address: await tokenContract.address,
        decimals: await tokenContract.getDecimals(),
        symbol: await tokenContract.getSymbol(),
        name: await tokenContract.getname(),
      }
    : null;
}

interface GetBalanceOptions {
  owner: string;
  address: string;
  context: CoreV2Context;
}

async function getBalanceOf({
  owner,
  address,
  context,
}: GetBalanceOptions): Promise<string | null> {
  const tokenContract = getDataSourceByAddress(
    address,
    context.elementDataSources.tokenContracts,
  );

  return tokenContract ? await tokenContract.getBalanceOf(owner) : null;
}

interface GetAllowanceOptions {
  owner: string;
  spender: string;
  address: string;
  context: CoreV2Context;
}

async function getAllowance({
  owner,
  spender,
  address,
  context,
}: GetAllowanceOptions): Promise<string | null> {
  const tokenContract = getDataSourceByAddress(
    address,
    context.elementDataSources.tokenContracts,
  );

  return tokenContract
    ? await tokenContract.getAllowance(owner, spender)
    : null;
}
