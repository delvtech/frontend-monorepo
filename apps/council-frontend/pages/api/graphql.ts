import { createServer } from "@elementfi/graphql";
import { councilSchema } from "@elementfi/council-graphql";
import { defaultProvider } from "src/providers/providers";

const server = createServer({
  schemas: [councilSchema],
  provider: defaultProvider,
});

export default server;