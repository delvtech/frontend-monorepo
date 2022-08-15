import { ReactElement, ReactNode } from "react";

interface CardProps {
  children: string | ReactNode;
}

export function Card({ children }: CardProps): ReactElement {
  return (
    <div className="daisy-card w-96 bg-neutral">
      <div className="daisy-card-body">{children}</div>
    </div>
  );
}

export function CardTitle({
  title,
  action,
}: {
  title: string | ReactNode;
  action?: ReactNode;
}): ReactElement {
  return (
    <h2 className="daisy-card-title justify-between">
      {title}
      {action}
    </h2>
  );
}
