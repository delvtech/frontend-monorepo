import { SonraCategoryInfo, zx } from "sonra";
import { ElementModel } from ".";
import { InterestToken__factory } from "../typechain";
import { PrincipalTokenInfo } from "./principalToken";
import { provider } from "./provider";
import { log } from "./utils";

export type YieldTokenInfo = SonraCategoryInfo<ElementModel, "yieldToken">;

export const buildYieldTokenInfo = async (
  principalTokenInfo: PrincipalTokenInfo,
): Promise<YieldTokenInfo> => {
  log("Building yieldToken...");
  const _addresses = [];
  const metadata: YieldTokenInfo["metadata"] = {};

  for (const [
    principalTokenAddress,
    { interestToken, term, underlying },
  ] of Object.entries(principalTokenInfo.metadata)) {
    const address = zx.address().conform().parse(interestToken);
    _addresses.push(address);
    const yieldToken = InterestToken__factory.connect(address, provider);
    const tranche = zx
      .address()
      .category("principalToken")
      .conform()
      .parse(principalTokenAddress);

    const [name, symbol, decimals] = await Promise.all([
      yieldToken.name(),
      yieldToken.symbol(),
      yieldToken.decimals(),
    ]);

    metadata[address] = { name, symbol, decimals, term, underlying, tranche };
  }

  const addresses = zx.address().array().nonempty().parse(_addresses);

  log("Finished building yieldToken...");
  return { metadata, addresses };
};
