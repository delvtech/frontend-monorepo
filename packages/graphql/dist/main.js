var $67x1W$apolloclient = require("@apollo/client");
var $67x1W$graphql = require("graphql");
var $67x1W$envelopcore = require("@envelop/core");
var $67x1W$envelopparsercache = require("@envelop/parser-cache");
var $67x1W$envelopvalidationcache = require("@envelop/validation-cache");
var $67x1W$graphqltoolsschema = require("@graphql-tools/schema");
var $67x1W$graphqlyoganode = require("@graphql-yoga/node");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {
    get: v,
    set: s,
    enumerable: true,
    configurable: true,
  });
}

$parcel$export(
  module.exports,
  "getApolloLink",
  () => $6bfc6bc53be094f8$export$2e2bcd8739ae039,
);
$parcel$export(
  module.exports,
  "createServer",
  () => $a31874b7049347f3$export$2e2bcd8739ae039,
);

const $f03430a1724f7e16$export$73f4ce2d285195f3 = (0,
$67x1W$envelopcore.envelop)({
  plugins: [
    /* eslint-disable react-hooks/rules-of-hooks */ (0,
    $67x1W$envelopparsercache.useParserCache)(),
    (0, $67x1W$envelopvalidationcache.useValidationCache)(),
  ],
});
function $f03430a1724f7e16$export$68b3c18766fa4f41({
  schemas: schemas,
  context: context,
}) {
  return (0, $67x1W$envelopcore.envelop)({
    plugins: [
      /* eslint-disable react-hooks/rules-of-hooks */ (0,
      $67x1W$envelopcore.useSchema)(
        (0, $67x1W$graphqltoolsschema.mergeSchemas)({
          schemas: schemas,
        }),
      ),
      (0, $67x1W$envelopcore.useExtendContext)(() => context),
      (0, $67x1W$envelopcore.useEnvelop)(
        $f03430a1724f7e16$export$73f4ce2d285195f3,
      ),
    ],
  });
}
async function $f03430a1724f7e16$export$b3e1bb245abcf336({
  query: query,
  variables: variables,
  getEnveloped: getEnveloped,
  onError: onError,
  onSuccess: onSuccess,
}) {
  try {
    const {
      validate: validate,
      contextFactory: contextFactory,
      execute: execute,
      schema: schema,
    } = getEnveloped({
      query: query,
      variables: variables,
    });
    const validationErrors = validate(schema, query);
    if (validationErrors.length)
      onError?.({
        errors: validationErrors,
      });
    const contextValue = await contextFactory();
    const result = await execute({
      document: query,
      schema: schema,
      variableValues: variables,
      contextValue: contextValue,
    });
    onSuccess?.(result);
  } catch (caughtErr) {
    onError?.({
      errors: [
        caughtErr instanceof (0, $67x1W$graphql.GraphQLError)
          ? caughtErr
          : new (0, $67x1W$graphql.GraphQLError)(
              caughtErr.message || caughtErr.toString(),
            ),
      ],
    });
  }
}

function $6bfc6bc53be094f8$export$2e2bcd8739ae039({
  schemas: schemas,
  provider: provider,
}) {
  const getEnveloped = (0, $f03430a1724f7e16$export$68b3c18766fa4f41)({
    schemas: schemas,
    context: {
      provider: provider,
    },
  });
  return new (0, $67x1W$apolloclient.ApolloLink)(
    ({ query: query, variables: variables }) =>
      new (0, $67x1W$apolloclient.Observable)((observer) => {
        (0, $f03430a1724f7e16$export$b3e1bb245abcf336)({
          query: query,
          variables: variables,
          getEnveloped: getEnveloped,
          onError: (res) => {
            observer.next(res);
            observer.complete();
          },
          onSuccess: (res) => {
            observer.next(res);
            observer.complete();
          },
        });
      }),
  );
}

function $a31874b7049347f3$export$2e2bcd8739ae039({
  schemas: schemas,
  provider: provider,
}) {
  const schema = (0, $67x1W$graphqltoolsschema.mergeSchemas)({
    schemas: schemas,
  });
  return (0, $67x1W$graphqlyoganode.createServer)({
    schema: schema,
    plugins: [
      /* eslint-disable react-hooks/rules-of-hooks */ (0,
      $67x1W$envelopcore.useExtendContext)(() => ({
        provider: provider,
      })),
      (0, $67x1W$envelopcore.useEnvelop)(
        (0, $f03430a1724f7e16$export$73f4ce2d285195f3),
      ),
    ],
  });
}

//# sourceMappingURL=main.js.map
