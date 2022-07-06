import { createServer } from "@elementfi/graphql";
import { councilGraph } from "@elementfi/council-graphql";
import { defaultProvider } from "src/providers/providers";

const server = createServer({
  graphs: [councilGraph],
  provider: defaultProvider,
});

export default server;