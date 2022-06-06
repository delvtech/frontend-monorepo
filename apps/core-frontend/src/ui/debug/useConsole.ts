import { useEffect } from "react";
import { usePrevious } from "react-use";

import isEqual from "lodash.isequal";

/* eslint-disable */
/**
 * Hook to only console.log when the inputs to console.log change.
 * @param consoleArgs arguments to console.log
 */
export function useConsole(...consoleArgs: any) {
  const previousArgs = usePrevious(consoleArgs);
  const changed = isEqual(previousArgs, consoleArgs);
  useEffect(() => {
    console.log(...consoleArgs);
  }, [changed]);
}
/* eslint-enable */
