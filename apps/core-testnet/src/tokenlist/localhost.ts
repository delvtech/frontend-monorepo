import { getTokenList } from "src/tokenlist/getTokenList";
import testnetAddressesJson from "src/addresses/testnet.addresses.json";

// Generate the testnet.tokenlist.json file
getTokenList(
  testnetAddressesJson,
  "Testnet token list",
  "src/tokenlist/testnet.tokenlist.json",
)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
