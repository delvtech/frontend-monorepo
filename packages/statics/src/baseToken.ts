import { SonraCategoryInfo, zx } from "sonra";
import { ElementModel } from ".";
import { ERC20__factory } from "@contracts";
import { PrincipalTokenInfo } from "./principalToken";
import { provider } from "./provider";

type BaseTokenInfo = SonraCategoryInfo<ElementModel, "baseToken">;

export const buildBaseTokenInfo = async (
  principalTokenInfo: PrincipalTokenInfo,
): Promise<BaseTokenInfo> => {
  const addresses = zx
    .address()
    .conform()
    .array()
    .nonempty()
    .parse(
      Array.from(
        new Set(
          Object.values(principalTokenInfo.metadata).map(
            ({ underlying }) => underlying,
          ),
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

  return { metadata, addresses };
};
