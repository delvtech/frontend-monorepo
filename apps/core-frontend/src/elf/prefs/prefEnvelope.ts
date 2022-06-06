export interface PrefEnvelope<T> {
  pref: T;
  version: string;
}

const PREF_ENVELOPE_VERSION = "1.0.0";

/**
 * Use an envelope because JSON.stringify likes serializable objects and prefs
 * could be any data type.
 *
 * NOTE: Changing the shape of the PrefEnvelope might require a migration for
 * users who have persisted values.
 */
export function makePrefEnvelope<T>(pref: T): PrefEnvelope<T> {
  return { pref, version: PREF_ENVELOPE_VERSION };
}
