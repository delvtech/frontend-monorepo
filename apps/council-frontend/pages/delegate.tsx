import React, { ReactElement } from "react";
import dynamic from "next/dynamic";
import PageView from "src/ui/app/PageView";

// SSR of DelegatePage breaks the page layout with usage of wagmi useAccount()
// TODO: Investigate further
const DelegatePageWithoutSSR = dynamic(
  () => import("src/ui/delegate/DelegatePage"),
  {
    ssr: false,
  },
);

export default function Delegates(): ReactElement {
  return (
    <PageView childrenContainerClassName={"w-full"}>
      <DelegatePageWithoutSSR />
    </PageView>
  );
}
