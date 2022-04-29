import { usePref } from "ui/prefs/usePref/usePref";

export enum PoolAction {
  REDEEM = "redeem",
  BUY = "buy",
  SELL = "sell",
  ADD_LIQUIDITY = "stake",
  REMOVE_LIQUIDITY = "unstake",
}
interface PoolActionsPref {
  tab: PoolAction;
  setTab: (tab: PoolAction) => void;
}

const POOL_VIEW_ACTION_TAB_PREF_ID = "poolview-action-tab";

export function usePoolViewPoolActionsTab(): PoolActionsPref {
  const { pref: tab, setPref: setTab } = usePref<PoolAction>(
    POOL_VIEW_ACTION_TAB_PREF_ID,
    PoolAction.BUY,
  );

  return {
    tab,
    setTab,
  };
}
