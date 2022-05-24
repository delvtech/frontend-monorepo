# Used GraphQL Packages

### [`@apollo/client`](https://www.apollographql.com/docs/react/)

- send queries with observer [hooks](https://www.apollographql.com/docs/react/api/react/hooks)
- manage [normalized query caching](https://www.apollographql.com/docs/react/caching/overview/#data-normalization)

### [`@graphql-tools`](https://www.graphql-tools.com/docs/introduction)

- generate an [executable schema](https://www.graphql-tools.com/docs/generate-schema) with resolvers
- [merge multiple schemas](https://www.graphql-tools.com/docs/schema-merging)
- generate [mock resolvers](https://www.graphql-tools.com/docs/mocking)

### [`@graphql-codegen`](https://www.graphql-code-generator.com/docs/getting-started)

- generate types from graphql files
- generate apollo hooks from graphql files

### [`@envelope`](https://www.envelop.dev/docs)

- execute client-side queries with [plugins](https://www.envelop.dev/plugins)
- manage execution caching

### [`@graphql-yoga`](https://www.graphql-yoga.com/docs/quick-start)

- execute server-side queries [using an API route](https://www.graphql-yoga.com/docs/integrations/integration-with-nextjs)
- manage execution caching

# TODO

- Use a [Dataloader](https://github.com/graphql/dataloader) for batching (and additional caching?) for contract function calls
- Automate Schema generation from smart contracts

# Notes

## Why GraphQL

### Better Caching

With `react-query` and `react-query-typechain`, our cache entries are tied to our observer hooks (a hook that returns an observer result) where 1 observer hook has 1 cache entry. If you need to make multiple read calls, you'll to do 1 of the following:

1. Create a hook which uses multiple observer hooks and returns either a value once resolved or a clumsily merged observer results.

   ```js
   export function usePoolShare(account, poolContract) {
     const userInfoResult = useUserInfo(account, poolContract.address);
     const totalResult = useLPTokenBalance(
       poolContract,
       masterChefContract.address,
     );

     const userAmount = +userInfoResult.data || 0;
     const total = +totalResult.data || 0;

     // just return a value (doesn't give any info from observer results)
     return userAmount / total;

     // merge the observer results manually (tedious and must be updated if the
     // shapes of the results change, e.g., the query client changes)
     return {
       data: userAmount / total,
       isLoading: totalResult.isLoading || userInfoResult.isLoading,
       // ...
     };
   }
   ```

2. Create a hook which uses multiple observer hooks and returns the last one with a modified select function.

   ```js
   export function usePoolShare(account, poolContract) {
     const userInfoResult = useUserInfo(account, poolContract.address);

     const userAmount = +userInfoResult.data || 0;

     const totalResult = useLPTokenBalance(
       poolContract,
       masterChefContract.address,
       {
         select: ([total]) => userAmount / +total,
       },
     );

     // doesn't provide info from userInfoResult, e.g., error, isFetched
     return totalResult;
   }
   ```

3. Combine the read calls into 1 `useQuery` hook.

   ```js
   export function usePoolShare(account, poolContract) {
     const result = useQuery({
       queryKey: ['pool-share', account, poolContract.address],
       queryFn: () => {

         const poolId = poolIds[poolContract.address]

           // not cached. Every other hook that needs the total LP staked or
           // userInfo will refetch it.
           const [userAmount] = await masterChef.functions.userInfo(poolId, account)
           const [total] = await poolContract.functions.balanceOf(masterChefContract.address)

           return userAmount.toNumber() / total.toNumber()
       },
     });

     return result;
   }
   ```

If you want everything wrapped in a single observer result, you end up with less efficient caching.

With GraphQL and Apollo Client, the caching is separated from the hooks.

```js
// resolvers.ts

export const resolvers = {
  Query: {
    totalLPStaked: async (_, { poolAddress }) => {
      const [total] = await poolContract.functions.balanceOf(
        masterChefContract.address,
      );
      return formatEther(total);
    },
    stakedBalance: async (_, { poolAddress, userAddress }) => {
      const [balance] = await masterChef.functions.userInfo(
        poolIds[poolAddress],
        userAddress,
      );
      return formatEther(balance);
    },
  },
};
```

```js
// Both the totalLPStaked and the stakedBalance are cached as well as the query
// itself.
const QUERY = gql`
  query getPoolShareData($poolAddress: String!, $account: String!) {
    totalLPStaked(poolAddress: $poolAddress)
    stakedBalance(poolAddress: $poolAddress, account: $account)
  }
`;

export function usePoolShare(account, poolAddress) {
  const { data, ...poolShareDataResult } = useQuery(QUERY, {
    variables: { account, poolAddress },
    skip: !account || !poolAddress
  });

  const userAmount = +data?.stakedBalance || 0;
  const total = +data?.totalLPStaked || 0

  return {
    data: userAmount / total
    ...poolShareDataResult
  }
}
```

### Easier to combine queries and reuse code

# Videos

- [Operations Best Practices](https://youtu.be/fG8zy1OROp4?t=899)
- [Mocking](https://www.youtube.com/watch?v=3FIijq7qetI&t=1185s)

# Ideas

## Auto generated Schema

Using a hypothetical "babel for smart contracts" to generate a graphql schema

```js // psuedo

let typeDefs = "";

modules.exports = {
  onEnter: (contract) => {
    const fieldName = camelCase(contract.name);
    const typeName = pascalCase(contract.name);
    typeDefs += `
      type Query {
        ${fieldName}(address: String!): ${typeName}
      }

      type ${typeName} {
    `
  },
  onReadMethod: ({ name, args, return }) => {
    const fieldName = camelCase(name);
    const args = args.map((name, type) => {
      const argName = camelCase(name);
      const graphQLType = graphQLType(type);
      return `${argName}: ${graphQLType}!`
    })

    // would need a way to parse the return type and create more types if it
    // returns an object.
    // maybe the types are stored in an array and merged into the typeDefs later
    typeDefs += `
      ${fieldName}(${args.join(", ")}) ...
    `
  }),
  onExit: () => {
    typeDefs += `
      }
    `
  },
}

// then you could use it like:
const QUERY = gql`
  query getPoolShareData($poolId: Int, $poolAddress: String, $account: String) {

    convergentCurvePool(address: $poolAddress) {
      balanceOf(address: $account)
    }

    MCMod(address: ${masterChef.address}) {
      userInfo(arg0: $poolId, arg1: $account) {
        amount
      }
    }

  }
`;
```
