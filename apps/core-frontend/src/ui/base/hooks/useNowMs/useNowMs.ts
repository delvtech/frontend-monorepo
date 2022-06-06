import { useQuery } from "react-query";

let nowMs = Date.now();
export function useNowMs(): number {
  useQuery({
    queryKey: "nowMs",
    queryFn: () => {
      nowMs = Date.now();
    },
    staleTime: Infinity,
    refetchInterval: 10000, // 10 seconds
  });

  return nowMs;
}
