import { createServer } from "@elementfi/graphql";
import { councilGraph } from "@elementfi/council-graphql";
import { defaultProvider } from "src/providers/providers";

const server =
  process.env.NODE_ENV === "development" &&
  createServer({
    graphs: [councilGraph],
    provider: defaultProvider,
  });

export default server;
