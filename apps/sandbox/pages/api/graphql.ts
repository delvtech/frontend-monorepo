import { NextApiRequest, NextApiResponse } from "next";
import { createServer } from "@graphql-yoga/node";
import { useEnvelop } from "@envelop/core";
import { baseEnvelope, useLog } from "src/elf/graphql/clients/envelopClient";
import { schema } from "src/elf/graphql/schema/merged";

const server = createServer<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  plugins: [
    /* eslint-disable react-hooks/rules-of-hooks */
    useLog("api server"),
    useEnvelop(baseEnvelope),
    /* eslint-enable react-hooks/rules-of-hooks */
  ],
});

export default server;
