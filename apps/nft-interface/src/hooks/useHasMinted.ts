import { ethers } from "ethers";
import { NullableAddress } from "src/types";
import { useTransferEvents } from "./useTransferEvents";

// TODO @cashd: This needs to be refactored to check for the
// existence of a mintDate from useMintDate
export function useHasMinted(address?: NullableAddress): boolean {
  const { data: mintEvents } = useTransferEvents(
    ethers.constants.AddressZero,
    address,
    undefined,
    {
      enabled: !!address,
    },
  );

  return !!mintEvents && mintEvents.length > 0;
}
