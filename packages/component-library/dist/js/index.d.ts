import { ReactElement, ReactNode } from "react";
interface ButtonProps {
    children: string | ReactElement;
    onClick: () => any;
}
export function Button({ children, onClick }: ButtonProps): ReactElement;
interface ToastProps {
    message: string;
}
export function Toast({ message }: ToastProps): ReactElement;
interface NavbarProps {
    children?: ReactNode;
}
export function Navbar({ children }: NavbarProps): ReactElement;
interface CardProps {
    children: string | ReactElement;
}
export function Card({ children }: CardProps): ReactElement;

//# sourceMappingURL=index.d.ts.map
