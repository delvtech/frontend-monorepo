import { CanPerformTrancheActions } from "canperform/CanPerformJsonFile";
import { useCanPerform } from "ui/canperform/useCanPerform";

type TrancheAction = keyof Omit<CanPerformTrancheActions, "trancheAddress">;
export function useTrancheCanPerform(
  trancheAddress: string,
  action: TrancheAction,
): boolean {
  const {
    canPerform: { tranches },
  } = useCanPerform();

  const trancheCanPerform = tranches.find(
    (tranche) => tranche.trancheAddress === trancheAddress,
  );

  // If there's no canPerform entry for this tranche than assume it's not frozen
  if (!trancheCanPerform) {
    return true;
  }

  return !!trancheCanPerform[action];
}
