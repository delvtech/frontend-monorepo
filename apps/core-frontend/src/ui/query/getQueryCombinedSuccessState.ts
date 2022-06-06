import { QueryObserverResult } from "react-query";

export function getQueryCombinedSuccessState(
  queryResults: QueryObserverResult<unknown>[],
): boolean {
  return queryResults.every(({ isSuccess }) => isSuccess);
}
