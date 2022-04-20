import axios from "axios";
import { useQuery } from "react-query";
import { ADDRESS_SCREEN_URL } from "src/urls";

interface APIResponse {
  status: number;
  data: boolean | null;
  error: string | null;
}

interface UseAddressScreening {
  pass: boolean | null | undefined;
  error: unknown;
}

export default function useAddressScreening(
  address: string | null | undefined,
): UseAddressScreening {
  const { data: result, error } = useQuery<APIResponse>({
    queryKey: ["address-screen", address],
    queryFn: () =>
      axios.post(ADDRESS_SCREEN_URL, JSON.stringify({ address }), {
        headers: {
          "Content-Type": "text/plain",
        },
      }),
    staleTime: Infinity,
    enabled: !!address,
    retry: 6,
  });
  return {
    pass: result?.data ?? undefined,
    error: result?.error ?? error,
  };
}
