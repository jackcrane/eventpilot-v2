import useSWR, { mutate } from "swr";
import { authFetch } from "../util/url";
import toast from "react-hot-toast";
import { useState } from "react";

const fetcher = (url) => authFetch(url).then((r) => r.json());

export const useOrganization = ({ id }) => {
  const [mutationLoading, setMutationLoading] = useState(false);
  const [mutationError, setMutationError] = useState(null);

  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useSWR(`/api/organization/${id}`, fetcher);

  const updateOrganization = async (data, onSuccess) => {
    setMutationLoading(true);
    try {
      mutate(`/api/organization`, { ...data }, false); // Optimistic update
      const r = await authFetch(`/api/organization/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      const response = await r.json();
      const { organization } = response;
      if (organization && organization.id) {
        mutate(`/api/organization/${id}`, organization, true);
        onSuccess?.(organization.id);
        setMutationError(null);
        refetch();
      } else {
        console.log(response);
        setMutationError(response);
        throw new Error("Failed to update organization.");
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update organization.");
      throw error;
    } finally {
      setMutationLoading(false);
    }
  };

  return {
    organization: data?.organization || {},
    loading: isLoading,
    mutationLoading,
    error,
    mutationError,
    refetch,
    updateOrganization,
  };
};
