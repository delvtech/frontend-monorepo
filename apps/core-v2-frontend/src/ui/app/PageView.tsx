import classNames from "classnames";
import React, { Fragment, ReactElement, ReactNode } from "react";

interface PageViewProps {
  children?: ReactNode;
  childrenContainerClassName?: string;
}

export default function PageView(props: PageViewProps): ReactElement {
  const { children, childrenContainerClassName } = props;
  return (
    <Fragment>
      <div className="bg-appBackgroundLight min-h-screen">
        <div className="w-full p-6">
          <div className={classNames("mt-6", childrenContainerClassName)}>
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
