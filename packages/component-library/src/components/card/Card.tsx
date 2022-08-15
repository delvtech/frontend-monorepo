import { ReactElement } from "react";

interface CardProps {
  children: string | ReactElement;
}

export function Card({ children }: CardProps): ReactElement {
  return (
    <div className="daisy-card w-96 bg-neutral">
      <div className="daisy-card-body">{children}</div>
    </div>
  );
}
