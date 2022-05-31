export interface TagInfo {
  name: string;
  description: string;
}
export declare enum TokenTag {
  VAULT = "vault",
  ASSET_PROXY = "assetproxy",
  CCPOOL = "ccpool",
  PRINCIPAL = "eP",
  WPOOL = "wpool",
  YIELD = "eY",
  CURVE = "curve",
}
export declare const tags: Record<TokenTag, TagInfo>;
