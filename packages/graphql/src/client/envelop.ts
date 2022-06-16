import {
  DocumentNode,
  ExecutionResult,
  GraphQLError,
  GraphQLSchema,
} from "graphql";
import {
  envelop,
  useSchema,
  useEnvelop,
  GetEnvelopedFn as OriginalGetEnvelopedFn,
  useExtendContext,
} from "@envelop/core";
import { useParserCache } from "@envelop/parser-cache";
import { useValidationCache } from "@envelop/validation-cache";
import { mergeSchemas } from "@graphql-tools/schema";
import { ObjMap } from "graphql/jsutils/ObjMap";

// Adds a default generic plugin context to make using the type easier.
export type GetEnvelopedFn<T = Record<string | number | symbol, any>> =
  OriginalGetEnvelopedFn<T>;

/**
 * A base GetEnvelopedFn that includes plugins that optimize execution.
 */
export const getEnvelopedBase = envelop({
  plugins: [
    /* eslint-disable react-hooks/rules-of-hooks */
    useParserCache(),
    useValidationCache(),
    /* eslint-enable react-hooks/rules-of-hooks */
  ],
});

interface EnvelopWithSchemaOptions {
  schemas: GraphQLSchema[];
  context?: Record<string, any>;
}

/**
 * Create a GetEnvelopedFn that uses merged schemas.
 * @param options
 * @param options.schemas An array of `GraphQLSchema`s to merge and use.
 * @param options.context An optional object of properties to be added to the
 *   execution context.
 * @returns A `GetEnvelopedFn`
 */
export function envelopWithSchema({
  schemas,
  context,
}: EnvelopWithSchemaOptions): GetEnvelopedFn {
  return envelop({
    plugins: [
      /* eslint-disable react-hooks/rules-of-hooks */
      useSchema(mergeSchemas({ schemas })),
      useExtendContext(() => context),
      useEnvelop(getEnvelopedBase),
      /* eslint-enable react-hooks/rules-of-hooks */
    ],
  });
}

export interface ErrorResult {
  errors: ReadonlyArray<GraphQLError>;
}

interface HandleQueryOptions {
  query: DocumentNode;
  variables: Record<string, any>;
  getEnveloped: GetEnvelopedFn;
  onError?: ({ errors }: ErrorResult) => void;
  onSuccess?: <TData = ObjMap<unknown>, TExtensions = ObjMap<unknown>>(
    result: ExecutionResult<ObjMap<TData>, ObjMap<TExtensions>>,
  ) => void;
}

/**
 * Handle GraphQL queries by using a `GetEnvelopedFn` to validate and execute
 * them.
 * @param options
 * @param options.query A `DocumentNode` of the GraphQL query to execute.
 * @param options.variables An object containing variables for the query.
 * @param options.getEnveloped The `GetEnvelopedFn` that will be used to
 *   validate and execute the query.
 * @param options.onError An optional callback to call when there's an error.
 * @param options.onSuccess An optional callback to call when the query is
 *   executed successfully.
 */
export async function handleQuery({
  query,
  variables,
  getEnveloped,
  onError,
  onSuccess,
}: HandleQueryOptions): Promise<void> {
  try {
    const { validate, contextFactory, execute, schema } = getEnveloped({
      query,
      variables,
    });

    const validationErrors = validate(schema, query);
    if (validationErrors.length) {
      onError?.({ errors: validationErrors });
    }

    const contextValue = await contextFactory();

    const result = await execute({
      document: query,
      schema,
      variableValues: variables,
      contextValue,
    });
    onSuccess?.(result);
  } catch (caughtErr: any) {
    onError?.({
      errors: [
        caughtErr instanceof GraphQLError
          ? caughtErr
          : new GraphQLError(caughtErr.message || caughtErr.toString()),
      ],
    });
  }
}
