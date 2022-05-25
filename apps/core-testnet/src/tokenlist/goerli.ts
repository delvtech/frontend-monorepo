import { getTokenList } from "src/tokenlist/getTokenList";
import goerliAddressesJson from "src/addresses/goerli.addresses.json";

getTokenList(
  goerliAddressesJson,
  "Goerli token list",
  "src/tokenlist/goerli.tokenlist.json",
)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
