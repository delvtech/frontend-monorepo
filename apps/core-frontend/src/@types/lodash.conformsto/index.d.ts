/* eslint-disable @typescript-eslint/no-unused-vars */

declare module "lodash.conformsto" {
  export = (
    object: Record<string, unknown>,
    source: Record<string, unknown>,
  ): boolean => boolean;
}
