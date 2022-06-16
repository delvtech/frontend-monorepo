import toast from "react-hot-toast";
import { ToastOptions } from "react-hot-toast/dist/core/types";
import { COLORS } from "./colorPalette";

const toastStyleOptions: ToastOptions = {
  duration: 5000,
  position: "bottom-right",
  style: {
    borderRadius: 0,
    borderWidth: "1px",
    borderColor: COLORS.greenLight,
    backgroundColor: COLORS.black,
    color: COLORS.white,
    fontFamily: "Defcon Zero",
    fontSize: "14px",
  },
};

export const createToastError = (
  message?: string,
  options?: ToastOptions,
): string => {
  return toast.error(message ?? "Error", {
    ...options,
    ...toastStyleOptions,
  });
};

export const createToastSuccess = (
  message?: string,
  options?: ToastOptions,
): string => {
  return toast.success(message ?? "Success", {
    ...options,
    ...toastStyleOptions,
  });
};

export const createToastLoading = (
  message?: string,
  options?: ToastOptions,
): string => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { duration, ...restOptions } = toastStyleOptions;
  return toast.loading(message ?? "Loading", {
    ...options,
    ...restOptions,
  });
};
