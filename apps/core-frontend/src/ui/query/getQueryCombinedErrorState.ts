import { QueryObserverResult } from "react-query";

export function getQueryCombinedErrorState(
  queryResults: QueryObserverResult<unknown>[],
): boolean {
  return queryResults.some(({ isError }) => isError);
}
