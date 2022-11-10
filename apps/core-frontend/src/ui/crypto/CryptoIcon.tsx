import React, { ReactElement } from "react";

import { Tag } from "@blueprintjs/core";

import {
  CrvAlusdIcon,
  CrvLusdIcon,
  CrvStethIcon,
  CrvTricryptoIcon,
  DaiIcon,
  EthIcon,
  IconProps,
  TokenIcon,
  UsdcIcon,
  WethIcon,
  WbtcIcon,
  CrvMimIcon,
  LusdIcon,
  CrvEursIcon,
  UsdtIcon,
  ThreeCrvIcon,
  AlusdIcon,
  MimIcon,
  StethIcon,
  BbaUsdcIcon,
} from "ui/token/TokenIcon";
import ContractAddresses from "addresses/addresses";
import { CryptoAsset, CryptoAssetType } from "elf/crypto/CryptoAsset";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { MainnetExtraAddresses } from "elf/zaps/zapSwapCurve/addresses";

const CryptoIconSvg: Record<string, TokenIcon> = {
  [ContractAddresses.usdcAddress]: UsdcIcon,
  [ContractAddresses.wethAddress]: WethIcon,
  [ContractAddresses.daiAddress]: DaiIcon,
  [ContractAddresses["lusd3crv-fAddress"]]: CrvLusdIcon,
  [ContractAddresses["alusd3crv-fAddress"]]: CrvAlusdIcon,
  [ContractAddresses.crvtricryptoAddress]: CrvTricryptoIcon,
  [ContractAddresses.crv3cryptoAddress]: CrvTricryptoIcon,
  [ContractAddresses.stecrvAddress]: CrvStethIcon,
  [ContractAddresses.wbtcAddress]: WbtcIcon,
  [ContractAddresses["mim-3lp3crv-fAddress"]]: CrvMimIcon,
  [ContractAddresses.eurscrvAddress]: CrvEursIcon,
  [ContractAddresses["bb-a-usdAddress"]]: BbaUsdcIcon,
  [MainnetExtraAddresses.lusdAddress]: LusdIcon,

  [MainnetExtraAddresses.threeCrvAddress]: ThreeCrvIcon,
  [MainnetExtraAddresses.usdtAddress]: UsdtIcon,
  [MainnetExtraAddresses.alUsdAddress]: AlusdIcon,
  [MainnetExtraAddresses.mimAddress]: MimIcon,
  [MainnetExtraAddresses.stEthAddress]: StethIcon,
};

function makeTagIcon(cryptoAsset: CryptoAsset) {
  return function TagIcon({ style, className }: IconProps): ReactElement {
    const symbol = getCryptoSymbol(cryptoAsset);
    return (
      <Tag large minimal className={className} style={style}>
        {symbol}
      </Tag>
    );
  };
}

export function findAssetIconByAddress(address: string): TokenIcon {
  return findAssetIcon(getCryptoAssetForToken(address));
}

export function findAssetIcon(cryptoAsset: CryptoAsset): TokenIcon {
  if (cryptoAsset.type === CryptoAssetType.ETHEREUM) {
    return EthIcon;
  }

  const iconSvg = CryptoIconSvg[cryptoAsset.tokenContract.address];
  if (iconSvg) {
    return iconSvg;
  }

  const tagIcon = makeTagIcon(cryptoAsset);
  return tagIcon;
}
