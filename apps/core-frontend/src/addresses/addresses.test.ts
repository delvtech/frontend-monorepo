import { AddressesJson, lookupAddressKey } from "addresses/addresses";

describe("AddressesJson", () => {
  test("should be the correct mock address file", () => {
    const mockChainId = 31337;

    expect(AddressesJson.chainId).toEqual(mockChainId);
  });
});

describe("lookupAddressKey", () => {
  test("when given a valid address should return the corresponding name/key of that address", () => {
    const mockWethAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    expect(lookupAddressKey(mockWethAddress)).toEqual("wethAddress");
  });

  test("when given an invalid address should return undefined", () => {
    const mockAddress = "0x5FbDB2315678afecb367f032d93F642f64180000";

    expect(lookupAddressKey(mockAddress)).toEqual(undefined);
  });
});
