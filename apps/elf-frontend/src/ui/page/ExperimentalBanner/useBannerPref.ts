import { useCallback } from "react";

import { usePref } from "ui/prefs/usePref/usePref";

interface ExperimentalBannerPref {
  bannerIsVisible: boolean;
  hideBanner: () => void;
}
const EXPERIMENTAL_BANNER_PREF_ID = "showExperimentalBanner";
export function useBannerPref(): ExperimentalBannerPref {
  const { pref: bannerIsVisible, setPref: setShowBanner } = usePref(
    EXPERIMENTAL_BANNER_PREF_ID,
    true,
  );

  const hideBanner = useCallback(() => setShowBanner(false), [setShowBanner]);

  return {
    bannerIsVisible,
    hideBanner,
  };
}
