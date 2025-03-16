import useSWR, { mutate } from "swr";
import { authFetch } from "../util/url";

const fetcher = (url) => authFetch(url).then((r) => r.json());

export const useEventByName = ({ name }) => {
  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useSWR(`/api/modular/event?shortName=${name}`, fetcher);

  return {
    event: data?.event,
    loading: isLoading,
    error,
    refetch,
  };
};
