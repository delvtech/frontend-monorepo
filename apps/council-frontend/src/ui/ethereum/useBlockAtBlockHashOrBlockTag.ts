import { QueryObserverResult, useQuery } from "react-query";
import { Block } from "@ethersproject/providers";
import { defaultProvider } from "src/elf/providers/providers";

export function useBlockAtBlockHashOrBlockTag(
  blockHashOrBlockTag: string | number,
): QueryObserverResult<Block> {
  return useQuery({
    queryFn: async () => {
      const block = defaultProvider.getBlock(blockHashOrBlockTag);
      return block;
    },
    queryKey: ["ethereum-block", blockHashOrBlockTag],
  });
}
