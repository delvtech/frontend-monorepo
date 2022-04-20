import styled from "styled-components";
import { Flex } from "common/Container/styles";
import { COLOR_BLACK, COLOR_WHITE } from "helpers/colorPalette";

export const InputContainer = styled(Flex)`
  background-color: ${COLOR_BLACK};
  border: 1px solid ${COLOR_WHITE};
  max-width: 397px;
  width: 100%;
  height: 59px;
  padding: 1rem 1.25rem;

  svg {
    cursor: text;
  }

  input {
    transition: all 0.3s ease-in-out;
    width: 100%;
    font-size: 18px;
    font-family: "Defcon Zero";
    color: ${COLOR_WHITE};
    background-color: ${COLOR_BLACK};
    margin-left: auto;
    max-width: max-content;

    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${COLOR_WHITE};
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: ${COLOR_WHITE};
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: ${COLOR_WHITE};
    }

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;
