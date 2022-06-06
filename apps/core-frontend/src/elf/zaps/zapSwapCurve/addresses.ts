import { USER_PROXY_ETH_SENTINEL } from "elf/userProxy/address";

// Addresses of mainnet assets available for zapping that do not already exist
// in `*.addresses.json`.
export const MainnetExtraAddresses = {
  lusdAddress: "0x5f98805A4E8be255a32880FDeC7F6728C6568bA0",
  threeCrvAddress: "0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490",
  usdtAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  alUsdAddress: "0xBC6DA0FE9aD5f3b0d58160288917AA56653660E9",
  mimAddress: "0x99D8a9C45b2ecA8864373A26D1459e3Dff1e17F3",
  stEthAddress: "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
  eursAddress: "0xdB25f211AB05b1c97D595516F45794528a807ad8",
  sEurAddress: "0xD71eCFF9342A5Ced620049e616c5035F1dB98620",
  ethAddress: USER_PROXY_ETH_SENTINEL, // SAME AS CURVE
};

export const ZapSwapCurveAddress = "0xb2d75b4c0c44e4144Fc8A4F41b2893ef684F3032";
