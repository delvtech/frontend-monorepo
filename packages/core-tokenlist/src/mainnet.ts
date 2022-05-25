// This adds support for typescript paths mappings
import fs from "fs";
import mainnetAddressesJson from "src/addresses/mainnet.addresses.json";
import { getTokenList } from "src/getTokenList";

if (!fs.existsSync("dist")) {
  fs.mkdirSync("dist");
}

getTokenList(
  mainnetAddressesJson,
  "Mainnet token list",
  "dist/mainnet.tokenlist.json",
)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
