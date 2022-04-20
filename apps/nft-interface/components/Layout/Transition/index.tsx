import { Transition as ReactTransition } from "react-transition-group";
import { TransitionProps } from "helpers/types";
import {
  transitionStyles,
  StyledTransitionGroup,
} from "components/Layout/Transition/styles";

const TIMEOUT = 350;

export const Transition: React.FC<TransitionProps> = ({
  children,
  location,
}) => {
  return (
    <StyledTransitionGroup>
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <div
            style={{
              ...transitionStyles[status],
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </StyledTransitionGroup>
  );
};
