import classNames from "classnames";
import dynamic from "next/dynamic";
import React, { ReactElement, ReactNode } from "react";

interface PageViewProps {
  children?: ReactNode;
  childrenContainerClassName?: string;
}
const HeaderWithoutSSR = dynamic(() => import("./Header"), {
  ssr: false,
});

export default function PageView(props: PageViewProps): ReactElement {
  const { children, childrenContainerClassName } = props;
  return (
    <div className="min-h-screen bg-base-200">
      <HeaderWithoutSSR />
      <div className="w-full p-6">
        <div className={classNames("mt-6", childrenContainerClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
