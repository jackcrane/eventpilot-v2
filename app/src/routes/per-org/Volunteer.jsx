import { useEffect, useState } from "react";
import { VolunteerRegistration } from "../../../components/modular/volunteerRegistration/VolunteerRegistration";
import { useEventByName } from "../../../hooks/useEventByName";
import { useEvent } from "../../../hooks/useEvent";

export const Volunteer = () => {
  const [localFields, setFields] = useState([]);
  const subdomain = window.location.hostname.split(".")[0];

  const { event: eventDate, loading: eventDataLoading } = useEventByName({
    name: subdomain,
  });

  useEffect(() => {
    window.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.__eventpilotRegistrationFields) {
          setFields(data.__eventpilotRegistrationFields);
        }
      } catch (error) {
        // Not JSON, just ignore
      }
    });
  }, []);

  if (eventDataLoading) {
    return <div>Loading...</div>;
  }

  // return <div>{JSON.stringify(event)}</div>;

  return <VolunteerRegistration localFields={localFields} />;
};
