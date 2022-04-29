import { CanPerformJsonFile } from "canperform/CanPerformJsonFile";

// Default to the testnet in this repo so `npm start` Just Works without having
// to specify it on the command line.
const chainName = getCanPerformJsonId();
function getCanPerformJsonId() {
  if (process.env.NODE_ENV === "test") {
    return "mock";
  }

  if (process.env.NEXT_PUBLIC_CHAIN_NAME === "mainnet_fork") {
    return "mainnet";
  }

  return process.env.NEXT_PUBLIC_CHAIN_NAME || "testnet";
}

// Import statements in TS are statically checked, and will throw compile-time
// errors if the file doesn't exist. Require statements on the other hand are
// dynamic and will throw an error at runtime. For tools like eslint and
// dependency-cruiser, we don't need to run the app, but we need TS to compile
// correctly, so we use a require() statement here.
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const canPerformJson: CanPerformJsonFile = require(`canperform/${chainName}.canperform.json`);

export const CAN_PERFORM_URL = getCanPerformJsonUrl();
function getCanPerformJsonUrl() {
  if (process.env.NEXT_PUBLIC_CHAIN_NAME === "mainnet") {
    return "https://elementfi.s3.us-east-2.amazonaws.com/mainnet.canperform.json";
  }

  return "https://elementfi.s3.us-east-2.amazonaws.com/goerli.canperform.json";
}
