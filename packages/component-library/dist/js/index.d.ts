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
    children: string | ReactNode;
}
export function Card({ children }: CardProps): ReactElement;
export function CardTitle({ title, action, }: {
    title: string | ReactNode;
    action?: ReactNode;
}): ReactElement;

//# sourceMappingURL=index.d.ts.map
