import {
  mine,
  SnapshotRestorer,
  takeSnapshot,
} from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

import prompts from "prompts";

// cranked mode
const crankedFunction = (func: () => any) =>
  (async function fn() {
    await func();
    fn();
  })();

async function main() {
  const provider = ethers.provider;
  let stack: SnapshotRestorer[] = [];

  provider.on("block", async (block: number) => {
    const snapshot = await takeSnapshot();
    stack.push(snapshot);
  });

  await mine(2);

  await crankedFunction(async () => {
    const response = await prompts(
      {
        type: "number",
        name: "block",
        message: "how many blocks to reverse?",
        validate: (value) => value > -1,
      },
      {
        onCancel: () => {
          console.log("trying to cancel");
          process.exit(0);
        },
      },
    );

    const block = +response.block;
    if (block) {
      const i = stack.length - +block;
      const snapshot = stack[i];

      if (snapshot) {
        await snapshot.restore();
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
