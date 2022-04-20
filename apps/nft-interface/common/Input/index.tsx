import { useRef } from "react";
import { InputProps } from "helpers/types";
import { InputContainer } from "common/Input/styles";

export const Input: React.FC<InputProps> = ({ placeholder, onChange }) => {
  const inputRef = useRef<any>(null);

  return (
    <InputContainer onClick={() => inputRef.current.focus()}>
      <svg
        width="40"
        height="36"
        viewBox="0 0 40 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="15" cy="15" r="14.5" stroke="#F7FFF7" />
        <line
          x1="25.3089"
          y1="24.6068"
          x2="39.3089"
          y2="35.6068"
          stroke="#F7FFF7"
        />
      </svg>

      <input onChange={onChange} placeholder={placeholder} ref={inputRef} />
    </InputContainer>
  );
};
