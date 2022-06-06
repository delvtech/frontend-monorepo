import React, { ReactElement } from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";

import { t } from "ttag";
import { EligibilityState } from "src/ui/gsc/useGSCStatus";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { commify, formatEther } from "ethers/lib/utils";
import { useGSCIdleDuration } from "./useGSCIdleDuration";
import { ONE_DAY_IN_SECONDS } from "src/base/time";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";

function getGSCStatusText(
  status: EligibilityState,
  formattedThreshold: string,
  formattedIdleDuration: number,
): ReactElement {
  if (status === EligibilityState.Eligible) {
    return (
      <>
        <span className="mt-1 flex items-center">
          <span className="text-md mr-1 w-max text-white">
            {t`Eligible to join GSC`}
          </span>
          <Tooltip className="text-white" content={<></>}>
            <InformationCircleIcon className="h-4 cursor-help" />
          </Tooltip>
        </span>
      </>
    );
  }

  if (status === EligibilityState.Idle) {
    return (
      <>
        <span className="mt-1 flex items-center">
          <span className="text-md mr-1 w-max text-white">
            {t`Current member of the GSC`}
          </span>
          <Tooltip
            className="text-white"
            content={t`You are currently in the idle state. New GSC members cannot vote for a period of
             ${formattedIdleDuration} days after joining the GSC.`}
          >
            <InformationCircleIcon className="h-4 cursor-help" />
          </Tooltip>
        </span>
      </>
    );
  }

  if (status === EligibilityState.Current) {
    return (
      <>
        <span className="mt-1 flex items-center">
          <span className="text-md mr-1 w-max text-white">
            {t`Current member of the GSC`}
          </span>
          <Tooltip
            className="text-white"
            content={
              <div>
                {t`To learn more about our GSC program, its role within the Element DAO’s
            Governance, and how it affects your experience as a member`}
                <ExternalLink
                  href="https://medium.com/element-finance/the-governance-steering-council-63aea7732262"
                  text="read more here"
                />
              </div>
            }
          >
            <InformationCircleIcon className="h-4 cursor-help" />
          </Tooltip>
        </span>
      </>
    );
  }

  if (status === EligibilityState.Approaching) {
    return (
      <>
        <span className="mt-1 flex items-center">
          <span className="text-md mr-1 w-max text-white">
            {t`Approaching eligibility`}
          </span>
          <Tooltip
            className="text-white"
            content={
              <div>
                {t`To learn more about our GSC program, its role within the Element DAO’s
                        Governance, and how it affects your experience as a member`}
                <ExternalLink
                  href="https://medium.com/element-finance/the-governance-steering-council-63aea7732262"
                  text="read more here"
                />
              </div>
            }
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
          <span className="text-md mr-1 w-max text-white">
            {t`Membership expiring`}
          </span>
          <Tooltip
            className="text-white"
            content={t`You’re currently under the ${formattedThreshold} ELFI delegation threshold for the
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
          <span className="text-md mr-1 w-max text-white">
            {t`Previously removed from GSC`}
          </span>
          <Tooltip
            className="text-white"
            content={
              <div>
                {t`You are currently no longer a member of the GSC as you have been
            removed. As you fell under ${formattedThreshold} ELFI threshold the community
            chose to remove you from the Council. To appeal this decision please
            follow protocol you can`}
                <ExternalLink
                  href="https://medium.com/element-finance/the-governance-steering-council-63aea7732262"
                  text="read more here"
                />
              </div>
            }
          >
            <InformationCircleIcon className="h-4 cursor-help" />
          </Tooltip>
        </span>
      </>
    );
  }

  return (
    <span className="text-md w-max text-white">
      {t`Not eligible for joining the GSC`}
    </span>
  );
}

interface GSCHistoryProps {
  status: EligibilityState;
  threshold: string;
}

export const GSCHistory = ({
  status,
  threshold,
}: GSCHistoryProps): ReactElement => {
  const formattedThreshold = commify(Math.round(+formatEther(threshold)));
  const { data: idleDuration = 0 } = useGSCIdleDuration();
  const formattedIdleDuration = Math.floor(idleDuration / ONE_DAY_IN_SECONDS);

  return (
    <div className="rounded-lg bg-black bg-opacity-20 p-3">
      <div className="text-xl font-bold text-white">{t`GSC Status`}</div>
      <div className="sm:whitespace-nowrap">
        {getGSCStatusText(status, formattedThreshold, formattedIdleDuration)}
      </div>
    </div>
  );
};
