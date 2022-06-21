import { Delegate } from "@elementfi/council-delegates";
import { delegates } from "src/delegates/delegates";

export function getFeaturedDelegate(
  delegateAddress: string,
): Delegate | undefined {
  const featuredDelegate = delegates.find(
    ({ address }) => delegateAddress === address,
  );

  return featuredDelegate;
}
