import { getTokenList } from "src/tokenlist/getTokenList";
import mainnetAddressesJson from "src/addresses/mainnet.addresses.json";

getTokenList(
  mainnetAddressesJson,
  "Mainnet token list",
  "src/tokenlist/mainnet.tokenlist.json",
)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
