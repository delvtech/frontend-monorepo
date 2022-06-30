import { ReactElement } from "react";
interface ButtonProps {
    children: string | ReactElement;
    onClick: () => any;
}
export function Button({ children, onClick }: ButtonProps): ReactElement;
interface ToastProps {
    message: string;
}
export function Toast({ message }: ToastProps): ReactElement;

//# sourceMappingURL=index.d.ts.map
