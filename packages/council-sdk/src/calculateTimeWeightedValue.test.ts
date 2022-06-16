import { ValueOverPeriod } from "src/ValueOverPeriod";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";

import { calculateTimeWeightedValue } from "./calculateTimeWeightedValue";

describe("calculateTimeWeightedValue", () => {
  it("Should time weight with no changes in value", async () => {
    const valueBlocks: ValueOverPeriod[] = [
      {
        value: BigInt(1),
        start: 0,
        end: 100,
      },
    ];
    const startBlock = 0;
    const endBlock = 100;

    const result = calculateTimeWeightedValue(
      valueBlocks,
      startBlock,
      endBlock,
    );

    expect(result).to.equal(BigInt(1));
  });
  it("Should time weight with one value change", async () => {
    const valueBlocks: ValueOverPeriod[] = [
      {
        value: BigInt(0),
        start: 0,
        end: 50,
      },
      {
        value: BigInt(2),
        start: 50,
        end: 100,
      },
    ];
    const startBlock = 0;
    const endBlock = 100;

    const result = calculateTimeWeightedValue(
      valueBlocks,
      startBlock,
      endBlock,
    );

    // value changes once from 0 to 2 in the middle of the period, the average should be half
    expect(result).to.equal(BigInt(1));
  });

  it("Should time weight with many value changes", async () => {
    const valueBlocks: ValueOverPeriod[] = [
      {
        value: BigInt(0),
        start: 0,
        end: 25,
      },
      {
        value: BigInt(10),
        start: 25,
        end: 50,
      },
      {
        value: BigInt(20),
        start: 50,
        end: 75,
      },
      {
        value: BigInt(30),
        start: 75,
        end: 100,
      },
    ];
    const startBlock = 0;
    const endBlock = 100;

    const result = calculateTimeWeightedValue(
      valueBlocks,
      startBlock,
      endBlock,
    );

    // the value increases by 10 each time, each period is 25s, the total period is 100s
    // (0 + 10 + 20 + 30) * 25 / 100 = 15
    expect(result).to.equal(BigInt(15));
  });

  it("Should time weight with more realistic values", async () => {
    const startBlock = 12345678;
    const ONE_DAY_IN_BLOCKS = 6496; // 86400 second / ~13.3 blocks/second
    const endBlock = startBlock + 4 * ONE_DAY_IN_BLOCKS;
    const ONE_ETH = BigInt(parseEther("1").toString());

    // add one ETH every day
    const valueBlocks: ValueOverPeriod[] = [
      {
        value: BigInt(0),
        start: startBlock,
        end: startBlock + ONE_DAY_IN_BLOCKS * 1,
      },
      {
        value: BigInt(1) * ONE_ETH,
        start: startBlock + ONE_DAY_IN_BLOCKS * 1,
        end: startBlock + ONE_DAY_IN_BLOCKS * 2,
      },
      {
        value: BigInt(2) * ONE_ETH,
        start: startBlock + ONE_DAY_IN_BLOCKS * 2,
        end: startBlock + ONE_DAY_IN_BLOCKS * 3,
      },
      {
        value: BigInt(3) * ONE_ETH,
        start: startBlock + ONE_DAY_IN_BLOCKS * 3,
        end: endBlock,
      },
    ];

    const result = calculateTimeWeightedValue(
      valueBlocks,
      startBlock,
      endBlock,
    );

    // the value increases by 1 ETH each time, each period is 1 day, the total period is 4 days
    // (0 + 1 + 2 + 3) * 1 day / 4 days = 1.5
    expect(formatEther(BigNumber.from(result.toString()))).to.equal("1.5");
  });
});
