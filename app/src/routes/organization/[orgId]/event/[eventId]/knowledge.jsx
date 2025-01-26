import { Breadcrumbs } from "../../../../../../components/breadcrumbs/Breadcrumbs";
import { Page } from "../../../../../../components/page/Page";
import { sidenavItems } from "../../../../../../components/sidenav/Sidenav";
import { Typography, Card } from "tabler-react-2";
const { Text } = Typography;

export const Knowledge = () => {
  return (
    <Page title="Knowledge Base" sidenavItems={sidenavItems("knowledge")}>
      <Breadcrumbs />
      <h1>Knowledge Base</h1>
      <Text>
        The knowledge base is the hub of shared knowledge for your event. Keep
        track of important documents, handouts, and more here.
      </Text>
    </Page>
  );
};
