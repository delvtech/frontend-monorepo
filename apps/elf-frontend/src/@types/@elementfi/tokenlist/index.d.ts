// TODO: Remove this declare module after uniswap publishes the latest
// tokenlist, which includes the new `extensions` property type.
import "@elementfi/tokenlist";
declare module "@elementfi/tokenlist" {
  export interface VaultTokenInfo extends TokenInfo {}
  export interface TokenInfo {
    readonly chainId: number;
    readonly address: string;
    readonly name: string;
    readonly decimals: number;
    readonly symbol: string;
    readonly logoURI?: string;
    readonly tags?: string[];
    readonly extensions?: {
      readonly [ExtensionIdentifier: string]:
        | { [ExtensionIdentifier: string]: ExtensionValue }
        | ExtensionValue[]
        | ExtensionValue;
    };
  }
}
