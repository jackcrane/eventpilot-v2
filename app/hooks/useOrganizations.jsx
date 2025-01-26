import useSWR, { mutate } from "swr";
import { authFetch } from "../util/url";
import toast from "react-hot-toast";
import { useState } from "react";

const fetcher = (url) => authFetch(url).then((r) => r.json());

export const useOrganizations = () => {
  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationError, setMutationError] = useState(null);

  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useSWR(`/api/organization`, fetcher);

  const createOrganization = async (data, onSuccess) => {
    setMutationLoading(true);
    try {
      mutate(`/api/organization`, { ...data }, false); // Optimistic update
      const r = await authFetch(`/api/organization`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const response = await r.json();
      const { organizations, newOrganization } = response;
      if (organizations && organizations.length > 0) {
        mutate(`/api/organization`, organizations, true);
        onSuccess?.(newOrganization.id);
        setMutationError(null);
        refetch();
      } else {
        console.log(response);
        setMutationError(response);
        throw new Error("Failed to create organization.");
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to create organization.");
      throw error;
    } finally {
      setMutationLoading(false);
    }
  };

  return {
    organizations: data?.organizations || [],
    loading: isLoading,
    mutationLoading,
    error,
    mutationError,
    refetch,
    createOrganization,
  };
};
