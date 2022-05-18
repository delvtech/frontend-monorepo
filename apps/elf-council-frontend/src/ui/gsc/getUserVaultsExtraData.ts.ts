import { gscVaultContract } from "src/elf/contracts";

export const EMPTY_BYTE = "0x00";

export async function getUserVaultsExtraData(
  account: string,
): Promise<string[]> {
  const userVaults = await gscVaultContract.getUserVaults(account);
  // Stub out extra data since neither locking vault nor vesting vault use it
  const extraData = userVaults.map(() => EMPTY_BYTE);
  return extraData;
}
