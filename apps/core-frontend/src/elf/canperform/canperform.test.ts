import { canPerformJson } from "elf/canperform/canperform";

test("should correctly import the correct test canPerformJson file", () => {
  const mockChainId = 31337;

  expect(canPerformJson.chainId).toEqual(mockChainId);
});
