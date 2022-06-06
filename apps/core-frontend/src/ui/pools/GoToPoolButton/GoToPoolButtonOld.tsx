import { ReactElement } from "react";

import { Classes } from "@blueprintjs/core";
import Link from "next/link";
import classNames from "classnames";

import tw from "efi-tailwindcss-classnames";
import { PoolAction } from "ui/pools/hooks/usePoolViewPoolActionsPref/usePoolViewPoolActionsPref";

interface GoToPoolButtonProps {
  poolAddress: string;
  poolAction: PoolAction;
  label: string;

  small?: boolean;
  outlined?: boolean;
  fill?: boolean;
  className?: string;
}

export function GoToPoolButtonOld(props: GoToPoolButtonProps): ReactElement {
  const {
    poolAddress,
    poolAction,
    label,
    fill,
    outlined = false,
    small = false,
    className,
  } = props;

  // Note: Internal links should never be implemented as anchor tags, including
  // blueprint's AnchorButton. Instead, use the Link component from the router
  // so that the browser can still open links in new tabs, etc..  but just
  // clicking a link doesn't cause a full-page refresh (like with an anchor
  // tag).
  return (
    <Link href={`/pools/${poolAddress}?action=${poolAction}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className={classNames(
          Classes.BUTTON,
          Classes.MINIMAL,
          {
            [Classes.OUTLINED]: outlined,
            [Classes.SMALL]: small,
            [Classes.FILL]: fill,
          },
          Classes.INTENT_PRIMARY,
          className,
        )}
      >
        <div className={tw({ "p-2": !small, "p-0": small })}>{label}</div>
      </a>
    </Link>
  );
}
