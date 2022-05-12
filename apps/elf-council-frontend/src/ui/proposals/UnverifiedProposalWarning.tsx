import { ReactElement } from "react";
import { ShieldExclamationIcon } from "@heroicons/react/solid";
import { t } from "ttag";

export function UnverifiedProposalWarning(): ReactElement {
  return (
    <div className="grid h-full place-items-center py-2 px-4">
      <div className="flex flex-col items-center justify-center">
        <ShieldExclamationIcon className="text-goldYellow mb-2 w-10" />
        <p className="w-4/5 text-center font-bold leading-5 text-white">
          <span className="mb-2 block">{t`WARNING: This proposal has not been${"\u00A0"}verified!`}</span>
          <span className="block">
            {t`It may contain malicious
          code, please check the forums or Discord for guidance on how to vote
          on this${"\u00A0"}proposal.`}
          </span>
        </p>
      </div>
    </div>
  );
}
