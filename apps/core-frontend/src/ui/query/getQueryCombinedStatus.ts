import { QueryObserverResult, QueryStatus } from "react-query";

import { getQueryCombinedErrorState } from "ui/query/getQueryCombinedErrorState";
import { getQueryCombinedIdleState } from "ui/query/getQueryCombinedIdleState";
import { getQueryCombinedLoadingState } from "ui/query/getQueryCombinedLoadingState";
import { getQueryCombinedSuccessState } from "ui/query/getQueryCombinedSuccessState";

export function getQueryCombinedStatus(
  queryResults: QueryObserverResult<unknown>[],
): QueryStatus {
  const allIdle = getQueryCombinedIdleState(queryResults);
  const anyLoading = getQueryCombinedLoadingState(queryResults);
  const anyError = getQueryCombinedErrorState(queryResults);
  const allSuccess = getQueryCombinedSuccessState(queryResults);

  // initial condition, false as soon as anything changes status
  if (allIdle) {
    return "idle";
  }

  // takes higher precedence than error or success. if any item reloads, the entire state should be
  // considered loading
  if (anyLoading) {
    return "loading";
  }

  // we shouldn't set success if there are any errors
  if (anyError) {
    return "error";
  }

  // now ok to show success
  if (allSuccess) {
    return "success";
  }

  // should never get here, if we did then something with react-query broke
  return "error";
}
