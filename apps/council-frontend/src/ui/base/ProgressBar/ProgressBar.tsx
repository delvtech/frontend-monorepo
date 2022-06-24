import { ReactElement } from "react";

interface ProgressBarProps {
  // value between 0 and 1
  progress: number;
  enableBar?: boolean;
  color?: string;
}
export function ProgressBar(props: ProgressBarProps): ReactElement {
  const { progress, enableBar, color } = props;

  const percentComplete = Math.min(Math.floor(progress * 100), 100);

  let barPosition = 0;
  if (progress > 1) {
    barPosition = Math.round(100 * (1 / progress));
  }

  return (
    <div className="relative h-3 w-full rounded-full bg-sky-300 bg-opacity-50 ">
      <div
        style={{ width: `${percentComplete}%` }}
        className={`h-full rounded-full text-center text-xs text-white ${
          color ?? "bg-sky-300"
        }`}
      ></div>
      {!!barPosition && enableBar && (
        <div
          style={{
            width: 3,
            height: "200%",
            left: `${barPosition}%`,
            top: "-50%",
          }}
          className="absolute top-0 h-full rounded border border-white bg-principalRoyalBlue"
        ></div>
      )}
    </div>
  );
}
