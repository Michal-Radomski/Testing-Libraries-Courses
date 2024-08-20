import axios, { AxiosResponse } from "axios";
import useSWR from "swr";

async function userFetcher(url: string): Promise<AxiosResponse<any> | any> {
  const res = await axios.get(url);

  return res.data;
}

export default function useUser() {
  const { data, error, isLoading } = useSWR("/api/user", userFetcher); //* It caches data!

  return {
    user: data?.user,
    isLoading,
    error,
  };
}
