// TODO: Move these tests over to the elf-tokenlist repo as they're more upstream

import {
  getTokenInfo,
  tokenListJson,
  TokenMetadata,
} from "tokenlists/tokenlists";

describe("getTokenInfo", () => {
  test("when given an address should return the same token info from TokenMetadata", () => {
    const wethAddress = "0x0116686E2291dbd5e317F47faDBFb43B599786Ef";

    expect(getTokenInfo(wethAddress)).toEqual(TokenMetadata[wethAddress]);
  });
});

describe("tokenListJson", () => {
  test("should have chainIds of 31337", () => {
    const expectedChainId = 31337;

    expect(
      tokenListJson.tokens.every(
        (tokenInfo) => tokenInfo.chainId === expectedChainId,
      ),
    ).toEqual(true);
  });
});
