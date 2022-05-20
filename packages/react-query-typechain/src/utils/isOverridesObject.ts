import { Overrides } from "ethers";
import isPlainObject from "lodash.isplainobject";

export function isOverridesObject(obj: Record<any, any>): obj is Overrides {
  if (isPlainObject(obj)) {
    const overrides = obj as Overrides;
    if (
      "gasPrice" in overrides ||
      "gasLimit" in overrides ||
      "value" in overrides ||
      "nonce" in overrides
    ) {
      return true;
    }
  }
  return false;
}
