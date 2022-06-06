import { QueryObserverResult } from "react-query";

export function getQueryCombinedIdleState<T = unknown>(
  queryResults: QueryObserverResult<T>[],
): boolean {
  return queryResults.every(({ isIdle }) => isIdle);
}
