import { MutationCache, QueryCache, QueryClient } from "react-query";

/**
 * If you need to use this in a React component, it is recommended to use the
 * `useQueryClient` hook from react-query instead. (This makes testing
 * components easier.)
 */
export const efiQueryClient = createQueryClient();

export function createQueryClient(): QueryClient {
  const queryCache = new QueryCache();
  const mutationCache = new MutationCache();

  const queryClient = new QueryClient({
    queryCache,
    mutationCache,
    defaultOptions: {
      queries: {
        // Choosing 20s based on: https://tkdodo.eu/blog/react-query-as-a-state-manager
        staleTime: 20000,
      },
    },
  });

  return queryClient;
}
