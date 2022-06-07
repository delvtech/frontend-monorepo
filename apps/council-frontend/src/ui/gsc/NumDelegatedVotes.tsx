import { ReactElement } from "react";
import classNames from "classnames";

import { formatBalance } from "src/base/formatBalance";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";

interface NumDelegatedVotesProps {
  account: string | undefined | null;
  highlightSelected: boolean;
  selected: boolean;
}

export function NumDelegatedVotes(props: NumDelegatedVotesProps): ReactElement {
  const { account, highlightSelected, selected } = props;
  const votePower = useVotingPowerForAccountAtLatestBlock(account);

  return (
    <div
      className={classNames(
        highlightSelected && selected ? "text-gray-400" : "text-blueGrey",
        "flex",
        "items-center",
      )}
    >
      <ElementIconCircle size={IconSize.SMALL} className="mr-1" />
      <span>{formatBalance(votePower)}</span>
    </div>
  );
}
