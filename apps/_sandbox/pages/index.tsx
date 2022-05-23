import React, { ReactElement } from "react";
import PageView from "src/ui/app/PageView";
export default function Home(): ReactElement {
  return (
    <PageView>
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-6xl">🧪</span>
      </div>
    </PageView>
  );
}
