import versionJson from "version.output.json";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect } from "react";

export function useClearLocalStorageOnNewVersion(): void {
  const elfLocalStorage = useLocalStorage();
  useEffect(() => {
    const lastVersion = elfLocalStorage.getItem("app-version");
    if (lastVersion !== versionJson.version) {
      const styles = [
        "background: #ffff00",
        "color: black",
        "display: block",
        "line-height: 40px",
        "text-align: center",
        "font-weight: bold",
        "font-size: 24px",
      ].join(";");

      // eslint-disable-next-line no-console
      console.log(
        "%c🤘 New app version detected, clearing local storage 🤘",
        styles,
      );
      elfLocalStorage.clear();
      elfLocalStorage.setItem("app-version", versionJson.version);
    }
  }, [elfLocalStorage]);
}
