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
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function (key) {
    if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      },
    });
  });

  return dest;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, "__esModule", { value: true, configurable: true });
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

var $de787cb6c706765e$exports = {};

$parcel$defineInteropFlag($de787cb6c706765e$exports);

$parcel$export(
  $de787cb6c706765e$exports,
  "default",
  () => $de787cb6c706765e$export$2e2bcd8739ae039,
);
function $de787cb6c706765e$export$2e2bcd8739ae039({
  graphs: graphs,
  provider: provider,
}) {
  const schemas = graphs.map(({ schema: schema }) => schema);
  const context1 = new Promise(async (resolve) => {
    const { chainId: chainId } = await provider.getNetwork();
    let context = {
      chainId: chainId,
      provider: provider,
    };
    for (const { initContext: initContext } of graphs)
      context = (await initContext?.(context)) || context;
    resolve(context);
  });
  return {
    schemas: schemas,
    context: context1,
  };
}

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

function $6bfc6bc53be094f8$export$2e2bcd8739ae039(options) {
  const { schemas: schemas, context: context } = (0,
  $de787cb6c706765e$export$2e2bcd8739ae039)(options);
  const getEnveloped = (0, $f03430a1724f7e16$export$68b3c18766fa4f41)({
    schemas: schemas,
    context: context,
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

function $a31874b7049347f3$export$2e2bcd8739ae039(options) {
  const { schemas: schemas, context: context } = (0,
  $de787cb6c706765e$export$2e2bcd8739ae039)(options);
  return (0, $67x1W$graphqlyoganode.createServer)({
    plugins: [
      /* eslint-disable react-hooks/rules-of-hooks */ (0,
      $67x1W$envelopcore.useEnvelop)(
        (0, $f03430a1724f7e16$export$68b3c18766fa4f41)({
          schemas: schemas,
          context: context,
        }),
      ),
    ],
  });
}

$parcel$exportWildcard(module.exports, $de787cb6c706765e$exports);

//# sourceMappingURL=main.js.map
