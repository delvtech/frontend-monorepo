import { useQuery } from "react-query";

import { CanPerformJsonFile } from "canperform/CanPerformJsonFile";

import { ONE_MINUTE_IN_MILLISECONDS } from "base/time";
import {
  canPerformJson as canPerformJsonFromBuild,
  CAN_PERFORM_URL,
} from "elf/canperform/canperform";

export function useCanPerform(): CanPerformJsonFile {
  const { data: canPerformJson } = useQuery({
    queryKey: ["can-perform"],
    queryFn: async () => {
      // Don't try to fetch anything if we're testing locally
      if (process.env.NEXT_PUBLIC_CHAIN_NAME === "testnet") {
        return canPerformJsonFromBuild;
      }

      const result = await fetch(CAN_PERFORM_URL);
      const resultJSON = (await result.json()) as CanPerformJsonFile;
      return resultJSON;
    },

    refetchInterval: ONE_MINUTE_IN_MILLISECONDS,

    // this persists the json from the bundle to the queryCache
    initialData: canPerformJsonFromBuild,
  });

  // Safe to cast and return just the data because we'll always have `data`.
  return canPerformJson as CanPerformJsonFile;
}
