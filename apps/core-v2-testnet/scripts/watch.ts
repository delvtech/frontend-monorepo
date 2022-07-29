import {
  mine,
  SnapshotRestorer,
  takeSnapshot,
} from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

import prompts from "prompts";

const crankedFunction = (func: () => any) =>
  (async function fn() {
    await func();
    fn();
  })();

async function main() {
  const provider = ethers.provider;
  const stack: SnapshotRestorer[] = [];
  // let latestBlockNumber;

  provider.on("block", async (block: number) => {
    const snapshot = await takeSnapshot();
    stack.push(snapshot);
    // latestBlockNumber = block;
  });

  await mine(2);

  await crankedFunction(ask);
}

const ask = async () => {
  const response = await prompts(
    {
      type: "number",
      name: "blocknumber",
      message: "how many blocks to reverse?",
      // validate: (value) => value > latestBlockNumber,
    },
    {
      onCancel: () => {
        console.log("trying to cancel");
        process.exit(0);
      },
    },
  );

  console.log(response);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
