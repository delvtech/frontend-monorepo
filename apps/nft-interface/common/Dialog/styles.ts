import { COLORS } from "helpers/colorPalette";
import styled from "styled-components";
import { EaseInTransition } from "styles/globalStyles";

export const DialogTitle = styled.div`
  color: ${COLORS.white};
  font-size: 18px;
  font-family: "Defcon Zero";
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const DialogBodyText = styled.div`
  margin-top: 11px;
  padding: 15px;
  font-size: 14px;
  font-family: Rubik;
  color: ${COLORS.white};
`;

export interface StyledDialogProps {
  isOpen?: boolean;
}

export const DialogContainer = styled(EaseInTransition)<StyledDialogProps>`
  z-index: 50;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
`;

export const Card = styled(EaseInTransition)`
  position: relative;
  z-index: 51;
  top: 25%;
  background: ${COLORS.blackDark};
  border: 1px solid ${COLORS.greenLight};
  color: white;
  height: auto;
  margin: 0 auto;
  max-width: 500px;
  padding: 10px;
`;
