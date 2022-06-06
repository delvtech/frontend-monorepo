import { ERC20Permit__factory } from "@elementfi/core-typechain/dist/libraries/factories/ERC20Permit__factory";
import { ERC20__factory } from "@elementfi/core-typechain/dist/libraries/factories/ERC20__factory";
import { ZapSwapCurve__factory } from "@elementfi/core-typechain/dist/v1.1";
import { defaultProvider } from "elf/providers/providers";
import {
  MainnetExtraAddresses,
  ZapSwapCurveAddress,
} from "elf/zaps/zapSwapCurve/addresses";

const {
  lusdAddress,
  usdtAddress,
  threeCrvAddress,
  alUsdAddress,
  mimAddress,
  stEthAddress,
  eursAddress,
  sEurAddress,
} = MainnetExtraAddresses;

const lusdContract = ERC20Permit__factory.connect(lusdAddress, defaultProvider);
const usdtContract = ERC20__factory.connect(usdtAddress, defaultProvider);
const threeCrvContract = ERC20__factory.connect(
  threeCrvAddress,
  defaultProvider,
);
const alUsdContract = ERC20__factory.connect(alUsdAddress, defaultProvider);
const mimContract = ERC20__factory.connect(mimAddress, defaultProvider);
const stEthContract = ERC20__factory.connect(stEthAddress, defaultProvider);
const eursContract = ERC20__factory.connect(eursAddress, defaultProvider);
const sEurContract = ERC20__factory.connect(sEurAddress, defaultProvider);

export const MainnetZapContractsByAddress = Object.freeze({
  [lusdAddress]: lusdContract,
  [usdtAddress]: usdtContract,
  [alUsdAddress]: alUsdContract,
  [mimAddress]: mimContract,
  [stEthAddress]: stEthContract,
  [threeCrvAddress]: threeCrvContract,
  [eursAddress]: eursContract,
  [sEurAddress]: sEurContract,
});

export const zapSwapCurveContract = ZapSwapCurve__factory.connect(
  ZapSwapCurveAddress,
  defaultProvider,
);
