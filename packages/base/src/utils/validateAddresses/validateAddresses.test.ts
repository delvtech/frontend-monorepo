import { validateAddresses } from "@elementfi/base/src/utils/validateAddresses/validateAddresses";

describe("validate addresses", () => {
  test("when given an empty string[] should return an empty string[] ", () => {
    expect(validateAddresses([])).toEqual([]);
  });

  test("should throw error when at least one value is not an address", () => {
    const addresses = [
      "0x6A564bC8fC36C7b1d8003459B9eA7c2c3E539790",
      "0xe41BAed315b3aFCFbb041df70deE1bdCD56a25Ad",
      "0x6Ae2cFBD87D50e5d505a",
    ];

    expect(validateAddresses(addresses)).toThrow();
  });
});
