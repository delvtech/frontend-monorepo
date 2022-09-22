import { existsSync, readFileSync } from "fs";
import { HardhatNetworkAccountsUserConfig } from "hardhat/types";

const EXPECTED_ACCOUNT_FILE = "accounts.json";

export default (): HardhatNetworkAccountsUserConfig => {
  if (existsSync(EXPECTED_ACCOUNT_FILE)) {
    console.log("External list of accounts loaded. \n");
    const accountsFile = readFileSync(EXPECTED_ACCOUNT_FILE);
    const _accounts: string[] | undefined = JSON.parse(accountsFile.toString());

    return _accounts
      ? _accounts.map((address) => ({
          privateKey: address,
          balance: "100000000000000000000000", // 100000 ETH
        }))
      : {
          accountsBalance: "100000000000000000000000",
          count: 5,
        };
  }

  console.warn("Could not find external account list.");
  return {
    accountsBalance: "100000000000000000000000",
    count: 5,
  };
};
