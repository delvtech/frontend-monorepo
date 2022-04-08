import { QueryObserverResult } from "react-query";

export function getQueryData<T>(
  queryResult: QueryObserverResult<T>,
): T | undefined {
  return queryResult.data;
}

export function getQueriesData<T>(
  queryResults: QueryObserverResult<T>[],
): (T | undefined)[] {
  return queryResults.map((result) => getQueryData(result));
}
