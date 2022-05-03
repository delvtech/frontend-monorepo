import { useSmartContractEvents } from "@elementfi/react-query-typechain";
import { gscVaultContract } from "src/elf/contracts";
import { useIsGSCMember } from "src/ui/gsc/useIsGSCMember";

export function useIsMemberKicked(account?: string | null): boolean {
  const { data: isMember } = useIsGSCMember(account);
  const { data: events } = useSmartContractEvents(gscVaultContract, "Kicked", {
    callArgs: [account as string],
    enabled: !!account,
  });

  if (isMember) {
    return false;
  }

  return !!events && events.length > 0;
}
