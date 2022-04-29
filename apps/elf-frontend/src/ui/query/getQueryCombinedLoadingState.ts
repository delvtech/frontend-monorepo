import { QueryObserverResult } from "react-query";

export function getQueryCombinedLoadingState(
  queryResults: QueryObserverResult<unknown>[],
): boolean {
  return queryResults.some(({ isLoading }) => isLoading);
}
