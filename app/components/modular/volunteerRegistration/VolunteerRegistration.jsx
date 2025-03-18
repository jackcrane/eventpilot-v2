import React, { useEffect, useState } from "react";
import { useEventByName } from "../../../hooks/useEventByName";
import { useEvent } from "../../../hooks/useEvent";
import { useTheme } from "../../../hooks/useTheme";
import { useVolunteerRegistrationFormFields } from "../../../hooks/useVolunteerRegistrationFormFields";
import ReactFontLoader from "react-font-loader";
import { StringField } from "./fieldTypes/String";
import { TextField } from "./fieldTypes/Text";
import styles from "./VolunteerRegistration.module.css";

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
  const { registrationFields: fields } = useVolunteerRegistrationFormFields({
    orgId: eventData?.organizationId,
    eventId: eventData?.id,
  });

  // Merge base field data with additional state (value, clientValid, clientTainted)
  const [mergedFields, setMergedFields] = useState([]);
  const [showInvalidFields, setShowInvalidFields] = useState(false);

  useEffect(() => {
    const baseFields = localFields && localFields.length ? localFields : fields;
    if (baseFields) {
      const initialMerged = baseFields.map((field) => ({
        ...field,
        value: field.value,
        clientValid: false,
        clientTainted: false,
      }));
      setMergedFields(initialMerged);
    }
  }, [localFields, fields]);

  const handleChange = (field, value) =>
    setMergedFields((prev) =>
      prev.map((f) =>
        f.id === field.id
          ? { ...f, value, clientTainted: true, clientValid: value.length > 0 }
          : { ...f, clientTainted: false }
      )
    );

  const isValid = (field) => {
    if (!showInvalidFields) return true;
    const currentField = mergedFields.find((f) => f.id === field.id);
    return currentField?.clientValid;
  };

  const submit = async () => setShowInvalidFields(true);

  window.setMergedFields = setMergedFields;

  if (eventDataLoading || eventLoading || themeLoading || !mergedFields) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <ReactFontLoader url={theme.fonts.body.loader} className="font-loader" />
      <ReactFontLoader
        url={theme.fonts.heading.loader}
        className="font-loader"
      />
      <header className={styles.header}>
        <img
          src={event.icon.location}
          alt={event.name}
          className={styles.logo}
        />
        <h1>{event.name}</h1>
      </header>
      <div className={styles.fields}>
        {mergedFields
          .sort((a, b) => a.sortIndex - b.sortIndex)
          .map((field) => {
            if (field.type === "TEXT") {
              return <TextField key={field.id} field={field} />;
            } else if (["EMAIL", "STRING"].includes(field.type)) {
              return (
                <StringField
                  key={field.id}
                  field={field}
                  onChange={(value) => handleChange(field, value)}
                  valid={isValid(field)}
                />
              );
            }
            return <p key={field.id}>Unknown field type: {field.type}</p>;
          })}
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};
