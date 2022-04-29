import { isBytes, isHexString } from "@ethersproject/bytes";
import { BigNumber, BigNumberish } from "ethers";

// importing @ethersproject/bignumber borks our github CI.  copied this from that project.
export function isBigNumberish(value: unknown): value is BigNumberish {
  return (
    value != null &&
    (BigNumber.isBigNumber(value) ||
      (typeof value === "number" && value % 1 === 0) ||
      (typeof value === "string" && !!value.match(/^-?[0-9]+$/)) ||
      isHexString(value) ||
      typeof value === "bigint" ||
      isBytes(value))
  );
}
