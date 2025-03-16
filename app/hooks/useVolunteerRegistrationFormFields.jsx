import useSWR from "swr";
import { useState } from "react";
import { authFetch } from "../util/url";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const fetcher = (url) => authFetch(url, null, false).then((r) => r.json());

export const useVolunteerRegistrationFormFields = ({ orgId, eventId }) => {
  const endpoint = `/api/organization/${orgId}/event/${eventId}/volunteers/registration/fields`;

  const { data, error, isLoading, mutate: refetch } = useSWR(endpoint, fetcher);
  const [loading, setLoading] = useState(false);

  const update = async (fields) => {
    setLoading(true);
    try {
      const f = await authFetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ fields }),
      });
      if (f.ok) {
        toast.success("Fields updated successfully");
        await refetch();
      } else {
        toast.error("Error updating fields");
        await refetch();
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    registrationFields: data?.fields,
    loading: isLoading || loading,
    error,
    refetch,
    update,
  };
};
