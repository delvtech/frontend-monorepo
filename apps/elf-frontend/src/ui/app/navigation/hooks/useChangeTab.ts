import { useCallback } from "react";

import { useRouter } from "next/router";

import { Navigation } from "ui/app/navigation/navigation";

type ChangeTabFn = (tabId: Navigation) => void;

export function useChangeTab(): ChangeTabFn {
  const { push: navigate } = useRouter();
  return useCallback(
    (tabId: Navigation) => {
      navigate(`/${tabId}`);
    },
    [navigate],
  );
}
