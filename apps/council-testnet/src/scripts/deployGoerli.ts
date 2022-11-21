import "hardhat-ethernal";

import { AddressesJsonFile } from "@elementfi/council-tokenlist";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Wallet } from "ethers";
import fs from "fs";
import hre from "hardhat";

import {
  deployGovernanace,
  GovernanceContracts,
} from "src/scripts/deployGovernance";

const goerliKey = process.env.GOERLI_DEPLOYER_PRIVATE_KEY;

async function main() {
  const provider = hre.ethers.provider;
  if (!goerliKey) {
    console.log("no private key for deployer address provided");
    return;
  }
  const owner = new Wallet(goerliKey, provider) as unknown as SignerWithAddress;
  const governanceContracts = await deployGovernanace(hre, owner);
  console.log("governanceContracts", governanceContracts);
  writeAddressesJson(governanceContracts);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

function writeAddressesJson(governanceContracts: GovernanceContracts) {
  // Produce a schema-compliant testnet.addresses.json file
  const addressesJson: AddressesJsonFile = {
    chainId: 5,
    addresses: {
      ...governanceContracts,
    },
  };
  const schemaAddresses = JSON.stringify(addressesJson, null, 2);

  console.log("goerli.addresses.json", schemaAddresses);
  fs.writeFileSync("./src/addresses/goerli.addresses.json", schemaAddresses);
}
