import { pedersenHash, toHex } from "zkp-merkle-airdrop-lib";
import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { PrivateAirdrop } from "@elementfi/council-typechain";
import isValidKeyOrSecret from "./isValidKeyOrSecret";

export default function useAlreadyClaimed(
  key: string | undefined,
  contract: PrivateAirdrop | undefined,
): boolean | undefined {
  const { data: alreadyClaimed } = useSmartContractReadCall(
    contract,
    "nullifierSpent",
    {
      callArgs: isValidKeyOrSecret(key)
        ? [toHex(pedersenHash(BigInt(key as string)))]
        : [""],
      enabled: isValidKeyOrSecret(key),
    },
  );

  return alreadyClaimed;
}
