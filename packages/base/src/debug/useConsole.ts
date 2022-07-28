import { useEffect } from "react";
import { usePrevious } from "react-use";

import isEqual from "lodash.isequal";

/**
 * Hook to only console.log when the inputs to console.log change.
 * @param consoleArgs arguments to console.log
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useConsole(...consoleArgs: any): void {
  const previousArgs = usePrevious(consoleArgs);
  const changed = isEqual(previousArgs, consoleArgs);
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(...consoleArgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changed]);
}
