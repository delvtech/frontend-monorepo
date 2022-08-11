import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chains } from "src/provider";

export const { connectors } = getDefaultWallets({
  appName: "Element Finance Council Frontend",
  chains,
});
