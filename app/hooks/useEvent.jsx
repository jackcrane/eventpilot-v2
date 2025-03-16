import useSWR, { mutate } from "swr";
import { authFetch } from "../util/url";
import toast from "react-hot-toast";
import { useState } from "react";

const fetcher = (url) => authFetch(url, null, false).then((r) => r.json());

export const useEvent = ({ orgId, eventId }) => {
  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationError, setMutationError] = useState(null);

  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useSWR(`/api/organization/${orgId}/event/${eventId}`, fetcher);

  const updateEvent = async (data, onSuccess) => {
    setMutationLoading(true);
    try {
      mutate(`/api/organization/${orgId}/event/${eventId}`, { ...data }, false); // Optimistic update
      const r = await authFetch(`/api/organization/${orgId}/event/${eventId}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      const response = await r.json();
      const { event } = response;
      if (event && event.id) {
        mutate(`/api/organization/${orgId}/event/${eventId}`, event, true);
        onSuccess?.(event.id);
        setMutationError(null);
        refetch();
      } else {
        console.log(response);
        setMutationError(response);
        throw new Error("Failed to update event.");
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update event.");
      throw error;
    } finally {
      setMutationLoading(false);
    }
  };

  return {
    event: data?.event || {},
    loading: isLoading,
    mutationLoading,
    error,
    mutationError,
    refetch,
    updateEvent,
  };
};
