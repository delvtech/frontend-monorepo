import { calculateTokensOutForLPInFixed } from "elf/pools/calculateTokensOutForLPIn";

test("should return result with undefined values if inputs aren't finite values", () => {
  const lpIn = "1";
  const xReserves = "100";
  const yReserves = "100";
  const totalSupply = "100";
  const tokenDecimals = 18;

  const fnArgs: (string | number | undefined)[] = [
    lpIn,
    xReserves,
    yReserves,
    totalSupply,
    tokenDecimals,
  ];

  fnArgs.forEach((unusedArg, index) => {
    const args = [...fnArgs];
    args[index] = undefined;
    expect(
      calculateTokensOutForLPInFixed(
        ...(args as [string, string, string, string, number]),
      ),
    ).toEqual({
      xNeeded: undefined,
      yNeeded: undefined,
    });
  });
});

test("should return undefined if lpIn greater than total supply", () => {
  const lpIn = "101";
  const xReserves = "50";
  const yReserves = "50";
  const totalSupply = "100";
  const tokenDecimals = 18;

  const result = calculateTokensOutForLPInFixed(
    lpIn,
    xReserves,
    yReserves,
    totalSupply,
    tokenDecimals,
  );
  expect(result).toEqual({
    xNeeded: undefined,
    yNeeded: undefined,
  });
});
test("should return valid result for even reserves", () => {
  const lpIn = "10";
  const xReserves = "50";
  const yReserves = "50";
  const totalSupply = "100";
  const tokenDecimals = 18;

  const result = calculateTokensOutForLPInFixed(
    lpIn,
    xReserves,
    yReserves,
    totalSupply,
    tokenDecimals,
  );
  expect(result).toEqual({
    xNeeded: "5.0",
    yNeeded: "5.0",
  });
});

test("should return valid result for uneven reserves", () => {
  const lpIn = "10";
  const xReserves = "25";
  const yReserves = "75";
  const totalSupply = "100";
  const tokenDecimals = 18;

  const result = calculateTokensOutForLPInFixed(
    lpIn,
    xReserves,
    yReserves,
    totalSupply,
    tokenDecimals,
  );
  expect(result).toEqual({
    xNeeded: "2.5",
    yNeeded: "7.5",
  });
});

test("should return valid result for one sided reserves", () => {
  const lpIn = "10";
  const xReserves = "100";
  const yReserves = "0";
  const totalSupply = "100";
  const tokenDecimals = 18;

  const result = calculateTokensOutForLPInFixed(
    lpIn,
    xReserves,
    yReserves,
    totalSupply,
    tokenDecimals,
  );
  expect(result).toEqual({
    xNeeded: "10.0",
    yNeeded: "0.0",
  });
});
