import { ReactElement } from "react";

interface ToastProps {
  message: string;
}

export function Toast({ message }: ToastProps): ReactElement {
  return (
    <div className="daisy-alert max-w-md justify-center shadow-lg">
      <span>{message}</span>
    </div>
  );
}
