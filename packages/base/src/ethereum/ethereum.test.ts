import { isGoerli, isLocalnet, isMainnet } from "@elementfi/base";

describe("isGoerli", () => {
  test("should return correct boolean", () => {
    expect(isGoerli(5)).toEqual(true);
    expect(isGoerli(31337)).toEqual(false);
  });
});

describe("isLocalnet", () => {
  test("should return correct boolean", () => {
    expect(isLocalnet(31337)).toEqual(true);
    expect(isLocalnet(1)).toEqual(false);
  });
});

describe("isMainnet", () => {
  test("should return correct boolean", () => {
    expect(isMainnet(1)).toEqual(true);
    expect(isMainnet(5)).toEqual(false);
  });
});
