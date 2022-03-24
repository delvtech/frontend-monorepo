import LiquidityMiningPage from "src/ui/liquiditymining/LiquidityMiningPage";
import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
export default function Home(): ReactElement {
  return (
    <PageView childrenContainerClassName="flex justify-center">
      <LiquidityMiningPage />
    </PageView>
  );
}
