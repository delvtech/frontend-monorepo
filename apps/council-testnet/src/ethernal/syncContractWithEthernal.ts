import { HardhatRuntimeEnvironment } from "hardhat/types";

const sync = Boolean(process.env.SYNC_ETHERNAL);
export async function syncContractWithEthernal(
  hre: HardhatRuntimeEnvironment,
  name: string,
  address: string,
): Promise<void> {
  if (sync) {
    try {
      await hre.ethernal.push({
        name,
        address,
      });
    } catch (error) {
      if (isErrorWithMessage(error)) {
        console.log("error syncing contract to Ethernal, ", error.message);
      }
      console.log("error syncing contract to Ethernal");
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorWithMessage(error: any): error is ErrorWithMessage {
  return !!error?.message;
}

interface ErrorWithMessage {
  message: string;
}
