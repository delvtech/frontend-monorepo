import { WithChildren } from "helpers/types";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { Card, DialogContainer, StyledDialogProps } from "./styles";

export interface DialogProps extends StyledDialogProps {
  onClose?: () => void;
}

export const Dialog: React.FC<WithChildren<DialogProps>> = ({
  children,
  isOpen,
  onClose,
}) => (
  <CSSTransition
    in={isOpen}
    classNames="ease-in"
    unmountOnExit
    timeout={{
      enter: 450,
      exit: 450,
    }}
  >
    <DialogContainer onClick={() => onClose && onClose()} isOpen={isOpen}>
      <Card onClick={(e) => e.stopPropagation()}>{children}</Card>
    </DialogContainer>
  </CSSTransition>
);
