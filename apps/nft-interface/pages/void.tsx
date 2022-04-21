import { ReactElement } from "react";
import styled from "styled-components";

const StyledVoid = styled.div`
  min-height: 40vh;
`;

const Void = (): ReactElement => <StyledVoid />;

export default Void;
