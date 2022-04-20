/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";

export const handleCloseOutside = (
  ref: React.RefObject<HTMLInputElement>,
  handleClose?: () => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && handleClose) {
        if (!ref.current.contains(event.target)) {
          handleClose();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleClose]);
};
