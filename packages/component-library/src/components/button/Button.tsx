import { ReactElement } from "react";

interface ButtonProps {
  children: string | ReactElement;
  onClick: () => any;
}

export function Button({ children, onClick }: ButtonProps): ReactElement {
  return (
    <button
      className="daisy-btn daisy-btn-outline daisy-btn-info"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
