import { useLocation } from "react-use";

import { Navigation } from "ui/app/navigation/navigation";
import { typeAassertNever } from "base/typeAssertNever";

export function useActiveTab(): Navigation {
  const location = useLocation();
  const navigation = location?.pathname?.split("/")[1] as Navigation;

  switch (navigation) {
    case Navigation.HOME: {
      return Navigation.HOME;
    }
    case Navigation.POOLS: {
      return Navigation.POOLS;
    }
    case Navigation.PORTFOLIO: {
      return Navigation.PORTFOLIO;
    }
    case Navigation.MINT: {
      return Navigation.MINT;
    }
    case Navigation.FIXED_RATES: {
      return Navigation.FIXED_RATES;
    }
    case Navigation.STATS: {
      return Navigation.STATS;
    }

    default:
      typeAassertNever(navigation);
      return Navigation.HOME;
  }
}
