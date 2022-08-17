import { createServer } from "@elementfi/graphql";
// must be imported from the built code since this will be running in node
import { coreV2Graph } from "@elementfi/core-v2-graphql";
import { getAddressList } from "./addressLists";
import { getProvider } from "./providers";

export async function main(): Promise<void> {
  console.log(getAddressList());
  const server = await createServer({
    graphs: [coreV2Graph],
    provider: getProvider(),
  });

  server.start();
}

export default main();
