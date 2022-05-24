import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { GraphQLError } from "graphql";
import { envelop, useSchema, useEnvelop, Plugin } from "@envelop/core";
import { useParserCache } from "@envelop/parser-cache";
import { useValidationCache } from "@envelop/validation-cache";
import { useResponseCache } from "@envelop/response-cache";
import { schema } from "src/elf/graphql/schema/merged";

export const useLog = (message: string): Plugin => ({
  onParse() {
    console.log(`🪵  ${message}`);
  },
});

export const baseEnvelope = envelop({
  plugins: [
    /* eslint-disable react-hooks/rules-of-hooks */
    useLog("baseEnvelope"),
    useParserCache(),
    useValidationCache(),
    useResponseCache(),
    /* eslint-enable react-hooks/rules-of-hooks */
  ],
});

const envelopWithSchema = envelop({
  plugins: [
    /* eslint-disable react-hooks/rules-of-hooks */
    useSchema(schema),
    useLog("envelopWithSchema"),
    useEnvelop(baseEnvelope),
    /* eslint-enable react-hooks/rules-of-hooks */
  ],
});

const envelopLink = new ApolloLink(
  (operation) =>
    new Observable((observer) => {
      try {
        const { validate, contextFactory, execute, schema } =
          envelopWithSchema(operation);

        const { query, variables } = operation;

        const validationErrors = validate(schema, query);

        if (validationErrors.length) {
          observer.next({ errors: validationErrors });
          observer.complete();
        }

        const asyncExecute = async () => {
          const contextValue = await contextFactory();

          const result = await execute({
            document: query,
            schema,
            variableValues: variables,
            contextValue,
          });

          observer.next(result);
          observer.complete();
        };

        asyncExecute();
      } catch (caughtErr: any) {
        observer.next({
          errors: [
            caughtErr instanceof GraphQLError
              ? caughtErr
              : new GraphQLError(caughtErr.message || caughtErr.toString()),
          ],
        });
        observer.complete();
      }
    }),
);

/**
 * An Apollo client that uses Envelop to execute queries client-side. Envelop
 * allows you to execute queries with plugins and control the execution layer
 * normally out of reach with graphql.js.
 *
 * https://www.envelop.dev/docs
 *
 */
export const envelopClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: envelopLink,
});
