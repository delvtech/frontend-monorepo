import CoreV2Page from "src/ui/overview/OverviewPage";
import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
export default function Home(): ReactElement {
  return (
    <PageView childrenContainerClassName="flex justify-center">
      <CoreV2Page />
    </PageView>
  );
}
