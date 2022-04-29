import { useEffect, useRef } from "react";

export function useWhyDidYouUpdate(
  name: string,
  // has to be 'any' instead of 'unknown' otherwise you force the caller to cast the value.  not worth
  // it for this debug tool
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>,
): void {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef<Record<string, unknown>>();
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj: Record<string, unknown> = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        if (previousProps.current?.[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current?.[key],
            to: props[key],
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        // eslint-disable-next-line no-console
        console.log("[why-did-you-update]", name, changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}
