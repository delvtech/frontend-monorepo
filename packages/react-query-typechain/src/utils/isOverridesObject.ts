import { Overrides } from "ethers";
import isPlainObject from "lodash.isplainobject";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isOverridesObject(obj: any): obj is Overrides {
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
