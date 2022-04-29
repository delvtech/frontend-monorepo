import {
  mapETHSentinalToWETH,
  mapWETHToETHSentinal,
} from "elf/balancer/balancer";
import { BALANCER_ETH_SENTINEL } from "integrations/balancer/ethSentinel";

import AddressesJsonFileMock from "addresses/mock.addresses.json";

describe("mapETHSentinalToWETH", () => {
  test("when given the BALANCER_ETH_SENTINEL should return the mock wethAddress", () => {
    const wethAddress = AddressesJsonFileMock.addresses.wethAddress;

    expect(mapETHSentinalToWETH(BALANCER_ETH_SENTINEL)).toEqual(wethAddress);
  });

  test("when given a random address should return back that address", () => {
    const randomAddress = "0x0165878a594ca255338adfa4d48449f69242eb8f";

    expect(mapETHSentinalToWETH(randomAddress)).toEqual(randomAddress);
  });
});

describe("mapWETHToETHSentinal", () => {
  test("when given an address that matches the mock weth address should return back the BALANCER_ETH_SENTINEL", () => {
    const wethAddress = AddressesJsonFileMock.addresses.wethAddress;

    expect(mapWETHToETHSentinal(wethAddress)).toEqual(BALANCER_ETH_SENTINEL);
  });

  test("when given an address that DOESN'T match the mock weth address should return back that address", () => {
    const randomAddress = "0x0165878a594ca255338adfa4d48449f69242eb8f";

    expect(mapWETHToETHSentinal(randomAddress)).toEqual(randomAddress);
  });
});
