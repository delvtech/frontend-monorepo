export interface StringProps {
  [name: string]: string | any;
}

export interface BurgerMenuProps {
  sidebarVisibility: boolean;
  changeSidebarVisibility: () => void;
  setSidebarVisibility?: (visibility: boolean) => void;
}

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  noUnderline?: boolean;
  onClick?: () => void;
}

export interface ContainerProps {
  children: React.ReactNode;
  textAlign?: string;
  hasOverflow?: boolean;
  padding?: string;
  id?: string;
  maxWidth?: string;
  justifyItems?: string;
}

export interface InputProps {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BurgerSidebarProps {
  open: boolean;
  children: React.ReactNode;
  handleClose: () => void;
}

export interface TransitionProps {
  children: React.ReactNode;
  location: string;
}

export interface Data {
  [key: string]: any;
}

export type WithChildren<T> = T & { children?: React.ReactNode };

export interface Formation {
  image: string;
  description: string;
  rarity: string;
}
