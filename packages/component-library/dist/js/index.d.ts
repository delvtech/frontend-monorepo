import { ReactElement, ReactNode } from "react";
export type Variant = "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error";
interface ButtonProps {
    children: string | ReactElement;
    variant?: Extract<Variant, "accent" | "info" | "success" | "warning" | "error">;
    size?: "normal" | "small";
    outline?: boolean;
    onClick: () => any;
}
export function Button({ children, variant, size, outline, onClick, }: ButtonProps): ReactElement;
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
