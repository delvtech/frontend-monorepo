import uniq from "lodash.uniq";
import { SonraCategoryInfo, zx } from "sonra";
import { ElementModel } from ".";
import { ERC20__factory } from "../typechain";
import { PrincipalTokenInfo } from "./principalToken";
import { provider } from "./provider";
import { log } from "./utils";

type BaseTokenInfo = SonraCategoryInfo<ElementModel, "baseToken">;

export const buildBaseTokenInfo = async (
  principalTokenInfo: PrincipalTokenInfo,
): Promise<BaseTokenInfo> => {
  log("Building baseToken...");
  const addresses = zx
    .address()
    .conform()
    .array()
    .nonempty()
    .parse(
      uniq(
        Object.values(principalTokenInfo.metadata).map(
          ({ underlying }) => underlying,
        ),
      ),
    );

  const metadata: BaseTokenInfo["metadata"] = {};

  for (const address of addresses) {
    const baseToken = ERC20__factory.connect(address, provider);

    const [name, symbol, decimals, totalSupply] = await Promise.all([
      baseToken.name(),
      baseToken.symbol(),
      baseToken.decimals(),
      baseToken.totalSupply(),
    ]);

    metadata[address] = { name, symbol, decimals, totalSupply };
  }

  log("Finished building baseToken...");
  return { metadata, addresses };
};
