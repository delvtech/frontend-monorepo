import { BigNumber } from "ethers";

export const DISCORD_URL = "https://discord.gg/pvnUHuAsQ2";
export const TWITTER_URL = "https://twitter.com/Element_DAO";
export const COUNCIL_URL = "https://gov.element.fi/";
export const COUNCIL_DELEGATE_URL = "https://gov.element.fi/voters";
export const COUNCIL_DOC_URL =
  "https://docs.element.fi/governance-council/council-protocol-overview";
export const ADDRESS_SCREEN_URL =
  "https://6zqnxzsgja.execute-api.us-east-2.amazonaws.com/screen";
const PINATA_GATEWAY = "https://element-fi.mypinata.cloud/ipfs/";
const NFT_ASSET_PATH = "QmfWdY3eof7qFW4KmmPTvyHSh8J5m5pKRVb2odfmAynm5b/";

export const getTokenAssetURL = (id: BigNumber): string => {
  return `${PINATA_GATEWAY + NFT_ASSET_PATH}/${id.toString()}.png`;
};

export const TOS_URL =
  "https://elementfi.s3.us-east-2.amazonaws.com/element-finance-terms-of-service.pdf";
export const CC0_URL =
  "https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt";
export const PRIVACY_POLICY_URL =
  "https://elementfi.s3.us-east-2.amazonaws.com/element-finance-privacy-policy.pdf";

export const WHITELIST_URL =
  "https://elementfi.s3.us-east-2.amazonaws.com/nft/whitelist.json";
