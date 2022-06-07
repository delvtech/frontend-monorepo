import { useLocalStorage } from "react-use";
import { FeatureFlag } from "src/featureFlag/featureFlag";

export function useFeatureFlag(flagKey: FeatureFlag): boolean {
  const [flag] = useLocalStorage(flagKey, false);
  return !!flag;
}
