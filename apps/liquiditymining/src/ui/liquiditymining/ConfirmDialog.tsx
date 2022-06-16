import { PropsWithChildren, ReactElement, useState } from "react";
import SimpleDialog from "src/ui/base/Dialog/Dialog";
import { t } from "ttag";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import classNames from "classnames";
import { usePref } from "@elementfi/base/prefs/hooks/usePref/usePref";

interface CommonProps {
  className?: string;
  buttonText?: string;
  isOpen: boolean;
  onClose?: () => void;
  onConfirm: () => void;
}

interface DynamicProps {
  /**
   * The id to use for the user's preference on showing this confirmation again.
   */
  showAgainPrefId?: string;
}

type ComfirmDialogProps = CommonProps &
  (
    | ({ showAgain?: true } & DynamicProps)
    | ({ showAgain: false } & Required<DynamicProps>)
  );

export function ConfirmDialog({
  className,
  showAgain = true,
  showAgainPrefId = "",
  buttonText = "Got it",
  children,
  isOpen,
  onClose = () => {},
  onConfirm,
}: PropsWithChildren<ComfirmDialogProps>): ReactElement {
  const [dontShowAgain, setDontShowAgain] = useState(!showAgain);
  const { pref, setPref } = usePref(showAgainPrefId, true);
  const handleConfirm = () => {
    if (showAgainPrefId) {
      setPref(!dontShowAgain);
    }
    onClose();
    onConfirm();
  };
  if (pref === false) {
    if (isOpen) {
      onClose();
      onConfirm();
    }
    return <></>;
  } else {
    return (
      <SimpleDialog
        className={classNames("!pt-12", className)}
        showCloseIcon
        isOpen={isOpen}
        onClose={onClose}
      >
        {children}
        <Button
          className="mt-6 w-full justify-center"
          variant={ButtonVariant.GRADIENT}
          onClick={handleConfirm}
        >
          {t`${buttonText}`}
        </Button>
        {showAgainPrefId && (
          <label
            className="mt-5 -mb-2 flex items-center gap-2 text-gray-400"
            htmlFor={`show-again-pref-${showAgainPrefId}`}
          >
            <input
              type="checkbox"
              id={`show-again-pref-${showAgainPrefId}`}
              className="h-5 w-5 appearance-none rounded border-gray-300 text-brandDarkBlue-light"
              checked={dontShowAgain}
              onChange={({ target: { checked } }) => {
                setDontShowAgain(checked);
              }}
            />
            {t`Don't show this again`}
          </label>
        )}
      </SimpleDialog>
    );
  }
}
