import { useParams } from "react-router-dom";
import { Page } from "../../../../../../components/page/Page";
import { sidenavItems } from "../../../../../../components/sidenav/Sidenav";
import { useEvent } from "../../../../../../hooks/useEvent";

export const Event = () => {
  const { eventId, orgId } = useParams();
  const { event, loading } = useEvent({ orgId, eventId });

  return (
    <Page title={event.name} loading={loading} sidenavItems={sidenavItems("")}>
      <h1>{event.name}</h1>
    </Page>
  );
};
