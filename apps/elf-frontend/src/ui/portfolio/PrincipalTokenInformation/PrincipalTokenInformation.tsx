import { ReactElement } from "react";

import { Callout, Icon, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Web3Provider } from "@ethersproject/providers";
import { CalendarEvent, google } from "calendar-link";
import { jt, t } from "ttag";

import { makeEtherscanTokenUrl } from "integrations/etherscan/links";
import tw from "efi-tailwindcss-classnames";
import { AddressesJson } from "addresses/addresses";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { isGoerli, isMainnet } from "base/ethereum/ethereum";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import { getTokenInfo } from "tokenlists/tokenlists";
import { getBaseAssetForTranche } from "elf/tranche/baseAssets";
import {
  AssetProxyTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/core-tokenlist";

interface PrincipalTokenInformationProps {
  library: Web3Provider | undefined;
  account: string | null | undefined;
  principalToken: PrincipalTokenInfo;
}

export function PrincipalTokenInformation(
  props: PrincipalTokenInformationProps,
): ReactElement {
  const {
    principalToken,
    principalToken: {
      address: ptAddress,
      extensions: { position: wrappedPositionAddress },
    },
  } = props;

  const {
    name: vaultName,
    extensions: { vault: vaultAddress },
  } = getTokenInfo<AssetProxyTokenInfo>(wrappedPositionAddress);

  // base asset
  const baseAsset = getBaseAssetForTranche(ptAddress);
  const baseAssetSymbol = getCryptoSymbol(baseAsset);

  const vaultLink = getVaultLink(vaultAddress, vaultName);

  return (
    <div className={tw("flex", "text-left")}>
      <div className={tw("flex", "flex-col", "w-full", "space-y-2")}>
        <span>{jt`Your yield is backed by ${baseAssetSymbol} deposited in ${vaultLink}`}</span>
        <span>{getPrincipalTokenLink(ptAddress)}</span>
        <span>{getGoogleCalendarLink(principalToken)}</span>
        <Callout
          icon={null}
          intent={Intent.PRIMARY}
        >{jt`Earn additional yield on your principal tokens by adding them as liquidity to the ${getElementPoolLink(
          principalToken,
        )}`}</Callout>
      </div>
    </div>
  );
}

function getElementPoolLink(
  principalToken: PrincipalTokenInfo,
): ReactElement | null {
  const { address } = principalToken;
  const { address: poolAddress } = getPoolInfoForPrincipalToken(address);
  // assume testnet by default (goerli)
  let domain = "https://testnet.element.fi";
  if (isGoerli(AddressesJson.chainId)) {
    domain = "https://testnet.element.fi";
  } else if (isMainnet(AddressesJson.chainId)) {
    // TODO: What will be the url for mainnet?
    domain = "https://app.element.fi";
  }

  return (
    <a
      key="element-pool-link"
      target="_blank"
      rel="noreferrer"
      href={`${domain}/pools/${poolAddress}`}
    >
      {t`Element Pool`}{" "}
      <sup>
        <Icon icon={IconNames.SHARE} iconSize={8} />
      </sup>
    </a>
  );
}
function getGoogleCalendarLink(
  principalToken: PrincipalTokenInfo,
): ReactElement | null {
  const {
    address,
    name,
    extensions: { unlockTimestamp },
  } = principalToken;

  const baseAsset = getBaseAssetForTranche(address);
  const baseAssetSymbol = getCryptoSymbol(baseAsset);

  const event: CalendarEvent = {
    title: t`Redeem ${name}`,
    description: t`Your ${baseAssetSymbol} fixed rate term has been reached! You can now head back to https://app.element.fi/ to redeem your ${baseAssetSymbol}.`,
    url: "https://element.fi",
    start: unlockTimestamp * 1000,
    duration: [1, "hour"],
  };

  return (
    <a
      key="google-calendar-link"
      target="_blank"
      rel="noreferrer"
      href={google(event)}
    >
      {t`Add the term redemption date to your Google Calendar`}{" "}
      <sup>
        <Icon icon={IconNames.SHARE} iconSize={8} />
      </sup>
    </a>
  );
}

function getPrincipalTokenLink(
  principalTokenAddress: string,
): ReactElement | null {
  return (
    <a
      key="vault-link"
      target="_blank"
      rel="noreferrer"
      href={makeEtherscanTokenUrl(AddressesJson.chainId, principalTokenAddress)}
    >
      {t`View this principal token on etherscan`}{" "}
      <sup>
        <Icon icon={IconNames.SHARE} iconSize={8} />
      </sup>
    </a>
  );
}

function getVaultLink(
  vaultAddress: string,
  vaultName: string,
): ReactElement | null {
  return (
    <a
      key="vault-link"
      target="_blank"
      rel="noreferrer"
      href={makeEtherscanTokenUrl(AddressesJson.chainId, vaultAddress)}
    >
      {vaultName}{" "}
      <sup>
        <Icon icon={IconNames.SHARE} iconSize={8} />
      </sup>
    </a>
  );
}
