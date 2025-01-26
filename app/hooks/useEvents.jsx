import useSWR, { mutate } from "swr";
import { authFetch } from "../util/url";
import toast from "react-hot-toast";
import { useState } from "react";

const fetcher = (url) => authFetch(url).then((r) => r.json());

export const useEvents = ({ orgId }) => {
  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationError, setMutationError] = useState(null);

  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useSWR(`/api/organization/${orgId}/event`, fetcher);

  const createEvent = async (data, onSuccess) => {
    setMutationLoading(true);
    try {
      mutate(`/api/organization/${orgId}/event`, { ...data }, false); // Optimistic update
      const r = await authFetch(`/api/organization/${orgId}/event`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const response = await r.json();
      const { events, newEvent } = response;
      if (events && events.length > 0) {
        mutate(`/api/organization/${orgId}/event`, events, true);
        onSuccess?.(newEvent.id);
        setMutationError(null);
        refetch();
      } else {
        console.log(response);
        setMutationError(response);
        throw new Error("Failed to create event.");
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to create event.");
      throw error;
    } finally {
      setMutationLoading(false);
    }
  };

  return {
    events: data?.events || [],
    loading: isLoading,
    mutationLoading,
    error,
    mutationError,
    refetch,
    createEvent,
  };
};
