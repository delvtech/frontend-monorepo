import { createServer } from "@graphql-yoga/node";
import { useEnvelop, Plugin, useExtendContext } from "@envelop/core";
// import { useParserCache } from "@envelop/parser-cache";
// import { useValidationCache } from "@envelop/validation-cache";
// import { useResponseCache } from "@envelop/response-cache";
import { NextApiRequest, NextApiResponse } from "next";
import { schema } from "src/elf/graphql/schema/merged";
import { baseEnvelope, useLog } from "src/elf/graphql/clients/envelopClient";

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
