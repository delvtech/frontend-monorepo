import { ReactElement } from "react";
import { assertNever } from "@elementfi/base/utils/assertNever";
import {
  ThumbDownIcon,
  ThumbUpIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

import { Intent } from "src/ui/base/Intent";
import { Tag } from "src/ui/base/Tag/Tag";
import { Ballot } from "src/ui/voting/Ballot";

interface BallotLabelProps {
  ballot: Ballot;
}

export function BallotLabel({ ballot }: BallotLabelProps): ReactElement | null {
  switch (ballot) {
    case Ballot.YES:
      return (
        <Tag intent={Intent.SUCCESS}>
          <ThumbUpIcon height="18" className={"mr-1 pb-0.5 text-green-700"} />
          <span className={"font-bold text-green-700"}>{t`Yes`}</span>
        </Tag>
      );
    case Ballot.NO:
      return (
        <Tag intent={Intent.ERROR}>
          <ThumbDownIcon height="18" className={"mr-1 pb-0.5 text-red-500"} />
          <span className={"font-bold text-red-500"}>{t`No`}</span>
        </Tag>
      );
    case Ballot.MAYBE:
      return (
        <Tag>
          <XCircleIcon height="18" className={"mr-1 pb-0.5 "} />
          <span className={"font-bold"}>{t`Abstain`}</span>
        </Tag>
      );
    default:
      assertNever(ballot);
      return null;
  }
}
