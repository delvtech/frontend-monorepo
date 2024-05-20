# Element GraphQL

This is the base GraphQL package for Element Finance apps and schema packages.

- [Exports](#exports)
  - [**`getApolloLink`**](#getapollolink)
    - [**Signature**](#signature)
    - [**`InitOptions`**](#initoptions)
    - [**Example**](#example)
  - [**`createServer`**](#createserver)
    - [**Signature**](#signature-1)
    - [**`InitOptions`**](#initoptions-1)
    - [**Example**](#example-1)
  - [**`ResolverContext`**](#resolvercontext)
    - [**Example**](#example-2)
  - [**`Graph`**](#graph)
    - [**Example**](#example-3)
- [CLI](#cli)
  - [**`elf-graphql`**](#elf-graphql)
    - [**Signature**](#signature-2)
    - [**`OPTIONS`**](#options)
    - [**App example**](#app-example)
    - [**Package example**](#package-example)
- [Key Dependencies](#key-dependencies)
  - [`@graphql-tools`](#graphql-tools)
  - [`@envelope`](#envelope)
  - [`@apollo/client`](#apolloclient)
  - [`@graphql-yoga`](#graphql-yoga)
  - [`@graphql-codegen`](#graphql-codegen)
  - [`yargs`](#yargs)

## Exports

### **`getApolloLink`**

A helper function to create an [`ApolloLink`](https://www.apollographql.com/docs/react/api/link/introduction) instance for [Apollo Client](https://www.apollographql.com/docs/react/) (specifically, a [terminating link](https://www.apollographql.com/docs/react/api/link/introduction#the-terminating-link)) that manages executing queries in the client.

#### **Signature**

```ts
getApolloLink(InitOptions) => ApolloLink
```

#### **`InitOptions`**

An object for configuring the execution layer.

| Option     | Type       | Description                                                                                                                                                                                                                |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `graphs`   | `Graph[]`  | An array of graph objects which include an [executable schema with resolvers](https://www.graphql-tools.com/docs/generate-schema) and an `initContext` function which takes a context object, modifies it, and returns it. |
| `provider` | `Provider` | An [ethers.js `Provider`](https://docs.ethers.io/v5/api/providers/) instance that is added to the execution context for schema resolvers.                                                                                  |

#### **Example**

```ts
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { getApolloLink } from "@elementfi/graphql";
import { councilGraph } from "@elementfi/core-graphql";
import { defaultProvider } from "src/elf/providers/providers";

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: getApolloLink({
    graphs: [councilGraph],
    provider: defaultProvider,
  }),
});

function App(...) {
  return (
    <ApolloProvider client={apolloClient}>
      ...
    </ApolloProvider>
  );
}

export default App;
```

### **`createServer`**

A helper function to create a [Yoga Node Server](https://www.graphql-yoga.com/docs/quick-start) instance that comes with [Yoga's version of GraphiQL](https://www.graphql-yoga.com/docs/features/graphiql).

#### **Signature**

```ts
createServer(InitOptions) => YogaNodeServerInstance
```

#### **`InitOptions`**

An object for configuring the Yoga Server.

| Option     | Type       | Description                                                                                                                                                                                                                |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `graphs`   | `Graph[]`  | An array of graph objects which include an [executable schema with resolvers](https://www.graphql-tools.com/docs/generate-schema) and an `initContext` function which takes a context object, modifies it, and returns it. |
| `provider` | `Provider` | An [ethers.js `Provider`](https://docs.ethers.io/v5/api/providers/) instance that is added to the execution context for schema resolvers.                                                                                  |

#### **Example**

```ts
import { createServer } from "@elementfi/graphql";
import { councilGraph } from "@elementfi/council-graphql";
import { defaultProvider } from "src/elf/providers/providers";

const server = createServer({
  schemas: [councilGraph],
  provider: defaultProvider,
});

export default server;
```

### **`ResolverContext`**

A generic type containing the default fields added to the execution context for resolvers which can accepts a generic object type to extend it's fields.

```ts
export type ResolverContext<
  T extends Record<string, any> = Record<string, any>,
> = {
  chainId: number;
  provider: Provider;
} & T;
```

#### **Example**

```ts
export type CouncilResolverContext = ResolverContext<{
  dataSources: {
    coreVoting: CoreVotingContract;
    gscVoting: CoreVotingContract;
    lockingVault: LockingVaultContract;
    vestingVault: VestingVaultContract;
    gscVault: GSCVaultContract;
    elementS3: AmazonS3API;
  };
}>;
// type CouncilResolverContext = {
//     chainId: number;
//     provider: Provider;
// } & {
//     dataSources: {
//         coreVoting: CoreVotingContract;
//         gscVoting: CoreVotingContract;
//         lockingVault: LockingVaultContract;
//         vestingVault: VestingVaultContract;
//         gscVault: GSCVaultContract;
//         elementS3: AmazonS3API;
//     };
// }
```

### **`Graph`**

An interface accepted by `getApolloClient` and `createServer` which contains an executable schema and an `initContext` function to initiate the context for the schema's resolvers.

```ts
export interface Graph {
  schema: GraphQLSchema;
  initContext?: (
    initialContext: ResolverContext,
  ) => ResolverContext | Promise<ResolverContext>;
}
```

#### **Example**

```ts
type MyResolverContext = ResolverContext<{
  foo: Foo;
}>;

export const myGraph: Graph = {
  schema: mySchema,
  initContext: (previousContext: ResolverContext): MyResolverContext => {
    return {
      ...previousContext,
      foo: new Foo(),
    };
  },
};
```

## CLI

### **`elf-graphql`**

A CLI for generating TypeScript types and [Apollo hooks](https://www.apollographql.com/docs/react/api/react/hooks) from `.graphql` files for Element Finance apps and schema packages.

#### **Signature**

```sh
elf-graphql [OPTIONS]
```

#### **`OPTIONS`**

| Option            | Type                                            | Description                                                                                                                                                                                                                                                                                                      |
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--version`       | `boolean`                                       | Show version number                                                                                                                                                                                                                                                                                              |
| `-o`, `--outDir`  | `string` (default: "`.`")                       | The output directory for emitted files.                                                                                                                                                                                                                                                                          |
| `-p`, `--package` | `boolean` or `undefined` (default: `undefined`) | If `true`, everything needed for a new `@elementfi` GraphQL schema package (e.g. `@elementfi/core-graphql`) will be emitted into the `outDir`. If `false` or `undefined`, type files will be emitted into the `outDir`, but hook files will be emitted next to their corresponding `.graphql` files.             |
| `-s`, `--schema`  | `boolean` or `undefined` (default: `undefined`) | The path to a `.js` or `.ts` file who's default export is a `GraphQLSchema` or an array of `GraphQLSchema`s containing type definitions for all the app's GraphQL operations. If `undefined`, the script will look for type definitions in all `.graphql` files in the app. If none exist, the script will fail. |

#### **App example**

First create a file that exports the schemas for the app.

```ts
// src/elf/graphql/schemas.ts

import { coreSchema } from "@elementfi/core-graphql";
import { councilSchema } from "@elementfi/council-graphql";

const schemas = [coreSchema, councilSchema];

export default schemas;
```

Then, write operations in `.graphql` files.

```graphql
# src/ui/overview/GetProposals.graphql

query GetProposals($account: ID!) {
  coreVoting {
    proposals {

    }
  }
}
```

Add a script to the app's `package.json` that calls `elf-graphql` with the `schema` and `outDir`.

```json
// package.json

{
  "name": "my-app",
  "scripts": {
    // ...
    "build:graphql": "elf-graphql --schema src/elf/graphql/schemas.ts --outDir src/elf/graphql/generated"
  }
}
```

When this script is run, it will emit the following:

- `src/elf/graphql/generated/graphql.d.ts` - Base TypeScript types for GraphQL based on the schema.
- `src/elf/graphql/generated/graphql-modules.d.ts` - TypeScript `module` definitions for imported `.graphql` files.
- `src/ui/overview/GetOverviewData.generated.ts` - TypeScript types and `useGetOverviewDataQuery` and `useGetOverviewDataLazyQuery` [Apollo hooks](https://www.apollographql.com/docs/react/api/react/hooks) for sending the operation with Apollo Client.

Now the hooks can be imported from the generated file to use the query.

```ts
// src/ui/overview/OverviewSection.tsx

import { useGetOverviewDataQuery } from "./GetOverviewData.generated.ts";

export function OverviewSection(props) {
  const { data, loading, error } = useGetOverviewDataQuery({
    variables: {
      tokenAddresses: [
        // ...
      ],
    },
  });

  return {
    // ...
  };
}
```

#### **Package example**

First write type definitions in `.graphql` files.

```graphql
# src/Core.graphql

type Query {
  token(address: ID!): Token!
  tokens(addresses: [ID!]!): [Token!]!
}

type Token {
  address: ID!
  symbol: String
  chainId: Int
  name: String
  decimals: Int
  logoURI: String
  tags: [String]
  balance(walletAddress: ID!): String
}
```

Optionally, operations can also be written in `.graphql` files.

```graphql
# src/operations.graphql

fragment allTokenFields on Token {
  address
  symbol
  chainId
  name
  decimals
  logoURI
  tags
}

query GetToken($address: ID!) {
  token(address: $address) {
    ...allTokenFields
  }
}

query GetTokens($addresses: [ID!]!) {
  tokens(addresses: $addresses) {
    ...allTokenFields
  }
}
```

Add a script to the app's `package.json` that calls `elf-graphql` with `package` and the `outDir`.

```json
// package.json

{
  "name": "@elementfi/my-graphql",
  "scripts": {
    // ...
    "build:graphql": "elf-graphql --package --outDir src/generated"
  }
}
```

When this script is run, it will emit the following:

- `src/generated/index.ts`
  - TypeScript types for graphql based on the schema and operations, including types for resolvers.
  - [Apollo hooks](https://www.apollographql.com/docs/react/api/react/hooks) for sending the operations with Apollo Client.
- `src/generated/module.d.ts` - TypeScript `module` definitions for imported `.graphql` files.

Now the `Resolvers` type can be imported to add types to resolvers.

```ts
// src/resolvers.ts

import { Resolvers } from "./generated";

export const resolvers: Resolvers = {
  // ...
};
```

If the package's [`Graph`](#graph) includes an `initContext` which returns a modified [`ResolverContext`](#resolvercontext), pass it to the `Resolvers` generic to ensure the context argument is typed correctly.

```ts
// src/resolvers.ts

import { Resolvers } from "./generated";
import { MyResolverContext } from "./context";

export const resolvers: Resolvers<MyResolverContext> = {
  // ...
};
```

The contents of `src/generated/index.ts` can also be exported for use by apps.

```ts
// src/index.ts

//...
export * from "./generated";
```

## Key Dependencies

### [`@graphql-tools`](https://www.graphql-tools.com/docs/introduction)

- To generate an [executable schema](https://www.graphql-tools.com/docs/generate-schema) with resolvers.
- To [merge multiple schemas](https://www.graphql-tools.com/docs/schema-merging).

### [`@envelope`](https://www.envelop.dev/docs)

- To execute queries client-side with [plugins](https://www.envelop.dev/plugins).
- To manage both client-side and server-side execution caching.

### [`@apollo/client`](https://www.apollographql.com/docs/react/)

- To create a custom [`ApolloLink`](https://www.apollographql.com/docs/react/api/link/introduction) instance that wraps `@envelope` in an [`Observable`](https://github.com/zenparsing/zen-observable).

### [`@graphql-yoga`](https://www.graphql-yoga.com/docs/quick-start)

- To create a server that executes queries server-side.
- To serve [GraphiQL](https://www.graphql-yoga.com/docs/features/graphiql).

### [`@graphql-codegen`](https://www.graphql-code-generator.com/docs/getting-started)

- To generate types and Apollo hooks from GraphQL files.

### [`yargs`](https://github.com/yargs/yargs)

- To wrap `@graphql-codegen` in a custom CLI.
