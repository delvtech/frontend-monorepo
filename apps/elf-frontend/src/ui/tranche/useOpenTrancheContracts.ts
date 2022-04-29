import { Tranche } from "@elementfi/core-typechain/dist/v1";
import { useOpenPrincipalTokenInfos } from "ui/tranche/useOpenPrincipalTokenInfos";
import { trancheContractsByAddress } from "elf/tranche/tranches";

export function useOpenTrancheContracts(): Tranche[] {
  const openPrincipalTokenInfos = useOpenPrincipalTokenInfos();
  const openTrancheContracts = openPrincipalTokenInfos.map(
    ({ address }) => trancheContractsByAddress[address],
  );
  return openTrancheContracts;
}
