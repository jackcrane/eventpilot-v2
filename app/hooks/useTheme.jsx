import useSWR, { mutate } from "swr";
import { authFetch } from "../util/url";
import { useEffect } from "react";
import { injectThemeCSS } from "../util/convertThemeToCSS";

const fetcher = (url) => authFetch(url, null, false).then((r) => r.json());

export const useTheme = ({ orgId, eventId, inject = true }) => {
  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useSWR(`/api/organization/${orgId}/event/${eventId}/theme`, fetcher);

  useEffect(() => {
    inject && injectThemeCSS(data?.theme);
  }, [data?.theme]);

  return {
    theme: data?.theme,
    loading: isLoading,
    error,
    refetch,
  };
};
