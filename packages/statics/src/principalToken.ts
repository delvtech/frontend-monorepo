import { SonraCategoryInfo, zx } from "sonra";
import { ElementModel } from ".";
import { Tranche__factory } from "../typechain";
import { provider } from "./provider";
import { TrancheCreatedEvent } from "./trancheAndPool";
import { log } from "./utils";

export type PrincipalTokenInfo = SonraCategoryInfo<
  ElementModel,
  "principalToken"
>;

export const buildPrincipalTokenInfo = async (
  trancheCreatedEvents: TrancheCreatedEvent[],
): Promise<PrincipalTokenInfo> => {
  log("Building principalToken...");

  const addresses = zx
    .address()
    .array()
    .nonempty()
    .parse(trancheCreatedEvents.map(({ trancheAddress }) => trancheAddress));

  const metadata: PrincipalTokenInfo["metadata"] = {};

  for (const {
    trancheAddress: address,
    blockTimestamp: start,
    expiration: end,
    wrappedPositionAddress: position,
  } of trancheCreatedEvents) {
    const principalToken = Tranche__factory.connect(address, provider);

    const [name, symbol, decimals, underlying, interestToken] =
      await Promise.all([
        principalToken.name(),
        principalToken.symbol(),
        principalToken.decimals(),
        principalToken
          .underlying()
          .then(zx.address().category("baseToken").conform().parse),
        principalToken
          .interestToken()
          .then(zx.address().category("yieldToken").conform().parse),
      ]);

    const duration = (end.getTime() - start.getTime()) / 1000;

    metadata[address] = {
      name,
      symbol,
      decimals,
      underlying,
      term: {
        start,
        end,
        duration,
      },
      interestToken,
      position,
    };
  }

  log("Finished building principalToken...");
  return { addresses, metadata };
};
