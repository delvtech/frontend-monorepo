import { useCallback, useState } from "react";

interface BooleanState {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
}
/**
 * @param defaultState - Default state of the boolean, default: `false`
 */
export function useBoolean(defaultState = false): BooleanState {
  const [value, setValue] = useState(defaultState);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, setTrue, setFalse };
}
