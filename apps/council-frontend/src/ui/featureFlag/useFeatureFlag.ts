import { useLocalStorage } from "react-use";
import { FeatureFlag } from "src/featureFlags";

export function useFeatureFlag(flagKey: FeatureFlag): boolean {
  const [flag] = useLocalStorage(flagKey, false);
  return !!flag;
}
