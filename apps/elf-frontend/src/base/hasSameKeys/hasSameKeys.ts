import conformsTo from "lodash.conformsto";
import mapValues from "lodash.mapvalues";

export function hasSameKeys<
  T1 extends Record<string, unknown>,
  T2 extends Record<string, unknown>,
>(doesThisObject: T1, matchThisObject: T2): boolean {
  const sourcePredicates = mapValues(
    matchThisObject,
    (_unusedValue, thisObjectKey) => () =>
      doesThisObject.hasOwnProperty(thisObjectKey),
  );
  const conforms = conformsTo(matchThisObject, sourcePredicates);
  return conforms;
}
