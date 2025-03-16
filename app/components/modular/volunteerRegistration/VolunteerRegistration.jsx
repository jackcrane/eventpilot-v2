import { ThemeProvider } from "styled-components";
import { useEventByName } from "../../../hooks/useEventByName";
import { useTheme } from "../../../hooks/useTheme";
import ReactFontLoader from "react-font-loader";
import { useVolunteerRegistrationFormFields } from "../../../hooks/useVolunteerRegistrationFormFields";
import { useEvent } from "../../../hooks/useEvent";

export const VolunteerRegistration = ({ localFields }) => {
  const subdomain = window.location.hostname.split(".")[0];

  const { event: eventData, loading: eventDataLoading } = useEventByName({
    name: subdomain,
  });
  const { event, loading: eventLoading } = useEvent({
    orgId: eventData?.organizationId,
    eventId: eventData?.id,
  });

  const { theme, loading: themeLoading } = useTheme({
    orgId: eventData?.organizationId,
    eventId: eventData?.id,
  });

  const { fields, loading: fieldsLoading } = useVolunteerRegistrationFormFields(
    {
      orgId: eventData?.organizationId,
      eventId: eventData?.id,
    }
  );

  if (eventDataLoading || themeLoading || eventLoading) {
    return <div>Loading...</div>;
  }

  const FIELDS_TO_RENDER = localFields || fields;

  return (
    <div>
      <ReactFontLoader url={theme.fonts.body.loader} className="font-loader" />
      <h1 style={{ fontFamily: theme.fonts.body.fontFace }}>
        {JSON.stringify(event)}
      </h1>
    </div>
  );
};
