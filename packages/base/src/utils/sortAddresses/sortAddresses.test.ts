import { sortAddresses } from "@elementfi/base";

describe("sortAddresses", () => {
  test("when given an empty string[] should return an empty string[] ", () => {
    expect(sortAddresses([])).toEqual([]);
  });

  test("when given valid addresses should return sorted addresses", () => {
    const addresses = ["c", "B", "a"];
    const sortedAddresses = ["a", "B", "c"];

    expect(sortAddresses(addresses)).toEqual(sortedAddresses);
  });
});
