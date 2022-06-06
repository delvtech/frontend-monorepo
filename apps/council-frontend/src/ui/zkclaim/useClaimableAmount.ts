import { PrivateAirdrop } from "@elementfi/council-typechain";
import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { formatEther } from "@ethersproject/units";

export default function useClaimableAmount(
  contract: PrivateAirdrop | undefined,
): string {
  const { data: ClaimableAmount } = useSmartContractReadCall(
    contract,
    "amountPerRedemption",
    {
      enabled: !!contract,
    },
  );

  return formatEther(ClaimableAmount || 0).replace(/(\.\d{3}).+/, "$1");
}
