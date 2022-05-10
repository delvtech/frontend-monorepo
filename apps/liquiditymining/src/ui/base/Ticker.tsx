import { ReactElement, useEffect, useState } from "react";
import { commify } from "ethers/lib/utils";

interface TickerProps {
  className?: string;
  value: number;
  decimals?: number;
  noCommas?: boolean;
}

export function Ticker({
  className,
  value,
  decimals,
  noCommas,
}: TickerProps): ReactElement {
  const fixedNumber = decimals ? value.toFixed(decimals) : value;
  const preppedValue = fixedNumber
    .toString()
    // remove trailing zeros after the decimal
    // .replace(/(\.0+|(\.\d*?)0+)$/, "$2");
    // remove trailing zeros after the first decimal (mimics commify's behavior)
    .replace(/(\.\d+?)0+$/, "$1");
  return (
    <span className={className}>
      <span className="inline-flex h-[1em] items-center overflow-hidden align-baseline">
        {Array.from(noCommas ? preppedValue : commify(preppedValue)).map(
          (char, i) =>
            isNaN(+char) ? char : <TickerNumber key={i} number={+char} />,
        )}
      </span>
    </span>
  );
}

interface TickerNumberProps {
  number: number;
}

function TickerNumber({ number }: TickerNumberProps) {
  // useEffect is used to ensure new digits are added at the 0 position
  // initially, then animated to their actual value instead of only animating
  // after changed.
  const [variableValue, setVariableValue] = useState<`${number}em`>("0em");
  useEffect(() => {
    setVariableValue(`${number}em`);
  }, [number]);

  return (
    <span
      className="inline-flex h-[1em] translate-y-[var(--ticker-number-value)] flex-col-reverse justify-start transition-transform duration-300"
      style={{ "--ticker-number-value": variableValue } as React.CSSProperties}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit, i) => (
        <span key={i} className={`inline-flex h-[1em] items-center`}>
          {digit}
        </span>
      ))}
    </span>
  );
}
