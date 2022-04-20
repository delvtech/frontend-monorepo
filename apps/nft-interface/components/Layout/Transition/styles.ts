import { CSSProperties } from "react";
import { TransitionGroup, TransitionStatus } from "react-transition-group";
import styled from "styled-components";

const TIMEOUT = "350ms";

export const transitionStyles: Partial<
  Record<TransitionStatus, CSSProperties>
> = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `translateX(50px)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT} ease, transform ${TIMEOUT} ease`,
    opacity: 1,
    transform: `translateX(0px)`,
    animation: "blink .3s linear 2",
  },
  exiting: {
    transition: `opacity ${TIMEOUT} ease, transform ${TIMEOUT} ease`,
    opacity: 0,
    transform: `translateX(-50px)`,
  },
};

export const StyledTransitionGroup = styled(TransitionGroup)`
  position: relative;
`;
