import { Delegate, delegates } from "src/delegates/delegates";

export function getFeaturedDelegate(
  delegateAddress: string,
): Delegate | undefined {
  const featuredDelegate = delegates.find(
    ({ address }) => delegateAddress === address,
  );

  return featuredDelegate;
}
