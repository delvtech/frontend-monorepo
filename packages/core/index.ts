import { Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { principalTokenInfos } from "core/tranche/tranches";
import {
  TestYVault__factory,
  Tranche__factory,
} from "@elementfi/core-typechain/dist/v1.1";
import { assetProxyTokenInfos } from "core/tranche/positions";
import { TestYVault, Tranche } from "@elementfi/core-typechain/dist/v1";
import {
  CurveContract,
  CurveContract__factory,
  CurveStethPool__factory,
} from "@elementfi/core-typechain/dist/libraries";
import { AddressesJson } from "core/addresses/addresses";
import { CRVLUSD__factory } from "@elementfi/core-typechain/dist/libraries/factories/CRVLUSD__factory";
type CoreContractsResult<T extends Contract> = Record<string, T>;

const {
  addresses: {
    "alusd3crv-fAddress": crvalusdAddress,
    "lusd3crv-fAddress": crvlusdAddress,
    "mim-3lp3crv-fAddress": crvMimAddress,
    eurscrvAddress,
  },
} = AddressesJson;

interface CoreContracts {
  "0xD51a44d3FaE010294C616388b506AcdA1bfAAE46": CurveContract;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function initCore(provider: Provider) {
  // TODO: Add v1 tranches
  let trancheV1_1Entries: Record<string, Tranche> = {};
  principalTokenInfos.forEach(({ address }) => {
    const entry = makeEntry(address, Tranche__factory, provider);
    trancheV1_1Entries = { ...trancheV1_1Entries, ...entry };
  });

  let vaultEntries: Record<string, TestYVault> = {};

  const vaultAddresses = assetProxyTokenInfos.map(
    ({ extensions: { vault } }) => vault,
  );

  type VaultContracts = { [T in keyof typeof vaultAddresses]: any };
  const vaultContractAddresses = assetProxyTokenInfos.map(
    ({ extensions: { vault } }) => {
      return vault;
    },
  );
  assetProxyTokenInfos.forEach(({ extensions: { vault } }) => {
    const entry = makeEntry(vault, TestYVault__factory, provider);
    vaultEntries = { ...vaultEntries, ...entry };
  });

  const crvTriCryptoPoolEntry = makeEntry(
    "0xD51a44d3FaE010294C616388b506AcdA1bfAAE46" as const,
    CurveContract__factory,
    provider,
  );

  const crv3CryptoPoolEntry = makeEntry(
    "0xD51a44d3FaE010294C616388b506AcdA1bfAAE46",
    CurveContract__factory,
    provider,
  );

  const steCrvPoolEntry = makeEntry(
    "0xDC24316b9AE028F1497c275EB9192a3Ea0f67022",
    CurveStethPool__factory,
    provider,
  );

  const crvalusdEntry = makeEntry(crvalusdAddress, CRVLUSD__factory, provider);
  const crvlusdEntry = makeEntry(crvlusdAddress, CRVLUSD__factory, provider);
  const crvmimEntry = makeEntry(crvMimAddress, CRVLUSD__factory, provider);
  const eurscrvEntry = makeEntry(eurscrvAddress, CRVLUSD__factory, provider);

  const allEntries = {
    ...trancheV1_1Entries,
    ...vaultEntries,
    ...crv3CryptoPoolEntry,
    ...crvTriCryptoPoolEntry,
    ...steCrvPoolEntry,
    ...crvalusdEntry,
    ...crvlusdEntry,
    ...crvmimEntry,
    ...eurscrvEntry,
  };

  return allEntries;
}

function makeEntry<T extends { connect: (...args: any) => any }>(
  address: string,
  factory: T,
  provider: Provider,
): Record<string, ReturnType<T["connect"]>> {
  return { [address]: factory.connect(address, provider) };
}
