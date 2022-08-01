import {
  SnapshotRestorer,
  takeSnapshot,
} from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import prompts from "prompts";

// util function to make a function recursive
const forever = (func: () => void) =>
  (async function fn() {
    await func();
    fn();
  })();

async function main() {
  const provider = ethers.provider;

  // stack to store snapshots
  let stack: SnapshotRestorer[] = [];

  // register event listener to new blocks
  provider.on("block", async (block: number) => {
    const snapshot = await takeSnapshot();
    stack.push(snapshot);
  });

  await forever(async () => {
    const response = await prompts(
      {
        type: "number",
        name: "block",
        message: "how many blocks to reverse?",
        validate: (value) => value >= 0,
      },
      {
        onCancel: () => process.exit(0),
      },
    );

    const block = +response.block;
    if (block) {
      const i = stack.length - block;
      const snapshot = stack[i];

      if (snapshot) {
        await snapshot.restore();
        // remove any snapshots more recent blocks
        stack = stack.slice(0, i);
        console.log(
          `Successfully reverted ${block} blocks. The new current block number is ${await provider.getBlockNumber()}`,
        );
      }
    }
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
