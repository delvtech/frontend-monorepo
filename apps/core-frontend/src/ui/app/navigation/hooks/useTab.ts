import { useActiveTab } from "ui/app/navigation/hooks/useActiveTab";
import { useChangeTab } from "ui/app/navigation/hooks/useChangeTab";
import { Navigation } from "ui/app/navigation/navigation";

export interface UseTab {
  changeTab: (tabId: Navigation) => void;
  activeTab: Navigation;
}
export function useNavigation(): UseTab {
  const changeTab = useChangeTab();
  const activeTab = useActiveTab();

  return { changeTab, activeTab };
}
