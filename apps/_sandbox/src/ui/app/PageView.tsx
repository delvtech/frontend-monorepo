import React, { ReactElement, ReactNode } from "react";
import Header from "src/ui/app/Header";

interface PageViewProps {
  children?: ReactNode;
}

export default function PageView({ children }: PageViewProps): ReactElement {
  return (
    <>
      <Header className="fixed top-6 right-8" />
      {children}
    </>
  );
}
