import { ReactElement, ReactNode } from "react";

import classNames from "classnames";
import { Intent } from "src/ui/base/Intent";

interface TagProps {
  intent?: Intent;
  className?: string;
  children?: ReactNode;
}

const intentTextColors: Record<Intent, string> = {
  [Intent.WARNING]: classNames("text-orange"),
  [Intent.PRIMARY]: classNames("text-principalRoyalBlue"),
  [Intent.PRIMARY_SOLID]: classNames("text-white"),
  [Intent.SUCCESS]: classNames("text-statusGreen"),
  [Intent.ERROR]: classNames("text-deepRed"),
  [Intent.BLANK]: classNames("text-principalRoyalBlue"),
};

const intentBackgroundColors: Record<Intent, string> = {
  [Intent.WARNING]: classNames("bg-lightOrange"),
  [Intent.PRIMARY]: classNames("bg-hackerSky"),
  [Intent.PRIMARY_SOLID]: classNames("bg-principalRoyalBlue"),
  [Intent.SUCCESS]: classNames("bg-votingGreen"),
  [Intent.ERROR]: classNames("bg-statusRed"),
  [Intent.BLANK]: classNames("bg-white"),
};
export function Tag({
  intent = Intent.PRIMARY,
  className,
  children,
}: TagProps): ReactElement {
  return (
    <span
      className={classNames(
        className,
        "inline-flex items-center justify-center rounded-xl px-2 py-3 text-sm font-medium md:px-4",
        intentTextColors[intent],
        intentBackgroundColors[intent],
      )}
    >
      {children}
    </span>
  );
}
