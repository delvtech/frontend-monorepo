import {
  mine,
  SnapshotRestorer,
  takeSnapshot,
} from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

import prompts from "prompts";

async function main() {
  const provider = ethers.provider;
  const stack: SnapshotRestorer[] = [];

  provider.on("block", async () => {
    //console.log("here", blockNumber);
    const snapshot = await takeSnapshot();
    stack.push(snapshot);
    //console.log(stack);
  });

  await mine(2);

  const ask = async () => {
    const response = await prompts(
      {
        type: "number",
        name: "value",
        message: "how many blocks to reverse?",
        validate: (value) => (value < 18 ? `Nightclub is 18+ only` : true),
      },
      {
        onCancel: () => {
          console.log("trying to cancel");
          //process.exit(0);
        },
      },
    );

    console.log(response); // => { value: 24 }
    // if (response !== false) {
    ask();
    // }
  };

  // while (!isRunning) {
  //   await ask();
  // }

  await ask();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
