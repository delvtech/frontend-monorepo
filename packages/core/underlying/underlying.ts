import {
  DAI__factory,
  ERC20Permit__factory,
  ERC20__factory,
  WETH__factory,
} from "@elementfi/core-typechain/dist/libraries";
import { AddressesJson } from "@elementfi/core/addresses/addresses";
// TODO: stuff under packages/ should not have a default provider
import { defaultProvider } from "@elementfi/core/providers/providers";

const {
  addresses: {
    wethAddress,
    wbtcAddress,
    usdcAddress,
    daiAddress,
    "alusd3crv-fAddress": crvalusdAddress,
    "mim-3lp3crv-fAddress": crvmimAddress,
    "lusd3crv-fAddress": crvlusdAddress,
    crv3cryptoAddress,
    crvtricryptoAddress,
    stecrvAddress,
    eurscrvAddress,
  },
} = AddressesJson;

const wethContract = WETH__factory.connect(wethAddress, defaultProvider);
const wbtcContract = ERC20__factory.connect(wbtcAddress, defaultProvider);
const usdcContract = ERC20Permit__factory.connect(usdcAddress, defaultProvider);
const daiContract = DAI__factory.connect(daiAddress, defaultProvider);
const crvlusdContract = ERC20__factory.connect(crvlusdAddress, defaultProvider);
const crvalusdContract = ERC20__factory.connect(
  crvalusdAddress,
  defaultProvider,
);
const crvmimContract = ERC20__factory.connect(crvmimAddress, defaultProvider);

const crvTricryptoContract = ERC20__factory.connect(
  crvtricryptoAddress,
  defaultProvider,
);
const crv3CryptoContract = ERC20__factory.connect(
  crv3cryptoAddress,
  defaultProvider,
);

const steCrvContract = ERC20__factory.connect(stecrvAddress, defaultProvider);
const eursCrvContract = ERC20__factory.connect(eurscrvAddress, defaultProvider);

/**
 * Lookup the contract instance for a underlying's address.
 */
export const underlyingContractsByAddress = Object.freeze({
  [wethAddress]: wethContract,
  [wbtcAddress]: wbtcContract,
  [usdcAddress]: usdcContract,
  [daiAddress]: daiContract,
  [crvlusdAddress]: crvlusdContract,
  [crvalusdAddress]: crvalusdContract,
  [crvtricryptoAddress]: crvTricryptoContract,
  [crv3cryptoAddress]: crv3CryptoContract,
  [crvmimAddress]: crvmimContract,
  [stecrvAddress]: steCrvContract,
  [eurscrvAddress]: eursCrvContract,
});

const underlyingERC20PermitAddresses = [usdcAddress];
export function isUnderlyingAddressERC20Permit(
  underlyingAddress: string,
): boolean {
  return underlyingERC20PermitAddresses.includes(underlyingAddress);
}
