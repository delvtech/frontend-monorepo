import { ERC20__factory } from "@elementfi/core-v2-typechain";
import { CoreV2Context } from "src/context";
import { Token } from "src/generated";

export const TokenModel = {
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
  };
}
