import React, { ReactElement } from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";

import { t } from "ttag";
import { EligibilityState } from "src/ui/gsc/useGSCStatus";
import Tooltip from "src/ui/base/Tooltip/Tooltip";

interface GSCHistoryProps {
  status: EligibilityState;
}

function getGSCStatusText(status: EligibilityState): ReactElement {
  if (status === EligibilityState.Eligible) {
    return (
      <span className="w-max text-sm text-white">{t`Currently eligible to join the GSC!`}</span>
    );
  }

  if (status === EligibilityState.Current) {
    return (
      <span className="w-max text-sm text-white">{t`Currently in the GSC!`}</span>
    );
  }

  if (status === EligibilityState.Approaching) {
    return (
      <>
        <span className="mt-1 flex items-center">
          <span className="mr-1 w-max text-sm text-white underline">
            {t`Membership Warning`}
          </span>
          <Tooltip
            className="text-white"
            content={t`To learn more about our GSC program, its role within the Element DAO’s
            Governance, and how it affects your experience as a member read more
            here.`}
          >
            <InformationCircleIcon className="h-4 cursor-help" />
          </Tooltip>
        </span>
      </>
    );
  }

  if (status === EligibilityState.Expiring) {
    return (
      <>
        <span className="mt-1 flex items-center">
          <span className="mr-1 w-max text-sm text-white underline">
            {t`Membership Warning`}
          </span>
          <Tooltip
            className="text-white"
            content={t`You’re currently under the 110,000 ELFI delegation threshold for the
            Governance Steering Council (GSC). Please be advised this means that
            community members are permitted to remove you from the Council.`}
          >
            <InformationCircleIcon className="h-4 cursor-help" />
          </Tooltip>
        </span>
      </>
    );
  }

  if (status === EligibilityState.Kicked) {
    return (
      <>
        <span className="mt-1 flex items-center">
          <span className="mr-1 w-max text-sm text-white underline">
            {t`Previously removed from GSC.`}
          </span>
          <Tooltip
            className="text-white"
            content={t`You are currently no longer a member of the GSC as you have been
            removed. As you fell under 110,000 ELFI threshold the community
            chose to remove you from the Council. To appeal this decision please
            follow protocol you can read here to do so.`}
          >
            <InformationCircleIcon className="h-4 cursor-help" />
          </Tooltip>
        </span>
      </>
    );
  }

  return (
    <span className="w-max text-sm text-white">
      {t`Not eligible for the GSC.`}
    </span>
  );
}

export const GSCHistory = ({ status }: GSCHistoryProps): ReactElement => {
  return (
    <div className="rounded-lg bg-black bg-opacity-20 p-3">
      <div className="text-xl text-white">{t`GSC History`}</div>
      <div className="whitespace-nowrap">{getGSCStatusText(status)}</div>
    </div>
  );
};
