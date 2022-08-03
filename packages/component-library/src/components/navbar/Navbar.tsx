import { ReactElement, ReactNode } from "react";

interface NavbarProps {
  children?: ReactNode;
}

export function Navbar({ children }: NavbarProps): ReactElement {
  return <div className="daisy-navbar bg-base-100">{children}</div>;
}
