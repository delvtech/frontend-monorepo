import toast from "react-hot-toast";
import { t } from "ttag";

export function toastTransactionSubmitted(): void {
  toast.custom(
    <div className="daisy-alert max-w-md justify-center shadow-lg">
      <span>
        <span className="text-4xl">🧝‍♂️ 🪄</span> {t`Transaction submitted`}
      </span>
    </div>,
  );
}
