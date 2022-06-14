import React, { ReactElement } from "react";

export function OverviewPage(): ReactElement {
  return (
    <div className="daisy-hero min-h-screen bg-base-200">
      <div className="daisy-hero-content text-center">
        <div>
          <h1 className="text-5xl font-bold">
            Connect your wallet to continue
          </h1>
          <p className="py-6"></p>
          <button className="daisy-btn daisy-btn-primary">
            Connect wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
