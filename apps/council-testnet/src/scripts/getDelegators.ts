import fs from "fs";
import hre from "hardhat";
import { mainnetAddressList } from "@elementfi/elf-council-tokenlist";
import {
  LockingVault__factory,
  VestingVault__factory,
} from "@elementfi/council-typechain";

const STARTING_BLOCK_NUMBER = 14496292;
const MAX_WHITELIST = 10_000;

const oneAddress =
  "0x0000000000000000000000000000000000000000000000000000000000000001";

const { provider } = hre.ethers;
const { addresses } = mainnetAddressList;
const lockingVault = LockingVault__factory.connect(
  addresses.lockingVault,
  provider,
);
const vestingVault = VestingVault__factory.connect(
  addresses.vestingVault,
  provider,
);
export interface WhitelistData {
  address: string;
  block: number;
}

export async function getDelegators(): Promise<{
  whitelist: string[];
  whitelistData: WhitelistData[];
  blockNumbers: number[];
}> {
  // Filters for all vote change vents
  const lockingFilter = lockingVault.filters.VoteChange(null, null, null);
  const vestingFilter = vestingVault.filters.VoteChange(null, null, null);
  const latestBlock = await provider.getBlockNumber();
  console.log("STARTING_BLOCK_NUMBER", STARTING_BLOCK_NUMBER);
  console.log("latestBlock", latestBlock);

  // Query for events
  const lockingEvents = await lockingVault.queryFilter(lockingFilter);
  console.log("lockingEvents", lockingEvents.length);

  const vestingEvents = await vestingVault.queryFilter(vestingFilter);
  console.log("vestingEvents", vestingEvents.length);

  const blockNumbers: Array<number> = [];
  const whitelistSet: Set<string> = new Set();
  const lockingWhitelistSet: Set<string> = new Set();
  const vestingWhitelistSet: Set<string> = new Set();
  const whitelistData: Array<WhitelistData> = [];

  const allEvents = lockingEvents.concat(vestingEvents);
  console.log("allEvents", allEvents.length);
  console.log("");
  const sortedEvents = allEvents.sort(
    (eventA, eventB) => eventA.blockNumber - eventB.blockNumber,
  );

  vestingEvents.forEach((event) => {
    if (event.args) {
      const { from } = event.args;
      const { to } = event.args;
      const { amount } = event.args;

      if (to === oneAddress || from === oneAddress) {
        return;
      }

      if (!amount.eq(0) && whitelistSet.size < MAX_WHITELIST) {
        vestingWhitelistSet.add(from);
        whitelistData.push({ address: from, block: event.blockNumber });
        blockNumbers.push(event.blockNumber);
      }
    }
  });

  lockingEvents.forEach((event) => {
    if (event.args) {
      const { from } = event.args;
      const { to } = event.args;
      const { amount } = event.args;

      if (to === oneAddress || from === oneAddress) {
        return;
      }

      if (amount.gt(0) && whitelistSet.size < MAX_WHITELIST) {
        lockingWhitelistSet.add(from);
        whitelistData.push({ address: from, block: event.blockNumber });
        blockNumbers.push(event.blockNumber);
      }
    }
  });

  console.log(
    "locking vault whitelist",
    Array.from(lockingWhitelistSet.values()).length,
  );

  console.log(
    "vesting vault whitelist",
    Array.from(vestingWhitelistSet.values()).length,
  );

  // Add valid events to whitelist
  sortedEvents.forEach((event) => {
    if (event.args) {
      const { from } = event.args;
      const { to } = event.args;
      const { amount } = event.args;

      if (to === oneAddress || from === oneAddress) {
        return;
      }

      if (amount.gt(0) && whitelistSet.size < MAX_WHITELIST) {
        whitelistSet.add(from);
        whitelistData.push({ address: from, block: event.blockNumber });
        blockNumbers.push(event.blockNumber);
      }
    }
  });

  const whitelist = Array.from(whitelistSet.values());
  console.log({
    // whitelist,
    //     whitelistData,
    whitelistLength: whitelist.length,
    blockNumbers,
  });

  fs.writeFileSync("./whitelist.json", JSON.stringify({ whitelist }, null, 2));

  return {
    whitelist,
    whitelistData,
    blockNumbers,
  };
}

interface Error {
  message: string;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
getDelegators()
  .then(() => process.exit(0))
  .catch((error: Error) => {
    console.error(error);
    process.exit(1);
  });
