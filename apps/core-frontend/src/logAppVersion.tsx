import versionJson from "./version.output.json";
import { AddressesJson } from "addresses/addresses";

export function logAppVersion(): void {
  const { version, date } = versionJson;
  const versionUrl = `https://github.com/element-fi/elf-frontend/commit/${version}`;
  const unreleasedUrl = `https://github.com/element-fi/elf-frontend/compare/${version}...main`;

  // eslint-disable-next-line no-console
  console.log(`%cBuild date: ${date}`, "font-size:12px");
  // eslint-disable-next-line no-console
  console.log(`%cApp version: ${versionUrl}`, "font-size:12px");
  // eslint-disable-next-line no-console
  console.log(
    `%cContracts: ${JSON.stringify(AddressesJson, null, 2)}`,
    "font-size:12px",
  );
  // eslint-disable-next-line no-console
  console.log(`%cUnreleased commits: ${unreleasedUrl}`, "font-size:12px");
}
