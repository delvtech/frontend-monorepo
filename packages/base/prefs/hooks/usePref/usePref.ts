import { PrefEnvelope, makePrefEnvelope } from "base/prefs/prefEnvelope";
import { LocalStorage, useLocalStorage } from "base/localstorage/useLocalStorage";
import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";

interface PrefResult<T> {
  pref: T;
  setPref: (newPref: T) => void;
}

export function usePref<T>(id: string, defaultValue: T): PrefResult<T> {
  const efiLocalStorage = useLocalStorage();
  const getPrefFromLocalStorage = useGetPrefFromLocalStorage(efiLocalStorage);
  const queryClient = useQueryClient();
  const queryKey = usePrefQueryKey(id);

  const { data: prefEnvelope } = useQuery<PrefEnvelope<T>>({
    queryKey,
    queryFn: () => {
      return getPrefFromLocalStorage(id) ?? makePrefEnvelope(defaultValue);
    },
    initialData: () =>
      getPrefFromLocalStorage<T>(id) ?? makePrefEnvelope(defaultValue),
  });

  const setPref = useCallback(
    (newPref: T) => {
      // Use an envelope because JSON.stringify likes serializable objects and
      // prefs could be anything
      const prefEnvelope = makePrefEnvelope(newPref);
      efiLocalStorage.setItem(id, JSON.stringify(prefEnvelope));

      // Invalidate this pref so callers will re-ensure the data as needed
      queryClient.invalidateQueries(queryKey);
    },
    [id, queryClient, queryKey, efiLocalStorage]
  );

  return {
    pref: (prefEnvelope as PrefEnvelope<T>).pref, // safe to cast because initialData is set in useQuery
    setPref,
  };
}

function usePrefQueryKey(id: string) {
  const queryKey = useMemo(() => [["efi", "prefs"], { id }], [id]);
  return queryKey;
}

function useGetPrefFromLocalStorage(efiLocalStorage: LocalStorage) {
  return useCallback(
    function <T>(id: string): PrefEnvelope<T> | undefined {
      const prefString = efiLocalStorage.getItem(id);
      if (!prefString) {
        return;
      }

      const prefEnvelope: PrefEnvelope<T> = JSON.parse(prefString);
      return prefEnvelope;
    },
    [efiLocalStorage]
  );
}
