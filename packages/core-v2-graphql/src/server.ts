import { createServer } from "@elementfi/graphql";
// must be imported from the built code since this will be running in node
import { elementGraph } from "@elementfi/core-v2-graphql";
import { getProvider } from "./providers";

export async function main(): Promise<void> {
  const server = await createServer({
    graphs: [elementGraph],
    provider: getProvider(),
  });

  server.start();
}

export default main();
